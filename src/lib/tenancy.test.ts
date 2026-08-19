import { test } from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

// Staff auth is PIN-based, so the app talks to Postgres with the service role
// and RLS never sees a per-shop identity: shop scoping lives in these queries
// alone. A write that forgets .eq("shop_id", ...) writes across tenants, which
// this test is here to catch before it ships.
const SOURCE_ROOT = join(process.cwd(), "src");

function sourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) return sourceFiles(path);
    if (!/\.tsx?$/.test(entry) || entry.endsWith(".test.ts")) return [];
    return [path];
  });
}

// One .from("table") call plus everything chained onto it, up to the semicolon.
function queryChains(source: string): { table: string; chain: string }[] {
  return Array.from(source.matchAll(/\.from\("([a-z_]+)"\)/g)).map((match) => {
    const rest = source.slice(match.index + match[0].length);
    const end = rest.indexOf(";");
    return { table: match[1], chain: end === -1 ? rest : rest.slice(0, end) };
  });
}

test("every update or delete is scoped to a shop", () => {
  const unscoped: string[] = [];

  for (const file of sourceFiles(SOURCE_ROOT)) {
    for (const { table, chain } of queryChains(readFileSync(file, "utf8"))) {
      const mutates = /\.(update|delete)\(/.test(chain);
      if (mutates && !chain.includes("shop_id")) {
        unscoped.push(`${file.replace(process.cwd() + "/", "")}: ${table}`);
      }
    }
  }

  assert.deepEqual(unscoped, []);
});

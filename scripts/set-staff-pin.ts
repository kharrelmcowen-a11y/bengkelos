#!/usr/bin/env tsx
/**
 * Sets the PIN for one staff role, against whatever project .env.local points
 * at — production included.
 *
 * Usage:  npm run set-pin -- --list --prod
 *         npm run set-pin -- --role owner --prod
 *         npm run set-pin -- --role cashier --prod
 *
 * Both the PIN and the service key are asked for at a hidden prompt, the same
 * way scripts/rotate-service-key.sh asks — neither ever reaches a shell
 * history, a command line, or a chat transcript. `vercel env pull` is no help
 * here: the keys are marked sensitive, so it writes "[SENSITIVE]" instead of
 * the value.
 *
 * Without --prod the script talks to whatever .env.local points at, which is
 * the local Supabase stack.
 *
 * The PIN comes from the environment, never a flag: a flag lands in shell
 * history, and this repository is public. It is hashed inside Postgres by
 * set_staff_pin(), so the plaintext exists only for the length of this call and
 * is never written down anywhere.
 */

import { readFileSync } from "node:fs";
import { createInterface } from "node:readline";
import { createClient } from "@supabase/supabase-js";

// Same project rotate-service-key.sh targets. The URL is not a secret; the key is.
const PROD_URL = "https://hyivfiybznrfnhbzyyeb.supabase.co";

/** Reads a line with the terminal echo suppressed, so nothing shows on screen. */
function askHidden(prompt: string): Promise<string> {
  return new Promise((resolve) => {
    const rl = createInterface({ input: process.stdin, output: process.stdout, terminal: true });
    process.stdout.write(prompt);
    // readline writes each keystroke back to the terminal; silence that.
    (rl as unknown as { _writeToOutput: (s: string) => void })._writeToOutput = () => {};
    rl.question("", (answer) => {
      rl.close();
      process.stdout.write("\n");
      resolve(answer.trim());
    });
  });
}

const useProd = process.argv.includes("--prod");

function loadEnvFile() {
  let raw: string;
  try {
    raw = readFileSync(new URL("../.env.local", import.meta.url), "utf8");
  } catch {
    return; // Already exported in the environment, or nothing to load.
  }
  for (const line of raw.split("\n")) {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)$/);
    if (!match) continue;
    const [, key, value] = match;
    if (!process.env[key]) {
      process.env[key] = value.trim().replace(/^["']|["']$/g, "");
    }
  }
}

loadEnvFile();

const args = process.argv.slice(2);
const flag = (name: string) => {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? undefined : args[i + 1];
};

async function client() {
  const url = useProd ? PROD_URL : process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url) {
    console.error("No NEXT_PUBLIC_SUPABASE_URL in .env.local, and --prod was not passed.");
    process.exit(1);
  }

  // Exported already (CI), otherwise asked for. Never taken from a flag.
  const key =
    (useProd ? undefined : process.env.SUPABASE_SERVICE_ROLE_KEY) ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    (await askHidden(`Supabase service key for ${url} (input hidden): `));

  if (!key) {
    console.error("No key given, nothing changed.");
    process.exit(1);
  }

  return createClient(url, key);
}

async function list(supabase: Awaited<ReturnType<typeof client>>) {
  const { data, error } = await supabase
    .from("staff")
    .select("id, name, role, active, pin, shops(name)")
    .order("role");

  if (error) throw new Error(error.message);

  console.log(`\n${useProd ? "PRODUCTION" : "local"}\n`);
  for (const s of data ?? []) {
    // PostgREST types an embedded row as either shape depending on the join.
    const rel = s.shops as { name: string } | { name: string }[] | null;
    const shop = (Array.isArray(rel) ? rel[0] : rel)?.name ?? "-";
    // Never print the hash, only whether one is there.
    const pin = s.pin ? "set" : "NOT SET \u2014 cannot sign in";
    const active = s.active ? "" : " (inactive)";
    console.log(
      `  ${String(s.role).padEnd(9)} ${String(s.name).padEnd(10)} ${shop.padEnd(24)} PIN: ${pin}${active}`,
    );
  }
  console.log();
}

async function main() {
  const supabase = await client();

  if (args.includes("--list")) return list(supabase);

  const role = flag("role");
  const shop = flag("shop");

  if (!role) {
    console.error("Which role? --role owner|cashier|mechanic  (or --list)");
    process.exit(1);
  }

  let query = supabase
    .from("staff")
    .select("id, name, role, shops(name)")
    .eq("role", role)
    .eq("active", true);
  if (shop) query = query.eq("shops.name", shop);

  const { data, error } = await query;
  if (error) throw new Error(error.message);

  if (!data?.length) {
    console.error(`No active staff row with role "${role}". Run --list to see what is there.`);
    process.exit(1);
  }
  // Picking one at random would decide whose books a shift's takings land in.
  if (data.length > 1) {
    console.error(`${data.length} active "${role}" rows. Narrow it with --shop "<name>".`);
    process.exit(1);
  }

  const staff = data[0];

  const pin = process.env.STAFF_PIN || (await askHidden(`New PIN for ${role} (input hidden): `));
  if (!/^\d{4,8}$/.test(pin)) {
    console.error("PIN harus 4-8 angka.");
    process.exit(1);
  }
  const again = process.env.STAFF_PIN || (await askHidden("Repeat it: "));
  if (pin !== again) {
    console.error("The two PINs do not match, nothing changed.");
    process.exit(1);
  }

  const { error: rpcError } = await supabase.rpc("set_staff_pin", {
    p_staff_id: staff.id,
    p_pin: pin,
  });
  if (rpcError) throw new Error(rpcError.message);

  console.log(`PIN set for ${staff.role} \u2014 ${staff.name}.`);
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});

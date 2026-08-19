import { readFileSync } from "node:fs";
import { resolve } from "node:path";

/**
 * Pulls only the E2E_* assignments out of .env.local, so the production
 * NEXT_PUBLIC_SUPABASE_URL sitting in the same file can never reach a test run.
 * Variables already set in the real environment win, which is how CI overrides.
 */
export function loadE2eEnv(file = resolve(process.cwd(), ".env.local")): void {
  let content: string;
  try {
    content = readFileSync(file, "utf8");
  } catch {
    return;
  }

  for (const line of content.split("\n")) {
    const match = /^\s*(E2E_[A-Z0-9_]+)\s*=\s*(.*)$/.exec(line);
    if (!match) continue;
    process.env[match[1]] ??= match[2].trim().replace(/^["']|["']$/g, "");
  }
}

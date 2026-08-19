import { defineConfig, devices } from '@playwright/test';
import { loadE2eEnv } from './e2e/env';

loadE2eEnv();

// These tests create shops, tickets and payments. They must never run against
// the production project, so the Supabase credentials have to be passed in
// explicitly rather than inherited from .env.local.
const supabaseUrl = process.env.E2E_SUPABASE_URL;
const supabaseAnonKey = process.env.E2E_SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.E2E_SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseAnonKey || !supabaseServiceRoleKey) {
  throw new Error(
    'E2E tests need their own Supabase project. Set E2E_SUPABASE_URL, ' +
      'E2E_SUPABASE_ANON_KEY and E2E_SUPABASE_SERVICE_ROLE_KEY before running them.\n' +
      'Without these the dev server falls back to .env.local, which points at production.',
  );
}

// A port of its own, so an already-running `npm run dev` (pointed at production
// via .env.local) can never be reused as the server under test.
const port = process.env.E2E_PORT || '3100';
const baseURL = process.env.E2E_BASE_URL || `http://localhost:${port}`;

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
    },
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'e2e/auth-state.json',
      },
      dependencies: ['setup'],
    },
  ],
  webServer: {
    command: `npm run dev -- --port ${port}`,
    // A static asset, because every page redirects: / sends a visitor through
    // /login to /dashboard, and the readiness probe keeps no cookies, so it
    // would bounce between them until it gave up.
    url: `${baseURL}/favicon.ico`,
    reuseExistingServer: false,
    timeout: 120 * 1000,
    // Next.js looks up process.env before .env.local, so these win.
    env: {
      ...process.env,
      NEXT_PUBLIC_SUPABASE_URL: supabaseUrl,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: supabaseAnonKey,
      SUPABASE_SERVICE_ROLE_KEY: supabaseServiceRoleKey,
      SESSION_SECRET: process.env.E2E_SESSION_SECRET || 'e2e-only-session-secret',
    },
  },
});

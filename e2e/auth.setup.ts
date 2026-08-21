import { test as setup } from '@playwright/test';

const AUTH_FILE = 'e2e/auth-state.json';

// The PIN is not in this repo — the repo is public. Supply it when running the
// suite: E2E_STAFF_PIN=... npm run test:e2e
const PIN = process.env.E2E_STAFF_PIN;

setup('authenticate', async ({ page }) => {
  if (!PIN) {
    throw new Error(
      'E2E_STAFF_PIN is not set. The till is behind a PIN now; the suite needs ' +
        'the PIN of the seeded staff row to sign in.',
    );
  }

  // Sign in once; the session cookie rides in storage state for every test.
  await page.goto('/login');
  await page.fill('#pin', PIN);
  await page.click('button[type="submit"]');
  await page.waitForURL('**/dashboard');
  await page.waitForSelector('text=Halo');
  await page.context().storageState({ path: AUTH_FILE });
});

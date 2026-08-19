import { test as setup } from '@playwright/test';

const AUTH_FILE = 'e2e/auth-state.json';

setup('authenticate', async ({ page }) => {
  // There is no PIN any more: /login mints the session for the shop's single
  // account and bounces straight to the dashboard.
  await page.goto('/login');
  await page.waitForURL('**/dashboard');
  await page.waitForSelector('text=Halo');
  await page.context().storageState({ path: AUTH_FILE });
});

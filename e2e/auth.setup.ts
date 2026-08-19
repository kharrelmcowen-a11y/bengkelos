import { test as setup } from '@playwright/test';

const AUTH_FILE = 'e2e/auth-state.json';

setup('authenticate', async ({ page }) => {
  const testPin = process.env.E2E_TEST_PIN || '1234';

  // Relative URLs so the run always follows the config's baseURL. A hardcoded
  // localhost:3000 default used to point the login at whatever dev server was
  // already running, which is the production-backed one.
  await page.goto('/login');
  await page.fill('input[name="pin"]', testPin);
  await page.click('button[type="submit"]');

  try {
    await page.waitForURL('**/dashboard', { timeout: 10000 });
    await page.waitForSelector('text=Halo', { timeout: 5000 });
    await page.context().storageState({ path: AUTH_FILE });
  } catch (error) {
    console.log('Authentication failed. Make sure a staff member with this PIN exists in the E2E database.');
    throw error;
  }
});

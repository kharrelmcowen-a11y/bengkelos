import { test as setup } from '@playwright/test';

setup('authenticate', async ({ page }) => {
  // This setup assumes you have a test staff member with PIN "1234"
  // In a real scenario, you'd want to create this via database setup
  
  await page.goto('/login');
  await page.fill('input[name="pin"]', '1234');
  await page.click('button[type="submit"]');
  
  // Wait for redirect to dashboard
  await page.waitForURL('/dashboard');
  
  // Save authentication state
  await page.context().storageState({ path: 'e2e/auth-state.json' });
});
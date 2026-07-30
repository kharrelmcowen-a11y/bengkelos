import { test as setup } from '@playwright/test';

const AUTH_FILE = 'e2e/auth-state.json';

setup('authenticate', async ({ page }) => {
  // Get test credentials from environment
  const testPin = process.env.E2E_TEST_PIN || '1234';
  const baseUrl = process.env.E2E_BASE_URL || 'http://localhost:3000';
  
  console.log(`Setting up authentication with PIN: ${testPin}`);
  console.log('Note: Make sure a staff member with this PIN exists in the database');
  
  // Navigate to login page
  await page.goto(`${baseUrl}/login`);
  
  // Fill in PIN
  await page.fill('input[name="pin"]', testPin);
  await page.click('button[type="submit"]');
  
  // Wait for redirect to dashboard or error
  try {
    await page.waitForURL(`${baseUrl}/dashboard`, { timeout: 10000 });
    
    // Verify we're logged in
    await page.waitForSelector('text=Halo', { timeout: 5000 });
    
    // Save authentication state
    await page.context().storageState({ path: AUTH_FILE });
    
    console.log('Authentication state saved to', AUTH_FILE);
  } catch (error) {
    console.log('Authentication failed. Make sure a staff member with PIN exists in database.');
    throw error;
  }
});
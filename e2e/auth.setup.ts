import { test as setup } from '@playwright/test';
import { ACCESS_TOKEN } from '../playwright.config';

const AUTH_FILE = 'e2e/auth-state.json';

setup('authenticate', async ({ page }) => {
  // There is no PIN any more: /login mints the session for the shop's single
  // account and bounces straight to the dashboard.
  // One trip through the gate, then the access cookie rides in storage state.
  await page.goto(`/?${'k'}=${ACCESS_TOKEN}`);
  await page.goto('/login');
  await page.waitForURL('**/dashboard');
  await page.waitForSelector('text=Halo');
  await page.context().storageState({ path: AUTH_FILE });
});

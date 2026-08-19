import { test, expect } from '@playwright/test';
import { ACCESS_TOKEN } from '../playwright.config';

test.describe('Ticket Flow', () => {
  test('complete ticket flow: create ticket → add items → add payment → complete → receipt', async ({ page }) => {
    // Start at dashboard (already authenticated via setup)
    await page.goto('/dashboard');
    
    // Create new ticket
    await page.click('a[href="/tickets/new"]');
    await page.waitForURL('/tickets/new');
    
    // Fill ticket form
    await page.fill('input[name="customerName"]', 'Test Customer');
    await page.fill('input[name="customerPhone"]', '08123456789');
    await page.fill('input[name="plateNumber"]', 'B1234XYZ');
    await page.fill('input[name="brand"]', 'Toyota');
    await page.fill('input[name="model"]', 'Avanza');
    await page.fill('textarea[name="notes"]', 'Test ticket for E2E testing');
    
    await page.click('button[type="submit"]');
    
    // Wait for redirect to ticket detail page
    await page.waitForURL(/\/tickets\/[a-f0-9-]+$/);
    
    // Add service item
    await page.fill('input[name="description"]', 'Ganti Oli');
    await page.fill('input[name="quantity"]', '1');
    await page.fill('input[name="unitPrice"]', '50000');
    await page.click('button:has-text("Tambah")');
    
    // Wait for item to appear
    await page.waitForSelector('text=Ganti Oli');
    
    // Add payment
    await page.fill('input[name="amount"]', '50000');
    await page.selectOption('select[name="method"]', 'cash');
    await page.click('button:has-text("Bayar")');
    
    // Wait for payment to be processed
    await page.waitForTimeout(2000);
    
    // Complete ticket
    await page.click('button:has-text("Selesaikan tiket")');
    
    // Wait for completion and receipt button to appear
    await page.waitForSelector('a:has-text("Lihat struk")');
    
    // Navigate to receipt
    await page.click('a:has-text("Lihat struk")');
    await page.waitForURL(/\/tickets\/[a-f0-9-]+\/receipt$/);
    
    // Verify receipt content
    await expect(page.locator('text=Test Customer')).toBeVisible();
    await expect(page.locator('text=B1234XYZ')).toBeVisible();
    await expect(page.locator('text=Ganti Oli')).toBeVisible();
    await expect(page.locator('text=Total').locator('..').locator('text=Rp 50.000')).toBeVisible();
    
    // Navigate back to dashboard
    await page.goto('/dashboard');
    await expect(page.locator('text=Halo')).toBeVisible();
  });

  test('inventory stock deduction after ticket completion', async ({ page }) => {
    // Read the starting stock straight off the inventory page.
    await page.goto('/inventory');
    const stockCard = page.locator('a', { hasText: 'Oli Mesin' }).first();
    const before = Number((await stockCard.innerText()).match(/(\d+)\s*botol/)![1]);

    await page.goto('/tickets/new');
    await page.fill('input[name="customerName"]', 'Stock Test Customer');
    await page.fill('input[name="plateNumber"]', 'B4321STK');
    await page.click('button[type="submit"]');
    await page.waitForURL(/\/tickets\/[a-f0-9-]+$/);

    // Pick the part from stock rather than typing a free-text line, so
    // completing the ticket has something to deduct.
    const partSelect = page.locator('select:has(option:text-matches("Item bebas"))');
    const partValue = await partSelect
      .locator('option', { hasText: 'Oli Mesin' })
      .first()
      .getAttribute('value');
    await partSelect.selectOption(partValue!);
    await page.fill('input[name="quantity"]', '2');
    await page.click('button:has-text("Tambah")');
    await page.waitForSelector('text=Oli Mesin');

    const total = 2 * 45000;
    await page.fill('input[name="amount"]', String(total));
    await page.selectOption('select[name="method"]', 'cash');
    await page.click('button:has-text("Bayar")');
    await page.waitForSelector('button:has-text("Selesaikan tiket")');
    await page.click('button:has-text("Selesaikan tiket")');
    await page.waitForSelector('a:has-text("Lihat struk")');

    await page.goto('/inventory');
    const after = Number(
      (await page.locator('a', { hasText: 'Oli Mesin' }).first().innerText()).match(/(\d+)\s*botol/)![1],
    );
    expect(after).toBe(before - 2);
  });

  test('appointment to ticket conversion', async ({ page }) => {
    await page.goto('/appointments/new');

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(10, 0, 0, 0);

    await page.fill('input[name="scheduledAt"]', tomorrow.toISOString().slice(0, 16));
    await page.fill('input[name="customerName"]', 'Appointment Customer');
    await page.fill('input[name="customerPhone"]', '08123456789');
    await page.fill('input[name="plateNumber"]', 'B5678ABC');
    await page.fill('input[name="brand"]', 'Honda');
    await page.fill('input[name="model"]', 'Jazz');
    await page.fill('input[name="notes"]', 'Test appointment');
    await page.click('button[type="submit"]');

    await page.waitForURL('/appointments');
    await expect(page.locator('text=Appointment Customer')).toBeVisible();

    // Arriving turns the booking into a live ticket.
    await page.click('button:has-text("Tandai datang")');
    await page.waitForURL(/\/tickets\/[a-f0-9-]+$/);
    await expect(page.locator('text=B5678ABC')).toBeVisible();
  });

  test('the finance and report pages are open to the till account', async ({ page }) => {
    // One role now — whoever is at the counter sees the money screens too.
    await page.goto('/finance');
    await expect(page).toHaveURL(/\/finance$/);
    await expect(page.locator('text=Laporan keuangan')).toBeVisible();

    await page.goto('/reports');
    await expect(page).toHaveURL(/\/reports$/);
  });

  test('a visitor with no session is signed in without typing anything', async ({ browser }) => {
    // A fresh context has no cookie, which is what a new phone at the counter
    // looks like. It must land on the dashboard with no PIN prompt.
    const context = await browser.newContext({ storageState: { cookies: [], origins: [] } });
    const fresh = await context.newPage();
    await fresh.goto(`/?k=${ACCESS_TOKEN}`);
    await fresh.waitForURL('**/dashboard');
    await expect(fresh.locator('text=Halo')).toBeVisible();
    await expect(fresh.locator('input[name="pin"]')).toHaveCount(0);
    await context.close();
  });

  test('the site is a dead end without the access token', async ({ browser }) => {
    const context = await browser.newContext({ storageState: { cookies: [], origins: [] } });
    const stranger = await context.newPage();

    const blocked = await stranger.goto('/dashboard');
    expect(blocked?.status()).toBe(404);

    const guessed = await stranger.goto('/dashboard?k=wrong-token');
    expect(guessed?.status()).toBe(404);

    await context.close();
  });

  test('customer loyalty points accrual after ticket completion', async ({ page }) => {
    await page.goto('/dashboard');
    
    // Create a ticket with a customer
    await page.click('a[href="/tickets/new"]');
    await page.waitForURL('/tickets/new');
    
    // Points accumulate on a returning customer, so this run gets its own.
    const stamp = Date.now();
    const loyaltyCustomer = `Loyalty Customer ${stamp}`;
    await page.fill('input[name="customerName"]', loyaltyCustomer);
    await page.fill('input[name="customerPhone"]', '08123456789');
    await page.fill('input[name="plateNumber"]', `B${stamp % 10000}ZZ`);
    await page.fill('input[name="brand"]', 'Test Brand');
    await page.fill('input[name="model"]', 'Test Model');
    
    await page.click('button[type="submit"]');
    await page.waitForURL(/\/tickets\/[a-f0-9-]+$/);
    
    // Add a high-value item to generate loyalty points
    await page.fill('input[name="description"]', 'Service Lengkap');
    await page.fill('input[name="quantity"]', '1');
    await page.fill('input[name="unitPrice"]', '50000'); // Should generate 50 points
    await page.click('button:has-text("Tambah")');
    
    await page.waitForSelector('text=Service Lengkap');
    
    // Add payment
    await page.fill('input[name="amount"]', '50000');
    await page.selectOption('select[name="method"]', 'cash');
    await page.click('button:has-text("Bayar")');
    
    // Wait for payment to be processed
    await page.waitForTimeout(2000);
    
    // Complete ticket
    await page.click('button:has-text("Selesaikan tiket")');
    await page.waitForSelector('a:has-text("Lihat struk")');
    
    // Navigate to customers page to check loyalty points
    await page.goto('/customers');
    
    // Search for the test customer
    await page.fill('input[name="q"]', loyaltyCustomer);
    await page.click('button:has-text("Cari")');
    
    // Wait for search results to load
    await page.waitForTimeout(2000);
    
    const customerRow = page.locator('a', { hasText: loyaltyCustomer }).first();
    await expect(customerRow).toBeVisible();
    await expect(customerRow).toContainText('50 poin');
  });

  test('ticket attachment upload and display', async ({ page }) => {
    await page.goto('/dashboard');
    
    // Create a ticket
    await page.click('a[href="/tickets/new"]');
    await page.waitForURL('/tickets/new');
    
    await page.fill('input[name="customerName"]', 'Attachment Test Customer');
    await page.fill('input[name="customerPhone"]', '08123456789');
    await page.fill('input[name="plateNumber"]', 'B8888YYY');
    await page.fill('input[name="brand"]', 'Test Brand');
    await page.fill('input[name="model"]', 'Test Model');
    
    await page.click('button[type="submit"]');
    await page.waitForURL(/\/tickets\/[a-f0-9-]+$/);
    
    await expect(page.locator('text=Lampiran Foto/Dokumen')).toBeVisible();

    // A one-pixel PNG is enough to exercise upload, storage and the signed URL
    // the private bucket now requires.
    await page.setInputFiles('input[type="file"]', {
      name: 'foto-depan.png',
      mimeType: 'image/png',
      buffer: Buffer.from(
        'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
        'base64',
      ),
    });
    await page.click('button:has-text("Upload")');

    const uploaded = page.locator('text=foto-depan.png');
    await expect(uploaded).toBeVisible({ timeout: 15000 });
  });
});
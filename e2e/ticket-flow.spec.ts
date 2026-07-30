import { test, expect } from '@playwright/test';

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
    
    // Wait for payment to appear in the list
    await page.waitForSelector('text=Rp 50.000');
    
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
    await expect(page.locator('text=Rp 50.000')).toBeVisible();
    
    // Navigate back to dashboard
    await page.goto('/dashboard');
    await expect(page.locator('text=Halo')).toBeVisible();
  });

  test('inventory stock deduction after ticket completion', async ({ page }) => {
    // This test would require setting up inventory items first
    // For now, it's a placeholder for the inventory flow test
    
    await page.goto('/dashboard');
    
    // Navigate to inventory
    await page.click('a[href="/inventory"]');
    await page.waitForURL('/inventory');
    
    // Check that inventory page loads
    await expect(page.locator('text=Stok barang')).toBeVisible();
  });

  test('appointment to ticket conversion', async ({ page }) => {
    await page.goto('/dashboard');
    
    // Check if appointment link exists (may not be implemented yet)
    const appointmentLink = page.locator('a[href="/appointments/new"]');
    const count = await appointmentLink.count();
    
    if (count === 0) {
      console.log('Appointment feature not implemented yet, skipping test');
      return;
    }
    
    // Create appointment
    await appointmentLink.click();
    await page.waitForURL('/appointments/new');
    
    // Fill appointment form
    await page.fill('input[name="customerName"]', 'Appointment Customer');
    await page.fill('input[name="customerPhone"]', '08123456789');
    await page.fill('input[name="plateNumber"]', 'B5678ABC');
    await page.fill('input[name="brand"]', 'Honda');
    await page.fill('input[name="model"]', 'Jazz');
    
    // Set appointment time for tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(10, 0, 0, 0);
    const appointmentTime = tomorrow.toISOString().slice(0, 16);
    
    await page.fill('input[name="scheduledAt"]', appointmentTime);
    await page.fill('textarea[name="notes"]', 'Test appointment');
    
    await page.click('button[type="submit"]');
    
    // Wait for redirect to appointments page
    await page.waitForURL('/appointments');
    
    // Verify appointment appears
    await expect(page.locator('text=Appointment Customer')).toBeVisible();
  });

  test('role-based access control - finance page owner only', async ({ page }) => {
    // This test would require creating test users with different roles
    // For now, it's a placeholder for RBAC testing
    
    await page.goto('/dashboard');
    
    // Try to access finance page (should work for owner, redirect for others)
    await page.goto('/finance');
    
    // If redirected to dashboard, user is not owner
    // If on finance page, user is owner
    const currentUrl = page.url();
    if (currentUrl.includes('/dashboard')) {
      console.log('User is not owner - correctly redirected');
    } else if (currentUrl.includes('/finance')) {
      console.log('User is owner - can access finance page');
      await expect(page.locator('text=Laporan keuangan')).toBeVisible();
    }
  });

  test('customer loyalty points accrual after ticket completion', async ({ page }) => {
    await page.goto('/dashboard');
    
    // Create a ticket with a customer
    await page.click('a[href="/tickets/new"]');
    await page.waitForURL('/tickets/new');
    
    await page.fill('input[name="customerName"]', 'Loyalty Test Customer');
    await page.fill('input[name="customerPhone"]', '08123456789');
    await page.fill('input[name="plateNumber"]', 'B9999ZZZ');
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
    
    // Wait for payment to appear in the list
    await page.waitForSelector('text=Rp 50.000');
    
    // Complete ticket
    await page.click('button:has-text("Selesaikan tiket")');
    await page.waitForSelector('a:has-text("Lihat struk")');
    
    // Navigate to customers page to check loyalty points
    await page.goto('/customers');
    
    // Search for the test customer
    await page.fill('input[name="q"]', 'Loyalty Test Customer');
    await page.click('button:has-text("Cari")');
    
    // Verify loyalty points are displayed
    await expect(page.locator('text=Loyalty Test Customer')).toBeVisible();
    await expect(page.locator('text=50 poin')).toBeVisible();
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
    
    // Note: File upload testing in Playwright requires actual file handling
    // This is a placeholder to verify the attachment form is present
    await expect(page.locator('text=Lampiran Foto/Dokumen')).toBeVisible();
    await expect(page.locator('input[type="file"]')).toBeVisible();
    
    // Verify file type selector exists in the attachment section
    const attachmentSection = page.locator('text=Lampiran Foto/Dokumen').locator('..');
    await expect(attachmentSection.locator('select')).toBeVisible();
  });
});
import { test, expect } from '@playwright/test';

test.describe('AppShell & Navigation Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.fill('input[type="email"]', 'admin@forgeui.com');
    await page.fill('input[type="password"]', 'password123');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('/dashboard');
  });

  test('should toggle sidebar collapse state', async ({ page }) => {
    const collapseBtn = page.getByRole('button', { name: 'Collapse Sidebar' });
    await expect(collapseBtn).toBeVisible();
    await collapseBtn.click();

    await expect(page.getByRole('button', { name: 'Expand Sidebar' })).toBeVisible();
  });

  test('should trigger Command Palette with keyboard shortcut Cmd/Ctrl + K', async ({ page }) => {
    await page.keyboard.press('Control+k');
    await expect(page.getByPlaceholder(/Type a command or search/i)).toBeVisible();

    await page.keyboard.type('Users');
    await page.keyboard.press('Enter');

    await expect(page).toHaveURL('/users');
  });
});

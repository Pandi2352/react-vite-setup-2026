import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test('should render login form and authenticate user successfully', async ({ page }) => {
    await page.goto('/login');

    await expect(page.getByRole('heading', { name: 'Sign In' })).toBeVisible();

    await page.fill('input[type="email"]', 'admin@forgeui.com');
    await page.fill('input[type="password"]', 'password123');
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL('/dashboard');
    await expect(page.getByRole('heading', { name: /Welcome back/i })).toBeVisible();
  });
});

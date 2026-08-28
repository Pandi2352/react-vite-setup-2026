import { test, expect } from '@playwright/test';

test.describe('User Management Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.fill('input[type="email"]', 'admin@forgeui.com');
    await page.fill('input[type="password"]', 'password123');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('/dashboard');
  });

  test('should navigate to users page and filter user list', async ({ page }) => {
    await page.click('a[href="/users"]');
    await expect(page).toHaveURL('/users');
    await expect(page.getByRole('heading', { name: 'User Management' })).toBeVisible();

    const searchInput = page.getByPlaceholder('Search users by name or email...');
    await searchInput.fill('Priya');

    await expect(page.getByText('Priya Sharma')).toBeVisible();
    await expect(page.getByText('Arun Kumar')).not.toBeVisible();
  });
});

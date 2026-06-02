import { test, expect } from '@playwright/test';
import { AuthPage } from '../pages/auth.page';
import { DashboardPage } from '../pages/dashboard.page';
import { loginUser } from '../testdata/userData';

test.describe('Dashboard Advanced Flows', () => {
  let authPage: AuthPage;
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    authPage = new AuthPage(page);
    dashboardPage = new DashboardPage(page);
  });

  test('Dashboard - Search with No Results', async ({ page }) => {
    await authPage.gotoLogin();
    await authPage.login(loginUser.email, loginUser.password);
    await dashboardPage.searchProduct('XYZABC123NONEXISTENT');
    await dashboardPage.expectNoSearchResults();
  });

  test('Dashboard - Filter by Price Range', async ({ page }) => {
    await authPage.gotoLogin();
    await authPage.login(loginUser.email, loginUser.password);
    await expect(dashboardPage.productCards.first()).toBeVisible();

    const minPrice = page.locator('input[name*="min"], input[placeholder*="Min"], input[aria-label*="minimum"]');
    const maxPrice = page.locator('input[name*="max"], input[placeholder*="Max"], input[aria-label*="maximum"]');
    await minPrice.fill('50');
    await maxPrice.fill('200');
    await page.locator('button:has-text("Apply"), button:has-text("Filter")').click();
    await expect(dashboardPage.productCards.first()).toBeVisible();
  });

  test('Dashboard - Sort Products by Price and Name', async ({ page }) => {
    await authPage.gotoLogin();
    await authPage.login(loginUser.email, loginUser.password);
    await expect(dashboardPage.sortSelect).toBeVisible();
    await dashboardPage.sortSelect.selectOption({ label: 'Sort by Price - Low to High' });
    await dashboardPage.sortSelect.selectOption({ label: 'Sort by Price - High to Low' });
    await dashboardPage.sortSelect.selectOption({ label: 'Sort by Name' });
  });

  test('Dashboard - View Product Details', async ({ page }) => {
    await authPage.gotoLogin();
    await authPage.login(loginUser.email, loginUser.password);
    const firstProduct = dashboardPage.productCards.first();
    await firstProduct.click();
    await expect(page.locator('text=Add to Cart, button:has-text("Add to Cart")')).toBeVisible();
    await expect(page.locator('text=Price, text=Description, text=Reviews')).toBeVisible();
  });
});

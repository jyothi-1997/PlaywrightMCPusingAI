import { test } from '@playwright/test';
import { AuthPage } from '../pages/auth.page';
import { DashboardPage } from '../pages/dashboard.page';
import { loginUser } from '../testdata/userData';

test.describe('Dashboard & Product Browsing', () => {
  let authPage: AuthPage;
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    authPage = new AuthPage(page);
    dashboardPage = new DashboardPage(page);
  });

  test('Dashboard - Page Load After Login', async () => {
    // 1. Login with valid credentials
    await authPage.gotoLogin();
    await authPage.login(loginUser.email, loginUser.password);

    // Verify dashboard loads successfully
    await dashboardPage.expectDashboardVisible();
  });

  test('Dashboard - Product Search Functionality', async () => {
    // 1. Navigate to dashboard after login
    await authPage.gotoLogin();
    await authPage.login(loginUser.email, loginUser.password);

    // 2. Search for a product
    await dashboardPage.searchProduct('ADIDAS');

    // 3. Verify search results
    await dashboardPage.expectSearchResultsContain('ADIDAS');
  });
});

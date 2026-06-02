import { test } from '@playwright/test';
import { AuthPage } from '../pages/auth.page';
import { DashboardPage } from '../pages/dashboard.page';
import { CartPage } from '../pages/cart.page';
import { loginUser } from '../testdata/userData';

test.describe('Shopping Cart & Checkout', () => {
  let authPage: AuthPage;
  let dashboardPage: DashboardPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    authPage = new AuthPage(page);
    dashboardPage = new DashboardPage(page);
    cartPage = new CartPage(page);
  });

  test('Add to Cart - Single Product', async () => {
    // 1. Login and open dashboard
    await authPage.gotoLogin();
    await authPage.login(loginUser.email, loginUser.password);
    await dashboardPage.expectDashboardVisible();

    // 2. Add the first product to the cart
    await dashboardPage.addFirstProductToCart();

    // 3. Verify the cart count updates
    await cartPage.gotoCart();
    await cartPage.expectCartHasItems(1);
  });
});

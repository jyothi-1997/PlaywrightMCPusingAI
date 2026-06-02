import { test, expect } from '@playwright/test';
import { AuthPage } from '../pages/auth.page';
import { DashboardPage } from '../pages/dashboard.page';
import { CartPage } from '../pages/cart.page';
import { CheckoutPage } from '../pages/checkout.page';
import { loginUser } from '../testdata/userData';
import { paymentCard } from '../testdata/productData';

test.describe('Edge Cases Advanced Flows', () => {
  let authPage: AuthPage;
  let dashboardPage: DashboardPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    authPage = new AuthPage(page);
    dashboardPage = new DashboardPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
  });

  test.skip('Cart with Maximum Products', async ({ page }) => {
    await authPage.gotoLogin();
    await authPage.login(loginUser.email, loginUser.password);
    for (let i = 0; i < 50; i++) {
      await dashboardPage.page.locator('button:has-text("Add to Cart")').nth(i).click();
    }
    await cartPage.gotoCart();
    await expect(cartPage.cartItems).toHaveCountGreaterThan(50);
  });

  test('Quantity Beyond Available Stock', async ({ page }) => {
    await authPage.gotoLogin();
    await authPage.login(loginUser.email, loginUser.password);
    await dashboardPage.addFirstProductToCart();
    await cartPage.gotoCart();
    await cartPage.updateQuantity(0, 10);
    await expect(page.locator('text=Only 5 items available, text=maximum available, text=stock')).toBeVisible();
  });

  test('Negative Price Display', async ({ page }) => {
    await authPage.gotoLogin();
    await authPage.login(loginUser.email, loginUser.password);
    await dashboardPage.addFirstProductToCart();
    await cartPage.gotoCart();
    await expect(page.locator('text=-$')).not.toBeVisible();
  });

  test('Concurrent Requests - Multiple Tabs', async ({ browser }) => {
    const context1 = await browser.newContext();
    const page1 = await context1.newPage();
    const page2 = await browser.newContext().then((c) => c.newPage());
    const page3 = await browser.newContext().then((c) => c.newPage());
    const authPage1 = new AuthPage(page1);
    const authPage2 = new AuthPage(page2);
    const dashboardPage2 = new DashboardPage(page2);
    const dashboardPage3 = new DashboardPage(page3);

    await authPage1.gotoLogin();
    await authPage1.login(loginUser.email, loginUser.password);
    await authPage2.gotoLogin();
    await authPage2.login(loginUser.email, loginUser.password);
    await dashboardPage2.addFirstProductToCart();
    await page3.reload();
    await expect(page3.locator('text=Cart')).toBeVisible();
    await context1.close();
  });
});

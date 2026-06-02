import { test, expect } from '@playwright/test';
import { AuthPage } from '../pages/auth.page';
import { DashboardPage } from '../pages/dashboard.page';
import { CartPage } from '../pages/cart.page';
import { loginUser } from '../testdata/userData';

test.describe('Cart Advanced Flows', () => {
  let authPage: AuthPage;
  let dashboardPage: DashboardPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    authPage = new AuthPage(page);
    dashboardPage = new DashboardPage(page);
    cartPage = new CartPage(page);
  });

  test('Add to Cart - Multiple Products', async ({ page }) => {
    await authPage.gotoLogin();
    await authPage.login(loginUser.email, loginUser.password);
    await dashboardPage.page.locator('button:has-text("Add to Cart")').nth(0).click();
    await dashboardPage.page.locator('button:has-text("Add to Cart")').nth(1).click();
    await dashboardPage.page.locator('button:has-text("Add to Cart")').nth(2).click();
    await cartPage.gotoCart();
    await expect(cartPage.cartItems).toHaveCountGreaterThan(0);
  });

  test('Add to Cart - Duplicate Product', async ({ page }) => {
    await authPage.gotoLogin();
    await authPage.login(loginUser.email, loginUser.password);
    await dashboardPage.addFirstProductToCart();
    await dashboardPage.addFirstProductToCart();
    await cartPage.gotoCart();
    await expect(cartPage.cartItems).toHaveCountGreaterThan(0);
  });

  test('Remove Product from Cart', async ({ page }) => {
    await authPage.gotoLogin();
    await authPage.login(loginUser.email, loginUser.password);
    await dashboardPage.addFirstProductToCart();
    await cartPage.gotoCart();
    await cartPage.removeFirstItem();
    await expect(cartPage.cartItems).toHaveCount(0);
  });

  test('Update Product Quantity in Cart', async ({ page }) => {
    await authPage.gotoLogin();
    await authPage.login(loginUser.email, loginUser.password);
    await dashboardPage.addFirstProductToCart();
    await cartPage.gotoCart();
    await cartPage.updateQuantity(0, 3);
    await expect(cartPage.quantityInputs.first()).toHaveValue('3');
  });

  test('Clear Cart', async ({ page }) => {
    await authPage.gotoLogin();
    await authPage.login(loginUser.email, loginUser.password);
    await dashboardPage.addFirstProductToCart();
    await cartPage.gotoCart();
    await cartPage.clearCart();
    await expect(cartPage.cartItems).toHaveCount(0);
  });
});

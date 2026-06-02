import { test, expect } from '@playwright/test';
import { AuthPage } from '../pages/auth.page';
import { DashboardPage } from '../pages/dashboard.page';
import { CartPage } from '../pages/cart.page';
import { CheckoutPage } from '../pages/checkout.page';
import { loginUser } from '../testdata/userData';
import { checkoutAddress, paymentCard, couponCodes } from '../testdata/productData';

test.describe('Checkout Advanced Flows', () => {
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

  test('Checkout - Missing Shipping Address', async ({ page }) => {
    await authPage.gotoLogin();
    await authPage.login(loginUser.email, loginUser.password);
    await dashboardPage.addFirstProductToCart();
    await cartPage.gotoCart();
    await cartPage.proceedToCheckout();
    await checkoutPage.placeOrder();
    await checkoutPage.expectErrorMessage('Address is required');
  });

  test('Checkout - Invalid Shipping Address', async ({ page }) => {
    await authPage.gotoLogin();
    await authPage.login(loginUser.email, loginUser.password);
    await dashboardPage.addFirstProductToCart();
    await cartPage.gotoCart();
    await cartPage.proceedToCheckout();
    await checkoutPage.fillShippingAddress({ street: '123 Lane', city: '', state: '', zip: '', country: '' });
    await checkoutPage.placeOrder();
    await checkoutPage.expectErrorMessage('missing');
  });

  test('Checkout - Invalid Credit Card', async ({ page }) => {
    await authPage.gotoLogin();
    await authPage.login(loginUser.email, loginUser.password);
    await dashboardPage.addFirstProductToCart();
    await cartPage.gotoCart();
    await cartPage.proceedToCheckout();
    await checkoutPage.fillShippingAddress(checkoutAddress);
    await checkoutPage.selectPaymentMethod('Credit Card');
    await checkoutPage.fillCardDetails({ number: '1234 5678 9012 3456', expiry: '01/25', cvv: '123' });
    await checkoutPage.placeOrder();
    await checkoutPage.expectErrorMessage('Invalid card number');
  });

  test('Checkout - Apply Coupon Code', async ({ page }) => {
    await authPage.gotoLogin();
    await authPage.login(loginUser.email, loginUser.password);
    await dashboardPage.addFirstProductToCart();
    await cartPage.gotoCart();
    await cartPage.proceedToCheckout();
    await checkoutPage.applyCoupon(couponCodes.valid);
    await expect(checkoutPage.page.locator('text=Coupon applied, text=Discount applied')).toBeVisible();
  });

  test('Checkout - Invalid Coupon Code', async ({ page }) => {
    await authPage.gotoLogin();
    await authPage.login(loginUser.email, loginUser.password);
    await dashboardPage.addFirstProductToCart();
    await cartPage.gotoCart();
    await cartPage.proceedToCheckout();
    await checkoutPage.applyCoupon(couponCodes.invalid);
    await checkoutPage.expectErrorMessage('Invalid coupon code');
  });
});

import { test, expect } from '@playwright/test';
import { AuthPage } from '../pages/auth.page';
import { DashboardPage } from '../pages/dashboard.page';
import { CartPage } from '../pages/cart.page';
import { CheckoutPage } from '../pages/checkout.page';
import { loginUser } from '../testdata/userData';
import { paymentCard } from '../testdata/productData';

test.describe('Edge Cases & Boundary Tests', () => {
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

  test('Very Long Product Name in Search', async () => {
    // 1. Login to dashboard
    await authPage.gotoLogin();
    await authPage.login(loginUser.email, loginUser.password);

    // 2. Enter very long search string
    await dashboardPage.searchProduct('ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ');

    // 3. Verify no results or graceful handling
    await dashboardPage.expectNoSearchResults();
  });

  test('Special Characters in Address', async () => {
    // 1. Login and add product to cart
    await authPage.gotoLogin();
    await authPage.login(loginUser.email, loginUser.password);
    await dashboardPage.addFirstProductToCart();

    // 2. Proceed to checkout
    await cartPage.gotoCart();
    await cartPage.proceedToCheckout();
    await checkoutPage.expectCheckoutVisible();

    // 3. Fill address with special characters
    await checkoutPage.fillShippingAddress({
      street: "123 O'Malley's Lane & Street #5-A",
      city: 'New York',
      state: 'NY',
      zip: '10001',
      country: 'USA',
    });
    await checkoutPage.selectPaymentMethod('Credit Card');
    await checkoutPage.fillCardDetails(paymentCard);
    await checkoutPage.placeOrder();

    await expect(checkoutPage.page.locator('text=Order confirmation, text=Order placed, text=Thank you')).toBeVisible();
  });
});

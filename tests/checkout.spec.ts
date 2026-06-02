import { test } from '@playwright/test';
import { AuthPage } from '../pages/auth.page';
import { DashboardPage } from '../pages/dashboard.page';
import { CartPage } from '../pages/cart.page';
import { CheckoutPage } from '../pages/checkout.page';
import { loginUser } from '../testdata/userData';
import { checkoutAddress, paymentCard } from '../testdata/productData';

test.describe('Checkout Flow', () => {
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

  test('Checkout - Enter Shipping Address and Payment', async () => {
    // 1. Login and add a product to cart
    await authPage.gotoLogin();
    await authPage.login(loginUser.email, loginUser.password);
    await dashboardPage.addFirstProductToCart();

    // 2. Go to cart and proceed to checkout
    await cartPage.gotoCart();
    await cartPage.proceedToCheckout();

    // 3. Enter shipping address
    await checkoutPage.expectCheckoutVisible();
    await checkoutPage.fillShippingAddress(checkoutAddress);

    // 4. Select payment method if available and fill card details
    await checkoutPage.selectPaymentMethod('Credit Card');
    await checkoutPage.fillCardDetails(paymentCard);
  });
});

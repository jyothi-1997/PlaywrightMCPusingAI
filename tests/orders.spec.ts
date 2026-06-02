import { test, expect } from '@playwright/test';
import { AuthPage } from '../pages/auth.page';
import { OrdersPage } from '../pages/orders.page';
import { loginUser } from '../testdata/userData';

test.describe('Order Management & History', () => {
  let authPage: AuthPage;
  let ordersPage: OrdersPage;

  test.beforeEach(async ({ page }) => {
    authPage = new AuthPage(page);
    ordersPage = new OrdersPage(page);
  });

  test('View Order History', async () => {
    // 1. Login to account
    await authPage.gotoLogin();
    await authPage.login(loginUser.email, loginUser.password);

    // 2. Navigate to order history
    await ordersPage.gotoOrderHistory();

    // 3. Verify past orders are listed
    await ordersPage.expectOrderHistoryVisible();
  });

  test('Cancel Order - Before Shipment', async () => {
    // 1. Login and view order history
    await authPage.gotoLogin();
    await authPage.login(loginUser.email, loginUser.password);
    await ordersPage.gotoOrderHistory();

    // 2. Open a recent order and cancel it if possible
    await ordersPage.openFirstOrderDetails();
    await expect(ordersPage.cancelOrderButton.first()).toBeVisible();
    await ordersPage.cancelOrderButton.first().click();
    await expect(ordersPage.page.locator('text=Order cancelled, text=Cancelled')).toBeVisible();
  });

  test('Download Invoice', async () => {
    // 1. Login and view order history
    await authPage.gotoLogin();
    await authPage.login(loginUser.email, loginUser.password);
    await ordersPage.gotoOrderHistory();

    // 2. Open order details and download invoice
    await ordersPage.openFirstOrderDetails();
    await expect(ordersPage.downloadInvoiceButton.first()).toBeVisible();
    await ordersPage.downloadInvoiceButton.first().click();
  });
});

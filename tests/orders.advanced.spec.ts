import { test, expect } from '@playwright/test';
import { AuthPage } from '../pages/auth.page';
import { OrdersPage } from '../pages/orders.page';
import { loginUser } from '../testdata/userData';

test.describe('Order Management Advanced Flows', () => {
  let authPage: AuthPage;
  let ordersPage: OrdersPage;

  test.beforeEach(async ({ page }) => {
    authPage = new AuthPage(page);
    ordersPage = new OrdersPage(page);
  });

  test('View Order Confirmation', async () => {
    await authPage.gotoLogin();
    await authPage.login(loginUser.email, loginUser.password);
    await ordersPage.gotoOrderHistory();
    await ordersPage.openFirstOrderDetails();
    await expect(ordersPage.page.locator('text=Order #')).toBeVisible();
  });

  test('Order Status - Pending', async () => {
    await authPage.gotoLogin();
    await authPage.login(loginUser.email, loginUser.password);
    await ordersPage.gotoOrderHistory();
    await expect(ordersPage.page.locator('text=Pending')).toBeVisible();
  });

  test.skip('Order Status - Shipped', async () => {
    await authPage.gotoLogin();
    await authPage.login(loginUser.email, loginUser.password);
    await ordersPage.gotoOrderHistory();
    await expect(ordersPage.page.locator('text=Shipped')).toBeVisible();
  });

  test.skip('Order Status - Delivered', async () => {
    await authPage.gotoLogin();
    await authPage.login(loginUser.email, loginUser.password);
    await ordersPage.gotoOrderHistory();
    await expect(ordersPage.page.locator('text=Delivered')).toBeVisible();
  });

  test('Cannot Cancel Order - After Shipment', async () => {
    await authPage.gotoLogin();
    await authPage.login(loginUser.email, loginUser.password);
    await ordersPage.gotoOrderHistory();
    await ordersPage.openFirstOrderDetails();
    await expect(ordersPage.cancelOrderButton.first()).not.toBeVisible();
  });

  test.skip('Return Order - Request Return', async () => {
    await authPage.gotoLogin();
    await authPage.login(loginUser.email, loginUser.password);
    await ordersPage.gotoOrderHistory();
    await ordersPage.openFirstOrderDetails();
    await ordersPage.returnRequestButton.first().click();
    await expect(ordersPage.page.locator('text=Return Requested')).toBeVisible();
  });
});

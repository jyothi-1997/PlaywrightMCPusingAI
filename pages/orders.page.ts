import { expect, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class OrdersPage extends BasePage {
  readonly orderRows;
  readonly orderDetailsButton;
  readonly downloadInvoiceButton;
  readonly cancelOrderButton;
  readonly returnRequestButton;

  constructor(page: Page) {
    super(page);
    this.orderRows = page.locator('.order-row, .order-item, .order-list-item');
    this.orderDetailsButton = page.locator('button:has-text("Details"), button:has-text("View Order")');
    this.downloadInvoiceButton = page.locator('button:has-text("Download Invoice"), button:has-text("Download PDF")');
    this.cancelOrderButton = page.locator('button:has-text("Cancel Order")');
    this.returnRequestButton = page.locator('button:has-text("Return"), button:has-text("Return Request")');
  }

  async gotoOrderHistory() {
    await this.goto('https://rahulshettyacademy.com/client/#/orders');
    await this.expectUrlContains('/orders');
  }

  async expectOrderHistoryVisible() {
    await expect(this.orderRows.first()).toBeVisible();
  }

  async openFirstOrderDetails() {
    await this.orderDetailsButton.first().click();
  }
}

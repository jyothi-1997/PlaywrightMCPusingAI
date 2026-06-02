import { expect, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class CartPage extends BasePage {
  readonly cartItems;
  readonly cartCount;
  readonly removeButtons;
  readonly quantityInputs;
  readonly emptyCartButton;
  readonly checkoutButton;

  constructor(page: Page) {
    super(page);
    this.cartItems = page.locator('.cart-item, .cart-row, .cart-list-item');
    this.cartCount = page.locator('.cart-count, .cart-badge, [aria-label="cart count"]');
    this.removeButtons = page.locator('button:has-text("Remove"), button:has-text("Delete")');
    this.quantityInputs = page.locator('input[type="number"], input[aria-label*="quantity"]');
    this.emptyCartButton = page.locator('button:has-text("Clear Cart"), button:has-text("Empty Cart")');
    this.checkoutButton = page.locator('button:has-text("Proceed to Checkout"), button:has-text("Checkout")');
  }

  async gotoCart() {
    await this.goto('https://rahulshettyacademy.com/client/#/cart');
    await this.expectUrlContains('/cart');
  }

  async expectCartHasItems(minItems = 1) {
    await expect(this.cartItems).toHaveCount(minItems);
  }

  async removeFirstItem() {
    await this.removeButtons.first().click();
  }

  async updateQuantity(index: number, quantity: number) {
    await this.quantityInputs.nth(index).fill(quantity.toString());
    await this.quantityInputs.nth(index).press('Enter');
  }

  async clearCart() {
    await this.emptyCartButton.click();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }
}

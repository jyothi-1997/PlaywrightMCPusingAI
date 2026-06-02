import { expect, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class DashboardPage extends BasePage {
  readonly searchInput;
  readonly productCards;
  readonly cartIcon;
  readonly profileMenu;
  readonly noResultsMessage;

  constructor(page: Page) {
    super(page);
    this.searchInput = page.locator('input[placeholder*="Search"], input[type="search"], input[aria-label*="search"]');
    this.productCards = page.locator('.product-card, .card, .product');
    this.cartIcon = page.locator('button:has-text("Cart"), [aria-label*="cart"]');
    this.profileMenu = page.locator('button:has-text("Profile"), [aria-label*="account"]');
    this.noResultsMessage = page.locator('text=No products found, text=No results found, text=No products');
  }

  async expectDashboardVisible() {
    await expect(this.searchInput).toBeVisible();
    await expect(this.productCards.first()).toBeVisible();
    await expect(this.cartIcon).toBeVisible();
  }

  async searchProduct(term: string) {
    await this.searchInput.fill(term);
    await this.searchInput.press('Enter');
  }

  async addFirstProductToCart() {
    await this.page.locator('button:has-text("Add to Cart")').first().click();
  }

  async expectSearchResultsContain(term: string) {
    await expect(this.productCards.first()).toBeVisible();
    await expect(this.productCards.first()).toContainText(new RegExp(term, 'i'));
  }

  async expectNoSearchResults() {
    await expect(this.noResultsMessage).toBeVisible();
  }
}

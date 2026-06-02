import { expect, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class CheckoutPage extends BasePage {
  readonly street;
  readonly city;
  readonly state;
  readonly zip;
  readonly country;
  readonly paymentMethod;
  readonly cardNumber;
  readonly expiry;
  readonly cvv;
  readonly couponCode;
  readonly applyCouponButton;
  readonly placeOrderButton;
  readonly errorMessage;

  constructor(page: Page) {
    super(page);
    this.street = page.getByLabel(/street|address/i);
    this.city = page.getByLabel(/city/i);
    this.state = page.getByLabel(/state/i);
    this.zip = page.getByLabel(/zip|postal/i);
    this.country = page.getByLabel(/country/i);
    this.paymentMethod = page.locator('input[type="radio"], select[name*="payment"], [aria-label*="payment"]');
    this.cardNumber = page.getByLabel(/card number/i);
    this.expiry = page.getByLabel(/expiry|expiration/i);
    this.cvv = page.getByLabel(/cvv|cvc/i);
    this.couponCode = page.getByLabel(/coupon|promo/i);
    this.applyCouponButton = page.locator('button:has-text("Apply")');
    this.placeOrderButton = page.locator('button:has-text("Place Order"), button:has-text("Pay")');
    this.errorMessage = page.locator('[role="alert"], .error, .validation-error');
  }

  async expectCheckoutVisible() {
    await expect(this.street).toBeVisible();
    await expect(this.placeOrderButton).toBeVisible();
  }

  async fillShippingAddress(address: { street: string; city: string; state: string; zip: string; country: string }) {
    await this.street.fill(address.street);
    await this.city.fill(address.city);
    await this.state.fill(address.state);
    await this.zip.fill(address.zip);
    await this.country.fill(address.country);
  }

  async selectPaymentMethod(name: string) {
    await this.page.locator(`label:has-text("${name}")`).first().click();
  }

  async fillCardDetails(card: { number: string; expiry: string; cvv: string }) {
    await this.cardNumber.fill(card.number);
    await this.expiry.fill(card.expiry);
    await this.cvv.fill(card.cvv);
  }

  async applyCoupon(code: string) {
    await this.couponCode.fill(code);
    await this.applyCouponButton.click();
  }

  async placeOrder() {
    await this.placeOrderButton.click();
  }

  async expectErrorMessage(text: string) {
    await expect(this.errorMessage).toContainText(text);
  }
}

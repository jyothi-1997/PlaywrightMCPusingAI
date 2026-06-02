import { expect, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class ProfilePage extends BasePage {
  readonly editPhoneButton;
  readonly phoneField;
  readonly saveProfileButton;
  readonly addressField;
  readonly logoutButton;

  constructor(page: Page) {
    super(page);
    this.editPhoneButton = page.locator('button:has-text("Edit"), button:has-text("Edit Phone")');
    this.phoneField = page.getByLabel(/phone/i);
    this.saveProfileButton = page.locator('button:has-text("Save"), button:has-text("Save Profile")');
    this.addressField = page.getByLabel(/address/i);
    this.logoutButton = page.locator('button:has-text("Logout"), button:has-text("Sign Out")');
  }

  async gotoProfile() {
    await this.goto('https://rahulshettyacademy.com/client/#/profile');
    await expect(this.phoneField).toBeVisible();
  }

  async updatePhone(phone: string) {
    await this.editPhoneButton.click();
    await this.phoneField.fill(phone);
    await this.saveProfileButton.click();
  }

  async logout() {
    await this.logoutButton.click();
  }
}

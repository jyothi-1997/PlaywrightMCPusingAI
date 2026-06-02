import { expect, Page } from '@playwright/test';
import { BasePage } from './base.page';

export type RegisterUser = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  occupation: string;
  gender: 'Male' | 'Female' | 'Other';
  password: string;
  confirmPassword: string;
};

export class AuthPage extends BasePage {
  readonly firstName;
  readonly lastName;
  readonly email;
  readonly phone;
  readonly occupation;
  readonly genderMale;
  readonly genderFemale;
  readonly password;
  readonly confirmPassword;
  readonly ageCheckbox;
  readonly registerButton;
  readonly loginButton;
  readonly errorMessage;
  readonly successMessage;

  constructor(page: Page) {
    super(page);
    this.firstName = page.getByLabel(/first name/i);
    this.lastName = page.getByLabel(/last name/i);
    this.email = page.getByLabel(/email/i).first();
    this.phone = page.getByLabel(/phone/i);
    this.occupation = page.getByLabel(/occupation/i);
    this.genderMale = page.getByRole('radio', { name: /male/i });
    this.genderFemale = page.getByRole('radio', { name: /female/i });
    this.password = page.getByLabel(/^password$/i);
    this.confirmPassword = page.getByLabel(/confirm password/i);
    this.ageCheckbox = page.getByLabel(/18 year or older/i);
    this.registerButton = page.locator('button:has-text("Register"), button:has-text("Sign Up")');
    this.loginButton = page.locator('button:has-text("Login"), button:has-text("Sign In")');
    this.errorMessage = page.locator('[role="alert"], .error, .validation-error, .toast-error');
    this.successMessage = page.locator('text=successfully, text=registered, text=Welcome');
  }

  async gotoRegister() {
    await this.goto('https://rahulshettyacademy.com/client/#/auth/register');
    await expect(this.registerButton).toBeVisible();
  }

  async gotoLogin() {
    await this.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await expect(this.loginButton).toBeVisible();
  }

  async expectRegisterFormVisible() {
    await expect(this.firstName).toBeVisible();
    await expect(this.lastName).toBeVisible();
    await expect(this.email).toBeVisible();
    await expect(this.phone).toBeVisible();
    await expect(this.occupation).toBeVisible();
    await expect(this.password).toBeVisible();
    await expect(this.confirmPassword).toBeVisible();
    await expect(this.registerButton).toBeEnabled();
  }

  async expectLoginFormVisible() {
    await expect(this.email).toBeVisible();
    await expect(this.password).toBeVisible();
    await expect(this.loginButton).toBeEnabled();
  }

  async register(user: RegisterUser) {
    await this.firstName.fill(user.firstName);
    await this.lastName.fill(user.lastName);
    await this.email.fill(user.email);
    await this.phone.fill(user.phone);
    await this.occupation.selectOption({ label: user.occupation }).catch(async () => {
      await this.occupation.fill(user.occupation);
    });

    if (user.gender === 'Male') {
      await this.genderMale.check();
    } else if (user.gender === 'Female') {
      await this.genderFemale.check();
    }

    await this.password.fill(user.password);
    await this.confirmPassword.fill(user.confirmPassword);
    await this.ageCheckbox.check();
    await this.registerButton.click();
  }

  async login(email: string, password: string) {
    await this.email.fill(email);
    await this.password.fill(password);
    await this.loginButton.click();
  }

  async expectRegistrationSuccess() {
    await expect(this.successMessage).toBeVisible();
  }

  async expectLoginSuccess() {
    await expect(this.page.locator('button:has-text("Logout"), text=Dashboard, text=Welcome')).toBeVisible();
  }

  async expectErrorMessage(text: string) {
    await expect(this.errorMessage).toContainText(text);
  }
}

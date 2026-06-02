import { test, expect } from '@playwright/test';
import { AuthPage } from '../pages/auth.page';
import { loginUser, registerUser, invalidEmailUser, wrongPasswordUser, existingEmailUser } from '../testdata/userData';

test.describe('Authentication Negative Flows', () => {
  let authPage: AuthPage;

  test.beforeEach(async ({ page }) => {
    authPage = new AuthPage(page);
  });

  test('User Registration - Passwords Do Not Match', async () => {
    await authPage.gotoRegister();
    await authPage.register({ ...registerUser, confirmPassword: 'DifferentPass@123' });
    await authPage.expectErrorMessage('Password and confirm password do not match');
  });

  test('User Registration - Missing Required Fields', async () => {
    await authPage.gotoRegister();
    await authPage.firstName.fill(registerUser.firstName);
    await authPage.lastName.fill(registerUser.lastName);
    await authPage.registerButton.click();
    await authPage.expectErrorMessage('required');
  });

  test('User Registration - Age Checkbox Not Checked', async () => {
    await authPage.gotoRegister();
    await authPage.firstName.fill(registerUser.firstName);
    await authPage.lastName.fill(registerUser.lastName);
    await authPage.email.fill(registerUser.email);
    await authPage.phone.fill(registerUser.phone);
    await authPage.occupation.selectOption({ label: registerUser.occupation }).catch(async () => {
      await authPage.occupation.fill(registerUser.occupation);
    });
    await authPage.genderMale.check();
    await authPage.password.fill(registerUser.password);
    await authPage.confirmPassword.fill(registerUser.confirmPassword);
    await authPage.registerButton.click();
    await authPage.expectErrorMessage('18 years or older');
  });

  test('User Registration - Duplicate Email', async () => {
    await authPage.gotoRegister();
    await authPage.register({ ...registerUser, email: existingEmailUser.email });
    await authPage.expectErrorMessage('already registered');
  });

  test('User Registration - Phone Number with Invalid Format', async () => {
    await authPage.gotoRegister();
    await authPage.register({ ...registerUser, phone: 'ABCD1234' });
    await authPage.expectErrorMessage('invalid phone');
  });

  test('User Login - Empty Email Field', async () => {
    await authPage.gotoLogin();
    await authPage.password.fill(loginUser.password);
    await authPage.loginButton.click();
    await authPage.expectErrorMessage('Email is required');
  });

  test('User Login - Empty Password Field', async () => {
    await authPage.gotoLogin();
    await authPage.email.fill(loginUser.email);
    await authPage.loginButton.click();
    await authPage.expectErrorMessage('Password is required');
  });

  test('User Login - Case Sensitivity in Email', async () => {
    await authPage.gotoLogin();
    await authPage.login(loginUser.email.toUpperCase(), loginUser.password);
    await authPage.expectLoginSuccess();
  });

  test('Forgot Password - Email Submission', async () => {
    await authPage.gotoLogin();
    await authPage.page.getByRole('link', { name: /forgot password/i }).click();
    await expect(authPage.page.getByLabel(/email/i)).toBeVisible();
    await authPage.email.fill(loginUser.email);
    await authPage.page.getByRole('button', { name: /send reset link|submit|send/i }).click();
    await expect(authPage.page.locator('text=Check your email for reset link, text=reset link')).toBeVisible();
  });
});

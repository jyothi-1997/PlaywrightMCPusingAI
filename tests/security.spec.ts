import { test, expect } from '@playwright/test';
import { AuthPage } from '../pages/auth.page';
import { registerUser } from '../testdata/userData';

test.describe('Security & Validation', () => {
  let authPage: AuthPage;

  test.beforeEach(async ({ page }) => {
    authPage = new AuthPage(page);
  });

  test('HTTPS Security', async ({ page }) => {
    // 1. Navigate to application URL
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');

    // 2. Verify HTTPS protocol is used
    await expect(page).toHaveURL(/https:\/\/rahulshettyacademy\.com\/client\/#\/auth\/login/);
  });

  test('Password Strength Validation', async () => {
    // 1. Navigate to registration page
    await authPage.gotoRegister();

    // 2. Enter weak password and verify strength indicator
    await authPage.password.fill('password');
    await expect(authPage.page.locator('text=Weak, text=weak password, text=Too weak')).toBeVisible();

    // 3. Enter strong password and verify strength indicator
    await authPage.password.fill('Str0ng!P@ss');
    await expect(authPage.page.locator('text=Strong, text=strong password')).toBeVisible();
  });

  test('Cross-Site Scripting (XSS) Protection', async () => {
    // 1. Navigate to registration page
    await authPage.gotoRegister();

    // 2. Enter XSS payload in first name
    await authPage.firstName.fill('<script>alert("XSS")</script>');
    await authPage.lastName.fill(registerUser.lastName);
    await authPage.email.fill('xss.test.user@gmail.com');
    await authPage.phone.fill(registerUser.phone);
    await authPage.occupation.selectOption({ label: registerUser.occupation }).catch(async () => {
      await authPage.occupation.fill(registerUser.occupation);
    });
    await authPage.genderMale.check();
    await authPage.password.fill(registerUser.password);
    await authPage.confirmPassword.fill(registerUser.confirmPassword);
    await authPage.ageCheckbox.check();
    await authPage.registerButton.click();

    // 3. Verify script was not executed as an alert
    await expect(authPage.page.locator('text=alert("XSS")')).not.toBeVisible();
  });
});

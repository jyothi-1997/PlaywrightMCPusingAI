import { test, expect } from '@playwright/test';
import { AuthPage } from '../pages/auth.page';
import { loginUser, registerUser, invalidEmailUser, wrongPasswordUser } from '../testdata/userData';

test.describe('Authentication & Registration', () => {
  let authPage: AuthPage;

  test.beforeEach(async ({ page }) => {
    authPage = new AuthPage(page);
  });

  test('User Registration - Positive Flow', async () => {
    // 1. Navigate to registration page
    await authPage.gotoRegister();
    await authPage.expectRegisterFormVisible();

    // 2-10. Fill valid registration data and agree to age checkbox
    await authPage.register(registerUser);

    // 11. Click Register button and verify registration success
    await authPage.expectRegistrationSuccess();
  });

  test('User Registration - Invalid Email Format', async () => {
    // 1. Navigate to registration page
    await authPage.gotoRegister();

    // 2-4. Fill the registration form with invalid email
    await authPage.register({ ...registerUser, email: invalidEmailUser.email });

    // 4. Click Register button and verify validation error
    await authPage.expectErrorMessage('Please enter valid email');
  });

  test('User Login - Positive Flow', async () => {
    // 1. Navigate to login page
    await authPage.gotoLogin();
    await authPage.expectLoginFormVisible();

    // 2-4. Enter valid credentials and login
    await authPage.login(loginUser.email, loginUser.password);

    // 4. Verify user is redirected to dashboard or sees logout option
    await authPage.expectLoginSuccess();
  });

  test('User Login - Invalid Email', async () => {
    // 1. Navigate to login page
    await authPage.gotoLogin();

    // 2-4. Use non-existent email and any password
    await authPage.login(invalidEmailUser.email, wrongPasswordUser.password);

    // 4. Verify login failure error message
    await authPage.expectErrorMessage('Invalid email or password');
  });

  test('User Login - Wrong Password', async () => {
    // 1. Navigate to login page
    await authPage.gotoLogin();

    // 2-4. Enter valid email with wrong password
    await authPage.login(loginUser.email, wrongPasswordUser.password);

    // 4. Verify login failure error message
    await authPage.expectErrorMessage('Invalid email or password');
  });
});

import { test, expect } from '@playwright/test';
import { AuthPage } from '../pages/auth.page';
import { loginUser } from '../testdata/userData';

test.describe('Security Advanced Flows', () => {
  let authPage: AuthPage;

  test.beforeEach(async ({ page }) => {
    authPage = new AuthPage(page);
  });

  test.skip('Session Timeout', async ({ page }) => {
    // This test is skipped because session timeout validation requires a long inactivity wait.
    await authPage.gotoLogin();
    await authPage.login(loginUser.email, loginUser.password);
    // In a real environment, wait for the configured timeout window and verify redirection.
  });
});

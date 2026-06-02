import { test, expect } from '@playwright/test';
import { AuthPage } from '../pages/auth.page';
import { ProfilePage } from '../pages/profile.page';
import { loginUser } from '../testdata/userData';

test.describe('Profile Advanced Flows', () => {
  let authPage: AuthPage;
  let profilePage: ProfilePage;

  test.beforeEach(async ({ page }) => {
    authPage = new AuthPage(page);
    profilePage = new ProfilePage(page);
  });

  test('Change Password', async () => {
    await authPage.gotoLogin();
    await authPage.login(loginUser.email, loginUser.password);
    await profilePage.gotoProfile();
    await profilePage.page.getByRole('button', { name: /change password/i }).click();
    await profilePage.page.getByLabel(/current password/i).fill(loginUser.password);
    await profilePage.page.getByLabel(/new password/i).fill('NewPass@456');
    await profilePage.page.getByLabel(/confirm password/i).fill('NewPass@456');
    await profilePage.page.getByRole('button', { name: /update password/i }).click();
    await expect(profilePage.page.locator('text=Password changed successfully, text=success')).toBeVisible();
  });

  test('Change Password - Wrong Current Password', async () => {
    await authPage.gotoLogin();
    await authPage.login(loginUser.email, loginUser.password);
    await profilePage.gotoProfile();
    await profilePage.page.getByRole('button', { name: /change password/i }).click();
    await profilePage.page.getByLabel(/current password/i).fill('WrongPass@123');
    await profilePage.page.getByLabel(/new password/i).fill('NewPass@456');
    await profilePage.page.getByLabel(/confirm password/i).fill('NewPass@456');
    await profilePage.page.getByRole('button', { name: /update password/i }).click();
    await expect(profilePage.page.locator('text=Current password is incorrect, text=incorrect')).toBeVisible();
  });

  test('Add Alternative Address', async () => {
    await authPage.gotoLogin();
    await authPage.login(loginUser.email, loginUser.password);
    await profilePage.gotoProfile();
    await profilePage.page.getByRole('button', { name: /add new address/i }).click();
    await profilePage.page.getByLabel(/address/i).fill('456 Oak Avenue, Los Angeles, CA 90001');
    await profilePage.page.getByRole('button', { name: /save address/i }).click();
    await expect(profilePage.page.locator('text=456 Oak Avenue, Los Angeles, CA 90001')).toBeVisible();
  });

  test('Delete Address', async () => {
    await authPage.gotoLogin();
    await authPage.login(loginUser.email, loginUser.password);
    await profilePage.gotoProfile();
    await profilePage.page.getByRole('button', { name: /delete/i }).first().click();
    await profilePage.page.getByRole('button', { name: /confirm|yes/i }).click();
    await expect(profilePage.page.locator('text=Address deleted, text=deleted')).toBeVisible();
  });

  test('Logout', async () => {
    await authPage.gotoLogin();
    await authPage.login(loginUser.email, loginUser.password);
    await profilePage.logout();
    await expect(profilePage.page).toHaveURL(/\/auth\/login/);
  });
});

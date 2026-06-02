import { test, expect } from '@playwright/test';
import { AuthPage } from '../pages/auth.page';
import { ProfilePage } from '../pages/profile.page';
import { loginUser } from '../testdata/userData';

test.describe('Profile & Account Management', () => {
  let authPage: AuthPage;
  let profilePage: ProfilePage;

  test.beforeEach(async ({ page }) => {
    authPage = new AuthPage(page);
    profilePage = new ProfilePage(page);
  });

  test('View Profile Information', async () => {
    // 1. Login and navigate to profile
    await authPage.gotoLogin();
    await authPage.login(loginUser.email, loginUser.password);
    await profilePage.gotoProfile();

    // Verify profile fields are visible
    await expect(profilePage.phoneField).toBeVisible();
    await expect(profilePage.addressField).toBeVisible();
  });

  test('Edit Profile - Change Phone Number', async () => {
    // 1. Login and go to profile
    await authPage.gotoLogin();
    await authPage.login(loginUser.email, loginUser.password);
    await profilePage.gotoProfile();

    // 2. Update the phone number
    await profilePage.updatePhone('9988776655');
  });
});

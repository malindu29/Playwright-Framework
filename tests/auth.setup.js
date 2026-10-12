const { test: setup } = require('@playwright/test');
const { LoginPage } = require('../pages/login.page');

const authFile = 'playwright/.auth/user.json';

setup('authenticate standard user', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.loginAsStandardUser();
  await page.waitForURL('**/inventory.html');
  await page.context().storageState({ path: authFile });
});

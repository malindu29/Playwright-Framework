const { test, expect } = require('../fixtures/test.fixture');

test.describe('Login', { tag: '@smoke' }, () => {
  test('allows a standard user to sign in', async ({ page, loginPage }) => {
    await page.goto('/');
    await loginPage.loginAsStandardUser();
    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.getByTestId('title')).toHaveText('Products');
  });

  test('shows an error for locked out users', async ({ page, loginPage }) => {
    await page.goto('/');
    await loginPage.login('locked_out_user', process.env.SAUCE_PASSWORD || 'secret_sauce');
    await expect(loginPage.errorMessage).toContainText('locked out');
  });
});

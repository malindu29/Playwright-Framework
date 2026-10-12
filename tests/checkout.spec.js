const { test, expect } = require('../fixtures/test.fixture');

test.describe('Checkout', { tag: '@smoke' }, () => {
  test('completes an order', async ({ page, inventoryPage, cartPage, checkoutPage }) => {
    await page.goto('/inventory.html');
    await inventoryPage.addProduct('Sauce Labs Backpack');
    await inventoryPage.openCart();
    await cartPage.checkout();
    await checkoutPage.completeCustomerDetails('Playwright', 'Tester', '10001');
    await expect(page.getByTestId('total-label')).toContainText('Total');
    await checkoutPage.finishOrder();
    await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
  });
});

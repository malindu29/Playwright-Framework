const { test, expect } = require('../fixtures/test.fixture');

test.describe('Cart', { tag: '@regression' }, () => {
  test('adds and removes a product without logging in again', async ({
    page,
    inventoryPage,
    cartPage
  }) => {
    await page.goto('/inventory.html');
    await inventoryPage.addProduct('Sauce Labs Backpack');
    await expect(inventoryPage.cartBadge).toHaveText('1');
    await inventoryPage.openCart();
    await expect(cartPage.item('Sauce Labs Backpack')).toBeVisible();
    await cartPage.removeProduct('Sauce Labs Backpack');
    await expect(cartPage.item('Sauce Labs Backpack')).toHaveCount(0);
  });
});

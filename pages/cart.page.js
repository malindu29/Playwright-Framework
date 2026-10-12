class CartPage {
  constructor(page) {
    this.page = page;
    this.cartItems = page.getByTestId('inventory-item');
    this.checkoutButton = page.getByTestId('checkout');
    this.continueShoppingButton = page.getByTestId('continue-shopping');
  }

  item(name) {
    return this.page.locator('.cart_item').filter({ hasText: name });
  }

  async removeProduct(name) {
    await this.item(name).getByRole('button', { name: /remove/i }).click();
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}

module.exports = { CartPage };

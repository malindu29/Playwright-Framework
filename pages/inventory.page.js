class InventoryPage {
  constructor(page) {
    this.page = page;
    this.inventoryList = page.getByTestId('inventory-list');
    this.cartLink = page.getByTestId('shopping-cart-link');
    this.cartBadge = page.getByTestId('shopping-cart-badge');
  }

  product(name) {
    return this.page.locator('.inventory_item').filter({ hasText: name });
  }

  async addProduct(name) {
    await this.product(name).getByRole('button', { name: /add to cart/i }).click();
  }

  async openCart() {
    await this.cartLink.click();
  }
}

module.exports = { InventoryPage };

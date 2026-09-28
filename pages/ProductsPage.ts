import { expect, Locator, Page } from '@playwright/test';

export class ProductsPage {
  readonly inventoryItems: Locator;
  readonly cartBadge: Locator;

  constructor(private readonly page: Page) {
    this.inventoryItems = page.locator('.inventory_item');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/inventory\.html/);
    await expect(this.page.getByText('Products', { exact: true })).toBeVisible();
    await expect(this.inventoryItems).toHaveCount(6);
  }

  private productCard(name: string): Locator {
    return this.inventoryItems.filter({ hasText: name });
  }

  async addProduct(name: string): Promise<void> {
    await this.productCard(name).getByRole('button', { name: 'Add to cart' }).click();
  }

  async openProduct(name: string): Promise<void> {
    await this.productCard(name).getByText(name, { exact: true }).click();
  }

  async openCart(): Promise<void> {
    await this.page.locator('[data-test="shopping-cart-link"]').click();
  }

  async selectSort(value: 'lohi' | 'hilo'): Promise<void> {
    await this.page.locator('[data-test="product-sort-container"]').selectOption(value);
  }

  async prices(): Promise<number[]> {
    const values = await this.page.locator('.inventory_item_price').allTextContents();
    return values.map((value) => Number(value.replace('$', '')));
  }

  async openMenu(): Promise<void> {
    await this.page.getByRole('button', { name: 'Open Menu' }).click();
  }
}

import { expect, Locator, Page } from '@playwright/test';

export class CartPage {
  readonly items: Locator;

  constructor(private readonly page: Page) {
    this.items = page.locator('.cart_item');
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/cart\.html/);
    await expect(this.page.getByText('Your Cart', { exact: true })).toBeVisible();
  }

  private item(name: string): Locator {
    return this.items.filter({ hasText: name });
  }

  async expectProduct(name: string): Promise<void> {
    await expect(this.item(name)).toBeVisible();
  }

  async removeProduct(name: string): Promise<void> {
    await this.item(name).getByRole('button', { name: 'Remove' }).click();
  }

  async checkout(): Promise<void> {
    await this.page.getByRole('button', { name: 'Checkout' }).click();
  }

  async continueShopping(): Promise<void> {
    await this.page.getByRole('button', { name: 'Continue Shopping' }).click();
  }
}

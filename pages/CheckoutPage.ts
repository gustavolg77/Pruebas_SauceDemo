import { expect, Page } from '@playwright/test';

export class CheckoutPage {
  constructor(private readonly page: Page) {}

  async expectInformationStep(): Promise<void> {
    await expect(this.page).toHaveURL(/checkout-step-one\.html/);
    await expect(this.page.getByText('Checkout: Your Information', { exact: true })).toBeVisible();
  }

  async continueWith(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.page.getByPlaceholder('First Name').fill(firstName);
    await this.page.getByPlaceholder('Last Name').fill(lastName);
    await this.page.getByPlaceholder('Zip/Postal Code').fill(postalCode);
    await this.page.getByRole('button', { name: 'Continue' }).click();
  }

  async continueEmpty(): Promise<void> {
    await this.page.getByRole('button', { name: 'Continue' }).click();
  }

  async expectError(message: string): Promise<void> {
    await expect(this.page.locator('[data-test="error"]')).toHaveText(message);
  }

  async expectOverview(): Promise<void> {
    await expect(this.page).toHaveURL(/checkout-step-two\.html/);
    await expect(this.page.getByText('Checkout: Overview', { exact: true })).toBeVisible();
  }

  async finish(): Promise<void> {
    await this.page.getByRole('button', { name: 'Finish' }).click();
  }

  async expectConfirmation(): Promise<void> {
    await expect(this.page).toHaveURL(/checkout-complete\.html/);
    await expect(this.page.getByText('Thank you for your order!', { exact: true })).toBeVisible();
  }
}

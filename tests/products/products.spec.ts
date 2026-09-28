import { expect, Page, test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';
import { CartPage } from '../../pages/CartPage';
import { products, users } from '../../utils/test-data';

async function loginAsStandardUser(page: Page): Promise<void> {
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.login(users.standard.username, users.standard.password);
}

test('TC-SD-003: agregar un producto al carrito desde la lista', async ({ page }) => {
  await loginAsStandardUser(page);
  const productsPage = new ProductsPage(page);
  await productsPage.expectLoaded();
  await productsPage.addProduct(products.backpack);

  await expect(productsPage.cartBadge).toHaveText('1');
  await productsPage.openCart();
  await new CartPage(page).expectProduct(products.backpack);
});

test('TC-SD-006: ordenar productos por precio ascendente', async ({ page }) => {
  await loginAsStandardUser(page);
  const productsPage = new ProductsPage(page);
  await productsPage.expectLoaded();
  await productsPage.selectSort('lohi');

  const prices = await productsPage.prices();
  expect(prices).toEqual([...prices].sort((a, b) => a - b));
});

test('TC-SD-007: ordenar productos por precio descendente', async ({ page }) => {
  await loginAsStandardUser(page);
  const productsPage = new ProductsPage(page);
  await productsPage.expectLoaded();
  await productsPage.selectSort('hilo');

  const prices = await productsPage.prices();
  expect(prices).toEqual([...prices].sort((a, b) => b - a));
});

test('TC-SD-008: visualizar el detalle de un producto', async ({ page }) => {
  await loginAsStandardUser(page);
  const productsPage = new ProductsPage(page);
  await productsPage.expectLoaded();
  await productsPage.openProduct(products.backpack);

  await expect(page).toHaveURL(/inventory-item\.html/);
  await expect(page.locator('.inventory_details_name')).toHaveText(products.backpack);
  await expect(page.locator('.inventory_details_price')).toBeVisible();
});

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

test('TC-SD-004: eliminar un producto del carrito', async ({ page }) => {
  await loginAsStandardUser(page);
  const productsPage = new ProductsPage(page);
  await productsPage.expectLoaded();
  await productsPage.addProduct(products.backpack);
  await productsPage.openCart();

  const cartPage = new CartPage(page);
  await cartPage.expectLoaded();
  await cartPage.expectProduct(products.backpack);
  await cartPage.removeProduct(products.backpack);

  await expect(cartPage.items).toHaveCount(0);
  await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveCount(0);
});

test('TC-SD-010: actualizar el carrito al agregar varios productos', async ({ page }) => {
  await loginAsStandardUser(page);
  const productsPage = new ProductsPage(page);
  await productsPage.expectLoaded();
  await productsPage.addProduct(products.backpack);
  await productsPage.addProduct(products.bikeLight);

  await expect(productsPage.cartBadge).toHaveText('2');
  await productsPage.openCart();

  const cartPage = new CartPage(page);
  await cartPage.expectLoaded();
  await cartPage.expectProduct(products.backpack);
  await cartPage.expectProduct(products.bikeLight);
  await expect(cartPage.items).toHaveCount(2);
});

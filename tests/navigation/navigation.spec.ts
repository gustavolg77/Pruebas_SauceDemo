import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';
import { CartPage } from '../../pages/CartPage';
import { products, users } from '../../utils/test-data';

test('TC-SD-009: navegar entre producto, carrito e inventario', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.login(users.standard.username, users.standard.password);

  const productsPage = new ProductsPage(page);
  await productsPage.expectLoaded();
  await productsPage.openProduct(products.backpack);
  await expect(page.locator('.inventory_details_name')).toHaveText(products.backpack);

  await page.getByRole('button', { name: 'Back to products' }).click();
  await productsPage.expectLoaded();
  await productsPage.openCart();

  const cartPage = new CartPage(page);
  await cartPage.expectLoaded();
  await cartPage.continueShopping();
  await productsPage.expectLoaded();
});

test('TC-SD-012: cerrar sesión desde el menú de navegación', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.login(users.standard.username, users.standard.password);

  const productsPage = new ProductsPage(page);
  await productsPage.expectLoaded();
  await productsPage.openMenu();
  await page.getByText('Logout', { exact: true }).click();

  await expect(page).toHaveURL(/saucedemo\.com\/?$/);
  await loginPage.expectVisible();
});

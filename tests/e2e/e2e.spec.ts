import { expect, Page, test } from '@playwright/test';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';
import { checkoutData, products, users } from '../../utils/test-data';

async function loginAsStandardUser(page: Page): Promise<ProductsPage> {
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.login(users.standard.username, users.standard.password);

  const productsPage = new ProductsPage(page);
  await productsPage.expectLoaded();
  return productsPage;
}

test('E2E-01: completar una compra desde el login hasta la confirmación', async ({ page }) => {
  const productsPage = await loginAsStandardUser(page);
  await productsPage.addProduct(products.backpack);
  await expect(productsPage.cartBadge).toHaveText('1');

  await productsPage.openCart();
  const cartPage = new CartPage(page);
  await cartPage.expectLoaded();
  await cartPage.expectProduct(products.backpack);
  await cartPage.checkout();

  const checkoutPage = new CheckoutPage(page);
  await checkoutPage.expectInformationStep();
  await checkoutPage.continueWith(
    checkoutData.firstName,
    checkoutData.lastName,
    checkoutData.postalCode,
  );
  await checkoutPage.expectOverview();
  await checkoutPage.finish();
  await checkoutPage.expectConfirmation();
});

test('E2E-02: gestionar varios productos y ordenar el inventario', async ({ page }) => {
  const productsPage = await loginAsStandardUser(page);
  await productsPage.addProduct(products.backpack);
  await productsPage.addProduct(products.bikeLight);
  await expect(productsPage.cartBadge).toHaveText('2');

  await productsPage.openCart();
  const cartPage = new CartPage(page);
  await cartPage.expectLoaded();
  await cartPage.expectProduct(products.backpack);
  await cartPage.expectProduct(products.bikeLight);
  await cartPage.removeProduct(products.bikeLight);
  await expect(cartPage.items).toHaveCount(1);
  await cartPage.expectProduct(products.backpack);

  await cartPage.continueShopping();
  await productsPage.expectLoaded();
  await productsPage.selectSort('lohi');

  const prices = await productsPage.prices();
  expect(prices).toEqual([...prices].sort((a, b) => a - b));
});

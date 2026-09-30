import { expect, Page, test } from '@playwright/test';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';
import { checkoutData, products, users } from '../../utils/test-data';

test.beforeEach(async ({ page }) => {
  if (process.env.DEMO_MODE !== '1') {
    return;
  }

  await page.addInitScript(() => {
    document.addEventListener(
      'click',
      (event) => {
        const target = event.target;
        if (!(target instanceof HTMLElement)) {
          return;
        }

        const marker = document.createElement('div');
        const bounds = target.getBoundingClientRect();
        marker.style.position = 'fixed';
        marker.style.left = `${bounds.left + bounds.width / 2 - 18}px`;
        marker.style.top = `${bounds.top + bounds.height / 2 - 18}px`;
        marker.style.width = '36px';
        marker.style.height = '36px';
        marker.style.border = '4px solid #e11d48';
        marker.style.borderRadius = '50%';
        marker.style.boxSizing = 'border-box';
        marker.style.pointerEvents = 'none';
        marker.style.zIndex = '2147483647';
        marker.style.boxShadow = '0 0 0 5px rgba(225, 29, 72, 0.25)';
        marker.style.transition = 'opacity 300ms ease, transform 300ms ease';
        document.body?.appendChild(marker);

        window.setTimeout(() => {
          marker.style.opacity = '0';
          marker.style.transform = 'scale(1.35)';
        }, 450);
        window.setTimeout(() => marker.remove(), 800);
      },
      true,
    );
  });
});

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

test('E2E-03: validar acceso, navegacion y cierre de sesion', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.open();

  await loginPage.login(users.lockedOut.username, users.lockedOut.password);
  await expect(
    page.getByText('Epic sadface: Sorry, this user has been locked out.', { exact: true }),
  ).toBeVisible();

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
  await productsPage.openMenu();
  await page.getByText('Logout', { exact: true }).click();
  await loginPage.expectVisible();
});

import { Page, test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';
import { checkoutData, products, users } from '../../utils/test-data';

async function openCheckout(page: Page): Promise<CheckoutPage> {
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.login(users.standard.username, users.standard.password);

  const productsPage = new ProductsPage(page);
  await productsPage.expectLoaded();
  await productsPage.addProduct(products.backpack);
  await productsPage.openCart();

  const cartPage = new CartPage(page);
  await cartPage.expectLoaded();
  await cartPage.checkout();

  const checkoutPage = new CheckoutPage(page);
  await checkoutPage.expectInformationStep();
  return checkoutPage;
}

test('TC-SD-005: validar campos obligatorios del checkout', async ({ page }) => {
  const checkoutPage = await openCheckout(page);
  await checkoutPage.continueEmpty();
  await checkoutPage.expectError('Error: First Name is required');
});

test('TC-SD-011: finalizar una compra con información válida', async ({ page }) => {
  const checkoutPage = await openCheckout(page);
  await checkoutPage.continueWith(
    checkoutData.firstName,
    checkoutData.lastName,
    checkoutData.postalCode,
  );
  await checkoutPage.expectOverview();
  await checkoutPage.finish();
  await checkoutPage.expectConfirmation();
});

import { expect, test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { users } from '../../utils/test-data';

test('AUDIT-SD-001: problem_user debe mostrar una imagen distinta por producto', async ({ page }) => {
  test.fail(true, 'Defecto conocido: problem_user muestra la misma imagen para todos los productos.');

  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.login(users.problem.username, users.problem.password);

  const imageSources = await page.locator('.inventory_item img').evaluateAll((images) =>
    images.map((image) => image.getAttribute('src')),
  );

  expect(new Set(imageSources).size).toBe(imageSources.length);
});

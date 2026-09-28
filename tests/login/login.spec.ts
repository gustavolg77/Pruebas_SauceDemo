import { test, expect } from '@playwright/test';

test('TC-SD-001: iniciar sesión con credenciales válidas', async ({ page }) => {
  await page.goto('/');

  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL(/inventory\.html/);
  await expect(page.getByText('Products', { exact: true })).toBeVisible();
  await expect(page.locator('.inventory_list')).toBeVisible();
});

test('TC-SD-002: rechazar el acceso de un usuario bloqueado', async ({ page }) => {
  await page.goto('/');

  await page.getByPlaceholder('Username').fill('locked_out_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL(/saucedemo\.com\/?$/);
  await expect(
    page.getByText('Epic sadface: Sorry, this user has been locked out.', { exact: true }),
  ).toBeVisible();
  await expect(page.getByPlaceholder('Username')).toBeVisible();
});

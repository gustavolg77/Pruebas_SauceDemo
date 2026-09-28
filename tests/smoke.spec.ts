import { test, expect } from '@playwright/test';

test('SMOKE-SD-000: SauceDemo muestra el formulario de inicio de sesión', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle('Swag Labs');
  await expect(page).toHaveURL(/saucedemo\.com/);
  await expect(page.getByPlaceholder('Username')).toBeVisible();
  await expect(page.getByPlaceholder('Password')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
});

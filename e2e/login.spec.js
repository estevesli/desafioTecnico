import { test, expect } from "@playwright/test";
import login from "../helpers/commands";

test.describe("Login Page Test", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    await expect(page.locator("text=Swag Labs")).toBeVisible();
  });

  test("Login with valid credentials", async ({ page }) => {
    await login(page, "standard_user", "secret_sauce");
    await expect(page.locator("text=Products")).toBeVisible();
  });
  test("Login with invalid credentials", async ({ page }) => {
      await login(page, 'invalid_user', 'invalid_password');
      await expect(page.locator('[data-test="error"]')).toBeVisible();
  })
  test('Login with locked out user', async ({ page }) => {
    await login(page, 'locked_out_user', 'secret_sauce');
    await expect(page.locator("text=Epic sadface: Sorry, this user has been locked out.")).toBeVisible();
  })
  test('Login with no credentials', async ({ page }) => {
    await login(page, '', '');
    await expect(page.locator('[data-test="error"]')).toBeVisible();
  })
  test(('Logout'), async ({ page }) => {
    await login(page, 'standard_user', 'secret_sauce');
    await page.locator('.bm-burger-button').click();
    await page.locator('[data-test="logout-sidebar-link"]').click();
    await expect(page.locator('input[data-test="login-button"]')).toBeVisible();
    })

});

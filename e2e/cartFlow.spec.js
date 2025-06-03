import { test, expect } from "@playwright/test";
import {login, addToCart} from "../helpers/commands";

test.describe("Login Page Test", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    await login(page, "standard_user", "secret_sauce");
    await expect(page.locator("text=Products")).toBeVisible();
  });

  test('Add to cart', async ({ page }) => {
    await page.locator('[data-test="inventory-item-name"]', { hasText: 'Sauce Labs Backpack' }).click();
    const backButton = page.locator('[data-test="back-to-products"]');
    await backButton.waitFor({ state: 'visible', timeout: 5000 });
    await addToCart(page);
    await page.locator('input[data-test="back-to-products"]').click();
  })
});
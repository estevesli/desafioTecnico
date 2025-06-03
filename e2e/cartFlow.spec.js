import { test, expect } from "@playwright/test";
import {login} from "../helpers/commands";

test.describe("Login Page Test", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    await login(page, "standard_user", "secret_sauce");
    await expect(page.locator("text=Products")).toBeVisible();
  });

  test('Add to cart through product page', async ({ page }) => {
    await page.locator('[data-test="inventory-item-name"]', { hasText: 'Sauce Labs Backpack' }).click();
    const backButton = page.locator('[data-test="back-to-products"]');
    await backButton.waitFor({ state: 'visible', timeout: 5000 });
    await page.locator('button[data-test="add-to-cart"]').click();
    await page.locator('input[data-test="back-to-products"]').click();
    await expect(page.locator("text=Products")).toBeVisible();
  })
  
});
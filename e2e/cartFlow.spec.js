import { test, expect } from "@playwright/test";
import {login, checkoutInformation} from "../helpers/commands";

test.describe("Login Page Test", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    await login(page, "standard_user", "secret_sauce");
    await expect(page.locator("text=Products")).toBeVisible();
  });
  
  test('Goes back to product list', async ({ page }) => {
    await page.locator('[data-test="inventory-item-name"]', { hasText: 'Sauce Labs Bike Lights' }).click();
    const backButton = page.locator('[data-test="back-to-products"]');
    await backButton.waitFor({ state: 'visible', timeout: 5000 });
    await page.locator('input[data-test="back-to-products"]').click();
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
  test('Add to cart through product list', async ({ page }) => {
    await page.locator('button[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
    await expect(page.locator('text=1')).toBeVisible();
  });
    test('Remove from cart', async ({ page }) => {
    await page.locator('button[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('button[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    const cartPage = page.locator('text=QTY');
    await cartPage.waitFor({ state: 'visible', timeout: 5000 });
    await page.locator('button[data-test="remove-sauce-labs-backpack"]').click();
    await expect(page.locator('text=Sauce Labs Backpack')).toHaveCount(0);
});
test('Checkout with valid credentials',async ({ page }) => {
    await page.locator('[data-test="shopping-cart-link"]').click();
    const cartPage = page.locator('text=QTY');
    await cartPage.waitFor({ state: 'visible', timeout: 5000 });
    await page.locator('[data-test="checkout"]').click();
    await checkoutInformation(page, 'Lívia', 'Santos', '04916000');
    await page.locator('[data-test="continue"]').click();
    await expect (page.locator('text=Payment Information')).toBeVisible();
});
test('Checkout with no credentials', async ({ page }) => {
    await page.locator('[data-test="shopping-cart-link"]').click();
    const cartPage = page.locator('text=QTY');
    await cartPage.waitFor({ state: 'visible', timeout: 5000 });
    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="continue"]').click();
    await expect(page.locator('[data-test="error"]')).toBeVisible();
});
});
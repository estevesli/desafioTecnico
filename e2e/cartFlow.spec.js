import { test, expect } from "@playwright/test";
import commands from "../helpers/commands";

test.describe("Login Page Test", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    await commands.login(page, "standard_user", "secret_sauce");
    await expect(page.locator("text=Products")).toBeVisible();
  });

  test("Goes back to product list", async ({ page }) => {
    await page.locator('[data-test="inventory-item-name"]', {hasText: "Sauce Labs Bike Light",}).click();
    const backButton = page.locator('[data-test="back-to-products"]');
    await backButton.waitFor({ state: "visible", timeout: 5000 });
    await page.locator(".bm-burger-button").click();
    await page.locator('[data-test="inventory-sidebar-link"]').click();
    await expect(page.locator("text=Products")).toBeVisible();
  });

  test("Add to cart through product page", async ({ page }) => {
    await page.locator('[data-test="inventory-item-name"]', {hasText: "Sauce Labs Backpack",}).click();
    const backButton = page.locator('[data-test="back-to-products"]');
    await backButton.waitFor({ state: "visible", timeout: 2000 });
    await page.locator('button[data-test="add-to-cart"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page.locator('text=Sauce Labs Backpack').first()).toBeVisible();
  });

  test("Add to cart through product list", async ({ page }) => {
    await page.locator('button[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page.locator('text=Sauce Labs Bolt T-Shirt').first()).toBeVisible();
  });

  test("Remove from cart", async ({ page }) => {
    const cartScreen = page.locator("text=QTY");
    await page.locator('button[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await cartScreen.waitFor({ state: "visible", timeout: 2000 });
    await page.locator('button[data-test="remove-sauce-labs-backpack"]').click();
    await expect(page.locator("text=Sauce Labs Backpack")).not.toBeVisible();
  });

  test("Checkout with valid credentials", async ({ page }) => {
    const cartScreen= page.locator("text=QTY");
    const checkoutScreen= page.locator('text=Your Information');
    await page.locator('[data-test="shopping-cart-link"]').click();
    await cartScreen.waitFor({ state: "visible", timeout: 2000 });
    await page.locator('button[data-test="checkout"]').click();
    await checkoutScreen.waitFor({ state: 'visible', timeout: 2000 });
    await commands.checkoutInformation(page, "Lívia", "Santos", "04916000");
    await expect(page.locator("text=Payment Information")).toBeVisible();
  });

  test("Checkout with no credentials", async ({ page }) => {
    const cartScreen = page.locator("text=QTY");
    const checkoutScreen= page.locator('text=Your Information');
    await page.locator('[data-test="shopping-cart-link"]').click();
    await cartScreen.waitFor({ state: "visible", timeout: 2000 });
    await page.locator('button[data-test="checkout"]').click();
    await checkoutScreen.waitFor({ state: 'visible', timeout: 2000 });
    await page.locator('[data-test="continue"]').click();
    await expect(page.locator('[data-test="error"]')).toBeVisible();
  });
});

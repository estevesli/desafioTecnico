# Test info

- Name: Login Page Test >> Checkout with valid credentials
- Location: /home/agatha/Downloads/desafioTecnico/e2e/cartFlow.spec.js:42:7

# Error details

```
Error: locator.click: Test ended.
Call log:
  - waiting for locator('[data-test="continue"]')

    at /home/agatha/Downloads/desafioTecnico/e2e/cartFlow.spec.js:48:50
```

# Test source

```ts
   1 | import { test, expect } from "@playwright/test";
   2 | import commands from "../helpers/commands";
   3 |
   4 | test.describe("Login Page Test", () => {
   5 |   test.beforeEach(async ({ page }) => {
   6 |     await page.goto("https://www.saucedemo.com/");
   7 |     await commands.login(page, "standard_user", "secret_sauce");
   8 |     await expect(page.locator("text=Products")).toBeVisible();
   9 |   });
  10 |
  11 |   test("Goes back to product list", async ({ page }) => {
  12 |     await page.locator('[data-test="inventory-item-name"]', {hasText: "Sauce Labs Bike Light",}).click();
  13 |     const backButton = page.locator('[data-test="back-to-products"]');
  14 |     await backButton.waitFor({ state: "visible", timeout: 5000 });
  15 |     await page.locator(".bm-burger-button").click();
  16 |     await page.locator('[data-test="inventory-sidebar-link"]').click();
  17 |     await expect(page.locator("text=Products")).toBeVisible();
  18 |   });
  19 |
  20 |   test("Add to cart through product page", async ({ page }) => {
  21 |     await page.locator('[data-test="inventory-item-name"]', {hasText: "Sauce Labs Backpack",}).click();
  22 |     const backButton = page.locator('[data-test="back-to-products"]');
  23 |     await backButton.waitFor({ state: "visible", timeout: 2000 });
  24 |     await page.locator('button[data-test="add-to-cart"]').click();
  25 |     await expect(page.locator("text=1")).toBeVisible();
  26 |   });
  27 |
  28 |   test("Add to cart through product list", async ({ page }) => {
  29 |     await page.locator('button[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
  30 |     await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText("1");
  31 |   });
  32 |
  33 |   test("Remove from cart", async ({ page }) => {
  34 |     await page.locator('button[data-test="add-to-cart-sauce-labs-backpack"]').click();
  35 |     await page.locator('[data-test="shopping-cart-link"]').click();
  36 |     const cartScreen = page.locator("text=QTY");
  37 |     await cartScreen.waitFor({ state: "visible", timeout: 2000 });
  38 |     await page.locator('button[data-test="remove-sauce-labs-backpack"]').click();
  39 |     await expect(page.locator("text=Sauce Labs Backpack")).not.toBeVisible();
  40 |   });
  41 |
  42 |   test("Checkout with valid credentials", async ({ page }) => {
  43 |     await page.locator('[data-test="shopping-cart-link"]').click();
  44 |     const cartPage = page.locator("text=QTY");
  45 |     await cartPage.waitFor({ state: "visible", timeout: 5000 });
  46 |     await page.locator('[data-test="checkout"]').click();
  47 |     await commands.checkoutInformation(page, "Lívia", "Santos", "04916000");
> 48 |     await page.locator('[data-test="continue"]').click();
     |                                                  ^ Error: locator.click: Test ended.
  49 |     await expect(page.locator("text=Payment Information")).toBeVisible();
  50 |   });
  51 |
  52 |   test("Checkout with no credentials", async ({ page }) => {
  53 |     await page.locator('[data-test="shopping-cart-link"]').click();
  54 |     const cartPage = page.locator("text=QTY");
  55 |     await cartPage.waitFor({ state: "visible", timeout: 5000 });
  56 |     await page.locator('[data-test="checkout"]').click();
  57 |     await page.locator('[data-test="continue"]').click();
  58 |     await expect(page.locator('[data-test="error"]')).toBeVisible();
  59 |   });
  60 | });
  61 |
```
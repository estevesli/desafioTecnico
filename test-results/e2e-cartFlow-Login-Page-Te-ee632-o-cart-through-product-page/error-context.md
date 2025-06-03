# Test info

- Name: Login Page Test >> Add to cart through product page
- Location: /home/agatha/Downloads/desafioTecnico/e2e/cartFlow.spec.js:24:7

# Error details

```
Error: locator.click: Test ended.
Call log:
  - waiting for locator('input[data-test="back-to-products"]')

    at /home/agatha/Downloads/desafioTecnico/e2e/cartFlow.spec.js:33:63
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
  12 |     await page
  13 |       .locator('[data-test="inventory-item-name"]', {
  14 |         hasText: "Sauce Labs Bike Light",
  15 |       })
  16 |       .click();
  17 |     const backButton = page.locator('[data-test="back-to-products"]');
  18 |     await backButton.waitFor({ state: "visible", timeout: 5000 });
  19 |     await page.locator(".bm-burger-button").click();
  20 |     await page.locator('[data-test="inventory-sidebar-link"]').click();
  21 |     await expect(page.locator("text=Products")).toBeVisible();
  22 |   });
  23 |
  24 |   test("Add to cart through product page", async ({ page }) => {
  25 |     await page
  26 |       .locator('[data-test="inventory-item-name"]', {
  27 |         hasText: "Sauce Labs Backpack",
  28 |       })
  29 |       .click();
  30 |     const backButton = page.locator('[data-test="back-to-products"]');
  31 |     await backButton.waitFor({ state: "visible", timeout: 5000 });
  32 |     await page.locator('button[data-test="add-to-cart"]').click();
> 33 |     await page.locator('input[data-test="back-to-products"]').click();
     |                                                               ^ Error: locator.click: Test ended.
  34 |     await expect(page.locator("text=Products")).toBeVisible();
  35 |   });
  36 |
  37 |   test("Add to cart through product list", async ({ page }) => {
  38 |     await page
  39 |       .locator('button[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]')
  40 |       .click();
  41 |     await expect(page.locator("text=1")).toBeVisible();
  42 |   });
  43 |
  44 |   test("Remove from cart", async ({ page }) => {
  45 |     await page
  46 |       .locator('button[data-test="add-to-cart-sauce-labs-backpack"]')
  47 |       .click();
  48 |     await page
  49 |       .locator('button[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]')
  50 |       .click();
  51 |     await page.locator('[data-test="shopping-cart-link"]').click();
  52 |     const cartPage = page.locator("text=QTY");
  53 |     await cartPage.waitFor({ state: "visible", timeout: 5000 });
  54 |     await page
  55 |       .locator('button[data-test="remove-sauce-labs-backpack"]')
  56 |       .click();
  57 |     await expect(page.locator("text=Sauce Labs Backpack")).toHaveCount(0);
  58 |   });
  59 |
  60 |   test("Checkout with valid credentials", async ({ page }) => {
  61 |     await page.locator('[data-test="shopping-cart-link"]').click();
  62 |     const cartPage = page.locator("text=QTY");
  63 |     await cartPage.waitFor({ state: "visible", timeout: 5000 });
  64 |     await page.locator('[data-test="checkout"]').click();
  65 |     await commands.checkoutInformation(page, "Lívia", "Santos", "04916000");
  66 |     await page.locator('[data-test="continue"]').click();
  67 |     await expect(page.locator("text=Payment Information")).toBeVisible();
  68 |   });
  69 |
  70 |   test("Checkout with no credentials", async ({ page }) => {
  71 |     await page.locator('[data-test="shopping-cart-link"]').click();
  72 |     const cartPage = page.locator("text=QTY");
  73 |     await cartPage.waitFor({ state: "visible", timeout: 5000 });
  74 |     await page.locator('[data-test="checkout"]').click();
  75 |     await page.locator('[data-test="continue"]').click();
  76 |     await expect(page.locator('[data-test="error"]')).toBeVisible();
  77 |   });
  78 | });
  79 |
```
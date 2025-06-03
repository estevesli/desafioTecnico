import { test, expect } from "@playwright/test";
import login from "../helpers/login";

test.describe("Login Page Test", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    await expect(page.locator("text=Swag Labs")).toBeVisible();
  });

  test("Login with valid credentials", async ({ page }) => {
    await login("standard_user", "secret_sauce");
    await expect(page.locator("text=Products")).toBeVisible();
  });
  
});

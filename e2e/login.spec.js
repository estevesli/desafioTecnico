import { test, expect } from "@playwright/test";
import login from "../helpers/login";

test.describe("Login Page Test", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    await expect(page.locator("text=Swag Labs")).toBeVisible();
    await login()
  });
});

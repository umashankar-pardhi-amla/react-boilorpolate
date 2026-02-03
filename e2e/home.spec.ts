import { test, expect } from "@playwright/test";

test.describe("Home page", () => {
  test("loads and shows main heading", async ({ page }) => {
    await page.goto("/home");
    await expect(
      page.getByRole("heading", { name: /React Enterprise Boilerplate/i })
    ).toBeVisible();
  });

  test("has Sign in and Sign up links", async ({ page }) => {
    await page.goto("/home");
    await expect(page.getByRole("link", { name: /Sign in/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /Sign up/i })).toBeVisible();
  });
});

import { test, expect } from "@playwright/test";

test.describe("Login page", () => {
  test("loads and shows sign in form", async ({ page }) => {
    await page.goto("/login");
    await expect(page.getByRole("heading", { name: "Sign in", exact: true })).toBeVisible();
    await expect(page.getByPlaceholder("you@company.com")).toBeVisible();
  });

  test("demo login redirects to dashboard", async ({ page }) => {
    await page.goto("/login");
    await page.getByPlaceholder("you@company.com").fill("test@example.com");
    await page.getByLabel(/password/i).fill("anypassword");
    await page.getByRole("button", { name: "Sign in" }).click();
    await expect(page).toHaveURL(/\/dashboard/);
  });
});

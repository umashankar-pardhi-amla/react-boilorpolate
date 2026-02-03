# Testing (Playwright E2E)

This project uses **Playwright** for end-to-end tests. No unit test framework – E2E only.

---

## First-time setup

```bash
npm install
npm run e2e:install   # Install Chromium (once per machine)
```

---

## Run tests

| Command | Purpose |
|--------|--------|
| `npm run e2e` | Run all E2E tests (starts dev server, runs tests, exits) |
| `npm run e2e:ui` | Open Playwright UI – run and debug tests in browser |
| `npm run validate:all` | typecheck + lint + e2e (same as CI) |

---

## Where tests live

All E2E tests are in **`e2e/`**:

- `e2e/home.spec.ts` – Home page
- `e2e/login.spec.ts` – Login flow

Add new `*.spec.ts` files under `e2e/` for more flows.

---

## Writing a test

```ts
// e2e/my-flow.spec.ts
import { test, expect } from "@playwright/test";

test("page loads", async ({ page }) => {
  await page.goto("/my-route");
  await expect(page.getByRole("heading", { name: /expected text/i })).toBeVisible();
});

test("user can submit form", async ({ page }) => {
  await page.goto("/login");
  await page.getByLabel("Email").fill("test@example.com");
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page).toHaveURL(/\/dashboard/);
});
```

### Tips

- Use **`page.goto("/path")`** – baseURL is set to the dev server in `playwright.config.ts`.
- Prefer **getByRole**, **getByLabel**, **getByPlaceholder** – stable and accessible.
- Use **expect(...).toBeVisible()** or **toHaveURL(...)**.
- Run **`npm run e2e:ui`** to debug failures.
- Config: **`playwright.config.ts`** (browser, baseURL, webServer).

---

## CI

GitHub Actions (`.github/workflows/ci.yml`) runs:

1. **quality:** typecheck → lint → spellcheck
2. **e2e:** install Playwright Chromium → `npm run e2e`

Same as running **`npm run validate:all`** locally.

---

## Pre-push

Husky runs **typecheck** then **e2e** before push. If E2E fails, you get a clear message and the command to re-run (`npm run e2e`).

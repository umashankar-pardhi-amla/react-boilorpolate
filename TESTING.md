# Testing Guide

This project uses **Vitest** for unit and component tests and **React Testing Library** for testing React components. No temporary setup – this is the long-term testing approach.

---

## Setup

- **Vitest** – Test runner (Vite-native).
- **@testing-library/react** – Render components and query the DOM.
- **@testing-library/jest-dom** – Custom matchers (e.g. `toBeInTheDocument()`).
- **@testing-library/user-event** – User interaction simulation.
- **jsdom** – Browser-like environment in Node.

Tests run with `VITEST=1` so the React Router Vite plugin is disabled during tests (avoids preamble errors when importing app code).

---

## Running Tests

```bash
# Watch mode (re-run on file change)
npm test

# Single run (CI)
npm run test:run

# With coverage
npm run test:coverage
```

Coverage reports are written to `coverage/` (HTML in `coverage/index.html`).

---

## Where to Put Tests

- **Dedicated folder** – All tests live under `tests/`. Base code in `app/core/` is never mixed with test files.
- **Structure** – Mirror `app/core/`: e.g. `tests/core/stores/auth-store.test.ts` tests `app/core/stores/auth-store.ts`.
- **Imports** – Use `~/core/...` (e.g. `~/core/stores/auth-store`, `~/core/components/Button`).

Configured in `vite.config.ts`:

- `include`: `tests/**/*.{test,spec}.{ts,tsx}`
- `setupFiles`: `vitest.setup.ts` (loads `@testing-library/jest-dom`).

---

## Writing Tests

### Unit test (store, util, logger)

```ts
// app/core/stores/auth-store.test.ts
import { describe, it, expect, beforeEach, vi } from "vitest";
import { useAuthStore } from "./auth-store";

describe("auth-store", () => {
  beforeEach(() => {
    useAuthStore.setState({ user: null, token: null, isAuthenticated: false });
  });

  it("setAuth updates state", () => {
    useAuthStore.getState().setAuth({ id: "1", email: "a@b.com" }, "token");
    expect(useAuthStore.getState().isAuthenticated).toBe(true);
  });
});
```

### Component test (React)

```tsx
// app/core/components/Button.test.tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ConfigProvider } from "antd";
import { Button } from "./Button";

function renderWithProvider(ui: React.ReactElement) {
  return render(<ConfigProvider>{ui}</ConfigProvider>);
}

it("calls onClick when clicked", async () => {
  const onClick = vi.fn();
  renderWithProvider(<Button onClick={onClick}>Submit</Button>);
  await userEvent.click(screen.getByRole("button", { name: /submit/i }));
  expect(onClick).toHaveBeenCalledTimes(1);
});
```

- Use **ConfigProvider** when testing components that depend on Ant Design context.
- Prefer **getByRole** and **name** (accessible name) for queries.
- Use **userEvent** for clicks and other interactions.

### Testing components that use Router

Wrap with a minimal router or use a test helper that provides `MemoryRouter` / React Router’s test utilities so that `Link`, `useNavigate`, etc. work in tests.

---

## Existing Tests

- **tests/core/stores/auth-store.test.ts** – Auth store: initial state, setAuth, logout.
- **tests/core/logger/base.test.ts** – BaseLogger: info, error, log level.
- **tests/core/components/Button.test.tsx** – Button: render, onClick, type primary.

Use these as references for style and patterns.

---

## Coverage

- **Include**: `app/core/**/*.{ts,tsx}` (core only by default).
- **Exclude**: `*.d.ts`, config files, test files, `__tests__`.

Adjust `vite.config.ts` → `test.coverage` if you want to include `app/extensions` or routes.

---

## Best Practices

1. **Isolate** – Mock `localStorage`, `fetch`, and external deps where needed.
2. **Arrange–Act–Assert** – Structure tests clearly.
3. **Test behavior** – Prefer testing what the user sees and does over implementation details.
4. **Descriptive names** – Use `it("does X when Y")` style.
5. **No base edits for test hacks** – Prefer mocks and test-only code in test files or test helpers, not in `app/core/`.

---

## CI

Run in your pipeline:

```bash
npm run typecheck
npm run test:run
npm run lint
npm run build
```

Optional: `npm run test:coverage` and enforce a minimum coverage threshold.

---

## E2E (Optional)

For full user flows (login, navigation, forms), add **Playwright** or **Cypress** in a separate setup. This repo does not include E2E by default; add when you need it for production confidence.

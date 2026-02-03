# Fast Development Guide

Tips to keep your feedback loop short and ship faster.

---

## 1. Use the dev server (HMR)

```bash
npm run dev
```

- **Vite + React Router** give fast HMR: most file changes update the browser in under a second.
- **Optimized deps**: React, Ant Design, Zustand, React Query, Axios are pre-bundled so the first load stays fast.
- Keep this terminal open; edit and save – no need to restart for UI changes.

---

## 2. Run app + tests together (optional)

```bash
npm run dev:all
```

Runs **dev server** and **test watch** in one terminal (dev in blue, test in yellow). Tests re-run as you change code. Stop with `Ctrl+C`.

If you prefer two terminals:

- Terminal 1: `npm run dev`
- Terminal 2: `npm run test`

---

## 3. Don’t block dev on typecheck

- **During coding**: Rely on editor TypeScript (inline errors). No need to run `npm run typecheck` after every change.
- **Before commit / PR**: Run `npm run validate` (typecheck + test:run + lint) or at least `npm run typecheck` and `npm run test:run`.

---

## 4. Extend without touching core

- Add **new** things in **`app/extensions/`** or **`app/routes/`**.
- **Override** behavior by replacing files in **`app/extensions/`** (e.g. `extensions/pages/Login.tsx`).
- Avoid editing **`app/core/`** so you stay fast and avoid regressions.

---

## 5. Use path aliases

Import from **`~/`** (maps to **`app/`**):

```ts
import { Button } from "~/components";
import { useAuthStore } from "~/core/stores/auth-store";
import { logger } from "~/core/logger";
```

No long relative paths; autocomplete and refactors stay easy.

---

## 6. Add a new route quickly

1. **Route**: Add one line in **`app/routes.ts`**:
   ```ts
   route("my-page", "routes/my-page.tsx"),
   ```
2. **Page**: Create **`app/routes/my-page.tsx`** that imports a page from **`~/pages`** (or from **`~/core/pages`** if it’s a one-off).
3. **Optional page in core**: Add **`app/core/pages/MyPage.tsx`**, then **`app/extensions/pages/MyPage.tsx`** that re-exports it, and **`app/pages/MyPage.tsx`** that re-exports from extensions. Then in the route file: `import { MyPage } from "~/pages"; return <Layout><MyPage /></Layout>;`

---

## 7. Format and lint without slowing down

- **Format on save** in the editor (Prettier) so you don’t run `npm run format` by hand.
- **Lint on save** or before commit. Use `npm run lint` in CI; fix errors when the linter reports them.

---

## 8. Commands cheat sheet

| Goal              | Command           |
|-------------------|-------------------|
| Start dev         | `npm run dev`     |
| Dev + test watch  | `npm run dev:all` |
| Run tests once    | `npm run test:run`|
| Typecheck         | `npm run typecheck`|
| Lint              | `npm run lint`    |
| Format            | `npm run format`  |
| All checks (CI)   | `npm run validate`|
| Production build  | `npm run build`   |

---

## 9. Keep the codebase fast

- **Lazy load** heavy screens with `React.lazy` + `Suspense` if you add large routes.
- **Tests**: Keep them in **`tests/`** and only test what you need; avoid slow or flaky tests in the critical path.
- **Extensions**: Lazy-loaded by the extension loader; no need to change that for speed.

Using these habits keeps the feedback loop short and development fast.

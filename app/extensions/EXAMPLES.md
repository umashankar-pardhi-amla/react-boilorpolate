# Extensibility Examples

Best-practice examples for extending **functions**, **components**, **Zustand state**, and **CSS/theme** without touching base code.

## 1. Extensible function

**Base:** `app/core/utils/formatDate.ts`  
**Extension:** `app/extensions/utils/formatDate.ts`

- Base: `baseFormatDate()` uses `toLocaleDateString()`.
- Extension: `formatDate()` uses **dayjs** and supports a `format` string (e.g. `DD MMM YYYY`, `YYYY-MM-DD`).
- Usage: call `getFormatDate()` from `~/core/utils`; after extensions load, you get the extended implementation.

```ts
import { getFormatDate } from '~/core/utils';

const formatDate = await getFormatDate();
formatDate(new Date());           // "28 Jan 2025" (extended)
formatDate(new Date(), 'YYYY-MM-DD'); // "2025-01-28"
```

---

## 2. Extensible components

**Base:** `app/core/components/Button.tsx`, Ant Design `Card`  
**Extension:** `app/extensions/components/Button.tsx`, `Card.tsx`

- **Button:** Wraps base with `ext-button` class and optional click tracking (`trackClick`, `__trackClick`).
- **Card:** Wraps Ant Design Card with `ext-card`, optional `headerAction`, and app-specific styling.
- Usage: import from `~/components` so the app uses extended components.

```tsx
import { Button, Card } from '~/components';

<Card title="Section" headerAction={<Button size="small">Action</Button>}>
  <Button type="primary" trackClick>Save</Button>
</Card>
```

---

## 3. Zustand state (extended stores)

**Extension-only stores:** `app/extensions/stores/`

- **counter-store.ts:** Extended counter with `step` and `history` (last 10 values). Same pattern as base stores.
- **app-store.ts:** App-level state (theme, sidebar) – no base; lives only in extensions.

```tsx
import { useCounterStore, useAppStore } from '~/extensions/stores';

const { count, step, history, increment, setStep } = useCounterStore();
const { theme, setTheme, sidebarCollapsed, toggleSidebar } = useAppStore();
```

---

## 4. CSS & theme extension

**Extension:** `app/extensions/ui/provider.tsx`, `app/extensions/ui/extensions.css`

- **Provider:** Wraps `BaseUIProvider` with custom Ant Design tokens (e.g. `colorPrimary: '#6366f1'`) and a root wrapper `.ext-app-shell`.
- **CSS:** `extensions.css` styles `.ext-button`, `.ext-card`, `.ext-app-shell` so extended components get consistent look.
- Loaded via extension loader; `app.css` imports `extensions/ui/extensions.css`.

---

## Demo route

**Route:** `/extensions-demo` (`app/routes/extensions-demo.tsx`)

Shows all four:

1. **formatDate** – extended formatter with dayjs.
2. **Button & Card** – extended components from `~/components`.
3. **useCounterStore** – step, history, reset.
4. **useAppStore** – theme and sidebar.
5. **Theme + CSS** – custom tokens and `.ext-*` classes.

Open **View all extensibility examples →** on the home page or go to `/extensions-demo`.

---

## Summary

| Kind        | Base location           | Extension location              | How to use in app              |
|------------|-------------------------|----------------------------------|--------------------------------|
| Function   | `core/utils/formatDate` | `extensions/utils/formatDate`   | `getFormatDate()`               |
| Component  | `core/components/`      | `extensions/components/`       | Import from `~/components`     |
| Zustand    | `core/stores/` (pattern)| `extensions/stores/`           | Import from `~/extensions/stores` |
| CSS/theme  | `core/ui/base`          | `extensions/ui/provider` + `.css` | Loaded by extension loader    |

All extensions live under `app/extensions/`; base code in `app/core/` stays unchanged.

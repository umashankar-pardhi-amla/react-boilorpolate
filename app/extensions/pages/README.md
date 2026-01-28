# Overriding Login, Signup, and Dashboard

Base implementations live in **`app/core/pages/`** (do not modify).  
To override in the next iteration, **replace the content** of the corresponding file in **`app/extensions/pages/`**.

## Current behavior

- **`app/pages/`** → re-exports from **`app/extensions/pages/`**
- **`app/extensions/pages/Login.tsx`** (and Signup, Dashboard) → re-export base by default
- Routes (`app/routes/login.tsx`, etc.) import from **`~/pages`**, so they always use the resolved page (base or your override)

## How to override

### Override Login

Edit **`app/extensions/pages/Login.tsx`** and replace with your own component:

```tsx
import { useNavigate } from 'react-router';
import { useAuthStore } from '~/core/stores/auth-store';
// Your custom layout, branding, validation, etc.

export function Login() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);
  // Your custom UI and logic
  return (
    <div className="my-custom-login">
      {/* ... */}
    </div>
  );
}
```

### Override Signup

Edit **`app/extensions/pages/Signup.tsx`** with your custom signup form and flow.

### Override Dashboard

Edit **`app/extensions/pages/Dashboard.tsx`** with your custom dashboard (sidebar, widgets, etc.).  
Still use `useAuthStore()` from `~/core/stores/auth-store` for user and logout.

## Auth store

- **`app/core/stores/auth-store.ts`** – `useAuthStore()` with `user`, `token`, `isAuthenticated`, `setAuth(user, token)`, `logout()`.
- Persists to `localStorage` so refresh on dashboard works.
- Override the store in **`app/extensions/stores/auth-store.ts`** if you need different persistence or fields.

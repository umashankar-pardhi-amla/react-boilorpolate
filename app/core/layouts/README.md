# Base Layouts

Layouts wrap routes to provide authentication checks and consistent structure.

## AuthLayout

**Location:** `app/core/layouts/AuthLayout.tsx`

**Purpose:** For authenticated routes (e.g., `/dashboard`).

**Behavior:**
- Checks if user is authenticated
- Redirects to `/login` if not authenticated
- Future: Can check permissions via `permissions` prop

**Usage:**
```tsx
import { AuthLayout } from '~/layouts';

export default function DashboardRoute() {
  return (
    <AuthLayout>
      <Dashboard />
    </AuthLayout>
  );
}
```

**Future permissions:**
```tsx
<AuthLayout permissions={{ role: 'admin' }}>
  <AdminPanel />
</AuthLayout>
```

## PublicLayout

**Location:** `app/core/layouts/PublicLayout.tsx`

**Purpose:** For public routes (e.g., `/login`, `/signup`, `/forgot-password`).

**Behavior:**
- By default, redirects authenticated users to `/dashboard` (to prevent logged-in users from seeing login page)
- Set `redirectIfAuthenticated={false}` to allow access even when logged in

**Usage:**
```tsx
import { PublicLayout } from '~/layouts';

export default function LoginRoute() {
  return (
    <PublicLayout>
      <Login />
    </PublicLayout>
  );
}
```

## Overriding Layouts

Override in `app/extensions/layouts/`:
- `app/extensions/layouts/AuthLayout.tsx` – Custom auth layout (e.g., add sidebar, header)
- `app/extensions/layouts/PublicLayout.tsx` – Custom public layout (e.g., add public header/footer)

Base layouts in `app/core/layouts/` should never be modified.

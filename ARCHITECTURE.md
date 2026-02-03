# Application Architecture

## Table of Contents

1. [Overview](#overview)
2. [Core Philosophy](#core-philosophy)
3. [Directory Structure](#directory-structure)
4. [Extension System](#extension-system)
5. [Component Architecture](#component-architecture)
6. [Layout System](#layout-system)
7. [State Management](#state-management)
8. [Routing](#routing)
9. [Data Fetching](#data-fetching)
10. [Application Flow](#application-flow)
11. [Testing](#testing)
12. [Production Readiness](#production-readiness)
13. [Best Practices](#best-practices)

---

## Overview

This is an **enterprise-grade React boilerplate** built with **extensibility as a first-class feature**. The architecture allows developers to override any base implementation without modifying core code, similar to class override patterns in backend frameworks.

### Key Technologies

- **React Router v7** - File-based routing
- **Zustand** - State management
- **React Query** - Data synchronization
- **Axios** - HTTP client
- **Ant Design** - UI component library
- **Tailwind CSS** - Utility-first styling
- **TypeScript** - Type safety

---

## Core Philosophy

### 1. Immutable Base Code

**Rule:** Never modify files in `app/core/`

All base implementations are considered immutable. They provide stable, tested functionality that can be relied upon.

### 2. Extension-First Design

**Rule:** All overrides go in `app/extensions/`

Extensions automatically override base implementations when present. If no extension exists, the base is used.

### 3. Registry Pattern

**Rule:** Use the registry for dynamic overrides

The registry system (`app/core/registry.ts`) manages base and extension implementations, automatically merging them when needed.

### 4. Wrapper Components

**Rule:** Never import directly from `antd` in routes/pages

All Ant Design components are wrapped in `app/core/components/` to:
- Hide implementation details
- Enable easy library switching
- Provide consistent styling
- Add app-specific behavior

---

## Directory Structure

```
app/
├── core/                          # BASE CODE (DO NOT MODIFY)
│   ├── registry.ts                # Extension registry system
│   ├── extension-loader.ts        # Auto-loads extensions
│   ├── providers.tsx              # App providers (React Query, Ant Design)
│   │
│   ├── components/                # Base UI components (wrappers)
│   │   ├── Button.tsx             # Wraps antd Button
│   │   ├── Sidebar.tsx            # Wraps antd Layout.Sider
│   │   ├── Header.tsx             # Wraps antd Layout.Header
│   │   ├── Menu.tsx               # Wraps antd Menu
│   │   ├── Breadcrumb.tsx         # Wraps antd Breadcrumb
│   │   ├── PageHeader.tsx         # Custom page header
│   │   ├── Content.tsx             # Wraps antd Layout.Content
│   │   └── index.ts               # Exports all components
│   │
│   ├── layouts/                   # Base layouts
│   │   ├── AuthLayout.tsx         # Simple auth layout (no sidebar)
│   │   ├── AuthLayoutWithSidebar.tsx  # Auth layout with sidebar
│   │   ├── PublicLayout.tsx      # Public routes layout
│   │   └── index.ts               # Exports all layouts
│   │
│   ├── pages/                     # Base page components
│   │   ├── Login.tsx              # Login page
│   │   ├── Signup.tsx             # Signup page
│   │   ├── Dashboard.tsx          # Dashboard page
│   │   ├── ForgotPassword.tsx    # Forgot password page
│   │   └── index.ts               # Exports all pages
│   │
│   ├── stores/                    # Base Zustand stores
│   │   ├── auth-store.ts          # Authentication store
│   │   └── example-store.ts       # Example store pattern
│   │
│   ├── logger/                    # Logging system
│   │   ├── base.ts                # BaseLogger class
│   │   └── index.ts               # Logger instance
│   │
│   ├── http/                      # HTTP client
│   │   ├── base.ts                # BaseHttpClient class
│   │   └── index.ts               # HTTP client instance
│   │
│   ├── query/                     # React Query config
│   │   ├── base.ts                # BaseQueryConfig class
│   │   └── index.ts               # Query config instance
│   │
│   ├── ui/                        # UI provider
│   │   ├── base.tsx               # BaseUIProvider
│   │   └── index.ts               # UI provider exports
│   │
│   ├── hooks/                     # Custom hooks
│   │   ├── use-http.ts            # HTTP client hook
│   │   ├── use-logger.ts          # Logger hook
│   │   └── index.ts               # Hook exports
│   │
│   ├── utils/                     # Utility functions
│   │   ├── formatDate.ts          # Date formatting (extensible)
│   │   └── index.ts               # Utility exports
│   │
│   └── config/                    # Configuration
│       └── menu.ts                # Default menu items
│
├── extensions/                    # EXTENSIONS (OVERRIDE HERE)
│   ├── components/                # Override components
│   │   ├── Button.tsx             # Re-exports base (replace to override)
│   │   ├── Card.tsx               # Extended Card component
│   │   └── index.ts               # Exports all extensions
│   │
│   ├── layouts/                   # Override layouts
│   │   ├── AuthLayout.tsx         # Re-exports base
│   │   ├── AuthLayoutWithSidebar.tsx  # Re-exports base
│   │   └── PublicLayout.tsx      # Re-exports base
│   │
│   ├── pages/                     # Override pages
│   │   ├── Login.tsx              # Extended Login (with banner)
│   │   ├── Dashboard.tsx          # Re-exports base
│   │   └── index.ts               # Exports all pages
│   │
│   ├── stores/                    # Additional stores
│   │   ├── counter-store.ts       # Extended counter store
│   │   ├── app-store.ts           # App-level store
│   │   └── index.ts               # Store exports
│   │
│   ├── logger/                    # Override logger
│   │   └── logger.ts              # Extended logger
│   │
│   ├── http/                      # Override HTTP client
│   │   └── client.ts              # Re-exports base
│   │
│   ├── query/                     # Override query config
│   │   └── config.ts              # Re-exports base
│   │
│   ├── ui/                        # Override UI provider
│   │   ├── provider.tsx           # Extended UI provider
│   │   └── extensions.css         # Extended styles
│   │
│   └── utils/                     # Override utilities
│       └── formatDate.ts          # Extended formatDate
│
├── components/                    # APP COMPONENTS (entry point)
│   └── index.ts                   # Re-exports from extensions
│
├── layouts/                       # APP LAYOUTS (entry point)
│   └── index.ts                   # Re-exports from extensions
│
├── pages/                         # APP PAGES (entry point)
│   └── index.ts                   # Re-exports from extensions
│
├── routes/                        # ROUTE FILES
│   ├── login-index.tsx           # Index route (/) - Login
│   ├── login.tsx                  # /login route
│   ├── signup.tsx                 # /signup route
│   ├── forgot-password.tsx        # /forgot-password route
│   ├── dashboard.tsx              # /dashboard route
│   ├── home.tsx                   # /home route
│   └── extensions-demo.tsx        # /extensions-demo route
│
├── routes.ts                      # Route configuration
├── root.tsx                       # Root component
└── app.css                        # Global styles
```

---

## Extension System

### How It Works

The extension system uses a **Registry Pattern** to manage base and extension implementations.

#### 1. Registry (`app/core/registry.ts`)

The registry is a singleton that:
- Stores base implementations
- Stores extension loaders
- Merges base + extension when accessed
- Caches merged results

```typescript
// Register base
registry.registerBase('core:logger', baseLogger);

// Register extension loader
registry.registerExtension('core:logger', async () => {
  const mod = await import('~/extensions/logger/logger');
  return mod.logger;
});

// Get merged (base + extension)
const logger = await registry.get('core:logger');
```

#### 2. Extension Loader (`app/core/extension-loader.ts`)

Automatically loads extensions on app initialization:

```typescript
// Called in root.tsx
loadExtensions();

// Checks for:
// - ~/extensions/logger/logger
// - ~/extensions/http/client
// - ~/extensions/query/config
// - ~/extensions/ui/provider
// - ~/extensions/utils/formatDate
```

#### 3. Extension Resolution Flow

```
1. App starts → loadExtensions() called
2. For each extension:
   a. Try to import from extensions/
   b. If found → register extension loader
   c. If not found → use base only
3. When component uses extension:
   a. Check if extension loader exists
   b. Load extension lazily
   c. Merge with base
   d. Return merged result
```

### Extension Patterns

#### Pattern 1: Class Extension

```typescript
// Base: app/core/logger/base.ts
export class BaseLogger {
  error(message: string) {
    console.error(message);
  }
}

// Extension: app/extensions/logger/logger.ts
export class ExtendedLogger extends BaseLogger {
  error(message: string) {
    super.error(message);
    // Add custom logic
    sendToErrorTracking(message);
  }
}
```

#### Pattern 2: Component Override

```typescript
// Base: app/core/components/Button.tsx
export function Button(props) {
  return <AntButton {...props} />;
}

// Extension: app/extensions/components/Button.tsx
export function Button(props) {
  return <BaseButton {...props} className="custom" />;
}
```

#### Pattern 3: Function Replacement

```typescript
// Base: app/core/utils/formatDate.ts
export function formatDate(date) {
  return date.toLocaleDateString();
}

// Extension: app/extensions/utils/formatDate.ts
export const formatDate = (date) => {
  return dayjs(date).format('DD MMM YYYY');
};
```

---

## Component Architecture

### Wrapper Pattern

All Ant Design components are wrapped to:
- Hide implementation details
- Enable easy library switching
- Provide consistent styling
- Add app-specific behavior

### Component Flow

```
Route/Page
  ↓
imports from ~/components
  ↓
~/components/index.ts
  ↓
re-exports from ~/extensions/components
  ↓
~/extensions/components/[Component].tsx
  ↓
re-exports from ~/core/components
  ↓
~/core/components/[Component].tsx
  ↓
wraps antd component
```

### Available Components

All available via `~/components`:

- **Button** - Wrapped antd Button
- **Card** - Extended Card with headerAction
- **Sidebar** - Collapsible sidebar (antd Layout.Sider)
- **Header** - App header with left/right content
- **Menu** - Navigation menu with routing
- **Breadcrumb** - Breadcrumb navigation
- **PageHeader** - Page title, subtitle, actions
- **Content** - Main content area

### Usage Example

```typescript
// ✅ Good - import from ~/components
import { Button, Sidebar, Menu } from '~/components';

// ❌ Bad - direct antd import
import { Button } from 'antd';
```

---

## Layout System

### Layout Types

#### 1. PublicLayout

For public routes (login, signup, forgot-password):
- Redirects authenticated users to `/dashboard`
- No sidebar or header
- Full-page layout

```typescript
<PublicLayout>
  <Login />
</PublicLayout>
```

#### 2. AuthLayout

For authenticated routes without sidebar:
- Checks authentication
- Redirects to `/login` if not authenticated
- Simple layout (no sidebar)

```typescript
<AuthLayout>
  <MyPage />
</AuthLayout>
```

#### 3. AuthLayoutWithSidebar

For authenticated routes with sidebar:
- Checks authentication
- Collapsible left sidebar
- Header with user info
- Content area

```typescript
<AuthLayoutWithSidebar
  menuItems={<Menu items={menuItems} />}
  sidebarLogo={<div>App</div>}
  headerTitle="Dashboard"
>
  <Dashboard />
</AuthLayoutWithSidebar>
```

### Layout Resolution

```
Route
  ↓
Uses layout from ~/layouts
  ↓
~/layouts/index.ts
  ↓
re-exports from ~/extensions/layouts
  ↓
~/extensions/layouts/[Layout].tsx
  ↓
re-exports from ~/core/layouts
  ↓
~/core/layouts/[Layout].tsx
```

---

## State Management

### Zustand Stores

All stores use `createBaseStore` helper:

```typescript
import { createBaseStore } from '~/core/store';

export const useMyStore = createBaseStore<MyStoreState>(
  { name: 'MyStore' },
  (set) => ({
    // State and actions
  })
);
```

### Store Locations

- **Base stores:** `app/core/stores/` (auth-store, example-store)
- **Extended stores:** `app/extensions/stores/` (counter-store, app-store)

### Available Stores

- **useAuthStore** - Authentication state (user, token, login/logout)
- **useExampleStore** - Example counter store
- **useCounterStore** - Extended counter with step and history
- **useAppStore** - App-level state (theme, sidebar)

---

## Routing

### Route Configuration

Routes are defined in `app/routes.ts`:

```typescript
export default [
  index("routes/login-index.tsx"),      // / → Login
  route("login", "routes/login.tsx"),   // /login → Login
  route("signup", "routes/signup.tsx"), // /signup → Signup
  route("dashboard", "routes/dashboard.tsx"), // /dashboard → Dashboard
] satisfies RouteConfig;
```

### Route Structure

Each route file:
1. Imports page from `~/pages`
2. Wraps in appropriate layout
3. Exports default component

```typescript
import { Dashboard } from '~/pages';
import { AuthLayoutWithSidebar } from '~/layouts';

export default function DashboardRoute() {
  return (
    <AuthLayoutWithSidebar>
      <Dashboard />
    </AuthLayoutWithSidebar>
  );
}
```

### Available Routes

- `/` - Login (index)
- `/login` - Login
- `/signup` - Signup
- `/forgot-password` - Forgot password
- `/dashboard` - Dashboard (authenticated)
- `/home` - Home/landing page
- `/extensions-demo` - Extensibility examples

---

## Data Fetching

### React Query

Configured via `queryConfig`:

```typescript
import { useQuery } from '@tanstack/react-query';
import { httpClient } from '~/core/http';

function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await httpClient.get('/api/users');
      return response.data;
    },
  });
}
```

### HTTP Client

Axios-based client with interceptors:

```typescript
import { httpClient } from '~/core/http';

// GET
const response = await httpClient.get('/api/users');

// POST
const newUser = await httpClient.post('/api/users', { name: 'John' });
```

### HTTP Client Features

- Automatic auth token injection
- Request/response interceptors
- Error handling (401, 403, 500, etc.)
- Extensible (override in `app/extensions/http/client.ts`)

---

## Application Flow

### 1. App Initialization

```
1. root.tsx loads
   ↓
2. AppProviders wraps app
   - QueryClientProvider
   - BaseUIProvider (Ant Design)
   ↓
3. loadExtensions() called
   - Checks for extensions
   - Registers extension loaders
   ↓
4. Routes render
```

### 2. Route Rendering

```
1. Route file loads
   ↓
2. Imports page from ~/pages
   ↓
3. ~/pages re-exports from ~/extensions/pages
   ↓
4. ~/extensions/pages re-exports from ~/core/pages
   ↓
5. Page component renders
```

### 3. Component Rendering

```
1. Component imports from ~/components
   ↓
2. ~/components re-exports from ~/extensions/components
   ↓
3. ~/extensions/components re-exports from ~/core/components
   ↓
4. Core component wraps antd component
   ↓
5. Renders to DOM
```

### 4. Extension Loading

```
1. Component uses extension (e.g., logger)
   ↓
2. Calls getLogger()
   ↓
3. Registry checks for extension loader
   ↓
4. If exists → loads extension lazily
   ↓
5. Merges with base
   ↓
6. Returns merged result
```

---

## Testing

- **Framework:** Playwright (E2E only)
- **Commands:** `npm run e2e:install` (once), `npm run e2e`, `npm run e2e:ui`
- **Location:** `e2e/*.spec.ts`
- **Details:** See [README.md](./README.md) – Getting Started / Testing

---

## Production Readiness

- **Env validation:** `app/core/config/env.ts` uses zod; override in extensions if needed
- **404:** Root ErrorBoundary renders `NotFound` for 404
- **403:** `/unauthorized` route and `Unauthorized` page
- **Before deploy:** See [README.md](./README.md) – Before production

---

## Best Practices

### 1. Never Modify Core

❌ **Don't:**
```typescript
// app/core/components/Button.tsx
export function Button(props) {
  return <AntButton {...props} className="my-custom" />; // NO!
}
```

✅ **Do:**
```typescript
// app/extensions/components/Button.tsx
export function Button(props) {
  return <BaseButton {...props} className="my-custom" />;
}
```

### 2. Use Wrapper Components

❌ **Don't:**
```typescript
import { Button } from 'antd'; // Direct import
```

✅ **Do:**
```typescript
import { Button } from '~/components'; // Wrapper
```

### 3. Extend, Don't Replace

❌ **Don't:**
```typescript
// Completely new implementation
export class Logger {
  // No base functionality
}
```

✅ **Do:**
```typescript
// Extend base
export class ExtendedLogger extends BaseLogger {
  error(message: string) {
    super.error(message); // Call base
    // Add custom logic
  }
}
```

### 4. Use TypeScript

Always use TypeScript for type safety:

```typescript
import type { ButtonProps } from '~/components';

export function MyButton(props: ButtonProps) {
  // Type-safe
}
```

### 5. Document Extensions

Add comments explaining why you're overriding:

```typescript
/**
 * Extended Button – adds analytics tracking.
 * Overrides base to track all button clicks.
 */
export function Button(props) {
  // ...
}
```

---

## Summary

### Key Concepts

1. **Immutable Base** - `app/core/` never changes
2. **Extension Override** - `app/extensions/` overrides base
3. **Registry Pattern** - Automatic extension loading and merging
4. **Wrapper Components** - Hide Ant Design implementation
5. **Layout System** - Public, Auth, AuthWithSidebar
6. **State Management** - Zustand with extensible pattern

### Import Paths

- **Components:** `~/components`
- **Layouts:** `~/layouts`
- **Pages:** `~/pages`
- **Stores:** `~/extensions/stores` or `~/core/stores`
- **Core utilities:** `~/core/logger`, `~/core/http`, etc.

### Extension Points

- Components → `app/extensions/components/`
- Layouts → `app/extensions/layouts/`
- Pages → `app/extensions/pages/`
- Stores → `app/extensions/stores/`
- Logger → `app/extensions/logger/logger.ts`
- HTTP Client → `app/extensions/http/client.ts`
- Query Config → `app/extensions/query/config.ts`
- UI Provider → `app/extensions/ui/provider.tsx`
- Utils → `app/extensions/utils/`

This architecture provides a solid foundation for building enterprise applications with maximum flexibility and maintainability.

# Component Architecture & Best Practices

## Approach: Wrapper Components (Recommended ✅)

### Why This Approach?

**Problem:** Direct Ant Design imports throughout the codebase create tight coupling and make it hard to:
- Switch UI libraries later
- Maintain consistent styling
- Add app-specific behavior
- Test components in isolation

**Solution:** Create wrapper components in `app/core/components/` that:
1. Wrap Ant Design internally
2. Export only our custom components
3. Provide consistent API and styling
4. Can be overridden in extensions

### Benefits

✅ **No Ant Design pollution** – Routes/pages import from `~/components`, not `antd`  
✅ **Easy to switch** – Change UI library by updating wrappers only  
✅ **Consistent styling** – All components use same base classes  
✅ **Extensible** – Override any component in `app/extensions/components/`  
✅ **Type-safe** – Full TypeScript support  
✅ **Future-proof** – Add features (analytics, logging) in one place  

## Component Structure

```
app/
├── core/components/          # Base wrappers (DO NOT MODIFY)
│   ├── Button.tsx            # Wraps antd Button
│   ├── Sidebar.tsx           # Wraps antd Layout.Sider
│   ├── Header.tsx            # Wraps antd Layout.Header
│   ├── Menu.tsx              # Wraps antd Menu
│   ├── Breadcrumb.tsx        # Wraps antd Breadcrumb
│   ├── PageHeader.tsx        # Custom page header
│   └── Content.tsx           # Wraps antd Layout.Content
│
├── extensions/components/    # Override wrappers here
│   ├── Button.tsx            # Re-exports base (replace to override)
│   └── ...
│
└── components/index.ts       # Single entry point
    └── Re-exports from extensions
```

## Usage in Routes/Pages

### ✅ Good (Recommended)

```tsx
import { Button, Sidebar, Menu, Header } from '~/components';

export default function MyPage() {
  return (
    <Button type="primary">Click me</Button>
  );
}
```

### ❌ Bad (Avoid)

```tsx
import { Button } from 'antd';  // Direct import - avoid!
```

## Layouts

### AuthLayout (Simple)

For pages that need auth but no sidebar:

```tsx
import { AuthLayout } from '~/layouts';

<AuthLayout>
  <MyPage />
</AuthLayout>
```

### AuthLayoutWithSidebar (With Sidebar)

For pages with collapsible sidebar:

```tsx
import { AuthLayoutWithSidebar } from '~/layouts';
import { Menu } from '~/components';
import { defaultMenuItems } from '~/core/config/menu';

<AuthLayoutWithSidebar
  menuItems={<Menu items={defaultMenuItems} />}
  sidebarLogo={<div>App</div>}
  headerTitle="Dashboard"
>
  <MyPage />
</AuthLayoutWithSidebar>
```

## Common Components Available

All available via `~/components`:

- **Button** – Wrapped antd Button
- **Card** – Extended Card with headerAction
- **Sidebar** – Collapsible sidebar (antd Layout.Sider)
- **Header** – App header with left/right content
- **Menu** – Navigation menu with routing
- **Breadcrumb** – Breadcrumb navigation
- **PageHeader** – Page title, subtitle, actions
- **Content** – Main content area

## Overriding Components

To customize any component:

1. Edit `app/extensions/components/[ComponentName].tsx`
2. Replace the re-export with your custom implementation
3. All routes using `~/components` will use your override

Example – Custom Button:

```tsx
// app/extensions/components/Button.tsx
import { Button as BaseButton } from '~/core/components';

export function Button(props) {
  return (
    <BaseButton {...props} className="my-custom-button" />
  );
}
```

## Is This Approach Good?

**Yes! ✅** This is a best practice because:

1. **Separation of Concerns** – UI library details hidden from app code
2. **Maintainability** – Change UI library by updating wrappers only
3. **Consistency** – All components follow same patterns
4. **Testability** – Mock `~/components` easily
5. **Extensibility** – Override without touching base code
6. **Developer Experience** – Single import path, consistent API

## Alternative Approaches (Not Recommended)

### ❌ Direct Ant Design Imports

```tsx
import { Button } from 'antd';  // Tight coupling
```

**Problems:**
- Hard to switch libraries
- Inconsistent styling
- No app-specific behavior

### ❌ Theme Provider Only

```tsx
// Just theme, no wrappers
<ConfigProvider theme={...}>
  <Button from="antd" />  // Still direct import
</ConfigProvider>
```

**Problems:**
- Still tight coupling
- No behavior customization
- Hard to add features

## Summary

✅ **Use wrapper components** (`~/components`)  
✅ **Never import directly from `antd`** in routes/pages  
✅ **Override in extensions** when needed  
✅ **Keep base code immutable**  

This architecture provides flexibility, maintainability, and extensibility while keeping Ant Design implementation details hidden from your application code.

# Extensibility Guide

This document explains how to extend the base project without modifying base code.

## Core Concept

The project uses a **Registry Pattern** similar to class override mechanisms in backend frameworks. Base implementations live in `app/core/` and can be overridden by placing extension files in `app/extensions/`.

## How It Works

1. **Base Implementation** - Located in `app/core/`
2. **Extension Detection** - Extension loader checks for files in `app/extensions/`
3. **Automatic Merging** - Registry merges base and extension implementations
4. **Fallback** - If no extension exists, base implementation is used

## Extension Points

### 1. Logger

**Base:** `app/core/logger/base.ts`

**Extension:** `app/extensions/logger/logger.ts`

```typescript
import { BaseLogger, LogLevel } from '~/core/logger';

export class CustomLogger extends BaseLogger {
  // Override any method
  error(message: string, error?: Error, context?: Record<string, any>): void {
    // Custom implementation
    super.error(message, error, context);
    // Add custom logic
  }
}

export const logger = new CustomLogger();
```

### 2. HTTP Client

**Base:** `app/core/http/base.ts`

**Extension:** `app/extensions/http/client.ts`

```typescript
import { BaseHttpClient } from '~/core/http';

export class CustomHttpClient extends BaseHttpClient {
  protected getAuthToken(): string | null {
    // Override token retrieval
  }

  protected async handleResponseError(error: AxiosError): Promise<never> {
    // Override error handling
  }
}

export const httpClient = new CustomHttpClient();
```

### 3. React Query Config

**Base:** `app/core/query/base.ts`

**Extension:** `app/extensions/query/config.ts`

```typescript
import { BaseQueryConfig } from '~/core/query';

export class CustomQueryConfig extends BaseQueryConfig {
  constructor() {
    super({
      defaultOptions: {
        queries: {
          // Custom options
        },
      },
    });
  }
}

export const queryConfig = new CustomQueryConfig();
```

### 4. UI Provider

**Base:** `app/core/ui/base.tsx`

**Extension:** `app/extensions/ui/provider.tsx`

```typescript
import { BaseUIProvider } from '~/core/ui';

export function UIProvider({ children }: { children: React.ReactNode }) {
  return (
    <BaseUIProvider theme={{ /* custom theme */ }}>
      {children}
    </BaseUIProvider>
  );
}
```

### 5. Components

**Base:** `app/core/components/Button.tsx`

**Extension:** `app/extensions/components/Button.tsx`

```typescript
import { Button as BaseButton, ButtonProps } from '~/core/components';

export function Button(props: ButtonProps) {
  // Wrap or extend base component
  return <BaseButton {...props} />;
}
```

### 6. Stores

Create new stores in `app/stores/`:

```typescript
import { createBaseStore } from '~/core/store';

interface MyStore {
  data: string;
  setData: (data: string) => void;
}

export const useMyStore = createBaseStore<MyStore>(
  { name: 'MyStore' },
  (set) => ({
    data: '',
    setData: (data) => set({ data }),
  })
);
```

## Extension Loading

Extensions are automatically loaded when the app initializes. The loader:

1. Checks for extension files
2. Loads them if they exist
3. Registers them with the registry
4. Falls back to base if not found

No manual registration needed!

## Advanced: Custom Extensions

You can create custom extension points:

```typescript
// app/core/my-feature/base.ts
export class BaseMyFeature {
  doSomething() {
    // Base implementation
  }
}

// app/extensions/my-feature/feature.ts
import { BaseMyFeature } from '~/core/my-feature/base';

export class CustomMyFeature extends BaseMyFeature {
  doSomething() {
    // Custom implementation
    super.doSomething();
  }
}

export const myFeature = new CustomMyFeature();
```

Then register it:

```typescript
import { registry, createRegistryKey } from '~/core/registry';
import { myFeature } from '~/extensions/my-feature/feature';

registry.registerBase(createRegistryKey('my-feature', 'instance'), myFeature);
```

## Best Practices

1. **Always extend, never replace** - Use `super` to call base methods
2. **Match file structure** - Keep extension paths similar to base paths
3. **Export same names** - Export with same names as base for automatic detection
4. **Type safety** - Use TypeScript interfaces for type safety
5. **Document overrides** - Add comments explaining why you're overriding

## Troubleshooting

### Extension not loading?

1. Check file path matches expected location
2. Ensure export name matches (e.g., `logger`, `httpClient`)
3. Check browser console for errors
4. Verify extension loader is called in `app/root.tsx`

### Base code still being used?

1. Clear registry cache: `registry.clearAllCaches()`
2. Check extension is properly exported
3. Verify extension file is in correct location

## Examples

See `app/extensions/README.md` for more examples.

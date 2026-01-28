# Extensions Directory

This directory contains extensions that override base implementations without modifying the base code.

## How to Extend

### 1. Logger Extension

Create `app/extensions/logger/logger.ts`:

```typescript
import { BaseLogger, LogLevel } from '~/core/logger';

export class ExtendedLogger extends BaseLogger {
  // Override methods as needed
  error(message: string, error?: Error, context?: Record<string, any>): void {
    // Custom error handling
    super.error(message, error, context);
    // Add custom logic (e.g., send to error tracking service)
  }
}

export const logger = new ExtendedLogger({
  level: LogLevel.DEBUG,
  enableConsole: true,
});
```

### 2. HTTP Client Extension

Create `app/extensions/http/client.ts`:

```typescript
import { BaseHttpClient, HttpConfig } from '~/core/http';

export class ExtendedHttpClient extends BaseHttpClient {
  protected getAuthToken(): string | null {
    // Custom token retrieval logic
    return localStorage.getItem('custom_token');
  }

  protected async handleResponseError(error: AxiosError): Promise<never> {
    // Custom error handling
    return super.handleResponseError(error);
  }
}

export const httpClient = new ExtendedHttpClient({
  baseURL: process.env.VITE_API_BASE_URL,
});
```

### 3. Query Config Extension

Create `app/extensions/query/config.ts`:

```typescript
import { BaseQueryConfig, QueryConfig } from '~/core/query';

export class ExtendedQueryConfig extends BaseQueryConfig {
  constructor() {
    super({
      defaultOptions: {
        queries: {
          retry: 5,
          staleTime: 10 * 60 * 1000,
        },
      },
    });
  }
}

export const queryConfig = new ExtendedQueryConfig();
```

### 4. UI Provider Extension

Create `app/extensions/ui/provider.tsx`:

```typescript
import { BaseUIProvider, ThemeConfig } from '~/core/ui';

export function UIProvider({ children }: { children: React.ReactNode }) {
  const customTheme: ThemeConfig = {
    token: {
      colorPrimary: '#52c41a',
      borderRadius: 8,
    },
  };

  return <BaseUIProvider theme={customTheme}>{children}</BaseUIProvider>;
}
```

### 5. Custom Providers Extension

Create `app/extensions/providers.tsx`:

```typescript
import { AppProviders as BaseAppProviders } from '~/core/providers';
import { CustomProvider } from './custom-provider';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <BaseAppProviders>
      <CustomProvider>
        {children}
      </CustomProvider>
    </BaseAppProviders>
  );
}
```

Then update `app/root.tsx` to import from extensions:

```typescript
// Try to import from extensions first, fallback to base
import { AppProviders } from '~/extensions/providers';
// or keep base import if no extension exists
```

## Extension Loading

Extensions are automatically loaded by the extension loader. The loader:
1. Checks for extension files in `app/extensions/`
2. Loads them if they exist
3. Falls back to base implementations if not found

No need to modify base code!

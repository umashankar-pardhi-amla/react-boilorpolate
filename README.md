# React Boilerplate - Enterprise Base Project

A highly extensible React boilerplate with enterprise-grade features and a plugin-based architecture that allows extending functionality without modifying base code.

## Features

- ✅ **Zustand** - State management with extensible store pattern
- ✅ **Tailwind CSS** - Utility-first CSS framework
- ✅ **Ant Design** - Enterprise UI component library
- ✅ **React Query** - Powerful data synchronization
- ✅ **Axios** - HTTP client with interceptors
- ✅ **Logger** - Centralized logging system
- ✅ **Extensible Architecture** - Override base implementations without touching base code

## Architecture

### Core Principles

1. **Base Code is Immutable** - Never modify files in `app/core/`
2. **Extensions Override** - Place overrides in `app/extensions/`
3. **Registry Pattern** - Automatic loading and merging of extensions
4. **Plugin System** - Similar to class override patterns in backend frameworks

### Directory Structure

```
app/
├── core/                    # Base implementations (DO NOT MODIFY)
│   ├── registry.ts          # Extension registry system
│   ├── logger/              # Base logger
│   ├── http/                # Base HTTP client
│   ├── query/                # Base React Query config
│   ├── store/                # Base Zustand patterns
│   ├── ui/                   # Base UI components
│   ├── components/           # Base React components
│   ├── hooks/                # Custom hooks
│   ├── stores/               # Example stores
│   ├── providers.tsx         # App providers
│   └── extension-loader.ts   # Extension loader
├── extensions/               # Your extensions (OVERRIDE HERE)
│   ├── logger/               # Override logger
│   ├── http/                 # Override HTTP client
│   ├── query/                # Override query config
│   ├── ui/                   # Override UI provider
│   └── components/           # Override components
└── routes/                   # Your routes
```

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

For a faster workflow (dev + test watch in one terminal): `npm run dev:all`. See [FAST_DEVELOPMENT.md](./FAST_DEVELOPMENT.md).

### Build

```bash
npm run build
```

### Testing

```bash
npm test          # Watch mode
npm run test:run  # Single run (CI)
npm run test:coverage  # With coverage
```

See [TESTING.md](./TESTING.md) for the full testing guide.

### Lint, format & spellcheck

```bash
npm run lint        # ESLint
npm run format      # Prettier
npm run spellcheck  # cspell (typos in app + tests)
```

### Quality at check-in (Husky)

- **Pre-commit:** lint-staged runs ESLint + cspell on staged files.
- **Pre-push:** typecheck + test:run.

See [QUALITY_CHECKS.md](./QUALITY_CHECKS.md).

### Production

Before deploying, use [PRODUCTION_CHECKLIST.md](./PRODUCTION_CHECKLIST.md). Run:

```bash
npm run typecheck
npm run test:run
npm run lint
npm run build
```

## Extending the Base

### 1. Override Logger

Create `app/extensions/logger/logger.ts`:

```typescript
import { BaseLogger, LogLevel } from '~/core/logger';

export class CustomLogger extends BaseLogger {
  error(message: string, error?: Error, context?: Record<string, any>): void {
    // Add custom error tracking
    super.error(message, error, context);
    // Send to error tracking service
  }
}

export const logger = new CustomLogger({
  level: LogLevel.DEBUG,
});
```

### 2. Override HTTP Client

Create `app/extensions/http/client.ts`:

```typescript
import { BaseHttpClient } from '~/core/http';

export class CustomHttpClient extends BaseHttpClient {
  protected getAuthToken(): string | null {
    // Custom token logic
    return localStorage.getItem('token');
  }

  protected async handleResponseError(error: AxiosError): Promise<never> {
    // Custom error handling
    if (error.response?.status === 401) {
      // Custom 401 handling
    }
    return super.handleResponseError(error);
  }
}

export const httpClient = new CustomHttpClient({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});
```

### 3. Override Query Config

Create `app/extensions/query/config.ts`:

```typescript
import { BaseQueryConfig } from '~/core/query';

export class CustomQueryConfig extends BaseQueryConfig {
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

export const queryConfig = new CustomQueryConfig();
```

### 4. Override UI Provider

Create `app/extensions/ui/provider.tsx`:

```typescript
import { BaseUIProvider } from '~/core/ui';

export function UIProvider({ children }: { children: React.ReactNode }) {
  return (
    <BaseUIProvider
      theme={{
        token: {
          colorPrimary: '#52c41a',
        },
      }}
    >
      {children}
    </BaseUIProvider>
  );
}
```

### 5. Override Components

Create `app/extensions/components/Button.tsx`:

```typescript
import { Button as BaseButton, ButtonProps } from '~/core/components';

export function Button(props: ButtonProps) {
  // Add custom styling or logic
  return <BaseButton {...props} className="custom-button" />;
}
```

## Usage Examples

### Using Logger

```typescript
import { logger } from '~/core/logger';

logger.info('User logged in', { userId: 123 });
logger.error('Failed to fetch data', error);
```

### Using HTTP Client

```typescript
import { httpClient } from '~/core/http';

// GET request
const response = await httpClient.get('/api/users');

// POST request
const newUser = await httpClient.post('/api/users', { name: 'John' });
```

### Using React Query

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

### Using Zustand Store

```typescript
import { createBaseStore } from '~/core/store';

interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
}

export const useUserStore = createBaseStore<UserStore>(
  { name: 'UserStore' },
  (set) => ({
    user: null,
    setUser: (user) => set({ user }),
  })
);
```

### Using Custom Hooks

```typescript
import { useHttp, useLogger } from '~/core/hooks';

function MyComponent() {
  const { httpClient } = useHttp();
  const { logger } = useLogger();

  // Use httpClient and logger
}
```

## Environment Variables

Create a `.env` file:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

## Best Practices

1. **Never modify `app/core/`** - Always use extensions
2. **Use TypeScript** - Full type safety
3. **Follow naming conventions** - Match extension file names to base files
4. **Document extensions** - Add comments explaining why you're overriding
5. **Test extensions** - Ensure overrides work correctly

## Performance

- Code splitting with React Router
- Lazy loading of extensions
- Optimized bundle size
- Tree-shaking enabled

## License

MIT

# React Boilerplate - Enterprise Base Project

A highly extensible React boilerplate with enterprise-grade features and a plugin-based architecture that allows extending functionality without modifying base code.

For a full picture of how the app is structured and how extensions work, see **[ARCHITECTURE.md](./ARCHITECTURE.md)**.

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

## Installation

```bash
git clone <repo-url>
cd react-boilorpolate
npm install
npm run e2e:install   # Install Playwright Chromium (once per machine)
```

Copy `.env.example` to `.env` and set `VITE_API_BASE_URL` if needed.

---

## Important commands

| Command | Purpose |
|--------|--------|
| **Development** | |
| `npm run dev` | Start dev server (HMR) |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| **Testing** | See [TESTING.md](./TESTING.md) for details. |
| `npm run e2e:install` | Install Playwright browser (once) |
| `npm run e2e` | Run E2E tests (starts dev server, runs tests) |
| `npm run e2e:ui` | Run E2E with Playwright UI (debug) |
| `npm run validate:all` | typecheck + lint + e2e (same as CI) |
| **Quality** | |
| `npm run typecheck` | TypeScript check |
| `npm run lint` | ESLint (app/ + e2e/) |
| `npm run format` | Prettier (uses .prettierrc) |
| `npm run spellcheck` | cspell – add unknown terms in cspell.json |
| **Other** | |
| `npm run build:analyze` | Build + bundle size report (build/stats.html) |
| `npm run validate` | typecheck + lint (no e2e) |

### Quality at check-in (Husky)

- **Pre-commit:** typecheck → lint → format + spellcheck on staged files. Commit blocked if any step fails.
- **Pre-push:** typecheck → e2e. Push blocked if tests fail.

On failure you see which step failed and which command to re-run.

### Before production

Run: `npm run typecheck && npm run lint && npm run e2e && npm run build`. Set env vars (`.env.example`). Replace demo auth with real backend. Optional: `setErrorReporter()` from `~/core/monitoring` (e.g. Sentry). Health: `GET /health`.

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

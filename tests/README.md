# Test Suite

All tests live here. **Base code in `app/core/` is never modified** – tests only import and assert.

## Structure

```
tests/
└── core/                    # Tests for app/core
    ├── stores/              # e.g. auth-store.test.ts
    ├── logger/              # e.g. base.test.ts
    └── components/          # e.g. Button.test.tsx
```

Mirror `app/core/` structure so each test file maps to one source file.

## Running

```bash
npm test          # Watch
npm run test:run  # Single run (CI)
npm run test:coverage
```

## Adding Tests

1. Create `tests/core/<path>/<name>.test.ts` or `.test.tsx`.
2. Import from `~/core/...` (e.g. `~/core/stores/auth-store`).
3. Do not add test files inside `app/` – keep base code clean.

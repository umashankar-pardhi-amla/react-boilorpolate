# Quality Checks (Husky + cspell + lint-staged)

Checks run automatically so quality is not missed at check-in.

---

## What runs when

### Pre-commit (on `git commit`)

Commit is allowed only if **all** of these pass, in order:

1. **Build** — `npm run typecheck` (code must compile).
2. **Lint** — `npm run lint` (full project ESLint).
3. **lint-staged** (on staged files only):
   - **`app/**/*.{ts,tsx}`** → ESLint (with fix) + Prettier + cspell
   - **`tests/**/*.{ts,tsx}`** → Prettier + cspell
   - **`app/**/*.{css,json}`** → Prettier + cspell

If any step fails, the commit is blocked and you see a clear message:
- **Which step failed** (typecheck, lint, or format/spellcheck)
- **Why it was blocked** (e.g. "TypeScript / typecheck failed")
- **What to run** to fix and re-check (e.g. `npm run typecheck`)

### Pre-push (on `git push`)

- **Typecheck** (`npm run typecheck`)
- **Tests** (`npm run test:run`)

If either fails, the push is blocked and you see a clear message:
- **Which step failed** (typecheck or tests)
- **Why push was blocked** (e.g. "One or more tests failed")
- **What to run** to fix and re-check (e.g. `npm run test:run`)

---

## Prettier (one style for everyone)

- **Config:** `.prettierrc` — do not override in your IDE; use the project config so every check-in looks the same.
- **Format command:** `npm run format` (or let pre-commit run it on staged files).
- **VS Code / Cursor:** Set `"editor.formatOnSave": true` and use the project Prettier (default formatter: Prettier). The repo config wins so everyone follows the same approach.

---

## Commands

| Command | Purpose |
|--------|--------|
| `npm run format` | Format app + tests with Prettier (uses `.prettierrc`) |
| `npm run spellcheck` | Run cspell on app + tests |
| `npm run spellcheck:ci` | Run cspell on app + tests + `*.md` (e.g. in CI) |
| `npm run validate` | Typecheck + test:run + lint (full local check) |

---

## cspell

- **Config:** `cspell.json`
- **Custom words:** Add valid identifiers/terms in `cspell.json` → `words` so they are not reported as typos.
- **Ignore:** `ignorePaths` (e.g. node_modules, build, coverage). Add more there if needed.
- **Add a word:** Edit `cspell.json` and add to the `words` array, or use inline: `// cspell:word myword`

---

## Husky

- **Hooks:** `.husky/pre-commit`, `.husky/pre-push`
- **Setup:** Runs automatically after `npm install` (via `prepare` script).
- **Bypass (emergency only):** `git commit --no-verify` or `git push --no-verify` (avoid in normal workflow).

---

## Disable hooks temporarily

```bash
# Skip pre-commit and pre-push (use sparingly)
HUSKY=0 git commit -m "message"
HUSKY=0 git push
```

---

## CI

Run the same checks in CI:

```bash
npm run typecheck
npm run test:run
npm run lint
npm run spellcheck:ci
```

Or use `npm run validate` and add `npm run spellcheck:ci` to your pipeline.

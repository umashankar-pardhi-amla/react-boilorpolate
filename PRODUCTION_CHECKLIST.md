# Production Checklist

Use this checklist before deploying to production. No temporary or placeholder items – everything is intended for long-term use.

---

## 1. Environment & Config

- [ ] **Environment variables** – Set all required vars in production (see `.env.example`).
- [ ] **Env validation** – `app/core/config/env.ts` uses zod; extend in `app/extensions/config/env.ts` if needed.
- [ ] **API base URL** – Set `VITE_API_BASE_URL` for production API.
- [ ] **Secrets** – Never commit secrets; use env vars or a secrets manager.

---

## 2. Security

- [ ] **Auth** – Replace demo auth in Login/Signup with real backend (JWT/OAuth).
- [ ] **HTTP client** – Use `app/extensions/http/client.ts` to add auth headers, refresh token, and error handling.
- [ ] **HTTPS** – Serve app over HTTPS in production.
- [ ] **CSP** – Add Content-Security-Policy headers if required.
- [ ] **XSS** – React escapes by default; avoid `dangerouslySetInnerHTML` unless necessary and sanitized.

---

## 3. Testing

- [ ] **Unit tests** – Run `npm run test:run` before deploy.
- [ ] **Coverage** – Run `npm run test:coverage` and maintain coverage for critical paths.
- [ ] **E2E** – Add Playwright/Cypress for critical flows (login, main features) if needed.
- [ ] **CI** – Run tests (and lint/typecheck) in CI on every PR.

---

## 4. Code Quality

- [ ] **TypeScript** – `npm run typecheck` passes with no errors.
- [ ] **Lint** – `npm run lint` passes (fix or adjust rules as needed).
- [ ] **Format** – `npm run format` to keep style consistent.
- [ ] **No base edits** – All overrides live in `app/extensions/`; `app/core/` is unchanged.

---

## 5. Performance

- [ ] **Build** – `npm run build` succeeds; fix any build warnings.
- [ ] **Bundle size** – Check build output; use code-splitting/lazy routes where appropriate.
- [ ] **Images** – Optimize and use appropriate formats (e.g. WebP where supported).
- [ ] **Caching** – Configure cache headers for static assets and API where applicable.

---

## 6. Error Handling & UX

- [ ] **404** – Handled via root ErrorBoundary and `NotFound` page.
- [ ] **403** – `/unauthorized` route and `Unauthorized` page; use in AuthLayout when permissions fail.
- [ ] **Error boundary** – Root ErrorBoundary handles uncaught errors; extend if needed.
- [ ] **Loading states** – Use Suspense or loading UI for async routes/data where needed.
- [ ] **Logger** – Use `~/core/logger` (or extended logger) for errors and key events; plug in remote logging if required.

---

## 7. Accessibility & SEO

- [ ] **a11y** – Use semantic HTML, ARIA where needed, keyboard navigation, and test with aXe or similar.
- [ ] **Meta tags** – Route-level `meta()` for title/description (already used); add OG/twitter if needed.
- [ ] **Lang** – Root layout has `lang="en"`; set correctly for your locale.

---

## 8. Deployment & Ops

- [ ] **Docker** – Use project `Dockerfile` for containerized deploy; build and run in a non-root user if required.
- [ ] **Health check** – Add a health endpoint or static health file if your host expects it.
- [ ] **Logging** – Ensure logs (from logger and server) go to your logging system.
- [ ] **Monitoring** – Add error tracking (e.g. Sentry) and APM if needed; hook into logger/ErrorBoundary.

---

## 9. Documentation

- [ ] **README** – Update with project-specific setup, env vars, and deploy steps.
- [ ] **ARCHITECTURE.md** – Keep in sync with actual structure and extension points.
- [ ] **API** – Document backend API (or link to OpenAPI/Swagger) for frontend consumers.

---

## 10. Extensions & Overrides

- [ ] **Logger** – Override in `app/extensions/logger/logger.ts` for level, format, and remote logging.
- [ ] **HTTP client** – Override in `app/extensions/http/client.ts` for auth and error handling.
- [ ] **UI provider** – Override in `app/extensions/ui/provider.tsx` for theme and locale.
- [ ] **Pages** – Override Login, Signup, Dashboard, etc. in `app/extensions/pages/` as needed.
- [ ] **Layouts** – Override Auth/Public layouts in `app/extensions/layouts/` for branding and structure.

---

## Quick Commands

```bash
npm run typecheck   # Type check
npm run test:run    # Run tests
npm run lint        # Lint
npm run format      # Format
npm run build       # Production build
```

---

This checklist is part of the base project; extend it in your repo for project-specific items (e.g. feature flags, feature toggles, compliance).

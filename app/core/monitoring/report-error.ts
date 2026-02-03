/**
 * Error reporting for production.
 * Plug in Sentry (or similar) here – one place for ErrorBoundary and logger.
 * Set VITE_ERROR_REPORTING_DSN or use window.__reportError in extensions.
 */

export interface ErrorReport {
  message: string;
  stack?: string;
  context?: Record<string, unknown>;
  level?: "error" | "warn";
}

type ErrorReporter = (report: ErrorReport) => void;

let reporter: ErrorReporter | null = null;

/**
 * Set a custom reporter (e.g. Sentry). Call from app init or extension.
 */
export function setErrorReporter(fn: ErrorReporter): void {
  reporter = fn;
}

/**
 * Report an error. Used by ErrorBoundary and logger.
 * If no reporter is set, only console.error in dev.
 */
export function reportError(report: ErrorReport): void {
  if (reporter) {
    try {
      reporter(report);
    } catch (e) {
      console.error("[reportError] Reporter failed:", e);
    }
    return;
  }
  if (import.meta.env?.DEV) {
    console.error("[reportError]", report.message, report.stack ?? "", report.context ?? {});
  }
}

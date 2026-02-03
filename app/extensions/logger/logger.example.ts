/**
 * Example Logger Extension
 *
 * Copy this file to logger.ts to override the base logger
 *
 * This is an EXAMPLE file - rename to logger.ts to use it
 */

import { BaseLogger, LogLevel } from "~/core/logger";

export class ExtendedLogger extends BaseLogger {
  error(message: string, error?: Error, context?: Record<string, unknown>): void {
    // Add custom error tracking (e.g., Sentry, LogRocket, etc.)
    // Example: Sentry.captureException(error);

    // Call base implementation
    super.error(message, error, context);

    // Add additional custom logic
    this.trackError(message, error, context);
  }

  private trackError(message: string, _error?: Error, _context?: Record<string, unknown>): void {
    // Custom error tracking implementation
    // This could send to an error tracking service
    const gtag =
      typeof window !== "undefined"
        ? (window as Window & { gtag?: (a: string, b: string, c: object) => void }).gtag
        : undefined;
    if (gtag) {
      gtag("event", "exception", {
        description: message,
        fatal: false,
      });
    }
  }
}

export const logger = new ExtendedLogger({
  level: import.meta.env.DEV ? LogLevel.DEBUG : LogLevel.INFO,
  enableConsole: true,
  // enableRemote: true,
  // remoteEndpoint: '/api/logs',
});

/**
 * Extended Logger – extensible function/class example.
 * Adds prefix and optional error tracking. Overrides base core/logger.
 */

import { BaseLogger, LogLevel } from '~/core/logger';

const PREFIX = '[App]';

export class ExtendedLogger extends BaseLogger {
  protected formatMessage(level: LogLevel, message: string, context?: Record<string, unknown>): string {
    const base = super.formatMessage(level, message, context);
    return `${PREFIX} ${base}`;
  }

  error(message: string, error?: Error, context?: Record<string, unknown>): void {
    super.error(message, error, context);
    if (typeof window !== 'undefined' && (window as unknown as { __trackError?: (m: string, e?: Error) => void }).__trackError) {
      (window as unknown as { __trackError: (m: string, e?: Error) => void }).__trackError(message, error);
    }
  }
}

export const logger = new ExtendedLogger({
  level: import.meta.env.DEV ? LogLevel.DEBUG : LogLevel.INFO,
  enableConsole: true,
  context: { app: 'extended' },
});

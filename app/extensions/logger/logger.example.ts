/**
 * Example Logger Extension
 * 
 * Copy this file to logger.ts to override the base logger
 * 
 * This is an EXAMPLE file - rename to logger.ts to use it
 */

import { BaseLogger, LogLevel } from '~/core/logger';

export class ExtendedLogger extends BaseLogger {
  error(message: string, error?: Error, context?: Record<string, any>): void {
    // Add custom error tracking (e.g., Sentry, LogRocket, etc.)
    // Example: Sentry.captureException(error);
    
    // Call base implementation
    super.error(message, error, context);
    
    // Add additional custom logic
    this.trackError(message, error, context);
  }

  private trackError(message: string, error?: Error, context?: Record<string, any>): void {
    // Custom error tracking implementation
    // This could send to an error tracking service
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'exception', {
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

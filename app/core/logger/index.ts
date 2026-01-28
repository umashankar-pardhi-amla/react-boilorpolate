/**
 * Logger Module
 * 
 * Provides a logger instance that can be extended
 */

import { registry, createRegistryKey } from '../registry';
import { BaseLogger, LogLevel } from './base';
import type { LoggerConfig } from './base';

const LOGGER_KEY = createRegistryKey('core', 'logger');

// Register base logger
let baseLoggerInstance: BaseLogger | null = null;

export function createLogger(config?: Partial<LoggerConfig>): BaseLogger {
  if (!baseLoggerInstance) {
    baseLoggerInstance = new BaseLogger(config);
    registry.registerBase(LOGGER_KEY, baseLoggerInstance);
  }
  return baseLoggerInstance;
}

export async function getLogger(): Promise<BaseLogger> {
  // Try to load extension if it exists
  if (registry.hasExtension(LOGGER_KEY)) {
    return await registry.get<BaseLogger>(LOGGER_KEY);
  }
  return registry.getBase<BaseLogger>(LOGGER_KEY);
}

// Create default logger instance
export const logger = createLogger({
  level: import.meta.env.DEV ? LogLevel.DEBUG : LogLevel.INFO,
  enableConsole: true,
});

// Export types
export { LogLevel, BaseLogger };
export type { LoggerConfig, LogEntry } from './base';

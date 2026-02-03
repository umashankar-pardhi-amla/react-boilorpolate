/**
 * Base Logger Implementation
 *
 * Extend this by creating app/extensions/logger/logger.ts
 */

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  NONE = 4,
}

export interface LoggerConfig {
  level: LogLevel;
  enableConsole: boolean;
  enableRemote?: boolean;
  remoteEndpoint?: string;
  context?: Record<string, unknown>;
}

export interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: Date;
  context?: Record<string, unknown>;
  error?: Error;
  stack?: string;
}

export class BaseLogger {
  protected config: LoggerConfig;

  constructor(config: Partial<LoggerConfig> = {}) {
    this.config = {
      level: LogLevel.INFO,
      enableConsole: true,
      ...config,
    };
  }

  protected shouldLog(level: LogLevel): boolean {
    return level >= this.config.level;
  }

  protected formatMessage(
    level: LogLevel,
    message: string,
    context?: Record<string, unknown>
  ): string {
    const timestamp = new Date().toISOString();
    const levelName = LogLevel[level];
    const contextStr = context ? ` ${JSON.stringify(context)}` : "";
    return `[${timestamp}] [${levelName}] ${message}${contextStr}`;
  }

  protected createLogEntry(
    level: LogLevel,
    message: string,
    context?: Record<string, unknown>,
    error?: Error
  ): LogEntry {
    return {
      level,
      message,
      timestamp: new Date(),
      context: { ...this.config.context, ...context },
      error,
      stack: error?.stack,
    };
  }

  protected async sendToRemote(entry: LogEntry): Promise<void> {
    if (!this.config.enableRemote || !this.config.remoteEndpoint) {
      return;
    }

    try {
      // Base implementation - can be overridden
      await fetch(this.config.remoteEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entry),
      });
    } catch (error) {
      // Silently fail to avoid logging loops
      console.error("Failed to send log to remote:", error);
    }
  }

  debug(message: string, context?: Record<string, unknown>): void {
    if (!this.shouldLog(LogLevel.DEBUG)) return;

    const entry = this.createLogEntry(LogLevel.DEBUG, message, context);

    if (this.config.enableConsole) {
      console.debug(this.formatMessage(LogLevel.DEBUG, message, entry.context));
    }

    this.sendToRemote(entry).catch(() => {});
  }

  info(message: string, context?: Record<string, unknown>): void {
    if (!this.shouldLog(LogLevel.INFO)) return;

    const entry = this.createLogEntry(LogLevel.INFO, message, context);

    if (this.config.enableConsole) {
      console.info(this.formatMessage(LogLevel.INFO, message, entry.context));
    }

    this.sendToRemote(entry).catch(() => {});
  }

  warn(message: string, context?: Record<string, unknown>): void {
    if (!this.shouldLog(LogLevel.WARN)) return;

    const entry = this.createLogEntry(LogLevel.WARN, message, context);

    if (this.config.enableConsole) {
      console.warn(this.formatMessage(LogLevel.WARN, message, entry.context));
    }

    this.sendToRemote(entry).catch(() => {});
  }

  error(message: string, error?: Error, context?: Record<string, unknown>): void {
    if (!this.shouldLog(LogLevel.ERROR)) return;

    const entry = this.createLogEntry(LogLevel.ERROR, message, context, error);

    if (this.config.enableConsole) {
      console.error(this.formatMessage(LogLevel.ERROR, message, entry.context), error);
    }

    this.sendToRemote(entry).catch(() => {});
  }

  setLevel(level: LogLevel): void {
    this.config.level = level;
  }

  setContext(context: Record<string, unknown>): void {
    this.config.context = { ...this.config.context, ...context };
  }

  getConfig(): LoggerConfig {
    return { ...this.config };
  }
}

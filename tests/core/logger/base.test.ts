/**
 * Base logger unit tests.
 * Tests app/core/logger/base – base code stays untouched.
 */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { BaseLogger, LogLevel } from "~/core/logger/base";

describe("BaseLogger", () => {
  let logger: BaseLogger;
  let consoleSpy: { debug: ReturnType<typeof vi.spyOn>; info: ReturnType<typeof vi.spyOn>; warn: ReturnType<typeof vi.spyOn>; error: ReturnType<typeof vi.spyOn> };

  beforeEach(() => {
    logger = new BaseLogger({
      level: LogLevel.DEBUG,
      enableConsole: true,
    });
    consoleSpy = {
      debug: vi.spyOn(console, "debug").mockImplementation(() => {}),
      info: vi.spyOn(console, "info").mockImplementation(() => {}),
      warn: vi.spyOn(console, "warn").mockImplementation(() => {}),
      error: vi.spyOn(console, "error").mockImplementation(() => {}),
    };
  });

  it("logs info message", () => {
    logger.info("test message");
    expect(consoleSpy.info).toHaveBeenCalled();
  });

  it("logs error message", () => {
    logger.error("error message");
    expect(consoleSpy.error).toHaveBeenCalled();
  });

  it("respects log level", () => {
    consoleSpy.info.mockClear();
    consoleSpy.error.mockClear();
    const highLevelLogger = new BaseLogger({
      level: LogLevel.ERROR,
      enableConsole: true,
    });
    highLevelLogger.info("should not log");
    expect(consoleSpy.info).not.toHaveBeenCalled();
    highLevelLogger.error("should log");
    expect(consoleSpy.error).toHaveBeenCalled();
  });
});

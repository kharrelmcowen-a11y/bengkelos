type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogContext {
  shopId?: string;
  staffId?: string;
  userId?: string;
  [key: string]: unknown;
}

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  event: string;
  message?: string;
  context?: LogContext;
  error?: {
    name: string;
    message: string;
    stack?: string;
  };
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development';
  private logBuffer: LogEntry[] = [];
  private maxBufferSize = 100;

  private formatLog(entry: LogEntry): string {
    return JSON.stringify(entry);
  }

  private shouldLog(level: LogLevel): boolean {
    if (this.isDevelopment) return true;
    // In production, only log info, warn, and error by default
    return level !== 'debug';
  }

  private writeLog(entry: LogEntry) {
    if (!this.shouldLog(entry.level)) return;

    const formattedLog = this.formatLog(entry);
    
    switch (entry.level) {
      case 'error':
        console.error(formattedLog);
        break;
      case 'warn':
        console.warn(formattedLog);
        break;
      case 'debug':
        console.debug(formattedLog);
        break;
      default:
        console.log(formattedLog);
    }

    // Buffer logs for potential export or error reporting
    this.addToBuffer(entry);
  }

  private addToBuffer(entry: LogEntry) {
    this.logBuffer.push(entry);
    if (this.logBuffer.length > this.maxBufferSize) {
      this.logBuffer.shift(); // Remove oldest entry
    }
  }

  private createEntry(
    level: LogLevel,
    event: string,
    message?: string,
    context?: LogContext,
    error?: Error
  ): LogEntry {
    return {
      timestamp: new Date().toISOString(),
      level,
      event,
      message,
      context,
      error: error ? {
        name: error.name,
        message: error.message,
        stack: error.stack,
      } : undefined,
    };
  }

  info(event: string, message?: string, context?: LogContext) {
    const entry = this.createEntry('info', event, message, context);
    this.writeLog(entry);
  }

  warn(event: string, message?: string, context?: LogContext) {
    const entry = this.createEntry('warn', event, message, context);
    this.writeLog(entry);
  }

  error(event: string, error: Error, context?: LogContext) {
    const entry = this.createEntry('error', event, error.message, context, error);
    this.writeLog(entry);
  }

  debug(event: string, message?: string, context?: LogContext) {
    const entry = this.createEntry('debug', event, message, context);
    this.writeLog(entry);
  }

  // Get recent logs for debugging
  getRecentLogs(count: number = 20): LogEntry[] {
    return this.logBuffer.slice(-count);
  }

  // Clear the log buffer
  clearBuffer() {
    this.logBuffer = [];
  }

  // Export logs as JSON string
  exportLogs(): string {
    return JSON.stringify(this.logBuffer, null, 2);
  }
}

// Singleton instance
export const logger = new Logger();

// Convenience functions for action logging
export function logAction(actionName: string, context?: LogContext) {
  logger.info(`action:${actionName}`, undefined, context);
}

export function logActionError(actionName: string, error: Error, context?: LogContext) {
  logger.error(`action:${actionName}`, error, context);
}

export function logDatabaseQuery(query: string, context?: LogContext) {
  logger.debug('database:query', query, context);
}

export function logDatabaseError(query: string, error: Error, context?: LogContext) {
  logger.error('database:error', error, { query, ...context });
}
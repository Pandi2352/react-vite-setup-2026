type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: Record<string, unknown>;
}

class LoggerService {
  private isDevelopment = import.meta.env.DEV;

  private formatEntry(level: LogLevel, message: string, context?: Record<string, unknown>): LogEntry {
    return {
      timestamp: new Date().toISOString(),
      level,
      message,
      context,
    };
  }

  info(message: string, context?: Record<string, unknown>) {
    const entry = this.formatEntry('info', message, context);
    if (this.isDevelopment) {
      console.log(`[INFO] [${entry.timestamp}] ${message}`, context || '');
    }
  }

  warn(message: string, context?: Record<string, unknown>) {
    const entry = this.formatEntry('warn', message, context);
    console.warn(`[WARN] [${entry.timestamp}] ${message}`, context || '');
  }

  error(message: string, error?: Error | unknown, context?: Record<string, unknown>) {
    const entry = this.formatEntry('error', message, {
      ...context,
      error: error instanceof Error ? { message: error.message, stack: error.stack } : error,
    });

    console.error(`[ERROR] [${entry.timestamp}] ${message}`, error, context || '');

    // Production Hook for Sentry / LogRocket Integration
    if (!this.isDevelopment && typeof window !== 'undefined') {
      // e.g. Sentry.captureException(error);
    }
  }

  debug(message: string, context?: Record<string, unknown>) {
    if (this.isDevelopment) {
      const entry = this.formatEntry('debug', message, context);
      console.debug(`[DEBUG] [${entry.timestamp}] ${message}`, context || '');
    }
  }
}

export const logger = new LoggerService();

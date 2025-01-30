function baseInfoFormat(message: string) {
  return `ℹ️ <b>Info:</b>\n${message}`
}

function baseErrorFormat(message: string) {
  return `❌ <b>Error:</b>\n${message}`
}

function baseSuccessFormat(message: string) {
  return `✅ <b>Success:</b>\n${message}`
}

function baseWarnFormat(message: string) {
  return `🚨 <b>Warning:</b>\n${message}`
}

/**
 * TelegramLogger options interface for configuring the logger instance
 */
export interface TelegramLoggerConfig {
  /** Telegram Bot Token obtained from BotFather */
  botToken: string
  /** Telegram Chat ID where messages will be sent */
  chatId: number
  /** Custom formatter for info messages. If not provided, uses default format */
  infoFormatter?: (message: string) => string
  /** Custom formatter for error messages. If not provided, uses default format */
  errorFormatter?: (message: string) => string
  /** Custom formatter for success messages. If not provided, uses default format */
  successFormatter?: (message: string) => string
  /** Custom formatter for warning messages. If not provided, uses default format */
  warnFormatter?: (message: string) => string
}

/**
 * TelegramLogger class for sending formatted log messages to a Telegram chat
 *
 * @param botToken - Telegram Bot Token obtained from BotFather
 * @param chatId - Telegram Chat ID where messages will be sent
 *
 * // OPTIONALS
 *
 * @param infoFormatter - Optional custom formatter for info messages. If not provided, uses default format with ℹ️ emoji
 * @param errorFormatter - Optional custom formatter for error messages. If not provided, uses default format with ❌ emoji
 * @param successFormatter - Optional custom formatter for success messages. If not provided, uses default format with ✅ emoji
 * @param warnFormatter - Optional custom formatter for warning messages. If not provided, uses default format with 🚨 emoji
 */
export class TelegramLogger {
  private readonly chatId: number
  private readonly baseUrl: string
  private readonly infoFormatter: (message: string) => string
  private readonly errorFormatter: (message: string) => string
  private readonly successFormatter: (message: string) => string
  private readonly warnFormatter: (message: string) => string

  constructor({ botToken, chatId, infoFormatter, errorFormatter, successFormatter, warnFormatter }: TelegramLoggerConfig) {
    this.chatId = chatId
    this.baseUrl = `https://api.telegram.org/bot${botToken}`
    this.infoFormatter = infoFormatter || baseInfoFormat
    this.errorFormatter = errorFormatter || baseErrorFormat
    this.successFormatter = successFormatter || baseSuccessFormat
    this.warnFormatter = warnFormatter || baseWarnFormat
  }

  /**
   * Generic method to send a message to Telegram
   * @param message - The message to send
   */
  public async log(message: string): Promise<void> {
    try {
      await fetch(`${this.baseUrl}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: this.chatId,
          text: message,
        }),
      })
    } catch (error) {
      console.error('Failed to send message to Telegram:', error)
    }
  }

  /**
   * Sends an error message to Telegram
   * @param error - Error object or error message string
   * @example
   * ```typescript
   * await logger.logError('Database connection failed');
   * // or
   * await logger.logError(new Error('Database connection failed'));
   * ```
   */
  public async logError(error: Error | string): Promise<void> {
    const errorMessage = error instanceof Error ? error.message : error
    const formattedMessage = this.errorFormatter(errorMessage)
    await this.log(formattedMessage)
  }

  /**
   * Sends an info message to Telegram
   * @param message - Information message to send
   * @example
   * ```typescript
   * await logger.logInfo('User logged in successfully');
   * ```
   */
  public async logInfo(message: string): Promise<void> {
    const formattedMessage = this.infoFormatter(message)
    await this.log(formattedMessage)
  }

  /**
   * Sends a success message to Telegram
   * @param message - Success message to send
   * @example
   * ```typescript
   * await logger.logSuccess('Backup completed successfully');
   * ```
   */
  public async logSuccess(message: string): Promise<void> {
    const formattedMessage = this.successFormatter(message)
    await this.log(formattedMessage)
  }

  /**
   * Sends a warning message to Telegram
   * @param message - Warning message to send
   * @example
   * ```typescript
   * await logger.logWarn('Low disk space');
   * ```
   */
  public async logWarn(message: string): Promise<void> {
    const formattedMessage = this.warnFormatter(message)
    await this.log(formattedMessage)
  }
}

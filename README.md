# @monkhai/telelogger

A lightweight, easy-to-use Telegram logging utility for Node.js applications.

## Features

- Simple integration with Telegram Bot API
- Multiple log levels (info, error, success, warn)
- Customizable message formatters
- TypeScript support
- Zero dependencies

## Installation

Choose your preferred package manager:

```bash
# npm
npm install @monkhai/telelogger

# yarn
yarn add @monkhai/telelogger

# pnpm
pnpm add @monkhai/telelogger

# bun
bun add @monkhai/telelogger
```

## Quick Start

```ts
import { TelegramLogger } from '@monkhai/telelogger'

const logger = new TelegramLogger({
  botToken: 'YOUR_BOT_TOKEN',
  chatId: YOUR_CHAT_ID,
})

// Basic logging
logger.logInfo('Hello, world!')
logger.logError('Something went wrong!')
logger.logSuccess('Operation completed successfully!')
logger.logWarn('Warning: Resource running low')
```

## Configuration

The `TelegramLogger` constructor accepts a configuration object with the following options:

```ts
export interface TelegramLoggerConfig {
  /** Your Telegram Bot Token */
  botToken: string

  /** Target Chat ID where messages will be sent */
  chatId: number

  /** The formatting of the message. */
  parse_mode?: 'HTML' | 'Markdown' | 'MarkdownV2'

  /** Custom formatter for info messages */
  infoFormatter?: (message: string) => string

  /** Custom formatter for error messages */
  errorFormatter?: (message: string) => string

  /** Custom formatter for success messages */
  successFormatter?: (message: string) => string

  /** Custom formatter for warning messages */
  warnFormatter?: (message: string) => string
}
```

### Custom Formatters Example

You can customize how messages are formatted before they're sent to Telegram:
notice the `<b>` tags in the formatters, adding bold text to the titles.
This allows you to add more information to the messages, such as links, bold text, etc.
for more information on the different parse modes, see the [Telegram API documentation](https://core.telegram.org/bots/api#formatting-options).

```ts
const logger = new TelegramLogger({
  botToken: 'YOUR_BOT_TOKEN',
  chatId: 'YOUR_CHAT_ID',
  parse_mode: 'HTML', // allows us to add <b> tags and more
  infoFormatter: message => `ℹ️ <b>INFO:</b>\n${message}`,
  errorFormatter: message => `❌ <b>ERROR:</b>\n${message}`,
  successFormatter: message => `✅ <b>SUCCESS:</b>\n${message}`,
  warnFormatter: message => `🚨️ <b>WARNING:</b>\n${message}`,
})
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

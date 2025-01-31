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
  chatId: 'YOUR_CHAT_ID',
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

### Custom Formatters

You can customize how messages are formatted before they're sent to Telegram:

```ts
const logger = new TelegramLogger({
  botToken: 'YOUR_BOT_TOKEN',
  chatId: 'YOUR_CHAT_ID',
  infoFormatter: message => `ℹ️ INFO: ${message}`,
  errorFormatter: message => `❌ ERROR: ${message}`,
  successFormatter: message => `✅ SUCCESS: ${message}`,
  warnFormatter: message => `⚠️ WARNING: ${message}`,
})
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

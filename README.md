# AiCoin Skills for OpenClaw

9 skills wrapping [AiCoin Open API](https://www.aicoin.com/opendata) — real-time crypto market data, on-chain analytics, exchange trading, and bot management. 40 tools total.

## Installation

```bash
npx skills add bbx-com/aicoin-skills
```

Or from [ClawHub](https://clawhub.ai):

```bash
clawhub install aicoin-coin-data
```

Or via install script:

```bash
curl -sL https://raw.githubusercontent.com/bbx-com/aicoin-skills/main/install.sh | bash
```

## Skills

| Skill | Tools | Description |
|-------|-------|-------------|
| [aicoin-coin-data](coin-data/) | 12 | Coin prices, AI analysis, funding rates, liquidation, open interest |
| [aicoin-market-data](market-data/) | 18 | K-lines, indicators, indexes, crypto stocks, treasury, depth |
| [aicoin-news-content](news-content/) | 6 | News articles, flash updates, exchange listings |
| [aicoin-features-signals](features-signals/) | 16 | Long/short ratio, whale orders, trading signals |
| [aicoin-hyperliquid](hyperliquid/) | 30 | HL tickers, whales, liquidations, trader analytics, smart money |
| [aicoin-exchange-trading](exchange-trading/) | 14 | CCXT exchange trading (Binance, OKX, Bybit, etc.) |
| [aicoin-freqtrade](freqtrade/) | 24 | Freqtrade bot control and monitoring |
| [aicoin-freqtrade-dev](freqtrade-dev/) | 14 | Backtesting, strategy management, pair lists |
| [aicoin-guide](guide/) | — | Setup and configuration guide |

## Environment Variables

```bash
# AiCoin API (optional — built-in free key available with IP rate limits)
AICOIN_ACCESS_KEY_ID="your-key"
AICOIN_ACCESS_SECRET="your-secret"

# Exchange trading (CCXT)
BINANCE_API_KEY="xxx"
BINANCE_API_SECRET="xxx"

# Freqtrade bot
FREQTRADE_URL="http://localhost:8080"
FREQTRADE_USERNAME="freqtrader"
FREQTRADE_PASSWORD="xxx"
```

## Usage

Each skill bundles CLI scripts. The agent runs them automatically, or you can call them directly:

```bash
node <skill>/scripts/<name>.mjs <action> '{"param":"value"}'
```

## License

MIT

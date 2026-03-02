---
name: aicoin-exchange-trading
description: >
  Trade on crypto exchanges via CCXT. Query tickers, orderbook, OHLCV.
  Manage balance, positions, orders. Place and cancel orders, set leverage.
metadata:
  openclaw:
    requires:
      env:
        - "BINANCE_API_KEY"
        - "BINANCE_API_SECRET"
    homepage: "https://www.aicoin.com/opendata"
    source: "https://github.com/bbx-com/aicoin-skills"
    license: "MIT"
---

# Exchange Trading (CCXT)

Trade on crypto exchanges via CCXT.

## Prerequisites

```bash
npm install ccxt
```

Exchange API keys via environment variables (public data queries don't require keys):
```bash
export BINANCE_API_KEY="xxx"
export BINANCE_API_SECRET="xxx"
export OKX_API_KEY="xxx"
export OKX_API_SECRET="xxx"
export OKX_PASSWORD="xxx"
```

## Script

`scripts/exchange.mjs`

## Usage

```bash
node scripts/exchange.mjs <action> [json-params]
```

## Actions

### Public (no API key required)
| Action | Description | Params |
|--------|-------------|--------|
| `exchanges` | Supported exchanges | None |
| `markets` | Market list | `{"exchange":"binance","market_type":"swap","base":"BTC"}` |
| `ticker` | Real-time ticker | `{"exchange":"binance","symbol":"BTC/USDT"}` |
| `orderbook` | Order book | `{"exchange":"binance","symbol":"BTC/USDT"}` |
| `trades` | Recent trades | `{"exchange":"binance","symbol":"BTC/USDT"}` |
| `ohlcv` | OHLCV candles | `{"exchange":"binance","symbol":"BTC/USDT","timeframe":"1h"}` |

### Account (API key required)
| Action | Description | Params |
|--------|-------------|--------|
| `balance` | Account balance | `{"exchange":"binance"}` |
| `positions` | Open positions | `{"exchange":"binance","market_type":"swap"}` |
| `open_orders` | Open orders | `{"exchange":"binance","symbol":"BTC/USDT"}` |

### Trading (API key required)
| Action | Description | Params |
|--------|-------------|--------|
| `create_order` | Place order | `{"exchange":"binance","symbol":"BTC/USDT","type":"limit","side":"buy","amount":0.01,"price":60000}` |
| `cancel_order` | Cancel order | `{"exchange":"binance","symbol":"BTC/USDT","order_id":"xxx"}` |
| `set_leverage` | Set leverage | `{"exchange":"binance","symbol":"BTC/USDT","leverage":10}` |
| `set_margin_mode` | Margin mode | `{"exchange":"binance","symbol":"BTC/USDT","margin_mode":"cross"}` |
| `transfer` | Transfer funds | `{"exchange":"binance","code":"USDT","amount":100,"from_account":"spot","to_account":"future"}` |

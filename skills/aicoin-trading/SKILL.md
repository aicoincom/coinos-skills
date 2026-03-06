---
name: aicoin-trading
description: "This skill should be used when the user asks about exchange trading, placing orders, checking balance, viewing positions, order history, market list, leverage, margin mode, transferring funds, automated trading, funding rate comparison, or funding rate arbitrage. Use when user says: 'buy BTC', 'sell ETH', 'check balance', 'place order', 'open long', 'open short', 'close position', 'set leverage', 'auto trade', 'view positions', 'funding rate arbitrage', 'compare funding rates', '下单', '买入', '卖出', '查余额', '做多', '做空', '平仓', '设杠杆', '自动交易', '合约交易', '现货交易', '资金费率套利', '资金费率对比', '各交易所费率'. Supports Binance, OKX, Bybit, Bitget, Gate.io, HTX, Pionex, Hyperliquid. For crypto prices/charts/news, use aicoin-market. For Freqtrade strategies, use aicoin-freqtrade. For Hyperliquid whale tracking/analytics (not trading), use aicoin-hyperliquid."
metadata: { "openclaw": { "primaryEnv": "AICOIN_ACCESS_KEY_ID", "requires": { "bins": ["node"] }, "homepage": "https://www.aicoin.com/opendata", "source": "https://github.com/aicoincom/coinos-skills", "license": "MIT" } }
---

# AiCoin Trading

Exchange trading toolkit powered by [AiCoin Open API](https://www.aicoin.com/opendata). Buy, sell, manage positions across 9 major exchanges.

**Version:** 1.0.0

## Critical Rules

1. **NEVER place orders without explicit user confirmation.** `create_order` returns a preview first. Show it, wait for "确认"/"yes", THEN re-run with `"confirmed":"true"`.
2. **NEVER auto-adjust order parameters** (size, leverage). If balance is insufficient, tell the user.
3. **NEVER sell or close positions** unless the user specifically asks.
4. **NEVER write custom CCXT/Python code.** ALL exchange operations MUST go through `exchange.mjs`.
5. **NEVER run `env` or `printenv`** — leaks API secrets.
6. **Scripts auto-load `.env`** — never pass credentials inline.

## Quick Reference

| Task | Command |
|------|---------|
| Balance | `node scripts/exchange.mjs balance '{"exchange":"okx"}'` |
| Ticker | `node scripts/exchange.mjs ticker '{"exchange":"binance","symbol":"BTC/USDT"}'` |
| Orderbook | `node scripts/exchange.mjs orderbook '{"exchange":"binance","symbol":"BTC/USDT"}'` |
| Buy (preview) | `node scripts/exchange.mjs create_order '{"exchange":"okx","symbol":"BTC/USDT","type":"market","side":"buy","amount":0.001}'` |
| Positions | `node scripts/exchange.mjs positions '{"exchange":"okx","market_type":"swap"}'` |
| Set leverage | `node scripts/exchange.mjs set_leverage '{"exchange":"okx","symbol":"BTC/USDT:USDT","leverage":10,"market_type":"swap"}'` |
| Auto-trade setup | `node scripts/auto-trade.mjs setup '{"exchange":"okx","symbol":"BTC/USDT:USDT","leverage":10,"capital_pct":0.5}'` |
| Funding rate | `node scripts/exchange.mjs funding_rate '{"exchange":"okx","symbol":"BTC/USDT:USDT"}'` |
| Funding rate compare | `node scripts/exchange.mjs funding_rates '{"symbol":"BTC/USDT:USDT","exchanges":"binance,okx,bybit"}'` |

**Supported Exchanges:** Binance, OKX, Bybit, Bitget, Gate.io, HTX, Pionex, Hyperliquid.

**Symbol format:** CCXT format — `BTC/USDT` (spot), `BTC/USDT:USDT` (swap/futures).

## Setup

Requires exchange API keys in `.env` and ccxt installed (`npm install` in this skill directory).

`.env` locations (auto-loaded, first found wins):
1. Current working directory
2. `~/.openclaw/workspace/.env`
3. `~/.openclaw/.env`

### CEX (Centralized Exchanges)

All CEX use the same pattern — go to exchange API management page, create API key:

| Exchange | API Key Management URL |
|----------|----------------------|
| Binance | https://www.binance.com/en/my/settings/api-management |
| OKX | https://www.okx.com/account/my-api |
| Bybit | https://www.bybit.com/app/user/api-management |
| Bitget | https://www.bitget.com/account/newapi |
| Gate.io | https://www.gate.io/myaccount/apikeys |
| HTX | https://www.htx.com/en-us/apikey/ |
| Pionex | https://www.pionex.com/account/api |

```
# Format: {EXCHANGE}_API_KEY / {EXCHANGE}_API_SECRET
# Supported: BINANCE, OKX, BYBIT, BITGET, GATE, HTX, PIONEX
BINANCE_API_KEY=xxx
BINANCE_API_SECRET=xxx

# OKX additionally needs passphrase:
OKX_API_KEY=xxx
OKX_API_SECRET=xxx
OKX_PASSWORD=your-passphrase

PROXY_URL=socks5://127.0.0.1:7890  # optional
```

### Hyperliquid (DEX — wallet-based, NOT API key)

Hyperliquid is a DEX. There is NO API key page. Authentication uses your **wallet address + private key**.

```
# Wallet address (0x...) — this is your public address, NOT an API key
HYPERLIQUID_API_KEY=0x1234...abcd
# Private key (0x...) — export from MetaMask/Rabby, or use HL Agent Wallet
HYPERLIQUID_API_SECRET=0xabcd...1234
```

**How to get these:**
1. `HYPERLIQUID_API_KEY` = your EVM wallet address (the 0x... shown in MetaMask/Rabby)
2. `HYPERLIQUID_API_SECRET` = private key. Two options:
   - **Agent Wallet (recommended)**: On app.hyperliquid.xyz → Settings → Agent Wallet → Create. This gives a limited-permission key that can only trade (cannot withdraw).
   - **Wallet private key**: Export from MetaMask (Settings → Security → Export Private Key). Full permissions — use with caution.

**Symbol format**: Hyperliquid uses USDC, not USDT: `BTC/USDC:USDC`, `ETH/USDC:USDC`.

## Pre-Trade Checklist (MANDATORY)

Before placing ANY order:

1. **`markets`** — Get `limits.amount.min` and `contractSize`. NEVER guess minimums.
2. **`balance`** — Check available funds.
3. **Convert units** — `amount` differs between spot and futures:
   - **Spot**: amount = base currency (e.g., 0.01 = 0.01 BTC)
   - **Futures**: amount = contracts (e.g., 1 = 1 contract). Use `contractSize` to convert.
4. **Confirm with user** — Show coin, direction, quantity, estimated cost, leverage. Ask "确认下单？"

| User says | Spot amount | Swap amount (OKX BTC, contractSize=0.01) |
|-----------|------------|------------------------------------------|
| "0.01 BTC" | `0.01` | `0.01 / 0.01 = 1` (1 contract) |
| "1张合约" | N/A | `1` |
| "100U" | `100 / price` | `(100 / price) / contractSize` |

## Scripts

### scripts/exchange.mjs — Exchange Operations (CCXT)

#### Public (no API key)
| Action | Description | Params |
|--------|-------------|--------|
| `exchanges` | Supported exchanges | None |
| `markets` | Market list | `{"exchange":"binance","market_type":"swap","base":"BTC"}` |
| `ticker` | Real-time ticker | `{"exchange":"binance","symbol":"BTC/USDT"}` |
| `orderbook` | Order book | `{"exchange":"binance","symbol":"BTC/USDT"}` |
| `trades` | Recent trades | `{"exchange":"binance","symbol":"BTC/USDT"}` |
| `ohlcv` | OHLCV candles | `{"exchange":"binance","symbol":"BTC/USDT","timeframe":"1h"}` |
| `funding_rate` | Funding rate (swap) | `{"exchange":"binance","symbol":"BTC/USDT:USDT"}` |
| `funding_rates` | Compare rates across exchanges | `{"symbol":"BTC/USDT:USDT","exchanges":"binance,okx,bybit"}` Default: all supported exchanges. Returns rates + arbitrage spread. |

#### Account (API key required)
| Action | Description | Params |
|--------|-------------|--------|
| `balance` | Account balance | `{"exchange":"binance"}` |
| `positions` | Open positions | `{"exchange":"binance","market_type":"swap"}` |
| `open_orders` | Open orders | `{"exchange":"binance","symbol":"BTC/USDT"}` |
| `closed_orders` | Order history | `{"exchange":"binance","symbol":"BTC/USDT","limit":50}` |
| `my_trades` | Trade history | `{"exchange":"binance","symbol":"BTC/USDT","limit":50}` |
| `fetch_order` | Order by ID | `{"exchange":"binance","symbol":"BTC/USDT","order_id":"xxx"}` |

#### Trading (API key required)
| Action | Description | Params |
|--------|-------------|--------|
| `create_order` | Place order | Spot: `{"exchange":"okx","symbol":"BTC/USDT","type":"market","side":"buy","amount":0.001}` Swap: `{"exchange":"okx","symbol":"BTC/USDT:USDT","type":"market","side":"buy","amount":1,"market_type":"swap"}` |
| `cancel_order` | Cancel order | `{"exchange":"okx","symbol":"BTC/USDT","order_id":"xxx"}` |
| `set_leverage` | Set leverage | `{"exchange":"okx","symbol":"BTC/USDT:USDT","leverage":10,"market_type":"swap"}` |
| `set_margin_mode` | Margin mode | `{"exchange":"okx","symbol":"BTC/USDT:USDT","margin_mode":"cross","market_type":"swap"}` |
| `transfer` | Transfer funds | `{"exchange":"binance","code":"USDT","amount":100,"from_account":"spot","to_account":"future"}` |

**Transfer notes:**
- Account names: `spot`, `future`, `delivery`, `margin`, `funding` (exact values).
- **OKX unified account**: Spot and derivatives share balance. No transfer needed. Error 58123 = unified account.
- **Binance**: Requires explicit transfer between spot/futures.

### scripts/auto-trade.mjs — Automated Trading

Config stored at `~/.openclaw/workspace/aicoin-trade-config.json`.

| Action | Description | Params |
|--------|-------------|--------|
| `setup` | Save trading config | `{"exchange":"okx","symbol":"BTC/USDT:USDT","leverage":20,"capital_pct":0.5,"stop_loss_pct":0.025,"take_profit_pct":0.05}` |
| `status` | Config + balance + positions | `{}` |
| `open` | Open position | `{"direction":"long"}` or `{"direction":"short"}` |
| `close` | Close position + cancel orders | `{}` |

The `open` action automatically: checks balance, calculates position size (capital_pct x balance x leverage), sets leverage, places market order, sets SL/TP.

### Automated Trading Workflow

1. Ask user: exchange, coin, capital, leverage
2. `auto-trade.mjs setup` with params
3. `auto-trade.mjs status` to verify
4. Set up OpenClaw cron:
```bash
openclaw cron add --name "BTC auto trade" --every 10m --session isolated \
  --message "Use aicoin-market to fetch data, analyze, then use aicoin-trading auto-trade.mjs open/close"
```

## Funding Rate Arbitrage Workflow

Funding rate arbitrage profits from rate differences across exchanges. Steps:

### Step 1: Compare rates across exchanges

Use `funding_rates` (plural) to query all exchanges at once:

```bash
# Compare BTC funding rates across all supported exchanges
node scripts/exchange.mjs funding_rates '{"symbol":"BTC/USDT:USDT"}'

# Or specify exchanges
node scripts/exchange.mjs funding_rates '{"symbol":"BTC/USDT:USDT","exchanges":"binance,okx,bybit"}'
```

Returns: per-exchange rates + arbitrage spread + annualized return.

Alternatively, query one exchange at a time:

```bash
node scripts/exchange.mjs funding_rate '{"exchange":"binance","symbol":"BTC/USDT:USDT"}'
node scripts/exchange.mjs funding_rate '{"exchange":"okx","symbol":"BTC/USDT:USDT"}'
node scripts/exchange.mjs funding_rate '{"exchange":"bybit","symbol":"BTC/USDT:USDT"}'
```

### Step 2: Evaluate opportunity

- **Minimum spread**: Rate difference > 0.01% per period to cover fees
- **Annualized return**: `rate_diff × 3 × 365 × 100%` (3 settlements/day for 8h funding)
- **Example**: 0.05% spread = 0.05% × 3 × 365 = 54.75% annualized

### Step 3: Execute (requires API keys on both exchanges)

1. **Short** on the exchange with HIGHER positive funding rate (you receive funding)
2. **Long** on the exchange with LOWER/negative funding rate (you pay less or receive)
3. Equal position sizes to stay delta-neutral

```bash
# Example: Short on Binance (high rate), Long on OKX (low rate)
node scripts/exchange.mjs create_order '{"exchange":"binance","symbol":"BTC/USDT:USDT","type":"market","side":"sell","amount":1,"market_type":"swap"}'
node scripts/exchange.mjs create_order '{"exchange":"okx","symbol":"BTC/USDT:USDT","type":"market","side":"buy","amount":1,"market_type":"swap"}'
```

### Step 4: Monitor

Set up periodic checks with OpenClaw cron:

```bash
openclaw cron add --name "funding rate monitor" --every 1h --session isolated \
  --message "Check BTC funding rates on Binance, OKX, Bybit using aicoin-trading. If spread > 0.01%, alert me."
```

### Risks

- **Liquidation risk**: Use low leverage (1-3x) on both sides
- **Price divergence**: Prices between exchanges may differ temporarily
- **Fee costs**: Trading fees + withdrawal fees eat into profits
- **Funding rate changes**: Rates can flip between settlements

## Cross-Skill References

| Need | Use |
|------|-----|
| Prices, K-lines, news, signals | **aicoin-market** |
| Freqtrade strategies/backtest | **aicoin-freqtrade** |
| Hyperliquid whale tracking | **aicoin-hyperliquid** |

## Common Errors

- `errorCode 304 / HTTP 403` — Paid AiCoin feature. **Do NOT retry.** See below.
- `Invalid symbol` — Use CCXT format: `BTC/USDT` (spot), `BTC/USDT:USDT` (swap). Hyperliquid uses USDC: `BTC/USDC:USDC`.
- `Insufficient balance` — Check balance first, don't auto-adjust. Tell user.
- `API key invalid` — Keys in `.env`, never inline. Check if user configured exchange keys.
- `Rate limit exceeded` — Wait 1-2s between requests.
- OKX error 58123 — Unified account, no transfer needed between spot/futures.

## Paid Feature Guide

When a script returns 304 or 403: **Do NOT retry.** Tell the user:

1. **What happened**: This feature needs a paid AiCoin API subscription.
2. **How to get a key**: Visit https://www.aicoin.com/opendata to register and create an API key.
3. **Tier options**:

| Tier | Price | Highlights |
|------|-------|------------|
| Free | $0 | Prices, K-lines, trending coins |
| Basic | $29/mo | + Funding rate, L/S ratio, news |
| Standard | $79/mo | + Whale orders, signals, grayscale |
| Advanced | $299/mo | + Liquidation map, indicator K-lines, depth |
| Professional | $699/mo | All endpoints: AI analysis, OI, stocks |

4. **How to configure**: Add to `.env` file:
```
AICOIN_ACCESS_KEY_ID=your-key-id
AICOIN_ACCESS_SECRET=your-secret
```
5. `.env` auto-loaded from: cwd → `~/.openclaw/workspace/.env` → `~/.openclaw/.env`. After configuring, the same script command will work.

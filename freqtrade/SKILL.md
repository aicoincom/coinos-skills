---
name: aicoin-freqtrade
description: >
  Control Freqtrade trading bot. Start/stop/reload, query config/logs,
  check balance, manage trades, view profit reports and statistics.
metadata:
  openclaw:
    primaryEnv: "FREQTRADE_URL"
    requires:
      env:
        - "FREQTRADE_URL"
        - "FREQTRADE_USERNAME"
        - "FREQTRADE_PASSWORD"
    homepage: "https://www.aicoin.com/opendata"
    source: "https://github.com/bbx-com/aicoin-skills"
    license: "MIT"
---

# Freqtrade Bot Control

Control Freqtrade trading bot via CLI scripts.

## Prerequisites

```bash
export FREQTRADE_URL="http://localhost:8080"
export FREQTRADE_USERNAME="freqtrader"
export FREQTRADE_PASSWORD="your-password"
```

## Script

`scripts/ft.mjs`

## Usage

```bash
node scripts/ft.mjs <action> [json-params]
```

## Actions

| Action | Description | Params |
|--------|-------------|--------|
| `ping` | Health check | None |
| `start` | Start trading | None |
| `stop` | Stop trading | None |
| `reload` | Reload config | None |
| `config` | View config | None |
| `version` | Version info | None |
| `sysinfo` | System info | None |
| `health` | Health status | None |
| `logs` | View logs | `{"limit":50}` |
| `balance` | Account balance | None |
| `trades_open` | Open trades | None |
| `trades_count` | Trade count | None |
| `trade_by_id` | Trade by ID | `{"trade_id":1}` |
| `trades_history` | Trade history | `{"limit":50}` |
| `force_enter` | Manual entry | `{"pair":"BTC/USDT","side":"long"}` |
| `force_exit` | Manual exit | `{"tradeid":"1"}` |
| `cancel_order` | Cancel order | `{"trade_id":1}` |
| `delete_trade` | Delete record | `{"trade_id":1}` |
| `profit` | Profit summary | None |
| `profit_per_pair` | Profit per pair | None |
| `daily` | Daily report | `{"count":7}` |
| `weekly` | Weekly report | `{"count":4}` |
| `monthly` | Monthly report | `{"count":3}` |
| `stats` | Statistics | None |

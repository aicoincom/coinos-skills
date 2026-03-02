---
name: aicoin-freqtrade-dev
description: >
  Freqtrade development tools. Run backtests, view candles with indicators,
  manage pair whitelist/blacklist, and list/get trading strategies.
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

# Freqtrade Dev Tools

Freqtrade development and backtesting tools.

## Script

`scripts/ft-dev.mjs`

## Usage

```bash
node scripts/ft-dev.mjs <action> [json-params]
```

## Actions

| Action | Description | Params |
|--------|-------------|--------|
| `backtest_start` | Start backtest | `{"strategy":"MyStrategy","timerange":"20240101-20240601","timeframe":"5m"}` |
| `backtest_status` | Backtest status | None |
| `backtest_abort` | Abort backtest | None |
| `backtest_history` | Backtest history | None |
| `backtest_result` | History result | `{"id":"xxx"}` |
| `candles_live` | Live candles | `{"pair":"BTC/USDT","timeframe":"1h"}` |
| `candles_analyzed` | Candles with indicators | `{"pair":"BTC/USDT","timeframe":"1h","strategy":"MyStrategy"}` |
| `candles_available` | Available pairs | None |
| `whitelist` | Whitelist | None |
| `blacklist` | Blacklist | None |
| `blacklist_add` | Add to blacklist | `{"add":["DOGE/USDT"]}` |
| `locks` | Trade locks | None |
| `strategy_list` | Strategy list | None |
| `strategy_get` | Strategy detail | `{"name":"MyStrategy"}` |

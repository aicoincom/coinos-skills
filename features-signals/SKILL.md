---
name: aicoin-features-signals
description: >
  AiCoin market features and trading signals. Query market overview, long/short
  ratio, liquidation stats, grayscale holdings, whale order flow, and strategy signals.
metadata:
  openclaw:
    primaryEnv: "AICOIN_ACCESS_KEY_ID"
    requires:
      env:
        - "AICOIN_ACCESS_KEY_ID"
        - "AICOIN_ACCESS_SECRET"
    homepage: "https://www.aicoin.com/opendata"
    source: "https://github.com/bbx-com/aicoin-skills"
    license: "MIT"
---

# AiCoin Features & Signals

Query market features and trading signals via CLI scripts.

## Script

`scripts/features.mjs`

## Usage

```bash
node scripts/features.mjs <action> [json-params]
```

## Actions

### Market Overview
| Action | Description | Params |
|--------|-------------|--------|
| `nav` | Market navigation | `{"lan":"cn"}` |
| `ls_ratio` | Long/short ratio | None |
| `liquidation` | Liquidation data | `{"type":"1","coinKey":"bitcoin"}` type: 1=by coin, 2=by exchange |
| `grayscale_trust` | Grayscale trust | None |
| `gray_scale` | Grayscale holdings | `{"coins":"btc,eth"}` |
| `stock_market` | Crypto stocks | None |

### Whale Order Tracking
| Action | Description | Params |
|--------|-------------|--------|
| `big_orders` | Large/whale orders | `{"symbol":"btcswapusdt:binance"}` |
| `agg_trades` | Aggregated large trades | `{"symbol":"btcswapusdt:binance"}` |

### Trading Pairs
| Action | Description | Params |
|--------|-------------|--------|
| `pair_ticker` | Pair ticker | `{"key_list":"btcusdt:okex,btcusdt:huobipro"}` |
| `pair_by_market` | Pairs by exchange | `{"market":"binance"}` |
| `pair_list` | Pair list | `{"market":"binance","currency":"USDT"}` |

### Signals
| Action | Description | Params |
|--------|-------------|--------|
| `strategy_signal` | Strategy signal | `{"signal_key":"depth_win_one"}` |
| `signal_alert` | Signal alerts | None |
| `signal_config` | Alert config | `{"lan":"cn"}` |
| `signal_alert_list` | Alert list | None |
| `change_signal` | Anomaly signal | `{"type":"1"}` |
| `delete_signal` | Delete alert | `{"id":"xxx"}` |

---
name: aicoin-hyperliquid
description: >
  Hyperliquid on-chain data via AiCoin. Query tickers, whale positions,
  liquidations, open interest, taker flow, trader analytics, and smart money discovery.
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

# Hyperliquid Data

Query Hyperliquid on-chain data via CLI scripts. Two scripts available:

- `scripts/hl-market.mjs` — Tickers, whales, liquidations, OI, taker flow
- `scripts/hl-trader.mjs` — Trader analytics, fills, orders, positions, portfolio, advanced

## Usage

```bash
node scripts/hl-market.mjs <action> [json-params]
node scripts/hl-trader.mjs <action> [json-params]
```

## hl-market.mjs Actions

### Tickers
| Action | Description | Params |
|--------|-------------|--------|
| `tickers` | All tickers | None |
| `ticker` | Single coin ticker | `{"coin":"BTC"}` |

### Whales
| Action | Description | Params |
|--------|-------------|--------|
| `whale_positions` | Whale positions | `{"coin":"BTC","min_usd":"1000000"}` |
| `whale_events` | Whale events | `{"coin":"BTC"}` |
| `whale_directions` | Long/short direction | `{"coin":"BTC"}` |
| `whale_history_ratio` | Historical long ratio | `{"coin":"BTC"}` |

### Liquidations
| Action | Description | Params |
|--------|-------------|--------|
| `liq_history` | Liquidation history | `{"coin":"BTC"}` |
| `liq_stats` | Liquidation stats | None |
| `liq_stats_by_coin` | Stats by coin | `{"coin":"BTC"}` |
| `liq_top_positions` | Large liquidations | `{"coin":"BTC","interval":"1d"}` |

### Open Interest
| Action | Description | Params |
|--------|-------------|--------|
| `oi_summary` | OI overview | None |
| `oi_top_coins` | OI ranking | `{"limit":"10"}` |
| `oi_history` | OI history | `{"coin":"BTC","interval":"4h"}` |

### Taker
| Action | Description | Params |
|--------|-------------|--------|
| `taker_delta` | Taker delta | `{"coin":"BTC"}` |
| `taker_klines` | Taker K-lines | `{"coin":"BTC","interval":"4h"}` |

## hl-trader.mjs Actions

### Trader Analytics
| Action | Description | Params |
|--------|-------------|--------|
| `trader_stats` | Trader statistics | `{"address":"0x...","period":"30"}` |
| `best_trades` | Best trades | `{"address":"0x...","period":"30"}` |
| `performance` | Performance by coin | `{"address":"0x...","period":"30"}` |
| `completed_trades` | Completed trades | `{"address":"0x...","coin":"BTC"}` |
| `accounts` | Batch accounts | `{"addresses":"[\"0x...\"]"}` |
| `statistics` | Batch statistics | `{"addresses":"[\"0x...\"]"}` |

### Fills
| Action | Description | Params |
|--------|-------------|--------|
| `fills` | Address fills | `{"address":"0x..."}` |
| `fills_by_oid` | By order ID | `{"oid":"xxx"}` |
| `fills_by_twapid` | By TWAP ID | `{"twapid":"xxx"}` |
| `top_trades` | Large trades | `{"coin":"BTC","interval":"1d"}` |

### Orders
| Action | Description | Params |
|--------|-------------|--------|
| `orders_latest` | Latest orders | `{"address":"0x..."}` |
| `order_by_oid` | By order ID | `{"oid":"xxx"}` |
| `filled_orders` | Filled orders | `{"address":"0x..."}` |
| `filled_by_oid` | Filled by ID | `{"oid":"xxx"}` |
| `top_open` | Large open orders | `{"coin":"BTC","min_val":"100000"}` |
| `active_stats` | Active stats | `{"coin":"BTC"}` |
| `twap_states` | TWAP states | `{"address":"0x..."}` |

### Positions
| Action | Description | Params |
|--------|-------------|--------|
| `current_pos_history` | Current position history | `{"address":"0x...","coin":"BTC"}` |
| `completed_pos_history` | Closed position history | `{"address":"0x...","coin":"BTC"}` |
| `current_pnl` | Current PnL | `{"address":"0x...","coin":"BTC","interval":"1h"}` |
| `completed_pnl` | Closed PnL | `{"address":"0x...","coin":"BTC","interval":"1h"}` |
| `current_executions` | Current executions | `{"address":"0x...","coin":"BTC","interval":"1h"}` |
| `completed_executions` | Closed executions | `{"address":"0x...","coin":"BTC","interval":"1h"}` |

### Portfolio
| Action | Description | Params |
|--------|-------------|--------|
| `portfolio` | Account curve | `{"address":"0x...","window":"week"}` window: day/week/month/allTime |
| `pnls` | PnL curve | `{"address":"0x...","period":"30"}` |
| `max_drawdown` | Max drawdown | `{"address":"0x...","days":"30"}` |
| `net_flow` | Net flow | `{"address":"0x...","days":"30"}` |

### Advanced
| Action | Description | Params |
|--------|-------------|--------|
| `info` | Info API | `{"type":"metaAndAssetCtxs"}` |
| `smart_find` | Smart money discovery | `{}` |
| `discover` | Trader discovery | `{}` |

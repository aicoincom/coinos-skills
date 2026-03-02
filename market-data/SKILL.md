---
name: aicoin-market-data
description: >
  Query market data from AiCoin. Get exchange info, K-lines with indicators,
  index prices, crypto stock quotes, corporate coin holdings, and order book depth.
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

# AiCoin Market Data

Query market data via CLI scripts.

## Script

`scripts/market.mjs`

## Usage

```bash
node scripts/market.mjs <action> [json-params]
```

## Actions

### Market Info
| Action | Description | Params |
|--------|-------------|--------|
| `exchanges` | Exchange list | None |
| `ticker` | Exchange tickers | `{"market_list":"okex,binance"}` |
| `hot_coins` | Trending coins | `{"key":"defi"}` key: gamefi/anonymous/market/web/newcoin/stable/defi |
| `futures_interest` | Futures OI ranking | `{"lan":"cn"}` |

### K-Line
| Action | Description | Params |
|--------|-------------|--------|
| `kline` | Standard K-line | `{"symbol":"btcusdt:okex","period":"3600","size":"100"}` period in seconds: 900=15m, 3600=1h, 14400=4h, 86400=1d |
| `indicator_kline` | Indicator K-line | `{"symbol":"btcswapusdt:binance","indicator_key":"fundflow","period":"3600"}` |
| `indicator_pairs` | Indicator available pairs | `{"indicator_key":"fundflow"}` |

### Index
| Action | Description | Params |
|--------|-------------|--------|
| `index_list` | Index list | None |
| `index_price` | Index price | `{"key":"i:diniw:ice"}` |
| `index_info` | Index details | `{"key":"i:diniw:ice"}` |

### Crypto Stocks
| Action | Description | Params |
|--------|-------------|--------|
| `stock_quotes` | Stock quotes | `{"tickers":"i:mstr:nasdaq,i:coin:nasdaq"}` |
| `stock_top_gainer` | Top gainers | `{"us_stock":"true"}` |
| `stock_company` | Company details | `{"symbol":"i:mstr:nasdaq"}` |

### Treasury (Corporate Holdings)
| Action | Description | Params |
|--------|-------------|--------|
| `treasury_entities` | Holding entities | `{"coin":"BTC"}` |
| `treasury_history` | Transaction history | `{"coin":"BTC"}` |
| `treasury_accumulated` | Accumulated holdings | `{"coin":"BTC"}` |
| `treasury_latest_entities` | Latest entities | `{"coin":"BTC"}` |
| `treasury_latest_history` | Latest history | `{"coin":"BTC"}` |
| `treasury_summary` | Holdings overview | `{"coin":"BTC"}` |

### Order Book Depth
| Action | Description | Params |
|--------|-------------|--------|
| `depth_latest` | Real-time snapshot | `{"dbKey":"btcswapusdt:binance"}` |
| `depth_full` | Full order book | `{"dbKey":"btcswapusdt:binance"}` |
| `depth_grouped` | Grouped depth | `{"dbKey":"btcswapusdt:binance","groupSize":"100"}` |

---
name: aicoin-coin-data
description: >
  Query crypto coin data from AiCoin. Get coin lists, real-time prices,
  AI analysis, funding rates, liquidation data, open interest, and futures depth.
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

# AiCoin Coin Data

Query coin data via CLI scripts.

## Script

`scripts/coin.mjs`

## Usage

```bash
node scripts/coin.mjs <action> [json-params]
```

## Actions

| Action | Description | Params |
|--------|-------------|--------|
| `coin_list` | List all coins | None |
| `coin_ticker` | Real-time prices | `{"coin_list":"bitcoin,ethereum"}` |
| `coin_config` | Coin profile | `{"coin_list":"bitcoin"}` |
| `ai_analysis` | AI analysis & prediction | `{"coin_keys":"[\"bitcoin\"]","language":"CN"}` |
| `funding_rate` | Funding rate | `{"symbol":"btcswapusdt:binance","interval":"8h"}` Weighted: `{"symbol":"btcswapusdt","interval":"8h","weighted":"true"}` |
| `liquidation_map` | Liquidation heatmap | `{"dbkey":"btcswapusdt:binance","cycle":"24h"}` |
| `liquidation_history` | Liquidation history | `{"symbol":"btcswapusdt:binance","interval":"1m"}` |
| `estimated_liquidation` | Estimated liquidation | `{"dbkey":"btcswapusdt:binance","cycle":"24h"}` |
| `open_interest` | Open interest | `{"symbol":"BTC","interval":"15m"}` Coin-margined: add `"margin_type":"coin"` |
| `historical_depth` | Historical depth | `{"key":"btcswapusdt:okcoinfutures"}` |
| `super_depth` | Large order depth (>$10k) | `{"key":"btcswapusdt:okcoinfutures"}` |
| `trade_data` | Trade data | `{"dbkey":"btcswapusdt:okcoinfutures"}` |

## Examples

```bash
# BTC real-time price
node scripts/coin.mjs coin_ticker '{"coin_list":"bitcoin,ethereum"}'

# BTC AI analysis
node scripts/coin.mjs ai_analysis '{"coin_keys":"[\"bitcoin\"]"}'

# BTC weighted funding rate
node scripts/coin.mjs funding_rate '{"symbol":"btcswapusdt","interval":"8h","weighted":"true"}'
```

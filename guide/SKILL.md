---
name: aicoin-guide
description: >
  AiCoin setup guide. API key configuration, tier upgrade instructions,
  and exchange trade setup.
metadata:
  openclaw:
    homepage: "https://www.aicoin.com/opendata"
    source: "https://github.com/bbx-com/aicoin-skills"
    license: "MIT"
---

# AiCoin Setup Guide

## API Key Configuration

1. Visit https://www.aicoin.com/opendata to register and create an API Key
2. Set environment variables:
```bash
export AICOIN_ACCESS_KEY_ID="your-key"
export AICOIN_ACCESS_SECRET="your-secret"
```

A built-in free key is available without configuration (IP rate-limited).

## Membership Tiers

| Tier | Monthly | Yearly | Rate Limit | Monthly Quota | Features |
|------|---------|--------|------------|---------------|----------|
| Free | $0 | $0 | 15 req/min | 20K | Market, coin, features data. Personal use |
| Basic | $29 | $318 (9% off) | 30 req/min | 20K | + Content data |
| Standard | $79 | $868 (8% off) | 80 req/min | 500K | + Content data |
| Premium | $299 | $3,288 (8% off) | 300 req/min | 1.5M | + Commercial use |
| Professional | $699 | $7,688 (8% off) | 1,200 req/min | 3.5M | + Commercial use |

See https://docs.aicoin.com for full details.

## Exchange Configuration (CCXT Trading)

The exchange-trading skill requires exchange API keys:
```bash
export BINANCE_API_KEY="xxx"
export BINANCE_API_SECRET="xxx"
```

Supported: binance, okx, bybit, bitget, gate, htx, kucoin, mexc, coinbase

## Freqtrade Configuration

freqtrade/freqtrade-dev skills require:
```bash
export FREQTRADE_URL="http://localhost:8080"
export FREQTRADE_USERNAME="freqtrader"
export FREQTRADE_PASSWORD="your-password"
```

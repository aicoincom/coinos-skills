---
name: aicoin-news-content
description: >
  Fetch crypto news and flash updates from AiCoin. Get news articles,
  flash news, industry updates, and exchange listing announcements.
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

# AiCoin News & Content

Query news and flash updates via CLI scripts.

## Script

`scripts/news.mjs`

## Usage

```bash
node scripts/news.mjs <action> [json-params]
```

## Actions

| Action | Description | Params |
|--------|-------------|--------|
| `news_list` | News list | `{"page":"1","pageSize":"20"}` |
| `news_detail` | News detail | `{"id":"xxx"}` |
| `news_rss` | RSS news | `{"page":"1"}` |
| `newsflash` | AiCoin flash news | `{"language":"cn"}` |
| `flash_list` | Industry flash news | `{"language":"cn"}` |
| `exchange_listing` | Exchange listing announcements | `{"memberIds":"477,1509"}` (477=Binance, 1509=Bitget) |

## Examples

```bash
# Latest flash news
node scripts/news.mjs newsflash

# Exchange listing announcements
node scripts/news.mjs exchange_listing '{"memberIds":"477,1509"}'
```

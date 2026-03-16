# CLAUDE.md

This file provides guidance to Claude Code when working with this repository.

## Project Overview

This is a **Claude Code plugin** — a collection of CoinOS skills for crypto market data, trading, strategy automation, and whale analytics, powered by AiCoin Open API.

## Architecture

```
coinos-skills/
├── skills/              # 6 aicoin-* skills (v2.0)
│   ├── aicoin-market/   # Prices, K-lines, news, signals, airdrops, drop radar
│   ├── aicoin-account/  # Balance, positions, API key management, registration
│   ├── aicoin-trading/  # Exchange trading, auto-trade
│   ├── aicoin-freqtrade/# Strategy creation, backtest, deploy
│   ├── aicoin-hyperliquid/ # HL whale tracking, analytics
│   └── aicoin-onchain/  # On-chain DEX swap, portfolio, gas
├── AGENTS.md            # Skill routing for AI agents
├── CLAUDE.md            # Dev instructions
└── .claude-plugin/      # Plugin metadata
```

Each skill is self-contained with its own `SKILL.md`, `lib/`, and `scripts/`. AiCoin skills use `../lib/aicoin-api.mjs`; onchain skill uses `../lib/okx-api.mjs`.

## Available Skills

| Skill | Purpose | When to Use |
|-------|---------|-------------|
| aicoin-market | Prices, K-lines, news, signals, airdrops, drop radar | Crypto prices, charts, funding rates, news, airdrops |
| aicoin-account | Balance, positions, API key, registration | Balance, positions, order history, API key config |
| aicoin-trading | Exchange trading, auto-trade | Buy/sell, leverage, close positions, auto-trade |
| aicoin-freqtrade | Strategy, backtest, deploy | Write strategies, backtest, deploy bots |
| aicoin-hyperliquid | HL whale tracking | Hyperliquid whales, liquidations, OI |
| aicoin-onchain | On-chain DEX, wallet, gas | DEX swap, token search, wallet balance, gas, tx broadcast |

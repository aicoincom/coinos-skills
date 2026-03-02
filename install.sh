#!/usr/bin/env bash
# Install all AiCoin skills to OpenClaw
set -e

SKILLS=(
  aicoin-coin-data
  aicoin-market-data
  aicoin-news-content
  aicoin-features-signals
  aicoin-hyperliquid
  aicoin-exchange-trading
  aicoin-freqtrade
  aicoin-freqtrade-dev
  aicoin-guide
)

for skill in "${SKILLS[@]}"; do
  echo "Installing $skill..."
  npx clawhub@latest install "$skill"
done

echo "All AiCoin skills installed."

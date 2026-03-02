# AiCoin Skills for OpenClaw

9 个 Skills 封装 [AiCoin Open API](https://www.aicoin.com/opendata) — 实时加密货币行情、链上分析、交易所交易、机器人管理，共 40 个工具。

## 安装

```bash
npx skills add bbx-com/aicoin-skills
```

或从 [ClawHub](https://clawhub.ai) 安装：

```bash
clawhub install aicoin-coin-data
```

或通过安装脚本：

```bash
curl -sL https://raw.githubusercontent.com/bbx-com/aicoin-skills/main/install.sh | bash
```

## Skills

| Skill | 工具数 | 说明 |
|-------|--------|------|
| [aicoin-coin-data](coin-data/) | 12 | 币种价格、AI 分析、资金费率、清算、持仓量 |
| [aicoin-market-data](market-data/) | 18 | K线、指标、指数、加密概念股、机构持仓、盘口深度 |
| [aicoin-news-content](news-content/) | 6 | 新闻快讯、行业动态、上币公告 |
| [aicoin-features-signals](features-signals/) | 16 | 多空比、大单追踪、策略信号 |
| [aicoin-hyperliquid](hyperliquid/) | 30 | HL 行情、鲸鱼、清算、交易员分析、聪明钱 |
| [aicoin-exchange-trading](exchange-trading/) | 14 | CCXT 交易所交易（Binance、OKX、Bybit 等） |
| [aicoin-freqtrade](freqtrade/) | 24 | Freqtrade 机器人控制与监控 |
| [aicoin-freqtrade-dev](freqtrade-dev/) | 14 | 回测、策略管理、交易对列表 |
| [aicoin-guide](guide/) | — | 配置指南 |

## 环境变量

```bash
# AiCoin API（可选 — 内置免费 Key，有 IP 频率限制）
AICOIN_ACCESS_KEY_ID="your-key"
AICOIN_ACCESS_SECRET="your-secret"

# 交易所交易（CCXT）
BINANCE_API_KEY="xxx"
BINANCE_API_SECRET="xxx"

# Freqtrade 机器人
FREQTRADE_URL="http://localhost:8080"
FREQTRADE_USERNAME="freqtrader"
FREQTRADE_PASSWORD="xxx"
```

## 用法

每个 skill 包含 CLI 脚本，Agent 会自动调用，也可以直接运行：

```bash
node <skill>/scripts/<name>.mjs <action> '{"param":"value"}'
```

## License

MIT

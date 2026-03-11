<div align="center">

<pre>
 ██████╗ ██████╗ ██╗███╗   ██╗ ██████╗ ███████╗
██╔════╝██╔═══██╗██║████╗  ██║██╔═══██╗██╔════╝
██║     ██║   ██║██║██╔██╗ ██║██║   ██║███████╗
██║     ██║   ██║██║██║╚██╗██║██║   ██║╚════██║
╚██████╗╚██████╔╝██║██║ ╚████║╚██████╔╝███████║
 ╚═════╝ ╚═════╝ ╚═╝╚═╝  ╚═══╝ ╚═════╝ ╚══════╝
</pre>

### `> 为 AI Agent 打造的加密货币行情、交易与量化自动化_`

<br />

[![Version](https://img.shields.io/badge/v2.0.0-blueviolet?style=for-the-badge&logo=semver&logoColor=white)](https://github.com/aicoincom/coinos-skills/releases)
[![JavaScript](https://img.shields.io/badge/ESM-f7df1e?style=for-the-badge&logo=javascript&logoColor=black)](https://nodejs.org/)
[![AiCoin API](https://img.shields.io/badge/AiCoin_API-00d4aa?style=for-the-badge&logo=bitcoin&logoColor=white)](https://www.aicoin.com/opendata)
[![License](https://img.shields.io/badge/MIT-License-f59e0b?style=for-the-badge&logo=opensourceinitiative&logoColor=white)](./LICENSE)
[![Skills](https://img.shields.io/badge/Skills-5_个-ff6b6b?style=for-the-badge&logo=openai&logoColor=white)](./skills/)

<br />

[English](./README.md) · [简体中文](./README-CN.md)

<br />

<img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png" alt="-----" />

</div>

<div align="center">

## CoinOS 是什么？

**一句话查行情。一句话下单。一句话跑回测。**

</div>

<div align="center">

CoinOS 是一套 AI Skill 集合，封装 [AiCoin Open API](https://www.aicoin.com/opendata) — 为 AI Agent 提供实时加密货币行情、交易所交易、Freqtrade 量化策略、Hyperliquid 鲸鱼分析能力。

支持 **Claude Code、Cursor、Codex、OpenClaw、Windsurf、Gemini CLI** 等 AI 编程工具。

</div>

<div align="center">

<table>
<tr><td>

- 无需 API Key — **内置免费 Key** 开箱即用
- 数据来自 **AiCoin**，领先的加密货币分析平台
- **5 个 Skill**，各自独立，可按需安装

</td></tr>
</table>

<br />
<img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png" alt="-----" />

## Skill 矩阵

</div>

<div align="center">
<table>
<tr>
<td width="50%">

**行情数据**

| Skill | 能力 |
|:--|:--|
| **aicoin-market** | 价格、K线、资金费率、持仓量、大单、新闻、信号、空投、上币雷达 |

</td>
<td width="50%">

**交易所交易**

| Skill | 能力 |
|:--|:--|
| **aicoin-trading** | Binance/OKX/Bybit 等 9 大交易所买卖、自动交易策略 |

</td>
</tr>
<tr>
<td width="50%">

**量化自动化**

| Skill | 能力 |
|:--|:--|
| **aicoin-freqtrade** | AiCoin 指标策略创建、回测、超参优化、实盘机器人部署 |

</td>
<td width="50%">

**鲸鱼分析**

| Skill | 能力 |
|:--|:--|
| **aicoin-hyperliquid** | Hyperliquid 大户持仓追踪、清算数据、交易员盈亏分析 |

</td>
</tr>
<tr>
<td colspan="2">

**账户管理**

| Skill | 能力 |
|:--|:--|
| **aicoin-account** | 余额与仓位查询、历史订单、API Key 管理、交易所注册返佣 |

</td>
</tr>
</table>
</div>

<div align="center">
<br />
<img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png" alt="-----" />

## AiCoin 独家数据

**别处拿不到的数据 — 实时聚合 200+ 交易所。**

</div>

<div align="center">
<table>
<tr>
<td width="50%">

**鲸鱼与情绪数据**

| 数据 | 它能告诉你什么 |
|:--|:--|
| **大单追踪** | 各交易所实时大额买卖单 |
| **多空比** | 聚合市场持仓方向 — 散户在做多还是做空？ |
| **资金费率** | 跨交易所加权费率 — 发现过度杠杆化的市场 |
| **清算地图** | 清算集中区热力图 — 找到轧空/轧多区间 |
| **持仓量 (OI)** | 聚合 OI 趋势 — 验证或质疑价格走势 |

</td>
<td width="50%">

**新闻与 Alpha 发现**

| 数据 | 它能告诉你什么 |
|:--|:--|
| **快讯** | 比主流媒体更快的加密新闻 |
| **推特/X 动态** | 实时 KOL 推文、大V发现 |
| **空投雷达** | 空投情报：团队、融资、X 粉丝、项目状态 |
| **信号提醒** | 预设异常信号与策略信号 |
| **机构持仓** | MicroStrategy 等机构持仓追踪 |

</td>
</tr>
</table>
</div>

<div align="center">

> 多数平台只给你价格。AiCoin 告诉你**鲸鱼在干什么、市场情绪如何、即将发生什么** — 横跨 200+ 交易所，一个 API 搞定。

<br />
<img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png" alt="-----" />

## 策略与回测

**一句话写策略。真实数据回测。一键部署实盘。**

</div>

CoinOS 集成 [Freqtrade](https://github.com/freqtrade/freqtrade)，并将 **AiCoin 独家链上/情绪数据**直接注入你的策略 — 这是其他回测工具做不到的。

<div align="center">
<table>
<tr>
<td width="50%">

**17 个内置技术指标**

| 类别 | 指标 |
|:--|:--|
| **趋势** | EMA, SMA, ADX, Ichimoku |
| **动量** | RSI, MACD, Stochastic/KDJ, CCI, Williams %R |
| **波动率** | Bollinger Bands, ATR |
| **成交量** | VWAP, OBV, Volume SMA |

</td>
<td width="50%">

**5 种 AiCoin 独家数据**

| 数据 | 策略用法 |
|:--|:--|
| **funding_rate** | 费率 > 0.1% = 多头过热，反向操作 |
| **ls_ratio** | 比值 < 0.45 = 空头拥挤，逆向买入 |
| **big_orders** | 鲸鱼信号为正 = 聪明钱在吸筹 |
| **liquidation_map** | 清算集中 = 轧空/轧多机会 |
| **open_interest** | OI 上升 + 价格下跌 = 反转信号 |

</td>
</tr>
</table>
</div>

<div align="center">

**一条命令创建。一条命令回测。一条命令部署。**

</div>

```bash
# 1. 用 AiCoin 数据 + 技术指标创建策略
> "帮我写一个资金费率策略，加上 RSI 和布林带，15分钟周期"

# 2. 用真实历史 K 线回测
> "回测一下 BTC/USDT，2025 全年"

# 3. 超参数优化
> "跑一下 hyperopt，500 轮"

# 4. 部署到实盘
> "部署到 Binance，先跑模拟盘"
```

```
回测结果
─────────────────────────────────────────────────
策略:          FundingRateStrat
时间范围:      2025-01-01 → 2025-12-31
交易对:        BTC/USDT
─────────────────────────────────────────────────
总交易数:      142
胜率:          63.4%
总收益:        +18.7%
最大回撤:      -8.2%
夏普比率:      1.45
─────────────────────────────────────────────────
AiCoin 数据:   funding_rate（实盘/模拟盘可用）
技术指标:      RSI, Bollinger Bands
─────────────────────────────────────────────────
```

<div align="center">

> 传统回测只用价格+成交量。CoinOS 策略在实盘中还能感知**鲸鱼行为、市场情绪、清算压力** — 让你的机器人拥有纯技术分析无法比拟的优势。

<br />
<img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png" alt="-----" />

## 架构

</div>

```
                         ┌─────────────────────┐
                         │   AI Agent (自然语言) │
                         └──────────┬───────────┘
                                    │
                         ┌──────────▼───────────┐
                         │    CoinOS Skills      │
                         └──────────┬───────────┘
                                    │
          ┌─────────────┬───────────┼───────────┬─────────────┐
          │             │           │           │             │
   ┌──────▼──────┐ ┌────▼────┐ ┌────▼────┐ ┌────▼────┐ ┌─────▼─────┐
   │   market    │ │ trading │ │freqtrade│ │  hyper  │ │  account  │
   │   行情数据   │ │  交易    │ │  量化    │ │ liquid  │ │  账户管理  │
   │             │ │         │ │         │ │  鲸鱼    │ │           │
   │ coin.mjs    │ │exchange │ │ft-deploy│ │hl-market│ │exchange   │
   │ market.mjs  │ │  .mjs   │ │  .mjs   │ │  .mjs   │ │  .mjs     │
   │ news.mjs    │ │auto-    │ │ ft.mjs  │ │hl-trader│ │register   │
   │ features.mjs│ │trade.mjs│ │ft-dev   │ │  .mjs   │ │  .mjs     │
   │ twitter.mjs │ │         │ │  .mjs   │ │         │ │           │
   │newsflash.mjs│ │         │ │         │ │         │ │           │
   └──────┬──────┘ └────┬────┘ └────┬────┘ └────┬────┘ └─────┬─────┘
          │             │           │           │             │
          └─────────────┴───────┬───┴───────────┘             │
                                │                             │
                     ┌──────────▼───────────┐      ┌──────────▼──────────┐
                     │   AiCoin Open API    │      │   交易所 API         │
                     │   (行情数据层)        │      │ Binance/OKX/Bybit.. │
                     └──────────────────────┘      └─────────────────────┘
```

<div align="center">

每个 Skill **完全独立**，拥有自己的 `SKILL.md`、`lib/` 和 `scripts/`。所有脚本共享 `aicoin-api.mjs` 客户端库。

<br />
<img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png" alt="-----" />

## 快速开始

</div>

```bash
# 通过 npx 安装
npx skills add aicoincom/coinos-skills

# 选择要安装的 skill，或用 --yes 全部安装
```

<div align="center">

然后，直接和你的 AI 对话：

</div>

```
> "BTC 现在多少钱？"
> "给我看一下 ETH 的 1 小时 K 线"
> "帮我写一个资金费率策略"
> "查一下 OKX 余额"
> "Hyperliquid 上 BTC 大户都在做什么方向？"
```

<div align="center">

无需任何配置。内置免费 API Key 开箱即用。

<br />
<img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png" alt="-----" />

## 支持的交易所

| 交易所 | ID | 现货 | 合约 | |
|:--|:--|:--:|:--:|:--|
| **Binance** | `binance` | ✅ | ✅ | 全球最大交易量 |
| **OKX** | `okx` | ✅ | ✅ | 高级衍生品平台 |
| **Bybit** | `bybit` | ✅ | ✅ | 永续合约领先 |
| **Bitget** | `bitget` | ✅ | ✅ | 跟单交易领先 |
| **Gate.io** | `gate` | ✅ | ✅ | 1700+ 交易对 |
| **HTX** | `htx` | ✅ | ✅ | 全球数字资产平台 |
| **KuCoin** | `kucoin` | ✅ | ✅ | 人民的交易所 |
| **MEXC** | `mexc` | ✅ | ✅ | 快速上币 |
| **Coinbase** | `coinbase` | ✅ | — | 美国合规交易所 |

<br />
<img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png" alt="-----" />

## 使用示例

</div>

<details open>
<summary><strong>行情查询</strong></summary>

```
You:     BTC 现在多少钱？

CoinOS:  BTC/USDT — $84,302.50
         24h 涨跌:   +2.34%
         24h 最高:   $85,100.00
         24h 最低:   $82,450.00
         24h 成交量: $28.5B
```

</details>

<details>
<summary><strong>K线与技术分析</strong></summary>

```
You:     给我看一下 ETH 的 1 小时 K 线

CoinOS:  从 OKX 获取 100 根 K 线，返回 OHLCV 数据
         包含时间戳，可用于图表绘制或分析。
```

```bash
# 直接调用脚本
node skills/aicoin-market/scripts/market.mjs kline \
  '{"symbol":"ethusdt:okex","period":"3600","size":"100"}'
```

</details>

<details>
<summary><strong>交易所交易</strong></summary>

```
You:     帮我在 Binance 买入 0.1 个 BTC

CoinOS:  订单预览
         ─────────────────────────────────────
         交易所:     Binance
         交易对:     BTC/USDT
         方向:       买入
         类型:       市价
         数量:       0.1 BTC
         预估花费:   ~$8,430.25
         ─────────────────────────────────────
         确认后执行。
```

</details>

<details>
<summary><strong>策略与回测</strong></summary>

```
You:     帮我写一个资金费率策略，15分钟周期

CoinOS:  通过 ft-deploy.mjs 创建策略...
         ✓ 策略 "FundingRateStrat" 已创建
         ✓ 周期: 15m
         ✓ AiCoin 数据: funding_rate
         ✓ 文件: user_data/strategies/FundingRateStrat.py

You:     回测一下，2025年全年

CoinOS:  正在运行回测...
         ─────────────────────────────────────
         策略:       FundingRateStrat
         时间范围:   2025-01-01 → 2025-12-31
         总交易数:   142
         胜率:       63.4%
         总收益:     +18.7%
         最大回撤:   -8.2%
         夏普比率:   1.45
```

</details>

<details>
<summary><strong>Hyperliquid 鲸鱼追踪</strong></summary>

```
You:     Hyperliquid 上 BTC 大户都在做什么方向？

CoinOS:  BTC 鲸鱼持仓 Top (Hyperliquid)
         ─────────────────────────────────────
         🐋 0x1a2b...  做多   $12.5M   +$340K 盈亏
         🐋 0x3c4d...  做空   $8.2M    -$120K 盈亏
         🐋 0x5e6f...  做多   $6.8M    +$89K  盈亏
         ─────────────────────────────────────
         整体偏向: 65% 做多
```

</details>

<div align="center">
<br />
<img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png" alt="-----" />

## 环境变量

</div>

创建 `.env` 文件（脚本自动加载，依次查找当前目录、`~/.openclaw/workspace/.env`、`~/.openclaw/.env`）：

```bash
# AiCoin API（可选 — 内置免费 Key，有 IP 频率限制）
AICOIN_ACCESS_KEY_ID="your-key"
AICOIN_ACCESS_SECRET="your-secret"

# 交易所交易（按需配置）
BINANCE_API_KEY="xxx"
BINANCE_API_SECRET="xxx"
# 支持: BINANCE, OKX, BYBIT, BITGET, GATE, HTX, KUCOIN, MEXC, COINBASE
# OKX 还需要: OKX_PASSWORD="xxx"

# 代理（可选）
PROXY_URL="socks5://127.0.0.1:7890"
```

<div align="center">
<br />
<img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png" alt="-----" />
</div>

<details>
<summary><strong>项目结构</strong></summary>

<br />

```
coinos-skills/
├── skills/
│   ├── aicoin-market/        # 行情、K线、新闻、信号
│   │   ├── SKILL.md
│   │   ├── lib/
│   │   └── scripts/
│   │       ├── coin.mjs          价格、行情、币种信息
│   │       ├── market.mjs        K线、资金费率、持仓量
│   │       ├── features.mjs      大单、鲸鱼订单
│   │       ├── news.mjs          新闻推送、搜索
│   │       ├── newsflash.mjs     快讯提醒
│   │       ├── twitter.mjs       加密推特/X 动态
│   │       ├── airdrop.mjs       空投查询
│   │       └── drop_radar.mjs    上币雷达与项目分析
│   │
│   ├── aicoin-trading/       # 交易所交易
│   │   ├── SKILL.md
│   │   ├── lib/
│   │   └── scripts/
│   │       ├── exchange.mjs      下单、余额、仓位
│   │       └── auto-trade.mjs    自动交易策略
│   │
│   ├── aicoin-freqtrade/     # 量化策略
│   │   ├── SKILL.md
│   │   ├── lib/
│   │   └── scripts/
│   │       ├── ft-deploy.mjs     创建、回测、部署机器人
│   │       ├── ft.mjs            Freqtrade CLI 封装
│   │       └── ft-dev.mjs        策略开发辅助
│   │
│   ├── aicoin-hyperliquid/   # 鲸鱼分析
│   │   ├── SKILL.md
│   │   ├── lib/
│   │   └── scripts/
│   │       ├── hl-market.mjs     行情、订单簿、成交
│   │       └── hl-trader.mjs     大户持仓、盈亏、排行榜
│   │
│   └── aicoin-account/       # 账户管理
│       ├── SKILL.md
│       ├── lib/
│       └── scripts/
│           ├── exchange.mjs      余额、仓位、订单
│           ├── api-key-info.mjs  API Key 管理
│           ├── check-tier.mjs    API 套餐查询
│           └── register.mjs      交易所注册
│
├── AGENTS.md                 # AI Agent 路由指引
├── CLAUDE.md                 # 开发说明
└── .claude-plugin/
    └── plugin.json           # 插件元数据
```

</details>

<div align="center">

<br />

## License

[MIT License](./LICENSE)

<br />

<img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png" alt="-----" />

<br />

**基于** [AiCoin Open API](https://www.aicoin.com/opendata) · [CCXT](https://github.com/ccxt/ccxt) · [Freqtrade](https://github.com/freqtrade/freqtrade)

<br />

```
为 AI 原生加密货币交易而生。
```

<br />

<sub>Made by <a href="https://www.aicoin.com">AiCoin</a></sub>

</div>

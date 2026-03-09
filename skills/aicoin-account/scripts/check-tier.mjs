#!/usr/bin/env node
/**
 * check-tier.mjs — Check current AiCoin API key tier and guide upgrade
 *
 * Usage:
 *   node scripts/check-tier.mjs              # Check current tier
 *   node scripts/check-tier.mjs verify       # Verify after upgrade
 */
import { apiGet } from '../lib/aicoin-api.mjs';

const TIER_TESTS = [
  { tier: 'Free',         endpoint: '/api/v2/coin/ticker', params: { coin_list: 'bitcoin' }, label: '行情数据' },
  { tier: 'Basic',        endpoint: '/api/v2/mix/ls-ratio', params: {}, label: '多空比' },
  { tier: 'Standard',     endpoint: '/api/v2/order/bigOrder', params: { symbol: 'btcswapusdt:binance' }, label: '大单数据' },
  { tier: 'Advanced',     endpoint: '/api/upgrade/v2/futures/liquidation/map', params: { symbol: 'btcswapusdt:binance', cycle: '24h' }, label: '清算地图' },
  { tier: 'Professional', endpoint: '/api/upgrade/v2/futures/trade-data', params: { dbkey: 'btcswapusdt:binance' }, label: 'OI持仓量' },
];

async function checkTier() {
  const results = [];

  for (const test of TIER_TESTS) {
    try {
      const data = await apiGet(test.endpoint, test.params);
      if (data.success === false && (data.errorCode === 304 || data.errorCode === 403)) {
        results.push({ ...test, status: '❌ 需升级', available: false });
      } else {
        results.push({ ...test, status: '✅ 可用', available: true });
      }
    } catch (e) {
      const msg = e.message || '';
      if (msg.includes('403') || msg.includes('304')) {
        results.push({ ...test, status: '❌ 需升级', available: false });
      } else {
        results.push({ ...test, status: '⚠️ 网络错误', available: false });
      }
    }
  }

  // Determine tier = highest where ALL previous tiers also pass
  let currentTier = 'No Key';
  for (const test of TIER_TESTS) {
    const r = results.find(r => r.tier === test.tier);
    if (r && r.available) {
      currentTier = test.tier;
    } else {
      break;
    }
  }

  const tierIndex = TIER_TESTS.findIndex(t => t.tier === currentTier);
  const nextTier = tierIndex < TIER_TESTS.length - 1 ? TIER_TESTS[tierIndex + 1] : null;

  return {
    当前套餐: currentTier,
    功能检测: results.map(r => ({ 套餐: r.tier, 功能: r.label, 状态: r.status })),
    ...(nextTier ? {
      升级建议: {
        下一级套餐: nextTier.tier,
        解锁功能: nextTier.label,
        升级链接: 'https://www.aicoin.com/opendata',
        操作步骤: [
          '1. 打开 https://www.aicoin.com/opendata',
          '2. 登录账号，选择目标套餐并付款',
          '3. 到「API管理」页面查看 Key（升级后原Key自动生效，无需更换）',
          '4. 如果是新Key，更新 .env 中的 AICOIN_ACCESS_KEY_ID 和 AICOIN_ACCESS_SECRET',
          '5. 运行 node scripts/check-tier.mjs verify 验证升级成功'
        ]
      }
    } : {
      状态: '🎉 已是最高套餐 Professional，所有功能可用！'
    }),
    安全提示: 'AiCoin API Key 仅用于获取市场数据，无法交易。密钥仅保存在本地。'
  };
}

const action = process.argv[2] || 'check';
const result = await checkTier();

if (action === 'verify') {
  result.验证模式 = true;
  result.说明 = '升级后请确认上方功能检测中对应功能显示 ✅';
}

console.log(JSON.stringify(result, null, 2));

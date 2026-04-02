#!/usr/bin/env node
// Hyperliquid Trader Analytics CLI
import { apiGet, apiPost, cli } from '../lib/aicoin-api.mjs';

cli({
  // hl_trader
  trader_stats: ({ address, period }) => {
    const p = {}; if (period) p.period = period;
    return apiGet(`/api/upgrade/v2/hl/traders/${address}/addr-stat`, p);
  },
  best_trades: ({ address, period, limit }) => {
    const p = { period }; if (limit) p.limit = limit;
    return apiGet(`/api/upgrade/v2/hl/traders/${address}/best-trades`, p);
  },
  performance: ({ address, period, limit }) => {
    const p = { period }; if (limit) p.limit = limit;
    return apiGet(`/api/upgrade/v2/hl/traders/${address}/performance-by-coin`, p);
  },
  completed_trades: ({ address, coin, limit }) => {
    const p = {}; if (coin) p.coin = coin; if (limit) p.limit = limit;
    return apiGet(`/api/upgrade/v2/hl/traders/${address}/completed-trades`, p);
  },
  accounts: ({ addresses }) => {
    let addrs = addresses;
    if (typeof addrs === 'string') { try { addrs = JSON.parse(addrs); } catch { addrs = [addrs]; } }
    return apiPost('/api/upgrade/v2/hl/traders/accounts', { addresses: addrs });
  },
  statistics: ({ addresses }) => {
    let addrs = addresses;
    if (typeof addrs === 'string') { try { addrs = JSON.parse(addrs); } catch { addrs = [addrs]; } }
    return apiPost('/api/upgrade/v2/hl/traders/statistics', { addresses: addrs });
  },
  // hl_fills
  fills: ({ address, coin, limit }) => {
    const p = {}; if (coin) p.coin = coin; if (limit) p.limit = limit;
    return apiGet(`/api/upgrade/v2/hl/fills/${address}`, p);
  },
  fills_by_oid: ({ oid }) => apiGet(`/api/upgrade/v2/hl/fills/oid/${oid}`),
  fills_by_twapid: ({ twapid }) => apiGet(`/api/upgrade/v2/hl/fills/twapid/${twapid}`),
  top_trades: ({ coin, interval, limit }) => {
    const p = { coin, interval }; if (limit) p.limit = limit;
    return apiGet('/api/upgrade/v2/hl/fills/top-trades', p);
  },
  // hl_orders
  orders_latest: ({ address, coin, limit }) => {
    const p = {}; if (coin) p.coin = coin; if (limit) p.limit = limit;
    return apiGet(`/api/upgrade/v2/hl/orders/${address}/latest`, p);
  },
  order_by_oid: ({ oid }) => apiGet(`/api/upgrade/v2/hl/orders/oid/${oid}`),
  filled_orders: ({ address, coin, limit }) => {
    const p = {}; if (coin) p.coin = coin; if (limit) p.limit = limit;
    return apiGet(`/api/upgrade/v2/hl/filled-orders/${address}/latest`, p);
  },
  filled_by_oid: ({ oid }) => apiGet(`/api/upgrade/v2/hl/filled-orders/oid/${oid}`),
  top_open: ({ coin, minVal, min_val, limit }) => {
    const p = {}; if (coin) p.coin = coin; if (minVal || min_val) p.minVal = minVal || min_val; if (limit) p.limit = limit;
    return apiGet('/api/upgrade/v2/hl/orders/top-open-orders', p);
  },
  active_stats: ({ coin, whaleThreshold, whale_threshold }) => {
    const p = {}; if (coin) p.coin = coin; if (whaleThreshold || whale_threshold) p.whaleThreshold = whaleThreshold || whale_threshold;
    return apiGet('/api/upgrade/v2/hl/orders/active-stats', p);
  },
  twap_states: ({ address, coin, limit }) => {
    const p = {}; if (coin) p.coin = coin; if (limit) p.limit = limit;
    return apiGet(`/api/upgrade/v2/hl/twap-states/${address}/latest`, p);
  },
  // hl_position
  current_pos_history: ({ address, coin }) => apiGet(`/api/upgrade/v2/hl/traders/${address}/current-position-history/${coin}`),
  completed_pos_history: ({ address, coin, startTime, endTime }) => {
    const p = {}; if (startTime) p.startTime = startTime; if (endTime) p.endTime = endTime;
    return apiGet(`/api/upgrade/v2/hl/traders/${address}/completed-position-history/${coin}`, p);
  },
  current_pnl: ({ address, coin, interval, limit }) => {
    const p = {}; if (interval) p.interval = interval; if (limit) p.limit = limit;
    return apiGet(`/api/upgrade/v2/hl/traders/${address}/current-position-pnl/${coin}`, p);
  },
  completed_pnl: ({ address, coin, interval, startTime, endTime, limit }) => {
    const p = {}; if (interval) p.interval = interval; if (startTime) p.startTime = startTime; if (endTime) p.endTime = endTime; if (limit) p.limit = limit;
    return apiGet(`/api/upgrade/v2/hl/traders/${address}/completed-position-pnl/${coin}`, p);
  },
  current_executions: ({ address, coin, interval, limit }) => {
    const p = {}; if (interval) p.interval = interval; if (limit) p.limit = limit;
    return apiGet(`/api/upgrade/v2/hl/traders/${address}/current-position-executions/${coin}`, p);
  },
  completed_executions: ({ address, coin, interval, startTime, endTime, limit }) => {
    const p = {}; if (interval) p.interval = interval; if (startTime) p.startTime = startTime; if (endTime) p.endTime = endTime; if (limit) p.limit = limit;
    return apiGet(`/api/upgrade/v2/hl/traders/${address}/completed-position-executions/${coin}`, p);
  },
  // hl_portfolio
  portfolio: ({ address, window }) => apiGet(`/api/upgrade/v2/hl/portfolio/${address}/${window}`),
  pnls: ({ address, period }) => {
    const p = {}; if (period) p.period = period;
    return apiGet(`/api/upgrade/v2/hl/pnls/${address}`, p);
  },
  max_drawdown: ({ address, days, scope = 'perp' }) => apiGet(`/api/upgrade/v2/hl/max-drawdown/${address}`, { days, scope }),
  net_flow: ({ address, days }) => apiGet(`/api/upgrade/v2/hl/ledger-updates/net-flow/${address}`, { days }),
  // hl_advanced
  info: ({ type, user, extra_params }) => {
    const body = { type }; if (user) body.user = user;
    if (extra_params) {
      try { Object.assign(body, typeof extra_params === 'string' ? JSON.parse(extra_params) : extra_params); } catch {}
    }
    return apiPost('/api/upgrade/v2/hl/info', body);
  },
  smart_find: (params) => apiPost('/api/upgrade/v2/hl/smart/find', params || {}),
  discover: (params) => apiPost('/api/upgrade/v2/hl/traders/discover', params || {}),
  discover_history: (params) => apiPost('/api/upgrade/v2/hl/traders/discover-history', params || {}),
  // batch endpoints
  fills_by_builder: ({ builder, coin, limit, minVal } = {}) => {
    const p = {}; if (coin) p.coin = coin; if (limit) p.limit = limit; if (minVal) p.minVal = minVal;
    return apiGet(`/api/upgrade/v2/hl/fills/builder/${builder}/latest`, p);
  },
  batch_pnls: ({ addresses, period, scope }) => {
    let addrs = addresses;
    if (typeof addrs === 'string') { try { addrs = JSON.parse(addrs); } catch { addrs = [addrs]; } }
    const body = { addresses: addrs }; if (period != null) body.period = period; if (scope) body.scope = scope;
    return apiPost('/api/upgrade/v2/hl/batch-pnls', body);
  },
  batch_addr_stat: ({ addresses, period }) => {
    let addrs = addresses;
    if (typeof addrs === 'string') { try { addrs = JSON.parse(addrs); } catch { addrs = [addrs]; } }
    const body = { addresses: addrs }; if (period != null) body.period = period;
    return apiPost('/api/upgrade/v2/hl/traders/batch-addr-stat', body);
  },
  completed_trades_by_time: ({ address, pageNum, pageSize, Coin, endTimeFrom, endTimeTo }) => {
    const body = {};
    if (pageNum) body.pageNum = pageNum; if (pageSize) body.pageSize = pageSize;
    if (Coin) body.Coin = Coin; if (endTimeFrom) body.endTimeFrom = endTimeFrom; if (endTimeTo) body.endTimeTo = endTimeTo;
    return apiPost(`/api/upgrade/v2/hl/traders/${address}/completed-trades/by-time`, body);
  },
  batch_clearinghouse_state: ({ addresses, dex }) => {
    let addrs = addresses;
    if (typeof addrs === 'string') { try { addrs = JSON.parse(addrs); } catch { addrs = [addrs]; } }
    const body = { addresses: addrs }; if (dex) body.dex = dex;
    return apiPost('/api/upgrade/v2/hl/traders/clearinghouse-state', body);
  },
  batch_spot_clearinghouse_state: ({ addresses }) => {
    let addrs = addresses;
    if (typeof addrs === 'string') { try { addrs = JSON.parse(addrs); } catch { addrs = [addrs]; } }
    return apiPost('/api/upgrade/v2/hl/traders/spot-clearinghouse-state', { addresses: addrs });
  },
  batch_max_drawdown: ({ addresses, days, scope }) => {
    let addrs = addresses;
    if (typeof addrs === 'string') { try { addrs = JSON.parse(addrs); } catch { addrs = [addrs]; } }
    const body = { addresses: addrs }; if (days != null) body.days = days; if (scope) body.scope = scope;
    return apiPost('/api/upgrade/v2/hl/batch-max-drawdown', body);
  },
  batch_net_flow: ({ addresses, days }) => {
    let addrs = addresses;
    if (typeof addrs === 'string') { try { addrs = JSON.parse(addrs); } catch { addrs = [addrs]; } }
    const body = { addresses: addrs }; if (days != null) body.days = days;
    return apiPost('/api/upgrade/v2/hl/ledger-updates/batch-net-flow', body);
  },
});

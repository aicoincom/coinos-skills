#!/usr/bin/env node
// AiCoin Airdrop (OpenData) CLI
import { apiGet, cli } from '../lib/aicoin-api.mjs';

cli({
  list: ({ source, status, page, page_size, exchange, activity_type, lan } = {}) => {
    const p = {};
    if (source) p.source = source;
    if (status) p.status = status;
    if (page) p.page = page;
    if (page_size) p.page_size = page_size;
    if (exchange) p.exchange = exchange;
    if (activity_type) p.activity_type = activity_type;
    if (lan) p.lan = lan;
    return apiGet('/api/upgrade/v2/content/airdrop/list', p);
  },
  detail: ({ type, token, lan } = {}) => {
    const p = { type, token };
    if (lan) p.lan = lan;
    return apiGet('/api/upgrade/v2/content/airdrop/detail', p);
  },
  banner: ({ limit, lan } = {}) => {
    const p = {};
    if (limit) p.limit = limit;
    if (lan) p.lan = lan;
    return apiGet('/api/upgrade/v2/content/airdrop/banner', p);
  },
  exchanges: ({ lan } = {}) => {
    const p = {};
    if (lan) p.lan = lan;
    return apiGet('/api/upgrade/v2/content/airdrop/exchanges', p);
  },
  calendar: ({ year, month, lan } = {}) => {
    const p = { year, month };
    if (lan) p.lan = lan;
    return apiGet('/api/upgrade/v2/content/airdrop/calendar', p);
  },
});

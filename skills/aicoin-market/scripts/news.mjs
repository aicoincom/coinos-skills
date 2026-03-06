#!/usr/bin/env node
// AiCoin News & Flash CLI
import { apiGet, cli } from '../lib/aicoin-api.mjs';

cli({
  news_list: ({ page, page_size, pageSize = '20' } = {}) => {
    const p = { pageSize: page_size || pageSize };
    if (page) p.page = page;
    return apiGet('/api/v2/content/news-list', p);
  },
  news_detail: ({ id }) => apiGet('/api/v2/content/news-detail', { id }),
  news_rss: ({ page, page_size, pageSize = '20' } = {}) => {
    const p = { pageSize: page_size || pageSize };
    if (page) p.page = page;
    return apiGet('/api/v2/content/square/market/news-list', p);
  },
  newsflash: ({ language } = {}) => {
    const p = {};
    if (language) p.language = language;
    return apiGet('/api/v2/content/newsflash', p);
  },
  flash_list: ({ language, createtime } = {}) => {
    const p = {};
    if (language) p.language = language;
    if (createtime) p.createtime = createtime;
    return apiGet('/api/v2/content/flashList', p);
  },
  exchange_listing: ({ language, memberIds, page_size, pageSize } = {}) => {
    const p = {};
    if (language) p.language = language;
    if (memberIds) p.memberIds = memberIds;
    const ps = page_size || pageSize;
    if (ps) p.pageSize = ps;
    return apiGet('/api/v2/content/exchange-listing-flash', p);
  },
});

#!/usr/bin/env node
// AiCoin Twitter/X CLI
import { apiGet, apiPost, cli } from '../lib/aicoin-api.mjs';

cli({
  latest: ({ language, last_time, page_size } = {}) => {
    const p = {};
    if (language) p.language = language;
    if (last_time) p.last_time = last_time;
    if (page_size) p.page_size = page_size;
    return apiGet('/api/upgrade/v2/content/twitter/latest', p);
  },
  search: ({ keyword, language, last_time, page_size } = {}) => {
    const p = { keyword };
    if (language) p.language = language;
    if (last_time) p.last_time = last_time;
    if (page_size) p.page_size = page_size;
    return apiGet('/api/upgrade/v2/content/twitter/search', p);
  },
  members: ({ keyword, word, type, page, page_size, size } = {}) => {
    const p = { word: keyword || word };
    if (type) p.type = type;
    if (page) p.page = page;
    const ps = page_size || size;
    if (ps) p.size = ps;
    return apiGet('/api/upgrade/v2/content/twitter/members', p);
  },
  interaction_stats: ({ flash_ids } = {}) => {
    const ids = typeof flash_ids === 'string'
      ? flash_ids.split(',').map(s => Number(s.trim()))
      : flash_ids;
    return apiPost('/api/upgrade/v2/content/twitter/interaction-stats', { flash_ids: ids });
  },
});

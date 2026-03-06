#!/usr/bin/env node
// AiCoin Newsflash (OpenData) CLI
import { apiGet, cli } from '../lib/aicoin-api.mjs';

cli({
  search: ({ keyword, word, page, page_size, size } = {}) => {
    const p = { word: keyword || word };
    if (page) p.page = page;
    const ps = page_size || size;
    if (ps) p.size = ps;
    return apiGet('/api/upgrade/v2/content/newsflash/search', p);
  },
  list: ({ last_id, page_size, pagesize, tab, only_important, language, lan, platform_show, date_mode, jump_to_date, start_date, end_date } = {}) => {
    const p = {};
    if (last_id) p.last_id = last_id;
    const ps = page_size || pagesize;
    if (ps) p.pagesize = ps;
    if (tab) p.tab = tab;
    if (only_important) p.only_important = only_important;
    const lg = language || lan;
    if (lg) p.lan = lg;
    if (platform_show) p.platform_show = platform_show;
    if (date_mode) p.date_mode = date_mode;
    if (jump_to_date) p.jump_to_date = jump_to_date;
    if (start_date) p.start_date = start_date;
    if (end_date) p.end_date = end_date;
    return apiGet('/api/upgrade/v2/content/newsflash/list', p);
  },
  detail: ({ flash_id } = {}) => {
    return apiGet('/api/upgrade/v2/content/newsflash/detail', { flash_id });
  },
});

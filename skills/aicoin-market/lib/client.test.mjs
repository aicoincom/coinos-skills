import assert from 'node:assert/strict';
import test from 'node:test';

import { request } from './client.mjs';

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

test('market/klines uses the documented v2 source and keeps the v3 envelope', async () => {
  const urls = [];
  const fetchImpl = async (input) => {
    const url = new URL(String(input));
    urls.push(url);
    if (url.pathname === '/api/v3/market/ticker') {
      return jsonResponse({
        ok: true,
        data: {
          pair: { coin_key: 'bitcoin', market: 'okex' },
          ticker: { key: 'btcusdt:okex' },
        },
        error: null,
        meta: {},
      });
    }
    assert.equal(url.pathname, '/api/v2/commonKline/dataRecords');
    return jsonResponse({
      success: true,
      errorCode: 200,
      error: '',
      data: {
        kline_data: [
          [1787032800, 10, 12, 9, 11, 100],
          [1787036400, 11, 13, 10, 12, 120],
        ],
      },
    });
  };

  const result = await request('GET', 'market/klines', {
    coin_key: 'bitcoin',
    market: 'okex',
    interval: '1h',
    limit: 2,
  }, fetchImpl);

  assert.equal(result.httpStatus, 200);
  assert.equal(result.body.ok, true);
  assert.equal(result.body.meta.source, 'v2_common_kline_fallback');
  assert.equal(result.body.data.candles.length, 2);
  assert.deepEqual(result.body.data.candles[1], {
    timestamp: 1787036400000,
    open: 11,
    high: 13,
    low: 10,
    close: 12,
    volume: 120,
  });
  assert.deepEqual(urls.map((url) => url.pathname), [
    '/api/v3/market/ticker',
    '/api/v2/commonKline/dataRecords',
  ]);
  assert.equal(urls[1].searchParams.get('symbol'), 'btcusdt:okex');
  assert.equal(urls[1].searchParams.get('period'), '3600');
  assert.ok(urls[1].searchParams.get('Signature'));
});

test('a failed v2 fallback preserves the original v3 K-line behavior', async () => {
  const paths = [];
  const fetchImpl = async (input) => {
    const url = new URL(String(input));
    paths.push(url.pathname);
    if (url.pathname === '/api/v3/market/ticker') {
      return jsonResponse({
        ok: true,
        data: { ticker: { key: 'btcusdt:binance' } },
      });
    }
    if (url.pathname === '/api/v2/commonKline/dataRecords') {
      return jsonResponse({ success: false, errorCode: 500, error: 'temporary' }, 500);
    }
    return jsonResponse({
      ok: true,
      data: { candles: [{ timestamp: 1, close: 10 }] },
      error: null,
      meta: { count: 1 },
    });
  };

  const result = await request('GET', 'market/klines', {
    coin_key: 'bitcoin',
    market: 'binance',
    interval: '1h',
  }, fetchImpl);

  assert.equal(result.body.ok, true);
  assert.equal(result.body.meta.count, 1);
  assert.deepEqual(paths, [
    '/api/v3/market/ticker',
    '/api/v2/commonKline/dataRecords',
    '/api/v3/market/klines',
  ]);
});

test('non-K-line endpoints remain a single v3 request', async () => {
  const paths = [];
  const result = await request('GET', 'coins/tickers', { coin_key: 'bitcoin' }, async (input) => {
    paths.push(new URL(String(input)).pathname);
    return jsonResponse({ ok: true, data: [], error: null, meta: {} });
  });

  assert.equal(result.body.ok, true);
  assert.deepEqual(paths, ['/api/v3/coins/tickers']);
});

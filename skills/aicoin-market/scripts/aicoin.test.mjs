import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { createServer } from 'node:http';
import test from 'node:test';
import { promisify } from 'node:util';
import { fileURLToPath } from 'node:url';

const execFileAsync = promisify(execFile);
const cli = fileURLToPath(new URL('./aicoin.mjs', import.meta.url));

function json(res, body) {
  res.writeHead(200, { 'content-type': 'application/json' });
  res.end(JSON.stringify(body));
}

test('market/klines CLI exposes an order-independent latest candle', async () => {
  const server = createServer((req, res) => {
    const url = new URL(req.url, 'http://localhost');
    if (url.pathname === '/api/v3/market/ticker') {
      return json(res, {
        ok: true,
        data: {
          pair: { coin_key: 'bitcoin', market: 'binance' },
          ticker: { key: 'btcusdt:binance' },
        },
        error: null,
        meta: {},
      });
    }
    if (url.pathname === '/api/v2/commonKline/dataRecords') {
      return json(res, {
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
    }
    res.writeHead(404);
    res.end();
  });

  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  try {
    const { port } = server.address();
    const { stdout } = await execFileAsync(process.execPath, [
      cli,
      'market/klines',
      '{"coin_key":"bitcoin","market":"binance","interval":"1h","limit":2}',
    ], {
      env: {
        ...process.env,
        AICOIN_BASE_URL: `http://127.0.0.1:${port}`,
        AICOIN_ACCESS_KEY_ID: 'test-key',
        AICOIN_ACCESS_SECRET: 'test-secret',
      },
    });
    const body = JSON.parse(stdout);
    assert.equal(body._timeseries.in, 'data.candles');
    assert.equal(body._timeseries.latest.timestamp, 1787036400000);
    assert.match(body._timeseries.order, /最新在末尾/);
  } finally {
    await new Promise((resolve, reject) => server.close((error) => (error ? reject(error) : resolve())));
  }
});

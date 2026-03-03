#!/usr/bin/env node
// AiCoin API client with HMAC signing - shared lib
import { createHmac, randomBytes } from 'node:crypto';

const BASE = process.env.AICOIN_BASE_URL || 'https://open.aicoin.com';
const KEY = process.env.AICOIN_ACCESS_KEY_ID || 'ronJ8uI0Yj2soAfGVs5H1YALUIINbE22';
const SECRET = process.env.AICOIN_ACCESS_SECRET || 'CWHZcH2us1CLSE7grroR1TpS0Z1JxTwU';

function sign() {
  const nonce = randomBytes(4).toString('hex');
  const ts = Math.floor(Date.now() / 1000).toString();
  const str = `AccessKeyId=${KEY}&SignatureNonce=${nonce}&Timestamp=${ts}`;
  const hex = createHmac('sha1', SECRET).update(str).digest('hex');
  const sig = Buffer.from(hex, 'binary').toString('base64');
  return { AccessKeyId: KEY, SignatureNonce: nonce, Timestamp: ts, Signature: sig };
}

export async function apiGet(path, params = {}) {
  const qs = new URLSearchParams({ ...params, ...sign() });
  const res = await fetch(`${BASE}${path}?${qs}`, { signal: AbortSignal.timeout(30000) });
  if (!res.ok) throw new Error(`API ${res.status}: ${await res.text()}`);
  return res.json();
}

export async function apiPost(path, body = {}) {
  const res = await fetch(`${BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...body, ...sign() }),
    signal: AbortSignal.timeout(30000),
  });
  if (!res.ok) throw new Error(`API ${res.status}: ${await res.text()}`);
  return res.json();
}

// CLI helper: parse args and run
export function cli(handlers) {
  const [action, ...rest] = process.argv.slice(2);
  if (!action || !handlers[action]) {
    console.log(`Usage: node <script> <action> [json-params]\nActions: ${Object.keys(handlers).join(', ')}`);
    process.exit(1);
  }
  const params = rest.length ? JSON.parse(rest.join(' ')) : {};
  handlers[action](params).then(r => console.log(JSON.stringify(r, null, 2))).catch(e => {
    console.error(e.message);
    process.exit(1);
  });
}

#!/usr/bin/env node
// OKX Web3 DEX API client with HMAC-SHA256 signing
import { createHmac } from 'node:crypto';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

// ── Proxy support (for environments where OKX domains are DNS-blocked) ──
const PROXY_URL = process.env.https_proxy || process.env.HTTPS_PROXY || process.env.http_proxy || process.env.HTTP_PROXY;
if (PROXY_URL) {
  try {
    const { ProxyAgent, setGlobalDispatcher } = await import('undici');
    setGlobalDispatcher(new ProxyAgent(PROXY_URL));
  } catch {}
}

// ── .env loading (same pattern as aicoin-api.mjs) ──
function loadEnv() {
  const candidates = [
    resolve(process.cwd(), '.env'),
    resolve(process.env.HOME || '', '.openclaw', 'workspace', '.env'),
    resolve(process.env.HOME || '', '.openclaw', '.env'),
  ];
  for (const file of candidates) {
    if (!existsSync(file)) continue;
    try {
      for (const line of readFileSync(file, 'utf-8').split('\n')) {
        const t = line.trim();
        if (!t || t.startsWith('#')) continue;
        const eq = t.indexOf('=');
        if (eq < 1) continue;
        const key = t.slice(0, eq).trim();
        let val = t.slice(eq + 1).trim();
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'")))
          val = val.slice(1, -1);
        if (!process.env[key]) process.env[key] = val;
      }
    } catch {}
  }
}
loadEnv();

// ── Credentials ──
const BASE = process.env.OKX_BASE_URL || 'https://web3.okx.com';
const API_KEY = process.env.OKX_API_KEY || '';
const SECRET = process.env.OKX_SECRET_KEY || '';
const PASSPHRASE = process.env.OKX_PASSPHRASE || '';

if (!API_KEY || !SECRET || !PASSPHRASE) {
  // Only warn, don't crash — some actions might not need auth
}

// ── HMAC-SHA256 signing (OKX format) ──
function sign(method, requestPath, body = '') {
  const timestamp = new Date().toISOString();
  const prehash = `${timestamp}${method}${requestPath}${body}`;
  const sig = createHmac('sha256', SECRET).update(prehash).digest('base64');
  return { timestamp, sig };
}

function authHeaders(method, requestPath, body = '') {
  const { timestamp, sig } = sign(method, requestPath, body);
  return {
    'OK-ACCESS-KEY': API_KEY,
    'OK-ACCESS-SIGN': sig,
    'OK-ACCESS-PASSPHRASE': PASSPHRASE,
    'OK-ACCESS-TIMESTAMP': timestamp,
    'Content-Type': 'application/json',
  };
}

// ── Chain name → chainIndex ──
const CHAIN_MAP = {
  ethereum: '1', eth: '1',
  solana: '501', sol: '501',
  bsc: '56', bnb: '56',
  polygon: '137', matic: '137',
  arbitrum: '42161', arb: '42161',
  base: '8453',
  xlayer: '196', okb: '196',
  avalanche: '43114', avax: '43114',
  optimism: '10', op: '10',
  fantom: '250', ftm: '250',
  sui: '784',
  tron: '195', trx: '195',
  ton: '607',
  linea: '59144',
  scroll: '534352',
  zksync: '324',
};

export function resolveChain(name) {
  if (!name) return '1';
  return CHAIN_MAP[name.toLowerCase()] || name;
}

export function resolveChains(names) {
  if (!names) return '';
  return names.split(',').map(s => resolveChain(s.trim())).join(',');
}

// Native token address per chain
const NATIVE_TOKENS = {
  '501': '11111111111111111111111111111111',
  '784': '0x2::sui::SUI',
  '195': 'T9yD14Nj9j7xAB4dbGeiX9h8unkKHxuWwb',
  '607': 'EQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM9c',
};

export function nativeTokenAddress(chainIndex) {
  return NATIVE_TOKENS[chainIndex] || '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee';
}

// ── HTTP helpers ──
export async function okxGet(path, params = {}) {
  // Filter out empty values
  const filtered = Object.entries(params).filter(([, v]) => v !== undefined && v !== null && v !== '');
  const qs = new URLSearchParams(filtered);
  const qsStr = qs.toString();
  const requestPath = qsStr ? `${path}?${qsStr}` : path;
  const url = `${BASE}${requestPath}`;

  const res = await fetch(url, {
    headers: authHeaders('GET', requestPath),
    signal: AbortSignal.timeout(15000),
  });

  return handleResponse(res);
}

export async function okxPost(path, body = {}) {
  const bodyStr = JSON.stringify(body);
  const url = `${BASE}${path}`;

  const res = await fetch(url, {
    method: 'POST',
    headers: authHeaders('POST', path, bodyStr),
    body: bodyStr,
    signal: AbortSignal.timeout(15000),
  });

  return handleResponse(res);
}

async function handleResponse(res) {
  if (res.status === 429) {
    return { error: 'Rate limited — retry later or apply for your own API key at https://web3.okx.com/onchain-os/dev-portal' };
  }
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    return { error: `HTTP ${res.status}: ${text}` };
  }
  const json = await res.json();
  const code = json.code;
  if (code !== '0' && code !== 0) {
    // Region restriction — friendly message
    if (code === '50125' || code === '80001' || code === 50125 || code === 80001) {
      return { error: 'Service is not available in your region. Please switch to a supported region and try again.' };
    }
    return { error: `API error (code=${code}): ${json.msg || 'unknown'}`, raw: json };
  }
  return { code: '0', data: json.data };
}

// ── CLI dispatcher (same pattern as aicoin-api.mjs) ──
export function cli(handlers) {
  const [action, ...rest] = process.argv.slice(2);
  if (!action || !handlers[action]) {
    console.log(JSON.stringify({
      error: action ? `Unknown action "${action}"` : 'No action specified',
      available_actions: Object.keys(handlers).join(', '),
    }));
    process.exit(1);
  }
  let params = {};
  if (rest.length) {
    try { params = JSON.parse(rest.join(' ')); } catch {
      console.log(JSON.stringify({ error: `Invalid JSON: ${rest.join(' ')}` }));
      process.exit(1);
    }
  }
  // Check credentials
  if (!API_KEY || !SECRET || !PASSPHRASE) {
    console.log(JSON.stringify({
      error: 'OKX API credentials not configured',
      setup: 'Add to .env: OKX_API_KEY=xxx, OKX_SECRET_KEY=xxx, OKX_PASSPHRASE=xxx',
      apply: 'Get free API key at https://web3.okx.com/onchain-os/dev-portal',
    }));
    process.exit(1);
  }
  handlers[action](params)
    .then(r => console.log(JSON.stringify(r, null, 2)))
    .catch(e => { console.error(JSON.stringify({ error: e.message })); process.exit(1); });
}

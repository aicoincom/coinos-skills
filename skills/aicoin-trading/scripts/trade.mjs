#!/usr/bin/env node
// Alias: trade.mjs → exchange.mjs (models often guess "trade" instead of "exchange")
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { execSync } from 'node:child_process';

const __dir = dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2).map(a => `'${a}'`).join(' ');
try {
  execSync(`node ${resolve(__dir, 'exchange.mjs')} ${args}`, { stdio: 'inherit' });
} catch (e) {
  process.exit(e.status || 1);
}

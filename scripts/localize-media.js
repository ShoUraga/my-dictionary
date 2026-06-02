#!/usr/bin/env node
/*
 * localize-media.js
 *
 * entries.js の中で image / audio フィールドが「リモートURL（http/https）」に
 * なっているものを検出し、ファイルを images/ または audio/ にダウンロードして、
 * その値を相対パスに書き換える。
 *
 * クラウド版Claude（claude.ai/code）はサンドボックスの送信制限で画像を
 * curl ダウンロードできないため、登録時はURLを直接 image に入れておき
 * （ビューアはホットリンクで即表示できる）、push をトリガーに GitHub Actions
 * （ネットワーク制限なし）がこのスクリプトでリポジトリへ取り込む。
 *
 * - ファイル名は entry.id を使う（一意なので衝突しない）。
 * - 1件失敗しても他は続行し、失敗したものはホットリンクのまま残す（データは捨てない）。
 * - entries.js は文字列置換で書き換えるので、コメント・整形はそのまま保たれる。
 */
'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const http = require('http');
const https = require('https');

const ROOT = process.cwd();
const FILE = path.join(ROOT, 'entries.js');
const UA = 'my-dictionary-bot/1.0 (https://github.com/ShoUraga/my-dictionary; media localizer)';

function safeName(id) {
  return String(id)
    .toLowerCase()
    .replace(/[^a-z0-9._-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '') || 'item';
}

function extFromUrl(u, field) {
  try {
    const p = new URL(u).pathname;
    const e = path.extname(p).toLowerCase().replace(/[^a-z0-9.]/g, '');
    if (e && e.length >= 2 && e.length <= 5) return e;
  } catch (_) { /* fallthrough */ }
  return field === 'audio' ? '.mp3' : '.jpg';
}

function download(url, dest, redirects) {
  if (redirects === undefined) redirects = 6;
  return new Promise((resolve, reject) => {
    if (redirects < 0) return reject(new Error('too many redirects'));
    const mod = url.toLowerCase().startsWith('https') ? https : http;
    const req = mod.get(url, { headers: { 'User-Agent': UA, 'Accept': '*/*' } }, (res) => {
      const code = res.statusCode || 0;
      if (code >= 300 && code < 400 && res.headers.location) {
        res.resume();
        const next = new URL(res.headers.location, url).toString();
        return resolve(download(next, dest, redirects - 1));
      }
      if (code !== 200) {
        res.resume();
        return reject(new Error('HTTP ' + code + ' for ' + url));
      }
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      const out = fs.createWriteStream(dest);
      res.pipe(out);
      out.on('finish', () => out.close(() => resolve()));
      out.on('error', reject);
    });
    req.on('error', reject);
    req.setTimeout(30000, () => req.destroy(new Error('timeout')));
  });
}

async function main() {
  if (!fs.existsSync(FILE)) {
    console.error('entries.js not found at ' + FILE);
    process.exit(1);
  }
  let raw = fs.readFileSync(FILE, 'utf8');

  // window シムを与えて評価し、エントリ配列を取り出す（読み取り専用）
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(raw, sandbox, { filename: 'entries.js' });
  const entries = Array.isArray(sandbox.window.DICTIONARY_ENTRIES)
    ? sandbox.window.DICTIONARY_ENTRIES
    : [];

  const jobs = [];
  for (const e of entries) {
    for (const field of ['image', 'audio']) {
      const val = e && e[field];
      if (typeof val === 'string' && /^https?:\/\//i.test(val.trim())) {
        jobs.push({ id: e.id, field, url: val.trim() });
      }
    }
  }

  if (jobs.length === 0) {
    console.log('No remote media URLs to localize.');
    return;
  }

  let changed = false;
  for (const job of jobs) {
    const dir = job.field === 'audio' ? 'audio' : 'images';
    const rel = dir + '/' + safeName(job.id) + extFromUrl(job.url, job.field);
    const dest = path.join(ROOT, rel);
    try {
      console.log('Downloading ' + job.url + ' -> ' + rel);
      await download(job.url, dest);
      const size = fs.statSync(dest).size;
      if (size < 1024) throw new Error('file too small (' + size + ' bytes)');
      const from = JSON.stringify(job.url);
      const to = JSON.stringify(rel);
      if (raw.indexOf(from) !== -1) {
        raw = raw.split(from).join(to);
        changed = true;
        console.log('  localized (' + size + ' bytes)');
      } else {
        console.log('  WARNING: URL string not found verbatim in entries.js; left as hotlink');
      }
    } catch (err) {
      console.log('  FAILED: ' + err.message + ' — leaving as hotlink');
      try { if (fs.existsSync(dest)) fs.unlinkSync(dest); } catch (_) {}
    }
  }

  if (changed) {
    fs.writeFileSync(FILE, raw);
    console.log('entries.js updated.');
  } else {
    console.log('Nothing localized.');
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

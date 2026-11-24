/**
 * The exact glyph set the site renders — shared by the `text=` font subsetter
 * (`scripts/fetch-fonts.mjs`) and the CLI that prints/writes it
 * (`scripts/generate-font-text-set.mjs`).
 *
 * Google Fonts' `text=` parameter builds a subset containing only the
 * characters supplied, which is what keeps the two preloaded faces (DM Sans,
 * Playfair Display) small enough to sit cheaply in Lantern's render-blocking
 * graph. The set must cover every character that can appear in *rendered* copy
 * or the browser falls back to a system font mid-sentence, so this walks every
 * source of static copy — content JSON, brand config, translation table, source
 * HTML, string literals and JSX text — and unions what it finds with the
 * printable ASCII range and common typographic punctuation.
 *
 * Deliberately NOT included: the full Latin-1 block (≈14 KB per face of safety
 * margin for characters no page renders) and emoji (no shipped face covers
 * them; the system emoji font renders them regardless). Text a visitor types
 * into a form falls back to the next font in the stack for anything outside
 * this set, which is the right fallback for user-generated content.
 */
import { readdirSync, readFileSync, statSync } from 'fs';
import { join, relative } from 'path';

const SKIP_DIRS = new Set(['node_modules', 'dist', '.git', 'graphify-out', '.image-cache']);

function walk(dir, out = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

/** Collect every distinct character from the strings inside a JSON value. */
function collectJson(value, chars) {
  if (typeof value === 'string') {
    for (const ch of value) chars.add(ch);
  } else if (Array.isArray(value)) {
    for (const item of value) collectJson(item, chars);
  } else if (value && typeof value === 'object') {
    for (const item of Object.values(value)) collectJson(item, chars);
  }
}

/** @returns {string} every distinct character the site can render, sorted. */
export function buildTextSet(root = process.cwd()) {
  const chars = new Set();

  // 1. Static copy: every .json under src/content plus the translation and
  //    brand tables, and the string literals / JSX text of the components.
  for (const file of walk(join(root, 'src'))) {
    const rel = relative(root, file);
    if (rel.endsWith('.json')) {
      collectJson(JSON.parse(readFileSync(file, 'utf8')), chars);
    } else if (rel.endsWith('.ts') || rel.endsWith('.tsx')) {
      const source = readFileSync(file, 'utf8');
      for (const m of source.matchAll(/'([^'\\\n]*)'|"([^"\\\n]*)"/g)) {
        for (const ch of m[1] ?? m[2] ?? '') chars.add(ch);
      }
      for (const m of source.matchAll(/>\s*([^<>{}\n]+)\s*</g)) {
        for (const ch of m[1]) chars.add(ch);
      }
    }
  }

  // 2. The document head carries the title and every meta/OG string, and
  //    prerendered markup is built from the same content.
  const indexHtml = join(root, 'index.html');
  if (statSync(indexHtml).isFile()) {
    const html = readFileSync(indexHtml, 'utf8');
    for (const m of html.matchAll(/content="([^"]+)"/g)) {
      for (const ch of m[1]) chars.add(ch);
    }
    for (const m of html.matchAll(/<title>([^<]+)<\/title>/g)) {
      for (const ch of m[1]) chars.add(ch);
    }
  }

  // 3. Always-safe ranges: printable ASCII and typographic punctuation.
  for (let i = 0x20; i <= 0x7e; i++) chars.add(String.fromCharCode(i));
  for (const ch of '€£¥–—‘’“”•©®™…°×÷±←→⚠✕') chars.add(ch);

  // Flag sequences and pictographs live in the astral planes and are rendered
  // by the system emoji font; dropping them keeps the subset request small
  // without changing what visitors see. Arrows and symbols are kept — those
  // *are* rendered from these faces.
  for (const ch of [...chars]) {
    if (ch.codePointAt(0) >= 0x1f000) chars.delete(ch);
  }

  return [...chars].sort().join('');
}

/** Compact `unicode-range` descriptor for a glyph set (fallback declaration). */
export function unicodeRangeOf(text) {
  const codes = [...text].map((ch) => ch.codePointAt(0)).sort((a, b) => a - b);
  const ranges = [];
  let start = codes[0];
  let prev = codes[0];
  const flush = () => ranges.push(start === prev ? hex(start) : `${hex(start)}-${hex(prev)}`);
  for (const code of codes.slice(1)) {
    if (code === prev + 1) prev = code;
    else {
      flush();
      start = prev = code;
    }
  }
  flush();
  return `U+${ranges.join(', U+')}`;
}

const hex = (code) => code.toString(16).toUpperCase().padStart(4, '0');

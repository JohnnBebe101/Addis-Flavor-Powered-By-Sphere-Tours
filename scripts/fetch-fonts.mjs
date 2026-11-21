/**
 * Download and version the self-hosted webfont subsets.
 *
 * Two modes:
 *
 *   (default)  Google Fonts' `text=` API — each family is subset to the exact
 *              glyphs the site renders (see scripts/font-text-set.mjs). This
 *              is what ships: the two preloaded faces drop from 99 KB to ~62 KB,
 *              which is ~37 KB off Lantern's render-blocking graph and therefore
 *              off the LCP critical path.
 *   --full     Google's standard script subsets (latin + latin-ext + Ethiopic).
 *              Wider glyph coverage, ~519 KB on disk, and the reason a `fonts`
 *              run is gated by scripts/check-font-budget.mjs afterwards.
 *
 * Each file gets a content-hash version query (`/fonts/x.woff2?v=abc123`) and
 * the matching `@font-face` rules are written to src/fonts.css. That is what
 * makes a `max-age=31536000, immutable` cache header safe: change a font file
 * and the URL changes with it. This script owns src/fonts.css and the preload
 * URLs in index.html — do not hand-edit them.
 *
 * Files in public/fonts that this run does not produce are deleted, so a mode
 * switch can never leave orphans that ship to dist.
 *
 * Usage:
 *   node scripts/fetch-fonts.mjs           # subset to the rendered glyph set
 *   node scripts/fetch-fonts.mjs --full    # full Google script subsets
 *   node scripts/fetch-fonts.mjs --check   # verify files + versions, download nothing
 */
import { createHash } from 'crypto';
import { existsSync, mkdirSync, readdirSync, readFileSync, unlinkSync, writeFileSync } from 'fs';
import { buildTextSet, unicodeRangeOf } from './font-text-set.mjs';

const SUBSET_URL =
  'https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,100..1000;1,100..1000' +
  '&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap&text=';

const FULL_URL =
  'https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Noto+Sans+Ethiopic:wght@100..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap';

const ETHIOPIC_URL = 'https://fonts.googleapis.com/css2?family=Noto+Sans+Ethiopic:wght@100..900&display=swap';

const OUT_DIR = 'public/fonts';
const GENERATED_CSS = 'src/fonts.css';
const INDEX_HTML = 'index.html';

const SLUG = {
  'DM Sans': 'dm-sans',
  'Playfair Display': 'playfair-display',
  'Noto Sans Ethiopic': 'noto-sans-ethiopic',
};

/**
 * The shipped set: DM Sans and Playfair Display subset to the rendered glyph
 * set (`text=`), plus the dormant Ethiopic face which never costs a request —
 * no unicode-range it covers is ever used — and therefore is not subsetted.
 */
const SUBSET_TARGETS = [
  { family: 'DM Sans', style: 'normal', subset: 'text', name: 'dm-sans-normal.woff2' },
  { family: 'DM Sans', style: 'italic', subset: 'text', name: 'dm-sans-italic.woff2' },
  { family: 'Playfair Display', style: 'normal', subset: 'text', name: 'playfair-display-normal.woff2' },
  { family: 'Playfair Display', style: 'italic', subset: 'text', name: 'playfair-display-italic.woff2' },
  { family: 'Noto Sans Ethiopic', style: 'normal', subset: 'ethiopic', name: 'noto-sans-ethiopic-normal-ethiopic.woff2' },
];

/** Standard Google script subsets — wide coverage, used by `--full`. */
const FULL_TARGETS = [
  { family: 'DM Sans', style: 'normal', subsets: ['latin', 'latin-ext'] },
  { family: 'DM Sans', style: 'italic', subsets: ['latin', 'latin-ext'] },
  { family: 'Playfair Display', style: 'normal', subsets: ['latin', 'latin-ext'] },
  { family: 'Playfair Display', style: 'italic', subsets: ['latin', 'latin-ext'] },
  { family: 'Noto Sans Ethiopic', style: 'normal', subsets: ['ethiopic'] },
].flatMap((want) =>
  want.subsets.map((subset) => ({
    ...want,
    subsets: undefined,
    subset,
    name: `${SLUG[want.family]}-${want.style}-${subset}.woff2`,
  })),
);

const subsetMode = !process.argv.includes('--full');
const checkOnly = process.argv.includes('--check');
const targets = subsetMode ? SUBSET_TARGETS : FULL_TARGETS;

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const versionOf = (buffer) => createHash('sha256').update(buffer).digest('hex').slice(0, 8);

/** Split a Google stylesheet into `{ subset, body }` @font-face blocks. */
function parseFaces(css) {
  const faces = [];
  const re = /(?:\/\*\s*([a-z-]+)\s*\*\/)?\s*(@font-face\s*\{[\s\S]*?\})/g;
  for (const m of css.matchAll(re)) faces.push({ subset: m[1] ?? null, body: m[2] });
  return faces;
}

async function requestStylesheet(url) {
  const res = await fetch(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/131.0.0.0 Safari/537.36',
    },
  });
  if (!res.ok) throw new Error(`[fonts] stylesheet request failed: HTTP ${res.status}`);
  return res.text();
}

/* ------------------------------------------------------------------ check mode */

if (checkOnly) {
  const problems = [];

  for (const target of targets) {
    const path = `${OUT_DIR}/${target.name}`;
    if (!existsSync(path)) {
      problems.push(`missing font file ${path}`);
      continue;
    }
    const expected = versionOf(readFileSync(path));
    const css = existsSync(GENERATED_CSS) ? readFileSync(GENERATED_CSS, 'utf8') : '';
    if (!css.includes(`/fonts/${target.name}?v=${expected}`)) {
      problems.push(`${GENERATED_CSS} does not reference ${target.name} with version ${expected}`);
    }
  }

  const html = readFileSync(INDEX_HTML, 'utf8');
  for (const match of html.matchAll(/href="(\/fonts\/[^"?]+)(?:\?v=([0-9a-f]+))?"/g)) {
    const [, path, version] = match;
    if (!existsSync(`public${path}`)) problems.push(`index.html preloads missing file ${path}`);
    else if (!version) problems.push(`index.html preload ${path} has no version query`);
    else if (versionOf(readFileSync(`public${path}`)) !== version) {
      problems.push(`index.html preload ${path} has stale version ${version}`);
    }
  }

  if (problems.length) {
    console.error('[fonts] FAILED');
    for (const problem of problems) console.error(`  - ${problem}`);
    console.error('[fonts] run: node scripts/fetch-fonts.mjs');
    process.exit(1);
  }

  console.log(`[fonts] ok — ${targets.length} files (${subsetMode ? 'subset' : 'full'}), versions in sync`);
  process.exit(0);
}

/* ---------------------------------------------------------------- download mode */

// Google's `text=` parameter applies to the whole request, so the Ethiopic face
// (which must keep its full script coverage) is fetched separately.
const textSet = subsetMode ? buildTextSet() : null;
const sheets = subsetMode
  ? await Promise.all([requestStylesheet(SUBSET_URL + encodeURIComponent(textSet)), requestStylesheet(ETHIOPIC_URL)])
  : [await requestStylesheet(FULL_URL)];

const facesBySheet = sheets.map(parseFaces);

mkdirSync(OUT_DIR, { recursive: true });

const faces = [];
let written = 0;
let bytes = 0;

for (const target of targets) {
  const pool = facesBySheet[target.subset === 'ethiopic' && subsetMode ? 1 : 0];
  const block = pool.find(
    (b) =>
      new RegExp(`font-family:\\s*'${escapeRe(target.family)}'`).test(b.body) &&
      new RegExp(`font-style:\\s*${target.style}\\b`).test(b.body) &&
      (target.subset === 'text' || b.subset === null || b.subset === target.subset),
  );
  if (!block) {
    console.error(`[fonts] no @font-face found for ${target.family} ${target.style} (${target.subset})`);
    process.exitCode = 1;
    continue;
  }

  const url = block.body.match(/url\(([^)]+)\)/)[1].replace(/['"]/g, '');
  const res = await fetch(url);
  if (!res.ok) {
    console.error(`[fonts] download failed for ${target.name}: HTTP ${res.status}`);
    process.exitCode = 1;
    continue;
  }

  const buffer = Buffer.from(await res.arrayBuffer());
  writeFileSync(`${OUT_DIR}/${target.name}`, buffer);
  written += 1;
  bytes += buffer.length;

  const weight = block.body.match(/font-weight:\s*([^;]+);/)[1].trim();
  // `text=` responses carry a generated unicode-range covering the supplied
  // glyphs; if Google ever omits it, compute the same declaration from the set
  // so characters outside the subset still fall back to the system font stack
  // instead of rendering .notdef boxes.
  const range =
    block.body.match(/unicode-range:\s*([^;]+);/)?.[1]?.trim() ??
    (textSet ? unicodeRangeOf(textSet) : null) ??
    undefined;

  faces.push({ ...target, weight, range, version: versionOf(buffer) });

  console.log(
    `[fonts] ${target.name.padEnd(38)} ${String(Math.round(buffer.length / 1024)).padStart(4)} KB  v=${faces.at(-1).version}`,
  );
}

// Drop files from a previous mode/decade so they cannot ship unreferenced.
for (const file of readdirSync(OUT_DIR)) {
  if (!file.endsWith('.woff2')) continue;
  if (targets.some((target) => target.name === file)) continue;
  unlinkSync(`${OUT_DIR}/${file}`);
  console.log(`[fonts] removed stale ${file}`);
}

/* ------------------------------------------------------------- generate CSS */

const header = `/*
 * GENERATED FILE — do not edit by hand.
 * Run \`npm run fonts\` to regenerate after changing the font set.
 *
 * Self-hosted webfonts, replacing the render-blocking fonts.googleapis.com
 * stylesheet.
 *${
  subsetMode
    ? `
 * The Latin faces are \`text=\` subsets: only the glyphs this site renders
 * (scripts/font-text-set.mjs). That keeps DM Sans and Playfair Display — the
 * two preloaded faces on the LCP critical path — at ~62 KB combined instead of
 * ~99 KB for the standard script subsets.`
    : `
 * These are Google's standard script subsets (latin, latin-ext, Ethiopic), so
 * glyph coverage matches Google Fonts exactly.`
}
 *
 * \`unicode-range\` keeps each file dormant until a character it covers is used:
 * a normal visit downloads only the two preloaded Latin faces (DM Sans and
 * Playfair Display). The Ethiopic subset costs nothing unless such text appears,
 * and any character outside a subset falls through to the system font stack.
 *
 * The \`?v=\` query is a content hash, which makes a long-lived immutable cache
 * header safe: replacing a font file changes its URL.
 */
`;

const cssBody = faces
  .map(
    (face) => `@font-face {
  font-family: '${face.family}';
  font-style: ${face.style};
  font-weight: ${face.weight};
  font-display: swap;
  src: url('/fonts/${face.name}?v=${face.version}') format('woff2');${
    face.range
      ? `
  unicode-range: ${face.range};`
      : ''
  }
}`,
  )
  .join('\n\n');
writeFileSync(GENERATED_CSS, `${header}\n${cssBody}\n`);

/* ------------------------------------------------- update index.html preloads */

// Preloads are keyed by family + style, not by filename, so switching modes
// (which renames files) re-points them instead of failing.
const preloadTargetByPrefix = new Map();
for (const face of faces) {
  const prefix = `${SLUG[face.family]}-${face.style}`;
  const wanted = face.subset === 'text' || face.subset === 'latin' || face.subset === 'ethiopic';
  if (wanted && !preloadTargetByPrefix.has(prefix)) preloadTargetByPrefix.set(prefix, face);
}

const versionByName = new Map(faces.map((face) => [face.name, face.version]));
let html = readFileSync(INDEX_HTML, 'utf8');
let preloads = 0;

html = html.replace(/href="(\/fonts\/([^"?]+))(?:\?v=[0-9a-f]+)?"/g, (match, path, name) => {
  const prefix = [...preloadTargetByPrefix.keys()].find((key) => name.startsWith(key));
  if (!prefix) return match;
  const face = preloadTargetByPrefix.get(prefix);
  if (!versionByName.has(face.name)) {
    console.error(`[fonts] index.html preloads ${name}, which is not in the font set`);
    process.exitCode = 1;
    return match;
  }
  preloads += 1;
  return `href="/fonts/${face.name}?v=${face.version}"`;
});

writeFileSync(INDEX_HTML, html);

console.log(
  `[fonts] wrote ${written} file(s), ${Math.round(bytes / 1024)} KB total; ` +
    `${preloads} preload(s) versioned; ${GENERATED_CSS} regenerated (${subsetMode ? 'subset' : 'full'} mode)`,
);

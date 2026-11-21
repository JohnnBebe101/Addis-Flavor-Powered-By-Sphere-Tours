/**
 * SVG optimisation for the files in public/.
 *
 * Vite copies public/ verbatim, so the logo files were shipping with every
 * coordinate written out at full floating-point precision: 83 KB of path data
 * for a mark that is drawn 40-80 px wide. The navbar logo was fetched on every
 * page load and competed with the hero image for bandwidth.
 *
 * SVGO rewrites the path data without changing the shape: coordinates are
 * rounded to one decimal of the viewBox unit (1/435 of the mark, i.e. under a
 * tenth of a pixel at the 40-80 px sizes we render it) and redundant data is
 * dropped. The viewBox is preserved so the file still scales.
 *
 * Usage:
 *   node scripts/optimize-svg.mjs          # rewrite public SVGs in place
 *   node scripts/optimize-svg.mjs --check  # report sizes, write nothing
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, relative } from 'path';
import { optimize } from 'svgo';

const PUBLIC_DIR = 'public';
const checkOnly = process.argv.includes('--check');

/** Decimal places kept for path coordinates. */
const FLOAT_PRECISION = 1;

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else if (/\.svg$/i.test(full)) out.push(full);
  }
  return out;
}

const files = walk(PUBLIC_DIR);
let before = 0;
let after = 0;
const changed = [];

for (const file of files) {
  const source = readFileSync(file, 'utf8');
  const { data } = optimize(source, {
    path: file,
    multipass: true,
    plugins: [
      {
        name: 'preset-default',
        params: { overrides: { cleanupIds: false } },
      },
      // Keep the viewBox: the logos scale with CSS and must stay resolution
      // independent.
      { name: 'removeViewBox', active: false },
      { name: 'convertPathData', params: { floatPrecision: FLOAT_PRECISION } },
      { name: 'convertTransform', params: { floatPrecision: FLOAT_PRECISION } },
    ],
  });

  before += source.length;
  after += data.length;

  if (data !== source) {
    changed.push(relative(PUBLIC_DIR, file));
    if (!checkOnly) writeFileSync(file, data);
  }
}

const pct = before ? Math.round((1 - after / before) * 100) : 0;
console.log(
  `[svg] ${files.length} file(s), ${Math.round(before / 1024)} KB -> ${Math.round(after / 1024)} KB (${pct}% smaller)`,
);
for (const file of changed) console.log(`[svg]   ${file}`);
if (checkOnly && changed.length) {
  console.log('[svg] run: node scripts/optimize-svg.mjs');
}

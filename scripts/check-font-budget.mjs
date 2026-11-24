/**
 * Webfont payload gate.
 *
 * Runs after `vite build` to keep the (previously render-blocking) font path
 * honest: no third-party font hosts, no missing or stale cache-busted files, and
 * no single asset large enough to blow the LCP budget.
 *
 * Font URLs carry a `?v=<content hash>` query so that a year-long immutable
 * cache header is safe. If a font file changes, its URL must change with it —
 * this gate fails the build when the two drift apart.
 */
import { createHash } from 'crypto';
import { existsSync, readdirSync, readFileSync, statSync } from 'fs';
import { join } from 'path';

const DIST_FONTS = 'dist/fonts';
const DIST_HTML = 'dist/index.html';
const SOURCE_CSS = 'src/fonts.css';

/** Largest self-hosted subset (the dormant Noto Sans Ethiopic file is the widest). */
const MAX_FILE_BYTES = 200 * 1024;
/** All subsets combined; only the preloaded Latin faces are fetched on a visit. */
const MAX_TOTAL_BYTES = 400 * 1024;
/**
 * The two preloaded faces — they sit in Lantern's render-blocking graph, so
 * every KB here is on the LCP critical path. Subsetted via Google's `text=`
 * API (scripts/fetch-fonts.mjs), they currently come to ~62 KB; the standard
 * script subsets would be ~99 KB and fail this gate.
 */
const MAX_PRELOADED_BYTES = 70 * 1024;

const failures = [];
const versionOf = (buffer) => createHash('sha256').update(buffer).digest('hex').slice(0, 8);

if (!existsSync(DIST_FONTS)) {
  failures.push(`${DIST_FONTS} is missing — did the build run?`);
} else {
  const files = readdirSync(DIST_FONTS).filter((f) => f.endsWith('.woff2'));
  let total = 0;

  for (const file of files) {
    const size = statSync(join(DIST_FONTS, file)).size;
    total += size;
    if (size > MAX_FILE_BYTES) {
      failures.push(`${file} is ${Math.round(size / 1024)} KB (limit ${MAX_FILE_BYTES / 1024} KB)`);
    }
  }

  if (files.length === 0) failures.push(`${DIST_FONTS} contains no .woff2 files`);
  if (total > MAX_TOTAL_BYTES) {
    failures.push(`total font payload is ${Math.round(total / 1024)} KB (limit ${MAX_TOTAL_BYTES / 1024} KB)`);
  }

  const html = existsSync(DIST_HTML) ? readFileSync(DIST_HTML, 'utf8') : '';
  const sourceCss = existsSync(SOURCE_CSS) ? readFileSync(SOURCE_CSS, 'utf8') : '';

  // A third-party font stylesheet on the critical path is the regression we just fixed.
  // Comments are stripped first so prose mentioning the old host does not trip the gate.
  const stripComments = (text) => text.replace(/\/\*[\s\S]*?\*\//g, '').replace(/<!--[\s\S]*?-->/g, '');
  const fontHost = /fonts\.(googleapis|gstatic)\.com/;
  if (fontHost.test(stripComments(html)) || fontHost.test(stripComments(sourceCss))) {
    failures.push('Google Fonts is referenced again');
  }

  if (!sourceCss) {
    failures.push(`${SOURCE_CSS} is missing — run: npm run fonts`);
  } else {
    // Every @font-face must point at a file that exists, with a version that
    // matches the file's actual content hash.
    const faces = [...sourceCss.matchAll(/src:\s*url\('(\/fonts\/[^'?]+)(?:\?v=([0-9a-f]+))?'\)/g)];
    if (faces.length === 0) failures.push(`${SOURCE_CSS} declares no @font-face rules`);

    for (const [, path, version] of faces) {
      const file = join('dist', path);
      if (!existsSync(file)) {
        failures.push(`@font-face references missing file ${path}`);
        continue;
      }
      if (!version) {
        failures.push(`@font-face ${path} has no version query`);
        continue;
      }
      const actual = versionOf(readFileSync(file));
      if (actual !== version) {
        failures.push(`@font-face ${path} has stale version ${version} (file is ${actual})`);
      }
    }

    // Conversely, no orphaned font files should be shipped.
    for (const file of files) {
      if (!sourceCss.includes(`/fonts/${file}`)) {
        failures.push(`${file} is shipped but not referenced by ${SOURCE_CSS}`);
      }
    }
  }

  // Every preloaded font must exist, or the browser wastes a request and blocks text.
  const preloads = [...html.matchAll(/<link[^>]+rel="preload"[^>]+as="font"[^>]*>/g)].map((m) => m[0]);
  if (preloads.length === 0) failures.push('no font preloads found in dist/index.html');
  let preloadedBytes = 0;
  for (const tag of preloads) {
    const href = tag.match(/href="([^"]+)"/)?.[1];
    if (!href) {
      failures.push(`font preload without href: ${tag.slice(0, 80)}`);
      continue;
    }
    const [path, version] = href.split('?v=');
    if (!path.startsWith('/fonts/')) continue;
    if (!existsSync(join('dist', path))) failures.push(`preloaded font ${path} is not in dist`);
    else {
      preloadedBytes += statSync(join('dist', path)).size;
      if (!version) failures.push(`preloaded font ${path} has no version query`);
      else if (versionOf(readFileSync(join('dist', path))) !== version) {
        failures.push(`preloaded font ${path} has a stale version`);
      }
    }
  }

  // These bytes are the render-blocking graph: the gate that keeps the
  // `text=` subsetting from silently regressing back to full script subsets.
  if (preloadedBytes > MAX_PRELOADED_BYTES) {
    failures.push(
      `preloaded fonts total ${Math.round(preloadedBytes / 1024)} KB ` +
        `(limit ${MAX_PRELOADED_BYTES / 1024} KB — is fetch-fonts.mjs running in subset mode?)`,
    );
  }

  if (!failures.length) {
    console.log(
      `[font-budget] ok — ${files.length} files, ${Math.round(total / 1024)} KB total, ` +
        `${preloads.length} preloaded (${Math.round(preloadedBytes / 1024)} KB)`,
    );
  }
}

if (failures.length) {
  console.error('[font-budget] FAILED');
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exit(1);
}

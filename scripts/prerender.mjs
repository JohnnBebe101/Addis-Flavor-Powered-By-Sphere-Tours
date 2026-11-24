/**
 * Prerender the homepage into the built HTML.
 *
 * The homepage used to paint only after the JavaScript bundle had downloaded
 * and executed, which put the Largest Contentful Paint behind the entry
 * chunk, the webfonts and the hero image. Rendering the page at build time
 * puts the hero — including the paragraph Chrome treats as the LCP element —
 * into the document response, so it paints as soon as the HTML arrives.
 *
 * Two documents are produced:
 *
 *   index.html  the prerendered homepage. The browser hydrates this markup.
 *   app.html    the same document with an empty root, used for every other
 *               route (Netlify's SPA fallback). Client-routed pages mount from
 *               scratch instead of hydrating a homepage that does not belong
 *               to them.
 *
 * The prerendered markup and the hydrated markup are produced from the same
 * route table and the same components, so React has nothing to reconcile.
 *
 * Usage:
 *   node scripts/prerender.mjs
 */
import { existsSync, readFileSync, rmSync, writeFileSync } from 'fs';
import { join } from 'path';
import { pathToFileURL } from 'url';
import { build } from 'vite';

const OUT_DIR = '.prerender';
const DIST_HTML = 'dist/index.html';

if (!existsSync(DIST_HTML)) {
  console.error('[prerender] dist/index.html is missing — run the build first');
  process.exit(1);
}

// 1. Bundle the server entry.
await build({
  configFile: 'vite.ssr.config.ts',
  logLevel: 'error',
});

const entry = join(process.cwd(), OUT_DIR, 'entry-server.js');
if (!existsSync(entry)) {
  console.error(`[prerender] server bundle not found at ${entry}`);
  process.exit(1);
}

// 2. Render the homepage.
const { render } = await import(pathToFileURL(entry).href);
const { html } = await render('/');

if (!html || html.length < 500) {
  console.error(`[prerender] server render produced ${html?.length ?? 0} bytes — expected the full shell`);
  process.exit(1);
}

// 3. Inject the markup into the built document.
const doc = readFileSync(DIST_HTML, 'utf8');
const emptyRoot = '<div id="root"></div>';
if (!doc.includes(emptyRoot)) {
  console.error('[prerender] dist/index.html does not contain an empty #root container');
  process.exit(1);
}

const withMarkup = doc.replace(emptyRoot, () => `<div id="root">${html}</div>`);
writeFileSync(DIST_HTML, withMarkup);

// 4. The SPA fallback for every other route: same document, no prerendered
//    homepage, so a deep link never flashes the homepage before the router
//    replaces it.
//
//    The hero image preload is dropped as well: only the homepage shows the
//    hero, and on every other route the browser would fetch the picture and
//    then log "preloaded but not used".
const withoutMarkup = withMarkup
  .replace(`<div id="root">${html}</div>`, () => emptyRoot)
  .replace(/[ \t]*<link\s+rel="preload"\s+as="image"[\s\S]*?\/>\n?/g, '');
writeFileSync('dist/app.html', withoutMarkup);

rmSync(OUT_DIR, { recursive: true, force: true });

console.log(
  `[prerender] injected ${Math.round(html.length / 1024)} KB of markup into dist/index.html ` +
    `and wrote dist/app.html`,
);

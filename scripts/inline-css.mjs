/**
 * Inline the built stylesheet into index.html.
 *
 * The site is a single-page app: every route is served the same index.html, so
 * there is no per-page HTML document that could share a cached external
 * stylesheet. Keeping the CSS in a separate file therefore costs a second
 * round trip on the critical path — Lighthouse measured the render-blocking
 * stylesheet at ~160 ms of wasted time — without ever being reused across
 * navigations.
 *
 * Inlining removes that request: the stylesheet travels inside the HTML
 * response, on the connection that is already open, and the browser can paint
 * as soon as the document arrives.
 *
 * Usage:
 *   node scripts/inline-css.mjs
 */
import { existsSync, readFileSync, readdirSync, writeFileSync } from 'fs';
import { join } from 'path';

const DIST = 'dist';
const HTML = join(DIST, 'index.html');
const ASSETS = join(DIST, 'assets');

if (!existsSync(HTML)) {
  console.error('[inline-css] dist/index.html is missing — run the build first');
  process.exit(1);
}

const cssFiles = readdirSync(ASSETS).filter((f) => f.endsWith('.css'));
if (cssFiles.length !== 1) {
  console.error(`[inline-css] expected exactly one built stylesheet, found ${cssFiles.length}`);
  process.exit(1);
}

const cssHref = `/assets/${cssFiles[0]}`;
const css = readFileSync(join(ASSETS, cssFiles[0]), 'utf8');
let html = readFileSync(HTML, 'utf8');

const linkRe = new RegExp(
  `[ \\t]*<link[^>]*rel="stylesheet"[^>]*href="${cssHref.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[^>]*>\\n?`,
  'g',
);

if (!linkRe.test(html)) {
  console.error(`[inline-css] no stylesheet link for ${cssHref} in dist/index.html`);
  process.exit(1);
}
linkRe.lastIndex = 0;
html = html.replace(linkRe, '');

// A closing tag inside the stylesheet would end the <style> element early.
const safeCss = css.replace(/<\/style/gi, '<\\/style');
const styleTag = `    <style>\n${safeCss}\n    </style>\n`;

html = html.replace('</head>', `${styleTag}  </head>`);

writeFileSync(HTML, html);

console.log(
  `[inline-css] inlined ${cssFiles[0]} (${Math.round(css.length / 1024)} KB raw) into dist/index.html`,
);

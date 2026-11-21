/**
 * Print (and optionally persist) the glyph set used by the `text=` font
 * subset. The set itself is built by `scripts/font-text-set.mjs`.
 *
 * Usage:
 *   node scripts/generate-font-text-set.mjs          # print the text= value
 *   node scripts/generate-font-text-set.mjs --write  # also save to .font-text-set
 *
 * `.font-text-set` is the human-reviewable artefact of what the subset covers;
 * `scripts/fetch-fonts.mjs` builds the same set in-process, so the file can
 * never drift from what is actually shipped — it exists for inspection and for
 * checking the subset request in isolation.
 */
import { writeFileSync } from 'fs';
import { relative } from 'path';
import { buildTextSet } from './font-text-set.mjs';

const ROOT = process.cwd();
const OUT = `${ROOT}/.font-text-set`;
const write = process.argv.includes('--write');

const text = buildTextSet(ROOT);
console.log(`distinct characters: ${[...text].length}`);
console.log(text);

if (write) {
  writeFileSync(OUT, text);
  console.log(`\nwrote ${relative(ROOT, OUT)} (${text.length} bytes)`);
}

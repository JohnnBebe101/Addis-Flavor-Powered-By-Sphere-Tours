/**
 * Image payload budget gate.
 *
 * Runs after `vite build` so oversized assets fail CI instead of silently
 * regressing LCP. Budgets are per-file so a single bad export cannot hide
 * behind an average.
 */
import { existsSync, readdirSync, statSync } from 'fs';
import { join, relative } from 'path';

const DIST_IMAGES = 'dist/images';

/** Max bytes for any single raster asset (the original 3840px hero was 1.77 MB). */
const MAX_FILE_BYTES = 340 * 1024;
/** Total raster payload shipped in `dist/images`. */
const MAX_TOTAL_BYTES = 7 * 1024 * 1024;
/**
 * The LCP hero is served as AVIF via <picture>. The JPEG is only a legacy
 * fallback, so the meaningful budget is on the modern formats.
 */
const HERO_AVIF_LIMITS = {
  'hero/addis-ababa-city-hero-640.avif': 60 * 1024,
  'hero/addis-ababa-city-hero-768.avif': 80 * 1024,
  'hero/addis-ababa-city-hero-1280.avif': 140 * 1024,
  'hero/addis-ababa-city-hero-1920.avif': 220 * 1024,
};

const walk = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory() ? walk(join(dir, entry.name)) : [join(dir, entry.name)],
  );

const files = walk(DIST_IMAGES).filter((f) => /\.(jpe?g|png|webp|avif|svg)$/i.test(f));

const failures = [];
const warnings = [];
let total = 0;

for (const file of files) {
  const size = statSync(file).size;
  const rel = relative(DIST_IMAGES, file).split('\\').join('/');
  total += size;

  if (size > MAX_FILE_BYTES) {
    failures.push(`${rel} is ${Math.round(size / 1024)} KB (limit ${MAX_FILE_BYTES / 1024} KB)`);
  }
}

for (const [rel, limit] of Object.entries(HERO_AVIF_LIMITS)) {
  const file = join(DIST_IMAGES, rel);
  if (!existsSync(file)) {
    failures.push(`missing hero derivative ${rel} — run scripts/optimize-images.mjs`);
    continue;
  }
  const size = statSync(file).size;
  if (size > limit) {
    failures.push(`${rel} is ${Math.round(size / 1024)} KB (limit ${limit / 1024} KB)`);
  }
}

if (total > MAX_TOTAL_BYTES) {
  failures.push(
    `total raster payload is ${Math.round(total / 1024)} KB (limit ${MAX_TOTAL_BYTES / 1024} KB)`,
  );
}

if (files.length === 0) {
  warnings.push(`no images found under ${DIST_IMAGES} — did the build run?`);
}

for (const warning of warnings) console.warn(`[image-budget] warn: ${warning}`);

if (failures.length) {
  console.error(`[image-budget] FAILED (${files.length} files, ${Math.round(total / 1024)} KB total)`);
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exit(1);
}

console.log(`[image-budget] ok — ${files.length} files, ${Math.round(total / 1024)} KB total`);

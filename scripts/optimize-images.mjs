/**
 * Image optimisation pipeline.
 *
 * Two independent operations per raster source:
 *   1. `recompress` — rewrites the source JPEG in place (mozjpeg, max 1920px long edge).
 *      This lets *locked* components (TourCardGrid, AddisHighlightsGrid,
 *      TourCategorySelector, PracticalInfoGrid, Footer, WhyChooseUsHero) ship far
 *      smaller bytes with zero markup changes.
 *   2. `derivatives` — emits `<name>-<width>.avif` / `<name>-<width>.webp` siblings
 *      for <picture>/srcset adoption in unlocked components.
 *
 * Originals are snapshotted into `.image-cache/originals/` on first run and every
 * output is always encoded from that snapshot, so re-running never compounds
 * lossy compression. A manifest keyed by the original's content hash makes the
 * pipeline incremental.
 *
 * Usage:
 *   node scripts/optimize-images.mjs --profile=ws1    # hero only
 *   node scripts/optimize-images.mjs --profile=ws2    # recompress all JPEGs + hero derivatives
 *   node scripts/optimize-images.mjs --profile=all    # everything
 *   node scripts/optimize-images.mjs --derivatives=hero/addis-ababa-city-hero
 *   node scripts/optimize-images.mjs --recompress=hero/addis-ababa-city-hero
 */
import sharp from 'sharp';
import { createHash } from 'crypto';
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  statSync,
  writeFileSync,
} from 'fs';
import { dirname, join, relative, sep } from 'path';

const PUBLIC_DIR = 'public';
const CACHE_DIR = '.image-cache';
const ORIGINALS_DIR = join(CACHE_DIR, 'originals');
const MANIFEST_PATH = join(CACHE_DIR, 'manifest.json');

const kb = (n) => Math.round(n / 1024);

const WIDTHS = [640, 1280, 1920];
/**
 * The hero gets an extra 768w step: a 412px viewport at DPR 1.75 needs ~720px, so
 * without it the browser would jump straight to the 1280w file (91 KB) instead of
 * a ~40 KB one.
 */
const HERO_WIDTHS = [640, 768, 1280, 1920];
const HERO_SOURCES = ['hero/addis-ababa-city-hero'];
const MAX_LONG_EDGE = 1920;
const AVIF_QUALITY = 50;
const WEBP_QUALITY = 72;
const JPEG_QUALITY = 72;
const CONFIG_VERSION = 'v1';

/**
 * Open Graph / Twitter card image.
 *
 * Social crawlers do not accept AVIF/WebP, so this stays a JPEG. It is cropped to
 * the 1.91:1 ratio every social platform expects and is generated from the cached
 * original so it is reproducible.
 */
const OG_CARD = {
  /** Path under public/, i.e. also the path inside .image-cache/originals. */
  source: 'images/hero/addis-ababa-city-hero.jpg',
  out: 'public/images/og/addis-ababa-city-hero-og.jpg',
  width: 1200,
  height: 630,
  quality: 80,
};

const PROFILES = {
  ws1: {
    derivatives: ['hero/addis-ababa-city-hero'],
    recompress: ['hero/addis-ababa-city-hero'],
  },
  // WS-2: recompress every JPEG source in place so locked components shrink
  // without markup changes. Derivatives stay scoped to adopted components.
  ws2: {
    derivatives: ['hero/addis-ababa-city-hero'],
    recompress: null,
  },
  all: { derivatives: null, recompress: null },
};

const args = process.argv.slice(2);
const flag = (name, fallback = null) => {
  const hit = args.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.slice(name.length + 3) : fallback;
};

const profile = PROFILES[flag('profile', 'all')];
if (!profile) {
  console.error(`[images] unknown profile "${flag('profile')}". Use ws1|all.`);
  process.exit(1);
}

const derivativesArg = flag('derivatives');
const recompressArg = flag('recompress');
const derivativesFilter = derivativesArg ? derivativesArg.split(',').map((s) => s.trim()) : profile.derivatives;
const recompressFilter = recompressArg ? recompressArg.split(',').map((s) => s.trim()) : profile.recompress;

const toPosix = (p) => p.split(sep).join('/');

const walk = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory() ? walk(join(dir, entry.name)) : [join(dir, entry.name)],
  );

const manifest = existsSync(MANIFEST_PATH) ? JSON.parse(readFileSync(MANIFEST_PATH, 'utf8')) : {};
mkdirSync(ORIGINALS_DIR, { recursive: true });

const matches = (rel, filter) => !filter || filter.some((f) => rel.includes(f));

/** Generated output (the social card) must not be treated as a source to recompress. */
const GENERATED_DIR = 'images/og';

const sources = walk(join(PUBLIC_DIR, 'images')).filter(
  (f) => /\.jpe?g$/i.test(f) && !toPosix(f).includes(GENERATED_DIR),
);

let derivativeCount = 0;
let recompressCount = 0;
let originalBytes = 0;
let finalBytes = 0;

for (const source of sources) {
  const rel = toPosix(relative(PUBLIC_DIR, source));
  const wantDerivatives = matches(rel, derivativesFilter);
  const wantRecompress = matches(rel, recompressFilter);
  if (!wantDerivatives && !wantRecompress) continue;

  const cachePath = join(ORIGINALS_DIR, rel);
  if (!existsSync(cachePath)) {
    mkdirSync(dirname(cachePath), { recursive: true });
    copyFileSync(source, cachePath);
  }

  const original = readFileSync(cachePath);
  const widthSet = HERO_SOURCES.some((h) => rel.includes(h)) ? HERO_WIDTHS : WIDTHS;
  // The width set is part of the cache key: adding a derivative width must
  // invalidate the manifest entry, otherwise the new file is never produced.
  const hash = createHash('sha256')
    .update(original)
    .update(CONFIG_VERSION)
    .update(widthSet.join(','))
    .digest('hex')
    .slice(0, 16);
  const meta = await sharp(original).metadata();
  const intrinsicWidth = meta.width ?? 0;
  const entry = manifest[rel] ?? {};

  originalBytes += statSync(source).size;

  if (wantDerivatives && entry.derivativesHash !== hash) {
    const widths = widthSet.filter((w) => w < intrinsicWidth);
    if (!widths.length) widths.push(Math.min(intrinsicWidth || 640, MAX_LONG_EDGE));

    for (const width of widths) {
      const base = source.replace(/\.jpe?g$/i, '');
      await sharp(original)
        .resize({ width, withoutEnlargement: true })
        .avif({ quality: AVIF_QUALITY, effort: 4 })
        .toFile(`${base}-${width}.avif`);
      await sharp(original)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: WEBP_QUALITY })
        .toFile(`${base}-${width}.webp`);
      derivativeCount += 2;
    }
    entry.derivativesHash = hash;
    entry.widths = widths;
  }

  if (wantRecompress && entry.recompressHash !== hash) {
    const before = statSync(source).size;
    const pipeline = sharp(original);
    if (Math.max(meta.width ?? 0, meta.height ?? 0) > MAX_LONG_EDGE) {
      pipeline.resize({ width: MAX_LONG_EDGE, height: MAX_LONG_EDGE, fit: 'inside', withoutEnlargement: true });
    }
    await pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true, progressive: true }).toFile(source);
    const after = statSync(source).size;
    entry.recompressHash = hash;
    entry.recompressedFrom = before;
    entry.recompressedTo = after;
    recompressCount += 1;
  }

  finalBytes += statSync(source).size;
  manifest[rel] = entry;
}

mkdirSync(CACHE_DIR, { recursive: true });

// Social card — always regenerated from the cached original, never from the
// recompressed source, so it stays sharp.
const ogOriginalPath = join(ORIGINALS_DIR, OG_CARD.source);
if (existsSync(ogOriginalPath)) {
  const ogOriginal = readFileSync(ogOriginalPath);
  const ogHash = createHash('sha256').update(ogOriginal).update(CONFIG_VERSION).digest('hex').slice(0, 16);
  const ogEntry = manifest['social/og-card'] ?? {};

  if (ogEntry.hash !== ogHash || !existsSync(OG_CARD.out)) {
    mkdirSync(dirname(OG_CARD.out), { recursive: true });
    await sharp(ogOriginal)
      .resize({
        width: OG_CARD.width,
        height: OG_CARD.height,
        fit: 'cover',
        position: 'attention',
      })
      .jpeg({ quality: OG_CARD.quality, mozjpeg: true, progressive: true })
      .toFile(OG_CARD.out);
    manifest['social/og-card'] = { hash: ogHash, out: OG_CARD.out };
    console.log(`[images] og-card -> ${OG_CARD.out} (${kb(statSync(OG_CARD.out).size)}KB)`);
  }
}

writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));

console.log(
  `[images] derivatives=${derivativeCount} recompressed=${recompressCount} ` +
    `sources=${kb(originalBytes)}KB -> ${kb(finalBytes)}KB`,
);

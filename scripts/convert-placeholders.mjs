/**
 * Placeholder Image Conversion Script
 * Converts images from placeholder-images/ to public/images/ as JPG.
 *
 * Usage: node scripts/convert-placeholders.mjs
 * Requires: sharp (installed as devDependency)
 */

import sharp from 'sharp';
import { existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SOURCE_DIR = join(ROOT, 'placeholder-images');
const TARGET_DIR = join(ROOT, 'public', 'images');

// Quality settings
const JPG_QUALITY = 85;

/**
 * Each entry: { source, target, width, height }
 * source: relative path from SOURCE_DIR
 * target: relative path from TARGET_DIR (always .jpg)
 * width/height: target dimensions (sharp fit: cover)
 */
const MAPPING = [
  // ─── HERO (4) ───────────────────────────────────────────────────
  {
    source: 'Addis Ababa City Tour/addis-ababa-city-tour-museum-1024w.webp',
    target: 'hero/addis-ababa-national-museum.jpg',
    width: 1920, height: 1080,
  },
  {
    source: 'medium_DJI_20241228080954_0312_D_fb2332518a.jpg',
    target: 'hero/debre-libanos-monastery.jpg',
    width: 1920, height: 1080,
  },
  {
    source: 'Addis Ababa City Tour/addis-ababa-city-tour-entoto-1920w.webp',
    target: 'hero/private-tour-entoto.jpg',
    width: 1920, height: 1080,
  },
  {
    source: 'Addis Ababa City Tour/addis-ababa-city-tour-city-view-1920w.webp',
    target: 'hero/final-cta-bg.jpg',
    width: 1920, height: 1080,
  },

  // ─── TOURS: Half-Day City Tour (4) ─────────────────────────────
  {
    source: 'Addis Ababa City Tour/addis-ababa-city-tour-addis-ababa-city-tour-1-4-1920w.webp',
    target: 'tours/half-day-addis-ababa-hero.jpg',
    width: 1200, height: 800,
  },
  {
    source: 'Addis Ababa City Tour/addis-ababa-city-tour-museum-1024w.webp',
    target: 'tours/half-day-addis-ababa-national-museum.jpg',
    width: 800, height: 600,
  },
  {
    source: 'Addis Ababa City Tour/addis-ababa-city-tour-bole-medhanialem-1024w.webp',
    target: 'tours/half-day-addis-ababa-merkato.jpg',
    width: 800, height: 600,
  },
  {
    source: 'Addis Ababa City Tour/addis-ababa-city-tour-city-view-1024w.webp',
    target: 'tours/half-day-addis-ababa-meskel-square.jpg',
    width: 800, height: 600,
  },

  // ─── TOURS: Full-Day City Tour (5) ─────────────────────────────
  {
    source: 'Addis Ababa City Tour/addis-ababa-city-tour-addis-ababa-city-tour-1-1-1024w.webp',
    target: 'tours/full-day-addis-ababa-hero.jpg',
    width: 1200, height: 800,
  },
  {
    source: 'Addis Ababa City Tour/addis-ababa-city-tour-121196741-2138270682984431-430381333708358657-n-1024w.webp',
    target: 'tours/full-day-addis-ababa-national-museum.jpg',
    width: 800, height: 600,
  },
  {
    source: 'medium_holy_trinity_d5bbb2e4fc.jpg',
    target: 'tours/full-day-addis-ababa-holy-trinity.jpg',
    width: 800, height: 600,
  },
  {
    source: 'Addis Ababa City Tour/addis-ababa-city-tour-entoto-1024w.webp',
    target: 'tours/full-day-addis-ababa-entoto.jpg',
    width: 800, height: 600,
  },
  {
    source: 'coffe-tour/coffee-coffee-testing-10-1024w.webp',
    target: 'tours/full-day-addis-ababa-coffee-ceremony.jpg',
    width: 800, height: 600,
  },

  // ─── TOURS: Addis Highlights (4) ───────────────────────────────
  {
    source: 'Addis Ababa City Tour/addis-ababa-city-tour-addis-ababa-city-tour-1-2-1024w.webp',
    target: 'tours/addis-ababa-highlights-hero.jpg',
    width: 1200, height: 800,
  },
  {
    source: 'Addis Ababa City Tour/addis-ababa-city-tour-182879992-2328672017277629-3537560015291495278-n-1024w.webp',
    target: 'tours/addis-ababa-highlights-national-museum.jpg',
    width: 800, height: 600,
  },
  {
    source: 'medium_national_museum_c14583d4bb.jpg',
    target: 'tours/addis-ababa-highlights-holy-trinity.jpg',
    width: 800, height: 600,
  },
  {
    source: 'Addis Ababa City Tour/addis-ababa-city-tour-fendika-1024w.webp',
    target: 'tours/addis-ababa-highlights-entoto.jpg',
    width: 800, height: 600,
  },

  // ─── TOURS: Debre Libanos (5) ──────────────────────────────────
  {
    source: 'medium_DJI_20241228080954_0312_D_fb2332518a.jpg',
    target: 'tours/debre-libanos-hero.jpg',
    width: 1200, height: 800,
  },
  {
    source: 'Addis Ababa City Tour/addis-ababa-city-tour-121196741-2138270682984431-430381333708358657-n-1024w.webp',
    target: 'tours/debre-libanos-monastery.jpg',
    width: 800, height: 600,
  },
  {
    source: 'Addis Ababa City Tour/addis-ababa-city-tour-city-view-1024w.webp',
    target: 'tours/debre-libanos-portuguese-bridge.jpg',
    width: 800, height: 600,
  },
  {
    source: 'Addis Ababa City Tour/addis-ababa-city-tour-entoto-1024w.webp',
    target: 'tours/debre-libanos-gorge.jpg',
    width: 800, height: 600,
  },
  {
    source: 'Addis Ababa City Tour/addis-ababa-city-tour-unity-park-zoo-1024w.webp',
    target: 'tours/debre-libanos-gelada-baboons.jpg',
    width: 800, height: 600,
  },

  // ─── TOURS: Tiya (4) ───────────────────────────────────────────
  {
    source: 'Addis Ababa City Tour/addis-ababa-city-tour-124984465-2174975672647265-3989283338411214076-n-1024w.webp',
    target: 'tours/tiya-adadi-mariam-melka-kunture-hero.jpg',
    width: 1200, height: 800,
  },
  {
    source: 'medium_Art_Exhibition_d1d0ab20bb.jpg',
    target: 'tours/tiya-adadi-mariam-melka-kunture-tiya-stelae.jpg',
    width: 800, height: 600,
  },
  {
    source: 'science_musiem_bcae003635.png',
    target: 'tours/tiya-adadi-mariam-melka-kunture-adadi-mariam.jpg',
    width: 800, height: 600,
  },
  {
    source: 'Omo_3_736108eaa9.jpg',
    target: 'tours/tiya-adadi-mariam-melka-kunture-melka-kunture.jpg',
    width: 800, height: 600,
  },

  // ─── TOURS: Menagesha Forest (4) ───────────────────────────────
  {
    source: 'Addis Ababa City Tour/addis-ababa-city-tour-fendika-1024w.webp',
    target: 'tours/menagesha-forest-hero.jpg',
    width: 1200, height: 800,
  },
  {
    source: 'Addis Ababa City Tour/addis-ababa-city-tour-city-view-1024w.webp',
    target: 'tours/menagesha-forest-trail.jpg',
    width: 800, height: 600,
  },
  {
    source: 'Addis Ababa City Tour/addis-ababa-city-tour-entoto-1024w.webp',
    target: 'tours/menagesha-forest-waterfall.jpg',
    width: 800, height: 600,
  },
  {
    source: 'Addis Ababa City Tour/addis-ababa-city-tour-unity-park-zoo-1024w.webp',
    target: 'tours/menagesha-forest-wildlife.jpg',
    width: 800, height: 600,
  },

  // ─── TOURS: Bishoftu Crater Lakes (4) ──────────────────────────
  {
    source: 'medium_DJI_20241228080954_0312_D_fb2332518a.jpg',
    target: 'tours/bishoftu-crater-lakes-hero.jpg',
    width: 1200, height: 800,
  },
  {
    source: 'Omo_3_736108eaa9.jpg',
    target: 'tours/bishoftu-crater-lakes-gari.jpg',
    width: 800, height: 600,
  },
  {
    source: 'photo_2025_12_08_10_03_06_5ac4318468.jpg',
    target: 'tours/bishoftu-crater-lakes-hora.jpg',
    width: 800, height: 600,
  },
  {
    source: 'medium_image_2025_12_09_14_33_55_7417dc40ea.png',
    target: 'tours/bishoftu-crater-lakes-resort.jpg',
    width: 800, height: 600,
  },

  // ─── TOURS: Airport Layover (3) ────────────────────────────────
  {
    source: 'Addis Ababa City Tour/addis-ababa-city-tour-addis-ababa-city-tour-1-3-1024w.webp',
    target: 'tours/airport-layover-hero.jpg',
    width: 1200, height: 800,
  },
  {
    source: 'Addis Ababa City Tour/addis-ababa-city-tour-museum-1024w.webp',
    target: 'tours/airport-layover-national-museum.jpg',
    width: 800, height: 600,
  },
  {
    source: 'Addis Ababa City Tour/addis-ababa-city-tour-entoto-1024w.webp',
    target: 'tours/airport-layover-entoto.jpg',
    width: 800, height: 600,
  },

  // ─── TOURS: Private Group (3) ──────────────────────────────────
  {
    source: 'Addis Ababa City Tour/addis-ababa-city-tour-addis-ababa-city-tour-1-5-1024w.webp',
    target: 'tours/private-group-hero.jpg',
    width: 1200, height: 800,
  },
  {
    source: 'Addis Ababa City Tour/addis-ababa-city-tour-182879992-2328672017277629-3537560015291495278-n-1024w.webp',
    target: 'tours/private-group-family.jpg',
    width: 800, height: 600,
  },
  {
    source: 'Addis Ababa City Tour/addis-ababa-city-tour-bole-medhanialem-1024w.webp',
    target: 'tours/private-group-vehicle.jpg',
    width: 800, height: 600,
  },

  // ─── DESTINATIONS (5) ──────────────────────────────────────────
  {
    source: 'Addis Ababa City Tour/addis-ababa-city-tour-city-view-1920w.webp',
    target: 'destinations/addis-ababa-hero.jpg',
    width: 1200, height: 800,
  },
  {
    source: 'medium_DJI_20241228080954_0312_D_fb2332518a.jpg',
    target: 'destinations/debre-libanos-hero.jpg',
    width: 1200, height: 800,
  },
  {
    source: 'medium_Art_Exhibition_d1d0ab20bb.jpg',
    target: 'destinations/tiya-hero.jpg',
    width: 1200, height: 800,
  },
  {
    source: 'Addis Ababa City Tour/addis-ababa-city-tour-entoto-1920w.webp',
    target: 'destinations/menagesha-forest-hero.jpg',
    width: 1200, height: 800,
  },
  {
    source: 'Omo_3_736108eaa9.jpg',
    target: 'destinations/bishoftu-hero.jpg',
    width: 1200, height: 800,
  },

  // ─── ABOUT (3) ─────────────────────────────────────────────────
  {
    source: 'Addis Ababa City Tour/addis-ababa-city-tour-182879992-2328672017277629-3537560015291495278-n-1920w.webp',
    target: 'about/team-hero.jpg',
    width: 1200, height: 800,
  },
  {
    source: 'coffe-tour/coffee-coffee-testing-12-1024w.webp',
    target: 'about/cooking.jpg',
    width: 800, height: 600,
  },
  {
    source: 'coffe-tour/coffee-coffee-at-seife-1024w.webp',
    target: 'about/jebena.jpg',
    width: 800, height: 600,
  },

  // ─── TRAVEL GUIDE (6) ──────────────────────────────────────────
  {
    source: 'Blog_2_db97435a17.jpg',
    target: 'travel-guide/things-to-do-addis-ababa.jpg',
    width: 800, height: 500,
  },
  {
    source: 'medium_DJI_20241228080954_0312_D_fb2332518a.jpg',
    target: 'travel-guide/best-time-to-visit.jpg',
    width: 800, height: 500,
  },
  {
    source: 'medium_holy_trinity_d5bbb2e4fc.jpg',
    target: 'travel-guide/what-to-wear-religious-sites.jpg',
    width: 800, height: 500,
  },
  {
    source: 'coffe-tour/coffee-coffee-testing-6-1024w.webp',
    target: 'travel-guide/coffee-cultural-etiquette.jpg',
    width: 800, height: 500,
  },
  {
    source: 'Omo_3_736108eaa9.jpg',
    target: 'travel-guide/day-trips-from-addis-ababa.jpg',
    width: 800, height: 500,
  },
  {
    source: 'Addis Ababa City Tour/addis-ababa-city-tour-city-view-1024w.webp',
    target: 'travel-guide/airport-layover-planning.jpg',
    width: 800, height: 500,
  },
];

// ─── RUN CONVERSION ─────────────────────────────────────────────

async function convert() {
  console.log(`\n  Placeholder Image Converter`);
  console.log(`  Source: ${SOURCE_DIR}`);
  console.log(`  Target: ${TARGET_DIR}`);
  console.log(`  Total:  ${MAPPING.length} images\n`);

  let success = 0;
  let failed = 0;
  let totalOutputBytes = 0;

  for (const entry of MAPPING) {
    const srcPath = join(SOURCE_DIR, entry.source);
    const tgtPath = join(TARGET_DIR, entry.target);
    const tgtDir = dirname(tgtPath);

    // Ensure target directory exists
    if (!existsSync(tgtDir)) {
      mkdirSync(tgtDir, { recursive: true });
    }

    try {
      if (!existsSync(srcPath)) {
        console.log(`  ✗ MISSING: ${entry.source}`);
        failed++;
        continue;
      }

      await sharp(srcPath)
        .resize(entry.width, entry.height, { fit: 'cover', position: 'centre' })
        .jpeg({ quality: JPG_QUALITY, mozjpeg: true })
        .toFile(tgtPath);

      const stats = await sharp(tgtPath).metadata();
      const sizeKB = Math.round((await import('fs')).statSync(tgtPath).size / 1024);
      totalOutputBytes += (await import('fs')).statSync(tgtPath).size;

      console.log(`  ✓ ${entry.target} (${sizeKB} KB, ${stats.width}×${stats.height})`);
      success++;
    } catch (err) {
      console.log(`  ✗ FAILED: ${entry.target} — ${err.message}`);
      failed++;
    }
  }

  console.log(`\n  ────────────────────────────────────`);
  console.log(`  Success: ${success}/${MAPPING.length}`);
  console.log(`  Failed:  ${failed}/${MAPPING.length}`);
  console.log(`  Total output: ${(totalOutputBytes / 1024 / 1024).toFixed(1)} MB`);
  console.log(`  ────────────────────────────────────\n`);
}

convert().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});

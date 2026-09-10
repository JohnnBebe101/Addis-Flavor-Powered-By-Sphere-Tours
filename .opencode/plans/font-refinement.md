# Plan 2: Professionally Tailored Font Changes (No New Dependencies)

## Objective
Improve typography across the site using only the existing fonts (Playfair Display, DM Sans, Noto Sans Ethiopic) by adjusting weights, letter-spacing, line-height, and font-family assignments — no new fonts or dependencies.

---

## Current Font Setup

| Tailwind Utility | Font | Loaded Weights |
|------------------|------|---------------|
| `font-serif` | Playfair Display | 400–900 (variable) + italic |
| `font-sans` | DM Sans | 100–1000 (variable) + italic |
| `font-mono` | System monospace | Not overridden |
| `font-ethiopic` | Noto Sans Ethiopic | 100–900 (variable) |

---

## Typography Refinement Rules

### Rule 1: Headings — Playfair Display with tighter letter-spacing
**Where:** All h1, h2, h3 headings
**Current issue:** `tracking-tight` is inconsistent; some headings use `font-black` (900) while others use `font-bold` (700)
**Fix:** Standardize all headings to `tracking-tight` + `font-bold` (700) for consistency. Playfair Display at weight 700 is the sweet spot — black (900) can look heavy on large sizes.

### Rule 2: Body text — DM Sans with improved line-height
**Where:** All paragraphs, descriptions, labels
**Current issue:** Some body text uses `leading-relaxed` (1.625), some uses `leading-normal` (1.5)
**Fix:** Standardize body text to `leading-relaxed` (1.625) for better readability on all screen sizes

### Rule 3: Small labels/badges — DM Sans with wider letter-spacing
**Where:** All uppercase labels, badges, mono-styled text
**Current issue:** Inconsistent `tracking-widest` vs `tracking-wider` vs no tracking
**Fix:** All uppercase labels get `tracking-widest` (0.1em) for a refined, professional look

### Rule 4: Tour card titles — Playfair Display with weight 600
**Where:** Tour card h3 titles, destination card titles
**Current issue:** Some use `font-bold` (700), some use `font-semibold` (600)
**Fix:** Card titles use `font-semibold` (600) — lighter than section headings for visual hierarchy

### Rule 5: Prices — DM Sans with weight 600
**Where:** Tour pricing displays
**Current issue:** Prices use `font-mono font-bold`
**Fix:** Prices use `font-sans font-semibold` — DM Sans at 600 weight looks cleaner for currency than monospace

---

## File Change Summary

| # | File | Lines | What Changes |
|---|------|-------|-------------|
| 1 | `src/components/home/HeroBanner.tsx` | 155 | h1: `font-black` → `font-bold` |
| 2 | `src/components/home/HeroBanner.tsx` | 164 | subtitle: `font-normal` → `font-light` |
| 3 | `src/components/home/DayTripDestinationsCarousel.tsx` | 57 | h2: add `tracking-tight` (already has it) — verify |
| 4 | `src/components/home/DayTripDestinationsCarousel.tsx` | 79 | card h3: `font-bold` → `font-semibold` |
| 5 | `src/components/home/TourCardGrid.tsx` | ~85 | card h3: `font-bold` → `font-semibold` |
| 6 | `src/pages/Homepage.tsx` | 137 | h2: ensure `tracking-tight` |
| 7 | `src/pages/Homepage.tsx` | 141 | subtitle: `font-sans` → already default, ensure `leading-relaxed` |
| 8 | `src/components/about/AboutHeroBanner.tsx` | 44 | h1: `font-serif` → already correct |
| 9 | `src/components/TestimonialsCarousel.tsx` | 84 | label: `tracking-widest` (already has it) |
| 10 | `src/components/TestimonialsCarousel.tsx` | 106 | blockquote: `font-serif` weight adjustment |
| 11 | `src/components/home/TourCardGrid.tsx` | ~95 | price: `font-mono font-bold` → `font-sans font-semibold` |

---

## Detailed Edits

### Edit 1: HeroBanner h1 — `font-black` → `font-bold`
**File:** `src/components/home/HeroBanner.tsx`, line 155
**Current:** `font-black` (900)
**Proposed:** `font-bold` (700)
**Reason:** Playfair Display at 700 weight is more refined than 900, especially at smaller sizes after the size reduction.

### Edit 2: HeroBanner subtitle — `font-normal` → `font-light`
**File:** `src/components/home/HeroBanner.tsx`, line 164
**Current:** `font-sans font-normal`
**Proposed:** `font-sans font-light`
**Reason:** Lighter weight on hero subtitle creates better contrast with the bold headline above it.

### Edit 3: DayTripDestinationsCarousel card h3 — `font-bold` → `font-semibold`
**File:** `src/components/home/DayTripDestinationsCarousel.tsx`, line 79
**Current:** `font-serif font-bold`
**Proposed:** `font-serif font-semibold`
**Reason:** Card titles should be lighter than section headings for visual hierarchy.

### Edit 4: TourCardGrid card h3 — `font-bold` → `font-semibold`
**File:** `src/components/home/TourCardGrid.tsx`, find the card title h3
**Current:** `font-bold`
**Proposed:** `font-semibold`
**Reason:** Consistent with DayTripDestinationsCarousel card treatment.

### Edit 5: TourCardGrid price — `font-mono font-bold` → `font-sans font-semibold`
**File:** `src/components/home/TourCardGrid.tsx`, find the price element
**Current:** `font-mono font-bold`
**Proposed:** `font-sans font-semibold`
**Reason:** DM Sans at 600 weight renders prices more cleanly than system monospace. The `font-sans` family is already the default, so this just removes `font-mono` and changes weight.

### Edit 6: Homepage subtitle — ensure `leading-relaxed`
**File:** `src/pages/Homepage.tsx`, line 141
**Current:** `text-sm opacity-80 leading-relaxed font-sans`
**Proposed:** `text-sm opacity-80 leading-relaxed font-sans` (verify — should already be correct)

### Edit 7: TestimonialsCarousel label — verify `tracking-widest`
**File:** `src/components/TestimonialsCarousel.tsx`, line 84
**Current:** `font-mono text-[10px] text-teal/60 uppercase tracking-widest`
**Proposed:** `font-mono text-[10px] text-teal/60 uppercase tracking-widest` (verify — already correct)

### Edit 8: AboutHeroBanner h1 — ensure `font-bold`
**File:** `src/components/about/AboutHeroBanner.tsx`, line 44
**Current:** `font-serif text-linen-white tracking-tight drop-shadow-md uppercase`
**Proposed:** `font-serif font-bold text-linen-white tracking-tight drop-shadow-md uppercase`
**Reason:** Add explicit `font-bold` for consistency with other hero h1s.

---

## Verification
1. `npx tsc --noEmit` → 0 errors
2. `npm run build` → clean build
3. Visual check: Typography should feel more polished and consistent

---

## What This Does NOT Change
- No new fonts added
- No new dependencies
- No font-size changes (covered in Plan 1)
- No layout changes
- Only font-weight, letter-spacing, and line-height adjustments

# Plan: Choose Your Adventure Cards — Screenshot-Style Enhancement

**Target**: `TourCategorySelector` section on Homepage
**Goal**: Transform white icon-based cards into dark gradient image cards matching the screenshot
**Files**: 2 files changed, 0 new files, 0 new dependencies
**Risk**: LOW
**Estimated effort**: 2 tasks

---

## Screenshot Design Elements (Adapted for Tours)

| Screenshot Element | Tour Adaptation | Data Source |
|-------------------|----------------|-------------|
| Dark gradient background | `bg-gradient-to-br from-teal via-teal/90 to-dark-bg` | CSS only |
| Product image (top ~60%) | Tour category image | NEW `image` field |
| Price badge (top-right pill) | Colored pill with `priceFrom` | Existing `priceFrom` |
| Product name (bold white) | Category title | Existing `title` |
| Star ratings | **SKIP** | No per-category review data |
| YOUR TITLE + lorem sidebar | **SKIP** | Existing `description` suffices |
| ADD TO CART button | "View Tours →" full-width button | Existing `link` |

---

## Task 1: Update `home.json` — Add Image Data

**File**: `src/content/home.json`

### Prerequisite: Verify Line Numbers

Read the file first. Confirm these keys exist at these approximate lines:
- Line 33: `"tourCategorySelector": {`
- Line 36: `"categories": [`
- Line 37–43: First category object (`"id": "city-tours"`)
- Line 44–50: Second category object (`"id": "day-trips"`)
- Line 51–57: Third category object (`"id": "private-custom"`)
- Line 58: `]` (closing categories array)

**If line numbers don't match**: Use the JSON key names to locate. Search for `"id": "city-tours"` etc.

### Step 1.1: Add `image` to Category 1

**Current** (lines 37–43):
```json
      {
        "id": "city-tours",
        "title": "City Tours",
        "description": "Half-day and full-day tours of Addis Ababa's top attractions: National Museum, Merkato, Holy Trinity Cathedral, and more.",
        "priceFrom": "From $42",
        "link": "/tours/?category=city-tours"
      },
```

**Replace with** (add `"image"` field before closing `}`):
```json
      {
        "id": "city-tours",
        "title": "City Tours",
        "description": "Half-day and full-day tours of Addis Ababa's top attractions: National Museum, Merkato, Holy Trinity Cathedral, and more.",
        "priceFrom": "From $42",
        "link": "/tours/?category=city-tours",
        "image": "/images/tours/half-day-addis-ababa-hero.jpg"
      },
```

**What changed**: Added `"image": "/images/tours/half-day-addis-ababa-hero.jpg"` after `"link"`.

### Step 1.2: Add `image` to Category 2

**Current** (lines 44–50):
```json
      {
        "id": "day-trips",
        "title": "Day Trips",
        "description": "Escape the city: Debre Libanos Monastery, Tiya UNESCO Site, Menagesha Forest, Bishoftu Crater Lakes.",
        "priceFrom": "From $75",
        "link": "/tours/?category=day-trips"
      },
```

**Replace with**:
```json
      {
        "id": "day-trips",
        "title": "Day Trips",
        "description": "Escape the city: Debre Libanos Monastery, Tiya UNESCO Site, Menagesha Forest, Bishoftu Crater Lakes.",
        "priceFrom": "From $75",
        "link": "/tours/?category=day-trips",
        "image": "/images/tours/debre-libanos-hero.jpg"
      },
```

### Step 1.3: Add `image` to Category 3

**Current** (lines 51–57):
```json
      {
        "id": "private-custom",
        "title": "Private & Custom",
        "description": "Fully customizable itineraries, flexible pickup times, dedicated guide. Perfect for families and special interests.",
        "priceFrom": "Price on Request",
        "link": "/custom-tour/"
      }
```

**Replace with** (note: no trailing comma — last item in array):
```json
      {
        "id": "private-custom",
        "title": "Private & Custom",
        "description": "Fully customizable itineraries, flexible pickup times, dedicated guide. Perfect for families and special interests.",
        "priceFrom": "Price on Request",
        "link": "/custom-tour/",
        "image": "/images/tours/private-group-hero.jpg"
      }
```

### Step 1.4: Validate JSON

Run this command:
```bash
node -e "JSON.parse(require('fs').readFileSync('src/content/home.json','utf8')); console.log('JSON valid')"
```

**Expected output**: `JSON valid`

**If error**: Stop. Read the file around the error line. Common issues:
- Missing comma after `"link"` value (before new `"image"` line)
- Trailing comma after last `}` before `]` on line ~58
- Mismatched quotes or braces

### Image Verification

All 3 images must exist in `public/images/`:
```bash
Test-Path "public/images/tours/half-day-addis-ababa-hero.jpg"
Test-Path "public/images/tours/debre-libanos-hero.jpg"
Test-Path "public/images/tours/private-group-hero.jpg"
```

**Expected**: All return `True`

---

## Task 2: Rewrite `TourCategorySelector.tsx`

**File**: `src/components/home/TourCategorySelector.tsx`

### Prerequisite: Verify Current State

Read the file. Confirm:
- 63 lines total
- Lines 1–4: License header
- Lines 6–17: `TourCategorySelectorProps` interface
- Lines 19–23: Component function signature
- Line 25: `<section>` opening tag
- Line 27–32: Headline + subheadline
- Line 34: Grid `<div>` opening
- Lines 35–58: `.map()` loop with card rendering
- Line 59: Grid `</div>` closing
- Lines 60–63: Container/section/component closing

### Step 2.1: Replace Entire File

**Delete all 63 lines.** Replace with the following **exact content** (80 lines):

```tsx
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

interface TourCategorySelectorProps {
  categories: Array<{
    id: string;
    title: string;
    description: string;
    priceFrom: string;
    link: string;
    icon?: React.ReactNode;
    image?: string;
  }>;
  headline: string;
  subheadline: string;
}

export const TourCategorySelector: React.FC<TourCategorySelectorProps> = ({
  categories,
  headline,
  subheadline,
}) => {
  return (
    <section id="tour-category-selector" className="py-10 bg-sandstone/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-6">
          <h2 className="text-xl md:text-2xl font-serif font-bold text-teal tracking-tight mb-1">
            {headline}
          </h2>
          <p className="text-xs text-teal/60 font-sans">{subheadline}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {categories.map((category) => (
            <a
              key={category.id}
              href={category.link}
              className="group relative rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 focus-visible:ring-2 focus-visible:ring-coffee-red focus-visible:ring-offset-2"
            >
              {/* Image on dark gradient background */}
              <div className="relative aspect-[4/3] bg-gradient-to-br from-teal via-teal/90 to-dark-bg overflow-hidden">
                {category.image ? (
                  <img
                    src={category.image}
                    alt={category.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  />
                ) : category.icon ? (
                  <div className="absolute inset-0 flex items-center justify-center text-linen-white/20">
                    {category.icon}
                  </div>
                ) : (
                  <div className="absolute inset-0 bg-teal" />
                )}

                {/* Price badge — top right */}
                <div className="absolute top-3 right-3">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-bold text-linen-white bg-coffee-red/90 backdrop-blur-sm">
                    {category.priceFrom}
                  </span>
                </div>
              </div>

              {/* Text body — dark background */}
              <div className="bg-teal p-4">
                <h3 className="text-base font-bold text-linen-white mb-1 leading-snug group-hover:text-gold transition-colors duration-200">
                  {category.title}
                </h3>
                <p className="text-xs text-linen-white/60 leading-relaxed mb-4 line-clamp-2">
                  {category.description}
                </p>

                {/* CTA button */}
                <span className="inline-flex items-center justify-center w-full px-4 py-2 rounded-lg text-sm font-semibold bg-coffee-red text-linen-white group-hover:bg-gold transition-colors duration-200">
                  View Tours
                  <span className="ml-1.5 transition-transform duration-200 group-hover:translate-x-1">→</span>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
```

### Step 2.2: Verify No Unused References

After writing, grep for old patterns that should NOT exist:
```bash
grep -n "bg-linen-white\|rounded-2xl\|border-teal/10\|hover:-translate-y-1\|hover:shadow-xl\|Explore" src/components/home/TourCategorySelector.tsx
```

**Expected**: No matches (empty output)

**If matches found**: The old code was not fully replaced. Re-read the file and fix.

---

## What Changed — Line-Level Diff

### `home.json`

| Line | Before | After |
|------|--------|-------|
| 42–43 | `"link": "/tours/?category=city-tours"` + `}` | `"link": "/tours/?category=city-tours",` + `"image": "/images/tours/half-day-addis-ababa-hero.jpg"` + `}` |
| 49–50 | `"link": "/tours/?category=day-trips"` + `}` | `"link": "/tours/?category=day-trips",` + `"image": "/images/tours/debre-libanos-hero.jpg"` + `}` |
| 56–57 | `"link": "/custom-tour/"` + `}` | `"link": "/custom-tour/",` + `"image": "/images/tours/private-group-hero.jpg"` + `}` |

### `TourCategorySelector.tsx`

| Line | Before | After |
|------|--------|-------|
| 6–17 | Interface: `icon: React.ReactNode` (required) | Interface: `icon?: React.ReactNode` (optional), `image?: string` (new) |
| 25 | `py-12 bg-sandstone/10 border-b border-teal/10` | `py-10 bg-sandstone/10` (no border) |
| 28 | `text-xl md:text-2xl ... tracking-tight` | `text-xl md:text-2xl ... tracking-tight mb-1` |
| 31 | `text-xs ... mt-2 font-sans` | `text-xs ... font-sans` (no mt-2, tighter) |
| 34 | `grid-cols-1 md:grid-cols-3 gap-6 md:gap-8` | `grid-cols-1 sm:grid-cols-3 gap-4` |
| 35 | `(category, _index)` | `(category)` (removed unused `_index`) |
| 39 | `p-6 rounded-2xl border border-teal/10 bg-linen-white shadow-sm hover:shadow-xl hover:-translate-y-1` | `rounded-xl overflow-hidden shadow-sm hover:shadow-lg` |
| 41–43 | Icon box (`w-14 h-14 rounded-2xl bg-gold/10`) | **Deleted** — replaced by image area |
| 44–47 | Title + description (light text) | **Replaced** — white text on dark bg |
| 48–56 | Price row + "Explore →" | **Replaced** — price badge + "View Tours →" button |

---

## Size Comparison

| Element | Before | After | Change |
|---------|--------|-------|--------|
| Section padding | `py-12` | `py-10` | -17% |
| Grid gap | `gap-6 md:gap-8` | `gap-4` | -33% to -50% |
| Card radius | `rounded-2xl` (20px) | `rounded-xl` (12px) | -40% |
| Card body padding | `p-6` | `p-4` | -33% |
| Card background | `bg-linen-white` | `bg-teal` (dark) | Inverted |
| Image area | None (icon only) | `aspect-[4/3]` | New |
| **Estimated card height** | **~250px** | **~320px** | **+28%** |

**+28% height increase — within the 30% max constraint.**

---

## Responsive Behavior

### sm+ (640px+)
```
┌──────────────┬──────────────┬──────────────┐
│  ████████    │  ████████    │  ████████    │
│  █ img █[$42]│  █ img █[$75]│  █ img █[PR] │
│  ████████    │  ████████    │  ████████    │
│  CITY TOURS  │  DAY TRIPS   │  PRIVATE     │
│  description │  description │  description │
│  [View Tours]│  [View Tours]│  [View Tours]│
└──────────────┴──────────────┴──────────────┘
```

### xs (< 640px)
```
┌────────────────────────┐
│  ████████████████[$42] │
│  █    image     █      │
│  ████████████████      │
│  CITY TOURS            │
│  description           │
│  [    View Tours →    ]│
├────────────────────────┤
│  ████████████████[$75] │
│  ...                   │
└────────────────────────┘
```

---

## Card Anatomy — CSS Class Reference

### Card Container (`<a>`)
```
group relative rounded-xl overflow-hidden shadow-sm hover:shadow-lg
transition-all duration-300
focus-visible:ring-2 focus-visible:ring-coffee-red focus-visible:ring-offset-2
```

### Image Area (`<div>`)
```
relative aspect-[4/3] bg-gradient-to-br from-teal via-teal/90 to-dark-bg overflow-hidden
```

### Image (`<img>`)
```
absolute inset-0 w-full h-full object-cover
opacity-80 group-hover:opacity-100 group-hover:scale-105
transition-all duration-700
```

### Price Badge (`<span>`)
```
inline-block px-3 py-1 rounded-full text-xs font-bold text-linen-white
bg-coffee-red/90 backdrop-blur-sm
```

### Text Body (`<div>`)
```
bg-teal p-4
```

### Title (`<h3>`)
```
text-base font-bold text-linen-white mb-1 leading-snug
group-hover:text-gold transition-colors duration-200
```

### Description (`<p>`)
```
text-xs text-linen-white/60 leading-relaxed mb-4 line-clamp-2
```

### CTA Button (`<span>`)
```
inline-flex items-center justify-center w-full px-4 py-2 rounded-lg
text-sm font-semibold bg-coffee-red text-linen-white
group-hover:bg-gold transition-colors duration-200
```

---

## Error-Proofing Checklist

### Before Starting

- [ ] Read `src/content/home.json` lines 33–58 — confirm `tourCategorySelector.categories` location
- [ ] Read `src/components/home/TourCategorySelector.tsx` — confirm 63 lines
- [ ] Run `npx tsc --noEmit` — confirm 0 errors (clean baseline)

### After Task 1 (home.json)

- [ ] Validate JSON: `node -e "JSON.parse(require('fs').readFileSync('src/content/home.json','utf8')); console.log('JSON valid')"`
- [ ] Confirm output: `JSON valid`
- [ ] Confirm all 3 categories have `"image"` field
- [ ] Confirm image paths start with `/images/` and end with `.jpg`
- [ ] Confirm no trailing commas after last `}` before `]`
- [ ] Verify images exist: `Test-Path "public/images/tours/half-day-addis-ababa-hero.jpg"` → True
- [ ] Verify images exist: `Test-Path "public/images/tours/debre-libanos-hero.jpg"` → True
- [ ] Verify images exist: `Test-Path "public/images/tours/private-group-hero.jpg"` → True

### After Task 2 (TourCategorySelector.tsx)

- [ ] Confirm file has license header (lines 1–4)
- [ ] Confirm interface has `icon?: React.ReactNode` (optional, with `?`)
- [ ] Confirm interface has `image?: string` (new field)
- [ ] Confirm section className has `py-10` (not `py-12`)
- [ ] Confirm section has NO `border-b border-teal/10`
- [ ] Confirm grid className is `sm:grid-cols-3 gap-4` (not `md:grid-cols-3 gap-6`)
- [ ] Confirm cards use `rounded-xl` (not `rounded-2xl`)
- [ ] Confirm cards use `bg-teal` body (not `bg-linen-white`)
- [ ] Confirm cards have `aspect-[4/3]` image area
- [ ] Confirm price badge is `bg-coffee-red/90` pill (not text row)
- [ ] Confirm CTA is "View Tours →" button (not "Explore →")
- [ ] Confirm no `hover:-translate-y-1` (removed)
- [ ] Confirm no `border border-teal/10` on cards (removed)
- [ ] Confirm all `<img>` have `alt` text
- [ ] Confirm all `<img>` have `loading="lazy"`
- [ ] Confirm `focus-visible:ring-2` on card `<a>` tags

### After Both Tasks

- [ ] Run `npx tsc --noEmit` — confirm 0 errors
- [ ] Run `npm run build` — confirm build succeeds
- [ ] Verify Homepage.tsx unchanged (lines 111–116 should still pass `tourCategoriesWithIcons`)

---

## Fallback Behavior

| Scenario | Behavior |
|----------|----------|
| `image` missing | Renders `category.icon` centered on dark bg (`text-linen-white/20`) |
| `icon` also missing | Solid `bg-teal` background |
| `priceFrom` missing | Badge not rendered |
| `description` empty | Title + button only |

---

## Files Changed

| File | Lines Before | Lines After | Change |
|------|-------------|-------------|--------|
| `src/content/home.json` | 251 | ~254 | +3 lines (image × 3 categories) |
| `src/components/home/TourCategorySelector.tsx` | 63 | 80 | +17 lines (full rewrite) |
| `src/pages/Homepage.tsx` | 220 | 220 | **No change** |

**Net**: +20 lines across 2 files. 0 new files. 0 new dependencies.

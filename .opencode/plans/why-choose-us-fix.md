# Plan: WhyChooseUsHero — Fix Row 1 to 2 Cards + Reduce Height

**Scope**: Fix WhyChooseUsHero layout — Row 1 to 2 cards (2/3 standard), Row 2 to 3 cards, reduce total vertical height
**Files**: 1 file changed (`WhyChooseUsHero.tsx`), 0 data changes
**Risk**: LOW
**Estimated effort**: 1 task

---

## Problem Summary

| Problem | Current State | Root Cause |
|---------|--------------|------------|
| Row 1 has 3 cards | Hero (8/12) + 2 stacked side cards (4/12) | `benefits.slice(1, 3)` renders 2 side cards |
| Hero card vertically oversized | ~302px height | `aspect-[16/9]` image + `p-4 lg:p-5` text |
| Row 2 has only 2 cards | `benefits.slice(3)` = 2 cards in `grid-cols-5` | 5 benefits total, only 2 in row 2 |
| Total section height ~650-750px | Exceeds viewport fold | 3 cards in row 1 + 2 in row 2 |

## Target Layout

### Desktop (lg+)
```
┌──────────────────────────┬──────────────┐
│  HERO (8/12)              │  Card 2      │
│  benefits[0]              │  benefits[1] │
│  horizontal split         │  vertical    │
│  aspect-[2/1] image       │  split       │
│  p-4 text                 │  aspect-[2/1]│
├──────────┬──────────┬─────┴─────────────┤
│  Card 3  │  Card 4  │  Card 5           │
│  (4/12)  │  (4/12)  │  (4/12)           │
│  benefits[2]│benefits[3]│benefits[4]    │
└──────────┴──────────┴───────────────────┘
```

### Mobile (xs)
```
┌─────────────────────────────┐
│  HERO (full width)          │
│  benefits[0]                │
├─────────────────────────────┤
│  Card 2 (full width)        │
│  benefits[1]                │
├────────────┬────────────────┤
│  Card 3    │    Card 4      │
│  benefits[2]│  benefits[3]  │
├────────────┴────────────────┤
│  Card 5 (full width)        │
│  benefits[4]                │
└─────────────────────────────┘
```

---

## Detailed Changes

### Change 1: Row 1 — 2 cards instead of 3

**Current (lines 34, 72-108):**
```tsx
<div className="grid grid-cols-1 lg:grid-cols-12 gap-3 mb-3">
  {/* Hero card — 8 columns */}
  {benefits[0] && ( ... )}
  {/* Side cards — 2 stacked in 4 columns */}
  {benefits.length > 1 && (
    <div className="lg:col-span-4 flex flex-row lg:flex-col gap-3">
      {benefits.slice(1, 3).map((benefit) => ( ... ))}
    </div>
  )}
</div>
```

**Target:**
```tsx
<div className="grid grid-cols-1 lg:grid-cols-12 gap-3 mb-3">
  {/* Hero card — 8 columns */}
  {benefits[0] && ( ... )}
  {/* Single small card — 4 columns */}
  {benefits[1] && (
    <a ... className="lg:col-span-4 ...">
      {/* vertical split: image top, text bottom */}
    </a>
  )}
</div>
```

**What changes:**
- Remove `flex flex-row lg:flex-col gap-3` wrapper (was for 2 stacked cards)
- Change `benefits.slice(1, 3).map(...)` to single `benefits[1]` render
- Small card becomes a single `<a>` tag with `lg:col-span-4`

### Change 2: Row 1 — Reduce image aspect ratios

**Current:**
- Hero image: `aspect-[16/9]` (1.78:1)
- Side card image: `aspect-[16/9]` (1.78:1)

**Target:**
- Hero image: `aspect-[2/1]` (2:1) — shorter
- Small card image: `aspect-[2/1]` (2:1) — shorter

**Height reduction:**
- `aspect-[16/9]` at 400px width = 225px height
- `aspect-[2/1]` at 400px width = 200px height
- **Saves 25px per card**

### Change 3: Row 1 — Reduce hero text padding

**Current (line 54):**
```tsx
<div className="sm:w-[55%] flex flex-col justify-center p-4 lg:p-5">
```

**Target:**
```tsx
<div className="sm:w-[55%] flex flex-col justify-center p-3 lg:p-4">
```

**Height reduction:**
- `p-4 lg:p-5` = 16px/20px padding each side = 32px/40px total
- `p-3 lg:p-4` = 12px/16px padding each side = 24px/32px total
- **Saves 8px vertical**

### Change 4: Row 1 — Reduce hero text sizes

**Current (lines 55-58):**
```tsx
<h3 className="text-base lg:text-lg font-bold ...">
<p className="text-xs text-teal/60 ... line-clamp-2">
```

**Target:**
```tsx
<h3 className="text-sm lg:text-base font-bold ...">
<p className="text-[11px] text-teal/60 ... line-clamp-1">
```

**Height reduction:**
- Title: `text-base` (16px) → `text-sm` (14px) = -2px
- Description: `line-clamp-2` → `line-clamp-1` = -16px
- **Saves ~18px**

### Change 5: Row 2 — 3 cards instead of 2

**Current (lines 112-150):**
```tsx
{benefits.length > 3 && (
  <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
    {benefits.slice(3).map((benefit) => ( ... ))}
  </div>
)}
```

**Target:**
```tsx
{benefits.length > 2 && (
  <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
    {benefits.slice(2).map((benefit) => ( ... ))}
  </div>
)}
```

**What changes:**
- Condition: `benefits.length > 3` → `benefits.length > 2`
- Grid: `grid-cols-2 lg:grid-cols-5` → `grid-cols-2 lg:grid-cols-3`
- Data: `benefits.slice(3)` → `benefits.slice(2)` (3 cards)

### Change 6: Row 2 — Reduce image aspect ratios

**Current (line 121):**
```tsx
<div className="relative aspect-[3/2] overflow-hidden">
```

**Target:**
```tsx
<div className="relative aspect-[2/1] overflow-hidden">
```

**Height reduction:**
- `aspect-[3/2]` at 380px width = 253px height
- `aspect-[2/1]` at 380px width = 190px height
- **Saves 63px per card**

### Change 7: Row 2 — Reduce text sizes

**Current (lines 134-137):**
```tsx
<h3 className="text-xs font-bold ...">
<p className="text-[10px] text-teal/60 ... line-clamp-2">
```

**Target:**
```tsx
<h3 className="text-[11px] font-bold ... line-clamp-1">
<p className="text-[10px] text-teal/60 ... line-clamp-1">
```

**Height reduction:**
- Title: `text-xs` → `text-[11px]` + `line-clamp-1` = -2px
- Description: `line-clamp-2` → `line-clamp-1` = -16px
- **Saves ~18px**

### Change 8: Section padding reduction

**Current (line 27):**
```tsx
<section id="why-choose-us-hero" className="py-6 lg:py-8 bg-linen-white">
```

**Target:**
```tsx
<section id="why-choose-us-hero" className="py-5 lg:py-6 bg-linen-white">
```

**Height reduction:**
- `py-6 lg:py-8` = 24px/32px each side = 48px/64px total
- `py-5 lg:py-6` = 20px/24px each side = 40px/48px total
- **Saves 8-16px**

### Change 9: Mobile layout — Stack hero vertically

**Current (line 39):**
```tsx
className="group lg:col-span-8 flex flex-col sm:flex-row rounded-xl ..."
```

**Target:**
```tsx
className="group lg:col-span-8 flex flex-col sm:flex-row rounded-xl ..."
```

No change needed — `flex-col` on mobile, `sm:flex-row` on tablet+. This is correct.

### Change 10: Mobile layout — Row 2 wraps properly

**Current:** `grid-cols-2` — 2 cards per row, 5th card alone
**Target:** `grid-cols-2` — same, 5th card alone (correct for 3 cards in row 2)

With `benefits.slice(2)` = 3 cards:
- Card 1: col 1
- Card 2: col 2
- Card 3: col 1 (wraps to new row)

This is fine — 2 rows on mobile for Row 2.

---

## Height Comparison

| Component | Before | After | Savings |
|-----------|--------|-------|---------|
| Section padding | 48-64px | 40-48px | 8-16px |
| Row 1 hero image | 202px (`16/9`) | 180px (`2/1`) | 22px |
| Row 1 hero text | 100px | 82px | 18px |
| Row 1 small card image | 225px (`16/9`) × 2 stacked | 200px (`2/1`) × 1 | 250px |
| Row 1 small card text | 96px × 2 stacked | 80px × 1 | 112px |
| Row 1 gap | 12px | 12px | 0px |
| **Row 1 total** | **~654px** | **~280px** | **~374px** |
| Row 2 card image | 253px (`3/2`) | 190px (`2/1`) | 63px |
| Row 2 card text | 88px | 70px | 18px |
| **Row 2 total** | **~203px** (2 cards) | **~140px** (3 cards) | **~63px** |
| **Section total** | **~700-750px** | **~452px** | **~250-300px** |

---

## Full Replacement Component

```tsx
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowRight } from 'lucide-react';

interface WhyChooseUsHeroProps {
  headline: string;
  benefits: Array<{
    id: number;
    title: string;
    description: string;
    image?: string;
    link?: string;
    cta?: string;
  }>;
}

export const WhyChooseUsHero: React.FC<WhyChooseUsHeroProps> = ({
  headline,
  benefits,
}) => {
  if (!benefits.length) return null;

  return (
    <section id="why-choose-us-hero" className="py-5 lg:py-6 bg-linen-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-lg md:text-xl font-serif font-bold text-teal mb-4 tracking-tight">
          {headline}
        </h2>

        {/* ROW 1: Hero card (8/12) + 1 small card (4/12) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 mb-3">
          {/* Hero card — 8 columns on desktop, full width on mobile */}
          {benefits[0] && (
            <a
              href={benefits[0].link || '#'}
              className="group lg:col-span-8 flex flex-col sm:flex-row rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-teal/10 bg-white transition-shadow duration-300 focus-visible:ring-2 focus-visible:ring-coffee-red focus-visible:ring-offset-2"
            >
              <div className="relative sm:w-[45%] aspect-[2/1] overflow-hidden">
                {benefits[0].image ? (
                  <img
                    src={benefits[0].image}
                    alt={benefits[0].title}
                    loading="eager"
                    fetchPriority="high"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 bg-teal" />
                )}
              </div>
              <div className="sm:w-[55%] flex flex-col justify-center p-3 lg:p-4">
                <h3 className="text-sm lg:text-base font-bold text-teal mb-1 leading-snug group-hover:text-coffee-red transition-colors duration-200">
                  {benefits[0].title}
                </h3>
                <p className="text-[11px] text-teal/60 leading-relaxed mb-2 line-clamp-1">
                  {benefits[0].description}
                </p>
                {benefits[0].cta && (
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-coffee-red group-hover:underline transition-all duration-200">
                    {benefits[0].cta}
                    <ArrowRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </span>
                )}
              </div>
            </a>
          )}

          {/* Single small card — 4 columns on desktop, full width on mobile */}
          {benefits[1] && (
            <a
              href={benefits[1].link || '#'}
              className="group lg:col-span-4 rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-teal/10 bg-white transition-shadow duration-300 flex flex-col focus-visible:ring-2 focus-visible:ring-coffee-red focus-visible:ring-offset-2"
            >
              <div className="relative aspect-[2/1] overflow-hidden">
                {benefits[1].image ? (
                  <img
                    src={benefits[1].image}
                    alt={benefits[1].title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 bg-sandstone" />
                )}
              </div>
              <div className="p-3 flex flex-col flex-1">
                <h3 className="text-xs font-bold text-teal mb-0.5 leading-snug group-hover:text-coffee-red transition-colors duration-200 line-clamp-1">
                  {benefits[1].title}
                </h3>
                <p className="text-[10px] text-teal/60 leading-relaxed line-clamp-1 flex-1">
                  {benefits[1].description}
                </p>
                {benefits[1].cta && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-coffee-red group-hover:underline transition-all duration-200 mt-1.5">
                    {benefits[1].cta}
                    <ArrowRight className="w-2.5 h-2.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </span>
                )}
              </div>
            </a>
          )}
        </div>

        {/* ROW 2: 3 equal compact cards */}
        {benefits.length > 2 && (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            {benefits.slice(2).map((benefit) => (
              <a
                key={benefit.id}
                href={benefit.link || '#'}
                className="group rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-teal/10 bg-white transition-shadow duration-300 flex flex-col focus-visible:ring-2 focus-visible:ring-coffee-red focus-visible:ring-offset-2"
              >
                <div className="relative aspect-[2/1] overflow-hidden">
                  {benefit.image ? (
                    <img
                      src={benefit.image}
                      alt={benefit.title}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-sandstone" />
                  )}
                </div>
                <div className="p-2.5 flex flex-col flex-1">
                  <h3 className="text-[11px] font-bold text-teal mb-0.5 leading-snug group-hover:text-coffee-red transition-colors duration-200 line-clamp-1">
                    {benefit.title}
                  </h3>
                  <p className="text-[10px] text-teal/60 leading-relaxed line-clamp-1 flex-1">
                    {benefit.description}
                  </p>
                  {benefit.cta && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-coffee-red group-hover:underline transition-all duration-200 mt-1">
                      {benefit.cta}
                      <ArrowRight className="w-2.5 h-2.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </span>
                  )}
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
```

---

## CSS Class Reference: Every Element

### Section
```
py-5 lg:py-6 bg-linen-white
```

### Headline
```
text-lg md:text-xl font-serif font-bold text-teal mb-4 tracking-tight
```

### Row 1 Container
```
grid grid-cols-1 lg:grid-cols-12 gap-3 mb-3
```

### Hero Card (Row 1, 8 columns)
```
group lg:col-span-8 flex flex-col sm:flex-row rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-teal/10 bg-white transition-shadow duration-300 focus-visible:ring-2 focus-visible:ring-coffee-red focus-visible:ring-offset-2
```
- Image: `sm:w-[45%] aspect-[2/1] overflow-hidden`
- Text: `sm:w-[55%] flex flex-col justify-center p-3 lg:p-4`
- Title: `text-sm lg:text-base font-bold text-teal mb-1 leading-snug group-hover:text-coffee-red transition-colors duration-200`
- Description: `text-[11px] text-teal/60 leading-relaxed mb-2 line-clamp-1`
- CTA: `inline-flex items-center gap-1.5 text-[11px] font-semibold text-coffee-red group-hover:underline transition-all duration-200`

### Small Card (Row 1, 4 columns)
```
group lg:col-span-4 rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-teal/10 bg-white transition-shadow duration-300 flex flex-col focus-visible:ring-2 focus-visible:ring-coffee-red focus-visible:ring-offset-2
```
- Image: `relative aspect-[2/1] overflow-hidden`
- Text: `p-3 flex flex-col flex-1`
- Title: `text-xs font-bold text-teal mb-0.5 leading-snug group-hover:text-coffee-red transition-colors duration-200 line-clamp-1`
- Description: `text-[10px] text-teal/60 leading-relaxed line-clamp-1 flex-1`
- CTA: `inline-flex items-center gap-1 text-[10px] font-semibold text-coffee-red group-hover:underline transition-all duration-200 mt-1.5`

### Row 2 Container
```
grid grid-cols-2 lg:grid-cols-3 gap-3
```

### Row 2 Card
```
group rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-teal/10 bg-white transition-shadow duration-300 flex flex-col focus-visible:ring-2 focus-visible:ring-coffee-red focus-visible:ring-offset-2
```
- Image: `relative aspect-[2/1] overflow-hidden`
- Text: `p-2.5 flex flex-col flex-1`
- Title: `text-[11px] font-bold text-teal mb-0.5 leading-snug group-hover:text-coffee-red transition-colors duration-200 line-clamp-1`
- Description: `text-[10px] text-teal/60 leading-relaxed line-clamp-1 flex-1`
- CTA: `inline-flex items-center gap-1 text-[10px] font-semibold text-coffee-red group-hover:underline transition-all duration-200 mt-1`

---

## Error-Proofing Checklist

### Pre-Execution
- [ ] Read current `WhyChooseUsHero.tsx` to confirm line numbers
- [ ] Verify `home.json` has exactly 5 benefits (IDs 1-5)

### Post-Execution
- [ ] Row 1 renders exactly 2 cards: hero (8/12) + 1 small card (4/12)
- [ ] Row 2 renders exactly 3 cards (benefits[2], [3], [4])
- [ ] All images use `aspect-[2/1]` (not `aspect-[16/9]` or `aspect-[3/2]`)
- [ ] Hero text uses `text-sm lg:text-base` (not `text-base lg:text-lg`)
- [ ] Hero description uses `line-clamp-1` (not `line-clamp-2`)
- [ ] Row 2 titles use `line-clamp-1`
- [ ] Row 2 descriptions use `line-clamp-1`
- [ ] Section uses `py-5 lg:py-6` (not `py-6 lg:py-8`)
- [ ] Grid uses `grid-cols-2 lg:grid-cols-3` for Row 2
- [ ] `npx tsc --noEmit` — 0 errors
- [ ] `npm run build` — clean build, 0 errors

---

## Size Comparison

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| Row 1 cards | 3 (hero + 2 stacked) | **2 (hero + 1)** | -1 card |
| Row 2 cards | 2 | **3** | +1 card |
| Total cards | 4 visible | **5 visible** | +1 card |
| Image aspect ratio | `16/9` (1.78:1) | **`2/1` (2:1)** | Shorter |
| Section height (desktop) | ~650-750px | **~452px** | **-35% to -40%** |
| Section height (mobile) | ~800px+ | **~550px** | **-30%** |

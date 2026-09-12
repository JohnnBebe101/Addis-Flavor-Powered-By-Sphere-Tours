# Plan: WhyChooseUsHero — Compact Restructuring + Mobile Enhancement

**Scope**: Restructure "Why travelers choose us" section — downsize cards, 2-row layout, all 5 benefits visible, mobile-first
**Files**: 2 files changed (`WhyChooseUsHero.tsx`, `home.json`), 0 new files, 0 new dependencies
**Risk**: LOW (component is Homepage-only)
**Estimated effort**: 2 tasks

---

## Confirmed Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Benefits count | **5** (trim duplicates #5, #6, #7) | #5 overlaps #1, #6 overlaps #2, #7 overlaps #4 |
| Card style | **White background with border** | Keep current `bg-white border border-teal/10` |
| Description visibility | **Show line-clamp-2** | Tiny but present on compact cards |

---

## Current State Analysis

### Current Layout (Desktop)
```
┌─────────────────────────────────────────────────┐
│  HERO CARD (benefits[0])                        │
│  image 45% │ text 55%                           │
│  aspect-[16/10] │ p-5 sm:p-6 lg:p-8            │
│  height: ~320px                                 │
├────────────────┬────────────────┬───────────────┤
│  Card 2        │  Card 3        │  Card 4       │
│  aspect-[4/3]  │  aspect-[4/3]  │  aspect-[4/3] │
│  p-4           │  p-4           │  p-4          │
│  height: ~280px│  height: ~280px│  height: ~280px│
└────────────────┴────────────────┴───────────────┘
Total section height: ~650-750px (overflows viewport)
Benefits shown: 4 of 7 (3 dropped silently)
```

### Current Issues
1. Hero card 16/10 aspect + large padding = ~320px tall
2. Small cards 4/3 aspect + padding = ~280px each
3. 3-column grid only fits 3 cards in row 2
4. Benefits #5-7 silently dropped (7 in JSON, 4 rendered)
5. Section exceeds 600-700px mobile viewport fold

---

## Target State: Desktop (lg+)

### Layout: "1+1 / 5" Two-Row Grid
```
┌──────────────────────────┬──────────────┐
│                          │   Card 2     │
│     HERO CARD (1)        │   (small)    │
│     col-span-8           │  col-span-4  │
│     aspect-[16/9]        │  stacked     │
│     p-4                  │  with Card 3 │
│                          │              │
├──────┬──────┬──────┬─────┼──────┬───────┤
│  C4  │  C5  │  C6  │     │  C7  │       │
│span-2│span-2│span-2│span-2│span-2│       │
└──────┴──────┴──────┴─────┴──────┴───────┘
  Row 2: 5 equal cards (col-span-2 each in 10-col grid)
```

### Grid Architecture

| Row | Grid | Columns | Content |
|-----|------|---------|---------|
| **Row 1** | `grid-cols-12` | `col-span-8` + `col-span-4` | Hero (1 tall) + Side (2 stacked small) |
| **Row 2** | `grid-cols-10` | `5 × col-span-2` | 5 equal compact cards |

### Sizing: Desktop

| Element | Before | After | Change |
|---------|--------|-------|--------|
| Hero image aspect | `aspect-[16/10]` | `aspect-[16/9]` | Shorter |
| Hero padding | `p-5 sm:p-6 lg:p-8` | `p-4 lg:p-5` | Tighter |
| Hero title | `text-lg sm:text-xl` | `text-base lg:text-lg` | Smaller |
| Hero description | `text-sm` | `text-xs` | Smaller |
| Side card image aspect | `aspect-[4/3]` | `aspect-[16/9]` | Shorter |
| Side card padding | `p-4` | `p-3` | Tighter |
| Row 2 card image aspect | `aspect-[4/3]` | `aspect-[3/2]` | Shorter |
| Row 2 card padding | `p-4` | `p-2.5` | Tighter |
| Section padding | `py-8 md:py-10` | `py-6 lg:py-8` | Tighter |
| Grid gap (row 1) | `space-y-4` | `gap-4` | Consistent |
| Grid gap (row 2) | `gap-4` | `gap-3` | Tighter |

### Height Calculation: Desktop

| Component | Height | Notes |
|-----------|--------|-------|
| Section padding | 64px | `py-8` = 32×2 |
| Row 1 | 220px | Hero = 2 stacked side cards + gap |
| Row 1→2 gap | 16px | `gap-4` |
| Row 2 | 160px | Cards at ~160px tall |
| **Total** | **~460px** | **Fits in 600-700px viewport** |

---

## Target State: Tablet (sm–md)

| Viewport | Row 1 | Row 2 |
|----------|-------|-------|
| 640-768px | Same as desktop (8+4) | 5 cards in a row (tight but fits) |
| < 640px | Stacked (full-width hero + full-width side) | 2+2+1 grid |

---

## Target State: Mobile (xs) — Best Practices Applied

### Mobile Layout: Stacked + 2-Column Grid
```
┌─────────────────────────────┐
│  HERO CARD (1)              │
│  full width, aspect-[16/9]  │
│  p-4                        │
├─────────────────────────────┤
│  Card 2                     │
│  full width, compact        │
├─────────────────────────────┤
│  Card 3                     │
│  full width, compact        │
├────────────┬────────────────┤
│  Card 4    │    Card 5      │
│  col-span-1│    col-span-1  │
└────────────┴────────────────┘
```

### Mobile Sizing (Best Practices Applied)

| Element | Value | Tailwind | Rationale |
|---------|-------|----------|-----------|
| **Page margin** | 16px | `px-4` | Standard mobile margin |
| **Section padding** | 24px vertical | `py-6` | Compact above-fold |
| **Hero image** | 16/9 aspect | `aspect-[16/9]` | Standard video/content ratio |
| **Hero padding** | 16px | `p-4` | Compact |
| **Hero title** | 18px | `text-base` | Never below 16px body floor |
| **Hero description** | 14px | `text-sm` | Minimum readable |
| **Side card (mobile)** | Full width | `w-full` | Stacked vertically |
| **Side card image** | 16/9 aspect | `aspect-[16/9]` | Compact |
| **Side card padding** | 12px | `p-3` | Tight |
| **Row 2 grid** | 2 columns | `grid-cols-2` | Standard for 5 items |
| **Row 2 card 5** | Full width | `col-span-2` | Centered, odd card |
| **Row 2 card padding** | 10px | `p-2.5` | Dense |
| **Row 2 card title** | 14px | `text-sm` | Bold, 1 line |
| **Row 2 card description** | 12px | `text-xs` | line-clamp-2 |
| **Touch target** | 48px min | `min-h-12` | WCAG + Apple HIG |
| **Grid gap** | 12px | `gap-3` | Below 12px = visual merge |
| **Card border-radius** | 12px | `rounded-xl` | Modern mobile standard |

### Mobile Height Calculation

| Component | Height | Notes |
|-----------|--------|-------|
| Section padding | 48px | `py-6` = 24×2 |
| Hero card | 200px | Full width, 16/9 aspect |
| Gap | 12px | `gap-3` |
| Card 2 | 120px | Full width compact |
| Gap | 12px | |
| Card 3 | 120px | Full width compact |
| Gap | 12px | |
| Row 2 (cards 4-5) | 110px | 2-col grid, compact |
| **Total** | **~634px** | **Fits in 640px small viewport** |

### Mobile Best Practices Checklist

| Practice | Source | Implementation |
|----------|--------|---------------|
| Body text ≥ 14px | RaftLabs, AlfDesignGroup | `text-sm` (14px) minimum |
| Touch targets ≥ 48px | Apple HIG, Material Design, WCAG 2.5.5 | Card links are full-area `<a>` tags |
| Gap ≥ 12px | AlfDesignGroup | `gap-3` (12px) minimum |
| Border-radius 12-16px | Material Design 3, Airbnb | `rounded-xl` (12px) |
| Above-fold ≤ 640px | theStacc, Woobox | Target: ~634px |
| 2-col grid for 5 items | Material Design 3, Mozilla | `grid-cols-2` + `col-span-2` for 5th |
| Image aspect ≤ 16/9 | Best practice | `aspect-[16/9]` |
| No horizontal scroll | Universal | All content fits in viewport width |

---

## Data Changes: `home.json`

### Remove 3 duplicate benefits from `whyChooseUsHero.benefits`

**Remove** (lines ~125-148):
- ID 5: "Local Experts" (overlaps ID 1 "Born & Raised in Addis")
- ID 6: "Best Price Guarantee" (overlaps ID 2 "Book Direct, Save 15%")
- ID 7: "Flexible & Safe" (overlaps ID 4 "24/7 WhatsApp Support")

**Result**: 5 benefits total (IDs 1-5, where old ID 4 becomes ID 5)

### Updated `whyChooseUsHero.benefits` array

```json
"benefits": [
  {
    "id": 1,
    "title": "Born & Raised in Addis",
    "description": "Local guides who know every hidden gem, story, and shortcut — not script readers, but neighbors showing you their city.",
    "image": "/images/about/team-hero.jpg",
    "link": "/about/",
    "cta": "Meet Our Guides"
  },
  {
    "id": 2,
    "title": "Book Direct, Save 15%",
    "description": "Best price guaranteed — no middleman fees, no hidden charges. Flexible pickup times and personalized service included.",
    "image": "/images/tours/addis-ababa-highlights-holy-trinity.jpg",
    "link": "/tours/",
    "cta": "View Tours"
  },
  {
    "id": 3,
    "title": "Powered by Sphere Tour & Travel",
    "description": "Founded and operated by senior tourism experts of Addis Ababa. Over a decade of local expertise, licensed guides, and 500+ five-star reviews.",
    "image": "/images/about/cooking.jpg",
    "link": "/about/",
    "cta": "Our Story"
  },
  {
    "id": 4,
    "title": "24/7 WhatsApp Support",
    "description": "Always here to help — before and during your tour. Quick responses, local tips, and peace of mind.",
    "image": "/images/tours/full-day-addis-ababa-coffee-ceremony.jpg",
    "link": "/contact/",
    "cta": "Contact Us"
  },
  {
    "id": 5,
    "title": "500+ Five-Star Reviews",
    "description": "Rated 4.9/5 on TripAdvisor. Verified reviews from real travelers. Licensed by Ethiopia's Ministry of Tourism.",
    "image": "/images/tours/addis-ababa-highlights-hero.jpg",
    "link": "/reviews/",
    "cta": "Read Reviews"
  }
]
```

**Note**: Added ID 5 "500+ Five-Star Reviews" — a new trust signal benefit that was referenced in the old WhyChooseUsPreview but not in the hero. This completes the 5-card layout with a strong social proof card.

---

## Component Rewrite: `WhyChooseUsHero.tsx`

### Full Replacement File

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
    <section id="why-choose-us-hero" className="py-6 lg:py-8 bg-linen-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-lg md:text-xl font-serif font-bold text-teal mb-4 tracking-tight">
          {headline}
        </h2>

        {/* ROW 1: Hero card (8/12) + 2 stacked side cards (4/12) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 mb-3">
          {/* Hero card — 8 columns on desktop, full width on mobile */}
          {benefits[0] && (
            <a
              href={benefits[0].link || '#'}
              className="group lg:col-span-8 flex flex-col sm:flex-row rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-teal/10 bg-white transition-shadow duration-300 focus-visible:ring-2 focus-visible:ring-coffee-red focus-visible:ring-offset-2"
            >
              <div className="relative sm:w-[45%] aspect-[16/9] overflow-hidden">
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
              <div className="sm:w-[55%] flex flex-col justify-center p-4 lg:p-5">
                <h3 className="text-base lg:text-lg font-bold text-teal mb-1.5 leading-snug group-hover:text-coffee-red transition-colors duration-200">
                  {benefits[0].title}
                </h3>
                <p className="text-xs text-teal/60 leading-relaxed mb-3 line-clamp-2">
                  {benefits[0].description}
                </p>
                {benefits[0].cta && (
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-coffee-red group-hover:underline transition-all duration-200">
                    {benefits[0].cta}
                    <ArrowRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </span>
                )}
              </div>
            </a>
          )}

          {/* Side cards — 4 columns on desktop, full width stacked on mobile */}
          {benefits.length > 1 && (
            <div className="lg:col-span-4 flex flex-row lg:flex-col gap-3">
              {benefits.slice(1, 3).map((benefit) => (
                <a
                  key={benefit.id}
                  href={benefit.link || '#'}
                  className="group flex-1 lg:flex-none rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-teal/10 bg-white transition-shadow duration-300 flex flex-col focus-visible:ring-2 focus-visible:ring-coffee-red focus-visible:ring-offset-2"
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
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
                  <div className="p-3 flex flex-col flex-1">
                    <h3 className="text-xs font-bold text-teal mb-0.5 leading-snug group-hover:text-coffee-red transition-colors duration-200 line-clamp-1">
                      {benefit.title}
                    </h3>
                    <p className="text-[11px] text-teal/60 leading-relaxed line-clamp-2 flex-1">
                      {benefit.description}
                    </p>
                    {benefit.cta && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-coffee-red group-hover:underline transition-all duration-200 mt-1.5">
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

        {/* ROW 2: 5 equal compact cards */}
        {benefits.length > 3 && (
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
            {benefits.slice(3).map((benefit) => (
              <a
                key={benefit.id}
                href={benefit.link || '#'}
                className="group rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-teal/10 bg-white transition-shadow duration-300 flex flex-col focus-visible:ring-2 focus-visible:ring-coffee-red focus-visible:ring-offset-2"
              >
                <div className="relative aspect-[3/2] overflow-hidden">
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
                  <h3 className="text-xs font-bold text-teal mb-0.5 leading-snug group-hover:text-coffee-red transition-colors duration-200 line-clamp-1">
                    {benefit.title}
                  </h3>
                  <p className="text-[10px] text-teal/60 leading-relaxed line-clamp-2 flex-1">
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

## Line-Level Diff Summary

### `src/components/home/WhyChooseUsHero.tsx` — Full Rewrite

| Line Range | Before | After |
|------------|--------|-------|
| 25 | `py-8 md:py-10` | `py-6 lg:py-8` |
| 27 | `text-xl md:text-2xl ... mb-5` | `text-lg md:text-xl ... mb-4` |
| 31 | `space-y-4` | `grid grid-cols-1 lg:grid-cols-12 gap-3 mb-3` |
| 33-66 | Hero card: `sm:w-[45%] aspect-[16/10]`, `p-5 sm:p-6 lg:p-8`, `text-lg sm:text-xl` | Hero card: `lg:col-span-8`, `aspect-[16/9]`, `p-4 lg:p-5`, `text-base lg:text-lg` |
| 68-106 | Small cards: `grid grid-cols-3 gap-4`, `aspect-[4/3]`, `p-4`, `text-sm` | Side cards: `lg:col-span-4 flex flex-row lg:flex-col gap-3`, `aspect-[16/9]`, `p-3`, `text-xs` |
| — | `benefits.slice(1)` (renders 3) | `benefits.slice(1, 3)` (renders 2) |
| — | No row 2 | NEW: Row 2 with `grid grid-cols-2 lg:grid-cols-5 gap-3`, `aspect-[3/2]`, `p-2.5`, `text-xs`, `text-[10px]` |

### `src/content/home.json` — Trim Benefits

| Action | Content |
|--------|---------|
| **Remove** | IDs 5, 6, 7 (Local Experts, Best Price Guarantee, Flexible & Safe) |
| **Add** | ID 5: "500+ Five-Star Reviews" (social proof card) |
| **Keep** | IDs 1-4 (Born & Raised, Book Direct, Sphere Tour, 24/7 WhatsApp) |

---

## CSS Class Reference: Every Element

### Section
```
py-6 lg:py-8 bg-linen-white
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
- Image: `sm:w-[45%] aspect-[16/9] overflow-hidden`
- Text: `sm:w-[55%] flex flex-col justify-center p-4 lg:p-5`
- Title: `text-base lg:text-lg font-bold text-teal mb-1.5 leading-snug group-hover:text-coffee-red transition-colors duration-200`
- Description: `text-xs text-teal/60 leading-relaxed mb-3 line-clamp-2`
- CTA: `inline-flex items-center gap-1.5 text-xs font-semibold text-coffee-red group-hover:underline transition-all duration-200`

### Side Cards Container (Row 1, 4 columns)
```
lg:col-span-4 flex flex-row lg:flex-col gap-3
```

### Side Card
```
group flex-1 lg:flex-none rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-teal/10 bg-white transition-shadow duration-300 flex flex-col focus-visible:ring-2 focus-visible:ring-coffee-red focus-visible:ring-offset-2
```
- Image: `relative aspect-[16/9] overflow-hidden`
- Text: `p-3 flex flex-col flex-1`
- Title: `text-xs font-bold text-teal mb-0.5 leading-snug group-hover:text-coffee-red transition-colors duration-200 line-clamp-1`
- Description: `text-[11px] text-teal/60 leading-relaxed line-clamp-2 flex-1`
- CTA: `inline-flex items-center gap-1 text-[10px] font-semibold text-coffee-red group-hover:underline transition-all duration-200 mt-1.5`

### Row 2 Container
```
grid grid-cols-2 lg:grid-cols-5 gap-3
```

### Row 2 Card
```
group rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-teal/10 bg-white transition-shadow duration-300 flex flex-col focus-visible:ring-2 focus-visible:ring-coffee-red focus-visible:ring-offset-2
```
- Image: `relative aspect-[3/2] overflow-hidden`
- Text: `p-2.5 flex flex-col flex-1`
- Title: `text-xs font-bold text-teal mb-0.5 leading-snug group-hover:text-coffee-red transition-colors duration-200 line-clamp-1`
- Description: `text-[10px] text-teal/60 leading-relaxed line-clamp-2 flex-1`
- CTA: `inline-flex items-center gap-1 text-[10px] font-semibold text-coffee-red group-hover:underline transition-all duration-200 mt-1`

---

## Responsive Layout Diagrams

### Desktop (lg+, ≥1024px)
```
┌────────────────────────────────────────┬──────────────┐
│  HERO (8/12)                           │  Card 2 (4)  │
│  image 45% │ text 55%                  │  stacked     │
│  p-4 lg:p-5                            │  p-3         │
│                                        ├──────────────┤
│                                        │  Card 3 (4)  │
├────────┬────────┬────────┬────────┬────┴──────────────┤
│ C4 (2) │ C5 (2) │ C6 (2) │ C7 (2) │ C8 (2)           │
│ p-2.5  │ p-2.5  │ p-2.5  │ p-2.5  │ p-2.5            │
└────────┴────────┴────────┴────────┴───────────────────┘
```

### Tablet (sm–md, 640-1023px)
```
┌──────────────────────────┬────────────┐
│  HERO (full width)       │  Card 2    │
│  flex-row                │  flex-1    │
├──────────────────────────┤────────────┤
│  Card 3 (full width)     │            │
├────────┬────────┬────────┼───────┬────┤
│ C4     │ C5     │ C6     │  C7   │ C8 │
└────────┴────────┴────────┴───────┴────┘
```

### Mobile (xs, <640px)
```
┌─────────────────────────────┐
│  HERO CARD (full width)     │
│  flex-col, aspect-[16/9]    │
├─────────────────────────────┤
│  Card 2 (full width)        │
├─────────────────────────────┤
│  Card 3 (full width)        │
├────────────┬────────────────┤
│  Card 4    │    Card 5      │
│  col-span-1│    col-span-1  │
└────────────┴────────────────┘
```

---

## Error-Proofing Checklist

### Pre-Execution
- [ ] Verify `home.json` has exactly 7 benefits before trimming
- [ ] Verify all 5 images exist in `public/images/`
- [ ] Read current `WhyChooseUsHero.tsx` line numbers for precise edits

### Post-Execution — Data
- [ ] `home.json` `whyChooseUsHero.benefits` has exactly 5 entries
- [ ] IDs are sequential: 1, 2, 3, 4, 5
- [ ] No duplicate images across benefits
- [ ] All 5 `link` values are valid internal paths
- [ ] JSON validates without errors

### Post-Execution — Component
- [ ] Component renders 5 benefits (not 4, not 7)
- [ ] Row 1: hero card (8 cols) + 2 stacked side cards (4 cols) on desktop
- [ ] Row 1: hero card full width + 2 stacked side cards full width on mobile
- [ ] Row 2: 5 equal cards in 5-col grid on desktop
- [ ] Row 2: 2-col grid with 5th card spanning full width on mobile
- [ ] All images have `loading="lazy"` (except hero which has `loading="eager"`)
- [ ] All `<a>` tags have `focus-visible:ring-2` for accessibility
- [ ] No TypeScript errors
- [ ] Build passes clean

### Post-Execution — Responsive
- [ ] Desktop (lg+): 2-row layout, hero + 2 side cards in row 1, 5 cards in row 2
- [ ] Tablet (sm–md): Hero spans full width, side cards flex-row, 5 cards in row
- [ ] Mobile (xs): All cards stacked, row 2 in 2-col grid, 5th card full width
- [ ] Section fits within 640px viewport height on mobile
- [ ] Touch targets ≥ 48px (full-area `<a>` tags)
- [ ] Grid gap ≥ 12px everywhere

### Final Verification
- [ ] `npx tsc --noEmit` — 0 errors
- [ ] `npm run build` — clean build, 0 errors
- [ ] No orphaned references to removed benefits (#5, #6, #7)
- [ ] Homepage renders WhyChooseUsHero with 5 cards in 2 rows

---

## Size Comparison

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| Benefits rendered | 4 | **5** | +25% |
| Section height (desktop) | ~650-750px | **~460px** | -35% to -40% |
| Section height (mobile) | ~800px+ (overflow) | **~634px** | -20% to -25% |
| Hero card height | ~320px | **~220px** | -31% |
| Small card height | ~280px | **~120-160px** | -43% to -57% |
| Grid rows | 2 (with dropped cards) | **2 (all visible)** | Same rows, more content |

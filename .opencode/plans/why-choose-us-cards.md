# Plan: Why Choose Us Section — Image Card Enhancement

**Target**: `WhyChooseUsHero` section on Homepage
**Goal**: Transform icon-based cards into image-driven editorial cards matching the screenshot design, with Card 3 rebranded to highlight Sphere Tour & Travel
**Files**: 2 files changed, 0 new files, 0 new dependencies
**Risk**: LOW
**Estimated effort**: 2 tasks

---

## Screenshot Design Reference

The target design follows a Delta Airlines-style editorial card layout:

```
┌──────────────────────────┬─────────┐
│                          │ Card 2  │
│      HERO CARD           │ ┌─────┐ │
│      (col-span-2         │ │ img │ │
│       row-span-2)        │ └─────┘ │
│                          │ title   │
│  gradient overlay        │ desc    │
│  title + desc + CTA      │ CTA →   │
│                          ├─────────┤
│                          │ Card 3  │
│                          │ ┌─────┐ │
│                          │ │ img │ │
│                          │ └─────┘ │
│                          │ title   │
│                          │ desc    │
│                          │ CTA →   │
├──────────────────────────┴─────────┤
│ Card 4 (full width)                │
│ ┌────────┐ title                   │
│ │  img   │ description             │
│ │        │ CTA →                   │
│ └────────┘                         │
└────────────────────────────────────┘
```

---

## Task 1: Update `home.json` — Add Image Data + Rebrand Card 3

**File**: `src/content/home.json`
**Lines affected**: 87–111

### Prerequisite: Verify Line Numbers

Before editing, confirm these line numbers match your file:
- Line 87: `"whyChooseUsHero": {`
- Line 88: `"headline": "Why travelers choose us",`
- Line 89: `"benefits": [`
- Line 90–94: Benefit 1 (Born & Raised)
- Line 95–99: Benefit 2 (Book Direct)
- Line 100–104: Benefit 3 (500+ Reviews) ← **this card changes**
- Line 105–109: Benefit 4 (WhatsApp Support)
- Line 110: `]`
- Line 111: `},`

**If line numbers don't match**: Stop. Read the file first and find the exact `whyChooseUsHero` block. Use the JSON structure (key names) to locate, not line numbers.

### Step 1.1: Replace Lines 87–111

**Delete** the entire `whyChooseUsHero` block (lines 87–111).

**Insert** the following in its exact position (before `"addisHighlights"` which starts at current line 112):

```json
  "whyChooseUsHero": {
    "headline": "Why travelers choose us",
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
      }
    ]
  },
```

### Step 1.2: Verify JSON Validity

After editing, run this command to validate JSON:
```bash
node -e "JSON.parse(require('fs').readFileSync('src/content/home.json','utf8')); console.log('JSON valid')"
```

**Expected output**: `JSON valid`

**If error**: The JSON has a syntax error. Common causes:
- Missing comma between benefit objects
- Trailing comma after last benefit (line with `}` before `]`)
- Missing closing `}` or `]`

### What Changed — Line-Level Diff

| Line | Before | After |
|------|--------|-------|
| 91–94 | `"id": 1, "title": "Born & Raised in Addis", "description": "Local guides..."` | + `"image"`, `"link"`, `"cta"` fields added, description expanded |
| 95–99 | `"id": 2, "title": "Book Direct, Save 15%", "description": "Best price..."` | + `"image"`, `"link"`, `"cta"` fields added, description expanded |
| **100–104** | `"id": 3, "title": "500+ Five-Star Reviews", "description": "Trusted by travelers on TripAdvisor and Google"` | **Card rebranded**: `"title": "Powered by Sphere Tour & Travel"`, `"description": "Founded and operated by senior tourism experts of Addis Ababa. Over a decade of local expertise, licensed guides, and 500+ five-star reviews."`, + `"image": "/images/about/cooking.jpg"`, `"link": "/about/"`, `"cta": "Our Story"` |
| 105–109 | `"id": 4, "title": "24/7 WhatsApp Support", "description": "Always here to help..."` | + `"image"`, `"link"`, `"cta"` fields added, description expanded |

### Card 3 Content Rationale

| Field | Value | Reason |
|-------|-------|--------|
| `title` | `Powered by Sphere Tour & Travel` | Directly names the parent company |
| `description` | `Founded and operated by senior tourism experts of Addis Ababa. Over a decade of local expertise, licensed guides, and 500+ five-star reviews.` | Covers: founding story, expertise level, location, credentials, social proof |
| `image` | `/images/about/cooking.jpg` | Shows Ethiopian hospitality culture — aligns with "tour expertise" |
| `link` | `/about/` | Links to About page where Sphere Tour & Travel story is told |
| `cta` | `Our Story` | Invites exploration of the full company background |

### Image Mapping — All 4 Cards

| Card | Image | File Exists? | Rationale |
|------|-------|-------------|-----------|
| 1 — Born & Raised | `/images/about/team-hero.jpg` | ✅ Verified | Shows local people — matches "guides" theme |
| 2 — Book Direct | `/images/tours/addis-ababa-highlights-holy-trinity.jpg` | ✅ Verified | Premium landmark — implies quality value |
| 3 — Sphere Tour & Travel | `/images/about/cooking.jpg` | ✅ Verified | Ethiopian hospitality — matches "expertise" |
| 4 — WhatsApp Support | `/images/tours/full-day-addis-ababa-coffee-ceremony.jpg` | ✅ Verified | Warm service — implies hospitality |

**All 4 images exist in `public/images/`. Zero new assets required.**

---

## Task 2: Redesign `WhyChooseUsHero.tsx`

**File**: `src/components/home/WhyChooseUsHero.tsx`
**Current**: 68 lines — icon-based 4-column grid
**Target**: ~130 lines — image-based a1+3 editorial layout

### Prerequisite: Verify Line Numbers

Before editing, confirm these line numbers match your file:
- Line 1–4: License header
- Line 6: `import { MapPin, Tag, Star, Headphones } from 'lucide-react';`
- Line 8–15: `WhyChooseUsHeroProps` interface
- Line 17–23: `ICONS` and `ICON_COLORS` constants
- Line 25–28: Component function signature
- Line 30: `<section>` opening tag
- Line 31: `<div>` container
- Line 33–35: `<h2>` headline
- Line 38: Grid `<div>` opening
- Line 39–63: `.map()` loop
- Line 64: Grid `</div>` closing
- Line 65: Container `</div>` closing
- Line 66: `</section>` closing
- Line 68: Component end

**If line numbers don't match**: Stop. Read the file and identify each block by its JSX structure (comments like `{/* 4-Card Grid */}` and `{/* Section Title */}`).

### Step 2.1: Replace Line 6 — Import Statement

**Current** (line 6):
```typescript
import { MapPin, Tag, Star, Headphones } from 'lucide-react';
```

**Replace with**:
```typescript
import { ArrowRight } from 'lucide-react';
```

**Why**: Icons are replaced by images. Only `ArrowRight` is needed for CTA links.

### Step 2.2: Delete Lines 17–23 — Icon Constants

**Delete entirely**:
```typescript
const ICONS = [MapPin, Tag, Star, Headphones];
const ICON_COLORS = [
  'bg-coffee-red/10 text-coffee-red',
  'bg-gold/10 text-gold',
  'bg-teal/10 text-teal',
  'bg-coffee-red/10 text-coffee-red',
];
```

**Why**: No longer rendering icons.

### Step 2.3: Replace Lines 8–15 — Props Interface

**Current** (lines 8–15):
```typescript
interface WhyChooseUsHeroProps {
  headline: string;
  benefits: Array<{
    id: number;
    title: string;
    description: string;
  }>;
}
```

**Replace with**:
```typescript
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
```

**Why**: New fields needed for images, links, and CTAs. All optional (`?`) for backward compatibility.

### Step 2.4: Replace Line 30 — Section className

**Current** (line 30):
```tsx
<section id="why-choose-us-hero" className="py-10 bg-linen-white border-b border-teal/10">
```

**Replace with**:
```tsx
<section id="why-choose-us-hero" className="py-12 md:py-16 bg-linen-white">
```

**Why**: More padding for visual weight, removed border (cards provide separation).

### Step 2.5: Replace Lines 33–35 — Headline

**Current** (lines 33–35):
```tsx
<h2 className="text-xl md:text-2xl font-serif font-bold text-teal mb-6 tracking-tight">
  {headline}
</h2>
```

**Replace with**:
```tsx
<h2 className="text-2xl md:text-3xl font-serif font-bold text-teal mb-8 tracking-tight">
  {headline}
</h2>
```

**Why**: Larger headline to match editorial card weight.

### Step 2.6: Replace Lines 37–64 — Entire Grid Block

**Delete lines 37–64** (everything from `{/* 4-Card Grid */}` through the grid closing `</div>`).

**Replace with**:

```tsx
{/* a1+3 Editorial Card Grid */}
<div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
  {/* HERO CARD — benefits[0], spans 2 columns on lg */}
  {benefits[0] && (
    <a
      href={benefits[0].link || '#'}
      className="lg:col-span-2 lg:row-span-2 group relative rounded-2xl overflow-hidden min-h-[320px] sm:min-h-[400px] lg:min-h-[500px] focus-visible:ring-2 focus-visible:ring-coffee-red focus-visible:ring-offset-2"
    >
      {/* Background image */}
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

      {/* Gradient overlay — left-to-right like screenshot */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />

      {/* Text content — bottom-left */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 lg:p-10">
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white mb-3 leading-tight drop-shadow-lg">
          {benefits[0].title}
        </h3>
        <p className="text-sm sm:text-base text-white/85 mb-5 max-w-lg leading-relaxed drop-shadow">
          {benefits[0].description}
        </p>
        {benefits[0].cta && (
          <span className="inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-white group-hover:text-coffee-red transition-colors duration-200">
            {benefits[0].cta}
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </span>
        )}
      </div>
    </a>
  )}

  {/* SMALL CARDS — benefits[1], [2], [3] */}
  {benefits.slice(1).map((benefit) => (
    <a
      key={benefit.id}
      href={benefit.link || '#'}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col focus-visible:ring-2 focus-visible:ring-coffee-red focus-visible:ring-offset-2"
    >
      {/* Image container */}
      <div className="relative aspect-[16/10] overflow-hidden">
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

      {/* Text body */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-base font-bold text-teal mb-1.5 leading-snug group-hover:text-coffee-red transition-colors duration-200">
          {benefit.title}
        </h3>
        <p className="text-sm text-teal/60 leading-relaxed mb-4 flex-1">
          {benefit.description}
        </p>
        {benefit.cta && (
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-coffee-red group-hover:underline transition-all duration-200">
            {benefit.cta}
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </span>
        )}
      </div>
    </a>
  ))}
</div>
```

### Step 2.7: Verify Complete File

After all edits, the file should contain exactly this (130 lines):

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
  return (
    <section id="why-choose-us-hero" className="py-12 md:py-16 bg-linen-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-teal mb-8 tracking-tight">
          {headline}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* HERO CARD */}
          {benefits[0] && (
            <a
              href={benefits[0].link || '#'}
              className="lg:col-span-2 lg:row-span-2 group relative rounded-2xl overflow-hidden min-h-[320px] sm:min-h-[400px] lg:min-h-[500px] focus-visible:ring-2 focus-visible:ring-coffee-red focus-visible:ring-offset-2"
            >
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
              <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 lg:p-10">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white mb-3 leading-tight drop-shadow-lg">
                  {benefits[0].title}
                </h3>
                <p className="text-sm sm:text-base text-white/85 mb-5 max-w-lg leading-relaxed drop-shadow">
                  {benefits[0].description}
                </p>
                {benefits[0].cta && (
                  <span className="inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-white group-hover:text-coffee-red transition-colors duration-200">
                    {benefits[0].cta}
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                )}
              </div>
            </a>
          )}

          {/* SMALL CARDS */}
          {benefits.slice(1).map((benefit) => (
            <a
              key={benefit.id}
              href={benefit.link || '#'}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col focus-visible:ring-2 focus-visible:ring-coffee-red focus-visible:ring-offset-2"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
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
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-base font-bold text-teal mb-1.5 leading-snug group-hover:text-coffee-red transition-colors duration-200">
                  {benefit.title}
                </h3>
                <p className="text-sm text-teal/60 leading-relaxed mb-4 flex-1">
                  {benefit.description}
                </p>
                {benefit.cta && (
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-coffee-red group-hover:underline transition-all duration-200">
                    {benefit.cta}
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </span>
                )}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
```

### Step 2.8: Verify No Unused Imports

After editing, grep for any remaining Lucide references:
```bash
grep -n "MapPin\|Tag\|Star\|Headphones" src/components/home/WhyChooseUsHero.tsx
```

**Expected output**: No matches (empty).

**If matches found**: The old import on line 6 was not replaced. Fix: re-read file and replace line 6.

---

## Task 3: Homepage Integration — No Changes Needed

**File**: `src/pages/Homepage.tsx`
**Lines**: 105–109

```tsx
<WhyChooseUsHero
  headline={homeData.whyChooseUsHero.headline}
  benefits={homeData.whyChooseUsHero.benefits}
/>
```

**Why no changes**: The new `image`, `link`, `cta` fields flow through the existing `benefits` prop automatically. The component handles optional fields with fallbacks.

**Verify**: Read Homepage.tsx lines 105–109 after Task 1 & 2. Confirm the `<WhyChooseUsHero>` tag is unchanged.

---

## Error-Proofing Checklist

### Before Starting

- [ ] Read `src/content/home.json` lines 87–111 — confirm `whyChooseUsHero` block location
- [ ] Read `src/components/home/WhyChooseUsHero.tsx` — confirm 68 lines, matches line references above
- [ ] Run `npx tsc --noEmit` — confirm 0 errors (clean baseline)

### After Task 1 (home.json)

- [ ] Validate JSON: `node -e "JSON.parse(require('fs').readFileSync('src/content/home.json','utf8')); console.log('JSON valid')"`
- [ ] Confirm output: `JSON valid`
- [ ] Read lines 87–130 — confirm all 4 benefits have `image`, `link`, `cta` fields
- [ ] Confirm Card 3 title is `"Powered by Sphere Tour & Travel"` (not `"500+ Five-Star Reviews"`)
- [ ] Confirm Card 3 description mentions "senior tourism experts" and "Sphere Tour & Travel"
- [ ] Confirm all 4 image paths start with `/images/` and end with `.jpg`
- [ ] Confirm all 4 link paths start with `/` and end with `/`
- [ ] Confirm no trailing commas after the last `}` before `]` on line ~110

### After Task 2 (WhyChooseUsHero.tsx)

- [ ] Confirm file starts with license header (lines 1–4)
- [ ] Confirm line 6 imports only `ArrowRight` (not `MapPin, Tag, Star, Headphones`)
- [ ] Confirm `ICONS` and `ICON_COLORS` constants are deleted (were lines 17–23)
- [ ] Confirm interface has `image?: string; link?: string; cta?: string;`
- [ ] Confirm section className is `py-12 md:py-16 bg-linen-white` (no `border-b`)
- [ ] Confirm grid className is `grid grid-cols-1 lg:grid-cols-3 gap-5` (not `lg:grid-cols-4`)
- [ ] Confirm hero card has `lg:col-span-2 lg:row-span-2`
- [ ] Confirm hero card has `loading="eager"` and `fetchPriority="high"`
- [ ] Confirm small cards have `loading="lazy"`
- [ ] Confirm all `<a>` tags have `focus-visible:ring-2 focus-visible:ring-coffee-red focus-visible:ring-offset-2`
- [ ] Confirm all `<img>` tags have `alt={benefit.title}`
- [ ] Confirm no references to `ICONS`, `ICON_COLORS`, `MapPin`, `Tag`, `Star`, `Headphones`

### After Both Tasks

- [ ] Run `npx tsc --noEmit` — confirm 0 errors
- [ ] Run `npm run build` — confirm build succeeds
- [ ] Verify no new JS chunks created (same chunk count as before)

---

## Responsive Layout Verification

### lg+ (1024px+)
- Hero card: spans 2 columns, 2 rows (left side)
- 3 small cards: fill remaining column (right side, stacked + 1 below)
- Grid: `grid-cols-3`

### md (768px–1023px)
- Hero card: full width, reduced height
- 3 small cards: 3-column row below hero
- Grid: `grid-cols-3` (hero breaks out via block flow)

### sm (< 768px)
- All 4 cards: stacked vertically
- Hero card: `min-h-[320px]`
- Small cards: full width, `aspect-[16/10]` images
- Grid: `grid-cols-1`

---

## Accessibility Verification

| Check | Implementation | How to Verify |
|-------|---------------|---------------|
| Keyboard navigation | All cards are `<a>` tags | Tab through 4 cards, Enter activates |
| Focus visible | `focus-visible:ring-2 ring-coffee-red ring-offset-2` | Tab to each card, confirm blue ring appears |
| Alt text | `alt={benefit.title}` | Inspect each `<img>` in DevTools |
| Link semantics | Native `<a href>` | No `onClick` handlers — pure links |
| Color contrast | White on black/85 overlay | Hero text passes WCAG AA (ratio > 7:1) |
| Reduced motion | Tailwind `transition-*` respects `prefers-reduced-motion` | Enable in OS settings, verify no animation |

---

## Performance Verification

| Check | Expected | How to Verify |
|-------|----------|---------------|
| Hero image | Eager load, high priority | `<img loading="eager" fetchPriority="high">` |
| Small card images | Lazy load | `<img loading="lazy">` |
| New network requests | 4 images (existing) | Network tab in DevTools |
| New JS chunks | 0 | Build output — same chunk count |
| Bundle size | No increase | Build output — compare before/after |

---

## Card 3 Content — Sphere Tour & Travel

### Before
```
Title: 500+ Five-Star Reviews
Description: Trusted by travelers on TripAdvisor and Google
Image: (none — icon only)
Link: (none)
CTA: (none)
```

### After
```
Title: Powered by Sphere Tour & Travel
Description: Founded and operated by senior tourism experts of Addis Ababa.
             Over a decade of local expertise, licensed guides, and 500+ five-star reviews.
Image: /images/about/cooking.jpg
Link: /about/
CTA: Our Story
```

### Content Justification

| Element | Choice | Rationale |
|---------|--------|-----------|
| Title | "Powered by Sphere Tour & Travel" | Names parent company, implies backing |
| Description sentence 1 | "Founded and operated by senior tourism experts of Addis Ababa" | Establishes authority + location |
| Description sentence 2 | "Over a decade of local expertise, licensed guides, and 500+ five-star reviews" | Quantifies credibility (retains original social proof) |
| Image | `cooking.jpg` | Ethiopian hospitality — aligns with "expertise + service" |
| Link | `/about/` | About page tells full Sphere Tour & Travel story |
| CTA | "Our Story" | Invites deep-dive into company background |

---

## Fallback Behavior

All new fields are optional — component degrades gracefully:

| Scenario | Behavior |
|----------|----------|
| `image` missing | Solid `bg-teal` background (hero) or `bg-sandstone` (small card) |
| `link` missing | `href="#"` — no-op link |
| `cta` missing | CTA span not rendered |
| `benefits[0]` missing | Hero card not rendered |
| `benefits` has < 4 items | Only available cards render |
| `benefits` empty | Section renders headline only |

---

## Files Changed Summary

| File | Lines Before | Lines After | Change |
|------|-------------|-------------|--------|
| `src/content/home.json` | 239 | ~249 | +10 lines (3 new fields × 4 benefits, expanded descriptions) |
| `src/components/home/WhyChooseUsHero.tsx` | 68 | ~130 | +62 lines (full rewrite) |
| `src/pages/Homepage.tsx` | 220 | 220 | No change |

**Net**: +72 lines across 2 files. 0 new files. 0 new dependencies.

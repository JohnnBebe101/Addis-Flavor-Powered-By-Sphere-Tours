# Plan: Enhance "Choose Your Adventure" Category Cards

## Objective
Enhance the 3 category cards (City Tours, Day Trips, Private & Custom) in the `TourCategorySelector` component to visually match the tour card redesign style — consistent card shape, shadow, spacing, typography, and color treatment.

---

## Target File
**`src/components/home/TourCategorySelector.tsx`** (62 lines total)

This is the only file that needs changes. All edits are within this single file.

---

## Current Card Structure (Before)

```
┌─────────────────────────────┐
│                             │
│  [Icon w-14 h-14 gold box]  │
│  City Tours                 │ ← text-xl, font-serif
│  Half-day and full-day...   │ ← text-sm, text-teal/70
│                             │
│  From $42      Explore →    │ ← font-mono, text-gold, no divider
│                             │
└─────────────────────────────┘
  padding: p-8 (32px)
  shadow: none (only on hover)
  border: hover:border-gold/40
```

## Proposed Card Structure (After — matching tour card style)

```
┌─────────────────────────────┐
│                             │
│  [Icon w-14 h-14 gold box]  │ ← unchanged
│  City Tours                 │ ← text-base, font-sans
│  Half-day and full-day...   │ ← text-xs, text-teal/60, line-clamp-3
│                             │
│  ─────────────────────────  │ ← NEW: pt-3 border-t border-teal/10
│  From $42      Explore →    │ ← text-sm, text-coffee-red, font-sans
│                             │
└─────────────────────────────┘
  padding: p-6 (24px)
  shadow: shadow-sm (default)
  border: removed hover:border-gold/40
```

---

## Step-by-Step Execution Guide

### Step 1: Open the file
Open `src/components/home/TourCategorySelector.tsx` in your editor.

---

### Step 2: Edit the card container `<a>` tag (line 38)

**Find this exact line (line 38):**
```tsx
className="group relative p-8 rounded-2xl border border-teal/10 bg-linen-white hover:border-gold/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
```

**Replace with:**
```tsx
className="group relative p-6 rounded-2xl border border-teal/10 bg-linen-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
```

**What changed:**
| Property | Before | After | Why |
|----------|--------|-------|-----|
| padding | `p-8` (32px) | `p-6` (24px) | Tighter, matches tour card `p-4` feel |
| shadow | none | `shadow-sm` | Matches tour card default shadow |
| hover border | `hover:border-gold/40` | removed | Cleaner hover — shadow-only |

---

### Step 3: Skip the icon container (line 40) — NO CHANGE

**Current (line 40):**
```tsx
className="w-14 h-14 rounded-2xl bg-gold/10 text-gold flex items-center justify-center mb-4 group-hover:bg-gold group-hover:text-teal transition-all duration-300"
```

**Action:** Do NOT edit this line. The icon box already matches the desired style.

---

### Step 4: Edit the title `<h3>` (line 43)

**Find this exact line (line 43):**
```tsx
<h3 className="text-xl font-serif font-bold text-teal group-hover:text-coffee-red transition-colors mb-2">
```

**Replace with:**
```tsx
<h3 className="text-base font-sans font-bold text-teal group-hover:text-coffee-red transition-colors mb-1">
```

**What changed:**
| Property | Before | After | Why |
|----------|--------|-------|-----|
| font-size | `text-xl` (20px) | `text-base` (16px) | Matches tour card title size |
| font-family | `font-serif` (Playfair Display) | `font-sans` (DM Sans) | More modern, matches tour card |
| margin-bottom | `mb-2` (8px) | `mb-1` (4px) | Tighter spacing to description |

---

### Step 5: Edit the description `<p>` (line 46)

**Find this exact line (line 46):**
```tsx
<p className="text-sm text-teal/70 leading-relaxed mb-4">{category.description}</p>
```

**Replace with:**
```tsx
<p className="text-xs text-teal/60 leading-relaxed line-clamp-3 mb-4">{category.description}</p>
```

**What changed:**
| Property | Before | After | Why |
|----------|--------|-------|-----|
| font-size | `text-sm` (14px) | `text-xs` (12px) | Smaller, matches tour card info rows |
| color opacity | `text-teal/70` | `text-teal/60` | Slightly muted |
| line-clamp | none | `line-clamp-3` | Prevents long descriptions from breaking card height |

---

### Step 6: Edit the footer row (lines 47-54)

**Find this exact block (lines 47-54):**
```tsx
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-gold font-bold">{category.priceFrom}</span>
                <span className="font-mono text-xs text-coffee-red group-hover:text-gold transition-colors flex items-center gap-1">
                  Explore
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </div>
```

**Replace with:**
```tsx
              <div className="pt-3 border-t border-teal/10">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-coffee-red font-sans">{category.priceFrom}</span>
                  <span className="text-xs text-teal/60 group-hover:text-coffee-red transition-colors flex items-center gap-1 font-sans">
                    Explore
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </div>
```

**What changed:**
| Element | Before | After | Why |
|---------|--------|-------|-----|
| Outer wrapper | `div.flex` | `div.pt-3.border-t.border-teal/10` wrapping a `div.flex` | Adds top border divider matching tour card |
| Price | `font-mono text-xs text-gold font-bold` | `text-sm font-bold text-coffee-red font-sans` | Larger, red, matches tour card price color |
| CTA | `font-mono text-xs text-coffee-red` | `text-xs text-teal/60 group-hover:text-coffee-red font-sans` | More subtle default state, sans font |
| Arrow wrapper | separate `<span>` with padding | inline `<span>` (no padding) | Cleaner inline arrow |

---

## Complete File After All Edits

The final `TourCategorySelector.tsx` should look like this (62 lines → ~62 lines, no lines added or removed, only classes changed):

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
    icon: React.ReactNode;
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
    <section id="tour-category-selector" className="py-16 bg-sandstone/10 border-b border-teal/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-5xl font-serif tracking-tight mb-4">{headline}</h2>
          <div className="w-24 h-1 bg-coffee-red mx-auto mb-4 rounded-full" />
          <p className="text-sm opacity-80 leading-relaxed font-sans">{subheadline}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {categories.map((category, _index) => (
            <a
              key={category.id}
              href={category.link}
              className="group relative p-6 rounded-2xl border border-teal/10 bg-linen-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-gold/10 text-gold flex items-center justify-center mb-4 group-hover:bg-gold group-hover:text-teal transition-all duration-300">
                {category.icon}
              </div>
              <h3 className="text-base font-sans font-bold text-teal group-hover:text-coffee-red transition-colors mb-1">
                {category.title}
              </h3>
              <p className="text-xs text-teal/60 leading-relaxed line-clamp-3 mb-4">{category.description}</p>
              <div className="pt-3 border-t border-teal/10">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-coffee-red font-sans">{category.priceFrom}</span>
                  <span className="text-xs text-teal/60 group-hover:text-coffee-red transition-colors flex items-center gap-1 font-sans">
                    Explore
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
```

---

## Edit Checklist

| # | Line | Element | Before | After | Done? |
|---|------|---------|--------|-------|-------|
| 1 | 38 | Card `<a>` | `p-8 ... hover:border-gold/40` | `p-6 ... shadow-sm` | ☐ |
| 2 | 40 | Icon `<div>` | — | NO CHANGE | ☐ |
| 3 | 43 | Title `<h3>` | `text-xl font-serif ... mb-2` | `text-base font-sans ... mb-1` | ☐ |
| 4 | 46 | Description `<p>` | `text-sm text-teal/70` | `text-xs text-teal/60 line-clamp-3` | ☐ |
| 5 | 47-54 | Footer `<div>` | flat flex row | `pt-3 border-t` wrapper + restyled | ☐ |

---

## Verification

After all edits:
1. Run `npx tsc --noEmit` → expect 0 errors
2. Run `npm run build` → expect clean build
3. Hard refresh browser (`Ctrl+Shift+R`) to clear cache
4. Visual check on localhost:3000:
   - Category cards have `shadow-sm` by default (not just on hover)
   - Titles are `text-base` (16px) not `text-xl` (20px)
   - Titles use DM Sans (sans-serif) not Playfair Display (serif)
   - Descriptions are `text-xs` (12px) with max 3 lines
   - Price is red (`text-coffee-red`) not gold
   - A thin border divider appears above the price row
   - All 3 cards look consistent with each other

---

## What This Does NOT Change
- No new data fields added to home.json
- No new components created
- No new dependencies installed
- No changes to Homepage.tsx (icon mapping stays the same)
- No changes to TourCardGrid.tsx
- Card links remain the same (/tours/?category=city-tours, /tours/?category=day-trips, /custom-tour/)
- Section heading and subheading unchanged
- Grid layout unchanged (1 col mobile, 3 cols desktop)

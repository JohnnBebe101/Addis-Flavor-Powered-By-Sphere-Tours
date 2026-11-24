# Plan: Fix Hero Section Spacing, Padding & Alignment

## Objective
Fix horizontal alignment, vertical alignment, and spacing for headlines, subheadlines, and search bar in the hero section. Address: (1) content not aligned to top, (2) unused space below search bar, (3) inconsistent max-widths, (4) inconsistent horizontal padding.

---

## Current Issues

| Issue | Root Cause |
|-------|-----------|
| Headlines/subheadline/search bar not aligned to top | `<header>` uses `flex items-center` — centers everything vertically |
| Unused space below search bar | `min-h-screen` + `items-center` pushes content to middle, wasting bottom half |
| Headlines & search bar not horizontally aligned | Headlines in `max-w-4xl` (896px), subtitle in `max-w-2xl` (672px), search bar in `max-w-3xl` (768px) — three different widths |
| Inconsistent internal padding | Sub-tabs use `px-4`, input row uses `px-5`, trust signals use `px-2` — creates visual misalignment |

---

## File Change Summary

| # | File | Lines | What Changes |
|---|------|-------|-------------|
| 1 | `src/components/home/HeroBanner.tsx` | 112 | `<header>`: `items-center` → `items-start`, add `pt-[12vh]` |
| 2 | `src/components/home/HeroBanner.tsx` | 144 | Main container: `max-w-4xl` → `max-w-3xl`, remove `space-y-6` |
| 3 | `src/components/home/HeroBanner.tsx` | 146 | Per-slide div: `space-y-4` → `space-y-2` |
| 4 | `src/components/home/HeroBanner.tsx` | 164 | Subtitle: remove `max-w-2xl mx-auto` (parent `max-w-3xl` handles width) |
| 5 | `src/components/home/HeroBanner.tsx` | 172 | Search bar wrapper: remove `max-w-3xl mx-auto pt-4` (parent handles width) |
| 6 | `src/components/home/HeroBanner.tsx` | 207 | Sub-tabs row: `px-4` → `px-4` (keep — consistent with form) |
| 7 | `src/components/home/HeroBanner.tsx` | 228 | Input row: `px-5` → `px-4` (match sub-tabs) |
| 8 | `src/components/home/HeroBanner.tsx` | 258 | Trust signals: `px-2` → `px-4` (match sub-tabs and input) |
| 9 | `src/components/home/HeroBanner.tsx` | 314 | Slide indicators: `bottom-6` → `bottom-4` (tighten bottom spacing) |

---

## Detailed Edits

### Edit 1: Header — align to top, add top padding

**File:** `src/components/home/HeroBanner.tsx`, line 112

**Current:**
```html
className="relative min-h-screen flex items-center justify-center bg-cover bg-center overflow-hidden"
```

**Proposed:**
```html
className="relative min-h-screen flex items-start justify-center bg-cover bg-center overflow-hidden pt-[12vh]"
```

**Why:**
- `items-start` — aligns content to top instead of center
- `pt-[12vh]` — adds 12% of viewport height as top padding, giving breathing room from the top without wasting the bottom. This is better than a fixed `pt-*` because it scales with viewport size.
- Keeps `min-h-screen` so the hero still fills the viewport
- Content now starts near the top and flows downward, leaving minimal wasted space below

---

### Edit 2: Main container — unify max-width, remove spacing

**File:** `src/components/home/HeroBanner.tsx`, line 144

**Current:**
```html
className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 space-y-6"
```

**Proposed:**
```html
className="relative z-10 max-w-3xl mx-auto text-center px-4 sm:px-6 lg:px-8"
```

**Why:**
- `max-w-4xl` (896px) → `max-w-3xl` (768px) — aligns the parent container with the search bar's width, so headlines and search bar share the same horizontal boundary
- Remove `space-y-6` — the 24px gap between text block and search bar is now handled by the subtitle's bottom margin (Edit 4) and the search bar wrapper's top padding (removed in Edit 5). This gives more precise control.

---

### Edit 3: Per-slide text block — tighten internal spacing

**File:** `src/components/home/HeroBanner.tsx`, line 146

**Current:**
```html
className="space-y-4"
```

**Proposed:**
```html
className="space-y-2"
```

**Why:**
- `space-y-4` (16px between badge, headline, subtitle) → `space-y-2` (8px) — tighter grouping of the headline block so it reads as one cohesive unit, reducing the vertical gap that pushes content down

---

### Edit 4: Subtitle — remove redundant max-width

**File:** `src/components/home/HeroBanner.tsx`, line 164

**Current:**
```html
className="text-xs sm:text-sm text-sandstone max-w-2xl mx-auto font-sans font-light leading-relaxed animate-hero-slide-up"
```

**Proposed:**
```html
className="text-xs sm:text-sm text-sandstone font-sans font-light leading-relaxed animate-hero-slide-up mb-2"
```

**Why:**
- Remove `max-w-2xl mx-auto` — the parent is now `max-w-3xl`, so the subtitle doesn't need its own narrower constraint. It will naturally fill the parent width, aligning with the headline above and the search bar below.
- Add `mb-2` — 8px bottom margin on the subtitle creates the gap between the text block and the search bar, replacing the removed `space-y-6`.

---

### Edit 5: Search bar wrapper — remove redundant width/centering

**File:** `src/components/home/HeroBanner.tsx`, line 172

**Current:**
```html
className="max-w-3xl mx-auto pt-4 animate-hero-slide-up"
```

**Proposed:**
```html
className="animate-hero-slide-up"
```

**Why:**
- Remove `max-w-3xl mx-auto` — the parent is now `max-w-3xl mx-auto`, so this wrapper inherits the width automatically. No need to re-declare it.
- Remove `pt-4` — the 16px top padding was creating extra gap. The subtitle's `mb-2` (Edit 4) now handles the spacing between text and search bar.

---

### Edit 6: Sub-tabs row — keep px-4 (no change needed)

**File:** `src/components/home/HeroBanner.tsx`, line 207

**Current:**
```html
className="flex items-center gap-1 px-4 py-2.5 border-b border-linen-white/10 overflow-x-auto"
```

**Proposed:** No change — `px-4` is already correct and matches the new input row padding.

---

### Edit 7: Input row — align padding

**File:** `src/components/home/HeroBanner.tsx`, line 228

**Current:**
```html
className="flex items-center px-5 py-4"
```

**Proposed:**
```html
className="flex items-center px-4 py-4"
```

**Why:**
- `px-5` (20px) → `px-4` (16px) — matches the sub-tabs row `px-4`, creating consistent horizontal alignment across all rows in the search form

---

### Edit 8: Trust signals — align padding

**File:** `src/components/home/HeroBanner.tsx`, line 258

**Current:**
```html
className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4 px-2"
```

**Proposed:**
```html
className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4"
```

**Why:**
- `px-2` (8px) → `px-4` (16px) — matches the sub-tabs and input row padding, so trust signals align horizontally with the rest of the search form content
- Remove `mt-4` — unnecessary now that the parent has no `space-y-6` and the search button provides natural spacing

---

### Edit 9: Slide indicators — tighten bottom position

**File:** `src/components/home/HeroBanner.tsx`, line 314

**Current:**
```html
className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2"
```

**Proposed:**
```html
className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2"
```

**Why:**
- `bottom-6` (24px) → `bottom-4` (16px) — moves indicators closer to the bottom edge, reclaiming vertical space that was previously "unused" below the search bar

---

## Visual Result (Before vs After)

### Before:
```
┌─────────────────────────────────────────────┐
│                                             │ ← huge gap (items-center)
│                                             │
│         [headlines]                         │
│                                             │
│     [search bar - max-w-3xl]                │ ← different width from headlines
│                                             │
│                                             │ ← huge gap (items-center)
└─────────────────────────────────────────────┘
```

### After:
```
┌─────────────────────────────────────────────┐
│ pt-[12vh]                                   │ ← proportional top padding
│  [headlines - max-w-3xl]                    │ ← same width as search bar
│  [search bar - max-w-3xl]                   │ ← aligned horizontally
│  [trust signals]                            │ ← aligned horizontally
│                                             │
│                                    [dots]    │ ← bottom-4 (tighter)
└─────────────────────────────────────────────┘
```

---

## Verification
1. `npx tsc --noEmit` → 0 errors
2. `npm run build` → clean build
3. Visual check:
   - Headlines, subtitle, and search bar all share the same horizontal boundary (max-w-3xl)
   - Content starts near the top with proportional padding
   - Minimal unused space below the search bar
   - Internal padding (sub-tabs, input, trust signals) is consistent at px-4

---

## What This Does NOT Change
- No new components
- No new dependencies
- No logic changes
- No font-size changes (already done in previous plan)
- No color changes
- Only layout/spacing/alignment classes modified

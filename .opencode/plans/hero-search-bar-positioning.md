# Plan: Hero Search Bar Positioning & Mobile Optimization

## Objective
1. Lower the hero search bar to sit in the lower-center portion of the hero viewport (currently it's too high)
2. Position headline and subheadline with proper spacing above the search bar
3. Make the entire hero search experience mobile-friendly

---

## Target File
**`src/components/home/HeroBanner.tsx`** (336 lines)

---

## Current Layout Analysis

```
┌─────────────────────────────────────────────┐
│  ← pt-[12vh] →                              │  ← too little top padding
│                                             │
│  [Announcement Badge]                       │  ← items-start: content sticks to top
│  [Headline]                                 │  ← text-xl sm:text-3xl
│  [Subtitle]                                 │  ← text-xs sm:text-sm, space-y-2
│                                             │
│  [Category Tabs - OUTSIDE box]              │  ← mb-4
│  ┌─────────────────────────────────┐        │
│  │ Sub-tabs (All/City/Private)     │        │  ← Row 1 inside box
│  │ ─────────────────────────────── │        │
│  │ 🔍 Search Tours                 │        │  ← Row 2 inside box
│  │ [input field]                   │        │
│  │ ═══════════════════════════════ │        │
│  │ [SEARCH BUTTON - full width]    │        │  ← Row 3 inside box
│  └─────────────────────────────────┘        │
│  [Trust Signals] [Action Links]             │
│                                             │
│  ◀ arrow                        arrow ▶    │  ← absolute center
│                                             │
│  ● ● ● ●                                   │  ← absolute bottom-4
└─────────────────────────────────────────────┘
        ▓▓▓▓▓▓▓▓▓▓ gradient ▓▓▓▓▓▓▓▓▓▓
```

**Problems:**
- `pt-[12vh]` with `items-start` pushes content too high
- `space-y-2` between badge/headline/subtitle is too tight
- No spacing between subtitle and search bar
- Category tabs + search box + trust signals are cramped
- Mobile: category tabs overflow, sub-tabs overflow, search input lacks focus states

---

## Proposed Layout

```
┌─────────────────────────────────────────────┐
│                                             │
│  (empty space — visual breathing room)      │
│                                             │
│  [Announcement Badge]                       │
│  [Headline - slightly larger]               │
│  [Subtitle - more spacing]                  │
│                                             │  ← mt-6 gap before search
│  [Category Tabs - scrollable on mobile]     │
│  ┌─────────────────────────────────┐        │
│  │ Sub-tabs (scrollable)           │        │
│  │ ─────────────────────────────── │        │
│  │ 🔍 Search Tours                 │        │
│  │ [input field]                   │        │
│  │ ═══════════════════════════════ │        │
│  │ [SEARCH]                        │        │  ← shorter text on mobile
│  └─────────────────────────────────┘        │
│  [Trust Signals] [Action Links]             │
│                                             │
│  ◀ arrow                        arrow ▶    │
│  ● ● ● ●                                   │
└─────────────────────────────────────────────┘
        ▓▓▓▓▓▓▓▓▓▓ gradient ▓▓▓▓▓▓▓▓▓▓
```

---

## Step-by-Step Execution Guide

### Step 1: Change header layout to center content vertically (line 112)

**Current (line 112):**
```tsx
className="relative min-h-screen flex items-start justify-center bg-cover bg-center overflow-hidden pt-[12vh]"
```

**Replace with:**
```tsx
className="relative min-h-screen flex items-center justify-center bg-cover bg-center overflow-hidden py-[15vh]"
```

**Why:** `items-center` + `py-[15vh]` centers the content block vertically within the hero, pushing the search bar to the lower-center area. The `py-[15vh]` adds top/bottom padding so content doesn't touch edges.

---

### Step 2: Increase spacing between text elements (line 146)

**Current (line 146):**
```tsx
<div key={activeSlide} className="space-y-2">
```

**Replace with:**
```tsx
<div key={activeSlide} className="space-y-4">
```

**Why:** `space-y-4` (16px) gives more breathing room between badge, headline, and subtitle compared to `space-y-2` (8px).

---

### Step 3: Increase headline size (line 155)

**Current (line 155):**
```tsx
className="text-xl sm:text-3xl font-serif font-bold text-linen-white tracking-tight leading-tight uppercase animate-hero-slide-up"
```

**Replace with:**
```tsx
className="text-2xl sm:text-4xl font-serif font-bold text-linen-white tracking-tight leading-tight uppercase animate-hero-slide-up"
```

**Why:** Bumping from `text-xl` to `text-2xl` on mobile and `text-3xl` to `text-4xl` on desktop gives the headline more visual weight now that it has more space.

---

### Step 4: Add spacing between subtitle and search bar (line 172)

**Current (line 172):**
```tsx
<div className="animate-hero-slide-up" style={{ animationDelay: '350ms' }}>
```

**Replace with:**
```tsx
<div className="animate-hero-slide-up mt-8" style={{ animationDelay: '350ms' }}>
```

**Why:** `mt-8` (32px) creates a clear visual separation between the hero text and the search widget.

---

### Step 5: Make category tabs mobile-friendly (lines 174-192)

**Current (line 174):**
```tsx
<div className="flex items-center justify-center gap-2 mb-4 overflow-x-auto pb-1">
```

**Replace with:**
```tsx
<div className="flex items-center justify-center gap-1 sm:gap-2 mb-4 overflow-x-auto pb-1 scrollbar-hide">
```

And update each tab button (line 181):

**Current (line 181):**
```tsx
className={`flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-mono whitespace-nowrap transition-all duration-300 ${
```

**Replace with:**
```tsx
className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-4 py-2 sm:py-2.5 rounded-lg text-[10px] sm:text-xs font-mono whitespace-nowrap transition-all duration-300 ${
```

**Why:** Smaller padding (`px-2.5`) and font (`text-[10px]`) on mobile allows more tabs to fit. `gap-1` reduces spacing. `scrollbar-hide` hides the scrollbar on overflow.

---

### Step 6: Make sub-tabs scrollable on mobile (lines 207-225)

**Current (line 207):**
```tsx
<div className="flex items-center gap-1 px-4 py-2.5 border-b border-linen-white/10 overflow-x-auto">
```

**Replace with:**
```tsx
<div className="flex items-center gap-1 px-3 sm:px-4 py-2 sm:py-2.5 border-b border-linen-white/10 overflow-x-auto scrollbar-hide">
```

And update sub-tab button size (line 214):

**Current (line 214):**
```tsx
className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] font-mono whitespace-nowrap transition-all duration-300 ${
```

**Replace with:**
```tsx
className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-md text-[10px] sm:text-[11px] font-mono whitespace-nowrap transition-all duration-300 ${
```

**Why:** Smaller padding and font on mobile. `scrollbar-hide` for overflow.

---

### Step 7: Make search input row compact on mobile (lines 228-245)

**Current (line 228):**
```tsx
<div className="flex items-center px-4 py-4">
```

**Replace with:**
```tsx
<div className="flex items-center px-3 sm:px-4 py-3 sm:py-4">
```

**Why:** Reduces padding on mobile for a more compact feel.

---

### Step 8: Make search button shorter text on mobile (lines 248-254)

**Current (lines 248-254):**
```tsx
<button
  type="submit"
  className="w-full bg-coffee-red hover:bg-coffee-red/90 text-linen-white font-mono text-sm uppercase font-black tracking-wider py-4 transition-all duration-300 transform active:scale-[0.98] shadow-[0_2px_12px_rgba(166,50,50,0.4)] hover:shadow-[0_4px_20px_rgba(166,50,50,0.5)] flex items-center justify-center gap-2"
>
  <Search className="w-4 h-4" />
  <span>Search</span>
</button>
```

**Replace with:**
```tsx
<button
  type="submit"
  className="w-full bg-coffee-red hover:bg-coffee-red/90 text-linen-white font-mono text-xs sm:text-sm uppercase font-black tracking-wider py-3 sm:py-4 transition-all duration-300 transform active:scale-[0.98] shadow-[0_2px_12px_rgba(166,50,50,0.4)] hover:shadow-[0_4px_20px_rgba(166,50,50,0.5)] flex items-center justify-center gap-2"
>
  <Search className="w-4 h-4" />
  <span>Search Tours</span>
</button>
```

**Why:** `text-xs sm:text-sm` and `py-3 sm:py-4` make the button smaller on mobile. "Search Tours" is more descriptive.

---

### Step 9: Make trust signals & action links wrap on mobile (lines 258-293)

**Current (line 258):**
```tsx
<div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4">
```

**Replace with:**
```tsx
<div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3 px-3 sm:px-4 mt-3">
```

**Why:** `mt-3` adds spacing below the search box. `px-3 sm:px-4` tighter on mobile.

---

### Step 10: Reposition navigation arrows for search bar clearance (lines 297-311)

**Current (line 299):**
```tsx
className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-linen-white/25 border border-linen-white/40 text-linen-white hover:bg-linen-white/40 hover:text-gold transition-all duration-300 z-20 shadow-[0_2px_12px_rgba(0,0,0,0.4)]"
```

**Replace with (left arrow):**
```tsx
className="absolute left-3 sm:left-6 top-[40%] -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-linen-white/25 border border-linen-white/40 text-linen-white hover:bg-linen-white/40 hover:text-gold transition-all duration-300 z-20 shadow-[0_2px_12px_rgba(0,0,0,0.4)]"
```

**Current (line 307):**
```tsx
className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-linen-white/25 border border-linen-white/40 text-linen-white hover:bg-linen-white/40 hover:text-gold transition-all duration-300 z-20 shadow-[0_2px_12px_rgba(0,0,0,0.4)]"
```

**Replace with (right arrow):**
```tsx
className="absolute right-3 sm:right-6 top-[40%] -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-linen-white/25 border border-linen-white/40 text-linen-white hover:bg-linen-white/40 hover:text-gold transition-all duration-300 z-20 shadow-[0_2px_12px_rgba(0,0,0,0.4)]"
```

**Why:** Moving arrows from `top-1/2` to `top-[40%]` positions them slightly above center, clearing the search bar. Smaller padding on mobile.

---

### Step 11: Add scrollbar-hide utility class (index.css)

**Add at the end of `src/index.css` (before the closing):**
```css
/* Hide scrollbar for horizontal scroll containers */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
```

**Note:** The `.no-scrollbar` class already exists (lines 41-47), but we'll use `scrollbar-hide` as a more semantic name. Alternatively, we could use the existing `no-scrollbar` class instead of adding a new one.

**Decision:** Use the existing `no-scrollbar` class instead to avoid duplication. Update Steps 5, 6 to use `no-scrollbar` instead of `scrollbar-hide`.

---

## Edit Checklist

| # | Line(s) | What to Do | Done? |
|---|---------|------------|-------|
| 1 | 112 | Change `items-start pt-[12vh]` → `items-center py-[15vh]` | ☐ |
| 2 | 146 | Change `space-y-2` → `space-y-4` | ☐ |
| 3 | 155 | Change `text-xl sm:text-3xl` → `text-2xl sm:text-4xl` | ☐ |
| 4 | 172 | Add `mt-8` to search bar wrapper | ☐ |
| 5 | 174, 181 | Category tabs: smaller gap/padding/font on mobile, add `no-scrollbar` | ☐ |
| 6 | 207, 214 | Sub-tabs: smaller padding/font on mobile, add `no-scrollbar` | ☐ |
| 7 | 228 | Search input: `px-3 sm:px-4 py-3 sm:py-4` | ☐ |
| 8 | 250 | Search button: `text-xs sm:text-sm py-3 sm:py-4`, change "Search" → "Search Tours" | ☐ |
| 9 | 258 | Trust signals: `px-3 sm:px-4 mt-3` | ☐ |
| 10 | 299, 307 | Arrows: `left-3 sm:left-6`, `right-3 sm:right-6`, `top-[40%]`, `p-2.5 sm:p-3` | ☐ |

---

## Visual Diff (Before → After)

| Element | Before | After |
|---------|--------|-------|
| Content vertical | `items-start pt-[12vh]` (sticks to top) | `items-center py-[15vh]` (centered) |
| Text spacing | `space-y-2` (8px) | `space-y-4` (16px) |
| Headline size | `text-xl sm:text-3xl` | `text-2xl sm:text-4xl` |
| Gap before search | none | `mt-8` (32px) |
| Category tabs | `px-4 py-2.5 text-xs` | `px-2.5 sm:px-4 py-2 sm:py-2.5 text-[10px] sm:text-xs` |
| Sub-tabs | `px-3 text-[11px]` | `px-2.5 sm:px-3 text-[10px] sm:text-[11px]` |
| Search input | `px-4 py-4` | `px-3 sm:px-4 py-3 sm:py-4` |
| Search button | `py-4 "Search"` | `py-3 sm:py-4 "Search Tours"` |
| Arrows | `left-6 right-6 top-1/2 p-3` | `left-3 sm:left-6 right-3 sm:right-6 top-[40%] p-2.5 sm:p-3` |

---

## Verification

1. `npx tsc --noEmit` → 0 errors
2. `npm run build` → clean build
3. Hard refresh browser (`Ctrl+Shift+R`)
4. Visual check on localhost:3000:
   - Search bar sits in lower-center of hero (not touching top)
   - Headline and subtitle have clear spacing above search bar
   - On mobile (375px): category tabs scroll horizontally, sub-tabs scroll, search button fits
   - Navigation arrows don't overlap search bar
   - Trust signals and action links are visible below search

---

## What This Does NOT Change
- No changes to any other component
- No changes to home.json
- No changes to data flow or props
- Slide transitions, auto-advance, progress bar all unchanged
- Search functionality unchanged

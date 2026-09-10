# Plan: Standardize Homepage Section Headers — Error-Proof Execution Guide

## Objective
Align all homepage section headers to match the minimal style of the "Why Choose Us Hero" section: smaller typography, tighter spacing, no decorative dividers, consistent `font-bold text-teal`.

---

## Reference Standard (WhyChooseUsHero — current)
```tsx
<h2 className="text-2xl md:text-3xl font-serif font-bold text-teal mb-8 tracking-tight">
```

## Target Standard (all sections)
```tsx
<h2 className="text-xl md:text-2xl font-serif font-bold text-teal tracking-tight">
```

---

## Files & Exact Edits

---

### FILE 1: `src/components/home/WhyChooseUsHero.tsx`

**Edit 1A — Section padding (line 30)**
```
oldString: className="py-12 bg-linen-white border-b border-teal/10"
newString: className="py-10 bg-linen-white border-b border-teal/10"
```

**Edit 1B — Headline (line 33)**
```
oldString: <h2 className="text-2xl md:text-3xl font-serif font-bold text-teal mb-8 tracking-tight">
newString: <h2 className="text-xl md:text-2xl font-serif font-bold text-teal mb-6 tracking-tight">
```

---

### FILE 2: `src/components/home/TourCategorySelector.tsx`

**Edit 2A — Section padding (line 25)**
```
oldString: className="py-16 bg-sandstone/10 border-b border-teal/10"
newString: className="py-12 bg-sandstone/10 border-b border-teal/10"
```

**Edit 2B — Headline wrapper + h2 + divider + subheadline (lines 27-31)**
```
oldString:
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-5xl font-serif tracking-tight mb-4">{headline}</h2>
          <div className="w-24 h-1 bg-coffee-red mx-auto mb-4 rounded-full" />
          <p className="text-sm opacity-80 leading-relaxed font-sans">{subheadline}</p>
        </div>

newString:
        <div className="text-center max-w-2xl mx-auto mb-6">
          <h2 className="text-xl md:text-2xl font-serif font-bold text-teal tracking-tight">
            {headline}
          </h2>
          <p className="text-xs text-teal/60 mt-2 font-sans">{subheadline}</p>
        </div>
```

---

### FILE 3: `src/components/home/WhyChooseUsPreview.tsx`

**Edit 3A — Section padding (line 18)**
```
oldString: className="py-16 bg-linen-white border-b border-teal/10"
newString: className="py-12 bg-linen-white border-b border-teal/10"
```

**Edit 3B — Headline wrapper + h2 + divider (lines 20-25)**
```
oldString:
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-5xl font-serif tracking-tight mb-4">
            {translations.whyChooseUsHeadline}
          </h2>
          <div className="w-24 h-1 bg-coffee-red mx-auto mb-4 rounded-full" />
        </div>

newString:
        <div className="text-center max-w-2xl mx-auto mb-6">
          <h2 className="text-xl md:text-2xl font-serif font-bold text-teal tracking-tight">
            {translations.whyChooseUsHeadline}
          </h2>
        </div>
```

---

### FILE 4: `src/components/home/AddisHighlightsGrid.tsx`

**Edit 4A — Section padding (line 25)**
```
oldString: className="py-16 bg-linen-white border-b border-teal/10"
newString: className="py-12 bg-linen-white border-b border-teal/10"
```

**Edit 4B — Headline wrapper + h2 + divider + subheadline (lines 27-31)**
```
oldString:
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-5xl font-serif tracking-tight mb-4">{headline}</h2>
          <div className="w-24 h-1 bg-coffee-red mx-auto mb-4 rounded-full" />
          <p className="text-sm opacity-80 leading-relaxed font-sans">{subheadline}</p>
        </div>

newString:
        <div className="text-center max-w-2xl mx-auto mb-6">
          <h2 className="text-xl md:text-2xl font-serif font-bold text-teal tracking-tight">
            {headline}
          </h2>
          <p className="text-xs text-teal/60 mt-2 font-sans">{subheadline}</p>
        </div>
```

---

### FILE 5: `src/components/home/DayTripDestinationsCarousel.tsx`

**Edit 5A — Section padding (line 54)**
```
oldString: className="py-16 bg-sandstone/10 border-b border-teal/10"
newString: className="py-12 bg-sandstone/10 border-b border-teal/10"
```

**Edit 5B — Headline wrapper + h2 + divider + subheadline (lines 56-60)**
```
oldString:
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-xl md:text-3xl font-serif tracking-tight mb-4">{headline}</h2>
          <div className="w-24 h-1 bg-coffee-red mx-auto mb-4 rounded-full" />
          <p className="text-sm opacity-80 leading-relaxed font-sans">{subheadline}</p>
        </div>

newString:
        <div className="text-center max-w-2xl mx-auto mb-6">
          <h2 className="text-xl md:text-2xl font-serif font-bold text-teal tracking-tight">
            {headline}
          </h2>
          <p className="text-xs text-teal/60 mt-2 font-sans">{subheadline}</p>
        </div>
```

---

### FILE 6: `src/components/home/PracticalInfoGrid.tsx`

**Edit 6A — Section padding (line 25)**
```
oldString: className="py-16 bg-sandstone/10 border-b border-teal/10"
newString: className="py-12 bg-sandstone/10 border-b border-teal/10"
```

**Edit 6B — Headline wrapper + h2 + divider (lines 27-30)**
```
oldString:
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-5xl font-serif tracking-tight mb-4">{headline}</h2>
          <div className="w-24 h-1 bg-coffee-red mx-auto mb-4 rounded-full" />
        </div>

newString:
        <div className="text-center max-w-2xl mx-auto mb-6">
          <h2 className="text-xl md:text-2xl font-serif font-bold text-teal tracking-tight">
            {headline}
          </h2>
        </div>
```

---

### FILE 7: `src/components/home/FinalCTA.tsx`

**Edit 7A — Headline (line 52)**
```
oldString: <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-linen-white tracking-tight leading-tight">
newString: <h2 className="text-xl md:text-2xl font-serif font-bold text-linen-white tracking-tight leading-tight">
```

**Edit 7B — Subheadline (line 57)**
```
oldString: <p className="text-base md:text-lg text-sandstone/80 font-sans font-light leading-relaxed max-w-lg">
newString: <p className="text-xs md:text-sm text-sandstone/80 font-sans font-light leading-relaxed max-w-lg">
```

---

### FILE 8: `src/pages/Homepage.tsx`

**Edit 8A — TourCardGrid section padding (line 119)**
```
oldString: <section className="py-16 md:py-24 bg-sandstone/10">
newString: <section className="py-12 md:py-16 bg-sandstone/10">
```

**Edit 8B — TourCardGrid headline wrapper + h2 + divider + subheadline (lines 121-129)**
```
oldString:
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-xl md:text-3xl font-serif tracking-tight mb-4">
              {homeData.featuredTours.headline || 'Our Most Popular Tours'}
            </h2>
            <div className="w-24 h-1 bg-coffee-red mx-auto mb-4 rounded-full" />
            <p className="text-sm opacity-80 leading-relaxed font-sans">
              {homeData.featuredTours.subheadline}
            </p>
          </div>

newString:
          <div className="text-center max-w-2xl mx-auto mb-6">
            <h2 className="text-xl md:text-2xl font-serif font-bold text-teal tracking-tight">
              {homeData.featuredTours.headline || 'Our Most Popular Tours'}
            </h2>
            <p className="text-xs text-teal/60 mt-2 font-sans">
              {homeData.featuredTours.subheadline}
            </p>
          </div>
```

---

## Complete Edit Checklist

| # | File | Line(s) | oldString (exact match) | newString | Done? |
|---|------|---------|------------------------|-----------|-------|
| 1A | WhyChooseUsHero.tsx | 30 | `className="py-12 bg-linen-white border-b border-teal/10"` | `className="py-10 bg-linen-white border-b border-teal/10"` | ☐ |
| 1B | WhyChooseUsHero.tsx | 33 | `<h2 className="text-2xl md:text-3xl font-serif font-bold text-teal mb-8 tracking-tight">` | `<h2 className="text-xl md:text-2xl font-serif font-bold text-teal mb-6 tracking-tight">` | ☐ |
| 2A | TourCategorySelector.tsx | 25 | `className="py-16 bg-sandstone/10 border-b border-teal/10"` | `className="py-12 bg-sandstone/10 border-b border-teal/10"` | ☐ |
| 2B | TourCategorySelector.tsx | 27-31 | (full 5-line block) | (new 5-line block) | ☐ |
| 3A | WhyChooseUsPreview.tsx | 18 | `className="py-16 bg-linen-white border-b border-teal/10"` | `className="py-12 bg-linen-white border-b border-teal/10"` | ☐ |
| 3B | WhyChooseUsPreview.tsx | 20-25 | (full 6-line block) | (new 5-line block) | ☐ |
| 4A | AddisHighlightsGrid.tsx | 25 | `className="py-16 bg-linen-white border-b border-teal/10"` | `className="py-12 bg-linen-white border-b border-teal/10"` | ☐ |
| 4B | AddisHighlightsGrid.tsx | 27-31 | (full 5-line block) | (new 5-line block) | ☐ |
| 5A | DayTripDestinationsCarousel.tsx | 54 | `className="py-16 bg-sandstone/10 border-b border-teal/10"` | `className="py-12 bg-sandstone/10 border-b border-teal/10"` | ☐ |
| 5B | DayTripDestinationsCarousel.tsx | 56-60 | (full 5-line block) | (new 5-line block) | ☐ |
| 6A | PracticalInfoGrid.tsx | 25 | `className="py-16 bg-sandstone/10 border-b border-teal/10"` | `className="py-12 bg-sandstone/10 border-b border-teal/10"` | ☐ |
| 6B | PracticalInfoGrid.tsx | 27-30 | (full 4-line block) | (new 4-line block) | ☐ |
| 7A | FinalCTA.tsx | 52 | `<h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-linen-white tracking-tight leading-tight">` | `<h2 className="text-xl md:text-2xl font-serif font-bold text-linen-white tracking-tight leading-tight">` | ☐ |
| 7B | FinalCTA.tsx | 57 | `<p className="text-base md:text-lg text-sandstone/80 font-sans font-light leading-relaxed max-w-lg">` | `<p className="text-xs md:text-sm text-sandstone/80 font-sans font-light leading-relaxed max-w-lg">` | ☐ |
| 8A | Homepage.tsx | 119 | `<section className="py-16 md:py-24 bg-sandstone/10">` | `<section className="py-12 md:py-16 bg-sandstone/10">` | ☐ |
| 8B | Homepage.tsx | 121-129 | (full 9-line block) | (new 9-line block) | ☐ |

---

## Verification

1. `npx tsc --noEmit` → 0 errors
2. `npm run build` → clean build
3. Hard refresh browser (`Ctrl+Shift+R`)
4. Visual check: all section headers consistently `text-xl md:text-2xl`, no red dividers, tighter spacing

---

## What This Does NOT Change
- No changes to home.json data
- No changes to component logic or props
- No changes to card grids, carousels, or content
- TestimonialsCarousel unchanged (already minimal)
- No new files created

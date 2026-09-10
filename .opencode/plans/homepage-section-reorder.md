# Plan: Reorder Homepage Sections — Move FinalCTA, Remove HowBookingWorks

## Objective
1. Move the "Ready to Explore Addis Ababa?" (`<FinalCTA>`) section into the position currently occupied by "How Booking Works" (`<HowBookingWorks>`)
2. Remove the "How Booking Works" section entirely from the Homepage

---

## Target File
**`src/pages/Homepage.tsx`** (231 lines total)

This is the only file that needs changes.

---

## Current Section Order (lines 201-226)

```
Line 201-202: {/* 10. HOW BOOKING WORKS */}     ← REMOVE THIS
              <HowBookingWorks ... />

Line 204-205: {/* 11. TESTIMONIALS CAROUSEL */}  ← stays
              <TestimonialsCarousel ... />

Line 207-213: {/* 11. PRACTICAL INFORMATION */}  ← stays
              <PracticalInfoGrid ... />

Line 215-226: {/* 14. FINAL CTA */}              ← MOVE TO LINE 201
              <FinalCTA ... />
```

## Proposed Section Order

```
Line 201:    {/* FINAL CTA */}                    ← MOVED HERE (was line 215)
              <FinalCTA ... />

              {/* TESTIMONIALS CAROUSEL */}       ← stays (was line 204)
              <TestimonialsCarousel ... />

              {/* PRACTICAL INFORMATION */}       ← stays (was line 207)
              <PracticalInfoGrid ... />

              (FinalCTA removed from old position)
              (HowBookingWorks removed entirely)
```

---

## Step-by-Step Execution Guide

### Step 1: Remove the HowBookingWorks import (line 12)

**Find this exact line (line 12):**
```tsx
import { HowBookingWorks } from '../components/home/HowBookingWorks';
```

**Action:** Delete this entire line.

---

### Step 2: Remove the howBookingWorksSteps data computation (lines 92-102)

**Find this exact block (lines 92-102):**
```tsx
  const howBookingWorksSteps = homeData.howBookingWorks.steps.map((step, idx) => ({
    ...step,
    icon:
      idx === 0 ? (
        <Calendar className="w-7 h-7" />
      ) : idx === 1 ? (
        <Users className="w-7 h-7" />
      ) : (
        <ChevronRight className="w-7 h-7" />
      ),
  }));
```

**Action:** Delete this entire block (11 lines).

---

### Step 3: Remove the HowBookingWorks section rendering (lines 201-202)

**Find this exact block (lines 201-202):**
```tsx
      {/* 10. HOW BOOKING WORKS */}
      <HowBookingWorks steps={howBookingWorksSteps} headline={homeData.howBookingWorks.headline} />
```

**Action:** Delete these 2 lines.

---

### Step 4: Move FinalCTA to the position of the removed HowBookingWorks

**Find this exact block (lines 215-226, which will now be at different line numbers after steps 1-3):**
```tsx
      {/* 14. FINAL CTA */}
      <FinalCTA
        headline={homeData.finalCta.headline}
        subheadline={homeData.finalCta.subheadline}
        ctaPrimary={homeData.finalCta.ctaPrimary}
        ctaSecondary={homeData.finalCta.ctaSecondary}
        ctaPrimaryLink={homeData.finalCta.ctaPrimaryLink}
        ctaSecondaryLink={homeData.finalCta.ctaSecondaryLink}
        backgroundImage="/images/hero/final-cta-bg.jpg"
        image={homeData.finalCta.image}
        badge={homeData.finalCta.badge}
      />
```

**Action:** Move this entire block to where the HowBookingWorks section was (immediately after the DayTripDestinationsCarousel section, before TestimonialsCarousel).

**The new section should look like:**
```tsx
      {/* FINAL CTA */}
      <FinalCTA
        headline={homeData.finalCta.headline}
        subheadline={homeData.finalCta.subheadline}
        ctaPrimary={homeData.finalCta.ctaPrimary}
        ctaSecondary={homeData.finalCta.ctaSecondary}
        ctaPrimaryLink={homeData.finalCta.ctaPrimaryLink}
        ctaSecondaryLink={homeData.finalCta.ctaSecondaryLink}
        backgroundImage="/images/hero/final-cta-bg.jpg"
        image={homeData.finalCta.image}
        badge={homeData.finalCta.badge}
      />

      {/* TESTIMONIALS CAROUSEL */}
      <TestimonialsCarousel testimonials={reviewsData.reviews} onBookClick={() => {}} />

      {/* PRACTICAL INFORMATION */}
      <PracticalInfoGrid
        columns={practicalInfoColumns}
        headline={homeData.practicalInfo.headline}
        ctaLink={homeData.practicalInfo.ctaLink}
        ctaText="Read More in Our Travel Guide"
      />
```

---

### Step 5: Clean up unused imports (lines 28-37)

After removing HowBookingWorks, check if any icon imports are now unused. The `howBookingWorksSteps` used `Calendar`, `Users`, and `ChevronRight`. Check if these are still used elsewhere:

- `Calendar` — still used in `practicalInfoColumns` (line 110) → **KEEP**
- `Users` — only used in `howBookingWorksSteps` → **REMOVE**
- `ChevronRight` — only used in `howBookingWorksSteps` → **REMOVE**

**Find this import block (lines 23-37):**
```tsx
import {
  MapPin,
  Tag,
  Crown,
  Landmark,
  Church,
  TreePine,
  Mountain,
  Waves,
  Calendar,
  Users,
  ChevronRight,
  Globe,
  DollarSign,
} from 'lucide-react';
```

**Replace with (remove Users and ChevronRight):**
```tsx
import {
  MapPin,
  Tag,
  Crown,
  Landmark,
  Church,
  TreePine,
  Mountain,
  Waves,
  Calendar,
  Globe,
  DollarSign,
} from 'lucide-react';
```

---

## Edit Checklist

| # | Line(s) | What to Do | Done? |
|---|---------|------------|-------|
| 1 | 12 | Delete `import { HowBookingWorks }` line | ☐ |
| 2 | 92-102 | Delete `howBookingWorksSteps` computation block | ☐ |
| 3 | 201-202 | Delete HowBookingWorks section rendering | ☐ |
| 4 | 215-226 | Move FinalCTA block to where HowBookingWorks was | ☐ |
| 5 | 30, 32 | Remove `Users` and `ChevronRight` from lucide-react import | ☐ |

---

## Final Section Order After All Edits

```
1.  WhyChooseUsHero
2.  TourCategorySelector
3.  TourCardGrid (with tabs)
4.  WhyChooseUsPreview
5.  AddisHighlightsGrid
6.  DayTripDestinationsCarousel
7.  FinalCTA                    ← MOVED HERE (was after PracticalInfoGrid)
8.  TestimonialsCarousel
9.  PracticalInfoGrid
```

**Removed:** HowBookingWorks (entire section + import + data computation + unused icons)

---

## Verification

1. `npx tsc --noEmit` → 0 errors
2. `npm run build` → clean build
3. Hard refresh browser (`Ctrl+Shift+R`)
4. Visual check on localhost:3000:
   - "Ready to Explore Addis Ababa?" appears after Day Trip Destinations Carousel
   - "How Booking Works" section is gone
   - Testimonials and Practical Info still appear after FinalCTA
   - No broken layout or missing elements

---

## What This Does NOT Change
- No changes to FinalCTA.tsx component
- No changes to HowBookingWorks.tsx component (file stays, just not imported)
- No changes to home.json
- No changes to any other page or component
- All other sections remain in their original order

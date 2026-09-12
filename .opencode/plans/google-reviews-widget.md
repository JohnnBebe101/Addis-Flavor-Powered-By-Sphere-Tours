# Plan: Replace TripAdvisor Placeholder with Google Reviews Widget

**Scope**: Replace "Featured Traveler Reviews" + TripAdvisor placeholder with Elfsight Google Reviews widget
**Files**: 3 files changed, 1 new component, 0 new dependencies
**Risk**: LOW
**Estimated effort**: 3 tasks

---

## Context

### Current State
- **`TestimonialsCarousel.tsx`** (157 lines): Renders a TripAdvisor **placeholder** (stars + text "[TripAdvisor embed code will be inserted here]") + a single-quote carousel with "Featured Traveler Reviews" label + 8 rotating testimonials
- **`ReviewsPage.tsx`** (118 lines): Has a separate TripAdvisor placeholder section + a grid of 8 review cards
- **No actual TripAdvisor widget** is embedded anywhere — only placeholder text
- **No Elfsight script** exists in the codebase

### Target State
- Replace the TripAdvisor placeholder + carousel with a compact Elfsight Google Reviews widget
- Keep vertical height minimal (≤ current section height)
- Professional trust section design

### Elfsight Embed Code
```html
<!-- Elfsight Google Reviews | Untitled Google Reviews -->
<script src="https://elfsightcdn.com/platform.js" async></script>
<div class="elfsight-app-b8704ce5-aa31-448d-a1d5-d5147f5d3560" data-elfsight-app-lazy></div>
```

### Technical Challenge
React does not execute `<script>` tags inserted via `innerHTML`. The Elfsight widget requires:
1. The `platform.js` script loaded in `<head>`
2. The `<div class="elfsight-app-...">` element present in DOM
3. Elfsight's script to find and initialize the widget div

**Solution**: Load `platform.js` in `index.html` (global, cached, loads once) + render the widget div in React component.

---

## Task 1: Load Elfsight Script in `index.html`

**File**: `index.html`

**Add** the Elfsight `<script>` tag in `<head>` (before `</head>`):

```html
<!-- Elfsight Google Reviews Widget -->
<script src="https://elfsightcdn.com/platform.js" async></script>
```

**Placement**: After the existing `<link>` tags, before `</head>`. This ensures the script loads globally and is cached by the browser.

**What stays unchanged**: All existing tags in `index.html` remain as-is.

---

## Task 2: Create `GoogleReviewsWidget.tsx` Component

**New file**: `src/components/GoogleReviewsWidget.tsx`

A minimal, self-contained component that renders the Elfsight widget div. No props needed — the widget is configured via the Elfsight dashboard (class name is the identifier).

```tsx
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const GoogleReviewsWidget: React.FC = () => {
  return (
    <div className="elfsight-app-b8704ce5-aa31-448d-a1d5-d5147f5d3560" data-elfsight-app-lazy />
  );
};
```

**Why a separate component**:
- Clean separation of concerns
- Can be reused on Homepage and ReviewsPage
- The `data-elfsight-app-lazy` attribute tells Elfsight to lazy-load
- If Elfsight script loads after React renders, the `data-elfsight-app-lazy` attribute ensures the widget initializes when the script is ready

**Size**: ~15 lines. Minimal vertical footprint — the widget itself controls its height via Elfsight's configuration.

---

## Task 3: Replace TestimonialsCarousel with GoogleReviewsWidget on Homepage

**File**: `src/pages/Homepage.tsx`

### Step 3a: Update imports

**Remove**:
```tsx
import TestimonialsCarousel from '../components/TestimonialsCarousel';
import reviewsData from '../content/reviews.json';
```

**Add**:
```tsx
import { GoogleReviewsWidget } from '../components/GoogleReviewsWidget';
```

### Step 3b: Replace render block

**Remove** (lines ~134-135):
```tsx
{/* TESTIMONIALS CAROUSEL */}
<TestimonialsCarousel testimonials={reviewsData.reviews} onBookClick={() => {}} />
```

**Replace with**:
```tsx
{/* GOOGLE REVIEWS WIDGET */}
<section className="py-8 bg-sandstone border-t border-b border-teal/10">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-4">
      <p className="font-mono text-[10px] text-teal/60 uppercase tracking-widest">
        Trusted by Travelers Worldwide
      </p>
    </div>
    <GoogleReviewsWidget />
  </div>
</section>
```

**Section sizing**:
- `py-8` = 32px top + 32px bottom = 64px padding
- `mb-4` = 16px label margin
- Widget height controlled by Elfsight (typically 100-200px for compact layout)
- **Total estimated height**: ~200-280px (comparable to or smaller than the current TestimonialsCarousel at ~250-300px)

### Step 3c: Remove unused `Tour` import check

Verify that `Tour` import is still used (it is — for `toursData.tours as Tour[]`). No change needed.

---

## Task 4: Replace TripAdvisor Placeholder on ReviewsPage

**File**: `src/pages/ReviewsPage.tsx`

### Step 4a: Update imports

**Add**:
```tsx
import { GoogleReviewsWidget } from '../components/GoogleReviewsWidget';
```

**Remove** (if no longer used after changes):
```tsx
import { Star } from 'lucide-react';
```

Check: `Star` is used in the review cards grid (line 58). Keep it.

### Step 4b: Replace TripAdvisor placeholder section

**Remove** (lines ~20-37):
```tsx
{/* TripAdvisor Widget Placeholder */}
<div className="mb-12 p-8 bg-sandstone/50 border border-teal/10 rounded-2xl text-center">
  <div className="flex items-center justify-center gap-2 mb-4">
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="w-7 h-7 fill-current text-gold" />
      ))}
    </div>
    <span className="font-mono text-sm uppercase tracking-widest text-teal/80">
      4.9 / 5 from 500+ reviews on TripAdvisor
    </span>
  </div>
  <p className="text-[10px] text-teal/50">
    [TripAdvisor widget embed code will be inserted here]
  </p>
</div>
```

**Replace with**:
```tsx
{/* Google Reviews Widget */}
<div className="mb-12">
  <GoogleReviewsWidget />
</div>
```

**Size comparison**:
- Before: `p-8` (32px padding each side) + stars + text + placeholder = ~180px height
- After: `mb-12` (48px margin) + widget = ~150-200px height (widget-controlled)

---

## Size Comparison: Homepage Section

| Aspect | Before (TestimonialsCarousel) | After (GoogleReviewsWidget) | Change |
|--------|------------------------------|----------------------------|--------|
| Section padding | `py-6 md:py-8` | `py-8` | Comparable |
| Inner content | TripAdvisor placeholder (80px) + carousel quote (100px) + dots (20px) | Label (16px) + widget (~120-180px) | Similar or smaller |
| Total height | ~250-300px | ~200-280px | ≤ same |
| Background | `bg-sandstone` | `bg-sandstone` | Same |
| Borders | `border-t border-b border-teal/10` | `border-t border-b border-teal/10` | Same |

---

## What Stays Unchanged

| Item | File | Reason |
|------|------|--------|
| `TestimonialsCarousel.tsx` | Component file | Preserved — may be needed elsewhere or archived later |
| `reviews.json` | Data file | 8 reviews still used by ReviewsPage grid |
| `ReviewsPage.tsx` review grid | ReviewsPage | Only the TripAdvisor placeholder replaced |
| TripAdvisor text references | home.json, faqs.json, etc. | Social proof text ("500+ reviews on TripAdvisor") stays — only the widget placeholder removed |
| TripAdvisor external links | navigation.json, Navbar | Links to TripAdvisor profile stay |

---

## Error-Proofing Checklist

### Pre-Execution
- [ ] Verify Elfsight embed class name: `elfsight-app-b8704ce5-aa31-448d-a1d5-d5147f5d3560`
- [ ] Verify `index.html` has no existing Elfsight script

### Post-Execution
- [ ] `index.html` has Elfsight `<script>` in `<head>` with `async`
- [ ] `GoogleReviewsWidget.tsx` renders the correct div with `data-elfsight-app-lazy`
- [ ] Homepage: TestimonialsCarousel removed, GoogleReviewsWidget rendered
- [ ] Homepage: No orphaned `reviewsData` import
- [ ] ReviewsPage: TripAdvisor placeholder replaced with GoogleReviewsWidget
- [ ] ReviewsPage: Review card grid still renders all 8 reviews
- [ ] `npx tsc --noEmit` — 0 errors
- [ ] `npm run build` — clean build, 0 errors

---

## Risk Assessment

| Risk | Mitigation |
|------|-----------|
| Elfsight script loads slowly | `async` attribute + `data-elfsight-app-lazy` ensures widget initializes when ready |
| Widget height too tall | Elfsight dashboard controls widget size — configure "compact" or "minimal" layout there |
| Script blocked by CSP | If CSP is added later, need to add `elfsightcdn.com` to script-src |
| React strict mode double-render | Elfsight handles re-initialization gracefully via `data-elfsight-app-lazy` |

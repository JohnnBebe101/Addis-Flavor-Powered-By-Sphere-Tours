# Sprint 8: Final Audit & Polish

**Status**: PLANNED — Ready for execution
**Risk Level**: Medium (Task 8.6 changes global JSON type, Task 8.10 tsconfig strict is HIGH)
**Verification after each task**: `npx tsc --noEmit` must pass clean

---

## Pre-Conditions (already verified)

- Sprints 3, 4, 5, 6 complete
- `src/content.d.ts:4`: JSON declared as `Record<string, unknown>` — root cause of 8 double-casts
- `src/content.d.ts:24-29`: `NavDropdownItem` global ambient type — only used in `Navbar.tsx:564`
- `index.html:6-19`: Static title/description/OG shared by all pages — no per-page SEO
- `tsconfig.json:22-26`: Individual strict flags but NOT `strict: true`
- `package.json:35-36`: `sharp@0.35.4` and `svgo@4.1.0` — **peer dependencies** of `vite-plugin-image-optimizer` (MUST keep)
- 3 files missing license headers: `BookingStep3.tsx`, `BookingSuccess.tsx`, `ContactPage.tsx`
- 2 TODO comments in `AboutPage.tsx` (lines 43, 70)
- `_archived/` directory has ZERO imports from active code (verified via grep)

---

## Task 8.1 — Add license headers to 3 files

**Risk**: ZERO — comment-only addition, no code change
**Mitigation**: None needed

### Step 1: BookingStep3.tsx

**File**: `src/components/booking/BookingStep3.tsx`

**Current line 1**: `import { Calendar, Users, MapPin, Check, User, Mail, Phone, MessageCircle, ChevronDown } from 'lucide-react';`

**Prepend before line 1**:
```tsx
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

```

### Step 2: BookingSuccess.tsx

**File**: `src/components/booking/BookingSuccess.tsx`

**Current line 1**: `import { CheckCircle, MessageCircle, Mail, MapPin, Calendar, Users, Phone } from 'lucide-react';`

**Prepend before line 1**:
```tsx
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

```

### Step 3: ContactPage.tsx

**File**: `src/pages/ContactPage.tsx`

**Current line 1**: `import { useState, useRef, useEffect, FormEvent } from 'react';`

**Prepend before line 1**:
```tsx
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

```

### Step 4: Verify

- `npx tsc --noEmit` — passes clean

---

## Task 8.2 — Remove _archived directory from src/

**Risk**: ZERO — grep confirms zero imports from active code
**Mitigation**: Verify with `rg "_archived" src/` before moving. If any reference found, abort.

### Step 1: Verify zero imports

Run: `rg "_archived" src/ --files-with-matches`

Expected result: No output (zero matches). This was already verified — confirmed safe.

### Step 2: Move directory

```bash
Move-Item "src\components\_archived" "archived"
```

This moves 4 files out of `src/`:
- `BookingProgressBar.tsx`
- `FAQAccordion.tsx`
- `HowBookingWorks.tsx`
- `TourBookingModal.tsx`

### Step 3: Verify

- `npx tsc --noEmit` — passes clean (files outside `src/` are not compiled)
- `npm run build` — succeeds
- No references to `_archived` in active code

---

## Task 8.3 — Move NavDropdownItem to co-located type

**Risk**: ZERO — type is only used in one file (`Navbar.tsx:564`)
**Mitigation**: Add interface in Navbar.tsx, remove from content.d.ts. `tsc` catches any mismatch.

### Step 1: Add interface to Navbar.tsx

**File**: `src/components/Navbar.tsx`

Find the import section (around line 1-10). After the last import, BEFORE the component definition, add:

```ts
interface NavDropdownItem {
  label: string;
  link: string;
  price?: string;
  duration?: string;
  description?: string;
}
```

### Step 2: Remove from content.d.ts

**File**: `src/content.d.ts`

Delete lines 23-30 (the blank line and the entire `NavDropdownItem` interface):
```ts
// Navigation data types
interface NavDropdownItem {
  label: string;
  link: string;
  price?: string;
  duration?: string;
  description?: string;
}
```

### Step 3: Verify

- `npx tsc --noEmit` — passes clean

---

## Task 8.4 — Fix AboutPage TODO comments

**Risk**: ZERO — wiring existing no-op handlers to real navigation
**Mitigation**: `onBookClick` → `navigate('/book/')`. `onTabClick` stays no-op (tab system not implemented), just remove TODO comment.

### Step 1: Wire onBookClick (line 70)

**File**: `src/pages/AboutPage.tsx`

**Current** (line 70):
```tsx
          onBookClick={() => {}} // TODO: wire to Layout booking modal
```

**Replace with**:
```tsx
          onBookClick={() => navigate('/book/')}
```

### Step 2: Clean up onTabClick TODO (line 43)

**Current** (line 43):
```tsx
        onTabClick={() => {}} // TODO: wire tab state management
```

**Replace with**:
```tsx
        onTabClick={() => {}}
```

### Step 3: Verify

- `npx tsc --noEmit` — passes clean
- Click "Book a Tour" on About page — navigates to `/book/`

---

## Task 8.5 — Remove `as unknown as` double-casts

**Root cause**: `src/content.d.ts:4` declares JSON as `Record<string, unknown>`, forcing every consumer to double-cast.

**Fix**: Change the JSON declaration to `any` (Vite handles actual typing at build time). This eliminates all 8 double-casts with zero change in runtime behavior.

**Risk**: LOW — all consuming files already bypass the type with double-casts, so changing to `any` is a net neutral change in type safety
**Mitigation**: `tsc --noEmit` after each step. If any new error appears, revert that specific step.

### Step 1: Change content.d.ts JSON declaration

**File**: `src/content.d.ts`

**Current** (lines 3-6):
```ts
declare module '*.json' {
  const value: Record<string, unknown>;
  export default value;
}
```

**Replace with**:
```ts
declare module '*.json' {
  const value: any;
  export default value;
}
```

### Step 2: Update BookPage.tsx (2 casts)

**File**: `src/pages/BookPage.tsx`

**Current line 18**:
```ts
const bookingJson = bookingContent as unknown as {
```
**Replace with**:
```ts
const bookingJson = bookingContent as {
```

**Current line 31**:
```ts
  const typedToursData = toursData as unknown as ToursData;
```
**Replace with**:
```ts
  const typedToursData = toursData as ToursData;
```

### Step 3: Update ContactPage.tsx (1 cast)

**File**: `src/pages/ContactPage.tsx`

**Current line 26**:
```ts
const cj = contactData as unknown as ContactData;
```
**Replace with**:
```ts
const cj = contactData as ContactData;
```

### Step 4: Update ContactModal.tsx (1 cast)

**File**: `src/components/ContactModal.tsx`

**Current line 82**:
```ts
const contactJson = contactContent as unknown as ContactData;
```
**Replace with**:
```ts
const contactJson = contactContent as ContactData;
```

### Step 5: Update HomeHero.tsx (1 cast)

**File**: `src/components/home/HomeHero.tsx`

**Current line 15**:
```ts
  const typedHomeData = homeData as unknown as HomeData;
```
**Replace with**:
```ts
  const typedHomeData = homeData as HomeData;
```

### Step 6: Update TourDetailPage.tsx (2 casts)

**File**: `src/pages/TourDetailPage.tsx`

**Current line 16**:
```ts
  const typedToursData = toursData as unknown as ToursData;
```
**Replace with**:
```ts
  const typedToursData = toursData as ToursData;
```

**Current line 17**:
```ts
  const typedReviewsData = reviewsData as unknown as ReviewsData;
```
**Replace with**:
```ts
  const typedReviewsData = reviewsData as ReviewsData;
```

### Step 7: Verify

- `npx tsc --noEmit` — passes clean
- `npm run build` — succeeds
- `rg "as unknown as" src/ --files-with-matches` — returns only `_archived/TourBookingModal.tsx` (moved to `archived/` in Task 8.2)

---

## Task 8.6 — Add SEO meta tags to index.html

**Risk**: ZERO — additive meta tags only
**Mitigation**: These are static default values. Dynamic per-page meta is a future enhancement.

### Step 1: Add og:image after line 14

**File**: `index.html`

After line 14 (`<meta property="og:site_name" ...`), add:
```html
    <meta property="og:image" content="https://addisababacitytours.com/images/hero/addis-ababa-highlights-hero.jpg" />
```

### Step 2: Add twitter:image after line 19

After line 19 (`<meta name="twitter:description" ...`), add:
```html
    <meta name="twitter:image" content="https://addisababacitytours.com/images/hero/addis-ababa-highlights-hero.jpg" />
```

### Step 3: Add canonical URL after the Twitter Card block (after new line 20)

After the twitter:image line, add:
```html
    <link rel="canonical" href="https://addisababacitytours.com" />
```

### Step 4: Verify

- `npx tsc --noEmit` — passes clean
- View page source — all meta tags present

---

## Task 8.7 — Add useMemo to Homepage icon-map computations

**File**: `src/pages/Homepage.tsx`

**Why**: Lines 45-101 create 4 new arrays with JSX elements on every render. These are deterministic (based on static JSON data) and should be memoized.

**Risk**: LOW — memoization only, no behavior change
**Mitigation**: Import `useMemo` from React, wrap each computation.

### Step 1: Add useMemo to import (line 16)

**Current**:
```tsx
import { useState } from 'react';
```

**Replace with**:
```tsx
import { useState, useMemo } from 'react';
```

### Step 2: Wrap tourCategoriesWithIcons (lines 45-55)

**Current**:
```tsx
  const tourCategoriesWithIcons = homeData.tourCategorySelector.categories.map((cat, idx) => ({
    ...cat,
    icon:
      idx === 0 ? (
        <MapPin className="w-7 h-7" />
      ) : idx === 1 ? (
        <Mountain className="w-7 h-7" />
      ) : (
        <Crown className="w-7 h-7" />
      ),
  }));
```

**Replace with**:
```tsx
  const tourCategoriesWithIcons = useMemo(() =>
    homeData.tourCategorySelector.categories.map((cat, idx) => ({
      ...cat,
      icon:
        idx === 0 ? (
          <MapPin className="w-7 h-7" />
        ) : idx === 1 ? (
          <Mountain className="w-7 h-7" />
        ) : (
          <Crown className="w-7 h-7" />
        ),
    })),
    []
  );
```

### Step 3: Wrap dayTripDestinationsWithIcons (lines 57-73)

**Current** (lines 57-73):
```tsx
  const dayTripDestinationsWithIcons = homeData.dayTripDestinations.destinations.map(
    (dest, idx) => ({
      ...dest,
      icon:
        idx === 0 ? (
          <Landmark className="w-7 h-7" />
        ) : idx === 1 ? (
          <Church className="w-7 h-7" />
        ) : idx === 2 ? (
          <TreePine className="w-7 h-7" />
        ) : (
          <Waves className="w-7 h-7" />
        ),
      priceFrom:
        idx === 0 ? 'From $85' : idx === 1 ? 'From $95' : idx === 2 ? 'From $80' : 'From $75',
    }),
  );
```

**Replace with**:
```tsx
  const dayTripDestinationsWithIcons = useMemo(() =>
    homeData.dayTripDestinations.destinations.map(
      (dest, idx) => ({
        ...dest,
        icon:
          idx === 0 ? (
            <Landmark className="w-7 h-7" />
          ) : idx === 1 ? (
            <Church className="w-7 h-7" />
          ) : idx === 2 ? (
            <TreePine className="w-7 h-7" />
          ) : (
            <Waves className="w-7 h-7" />
          ),
        priceFrom:
          idx === 0 ? 'From $85' : idx === 1 ? 'From $95' : idx === 2 ? 'From $80' : 'From $75',
      }),
    ),
    []
  );
```

### Step 4: Wrap attractionsWithIcons (lines 75-87)

**Current**:
```tsx
  const attractionsWithIcons = homeData.addisHighlights.attractions.map((attr, idx) => ({
    ...attr,
    icon:
      idx === 0 ? (
        <Landmark className="w-7 h-7" />
      ) : idx === 1 ? (
        <Tag className="w-7 h-7" />
      ) : idx === 2 ? (
        <Church className="w-7 h-7" />
      ) : (
        <Mountain className="w-7 h-7" />
      ),
  }));
```

**Replace with**:
```tsx
  const attractionsWithIcons = useMemo(() =>
    homeData.addisHighlights.attractions.map((attr, idx) => ({
      ...attr,
      icon:
        idx === 0 ? (
          <Landmark className="w-7 h-7" />
        ) : idx === 1 ? (
          <Tag className="w-7 h-7" />
        ) : idx === 2 ? (
          <Church className="w-7 h-7" />
        ) : (
          <Mountain className="w-7 h-7" />
        ),
    })),
    []
  );
```

### Step 5: Wrap practicalInfoColumns (lines 89-101)

**Current**:
```tsx
  const practicalInfoColumns = homeData.practicalInfo.columns.map((col, idx) => ({
    ...col,
    icon:
      idx === 0 ? (
        <Globe className="w-7 h-7" />
      ) : idx === 1 ? (
        <Calendar className="w-7 h-7" />
      ) : idx === 2 ? (
        <DollarSign className="w-7 h-7" />
      ) : (
        <Mountain className="w-7 h-7" />
      ),
  }));
```

**Replace with**:
```tsx
  const practicalInfoColumns = useMemo(() =>
    homeData.practicalInfo.columns.map((col, idx) => ({
      ...col,
      icon:
        idx === 0 ? (
          <Globe className="w-7 h-7" />
        ) : idx === 1 ? (
          <Calendar className="w-7 h-7" />
        ) : idx === 2 ? (
          <DollarSign className="w-7 h-7" />
        ) : (
          <Mountain className="w-7 h-7" />
        ),
    })),
    []
  );
```

### Step 6: Verify

- `npx tsc --noEmit` — passes clean
- Homepage renders identically (no visual change)

---

## Task 8.8 — Verify sharp/svgo are required (NO-OP)

**Finding**: `sharp@0.35.4` and `svgo@4.1.0` are **peer dependencies** of `vite-plugin-image-optimizer`. They MUST stay in `devDependencies`.

**Action**: None. Document this finding and skip removal.

**Verification**: `npm ls sharp svgo` shows both are used by `vite-plugin-image-optimizer`.

---

## Task 8.9 — Enable tsconfig `strict: true` (DEFERRED)

**Risk**: HIGH — may surface 50+ new type errors
**Status**: DEFERRED per user decision from earlier sprints. Only proceed if user explicitly approves.

**If approved later**:
1. Add `"strict": true` to `tsconfig.json` compilerOptions
2. Run `tsc --noEmit` — count errors
3. If > 20 errors: revert, enable individual flags one at a time
4. If ≤ 20 errors: fix them all

---

## Task 8.10 — Final verification

### Automated checks:
1. `npx tsc --noEmit` — must pass clean
2. `npm run build` — must succeed
3. `npm run lint` — must pass (or warnings documented)

### Code quality checks:
4. `rg "as unknown as" src/ --files-with-matches` — returns only archived files
5. `rg "TODO" src/ --files-with-matches` — returns zero or documented TODOs
6. `rg "_archived" src/ --files-with-matches` — returns zero matches

### SEO checks:
7. View page source on `/` — `og:image`, `twitter:image`, canonical present

### Build output checks:
8. `npm run build` output shows "optimized images successfully" (sharp/svgo working)
9. No warnings in build output

---

## Risk Matrix

| Task | Risk | Probability | Impact | Mitigation |
|------|------|-------------|--------|------------|
| 8.1 License headers | ZERO | None | None | Comment-only |
| 8.2 Move _archived | ZERO | None | None | Zero imports verified |
| 8.3 NavDropdownItem | ZERO | None | None | Single-file type move |
| 8.4 AboutPage TODOs | ZERO | None | None | Wire to existing navigate |
| 8.5 Remove double-casts | LOW | Low | Type safety neutral | tsc after each change |
| 8.6 SEO meta tags | ZERO | None | None | Additive meta tags |
| 8.7 Homepage useMemo | LOW | Very Low | No behavior change | Memoization only |
| 8.8 sharp/svgo | N/A | N/A | N/A | Peer deps — keep |
| 8.9 tsconfig strict | HIGH | Medium | 50+ errors possible | DEFERRED |

---

## Execution Order

1. **Task 8.1** — License headers (3 files, trivial)
2. **Task 8.2** — Move _archived (zero risk)
3. **Task 8.3** — NavDropdownItem type (zero risk)
4. **Task 8.4** — AboutPage TODOs (zero risk)
5. **Task 8.5** — Remove double-casts (low risk, tsc after each)
6. **Task 8.6** — SEO meta tags (zero risk)
7. **Task 8.7** — Homepage useMemo (low risk)
8. **Task 8.8** — Verify sharp/svgo (NO-OP, documented)
9. **Task 8.10** — Final verification
10. **Task 8.9** — tsconfig strict (DEFERRED, optional)

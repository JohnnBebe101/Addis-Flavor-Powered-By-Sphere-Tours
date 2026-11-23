# Plan: Replace Tour Carousel with Static Grid + CTA — Error-Proof Execution

## Objective
1. Remove carousel pagination (page dots + left/right arrows) from "Our Most Popular Tours"
2. Show all 9 tours in a static 4-column grid (no pagination)
3. Add "View All Tours" CTA button below the grid → links to `/tours/`
4. Eliminate the lonely single-card problem (page 2 had only 1 tour)

---

## File 1: `src/components/home/TourCardGrid.tsx`

### Edit 1A — Remove carousel imports (lines 1-2)

**Current (lines 1-3):**
```tsx
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Tour } from '../../types';
```

**Replace with:**
```tsx
import { Tour } from '../../types';
```

---

### Edit 1B — Remove `carousel` prop from interface (lines 5-8)

**Current:**
```tsx
interface TourCardGridProps {
  tours: Tour[];
  carousel?: boolean;
}
```

**Replace with:**
```tsx
interface TourCardGridProps {
  tours: Tour[];
}
```

---

### Edit 1C — Rewrite the main component function (lines 95-174)

**Current (lines 95-174) — entire function body:**
```tsx
export default function TourCardGrid({ tours, carousel = false }: TourCardGridProps) {
  const getPrice = (tour: Tour) => String(tour.pricing.smallGroup.adult);

  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setPerPage] = useState(8);

  useEffect(() => {
    if (!carousel) return;
    const handleResize = () => {
      if (window.innerWidth >= 768) setPerPage(8);
      else setPerPage(4);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [carousel]);

  useEffect(() => {
    setCurrentPage(0);
  }, [tours]);

  const totalPages = Math.ceil(tours.length / perPage);
  const visibleTours = tours.slice(currentPage * perPage, (currentPage + 1) * perPage);

  if (!carousel) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {tours.map((tour) => (
          <TourCard key={tour.id} tour={tour} price={getPrice(tour)} />
        ))}
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {visibleTours.map((tour) => (
          <TourCard key={tour.id} tour={tour} price={getPrice(tour)} />
        ))}
      </div>

      {/* Left arrow */}
      <button
        onClick={() => setCurrentPage((p) => p - 1)}
        disabled={currentPage === 0}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 md:-translate-x-4 p-2 rounded-full bg-linen-white/90 border border-teal/10 text-teal hover:text-coffee-red hover:bg-white hover:border-coffee-red disabled:opacity-30 disabled:pointer-events-none transition-all duration-300 z-10 shadow-sm"
        aria-label="Previous"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Right arrow */}
      <button
        onClick={() => setCurrentPage((p) => p + 1)}
        disabled={currentPage >= totalPages - 1}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 md:translate-x-4 p-2 rounded-full bg-linen-white/90 border border-teal/10 text-teal hover:text-coffee-red hover:bg-white hover:border-coffee-red disabled:opacity-30 disabled:pointer-events-none transition-all duration-300 z-10 shadow-sm"
        aria-label="Next"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Page dots */}
      {totalPages > 1 && (
        <div className="flex justify-center space-x-2 mt-6">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === currentPage ? 'w-4 bg-coffee-red' : 'w-1.5 bg-teal/20'
              }`}
              aria-label={`Go to page ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
```

**Replace with:**
```tsx
export default function TourCardGrid({ tours }: TourCardGridProps) {
  const getPrice = (tour: Tour) => String(tour.pricing.smallGroup.adult);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {tours.map((tour) => (
        <TourCard key={tour.id} tour={tour} price={getPrice(tour)} />
      ))}
    </div>
  );
}
```

**What this removes:**
- `carousel` prop from function signature
- `currentPage` / `perPage` state (lines 98-99)
- Resize `useEffect` (lines 101-110)
- Page reset `useEffect` (lines 112-114)
- `totalPages` / `visibleTours` variables (lines 116-117)
- `if (!carousel)` early return (lines 119-127)
- Carousel return block with arrows + dots (lines 129-173)

**What this keeps:**
- `getPrice` helper
- `TourCard` component (unchanged)
- Simple grid rendering of all tours

---

## File 2: `src/pages/Homepage.tsx`

### Edit 2A — Remove `carousel` prop and add CTA button (lines 152-155)

**Current (lines 152-155):**
```tsx
        <TourCardGrid
          tours={filteredTours}
          carousel
        />
```

**Replace with:**
```tsx
        <TourCardGrid tours={filteredTours} />

        {/* View All Tours CTA */}
        <div className="text-center mt-10">
          <a
            href="/tours/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-coffee-red hover:bg-coffee-red/90 text-linen-white font-mono text-xs uppercase font-bold tracking-wider transition-all duration-300 shadow-md"
          >
            <span>View All Tours</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </div>
```

**What this does:**
- Removes `carousel` prop (TourCardGrid now renders plain grid)
- Adds centered CTA button below the grid
- Button styled consistently with existing CTA buttons (PracticalInfoGrid, etc.)
- Links to `/tours/` page

---

## Complete Edit Checklist

| # | File | Line(s) | oldString (exact) | newString (exact) | Done? |
|---|------|---------|-------------------|-------------------|-------|
| 1A | TourCardGrid.tsx | 1-3 | `import { useState, useEffect } from 'react';\nimport { ChevronLeft, ChevronRight } from 'lucide-react';\nimport { Tour } from '../../types';` | `import { Tour } from '../../types';` | ☐ |
| 1B | TourCardGrid.tsx | 5-8 | `interface TourCardGridProps {\n  tours: Tour[];\n  carousel?: boolean;\n}` | `interface TourCardGridProps {\n  tours: Tour[];\n}` | ☐ |
| 1C | TourCardGrid.tsx | 95-174 | (entire 80-line function) | (simplified 10-line function) | ☐ |
| 2A | Homepage.tsx | 152-155 | `<TourCardGrid\n  tours={filteredTours}\n  carousel\n/>` | `<TourCardGrid tours={filteredTours} />\n\n{/* View All Tours CTA */}\n<div className="text-center mt-10">...</div>` | ☐ |

---

## Post-Edit File States

### TourCardGrid.tsx (after edits)
- **Lines 1-3:** Single import (`Tour`)
- **Lines 5-7:** Interface without `carousel`
- **Lines 9-21:** `getTourTypeTag` helper (unchanged)
- **Lines 23-93:** `TourCard` component (unchanged)
- **Lines 95-105:** Simplified `TourCardGrid` function (plain grid only)
- **Total:** ~105 lines (down from 174)

### Homepage.tsx (after edit)
- **Line 152:** `<TourCardGrid tours={filteredTours} />`
- **Lines 154-165:** CTA button block
- **Rest:** Unchanged

---

## Verification

1. `npx tsc --noEmit` → 0 errors
2. `npm run build` → clean build
3. Hard refresh browser (`Ctrl+Shift+R`)
4. Visual check on localhost:3000:
   - All 9 tours shown in 4-column grid (2 full rows + 1 partial)
   - No pagination dots
   - No left/right arrows
   - "View All Tours" CTA button centered below grid
   - CTA navigates to `/tours/`
   - Category tab filtering still works
   - No console errors

---

## What This Does NOT Change
- `TourCard` component (individual card design)
- Category tab filtering logic
- Tour data in `tours.json`
- Other homepage sections
- `/tours/` listing page

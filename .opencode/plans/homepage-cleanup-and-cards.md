# Plan: Homepage Section Cleanup & Card Enhancement

**Scope**: 5 tasks — remove/reorganize 3 sections, enhance 1 section's cards
**Files changed**: `Homepage.tsx`, `PracticalInfoGrid.tsx`, `home.json` (3 files)
**Risk**: LOW (all changes Homepage-only, components preserved for other pages)
**Estimated effort**: 5 tasks

---

## Task 1: Remove Category Filters from "Our Most Popular Tours"

**File**: `src/pages/Homepage.tsx`

### What to remove (line-by-line):

1. **Line 16** — Remove `useState` from import:
   - Before: `import { useState, useMemo } from 'react';`
   - After: `import { useMemo } from 'react';`

2. **Line 37** — Remove `activeTab` state:
   - Delete: `const [activeTab, setActiveTab] = useState<string>('all');`

3. **Lines 39-42** — Remove `filteredTours` computation:
   - Delete:
     ```tsx
     const filteredTours =
       activeTab === 'all'
         ? (toursData.tours as Tour[])
         : (toursData.tours as Tour[]).filter((t) => t.tourType === activeTab);
     ```

4. **Lines 118-164** — Replace entire section with simplified version:
   - **Delete lines 130-149** (the tab buttons div + all button code)
   - **Change line 152** from `<TourCardGrid tours={filteredTours} />` to `<TourCardGrid tours={toursData.tours as Tour[]} />`
   - **Remove the inner `<div className="max-w-7xl...">` wrapper** (lines 120, 128, 150) — TourCardGrid already has its own max-w-7xl container

   Replace the entire `{/* 6. TOUR CARD GRID — CATEGORY TABS */}` section (lines 118-164) with:
   ```tsx
   {/* 6. TOUR CARD GRID */}
   <section className="py-16 bg-linen-white">
     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
       <div className="text-center max-w-2xl mx-auto mb-12">
         <h2 className="text-3xl md:text-4xl font-serif font-bold text-teal tracking-tight mb-4">
           {homeData.featuredTours.headline || 'Our Most Popular Tours'}
         </h2>
         <p className="text-lg text-teal/60 font-sans">
           {homeData.featuredTours.subheadline}
         </p>
       </div>
     </div>
     <TourCardGrid tours={toursData.tours as Tour[]} />
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
   </section>
   ```

### What stays unchanged:
- Line 6: `import TourCardGrid` — kept (used here and on TourListingPage)
- Line 19: `import toursData` — kept (now used directly instead of filteredTours)
- Line 17: `import { Tour }` — kept (used in `toursData.tours as Tour[]`)

---

## Task 2: Remove "Why Book With Addis Ababa City Tour?" & Merge into WhyChooseUsHero

### Step 2a: Update `src/content/home.json`

**Add 3 benefits** to `whyChooseUsHero.benefits` array (after existing benefit #4):

Insert after line 124 (after the `}` closing benefit #4):
```json
,
{
  "id": 5,
  "title": "Local Experts",
  "description": "We live here, guide here, and know Addis Ababa better than any online travel agency. Our guides are born and raised in the city, speak fluent English, and share stories you won't find in guidebooks.",
  "image": "/images/about/team-hero.jpg",
  "link": "/about/",
  "cta": "Meet Our Guides"
},
{
  "id": 6,
  "title": "Best Price Guarantee",
  "description": "Book direct and save 15% compared to GetYourGuide and Viator. No hidden fees, no service charges. Plus, you'll get flexible pickup times and personalized service.",
  "image": "/images/tours/addis-ababa-highlights-holy-trinity.jpg",
  "link": "/tours/",
  "cta": "View Tours"
},
{
  "id": 7,
  "title": "Flexible & Safe",
  "description": "Free cancellation up to 24 hours before your tour. Licensed by Ethiopia's Ministry of Tourism. Fully insured vehicles and 24/7 WhatsApp support.",
  "image": "/images/tours/full-day-addis-ababa-coffee-ceremony.jpg",
  "link": "/tours/",
  "cta: "Book Now"
}
```

**Note**: Benefits #5-7 reuse images from existing benefits to avoid adding new fields. The component renders benefits[0] as hero + benefits[1..3] as small cards. With 7 total, the top 4 display (1 hero + 3 small) — the 3 migrated benefits serve as overflow if the component is extended.

### Step 2b: Update `src/pages/Homepage.tsx`

**Remove**:
1. **Line 9** — Delete import:
   ```tsx
   import { WhyChooseUsPreview } from '../components/home/WhyChooseUsPreview';
   ```

2. **Lines 166-177** — Delete the entire WhyChooseUsPreview render block:
   ```tsx
   {/* 7. WHY CHOOSE US PREVIEW */}
   <WhyChooseUsPreview
     translations={{
       whyChooseUsHeadline: homeData.whyChooseUs.headline,
       localExpertsTitle: homeData.whyChooseUs.benefits[0]?.title ?? 'Local Experts',
       localExpertsDesc: homeData.whyChooseUs.benefits[0]?.description ?? '',
       bestPriceTitle: homeData.whyChooseUs.benefits[1]?.title ?? 'Best Price Guarantee',
       bestPriceDesc: homeData.whyChooseUs.benefits[1]?.description ?? '',
       flexibleSafeTitle: homeData.whyChooseUs.benefits[2]?.title ?? 'Flexible & Safe',
       flexibleSafeDesc: homeData.whyChooseUs.benefits[2]?.description ?? '',
     }}
   />
   ```

**Keep unchanged**:
- Lines 8, 106-109: WhyChooseUsHero import + render — untouched
- `home.json` `whyChooseUs` section — preserved (data still exists for potential future use)

---

## Task 3: Remove "Day Trips from Addis Ababa" & Migrate Context

### Step 3a: Update `src/pages/Homepage.tsx`

**Remove**:
1. **Line 11** — Delete import:
   ```tsx
   import { DayTripDestinationsCarousel } from '../components/home/DayTripDestinationsCarousel';
   ```

2. **Lines 57-73** — Delete `dayTripDestinationsWithIcons` useMemo:
   ```tsx
   const dayTripDestinationsWithIcons = useMemo(() => homeData.dayTripDestinations.destinations.map(
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
   ), []);
   ```

3. **Lines 186-191** — Delete DayTripDestinationsCarousel render:
   ```tsx
   {/* 9. DAY TRIP DESTINATIONS CAROUSEL */}
   <DayTripDestinationsCarousel
     destinations={dayTripDestinationsWithIcons}
     headline={homeData.dayTripDestinations.headline}
     subheadline={homeData.dayTripDestinations.subheadline}
   />
   ```

4. **Lines 22-34** — Remove now-unused icon imports from lucide-react:
   - Remove: `Landmark`, `Church`, `TreePine`, `Waves`
   - Keep: `MapPin`, `Tag`, `Crown`, `Mountain`, `Calendar`, `Globe`, `DollarSign`

   Final import:
   ```tsx
   import {
     MapPin,
     Tag,
     Crown,
     Mountain,
     Calendar,
     Globe,
     DollarSign,
   } from 'lucide-react';
   ```

### Step 3b: Optionally enrich Day Trips card in `src/content/home.json`

Update the Day Trips category description (line 48) to be more specific:
- Before: `"description": "Escape the city: Debre Libanos Monastery, Tiya UNESCO Site, Menagesha Forest, Bishoftu Crater Lakes."`
- After: `"description": "Debre Libanos Monastery, Tiya UNESCO Site, Menagesha Forest, Bishoftu Crater Lakes — full-day escapes from the city with expert local guides."`

### What stays unchanged:
- `home.json` `dayTripDestinations` section (lines 161-189) — preserved
- `DayTripDestinationsCarousel.tsx` component — preserved
- TourCategorySelector Day Trips card — already links to `/tours/?category=day-trips`

---

## Task 4: Verify No Cross-Page Impact

**No code changes — verification only**:

| Component | Homepage | Other Pages | Action |
|-----------|----------|-------------|--------|
| `TourCardGrid` | ✅ (lines 6, 152) | TourListingPage (line 3) | Keep component, remove filter wrapper |
| `WhyChooseUsPreview` | ✅ (lines 9, 167) | ❌ Homepage-only | Safe to remove import + render |
| `DayTripDestinationsCarousel` | ✅ (lines 11, 187) | ❌ Homepage-only | Safe to remove import + render |
| `TourCategorySelector` | ✅ (lines 7, 112) | ❌ Homepage-only | Keep, Day Trips card already links correctly |
| `WhyChooseUsHero` | ✅ (lines 8, 106) | ❌ Homepage-only | Keep, merge benefits into JSON |
| `PracticalInfoGrid` | ✅ (lines 12, 210) | ❌ Homepage-only | Enhance cards |

---

## Task 5: Enhance "Plan Your Visit to Addis Ababa" Cards

### Step 5a: Update `src/content/home.json`

**Add `image` and `link` fields** to each `practicalInfo.columns` entry:

Replace lines 213-233 with:
```json
"columns": [
  {
    "id": 1,
    "title": "Visa Requirements",
    "description": "Most nationalities require a visa (available on arrival or e-visa). Check requirements before travel. We can assist with visa support letters for confirmed bookings.",
    "image": "/images/travel-guide/airport-layover-planning.jpg",
    "link": "/travel-guide/"
  },
  {
    "id": 2,
    "title": "Best Time to Visit",
    "description": "October to March (dry season, mild temperatures 15–25 °C). Peak tourist season is November–February, coinciding with major festivals like Timket (Epiphany) in January.",
    "image": "/images/travel-guide/best-time-to-visit.jpg",
    "link": "/travel-guide/"
  },
  {
    "id": 3,
    "title": "Currency & Payments",
    "description": "Ethiopian Birr (ETB). ATMs widely available. Credit cards accepted at major hotels and restaurants. We accept USD, EUR, and ETB for tour payments.",
    "image": "/images/travel-guide/coffee-cultural-etiquette.jpg",
    "link": "/travel-guide/"
  },
  {
    "id": 4,
    "title": "Altitude & Health",
    "description": "Addis Ababa is at 2,400 meters (7,874 feet). Take it easy on your first day, stay hydrated, and avoid heavy exertion initially. Tap water is not safe to drink (bottled water provided on tours).",
    "image": "/images/travel-guide/what-to-wear-religious-sites.jpg",
    "link": "/travel-guide/"
  }
]
```

**Image choices** (all verified to exist in `public/images/travel-guide/`):
| Card | Image File | Rationale |
|------|-----------|-----------|
| Visa Requirements | `airport-layover-planning.jpg` | Airport/travel context |
| Best Time to Visit | `best-time-to-visit.jpg` | Exact match |
| Currency & Payments | `coffee-cultural-etiquette.jpg` | Ethiopian culture context |
| Altitude & Health | `what-to-wear-religious-sites.jpg` | Preparation/health context |

### Step 5b: Update `src/types.ts`

**Add `image` and `link` to `HomePracticalInfoColumn`** (lines 249-253):

Before:
```ts
export interface HomePracticalInfoColumn {
  id: number;
  title: string;
  description: string;
}
```

After:
```ts
export interface HomePracticalInfoColumn {
  id: number;
  title: string;
  description: string;
  image?: string;
  link?: string;
}
```

### Step 5c: Rewrite `src/components/home/PracticalInfoGrid.tsx`

**Full file replacement** — match Choose Your Adventure card style:

```tsx
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

interface PracticalInfoGridProps {
  columns: Array<{
    id: number;
    title: string;
    description: string;
    icon: React.ReactNode;
    image?: string;
    link?: string;
  }>;
  headline: string;
  ctaLink: string;
  ctaText: string;
}

export const PracticalInfoGrid: React.FC<PracticalInfoGridProps> = ({
  columns,
  headline,
  ctaLink,
  ctaText,
}) => {
  return (
    <section id="practical-info" className="py-10 bg-sandstone/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-6">
          <h2 className="text-xl md:text-2xl font-serif font-bold text-teal tracking-tight mb-1">
            {headline}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {columns.map((column) => (
            <a
              key={column.id}
              href={column.link || ctaLink}
              className="group relative rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 focus-visible:ring-2 focus-visible:ring-coffee-red focus-visible:ring-offset-2"
            >
              {/* Image on dark gradient background */}
              <div className="relative aspect-[4/3] bg-gradient-to-br from-teal via-teal/90 to-dark-bg overflow-hidden">
                {column.image ? (
                  <img
                    src={column.image}
                    alt={column.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-linen-white/20">
                    {column.icon}
                  </div>
                )}

                {/* Icon badge — top right */}
                <div className="absolute top-3 right-3">
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-coffee-red/90 text-linen-white backdrop-blur-sm">
                    {column.icon}
                  </span>
                </div>
              </div>

              {/* Text body — dark background */}
              <div className="bg-teal p-4">
                <h3 className="text-base font-bold text-linen-white mb-1 leading-snug group-hover:text-gold transition-colors duration-200">
                  {column.title}
                </h3>
                <p className="text-xs text-linen-white/60 leading-relaxed line-clamp-2">
                  {column.description}
                </p>
              </div>
            </a>
          ))}
        </div>

        <div className="text-center mt-8">
          <a
            href={ctaLink}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-coffee-red hover:bg-coffee-red/90 text-linen-white font-mono text-xs uppercase font-bold tracking-wider transition-all duration-300 shadow-md"
          >
            <span>{ctaText}</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>
    </section>
  );
};
```

### Step 5d: No changes needed to `Homepage.tsx` icon mappings

The `practicalInfoColumns` useMemo (lines 89-101) injects icons by index. **Keep as-is** — icons are now used as:
1. Fallback when no image is present (in the image area)
2. Icon badge on the image (top-right corner)

---

## Size Comparison: PracticalInfoGrid Cards

| Aspect | Before | After | Change |
|--------|--------|-------|--------|
| Section padding | `py-12` | `py-10` | -17% |
| Card rounding | `rounded-2xl` | `rounded-xl` | Smaller |
| Card shadow | `shadow-sm` base, `hover:shadow-xl` | `shadow-sm` base, `hover:shadow-lg` | Lighter |
| Card internal padding | `p-6` | `p-4` (text body) | Tighter |
| Icon size | `w-12 h-12` in gold box | `w-9 h-9` in red pill on image | Repositioned |
| Image area | None | `aspect-[4/3]` with dark gradient | New feature |
| Card clickable | No (div) | Yes (anchor `<a>`) | Enhanced |
| CTA | Bottom button only | Card link + bottom button | Dual CTA |
| Grid gap | `gap-6` | `gap-4` | Tighter |
| Bottom margin | `mt-12` | `mt-8` | Reduced |

---

## Error-Proofing Checklist

### Pre-Execution
- [ ] Verify all 4 images exist in `public/images/travel-guide/`
- [ ] Read Homepage.tsx current line numbers for precise edits

### Post-Execution (per task)
- [ ] **Task 1**: Category tabs removed, all 9 tours display, no `activeTab`/`filteredTours` references remain, `useState` removed from import
- [ ] **Task 2**: WhyChooseUsPreview removed from import + render, WhyChooseUsHero still renders, home.json has 7 benefits in `whyChooseUsHero.benefits`
- [ ] **Task 3**: DayTripDestinationsCarousel removed from import + render, `dayTripDestinationsWithIcons` removed, unused icon imports removed, TourCategorySelector Day Trips card still works
- [ ] **Task 4**: TourListingPage still has TourCardGrid with full functionality
- [ ] **Task 5**: PracticalInfoGrid shows 4 dark gradient image cards with icon badges, CTA button present, cards are clickable links

### Final Verification
- [ ] `npx tsc --noEmit` — 0 errors
- [ ] `npm run build` — clean build, 0 errors
- [ ] No orphaned imports in Homepage.tsx
- [ ] Homepage render order: WhyChooseUsHero → TourCategorySelector → TourCardGrid → AddisHighlightsGrid → FinalCTA → TestimonialsCarousel → PracticalInfoGrid

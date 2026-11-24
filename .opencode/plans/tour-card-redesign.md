# Plan: Redesign "Choose Your Adventure" Cards to Match Screenshot

## Objective
Redesign the `TourCard` component in `TourCardGrid.tsx` to match the card outline from the attached screenshot, using only existing fields from the Tour type (no new data fields).

---

## Screenshot Card Elements vs Our Data

| Screenshot Element | Our Available Data | Status |
|--------------------|-------------------|--------|
| Full-width hero image | `tour.images[0]` | ✅ Use |
| "On Sale" badge (top-left) | Not available | ❌ Skip |
| Tour type tag(s) (below image) | `tour.tourType` ("city-tour", "day-trip", "private") | ✅ Use — 1 tag per card |
| Title (bold, 2 lines) | `tour.name` | ✅ Use |
| Location (pin icon) | Not available | ❌ Skip |
| Star rating (gold star + number) | `tour.rating` | ✅ Use |
| Review count | `tour.reviewCount` | ✅ Use |
| Duration (clock icon) | `tour.duration` | ✅ Use |
| Language (flag icon) | Not available | ❌ Skip |
| Meals (fork/knife icon) | Not available (meals excluded) | ❌ Skip |
| Price (red, large) | `tour.pricing.smallGroup.adult` | ✅ Use |
| Original price (strikethrough) | Not available (no original price) | ❌ Skip |
| Group size (green check) | `tour.groupSize` | ✅ Use |

**7 of 12 elements available** — sufficient for a professional card redesign.

---

## Current Card Structure (TourCardGrid.tsx:91-142)

```
┌─────────────────────────┐
│ [Image h-48]            │
│ [Price bar overlay]     │ ← bottom overlay
├─────────────────────────┤
│ [Title h3 text-sm]      │
│ [Star dots + rating]    │
└─────────────────────────┘
```

## Proposed Card Structure (matching screenshot)

```
┌─────────────────────────┐
│ [Image h-56]            │ ← taller image
├─────────────────────────┤
│ [Tour type tag]         │ ← colored pill badge
│ [Title h3 text-base]    │ ← larger title
│ ⏱ Duration              │ ← icon + text row
│ ⭐ Rating (reviewCount) │ ← star icon + number
│ 👥 Group Size           │ ← checkmark + text row
│ [$ Price]               │ ← red, large, "From $XX"
└─────────────────────────┘
```

---

## File Change Summary

| # | File | What Changes |
|---|------|-------------|
| 1 | `src/components/home/TourCardGrid.tsx` | Rewrite `TourCard` component (lines 91-142) |

**1 file, ~50 lines changed.**

---

## Tour Type → Tag Color Mapping

| tourType | Display Label | Tag Color |
|----------|--------------|-----------|
| `city-tour` | City Tour | `bg-pink-100 text-pink-700` |
| `day-trip` | Day Trip | `bg-emerald-100 text-emerald-700` |
| `private` | Private Tour | `bg-amber-100 text-amber-700` |

---

## Step-by-Step Edits

### Step 1: Add tour type tag helper (after line 11, before TourCard)

Insert a helper function to map tourType to display label and color:

```tsx
function getTourTypeTag(tourType: string): { label: string; className: string } {
  switch (tourType) {
    case 'city-tour':
      return { label: 'City Tour', className: 'bg-pink-100 text-pink-700' };
    case 'day-trip':
      return { label: 'Day Trip', className: 'bg-emerald-100 text-emerald-700' };
    case 'private':
      return { label: 'Private Tour', className: 'bg-amber-100 text-amber-700' };
    default:
      return { label: tourType, className: 'bg-gray-100 text-gray-700' };
  }
}
```

### Step 2: Rewrite TourCard component (lines 91-142)

Replace the entire `TourCard` function with:

```tsx
function TourCard({ tour, price }: { tour: Tour; price: string }) {
  const typeTag = getTourTypeTag(tour.tourType);

  return (
    <a
      href={`/tours/${tour.slug}/`}
      className="group bg-linen-white rounded-2xl border border-teal/10 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={tour.images[0]}
          alt={tour.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 gap-2.5">
        {/* Tour Type Tag */}
        <div>
          <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider ${typeTag.className}`}>
            {typeTag.label}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-teal leading-snug line-clamp-2 group-hover:text-coffee-red transition-colors">
          {tour.name}
        </h3>

        {/* Duration */}
        <div className="flex items-center gap-1.5 text-xs text-teal/70">
          <svg className="w-3.5 h-3.5 text-teal/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{tour.duration}</span>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="text-xs font-bold text-teal">{tour.rating.toFixed(1)}</span>
          <span className="text-[10px] text-teal/50">({tour.reviewCount})</span>
        </div>

        {/* Group Size */}
        <div className="flex items-center gap-1.5 text-xs text-emerald-600">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>{tour.groupSize}</span>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Price */}
        <div className="pt-2 border-t border-teal/10">
          <span className="text-[10px] text-teal/50 font-sans">From </span>
          <span className="text-lg font-bold text-coffee-red font-sans">${price}</span>
          <span className="text-[10px] text-teal/50 font-sans"> / person</span>
        </div>
      </div>
    </a>
  );
}
```

---

## What Changes Visually

| Element | Before | After |
|---------|--------|-------|
| Image height | `h-48` (192px) | `h-56` (224px) |
| Card corners | `rounded-xl` | `rounded-2xl` |
| Tour type tag | ❌ Not shown | ✅ Colored pill badge |
| Title size | `text-sm` | `text-base` |
| Duration | ❌ Not shown | ✅ Clock icon + text |
| Rating dots | 5 dots (emerald/teal) | Gold star icon + number |
| Group size | ❌ Not shown | ✅ Checkmark + text |
| Price position | Bottom overlay on image | Bottom of content, separated by border |
| Price format | "from $42 per adult" | "From $42 / person" |
| Internal spacing | `p-4` + `mt-2 mt-auto` | `p-4 gap-2.5` flex column |

---

## What This Does NOT Change
- No new data fields added to tours.json
- No new components created
- No new routes
- No new dependencies
- Card still links to `/tours/${tour.slug}/`
- All existing tour data used (name, images, tourType, duration, rating, reviewCount, groupSize, pricing)

---

## Verification
1. `npx tsc --noEmit` → 0 errors
2. `npm run build` → clean build
3. Visual check: Cards should show tour type tag, title, duration, star rating, group size, and price in a clean vertical layout

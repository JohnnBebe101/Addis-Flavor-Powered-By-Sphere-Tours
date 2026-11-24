# Homepage Production Fixes — Sprint Plan

**8 fixes for production-grade homepage demo**
**Scope**: Homepage only, no cross-page impact

---

## Fix #1: Footer — International Card Icons

**Goal**: Add 6 card brand icons (Visa, Mastercard, Amex, Discover, JCB, UnionPay) without increasing footer vertical height.

**File**: `src/components/Footer.tsx` (91 lines)

### Current state (lines 72-87)
The bottom row has 3 sections: copyright text, "Built with love" text, legal links. All in a flex row with `text-[10px]`.

### Plan
1. Add a card icons row **inside the existing bottom row** — place it between the copyright/attribution section and the legal links, or inline with the copyright row
2. Use inline SVG icons for each card brand (tiny, ~20x14px each)
3. Position in the center of the bottom row on desktop, below copyright on mobile
4. Zero additional vertical padding — the icons are ~14px tall, same as the text line height

### Implementation
- Create a `CardIcons` sub-component inside Footer.tsx (no new file)
- 6 inline SVGs for Visa, Mastercard, Amex, Discover, JCB, UnionPay
- Layout: `flex items-center gap-2` in the bottom row center
- Responsive: On mobile, stack below copyright text. On desktop, inline.

### No data changes
Card icons are hardcoded SVGs — no JSON changes needed.

---

## Fix #2: Homepage — Remove Private Group Tours Card

**Goal**: Remove the `private` tourType card from "Our Most Popular Tours" section on Homepage only. Other pages (TourListingPage) unaffected.

**File**: `src/pages/Homepage.tsx` (line 100)

### Current state
```tsx
<TourCardGrid tours={toursData.tours as Tour[]} />
```
Passes all 9 tours (4 city-tour, 4 day-trip, 1 private) to TourCardGrid.

### Plan
1. Filter out `tourType === 'private'` before passing to TourCardGrid
2. Use `useMemo` to compute filtered list (already imported)
3. This leaves 8 tours = 2 rows of 4 — clean grid

### Implementation
- Add after line 100: `const featuredTours = useMemo(() => (toursData.tours as Tour[]).filter((t) => t.tourType !== 'private'), []);`
- Update line 100: `<TourCardGrid tours={featuredTours} />`

### No impact
- TourListingPage still shows all 9 tours
- TourCardGrid component unchanged

---

## Fix #3: WhyChooseUsHero — Center Convergence + Professional Sizing

**Goal**: Converge all content to center, professional card sizing and dimensions.

**File**: `src/components/home/WhyChooseUsHero.tsx` (149 lines)

### Current state
- `max-w-7xl` container (1280px)
- Row 1: 8/4 grid (hero 8 cols + 1 side card 4 cols)
- Row 2: 3 equal cards in `grid-cols-3`
- Section padding: `py-5 lg:py-6`

### Plan
1. **Center the headline**: Already centered via `text-center` — verify it looks balanced
2. **Converge cards inward**: Reduce `max-w-7xl` to `max-w-6xl` (1152px) or add more horizontal padding — this pulls cards closer to center
3. **Professional sizing**: Ensure consistent card heights in Row 2 by using `h-full` on cards and flex layout
4. **Row 1 centering**: The 8/4 grid is asymmetric by design — keep it but ensure it's centered within the container
5. **Row 2 centering**: The 3-column grid is already centered — ensure consistent card sizing

### Implementation
- Change container from `max-w-7xl` to `max-w-6xl` on line 29
- Add `mx-auto` to Row 2 grid for centering assurance
- Ensure all cards use `h-full` + flex-col for consistent heights

---

## Fix #4: Tours & Destinations — 2-Level Dropdown Menus

**Goal**: Convert both dropdowns from flat multi-column to 2-level (category → items) to avoid covering the whole page.

**Files**: `src/components/Navbar.tsx` (lines 408-474), `src/content/navigation.json`

### Current state
- **Tours dropdown**: 3 columns, 11 items total, `min-w-[460px]` — covers a large area
- **Destinations dropdown**: 2 columns, 8 items total
- Both rendered as flat lists with column headers

### Plan — 2-Level Dropdown Structure
**Level 1**: Show category headers only (e.g., "City Tours", "Day Trips", "Private & Custom")
**Level 2**: On hover of a category, show its 2-3 items in a flyout or expand

### Implementation — Navbar.tsx

1. **Add state for active category**: `const [activeDropdownCategory, setActiveDropdownCategory] = useState<string | null>(null);`

2. **Restructure dropdown rendering** (lines 430-472):
   - Level 1: Render category headers as hoverable items
   - Level 2: On hover, show items for that category in a side panel or expand inline
   - Use CSS `group/group` for hover state management

3. **Dropdown dimensions**:
   - Level 1 panel: `min-w-[200px]` (just category names)
   - Level 2 panel: Appears to the right of Level 1, `min-w-[280px]`
   - Total footprint: ~480px wide but only showing 1 category at a time

4. **Hover behavior**:
   - Hover category → show items after 100ms delay
   - Leave category → hide items after 200ms delay
   - Leave entire dropdown → close all

### Implementation — navigation.json
No changes needed — existing `columns` array structure works. The 2-level rendering is purely a component concern.

### Mobile menu
No changes — mobile accordion already works differently.

---

## Fix #5: Navigation Hover — Tours & Destinations

**Goal**: Fix the hover gap problem between Tours and Destinations dropdown triggers.

**File**: `src/components/Navbar.tsx` (lines 408-474)

### Current state
- Each dropdown trigger is a `div.relative` with `onMouseEnter`/`onMouseLeave`
- 200ms close timeout on mouse leave
- Dropdown panel has `mt-2` gap below trigger

### Root cause
When moving mouse from Tours trigger to Destinations trigger:
1. Mouse leaves Tours `div` → 200ms timer starts
2. Mouse travels through gap between the two triggers
3. If 200ms expires before reaching Destinations → Tours dropdown closes
4. Mouse enters Destinations → opens Destinations dropdown
5. Result: flickering/closing behavior

### Plan
1. **Remove `mt-2` from dropdown panels** — Use `pt-2` instead (invisible padding extends hover zone upward)
2. **Add invisible bridge** between adjacent dropdown triggers using CSS
3. **Increase close timeout** from 200ms to 300ms for smoother transition
4. **Add `pb-1` to trigger buttons** — Extends hover zone downward toward dropdown

### Implementation
- Line 431: Change `mt-2` to `pt-2` on dropdown panel
- Line 397: Change `200` to `300` in setTimeout
- Line 417-419: Add `pb-1` to trigger button className
- The `pt-2` on dropdown panel creates an invisible hover bridge between trigger and panel

---

## Fix #6: Hero — Remove Overlay Content

**Goal**: Remove everything from hero except headline, subtitle, and search bar.

**File**: `src/components/home/HeroBanner.tsx`

### Current state — elements to REMOVE
1. **Trust signal badge** (lines 147-150): "⭐⭐⭐⭐⭐ 4.9/5 from 127 reviews on TripAdvisor"
2. **Trust signals row** (lines 258-269): "Free to search · No hidden fees"
3. **Action links row** (lines 271-292): "View Deals | Call Us"

### Current state — elements to KEEP
1. Headline (h1, lines 153-159)
2. Subtitle (p, lines 162-168)
3. Search bar with category tabs (lines 171-255)

### Plan
1. Remove trust signal badge block (lines 147-150)
2. Remove entire "Trust Signals + Action Links" section (lines 257-293)
3. Keep all search bar functionality intact
4. Verify spacing after removal looks clean

### Implementation
- Delete lines 147-150 (trust signal badge)
- Delete lines 257-293 (trust signals + action links)
- Adjust spacing: The search bar `mt-8` on line 172 may need adjustment after removing above content

---

## Fix #7: Hero — Slider Arrows to Middle-Left/Middle-Right

**Goal**: Move slider arrows from current position to absolute middle-left and middle-right of hero.

**File**: `src/components/home/HeroBanner.tsx` (lines 296-311)

### Current state
- Left arrow: `absolute left-3 sm:left-6 top-[40%] -translate-y-1/2`
- Right arrow: `absolute right-3 sm:right-6 top-[40%] -translate-y-1/2`
- Both are inside the content container `div.relative.z-10.max-w-3xl`

### Problem
Arrows are constrained inside `max-w-3xl` container, not at true hero edges.

### Plan
1. Move arrow buttons **outside** the content container (after line 329, before the gradient div)
2. Position at absolute middle of the hero: `top-1/2 -translate-y-1/2`
3. Left arrow: `left-3 sm:left-6 lg:left-8`
4. Right arrow: `right-3 sm:right-6 lg:right-8`
5. Add `z-30` to ensure arrows are above the background image

### Implementation
- Cut lines 296-311 (both arrow buttons)
- Paste after line 329 (after the `</div>` that closes the content container, before the gradient div)
- Update positioning classes to use `top-1/2` instead of `top-[40%]`
- Ensure `z-30` is set for proper layering

---

## Fix #8: Hero — Consistent Headline/Subtitle Positioning

**Goal**: Ensure all 3 slides have identical text positioning — no vertical shift between slides.

**File**: `src/components/home/HeroBanner.tsx` (lines 144-169)

### Current state
- Text container has `key={activeSlide}` which forces remount on slide change
- Each slide triggers `animate-hero-slide-up` animation
- Different text lengths cause different container heights → visual shift

### Root cause
Slide 1 title: "Addis Ababa City Tours — Book Direct, Save 15%, Get Local Expertise" (75 chars)
Slide 2 title: "Day Trips from Addis Ababa — Monasteries, Gorges & UNESCO Sites" (63 chars)
Slide 3 title: "Private Tours — Fully Customizable, Flexible Pickup, Personal Guide" (66 chars)

Different lengths → different line counts → different container heights → position shift.

### Plan
1. **Fixed-height text container**: Add `min-h-[X]` to the per-slide text div to ensure consistent height
2. **Remove `key={activeSlide}`**: Use CSS transitions instead of remount animation for smoother transitions
3. **Add text container**: `min-h-[200px]` (enough for 2-line title + subtitle) with flex centering
4. **Use opacity/fade transition**: Instead of remount + animate, use opacity crossfade

### Implementation
- Line 146: Remove `key={activeSlide}` from the text div
- Line 146: Add `min-h-[200px] flex flex-col items-center justify-center` to text div
- Add `transition-opacity duration-500` to text div
- Keep `animate-hero-slide-up` only on initial mount, not on slide changes
- Use a separate `transitionActiveSlide` state that changes after animation completes

### Alternative simpler approach
- Keep `key={activeSlide}` but add `min-h-[200px]` to the text div
- This ensures the container height is always the same regardless of text length
- The animation still plays on each slide change
- This is simpler and achieves the same visual consistency

---

## Execution Order

| Step | Fix | Files | Complexity |
|------|-----|-------|-----------|
| 1 | Fix #6: Remove hero overlay content | HeroBanner.tsx | Simple deletions |
| 2 | Fix #8: Hero headline consistency | HeroBanner.tsx | Add min-h |
| 3 | Fix #7: Slider arrow positioning | HeroBanner.tsx | Move + reposition |
| 4 | Fix #2: Filter private tours | Homepage.tsx | 2-line change |
| 5 | Fix #3: WhyChooseUs centering | WhyChooseUsHero.tsx | Container width |
| 6 | Fix #1: Footer card icons | Footer.tsx | Add SVG row |
| 7 | Fix #5: Nav hover fix | Navbar.tsx | Timeout + padding |
| 8 | Fix #4: 2-level dropdowns | Navbar.tsx | Restructure dropdown |

**Rationale**: Hero fixes first (all in same file, batch together), then Homepage, then WhyChooseUs, then Footer, then Navbar fixes last (most complex).

---

## Verification Checklist

### Pre-Execution
- [ ] Read all target files to confirm line numbers
- [ ] Verify no other pages import affected components in unexpected ways

### Post-Execution
- [ ] `npx tsc --noEmit` — 0 errors
- [ ] `npm run build` — clean build
- [ ] Footer: Card icons visible, no height increase
- [ ] Homepage: 8 tours displayed (no private), 2 rows of 4
- [ ] WhyChooseUs: Content centered, professional sizing
- [ ] Navbar Tours dropdown: 2-level, compact
- [ ] Navbar Destinations dropdown: 2-level, compact
- [ ] Navbar hover: Smooth transition between Tours/Destinations
- [ ] Hero: No trustSignal, no trust text, no action links
- [ ] Hero: Slider arrows at absolute left/right middle
- [ ] Hero: All 3 slides have consistent text positioning
- [ ] All existing functionality preserved

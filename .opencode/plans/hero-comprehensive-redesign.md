# Hero Search Bar — Comprehensive Redesign

## Objective
Redesign the hero search bar to match the screenshot's flight search UI pattern, using only existing fields from our project (no new data fields).

---

## Screenshot Analysis

The screenshot shows a flight search interface with this structure:

```
[Category Tabs - OUTSIDE the box]
┌─────────────────────────────────────────────┐
│ [Sub-tabs] [Checkboxes] [Dropdowns]         │ ← Row 1
├─────────────────────────────────────────────┤
│ [FROM] [↕] [TO] [DEPARTURE]                 │ ← Row 2
├─────────────────────────────────────────────┤
│ [Trust Signals] [🔍 Search] [Action Links]  │ ← Row 3
└─────────────────────────────────────────────┘
```

### Key Design Elements:
- **Category tabs**: Outside the box, active = red text + red underline
- **Sub-tabs**: Inside the box, first row, active = red text + red underline
- **Search fields**: Labeled fields with icons
- **Search button**: Large, centered, red
- **Trust signals**: Left-aligned, green checkmark
- **Action links**: Right-aligned, "View Deals" and "Call Us"

---

## Our Existing Fields (No New Data)

| Screenshot Element | Our Mapping | Source |
|--------------------|-------------|--------|
| Category tabs (Flights, Hotels, Cars) | Category tabs (Search All, Things to Do, Hotels, Restaurants, Destinations) | `categories` array in HeroBanner.tsx |
| Sub-tabs (One Way, Round Trip, Multi-City) | Tour type sub-tabs (All Tours, City Tours, Day Trips, Private) | `tourType` field in tours.json |
| Filter checkboxes (Direct only, Nearby) | Not applicable | — |
| Dropdowns (1 Adult, Economy) | Not applicable | — |
| FROM field | Not applicable | — |
| TO field | Not applicable | — |
| DEPARTURE field | Not applicable | — |
| Swap button | Not applicable | — |
| Search button | Search button | Already exists |
| Trust signals | Trust signals | Already exists |
| Action links | Action links | Already exists |

---

## Target Structure

```
[Category Tabs - OUTSIDE the box]
┌─────────────────────────────────────────────┐
│ [All Tours] [City Tours] [Day Trips] [Private] │ ← Sub-tabs (Row 1)
├─────────────────────────────────────────────┤
│ 🔍 Search Tours                            │
│ [text input field]                         │ ← Search input (Row 2)
├─────────────────────────────────────────────┤
│ [🔍 SEARCH]                                │ ← Search button (Row 3)
└─────────────────────────────────────────────┘
[✓ Free to search · No hidden fees] [View Deals | Call Us] ← OUTSIDE
```

---

## File Change Summary

| # | File | Action | Lines Changed |
|---|------|--------|---------------|
| 1 | `src/components/home/HeroBanner.tsx` | Edit | ~100 lines |

---

## Step 1: Add Tour Type Sub-Tabs Array (After Line 48)

### Insert After `const [searchQuery, setSearchQuery] = useState('');` (line 48):

```tsx
  // Tour type sub-tabs (using existing tourType field from tours.json)
  const tourTypes = [
    { id: 'all', label: 'All Tours', icon: Search },
    { id: 'city-tour', label: 'City Tours', icon: MapPin },
    { id: 'day-trip', label: 'Day Trips', icon: Camera },
    { id: 'private', label: 'Private', icon: Bed },
  ];

  const [activeTourType, setActiveTourType] = useState('all');
```

---

## Step 2: Restructure Category Tabs (Lines 163–182)

### Current Code (lines 163–182):
```tsx
          {/* Category Tabs */}
          <div className="flex items-center justify-center gap-1 mb-4 overflow-x-auto pb-1">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-mono whitespace-nowrap transition-all duration-300 ${
                    activeCategory === cat.id
                      ? 'bg-linen-white/15 text-linen-white border-b-2 border-coffee-red font-bold'
                      : 'text-linen-white/60 hover:text-linen-white/80 hover:bg-linen-white/10'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
```

### Replacement Code:
```tsx
          {/* Category Tabs — OUTSIDE Search Box */}
          <div className="flex items-center justify-center gap-2 mb-4 overflow-x-auto pb-1">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-mono whitespace-nowrap transition-all duration-300 ${
                    activeCategory === cat.id
                      ? 'text-linen-white font-bold border-b-2 border-coffee-red'
                      : 'text-linen-white/50 hover:text-linen-white/80'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
```

### What Changes:
- Removed `bg-linen-white/15` from active state → now just red text + red underline
- Removed `hover:bg-linen-white/10` from inactive → cleaner look
- Added `gap-2` for more spacing between tabs
- Added `py-2.5` for slightly taller tabs

---

## Step 3: Restructure Search Box (Lines 184–261)

### Current Code (lines 184–261):
```tsx
          {/* Search Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (searchQuery.trim()) {
                const cat = categories.find((c) => c.id === activeCategory);
                window.location.href = `${cat?.searchPath || '/tours/'}?q=${encodeURIComponent(searchQuery.trim())}`;
              }
            }}
            className="bg-linen-white/15 backdrop-blur-xl border border-linen-white/30 rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.4)] transition-all duration-300 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-gold has-[:focus-visible]:border-gold has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-teal"
          >
            {/* Field Label + Input */}
            <div className="flex items-center px-5 py-4">
              <div className="text-linen-white/80 mr-3">
                <Search className="w-5 h-5 text-gold" />
              </div>
              <div className="flex-1">
                <label className="block text-[10px] font-mono uppercase tracking-widest text-linen-white/50 mb-1">
                  Search Tours
                </label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={categories.find((c) => c.id === activeCategory)?.placeholder || 'Search...'}
                  className="w-full bg-transparent text-linen-white text-sm font-sans focus:outline-none placeholder-linen-white/50"
                  aria-label="Search"
                />
              </div>
            </div>

            {/* Search Button — Full Width */}
            <button
              type="submit"
              className="w-full bg-coffee-red hover:bg-coffee-red/90 text-linen-white font-mono text-sm uppercase font-black tracking-wider py-4 transition-all duration-300 transform active:scale-[0.98] shadow-[0_2px_12px_rgba(166,50,50,0.4)] hover:shadow-[0_4px_20px_rgba(166,50,50,0.5)] flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" />
              <span>Search</span>
            </button>

            {/* Trust Signals + Action Links — Inside Search Box */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 px-5 py-3 border-t border-linen-white/10">
              {/* Trust Signals */}
              <div className="flex items-center gap-2 text-linen-white/60 text-[10px]">
                <span className="flex items-center gap-1">
                  <svg className="w-3 h-3 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Free to search
                </span>
                <span className="text-linen-white/20">·</span>
                <span>No hidden fees</span>
              </div>

              {/* Action Links */}
              <div className="flex items-center gap-3 text-[10px]">
                <a
                  href="/tours/"
                  className="flex items-center gap-1 text-linen-white/60 hover:text-gold transition-colors font-mono uppercase tracking-wider"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  View Deals
                </a>
                <span className="text-linen-white/20">|</span>
                <a
                  href="tel:+251911209882"
                  className="flex items-center gap-1 text-linen-white/60 hover:text-gold transition-colors font-mono uppercase tracking-wider"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call Us
                </a>
              </div>
            </div>
          </form>
```

### Replacement Code:
```tsx
          {/* Search Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (searchQuery.trim()) {
                const cat = categories.find((c) => c.id === activeCategory);
                const typeParam = activeTourType !== 'all' ? `&type=${activeTourType}` : '';
                window.location.href = `${cat?.searchPath || '/tours/'}?q=${encodeURIComponent(searchQuery.trim())}${typeParam}`;
              }
            }}
            className="bg-linen-white/15 backdrop-blur-xl border border-linen-white/30 rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.4)] transition-all duration-300 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-gold has-[:focus-visible]:border-gold has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-teal"
          >
            {/* Sub-tabs — Tour Types (Row 1) */}
            <div className="flex items-center gap-1 px-4 py-2.5 border-b border-linen-white/10 overflow-x-auto">
              {tourTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.id}
                    onClick={() => setActiveTourType(type.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] font-mono whitespace-nowrap transition-all duration-300 ${
                      activeTourType === type.id
                        ? 'bg-coffee-red/80 text-linen-white font-bold shadow-sm'
                        : 'text-linen-white/50 hover:text-linen-white/80 hover:bg-linen-white/10'
                    }`}
                  >
                    <Icon className="w-3 h-3" />
                    <span>{type.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Field Label + Input (Row 2) */}
            <div className="flex items-center px-5 py-4">
              <div className="text-linen-white/80 mr-3">
                <Search className="w-5 h-5 text-gold" />
              </div>
              <div className="flex-1">
                <label className="block text-[10px] font-mono uppercase tracking-widest text-linen-white/50 mb-1">
                  Search Tours
                </label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={categories.find((c) => c.id === activeCategory)?.placeholder || 'Search...'}
                  className="w-full bg-transparent text-linen-white text-sm font-sans focus:outline-none placeholder-linen-white/50"
                  aria-label="Search"
                />
              </div>
            </div>

            {/* Search Button — Full Width (Row 3) */}
            <button
              type="submit"
              className="w-full bg-coffee-red hover:bg-coffee-red/90 text-linen-white font-mono text-sm uppercase font-black tracking-wider py-4 transition-all duration-300 transform active:scale-[0.98] shadow-[0_2px_12px_rgba(166,50,50,0.4)] hover:shadow-[0_4px_20px_rgba(166,50,50,0.5)] flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" />
              <span>Search</span>
            </button>
          </form>

          {/* Trust Signals + Action Links — OUTSIDE Search Box */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4 px-2">
            {/* Trust Signals */}
            <div className="flex items-center gap-2 text-linen-white/70 text-xs">
              <span className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Free to search
              </span>
              <span className="text-linen-white/30">·</span>
              <span>No hidden fees</span>
            </div>

            {/* Action Links */}
            <div className="flex items-center gap-4 text-xs">
              <a
                href="/tours/"
                className="flex items-center gap-1.5 text-linen-white/70 hover:text-gold transition-colors font-mono uppercase tracking-wider"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                View Deals
              </a>
              <span className="text-linen-white/30">|</span>
              <a
                href="tel:+251911209882"
                className="flex items-center gap-1.5 text-linen-white/70 hover:text-gold transition-colors font-mono uppercase tracking-wider"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call Us
              </a>
            </div>
          </div>
```

---

## Complete Replacement Block

Here is the **complete search section** that replaces lines 161–261:

```tsx
        {/* Search Bar with Category Tabs */}
        <div className="max-w-3xl mx-auto pt-4 animate-hero-slide-up" style={{ animationDelay: '350ms' }}>
          {/* Category Tabs — OUTSIDE Search Box */}
          <div className="flex items-center justify-center gap-2 mb-4 overflow-x-auto pb-1">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-mono whitespace-nowrap transition-all duration-300 ${
                    activeCategory === cat.id
                      ? 'text-linen-white font-bold border-b-2 border-coffee-red'
                      : 'text-linen-white/50 hover:text-linen-white/80'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (searchQuery.trim()) {
                const cat = categories.find((c) => c.id === activeCategory);
                const typeParam = activeTourType !== 'all' ? `&type=${activeTourType}` : '';
                window.location.href = `${cat?.searchPath || '/tours/'}?q=${encodeURIComponent(searchQuery.trim())}${typeParam}`;
              }
            }}
            className="bg-linen-white/15 backdrop-blur-xl border border-linen-white/30 rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.4)] transition-all duration-300 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-gold has-[:focus-visible]:border-gold has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-teal"
          >
            {/* Sub-tabs — Tour Types (Row 1) */}
            <div className="flex items-center gap-1 px-4 py-2.5 border-b border-linen-white/10 overflow-x-auto">
              {tourTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.id}
                    onClick={() => setActiveTourType(type.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] font-mono whitespace-nowrap transition-all duration-300 ${
                      activeTourType === type.id
                        ? 'bg-coffee-red/80 text-linen-white font-bold shadow-sm'
                        : 'text-linen-white/50 hover:text-linen-white/80 hover:bg-linen-white/10'
                    }`}
                  >
                    <Icon className="w-3 h-3" />
                    <span>{type.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Field Label + Input (Row 2) */}
            <div className="flex items-center px-5 py-4">
              <div className="text-linen-white/80 mr-3">
                <Search className="w-5 h-5 text-gold" />
              </div>
              <div className="flex-1">
                <label className="block text-[10px] font-mono uppercase tracking-widest text-linen-white/50 mb-1">
                  Search Tours
                </label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={categories.find((c) => c.id === activeCategory)?.placeholder || 'Search...'}
                  className="w-full bg-transparent text-linen-white text-sm font-sans focus:outline-none placeholder-linen-white/50"
                  aria-label="Search"
                />
              </div>
            </div>

            {/* Search Button — Full Width (Row 3) */}
            <button
              type="submit"
              className="w-full bg-coffee-red hover:bg-coffee-red/90 text-linen-white font-mono text-sm uppercase font-black tracking-wider py-4 transition-all duration-300 transform active:scale-[0.98] shadow-[0_2px_12px_rgba(166,50,50,0.4)] hover:shadow-[0_4px_20px_rgba(166,50,50,0.5)] flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" />
              <span>Search</span>
            </button>
          </form>

          {/* Trust Signals + Action Links — OUTSIDE Search Box */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4 px-2">
            {/* Trust Signals */}
            <div className="flex items-center gap-2 text-linen-white/70 text-xs">
              <span className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Free to search
              </span>
              <span className="text-linen-white/30">·</span>
              <span>No hidden fees</span>
            </div>

            {/* Action Links */}
            <div className="flex items-center gap-4 text-xs">
              <a
                href="/tours/"
                className="flex items-center gap-1.5 text-linen-white/70 hover:text-gold transition-colors font-mono uppercase tracking-wider"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                View Deals
              </a>
              <span className="text-linen-white/30">|</span>
              <a
                href="tel:+251911209882"
                className="flex items-center gap-1.5 text-linen-white/70 hover:text-gold transition-colors font-mono uppercase tracking-wider"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call Us
              </a>
            </div>
          </div>
        </div>
```

---

## Visual Result

```
    [Search All] [Things to Do] [Hotels] [Restaurants] [Destinations]
                            ↑ Category tabs (active = red text + underline)

┌─────────────────────────────────────────────────────────────────┐
│ [All Tours] [City Tours] [Day Trips] [Private]                 │
│   ↑ Sub-tabs (active = red pill)                                │
├─────────────────────────────────────────────────────────────────┤
│ 🔍 Search Tours                                                 │
│ [text input field]                                              │
├─────────────────────────────────────────────────────────────────┤
│ [🔍 SEARCH]                                                     │
└─────────────────────────────────────────────────────────────────┘

✓ Free to search · No hidden fees          View Deals | Call Us
  ↑ Trust signals (outside)                  ↑ Action links (outside)
```

---

## Search Functionality Update

When user submits search with a tour type selected:
- **All Tours**: `/tours/?q=<query>`
- **City Tours**: `/tours/?q=<query>&type=city-tour`
- **Day Trips**: `/tours/?q=<query>&type=day-trip`
- **Private**: `/tours/?q=<query>&type=private`

---

## Verification

After edits:
1. `npx tsc --noEmit` → 0 errors
2. `npm run build` → clean build
3. Manual check:
   - Category tabs appear OUTSIDE the search box
   - Sub-tabs appear INSIDE the search box, first row
   - Search input appears INSIDE the search box, second row
   - Search button appears INSIDE the search box, third row
   - Trust signals and action links appear OUTSIDE the search box
   - Selecting a tour type adds `&type=<type>` to the search URL

---

## What This Does NOT Change
- No new data fields added to any JSON files
- No new components created
- No new routes added
- All 5 categories preserved (Search All, Things to Do, Hotels, Restaurants, Destinations)
- All 4 tour types added (All Tours, City Tours, Day Trips, Private) — using existing `tourType` field
- Existing search functionality preserved (redirects to category pages with `?q=` param)

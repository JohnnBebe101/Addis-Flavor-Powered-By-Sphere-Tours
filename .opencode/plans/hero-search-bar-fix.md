# Hero Search Bar Fix — Detailed Actionable Plan

## Objective
Restyle the hero search bar to match the screenshot's flight search UI pattern, using only existing fields from our project (no new data fields).

---

## File Change Summary

| # | File | Action | Lines Changed |
|---|------|--------|---------------|
| 1 | `src/components/home/HeroBanner.tsx` | Edit | ~60 lines (Steps 1–5) |

---

## Step 1: Restyle Category Tabs (Lines 164–182)

### Current Code (lines 164–182):
```tsx
          {/* Category Tabs */}
          <div className="flex items-center justify-center gap-1 mb-3 overflow-x-auto pb-1">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono whitespace-nowrap transition-all duration-300 ${
                    activeCategory === cat.id
                      ? 'bg-linen-white/20 text-linen-white border border-linen-white/30'
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

### What Changes:
- `rounded-full` → `rounded-lg` (less pill-like, more rectangular)
- Active state: `bg-linen-white/20 border border-linen-white/30` → `bg-linen-white/15 border-b-2 border-coffee-red font-bold` (red underline instead of background fill)
- `px-3 py-1.5` → `px-4 py-2` (slightly larger)
- `mb-3` → `mb-4` (more spacing before search input)

---

## Step 2: Restructure Search Input Layout (Lines 185–212)

### Current Code (lines 185–212):
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
            className="bg-linen-white/15 backdrop-blur-xl border border-linen-white/30 p-2 rounded-full flex items-center shadow-[0_4px_24px_rgba(0,0,0,0.4)] transition-all duration-300 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-gold has-[:focus-visible]:border-gold has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-teal"
          >
            <div className="pl-4 text-linen-white/80">
              <Search className="w-5 h-5 text-gold" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={categories.find((c) => c.id === activeCategory)?.placeholder || 'Search...'}
              className="w-full bg-transparent text-linen-white text-sm font-sans py-2.5 px-3 focus:outline-none placeholder-linen-white/50"
              aria-label="Search"
            />
            <button
              type="submit"
              className="bg-gold hover:bg-gold/90 text-teal font-mono text-sm uppercase font-black tracking-wider px-8 py-3 min-h-[48px] rounded-full transition-all duration-300 transform active:scale-95 shadow-[0_2px_12px_rgba(166,124,82,0.5)] hover:shadow-[0_4px_20px_rgba(166,124,82,0.6)] flex items-center justify-center flex-shrink-0"
            >
              Search
            </button>
          </form>
```

### Replacement Code:
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
          </form>
```

### What Changes:
- Container: `p-2 rounded-full flex items-center` → `rounded-2xl overflow-hidden` (rectangular, no inner padding)
- Input area: Added `px-5 py-4` with field label "Search Tours" above the input
- Field icon: Positioned with `mr-3` instead of `pl-4`
- Button: Moved outside the flex row, now `w-full` and `bg-coffee-red` (was `bg-gold`)
- Button size: `px-8 py-3` → `w-full py-4` (full-width, taller)
- Button color: `bg-gold text-teal` → `bg-coffee-red text-linen-white` (matches screenshot's red)
- Button has Search icon + text

---

## Step 3: Add Trust Signals + Action Links Below Search Bar (After line 212)

### Current Code (lines 212–213):
```tsx
          </form>
        </div>
```

### Replacement Code:
```tsx
          </form>

          {/* Trust Signals + Action Links */}
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

### What Changes:
- Added new div below the search form
- **Trust signals**: Uses hardcoded "Free to search" + "No hidden fees" with checkmark SVG icon
- **Action links**: "View Deals" → `/tours/`, "Call Us" → `tel:+251911209882`
- Responsive: `flex-col sm:flex-row` (stacks on mobile, side-by-side on desktop)
- Styling: `text-linen-white/70 hover:text-gold` for links

---

## Complete Replacement Block

For reference, here is the **complete search bar section** that replaces lines 161–213 in HeroBanner.tsx:

```tsx
        {/* Search Bar with Category Tabs */}
        <div className="max-w-3xl mx-auto pt-4 animate-hero-slide-up" style={{ animationDelay: '350ms' }}>
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
          </form>

          {/* Trust Signals + Action Links */}
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

## Verification

After all edits:
1. `npx tsc --noEmit` → 0 errors
2. `npm run build` → clean build
3. Manual check: Hero search bar matches screenshot layout pattern

---

## What This Does NOT Change
- No new data fields added to any JSON files
- No new components created
- No new routes added
- Existing search functionality preserved (redirects to category pages with `?q=` param)
- Tour data structure unchanged
- All 5 categories preserved (Search All, Things to Do, Hotels, Restaurants, Destinations)

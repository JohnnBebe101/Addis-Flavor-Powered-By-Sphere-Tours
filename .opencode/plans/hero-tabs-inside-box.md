# Hero Search Bar — Integrate Category Tabs Inside Search Box

## Objective
Move the category tabs (Search All, Things to Do, Hotels, Restaurants, Destinations) from outside the search box to inside it, creating a unified, professional search component.

---

## Current Structure

```
<div> (outer container)
  <div> (category tabs - OUTSIDE form)
  <form> (search box)
    <div> (field label + input)
    <button> (search button)
    <div> (trust signals + action links)
  </form>
</div>
```

## Target Structure

```
<div> (outer container)
  <form> (search box - everything inside)
    <div> (category tabs - top row, inside form)
    <div> (field label + input - middle row)
    <button> (search button - full width)
    <div> (trust signals + action links - bottom row)
  </form>
</div>
```

---

## Design Concept

The search box will have 4 distinct rows, separated by subtle borders:

```
┌─────────────────────────────────────────────┐
│ [All] [Tours] [Hotels] [Restaurants] [Dest] │ ← Category tabs
├─────────────────────────────────────────────┤
│ 🔍 Search Tours                             │
│ [text input field]                          │ ← Search input
├─────────────────────────────────────────────┤
│ [🔍 SEARCH]                                 │ ← Search button
├─────────────────────────────────────────────┤
│ ✓ Free to search · No hidden fees  View Deals | Call Us │
└─────────────────────────────────────────────┘
```

Each row is separated by `border-b border-linen-white/10` for a clean, professional look.

---

## File Change Summary

| # | File | Action | Lines Changed |
|---|------|--------|---------------|
| 1 | `src/components/home/HeroBanner.tsx` | Edit | ~50 lines |

---

## Step 1: Move Category Tabs Inside Form (Lines 163–182)

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

### Action:
**Delete** lines 163–182 (the entire Category Tabs div that sits outside the form).

---

## Step 2: Add Category Tabs Inside Form (After `<form>` Opening Tag)

### Insert After the `<form>` opening tag (after line 193, before `{/* Field Label + Input */}`):

```tsx
            {/* Category Tabs — Inside Search Box */}
            <div className="flex items-center justify-center gap-1 px-4 py-2.5 border-b border-linen-white/10 overflow-x-auto">
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] font-mono whitespace-nowrap transition-all duration-300 ${
                      activeCategory === cat.id
                        ? 'bg-coffee-red/80 text-linen-white font-bold shadow-sm'
                        : 'text-linen-white/50 hover:text-linen-white/80 hover:bg-linen-white/10'
                    }`}
                  >
                    <Icon className="w-3 h-3" />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>
```

### Design Notes:
- **Active state**: `bg-coffee-red/80 text-linen-white font-bold shadow-sm` — filled pill with subtle shadow
- **Inactive state**: `text-linen-white/50 hover:text-linen-white/80 hover:bg-linen-white/10` — transparent with hover
- **Border**: `border-b border-linen-white/10` — separates tabs from input field
- **Size**: `text-[11px]` and `px-3 py-1.5` — compact to fit 5 tabs
- **Container**: `px-4 py-2.5` — padding around tabs row

---

## Complete Replacement Block

Here is the **complete search form section** that replaces lines 184–261:

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
            {/* Category Tabs — Inside Search Box */}
            <div className="flex items-center justify-center gap-1 px-4 py-2.5 border-b border-linen-white/10 overflow-x-auto">
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] font-mono whitespace-nowrap transition-all duration-300 ${
                      activeCategory === cat.id
                        ? 'bg-coffee-red/80 text-linen-white font-bold shadow-sm'
                        : 'text-linen-white/50 hover:text-linen-white/80 hover:bg-linen-white/10'
                    }`}
                  >
                    <Icon className="w-3 h-3" />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>

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

---

## Visual Result

```
┌─────────────────────────────────────────────┐
│ [All] [Tours] [Hotels] [Restaurants] [Dest] │ ← Category tabs (active = red pill)
├─────────────────────────────────────────────┤
│ 🔍 Search Tours                             │
│ [text input field]                          │ ← Search input
├─────────────────────────────────────────────┤
│ [🔍 SEARCH]                                 │ ← Search button (full width, red)
├─────────────────────────────────────────────┤
│ ✓ Free to search · No hidden fees  View Deals | Call Us │ ← Trust + links
└─────────────────────────────────────────────┘
```

The search box is now a **single unified component** with 4 rows, each separated by a subtle `border-b border-linen-white/10` divider.

---

## Verification

After edits:
1. `npx tsc --noEmit` → 0 errors
2. `npm run build` → clean build
3. Manual check: Category tabs appear inside the search box, above the input field

---

## What This Does NOT Change
- No new data fields added to any JSON files
- No new components created
- No new routes added
- Existing search functionality preserved (redirects to category pages with `?q=` param)
- All 5 categories preserved (Search All, Things to Do, Hotels, Restaurants, Destinations)
- Category selection behavior unchanged

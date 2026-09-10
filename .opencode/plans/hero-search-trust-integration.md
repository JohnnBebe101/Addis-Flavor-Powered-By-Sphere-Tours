# Hero Search Bar — Integrate Trust Signals Inside Search Box

## Objective
Move the trust signals ("Free to search · No hidden fees") and action links ("View Deals | Call Us") from outside the search box to inside it, below the search button.

---

## File Change Summary

| # | File | Action | Lines Changed |
|---|------|--------|---------------|
| 1 | `src/components/home/HeroBanner.tsx` | Edit | ~40 lines |

---

## Current Structure (Lines 184–261)

```
<form>                              ← Line 185
  <div> (Field Label + Input)       ← Line 196
  </div>
  <button> (Search Button)          ← Line 216
  </button>
</form>                             ← Line 223

<div> (Trust Signals + Action Links) ← Line 226 (OUTSIDE form)
  ... trust signals ...
  ... action links ...
</div>                              ← Line 261
```

## Target Structure

```
<form>                              ← Line 185
  <div> (Field Label + Input)       ← Line 196
  </div>
  <button> (Search Button)          ← Line 216
  </button>
  <div> (Trust + Links)             ← INSIDE form, below button
    ... trust signals ...
    ... action links ...
  </div>
</form>
```

---

## Step 1: Move Trust Signals Inside Form (Lines 225–261)

### Current Code (lines 225–261):
```tsx
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
```

### Action:
**Delete** lines 225–261 (the entire Trust Signals + Action Links div that sits outside the form).

---

## Step 2: Add Trust Signals Inside Form (After Line 222, Before `</form>`)

### Insert After the Search Button (after line 222, before the closing `</form>` tag):

```tsx
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
```

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
│  🔍 Search Tours                            │
│  [text input field]                         │
├─────────────────────────────────────────────┤
│  [🔍 SEARCH]                                │
├─────────────────────────────────────────────┤
│  ✓ Free to search · No hidden fees  View Deals | Call Us │
└─────────────────────────────────────────────┘
```

The trust signals and action links now sit **inside** the search box, separated by a subtle `border-t border-linen-white/10` divider, with smaller text (`text-[10px]`) to fit compactly.

---

## Verification

After edits:
1. `npx tsc --noEmit` → 0 errors
2. `npm run build` → clean build
3. Manual check: Trust signals and links appear inside the search box, below the button

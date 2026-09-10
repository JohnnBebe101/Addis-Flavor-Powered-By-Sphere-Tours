# Hero UX Enhancements — Detailed Actionable Plan

## Files Modified
| # | File | Action |
|---|------|--------|
| 1 | `src/components/home/HeroBanner.tsx` | Edit (4 changes) |
| 2 | `src/components/Navbar.tsx` | Edit (2 changes) |
| 3 | `src/components/MegaMenuDropdown.tsx` | Move to `_archived/` |
| 4 | `src/index.css` | Edit (1 change) |

---

## Enhancement 1: Headline Resize + Per-Slide Animations

### Step 1.1 — Reduce headline font size

**File:** `src/components/home/HeroBanner.tsx`  
**Line 143** — Change `text-4xl sm:text-6xl` to `text-3xl sm:text-5xl`

```tsx
// BEFORE (line 143):
className="text-4xl sm:text-6xl font-serif font-black text-linen-white tracking-tight leading-tight uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] animate-hero-slide-up"

// AFTER:
className="text-3xl sm:text-5xl font-serif font-black text-linen-white tracking-tight leading-tight uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] animate-hero-slide-up"
```

### Step 1.2 — Wrap text content in a keyed div for per-slide animation

**File:** `src/components/home/HeroBanner.tsx`  
**Lines 134–159** — Wrap the badge, headline, subtitle, and search bar in a `<div key={activeSlide}>`. This forces React to unmount/remount on slide change, re-triggering `animate-hero-slide-up`.

```tsx
// BEFORE (line 134):
<div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 space-y-6">
  {/* Announcement Badge */}
  <div className="inline-flex ... animate-hero-slide-up" ...>
    <span>{slides[activeSlide].trustSignal}</span>
  </div>

  {/* Slide Title */}
  <h1 ... className="text-4xl sm:text-6xl ... animate-hero-slide-up" ...>
    {slides[activeSlide].title}
  </h1>

  {/* Slide Subtitle */}
  <p ... className="text-base sm:text-xl ... animate-hero-slide-up" ...>
    {slides[activeSlide].subtitle}
  </p>

  {/* Search Bar */}
  <div className="max-w-3xl mx-auto pt-4 animate-hero-slide-up" ...>
    ...
  </div>
</div>

// AFTER:
<div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 space-y-6">
  {/* Per-slide text content — key forces remount on slide change */}
  <div key={activeSlide} className="space-y-4">
    {/* Announcement Badge */}
    <div className="inline-flex items-center bg-gold/20 backdrop-blur-md border border-gold/40 text-gold px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest animate-hero-slide-up" style={{ animationDelay: '0ms' }}>
      <span>{slides[activeSlide].trustSignal}</span>
    </div>

    {/* Slide Title */}
    <h1
      id="hero-headline"
      className="text-3xl sm:text-5xl font-serif font-black text-linen-white tracking-tight leading-tight uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] animate-hero-slide-up"
      style={{ animationDelay: '100ms' }}
    >
      {slides[activeSlide].title}
    </h1>

    {/* Slide Subtitle */}
    <p
      id="hero-subheadline"
      className="text-base sm:text-xl text-sandstone max-w-2xl mx-auto font-sans font-normal leading-relaxed drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)] animate-hero-slide-up"
      style={{ animationDelay: '200ms' }}
    >
      {slides[activeSlide].subtitle}
    </p>
  </div>

  {/* Search Bar with Category Tabs (NOT keyed — persists across slides) */}
  <div className="max-w-3xl mx-auto pt-4 animate-hero-slide-up" style={{ animationDelay: '350ms' }}>
    ...
  </div>
</div>
```

**Key changes:**
- New `<div key={activeSlide} className="space-y-4">` wraps badge + headline + subtitle
- Badge `animationDelay: '0ms'` (was implicit)
- Headline `animationDelay: '100ms'` (was `'150ms'`)
- Subtitle `animationDelay: '200ms'` (was `'300ms'`)
- Search bar `animationDelay: '350ms'` (was `'450ms'`) — sits outside the keyed div
- Headline font reduced to `text-3xl sm:text-5xl`

---

## Enhancement 2: Replace Mega Menu with Standard Dropdown

### Step 2.1 — Remove MegaMenuDropdown import

**File:** `src/components/Navbar.tsx`  
**Line 23** — Delete this line:

```tsx
// DELETE:
import { MegaMenuDropdown } from './MegaMenuDropdown';
```

### Step 2.2 — Replace MegaMenuDropdown usage with inline dropdown

**File:** `src/components/Navbar.tsx`  
**Lines 401–433** — Replace the `if (isDropdown && item.columns)` block in `DesktopNavItem`.

```tsx
// BEFORE (lines 401-433):
if (isDropdown && item.columns) {
  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        ref={triggerRef}
        className={`flex items-center space-x-1 uppercase tracking-wider text-xs transition-colors duration-200 ${
          isScrolled ? 'text-teal hover:text-coffee-red' : 'text-linen-white hover:text-gold'
        }`}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {translations[`nav${item.label.replace(/\s+/g, '')}` as keyof Translations] || item.label}
        <ChevronDown
          className={`w-3 h-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      <MegaMenuDropdown
        isOpen={isOpen}
        columns={item.columns}
        link={item.link}
        label={item.label}
        isGlobalDark={isGlobalDark}
        triggerRef={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
    </div>
  );
}

// AFTER:
if (isDropdown && item.columns) {
  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        ref={triggerRef}
        className={`flex items-center space-x-1 uppercase tracking-wider text-xs transition-colors duration-200 ${
          isScrolled ? 'text-teal hover:text-coffee-red' : 'text-linen-white hover:text-gold'
        }`}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {translations[`nav${item.label.replace(/\s+/g, '')}` as keyof Translations] || item.label}
        <ChevronDown
          className={`w-3 h-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Standard dropdown — fade + slide, no portal */}
      <div
        className={`absolute top-full left-0 mt-2 min-w-[460px] bg-linen-white rounded-xl shadow-xl border border-teal/10 p-5 transition-all duration-150 ease-out ${
          isOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-1 pointer-events-none'
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        role="menu"
      >
        {item.columns.map((col, colIdx) => (
          <div key={colIdx} className={colIdx > 0 ? 'pt-3 mt-3 border-t border-teal/5' : ''}>
            <h4 className="font-mono text-[11px] uppercase tracking-widest font-bold text-gold mb-2">
              {col.title}
            </h4>
            <div className="space-y-0.5">
              {col.items.map((subItem, itemIdx) => (
                <a
                  key={itemIdx}
                  href={subItem.link}
                  className="flex items-center justify-between py-2 px-3 rounded-lg text-sm text-teal hover:bg-teal/5 hover:text-coffee-red transition-colors duration-150"
                >
                  <span className="font-medium">{subItem.label}</span>
                  <div className="flex items-center space-x-2 text-[11px] font-mono text-gold flex-shrink-0 ml-3">
                    {subItem.price && <span>{subItem.price}</span>}
                    {subItem.duration && <span className="opacity-60">· {subItem.duration}</span>}
                  </div>
                </a>
              ))}
            </div>
          </div>
        ))}
        {item.link && (
          <div className="border-t border-teal/10 pt-3 mt-3">
            <a
              href={item.link}
              className="flex items-center justify-center font-mono text-xs font-bold uppercase tracking-wider text-coffee-red hover:text-teal transition-colors"
            >
              View All {item.label} →
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
```

**Key design decisions:**
- `transition-all duration-150 ease-out` — fast, per research (120-180ms ideal)
- `opacity-0 -translate-y-1` → `opacity-100 translate-y-0` — subtle 4px slide up
- `pointer-events-none` when closed — prevents ghost clicks
- `bg-linen-white` — always light background (no dark mode needed for dropdown)
- `min-w-[460px]` — fits all columns without wrapping
- Col separators with `border-t border-teal/5` — subtle grouping
- Removed `isGlobalDark` from dropdown rendering — dropdown is always light

### Step 2.3 — Move MegaMenuDropdown.tsx to _archived

```powershell
Move-Item -Path "src/components/MegaMenuDropdown.tsx" -Destination "src/components/_archived/MegaMenuDropdown.tsx"
```

---

## Enhancement 3: Remove Overlay Gradient

### Step 3.1 — Remove gradient from hero background

**File:** `src/components/home/HeroBanner.tsx`  
**Line 113** — Remove the `linear-gradient(...)` from `backgroundImage`, keep only the image URL.

```tsx
// BEFORE (line 112-114):
style={{
  backgroundImage: `linear-gradient(to bottom, rgba(45, 41, 38, 0.10), rgba(45, 41, 38, 0.35)), url(${slides[activeSlide].image})`,
}}

// AFTER:
style={{
  backgroundImage: `url(${slides[activeSlide].image})`,
}}
```

### Step 3.2 — Add text-shadow to headline for readability

**File:** `src/components/home/HeroBanner.tsx`  
**Line 143** — Replace the `drop-shadow` class with an inline `textShadow` style for more control.

```tsx
// BEFORE (line 143):
className="text-3xl sm:text-5xl font-serif font-black text-linen-white tracking-tight leading-tight uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] animate-hero-slide-up"

// AFTER:
className="text-3xl sm:text-5xl font-serif font-black text-linen-white tracking-tight leading-tight uppercase animate-hero-slide-up"
style={{ animationDelay: '100ms', textShadow: '0 2px 12px rgba(0,0,0,0.7), 0 1px 3px rgba(0,0,0,0.5)' }}
```

### Step 3.3 — Add text-shadow to subtitle

**File:** `src/components/home/HeroBanner.tsx`  
**Line 152** — Replace `drop-shadow` class with inline `textShadow`.

```tsx
// BEFORE (line 152):
className="text-base sm:text-xl text-sandstone max-w-2xl mx-auto font-sans font-normal leading-relaxed drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)] animate-hero-slide-up"

// AFTER:
className="text-base sm:text-xl text-sandstone max-w-2xl mx-auto font-sans font-normal leading-relaxed animate-hero-slide-up"
style={{ animationDelay: '200ms', textShadow: '0 1px 8px rgba(0,0,0,0.6), 0 1px 2px rgba(0,0,0,0.4)' }}
```

### Step 3.4 — Add text-shadow to badge

**File:** `src/components/home/HeroBanner.tsx`  
**Line 136** — Add inline `textShadow` to the badge.

```tsx
// BEFORE (line 136):
<div className="inline-flex items-center bg-gold/20 backdrop-blur-md border border-gold/40 text-gold px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest animate-hero-slide-up" style={{ animationDelay: '0ms' }}>

// AFTER:
<div className="inline-flex items-center bg-gold/20 backdrop-blur-md border border-gold/40 text-gold px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest animate-hero-slide-up" style={{ animationDelay: '0ms', textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>
```

### Step 3.5 (Optional) — Add subtle bottom gradient behind search bar

**File:** `src/components/home/HeroBanner.tsx`  
**After line 259** (before closing `</header>`) — Add a gradient strip behind the search area.

```tsx
{/* Subtle bottom gradient for search bar readability */}
<div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/25 to-transparent pointer-events-none" aria-hidden="true" />
```

Insert this **before** the closing `</div>` of the main content area (line 259), or right before `</header>`.

---

## Enhancement 4: Remove Pause Button

### Step 4.1 — Delete the pause/play button

**File:** `src/components/home/HeroBanner.tsx`  
**Lines 229–239** — Delete this entire block:

```tsx
{/* Play/Pause Button */}
<button
  onClick={() => setIsPlaying(!isPlaying)}
  className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 p-2 rounded-full bg-linen-white/20 border border-linen-white/30 text-linen-white hover:bg-linen-white/30 hover:text-gold transition-all duration-300 z-20"
  aria-label={isPlaying ? 'Pause autoplay' : 'Play autoplay'}
>
  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
  <span className="text-[10px] font-mono uppercase tracking-wider hidden sm:block">
    {isPlaying ? 'Pause' : 'Play'}
  </span>
</button>
```

### Step 4.2 — Remove Pause and Play from lucide-react import

**File:** `src/components/home/HeroBanner.tsx`  
**Line 7** — Remove `Pause` and `Play` from the import.

```tsx
// BEFORE (line 7):
import { Search, ChevronRight, ChevronLeft, Pause, Play, Camera, Bed, UtensilsCrossed, MapPin } from 'lucide-react';

// AFTER:
import { Search, ChevronRight, ChevronLeft, Camera, Bed, UtensilsCrossed, MapPin } from 'lucide-react';
```

### Step 4.3 — Keep isPlaying state (no change needed)

`isPlaying` state (line 32) and its effect (lines 51-61) remain. The auto-advance still pauses on hover via `isHovered`. This is the standard UX — no user-facing control needed.

---

## Verification Checklist

After all edits, run:

```powershell
npx tsc --noEmit
```

Expected: 0 errors

```powershell
npm run build
```

Expected: Clean build, no warnings related to these files

### Manual checks:
1. **Hero headline** — Visibly smaller (`text-3xl sm:text-5xl`), text re-animates on each slide change
2. **Hero images** — Full vibrancy, no teal tint. Text readable via shadows
3. **Hero bottom** — No pause button. Slide indicators still visible at bottom-center
4. **Nav Tours** — Hover triggers inline dropdown (not portal), fades in 150ms, shows 3 columns
5. **Nav Destinations** — Same inline dropdown behavior, 2 columns
6. **MegaMenuDropdown.tsx** — No longer in `src/components/`, moved to `_archived/`

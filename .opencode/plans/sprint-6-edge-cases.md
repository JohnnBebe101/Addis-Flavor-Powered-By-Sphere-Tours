# Sprint 6: Edge Case Handling & Error Recovery

**Status**: PLANNED — Ready for execution
**Risk Level**: Medium (Task 6.1 changes route rendering behavior)
**Verification after each task**: `npx tsc --noEmit` must pass clean

---

## Pre-Conditions (already verified)

- Sprints 3, 4, 5 complete and verified (60/60 checks PASS)
- `src/router/Layout.tsx:48-51`: ErrorBoundary wraps `<Outlet />` but NO `<Suspense>`
- `src/router/routes.tsx`: 17 lazy routes + 404 catch-all (all use `lazy: () => import(...)`)
- `src/components/ErrorBoundary.tsx:50`: "Try Again" only calls `setState` — does NOT reload failed chunks

---

## Task 6.1 — Add Suspense around Outlet + skeleton fallback

**File**: `src/router/Layout.tsx`

**Why**: Without `<Suspense>` around `<Outlet />`, React unmounts the entire Layout during lazy route transitions, causing a blank flash. Adding Suspense keeps the navbar/footer visible while the route chunk loads.

**Risk**: MEDIUM — changes route rendering behavior
**Mitigation**: Skeleton fallback provides visual feedback. Test all 17 routes after change.

### Step 1: Add `RouteLoadingSkeleton` function BEFORE the `Layout` component (after line 12)

```tsx
function RouteLoadingSkeleton() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-coffee-red/20 border-t-coffee-red rounded-full animate-spin" />
    </div>
  );
}
```

### Step 2: Wrap `<Outlet />` in `<Suspense>` (modify lines 48-51)

**Current** (lines 48-51):
```tsx
      <main id="main-content">
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </main>
```

**Replace with**:
```tsx
      <main id="main-content">
        <ErrorBoundary>
          <Suspense fallback={<RouteLoadingSkeleton />}>
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </main>
```

### Step 3: Verify

- `npx tsc --noEmit` — passes clean
- Navigate `/tours/` → `/tours/some-slug/` → `/contact/` — no blank flash, spinner visible

---

## Task 6.2 — Add ErrorBoundary around HomeHero + improve Suspense fallback

**File**: `src/router/Layout.tsx`

**Why**: HomeHero is lazy-loaded but wrapped only in `<Suspense fallback={null}>`. If its chunk fails, the error bubbles to the Layout-level ErrorBoundary, which shows a full-page error. Wrapping HomeHero separately keeps the rest of the page intact.

**Risk**: LOW — additive wrapper only
**Mitigation**: `fallback={<div />}` ensures nothing breaks if ErrorBoundary renders its fallback.

### Step 1: Modify lines 43-47

**Current** (lines 43-47):
```tsx
      {pathname === '/' && (
        <Suspense fallback={null}>
          <HomeHero />
        </Suspense>
      )}
```

**Replace with**:
```tsx
      {pathname === '/' && (
        <ErrorBoundary fallback={<div />}>
          <Suspense fallback={<div className="min-h-[80vh] bg-sandstone/20 animate-pulse" />}>
            <HomeHero />
          </Suspense>
        </ErrorBoundary>
      )}
```

### Step 2: Verify

- `npx tsc --noEmit` — passes clean
- Homepage loads normally (hero visible)
- If HomeHero chunk fails, navbar/footer still render

---

## Task 6.3 — Fix ErrorBoundary chunk-load retry

**File**: `src/components/ErrorBoundary.tsx`

**Why**: When a lazy chunk fails, the browser caches the failed import. "Try Again" resetting state causes the same chunk to fail again. Chunk errors need `window.location.reload()` to bypass the cache.

**Risk**: LOW — only changes error handling path, no visual changes to working state
**Mitigation**: Non-chunk errors still use the original `setState` reset behavior.

### Step 1: Update `ErrorBoundaryState` interface (lines 9-12)

**Current**:
```tsx
interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}
```

**Replace with**:
```tsx
interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  isChunkLoadError: boolean;
}
```

### Step 2: Update initial state in constructor (line 20)

**Current**:
```tsx
    this.state = { hasError: false, error: null };
```

**Replace with**:
```tsx
    this.state = { hasError: false, error: null, isChunkLoadError: false };
```

### Step 3: Update `getDerivedStateFromError` (lines 23-25)

**Current**:
```tsx
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }
```

**Replace with**:
```tsx
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    const isChunkLoad = error instanceof TypeError &&
      (error.message.includes('dynamically imported module') ||
       error.message.includes('fetch'));
    return { hasError: true, error, isChunkLoadError: isChunkLoad };
  }
```

### Step 4: Update "Try Again" button onClick (line 50)

**Current**:
```tsx
                onClick={() => this.setState({ hasError: false, error: null })}
```

**Replace with**:
```tsx
                onClick={() => {
                  if (this.state.isChunkLoadError) {
                    window.location.reload();
                  } else {
                    this.setState({ hasError: false, error: null, isChunkLoadError: false });
                  }
                }}
```

### Step 5: Update error message (lines 43-46)

**Current**:
```tsx
              <p className="text-sm text-teal/70 leading-relaxed">
                We hit an unexpected error loading this page. Please try again or return to the
                homepage.
              </p>
```

**Replace with**:
```tsx
              <p className="text-sm text-teal/70 leading-relaxed">
                {this.state.isChunkLoadError
                  ? 'A network error occurred while loading this page. Please check your connection and try again.'
                  : 'We hit an unexpected error loading this page. Please try again or return to the homepage.'}
              </p>
```

### Step 6: Verify

- `npx tsc --noEmit` — passes clean
- `npm run build` — succeeds
- Normal error: "Try Again" resets state (existing behavior preserved)
- Chunk error: "Try Again" reloads page (new behavior)

---

## Task 6.4 — Add loading="lazy" to remaining images

**Why**: Below-the-fold images should load lazily to improve initial page load performance.

**Risk**: LOW — additive attribute, no visual change
**Mitigation**: Each `<img>` tag gets `loading="lazy"` added. No other attributes changed.

### Step 1: FinalCTA.tsx line 81

**File**: `src/components/home/FinalCTA.tsx`

**Current** (lines 81-85):
```tsx
              <img
                src={imgSrc}
                alt="Explore Addis Ababa"
                className="absolute inset-0 w-full h-full object-cover"
              />
```

**Replace with** (add `loading="lazy"` after `alt`):
```tsx
              <img
                src={imgSrc}
                alt="Explore Addis Ababa"
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover"
              />
```

### Step 2: AboutSection.tsx line 61

**File**: `src/components/about/AboutSection.tsx`

**Current** (lines 61-66):
```tsx
           <img
             src={cookingClassImg}
             alt="Ethiopian culinary hosting"
             className="relative rounded-3xl object-cover w-full h-[350px] sm:h-[450px] shadow-2xl border-4 border-gold/25"
             referrerPolicy="no-referrer"
           />
```

**Replace with** (add `loading="lazy"` after `alt`):
```tsx
           <img
             src={cookingClassImg}
             alt="Ethiopian culinary hosting"
             loading="lazy"
             className="relative rounded-3xl object-cover w-full h-[350px] sm:h-[450px] shadow-2xl border-4 border-gold/25"
             referrerPolicy="no-referrer"
           />
```

### Step 3: AboutSection.tsx line 176

**Current** (lines 176-181):
```tsx
           <img
             src={cookingClassImg}
             alt="Ethiopian family hosts"
             className="relative rounded-3xl object-cover w-full h-[350px] sm:h-[450px] shadow-2xl border-4 border-gold/25"
             referrerPolicy="no-referrer"
           />
```

**Replace with** (add `loading="lazy"` after `alt`):
```tsx
           <img
             src={cookingClassImg}
             alt="Ethiopian family hosts"
             loading="lazy"
             className="relative rounded-3xl object-cover w-full h-[350px] sm:h-[450px] shadow-2xl border-4 border-gold/25"
             referrerPolicy="no-referrer"
           />
```

### Step 4: BookPage.tsx line 299

**File**: `src/pages/BookPage.tsx`

**Current** (lines 299-300):
```tsx
                  <img src={selectedTour.images[0]} alt={selectedTour.name}
                    className="w-full h-48 object-cover" />
```

**Replace with**:
```tsx
                  <img src={selectedTour.images[0]} alt={selectedTour.name}
                    loading="lazy" className="w-full h-48 object-cover" />
```

### Step 5: Verify

- `npx tsc --noEmit` — passes clean
- Inspect each `<img>` in DevTools — `loading="lazy"` attribute present

---

## Task 6.5 — Full verification

### Automated checks:
1. `npx tsc --noEmit` — must pass clean
2. `npm run build` — must succeed with no errors

### Manual checks:
3. Navigate all major routes — no blank flash during transitions
4. Homepage hero shows skeleton during load (not nothing)
5. Error boundary displays correct message for chunk vs non-chunk errors

---

## Risk Matrix

| Task | Risk | Probability | Impact | Mitigation |
|------|------|-------------|--------|------------|
| 6.1 Suspense | MEDIUM | Low | Blank flash eliminated | Skeleton fallback, test all 17 routes |
| 6.2 HomeHero EB | LOW | Very Low | Page stays intact | Additive wrapper, empty fallback |
| 6.3 Chunk retry | LOW | Low | Retry works correctly | Only changes error path, preserves normal reset |
| 6.4 Lazy images | LOW | Very Low | Faster initial load | Additive attribute only |

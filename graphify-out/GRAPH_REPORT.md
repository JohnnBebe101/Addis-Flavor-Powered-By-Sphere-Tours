# Graph Report - Addis-Flavor-Powered-By-Sphere-Tours  (2026-11-21)

## Corpus Check
- 137 files · ~256,422 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 16 file(s) not represented in the graph (top: (none) 5, .woff2 5, .css 2)

## Summary
- 602 nodes · 1035 edges · 28 communities (24 shown, 4 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 2 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `40600de7`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- types.ts
- Homepage.tsx
- react
- BookPage.tsx
- routes.tsx
- JSONLD.tsx
- Layout.tsx
- AboutPage.tsx
- compilerOptions
- fetch-fonts.mjs
- TourBookingModal.tsx
- steps
- package.json
- ref_path
- font-text-set.mjs
- optimize-images.mjs
- TourListingPage.tsx
- scripts
- TourDetailPage.tsx
- ref_fs
- content.d.ts
- TestimonialsCarousel.tsx
- HowBookingWorks.tsx
- inline-css.mjs
- check-image-budget.mjs
- optimize-svg.mjs
- FAQAccordion.tsx
- check-font-budget.mjs

## God Nodes (most connected - your core abstractions)
1. `lucide-react` - 52 edges
2. `react` - 46 edges
3. `react-router-dom` - 24 edges
4. `compilerOptions` - 17 edges
5. `scripts` - 16 edges
6. `Homepage()` - 16 edges
7. `Layout()` - 12 edges
8. `SEO()` - 11 edges
9. `Tour` - 11 edges
10. `FAQJSONLD()` - 10 edges

## Surprising Connections (you probably didn't know these)
- `TourCardGridProps` --references--> `Tour`  [EXTRACTED]
  src/components/home/TourCardGrid.tsx → src/types.ts
- `CookiePreferences()` --calls--> `useCookieConsent()`  [EXTRACTED]
  src/components/CookiePreferences.tsx → src/context/CookieConsentContext.tsx
- `Homepage()` --calls--> `OrganizationJSONLD()`  [EXTRACTED]
  src/pages/Homepage.tsx → src/components/JSONLD.tsx
- `Homepage()` --calls--> `LocalBusinessJSONLD()`  [EXTRACTED]
  src/pages/Homepage.tsx → src/components/JSONLD.tsx
- `Layout()` --calls--> `Navbar()`  [EXTRACTED]
  src/router/Layout.tsx → src/components/Navbar.tsx

## Import Cycles
- None detected.

## Communities (28 total, 4 thin omitted)

### Community 0 - "types.ts"
Cohesion: 0.03
Nodes (74): AboutData, AboutTeamMember, AboutWhyDifferentPoint, BookingData, BookingFlow, BookingFlowStep, BookingFormField, BookingPolicy (+66 more)

### Community 1 - "Homepage.tsx"
Cohesion: 0.06
Nodes (30): GoogleReviewsWidget(), SkeletonPlaceholder(), AddisHighlightsGridProps, FinalCTAProps, HeroIntentRouter(), TAB_ICONS, FormData, INITIAL_FORM (+22 more)

### Community 2 - "react"
Cohesion: 0.09
Nodes (33): react, BrandLogo(), BrandLogoProps, BrandLogoSize, BrandLogoVariant, sizeMap, srcMap, DayTripDestinationsCarouselProps (+25 more)

### Community 3 - "BookPage.tsx"
Cohesion: 0.07
Nodes (32): lucide-react, BookingStep1(), BookingStep1Props, BookingStep2(), BookingStep2Props, BookingStep3(), BookingStep3Props, BookingSuccess() (+24 more)

### Community 4 - "routes.tsx"
Cohesion: 0.07
Nodes (14): dependencies, lucide-react@^0.546.0, react@^19.0.1, react-dom@^19.0.1, react-helmet-async@^3.0.0, react-router-dom@^6.30.6, react-dom, react-helmet-async (+6 more)

### Community 5 - "JSONLD.tsx"
Cohesion: 0.11
Nodes (23): BreadcrumbJSONLD(), BreadcrumbLD, FAQJSONLD(), FAQPageLD, JSONLD(), JSONLDProps, LDData, LocalBusinessJSONLD() (+15 more)

### Community 6 - "Layout.tsx"
Cohesion: 0.09
Nodes (25): CookieConsentBanner(), CookiePreferences, CATEGORIES, CookiePreferences(), CookiePreferencesProps, ErrorBoundary, ErrorBoundaryState, FloatingWhatsApp() (+17 more)

### Community 7 - "AboutPage.tsx"
Cohesion: 0.10
Nodes (21): AboutFAQ(), AboutFAQProps, AboutHeroBanner(), AboutHeroBannerProps, AboutSection(), AboutSectionProps, AboutTabsNav(), AboutTabsNavProps (+13 more)

### Community 8 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowImportingTsExtensions, allowJs, isolatedModules, jsx, lib, module, moduleDetection (+10 more)

### Community 9 - "fetch-fonts.mjs"
Cohesion: 0.13
Nodes (10): checkOnly, cssBody, faces, facesBySheet, FULL_TARGETS, html, preloadTargetByPrefix, SLUG (+2 more)

### Community 10 - "TourBookingModal.tsx"
Cohesion: 0.13
Nodes (9): BookingProgressBar(), BookingProgressBarProps, BookingFlow, BookingFlowStep, BookingFormData, bookingJson, STEP_LABELS, TourBookingModal() (+1 more)

### Community 11 - "steps"
Cohesion: 0.12
Nodes (16): jobs, lint-and-build, runs-on, steps, name, on, pull_request, push (+8 more)

### Community 12 - "package.json"
Cohesion: 0.07
Nodes (39): devDependencies, eslint@^10.9.1, eslint-config-prettier@^10.1.8, @eslint/js@^10.0.1, eslint-plugin-react-hooks@^7.1.1, eslint-plugin-react-refresh@^0.5.5, prettier@^3.9.6, sharp@^0.35.4 (+31 more)

### Community 13 - "ref_path"
Cohesion: 0.24
Nodes (6): vite, @vitejs/plugin-react, doc, entry, withMarkup, withoutMarkup

### Community 14 - "font-text-set.mjs"
Cohesion: 0.25
Nodes (9): buildTextSet(), collectJson(), hex(), SKIP_DIRS, unicodeRangeOf(), walk(), ROOT, text (+1 more)

### Community 15 - "optimize-images.mjs"
Cohesion: 0.12
Nodes (14): args, derivativesArg, HERO_SOURCES, HERO_WIDTHS, MANIFEST_PATH, OG_CARD, ogOriginalPath, ORIGINALS_DIR (+6 more)

### Community 16 - "TourListingPage.tsx"
Cohesion: 0.36
Nodes (6): FeaturedToursGrid(), getTourTypeTag(), TourCard(), TourCardGrid(), TourCardGridProps, TourListingPage()

### Community 17 - "scripts"
Cohesion: 0.12
Nodes (16): scripts, build, clean, dev, fonts, format, format:check, images (+8 more)

### Community 18 - "TourDetailPage.tsx"
Cohesion: 0.33
Nodes (4): ReviewsData, TourFAQ, TourItineraryItem, ToursData

### Community 19 - "ref_fs"
Cohesion: 0.25
Nodes (6): convert(), __dirname, MAPPING, ROOT, SOURCE_DIR, TARGET_DIR

### Community 20 - "content.d.ts"
Cohesion: 0.40
Nodes (4): *.jpg, *.json, *.png, *.svg

### Community 23 - "inline-css.mjs"
Cohesion: 0.29
Nodes (6): ASSETS, css, cssFiles, HTML, linkRe, safeCss

### Community 24 - "check-image-budget.mjs"
Cohesion: 0.33
Nodes (5): failures, files, HERO_AVIF_LIMITS, walk(), warnings

### Community 25 - "optimize-svg.mjs"
Cohesion: 0.40
Nodes (4): changed, checkOnly, files, walk()

## Knowledge Gaps
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `lucide-react` connect `BookPage.tsx` to `Homepage.tsx`, `react`, `routes.tsx`, `JSONLD.tsx`, `Layout.tsx`, `AboutPage.tsx`, `TourBookingModal.tsx`, `package.json`, `TourDetailPage.tsx`, `TestimonialsCarousel.tsx`, `FAQAccordion.tsx`?**
  _High betweenness centrality (0.281) - this node is a cross-community bridge._
- **Should `types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.02666666666666667 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `Homepage.tsx`, `BookPage.tsx`, `routes.tsx`, `JSONLD.tsx`, `Layout.tsx`, `AboutPage.tsx`, `TourBookingModal.tsx`, `package.json`, `TourListingPage.tsx`, `TourDetailPage.tsx`, `TestimonialsCarousel.tsx`, `FAQAccordion.tsx`?**
  _High betweenness centrality (0.233) - this node is a cross-community bridge._
- **Should `Homepage.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.0636734693877551 - nodes in this community are weakly interconnected._
- **Why does `sharp` connect `package.json` to `ref_fs`, `optimize-images.mjs`?**
  _High betweenness centrality (0.118) - this node is a cross-community bridge._
- **Should `react` be split into smaller, more focused modules?**
  _Cohesion score 0.08653061224489796 - nodes in this community are weakly interconnected._
- **Should `BookPage.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.07205387205387205 - nodes in this community are weakly interconnected._
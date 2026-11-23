# Graph Report - Addis-Flavor-Powered-By-Sphere-Tours  (2026-11-23)

## Corpus Check
- 141 files · ~266,505 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 15 file(s) not represented in the graph (top: .woff2 5, (none) 4, .css 2)

## Summary
- 623 nodes · 1074 edges · 26 communities (24 shown, 2 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 2 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `978b9ec2`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- types.ts
- Homepage.tsx
- react
- BookPage.tsx
- routes.tsx
- ContactModal.tsx
- Layout.tsx
- AboutPage.tsx
- compilerOptions
- fetch-fonts.mjs
- TourBookingModal.tsx
- steps
- package.json
- ref_path
- generate-agent-files.mjs
- optimize-images.mjs
- eslint.config.js
- scripts
- TourDetailPage.tsx
- ref_fs
- content.d.ts
- TestimonialsCarousel.tsx
- HowBookingWorks.tsx
- inline-css.mjs
- check-image-budget.mjs
- optimize-svg.mjs

## God Nodes (most connected - your core abstractions)
1. `lucide-react` - 52 edges
2. `react` - 46 edges
3. `react-router-dom` - 24 edges
4. `scripts` - 18 edges
5. `compilerOptions` - 17 edges
6. `Homepage()` - 16 edges
7. `Layout()` - 12 edges
8. `main()` - 11 edges
9. `SEO()` - 11 edges
10. `Tour` - 11 edges

## Surprising Connections (you probably didn't know these)
- `Footer()` --calls--> `BrandLogo()`  [EXTRACTED]
  src/components/home/Footer.tsx → src/components/BrandLogo.tsx
- `CookiePreferences()` --calls--> `useCookieConsent()`  [EXTRACTED]
  src/components/CookiePreferences.tsx → src/context/CookieConsentContext.tsx
- `Layout()` --calls--> `Navbar()`  [EXTRACTED]
  src/router/Layout.tsx → src/components/Navbar.tsx
- `Homepage()` --calls--> `SEO()`  [EXTRACTED]
  src/pages/Homepage.tsx → src/components/SEO.tsx
- `BookingStep2Props` --references--> `BookingFormData`  [EXTRACTED]
  src/components/booking/BookingStep2.tsx → src/types/booking.ts

## Import Cycles
- None detected.

## Communities (26 total, 2 thin omitted)

### Community 0 - "types.ts"
Cohesion: 0.03
Nodes (74): AboutData, AboutTeamMember, AboutWhyDifferentPoint, BookingData, BookingFlow, BookingFlowStep, BookingFormField, BookingPolicy (+66 more)

### Community 1 - "Homepage.tsx"
Cohesion: 0.05
Nodes (42): GoogleReviewsWidget(), SkeletonPlaceholder(), AddisHighlightsGridProps, FinalCTAProps, HeroIntentRouter(), TAB_ICONS, FormData, INITIAL_FORM (+34 more)

### Community 2 - "react"
Cohesion: 0.10
Nodes (30): FAQAccordionProps, react, BrandLogo(), BrandLogoProps, BrandLogoSize, BrandLogoVariant, sizeMap, srcMap (+22 more)

### Community 3 - "BookPage.tsx"
Cohesion: 0.08
Nodes (29): lucide-react, BookingStep1(), BookingStep1Props, BookingStep2(), BookingStep2Props, BookingStep3(), BookingStep3Props, BookingSuccess() (+21 more)

### Community 4 - "routes.tsx"
Cohesion: 0.05
Nodes (24): dependencies, lucide-react@^0.546.0, react@^19.0.1, react-dom@^19.0.1, react-helmet-async@^3.0.0, react-router-dom@^6.30.6, react-dom, react-helmet-async (+16 more)

### Community 5 - "ContactModal.tsx"
Cohesion: 0.13
Nodes (12): ContactData, contactJson, ContactModal(), ContactModalProps, PhoneInput(), PhoneInputProps, SuccessMessage(), SuccessMessageProps (+4 more)

### Community 6 - "Layout.tsx"
Cohesion: 0.09
Nodes (27): CookieConsentBanner(), CookiePreferences, CATEGORIES, CookiePreferences(), CookiePreferencesProps, ErrorBoundary, ErrorBoundaryState, FloatingWhatsApp() (+19 more)

### Community 7 - "AboutPage.tsx"
Cohesion: 0.10
Nodes (21): AboutFAQ(), AboutFAQProps, AboutHeroBanner(), AboutHeroBannerProps, AboutSection(), AboutSectionProps, AboutTabsNav(), AboutTabsNavProps (+13 more)

### Community 8 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowImportingTsExtensions, allowJs, isolatedModules, jsx, lib, module, moduleDetection (+10 more)

### Community 9 - "fetch-fonts.mjs"
Cohesion: 0.10
Nodes (19): checkOnly, cssBody, faces, facesBySheet, FULL_TARGETS, html, preloadTargetByPrefix, SLUG (+11 more)

### Community 10 - "TourBookingModal.tsx"
Cohesion: 0.13
Nodes (9): BookingProgressBar(), BookingProgressBarProps, BookingFlow, BookingFlowStep, BookingFormData, bookingJson, STEP_LABELS, TourBookingModal() (+1 more)

### Community 11 - "steps"
Cohesion: 0.12
Nodes (16): jobs, lint-and-build, runs-on, steps, name, on, pull_request, push (+8 more)

### Community 12 - "package.json"
Cohesion: 0.10
Nodes (25): devDependencies, eslint@^10.9.1, prettier@^3.9.6, tailwindcss@^4.1.14, @tailwindcss/vite@^4.1.14, @types/node@^22.14.0, @types/react@^19.2.18, @types/react-dom@^19.2.5 (+17 more)

### Community 13 - "ref_path"
Cohesion: 0.24
Nodes (6): vite, @vitejs/plugin-react, doc, entry, withMarkup, withoutMarkup

### Community 14 - "generate-agent-files.mjs"
Cohesion: 0.20
Nodes (18): RFC-8141, assertNoForbiddenClaims(), buildLlmsTxt(), buildManifest(), CHECK, fail(), FORBIDDEN_CLAIMS, LLMS_SECTIONS (+10 more)

### Community 15 - "optimize-images.mjs"
Cohesion: 0.10
Nodes (15): failures, args, derivativesArg, HERO_SOURCES, HERO_WIDTHS, MANIFEST_PATH, OG_CARD, ogOriginalPath (+7 more)

### Community 16 - "eslint.config.js"
Cohesion: 0.18
Nodes (10): eslint-config-prettier@^10.1.8, @eslint/js@^10.0.1, eslint-plugin-react-hooks@^7.1.1, eslint-plugin-react-refresh@^0.5.5, typescript-eslint@^8.68.0, eslint-config-prettier, @eslint/js, eslint-plugin-react-hooks (+2 more)

### Community 17 - "scripts"
Cohesion: 0.11
Nodes (18): scripts, agent-files, agent-files:check, build, clean, dev, fonts, format (+10 more)

### Community 18 - "TourDetailPage.tsx"
Cohesion: 0.33
Nodes (4): ReviewsData, TourFAQ, TourItineraryItem, ToursData

### Community 19 - "ref_fs"
Cohesion: 0.20
Nodes (8): sharp@^0.35.4, sharp, convert(), __dirname, MAPPING, ROOT, SOURCE_DIR, TARGET_DIR

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
Cohesion: 0.29
Nodes (6): svgo@^4.1.0, svgo, changed, checkOnly, files, walk()

## Knowledge Gaps
- **1 isolated node(s):** `RFC-8141`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 311 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `lucide-react` connect `BookPage.tsx` to `Homepage.tsx`, `react`, `routes.tsx`, `ContactModal.tsx`, `Layout.tsx`, `AboutPage.tsx`, `TourBookingModal.tsx`, `package.json`, `TourDetailPage.tsx`, `TestimonialsCarousel.tsx`?**
  _High betweenness centrality (0.280) - this node is a cross-community bridge._
- **What connects `RFC-8141` to the rest of the system?**
  _1 weakly-connected nodes found - possible missing edges._
- **Should `types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.02666666666666667 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `Homepage.tsx`, `BookPage.tsx`, `routes.tsx`, `ContactModal.tsx`, `Layout.tsx`, `AboutPage.tsx`, `TourBookingModal.tsx`, `package.json`, `TourDetailPage.tsx`, `TestimonialsCarousel.tsx`?**
  _High betweenness centrality (0.233) - this node is a cross-community bridge._
- **Should `Homepage.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.05069124423963134 - nodes in this community are weakly interconnected._
- **Why does `sharp` connect `ref_fs` to `package.json`, `optimize-images.mjs`?**
  _High betweenness centrality (0.125) - this node is a cross-community bridge._
- **Should `react` be split into smaller, more focused modules?**
  _Cohesion score 0.09758454106280193 - nodes in this community are weakly interconnected._
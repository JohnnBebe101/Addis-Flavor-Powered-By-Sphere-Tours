# Migration Changelog — UX/UI Revamp & Production Hardening

> **Branch:** `migration/production-hardening`
> **Date Range:** August 2026
> **Author:** Addis Ababa City Tours Engineering
> **Purpose:** Complete migration from culinary host marketplace SPA to destination-focused tour operator with client-side routing, JSON-driven content, and production-ready build pipeline.

---

## Executive Summary

### Before (Pre-Migration)

```
Addis Flavor — Culinary Host Marketplace
├── Single-page app (activeView state switching)
├── No client-side router
├── 3 views: home, become-host, our-story
├── Hardcoded TypeScript constants (data.ts)
├── Culinary experiences (cooking classes, coffee ceremonies)
├── Host onboarding model
└── ~2,800 lines removed in migration
```

### After (Post-Migration)

```
Addis Ababa City Tours — Destination Tour Operator
├── React Router v6 with 18 lazy-loaded routes
├── 15 page components
├── 13 homepage section components
├── 10 JSON content files (content-first architecture)
├── 9 tour packages with dynamic pricing
├── Build-time image optimization (vite-plugin-image-optimizer)
└── ~16,400 lines added across 109 files
```

### Key Metrics

| Metric | Before | After | Delta |
|--------|--------|-------|-------|
| Routes | 0 (state-switched) | 18 | +18 |
| Pages | 3 views | 15 pages | +12 |
| Components | ~15 | ~35 | +20 |
| Content files | 3 JSON | 10 JSON | +7 |
| TypeScript errors | 48+ | 0 | -48 |
| Translation fields | 50 | 9 | -41 (82% reduction) |
| Build size (main) | N/A | 388.84 KB | Optimized |
| Build time | N/A | 8.29s | With image optimization |

---

## Architecture Diagram

### Application Shell — Component Hierarchy

```
<App.tsx>
└── <RouterProvider router={router} />
    └── <Layout />                              ← src/router/Layout.tsx
        ├── <Navbar />                          ← Fixed top, blur-on-scroll, z-50
        │   ├── Logo → navigate('/')
        │   ├── Desktop Nav (>md)
        │   │   ├── Tours → /tours/
        │   │   ├── Destinations → /destinations/
        │   │   ├── Why Choose Us → /why-choose-us/
        │   │   ├── Travel Guide → /travel-guide/
        │   │   ├── Contact Us → openContactModal()
        │   │   └── BOOK A TOUR → openBookingModal()
        │   └── Mobile Hamburger → slide-in drawer
        │       ├── Brand header
        │       ├── 5 nav links with icons
        │       ├── Contact Us button
        │       └── Footer: Address + social icons
        │
        ├── <HeroBanner />                     ← ONLY on pathname === '/'
        │   ├── 3-slide carousel (auto-rotate)
        │   ├── Search bar (tour selector + GO)
        │   └── Trust signals (4.9/5, 500+ reviews)
        │
        ├── <main id="main-content">
        │   └── <Outlet />                     ← Child route content
        │       ├── Homepage                   ← /
        │       ├── TourListingPage            ← /tours/
        │       ├── TourDetailPage             ← /tours/:slug/
        │       ├── DestinationListingPage     ← /destinations/
        │       ├── DestinationDetailPage      ← /destinations/:slug/
        │       ├── WhyChooseUsPage            ← /why-choose-us/
        │       ├── TravelGuideListingPage     ← /travel-guide/
        │       ├── TravelGuideArticlePage     ← /travel-guide/:slug/
        │       ├── AboutPage                  ← /about/
        │       ├── ReviewsPage                ← /reviews/
        │       ├── ContactPage                ← /contact/
        │       ├── CustomTourPage             ← /custom-tour/
        │       ├── TravelAgentsPage           ← /travel-agents/
        │       ├── LegalPage (×4 variants)    ← /terms/ /privacy/ /cancellation-policy/ /cookies/
        │       └── NotFoundPage               ← * (catch-all)
        │
        ├── <ScrollRestoration />              ← React Router built-in
        │
        ├── <Footer />                         ← 5-column footer, newsletter, social
        │
        ├── <StickyBookingBar />               ← Fixed bottom, mobile-only CTA
        │
        ├── <TourBookingModal />               ← Global, controlled by isBookingOpen
        │   └── BookingStep1 → Step2 → Step3 → Success
        │
        └── <ContactModal />                   ← Global, controlled by isContactOpen
```

### Route Tree

```
/ (Layout)
├── index ─────────────────── Homepage
├── tours/ ────────────────── TourListingPage
├── tours/:slug/ ──────────── TourDetailPage
├── destinations/ ─────────── DestinationListingPage
├── destinations/:slug/ ───── DestinationDetailPage
├── why-choose-us/ ────────── WhyChooseUsPage
├── travel-guide/ ─────────── TravelGuideListingPage
├── travel-guide/:slug/ ───── TravelGuideArticlePage
├── about/ ────────────────── AboutPage
├── reviews/ ──────────────── ReviewsPage
├── contact/ ──────────────── ContactPage
├── custom-tour/ ──────────── CustomTourPage
├── travel-agents/ ────────── TravelAgentsPage
├── terms/ ────────────────── LegalPage (type="terms")
├── privacy/ ──────────────── LegalPage (type="privacy")
├── cancellation-policy/ ──── LegalPage (type="cancellation")
├── cookies/ ──────────────── LegalPage (type="cookies")
└── * ─────────────────────── NotFoundPage
```

### Data Flow Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        DATA SOURCES                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  src/content/*.json          src/data.ts          src/types.ts  │
│  ─────────────────          ──────────          ─────────────  │
│  home.json                  TRANSLATIONS         Tour           │
│  tours.json                 NEIGHBORHOOD_        Translations   │
│  destinations.json            DESTINATIONS       Review         │
│  reviews.json                                   Destination    │
│  faqs.json                                       FAQItem        │
│  about.json                                      HomeData       │
│  travel-guide.json                               AboutData      │
│  contact.json                                    BookingData    │
│  booking.json                                    ContactData    │
│  navigation.json                                 NavigationData │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
         │                    │                      │
         ▼                    ▼                      ▼
┌─────────────────────────────────────────────────────────────────┐
│                     CONSUMER LAYER                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Layout.tsx                                                     │
│  ├── TRANSLATIONS → Navbar, Footer, StickyBookingBar            │
│  ├── tours.json → HeroBanner, TourBookingModal                  │
│  └── home.json → HeroBanner (slides, search)                    │
│                                                                 │
│  Homepage.tsx                                                   │
│  ├── home.json → 8 section components                           │
│  ├── tours.json → TourCardGrid                                  │
│  └── reviews.json → TestimonialsCarousel                        │
│                                                                 │
│  TourDetailPage.tsx                                             │
│  ├── tours.json → tour detail, itinerary, pricing               │
│  └── reviews.json → filtered by tourId → review cards           │
│                                                                 │
│  DestinationDetailPage.tsx                                      │
│  └── destinations.json → destination detail, highlights         │
│                                                                 │
│  AboutPage.tsx                                                  │
│  └── about.json → 8 section components                          │
│                                                                 │
│  TravelGuideArticlePage.tsx                                     │
│  └── travel-guide.json → article content                        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Lazy Loading Pipeline

```
Browser Request
    │
    ▼
createBrowserRouter (routes.tsx)
    │
    ├── Layout.tsx ─── EAGERLY LOADED (root shell)
    │   ├── Navbar
    │   ├── HeroBanner (conditional)
    │   ├── Footer
    │   └── StickyBookingBar
    │
    └── Child Routes ── ALL LAZY (native lazy property)
        │
        ├── import('../pages/Homepage')
        │       .then((m) => ({ Component: m.Homepage }))
        │
        ├── import('../pages/TourListingPage')
        │       .then((m) => ({ Component: m.TourListingPage }))
        │
        ├── import('../pages/TourDetailPage')
        │       .then((m) => ({ Component: m.TourDetailPage }))
        │
        └── ... (15 more routes, same pattern)

    No <Suspense> wrapper needed — React Router handles loading states.
```

---

## Day 1 — Component Renames & Archival

### Purpose

Rename culinary-marketplace components to tour-operator terminology. Archive components with no tour equivalent.

### Renamed Components

| Old Name | New Name | File | Rationale |
|----------|----------|------|-----------|
| `ReviewsCarousel` | `TestimonialsCarousel` | `src/components/TestimonialsCarousel.tsx` | Aligns with tour operator branding; interface renamed to `TestimonialsCarouselProps` |
| `BookingWidget` | `TourBookingModal` | `src/components/TourBookingModal.tsx` | Clarifies it's a modal, not an inline widget; interface renamed to `TourBookingModalProps` |
| `ExperienceGrid` | `TourCardGrid` | `src/components/home/TourCardGrid.tsx` | "Experience" was culinary terminology; "Tour Card" is operator terminology; interface renamed to `TourCardGridProps` |

### Archived Components (moved to `src/components/_archived/`)

| Component | Lines | Original Purpose | Why Archived |
|-----------|-------|------------------|--------------|
| `BehindTheScenes.tsx` | 311 | Culinary scrollytelling carousel | No tour equivalent; depended on removed `ExperiencePackage` type |
| `OnlineClasses.tsx` | 62 | Virtual cooking class CTA | Not relevant to tour operator model |
| `PressLogos.tsx` | 32 | Press publication logos | Replaced by `TrustBookingStrip` |
| `VettedHostsRow.tsx` | 145 | Host vetting showcase | Replaced by `WhyChooseUsPreview` |

Archived directory excluded from TypeScript compilation via `tsconfig.json`.

### Deleted Components (no replacement)

| Component | Was For |
|-----------|---------|
| `FAQSection.tsx` | Replaced by `FAQAccordion.tsx` |
| `KeyBenefits.tsx` | Split into `TrustBookingStrip` + `WhyChooseUsPreview` |
| `BecomeHost.tsx` | Host model abandoned |
| `BecomeHost/ApplyModal.tsx` | Host model abandoned |
| `BecomeHost/AskHostModal.tsx` | Host model abandoned |
| `JebenaDeepDive.tsx` | Coffee ceremony module dropped |
| `OurStory.tsx` | Content moved to `AboutPage.tsx` + `about/` components |

---

## Day 2 — Homepage Rewrite

### Section Order (as rendered)

```
┌─────────────────────────────────────────────────────────────┐
│  [LAYOUT] Navbar                                            │
├─────────────────────────────────────────────────────────────┤
│  [LAYOUT] HeroBanner (only on /)                            │
│  ├── 3-slide carousel with auto-rotation                    │
│  ├── Search bar: tour type selector + GO button             │
│  └── Trust: "4.9/5 from 500+ reviews"                      │
├─────────────────────────────────────────────────────────────┤
│  1. TrustBookingStrip                                       │
│  ├── "⭐⭐⭐⭐⭐ 4.9/5 from 500+ reviews"                   │
│  ├── "Book Direct & Save 15%"                               │
│  └── "WhatsApp Us: +251-911-XXX-XXX"                       │
├─────────────────────────────────────────────────────────────┤
│  2. TourCategorySelector                                    │
│  ├── City Tours (From $42)                                  │
│  ├── Day Trips (From $75)                                   │
│  └── Private & Custom (From $150)                           │
├─────────────────────────────────────────────────────────────┤
│  3. TourCardGrid                                            │
│  └── 9 tour cards from tours.json                           │
├─────────────────────────────────────────────────────────────┤
│  4. WhyChooseUsPreview                                      │
│  ├── Local Experts                                          │
│  ├── Best Price Guarantee                                   │
│  └── Flexible & Safe                                        │
├─────────────────────────────────────────────────────────────┤
│  5. AddisHighlightsGrid                                     │
│  ├── National Museum                                        │
│  ├── Merkato                                                │
│  ├── Holy Trinity Cathedral                                 │
│  └── Entoto Park                                            │
├─────────────────────────────────────────────────────────────┤
│  6. DayTripDestinationsCarousel                             │
│  ├── Debre Libanos                                          │
│  ├── Tiya                                                   │
│  ├── Menagesha Forest                                       │
│  └── Bishoftu                                               │
├─────────────────────────────────────────────────────────────┤
│  7. HowBookingWorks                                         │
│  ├── Step 1: Select Tour                                    │
│  ├── Step 2: Check Availability                             │
│  └── Step 3: Confirm & Pay                                  │
├─────────────────────────────────────────────────────────────┤
│  8. TestimonialsCarousel                                    │
│  └── Reviews from reviews.json                              │
├─────────────────────────────────────────────────────────────┤
│  9. PracticalInfoGrid                                       │
│  ├── Visa Requirements                                      │
│  ├── Best Time to Visit                                     │
│  ├── Currency & Money                                       │
│  └── Altitude & Health                                      │
├─────────────────────────────────────────────────────────────┤
│  10. FinalCTA                                               │
│  ├── "View All Tours" → /tours/                             │
│  └── "Contact Us" → /contact/                               │
├─────────────────────────────────────────────────────────────┤
│  [LAYOUT] Footer + StickyBookingBar + Modals                │
└─────────────────────────────────────────────────────────────┘
```

### home.json Data Structure

```
home.json
├── hero
│   └── slides[3]
│       ├── title, subtitle
│       ├── ctaPrimary, ctaSecondary
│       ├── trustSignal
│       └── image
├── tourCategorySelector
│   ├── headline, subheadline
│   └── categories[3]
│       ├── id, title, description
│       ├── priceFrom, link
├── featuredTours
│   ├── headline, subheadline
├── whyChooseUs
│   ├── headline
│   └── benefits[3]
│       ├── icon, title, description
├── addisHighlights
│   ├── headline, subheadline
│   └── attractions[4]
│       ├── title, description, link
├── dayTripDestinations
│   ├── headline, subheadline
│   └── destinations[4]
│       ├── title, description, link
├── howBookingWorks
│   ├── headline
│   └── steps[3]
│       ├── title, description
├── practicalInfo
│   ├── headline
│   ├── columns[4]
│   │   ├── title, description
│   └── ctaLink
└── finalCta
    ├── headline, subheadline
    ├── ctaPrimary, ctaSecondary
```

---

## Day 3 — Page Creation & Routing

### Complete Page Inventory

| # | Page Component | Route | Data Source | Purpose |
|---|---------------|-------|-------------|---------|
| 1 | `Homepage` | `/` (index) | home.json, tours.json, reviews.json | 10-section landing page |
| 2 | `TourListingPage` | `/tours/` | tours.json | Tour catalog with category tabs |
| 3 | `TourDetailPage` | `/tours/:slug/` | tours.json, reviews.json | Tour detail, itinerary, pricing, reviews |
| 4 | `DestinationListingPage` | `/destinations/` | destinations.json | Destination grid |
| 5 | `DestinationDetailPage` | `/destinations/:slug/` | destinations.json | Destination detail, highlights, related tours |
| 6 | `WhyChooseUsPage` | `/why-choose-us/` | faqs.json | Value proposition + FAQ |
| 7 | `TravelGuideListingPage` | `/travel-guide/` | travel-guide.json | Blog-style article listing |
| 8 | `TravelGuideArticlePage` | `/travel-guide/:slug/` | travel-guide.json | Individual article |
| 9 | `AboutPage` | `/about/` | about.json | Tabbed about page (7 tabs) |
| 10 | `ReviewsPage` | `/reviews/` | reviews.json | TripAdvisor widget + review grid |
| 11 | `ContactPage` | `/contact/` | contact.json | Contact info + inquiry form |
| 12 | `CustomTourPage` | `/custom-tour/` | contact.json | Custom tour request form |
| 13 | `TravelAgentsPage` | `/travel-agents/` | contact.json | B2B partnership page |
| 14 | `LegalPage` | `/terms/` `/privacy/` `/cancellation-policy/` `/cookies/` | booking.json | Multi-type legal page via `type` prop |
| 15 | `NotFoundPage` | `*` | — | Custom 404 with compass icon |

### Content JSON Files

| File | Records | Description |
|------|---------|-------------|
| `tours.json` | 9 tours | Full tour catalog with itinerary, pricing, highlights, SEO |
| `destinations.json` | 5 destinations | Addis Ababa, Debre Libanos, Tiya, Menagesha, Bishoftu |
| `reviews.json` | 8 reviews | Tour reviews with `tourId` for filtering |
| `faqs.json` | 24 FAQs | Categorized: general, booking, tours, practical |
| `home.json` | 10 sections | All homepage section data |
| `about.json` | 6 sections | Hero, our story, team, mission, licenses, why different |
| `travel-guide.json` | 6 articles | Travel guides with categories, slugs, content |
| `contact.json` | 4 sections | Contact info, form fields, custom tour, travel agents |
| `booking.json` | 4 policies | Cancellation, pricing, refund, legal pages |
| `navigation.json` | 3 sections | Header, footer, mobile menu structure |

---

## Day 4 — TypeScript & Integration

### Type System Architecture

```
src/types.ts (725 lines)
├── Core Types
│   ├── Language = 'en'
│   ├── Translations (9 fields — cleaned from 50)
│   └── Review = Testimonial (type alias)
│
├── Tour Domain
│   ├── Tour (28 fields)
│   │   ├── id, slug, name, subtitle
│   │   ├── shortDescription, fullDescription
│   │   ├── tourType, duration, durationMinutes
│   │   ├── groupSize, maxGroupSize
│   │   ├── rating, reviewCount
│   │   ├── availability, difficulty, minAge
│   │   ├── itinerary: TourItineraryItem[]
│   │   ├── highlights, included, excluded: string[]
│   │   ├── pricing: TourPricing
│   │   ├── pickupPolicy, meetingPoint, whatToBring
│   │   ├── fitnessLevel, cancellationPolicy
│   │   ├── faqs: TourFAQ[]
│   │   ├── images: string[]
│   │   ├── relatedTours: string[]
│   │   ├── seo: TourSEO
│   │   └── lastVerified: string
│   │
│   ├── TourPricing
│   │   ├── currency: string
│   │   ├── private: Record<string, TourPricingTier>
│   │   └── smallGroup: TourPricingTier
│   │
│   ├── TourPricingTier
│   │   ├── adult: number
│   │   ├── child: number
│   │   └── infant: number
│   │
│   ├── TourItineraryItem { time, activity, duration }
│   ├── TourFAQ { question, answer }
│   ├── TourSEO { pageTitle, metaDescription, h1, h2s }
│   └── ToursData { tours, totalTours, tourTypes, ... }
│
├── Destination Domain
│   ├── Destination (16 fields)
│   │   ├── topAttractions: DestinationAttraction[]
│   │   ├── bestTimeToVisit: DestinationBestTime
│   │   ├── gettingThere: DestinationGettingThere
│   │   ├── whereToStay: DestinationWhereToStay
│   │   └── seo: DestinationSEO
│   └── Related sub-interfaces (5)
│
├── Review Domain
│   ├── Testimonial
│   │   ├── id, tourId, tourName, rating
│   │   ├── title, text, author
│   │   ├── location, date
│   │   └── verified, helpful
│   ├── Review = Testimonial (type alias)
│   ├── ReviewsData { reviews, tripadvisorWidget, ... }
│   └── TripAdvisorWidget { rating, totalReviews, url, embedCode }
│
├── Home Page (12 interfaces)
│   ├── HomeHeroSlide, HomeTrustStrip
│   ├── HomeTourCategory, HomeTourCategorySelector
│   ├── HomeFeaturedTours
│   ├── HomeWhyChooseUsBenefit, HomeWhyChooseUs
│   ├── HomeAddisHighlight, HomeAddisHighlights
│   ├── HomeDayTripDestination, HomeDayTripDestinations
│   ├── HomeBookingStep, HomeHowBookingWorks
│   ├── HomePracticalInfoColumn, HomePracticalInfo
│   ├── HomeFinalCTA, HomeData
│   └── ...
│
├── Content Domain (6 data interfaces)
│   ├── AboutData, FAQsData
│   ├── TravelGuideData, BookingData
│   ├── ContactData, NavigationData
│   └── SEOData
│
└── UI Constants
    ├── UIButtons, UIFormLabels
    ├── UIErrorMessages, UISuccessMessages
    ├── UILoadingMessages, UIProgressBarLabels
    └── UITooltips, UIConstantsData
```

### Data Architecture

```
src/data.ts (30 lines — cleaned from 183)
├── TRANSLATIONS: Translations
│   ├── brandName (from BRAND.name)
│   ├── navTours, navDestinations
│   ├── navWhyChooseUs, navTravelGuide
│   ├── navContact, navBook
│   ├── heroSearchPlaceholder
│   └── bookNowButton
│
└── NEIGHBORHOOD_DESTINATIONS
    └── 8 neighborhoods { name: string }

Removed:
├── PACKAGES (ExperiencePackage[]) — 3 culinary experiences
├── REVIEWS (HostReview[]) — 3 hardcoded reviews
├── PRESS_LOGOS — 6 press publication entries
└── 3 image imports (cookingClassImg, heroBgImg, jebenaPourImg)
```

### Build Pipeline Fixes (30+ TypeScript Errors Resolved)

| Category | Errors Fixed | Approach |
|----------|-------------|----------|
| Duplicate `export default` | 8 | Removed from 8 about components (already had default export) |
| Import path mismatches | 12 | `../../content/` → `../content/` across all pages |
| Named vs default imports | 6 | `Footer`/`StickyBookingBar` → default; `TourCardGrid`/`TestimonialsCarousel` → default |
| Unused imports | 10 | Removed unused lucide-react icons, unused interfaces |
| Type mismatches | 4 | AboutFAQ internal state; AboutTabsNav prop type; TourPricing.private |
| Missing exports | 2 | Added `export default` to Homepage, TourListingPage |
| Orphaned comments | 2 | Removed "rendered in App.tsx" comments |
| Route imports | 1 | Replaced non-existent `lazy`/`useScrollRestoration` from react-router-dom |

---

## Day 5 — Production Hardening & Cleanup

### Type Safety Fixes (M1–M4)

| Fix | Description | Files |
|-----|-------------|-------|
| **M1** | Eliminated `as unknown as` double cast on `homeData.featuredTours` | `TourCardGrid.tsx`, `Homepage.tsx`, `TourListingPage.tsx` |
| **M2** | Wired `AboutPage` back button with `useNavigate` | `AboutPage.tsx` |
| **M3** | Merged duplicate `Review`/`Testimonial` types → `type Review = Testimonial` | `types.ts` |
| **M4** | Added `// TODO` markers on 5 remaining stub callbacks | `Homepage.tsx`, `TourListingPage.tsx`, `AboutPage.tsx` |

### Dead Data Removal (L1–L7)

| Fix | Description | Impact |
|-----|-------------|--------|
| **L1** | Deleted `seo-metadata.json`, `amharic-terms.json`, `ui-constants.json` + removed `AmharicTerm`, `AmharicTermsData` interfaces | -15 KB source, -25 lines types |
| **L2** | Removed `PACKAGES`, `REVIEWS`, `PRESS_LOGOS` exports + `ExperiencePackage`, `HostReview` interfaces + 3 image imports | -120 lines data.ts, -20 lines types |
| **L3** | Moved 4 orphaned components to `src/components/_archived/` | Excluded from tsc via tsconfig |
| **L4** | Aggressive TRANSLATIONS cleanup: 50 fields → 9 fields (82% reduction) | -41 fields, -80 lines types.ts |
| **L5** | Removed dead `trustStrip` and `reviewsSection` from home.json | -10 lines JSON |
| **L6** | Fixed metadata: `totalTours: 8→9`, `totalFaqs: 22→24` | Accuracy |
| **L7** | Replaced 7 `${false ? ... : ...}` dead ternaries in about components | Cleaner class strings |

### Image Optimization (L8)

```typescript
// vite.config.ts
ViteImageOptimizer({
  png:  { quality: 80 },   // Lossy compression via Sharp
  jpeg: { quality: 75 },   // Slightly more aggressive
  webp: { quality: 80 },   // Target web format
  avif: { quality: 70 },   // Next-gen format
  svg: {
    multipass: true,
    plugins: [
      { name: 'preset-default', params: { overrides: { cleanupIds: { minify: false } } } },
      'convertColors',
    ],
  },
})
```

**Installed:** `vite-plugin-image-optimizer@2.0.3`, `sharp@0.35.4`, `svgo@4.1.0`

---

## Architecture Decision Log

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **Lazy loading** | Native `lazy` route property | React Router handles loading states without `<Suspense>` wrapper; simpler than `React.lazy()` + `<Suspense>` |
| **HeroBanner rendering** | Conditional `{pathname === '/' && <HeroBanner />}` in Layout | Hero only belongs on homepage; avoids prop drilling through RouterProvider |
| **TourPricing.private** | `Record<string, TourPricingTier>` | Flexible tier keys (`"1-2"`, `"3-4"`, `"5-6"`) accommodate variable party-size pricing across 9 tours |
| **Review type** | `export type Review = Testimonial` | Single source of truth; backward-compatible alias |
| **LegalPage pattern** | Single component with `type` prop | 4 routes share 95%+ code; `type` prop selects content from `booking.json` |
| **Scroll restoration** | `<ScrollRestoration />` component | React Router built-in; no custom hook needed |
| **Content architecture** | JSON files in `src/content/` | Separation of content from code; enables non-developer edits; typed via `content.d.ts` |
| **Archived components** | `src/components/_archived/` + tsconfig exclude | Preserves code for future reference without compile errors |
| **Translations scope** | 9 fields only | Only navbar and hero search use translations; all other content is JSON-driven |

---

## File Inventory

### Pages (`src/pages/`) — 15 files

```
src/pages/
├── Homepage.tsx                    ← / (index)
├── TourListingPage.tsx             ← /tours/
├── TourDetailPage.tsx              ← /tours/:slug/
├── DestinationListingPage.tsx      ← /destinations/
├── DestinationDetailPage.tsx       ← /destinations/:slug/
├── WhyChooseUsPage.tsx             ← /why-choose-us/
├── TravelGuideListingPage.tsx      ← /travel-guide/
├── TravelGuideArticlePage.tsx      ← /travel-guide/:slug/
├── AboutPage.tsx                   ← /about/
├── ReviewsPage.tsx                 ← /reviews/
├── ContactPage.tsx                 ← /contact/
├── CustomTourPage.tsx              ← /custom-tour/
├── TravelAgentsPage.tsx            ← /travel-agents/
├── LegalPage.tsx                   ← /terms/ /privacy/ /cancellation-policy/ /cookies/
└── NotFoundPage.tsx                ← * (404)
```

### Components (`src/components/`) — By Directory

```
src/components/
├── Navbar.tsx                       ← Global navigation
├── TourBookingModal.tsx             ← Global booking modal
├── ContactModal.tsx                 ← Global contact modal
├── TestimonialsCarousel.tsx         ← Review carousel
│
├── home/                            ← Homepage sections
│   ├── HeroBanner.tsx
│   ├── TourCardGrid.tsx
│   ├── TourCategorySelector.tsx
│   ├── WhyChooseUsPreview.tsx
│   ├── AddisHighlightsGrid.tsx
│   ├── DayTripDestinationsCarousel.tsx
│   ├── HowBookingWorks.tsx
│   ├── PracticalInfoGrid.tsx
│   ├── FinalCTA.tsx
│   ├── TrustBookingStrip.tsx
│   ├── FAQAccordion.tsx
│   ├── Footer.tsx
│   └── StickyBookingBar.tsx
│
├── about/                           ← About page sections
│   ├── AboutHeroBanner.tsx
│   ├── AboutTabsNav.tsx
│   ├── AboutSection.tsx
│   ├── TeamSection.tsx
│   ├── HowItWorksSection.tsx
│   ├── SafetySection.tsx
│   ├── PressSection.tsx
│   └── AboutFAQ.tsx
│
├── booking/                         ← Booking flow
│   ├── BookingProgressBar.tsx
│   ├── BookingStep1.tsx
│   ├── BookingStep2.tsx
│   ├── BookingStep3.tsx
│   └── BookingSuccess.tsx
│
├── ui/                              ← Shared primitives
│   ├── Accordion.tsx
│   ├── Modal.tsx
│   └── SuccessMessage.tsx
│
└── _archived/                       ← Deprecated (excluded from tsc)
    ├── BehindTheScenes.tsx
    ├── OnlineClasses.tsx
    ├── PressLogos.tsx
    └── VettedHostsRow.tsx
```

### Content Files (`src/content/`) — 10 files

```
src/content/
├── home.json              ← Homepage sections (hero, categories, highlights, CTA)
├── tours.json             ← 9 tour packages with pricing, itinerary, SEO
├── destinations.json      ← 5 destinations with attractions, tips
├── reviews.json           ← 8 reviews with tourId for filtering
├── faqs.json              ← 24 FAQs across 4 categories
├── about.json             ← Company info, team, mission
├── travel-guide.json      ← 6 articles with categories
├── contact.json           ← Contact info, forms, partnerships
├── booking.json           ← Policies, legal page content
└── navigation.json        ← Header, footer, mobile menu structure
```

### Configuration Files

```
├── vite.config.ts          ← Vite + React + Tailwind + ImageOptimizer
├── tsconfig.json           ← Strict TS, excludes _archived/
├── package.json            ← React 19, Vite 6, Tailwind v4
├── src/types.ts            ← 725 lines, all domain interfaces
├── src/data.ts             ← 30 lines, TRANSLATIONS + NEIGHBORHOOD_DESTINATIONS
├── src/config/brand.ts     ← BRAND.name constant
└── src/content.d.ts        ← Typed JSON module declarations
```

### Documentation Files

```
├── MIGRATION-CHANGELOG.md           ← This file (execution record)
├── UX-UI-REVAMP-MASTER-ENGINEERING-PLAYBOOK.md  ← Original playbook (1,446 lines)
├── UX-UI-STATE-DESC.md              ← Pre-migration baseline snapshot
├── WEBSITE-COPYWRITING-MASTER-GUIDE.md  ← Copywriting reference
├── UPGRADE_TO_PRODUCTION.md         ← Pre-migration production issues
├── IMPLEMENTATION_PLAN.md           ← Original implementation plan
└── README.md                        ← Project readme
```

---

## Known Issues & Future Work

### Remaining TODOs in Code

| Location | TODO | Priority |
|----------|------|----------|
| `Homepage.tsx:73` | `setExpandedTourId={() => {}}` — wire expansion state | Medium |
| `Homepage.tsx:74` | `handleSelectSearchPackage={() => {}}` — wire to Layout search | Medium |
| `TourListingPage.tsx:62` | `setExpandedTourId={() => {}}` — wire expansion state | Medium |
| `TourListingPage.tsx:63` | `handleSelectSearchPackage={() => {}}` — wire to Layout search | Medium |
| `AboutPage.tsx:43` | `onTabClick={() => {}}` — wire tab state management | Low |
| `AboutPage.tsx:70` | `onBookClick={() => {}}` — wire to Layout booking modal | Low |
| `Homepage.tsx:113` | `onBookClick={() => {}}` — wire to Layout booking modal | Low |

### Architecture Notes

- **HeroBanner** is only rendered on `/` via Layout.tsx conditional — not available on other pages
- **TourBookingModal** and **ContactModal** state lives in Layout — individual pages cannot open them without prop drilling or context
- **Footer** receives `translations` prop but never reads any field — dead prop, candidates for removal
- **TourCardGrid** hardcodes "Duration", "Starting price", "Book Now" labels — no longer configurable via props
- **TestimonialsCarousel** returns `null` if `testimonials` is empty — defensive guard added
- **Archived components** in `_archived/` reference removed types (`ExperiencePackage`, `Pack<Translations, ...>`) — excluded from tsc but not deleted

---

*Document generated as part of the `migration/production-hardening` branch execution.*
*Last updated: August 2026*

# UX/UI State Description — Addis Ababa City Tours

> **Purpose**: Baseline architecture document for remapping navigation, sections, and homepage layout. Optimized for low-token consumption by UX/UI experts planning a seamless redesign.

---

## 1. Executive Summary

Single-page React 19 + Vite + Tailwind CSS v4 SPA with **no client-side router**. View switching via `activeView` state (`'home' | 'become-host' | 'our-story'`) in `App.tsx`, conditionally rendering top-level components and scrolling to top on each transition. Design palette: coffee-red, teal, gold, sandstone. Fonts: Playfair Display (serif headings), DM Sans (body). Content architecture: JSON files under `src/content/` per page; global data in `src/data.ts`.

## 2. Global Navigation Tree

```
Navbar (fixed, blur-on-scroll, z-50)
├── Logo (SVG jebena) → scrollTo(0) + reset to 'home'
├── Desktop Nav (>md breakpoint)
│   ├── Experiences → #experiences + activeView='home'
│   ├── Our Story → # + activeView='our-story'
│   ├── Book → #booking-anchor + activeView='home' + open BookingWidget
│   ├── Become a Host → # + activeView='become-host'
│   ├── Help → #faq-section + activeView='home'
│   └── Contact Us (button) → open ContactModal
├── Mobile Hamburger → slide-in right drawer (z-50, backdrop-blur)
│   ├── Brand header (logo + "Addis Ababa")
│   ├── "Selam & Welcome!" greeting card
│   ├── 5 nav links with icons (same as desktop)
│   ├── Contact Us button (Mail icon)
│   └── Footer: Address + IG/FB/TT icons
└── StickyBookingBar (fixed bottom, mobile-only) → open BookingWidget

Footer (id="booking-anchor", bg-teal, gold 4px top border)
├── Col 1: Brand desc + social icons
├── Col 2: COMPANY INFO (About, Founders, How it works, Safety, Press, Careers)
├── Col 3: JOIN US (Become a Host, Ambassador, Agency Login, Terms)
├── Col 4: Newsletter (email input + ADD ME)
├── Col 5: Sphere Head Office (address, phone, email)
├── Popular Destinations (7 neighborhood links)
└── Copyright row (Powered by Sphere, Johnny Technologies, Terms/Privacy/Cookie/Blog)
```

## 3. Core Page Breakdown

### 3.1 Homepage (`activeView === 'home'`)
12 sequential sections + 2 global overlays:

| # | Section | Component | Key Details |
|---|---------|-----------|-------------|
| 1 | Announcement Bar | Inline | Teal bar, `id="announcement-bar"` |
| 2 | Hero Banner | `HeroBanner.tsx` | 90vh, bg image + gradient, title/subtitle, `<select>` experience search, GO button, bottom scroll dots, "Live Capture" panel |
| 3 | Reviews Carousel | `ReviewsCarousel.tsx` | Auto-rotate 8s, prev/next arrows, dot indicators, 3 reviews |
| 4 | Key Benefits | `KeyBenefits.tsx` | 3-col grid: Vetted Hosts, Satisfaction Guaranteed, Private Experiences |
| 5 | Press Logos | `PressLogos.tsx` | 6 publication logos, grayscale-on-hover |
| 6 | Experience Grid | `ExperienceGrid.tsx` | 3 expandable cards (Cooking $49, Home Meal $35, Coffee $25), inline step details on expand |
| 7 | Behind the Scenes | `BehindTheScenes.tsx` | Desktop: 3-col swipeable carousel with step pills. Mobile: single card touch swipe |
| 8 | Vetted Hosts & Ritual | `VettedHostsRow.tsx` + `JebenaDeepDive.tsx` | 12-col: left=3 compact items+quote, right=interactive coffee ritual |
| 9 | Online Classes | `OnlineClasses.tsx` | Full-width sandstone banner + "VIEW ONLINE CLASSES" CTA |
| 10 | FAQ | `FAQSection.tsx` | 2 collapsible FAQs |
| 11 | Footer | `Footer.tsx` | 5-column (see tree above) |

**Global overlays**: `StickyBookingBar` (mobile), `BookingWidget` (modal), `ContactModal` (modal)

### 3.2 Our Story (`activeView === 'our-story'`)
Sticky tab nav (`StoryTabsNav`, top-20) with 7 tabs, all sections use `scroll-mt-36`:

| Section | Component | Structure |
|---------|-----------|-----------|
| Story Hero | `StoryHeroBanner.tsx` | 55-65vh bg + gold announcement bar |
| About | `AboutSection.tsx` | 2-col text+image, 3 offer cards, quote banner, 2-col "How we started" |
| Founders | `FoundersSection.tsx` | 2 founder cards with initials/roles |
| How It Works | `HowItWorksSection.tsx` | 3-step horizontal cards |
| Safety | `SafetySection.tsx` | 3-point grid |
| Press | `PressSection.tsx` | Quote card + 6 logos |
| Careers | `CareersSection.tsx` | 2 cards + head office info block |
| FAQ | `StoryFaqSection.tsx` | 4 collapsible Q&A items |

### 3.3 Become a Host (`activeView === 'become-host'`)
| Section | Description |
|---------|-------------|
| Hero | 55-65vh bg + Back button |
| Intro Quote | Centered italic |
| Ideal Host + App Process | 12-col: desc + 4-step process + APPLY TODAY; Ask Super Host card |
| Trust & Feedback | 2-col: Trust+FAQ accordion + Feedback card with stars |
| Culinary Strip | Full-width bg + 3 circular images + CTA |

**Modals**: `ApplyModal` (2-step form), `AskHostModal` (chat UI with Mimi)

### 3.4 JebenaDeepDive (embedded in VettedHostsRow)
Interactive 3-round coffee ceremony: SVG clay Jebena, steam particles, tab pills (Abol/Tona/Bereka), per-round flavor notes + social mood, dark mode toggle.

### 3.5 BookingWidget (modal)
3-step flow with `BookingProgressBar`:
- **Step 1** (`BookingStep1`): Package select, date picker (min=2026-06-24), warning
- **Step 2** (`BookingStep2`): Guest count (+/-), dietary checkboxes (Vegan/Bayenetu, Gluten-Free, Halal)
- **Step 3** (`BookingSuccess`): Summary, $0 total (simulated)

### 3.6 ContactModal (modal)
Form: name, email, topic (5 options), message. Contact info block. Success state with "Amesegenalehu!"

### 3.7 Content Files Map
| File | Purpose |
|------|---------|
| `src/data.ts` | Global data: TRANSLATIONS, PACKAGES, REVIEWS, PRESS_LOGOS, NEIGHBORHOOD_DESTINATIONS |
| `src/content/our-story.json` | Story page all content |
| `src/content/become-host.json` | Become Host page + ApplyModal + AskHostModal content |
| `src/content/booking.json` | BookingWidget strings |
| `src/content/contact.json` | ContactModal strings |
| `src/content/jebena.json` | Coffee ceremony rounds data |
| `src/config/brand.ts` | BRAND config object |
| `src/types.ts` | TypeScript interfaces (Translations, ExperiencePackage, HostReview) |

## 4. Restructuring Red Flags

- **No client-side router**: All navigation via React state + `window.scrollTo()`. Hash links (`#experiences`) don't support deep-linking or browser back button.
- **All nav links use `href="#"` with `e.preventDefault()`**: Breaks right-click "Open in new tab", SEO crawlability, and standard link behavior.
- **Footer links are dead**: References `#about`, `#founders`, `#works`, `#safety`, `#press`, `#careers`, `#ambassador`, `#agency`, `#terms`, `#privacy`, `#cookie`, `#blog` — none exist as scrollable elements on current pages.
- **No explicit "Home" nav item**: Only logo click resets to home; no dedicated Home link in desktop or mobile nav.
- **Two duplicate FAQ components**: `FAQSection.tsx` (2 FAQs, home) and `StoryFaqSection.tsx` (4 FAQs, story) use different state shapes (`number | null` vs `Record<number, boolean>`).
- **BookingProgressBar misuses coffee ritual labels**: Uses `stepAbol`/`stepTona`/`stepBereka` translations as booking step labels, conflating the coffee ceremony with the booking flow.
- **Hardcoded values in BookingStep2**: Success summary uses `Object.entries({ vegan: false, glutenFree: false, halal: false })` instead of the `dietary` prop.
- **No lazy loading**: All components eagerly loaded in App.tsx regardless of active view.
- **Homepage content not in JSON**: Homepage strings live in `src/data.ts` while all other pages use `src/content/*.json`.
- **TODO placeholders in data.ts**: PACKAGES and REVIEWS marked for replacement with city tour content.
- **`src/content/home.json` missing**: Homepage content not extracted to JSON like other pages.

# **UX/UI REVAMP MASTER ENGINEERING PLAYBOOK**
## **Addis Ababa City Tours Platform Transition**

**Document Version:** 1.0 (Production-Ready)  
**Effective Date:** August 28, 2026  
**Status:** Approved for Implementation  
**Audience:** Frontend Engineers, UX Designers, QA Team, Product Managers

***

## **1. PROJECT VISION & PARADIGM SHIFT**

### **1.1 Strategic Repositioning**

This document engineers the complete transition of the existing React 19 + Vite + Tailwind CSS v4 single-page application from a **culinary host marketplace** to a **destination-focused tour operator platform** specializing in Addis Ababa city tours and nearby regional excursions.

**Core Business Model Change:**

| Dimension | Previous State (Culinary) | New State (Tour Operator) |
|-----------|---------------------------|---------------------------|
| **Primary Product** | Hosted meal experiences, coffee ceremonies, online classes | Guided city tours, day trips, private custom itineraries |
| **Revenue Model** | Commission on host bookings | Direct tour sales, private tour premiums, travel partner commissions |
| **Target Customer** | Food-focused travelers, cultural immersion seekers | General leisure travelers, layover passengers, heritage tourists, adventure seekers |
| **Supply Side** | Individual home hosts, culinary enthusiasts | Employed guides, owned/leased vehicles, operational logistics |
| **Conversion Path** | Browse hosts → select experience → book meal | Browse tours → select itinerary → check availability → book or request |
| **Trust Signals** | Host reviews, food safety, platform verification | Guide credentials, vehicle safety, licensing, insurance, third-party reviews |
| **Content Focus** | Recipes, host stories, cooking techniques | Itineraries, attraction facts, practical visitor information, cultural context |

### **1.2 Technical Architecture Changes**

**Preserved Components:**
- React 19 + Vite + Tailwind CSS v4 stack
- State-based view switching (`activeView` pattern)
- Modal-based booking and contact flows
- Responsive grid system and card layouts
- Global navbar and footer structure

**Deprecated Components:**
- `BecomeHost` view and all host-acquisition flows
- `ApplyModal` and `AskHostModal`
- `JebenaDeepDive` as a primary product module
- `OnlineClasses` as a featured homepage section
- Host-centric data models in `src/data.ts`

**New Requirements:**
- Real client-side routing (React Router or equivalent) for crawlable URLs
- Structured tour content model (JSON-based, separate from code)
- Multi-step booking flow specific to tours (date, guests, pickup, requirements)
- Destination and attraction content pages
- FAQ and practical information sections
- Reviews and third-party validation integration
- Legal pages (terms, privacy, cancellation policy)

### **1.3 Success Metrics**

**Business KPIs:**
- Tour booking conversion rate (target: 3-5%)
- Average booking value (target: $60-120 per person)
- Direct booking rate vs. OTA (target: 60%+ direct)
- WhatsApp/contact inquiry conversion (target: 20-30% to booking)
- Mobile booking completion rate (target: 50%+ of total bookings)

**Technical KPIs:**
- Mobile load time under 3 seconds (Lighthouse score 90+)
- Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1
- WCAG 2.1 AA accessibility compliance (all color contrasts ≥ 4.5:1)
- Zero critical accessibility violations
- 100% of important pages have unique, crawlable URLs

**UX KPIs:**
- Homepage bounce rate under 40%
- Average session duration 3+ minutes
- Tour detail page engagement (scroll depth 70%+)
- Booking flow abandonment rate under 50%

***

## **2. FINALIZED GLOBAL NAVIGATION TREE**

### **2.1 Desktop Navigation Structure**

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│  [LOGO]    Tours▼   Destinations▼   Why Choose Us   Travel Guide   Contact     │
│                                                                              │
│                              [BOOK A TOUR] ← Primary CTA Button                │
│                              (Orange #C75122, 48x48px, sticky)                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

**Navigation Items (Left to Right):**

1. **Logo** (left-aligned, links to `/`)
   - Size: 180x50px (desktop), 140x40px (mobile)
   - Alt text: "Addis Ababa City Tours - Licensed Local Tour Operator"
   - Behavior: Scroll to top, reset to home view

2. **Tours** (dropdown menu, 3 columns)
   - **Column 1: City Tours**
     - Half-Day Addis Ababa City Tour (from $42, 4 hours)
     - Full-Day Addis Ababa City Tour (from $69, 8-9 hours)
     - Addis Ababa Highlights Tour (from $55, 6 hours)
   - **Column 2: Day Trips**
     - Debre Libanos & Portuguese Bridge (from $85, 8-9 hours)
     - Tiya, Adadi Mariam & Melka Kunture (from $95, 9-10 hours)
     - Menagesha Forest Day Trip (from $80, 8-9 hours)
     - Bishoftu Crater Lakes (from $75, 8 hours)
   - **Column 3: Private & Custom**
     - Custom Addis Ababa Itinerary (price on request)
     - Airport Layover Tour (from $65, 4-6 hours)
     - Private Group Tours (price on request)
     - Travel Agent Enquiries (B2B portal)
   - **Dropdown Behavior:**
     - Appears on hover (desktop), click (mobile)
     - 150ms delay before opening (prevents accidental triggers)
     - Each item includes: tour name, starting price, duration
     - No star ratings or review counts in menu (avoid unverified claims)

3. **Destinations** (dropdown menu, 2 columns)
   - **Column 1: Addis Ababa**
     - Addis Ababa Travel Guide (complete destination guide)
     - Top 10 Attractions in Addis Ababa
     - Best Time to Visit Addis Ababa
     - Airport Layover Planning Guide
   - **Column 2: Day Trip Destinations**
     - Debre Libanos Monastery Guide
     - Blue Nile Gorge & Portuguese Bridge
     - Tiya UNESCO World Heritage Site
     - Adadi Mariam Rock-Hewn Church
     - Melka Kunture Archaeological Site
     - Menagesha Suba Forest
     - Bishoftu (Debre Zeit) Crater Lakes
     - Wenchi Crater Lake (if operationally verified)
   - **Dropdown Behavior:**
     - Same as Tours dropdown
     - Each item includes: destination name, brief description (1 sentence)

4. **Why Choose Us** (single page, no dropdown)
   - Links to: `/why-choose-us/`
   - Content sections:
     - Local Knowledge & Expertise
     - Private & Small-Group Options
     - Transport & Pickup Information
     - Safety & Responsibility
     - Booking & Cancellation Policy
     - Frequently Asked Questions (embedded FAQ section)
   - **Note:** This replaces the old "Help" navigation item

5. **Travel Guide** (single page, no dropdown)
   - Links to: `/travel-guide/`
   - Content sections:
     - Things to Do in Addis Ababa
     - Best Time to Visit
     - What to Wear at Religious Sites
     - Coffee & Cultural Etiquette
     - Day Trips from Addis Ababa
     - Practical Visitor Information (visas, currency, health, safety)
   - **Note:** This is editorial content for SEO authority, not product pages

6. **Contact** (single page, no dropdown)
   - Links to: `/contact/`
   - Content:
     - Contact form (name, email, phone, topic, message)
     - WhatsApp link (click-to-chat)
     - Phone number (click-to-call on mobile)
     - Email address
     - Physical address (if applicable)
     - Office hours
     - Custom tour inquiry form
     - Travel agent partnership inquiry
   - **Modal Option:** Keep existing `ContactModal` as a quick-contact shortcut from other pages

7. **[BOOK A TOUR] Button** (primary CTA, right-aligned)
   - **Color:** Orange `#C75122` (corrected for WCAG AA)
   - **Size:** 48x48px minimum (thumb-friendly)
   - **Text:** "BOOK A TOUR" (all caps, action-oriented)
   - **Link:** `/tours/` (tour listing page)
   - **Sticky:** Remains visible on scroll (desktop + mobile)
   - **Hover Effect:** Slight scale up (1.05x), shadow increase, color darken to `#A84318`

### **2.2 Mobile Navigation Structure**

```
┌─────────────────────────────────────────────────────────────┐
│  [LOGO]                                    [BOOK]  [☰]      │
│  (140x40px)                                (48x48px)        │
└─────────────────────────────────────────────────────────────┘
```

**Hamburger Menu (When Opened):**
- **Slide-in from right** (right-handed users, natural thumb close)
- **Overlay with close button** (X icon inside menu, not just hamburger)
- **Accordion-style dropdowns** (expand submenus inline, not nested overlays)
- **Maximum 2 levels** (no third-level dropdowns on mobile)
- **Parent items are both links AND expand triggers** (separate chevron button for expand)

**Mobile Menu Items (Top to Bottom):**

1. **Tours** (accordion expand)
   - **Expand reveals:**
     - City Tours (sub-header, not clickable)
       - Half-Day Addis Ababa City Tour
       - Full-Day Addis Ababa City Tour
       - Addis Ababa Highlights Tour
     - Day Trips (sub-header, not clickable)
       - Debre Libanos & Portuguese Bridge
       - Tiya, Adadi Mariam & Melka Kunture
       - Menagesha Forest Day Trip
       - Bishoftu Crater Lakes
     - Private & Custom (sub-header, not clickable)
       - Custom Addis Ababa Itinerary
       - Airport Layover Tour
       - Private Group Tours

2. **Destinations** (accordion expand)
   - **Expand reveals:**
     - Addis Ababa Travel Guide
     - Top 10 Attractions in Addis Ababa
     - Debre Libanos Monastery Guide
     - Tiya UNESCO Site Guide
     - Menagesha Forest Guide
     - Bishoftu Crater Lakes Guide

3. **Why Choose Us** (direct link, no expand)

4. **Travel Guide** (direct link, no expand)

5. **Contact** (direct link, no expand)

6. **[BOOK A TOUR] Button** (repeated at bottom of mobile menu)
   - Same styling as header CTA
   - Ensures CTA is always accessible even if header CTA is missed

**Mobile Menu Best Practices:**
- **Tap targets:** 48x48px minimum (WCAG 2.1 AA, Apple HIG)
- **Label "Menu" next to hamburger icon** (improves engagement by 20%)
- **Animate transition** (hamburger morphs to X, signals state change)
- **Include close button inside menu** (not just X icon, reduces frustration)
- **Trigger on click only** (not hover—touch devices can't hover)
- **150-300ms delay before opening** (prevents accidental triggers)

### **2.3 Footer Navigation Structure**

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│  FOOTER (bg-dark-footer #1B2430, gold 4px top border)                           │
│                                                                                 │
│  Col 1: BRAND                                                                   │
│  - Logo + tagline                                                               │
│  - Social icons (IG, FB, TT)                                                    │
│                                                                                 │
│  Col 2: COMPANY                                                                 │
│  - About Us → /about/                                                           │
│  - Our Team → /about/#team                                                      │
│  - How It Works → /why-choose-us/#how-it-works                                  │
│  - Safety & Responsibility → /why-choose-us/#safety                             │
│  - Reviews → /reviews/ (embedded TripAdvisor widget)                            │
│                                                                                 │
│  Col 3: SUPPORT                                                                 │
│  - FAQs → /why-choose-us/#faqs                                                  │
│  - Contact Us → /contact/                                                       │
│  - Custom Tour Inquiry → /custom-tour/                                          │
│  - Travel Agents → /travel-agents/                                              │
│  - Booking Policy → /booking-policy/                                            │
│                                                                                 │
│  Col 4: LEGAL                                                                   │
│  - Terms & Conditions → /terms/                                                 │
│  - Privacy Policy → /privacy/                                                   │
│  - Cancellation Policy → /cancellation-policy/                                  │
│  - Cookie Policy → /cookies/                                                    │
│                                                                                 │
│  Col 5: CONTACT                                                                 │
│  - Sphere Head Office                                                           │
│  - Address, phone, email                                                        │
│  - Office hours                                                                 │
│                                                                                 │
│  Bottom Row:                                                                    │
│  - Copyright © 2026 Addis Ababa City Tours                                      │
│  - Powered by Sphere, Johnny Technologies                                       │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

**Key Changes from Previous Footer:**
- **Removed:** "Become a Host," "Ambassador," "Agency Login" (deprecated host-acquisition links)
- **Added:** "Reviews," "About Us," "Our Team," "Custom Tour Inquiry," "Travel Agents," "Booking Policy"
- **Redistributed:** "About" and "Reviews" moved from main nav to footer (per executive constraint)
- **Consolidated:** "Help" renamed to "Support" and merged with contact options
- **Clarified:** Legal links now have dedicated column (previously scattered)

***

## **3. INFORMATION ARCHITECTURE & PAGE REMAPPING**

### **3.1 URL Structure & Route Map**

**Core Routes:**

```
/                              → Homepage
/tours/                        → Tour listing page
/tours/half-day-addis-ababa-city-tour/
/tours/full-day-addis-ababa-city-tour/
/tours/addis-ababa-highlights-tour/
/tours/debre-libanos-portuguese-bridge/
/tours/tiya-adadi-mariam-melka-kunture/
/tours/menagesha-forest-day-trip/
/tours/bishoftu-crater-lakes/
/tours/custom-addis-ababa-itinerary/
/tours/airport-layover-tour/
/tours/private-group-tours/

/destinations/                 → Destination listing page
/destinations/addis-ababa/
/destinations/debre-libanos/
/destinations/tiya/
/destinations/menagesha-forest/
/destinations/bishoftu/

/why-choose-us/                → Why Choose Us page (includes FAQs)
/travel-guide/                 → Travel Guide listing page
/travel-guide/things-to-do-addis-ababa/
/travel-guide/best-time-to-visit/
/travel-guide/what-to-wear-religious-sites/
/travel-guide/coffee-cultural-etiquette/
/travel-guide/day-trips-from-addis-ababa/

/about/                        → About Us page (includes team)
/reviews/                      → Reviews page (TripAdvisor widget + testimonials)
/contact/                      → Contact page (form + WhatsApp + phone)
/custom-tour/                  → Custom tour inquiry page
/travel-agents/                → Travel agent partnership page

/booking-policy/               → Booking terms & conditions
/terms/                        → Terms of service
/privacy/                      → Privacy policy
/cancellation-policy/          → Cancellation & refund policy
/cookies/                      → Cookie policy

* All routes must have:
  - Unique URL
  - Unique title & meta description
  - Canonical URL
  - Server-rendered or statically rendered HTML shell
  - Working browser back button
  - Shareable deep link
  - Crawlable <a href> links
```

### **3.2 Homepage Section Remapping**

**Previous Homepage (12 sections):**

| # | Old Section | Component | New Status |
|---|-------------|-----------|------------|
| 1 | Announcement Bar | Inline | **Preserve** (utility announcements) |
| 2 | Hero Banner | `HeroBanner.tsx` | **Replace** (tour-focused hero) |
| 3 | Reviews Carousel | `ReviewsCarousel.tsx` | **Replace** (verified tour reviews) |
| 4 | Key Benefits | `KeyBenefits.tsx` | **Repurpose** (why book direct) |
| 5 | Press Logos | `PressLogos.tsx` | **Conditional** (only if verified) |
| 6 | Experience Grid | `ExperienceGrid.tsx` | **Replace** (6 tour product cards) |
| 7 | Behind the Scenes | `BehindTheScenes.tsx` | **Repurpose** (how the tour works) |
| 8 | Vetted Hosts & Ritual | `VettedHostsRow.tsx` + `JebenaDeepDive.tsx` | **Replace** (guides & vehicles) |
| 9 | Online Classes | `OnlineClasses.tsx` | **Remove** (or archive) |
| 10 | FAQ | `FAQSection.tsx` | **Expand** (tour-specific FAQs) |
| 11 | Footer | `Footer.tsx` | **Preserve** (updated structure) |

**New Homepage (15 sections):**

| # | New Section | Component | Purpose |
|---|-------------|-----------|---------|
| 1 | Announcement Bar | Inline | Utility announcements (e.g., "New: Airport Layover Tours") |
| 2 | Global Navigation | `Navbar.tsx` | As defined in Section 2 |
| 3 | Hero Section | `HeroBanner.tsx` (rebuilt) | 3-slide slider with tour-focused messaging |
| 4 | Trust & Booking Strip | New component | TripAdvisor rating, "Book Direct & Save 15%", WhatsApp CTA |
| 5 | Tour Category Selector | New component | City Tours | Day Trips | Private & Custom |
| 6 | Featured Tours Grid | `ExperienceGrid.tsx` (rebuilt) | 6 tour product cards (3 columns x 2 rows) |
| 7 | Why Choose Us Preview | `KeyBenefits.tsx` (repurposed) | 3-column benefits (local expertise, private tours, flexible booking) |
| 8 | Addis Ababa Highlights | New component | 4-card grid of top attractions (National Museum, Merkato, Holy Trinity, Entoto) |
| 9 | Day Trip Destinations | New component | 4-card carousel of nearby destinations (Debre Libanos, Tiya, Menagesha, Bishoftu) |
| 10 | How Booking Works | New component | 3-step visual (Select Tour → Check Availability → Confirm & Pay) |
| 11 | Reviews & Social Proof | `ReviewsCarousel.tsx` (rebuilt) | TripAdvisor widget + 3 verified review quotes |
| 12 | Practical Information | New component | Visa, currency, best time to visit, what to wear (links to Travel Guide) |
| 13 | FAQ Preview | `FAQSection.tsx` (expanded) | 5-6 accordion FAQs (tour-specific) |
| 14 | Final CTA | New component | Full-width section with "Ready to Explore Addis Ababa?" + CTA |
| 15 | Footer | `Footer.tsx` (updated) | As defined in Section 2.3 |

### **3.3 Tour Detail Page Structure**

**Template for All Tour Pages:**

```
/tours/[tour-slug]/

1. Hero Section
   - Tour name (H1)
   - Quick stats bar: duration, group size, rating, price
   - Primary CTA: "Book Now" (sticky on mobile)
   - Secondary CTA: "WhatsApp Us"
   - Background: High-quality tour image

2. Quick Answer Box (GEO-Optimized)
   - Heading: "What is the [Tour Name]?"
   - Answer-first paragraph (40-60 words)
   - Bullet highlights (AI-extractable format)

3. Detailed Itinerary
   - Hour-by-hour or stop-by-stop breakdown
   - Travel times between stops
   - Photo opportunities and rest stops

4. What's Included / Excluded
   - Two-column table (AI-extractable)
   - Clear bullet lists

5. Pricing Table
   - Adult, child, infant pricing
   - Private vs. group tour pricing
   - "Book direct & save 15%" note

6. Reviews
   - Embedded TripAdvisor widget
   - 2-3 full review quotes with names and dates

7. FAQ (Tour-Specific)
   - 5-10 accordion FAQs
   - Schema-marked for AI extraction

8. Trust & Safety
   - Licenses, certifications, insurance
   - Guide credentials
   - Vehicle safety information

9. Related Tours
   - Grid of 2-3 related tour cards
   - Cross-sell opportunities

10. Final CTA
    - "Ready to Book Your [Tour Name]?"
    - Primary CTA: "Book Now"
    - Secondary CTA: "Contact Us"
```

### **3.4 Destination Guide Page Structure**

**Template for All Destination Pages:**

```
/destinations/[destination-slug]/

1. Hero Section
   - Destination name (H1)
   - Subheading: Brief description (1-2 sentences)
   - Background: High-quality destination image

2. Quick Answer Box (GEO-Optimized)
   - Heading: "What is [Destination] known for?"
   - Answer-first paragraph (40-60 words)

3. Table of Contents (Jump Links)
   - Top Attractions
   - Best Tours to [Destination]
   - When to Visit
   - Getting There
   - Where to Stay
   - Safety & Practical Tips
   - Cultural Etiquette

4. Top Attractions
   - List format (each with 2-3 sentences + link to tour)

5. Best Tours
   - Grid of 3-4 tour cards with brief descriptions and CTAs

6. When to Visit
   - Answer-first paragraph
   - Table format (season, months, weather, crowds, best for)

7. Getting There
   - Bullet points (transport options, distances, travel times)

8. Where to Stay
   - Neighborhood recommendations
   - Hotel types (budget, mid-range, luxury)

9. Safety & Practical Tips
   - Bullet points (safety, visas, currency, health, altitude)

10. Cultural Etiquette
    - Bullet points (greetings, dress code, photography, customs)

11. FAQ (Destination-Specific)
    - 5-10 accordion FAQs

12. Related Content
    - Links to other destination guides and blog posts
```

***

## **4. PRESERVED UI COMPONENT REGISTRY**

### **4.1 Component Preservation Mandate**

**Executive Constraint:** Retain existing card components, inner section structures, and established UI block layouts exactly "as is." Do not alter the core visual layout grid of these components.

**Interpretation:** The following components must be preserved in their current structural form, with only content and styling updates (no layout changes):

### **4.2 Preserved Components**

#### **4.2.1 Card Components**

**`ExperienceCard.tsx` (Now `TourCard.tsx`)**

**Current Structure:**
```tsx
// Existing structure (preserved)
<div className="card">
  <div className="card-image">
    <img src={image} alt={title} />
  </div>
  <div className="card-content">
    <h3 className="card-title">{title}</h3>
    <p className="card-description">{description}</p>
    <div className="card-meta">
      <span className="card-duration">{duration}</span>
      <span className="card-price">{price}</span>
    </div>
    <button className="card-cta">{ctaText}</button>
  </div>
</div>
```

**Required Updates:**
- Rename component from `ExperienceCard` to `TourCard`
- Update content model (tour data instead of experience data)
- Add new fields: `rating`, `reviewCount`, `groupSize`, `availability`
- Preserve all CSS classes, grid layout, and responsive behavior
- Update image aspect ratio if needed (16:10 recommended for tours)

**New Content Model:**
```typescript
interface TourCard {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  image: string;
  duration: string;
  groupSize: string;
  price: string;
  currency: string;
  rating: number;
  reviewCount: number;
  availability: 'available' | 'limited' | 'sold-out';
  ctaText: string;
  link: string;
}
```

***

#### **4.2.2 Section Components**

**`KeyBenefits.tsx` (Now `WhyChooseUsPreview.tsx`)**

**Current Structure:**
```tsx
// Existing structure (preserved)
<div className="benefits-section">
  <div className="benefits-grid">
    <div className="benefit-card">
      <div className="benefit-icon">{icon}</div>
      <h3 className="benefit-title">{title}</h3>
      <p className="benefit-description">{description}</p>
    </div>
    {/* Repeat for 3 benefits */}
  </div>
</div>
```

**Required Updates:**
- Rename component from `KeyBenefits` to `WhyChooseUsPreview`
- Update content (local expertise, private tours, flexible booking)
- Preserve 3-column grid layout (desktop), stacked (mobile)
- Update icons (map pin, price tag, shield)
- Preserve all CSS classes and responsive behavior

**New Content Model:**
```typescript
interface BenefitCard {
  icon: string;
  title: string;
  description: string;
}

const benefits: BenefitCard[] = [
  {
    icon: 'map-pin',
    title: 'Local Experts',
    description: 'We live here, guide here, and know Addis Ababa better than any OTA.'
  },
  {
    icon: 'price-tag',
    title: 'Best Price Guarantee',
    description: 'Book direct and save 15% vs. GetYourGuide/Viator prices.'
  },
  {
    icon: 'shield',
    title: 'Flexible & Safe',
    description: 'Free cancellation up to 24 hours. Licensed & insured. 24/7 WhatsApp support.'
  }
];
```

***

**`ReviewsCarousel.tsx` (Now `TestimonialsCarousel.tsx`)**

**Current Structure:**
```tsx
// Existing structure (preserved)
<div className="reviews-section">
  <div className="reviews-carousel">
    <div className="review-card">
      <div className="review-stars">{stars}</div>
      <p className="review-text">{text}</p>
      <div className="review-author">{author}</div>
    </div>
    {/* Carousel navigation */}
  </div>
</div>
```

**Required Updates:**
- Rename component from `ReviewsCarousel` to `TestimonialsCarousel`
- Update content model (tour reviews instead of host reviews)
- Preserve auto-rotate behavior (8s interval)
- Preserve prev/next arrows and dot indicators
- Preserve all CSS classes and responsive behavior
- Add TripAdvisor widget integration (iframe or API)

**New Content Model:**
```typescript
interface Testimonial {
  id: string;
  stars: number;
  text: string;
  author: string;
  location: string;
  date: string;
  tourName: string;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    stars: 5,
    text: 'Absolutely fantastic tour! Our guide was knowledgeable, friendly, and showed us the real Addis Ababa...',
    author: 'Sarah M.',
    location: 'United States',
    date: 'August 2026',
    tourName: 'Half-Day Addis Ababa City Tour'
  },
  // Additional testimonials...
];
```

***

**`FAQSection.tsx` (Now `FAQAccordion.tsx`)**

**Current Structure:**
```tsx
// Existing structure (preserved)
<div className="faq-section">
  <div className="faq-item">
    <button className="faq-question">{question}</button>
    <div className="faq-answer">{answer}</div>
  </div>
  {/* Repeat for multiple FAQs */}
</div>
```

**Required Updates:**
- Rename component from `FAQSection` to `FAQAccordion`
- Update content model (tour-specific FAQs)
- Preserve accordion behavior (expand/collapse)
- Preserve all CSS classes and responsive behavior
- Add schema markup for FAQPage (JSON-LD)

**New Content Model:**
```typescript
interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    id: '1',
    question: 'How much does the Half-Day Addis Ababa City Tour cost?',
    answer: 'From $42 per person for small group tours, or from $48-65 per person for private tours depending on group size. Book direct and save 15% vs. OTA prices.'
  },
  // Additional FAQs...
];
```

***

#### **4.2.3 Modal Components**

**`BookingWidget.tsx` (Now `TourBookingModal.tsx`)**

**Current Structure:**
```tsx
// Existing structure (preserved)
<div className="modal-overlay">
  <div className="modal-content">
    <div className="modal-header">
      <h2>{title}</h2>
      <button className="modal-close">X</button>
    </div>
    <div className="modal-body">
      {/* Booking steps */}
    </div>
  </div>
</div>
```

**Required Updates:**
- Rename component from `BookingWidget` to `TourBookingModal`
- Rebuild booking flow (tour selection, date, guests, pickup, requirements)
- Preserve modal structure (overlay, content, header, close button)
- Preserve progress bar component (update labels from coffee ritual to booking steps)
- Preserve all CSS classes and responsive behavior
- Update form fields (remove dietary checkboxes, add pickup location, special requirements)

**New Booking Flow:**
```typescript
interface BookingStep1 {
  tour: string;
  date: string;
  guests: number;
}

interface BookingStep2 {
  name: string;
  email: string;
  phone: string;
  pickupLocation: string;
  specialRequirements: string;
}

interface BookingStep3 {
  tourName: string;
  date: string;
  guests: number;
  pickupLocation: string;
  totalPrice: number;
  cancellationPolicy: string;
}
```

***

**`ContactModal.tsx` (Preserve as Is)**

**Current Structure:**
```tsx
// Existing structure (preserved)
<div className="modal-overlay">
  <div className="modal-content">
    <div className="modal-header">
      <h2>{title}</h2>
      <button className="modal-close">X</button>
    </div>
    <div className="modal-body">
      {/* Contact form */}
    </div>
  </div>
</div>
```

**Required Updates:**
- No structural changes required
- Update form fields if needed (add WhatsApp option, tour interest dropdown)
- Preserve all CSS classes and responsive behavior
- Update success message ("Amesegenalehu!" is culturally appropriate, preserve)

***

#### **4.2.4 Deprecated Components**

**Components to Remove or Archive:**

| Component | Current Use | New Status | Action |
|-----------|-------------|------------|--------|
| `BecomeHost.tsx` | Host acquisition view | **Deprecated** | Remove from main app, archive if needed for separate platform |
| `ApplyModal.tsx` | Host application form | **Deprecated** | Remove (no longer needed) |
| `AskHostModal.tsx` | Host chat interface | **Deprecated** | Remove (no longer needed) |
| `JebenaDeepDive.tsx` | Coffee ceremony interactive | **Repurpose** | Move to `/travel-guide/coffee-cultural-etiquette/` as editorial content |
| `OnlineClasses.tsx` | Online class promotion | **Deprecated** | Remove (or archive if classes still offered) |
| `VettedHostsRow.tsx` | Host showcase | **Replace** | Rebuild as `OurGuides.tsx` (guide credentials, vehicle info) |
| `BehindTheScenes.tsx` | Host ritual showcase | **Repurpose** | Rebuild as `HowTourWorks.tsx` (tour process, pickup to dropoff) |
| `StoryTabsNav.tsx` | Our Story page navigation | **Preserve** | Keep for `/about/` page (update tab content) |
| `StoryHeroBanner.tsx` | Our Story hero | **Preserve** | Keep for `/about/` page (update content) |
| `AboutSection.tsx` | Our Story about content | **Preserve** | Keep for `/about/` page (update content) |
| `FoundersSection.tsx` | Our Story founders | **Preserve** | Keep for `/about/` page (update content) |
| `HowItWorksSection.tsx` | Our Story how it works | **Preserve** | Keep for `/about/` page (update content) |
| `SafetySection.tsx` | Our Story safety | **Preserve** | Keep for `/about/` page (update content) |
| `PressSection.tsx` | Our Story press | **Preserve** | Keep for `/about/` page (update content) |
| `CareersSection.tsx` | Our Story careers | **Conditional** | Keep only if actively recruiting |
| `StoryFaqSection.tsx` | Our Story FAQ | **Preserve** | Keep for `/about/` page (update content) |

***

### **4.3 Component Migration Checklist**

**Before Development:**

- [ ] Rename all components per new naming convention
- [ ] Update TypeScript interfaces for new content models
- [ ] Create new JSON content files for tours, destinations, FAQs, reviews
- [ ] Remove deprecated components from `App.tsx`
- [ ] Update import paths in all files
- [ ] Test all preserved components with new content
- [ ] Verify responsive behavior on mobile, tablet, desktop
- [ ] Test all modal flows (booking, contact)
- [ ] Verify accessibility (keyboard navigation, focus states, ARIA labels)

**After Development:**

- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Cross-device testing (iPhone, Android, iPad, desktop)
- [ ] Test all CTAs (click tracking, conversion funnel)
- [ ] Test navigation (dropdowns, mobile accordion, sticky behavior)
- [ ] Test mobile load speed (Google PageSpeed Insights, target: 90+)
- [ ] Test Core Web Vitals (LCP < 2.5s, FID < 100ms, CLS < 0.1)
- [ ] Fix any bugs or broken links
- [ ] Get stakeholder approval on live site

***

## **5. DESIGN SYSTEM TOKENS**

### **5.1 Color Palette (WCAG 2.1 AA Compliant)**

**Brand Primaries (Corrected for Accessibility):**

| Token Name | Hex Code | Usage | Contrast Ratio (White Text) | Status |
|------------|----------|-------|----------------------------|--------|
| `--brand-primary-orange` | `#C75122` | Primary CTA buttons, active states, key tour highlights | 4.5:1 ✓ | **Approved** |
| `--brand-primary-orange-hover` | `#A84318` | Hover states for orange buttons | 5.2:1 ✓ | **Approved** |
| `--brand-trust-blue` | `#1E5A8A` | Trust badges, secondary buttons, links, focus states | 7.28:1 ✓ | **Approved** |
| `--brand-trust-blue-hover` | `#16456B` | Hover states for blue buttons | 8.1:1 ✓ | **Approved** |

**Brand Accents:**

| Token Name | Hex Code | Usage | Contrast Ratio (White Text) | Status |
|------------|----------|-------|----------------------------|--------|
| `--brand-nature-green` | `#3D7A22` | Success states, eco-badges, savings alerts | 4.6:1 ✓ | **Approved** |
| `--brand-nature-green-hover` | `#2F5F1A` | Hover states for green buttons | 5.4:1 ✓ | **Approved** |
| `--brand-ground-brown` | `#8B5E3C` | Heritage tags, cultural content, dividers | 5.58:1 ✓ | **Approved** |

**Interface Backgrounds:**

| Token Name | Hex Code | Usage | Notes |
|------------|----------|-------|-------|
| `--bg-light-primary` | `#FFFFFF` | Light mode main canvas | Crisp white for maximum content contrast |
| `--bg-light-secondary` | `#F8F9FA` | Light mode section alternate | Soft off-white for alternating content blocks |
| `--bg-dark-footer` | `#1B2430` | Dark mode / footer variant | Rich, deep charcoal-navy |

**Typography & Neutrals:**

| Token Name | Hex Code | Usage | Contrast Ratio (on White) | Status |
|------------|----------|-------|---------------------------|--------|
| `--text-heading` | `#111827` | Headings (H1-H3) | 17.74:1 ✓ | **Approved** |
| `--text-body` | `#4B5563` | Body text | 7.56:1 ✓ | **Approved** |
| `--text-inverse` | `#FFFFFF` | Text on dark backgrounds | 15.65:1 ✓ (on `#1B2430`) | **Approved** |
| `--border-divider` | `#E5E7EB` | Borders & dividers | Ultra-subtle light gray | **Approved** |
| `--border-focus` | `#1E5A8A` | Focus rings (blue) | 7.28:1 ✓ (on white) | **Approved** |

***

### **5.2 UI Context Matrix (Real-World Application Combos)**

**Scenario A: Primary Hero CTA (Conversion Focus)**

```css
Background: #FFFFFF (bg-light-primary)
Heading: #111827 (text-heading)
CTA Button: #C75122 (brand-primary-orange)
CTA Text: #FFFFFF (text-inverse)
Hover State: #A84318 (brand-primary-orange-hover)
```

**Why it works:** The vibrant orange contrasts sharply against the clean white, creating an unmissable call-to-action that aligns with the "energy" of travel. The corrected orange (`#C75122`) now passes WCAG AA for normal text (4.5:1 minimum).

***

**Scenario B: Trust & Safety Badge (User Confidence)**

```css
Icon Background: #1E5A8A (brand-trust-blue)
Icon/Text Color: #FFFFFF (text-inverse)
Card Background: #F8F9FA (bg-light-secondary)
Border: #E5E7EB (border-divider)
```

**Why it works:** The cool blue reinforces authority and reliability, sitting comfortably on the neutral gray card to build trust before a purchase. The 7.28:1 contrast ratio exceeds WCAG AA requirements.

***

**Scenario C: Pricing Alert / Eco-Accent (Special Offers)**

```css
Badge Background: #3D7A22 (brand-nature-green)
Badge Text: #FFFFFF (text-inverse)
Parent Card Border: #E5E7EB (border-divider)
Body Text: #4B5563 (text-body)
```

**Why it works:** The nature green visually communicates "positive action" (savings or eco-friendly), instantly grabbing attention without overwhelming the UI. The corrected green (`#3D7A22`) now passes WCAG AA for normal text (4.6:1).

***

**Scenario D: Footer / Dark Mode (Brand Closure)**

```css
Background: #1B2430 (bg-dark-footer)
Logo Text: #FFFFFF (text-inverse)
Subtle Divider: #333F4D (tinted from #1B2430)
Accent Icon Highlights: #8B5E3C (brand-ground-brown)
```

**Why it works:** The dark charcoal provides a premium, grounding finish. The earthy brown accent used on small cultural icons adds heritage depth without breaking the modern aesthetic. The 15.65:1 contrast ratio is near-maximum.

***

### **5.3 Typography System**

**Font Family:**

```css
--font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
--font-heading: 'Playfair Display', Georgia, serif;  /* Optional for headings */
```

**Font Sizes (Desktop):**

```css
--text-xs: 12px;    /* Small labels, meta info */
--text-sm: 14px;    /* Secondary text, captions */
--text-base: 16px;  /* Body text */
--text-lg: 18px;    /* Large body, small headings */
--text-xl: 20px;    /* H3, card titles */
--text-2xl: 24px;   /* H2, section headings */
--text-3xl: 30px;   /* H1, hero headings (mobile) */
--text-4xl: 36px;   /* H1, hero headings (desktop) */
--text-5xl: 48px;   /* Large hero headings (desktop) */
```

**Font Sizes (Mobile):**

```css
--text-xs: 12px;
--text-sm: 14px;
--text-base: 14px;  /* Slightly smaller on mobile */
--text-lg: 16px;
--text-xl: 18px;
--text-2xl: 24px;
--text-3xl: 28px;
--text-4xl: 32px;
--text-5xl: 36px;
```

**Font Weights:**

```css
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

**Line Heights:**

```css
--leading-tight: 1.2;   /* Headings */
--leading-normal: 1.4;  /* Subheadings, card titles */
--leading-relaxed: 1.6; /* Body text */
```

***

### **5.4 Spacing System**

**Base Unit:** 4px

```css
--spacing-0: 0;
--spacing-1: 4px;
--spacing-2: 8px;
--spacing-3: 12px;
--spacing-4: 16px;
--spacing-5: 20px;
--spacing-6: 24px;
--spacing-8: 32px;
--spacing-10: 40px;
--spacing-12: 48px;
--spacing-16: 64px;
--spacing-20: 80px;
--spacing-24: 96px;
```

**Section Padding:**

```css
--section-padding-desktop: 80px;  /* Top/bottom padding for sections */
--section-padding-mobile: 40px;   /* Top/bottom padding for mobile sections */
```

**Container Max Widths:**

```css
--container-sm: 640px;
--container-md: 768px;
--container-lg: 1024px;
--container-xl: 1280px;
--container-2xl: 1536px;
```

***

### **5.5 Border Radius System**

```css
--radius-none: 0;
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-xl: 16px;
--radius-2xl: 24px;
--radius-full: 9999px;
```

**Component Defaults:**

- Buttons: `--radius-md` (8px)
- Cards: `--radius-lg` (12px)
- Modals: `--radius-xl` (16px)
- Images: `--radius-md` (8px) or `--radius-none` (0) for full-bleed

***

### **5.6 Shadow System**

```css
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
--shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
```

**Component Defaults:**

- Cards (default): `--shadow-md`
- Cards (hover): `--shadow-lg`
- Modals: `--shadow-2xl`
- Dropdowns: `--shadow-lg`
- Sticky header: `--shadow-sm`

***

### **5.7 Transition System**

```css
--transition-fast: 150ms ease;
--transition-normal: 300ms ease;
--transition-slow: 500ms ease;
```

**Component Defaults:**

- Buttons (hover): `--transition-fast`
- Dropdowns (open/close): `--transition-normal`
- Modals (fade in/out): `--transition-normal`
- Carousel (slide): `--transition-slow`

***

### **5.8 Z-Index Scale**

```css
--z-base: 0;
--z-dropdown: 100;
--z-sticky: 200;
--z-modal-overlay: 300;
--z-modal: 400;
--z-tooltip: 500;
--z-toast: 600;
```

**Component Defaults:**

- Navbar: `--z-sticky` (200)
- Dropdown menus: `--z-dropdown` (100)
- Modal overlay: `--z-modal-overlay` (300)
- Modal content: `--z-modal` (400)
- Toast notifications: `--z-toast` (600)

***

### **5.9 Breakpoint System**

```css
--breakpoint-sm: 640px;   /* Mobile landscape */
--breakpoint-md: 768px;   /* Tablet */
--breakpoint-lg: 1024px;  /* Desktop */
--breakpoint-xl: 1280px;  /* Large desktop */
--breakpoint-2xl: 1536px; /* Extra-large desktop */
```

**Responsive Behavior:**

- **Mobile (< 768px):** Single-column layouts, stacked cards, hamburger menu
- **Tablet (768px - 1024px):** Two-column grids, visible navigation (may collapse at 768px)
- **Desktop (≥ 1024px):** Three-column grids, full navigation visible, sticky header

***

### **5.10 Accessibility Requirements**

**Focus States:**

```css
/* All interactive elements must have visible focus indicators */
button:focus, a:focus, input:focus, select:focus, textarea:focus {
  outline: 2px solid var(--border-focus);  /* #1E5A8A blue */
  outline-offset: 2px;
}
```

**Skip Links:**

```tsx
// Add skip link at top of page (hidden until focused)
<a href="#main-content" className="skip-link">
  Skip to main content
</a>
```

**ARIA Labels:**

```tsx
// All interactive elements must have accessible labels
<button aria-label="Book Half-Day Addis Ababa City Tour">
  Book Now
</button>

<nav aria-label="Main navigation">
  {/* Navigation content */}
</nav>

<dialog aria-labelledby="modal-title" aria-describedby="modal-description">
  {/* Modal content */}
</dialog>
```

**Color Blindness Considerations:**

- Do not rely solely on color to convey information (e.g., use icons + color for success/error states)
- Test palette with color blindness simulators (deuteranopia, protanopia, tritanopia)
- Ensure all text meets WCAG 2.1 AA contrast requirements (4.5:1 for normal text, 3:1 for large text)

***

## **6. IMPLEMENTATION ROADMAP**

### **Phase 1: Content & Data Model (Week 1-2)**

- [ ] Create JSON content files for all 6 tour products
- [ ] Create JSON content files for all 8 destination guides
- [ ] Create JSON content files for FAQs, reviews, practical information
- [ ] Update TypeScript interfaces for new content models
- [ ] Verify all business claims (licenses, prices, reviews, policies)
- [ ] Create claims register (verified, requires confirmation, do not publish)

### **Phase 2: Component Renaming & Refactoring (Week 3)**

- [ ] Rename all components per new naming convention
- [ ] Update import paths in all files
- [ ] Remove deprecated components from `App.tsx`
- [ ] Rebuild `HeroBanner.tsx` with 3-slide tour-focused slider
- [ ] Rebuild `ExperienceGrid.tsx` as `TourCardGrid.tsx`
- [ ] Rebuild `KeyBenefits.tsx` as `WhyChooseUsPreview.tsx`
- [ ] Rebuild `ReviewsCarousel.tsx` as `TestimonialsCarousel.tsx`
- [ ] Rebuild `FAQSection.tsx` as `FAQAccordion.tsx`
- [ ] Rebuild `BookingWidget.tsx` as `TourBookingModal.tsx`

### **Phase 3: Navigation & Routing (Week 4)**

- [ ] Implement React Router or equivalent for client-side routing
- [ ] Create all core routes (tours, destinations, about, contact, etc.)
- [ ] Update navbar with new navigation structure
- [ ] Update footer with new link structure
- [ ] Implement mobile hamburger menu with accordion dropdowns
- [ ] Test all navigation links (desktop + mobile)
- [ ] Test browser back/forward buttons
- [ ] Test deep linking (direct URL access)

### **Phase 4: Page Development (Week 5-6)**

- [ ] Build homepage with 15 new sections
- [ ] Build tour listing page (`/tours/`)
- [ ] Build 6 tour detail pages
- [ ] Build destination listing page (`/destinations/`)
- [ ] Build 8 destination guide pages
- [ ] Build `/why-choose-us/` page (includes FAQs)
- [ ] Build `/travel-guide/` listing page
- [ ] Build 5-6 travel guide articles
- [ ] Build `/about/` page (repurpose existing Our Story content)
- [ ] Build `/reviews/` page (TripAdvisor widget + testimonials)
- [ ] Build `/contact/` page (form + WhatsApp + phone)
- [ ] Build `/custom-tour/` inquiry page
- [ ] Build legal pages (terms, privacy, cancellation, cookies)

### **Phase 5: Styling & Design System (Week 7)**

- [ ] Implement new color palette tokens (CSS variables)
- [ ] Update all component styles to use new tokens
- [ ] Implement typography system (font sizes, weights, line heights)
- [ ] Implement spacing system (padding, margins)
- [ ] Implement shadow system (card shadows, modal shadows)
- [ ] Implement border radius system
- [ ] Implement transition system (hover states, animations)
- [ ] Test all color contrasts (WCAG 2.1 AA compliance)
- [ ] Test responsive behavior (mobile, tablet, desktop)

### **Phase 6: Testing & QA (Week 8)**

- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Cross-device testing (iPhone, Android, iPad, desktop)
- [ ] Test all CTAs (click tracking, conversion funnel)
- [ ] Test navigation (dropdowns, mobile accordion, sticky behavior)
- [ ] Test all forms (booking, contact, custom tour inquiry)
- [ ] Test modal flows (booking, contact)
- [ ] Test mobile load speed (Google PageSpeed Insights, target: 90+)
- [ ] Test Core Web Vitals (LCP < 2.5s, FID < 100ms, CLS < 0.1)
- [ ] Test accessibility (keyboard navigation, focus states, ARIA labels)
- [ ] Fix any bugs or broken links
- [ ] Get stakeholder approval on live site

### **Phase 7: SEO & Launch (Week 9)**

- [ ] Generate XML sitemap
- [ ] Implement 301 redirects for changed URLs
- [ ] Update meta titles and descriptions for all pages
- [ ] Implement canonical URLs
- [ ] Implement structured data (TouristTrip, LocalBusiness, FAQPage, AggregateRating)
- [ ] Update `robots.txt`
- [ ] Submit sitemap to Google Search Console
- [ ] Monitor for crawl errors and indexing issues
- [ ] Soft launch (internal testing, friend/family feedback)
- [ ] Fix any final bugs
- [ ] Official launch (announce on social media, email list)
- [ ] Monitor analytics (traffic, conversions, bounce rate, session duration)

***

## **7. GOVERNANCE & MAINTENANCE**

### **7.1 Content Updates**

**Frequency:**
- Tour prices: Update quarterly (or as needed)
- Tour availability: Update in real-time (if connected to booking system)
- Reviews: Update monthly (add new TripAdvisor reviews)
- FAQs: Update quarterly (add new questions from customer inquiries)
- Travel guide content: Update biannually (refresh practical information)

**Process:**
1. Content team updates JSON files
2. Developer reviews changes
3. QA tests on staging environment
4. Deploy to production
5. Monitor for errors or broken links

### **7.2 Design System Updates**

**Frequency:**
- Color palette: Review annually (or if rebranding)
- Typography: Review annually (or if accessibility issues arise)
- Spacing/layout: Review as needed (if new components require adjustments)

**Process:**
1. Designer proposes changes
2. Developer assesses technical impact
3. QA tests across all components
4. Update design system documentation
5. Deploy to production

### **7.3 Accessibility Audits**

**Frequency:**
- Automated testing: Every deployment (CI/CD pipeline)
- Manual testing: Quarterly (keyboard navigation, screen reader testing)
- Full audit: Annually (WCAG 2.1 AA compliance verification)

**Tools:**
- Lighthouse (automated accessibility scoring)
- axe DevTools (browser extension for manual testing)
- WAVE (web accessibility evaluation tool)
- Color contrast checkers (WebAIM, ColorContrast.org)

### **7.4 Performance Monitoring**

**Metrics to Track:**
- Mobile load time (target: under 3 seconds)
- Core Web Vitals (LCP < 2.5s, FID < 100ms, CLS < 0.1)
- Lighthouse score (target: 90+)
- Bounce rate (target: under 40%)
- Average session duration (target: 3+ minutes)
- Conversion rate (target: 3-5%)

**Tools:**
- Google Analytics 4 (traffic, conversions, user behavior)
- Google Search Console (SEO performance, crawl errors)
- Google PageSpeed Insights (load time, optimization suggestions)
- Hotjar or similar (heatmaps, user recordings, feedback)

***

## **8. APPENDIX: QUICK REFERENCE**

### **8.1 Color Palette Quick Reference**

```css
/* Brand Primaries */
--brand-primary-orange: #C75122;
--brand-primary-orange-hover: #A84318;
--brand-trust-blue: #1E5A8A;
--brand-trust-blue-hover: #16456B;

/* Brand Accents */
--brand-nature-green: #3D7A22;
--brand-nature-green-hover: #2F5F1A;
--brand-ground-brown: #8B5E3C;

/* Backgrounds */
--bg-light-primary: #FFFFFF;
--bg-light-secondary: #F8F9FA;
--bg-dark-footer: #1B2430;

/* Text */
--text-heading: #111827;
--text-body: #4B5563;
--text-inverse: #FFFFFF;

/* UI */
--border-divider: #E5E7EB;
--border-focus: #1E5A8A;
```

### **8.2 Navigation Quick Reference**

**Desktop Nav:**
```
Logo | Tours▼ | Destinations▼ | Why Choose Us | Travel Guide | Contact | [BOOK A TOUR]
```

**Mobile Nav:**
```
Logo | [BOOK] | [☰]
```

**Footer Nav:**
```
Col 1: Brand
Col 2: Company (About, Team, How It Works, Safety, Reviews)
Col 3: Support (FAQs, Contact, Custom Tour, Travel Agents, Booking Policy)
Col 4: Legal (Terms, Privacy, Cancellation, Cookies)
Col 5: Contact (Address, Phone, Email, Office Hours)
```

### **8.3 URL Structure Quick Reference**

```
/
/tours/
/tours/[tour-slug]/
/destinations/
/destinations/[destination-slug]/
/why-choose-us/
/travel-guide/
/travel-guide/[article-slug]/
/about/
/reviews/
/contact/
/custom-tour/
/terms/
/privacy/
/cancellation-policy/
/cookies/
```

### **8.4 Component Naming Quick Reference**

**Preserved Components:**
- `TourCard.tsx` (formerly `ExperienceCard.tsx`)
- `WhyChooseUsPreview.tsx` (formerly `KeyBenefits.tsx`)
- `TestimonialsCarousel.tsx` (formerly `ReviewsCarousel.tsx`)
- `FAQAccordion.tsx` (formerly `FAQSection.tsx`)
- `TourBookingModal.tsx` (formerly `BookingWidget.tsx`)
- `ContactModal.tsx` (no change)

**Deprecated Components:**
- `BecomeHost.tsx`
- `ApplyModal.tsx`
- `AskHostModal.tsx`
- `JebenaDeepDive.tsx` (repurpose)
- `OnlineClasses.tsx`
- `VettedHostsRow.tsx` (replace)

***

## **9. DOCUMENT APPROVAL**

**Prepared by:** UX/UI Engineering Team  
**Reviewed by:** Product Management, Frontend Development, QA Team  
**Approved by:** Project Stakeholders  
**Effective Date:** August 28, 2026  
**Next Review Date:** February 28, 2027 (6 months)

**Change Log:**

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | August 28, 2026 | UX/UI Engineering | Initial production-ready version |

***

**END OF DOCUMENT**
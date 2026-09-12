# UX/UI Revamp Master Engineering Playbook
## Addis Ababa by Locals — Powered by Sphere Tour & Travel

**Document status:** Replacement source of truth  
**Target branch:** `act`  
**Release scope:** Tour-first destination-discovery platform  
**Audience:** Product, UX/UI, frontend, backend/forms, QA, SEO, content, and operations teams

---

## 1. Vision and paradigm shift

### 1.1 Product definition

Transform the existing Addis Ababa City Tours website from a tour-centric marketing experience into **Addis Ababa by Locals**, a premium destination-discovery platform powered by Sphere Tour & Travel.

The release-one experience helps a visitor discover what to do, plan a stay, understand practical travel needs, and contact a local team. Tours remain the primary commercial product. Hotels, local guides, car hire, and airport transfers are enquiry-led services until inventory, pricing, availability, partner workflows, and transactional integrations are operational.

### 1.2 Brand hierarchy

```text
Consumer platform: Addis Ababa by Locals
Operating authority: Powered by Sphere Tour & Travel
```

Use the endorsement in the footer, About page, contact and booking flows, confirmation pages, legal pages, customer communications, and transaction-related content. Do not describe the platform as a separate legal entity unless approved as such.

### 1.3 Release-one truth model

| Service | Product role | User outcome | Do not claim before supported |
|---|---|---|---|
| City Tours | Primary | Browse, view tour details, check availability or submit booking request | Instant confirmation if unavailable technically |
| Day Trips | Primary | Browse, view tour details, check availability or submit booking request | Guaranteed availability |
| Private & Custom Tours | Primary | Send tailored itinerary request | Automated itinerary or instant final price |
| Hotels | Discovery/referral | Read area guidance and request recommendations | Live rates, instant hotel booking, lowest-rate guarantee |
| Local Guides | Enquiry-led | Send guide-match request | Certified/verified without documented evidence |
| Car Hire | Enquiry-led | Send car/private-driver quote request | Live vehicle inventory or instant confirmation |
| Airport Transfers | Enquiry-led | Send arrival/departure/layover request | Flight monitoring, fixed fare, 24-hour availability unless true |
| Reviews | Third-party social proof | Read live Google Reviews through approved widget | Unverified static totals or fabricated reviews |

### 1.4 Non-negotiable engineering constraints

- Preserve locked existing tour-card structures, internal hierarchy, visual grid, and responsive behavior.
- Preserve existing attraction, practical-information, and footer grids where locked; update content and navigation destinations without redesigning their structural layout.
- Create separate service-specific cards for Where to Stay, Guides, Car Hire, and Airport Transfers.
- Do not copy VisitLondon, Dribbble, or other external sites. Reference them only for high-level discovery and conversion patterns.
- Use real routes and standard links for primary navigation and SEO-critical content.
- Do not publish unsupported claims, fake availability, stale review totals, or invented tour facts.
- Keep About and Reviews out of the primary navigation; surface them contextually and in the footer.
- No analytics or marketing scripts may load without the appropriate consent state.
- Do not begin implementation of a sprint before its plan is approved.

---

## 2. Global navigation and routes

### 2.1 Desktop navigation

```text
[Addis Ababa by Locals logo]
Things to Do ▼ | Plan Your Visit ▼ | Getting Around ▼ | Travel Guide | Contact | [Explore Tours]
```

### 2.2 Primary navigation tree

| Item | Purpose | Child destinations / route targets |
|---|---|---|
| Things to Do | Main visitor discovery | City Tours, Day Trips, Private & Custom Tours, Must-Sees in Addis Ababa |
| Plan Your Visit | Stay planning | Where to Stay, First-Time Visitor Guide, Visa & Entry, Currency & Payments, Altitude & Health |
| Getting Around | Movement and support | Car Hire, Airport Transfers, Private Driver, Local Guides |
| Travel Guide | Editorial destination authority | Addis Ababa guides, culture, food/coffee, day trips, practical articles |
| Contact | Human support | General contact, custom tour request, travel-service enquiry |
| Explore Tours | Primary commercial CTA | `/tours/` |

### 2.3 Footer tree

```text
Company
- About Sphere Tour & Travel
- Welcome to Addis Ababa
- Safety & Responsibility
- Google Reviews

Explore
- City Tours
- Day Trips
- Private & Custom Tours
- Must-Sees in Addis Ababa

Plan Your Visit
- Where to Stay
- Car Hire & Transfers
- Local Guides
- Travel Guide

Support & Legal
- FAQs
- Contact
- Booking Policy
- Terms and Conditions
- Privacy Policy
- Cookie Preferences
- Cancellation Policy
```

### 2.4 Required route architecture

```text
/
/tours/
/tours/[tour-slug]/
/things-to-do/
/destinations/
/destinations/[destination-slug]/
/where-to-stay/
/guides/
/car-hire/
/airport-transfers/
/plan-your-visit/
/travel-guide/
/travel-guide/[article-slug]/
/contact/
/about/
/reviews/
/privacy/
/cookies/
/terms/
/cancellation-policy/
```

All public, SEO-important routes require:

- Direct-load support in the deployed environment.
- Functional browser back/forward behavior.
- Shareable, canonical URL.
- Standard crawlable `<a href>` links.
- Unique title, meta description, and H1.
- Accessible page landmarks.
- Server/static rendering strategy compatible with the actual application stack.

Do not use `href="#"`, JavaScript-only navigation, or modal-only pages for important destination, tour, policy, or service content.

### 2.5 Mobile navigation

- Use an accessible slide-in or full-screen mobile menu.
- Use accordion expansion for Things to Do, Plan Your Visit, and Getting Around.
- Use a separate chevron button for expansion; parent text remains a real route link.
- Keep hierarchy to two levels maximum.
- Preserve a visible `Explore Tours` action in the header and/or bottom of the open menu.
- Ensure focus is trapped inside an open menu, restored to its trigger on close, and the menu can close with Escape.
- Use a minimum practical touch target of 44 × 44 CSS px.

---

## 3. Homepage engineering blueprint

### 3.1 Required homepage sequence

```text
1. Utility bar
2. Global header
3. Stable split hero with intent-routing widget
4. Must-Sees in Addis Ababa
5. Welcome to Addis Ababa + support/trust cards
6. Choose Your Adventure: existing locked tour-category cards
7. Our Most Popular Tours: existing locked tour-card grid
8. Plan Your Visit, Your Way: new service-specific cards
9. First Time in Addis Ababa? Start Here: practical information cards
10. Google Reviews widget
11. Plan Your Visit Bridge: functional final conversion section
12. Global footer
```

### 3.2 Homepage section requirements

| Order | Section | Component action | Required outcome |
|---|---|---|---|
| 1 | Utility bar | Preserve/refine | Verified contact details and restrained utility actions |
| 2 | Header | Rebuild navigation only as needed | New destination-discovery navigation and primary tour CTA |
| 3 | Hero | Replace carousel identity layer | Stable value proposition and truthful intent router |
| 4 | Must-Sees | Reposition existing attraction grid | Early destination discovery and attraction-page routing |
| 5 | Welcome | Reframe Why Travelers Choose Us | Editorial city introduction plus restrained support cards |
| 6 | Tour categories | Preserve locked card layout | City Tours, Day Trips, Private & Custom routes |
| 7 | Popular tours | Preserve locked tour cards | Tour discovery with verified attributes only |
| 8 | Service discovery | New component | Hotels, Guides, Car Hire, Airport Transfers enquiry paths |
| 9 | Practical info | Preserve locked card layout | Planning guides and current, reviewed information |
| 10 | Reviews | Keep approved Elfsight/Google concept | Live third-party social proof, consent-gated if required |
| 11 | Planning bridge | New functional component | Qualified visitor-planning request |
| 12 | Footer | Preserve grid; update content | Complete navigation, legal and brand endorsement |

### 3.3 Must-Sees section

**Section heading:** `Must-Sees in Addis Ababa`  
**Supporting copy:** `Start with the places that reveal Addis Ababa’s history, daily life, faith, art, and mountain views.`

Preserve the existing attraction-card design. Initial cards should route to verified editorial/destination pages:

```text
National Museum of Ethiopia
Merkato
Holy Trinity Cathedral
Entoto
```

Each attraction page must have verified facts, source-controlled content, descriptive imagery, and related tour links. Do not put factual claims in card overlays unless verified.

### 3.4 Welcome to Addis Ababa section

Replace the overarching heading “Why Travelers Choose Us.” Preserve locked card structures but change the section’s purpose from promotional proof to local orientation.

**Eyebrow:** `WELCOME TO ADDIS ABABA`  
**Heading:** `A city of history, conversation, coffee, and constant discovery`  
**Editorial text:** `Addis Ababa is best explored with context. One street can lead from a national museum to a busy market, a historic cathedral, a contemporary gallery, or a quiet coffee stop. Addis Ababa by Locals brings these experiences together, helping you decide what to see, how to get there, and which local services fit your visit.`

Required card messages:

| Card function | Heading | Purpose | CTA |
|---|---|---|---|
| Local context | Local Perspective | Local knowledge and context | Meet Our Guides |
| Direct planning | Plan Directly | Direct access to Sphere team | Explore Tours |
| Parent-brand trust | Sphere Tour & Travel | Explain operating relationship | About Sphere |
| Assistance | Help Along the Way | WhatsApp/email support | Contact Us |
| Reviews | Guest Feedback | Route to live Google Reviews | Read Reviews |

Do not show the unapproved static phrases `500+ five-star reviews` or `Travelers’ Choice 2026`.

---

## 4. Stable split hero and intent router

### 4.1 Hero objective

The hero must answer three questions immediately:

1. What is Addis Ababa by Locals?
2. What can a visitor do here?
3. What should the visitor do next?

It must replace the rotating carousel as the primary brand and conversion layer. The message, CTA, and form must remain stable while the page loads and while the user interacts.

### 4.2 Desktop and responsive composition

```text
Desktop: approximately 45% content / 55% visual
Tablet: stacked or proportional split after readability testing
Mobile: content and intent widget first; visual simplified, reduced, or second
```

```text
Left panel
- Platform eyebrow
- H1
- Supporting proposition
- Intent-router widget
- Primary/secondary actions
- Support cue

Right panel
- One locally relevant rights-cleared visual
- Brand-orange geometric/organic anchor
- Optional subtle Addis/Ethiopia-inspired dotted pattern
- Maximum four minimal service badges
- Optional local-support pill
```

### 4.3 Approved hero copy

**Eyebrow:** `ADDIS ABABA BY LOCALS`  
**H1:** `Discover Addis Ababa, Your Way`  
**Supporting text:** `Explore city tours, day trips, local guides, car hire, accommodation recommendations, and practical travel advice—brought together by Sphere Tour & Travel.`  
**Primary CTA:** `Explore Tours`  
**Secondary CTA:** `Plan My Visit`  
**Support cue:** `Need help planning? Contact the local Sphere Tour & Travel team.`

### 4.4 Intent-router tabs

```text
Tours | Things to Do | Hotels | Guides | Car Hire
```

| Tab | Inputs | Action | Outcome |
|---|---|---|---|
| Tours | Tour type, preferred date, guest count | Search Tours | `/tours/` with valid filters/query parameters or booking-start state |
| Things to Do | Interest, available time | Explore Addis | `/things-to-do/` with valid discovery filter/query parameters |
| Hotels | Preferred area, stay dates, guest count | Explore Stays | `/where-to-stay/`, preserving values for an enquiry where appropriate |
| Guides | Date, preferred language, interests | Find a Guide | `/guides/` with prefilled enquiry state |
| Car Hire | Pickup date, pickup area, passengers | Request a Quote | `/car-hire/` with prefilled enquiry state |

### 4.5 Form behavior and accessibility

- Use explicit visible `<label>` elements for all fields.
- Do not use placeholders as labels.
- Use native date input where suitable, or a fully accessible datepicker.
- Validate required fields inline and in a summary when necessary.
- Move focus to the first invalid field after submission.
- Use accessible tab semantics and arrow-key behavior if implementing tablist roles.
- Preserve entered values when switching tabs where logically appropriate.
- Do not add query-string parameters containing personal information.
- Every tab must lead to a genuine page, filtered listing, or secure enquiry flow.

### 4.6 Visual and performance constraints

- One hero image/cutout maximum for release one.
- Use WebP/AVIF with fallback where supported by the project.
- Define width/height or aspect ratio to prevent layout shifts.
- Preload only the actual LCP hero image.
- Do not autoplay video in the hero.
- Do not use images as a substitute for copy or form controls.
- Decorative pattern layers use empty alt text or CSS backgrounds.
- Reduce/hide nonessential floating badges on mobile.
- Validate text contrast independently of photography; text should live on a stable solid/validated surface.

---

## 5. Component registry

### 5.1 Locked existing components

These components may receive content, token, semantic, state-management, and link-target changes only. Their core inner layout, card hierarchy, grid layout, and responsive behavior are locked unless the user explicitly approves an exception.

| Component/category | Required action |
|---|---|
| Tour category cards | Preserve; map to City Tours, Day Trips, Private & Custom |
| Tour cards | Preserve; update to verified tour data and real routes |
| Attraction cards | Preserve; map to Must-Sees and detail pages |
| Practical information cards | Preserve; revise content/link targets and add review-date governance |
| Existing Google Reviews section | Preserve concept; use approved live Elfsight widget subject to consent review |
| Footer grid | Preserve structure; replace old culinary/host links with approved taxonomy |

### 5.2 New components

| Component | Function |
|---|---|
| `BrandLockup` | Addis Ababa by Locals logo plus Sphere endorsement variants |
| `HeroIntentRouter` | Stable hero tabs, field configuration, validation, and routing |
| `ServiceDiscoveryCard` | Separate visual card system for Hotels, Guides, Car Hire, Airport Transfers |
| `ServiceDisclosure` | Point-of-action service availability and pricing disclosure |
| `PlanYourVisitBridge` | Final homepage planning form and confirmation state |
| `ServiceRequestForm` | Shared secure enquiry form shell for partner services |
| `CookieConsent` | Consent banner, preference center, state manager |

### 5.3 Service-discovery section

**Heading:** `Plan Your Visit, Your Way`  
**Supporting copy:** `Build the practical side of your Addis Ababa stay with local recommendations and direct support.`

| Service | Card title | CTA | Route |
|---|---|---|---|
| Accommodation | Where to Stay | Explore Where to Stay | `/where-to-stay/` |
| Guides | Find a Local Guide | Request a Guide | `/guides/` |
| Car hire | Car Hire & Private Driver | Request a Quote | `/car-hire/` |
| Airport support | Airport Transfers | Plan Your Arrival | `/airport-transfers/` |

Service cards may be new and distinct from tour cards. They must include the relevant disclosure before or at the request action.

---

## 6. Functional final conversion: Plan Your Visit Bridge

### 6.1 Replace static CTA

Replace the static “Ready to Explore Addis Ababa?” block with a functional planning bridge for visitors who need help choosing tours or require a partner service.

**Eyebrow:** `MAKE THE MOST OF YOUR STAY`  
**Heading:** `Not Sure Where to Begin? Plan Your Addis Ababa Visit`  
**Supporting text:** `Tell us how long you are staying, what you would like to explore, and how you prefer to travel. We will help you find the right next step.`

### 6.2 Required fields

| Field | Control | Required values/logic |
|---|---|---|
| Length of stay | Select | Less than 1 day; 1–2 days; 3–4 days; 5+ days; Not decided |
| Main interests | Multi-select | History and culture; Food and coffee; Markets and local life; Nature and day trips; Photography; Family travel; Business or layover |
| I need help with | Multi-select | Tours; Private guide; Car hire; Airport transfer; Where to stay; A custom plan |
| Preferred contact | Select | WhatsApp or Email |
| WhatsApp or email | Conditional field | Validate according to selected contact method |
| Optional message | Textarea | Optional free-text request |

### 6.3 Submission requirements

1. Perform accessible client-side validation.
2. Submit only to an approved secure backend, CRM, email handler, or webhook.
3. Do not place personal data in URLs, local analytics events, client logs, GTM, GA4, or ad pixels.
4. Use configured anti-spam protection.
5. Send operational notification to the approved Sphere workflow.
6. Provide success, error, and retry paths.

**Success heading:** `Thanks—Your Addis Ababa Plan Is Underway`  
**Success body:** `We have received your request. A member of the Sphere Tour & Travel team will review your preferences and contact you using your selected method.`

**Next links:**

```text
Browse City Tours
Explore Day Trips
Read the Addis Ababa Travel Guide
```

### 6.4 Pre-launch dependencies

- Approved form endpoint and data processor.
- Designated request recipient/workflow owner.
- Spam-control method.
- Data retention and deletion policy.
- Contact-response process and any published response-time commitment.
- Failure escalation path.
- Privacy-policy update.

---

## 7. Partner-service page standards

### 7.1 Where to Stay: `/where-to-stay/`

Purpose: editorial area orientation and accommodation-recommendation enquiry—not inventory.

Required sections:

```text
H1: Where to Stay in Addis Ababa
Neighbourhood orientation
Area cards: Bole, Kazanchis, Piassa, Meskel Square, and approved areas
Stay-type guidance: short stay, business, families, longer visits
How recommendations work
Accommodation enquiry form
FAQs
```

Do not show hotel rates, rankings, availability, “best hotel” language, affiliate claims, or booking buttons until supported by real data and partner agreements.

### 7.2 Local Guides: `/guides/`

Required fields:

```text
Full name
Email
WhatsApp or phone
Preferred date
Number of guests
Preferred language
Interests
Mobility/access requirements
Message
```

Required disclosure:

> Guide availability, language capability, and final pricing are confirmed after our team reviews your request.

### 7.3 Car Hire: `/car-hire/`

Required fields:

```text
Full name
Email
WhatsApp or phone
Pickup date
Pickup location
Destination or itinerary
Number of passengers
Luggage quantity
Vehicle preference
One-way, round trip, or multi-day
Message
```

Required disclosure:

> Vehicle availability, driver details, and final pricing are confirmed after we review your request.

### 7.4 Airport Transfers: `/airport-transfers/`

Required fields:

```text
Arrival or departure
Flight number
Date and time
Passenger count
Luggage count
Hotel or destination
WhatsApp or phone
Special requirements
```

Required disclosure:

> Pickup details, vehicle availability, and final pricing are confirmed after we review your request.

---

## 8. Design system

### 8.1 Approved color tokens

```css
:root {
  --brand-primary-orange: #C75122;
  --brand-primary-orange-hover: #A84318;
  --brand-trust-blue: #1E5A8A;
  --brand-trust-blue-hover: #16456B;
  --brand-nature-green: #3D7A22;
  --brand-nature-green-hover: #2F5F1A;
  --brand-ground-brown: #8B5E3C;

  --bg-light-primary: #FFFFFF;
  --bg-light-secondary: #F8F9FA;
  --bg-dark-footer: #1B2430;

  --text-heading: #111827;
  --text-body: #4B5563;
  --text-inverse: #FFFFFF;
  --border-divider: #E5E7EB;
  --border-focus: #1E5A8A;
}
```

### 8.2 Token use rules

| Token | Use | Restriction |
|---|---|---|
| Primary orange | Main booking/primary CTA, selected primary control | One dominant primary action per component; do not use as dense general background |
| Orange hover | Hover/pressed orange action | Not default state |
| Trust blue | Links, secondary actions, trust/interface state, focus | Validate contrast if placed on colored backgrounds |
| Nature green | Confirmed success and nature labels | Never use alone to communicate state; do not imply eco credentials/savings without evidence |
| Ground brown | Heritage/editorial accents | Use sparingly; do not replace CTA hierarchy with brown buttons |
| Light primary/secondary | Canvas and section alternation | Maintain text contrast |
| Dark footer | Footer/high contrast closure | Use accessible inverse text |
| Focus blue | Keyboard focus indicator | Never remove focus without accessible replacement |

### 8.3 Accessibility baseline

```css
:focus-visible {
  outline: 2px solid var(--border-focus);
  outline-offset: 2px;
}
```

- Minimum contrast target: WCAG 2.1 AA, 4.5:1 for normal text and 3:1 for large text.
- Do not rely on color alone for availability, error, success, or category meaning.
- Preserve visible focus styles.
- Use accessible semantic controls, headings, landmarks, form labels, error messages, and live regions.
- Add a skip-to-main-content link.

---

## 9. Logo and asset standardization

Source assets: DXF, PDF, and PNG are available. Use DXF or vector-quality PDF as source of truth. PNG is reference/fallback only.

### Required workflow

1. Identify the cleanest vector source.
2. Convert or redraw into optimized SVG without changing approved geometry.
3. Remove hidden layers, excessive points, editor metadata, and embedded raster fragments.
4. Preserve the editable source separately from production assets.
5. Produce controlled variants:

```text
Dark wordmark for light backgrounds
Light wordmark for dark/image backgrounds
Circle mark only
Compact mobile lockup
```

6. Add correct `viewBox`, explicit dimensions/aspect ratio, and accessible title/label treatment.
7. Test at 24 px, 32 px, 40 px, 140 px, 180 px, and 240 px.
8. Test contrast in header, hero, and footer conditions.
9. Implement through a reusable `BrandLockup` or `SphereLogo` component.

---

## 10. Privacy, consent, and tracking

### 10.1 Consent categories

| Category | Default | Purpose | Examples |
|---|---|---|---|
| Essential | Always active | Site operation, security, form submission, consent storage | Session/security controls, form processing, preference storage |
| Analytics | Off until opt-in | Aggregate usability/performance measurement | Google Tag Manager and Google Analytics 4 |
| Marketing | Off until opt-in | Advertising measurement and remarketing | Google Ads, Meta Pixel, future tags |

### 10.2 Consent interface

**Heading:** `Your privacy choices`  
**Body:** `We use essential cookies to run this website. With your permission, we also use analytics cookies to understand how visitors use the site and marketing cookies to measure advertising performance. You can change your choice at any time.`

Buttons:

```text
Accept all
Reject non-essential
Manage preferences
```

Preferences:

```text
Essential cookies — Always active
Analytics cookies — Help us improve the site
Marketing cookies — Help us measure advertising performance
Save preferences
```

### 10.3 Implementation rules

- Do not load Analytics or Marketing scripts until consent permits them.
- Give Accept All and Reject Non-Essential equal visual prominence.
- Do not pre-select optional categories.
- Store consent choice, timestamp, and consent-policy version.
- Include persistent footer action: `Cookie Preferences`.
- Audit the Elfsight Google Reviews widget for cookies/local storage/third-party requests and consent-gate it as appropriate.
- Update privacy policy before any contact-data collection or optional tracking rollout.
- Never send personal information to GTM, GA4, ad pixels, or URL parameters.

### 10.4 Future consented GA4 events

```text
view_tour_list
select_tour
view_tour
begin_booking
submit_booking_request
submit_custom_tour_request
view_must_see
view_service
submit_hotel_enquiry
submit_guide_request
submit_car_hire_quote_request
submit_plan_visit_request
click_whatsapp
click_phone
click_email
open_cookie_preferences
accept_analytics
accept_marketing
```

Only categorical, non-identifying properties may be sent. Never track email, phone, WhatsApp, names, free-text, hotel names, passport data, or payment data.

---

## 11. SEO, performance, and QA

### 11.1 SEO requirements

- Route-based pages for tours, destinations, guides, services, and editorial content.
- Unique metadata and canonical URL per indexable page.
- Valid internal links between Must-Sees, guide articles, tours, and service pages.
- Structured data only for verified content. Use `TouristTrip`, `LocalBusiness`, and `FAQPage` only after data fields and eligibility are confirmed.
- Do not deploy unsupported `AggregateRating` markup.
- Maintain an XML sitemap and monitor redirect/404 behavior after routing changes.

### 11.2 Performance requirements

- Responsive image generation and lazy loading below the fold.
- Explicit image dimensions/aspect ratios.
- Minimal hero assets; no autoplay video in initial release.
- Consent-gated or deferred third-party scripts.
- Test layout shift, hero LCP, interaction responsiveness, and mobile network behavior.
- Do not introduce heavy map/widget packages without budget review.

### 11.3 QA acceptance checks

- Every main navigation and footer link resolves to a valid route.
- Hero tabs produce valid, truthful outcomes.
- Locked tour components have no structural regression.
- Service requests do not falsely claim instant booking or live availability.
- Form validation, keyboard use, focus management, and success/error states work.
- Consent gates optional scripts correctly.
- Google Review widget behavior follows privacy decision.
- Unapproved static review/award claims are absent.
- Mobile, tablet, and desktop layouts are tested.
- No personal data appears in analytics, URLs, browser console logs, or client events.

---

## 12. Sprint governance

Before any implementation sprint:

1. Read this document, `WEBSITE-COPYWRITING-MASTER-GUIDE.md`, and `ADDIS-ABABA-BY-LOCALS-PRODUCTION-ENHANCEMENT-SPEC.md`.
2. Inspect actual repository state on `act`.
3. Report architecture findings, dependencies, risks, and conflicts.
4. Ask the user before proceeding if routing, component locks, forms, claims, consent, external integrations, assets, deployment behavior, or data ownership are uncertain.
5. Produce an actionable plan and wait for explicit approval before code changes.

Required plan format:

```markdown
## Sprint objective
## Repository findings
## Scope included
## Scope explicitly excluded
## Dependencies and assumptions
## Risks and blockers
## Clarifying questions
## Proposed implementation steps
## Files/components likely affected
## Acceptance criteria
## Test plan
## Rollback or safe-release plan
```

### Definition of done

A sprint is complete only if it meets approved acceptance criteria, preserves locked structures, introduces no unsupported claim, works across target breakpoints, meets accessibility requirements, protects personal data, and has no unresolved critical blocker.

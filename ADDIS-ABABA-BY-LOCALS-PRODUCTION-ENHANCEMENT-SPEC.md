# Addis Ababa by Locals — Production Enhancement Specification

**Status:** Planning baseline for AI-assisted implementation  
**Target branch:** `act`  
**Scope:** First-release evolution of the existing Addis Ababa City Tours website into a tour-first destination-discovery platform.  
**Operating brand:** Sphere Tour & Travel  
**Consumer-facing destination platform:** Addis Ababa by Locals

---

## 1. Purpose and non-negotiables

This specification directs the controlled evolution of the existing platform. It is not permission to replace the application, fabricate inventory, copy a reference site, or alter locked tour-card structures.

### Product goal

Create a premium, locally grounded visitor platform that helps people discover and plan a stay in Addis Ababa. Tours remain the primary commercial product. Hotels, local guides, car hire, and airport support are introduced as transparent discovery and enquiry-led services until real inventory, pricing, availability, and fulfilment integrations exist.

### Positioning

> **Addis Ababa by Locals helps visitors discover, plan, and make the most of a stay in Addis Ababa—from city tours and day trips to practical guidance and trusted local travel support.**

### Brand relationship

Use the following hierarchy consistently:

```text
Addis Ababa by Locals
Powered by Sphere Tour & Travel
```

The endorsement must appear where trust and legal clarity matter: footer, About page, contact/booking forms, confirmation states, legal pages, invoices, and customer communications. Do not represent Addis Ababa by Locals as a separate legal entity unless that is true and approved.

### Non-negotiable constraints

- Preserve the existing locked tour-card structures, internal hierarchy, and responsive grid behavior.
- New Hotels, Guides, Car Hire, and Airport Transfer services must use purpose-built service-card components; do not force them into tour-card components.
- Do not publish fabricated, stale, or unverified claims.
- Do not imply live inventory, instant confirmation, guaranteed availability, or online booking for partner services before those capabilities exist.
- Do not use a carousel as the primary identity/message layer of the new hero.
- Do not copy VisitLondon or Dribbble designs, text, branded elements, layouts, or assets. Use them only as high-level references for destination discovery and hero intent.
- Preserve existing functionality unless an approved sprint explicitly replaces it.
- Implement before optional analytics: consent controls, privacy disclosures, and secure form handling.
- Do not begin build work until the relevant sprint plan has been reviewed and approved by the user.

---

## 2. First-release product model

### Launch capability matrix

| Area | Release-one role | Correct user promise | Prohibited promise until integrated |
|---|---|---|---|
| City Tours | Primary product | Browse tours and check availability or submit a booking request | Guaranteed instant confirmation if no live system exists |
| Day Trips | Primary product | Browse tours and check availability or submit a booking request | Guaranteed availability |
| Private & Custom Tours | Primary product | Request a tailored itinerary | Instant price or automated itinerary unless implemented |
| Where to Stay | Editorial + partner referral | Explore areas and request recommendations | Live rates, instant hotel booking, lowest-rate guarantee |
| Local Guides | Enquiry-led matching | Request a guide by interests, language, and date | “Certified” or “verified” unless each guide is documented and approved |
| Car Hire | Enquiry-led partner service | Request a car-hire/private-driver quote | Live vehicle availability or instant confirmation |
| Airport Transfers | Enquiry-led partner service | Request arrival, departure, or layover support | Flight monitoring, fixed fare, 24/7 availability unless operationally true |
| Reviews | Live third-party proof | Read Google Reviews through the configured widget | Static review totals not derived from the live/approved source |

### Required service disclosures

Use these disclosures at point of action, not buried in fine print.

**Hotels**

> Accommodation options and availability are confirmed after you send your request.

**Local guides**

> Guide availability, language capability, and final pricing are confirmed after our team reviews your request.

**Car hire**

> Vehicle availability, driver details, and final pricing are confirmed after we review your request.

**Airport transfers**

> Pickup details, vehicle availability, and final pricing are confirmed after we review your request.

---

## 3. Information architecture and navigation

### Approved desktop navigation

```text
[Addis Ababa by Locals logo]

Things to Do ▼ | Plan Your Visit ▼ | Getting Around ▼ | Travel Guide | Contact | [Explore Tours]
```

### Navigation map

| Primary navigation | Purpose | Release-one destinations |
|---|---|---|
| Things to Do | Visitor discovery and primary experiences | City Tours, Day Trips, Private & Custom Tours, Must-Sees in Addis Ababa |
| Plan Your Visit | Practical arrival/stay planning | Where to Stay, First-Time Visitor Guide, Visa & Entry, Currency & Payments, Altitude & Health |
| Getting Around | Transport and local-support services | Car Hire, Airport Transfers, Private Driver, Local Guides |
| Travel Guide | Editorial and search authority | Addis guides, cultural guides, food/coffee context, day trips, practical articles |
| Contact | High-intent human support | General contact, custom tours, partner-service requests |
| Explore Tours | Primary commercial CTA | `/tours/` |

### Required routes

The implementation must use real, shareable route URLs. Exact framework mechanism must be verified before implementation.

```text
/
/tours/
/things-to-do/
/destinations/
/where-to-stay/
/guides/
/car-hire/
/airport-transfers/
/plan-your-visit/
/travel-guide/
/contact/
/about/
/reviews/
/why-choose-us/ or equivalent page only if retained intentionally
/privacy/
/cookies/
/terms/
/cancellation-policy/
```

Tour and article detail routes remain route-based, for example:

```text
/tours/[tour-slug]/
/destinations/[destination-slug]/
/travel-guide/[article-slug]/
```

### Footer allocation

Keep About and Reviews out of the main global navigation. Include them in contextual page sections and the global footer.

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

---

## 4. Homepage enhancement blueprint

### Required homepage flow

```text
1. Utility bar
2. Global header
3. Stable split hero and intent-routing widget
4. Must-Sees in Addis Ababa
5. Welcome to Addis Ababa + restrained trust/support cards
6. Choose Your Adventure (existing locked tour-category cards)
7. Our Most Popular Tours (existing locked tour-card grid)
8. Plan Your Visit, Your Way (new service-card system)
9. First Time in Addis Ababa? Start Here (existing practical-info cards, content revised)
10. Google Reviews widget
11. Plan Your Visit Bridge (functional final CTA)
12. Global footer
```

### Why this flow exists

| Sequence | Visitor need addressed | Intended action |
|---|---|---|
| Hero | Understand what the platform is and begin exploration | Select an intent or explore tours |
| Must-Sees | Understand why Addis Ababa is worth exploring | Enter attraction/discovery content |
| Welcome | Gain local context and confidence | Read/support pathways |
| Tour categories | Identify relevant experience type | Browse category |
| Tour grid | Select a concrete bookable/requestable product | View tour/check availability |
| Service cards | Address practical stay needs | Enquiry-led service request |
| Practical info | Reduce travel-planning uncertainty | Read guide content |
| Reviews | Establish social proof | Read live review source |
| Planning bridge | Capture users not yet ready to select a product | Submit qualified planning request |

---

## 5. Hero specification

### Required hero model

Replace the rotating hero as the primary identity layer with a stable, responsive asymmetrical split hero. The page may use secondary imagery elsewhere, but the central identity, value proposition, and intent widget must not change automatically.

```text
Desktop composition: approximately 45% content / 55% visual
Tablet: stacked visual and content based on tested reading order
Mobile: content first; visual second or reduced; no cluttering floating elements
```

### Hero copy

**Eyebrow**

> ADDIS ABABA BY LOCALS

**H1**

> Discover Addis Ababa, Your Way

**Supporting copy**

> Explore city tours, day trips, local guides, car hire, accommodation recommendations, and practical travel advice—brought together by Sphere Tour & Travel.

**Primary CTA**

> Explore Tours

**Secondary CTA**

> Plan My Visit

**Support cue**

> Need help planning? Contact the local Sphere Tour & Travel team.

### Hero intent widget

The widget is an intent router. It must not falsely present enquiry-led services as real-time booking systems.

```text
Tours | Things to Do | Hotels | Guides | Car Hire
```

| Tab | Inputs | Primary action | Valid outcome |
|---|---|---|---|
| Tours | Tour type, date, guests | Search Tours | `/tours/` with filters/query parameters or a booking-start route |
| Things to Do | Interest, available time | Explore Addis | `/things-to-do/` with filters/query parameters |
| Hotels | Preferred area, stay dates, guests | Explore Stays | `/where-to-stay/` with saved/prefilled enquiry state |
| Guides | Date, language, interest | Find a Guide | `/guides/` with prefilled enquiry state |
| Car Hire | Pickup date, pickup area, passengers | Request a Quote | `/car-hire/` with prefilled enquiry state |

### Hero visual direction

Use the approved visual concept, adapted to brand assets and actual operational scope:

- Soft cream/off-white background.
- One primary brand-orange geometric or organic anchor shape.
- Subtle dotted Addis/Ethiopia-inspired pattern only when it does not interfere with legibility.
- One rights-cleared, authentic, locally relevant hero photograph or cutout image.
- At most four floating service badges: City Tours, Day Trips, Local Guides, Car Hire.
- One optional support pill: “Plan with a local team.”
- Decorative layers must not make the hero unusable or harm page performance.

### Hero accessibility and performance requirements

- Keep H1, body copy, widget labels, and CTAs as HTML text, never baked into images.
- Use semantic form labels; placeholders do not replace labels.
- Ensure keyboard navigation follows visual order.
- Announce validation errors accessibly and focus the first invalid field on submit.
- Ensure any tab control has correct keyboard behavior and ARIA semantics.
- Use responsive image sizes and explicit dimensions to avoid layout shift.
- Preload only the image serving as the LCP element.
- Do not autoplay video in release one.
- Hide nonessential decorative artwork on mobile if it reduces clarity or performance.
- Validate color contrast in all states.

---

## 6. Must-Sees and Welcome section

### Must-Sees in Addis Ababa

Move the attraction grid into the first principal discovery section immediately below the hero.

**Heading**

> Must-Sees in Addis Ababa

**Supporting copy**

> Start with the places that reveal Addis Ababa’s history, daily life, faith, art, and mountain views.

Preserve the established attraction-card layout. Each card must link to a real attraction or destination page. Do not publish attraction facts until they have been verified by the content owner.

Recommended initial cards:

```text
National Museum of Ethiopia
Merkato
Holy Trinity Cathedral
Entoto
```

### Welcome to Addis Ababa

Replace “Why Travelers Choose Us” as the section’s primary heading. Keep the locked card arrangement but change the editorial purpose.

**Eyebrow**

> WELCOME TO ADDIS ABABA

**Heading**

> A city of history, conversation, coffee, and constant discovery

**Editorial introduction**

> Addis Ababa is best explored with context. One street can lead from a national museum to a busy market, a historic cathedral, a contemporary gallery, or a quiet coffee stop. Addis Ababa by Locals brings these experiences together, helping you decide what to see, how to get there, and which local services fit your visit.

### Trust/support card copy

| Card purpose | Heading | Body copy | CTA |
|---|---|---|---|
| Local context | Local Perspective | Explore Addis Ababa with people who understand its neighbourhoods, history, and everyday rhythms. | Meet Our Guides |
| Direct contact | Plan Directly | Speak with the local Sphere Tour & Travel team when you are ready to explore or need help deciding. | Explore Tours |
| Operating authority | Sphere Tour & Travel | Addis Ababa by Locals is powered by Sphere Tour & Travel, a local team focused on meaningful Ethiopian travel experiences. | About Sphere |
| Support | Help Along the Way | Contact us by WhatsApp or email before your visit and while you are in Addis Ababa. | Contact Us |
| Reviews | Guest Feedback | Read recent feedback from travellers through our Google Reviews. | Read Reviews |

Remove unapproved static claims such as “500+ five-star reviews” and “Travelers’ Choice 2026.” Use the live Google Reviews/Elfsight source for dynamic rating/count display only after verifying it is configured correctly.

---

## 7. Component strategy

### Locked components: preserve

The following component categories must retain their existing internal layout, structural hierarchy, and responsive grid behavior. Content, semantic markup, data bindings, accessible labels, and token-based styling may be updated only where that does not change the locked design structure.

| Component category | Required action |
|---|---|
| Existing tour category cards | Preserve structure; update approved content and links |
| Existing tour-product cards | Preserve structure; use verified data only |
| Existing attraction cards | Preserve structure; update content and route destinations |
| Existing practical-information cards | Preserve structure; revise copy and link targets |
| Existing Google Reviews/Elfsight section | Preserve integration concept; ensure consent classification and remove duplicate unsupported review claims |
| Existing footer grid | Preserve core layout; update link taxonomy and legal/brand information |

### New components: permitted and required

| New component | Purpose |
|---|---|
| `HeroIntentRouter` | Stable split hero service tabs and intent routing |
| `ServiceDiscoveryCard` | New non-tour card for Hotels, Guides, Car Hire, Airport Transfers |
| `PlanYourVisitBridge` | Functional multi-intent planning lead form |
| `ServiceRequestForm` | Reusable secure form shell for partner-service requests |
| `ServiceDisclosure` | Clear availability/pricing confirmation message by service type |
| `CookieConsent` | Accessible consent banner and preference center |
| `BrandLockup` / `SphereLogo` | Reusable SVG brand and endorsement system |

### Service card content

**Section heading**

> Plan Your Visit, Your Way

**Supporting copy**

> Build the practical side of your Addis Ababa stay with local recommendations and direct support.

| Service | Heading | Copy | CTA | Route |
|---|---|---|---|---|
| Accommodation | Where to Stay | Explore neighbourhood-based accommodation recommendations for business stays, short visits, and longer city breaks. | Explore Where to Stay | `/where-to-stay/` |
| Guides | Find a Local Guide | Tell us your interests, language needs, and available time. We will help match your enquiry with the right local guide. | Request a Guide | `/guides/` |
| Car hire | Car Hire & Private Driver | Request transport for airport pickup, city travel, day trips, or a private driver itinerary. | Request a Quote | `/car-hire/` |
| Airport support | Airport Transfers | Arrange a transfer or discuss an airport layover tour before you arrive. | Plan Your Arrival | `/airport-transfers/` |

---

## 8. Functional final CTA: Plan Your Visit Bridge

### Purpose

Replace a static “Ready to Explore Addis Ababa?” banner with a structured, high-intent planning request. This conversion path serves people who are not ready to choose a specific tour and people who require support for partner-led services.

### Component identity

```text
PlanYourVisitBridge
```

**Eyebrow**

> MAKE THE MOST OF YOUR STAY

**Heading**

> Not Sure Where to Begin? Plan Your Addis Ababa Visit

**Supporting copy**

> Tell us how long you are staying, what you would like to explore, and how you prefer to travel. We will help you find the right next step.

### Required form fields

| Field | Control | Values/validation |
|---|---|---|
| Length of stay | Select | Less than 1 day; 1–2 days; 3–4 days; 5+ days; Not decided. Required |
| Main interests | Multi-select | History and culture; Food and coffee; Markets and local life; Nature and day trips; Photography; Family travel; Business or layover. Required |
| I need help with | Multi-select | Tours; Private guide; Car hire; Airport transfer; Where to stay; A custom plan. Required |
| Preferred contact | Select | WhatsApp; Email. Required |
| WhatsApp or email | Conditional input | Validate according to selected contact method. Required |
| Optional message | Textarea | “Tell us anything that will help us plan.” Optional |

### Submission behavior

1. Validate locally and accessibly.
2. Submit only to an approved secure backend, CRM, email handler, or webhook.
3. Never transmit personal form fields to GA4, GTM, ad pixels, logs, or public URLs.
4. Show a confirmation state after successful submission.
5. Trigger an operational notification to the designated Sphere Tour & Travel workflow.
6. Route to or render an accessible confirmation with useful next steps.

### Confirmation copy

**Heading**

> Thanks—Your Addis Ababa Plan Is Underway

**Body**

> We have received your request. A member of the Sphere Tour & Travel team will review your preferences and contact you using your selected method.

**Next actions**

```text
Browse City Tours
Explore Day Trips
Read the Addis Ababa Travel Guide
```

### Required operational decisions before launch

- Approved destination for form submissions.
- Responsible team/person for requests.
- Response-time commitment, if any, and whether it can be met.
- Spam prevention approach.
- Data-retention policy.
- Confirmation email/WhatsApp process.
- Error escalation path if the endpoint fails.

---

## 9. Service page requirements

### Where to Stay: `/where-to-stay/`

Purpose: neighbourhood-led orientation and accommodation recommendation requests, not hotel inventory.

```text
H1: Where to Stay in Addis Ababa
Intro: Explain neighbourhood-led stay planning.
Area cards: Bole, Kazanchis, Piassa, Meskel Square, and other approved areas.
Stay-type cards: Short stay, business travel, families, longer stays.
How we help: Explain recommendation/referral process.
Accommodation enquiry form.
FAQs.
```

Do not present rankings, rates, availability, “best hotels,” affiliate claims, or booking buttons before these are operationally supported and verified.

### Guides: `/guides/`

Purpose: request-based guide matching.

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

> Guide availability, language capability, and final pricing are confirmed after we review your request.

### Car Hire: `/car-hire/`

Purpose: qualified vehicle/private-driver enquiries.

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

> Vehicle type, availability, driver details, and final price are confirmed after your request is reviewed.

### Airport Transfers: `/airport-transfers/`

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

Do not claim flight monitoring, fixed prices, meet-and-greet, or 24-hour service without operational evidence.

---

## 10. Design system and color tokens

### Approved core tokens

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

### Functional token rules

| Token | Required purpose | Prohibited or restricted use |
|---|---|---|
| `--brand-primary-orange` | Primary booking/action buttons, active primary state | Do not use as dense page background or combine with multiple other brand colors inside one component |
| `--brand-primary-orange-hover` | Hover/pressed state for orange actions | Do not use as the default CTA color |
| `--brand-trust-blue` | Links, secondary buttons, verified trust/interface signals, focus rings | Do not pair with orange text directly on blue background without contrast validation |
| `--brand-nature-green` | Confirmed success status, nature-related tags | Do not imply eco certification or a saving unless verified; do not rely on green alone for status |
| `--brand-ground-brown` | Cultural/editorial labels, restrained heritage accents | Do not turn all buttons and CTAs brown |
| `--bg-light-primary` | Main canvas | N/A |
| `--bg-light-secondary` | Alternating sections and soft card contexts | Do not reduce text contrast below WCAG requirements |
| `--bg-dark-footer` | Footer/high-contrast closure | Ensure text/icon contrast is validated |
| `--text-heading` | Headings and high-emphasis text | N/A |
| `--text-body` | Body copy | Avoid use on dark footer backgrounds without validation |
| `--border-focus` | Visible keyboard focus | Never remove focus outlines without a compliant replacement |

### Interaction requirements

```css
:focus-visible {
  outline: 2px solid var(--border-focus);
  outline-offset: 2px;
}
```

- Maintain WCAG AA text contrast: 4.5:1 for normal text and 3:1 for large text.
- Do not communicate state only by color; pair with labels, icons, or text.
- Preserve current component grids; token integration must be visual and semantic, not structural.
- Use orange for the most important action on a screen. Avoid multiple competing primary CTAs.

---

## 11. Logo standardization

### Source assets

Available sources include DXF, PDF, and PNG. Use DXF or vector-quality PDF as the source of truth. PNG is a reference or fallback, not the preferred production header mark.

### Required workflow

1. Identify the cleanest vector source (DXF or vector PDF).
2. Convert/redraw into optimized SVG using an approved vector workflow.
3. Remove unnecessary points, hidden layers, raster fragments, nonessential metadata, and editor-specific artifacts.
4. Preserve an editable source file separate from production SVG output.
5. Produce four controlled variants:

```text
Dark wordmark for light backgrounds
Light wordmark for dark/image backgrounds
Circle/brand mark only
Compact mobile lockup
```

6. Add correct `viewBox`, title/label handling, and fixed aspect-ratio behavior.
7. Test at 24 px, 32 px, 40 px, 140 px, 180 px, and 240 px display widths.
8. Test contrast on hero imagery, light backgrounds, and the dark footer.
9. Implement a reusable component such as:

```tsx
<BrandLockup variant="light" size="md" showEndorsement />
```

10. Do not alter final logo geometry without brand-owner approval.

---

## 12. Cookie consent, privacy, and analytics

### Consent categories

| Category | Default state | Purpose | Examples |
|---|---|---|---|
| Essential | Always active | Core site, security, form submission, consent recording | Security/session controls, CSRF protection, preference storage, contact/booking submission |
| Analytics | Off until opt-in | Aggregate performance and UX measurement | Google Tag Manager, Google Analytics 4 |
| Marketing | Off until opt-in | Ad measurement, remarketing, conversion audiences | Google Ads tags, Meta Pixel, future marketing tags |

### Banner copy

**Heading**

> Your privacy choices

**Body**

> We use essential cookies to run this website. With your permission, we also use analytics cookies to understand how visitors use the site and marketing cookies to measure advertising performance. You can change your choice at any time.

**Actions**

```text
Accept all
Reject non-essential
Manage preferences
```

### Preference center labels

```text
Essential cookies — Always active
Analytics cookies — Help us improve the site
Marketing cookies — Help us measure advertising performance
Save preferences
```

### Technical requirements

- No Analytics or Marketing tag may load before relevant consent exists.
- “Accept all” and “Reject non-essential” must have equal visual prominence.
- No optional category may be preselected.
- Store user choice, timestamp, and policy/version identifier.
- Include a persistent footer control: `Cookie Preferences`.
- Determine whether the Elfsight Google Reviews widget sets cookies, uses local storage, or loads third-party resources. Categorize and gate it accordingly.
- Ensure the privacy policy describes form collection, email/WhatsApp contact handling, consent choices, third-party widget use, and future analytics/marketing processing.
- Do not record personally identifiable information in GTM, GA4, ad pixels, URL query strings, analytics events, or client logs.

### Future GA4 event taxonomy

Only activate after Analytics consent is implemented and approved.

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

Permitted event attributes are categorical/non-identifying only. Never send form text, names, emails, phone numbers, WhatsApp numbers, hotel names, passport information, payment data, or other personal data.

---

## 13. Content, claims, and review governance

### Claims requiring evidence before publication

The following may appear only after the business owner supplies current evidence and the implementation maps them to an approved source of truth:

```text
Licensed/licensing details
Insurance/insured claim
Direct-booking savings claim
Payment-method acceptance
Operating hours and response times
Cancellation/refund terms
Prices, inclusions, group size, availability
Guide qualifications/certification
Hotel/car/transfer partner claims
Safety statements
```

### Claims currently excluded from static copy

```text
“500+ five-star reviews”
“Travelers’ Choice 2026”
```

### Review handling

- Google Reviews is the approved social-proof source.
- Retain the existing Elfsight widget concept where technically and privacy compliant.
- Do not hardcode its rating total or review count unless sourced live and validated.
- Do not alter, curate deceptively, or fabricate review content.
- Keep a dedicated `/reviews/` route and footer/contextual links rather than adding Reviews to the main navigation.

---

## 14. SEO, accessibility, and performance baseline

### SEO requirements

- Implement real routes and standard `<a href>` navigation for important pages.
- Support direct loading of every route and browser back/forward behavior.
- Use unique page titles, meta descriptions, canonical URLs, and structured headings.
- Add structured data only where content is accurate and complete; do not use aggregate-rating schema for unsupported data.
- Use `TouristTrip`, `LocalBusiness`, and `FAQPage` schema only after validating fields and eligibility.
- Make tour, attraction, and service pages internally linked from relevant discovery sections.
- Do not place core SEO content only inside client-side modals or inaccessible JavaScript states.

### Accessibility requirements

- Target WCAG 2.1 AA as a baseline.
- Use semantic landmarks: header, nav, main, section, footer.
- Provide a skip-to-content link.
- Use descriptive alt text for meaningful imagery and empty alt text for decorative imagery.
- Ensure form errors are text-based, linked to inputs, and announced accessibly.
- Use real button and link semantics.
- Keep visible focus states.
- Ensure touch targets are at least 44 × 44 CSS px where practical.
- Avoid auto-rotating carousels as primary content; if retained elsewhere, provide pause controls.

### Performance requirements

- Optimize image formats and responsive sizing.
- Avoid unnecessary hero animation and heavy third-party scripts.
- Delay nonessential scripts until consent and/or interaction.
- Prevent Cumulative Layout Shift with reserved media dimensions.
- Establish performance budgets before adding maps, widgets, video, or tracking packages.

---

## 15. Sprint planning protocol

### Mandatory planning gate

For every sprint, the AI coding assistant must:

1. Read this specification and the two existing master documents:

```text
UX-UI-REVAMP-MASTER-ENGINEERING-PLAYBOOK.md
WEBSITE-COPYWRITING-MASTER-GUIDE.md
```

2. Inspect the actual repository and the `act` branch before proposing implementation details.
3. Compare the requested sprint against:
   - Existing architecture and dependencies.
   - Locked component constraints.
   - Current routing and data model.
   - Existing styles and design tokens.
   - Current form handling and privacy requirements.
   - Verified versus unverified business claims.
4. Identify blockers, risks, compatibility issues, required decisions, and dependencies.
5. Stop and ask the user targeted questions if any critical issue is uncertain or conflicts with this specification.
6. Produce a concise but detailed sprint plan in plan mode only.
7. Wait for explicit user approval before writing, modifying, deleting, installing, migrating, or executing code.

### Blockers that require user clarification

Stop and ask before proceeding if any of the following are unknown or conflicting:

- Framework, router, rendering, or deployment behavior cannot support the required routes.
- A sprint would alter a locked tour-card structure or responsive grid.
- The actual repository differs materially from this specification.
- A claim, price, review figure, policy, certification, or payment capability lacks evidence.
- A service page would imply live inventory/booking without an operational integration.
- The form endpoint, CRM/webhook, recipient, data retention, or spam protection is unknown.
- Elfsight/GTM/GA4 or another third-party script cannot be categorized or consent-gated correctly.
- A logo/vector asset cannot be converted without changing protected brand geometry.
- A design request breaks contrast, keyboard access, mobile usability, or the approved token rules.
- New dependency installation, data migration, external service configuration, or deployment settings are required but not approved.

### Required sprint-plan format

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

No build step may start until the user explicitly approves the plan.

---

## 16. Recommended implementation order

### Sprint 0 — Repository and evidence audit

- Inspect `act` branch architecture, package manager, framework, routing, content/data sources, forms, styles, and component constraints.
- Inventory current URLs, app states, external scripts, claims, assets, and real form endpoints.
- Create a verified-claims register.
- Identify router/SEO feasibility and migration path.

### Sprint 1 — Brand foundation and token integration

- Create the Addis Ababa by Locals brand configuration and Sphere endorsement pattern.
- Standardize the approved color tokens without changing locked component layouts.
- Define logo conversion workflow and component interface.
- Remove unapproved review/award statements from static UI.

### Sprint 2 — Navigation, routing, and architecture

- Implement or configure real routes compatible with the deployed application.
- Establish the approved navigation and footer taxonomy.
- Preserve legacy access paths using safe redirects or transitional handling where required.

### Sprint 3 — Hero and discovery homepage refactor

- Replace the primary carousel identity layer with the stable split hero.
- Add HeroIntentRouter with valid route/enquiry outcomes.
- Move Must-Sees below the hero.
- Reframe Why Travelers Choose Us into Welcome to Addis Ababa while preserving locked cards.

### Sprint 4 — Tour and service discovery

- Preserve and validate current tour-category and tour-card blocks.
- Add new service-specific discovery cards.
- Create first-release routes/pages for Where to Stay, Guides, Car Hire, and Airport Transfers.
- Add clear partner-service disclosures.

### Sprint 5 — Planning bridge and secure forms

- Build PlanYourVisitBridge.
- Create reusable service-enquiry forms.
- Connect only to approved secure endpoints.
- Implement validation, success/failure states, spam controls, and privacy content.

### Sprint 6 — Cookie consent and privacy readiness

- Implement accessible banner and preferences center.
- Gate GTM/GA4 and marketing scripts by consent.
- Audit Elfsight behavior and apply the correct consent category.
- Add Cookie Preferences and update legal/privacy content.

### Sprint 7 — SEO, accessibility, performance, and release QA

- Add metadata, canonical URLs, sitemaps, structured data where verified, and internal linking.
- Audit keyboard navigation, forms, contrast, semantic structure, and screen-reader flow.
- Optimize images, third-party loading, and Core Web Vitals.
- Execute regression tests and release plan.

---

## 17. Definition of done

A sprint is complete only when:

- It meets the user-approved sprint plan and acceptance criteria.
- Locked components remain structurally unchanged unless an explicit exception was approved.
- Every interaction has a truthful user outcome.
- No unsupported claim is introduced.
- Responsive behavior is tested on target breakpoints.
- Keyboard navigation, visible focus, form validation, and contrast have been tested.
- Optional tracking is blocked until consent.
- No personal data is passed to analytics or exposed in URLs/logs.
- Routes, links, and browser navigation work as intended.
- Changed content, styles, and assets have been reviewed against this specification.
- No unresolved critical blocker remains.

---

## 18. Final operating principle

Build a credible local destination platform in stages:

```text
Discover first.
Book tours clearly.
Request partner services honestly.
Plan with local support.
Expand to live inventory only when operations and integrations are ready.
```

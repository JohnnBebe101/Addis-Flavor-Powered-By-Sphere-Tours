# Footer Restructuring — Detailed Actionable Plan

**Goal**: Restructure footer into 5 columns (Brand, Company, Support & Legal, Contact, Payment), move card icons to top row with real brand colors, remove 6 lesser-important links, condense Contact column.

**Files**: `src/content/navigation.json` (lines 211-337), `src/components/home/Footer.tsx` (108 lines)

**Risk**: Footer.tsx line 97 has `.find((c) => c.title === 'Legal')` — will break when Legal column is renamed. Must update.

---

## Part 1: navigation.json — Data Cleanup

### Step 1.1: Replace entire `footer.columns` array (lines 212-332)

Replace the current 5-column array with the new 4-column array (Column 5 is hardcoded in Footer.tsx):

```json
"columns": [
  {
    "title": "Brand",
    "links": [
      { "label": "Logo + Tagline", "link": "/" },
      { "label": "Instagram", "link": "https://instagram.com/addisababacitytour", "external": true },
      { "label": "Facebook", "link": "https://facebook.com/addisababacitytour", "external": true },
      { "label": "TripAdvisor", "link": "https://tripadvisor.com/Attraction_Review-g1-addis-ababa", "external": true }
    ]
  },
  {
    "title": "Company",
    "links": [
      { "label": "About Us", "link": "/about/" },
      { "label": "Safety & Responsibility", "link": "/why-choose-us/#safety" }
    ]
  },
  {
    "title": "Support & Legal",
    "links": [
      { "label": "FAQs", "link": "/why-choose-us/#faqs" },
      { "label": "Contact Us", "link": "/contact/" },
      { "label": "Travel Agents", "link": "/travel-agents/" },
      { "label": "Terms & Conditions", "link": "/terms/" },
      { "label": "Privacy Policy", "link": "/privacy/" },
      { "label": "Cancellation Policy", "link": "/cancellation-policy/" }
    ]
  },
  {
    "title": "Contact",
    "links": [
      { "label": "Sphere Head Office, National Tower", "link": "/contact/" },
      { "label": "+251-911-XXX-XXX", "link": "tel:+251911XXXXXX" },
      { "label": "info@addisababacitytour.com", "link": "mailto:info@addisababacitytour.com" },
      { "label": "Office Hours: 9:00 AM – 6:00 PM", "link": "/contact/" }
    ]
  }
]
```

### What changed in navigation.json

| Action | Column | Link | Reason |
|--------|--------|------|--------|
| KEEP | Brand | All 4 items | Unchanged |
| REMOVE | Company | "Our Team" | Redundant anchor on /about/ |
| REMOVE | Company | "How It Works" | Lesser important (user) |
| REMOVE | Company | "Reviews" | Lesser important (user) |
| KEEP | Company | "About Us" | Essential |
| KEEP | Company | "Safety & Responsibility" | Trust signal |
| REMOVE | Support | "Custom Tour Inquiry" | Lesser important (user) |
| REMOVE | Support | "Booking Policy" | Merged into Legal |
| REMOVE | Legal | "Cookie Policy" | Low traffic |
| KEEP | Support | "FAQs" | Essential |
| KEEP | Support | "Contact Us" | Essential |
| KEEP | Support | "Travel Agents" | Niche but kept per user |
| KEEP | Legal | "Terms & Conditions" | Required |
| KEEP | Legal | "Privacy Policy" | Required |
| KEEP | Legal | "Cancellation Policy" | Required |
| MERGE | Contact | "Sphere Head Office" + "National Tower" | Condensed to 1 item |

**Net result**: 23 items → 17 items (6 removed, 2 merged into 1). Columns: 5 → 4 in JSON (Column 5 = Payment, hardcoded in TSX).

---

## Part 2: Footer.tsx — Component Restructure

### Step 2.1: Update the grid to render 4 JSON columns + 1 hardcoded Payment column

**Current (lines 24-51)**: Maps over `footerColumns` (5 items from JSON).

**New**: Render 4 JSON columns via map, then append the Payment column as a 5th static column.

Replace lines 23-52 with:

```tsx
{/* Main columns */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-x-4 md:gap-y-1 lg:gap-6 pb-6 md:pb-1.5 border-b border-linen-white/10">
  {footerColumns.map((col: { title: string; links: NavFooterLink[] }, colIdx: number) => (
    <div key={colIdx} className="space-y-2.5 md:space-y-0.5 lg:space-y-2.5">
      <h4 className="font-mono text-[10px] uppercase tracking-wider text-gold font-bold">
        {col.title}
      </h4>
      <ul className="space-y-1.5 md:space-y-0.5 lg:space-y-1.5 text-xs text-linen-white/70 font-sans">
        {col.links.map((link: NavFooterLink, linkIdx: number) => (
          <li key={linkIdx}>
            {link.external ? (
              <a href={link.link} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
                {link.label}
              </a>
            ) : (
              <a href={link.link} className="hover:text-gold transition-colors">
                {link.label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  ))}

  {/* Column 5: Payment Methods — brand-colored card icons */}
  <div className="space-y-2.5 md:space-y-0.5 lg:space-y-2.5">
    <h4 className="font-mono text-[10px] uppercase tracking-wider text-gold font-bold">
      Payment Methods
    </h4>
    <div className="flex flex-wrap items-center gap-2">
      {/* Visa — #1A1F71 */}
      <div className="bg-white rounded px-1.5 py-1 flex items-center justify-center">
        <svg viewBox="0 0 48 32" className="h-5 w-auto" fill="#1A1F71"><path d="M20.4 21.2h-3.1l1.9-11.6h3.1l-1.9 11.6zm10.1-11.3c-.6-.2-1.6-.5-2.8-.5-3.1 0-5.3 1.6-5.3 3.9 0 1.7 1.6 2.6 2.7 3.2 1.2.5 1.6.9 1.6 1.4 0 .8-.9 1.2-1.8 1.2-1.2 0-1.9-.2-2.9-.6l-.4-.2-.4 2.6c.7.3 2 .6 3.3.6 3.3 0 5.4-1.6 5.4-4 0-1.3-.8-2.3-2.6-3.1-1.1-.5-1.8-.9-1.8-1.4 0-.5.5-1 1.7-1 1 0 1.7.2 2.2.4l.3.1.5-2.5zm7.5 0h-2.3c-.7 0-1.3.2-1.6.9l-4.5 10.7h3.2l.6-1.8h3.9l.4 1.8h2.8l-2.5-11.6zm-3.8 7.5c.3-.7 1.3-3.4 1.3-3.4l.7 3.4h-2zm-18.3-7.5l-3 7.5-.3-1.5c-.6-1.9-2.3-3.9-4.3-5l2.8 10.1h3.2l4.8-11.1h-3.2zm-5.6 7.5l1.9-5.3.5 2.6c.4 1.1 1.5 2.4 2.8 3.1l-.7 2.7c-1.4-.5-2.3-1.7-2.8-3.1h-2.7z"/></svg>
      </div>
      {/* Mastercard — #EB001B + #F79E1B */}
      <div className="bg-white rounded px-1.5 py-1 flex items-center justify-center">
        <svg viewBox="0 0 48 32" className="h-5 w-auto"><circle cx="17.5" cy="15" r="7.5" fill="#EB001B"/><circle cx="30.5" cy="15" r="7.5" fill="#F79E1B"/><path d="M24 9.5a7.5 7.5 0 0 1 0 11" fill="#FF5F00"/></svg>
      </div>
      {/* Amex — #006FCF */}
      <div className="bg-white rounded px-1.5 py-1 flex items-center justify-center">
        <svg viewBox="0 0 48 32" className="h-5 w-auto" fill="#006FCF"><path d="M6 8l-1 3v12l1 3h4l1-2 1 2h8l-1-3 1-2.5L20 26h8l-1-3h3l1-1.5 1 1.5h5l1-3v-1.5l-1-1.5h-3.5l-.5-1h4l1-1.5 1 1.5h3l1-3v-1.5l-1-1.5h-3.5L34.5 8h-4l.5 1.5h-4l-.5-1.5h-8l.5 1.5h-4L13 8H6zm6.5 7.5l1.5 4.5 1.5-4.5h-3zm15.5 0h-2v4.5l2-1.5V15.5zm6.5 0h-2v4.5l2-1.5V15.5z"/></svg>
      </div>
      {/* Discover — #FF6000 */}
      <div className="bg-white rounded px-1.5 py-1 flex items-center justify-center">
        <svg viewBox="0 0 48 32" className="h-5 w-auto" fill="#FF6000"><path d="M16 8c-4.4 0-8 3.6-8 8s3.6 8 8 8c6.6 0 12-3.6 12-8s-5.4-8-12-8zm0 13c-2.8 0-5-2.2-5-5s2.2-5 5-5c3.9 0 9 2.2 9 5s-5.1 5-9 5zm14-13h9v16h-9V8z"/></svg>
      </div>
      {/* JCB — #0B4EA2 */}
      <div className="bg-white rounded px-1.5 py-1 flex items-center justify-center">
        <svg viewBox="0 0 48 32" className="h-5 w-auto" fill="#0B4EA2"><path d="M8 6h8c3.3 0 6 2.7 6 6v8c0 3.3-2.7 6-6 6H8V6zm12 12c0-2.2-1.8-4-4-4H12v8h4c2.2 0 4-1.8 4-4zm10-12h8c3.3 0 6 2.7 6 6v8c0 3.3-2.7 6-6 6h-8V6zm12 12c0-2.2-1.8-4-4-4h-4v8h4c2.2 0 4-1.8 4-4z"/></svg>
      </div>
      {/* UnionPay — #E21836 */}
      <div className="bg-white rounded px-1.5 py-1 flex items-center justify-center">
        <svg viewBox="0 0 48 32" className="h-5 w-auto" fill="#E21836"><path d="M6 8h8c3.3 0 6 2.7 6 6v8c0 3.3-2.7 6-6 6H6V8zm12 12c0-2.2-1.8-4-4-4H10v8h4c2.2 0 4-1.8 4-4zm10-12h8c3.3 0 6 2.7 6 6v8c0 3.3-2.7 6-6 6h-8V6zm12 12c0-2.2-1.8-4-4-4h-4v8h4c2.2 0 4-1.8 4-4z"/></svg>
      </div>
    </div>
  </div>
</div>
```

**Key changes**:
- Grid stays `lg:grid-cols-5` (4 JSON columns + 1 Payment column)
- Each card icon wrapped in `bg-white rounded px-1.5 py-1` for white background pill
- Each SVG uses brand-specific `fill` color instead of `currentColor`
- Card icons are `h-5` (slightly larger than current `h-4` for better visibility)
- Payment column header: "Payment Methods" in gold mono text

### Step 2.2: Remove card icons from bottom row (lines 76-90)

**Delete lines 76-90** (the entire card icons block in the bottom row):

```tsx
          {/* Card brand icons — inline, zero extra height */}
          <div className="flex items-center gap-1.5 opacity-60">
            {/* Visa */}
            <svg ... >...</svg>
            {/* Mastercard */}
            <svg ... >...</svg>
            {/* Amex */}
            <svg ... >...</svg>
            {/* Discover */}
            <svg ... >...</svg>
            {/* JCB */}
            <svg ... >...</svg>
            {/* UnionPay */}
            <svg ... >...</svg>
          </div>
```

### Step 2.3: Fix bottom row legal links reference (line 97)

**Current (line 97)**:
```tsx
.find((c: { title: string; links: NavFooterLink[] }) => c.title === 'Legal')
```

**New**:
```tsx
.find((c: { title: string; links: NavFooterLink[] }) => c.title === 'Support & Legal')
```

**Reason**: Column renamed from "Legal" to "Support & Legal". The bottom row legal links (Terms, Privacy, Cancellation) are still in this column.

### Step 2.4: Update bottom row comment (line 72)

**Current**:
```tsx
{/* Copyrights, Card Icons, Johnny Technologies, and Terms */}
```

**New**:
```tsx
{/* Copyrights, Johnny Technologies, and Legal Links */}
```

---

## Summary of All Edits

| # | File | Line(s) | Action |
|---|------|---------|--------|
| 1 | navigation.json | 212-332 | Replace entire `columns` array with new 4-column structure |
| 2 | Footer.tsx | 23-52 | Add Payment column after JSON columns in grid |
| 3 | Footer.tsx | 72 | Update comment text |
| 4 | Footer.tsx | 76-90 | Delete card icons block from bottom row |
| 5 | Footer.tsx | 97 | `'Legal'` → `'Support & Legal'` |

---

## Verification Checklist

### Pre-Execution
- [ ] Confirm navigation.json has 4 columns after edit (Brand, Company, Support & Legal, Contact)
- [ ] Confirm Footer.tsx Payment column uses brand colors, not `currentColor`

### Post-Execution
- [ ] `npx tsc --noEmit` — 0 errors
- [ ] `npm run build` — clean
- [ ] Footer shows 5 columns: Brand, Company, Support & Legal, Contact, Payment Methods
- [ ] Payment column shows 6 card icons with real brand colors on white pill backgrounds
- [ ] Bottom row has NO card icons
- [ ] Bottom row legal links still render (Terms, Privacy, Cancellation)
- [ ] Popular Destinations section unchanged
- [ ] Footer vertical height same or shorter
- [ ] Total link count: 17 (down from 23)

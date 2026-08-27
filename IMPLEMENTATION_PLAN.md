# FINAL IMPLEMENTATION PLAN — READY FOR EXECUTION

## Addis Ababa City Tours: Production Hardening & Rebrand

---

### Locked Decisions

| Item | Decision |
|------|----------|
| Brand | "Addis Ababa City Tours" (replacing "Addis Flavor") |
| Parent Company | "Sphere Tour and Travel" (stays) |
| Domain | `addisababacitytours.com` |
| Email | `info@addisababacitytours.com` |
| Phone | `0911209882` (same) |
| Languages | English ONLY — drop Amharic and French |
| Existing packages | Keep as-is, replace later with new city tour content |
| OurStory narrative | Mark as placeholder for rewrite |
| Founder bios | Stay as-is |
| Dependencies to remove | `@google/genai`, `express`, `@types/express`, `dotenv`, `motion` |
| CI/CD | GitHub Actions → Netlify, shared hosting migration later |

---

## PHASE 0: Pre-Flight (1 day)

### Sprint 0.1 — Git Setup + Audit (1 day)

**Create branch**:
```
git checkout -b migration/production-hardening
```

**Create files**:
- `.github/ISSUE_TEMPLATE.md`
- `.github/PULL_REQUEST_TEMPLATE.md`
- `scripts/find-legacy-strings.txt` (audit output)

**Run grep for audit** across `src/` for these strings:
- `Addis Flavor` — 88 hits across 8 files
- `sphere-voyage-ethiopie.com` — 3 files
- `info@sphere-voyage-ethiopie.com` — 3 files
- `GEMINI_API_KEY` — 2 files
- `AI Studio` — 3 files

**Acceptance**: Branch exists, audit file committed, PR template ready.

---

## PHASE 1: Security, Dependencies & Language Simplification (5 days)

### Sprint 1.1 — Replace Motion with CSS (1 day)

**Files to modify**: `src/index.css`, `src/components/Navbar.tsx`, `src/components/ContactModal.tsx`

**Motion usage inventory** (must be replaced BEFORE removing dependency):

| File | Element | Animation | CSS Replacement |
|------|---------|-----------|-----------------|
| `Navbar.tsx:246-255` | `<motion.div>` | Mobile nav slide-in | `@keyframes slideInFromRight` |
| `Navbar.tsx:266-276` | `<motion.div>` | Mobile nav slide-out | Same keyframe reversed |
| `Navbar.tsx:330` | `<motion.div>` | Menu item fade | `animation: fadeIn 0.2s ease-in` |
| `Navbar.tsx:399-423` | `<motion.a>` | Link hover | Already has `transition-all` — use `<a>` |
| `Navbar.tsx:438-451` | `<motion.button>` | Button hover | Already has `transition-all` — use `<button>` |
| `ContactModal.tsx:171` | `<motion.div>` | Backdrop fade | `@keyframes fadeIn` |
| `ContactModal.tsx:300` | `<motion.div>` | Content slide-up | `@keyframes slideUp` |
| `ContactModal.tsx:330` | `<motion.div>` | Success state | Same as slideUp |

**Add to `src/index.css`**:
```css
@keyframes slideInFromRight {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}
@keyframes fadeOut {
  from { opacity: 1; }
  to { opacity: 0; }
}
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes slideUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
```

**BREAKING RISK B1**: Visual regression on mobile nav and modal. Test on mobile viewport after changes.

### Sprint 1.2 — Remove Dead Dependencies (0.5 day)

**File**: `package.json`

Remove from `dependencies`:
- `"@google/genai": "^2.4.0"` — never imported
- `"express": "^4.21.2"` — no server code
- `"dotenv": "^17.2.3"` — no server to use it
- `"motion": "^12.23.24"` — replaced with CSS

Remove from `devDependencies`:
- `"@types/express": "^4.17.21"` — no server code

Move from `dependencies` to `devDependencies`:
- `"vite": "^6.2.3"` — build tool, not runtime dependency

### Sprint 1.3 — Remove AI Studio Platform Coupling (0.5 day)

| File | Line(s) | Action |
|------|---------|--------|
| `README.md` | All | Rewrite: remove AI Studio banner, GEMINI instructions, AI Studio URL |
| `.env.example` | All | Delete file entirely |
| `vite.config.ts` | 15-19 | Remove `DISABLE_HMR` server config |
| `metadata.json` | All | Delete file (AI Studio artifact) |

### Sprint 1.4 — English-Only: Types & Data (0.5 day)

**File**: `src/types.ts`
- Change `Language` type to `'en'` only
- Remove 12 `*Am`/`*Fr` fields from `ExperiencePackage`
- Remove 6 `*Am`/`*Fr` fields from `HostReview`

**File**: `src/data.ts`
- Delete `am:` and `fr:` translation blocks (~96 lines)
- Remove all `*Am`/`*Fr` fields from `PACKAGES`, `REVIEWS`, `NEIGHBORHOOD_DESTINATIONS`

### Sprint 1.5 — English-Only: App.tsx & Navbar (1 day)

**File**: `src/App.tsx`
- Remove `currentLang` state and `setLang` prop
- Remove `getShortName()` ternary helper
- Remove `font-ethiopic` conditional
- Remove all ~75 language ternary expressions
- Simplify SEO useEffect (remove 6 if/else-if blocks)
- Remove `availableLanguage` from JSON-LD

**File**: `src/components/Navbar.tsx`
- Remove `toggleLanguage` function
- Remove `currentLang`/`setLang` from props interface
- Remove desktop language pill bar (~22 lines)
- Remove mobile Globe toggle (~12 lines)
- Remove mobile drawer language grid (~22 lines)
- Remove `Languages`, `Globe` icon imports
- Remove 6 inline ternaries

### Sprint 1.6 — English-Only: All Components (1 day)

| File | Delete | Remove Ternaries | Remove Props |
|------|--------|-------------------|--------------|
| `OurStory.tsx` | `am`/`fr` content blocks (~172 lines) | 14 | `currentLang` prop |
| `BecomeHost.tsx` | `am`/`fr` LOCAL_TRANSLATIONS (~135 lines) | 5 | `currentLang` prop |
| `BookingWidget.tsx` | — | 20 | `currentLang` prop |
| `ContactModal.tsx` | `am`/`fr` LOCAL_TRANSLATIONS (~48 lines) | 3 | `currentLang` prop |
| `JebenaDeepDive.tsx` | `*Am`/`*Fr` fields from roundsData (~24 lines) | 10 | `currentLang` prop |
| `ReviewsCarousel.tsx` | — | 5 | `currentLang` prop |

**Phase 1 Acceptance Criteria**:
- `npm run build` succeeds
- Zero references to `currentLang`, `amharic`, `francais` in source
- Zero references to `@google/genai`, `express`, `motion` in dependencies
- Zero references to `AI Studio`, `GEMINI_API_KEY` in source
- Navbar has no language switcher UI

---

## PHASE 2: Rebranding (2 days)

### Sprint 2.1 — Brand Config (0.5 day)

**New file**: `src/config/brand.ts`
```ts
export const BRAND = {
  name: "Addis Ababa City Tours",
  domain: "addisababacitytours.com",
  email: "info@addisababacitytours.com",
  phone: "+251911209882",
  parentCompany: "Sphere Tour and Travel",
};
```

### Sprint 2.2 — Domain & Contact Replacement (1 day)

| Search | Replace | Files | Count |
|--------|---------|-------|-------|
| `sphere-voyage-ethiopie.com` | `addisababacitytours.com` | `App.tsx`, `OurStory.tsx`, `ContactModal.tsx` | ~8 |
| `info@sphere-voyage-ethiopie.com` | `info@addisababacitytours.com` | 3 files | 4 |
| `Addis Flavor` | `Addis Ababa City Tours` | 8 files | ~40+ |

**CRITICAL**: JSON-LD `@id` values must all point to `addisababacitytours.com`.

### Sprint 2.3 — Content Placeholder Marking (0.5 day)

- Mark `OurStory.tsx` narrative sections with TODO comments for rewrite
- Mark `data.ts` packages with TODO for city tour replacement

---

## PHASE 3: TypeScript & Linting (2 days)

### Sprint 3.1 — TypeScript Strictness (1 day)

Add to `tsconfig.json`: `noImplicitAny`, `strictNullChecks`, `noUnusedLocals`, `noFallthroughCasesInSwitch`

### Sprint 3.2 — ESLint + Prettier (1 day)

Install and configure ESLint + Prettier. Add `lint` and `format` scripts.

---

## PHASE 4: CI/CD (2 days)

### Sprint 4.1 — GitHub Actions (1 day)

Create `.github/workflows/ci.yml` with build/lint jobs.

### Sprint 4.2 — Netlify Deploy (1 day)

Create `netlify.toml` with SPA redirect rule. Configure Netlify site.

---

## PHASE 5: Component Architecture (3 days)

### Sprint 5.1 — Content Extraction (1 day)

Move inline content to JSON files in `src/content/`.

### Sprint 5.2 — Split Monolithic Components (1.5 days)

Extract sub-components from OurStory, BecomeHost, BookingWidget, Navbar.

### Sprint 5.3 — Lazy Loading (0.5 day)

Add React.lazy() and Suspense for route-level code splitting.

---

## PHASE 6: Assets & SEO (2 days)

### Sprint 6.1 — Image Optimization (1 day)

Convert to WebP, add responsive srcset/sizes.

### Sprint 6.2 — SEO Meta (0.5 day)

Update meta tags, Open Graph, canonical URL for addisababacitytours.com.

### Sprint 6.3 — Bundle Analysis (0.5 day)

Add vite-plugin-visualizer, set bundle budget < 150KB gzipped.

---

## PHASE 7: Deployment (1 day)

### Sprint 7.1 — Docs & Deploy (1 day)

Rewrite README, create CHANGELOG, document deployment and rollback.

---

## Risk Matrix

| # | Risk | Phase | Severity | Mitigation |
|---|------|-------|----------|------------|
| B1 | `motion` removal breaks animations | 1 | HIGH | CSS replacement FIRST, then dependency removal |
| B2 | Prop interface cascade across 10 files | 1 | HIGH | TypeScript catches it — fix atomically |
| B3 | `OurStory.tsx` narrative needs rewrite | 2 | MEDIUM | Mark as placeholder, not blocking |
| B4 | TypeScript strict surfaces 50+ errors | 3 | MEDIUM | Enable incrementally, not full `strict` |
| B5 | Netlify SPA routing 404s | 4 | HIGH | Add redirect rule BEFORE first deploy |
| B6 | Lazy chunk load failure | 5 | LOW | Error boundaries |
| B7 | Contact form no backend | 7 | LOW | Netlify Forms |
| B8 | New tour content not provided yet | 2,5 | MEDIUM | Placeholder structure, content-agnostic |

---

## Timeline

| Phase | Days | Cumulative | Milestone |
|-------|------|------------|-----------|
| Phase 0 | 1 | Day 1 | Branch + audit |
| Phase 1 | 5 | Day 6 | Clean EN-only build |
| Phase 2 | 2 | Day 8 | Rebranded |
| Phase 3 | 2 | Day 10 | Type-safe + linted |
| Phase 4 | 2 | Day 12 | CI/CD live |
| Phase 5 | 3 | Day 15 | Modular components |
| Phase 6 | 2 | Day 17 | Optimized |
| Phase 7 | 1 | Day 18 | **Production-ready** |

**Total: 18 working days**

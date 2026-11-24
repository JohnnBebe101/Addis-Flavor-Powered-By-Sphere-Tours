# Production Readiness: Major Issues, Architectural Problems, and Sprinted Fix Plan

This document categorically identifies the major and critical build/architectural problems found in the repository and supplies an engineered, sprinted fixes strategy to get the project to production-ready. All recommendations are evidence-backed by files in the repository: README.md, package.json, vite.config.ts, tsconfig.json, .env.example, metadata.json, src/data.ts and the large components in src/components/.

---

## Executive summary

Short: the project is a modern Vite + React + TypeScript UI that contains substantial, shipping-ready UI code but also has platform-specific (AI Studio / Gemini) traces, dependency hygiene problems, large monolithic components, missing CI/tests and asset/SEO/security issues that prevent safe production deployment.

Main blockers (urgent):
- Secrets and platform-specific instructions (GEMINI_API_KEY, AI Studio links) in README/.env.example and embedded content (security & operational risk).
- Dependency and packaging issues: duplicate/misplaced deps (vite in both dependencies/devDependencies), server libs in the client (express, dotenv), and outdated packages (esbuild pinned older version).
- No CI/test automation in repository root (no .github/workflows), and no test harness.
- Monolithic components and inline content (src/components/*, src/data.ts) causing large bundles and making branding swaps risky.
- Asset handling and bundle weight: many images referenced inline; no analyzer baseline or image optimization.
- TypeScript config not strict; no linting rules; no enforcement in CI.

Accepting the plan will produce small, incremental PRs on a migration branch and lead to a production-ready build with CI, tests, controlled dependency upgrades, optimized bundles, and a safe release/rollout strategy.

---

## Concrete, categorical list of major/critical problems (with exact files to inspect)

1. Secrets & platform coupling (Critical)
   - Files: README.md, .env.example, src/App.tsx, metadata.json
   - Problem: GEMINI_API_KEY presence, AI Studio app URLs, and structured-data referencing sphere-voyage domain and contact details. Secrets and domain-specific PII must be removed or parameterized.

2. Dependency hygiene and bundling problems (Critical)
   - Files: package.json
   - Problem: `vite` is in both dependencies and devDependencies; `express` and `@types/express` are included but no server code exists; `@google/genai` shipped in client deps (risk for bundle size and secrets exposure). Esbuild pinned to old minor may be insecure.

3. No CI / tests / quality gates (Critical)
   - Files: repository root (.github/workflows not present)
   - Problem: No automated build/lint/test, so PRs have no safety net.

4. Large monolithic components (High)
   - Files: src/components/BecomeHost.tsx, OurStory.tsx, BookingWidget.tsx, Navbar.tsx, JebenaDeepDive.tsx, etc.
   - Problem: Presentational, data, and SEO logic all inside single files — hard to lazy-load and test.

5. Centralized inline content with brand strings (High)
   - Files: src/data.ts, src/App.tsx
   - Problem: Hardcoded brand names (Addis Flavor / Sphere) and structured data make repurposing error-prone.

6. Client-side GenAI dependency & misuse (High)
   - Files: package.json, README.md
   - Problem: @google/genai in the client can leak API keys and increases bundle size. It should be server-side or replaced with a safe proxy.

7. Asset management & image optimization gap (High)
   - Files: images referenced in src/components and src/App.tsx, assets/.aistudio
   - Problem: No responsive images, no webp/avif conversions, and images embedded in bundle increase payload.

8. Weak TypeScript and linting configuration (Medium)
   - Files: tsconfig.json (no strict flags), no ESLint configuration
   - Problem: Weak typing increases risk during large refactors; no code formatting rules.

9. No bundle analyzer or size budgets (Medium)
   - Files: none (tooling missing)
   - Problem: Hard to measure progress on bundle size.

10. Missing production-grade deployment & monitoring guidance (Medium)
    - Files: none
    - Problem: No instructions for building optimized assets, setting caching headers, or monitoring.

---

## High-level strategy (engineered & sprinted)

Strategy principles:
- Small PRs, each with a clear acceptance criteria and CI run.
- Triage: first secure secrets & CI, then fix dependency hygiene, then introduce tests and TypeScript strictness, after that focus on performance and content extraction.
- Maintain a migration branch: `migration/production-hardening`.

Sprint cadence: 1-week sprints (5 work days). Each sprint contains 3–6 tickets (PR-sized). Estimate assumes small engineering team (1–3 devs). Adjust durations to team size.

Sprint 0 — Preparation (1–2 days)
- Create branch `migration/production-hardening`.
- Add ISSUE_TEMPLATE.md and PR_TEMPLATE.md to help reviewers.
- Add codeowner if needed.
- Immediate quick grep & report: run searches for strings: `GEMINI_API_KEY`, `sphere-voyage`, `Addis Flavor`, `info@sphere-voyage-ethiopie.com`, `0911209882` and produce a find-and-list file for manual review (`scripts/find-legacy-strings.txt`).

Acceptance criteria: branch exists and the find list is committed.

Sprint 1 — Security & CI foundation (5 days)
Goals: remove secrets exposure, add CI, fix package.json hygiene.

Tasks:
1. Remove/parameterize secrets and AI-Studio instructions (2 days)
   - Files: README.md, .env.example, metadata.json, src/App.tsx
   - Changes: Replace GEMINI_API_KEY specifics with schema and note how to add key in secure store. Remove AI Studio link or move to docs/archive.md. Parameterize structured data fields (siteOrigin, telephone, email) via env and/or config.
   - Acceptance: No sensitive keys or instructions are present in tree; `.env.example` contains placeholders only.

2. Quick package.json fixes (1 day)
   - Files: package.json
   - Changes: Move `vite` to devDependencies, remove `express` from client dependencies (if not used); move `@types/express` to devDependencies only if an express server is added later. Audit `@google/genai` usage; if not used, remove; if used, plan to move to server API.
   - Acceptance: `npm ci` succeeds, `npm run build` produces `dist`.

3. Add minimal CI (2 days)
   - Files: .github/workflows/ci.yml
   - Actions: workflow with jobs: install (npm ci), lint (tsc --noEmit), build (npm run build), bundle-analyze (generate artifact) — run on PRs to migration branch.
   - Acceptance: PR to branch passes CI; build artifact attached.

Sprint 2 — Type safety, linting, and tests baseline (5 days)
Goals: provide safety net for refactors.

Tasks:
1. Add ESLint & Prettier, basic rules (1 day)
   - Files: .eslintrc.cjs, .prettierrc
   - Acceptance: `npm run lint` runs tsc + eslint and CI uses it.

2. Harden TypeScript incrementally (2 days)
   - Files: tsconfig.json
   - Changes: add noImplicitAny, strictNullChecks, sourceMap false for prod; keep `noEmit` for type-only checks. Use `tsconfig.build.json` if needed for different targets.
   - Acceptance: Type errors are manageable; CI ensures tsc --noEmit passes.

3. Add a smoke test and component-level unit tests (2 days)
   - Files: tests/ (Vitest or Jest with Testing Library)
   - Tests: app renders, basic navigation between views, BookingWidget open/close.
   - Acceptance: Tests run in CI and pass.

Sprint 3 — Content extraction & component refactor for lazy-loading (1 week)
Goals: reduce initial bundle and prepare for single-language migration.

Tasks:
1. Extract copy and structured data to `content/` (2 days)
   - Files: src/data.ts → content/en.json (and content/meta.json for structured data)
   - Acceptance: src/data.ts becomes a small loader; no hardcoded brand strings remain in component files.

2. Split and lazy-load large components (3 days)
   - Files: src/components/*
   - Changes: convert BecomeHost, OurStory, BookingWidget, JebenaDeepDive, ContactModal into dynamic imports with React.lazy or route-level code-splitting and Suspense fallback. Keep Navbar and header lightweight.
   - Acceptance: initial bundle size reduced (baseline comparison) and `npm run build` outputs new chunk files; app still functions.

3. Move client-side GenAI to server proxy (2 days)
   - If the app uses GenAI in the client, create a minimal serverless endpoint (e.g., /api/genai) and remove `@google/genai` from client bundle. Option: create `functions/` or `server/` or use serverless platform.
   - Files: new `api/genai.js` or serverless function + update client dynamic import to call the new endpoint.
   - Acceptance: client no longer includes @google/genai in bundle; tests for API mocked.

Sprint 4 — Asset optimization & performance tuning (1 week)
Goals: reduce payload and ensure fast TTI.

Tasks:
1. Add bundle analyzer & set budgets (1 day)
   - Files: vite.config.ts pipeline changes; add `vite-plugin-visualizer`.
   - Acceptance: Analyzer runs in CI and report is available as artifact.

2. Convert images to webp/avif and add responsive `picture`/`srcset` (2 days)
   - Files: assets/images/*, update component image usage in src/components and src/App.tsx
   - Acceptance: images served in modern formats with responsive sizes.

3. Tailwind purging and CSS optimization (1 day)
   - Files: tailwind.config.js (create/update)
   - Acceptance: final CSS size reduced; build validated.

4. Performance smoke tests (Lighthouse/CI) (1 day)
   - Add CI job to run Lighthouse on a deployed preview and fail if TTI or LCP exceeds budget.

Sprint 5 — Polishing, deployment, monitoring (1 week)
Goals: produce production deployment, monitoring, and rollback plan.

Tasks:
1. Deployment pipeline & hosting (2 days)
   - Options: Vercel/Netlify/Static site on S3 + CloudFront. Provide build & env guidance in README.
   - Files: docs/deploy.md
   - Acceptance: Staging deployment on chosen host.

2. Observability & error reporting (1 day)
   - Add Sentry or LogRocket (optional) with explicit opt-in and env-based init.
   - Acceptance: Errors captured in staging with no keys in repo.

3. Final docs, README, and runbook (2 days)
   - Document env vars in .env.example, migration notes, and rollback steps. Add CHANGELOG.

---

## PR & Review checklist (applies to all PRs during migration)
- Create PR against `migration/production-hardening` unless otherwise noted.
- PR body: short summary, files changed, risk level, how to test locally, what it affects.
- CI must pass: install, tsc --noEmit, eslint, build, unit tests.
- If the PR touches package.json, include `npm audit` output and an upgrade rationale.
- If removing or changing content (brand or contact), add a `content-replacement.csv` and confirm with product/owner.
- Provide a rollback plan in PR description if change affects production behavior (e.g., GenAI removal).

---

## Risk mitigation & rollback
- Keep `migration/production-hardening` branch deployable; do NOT directly merge big-breaking changes to main. Use feature flags for large behavior changes.
- For secret removal and API changes, keep a compatibility shim for 2 weeks and monitor errors.

---

## Example CI workflow (to be added at .github/workflows/ci.yml)

```yaml
name: CI
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Use Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run lint
      - run: npm run build
      - name: Upload bundle analyzer
        if: success()
        uses: actions/upload-artifact@v4
        with:
          name: bundle-report
          path: dist
```

---

## Quick developer commands

- Local dev: npm install && npm run dev
- Build: npm run build
- Type-check: npm run lint (tsc --noEmit)
- Run tests (after adding vitest/jest): npm run test

---

## Files to change ASAP (one-line actionable)
- README.md — remove AI Studio/GEMINI specifics.
- .env.example — placeholders only.
- package.json — correct deps/devDeps, remove express unless using server.
- vite.config.ts — remove AI Studio HMR comments or document them.
- src/data.ts — extract into content/en.json and content/meta.json.
- src/components/BecomeHost.tsx, OurStory.tsx, BookingWidget.tsx, JebenaDeepDive.tsx, ContactModal.tsx — split + lazy-load.
- Add .github/workflows/ci.yml and .eslintrc + .prettierrc.

---

## Acceptance criteria to call this "production-ready"
- No secrets or sensitive data in repository files.
- CI enforces type checks, lint, build, and tests on PRs.
- Bundle analysis shows initial JS < 250KB gzipped (target — adjust to client needs), and key metrics (LCP, TTI) within thresholds on staging.
- All brand strings replaced or centralized and a content file exists for the new client.
- Images optimized and CDN-ready.
- A documented deploy/run/runbook exists for new client engineers.

---

## Next steps I will perform if you want me to (pick one or more)
1. Open a `migration/production-hardening` branch and commit Sprint 0 (search list and PR/issue templates).
2. Create the CI workflow file and push to branch as Sprint 1 start.
3. Create the initial PR that removes GEMINI/API key references and cleans package.json duplicates.

Tell me which actions to take next and I will create the branch and commit the first change(s).

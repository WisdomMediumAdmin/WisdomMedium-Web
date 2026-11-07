# WisdomMedium website

The public company and support website for WisdomMedium. It is built with React, TypeScript, and Vite, and pre-renders each page as static HTML. There is no backend service.

## Pages

| URL | Purpose |
| --- | --- |
| `/` | Company homepage |
| `/apps/wm-pebbles/` | WM Pebbles product page |
| `/support/` | App support |
| `/contact/` | Public contact information |
| `/privacy/` | Website and app-specific privacy disclosures |
| `/terms/` | Website terms and My Stories conditions |
| `/apps/my-stories/` | My Stories iPhone product page |
| `/404.html` | Not-found page |

The public support address is `support@wisdommedium.com`.

## Development

Use Node.js 24 (see `.nvmrc`):

```sh
npm ci
npm run dev
```

Run the TypeScript, lint, test, and production-build checks with:

```sh
npm run check
```

The build output is in `dist/`. To serve that output locally with directory-index and 404 behavior:

```sh
npm run serve:static
```

Page content and layout are in `src/App.tsx`, site and app details in `src/site.ts`, page metadata and routes in `src/routes.ts`, and styles in `src/styles.css`. Static assets are in `public/`.

## Automated test plan

Verification under Node 24.22.2 on macOS passed all 144 tests. Browser code and
Node scripts each measured **100% lines and 100% branches** against independent
98% gates. See [measured results](TEST_VERIFICATION.md),
[the production-to-test map](TEST_COVERAGE_PLAN.md),
[remaining limitations](TEST_UNTESTED_INVENTORY.md), and
[persistent progress](TEST_PROGRESS.md).

```sh
npm run test:coverage:browser
npm run test:coverage:node
```

## Deployment

The GitHub Actions workflow in `.github/workflows/deploy.yml` runs on pull requests
to `main`, pushes to `main`, and manual dispatch. Separate `Coverage (browser)` and
`Coverage (node)` jobs each require at least 98% lines and branches under Node 24.
Both must pass before linting and building. Only approved `main` pushes and manual runs can upload
`dist/` and deploy to GitHub Pages after the legal publication gate; pull requests only validate the site.
Vite uses `base: '/'` for the root of `wisdommedium.com`.

## My Stories legal review

The My Stories implementation is an unpublished review draft. Start with
[owner decisions and exact publication steps](Docs/legal/MY_STORIES_OWNER_REVIEW.md),
[accepted release facts](Docs/legal/MY_STORIES_FACTUAL_AUDIT.md),
and [App Store privacy review](Docs/legal/MY_STORIES_APP_STORE_PRIVACY_REVIEW.md).
Legal content is separated in `src/legal/`; prior WM Pebbles and SoapyMoney text
is preserved in `src/App.tsx`. Stable app anchors are `/privacy/#my-stories`,
`/terms/#my-stories` and `/support/#my-stories`.

Pages publication now requires `node scripts/check-legal-publication.mjs` after
the build, and is limited to `main`. The approval record intentionally remains
pending. Local builds and PR checks remain available without legal approval.
See [current verification evidence](Docs/legal/VERIFICATION_20261107.md) for this draft's checks.

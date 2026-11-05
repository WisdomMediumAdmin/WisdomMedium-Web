# WisdomMedium website

The public company and support website for WisdomMedium. It is built with React, TypeScript, and Vite, and pre-renders each page as static HTML. There is no backend service.

## Pages

| URL | Purpose |
| --- | --- |
| `/` | Company homepage |
| `/apps/wm-pebbles/` | WM Pebbles product page |
| `/support/` | App support |
| `/contact/` | Public contact information |
| `/privacy/` | WM Pebbles privacy policy |
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
Both must pass before linting and building. Pushes and manual runs then upload
`dist/` and deploy to GitHub Pages; pull requests only validate the site.
Vite uses `base: '/'` for the root of `wisdommedium.com`.

# WisdomMedium website

The public app and support website for WisdomMedium. It is built with React, TypeScript, and Vite, and pre-renders each page as static HTML. There is no backend service.

## Pages

| URL | Purpose |
| --- | --- |
| `/` | Independent app brand homepage |
| `/apps/wm-pebbles/` | WM Pebbles product page |
| `/support/` | App support |
| `/contact/` | Public contact information |
| `/privacy/` | Shared app privacy policies and website/support privacy |
| `/terms/` | General and app-specific terms |
| `/apps/potatobeans/` | PotatoBeans product page |
| `/apps/my-stories/` | My Stories product page |
| `/apps/potatobeans/{privacy,terms,support}/` | Dedicated PotatoBeans pages |
| `/apps/my-stories/{privacy,terms,support}/` | Dedicated My Stories pages |
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

## Deployment

The GitHub Actions workflow in `.github/workflows/deploy.yml` checks and builds the site on pushes to `main`, then uploads `dist/` to GitHub Pages. Vite uses `base: '/'` for the root of `wisdommedium.com`.

## November 7, 2026 website audit

WisdomMedium is an independent brand operated by an individual, not a registered LLC or corporation. App-specific copy follows the app-project reports identified in [WEBSITE_AUDIT.md](WEBSITE_AUDIT.md). That audit records missing owner facts; public URLs alone do not establish full App Store readiness.

Shared legal destinations remain `/privacy/` and `/terms/` because both apps already link there. Dedicated app pages reuse the same policy components in `src/AppLegal.tsx`; app support and product copy are in `src/ReleaseApps.tsx`. No app source changes are needed for the existing shared URLs.

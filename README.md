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

## Deployment

The GitHub Actions workflow in `.github/workflows/deploy.yml` checks and builds the site on pushes to `main`, then uploads `dist/` to GitHub Pages. Vite uses `base: '/'` for the root of `wisdommedium.com`.

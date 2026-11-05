# Automated test coverage plan

The authoring target was **TARGETED — NOT VERIFIED**. The user subsequently
authorized verification under Node 24 on 2026-10-30. See
[TEST_VERIFICATION.md](TEST_VERIFICATION.md) for measured results and commands.
The original 98% line and 98% branch gates remain unchanged.

## Scope and independent gates

| Scope | Production denominator | Test selection | Later reports |
| --- | --- | --- | --- |
| Browser application | All `src/**/*.{ts,tsx}` except test files, including `main.tsx` | `src/**/*.test.{ts,tsx}` in jsdom | `coverage/browser/` |
| Node delivery scripts | All `scripts/**/*.{ts,tsx,mjs}` except test files | `scripts/**/*.test.{ts,tsx}` in Node | `coverage/node/` |

The browser and Node configurations independently require 98% lines and branches.
The default configuration also has separate `src/**` and `scripts/**` thresholds,
so one scope cannot compensate for the other. Explicit include globs retain
unimported production files. No coverage-ignore comments or production-source
exclusions were added to hide difficult paths. Test sources/helper code are not
production. Reports include JSON, JSON summary, HTML, LCOV, and a short terminal
summary. CI now runs both scopes independently on pull requests to main, pushes
to main, and manual dispatch; both 98% gates must pass before the build/deployment.

This repository supports a web application and Node 24 tooling. WM Pebbles is
described as an iPhone app, but its native code is not present. The React modules
are shared with server rendering and are additionally exercised by prerender and
hydration integration tests; their coverage gate belongs to the browser source
scope. Browser events are not part of the Node script denominator.

These are runtime scopes, not separate browser-engine certifications. jsdom does
not measure Safari, Firefox, or Chromium execution, mobile layout, or device
clipboard permissions. The existing workflow runs Linux; local development is on
macOS. In the verification phase, run both scopes separately under Node 24 on each
supported host OS and preserve their reports separately. Do not average OS or
browser-engine percentages. See TEST_UNTESTED_INVENTORY.md for remaining scope.

## Production-to-test map

Test names below are descriptions/searchable phrases in the named source file.
Parameterized tables enumerate normal, boundary, and failure inputs without
duplicating test bodies.

| Production function / branch | Test source and behavior asserted |
| --- | --- |
| `site`, `apps` configuration | `src/site.test.ts`: public origin/inbox; unique slugs; nonempty descriptions; routable product/privacy links |
| `appPath(app)` | `src/site.test.ts`: current and alternate slugs; `src/App.content.test.tsx` / `src/catalog.test.tsx`: actual product link destinations |
| `emailHref(address, subject)` | `src/site.test.ts`: absent/empty subject, spaces, punctuation, Unicode, CRLF encoding, malformed-surrogate exception; `src/App.test.tsx` and `src/App.content.test.tsx`: user-facing email actions |
| `pages`, `notFound`, `canonicalUrl` | `src/routes.test.ts`: route identities, unique paths, metadata, canonical URLs including 404; `scripts/assets.test.ts`: sitemap matches indexable pages |
| `pageForPath`: root vs other path | `src/routes.test.ts`: root, empty input, all published paths, with/without trailing slash |
| `pageForPath`: found vs fallback | `src/routes.test.ts`: unknown/404, case mismatch, repeated slashes, missing leading slash, extra segments, encoded paths, query/hash and dot segments supplied as raw input |
| `App`, `pageContent` routing | `src/App.content.test.tsx`: heading for all six page types and support → contact → unknown rerender; `src/App.test.tsx`: unknown-page recovery links |
| `Brand`, `Header`, `Footer` | `src/App.test.tsx`: main navigation and brand destination; `src/App.content.test.tsx`: footer links, copyright, one main/H1, skip-link target on each page |
| `ButtonLink`: primary/default vs secondary | `src/App.content.test.tsx`: hero action targets and classes; `src/catalog.test.tsx`: release links |
| `SectionHeading`: populated children | `src/App.content.test.tsx`: heading and descriptive paragraph; optional-description omission/transition tested in `src/SectionHeading.test.tsx` |
| `Home`, `AppCard`: app mapping | `src/App.content.test.tsx`: app cards, summaries, platform and links, section anchors; `src/catalog.test.tsx`: multiple apps and empty catalog |
| `ReleaseAction`: coming-soon vs available | `src/App.test.tsx`: no placeholder store link; `src/catalog.test.tsx`: released home/product links and transition back to coming-soon |
| `Pebbles`: slug predicate match/nonmatch | `src/catalog.test.tsx`: another app precedes Pebbles; correct description still rendered; missing required app currently throws |
| `Pebbles` content | `src/App.content.test.tsx`: three features and support/privacy links |
| `Support` | `src/App.test.tsx`: readable public inbox and support email draft; `src/App.content.test.tsx`: bug/feature subjects, reporting details, sensitive-data guidance |
| `Contact` | `src/App.test.tsx`: matching inquiry links; `src/App.content.test.tsx`: one labeled contact region containing the two actions |
| `Privacy` | `src/App.content.test.tsx`: date, all six sections, local-storage/no-sharing claims, prohibited services, email/domain destinations |
| `CopyEmailButton`: initial state and success | `src/CopyEmailButton.test.tsx`: empty live status, keyboard activation, exact clipboard argument, pending state, success only on resolution |
| Clipboard optional chaining / availability | Same file: navigator without clipboard, undefined/null clipboard, object without writeText, undefined writeText |
| Clipboard errors and retries | Same file: synchronous throw and asynchronous rejection; failure → success; success → unavailable/failure; restored API and changed email prop |
| Clipboard concurrency / lifecycle | Same file: overlapping writes resolving in either success/failure order; last completion currently wins; pending resolve/reject after unmount |
| `main.tsx`: missing root | `src/main.test.tsx`: import rejects with diagnostic; neither React root API called |
| `main.tsx`: empty vs populated root | Same file: empty root uses create/render; element, whitespace, and comment children use hydrate; pathname excludes query/hash |
| Real React SSR ↔ hydration | `src/hydration.test.tsx`: every page retains original main/heading DOM identity with no recoverable errors; hydrated support copy action works |
| Prerender template read and page loop | `scripts/prerender.test.tsx`: one template read, six distinct output paths/bodies, preserved module asset, directory-before-write ordering |
| `escapeHtml`, `metadata` | Same file: description/URL ampersand, quote, angle-bracket and Unicode fixtures; description/OG/Twitter tags; indexable canonical vs 404 noindex/omitted URL |
| Prerender output validation: both OR operands | Same file: absent root fails body check; absent title is currently accepted via metadata text; title needing escaping exposes existing raw-text validation limitation |
| Prerender output destinations | Same file: page directory indexes vs top-level 404; real isolated filesystem writes using repository HTML template |
| Prerender async/persistence failure | Same file: write promise blocks later pages/logging; template read, render, mkdir, write failures; second write failure leaves prior completed page |
| Static server initialization | `scripts/static-server.test.ts`: default/empty/zero/custom PORT, loopback binding, listener error; callback logging inspected without binding a socket |
| Static URL/path processing | Same file: undefined/empty URL, query stripping, decoded spaces/Unicode, single decoding, normalized plain dot segments |
| Static root containment | Same file: root itself, safe descendants, encoded traversal and sibling-prefix escape (403 without filesystem access) |
| Static directory redirect | Same file: 308, trailing slash, preserved encoded query, no file read; slash/root paths serve index |
| Static successful reads | Same file: HTML/CSS/JS/SVG/XML/TXT MIME types; unknown/no/uppercase extension fallback; binary bytes unchanged; direct 404 file returns 200 |
| Static fallback/error branches | Same file: stat failure, read failure, missing directory index → custom 404; malformed URL/encoding and unavailable fallback currently reject the handler |
| Static concurrency | Same file: two deferred file reads finish out of order with independent response bodies |
| Static filesystem integration | Same file: real temporary index, nested index, asset, redirect, missing-page fallback; HTTP listener boundary remains stubbed |
| HTML/robots/sitemap/favicon | `scripts/assets.test.ts`: mount marker, entry module, language/viewport/favicon, crawl permission and sitemap origin, exact route list |

## Maintenance conventions

- Assert accessible roles, visible outcomes, destinations, status codes, bytes,
  and persisted metadata instead of broad markup snapshots.
- Existing navigation/product/contact regression assertions remain. Duplicate
  clipboard tests moved into the focused state-transition suite.
- Clipboard, root initialization, filesystem error injection, and the HTTP
  listener are controlled at external boundaries. Real components, route helpers,
  React server rendering/hydration, and isolated filesystem operations provide
  integration coverage.
- Deferred promises control asynchronous ordering; no sleeps or real network
  dependencies. Tests do not declare concurrent execution when mutating globals.
- Restore clipboard descriptors, environment variables, module mocks, catalog
  contents, spies, DOM roots, and temporary directories after tests.
- Script imports reset their module cache to rerun entry points only within tests.
  Tests never write to the repository's existing `dist/`. Filesystem integration
  uses a temporary cwd return value rather than changing the worker's cwd.
- Current-defect tests explicitly say “currently”. They characterize behavior;
  they do not declare it desirable. Revise them alongside any approved repair.
- New runtime code belongs in coverage globs. Avoid adding exclusions or weakening
  thresholds to make the target appear achieved.

## Repeatable verification commands

The commands below were reserved for verification during authoring. Verification
is now authorized; results are recorded in TEST_VERIFICATION.md. `npm run check`
also builds the application.

Use Node 24 as declared by `.nvmrc`, `package.json`, and CI. The host used for
authoring exposed Node 26.13.0, so static checks here do not verify Node 24 runtime
compatibility.

```sh
nvm use
npm ci
```

For ordinary test execution, without coverage:

```sh
npm run test:browser
npm run test:node
# Alternative: all suites in one run
npm test
```

The V8 coverage provider is now pinned in package.json and package-lock.json at
5.0.1, matching Vitest. `npm ci` installs it. If upgrading later, keep the provider
and runner versions matched:

```sh
npm install --save-dev --save-exact @vitest/coverage-v8@5.0.1
```

If the lockfile's Vitest version changes, match that version instead. Do not let
the runner choose an unrelated latest provider interactively. The provider was installed during the authorized verification phase.

Run these independently, even if the first exits with a coverage failure, to
collect each scope's results. Each command also runs its tests, so a separate
ordinary test run is optional:

```sh
npm run test:coverage:browser
npm run test:coverage:node
```

Read `coverage/browser/coverage-summary.json` and
`coverage/node/coverage-summary.json`, inspect their HTML reports and
`coverage-final.json` branch locations, and retain LCOV for CI. On another host OS,
archive the first host's reports before copying/merging artifacts. Never replace
the independent gates with an aggregate percentage.

Only after execution, record actual line/branch totals, test outcomes, Node/OS
versions, and remaining uncovered locations in TEST_PROGRESS.md. Investigate
runtime test failures and the inventory's unreachable branches without adding
artificial assertions or excluding production logic. Measured passing results are recorded separately in TEST_VERIFICATION.md.

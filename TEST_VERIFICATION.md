# Test verification results

Verified on **2026-10-30** under **Node v24.22.2**, macOS (`darwin/arm64`),
using Vitest **5.0.1** and matching `@vitest/coverage-v8` **5.0.1**.

| Scope | Test files | Passing tests | Line coverage | Branch coverage | Independent gate |
| --- | ---: | ---: | ---: | ---: | --- |
| Browser source (jsdom) | 9 | 92 | **100% (43/43)** | **100% (21/21)** | Pass: ≥98% each |
| Node delivery scripts | 3 | 52 | **100% (33/33)** | **100% (26/26)** | Pass: ≥98% each |

Both coverage commands exited successfully. Every included file also measured
100% lines and branches. Statements and functions are 100% in both scopes.
Counts are V8 executable-source counters, not physical file line counts.

Revalidated the current worktree on 2026-10-30 at 18:48 America/New_York with
`npm test -- --coverage` under Node 24.22.2. All **12 files / 144 tests passed**
in 6.30 seconds. The default run's separate `src/**` and `scripts/**` 98% gates
also passed: browser **43/43 lines, 21/21 branches**; Node **33/33 lines,
26/26 branches**. Combined totals are **76/76 lines and 47/47 branches**.
All six production modules are present in `coverage/all/coverage-summary.json`;
each individually measures 100% lines and branches. No source changes or threshold
changes were needed for this revalidation.

| Production file | Covered lines | Covered branches |
| --- | ---: | ---: |
| `src/App.tsx` | 28/28 | 11/11 |
| `src/main.tsx` | 5/5 | 4/4 |
| `src/routes.ts` | 5/5 | 4/4 |
| `src/site.ts` | 5/5 | 2/2 |
| `scripts/prerender.tsx` | 15/15 | 10/10 |
| `scripts/static-server.mjs` | 18/18 | 16/16 |

Evidence: `coverage/browser/coverage-summary.json` and
`coverage/node/coverage-summary.json`, with detailed `coverage-final.json`,
`index.html`, and `lcov.info` in each directory. Raw maps were inspected: all six
production modules are included and no statement/function/branch counters have
zero hits. Generated coverage artifacts are ignored by Git; regenerate them with
the commands below. This document preserves the measured totals.

## Changes made during verification

- Added the matching V8 provider to the manifest and lockfile.
- Corrected an authored expectation: removing the template title does not trigger
  prerender validation because OG metadata still contains the title. The test now
  verifies that existing limitation explicitly.
- Parse the static request URL once and reuse its query string for redirects,
  eliminating the redundant unreachable fallback. Existing normal, encoded,
  missing-URL, redirect, and error-path tests pass.
- Exported `SectionHeading` for direct testing of its optional description;
  omission/insertion/removal now have a dedicated regression. Rendering is unchanged.
- Limited test workers to two and set a 30-second test timeout. Instrumented DOM
  role queries exceeded Vitest's default five seconds on this host; the final
  browser run passed in 33.92 seconds overall. No assertion was removed to cure a
  timeout, and neither coverage gate was weakened.

## Reproduction

With Node 24 on PATH and locked dependencies installed:

```sh
npm ci
npm run test:coverage:browser
npm run test:coverage:node
npm run typecheck
npm run lint
git diff --check
```

This host used a temporary runtime without replacing the system Node:

```sh
export PATH=/private/tmp/wisdommedium-node24/node_modules/node/bin:$PATH
node --version
```

TypeScript and ESLint passed under that Node 24 runtime. Neither coverage command
depends on a Vite build, an existing dist tree, or a listening HTTP socket.

## Limits

These measurements apply to the defined browser-source and Node-script scopes
on this macOS host. jsdom is not a real-browser compatibility test. Linux CI,
Safari/Firefox/Chromium, mobile layouts, native apps, build/deployment behavior,
and transport-level HTTP remain unverified here. Existing prerender validation,
fallback-response, symlink, and clipboard completion-order limitations are
documented in [the inventory](TEST_UNTESTED_INVENTORY.md). Coverage does not imply
those behaviors are correct or certify paths V8 does not distinguish as branches.

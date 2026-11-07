# Test development progress

Status: **VERIFIED — BOTH 98% GATES PASSED**. The user authorized Node 24 execution,
matching coverage-provider installation, and failure repairs on 2026-10-30.
The authoring-only restrictions below are historical.

CI update (2026-10-30): deploy.yml now runs independent browser/Node coverage
matrix jobs with fail-fast disabled and unchanged 98% line/branch gates. Both
must pass before lint/build; PRs to main validate without deployment. Push/manual
runs retain Pages deployment. The build relies on the coverage jobs for tests
instead of repeating an uninstrumented test run. Local YAML/wiring validation
and diff whitespace checks performed; GitHub-hosted execution remains pending.

Latest revalidation (2026-10-30, 18:48 America/New_York): current worktree passed
`npm test -- --coverage` under Node 24.22.2, 12 files / 144 tests, 6.30 seconds.
Separate browser and Node thresholds passed with 100% lines and branches in
each scope. Combined totals: 76/76 lines, 47/47 branches. All six production
modules are included; all also individually meet 98%. No source or gate changes
were required. Reports are in coverage/all/ and TEST_VERIFICATION.md.

## Scope and constraints

- Target at least 98% lines and 98% branches independently for browser source and Node delivery scripts.
- Repository contains a React website, not a native iOS app. Node 24 is declared; Linux CI and local macOS use the same source.
- Preserve application behavior. No dependency installation, test execution, coverage collection, builds, servers, simulators, or emulators during authoring.
- Use existing Vitest, Testing Library, TypeScript, and ESLint. Static type/lint checks are allowed.

## Completed inspection

- Read all production TypeScript/JavaScript, existing tests, CSS, HTML template, public assets, package/config files, and deployment workflow.
- No applicable AGENTS.md found in the workspace or parent directories.
- Existing tests: eight basic UI/copy cases in src/App.test.tsx.
- Gaps: route boundaries, helper encoding, page contracts, clipboard rejection/retry/concurrency, browser mount/hydration, prerender output/error paths, static HTTP handling.

## Batches

1. [x] Route/site unit tests and page behavior contracts.
2. [x] Clipboard state transitions and browser bootstrap/hydration.
3. [x] Prerender output, persistence ordering, and failure paths.
4. [x] Static server request behavior, filesystem integration, and errors.
5. [x] Separate coverage gates, coverage map, difficult-code inventory, future execution commands.
6. [x] Static TypeScript/ESLint review only; final diff review.

## Completed deliverables (2026-10-30)

- Ten new test files plus the retained/refined App regression suite (eleven total).
- Browser suites: site/routes, page content, release/catalog variants, clipboard
  transitions, startup selection, and real React SSR/hydration integration.
- Node suites: prerender metadata/output/errors and isolated real-file writes;
  static handler MIME/redirect/404/path/concurrency behavior and real-file reads;
  public asset contracts. HTTP listen is stubbed in the authored tests.
- Shared deterministic deferred-promise helper in tests/deferred.ts.
- Independent 98% line/branch targets in vitest.browser.config.ts and
  vitest.node.config.ts, with separate report directories and npm commands.
- Default coverage configuration includes separate source/script thresholds.
- TEST_COVERAGE_PLAN.md: complete production-to-test map and later commands.
- TEST_UNTESTED_INVENTORY.md: difficult branches, characterized defects, and gaps.
- README links to the plan, inventory, and progress.
- TypeScript includes test helpers/configs and allows inference for the existing
  JavaScript server module. No production source or dependency lockfile changed.

## Authoring-phase static validation (historical)

- `npm run typecheck`: passed after all test/config changes (`tsc --noEmit`).
- `npm run lint`: passed after all test/config changes.
- `git diff --check`: passed during final source review.
- Read-only diff confirmed no changes to production TS/TSX/MJS or package-lock.json.
- Authoring host reported Node 26.13.0 / npm 11.20.0, whereas the project requires
  Node 24. Runtime compatibility under Node 24 remains unverified.
- **No tests, coverage commands, builds, servers, installs, or emulators run.**

## Verification results (2026-10-30)

- Node v24.22.2, darwin/arm64; isolated runtime in
  /private/tmp/wisdommedium-node24/node_modules/node/bin.
- Installed @vitest/coverage-v8@5.0.1, exactly matching locked Vitest 5.0.1.
  Manifest and lockfile updated together; no threshold reductions or source exclusions.
- Browser: 9 files / 92 tests passed, 100% lines (43/43), 100% branches (21/21).
- Node: 3 files / 52 tests passed, 100% lines (33/33), 100% branches (26/26).
- Final suite contains twelve test files, including the new SectionHeading regression.
- Raw coverage maps include all four src modules and both delivery scripts;
  no zero-hit statement, function, or branch counters in either scope.
- Typecheck and lint passed under Node 24. `git diff --check` passed.
- Corrections: missing-title template is actually accepted via OG metadata, so
  its regression now characterizes that behavior. Server reuses its parsed URL
  to remove redundant fallback; SectionHeading exported for optional-description
  testing. UI rendering behavior is preserved.
- Two-worker cap and 30-second test timeout accommodate instrumented jsdom DOM
  queries on this host; coverage gates stay at 98% each. Initial default-timeout
  failures are superseded by the final passing runs.
- Detailed evidence and remaining limits: TEST_VERIFICATION.md and
  TEST_UNTESTED_INVENTORY.md. No build, deployment, real-browser/device, or Linux
  verification performed in this phase.

## Resume instructions

Read this file, TEST_COVERAGE_PLAN.md, and TEST_UNTESTED_INVENTORY.md, then inspect
git status/diff. Verification is complete for the recorded macOS runtime scopes. Preserve the
98% gates and rerun relevant coverage after source changes.


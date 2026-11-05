# Untested and difficult-to-test inventory

Verification is authorized and measured scope results are recorded in
[TEST_VERIFICATION.md](TEST_VERIFICATION.md). The entries below describe remaining
behavioral and environment limitations, not uncovered-line measurements.

## Previously difficult branches

- `SectionHeading` is now exported for direct component testing. Its optional
  description is tested through omission, insertion, and removal without mocking
  React or changing its rendering behavior.
- The static server parses the request URL once and reuses its search string for
  redirects. This removes a redundant unreachable fallback while preserving
  normal request behavior, including query encoding.
- Both source scopes remain fully included; no ignore comments, coverage
  exclusions, or weaker thresholds were introduced.

## Existing behavior characterized, not repaired

| Area | Static finding | Authored regression coverage |
| --- | --- | --- |
| Prerender title validation | A title containing `&`, quotes, `<`, or `>` is escaped in output, then checked using unescaped title text. Such a title can fail rendering. | Ampersand title rejection; attribute escaping in descriptions and canonical URLs. A successful special-character title is not currently supported. |
| Prerender missing title marker | Metadata can satisfy the raw-title guard even when there is no title element. | Test records missing title with valid OG metadata. |
| Prerender missing head marker | A template without `</head>` can pass validation and omit SEO metadata. | Test records absence of metadata with body still rendered. |
| Prerender partial persistence | Earlier pages remain written if a later write fails; no transactional rollback or cancellation API exists. | Later write rejection stops iteration and preserves prior success logging. Real disk-full/partial-file failures are injected at the filesystem boundary, not induced on disk. |
| Static malformed URLs | URL construction and percent decoding occur outside the try/catch; the async handler can reject without a response. | Handler-level malformed URL and percent-encoding rejection tests. A real Node HTTP listener does not automatically turn that rejection into a well-formed error response. |
| Static fallback unavailable | Reading `404.html` inside catch can also reject, leaving no response. | Handler-level rejection assertion. |
| Static symlinks | Containment uses resolved path strings, not realpath; a symlink under dist could point outside it. | No exploit/socket test added. Symlink semantics and host filesystem permissions need explicit policy before hardening this local preview server. |
| Missing product record | Pebbles assumes the catalog contains its record; the non-null assertion does not protect runtime access. | Server-rendered missing-record TypeError and non-first matching-record tests. |
| Clipboard overlapping writes | The last promise to settle controls the status, even if it belongs to an older click. | Both older-success/newer-failure and older-failure/newer-success completion orders. |
| Clipboard unmount | Writes are not cancellable; unmount does not cancel the browser operation. | Resolve/reject after unmount, no retained UI, one write. No cancellation contract is invented. |

## Outside this phase's automated guarantees

- **Real browser engines and devices:** jsdom is a DOM test environment, not
  Chromium, Firefox, Safari, mobile Safari, or an iPhone simulator. Actual secure
  context/permission clipboard behavior, real mail-app handoff, focus scrolling,
  navigation, and browser console warnings need later browser validation.
- **CSS and visual accessibility:** breakpoints at 850/600/355 px, 280 px minimum
  width, hover/focus-visible, reduced motion, layout overflow, contrast, and screen
  reader announcements have no JavaScript line/branch percentage. Roles, labels,
  link targets, live-region attributes, and keyboard button activation are tested;
  a full accessibility audit and visual comparisons remain separate work.
- **HTTP transport/lifecycle:** tests invoke the real request callback through a
  stubbed listener. They do not bind sockets or verify actual HTTP serialization,
  HEAD behavior, aborted clients, server close, listen error events, port conflicts,
  or resource limits. No transport cancellation handling exists in the source.
- **Build/deployment:** no Vite build, bundled-asset hydration run, GitHub Actions,
  GitHub Pages redirects/404 delivery, DNS, custom domain, TLS, or cache validation.
  The integration fixture uses the repository template without bundling. Existing
  deployment behavior is unchanged.
- **Persistence scope:** this website has no backend, database, localStorage,
  user accounts, background jobs, or native app persistence. Filesystem output is
  tested with temporary fixtures and injected failures. Privacy copy about WM
  Pebbles storage is not verification of the separate native app implementation.
- **Environment compatibility:** Node 24 is required but the available authoring
  host was Node 26.13.0. macOS verification uses Node 24.22.2. Linux CI runtime outcomes remain unverified.
  No Windows-specific implementation/support declaration was found; if Windows
  is added, validate path separators and traversal rules there independently.
- **Coverage tooling:** Vitest and `@vitest/coverage-v8` are pinned/matched at
  5.0.1 for verification. Reports describe the exercised source scopes; they do
  not certify browser-engine compatibility or untested deployment behavior.

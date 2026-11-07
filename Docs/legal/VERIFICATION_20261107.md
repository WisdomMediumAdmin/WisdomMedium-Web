# My Stories website verification — November 7, 2026

## Result

| Acceptance | Result and boundary |
| --- | --- |
| Preservation | Original `e0a68a5` and prerequisite `8f212bf` retained. Ten subsequent changed files carried forward; four later evidence files preserved. Original dirty main and prior review checkouts untouched. |
| Accepted application facts | PASS against the two files fetched directly from `WisdomMediumAdmin/my-stories` main/tag `7c9217a2bdd045128301a0af703979d707814b50`. Copies have matching Git blob IDs. No stale local app checkout used. |
| Website implementation | PASS: typecheck, lint, 177 tests, production build, static routes, internal links/anchors, focused layout/keyboard checks. |
| Owner/legal approval | PENDING: entity/regions, support/provider practices, Apple disclosures/diagnostics, license/commercial terms, recovery limitation acceptance, effective date and final text approval. |
| Submission validation | Physical-device, iOS 18.6 runtime, signed upgrade/archive and App Store checks remain separate. Accepted app report says source PASS, submission NOT READY; 310 passed, 0 failed, 3 skipped. No app tests rerun here. |
| Merge/deployment | Not authorized or performed. Publication guard rejects pending owner record. |
| Live publication | Not satisfied: fresh HTTP and browser checks show Privacy 200 without My Stories; Terms 404. |

## Validation evidence

Node **24.22.2**, using existing locked dependencies without manifest changes:

- `npm run check`: PASS, **177 tests / 14 files**, TypeScript, ESLint and build. Eight static outputs (seven routes plus 404). `evidence/check-sync-20261107.txt`.
- `npm run test:coverage:browser`: **112 passed**, **100% lines / 100% branches**. This is the jsdom source suite, distinct from the actual browser checks below.
- `npm run test:coverage:node`: **65 passed**, **100% lines / 100% branches**. Existing independent 98% gates retained. Logs: `evidence/*coverage-sync-20261107.txt`.
- Legal regression assertions cover ordinary backup eligibility, device-bound/missing keys, deletion cleanup/retry, indefinite trash retention, originals/remnants, media limits, notifications, draft notices and exact draft dates. Every rendered internal link and anchor resolves, IDs are unique, and each route has one main h1.
- **12 local HTTP checks** passed: seven pages, slashless Privacy/Terms 308 redirects, unknown page 404, icon 200/image/png and sitemap 200. Both legal pages have My Stories content, draft notices and exact canonical URLs `https://wisdommedium.com/privacy/` and `https://wisdommedium.com/terms/`. `evidence/http-sync-20261107.json`.
- Actual in-app browser: Privacy, Terms, My Stories listing and home/apps at **320, 390, 768, 1440 px**; 16 layouts, no horizontal overflow or broken loaded images, one main h1. `evidence/responsive-sync-20261107.json`.
- Mobile My Stories privacy and terms visually inspected. Privacy and Terms anchor headings settle approximately 24 px below viewport top. Keyboard Tab exposes the skip link with a solid focus outline; Return focuses `main`. No warning/error console logs observed. `evidence/accessibility-sync-20261107.json`, `privacy-sync-mobile-20261107.png`, `terms-sync-mobile-20261107.png`.
- Styling unchanged from the original draft; prior measured contrast and reduced-motion evidence remains applicable to those unchanged styles. This is focused accessibility inspection, not full assistive-technology/WCAG certification or physical iPhone testing.
- `node scripts/check-legal-publication.mjs` rejects the actual pending record as intended; rejection captured under host Node 26, with the gate's full unit coverage passing under Node 24. No approval flag changed.
- `git diff --check`: PASS.

## Preservation and source consistency

All five existing WM Pebbles/SoapyMoney blocks match prerequisite `8f212bf` byte-for-byte, from each h2 through section end. See `evidence/preserved-policies-sync-20261107.json`.

The original main's 28 modified/untracked files and prior review's 10 modified files match the preservation snapshot. Their branches, indexes and original files were not edited. The missing historical worktree registration was retained; this task used detached worktree `/private/tmp/wisdommedium-legal-sync-20261107` and advances the review ref only after an ancestry check. `evidence/preservation-sync-20261107.json`.

The later prior-review evidence is retained separately in `evidence/prior-review-20261107/`; it is not substituted for checks of this final draft. The November 5 reports are archived under `history/`. Current audit, owner handoff and App Store review no longer treat the accepted engineering fixes as unresolved.

Copied source files match GitHub blobs exactly: contract `615e26bfe8dce70f30a1e53970b43833ec0a0847`, release report `bfca6082e4c002a4037f4e739b87f29d2cf7f834`. Provenance: `evidence/accepted-release-source-20261107.json`.

## Git and publication delivery

The original branch was first normally pushed at `e0a68a5`; GitHub confirmed `codex/my-stories-legal-review` exists. Corrections and this record are delivered on that same branch with a normal, non-force push. The PR targets `main` and remains draft pending approval. Exact delivered commit/PR and current CI state are recorded in the delivery response and GitHub.

- [Review branch](https://github.com/WisdomMediumAdmin/WisdomMedium-Web/tree/codex/my-stories-legal-review)
- Merge into main: **not performed**.
- Deploy to website: **not performed**.
- Public Privacy: **200, My Stories absent**, verified November 7 by HTTP and rendered browser.
- Public Terms: **404, “That page isn’t here.”**, verified November 7 by HTTP and rendered browser.

Live headers/HTML: `evidence/live-*-sync-20261107-*`. No staging publication, workflow dispatch, App Store mutation or email sent. PR validation is not deployment. Live app-link/hardware verification must follow a separately approved publication.

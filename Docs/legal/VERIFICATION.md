# My Stories website verification

Date: November 5, 2026 (America/New_York). Local review branch: `codex/my-stories-legal-review`.

| Acceptance | Result | Boundary |
| --- | --- | --- |
| WEBSITE IMPLEMENTATION | **PASS** | Local draft, static build, navigation and responsive validation complete. No remote staging/CI run claimed. |
| POLICY FACTUAL CONSISTENCY | **BLOCKED** | Final release contract missing; retained attachment database payloads unresolved; backup behavior differs from older audit; project OS target conflicts with 18.6; support/Apple diagnostics decisions unresolved. |
| LEGAL OWNER APPROVAL | **PENDING** | Verified operator, regions, support policy and approval receipt not supplied. |
| PRODUCTION PUBLICATION | **NOT VERIFIED** | No publication performed. Live privacy lacks My Stories; live terms still 404 in fresh checks. |

## Implementation and test evidence

- `npm run check`: PASS — TypeScript, ESLint, **177 tests**, Vite build and static pre-render. Runtime **Node 24.22.2** on macOS. Full output: `evidence/node24-check.txt`.
- Separate deployment coverage gates: browser **112 tests**, **100% lines / 100% branches**; node **65 tests**, **100% lines / 100% branches**. Existing 98% thresholds retained. Logs in `evidence/node24-*-coverage.txt`.
- Node 24 was obtained from the official Node.js distribution and checksum-verified (`aa9549349e47dffaa42dcf95d6e06ade8c4bdafc980979883b88767670df385a`, `node-v24.22.2-darwin-arm64.tar.gz`). Initial Node 26 checks also passed, but final reported checks use Node 24. Existing dependencies were reused; dependency manifests were unchanged by this task. A fresh Linux `npm ci` / GitHub Actions run remains a publication prerequisite.
- Eight static HTML outputs: seven public routes plus 404. Public sitemap includes all seven routes exactly once; canonical metadata and server-rendered bodies verified.
- **14 actual local HTTP checks**: known pages/assets 200; slashless `/privacy` and `/terms` 308 to canonical paths; unknown page 404. Icon served `image/png`. See `evidence/local-http-results.json` and `build-artifacts.json`.
- Legal test traverses every rendered internal link and hash target, requires unique IDs and a single main h1, verifies footer Terms and My Stories support/privacy/terms links. Prerender and hydration tests pass. Browser console showed no warning/error logs during sampled preview navigation.
- Publication gate fails as intended for the pending owner record. Automated tests also cover each missing approval, absent/invalid date, retained draft notice, mismatched rendered date and approved fixtures. The approved fixture is test-only. The actual record remains pending; `evidence/publication-gate.txt` records rejection. Its stack trace uses the host Node 26 CLI; the gate unit suite passed under Node 24.
- `git diff --check`: PASS.

## Browser review

Actual built output was served on loopback port 4177; development preview used 4176. Tested `/privacy/`, `/terms/`, `/apps/my-stories/` and `/#apps` at widths **320, 390, 768, 1440 px**: no horizontal overflow, one main h1 per route, no broken loaded images. See `evidence/responsive-layouts.json`.

Visually inspected mobile privacy and terms, tablet product layout and desktop product/privacy views. Screenshot artifacts: `privacy-mobile.jpg`, `my-stories-desktop.jpg`. The `#my-stories` privacy jump reached its heading with approximately 24 px top clearance. Keyboard Tab reached the visible skip link with a solid focus outline; Enter targeted and focused `main` after adding `tabIndex=-1`. Existing focus styles and reduced-motion rules remain.

Selected legal-page text contrast ratios: body 5.88:1, headings 13.07:1, links 5.94:1, legal-nav links 5.29:1, review notice 8.87:1. Large heading accent 3.61:1 meets the large-text threshold. See `evidence/contrast.json`. This is focused inspection, not a blanket WCAG conformance certification or full assistive-technology audit. The existing website has no alternate dark theme; its light appearance is preserved. No dark-theme support is claimed.

## Preservation and source audit

All five existing WM Pebbles/SoapyMoney policy blocks are byte-identical from their h2 through section end against prerequisite commit `8f212bf`; only an anchor was added to the outer WM Pebbles section. See `evidence/preserved-app-policies.json`. Existing routes and support content remain.

The original website working tree stays on `main`, with all **39 original file contents** matching the prerequisite snapshot. No original user files were overwritten. `evidence/original-worktree-preservation.json` records this check. The separate baseline commit captures existing work for a reviewable branch; it is not presented as new My Stories work.

Application evidence was read only, with critical file hashes retained in `evidence/app-source-hashes.json`. No app build, app data deletion test, signing action, simulator change or App Store Connect mutation occurred.

## Production and staging boundary

Fresh production HTTP and source evidence are retained in `evidence/wm-*-headers.txt`, `evidence/wm-live-*.html` and `evidence/live-resource-audit.json`: home/apps anchor 200, privacy 200 without My Stories, terms 404. GitHub Pages plus its cache/CDN infrastructure were observed; public MX points to Google. Inbound support delivery was evidenced through the connected business Gmail account, without sending a message or committing private email content. Complete support handling is still owner-gated.

There is no configured staging environment in this repository. None was invented or published; local preview is not staging. No branch push, PR, workflow dispatch, production deploy or remote account change was performed. Recheck live rendered content and deployment commit only after owner approval using `MY_STORIES_OWNER_REVIEW.md`.

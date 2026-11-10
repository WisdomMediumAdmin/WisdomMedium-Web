# CuckooAlarm publication review — November 9, 2026

The owner authorized finalization and publication of the four CuckooAlarm pages on this date. This supersedes the earlier draft-only publication gate. The retained WEBSITE_FACTS files are historical source evidence, not current publication status.

Review branch: `codex/cuckooalarm-legal-review-20261109`, based on website main `3b30b72fb2f93a70c0509e27ab566e2b299b0847`. The separate checkout preserves the main workspace’s unrelated uncommitted tests/configuration work.

## Final source review

Current app main: `c2b78f01417504745c5d0a27dd620e3aa3a27f3f`. `git diff 1f035199ce0a8670281a63bd0695f811d55047bf -- Apple/CuckooAlarm` is empty: the audited shipping implementation remains unchanged. Re-read the weather service/policy, alarm and notification schedulers, alarm/stopwatch stores, settings/feedback UI, privacy manifest and asset provenance.

The pages preserve the existing operator, **Kazi Ahmed Siam, operating as WisdomMedium**. No entity, business address, governing-law clause, guaranteed response time, paid service or App Store listing was invented. Source-backed original synthesized sound provenance is described without an exclusivity or legal-clearance guarantee. Apple’s Standard EULA is linked conditionally as the applicable App Store license; these supplemental terms preserve mandatory rights.

Final corrections: disclose six-hour approximate-point reuse, 24-hour routine weather refresh and bounded manual/retry behavior; distinguish forecast expiry from retained refresh-history area identifiers; clarify permission-revocation cleanup and backups/offloading; correct notification fallback to permission for alerts **or** sounds; use the actual Settings → Default Sound → Test Alarm path. Progressive remains explicitly unavailable. No obsolete weekly WeatherKit limit appears.

All four routes have November 9, 2026 effective/revision dates and canonical URLs. Their draft notices/noindex flags are removed and all four appear in the public sitemap. “Coming soon” remains truthful because no App Store listing is verified.

## Validation and publication

`npm run check` passed on Node 24.22.2: TypeScript, ESLint, all 23 tests in four files, and the production build with 19 prerendered pages. STATIC_VERIFICATION.json records all four canonicals, sitemap inclusion, indexability and working internal links/anchors. All nine existing app page bodies are byte-identical to base main: PotatoBeans and My Stories product/privacy/terms/support, plus WM Pebbles. BROWSER_VERIFICATION.json records all four routes at 1440×1000 and 390×844 with no horizontal overflow and loaded images. Product/privacy/terms/support screenshots were visually reviewed; mobile navigation between the policies and support passed with no browser warning/error logs.

Publication uses a pull request into main, triggering the unchanged GitHub Pages workflow. Deployment and live HTTP/browser results are reported separately after that workflow completes. No workflow or dependency changes are included.

## Separate app-release follow-up

No material unknown requires guessing to publish these website pages. Mailbox receipt/support operation has not been tested by sending mail; no response-time commitment is made. App Store listing identity/ID, app privacy questionnaire, distribution signing/archive and physical alarm/weather reliability remain app-release work documented in the app repository. The app’s privacyURL/termsURL are still nil and should be wired to the verified public URLs before its release; this website task does not alter the app implementation. The current app targets iOS 26 despite the parent directory’s general 18.6 deployment policy; the website accurately reflects the inspected binary/source, and no deployment-target change is made here.

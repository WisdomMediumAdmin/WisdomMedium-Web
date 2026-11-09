# CuckooAlarm review branch — do not publish yet

Base: origin/main 3b30b72. Isolated checkout preserves the other website working tree and its unrelated tests/configuration changes. The existing workflow deploys only main pushes or explicit manual dispatch; this branch is not deployed.

Built routes: `/apps/cuckooalarm/`, `/apps/cuckooalarm/privacy/`, `/apps/cuckooalarm/terms/`, `/apps/cuckooalarm/support/`. Each has canonical metadata, a review notice and `noindex`; drafts deliberately remain outside the public sitemap. Existing apps' legal text remains unchanged. Icon derivatives are generated from the actual CuckooAlarm AppIcon master (1.0 build 1).

Validation: `npm ci`, `npm run check` succeeded: TypeScript, ESLint, 23 tests in four files, Vite production build and 19 prerendered pages. Browser review at 1440×1000 and 390×844: readable layout, no mobile horizontal overflow (document/viewport both 390), product → privacy → terms → support navigation works. Screenshots are in CuckooAlarm's execution report. No message sent and no deployment triggered.

Public candidate privacy URL returned HTTP 404 on November 9, 2026. App URLs remain unset. The website currently identifies Kazi Ahmed Siam as operator; this is source context, not a newly established legal fact. Owner/legal reviewer must approve operator identity, applicable terms, retention/support process and effective date. Review optional location/Apple Weather sharing and retained local data against the attached facts. No broad privacy guarantees or proven Progressive delivery are claimed.

Before publication: approve content; replace draft notice with approved revision/effective date; clear `draft` only on approved routes; add their four canonical URLs to sitemap; rerun checks; merge by the approved main workflow. Verify actual HTTPS 200 content after deployment, then wire exact Privacy/Terms destinations in the app and App Store Connect. Provide a genuine App Store listing separately before enabling Review/Share. Do not publish merely because the review branch builds.

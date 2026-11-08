# WisdomMedium website audit — November 7, 2026

Scope: website only, for PotatoBeans and My Stories under the owner's existing individual Apple Developer membership. WisdomMedium is an independent brand, not a registered LLC or corporation. No app source, membership, store record, DNS, mailbox or hosting configuration is changed. Existing GitHub Pages publication from `main` is retained.

## Evidence used

Read-only project reports, relative to the website's parent directory:

- `PotatoBeans/Docs/Release/WEBSITE_HANDOFF_POTATOBEANS.md` (November 2, source audit `f48baff9776ec10822ed7c8c1cdc7ac2a31f5627`): authoritative Apple-release data flows, retained history, Calendar cloud exception, Watch behavior, protected writing, support, exact legal URLs and unresolved provider/owner facts.
- `PotatoBeans/Docs/Release/PRIVACY_DISCLOSURE_AUDIT.md`: corroborating audit; older Android/web observations do not define this Apple release.
- `My Stories/Docs/Release/MY_STORIES_WEBSITE_CONTRACT.md` (reverified November 7 against accepted `7c9217a2bdd045128301a0af703979d707814b50`): iPhone local storage, original media metadata, backup eligibility, device-bound keys, indefinite Deleted Journals, cleanup/retry and browser/support boundaries.
- `My Stories/Docs/Release/APP_STORE_PRIVACY_PROPOSAL_20261107.md`: source-level lack of automatic developer collection does not establish final Data Not Collected answers; support and Apple reports remain unresolved.

The My Stories portrait-only follow-up candidate changes orientation and QA, not the reported data handling. This website audit does not select or certify an app binary.

Authoritative references checked November 7:

- [Apple App Review Guidelines](https://developer.apple.com/app-store/review/guidelines/), especially support contact and privacy policy requirements.
- [Apple App Privacy Details](https://developer.apple.com/app-store/app-privacy-details/): distinguish local processing, Apple services and reportable collection; optional support disclosure is conditional.
- [Individual developer names](https://developer.apple.com/help/app-store-connect/create-an-app-record/set-your-developer-name): an individual membership uses the individual's legal name.
- [Apple Standard EULA](https://www.apple.com/legal/internet-services/itunes/dev/stdeula/): applies when no custom EULA is supplied; website terms do not configure a custom EULA.
- [GitHub Pages data collection](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages#data-collection): visitor IP logging for security.

## Implemented website changes

- Dedicated Privacy Policy, Terms of Use and Support URLs for both apps, with shared React components to avoid conflicting versions.
- Shared `/privacy/` and `/terms/` contain separately identified PotatoBeans and My Stories sections, matching the exact current app links. The previous Terms 404 is addressed by a real prerendered page.
- Existing WM Pebbles and SoapyMoney disclosures preserved and explicitly scoped. WM Pebbles is not treated as another name for PotatoBeans.
- Product pages and homepage entries for both apps; no fabricated App Store URL, release status, price, subscription or unsupported My Stories platform.
- Individual-operator branding and contact text, Terms footer link, app navigation, searchable page metadata and sitemap.
- Privacy explains GitHub Pages logging separately from app data and avoids a blanket no-data/no-diagnostics promise.
- Terms preserve user content rights, reference the applicable App Store license and mandatory consumer rights, and describe actual provider/recovery limits without inventing account suspension, remote purge or a custom EULA.
- App support includes privacy-safe reporting guidance and avoids destructive reset/uninstall advice.

## Public destination contract

| App | Privacy | Terms | Support |
| --- | --- | --- | --- |
| PotatoBeans | https://wisdommedium.com/apps/potatobeans/privacy/ | https://wisdommedium.com/apps/potatobeans/terms/ | https://wisdommedium.com/apps/potatobeans/support/ |
| My Stories | https://wisdommedium.com/apps/my-stories/privacy/ | https://wisdommedium.com/apps/my-stories/terms/ | https://wisdommedium.com/apps/my-stories/support/ |

Both apps' current links remain valid at https://wisdommedium.com/privacy/ and https://wisdommedium.com/terms/. Sections use `#potatobeans` and `#my-stories`. Shared support is https://wisdommedium.com/support/ and contact is https://wisdommedium.com/contact/.

## Owner confirmation and App Store Connect review

The owner confirmed **Kazi Ahmed Siam** as the individual legal operator of WisdomMedium, PotatoBeans and My Stories after checking the Xcode signing team and certificate. The signed-in App Store Connect account header and Business legal-entity heading independently show **KAZI AHMED SIAM**, confirming the exact name in App Store Connect. Public legal, contact, support and footer wording now names that individual. WisdomMedium remains a brand, not a registered LLC or corporation.

The owner confirms `support@wisdommedium.com` is the official support/privacy address and receives incoming messages. Messages and voluntary attachments are handled by the configured email service. There is **no established fixed automatic deletion period**. The published policy now states this directly, offers the official contact for deletion requests and makes no invented time limit or automatic-erasure promise. The earlier mailbox-receipt and unknown-retention-status blockers are superseded by these owner facts. No test email was sent and no mailbox configuration was changed.

A read-only review of the existing signed-in App Store Connect session was performed. Current app-specific results:

| App | Analytics | TestFlight builds | Crash feedback | Screenshot feedback |
| --- | --- | --- | --- | --- |
| PotatoBeans | “This app is currently unavailable for Analytics.” | No Builds; prompt to submit a build | No Crash Feedback | No Screenshot Feedback |
| My Stories | “This app is currently unavailable for Analytics.” | No Builds; prompt to submit a build | No Crash Feedback | No Screenshot Feedback |

Both records were shown as Prepare for Submission. The website does not advertise them as released. My Stories' visible Support URL is the existing `https://wisdommedium.com/support/`, which now covers both apps. These are current read-only observations, not historical access records. Viewing empty dashboards is not proof that the owner never accessed or exported data in the past. No crash reports, user feedback or analytics datasets were downloaded; no store settings were changed.

Apple documents [opt-in usage analytics](https://developer.apple.com/app-store-connect/analytics/) and [TestFlight crash/screenshot feedback](https://developer.apple.com/help/app-store-connect/test-a-beta-version/view-tester-feedback/). The public policy distinguishes these Apple services from custom app telemetry. It does not claim that Apple reports are never available to the developer or that local journals are uploaded to WisdomMedium.

## Remaining unverified operational details

- Actual past or ongoing use, export and retention of Apple diagnostics, usage reports or TestFlight feedback outside the inspected dashboards, including any Xcode-local copies or external integrations. A final App Store privacy label must reflect actual practices; a blanket Data Not Collected answer is not certified by this website task.
- Exact support service configuration, forwarding/access recipients, provider-held backup retention and the practical handling of a deletion request. The public copy accurately states the owner's confirmed absence of a fixed automatic deletion period; no provider-specific retention or deletion guarantee is inferred from DNS.
- Final launch markets and any market-specific contact/address or rights notice. No mailing address, jurisdiction or audience restriction was invented. No LLC formation is required by this website workflow.

The website can publish these confirmed facts while the remaining operational details stay explicitly unverified in this audit. App signing, runtime validation, encryption answers and App Store submission are owned by the app-release tasks, not this website task.

## Verification and source preservation

The working-copy check passed TypeScript, ESLint, all 188 tests and a static production build under Node 24.22.2. Browser QA exercised both apps' privacy → terms → support navigation at phone width and the shared terms page at desktop width; inspected phone pages had no horizontal overflow. These are website/browser checks, not physical iPhone app-link or signed-binary validation.

A preexisting coverage/testing overhaul is retained in the working tree and excluded from the website publication commit. Existing SoapyMoney page content is preserved. The exact staged snapshot separately passed `npm ci` with its unchanged lockfile, TypeScript, ESLint, all 16 committed tests and the production build under Node 24.22.2. Deployment does not depend on the uncommitted tests/configuration. Live verification must check deployed HTML, meaningful content, links and assets against that snapshot; a local build or a green deployment alone is not proof of the public content. The final chat report records deployment and live verification results.

## Publication evidence

The initial publication commit `4f182cb` deployed successfully in [GitHub Actions run 42428123875](https://github.com/WisdomMediumAdmin/WisdomMedium-Web/actions/runs/42428123875). All 14 public pages and five assets returned HTTP 200 and matched the exact build byte-for-byte; internal links and anchors passed and an unknown path returned 404. The owner-confirmation update is validated and deployed separately, with its final live result recorded in the chat report.

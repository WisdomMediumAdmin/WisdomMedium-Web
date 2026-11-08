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

## Remaining website readiness blockers

The owner was asked for these facts during the audit. Do not infer answers from a local username, brand, MX record or an empty app privacy manifest:

1. **Individual legal identity:** exact account-holder/operator name matching Apple Developer membership. Public copy currently identifies an individual operating the WisdomMedium brand without inventing a name or address. Add the confirmed identity and any contact/address disclosures required by the chosen markets.
2. **Support operations:** mailbox receipt/routing, provider and recipients, actual use of messages/attachments, retention period or criteria, and deletion process. DNS advertises `1 smtp.google.com.`; this is not proof of inbox existence, forwarding recipients or deliverability. No test email was sent. The policy explicitly does not specify a fixed support retention period; this remains an incomplete operational disclosure, not approval of indefinite retention.
3. **Apple reports and external access:** whether the owner receives, uses, exports or retains crash/usage/TestFlight reports or accesses app-derived data through integrations outside the inspected code. Do not finalize a Data Not Collected label from this website audit.
4. **Market-dependent legal details:** final launch regions, applicable audience/age treatment and any required legal address or additional rights notice. No jurisdiction, age restriction, registered business status or address was invented.

These facts prevent declaring the policies fully finalized for submission even when their source-backed app descriptions and public routes are deployed. Fill the operational gaps and align App Store privacy answers with actual practices before submission. Store setup and app signing/runtime/encryption checks are outside this website-only task; the source reports retain those independent gates.

## Verification and source preservation

The working-copy check passed TypeScript, ESLint, all 188 tests and a static production build under Node 24.22.2. Browser QA exercised both apps' privacy → terms → support navigation at phone width and the shared terms page at desktop width; inspected phone pages had no horizontal overflow. These are website/browser checks, not physical iPhone app-link or signed-binary validation.

A preexisting coverage/testing overhaul is retained in the working tree and excluded from the website publication commit. Existing SoapyMoney page content is preserved. The exact staged snapshot separately passed `npm ci` with its unchanged lockfile, TypeScript, ESLint, all 16 committed tests and the production build under Node 24.22.2. Deployment does not depend on the uncommitted tests/configuration. Live verification must check deployed HTML, meaningful content, links and assets against that snapshot; a local build or a green deployment alone is not proof of the public content. The final chat report records deployment and live verification results.

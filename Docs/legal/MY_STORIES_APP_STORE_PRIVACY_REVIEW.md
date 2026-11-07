# My Stories — App Store privacy review

Review updated: November 7, 2026. Status: **SOURCE ENGINEERING PASS; owner disclosures and submission validation pending**. No App Store Connect answers were changed or published.

## Release being evaluated

Accepted product: My Stories, bundle `com.wisdommedium.journal`, version 1.0 (1), iPhone only, minimum iOS 18.6. The [website contract](MY_STORIES_WEBSITE_CONTRACT.md) and [release hardening report](RELEASE_HARDENING_20261105.md) were fetched directly from `WisdomMediumAdmin/my-stories` main `7c9217a2bdd045128301a0af703979d707814b50`, also the release-tag target `rc-ios-1.0-1-20261105`. Source engineering passed with 310 tests passed, 0 failed, 3 skipped. Attachment deletion, key retirement/recovery and native legal links are accepted fixes. Physical-device, signed-artifact and App Store checks remain separate. The previous local-development assessment is preserved in `history/MY_STORIES_APP_STORE_PRIVACY_REVIEW_20261105.md` and does not determine current release facts.

The draft website uses `/privacy/#my-stories`, `/terms/#my-stories` and `/support/#my-stories`; the required root URLs remain `/privacy/` and `/terms/`. Draft coverage is not evidence of publication. No public My Stories App Store URL has been verified; listing remains “Coming soon.”

## Rules applied

Apple distinguishes on-device processing from off-device collection retained beyond a real-time request. Optional disclosure for support requires **all** criteria: no tracking, advertising/marketing or “Other Purposes”; infrequent, optional activity outside primary functionality; a clear in-app submission showing the user's name/account alongside the data; and affirmative submission each time. An external email composer does not establish those criteria automatically. Ongoing diagnostics after one consent are not exempt on that basis. Apple's separate Product Improvement Programs exception also has multiple conditions, including explicit reversible opt-in and unlinked data; it is not established here. Apple-only collection and developer receipt/use through Apple services require separate consideration. These are interpretations to verify against the final flow. [Apple App Privacy Details](https://developer.apple.com/app-store/app-privacy-details/).

App Privacy responses describe the app across its distributed platforms. They must reflect the released version, and owners must maintain them when behavior changes. The proposed answers below remain unsubmitted. [Manage App Privacy](https://developer.apple.com/help/app-store-connect/manage-app-information/manage-app-privacy/).

## Proposed decisions and evidence

| Area | Inspected behavior / website treatment | Proposed answer or decision |
| --- | --- | --- |
| Tracking | No advertising, tracking SDK or app-operated analytics integration found. Manifest says tracking false. | **No tracking**, subject to final binary/dependency and provider-use verification. No evidence supports an advertising identifier or cross-company advertising profile. |
| Journals and preferences | Local text, dates, formatting, media and identifiers; no app-managed account/server; cloud release flag false. | Local-only data is **not developer collection** merely because it exists on device. Do not label all journal text/photos/location metadata as collected. |
| Attachments | Explicit selection; ordinary files and database payloads; possible embedded location. | On-device attachment handling does not establish collection. If user later sends media to support, evaluate that separate flow. |
| Backups | Ordinary library, managed attachments and database sidecars/support directories are eligible for Apple-managed device backup. Protected keys remain device-bound; protected previews are excluded. Backup/restore hardware validation is outstanding. | Do not infer cloud sync or developer access from Apple backup eligibility. Eligibility is not proof of backup completion or replacement-device recovery. |
| Support email | `support@wisdommedium.com` receives messages in business Gmail. Sender address, message and chosen files leave the device. No automatic journal upload found. | **Owner decision required.** If treated as app collection without a fully supported exception, disclose Email Address and Customer Support, normally linked to the sender, for App Functionality. Name is conditional on actual collection; specific requested media/diagnostics require their categories. Do not assert every possible detail in a free-text message is separately solicited. |
| User-provided diagnostics | OSLog persistence diagnostics exist; users may deliberately send screenshots/logs. No automatic remote logging service found. | If collected and not exempt: Crash Data, Performance Data and/or Other Diagnostic Data according to actual contents. Email attachments are generally linked to the sender. App Functionality covers troubleshooting; add Analytics if used to analyze behavior or plan features. Confirm actual use and retention. |
| Apple-mediated diagnostics | No App Store Connect / Organizer evidence inspected. | Inventory crash reports, TestFlight feedback, metrics, exports and recipients. Do not declare “nothing received” without checking. Determine whether actual developer-held data requires disclosure or qualifies for a documented exception. |
| Website visits | Static GitHub Pages; no site analytics/cookie scripts found. GitHub security IP logging is disclosed separately. External browser links require user action. | Do not automatically classify independent website traffic as app collection. Verify whether final app embeds a web view, passes identifiers, or the operator receives/links web logs to app users. None was found in this source scan. Reassess if present. |
| Third-party recipients | Google email services and sender's provider process support mail; GitHub/CDN process website requests; Apple handles device/platform functions. | Document recipient roles, actual developer access and retention. Provider identity alone does not prove an advertising purpose. Forwarding/ticketing/subprocessors remain owner checks. |
| Data linkage | Local journal identifiers stay local in inspected configuration; support email identifies sender. | Do not mark emailed reports unlinked merely because no app account exists. Anonymization must happen before collection with no relinking; none verified. |
| Purchases | No IAP/subscription implementation found in iPhone source. App Store initial price not verified. | Do not claim a free app or invent purchase-history collection. Verify any Apple sales/report access separately. |

**“Data Not Collected” is not approved.** It may be appropriate only if the final release has no disclosable collection after support, diagnostics, Apple-service receipts and exception decisions are resolved. Conversely, local journals must not be called collected without an applicable off-device basis. The empty `NSPrivacyCollectedDataTypes` manifest is evidence about the manifest, not a substitute for the questionnaire.

Apple's analytics dashboard includes app usage and crash metrics. Their availability does not establish which data this owner accesses, exports, retains or links. Obtain the actual account workflow, including whether collaborators or outside tools receive exports. [Apple Analytics dashboard](https://developer.apple.com/help/app-store-connect-analytics/overview/analytics-dashboard).

## Owner verification record required

1. Identify the signed iPhone release build and complete hardware/backup/restore/upgrade validation. The final source contract, backup policy and disk-backed deletion regressions are accepted; do not request them again as unresolved engineering work. Obtain owner acceptance of device-bound recovery limitations.
2. Inspect the actual support invocation/submission UX, data preview, name/account display and affirmative send action. Decide whether email is outside app collection or qualifies for an exception; retain the rationale. Until resolved, use the conditional collection route above for review rather than finalizing “No.”
3. Confirm support access, forwarding, processing purposes, retention/deletion, backups and legal holds. Resolve any marketing reuse; draft policy assumes support purposes only.
4. Review App Store Connect Analytics, Xcode Organizer and any TestFlight export/feedback practice. Record exact categories, linkage, purposes, retention and recipients. Update the public policy if developer-received diagnostics are used.
5. Recheck bundled SDKs, entitlements, privacy manifest and app-controlled network behavior in the final binary, not only this working source.
6. With an authorized Account Holder/Admin/App Manager, open My Stories → App Privacy, enter only approved answers, inspect Product Page Preview, and verify the policy URL is public. Publishing answers is a separate owner action; this task does not do it. [Apple instructions](https://developer.apple.com/help/app-store-connect/manage-app-information/manage-app-privacy/).

## License decision

The drafted website terms preserve Apple's Standard EULA; they do not install a custom agreement. The owner must verify that App Store Connect is configured accordingly. Apple's standard agreement addresses installation/use restrictions and applicable-law/open-source exceptions. [Standard EULA](https://www.apple.com/legal/internet-services/itunes/dev/stdeula/).

No custom EULA was requested or prepared. If the owner chooses one later, separately review all ten Apple minimum areas: acknowledgment, license scope, support, warranty, product claims, IP claims, legal compliance, developer name/address/contact, third-party terms and Apple beneficiary rights. Missing operator identity/address prevents completing that route accurately. [Minimum EULA requirements](https://www.apple.com/legal/internet-services/itunes/dev/minterms/).

Custom terms require explicit App Store Connect configuration: Apps → My Stories → General / App Information → License Agreement → Edit; enter reviewed plain text, select applicable countries/regions, Done, Save. Website publication alone does not do this. [Custom license configuration](https://developer.apple.com/help/app-store-connect/manage-app-information/provide-a-custom-license-agreement).

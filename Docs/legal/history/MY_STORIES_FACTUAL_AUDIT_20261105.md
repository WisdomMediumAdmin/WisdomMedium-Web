# My Stories website factual audit

Inspected November 5, 2026, America/New_York. This is a source-backed draft audit, **not final release certification or attorney approval**.

## Website and deployment

React 19 + TypeScript + Vite; `scripts/prerender.tsx` writes static directory-index HTML for route metadata in `src/routes.ts`. No backend. Existing navigation: Apps, About, Support, Contact; footer originally Support, Contact, Privacy. This change adds Terms and My Stories destinations without removing existing routes.

Git remote: `https://github.com/WisdomMediumAdmin/WisdomMedium-Web.git`. Existing workflow deploys GitHub Pages after validation on `main` pushes or manual dispatch. Pull requests validate only; no preview/staging deployment was configured. The draft adds a fail-closed publication approval check and restricts publishing steps to `main`, including manual runs. No remote branch push, workflow dispatch, Pages publication or account change was performed.

Live inspection at approximately 18:15 EDT (23:15 UTC): `/` 200; `/#apps` is the same HTTP resource and the HTML contains `id="apps"`; `/privacy/` 200 with WM Pebbles only; `/terms/` 404. Both My Stories and the working-tree SoapyMoney additions are absent from live HTML. HTTP `Server: GitHub.com`, GitHub edge headers, Varnish/Fastly cache headers and GitHub Pages A records support the hosting determination. Headers, HTML and resource hashes are in `evidence/`. `last-modified` is September 23, 2026, not evidence of this draft being published.

Live JavaScript/CSS and repository source contain no analytics/advertising SDK, tracking pixel, third-party font/embed, application cookie writer or local-storage visitor profile found in this audit. Page assets are same-origin; external URL strings in the script were React documentation, XML namespaces and the site's own domain. Initial HTTP responses set no cookies. This is not an audit of provider internal logs, retention or account configuration. GitHub confirms Pages logs/stores IP addresses for security. [GitHub Pages data collection](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages#data-collection).

## Support and operator

Confirmed public address: `support@wisdommedium.com`. MX observed: `1 smtp.google.com.` A targeted read-only search of the connected business Gmail account showed received mail addressed to that support address (latest sampled October 22, 2026). This establishes inbound delivery to Google email, not a response SLA, outbound identity, staff access policy or end-to-end reply test. No test email was sent. No message content, sender details or private message IDs are committed to this repository.

Only the WisdomMedium brand and support contact are established by the website. Account profile names, Git authors and signing teams do not establish the legal contracting entity or incorporation. Legal person/entity, jurisdiction, required address/contact details, distribution regions and audience are **unverified**. Do not infer LLC/corporation status or select arbitration/governing law from the brand.

Support forwarding, delegates, third-party ticketing, retention duration, trash/backup lifecycle, legal holds, access controls, request verification and applicable rights deadlines remain **owner decisions**. Draft language about using messages for support and keeping mailbox correspondence is proposed practice, not a verified complete retention policy. No claims of fixed automatic deletion or guaranteed erasure are made.

## Application evidence and conflicts

Application checkout (read-only): `/Users/kazisiam/Desktop/WisdomMedium/My Stories`, branch `codex/my-stories-development`, HEAD `1ef2bfcd32c2d3fd49f1c41b99e3863448b1caa4`. Many staged/unstaged changes exist. Hashes in `evidence/app-source-hashes.json` identify files read; HEAD alone does not represent these bytes. No app files, simulator data or release settings were changed.

Neither `Docs/Release/MY_STORIES_WEBSITE_CONTRACT.md` nor `Documentation/LegalAudit/2026-11-02/` exists in the checkout. A filename search elsewhere under the user's accessible files did not locate the final contract. Older October release notes are explicitly historical. The pasted user facts are a provisional baseline, not final verification.

| Fact | Source evidence relative to My Stories checkout | Finding / publication impact |
| --- | --- | --- |
| Identity | `Apple/Journal.xcodeproj/project.pbxproj` | `com.wisdommedium.journal`, marketing version 1.0; QA suffix variants exist. Must inspect signed release metadata. |
| Minimum OS / family | Same project, Release configuration around lines 632–648 | **iOS 27.0**, family 1 in the app configuration inspected. Other configurations include 1,2,7. Conflicts with owner-mandated 18.6. Website does not advertise 18.6 or iPad/macOS availability. Engineering must reconcile final build. |
| Cloud | `Apple/Journal/JournalReleaseFeatures.swift`; `Writing/Features/JournalLibraryCoordinator.swift`; `Writing/Infrastructure/WritingStore.swift` | Release flag false; guarded cloud selection; ordinary model configurations `.none`. Later cloud/key code exists but must not be advertised as active. |
| Local storage | `Writing/Models/WritingRecord.swift`, `WritingService.swift`, `AttachmentStorage.swift`, `WritingAttachmentAsset.swift` | SwiftData records and managed files; database assets can also retain ordinary attachment bytes. No journal account/backend integration found. |
| Backups | `Writing/Infrastructure/JournalFileProtection.swift`; `Writing/UIKit/JournalSettingsScreen.swift:216` | **Current code excludes library directory/store support files and attachments from backups.** Settings also warns about exclusion. This supersedes the broad provisional “ordinary content may be backed up” description for these paths. No runtime backup/restore experiment conducted. Earlier/other copies remain separate. |
| Protection | `Writing/Models/WritingProtection.swift`; `Writing/Features/JournalsApplication.swift` | Local SystemWritingKeyAccess, AES-GCM, user-presence access, `kSecAttrAccessibleWhenPasscodeSetThisDeviceOnly`. Metadata and earlier copies are not promised encrypted by entry lock. Replacement-device recovery not guaranteed. |
| Trash | `WritingService.swift:241–280`; `Writing/UIKit/JournalDeletedEntriesScreen.swift` | Recoverable deletion retains record/media, no expiry. Permanent delete removes canonical record, attempts protected-key cleanup and file collection. |
| Attachment defect | `WritingService.swift:241–260,285–301,320–345`; `AttachmentStorage.swift:157–182` | **No verified correction.** Deletion removes WritingRecord; collection removes eligible managed files but does not purge all WritingAttachmentAsset database rows/payloads. Hydration can read retained bytes. Draft explicitly discloses remnants. No fresh app runtime deletion tests run in website task. |
| Undo/recovery | `Writing/Features/WritingSession.swift`; `Writing/Models/JournalPendingDraft.swift` | Bounded editor undo, leases, pending recovery sidecars; cleanup defers when pending recovery exists or references cannot safely be decoded. No universal retention interval. |
| Media / permissions | `Writing/UIKit/WritingViews.swift`; project Face ID description; `JournalSettingsScreen.swift:240` | System photo/file selection, owner authentication, optional local notification authorization. No location permission found. Selected media may carry metadata; originals remain independent. |
| Tracking / purchases | App source search; `Apple/Journal/PrivacyInfo.xcprivacy` | No third-party advertising/analytics or StoreKit purchase code found; manifest tracking false, collected types empty. This does not settle support or Apple-received reports. |
| Diagnostics | `Writing/Infrastructure/PersistenceDiagnostics.swift` | Local OSLog timing/correlation/error diagnostics. No automated developer upload found. Apple account usage/export practices unverified. |
| Legal/support URLs | Whole `Apple/Journal` source search | Requested website paths preserved. Search did **not** find `wisdommedium.com` links in the current app source; final in-app destinations/acceptance flow still require release contract verification. Do not claim an acceptance checkbox. |
| Artwork | `Apple/Journal/Assets.xcassets/AppIcon.appiconset/AppIcon.png` | Existing app icon copied byte-for-byte; no generated replacement. Final release/owner artwork approval remains part of contract. |

## Required engineering evidence before factual sign-off

Provide the final contract tied to a signed release/source snapshot; verify OS/device family and known website links; resolve backup policy; demonstrate deletion of ordinary/protected attachments from files **and database assets**, including shared references, pending drafts, live undo leases, corrupt data and cleanup failures. Update both website deletion text and App Store review only after that evidence. Preserve limitations for backups, originals, OS remnants and secure erasure even after a fix.

## Version history

- September 23, 2026: live artifact last-modified header; WM Pebbles coverage observed.
- November 2, 2026: existing local policy draft date, including SoapyMoney. Retained without reauditing those apps.
- November 5, 2026: this unpublished website/My Stories review draft. No effective date assigned; owner must choose it on approval.

# My Stories website factual audit

Updated November 7, 2026 (America/New_York). **Accepted source engineering: PASS. Legal-owner approval: PENDING.**

## Authoritative source

Read directly from `WisdomMediumAdmin/my-stories` on GitHub, not the old local development checkout:

- Main: `7c9217a2bdd045128301a0af703979d707814b50`.
- Release tag: `rc-ios-1.0-1-20261105`, resolving to that same commit.
- [Website contract](https://github.com/WisdomMediumAdmin/my-stories/blob/7c9217a2bdd045128301a0af703979d707814b50/Docs/Release/MY_STORIES_WEBSITE_CONTRACT.md), retained verbatim in [MY_STORIES_WEBSITE_CONTRACT.md](MY_STORIES_WEBSITE_CONTRACT.md).
- [Release report](https://github.com/WisdomMediumAdmin/my-stories/blob/7c9217a2bdd045128301a0af703979d707814b50/Docs/Release/RELEASE_HARDENING_20261105.md), retained verbatim in [RELEASE_HARDENING_20261105.md](RELEASE_HARDENING_20261105.md).

Both files were fetched at main and the pinned commit and matched. Blob IDs and tag provenance are in `evidence/accepted-release-source-20261107.json`. Validated implementation: `a30ad8956956de57e521cb3ed1f0ecb6ca5b79ec`; final main adds documentation. Application test results below are reported release evidence, not website-task reruns.

## Accepted facts and website treatment

| Area | Accepted fact and resulting disclosure |
| --- | --- |
| Identity | My Stories 1.0 (1), `com.wisdommedium.journal`, iPhone family [1], minimum iOS **18.6**. No invented store URL or iPad/macOS/Android availability. Old 27.0 finding superseded. |
| Source acceptance | **310 passed, 0 failed, 3 skipped** in final unit/native suite; native legal links integrated; source pushed to main. Physical-device and App Store gates remain separate. |
| Local journals | SwiftData/SQLite, managed files and attachment payload rows; no account, app-operated upload or active CloudKit sync. Ordinary OS sandbox/file protection differs from per-entry encryption. |
| Selected media | Explicit photo/file selection, 50 MiB limit, original bytes can retain metadata; no broad library scan or direct recording. Provider downloads and independent imported originals disclosed. |
| Backups | Ordinary store, sidecars/support directories and attachments eligible for Apple-managed backups; former exclusions cleared. Eligibility is not backup/restore proof. Protected previews excluded; protected keys remain device-bound. |
| Protection/recovery | AES-GCM/device-bound Keychain/device-owner authentication; no missing-key regeneration. Ciphertext preserved when key missing; authenticated confirmed deletion permits no read access. Protected clipboard expiry cannot erase other copies; ordinary App Switcher content may remain visible. |
| Permanent deletion | Unreferenced attachment rows/payloads and managed files collected; disk-backed regressions verify external payload removal. Former attachment defect fixed. Canonical entry removed; content-free UUID/date tombstones prevent resurrection. |
| Key cleanup | Durable retirement intent/retry, active-editor/undo invalidation and late recovery/authentication guards completed. Interrupted cleanup or unsafe reference data can defer collection; startup/later collection and Settings retry disclosed. |
| Retention | Shared/trash/live-edit/undo/legitimate recovery references retained; Deleted Journals has no expiry. No forensic erasure of database history, flash, Photos originals, exports, backups, caches or third-party copies. Uninstall is not comprehensive erasure. |
| Reminders/network | Local opt-in reminder contains no journal content. Browser, native previews, media and OS services are separate. No absolute network-silence or universal no-collection claim. |
| Legal links | Native About links use exactly `https://wisdommedium.com/privacy/` and `https://wisdommedium.com/terms/`. Website retains those canonical roots and adds My Stories anchors. |

## Remaining validation and owner decisions

Source acceptance does not establish physical Data Protection, real biometric/passcode behavior, same/replacement-device restore, passcode-removal consequences, signed upgrade, iOS 18.6 runtime behavior, hardware notifications or full spoken VoiceOver traversal. Distribution signing, signed privacy report, App Store Connect answers, encryption questionnaire and store metadata remain owner-operated submission gates. The release report explicitly states App Store submission is not ready.

Legal operator, jurisdiction/address, regions/audience, effective date, commercial terms/EULA, support access/forwarding/retention/deletion, Apple diagnostic receipt/use and actual provider arrangements remain owner decisions. `publication-approval.json` stays pending. Source PASS is not legal approval. See [owner review](MY_STORIES_OWNER_REVIEW.md) and [App Store review](MY_STORIES_APP_STORE_PRIVACY_REVIEW.md).

The website remains static GitHub Pages. Site code has no analytics/cookie/profile integration. GitHub's published [Pages documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages#data-collection), rechecked November 7, describes security IP logging; provider retention/access is not independently verified. Prior support evidence established inbound Google email only, not an SLA or complete business practice. Proposed support wording is explicitly subject to owner review.

## Preservation and status

Commit `e0a68a5` and prerequisite `8f212bf` remain ancestors. Later uncommitted corrections were copied into an isolated checkout without modifying the original checkouts. The superseded November 5 audit remains in [history](history/MY_STORIES_FACTUAL_AUDIT_20261105.md) and Git history. Its obsolete findings are not current blockers. Existing WM Pebbles and SoapyMoney policy text is preserved.

See [current verification](VERIFICATION_20261107.md) for tests and Git delivery. A pushed branch is not a merge, deployment or successful public-policy verification.

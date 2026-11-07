# My Stories release hardening — 5 November 2026

SOURCE ENGINEERING: PASS

APP STORE SUBMISSION: NOT READY

The source gate covers the confirmed lifecycle/privacy fixes, successful complete unit/native suite, selected actual UI journeys and unsigned iPhone Release validation. Physical-device, legal publication and distribution-signing requirements below remain submission gates.

This report supersedes the current-status statements in the November 2 acceptance report; that report and its evidence remain historical records. Source acceptance and owner-operated submission gates are separate. No Apple upload, App Store Connect change, account change or publication is authorized or performed here.

## Baseline and scope

Freshly fetched `origin/main` was `2d232b048a0232821088d2f9f652dbff3f243bdd`. Work continued in isolated branch `codex/release-hardening-20261105`, initially at that exact commit, in `/private/tmp/my-stories-hardening-20261105`. The original dirty `codex/my-stories-development` checkout was not used for edits, builds or branch changes. Its 338 recorded paths and index were hashed before work. Missing/prunable historical worktree registrations, all existing branches and the old RC tag were preserved.

Permanent identity remains `com.wisdommedium.journal`, display name **My Stories**, version **1.0 (1)**, minimum iOS **18.6**, iPhone family **[1]**. The build number is preserved, not verified unused in App Store Connect. No iPad, native macOS or Android distribution is activated.

## Defects and resulting behavior

| Severity | Finding | Resolution and evidence |
|---|---|---|
| P0 release blocker | Permanent deletion removed journal/file references but left SwiftData `WritingAttachmentAsset` rows and external payload bytes. | Collector validates the complete ordinary/trash/recovery/live-editor graph, removes unreferenced rows transactionally, then collects managed files. A disk-backed test proves a real 300 KB external payload exists before deletion and no longer exists afterwards, including store reopen. |
| P1 | Interrupted protected deletion could leave encrypted rows, files and device-bound keys with no durable retry intent. | Additive `WritingKeyRetirement` model is inserted in the same transaction as deletion or removal of protection. Startup/collection drains it idempotently; failed key removal preserves the intent. Existing current/legacy protected references remain protected. |
| P1 | A stale editor or late recovery write could retain/recreate state after permanent deletion. | Permanent deletion invalidates registered editors and their undo buffers; UUID tombstones reject stale saves/recovery resurrection. The vault rejects late recovery and authentication for retired keys. Deterministic suspended-authentication test covers the latter race. |
| P1 | Row cleanup could be unsafe around undo, shared assets, recovery, missing files and concurrent commits. | Retain live sessions, undo/prepared-save leases, trash and pending drafts; validate all reference data; use generation boundaries and newer-commit retentions. Missing local files no longer prevent row cleanup. Overlapping deletion requests coalesce into a fresh pass; continuous editing is bounded to three passes and exposes a retry if still busy. Unknown/corrupt recovery fails closed and exposes pending cleanup with a retry control. |
| P1 | Locking an attachment also needed by ordinary recovery could delete the needed plaintext. | Protection checks ordinary pending recovery and other active sessions, plus rechecks the saved reference graph before commit. Shared assets prevent locking until resolved. Removal of protection leases the replacement ordinary media until commit. |
| P1 | Restored ciphertext with a missing device-bound key could become impossible to intentionally delete. | A missing-key result after successful device-owner authentication permits a deletion-only grant. It cannot decrypt, recreate keys or bypass denied authentication. Missing-key open still preserves ciphertext and reports the recovery limit. Physical authentication remains an owner gate. |
| P2 | Earlier legal-link work was not integrated into accepted main. | Reused the preserved November 2 patch: native Settings → About links, English fallback/string catalog, VoiceOver labels/browser hints. Added navigation, maximum Dynamic Type, dark appearance and orientation UI checks. |
| Test fixture | Existing broad tests assumed an exact QA suffix/old backup exclusion, mounted media without a window, or assumed eight table rows always overflowed. | Updated stale expectations to the accepted backup policy and suffix contract; mounted native views in a real window; scrolled offscreen media into view; used 24 rows and bounded Dynamic Type propagation waits. Assertions remain meaningful and were not removed. The final fixture pass also mounts native fixture descendants without modifying the SwiftUI-owned hosting root, restores the prior key window after video stress, and allows a bounded eight seconds for queued trait propagation. Retired-key expectations now assert both an expired grant and actual removal of the underlying key. |

Deletion is logical active-storage cleanup, not forensic erasure. Unreferenced payload rows and managed files are removed; content-free UUID/date tombstones remain to prevent resurrection. System backups, Photos originals, exports, third-party copies, SQLite free pages/WAL history and flash remnants are not promised erased. Corrupt/unknown recovery intentionally defers collection until a safe reference graph can be established; Settings reports the pending state.

## Tests and actual coverage

Toolchain: Xcode 27.2 (27B52), Apple silicon, installed iOS 27.0/27.2 simulator runtimes. Unique test bundle suffix `.hardening20261105.v2qa`; every UI test requires the isolated QA marker and uses synthetic journals. No personal journal database was opened.

| Run | Actual result | Interpretation |
|---|---|---|
| First lifecycle compile attempts | Three compile failures, retained | New test actor wrapper hit Swift isolation/implicit initializer issues; replaced with an independent test actor before executing tests. |
| `Lifecycle4.xcresult` | 17 passed, 0 failed, 0 skipped | Initial lifecycle and attachment cases. |
| `Regression.xcresult` | 310 total; 300 passed, 6 failed methods (7 assertions), 4 skipped | Exposed stale fixture assumptions listed above. See raw result; not a passing run. |
| `Affected.xcresult` | 39 passed, 1 failed | Remaining table-scroll fixture did not overflow its actual scene viewport. Corrected to 24 rows without weakening assertions. |
| `RegressionFinal.xcresult` | 307 passed, 0 failed, 4 skipped (311 total) | Full app unit/native suite before the last retired-authentication guard. 170.750 seconds test execution. |
| `AcceptanceUnit.xcresult` | 307 passed, 3 failed, 3 skipped (313 total) | New races and 100-cycle video passed; one old retired-key error expectation and two appearance-fixture timeouts failed. Retained with stack samples. |
| `AcceptanceFinalUnit.xcresult` | 309 passed, 1 failed method (2 assertions), 3 skipped | An intermediate test-host containment change stopped SwiftUI applying the explicit theme. The hosting root was restored; only the fixture child views moved. |
| `AcceptedUnit.xcresult` | **310 passed, 0 failed, 3 skipped (313 total)** | Final complete unit/native suite, including all 19 new legal/privacy lifecycle tests, five attachment lifecycle tests and 100 video lifecycle cycles. 163.534 seconds test execution. |
| `UIPhoneSE.xcresult` | 10 passed, 2 failed, 0 skipped | Initial 12-method run. Failures: a 24-point margin assumption on the home-button phone (actual 20 points) and AVKit control auto-hide during AX re-query. |
| `UIPhoneSEFinal.xcresult` | **6 passed, 0 failed, 0 skipped** | Final confirmation of keyboard/formatting, media resize/playback/persistence, typed maximum-text navigation, date/lock cancellation and both legal tests. Together with the initial run, all 12 selected unique small-phone methods have passing evidence; this is not a single 12/12 rerun. |
| `UIPhoneLarge.xcresult` | 2 passed, 1 failed, 0 skipped | Dark navigation/clock/editor and maximum-text navigation passed. Legal portrait passed; after rotation, XCTest application-level swipeUp synthesized horizontal drags and never reached the links. Recording and event coordinates retained. |
| `UIPhoneLargeLegalFinal.xcresult` | **1 passed, 0 failed, 0 skipped** | Corrected form-relative drag; both portrait and landscape legal checks pass in 56.574 seconds. All three selected larger-phone methods now have passing evidence across the two runs; no shipping source changed. |
| Release helper tests | 19 passed, 0 failed | Identity, capabilities, deployment, resource and QA-boundary checks. |

The earlier broad run had four skipped cases; the final broad run has **three**:

1. `FileProtectionBoundaryTests`: simulator does not expose real device file-protection classes even for the control file.
2. `JournalPhysicalProtectionTests`: actual device-owner authentication unavailable in the simulator.
3. `WritingTransferTests` cross-app source exporter: independent source fixture path absent; inactive for the local first release.

The initially skipped 100-cycle native video test was subsequently supplied with the repository's synthetic movie through `TEST_RUNNER_WM_SYNTHETIC_VIDEO_BASE64` and passed in the final complete suite. Five independent native positive-video lifecycle tests also passed.

Other unexecuted scope: complete UI suite/localization matrix, physical backup/restore and signed upgrade, iOS 18.6 runtime, prolonged real-device memory/energy measurements, hardware biometric cancellation/lockout/passcode changes, notification delivery/denial on device, and full spoken VoiceOver traversal. None is inferred from label checks. Dormant cloud/portable-transfer code remains in the coverage denominator and is not activated to inflate coverage.

Measured **app-wide Xcode line coverage** from the full unit/native run: **7,131 / 13,994 = 50.9575532371%**. This is not the historical focused 34.8291%, not full UI coverage, and not a 90% app-wide claim.

| Critical modified module | Covered / executable lines | Actual line coverage |
|---|---:|---:|
| WritingService.swift | 1,063 / 1,129 | 94.15% |
| AttachmentStorage.swift | 138 / 146 | 94.52% |
| WritingSession.swift | 423 / 457 | 92.56% |
| JournalPendingDraft.swift | 70 / 70 | 100% |
| WritingProtection.swift | 282 / 355 | 79.44% |
| WritingStore.swift | 69 / 74 | 93.24% |
| WritingAttachmentAsset.swift (includes retirement model) | 10 / 10 | 100% |
| JournalsApplication.swift | 60 / 218 | 27.52% |
| JournalSettingsScreen.swift | 18 / 564 | 3.19% in unit/native run; 63.65% (359/564) in the six-test final small-phone UI run |

The 90% target is met for the service/storage/session/recovery/store/model modules, not the entire protection module or application/UI files. `AppLegalLinks.swift` constants have no separately emitted executable-line entry in this report. Startup and screen coverage are not inferred from model tests. Hardware authentication and dormant portable paths remain gaps. **App-wide branch coverage: unavailable.** LLVM export from the matching app binary/profile reports zero emitted branch counters (count=0); that is neither 0% nor 100% branch coverage. Region coverage is a different metric and is not substituted. Critical-module branch coverage is likewise unavailable. No source exclusions were added. The six-test final small-phone UI run separately measured 4,634/13,994 app lines (33.1142%); it is not added to the unit percentage, because the executed lines overlap. All raw coverage reports and the matching instrumented binary/profiles are retained.

Measured performance in the broad run: 2,400 entries across 36 months, dense month 500 entries and 500 autosaves completed in 10.7961s; 100 unique 1024×768 photo decodes p50 6.656ms/p95 8.167ms; 500 programmatic native insertions/document captures p50 5.430ms/p95 11.663ms. The 2,000-entry projection/search/open-close/autosave stress suite passed. These are instrumented operations, not display/input latency or real-device energy/memory guarantees. Two test-fixture AVAssetWriter QoS diagnostics remain visible in the final result bundle; the unsupported hosting-root fixture mutation was corrected. No warnings were suppressed. One diagnostic sample of the instrumented test app measured 72.4 MB footprint and 150.4 MB peak; this is not a production-device memory budget.

## Actual UI inspection

Computer Use successfully selected the task-owned small iPhone, inspected its overview and editor, created a synthetic entry with the date-derived title, tapped a native software key and accepted the visible `The` predictive suggestion. A subsequent native formatting call timed out and reset the CUA runtime. XCTest completed the bounded real-UI journeys; screenshots come from the current executable rather than old acceptance evidence. Browser CUA independently inspected both public legal destinations. A later direct CUA check enabled Reduce Motion on the disposable QA simulator and inspected the settled home screen; no complete motion or spoken VoiceOver matrix is claimed.

The initial 30-screen review is indexed in `ui-reviewed-screens.json`, with original PNGs in `ui-se-attachments` and five contact sheets `ui-review-1.jpg` through `ui-review-5.jpg`. Exact caption-to-file mappings are preserved. Scores below apply only to settled, inspected states; the initial landscape app-crop and keyboard/rotation transition captures are excluded. Final full-screen landscape and typed maximum-text captures were independently inspected in `ui-se-final-review.jpg`. Browser screenshots prove the selected URL in Safari, while separate HTTP/browser inspection proves the deployed page status.

| Inspected state | Score | Current evidence caption |
|---|---|---|
| Home, light/dark empty and native navigation | 9/10 | `release-empty-home`, `dark-home` |
| Entries, populated light and empty dark | 9/10 | `journey-08-entries-populated`, `dark-Entries` |
| Calendar, populated selected date / dark empty date | 9/10 | `journey-12-calendar-today-populated`, `dark-Calendar` |
| Ordinary editor, date title and native suggestions | 9/10 | `dark-editor-writing`; direct CUA key/prediction interaction |
| Compact formatting with keyboard; expanded panel without keyboard | 9/10 | `TC-0112-dark-formatting`, `format-transition-keyboard-hidden` |
| Photo wrapping and actual moved-media cold reopen | 9/10 | `media-default-wrap`, `media-drag-persisted` |
| Native inline video, paused/playing and imported-media reopen | 9/10 | `media-native-paused`, `media-native-playing`, `picker-video-cold-reopen` |
| Settings, Privacy disclosures and appearance choices | 9/10 | `release-settings`, `release-privacy-top`, `release-privacy-protected-disclosure`, `release-appearance-options` |
| Insights, dark | 9/10 | `release-insights-dark` |
| Lock confirmation, cancel/preserved entry | 9/10 | `release-compact-lock-confirmation` |
| Deleted Journals, restored empty state and permanent-delete confirmation | 9/10 | `release-deleted-journal-settled`, `release-deleted-empty-after-restore`, `permanent-confirm`, `permanent-confirmed-synthetic-only` |
| Content search with native keyboard | 9/10 | `journey-14-content-search-result` |
| About/legal rows, normal light and maximum text dark portrait | 9/10 | `journal-privacy-policy-settings`, `legal-largest-dark-1` |
| Small iPhone maximum-text typed editor, formatting and full-screen legal landscape | 9/10 | Final `release-larger-text-formatting-dark`, `legal-largest-dark-3`; actual “Hi” input and 44-point legal targets asserted |
| Larger iPhone home/entries/calendar/settings, clock customization and native editor/formatting | 9/10 | `ui-large-review-1.jpg` and `ui-large-review-2.jpg`, original PNG mapping retained |
| Larger iPhone maximum text home/editor/settings/privacy and portrait legal rows | 9/10 | `ui-large-review-2.jpg` and `ui-large-review-3.jpg` |
| Larger iPhone maximum-text legal landscape | 9/10 | Final `legal-largest-dark-3` in `ui-large-legal-final-attachments`; both labels fully readable above the tab bar |
| Error/loading/cleanup-retry UI, actual biometric dialogs, physical spoken VoiceOver | Not scored | Not directly visually evaluated in this run; source/unit behavior and manual gates are separate |

Scores are visual judgments of named screenshots only. They do not certify uninspected screens, all locales, real iOS 18.6 rendering, physical VoiceOver speech or every Dynamic Type/orientation permutation. No redesign was introduced.

## Privacy, security and artifact audit

- Shipping local SwiftData configuration uses `.none` for CloudKit and `JournalReleaseFeatures.cloudSyncEnabled == false`; empty iPhone entitlements. Preserved dormant sync/portable code is not a shipping feature.
- No app-operated journal upload, account API, third-party analytics/tracking SDK or third-party package dependency was found. Native browser links, Photos retrieval, Quick Look and OS diagnostics can have separate OS/network behavior; this was source/artifact review, not packet-capture proof of all system traffic.
- Ordinary records, attachment files and SQLite sidecars/support directories are eligible for Apple-managed backups. Eligibility is not backup completion or restore proof. No universal app-level encryption claim is supported.
- Protected entries remain AES-GCM with 256-bit keys, authenticated additional data and device-bound `WhenPasscodeSetThisDeviceOnly` Keychain items requiring user presence/device-owner authentication. Missing keys are not regenerated; replacement-device recovery is not promised. Existing key-service identifiers and ciphertext format are unchanged.
- Protected list/search projections are blanked; inactive/background concealment and preview revocation remain. Ordinary App Switcher content can remain visible. Explicit protected clipboard copies are local-only with 60-second expiry; clipboard-history erasure cannot be guaranteed.
- Imported original photo/video/file bytes can retain metadata (including embedded location). Downsampled thumbnails are in memory. No direct camera/microphone recording or broad library scan is implemented; PhotosPicker/files require selection and a 50 MiB per-attachment limit applies.
- Local reminder permission is requested when enabled; notification body is generic `Time to write.`, without journal content. Real permission-denied/delivery behavior remains a physical-device check.
- Audited persistence logs contain normalized error domain/code and random operation correlation, not journal text/filenames/keys. No in-app crash upload SDK. Apple and owner support diagnostics are distinct operational flows.
- Manifest: no tracking/no declared collected data; FileTimestamp C617.1/3B52.1, UserDefaults CA92.1 and SystemBootTime 35F9.1 remain tied to the audited paths. The owner must review the final signed privacy report and current App Store definitions. No unsupported export exemption flag was added.
- iOS 26+ visual API uses remain availability-guarded with native/material fallbacks. No new post-18.6 API is needed by the hardening changes. No installed 18.6 runtime or available physical iPhone was found; no runtime was downloaded. The user's iPad was not used as an iPhone release substitute.

The prior unsigned archive passed, with iPhone family [1], Info.plist and Mach-O minimum 18.6, correct name/identity/version/icon/privacy resource, Face ID description, no companion products and expected Apple frameworks. The final archive `ReleaseAccepted/Journal.xcarchive` passed after the retired-authentication and concurrent-collection fixes; executable SHA-256 `5a70db1dce871d6f8556ac398ac8dc9d4de6cc29644de18465ab0f75bfdcf68e`. A successful unsigned archive is not distribution-signing or Organizer validation. Only Apple Development identities were available; no distribution signing/provisioning was performed. `ITSAppUsesNonExemptEncryption` is absent pending the owner's accurate questionnaire decision.

## Website handoff and owner submission gates

[MY_STORIES_WEBSITE_CONTRACT.md](MY_STORIES_WEBSITE_CONTRACT.md) is the factual handoff for a separate website repository task. It labels VERIFIED, UNVERIFIED, NOT APPLICABLE and OWNER DECISION REQUIRED separately.

Runtime website findings on November 5:

- [Privacy Policy](https://wisdommedium.com/privacy/) responds HTTP 200 but visibly covers **WM Pebbles**, not My Stories.
- [Terms of Use](https://wisdommedium.com/terms/) responds HTTP 404 and visibly says the page is not present.

These are submission blockers even if native link navigation passes. This task does not modify the website.

The owner must complete the following before uploading/submitting:

1. In App Store Connect, locate the existing app with exact bundle ID `com.wisdommedium.journal`; verify rights, agreements/tax/banking if applicable, version 1.0 and whether build 1 is unused. If used, increment only `CURRENT_PROJECT_VERSION` to an unused number, rebuild and repeat artifact checks. Do not create a substitute identity.
2. Publish accurate My Stories Privacy and Terms at the exact destinations above using the website contract. Confirm business entity, effective date, support contact, support retention, website logging/analytics, Apple diagnostics access and actual commercial terms. Reopen both links from the final app on iPhone.
3. On a physical iPhone, use a separately isolated QA identity for destructive synthetic scenarios and a preserved upgrade fixture for signed migration. Verify 18.6 when an appropriate device/runtime is available; current iOS; lock/unlock/cancel/denied/passcode fallback; protected concealment/clipboard/preview lifetime; file Data Protection; ordinary backup/restore; missing-key replacement-device behavior; trash/restore/permanent deletion/restart and exact media. Do not delete personal content. Record results and accept the device-bound recovery tradeoff.
4. Verify notification permission denial and delivery, spoken VoiceOver focus/actions/order, Reduce Motion, contrast, keyboard predictions (ordinary versus intentionally restricted protected fields), Dynamic Type and landscape on hardware. Check memory pressure/backgrounding with a large synthetic library and media.
5. Select the correct paid Developer team, obtain/choose valid Apple Distribution signing and App Store provisioning for the existing ID, archive with signing, inspect signed entitlements and Organizer validation. Resolve real signing errors without altering app identity or capabilities. The unsigned archive here is only engineering evidence.
6. Complete App Privacy from actual off-device collection and owner support/diagnostic practices; local processing alone does not establish collection. Review the required-reason API/privacy report and any future SDK additions. Answer export compliance accurately for CryptoKit AES-GCM/device-bound encryption, obtaining any documentation Apple requires; do not assume an exemption.
7. Complete iPhone-only availability, store language/name/subtitle/description/keywords, category, age-rating questionnaire, content rights, price/availability, support URL, public Privacy URL, license/Terms, copyright, review contact and review notes. State no app account is required, cloud sync is disabled and per-entry protection uses device authentication. Supply genuine screenshots at the required iPhone sizes from the final build, without personal content or unsupported features.
8. Only after the gates above and explicit owner authorization, upload/select the signed build, complete TestFlight/App Review testing as appropriate, submit for review and choose the intended release method. No upload/submission is included in this task.

## Reproduction and evidence

Persistent evidence: `/Users/kazisiam/.codex/visualizations/2026/11/05/01a1adfd-7de5-7a12-bec4-9486ecd0001e/MyStories-Release-20261105`. The execution path `/private/tmp/my-stories-hardening-20261105-evidence` is a symlink to that directory, preserving log references. Large binaries/screenshots/xcresults stay outside Git.

```sh
# Choose an already installed, exclusively available iPhone simulator.
export TEST_RUNNER_WM_SYNTHETIC_VIDEO_BASE64="$(base64 < Apple/JournalUITests/Fixtures/ReleasePlayback.mp4 | tr -d '\n')"
xcodebuild -jobs 2 -project Apple/Journal.xcodeproj -scheme Journal -configuration Debug \
  -destination 'platform=iOS Simulator,id=YOUR_QA_IPHONE_UUID' \
  -derivedDataPath /private/tmp/my-stories-owner-check/DerivedData \
  -resultBundlePath /private/tmp/my-stories-owner-check/Unit.xcresult \
  -parallel-testing-enabled NO -enableCodeCoverage YES -only-testing:JournalTests \
  JOURNAL_BUNDLE_SUFFIX=.ownercheck.v2qa CODE_SIGNING_ALLOWED=NO SWIFT_EMIT_LOC_STRINGS=NO test

# Focused actual UI. System-picker tests require a disposable simulator library
# seeded only with synthetic photo/video, never a personal Photos library.
xcodebuild -jobs 2 -project Apple/Journal.xcodeproj -scheme Journal -configuration Debug \
  -destination 'platform=iOS Simulator,id=YOUR_QA_IPHONE_UUID' \
  -derivedDataPath /private/tmp/my-stories-owner-check/DerivedData \
  -resultBundlePath /private/tmp/my-stories-owner-check/UI.xcresult \
  -parallel-testing-enabled NO -enableCodeCoverage YES \
  -only-testing:JournalUITests/JournalLegalLinksUITests \
  -only-testing:JournalUITests/JournalFinalReadinessUITests \
  -only-testing:JournalUITests/JournalPhoneEditorQualityUITests \
  -only-testing:JournalUITests/JournalPhoneJourneyUITests \
  JOURNAL_BUNDLE_SUFFIX=.ownercheck.v2qa CODE_SIGNING_ALLOWED=NO SWIFT_EMIT_LOC_STRINGS=NO test

bash Scripts/validate-iphone-release.sh /private/tmp/my-stories-owner-check/Release
xcrun xccov view --report --json /private/tmp/my-stories-owner-check/Unit.xcresult
xcrun xcresulttool get test-results summary --path /private/tmp/my-stories-owner-check/Unit.xcresult
```

For physical-only tests, use a connected iPhone destination and an authorized development team/signing configuration instead of `CODE_SIGNING_ALLOWED=NO`; retain a unique `.v2qa` suffix and synthetic data. Run `JournalTests/FileProtectionBoundaryTests` and `JournalTests/JournalPhysicalProtectionTests`, and perform the backup/restore/permission/VoiceOver scenarios above. The 100-cycle video test reads `WM_SYNTHETIC_VIDEO_BASE64`; set `TEST_RUNNER_WM_SYNTHETIC_VIDEO_BASE64` to the base64-encoded bytes of `Apple/JournalUITests/Fixtures/ReleasePlayback.mp4` before invoking xcodebuild to reproduce the non-skipped final run. Cross-app transfer requires the source exporter fixture documented in `WritingTransferTests.swift` and is not a first-release gate.

## Final integration and preservation

- Validated implementation/test commit: `a30ad8956956de57e521cb3ed1f0ecb6ca5b79ec`.
- Reviewable branch: `codex/release-hardening-20261105`. A following documentation-only commit records this report and the website contract; it changes no tested application code.
- Accepted tip is identified by the distinct tag `rc-ios-1.0-1-20261105`. `main` and the review branch are fast-forwarded/pushed normally to that tip; exact final local/remote hashes are recorded in `FINAL_RELEASE_VERIFICATION.json` beside this report's persistent evidence copy. No reset, force push, history rewrite or existing-tag movement is used.
- Old `rc-ios-1.0-1-20261102` remains at `1ac2b0e490dcdde08a65d3934f434911a6007c6e`. Original development HEAD remains `1ef2bfcd32c2d3fd49f1c41b99e3863448b1caa4`; all 338 recorded original file hashes and the original staged index are unchanged.
- The missing historical main/legal worktree registrations remain registered. A separate `/private/tmp/my-stories-main-accepted-20261105` worktree permits a normal main fast-forward without repairing, deleting or replacing those registrations. The source worktree remains available for review.
- Deleted only the disposable `My Stories Hardening QA 20261105` simulator (UUID `8740F5FE-A155-4C8B-B049-3770B6904634`), task-created DerivedData and task script bytecode caches. Retained archives, xcresults, failure recordings, screenshots, logs, source hashes and matched coverage binary/profiles outside Git. Used preexisting simulators are restored to their shutdown baseline; no preexisting simulator is reset or deleted.
- No Apple upload, distribution export, App Store Connect mutation, account change or website publication was performed.

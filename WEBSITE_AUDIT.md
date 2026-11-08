# Website privacy, terms and support simplification

Verified November 7, 2026 (America/New_York). Website-only change; no application source or Apple settings changed and neither app submitted. GitHub Pages remains the deployment destination. Historical research and complete prior copy are retained in [docs/legal/archive](docs/legal/archive/README.md).

## Release sources and coordination

The owner explicitly requested read-only coordination. Inventories were requested from **Audit PotatoBeans MVP release readiness** (chat `01a1b720-ce18-7ed2-a548-0116f7766f5b`) and **Audit My Stories iPhone v1 release** (`01a1b724-0c91-7802-868a-bad01976872a`) before publication. Both rechecked source, configuration and existing Release archives. This is not certification of a signed or submitted binary.

| Item | PotatoBeans | My Stories |
| --- | --- | --- |
| Selected source | Clean `release/potatobeans-v1-mvp`, `d68c3b1afa56199282dff25e3ced8279dcf77c53` | Remote `main` and `rc-ios-1.0-1-20261105`, `7c9217a2bdd045128301a0af703979d707814b50` |
| Configuration | `PotatoBeans MVP` / `PotatoBeans Mac Native MVP`, **MVP Release**, `POTATOBEANS_MVP` | `Journal`, **Release**, `JOURNAL_LOCAL_ONLY` |
| Archive source | `6e6f4abc02b6645c292f7ee4ae5c9748d2da3dc4`; later changes documentation only | Accepted source above; local portrait candidate `c1ebcb90c823d674a18aeacd4513485a4bfb34b0` changes no runtime/data-handling code |
| Platforms | iPhone/iPad 18.6+, native Mac 15.6+, no embedded Watch or widgets | iPhone only, iOS 18.6+; no additional platform release inferred |
| Storage | Local SwiftData; opt-in private CloudKit; retained revisions, completion events and old library data | Local SwiftData/SQLite and managed media; cloud store disabled |
| Entitlements | CloudKit/production environment/APNs, Keychain and App Groups; Mac sandbox, outbound network, read-only selected files and retained Calendar entitlement; iOS background remote notifications | Custom iPhone entitlement file empty; local-only store explicitly `.none` for CloudKit |
| SDKs | Apple frameworks; no external Swift packages/embedded third-party frameworks, ad/tracking/custom analytics SDK or developer content server found | No advertising/tracking/analytics/crash-upload SDK, app account or app content-upload service found |
| Manifest | No tracking; no collected-data types declared | No tracking; no collected-data types declared |

PotatoBeans ordinary `Release` schemes select a different, full-feature profile and must not be substituted. The main My Stories development checkout is older and dirty; it was not used as the policy baseline. Existing unsigned/ad-hoc archives cannot establish final distribution entitlements. Neither app is presented as available in the store.

Evidence: PotatoBeans `Docs/Release/MVP-v1/FINAL_RELEASE_AUDIT.md`, `.build/MVP-v1/FinalAudit20261107/archive-inventory.json`, `Models/AppReleasePolicy.swift`, `Models/BeanStore.swift:290`, `Models/Sync/TaskCausality.swift`, `Features/LibraryOpening.swift`, `Features/LibraryReconciliation.swift`, `Models/Writing/WritingService.swift` and entitlements. My Stories `Docs/Release/MY_STORIES_WEBSITE_CONTRACT.md`, `FINAL_AUDIT_20261107.md`, `APP_STORE_PRIVACY_PROPOSAL_20261107.md` and both accepted/candidate archive metadata.

## Material PotatoBeans scope discrepancy

The requested strict Bean CRUD/no saved history scope does **not** describe the selected build. It also offers tasks, completion, reordering, Appearance/settings and optional iCloud. Completing a task unconditionally creates a `TaskCompletionEvent`; edits retain previous field values and deletion markers without age-based pruning. Notes, attachment creation, streak and history screens are excluded, but retained writing, attachment assets, preferences and earlier history can still be indexed, staged, reconciled and synchronized. These are actual processing paths, not merely dormant source files.

The public policy describes this briefly under storage, existing libraries and deletion, without advertising excluded editors. It does not claim a Beans-only data model or no history processing. The user was informed and the definitive inventory requested/received from the release project. Eliminating those processing paths requires a separate app-release decision; no app changes were made here.

Optional sync defaults off per installation. Existing account-bound stores may check Apple account identity with sync off; native Mac also registers with Apple push services on launch. An already-open mirroring connection can persist until quit/reopen. No zero-networking-with-sync-off claim is made. Calendar permission/refresh/export gates are off; retained capability declarations and old local journal reads are not advertised as active Calendar integration.

## Outdated-claim inventory and disposition

All original statements remain inspectable in `docs/legal/archive/App.tsx.txt`, `AppLegal.tsx.txt` and `ReleaseApps.tsx.txt` from website commit `d31f860`. The following accounts for the excluded-feature paragraphs and surfaces, including metadata:

| Prior statement/surface | Resolution |
| --- | --- |
| Home WM Pebbles catalog card, Coming soon, task/note/journal marketing | Removed from catalog; retained URL becomes clearly labeled legacy privacy/support |
| WM Pebbles hero, feature cards, product CTA, account/release marketing | Replaced with legacy data handling and contact; no store promotion |
| WM Pebbles primary privacy navigation and large shared policy | Removed from primary choices; old `#wm-pebbles` remains as a legacy destination link |
| SoapyMoney shared privacy: financial library, optional iCloud, identifiers/history, Android, deletion, browser activity, support and reminders | All removed from public build; full drafts archived in repository |
| SoapyMoney support intro, reporting instructions, sync/retention paragraphs and privacy anchor | Removed; original drafts preserved |
| Support Android platform request | Removed; Apple platforms only |
| PotatoBeans catalog: notes, Calendar connections and Focus summary/description | Replaced with Beans and tasks |
| PotatoBeans product: notes, selected calendars, focused work, Focus imports, Watch/widget companion descriptions | Removed; concise local/optional-iCloud product page |
| PotatoBeans support: Watch account choice, Focus file transfer, Calendar permission/link/export/CloudKit exceptions, protected note troubleshooting | Removed as active support topics; concise actual storage and retained-data caveat |
| PotatoBeans privacy scope including Watch/widgets | Replaced with MVP iPhone/iPad/native Mac scope |
| Privacy content list advertising notes, attachments, streaks, saved Home history, journal/search/Focus features | Replaced with current Beans/tasks/completion records plus distinct retained older-library disclosure |
| Privacy Watch default cloud choice and widget snapshots/Calendar previews | Removed; not embedded in MVP archives |
| Privacy Calendar reading/export/linking, provider examples, cloud-coordination exception, task-event unlink behavior | Removed as active functionality; release gating verified |
| Privacy Focus notifications/history import/export | Removed; not current features |
| Privacy imported files/protected-writing/portable-Keychain technical description | Removed as active functionality; brief material missing-key limit retained only for older stored content |
| Privacy revision/attachment/handoff/Mac recovery implementation details | Condensed to earlier copies, completion records, sync and backup deletion limits |
| PotatoBeans terms: notes, schedules, Focus, Calendar exports, Watch and protected-writing operation | Replaced with current Beans/tasks and concise iCloud/deletion caveat |
| Shared terms: linking Calendar and notes/tasks ownership examples | Replaced with general user-content ownership and lawful-use terms |
| Route titles/descriptions mentioning retired apps, Focus, Calendar, notes or protected-writing support | Updated; legacy route metadata is factual and noindex, removed from sitemap |
| My Stories cryptographic algorithms, internal IDs, schema/cleanup/cache terminology | Removed; local storage, selected-media metadata, backup eligibility, original-device keys, delayed cleanup and external-copy limitations preserved |
| Shared hosting documentation and long diagnostics discussion | Reduced to host/IP/security disclosure with one provider privacy link, concise support handling/rights, and short app diagnostics notice |

## Navigation and URL preservation

Main navigation: Apps, About, Support, Privacy Policy, Terms of Use. Existing `/privacy/`, `/terms/`, `/support/`, `/contact/`, both app product routes, and six app-specific legal/support routes remain static pages. App fragments `#potatobeans`, `#my-stories` and shared `#website-and-support` remain usable. `/apps/wm-pebbles/` remains HTTP-accessible and is excluded from search indexing and the sitemap; `/privacy/#wm-pebbles` and `/support/#wm-pebbles` lead to its legacy policy/support. No public SoapyMoney release is claimed. Its old shared fragment is removed as explicitly requested; it was not a separate page.

## Apple requirements and owner facts

Reviewed primary sources on November 7, 2026:

- [App Review Guidelines 5.1.1](https://developer.apple.com/app-store/review/guidelines/): accessible policy, data uses/services, retention/deletion and consent choices.
- [App Privacy Details](https://developer.apple.com/app-store/app-privacy-details/): distinguish local handling from reportable off-device collection; optional support exceptions are conditional.
- [Apple Standard EULA](https://www.apple.com/legal/internet-services/itunes/dev/stdeula/): applies when no custom EULA is provided. Site terms do not assert a configured custom license or override mandatory consumer rights.
- [GitHub Pages data collection](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages#data-collection): host IP logging for security, disclosed briefly.

Owner-confirmed facts retained from the prior audit: Kazi Ahmed Siam is the individual operator; WisdomMedium is not an LLC/corporation; support@wisdommedium.com receives support/privacy mail; support email/voluntary attachments have no fixed automatic deletion period. The prior signed-in Apple account/Business view confirms the full legal name. No universal no-data/no-diagnostics or guaranteed recovery/deletion claim is made.

Final launch countries, support provider access/forwarding and operational deletion practices, historical diagnostic exports/retention, final signed binaries and App Store declarations remain separate release checks. This website audit does not certify compliance in unspecified markets or App Store approval.

## Read-only App Store Connect verification

The authenticated Chrome session was inspected directly during this task, without changing any fields:

| Record | App Privacy view | Privacy Policy URL | Support URL |
| --- | --- | --- | --- |
| PotatoBeans: To-Do & Planner, 6829630173 | Get Started; Publish disabled; no completed collection questionnaire | Empty (–) | Existing /support/ confirmed |
| My Stories: Daily Journal, 6830046817 | Get Started; Publish disabled; no completed collection questionnaire | Empty (–) | Existing /support/ confirmed by prior audit |

Both apps are Prepare for Submission. Thus the release chats' previously unverified account state is now narrowed to a confirmed **unfinished App Privacy questionnaire and missing policy URL**. There are no saved completed answers to certify as matching the website. The owner must complete the privacy answers using the final build and actual support/diagnostic practices, and set the policy URL before app submission. No Get Started, Edit, Save, Publish or submission action was performed. WM Pebbles remains Ready for Distribution in the app list; its legacy policy/support access is preserved while retirement is pending.

## Verification

Working-tree TypeScript, ESLint, all **188 tests** and the production build passed under Node 24.22.2. The isolated publication snapshot separately passed **17 committed tests**, TypeScript, ESLint and build after `npm ci` from its unchanged lockfile. Its output matches the working build byte-for-byte. Shared privacy is about 286 words, PotatoBeans privacy 403, and My Stories privacy 431 (main content, including headings/navigation). Existing uncommitted testing/coverage/workflow work is preserved. Only content-dependent expectations in its tests are adapted; that overhaul is excluded from publication. The exact publication snapshot is independently installed from its committed lockfile, tested and built. Regression checks cover excluded marketing claims, concise policy lengths, material retention/recovery disclosures, the retired destination and all internal links/fragments. Deployment and public/mobile results are recorded in the final report and verification receipt.

Phone and desktop browser preview passed both apps’ privacy → terms → support journeys. Phone pages had no horizontal overflow at the browser’s measured 375 CSS-pixel content width; desktop main navigation was readable. No console warnings/errors were captured. All old archive drafts are absent from dist. Fresh remote main was d31f8605c2539f4a98a3b1940ae66cfcafc43585 immediately before commit. Live verification remains a post-deployment step, not inferred from these local results.

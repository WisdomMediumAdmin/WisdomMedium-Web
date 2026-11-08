import type { ReactNode } from 'react';
import { emailHref, site } from './site';

export const operatorDescription = 'WisdomMedium is an independent app brand operated by an individual developer, not a registered LLC or corporation.';

export function LegalDate() {
  return <p className="privacy-date">Last updated: <time dateTime="2026-11-07">November 7, 2026</time></p>;
}

export function AppLinks({ slug, name }: { slug: string; name: string }) {
  return <nav className="legal-links" aria-label={`${name} information`}>
    <a href={`/apps/${slug}/`}>{name}</a><a href={`/apps/${slug}/privacy/`}>Privacy Policy</a><a href={`/apps/${slug}/terms/`}>Terms of Use</a><a href={`/apps/${slug}/support/`}>Support</a>
  </nav>;
}

export function LegalPage({ title, slug, name, children }: { title: string; slug: string; name: string; children: ReactNode }) {
  return <><section className="page-hero shell privacy-hero"><span className="eyebrow">{name} · WISDOMMEDIUM</span><h1>{title}</h1><LegalDate /><AppLinks slug={slug} name={name} /></section><article className="shell prose-page privacy-policy">{children}</article></>;
}

export function SharedPrivacy() {
  return <section id="website-and-support"><h2>Operator, website and support privacy</h2>
    <p>{operatorDescription} In this policy, “we” means that individual operator. The sections for PotatoBeans and My Stories describe their Apple releases separately; neither app requires a WisdomMedium account.</p>
    <h3>Information you send to support</h3>
    <p>If you email <a href={emailHref(site.email)}>{site.email}</a>, the recipient and email service providers receive your email address, message, and any name, screenshots, logs or attachments you choose to send. Send only what is needed to explain your question. Do not send private journals, full libraries, passwords or encryption keys.</p>
    <p>Contact the same address to ask about access, correction or deletion of information you have sent to support. A support request does not give us access to your local library or private iCloud database. Copies held by your email provider and other recipients are managed separately. A fixed support-mail retention period is not specified in this policy.</p>
    <h3>Website hosting and external services</h3>
    <p>This website is hosted on GitHub Pages. GitHub records visitors’ IP addresses for security. See <a href="https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages#data-collection">GitHub Pages data collection</a> and <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement">GitHub’s Privacy Statement</a> for its processing and retention practices. This website’s own code does not set cookies or include advertising, analytics or tracking scripts. That does not mean the host, your browser or external destinations keep no logs.</p>
    <p>App legal links open your selected browser. User-selected links, file providers, calendar providers and Apple services process information under their own terms and account settings. Apple-managed backups and iCloud are governed by <a href="https://www.apple.com/legal/privacy/">Apple’s privacy practices</a>.</p>
    <h3>Diagnostics</h3>
    <p>Neither app includes a custom analytics or crash-upload service. The operating system can keep diagnostic logs, and Apple may make crash, usage or testing reports available to the developer according to its services and your sharing settings. This policy does not claim that the developer never receives diagnostics. Logs or screenshots you send to support are part of your support correspondence.</p>
    <h3>Your choices and requests</h3>
    <p>You can manage app permissions in system Settings and control the content and external copies you create. Depending on your location, applicable law may give you rights to access, correct or delete personal information or make a privacy complaint. Email support with the app name and your request; do not attach your private library. Provider-held information and backups must also be managed with the relevant provider.</p>
    <p>Changes to data practices will be reflected in this policy with an updated date. App-specific storage, retention and deletion details follow below or on each app’s dedicated privacy page.</p>
  </section>;
}

export function PotatoPrivacy() {
  return <section id="potatobeans"><h2>PotatoBeans Privacy Policy</h2>
    <p>This section covers PotatoBeans for iPhone, iPad and native macOS, including its Apple Watch companion and widgets. It does not describe the separate WM Pebbles app or an Android or web release.</p>
    <h3>Content stored on your devices</h3>
    <p>PotatoBeans stores Beans, tasks, titles, details, schedules, completion records, notes, selected attachments, preferences, visit streaks and saved Home history. Retained legacy journal records may also remain in a library. Search indexes and previews support local navigation. Focus timers, sessions and statistics use a separate local store; Focus history moves through explicit file import and export, not automatic iCloud synchronization.</p>
    <h3>Optional iCloud and companion access</h3>
    <p>On iPhone, iPad and Mac, general library synchronization starts off and is enabled separately for each installation with a verified Apple Account. When enabled, eligible tasks, writing, attachments, preferences and history are processed by Apple CloudKit in your private iCloud database. Synchronization also uses record and installation identifiers, revisions, conflict alternatives and deletion markers. Private CloudKit databases are not exposed through the developer portal by default; the app has no WisdomMedium-operated content server.</p>
    <p>The Watch companion has its own account/device-library selection and can use the verified account library by default. Widgets and complications use local shared snapshots, such as task titles, dates, counts and streaks. Calendar titles and times are included in widgets only when separately enabled. Notes and their attachments are not included in widget snapshots.</p>
    <h3>Calendars and reminders</h3>
    <p>Calendar connection is initially off. If you grant Calendar access, the app reads selected calendars and retains local link information, including event identifiers, titles and schedules. Explicit task export and linking exchange task titles and schedules with your chosen calendar; newly exported events include an opaque PotatoBeans correlation link. Private task details and completion state are not exported by this bridge. Your calendar provider, such as iCloud, Google or Exchange, may synchronize those events.</p>
    <p>Calendar export coordination for an account library can contact private CloudKit even when general library sync is off. Disconnecting or unlinking does not delete existing Calendar events, and a write already in progress can finish. Deleting a task also leaves its linked Calendar event unless you explicitly delete the event separately.</p>
    <p>Optional reminders and Focus notifications are scheduled through the operating system with generic text. Apple push services may also support CloudKit updates; there is no WisdomMedium-operated push-content service.</p>
    <h3>Selected files and protected writing</h3>
    <p>Photos and files are imported when you choose them. Selected copies become part of your library and may synchronize with eligible writing. Individually protected writing uses encryption and device-owner authentication. Portable protection keys use the Apple account’s synchronizable Keychain; legacy device-bound keys may remain for recovery. This does not mean all app data is end-to-end encrypted. Missing keys or unavailable assets can prevent access, and support cannot reset a missing encryption key.</p>
    <h3>Retention, deletion and recovery</h3>
    <p>Deleting a current task or note does not erase every earlier copy. Task revisions can retain old text, conflicts and deletion markers without age-based pruning. Completion history, Home snapshots and visit history can outlast the original record. Hiding a streak does not erase its history. Mirrored attachments, protection keys, saved local handoff libraries and Mac recovery snapshots can also remain.</p>
    <p>Turning sync off is not cloud deletion. An existing mirroring connection may continue until you quit and reopen the app; reconnecting can bring back retained cloud data. Other devices, backups, exported files and calendar providers retain their own copies. Uninstalling does not trigger a universal cloud or Keychain purge. There is no single control that guarantees erasure of all historical copies or successful recovery. Keep your original device and recovery files when troubleshooting.</p>
    <h3>Advertising, tracking and support</h3>
    <p>This Apple release has no advertising, tracking, third-party analytics or purchase SDK, and no app-owned account service. Apple services, calendar transfers, explicit exports, browser visits and voluntary support messages are separate flows described here and in the shared website and support section.</p>
  </section>;
}

export function StoriesPrivacy() {
  return <section id="my-stories"><h2>My Stories Privacy Policy</h2>
    <p>This section applies to the iPhone release of My Stories.</p>
    <h3>Your journals stay in the local app library</h3>
    <p>My Stories stores journal titles, rich text, dates, formatting, tables, checklists, search information, preferences and selected photos, videos and files on your iPhone. Attachment records include filenames, types, sizes and internal identifiers. The current release has no app account, automatic CloudKit synchronization, app-operated content upload, remote journal processing, advertising or third-party analytics SDK.</p>
    <h3>Selected media and permissions</h3>
    <p>Photo and file import requires your selection, with a 50 MiB limit per attachment. The app does not scan your whole photo library or directly record from the camera or microphone. Apple or a file provider may download your selected item before import. Imported originals can retain embedded location, camera or other media metadata; the app does not deliberately strip that metadata or request location access.</p>
    <p>If you enable a daily reminder, the operating system schedules a local notification with the app name and “Time to write.” It does not include journal text or media. Disabling the reminder cancels the app’s pending daily reminder request.</p>
    <h3>Backups and protection have different limits</h3>
    <p>Ordinary journals and managed attachments are eligible for Apple-managed device backups. Your settings and backup method control whether and when a backup happens; eligibility does not guarantee a current or complete backup. There is no automatic journal sync in this release.</p>
    <p>Ordinary entries rely on the iOS sandbox and file protection, rather than custom encryption of every journal. Entries you individually protect use AES-GCM encryption and device-owner authentication. Their keys are device-bound in the Keychain and are not portable to a replacement device. A restored backup can contain encrypted journals that cannot be opened because the original key is unavailable. There is no app passcode reset, account recovery or support override for a missing key.</p>
    <p>Protected titles, text and previews are concealed when access is revoked or the app becomes inactive; dates and random identifiers remain metadata. Ordinary journals may appear in the App Switcher. Protected temporary previews are excluded from backup and cleaned up when access ends or the app starts. Later protection does not erase earlier ordinary backups or shared copies.</p>
    <h3>Deleted Journals and permanent deletion</h3>
    <p>Moving an entry to Deleted Journals keeps its content, attachments and protection key until you restore it or choose permanent deletion. There is no automatic expiration of Deleted Journals.</p>
    <p>Permanent deletion removes the current journal and keeps a content-free identifier/date marker to resist stale saves. Cleanup removes unreferenced managed attachments and retires protection keys, but shared references, active editing, undo and legitimate recovery copies can delay cleanup. Interrupted or unsafe cleanup is retried at library startup and later collection; Settings offers a retry if cleanup fails. This is not a promise of immediate forensic erasure from device storage.</p>
    <p>Imported originals in Photos or Files, system backups, screenshots, exports, Quick Look caches, other devices and third-party copies are not deleted by this operation. Uninstalling is not a guarantee that every historical copy or Keychain item disappears.</p>
    <h3>Clipboard, links and diagnostics</h3>
    <p>Explicitly copied protected text uses a local-only clipboard item with a 60-second expiry, but another app may read or copy it while available. Ordinary copies use the system clipboard. Neither setting guarantees erasure from clipboard history or copies made elsewhere.</p>
    <p>Legal and user-authored links may open your browser. Native file preview, media playback and selected file providers can involve operating-system services. App diagnostic logging uses operation categories and error codes rather than intentionally logging journal text, filenames or keys. Apple diagnostics, website requests and voluntary support correspondence remain separate from local journal storage; see the shared website and support section.</p>
  </section>;
}

export function GeneralTerms() {
  return <section id="general"><h2>General WisdomMedium terms</h2><p>{operatorDescription} These terms cover this website and the use information below for PotatoBeans and My Stories.</p>
    <h3>App license and purchases</h3><p>Apps obtained through the App Store are licensed under the agreement shown for that app. Apple’s <a href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/">Standard End User License Agreement</a> applies when no custom license is supplied. This website does not register a custom EULA or change the license displayed by the App Store. Price, availability and any transaction terms are shown by the store; these pages do not promise a free app, a subscription or a paid tier. These releases contain no in-app purchase or subscription flow.</p>
    <h3>Your content and use</h3><p>You retain your rights in the content you create or import. Use only content you have the right to use, and use the apps and website lawfully. These terms do not grant us ownership of your private journals, notes or tasks or permission to publish them. Sharing a file, linking a calendar or emailing support is your choice and can provide a copy to the selected recipient or provider.</p>
    <h3>Availability, backups and consumer rights</h3><p>Features can depend on your device, permissions, account, storage and external services. Synchronization, notifications, backup and recovery are not guaranteed to be immediate, uninterrupted or successful. Keep appropriate copies of important information and read the app-specific limitations below before relying on backup or deletion.</p><p>Nothing on this page excludes rights or remedies that applicable consumer law does not allow to be excluded. The applicable app license and mandatory law govern warranties and liability. No additional arbitration requirement, liability cap or choice of jurisdiction is imposed by this page.</p>
    <h3>Privacy, changes and contact</h3><p>The <a href="/privacy/">Privacy Policy</a> describes data handling. Updated terms will appear here with a revised date. For questions about these terms or either app, use <a href="/support/">Support</a> or email <a href={emailHref(site.email)}>{site.email}</a>.</p>
  </section>;
}

export function PotatoTerms() {
  return <section id="potatobeans"><h2>PotatoBeans Terms of Use</h2><p>PotatoBeans is a personal organization tool for tasks, notes, schedules and Focus sessions. Calendar links can write titles and schedules to your selected calendar provider. Review the selected calendar and event before exporting or linking. Disconnecting, deleting a task or turning general sync off does not necessarily remove calendar events or stop an in-progress provider write.</p><p>Optional iCloud uses your Apple Account and depends on Apple’s availability, storage and permissions. Calendar export coordination and the Watch account library have the distinct cloud behaviors described in the <a href="/apps/potatobeans/privacy/">PotatoBeans Privacy Policy</a>. Focus history is local unless explicitly transferred by file.</p><p>Protected writing depends on available keys and authentication. Sync, retained history and recovery copies are not a universal backup or erasure service. Support cannot reset missing encryption keys or remotely erase all private cloud, backup and exported copies. Preserve source devices and recovery files when an issue occurs. <a href="/apps/potatobeans/support/">Get PotatoBeans support</a>.</p></section>;
}

export function StoriesTerms() {
  return <section id="my-stories"><h2>My Stories Terms of Use</h2><p>My Stories is a personal journaling app for iPhone. Its current release stores your journals locally without automatic cloud sync or an app account. You control your content and selected imports. Local reminders depend on system permissions and delivery.</p><p>Device backups may contain ordinary and encrypted journal data, but protected-entry keys are device-bound. Restoring encrypted content onto another device may leave it unreadable. Support cannot recover a lost key or bypass device authentication. Do not rely on a backup alone as a guarantee that protected entries will open after device replacement.</p><p>Deleted Journals keeps entries until you restore or permanently delete them. Permanent deletion and cleanup have the limits described in the <a href="/apps/my-stories/privacy/">My Stories Privacy Policy</a>; they do not erase originals, external copies or historical backups. <a href="/apps/my-stories/support/">Get My Stories support</a>.</p></section>;
}

export function Terms() {
  return <><section className="page-hero shell privacy-hero"><span className="eyebrow">WISDOMMEDIUM · TERMS</span><h1>Terms of Use</h1><LegalDate /><nav className="legal-links" aria-label="Terms sections"><a href="#general">General terms</a><a href="#potatobeans">PotatoBeans</a><a href="#my-stories">My Stories</a></nav></section><article className="shell prose-page privacy-policy"><GeneralTerms /><PotatoTerms /><StoriesTerms /></article></>;
}

export function PotatoPrivacyPage() { return <LegalPage title="PotatoBeans Privacy Policy" slug="potatobeans" name="PotatoBeans"><PotatoPrivacy /><SharedPrivacy /></LegalPage>; }
export function StoriesPrivacyPage() { return <LegalPage title="My Stories Privacy Policy" slug="my-stories" name="My Stories"><StoriesPrivacy /><SharedPrivacy /></LegalPage>; }
export function PotatoTermsPage() { return <LegalPage title="PotatoBeans Terms of Use" slug="potatobeans" name="PotatoBeans"><GeneralTerms /><PotatoTerms /></LegalPage>; }
export function StoriesTermsPage() { return <LegalPage title="My Stories Terms of Use" slug="my-stories" name="My Stories"><GeneralTerms /><StoriesTerms /></LegalPage>; }

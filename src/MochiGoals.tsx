import { AppIcon } from './AppIcon';
import { ReleaseAction } from './ReleaseAction';
import { emailHref, mochigoals, site } from './site';

export function MochiLinks() {
  return <nav className="legal-links" aria-label="MochiGoals information">
    <a href={mochigoals.privacyPolicyPath}>Privacy Policy</a>
    <a href="/terms/#mochigoals">Terms of Use</a>
    <a href="/support/#mochigoals">Support</a>
  </nav>;
}

const screenshots = [
  ['goals', 'Your goals', 'The Active goals view with a Learn guitar goal and a button to create a goal.'],
  ['progress', 'Subgoal progress', 'Learn guitar at 33% progress, with one of its three subgoals complete.'],
  ['checklist', 'Checklist steps', 'Three guitar chords are checked off, with a separate Complete subgoal button.'],
  ['appearance', 'Appearance', 'Theme previews with Clear Bean selected.']
];

export function MochiProduct() {
  return <>
    <section className="page-hero shell branded-product-hero">
      <div>
        <span className="eyebrow">For iPhone · Requires iOS 18.6 or later</span>
        <h1><em>MochiGoals</em></h1>
        <p className="lead">Small steps, meaningful goals</p>
        <p>{mochigoals.description}</p>
        <p>Break a goal into subgoals and checklist steps. Check off each step, then mark the subgoal complete to update your progress. Find due and overdue items in Today, search or arrange your goals, and reopen finished goals from Done.</p>
        <p>Personalize your space with ten themes and six app-icon backgrounds.</p>
        <ReleaseAction app={mochigoals} />
        <MochiLinks />
      </div>
      <div className="product-icon-panel app-art--mochigoals"><AppIcon app={mochigoals} priority /></div>
    </section>
    <section className="shell app-screens" aria-labelledby="mochi-screens-title">
      <h2 id="mochi-screens-title">Inside MochiGoals</h2>
      <ul>{screenshots.map(([file, caption, alt]) => <li key={file}><figure>
        <img src={`/images/apps/mochigoals/${file}.webp`} alt={alt} width="603" height="1311" loading="lazy" decoding="async" />
        <figcaption>{caption}</figcaption>
      </figure></li>)}</ul>
    </section>
  </>;
}

function EffectiveDate() {
  return <p className="privacy-date"><time dateTime="2026-11-11">Effective November 11, 2026</time></p>;
}

export function MochiPrivacy() {
  return <section id="mochigoals" aria-label="MochiGoals — Privacy Policy">
    <h2>MochiGoals — Privacy Policy</h2>
    <EffectiveDate />
    <h3>Who operates MochiGoals</h3>
    <p>MochiGoals is an iPhone goal-planning app operated by Kazi Ahmed Siam under the WisdomMedium brand. For support or privacy questions, email <a href={emailHref(site.email)}>{site.email}</a> or visit <a href="/support/#mochigoals">Support</a>.</p>
    <h3>Information used on your iPhone</h3>
    <p>MochiGoals stores the information you enter to plan and track goals: goal and subgoal titles, notes, target dates, checklist steps, color choices and ordering. It also saves record identifiers, creation and modification dates, checked and completed states and their latest timestamps. Progress is calculated from this information. Theme, app-icon and sorting preferences are stored locally. Search text and unsaved editing state are used within the app; the app does not upload a search history.</p>
    <p>Your text may contain personal or sensitive information depending on what you choose to write. You decide what to enter. MochiGoals does not scan your photos, contacts, location, microphone, health records or other apps. It does not offer media attachments or a public profile.</p>
    <h3>Local storage, backups and older data</h3>
    <p>Your goal library is stored in the app's local iPhone storage. This version has no account, developer-operated content server or automatic iCloud/CloudKit synchronization. WisdomMedium cannot remotely read or restore your local library through the app.</p>
    <p>iOS device backups may include app information, depending on your settings and Apple's services. A current or complete backup is not guaranteed. Manage device backups separately through Apple's settings and services.</p>
    <p>Version 1.0 does not provide manual export, import, backup or restore controls. If an earlier installation created an export or a local recovery snapshot, those copies can remain. Files previously exported to Files, a cloud provider or another recipient are subject to that destination's settings and practices.</p>
    <p>Previously archived goals and saved reminder values can remain in the local library. This version has no archive browser or reminder editor. Hiding a feature does not erase its data.</p>
    <h3>Notifications and permissions</h3>
    <p>This release does not request notification permission or schedule new reminders. When the updated app runs, it attempts to remove its earlier pending and delivered notifications. A reminder already queued by an earlier version may appear before the updated app first runs. The retained reminder implementation uses a generic app reminder message, not goal titles or notes. This release does not use remote push notifications.</p>
    <p>Core goal tracking requires no special device permission. The Privacy Policy, Terms and Support links open an external browser or mail app at your request; those services have their own privacy practices.</p>
    <h3>Collection, sharing, analytics and diagnostics</h3>
    <p>The app does not automatically transmit your goals, notes, progress or preferences to WisdomMedium or a third-party SDK. There are no advertising, tracking, analytics, third-party crash-reporting or AI-processing SDKs in this release. There is no cross-company tracking or sale of local goal data by the app.</p>
    <p>Apple may process diagnostics and make reports available through its developer tools according to Apple's services and your sharing choices. This is separate from an app-operated analytics or crash-upload service.</p>
    <p>If you visit our website, the <a href="/privacy/#website-and-support">website and support privacy policy</a> applies. The published website policy describes GitHub Pages security logging and states that WisdomMedium does not add advertising, analytics or tracking scripts or cookies. A browser visit is separate from the local goal library.</p>
    <p>If you email support, WisdomMedium and its email service receive your email address, message and attachments you choose to send. We use this correspondence to answer your request and investigate the issue. The app does not automatically attach your goals, database or diagnostics. Send only necessary details, and remove private content from screenshots. Do not send passwords or a complete goal library. Support correspondence has no fixed automatic deletion period; you may request deletion. Copies held by your email provider or other recipients are outside our direct control.</p>
    <h3>Retention and deletion</h3>
    <p>Saved goals remain until you delete them. Completing a goal retains it under Done. Deleting a goal removes its live goal record and its subgoals and steps. Deleting a subgoal removes its live checklist steps. Recent copies may remain in up to 30 internal session snapshots until replaced or the app process ends, even though this release has no Undo control. Local database files and system storage can also retain remnants; deletion is not a secure-erasure promise.</p>
    <p>Deleting a goal does not delete older recovery snapshots, external exports, screenshots or device/provider backups. There is no reset-all, account-deletion or remote-library-deletion service. Deleting the app normally removes its local app container; offloading the app preserves its documents and data. Backups and copies outside the app must be managed separately, and restoring a backup may restore earlier data.</p>
    <p>If the app cannot open its local store, it preserves existing files and offers retry/support. Keep the original installation while investigating missing data; uninstalling can remove the only available local copy. Support cannot guarantee recovery.</p>
    <h3>Security and your choices</h3>
    <p>MochiGoals uses the iOS app sandbox and system storage protections. It does not provide an additional app password or custom encryption for the goal library. Protect access to your iPhone and backups. No storage or recovery method is guaranteed against every loss or unauthorized access.</p>
    <p>You can edit or delete accessible goals, change appearance preferences, manage iOS backups, and choose whether to contact support or visit the website. For information you have sent to WisdomMedium, contact support to request access, correction or deletion, subject to applicable law and any legitimate retention obligations. The app does not transmit locally entered content merely because a child or another user enters it. Please avoid sending children's personal information or unnecessary sensitive information to support.</p>
    <h3>Changes</h3>
    <p>We may update this policy when the app or our practices change. The published page will show the updated effective date. Material changes will be explained as appropriate. Contact <a href={emailHref(site.email)}>{site.email}</a> with questions.</p>
  </section>;
}

export function MochiTerms() {
  return <section id="mochigoals" aria-label="MochiGoals — Terms of Use">
    <h2>MochiGoals — Terms of Use</h2>
    <EffectiveDate />
    <h3>Operator and applicable license</h3>
    <p>MochiGoals is operated by Kazi Ahmed Siam under the WisdomMedium brand. Contact <a href={emailHref(site.email)}>{site.email}</a>. These product terms supplement the license applicable to your App Store download and the <a href="/terms/#general">general WisdomMedium terms</a>. They do not replace Apple's <a href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/">Standard End User License Agreement</a> where it applies, or override mandatory consumer rights.</p>
    <h3>Purpose and permitted use</h3>
    <p>MochiGoals helps you organize goals, subgoals and checklist steps, record notes and target dates, and track progress on your iPhone. Use it lawfully and respect others' rights. Do not interfere with its security or unlawfully copy, redistribute or modify its software. Restrictions apply only to the extent permitted by applicable law and the applicable app license.</p>
    <p>You are responsible for the information you enter, your planning decisions, and how you use the app. Check important information yourself. Dates and progress displays are planning aids. A progress percentage reflects recorded subgoal completion; it is not independent confirmation that a real-world result has occurred. Checking all steps still requires explicit subgoal completion. We do not guarantee that using MochiGoals will achieve a goal or personal outcome. The app does not provide professional advice, emergency monitoring or a reminder service in this release.</p>
    <h3>Your content</h3>
    <p>You retain ownership of your content and must have the right to use it. These terms do not give WisdomMedium ownership of your goals or permission to publish them or use them to train AI. Local processing is used to provide the app's functions. If you choose to send information to support, we may use it to address your request as described in the <a href="/privacy/#mochigoals">Privacy Policy</a>.</p>
    <p>The app's software, design, branding and other protected materials remain the property of their respective owners or licensors. Downloading the app grants the rights provided by the applicable license, not ownership of the software or third-party materials.</p>
    <h3>Storage and availability</h3>
    <p>Version 1.0 is for iPhone running iOS 18.6 or later. Goal tracking works locally without an app account. Website and email links depend on your connection and external services. Compatibility, features and availability may change through later updates or platform changes, subject to applicable law.</p>
    <p>Your library is stored locally. This version does not provide automatic cloud synchronization, manual backup/restore, archive browsing, user-facing Undo or reminders. Older data associated with these features may remain stored. Completion keeps a goal; deletion removes it from the live library but does not erase all historical copies, exports or system backups.</p>
    <p>Device failure, storage corruption, deletion or loss of a device can make data unavailable. iOS backups depend on your settings and do not guarantee recovery. Keep suitable independent records of information that is important to you. If the app cannot open its store, keep it installed and contact support before attempting recovery. WisdomMedium has no remote copy of your local library and cannot promise to restore it.</p>
    <h3>Warranties and liability</h3>
    <p>To the extent permitted by applicable law and the applicable app license, MochiGoals is provided as available, without a separate promise of uninterrupted, error-free operation or fitness for a particular personal outcome. The applicable app license governs warranties and limitations of liability. To the extent it permits, WisdomMedium is not responsible for losses caused by reliance on incomplete planning records, unavailable backups or circumstances outside its reasonable control.</p>
    <p>Nothing in these terms excludes or limits liability, remedies or consumer protections that cannot lawfully be excluded or limited. These terms do not reduce protections provided by the applicable app license. No extra damages cap, arbitration requirement or exclusive court location is imposed here.</p>
    <h3>Changes, stopping use and legal context</h3>
    <p>You may stop using the app at any time. Deleting the app can remove local information; review the Privacy Policy before doing so. There is no MochiGoals account to close or suspend. License termination, including for breach, is governed by the applicable app license. Nothing here implies that WisdomMedium can remotely erase your goals.</p>
    <p>We may revise these terms as features or services change and will publish the revision date. Applicable governing-law and dispute provisions are those of the applicable app license, subject to mandatory local law and consumer rights. For help or questions, visit <a href="/support/#mochigoals">Support</a> or email <a href={emailHref(site.email)}>{site.email}</a>.</p>
  </section>;
}

export function MochiSupport() {
  return <section id="mochigoals"><h2>MochiGoals support</h2><p>MochiGoals 1.0 is an iPhone-only goal tracker for iOS 18.6 or later, with local storage. For help, include the app version/build, iPhone model, iOS version, steps to reproduce the problem, and what you expected. Screenshots are optional; redact goal titles, notes and other private information. Do not send your whole library, passwords or sensitive goal content.</p>
    <h3>Why did my progress stay the same?</h3><p>Check off each checklist step, then tap <strong>Complete subgoal</strong>. Progress counts completed subgoals. You can complete a goal without subgoals directly. To resume a finished goal, open <strong>Done</strong> and reopen it.</p>
    <h3>Missing goals or storage problems</h3><p>Keep the original device and installation. If the library will not open, use the retry option and contact support before uninstalling or deleting anything. Completed goals remain in Done; completing a goal does not archive it. Older archived records and recovery files can remain stored, but this release has no archive browser or manual recovery control. Support cannot recover deleted goals from a server or remotely access your library.</p>
    <h3>Unavailable controls and older reminders</h3><p>Archived Goals, Undo Last Change, Notifications and manual Local Backup are disabled. The app cannot schedule new reminders or request notification permission. If an older reminder arrives, open the updated app to start cancellation of its pending and delivered notifications; iOS may deliver an old request before that first opening. You can also manage notification permission in iPhone Settings. Saved reminder times remain in the library.</p>
    <p>Manual backup import, export and restore are unavailable. Internal save safeguards and older recovery files remain separate from ordinary iOS backups. Manage system backups through your Apple settings; their existence or successful restoration is not guaranteed. Keep any earlier exported files safe and private; this release cannot import them.</p>
    <p><a href={emailHref(site.email, 'MochiGoals Support')}>Email MochiGoals support</a> at {site.email}. This opens a draft in your mail app; you choose whether to send it and what to include. Nothing is automatically attached. You can also use the shared copy-address button above. Read <a href="/privacy/#mochigoals">MochiGoals privacy</a> and <a href="/terms/#mochigoals">terms</a>.</p>
  </section>;
}

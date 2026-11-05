export function MyStoriesPrivacy() {
  return <section id="my-stories" aria-labelledby="my-stories-title">
    <h2 id="my-stories-title">My Stories for iPhone</h2>
    <p>My Stories is a personal journaling app. These disclosures describe the iPhone version 1.0 release under review. Other applications have their own sections below.</p>
    <h3 id="my-stories-information">Your journal and local information</h3>
    <p>The app stores entries, titles, dates, formatted text, selected photos, videos and files, attachment details, and preferences on your device. It also keeps technical identifiers and records needed for editing, recovery and deletion. This local processing does not automatically send your private journal to WisdomMedium.</p>
    <p>No WisdomMedium journal account is required. CloudKit synchronization is disabled in this version, and there is no app-managed online journal or WisdomMedium cloud service through which to access your entries on another device.</p>
    <h3 id="my-stories-backups">System backups and recovery</h3>
    <p>The current iPhone implementation marks its journal library and managed attachment storage as excluded from Apple system backups. Do not rely on an iCloud or computer backup to restore your journal. Eligible app information outside those excluded locations, earlier backups made before exclusions applied, and copies you create elsewhere may still be retained by Apple, your computer or another service under your settings.</p>
    <p>Protected-entry keys are bound to the original device. A backup or replacement device does not guarantee recovery of protected entries, even if a copy of the encrypted content is available. Keep the original device and its passcode while information matters to you. WisdomMedium cannot recover a missing key.</p>
    <h3 id="my-stories-media">Photos, videos and files you choose</h3>
    <p>You explicitly select attachments through system photo and file controls. The app stores selected copies for use in your entries; selection does not grant the app unrestricted access to your entire photo library. Selected media can retain embedded information, such as capture dates and location metadata. The app does not need location access to receive metadata already embedded in a selected file.</p>
    <p>Originals in Photos, Files or a file provider remain separately controlled by you and those services. Removing an attachment or entry from My Stories does not delete those originals. Copying, sharing or opening information through system features may send it to destinations you select.</p>
    <h3 id="my-stories-protection">Optional entry protection</h3>
    <p>You can protect individual entries. Protected entry content uses encryption, with a device-bound key accessed through Apple device-owner authentication, including supported biometrics or the device passcode. Protecting one entry does not encrypt every journal with that entry lock.</p>
    <p>The lock is not a promise that all app metadata, system records, temporary copies or backups are encrypted by the entry key. Enabling a lock later does not erase earlier unprotected copies or exports. Device security and keeping your passcode private remain important; no security measure guarantees complete protection.</p>
    <h3 id="my-stories-deletion">Deletion and retention</h3>
    <ol>
      <li><strong>Deleted Journals:</strong> moving an entry here retains it, including its content and attachments, so you can restore it. There is no automatic expiry in the inspected version.</li>
      <li><strong>Permanent deletion:</strong> removes the entry record from the app’s journal library and its recovery list. The app attempts to clean up unreferenced managed attachment files and protected keys, but this is not a guarantee that every stored payload is erased.</li>
      <li><strong>Editing and recovery:</strong> undo history, active edits and pending recovery records can retain information or delay file cleanup. Cleanup can also be deferred when references cannot safely be determined or a storage operation fails.</li>
      <li><strong>Technical remnants:</strong> the version inspected for this draft can retain attachment payloads in its local database after an entry is permanently deleted. Deletion markers and other storage remnants may also remain. Permanent deletion is not secure erasure of all app-managed storage.</li>
      <li><strong>Independent copies:</strong> originals, exported or shared copies, and earlier system backups are managed separately. Deleting an entry does not delete those copies.</li>
    </ol>
    <p>WisdomMedium does not operate remote journal storage and cannot remotely inspect, restore or erase your local journal. Contact support for help with the app’s controls, without sending the journal itself.</p>
    <h3 id="my-stories-permissions">Permissions and reminders</h3>
    <p>Optional reminders use local notifications after you allow notifications through iOS. You can change notification permissions in iOS Settings. Selected attachments use Apple’s photo picker and file-selection controls. Entry protection can use device-owner authentication and Face ID permission on supported devices. This version does not request location access for journaling.</p>
    <h3 id="my-stories-tracking">Advertising, analytics and diagnostics</h3>
    <p>This version has no advertising or tracking SDKs, third-party analytics integration, in-app purchases or subscriptions. It does not automatically upload journal content to WisdomMedium for analytics or support. Apple’s own platform diagnostics and sharing choices are separate from these app practices.</p>
    <p>If you deliberately send a support message, screenshot or diagnostic report, the information you include leaves your device. Please remove journal text, personal media and other sensitive information before sending. See <a href="#support-information">support communications</a> for how those messages are handled.</p>
    <h3 id="my-stories-links">Website visits and external links</h3>
    <p>Links open only after your action, through the system’s external handler. Your browser, Apple and the destination provider process those requests under their own terms and settings. Our <a href="#website">website disclosure</a> applies when you visit WisdomMedium; the app’s absence of tracking is not a promise that websites or operating-system services keep no logs.</p>
    <p><a href="/support/#my-stories">My Stories support</a> · <a href="/terms/#my-stories">My Stories terms</a></p>
  </section>;
}

import { AppLinks, operatorDescription } from './AppLegal';
import { emailHref, site } from './site';

function SupportContact({ name }: { name: string }) {
  return <section><h2>Contact support</h2><p>{operatorDescription}</p><p>Email <a href={emailHref(site.email, `${name} Support`)}>{site.email}</a> for help, feedback or privacy requests. Include {name}, the version/build, device and operating-system version, what you expected, and what happened. Screenshots are optional; remove private content first. Do not send passwords, keys, full libraries or sensitive journal entries.</p><p>The link opens a draft in your mail app; you choose whether to send it. You can also copy the address into any email service.</p></section>;
}

export function PotatoSupportDetails() {
  return <section id="potatobeans"><h2>Beans and storage</h2><p>Find the version in Settings → About. For help with creating, changing or deleting Beans and tasks, describe what happened and which device you use.</p><h3>iCloud or missing information</h3><p>Tell us whether iCloud is enabled in Storage &amp; Sync and include the displayed connection status. Sync is optional on each installation. Turning it off does not delete cloud data; quit and reopen the app to stop an existing connection.</p><p>Keep the original installation and recovery copies. Do not delete your library or cloud data as a troubleshooting step. Deletions can leave earlier versions, completion records and backups. Older libraries may also retain content from features no longer available. See the <a href="/apps/potatobeans/privacy/">privacy policy</a> for these limits.</p></section>;
}

export function StoriesSupportDetails() {
  return <section id="my-stories"><h2>My Stories support</h2><p>My Stories is an iPhone app. Find its version in Settings → About. For an import issue, describe the file type and size without sending the private file; attachments are limited to 50 MiB each. Photo and file import uses your explicit selection.</p><h3>Missing or deleted journals</h3><p>Check Deleted Journals first. Entries remain there until you restore or permanently delete them; there is no automatic expiration. If Settings reports that cleanup needs another attempt, use its retry option. Keep your original installation and device when investigating missing content.</p><h3>Backups and protected entries</h3><p>This release does not automatically sync journals between devices. Device backup eligibility does not prove a current backup exists. Protected-entry keys are bound to the original device; a replacement-device restore can leave protected journals unreadable. Support cannot recreate a lost key or bypass authentication. Do not uninstall the app as a first troubleshooting step.</p><h3>Reminders and privacy</h3><p>If reminders are unavailable, check notification permission in iPhone Settings and the daily reminder setting in the app. Read the <a href="/apps/my-stories/privacy/">privacy policy</a> and <a href="/apps/my-stories/terms/">terms</a> for data handling and deletion limits.</p></section>;
}

export function PotatoSupportPage() {
  return <><section className="page-hero shell"><span className="eyebrow">WISDOMMEDIUM SUPPORT</span><h1>PotatoBeans Support</h1><AppLinks slug="potatobeans" name="PotatoBeans" /></section><article className="shell prose-page"><SupportContact name="PotatoBeans" /><PotatoSupportDetails /></article></>;
}

export function StoriesSupportPage() {
  return <><section className="page-hero shell"><span className="eyebrow">WISDOMMEDIUM SUPPORT</span><h1>My Stories Support</h1><AppLinks slug="my-stories" name="My Stories" /></section><article className="shell prose-page"><SupportContact name="My Stories" /><StoriesSupportDetails /></article></>;
}

export function PotatoProduct() {
  return <><section className="page-hero shell"><span className="eyebrow">FOR IPHONE, IPAD AND MAC</span><h1>Meet <em>PotatoBeans.</em></h1><p className="lead">Create Beans. Keep your tasks simple.</p><p>Create, modify and delete Beans and their tasks in a simple space for everyday organization.</p><AppLinks slug="potatobeans" name="PotatoBeans" /></section><article className="shell prose-page"><h2>Stored on your device</h2><p>Use a local library or choose optional iCloud sync. Read the privacy policy for storage and deletion details.</p><p>Coming soon. App Store availability and pricing will be shown in the store when published.</p></article></>;
}

export function StoriesProduct() {
  return <><section className="page-hero shell"><span className="eyebrow">FOR IPHONE</span><h1>Meet <em>My Stories.</em></h1><p className="lead">A place for the moments you want to keep.</p><p>Write journals with rich text, photos, videos and selected files in a local iPhone library.</p><AppLinks slug="my-stories" name="My Stories" /></section><article className="shell prose-page"><h2>Personal writing, local storage</h2><p>No app account or automatic cloud synchronization. Ordinary journals can be included in device backups, and you can protect individual entries using device authentication and encryption.</p><p>Protection keys are tied to the original device. A backup alone does not guarantee access to protected entries on a replacement device. Read the privacy and support pages before relying on recovery. App Store availability and pricing will be shown in the store when published.</p></article></>;
}

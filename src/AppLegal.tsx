import { WalkmallowTerms, walkmallowPolicyDate } from './Walkmallow';
import type { ReactNode } from 'react';
import { emailHref, site, smoothcalc } from './site';

export const brandOperator = 'Kazi Ahmed Siam operates the WisdomMedium brand.';
export const operatorDescription = 'Kazi Ahmed Siam operates PotatoBeans and My Stories under the WisdomMedium brand.';

export function LegalDate({ date = '2026-11-07' }: { date?: string }) {
  const label = new Intl.DateTimeFormat('en-US', { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(date));
  return <p className="privacy-date">Last updated: <time dateTime={date}>{label}</time></p>;
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
  return <section id="website-and-support"><h2>Website and support privacy</h2>
    <p>{brandOperator} In these policies, “we” means Kazi Ahmed Siam.</p>
    <h3>This website</h3>
    <p>This is an informational website with no accounts, sign-in or online storage for your app content. We do not add advertising, analytics, tracking scripts or cookies. Our host, GitHub Pages, records visitors’ IP addresses for security under <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement">GitHub’s privacy policy</a>. Links to other websites are subject to those sites’ privacy practices.</p>
    <h3>When you contact us</h3>
    <p>We and our email service receive your email address, message and any attachments you send, and use them to answer your request and investigate problems. Please send only what is needed, without private journals, full libraries or passwords. Support correspondence has no fixed automatic deletion period. You can request deletion; copies held by your email provider or other recipients must be managed separately.</p>
    <h3>Your privacy choices</h3>
    <p>Email <a href={emailHref(site.email)}>{site.email}</a> for privacy questions or to request access, correction or deletion of information you have sent us. Depending on your location, you may also have rights to object to or restrict processing, obtain a copy of your information, withdraw consent, or complain to a privacy authority. A support request does not give us access to your app library.</p>
    <p>App permissions and Apple-managed backups are controlled through your device and Apple Account settings. Apple services follow <a href="https://www.apple.com/legal/privacy/">Apple’s privacy policy</a>. We will update the relevant policy and its date when our practices change.</p>
  </section>;
}

function AppPrivacyContact() {
  return <section><h2>Support and privacy questions</h2><p>{operatorDescription} Contact <a href={emailHref(site.email)}>{site.email}</a>. The <a href="/privacy/#website-and-support">website and support policy</a> explains email handling, retention and your privacy rights.</p><p>There is no in-app analytics or crash-upload service. Apple may process diagnostics and make reports available through its developer tools, depending on the service and your sharing choices. Information you choose to email us is separate from your app library.</p></section>;
}

export function PotatoPrivacy() {
  return <section id="potatobeans"><h2>Your Beans and storage</h2>
    <p>This policy covers the PotatoBeans MVP release for iPhone, iPad and Mac. The app stores your Beans and their tasks, including text and dates you enter, completion records and app preferences, on your device. Completing a task saves a completion record even though there is no history screen. It does not require a WisdomMedium account.</p>
    <h3>Optional iCloud</h3>
    <p>iCloud sync starts off and is your choice on each installation. If you enable it, Apple stores and synchronizes your library in your private iCloud database. This includes the information needed to reconcile changes and deletions. Apple account checks and system notifications may still contact Apple when sync is off. WisdomMedium does not run a content server or have access to your private library through its developer account. The app has no advertising, tracking or third-party analytics SDK.</p>
    <h3>Existing libraries</h3>
    <p>This release does not offer notes, attachments, streaks or saved-history screens. If an older library contains that information, it can remain stored and can still be included in iCloud synchronization. Hiding those features does not delete their data. Older protected content may still depend on its original protection keys; support cannot recover missing keys.</p>
    <h3>Deleting information</h3>
    <p>You can delete Beans and tasks in the app. Earlier versions, conflict copies and deletion records can remain in the library or iCloud, so deleting an item does not immediately erase every earlier copy. Device backups and recovery copies may also retain information.</p>
    <p>Turning sync off does not delete uploaded data; quit and reopen the app to stop an existing sync connection. Removing the app does not guarantee deletion of iCloud data, backups or every local file on a Mac. Manage Apple-held backups and cloud data separately in your Apple settings, and contact support for help with retained library data. Keep your original installation when investigating missing content.</p>
  </section>;
}

export function StoriesPrivacy() {
  return <section id="my-stories"><h2>Your journal stays on your iPhone</h2>
    <p>My Stories stores your journal text, dates, preferences and selected photos, videos and files in a local app library. There is no app account, automatic journal sync or app-operated content upload. WisdomMedium cannot read your library. The app has no advertising, tracking or third-party analytics SDK.</p>
    <h3>Media and permissions</h3>
    <p>You choose each photo or file to import; the app does not scan your whole photo library. Apple or your file provider may download selected items before import. Imported media may retain embedded details such as location or camera information. Optional daily reminders are local notifications and do not include journal content.</p>
    <h3>Backups and protected entries</h3>
    <p>Your library and attachments are eligible for Apple-managed device backups, depending on your settings. This does not guarantee that a current or complete backup exists.</p>
    <p>Ordinary entries use iPhone storage protection. Entries you individually protect are encrypted and require device authentication. Their protection keys are tied to the original device: restoring a backup on a replacement device may leave protected entries unreadable. Support cannot recover a missing key or bypass authentication.</p>
    <p>Protected text and previews are concealed when access ends or the app becomes inactive, but dates remain visible metadata. Ordinary entries may appear in the App Switcher. Protecting an entry later does not erase earlier backups or shared copies. Text you copy can be read by another app while on the clipboard, even if it later expires.</p>
    <h3>Deletion</h3>
    <p>Deleted Journals keeps entries until you restore or permanently delete them; there is no automatic expiration. Permanent deletion removes the journal from the active library. Removal of unused attachments and protection keys can be delayed by editing, shared references, recovery copies or interrupted cleanup. Use the retry option in Settings if cleanup fails.</p>
    <p>Deletion does not remove originals in Photos or Files, existing backups, screenshots, shared copies or system caches. Removing the app does not guarantee erasure of every historical copy or protection key. Manage external copies and backups separately.</p>
  </section>;
}

export function GeneralTerms() {
  return <section id="general"><h2>Using WisdomMedium</h2><p>{brandOperator} These terms cover this website and supplement the applicable license for our apps.</p>
    <h3>License and acceptable use</h3><p>App Store apps are licensed under the agreement shown for that app. Apple’s <a href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/">Standard End User License Agreement</a> applies when no custom license is provided. These website terms do not replace it. Prices and purchase terms are shown in the App Store.</p>
    <p>Use the apps and website lawfully. Do not interfere with their security or infringe anyone’s rights. You retain ownership of your content and must have permission to use anything you import or share. These terms do not give us ownership of, or permission to publish, your content.</p>
    <h3>Availability and responsibility</h3><p>To the extent permitted by law, the website is provided as available, without warranties of uninterrupted or error-free service. App warranties and liability are governed by the applicable app license. We do not guarantee successful synchronization, backup or recovery. Keep appropriate copies of important information and read your app’s storage and recovery limitations.</p><p>Nothing here excludes liability or consumer rights that cannot lawfully be excluded, or reduces protections under the applicable app license.</p>
    <h3>Changes and contact</h3><p>We may update these terms as our services change and will publish the revised date here. Our <a href="/privacy/">Privacy Policy</a> explains data handling. For questions, email <a href={emailHref(site.email)}>{site.email}</a>.</p>
  </section>;
}

export function PotatoTerms() {
  return <section id="potatobeans"><h2>PotatoBeans</h2><p>PotatoBeans helps you create, modify and delete Beans and their tasks. Optional iCloud depends on your Apple Account, storage and Apple’s services. Deleting an item or disabling sync does not erase all historical or backup copies. See the <a href="/apps/potatobeans/privacy/">PotatoBeans Privacy Policy</a> for retained-data limitations and <a href="/apps/potatobeans/support/">Support</a> for help.</p></section>;
}

export function StoriesTerms() {
  return <section id="my-stories"><h2>My Stories</h2><p>My Stories is a local iPhone journaling app. A device backup alone does not guarantee access to protected entries on a replacement device; support cannot recover missing protection keys. Deleted Journals retains entries until permanent deletion, which does not erase external copies or backups. Read the <a href="/apps/my-stories/privacy/">My Stories Privacy Policy</a> and <a href="/apps/my-stories/support/">Support</a> guidance.</p></section>;
}

export function Terms() {
  return <><section className="page-hero shell privacy-hero"><span className="eyebrow">WISDOMMEDIUM · TERMS</span><h1>Terms of Use</h1><LegalDate date={walkmallowPolicyDate} /><nav className="legal-links" aria-label="Terms sections"><a href="#general">General terms</a><a href="/apps/potatobeans/terms/">PotatoBeans</a><a href="/apps/my-stories/terms/">My Stories</a><a href="/apps/cuckooalarm/terms/">CuckooAlarm</a><a href="#walkmallow">Walkmallow</a><a href={smoothcalc.termsPath}>{smoothcalc.name}</a></nav></section><article className="shell prose-page privacy-policy"><GeneralTerms /><PotatoTerms /><StoriesTerms /><WalkmallowTerms /></article></>;
}

export function PotatoPrivacyPage() { return <LegalPage title="PotatoBeans Privacy Policy" slug="potatobeans" name="PotatoBeans"><PotatoPrivacy /><AppPrivacyContact /></LegalPage>; }
export function StoriesPrivacyPage() { return <LegalPage title="My Stories Privacy Policy" slug="my-stories" name="My Stories"><StoriesPrivacy /><AppPrivacyContact /></LegalPage>; }
export function PotatoTermsPage() { return <LegalPage title="PotatoBeans Terms of Use" slug="potatobeans" name="PotatoBeans"><PotatoTerms /><p>The <a href="/terms/#general">general WisdomMedium terms</a> also apply. Questions? Email <a href={emailHref(site.email)}>{site.email}</a>.</p></LegalPage>; }
export function StoriesTermsPage() { return <LegalPage title="My Stories Terms of Use" slug="my-stories" name="My Stories"><StoriesTerms /><p>The <a href="/terms/#general">general WisdomMedium terms</a> also apply. Questions? Email <a href={emailHref(site.email)}>{site.email}</a>.</p></LegalPage>; }

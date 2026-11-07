import { MyStoriesPrivacy } from './legal/MyStoriesPrivacy';
import { WebsitePrivacy, PolicyReviewNotice } from './legal/WebsitePrivacy';
import { Terms } from './legal/Terms';
import { useState } from 'react';
import { appPath, apps, emailHref, site, type AppInfo } from './site';
import { pageForPath, type Page } from './routes';

function Brand() {
  return <a className="brand" href="/" aria-label="WisdomMedium home"><span className="brand-mark" aria-hidden="true">w.</span><span>WisdomMedium</span></a>;
}

function Header() {
  return <header className="site-header"><div className="shell header-inner">
    <Brand />
    <nav className="primary-nav" aria-label="Main navigation">
      <a href="/#apps">Apps</a><a href="/#about">About</a><a href="/support/">Support</a><a href="/contact/">Contact</a>
    </nav>
  </div></header>;
}

function Footer() {
  return <footer className="site-footer"><div className="shell footer-inner">
    <div><a className="footer-brand" href="/">WisdomMedium</a><p>Thoughtful apps for everyday life.</p><small>© 2026 WisdomMedium</small></div>
    <nav aria-label="Footer navigation"><a href="/support/">Support</a><a href="/contact/">Contact</a><a href="/privacy/">Privacy</a><a href="/terms/">Terms</a></nav>
  </div></footer>;
}

function ButtonLink({ href, children, secondary = false }: { href: string; children: React.ReactNode; secondary?: boolean }) {
  return <a className={`button ${secondary ? 'button-secondary' : 'button-primary'}`} href={href}>{children}<span aria-hidden="true">↗</span></a>;
}

export function SectionHeading({ eyebrow, title, children }: { eyebrow: string; title: string; children?: React.ReactNode }) {
  return <div className="section-heading"><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{children && <p>{children}</p>}</div>;
}

export function ReleaseAction({ app }: { app: AppInfo }) {
  if (app.release.status === 'available') {
    return <ButtonLink href={app.release.appStoreUrl}>View on the App Store</ButtonLink>;
  }
  return <span className="status-pill">Coming soon</span>;
}

function AppCard({ app }: { app: AppInfo }) {
  return <article className="app-card">
    <div className="app-card-art" aria-hidden="true">{app.iconPath ? <img className="app-icon" src={app.iconPath} alt="" width="220" height="220" /> : <div className="app-art-lines"><span>make room for</span><strong>what matters.</strong><i></i><i></i><i></i></div>}</div>
    <div className="app-card-copy"><div className="app-card-top"><span className="eyebrow">For {app.platform}</span><ReleaseAction app={app} /></div>
      <h3>{app.name}</h3><p>{app.summary}</p><a className="text-link" href={appPath(app)}>Explore {app.name}<span aria-hidden="true">↗</span></a>
      {app.termsPath && <nav className="app-legal-links" aria-label={`${app.name} information`}><a href={`/support/#${app.slug}`}>Support</a><a href={app.privacyPolicyPath}>Privacy Policy</a><a href={app.termsPath}>Terms of Use</a></nav>}
    </div>
  </article>;
}

function Home() {
  return <>
    <section className="hero shell"><div className="hero-copy"><span className="eyebrow"><span className="eyebrow-dot" />Welcome to WisdomMedium</span>
      <h1>Thoughtful apps for <em>everyday life.</em></h1>
      <p>We build useful apps that make everyday organization and productivity feel a little simpler.</p>
      <div className="actions"><ButtonLink href="/#apps">Explore our apps</ButtonLink><ButtonLink href="/support/" secondary>Get support</ButtonLink></div>
    </div><div className="hero-note" aria-label="WisdomMedium approach"><div className="note-top"><span>01 / OUR APPROACH</span><span className="note-sun" aria-hidden="true" /></div><p>Useful by design.<br />Calm by nature.</p><div className="note-bottom"><span>Made for the moments<br />that make up a day.</span><span className="note-squiggle" aria-hidden="true">⌁</span></div></div></section>

    <section id="apps" className="section apps-section"><div className="shell"><SectionHeading eyebrow="OUR APPS" title="Little tools for fuller days.">A growing collection of thoughtful apps to help life feel more organized.</SectionHeading><div className="app-grid">{apps.map(app => <AppCard key={app.slug} app={app} />)}</div></div></section>

    <section id="about" className="section about-section"><div className="shell about-grid"><div><span className="eyebrow">ABOUT WISDOMMEDIUM</span><h2>Good tools should make space for life.</h2></div><div className="about-copy"><p>WisdomMedium makes apps for the everyday things we all juggle: tasks, ideas, plans, and the thoughts worth keeping.</p><p>We aim for clear, comfortable experiences that help you focus on what matters to you.</p><a className="text-link" href="/contact/">Get in touch <span aria-hidden="true">↗</span></a></div></div></section>
  </>;
}

function Pebbles() {
  const app = apps.find(item => item.slug === 'wm-pebbles')!;
  return <>
    <section className="shell product-hero"><div className="product-copy"><span className="eyebrow">BY WISDOMMEDIUM · FOR IPHONE</span><h1>Meet <em>WM Pebbles.</em></h1><p className="lead">A calmer place for the pieces of your day.</p><p>{app.description}</p><div className="actions"><ReleaseAction app={app} /><ButtonLink href="/support/" secondary>Get support</ButtonLink></div></div><div className="product-art" aria-hidden="true"><div className="product-art-inner"><span>WM Pebbles</span><div className="art-pebbles"><i /><i /><i /></div><strong>One place for<br />your day.</strong></div></div></section>
    <section className="section detail-section"><div className="shell"><SectionHeading eyebrow="A THOUGHTFUL SPACE" title="Keep the everyday together.">The things on your mind deserve a place that feels easy to return to.</SectionHeading><div className="feature-grid"><article className="feature-card mint"><span>01</span><h3>Tasks as pebbles</h3><p>Organize your tasks into pebbles, so the next thing to do feels easier to see.</p></article><article className="feature-card coral"><span>02</span><h3>Notes nearby</h3><p>Keep helpful notes alongside the things you are working through.</p></article><article className="feature-card yellow"><span>03</span><h3>Room to journal</h3><p>Give your reflections a place in the same app as your plans.</p></article></div></div></section>
    <section className="shell product-bottom"><div><span className="eyebrow">GOOD TO KNOW</span><h2>Start simply.</h2><p>WM Pebbles is designed for iPhone. The current app listing says no account is required.</p></div><div className="product-links"><a className="text-link" href="/support/">WM Pebbles support <span aria-hidden="true">↗</span></a><a className="text-link" href={app.privacyPolicyPath}>WM Pebbles privacy policy <span aria-hidden="true">↗</span></a></div></section>
  </>;
}

function MyStories() {
  const app = apps.find(item => item.slug === 'my-stories')!;
  return <>
    <section className="shell product-hero"><div className="product-copy"><span className="eyebrow">BY WISDOMMEDIUM · FOR IPHONE</span><h1>Your words.<br /><em>Your stories.</em></h1><p className="lead">Meet My Stories.</p><p>{app.description}</p><div className="actions"><ReleaseAction app={app} /><ButtonLink href="/support/#my-stories" secondary>Get support</ButtonLink></div></div><div className="product-art stories-art"><img src={app.iconPath} className="app-icon" alt="My Stories app icon: an open book with colorful pages" width="280" height="280" /></div></section>
    <section className="section detail-section"><div className="shell"><SectionHeading eyebrow="ROOM TO REFLECT" title="Make a little space for yourself.">Keep the moments you want to return to.</SectionHeading><div className="feature-grid"><article className="feature-card mint"><span>01</span><h3>Write your way</h3><p>Give everyday thoughts a home with journal entries and rich text formatting.</p></article><article className="feature-card coral"><span>02</span><h3>Keep the moment</h3><p>Add photos, videos and files you choose through your iPhone’s system controls.</p></article><article className="feature-card yellow"><span>03</span><h3>A little more privacy</h3><p>Choose an optional lock for individual entries, with device authentication and device-bound keys.</p></article></div></div></section>
    <section className="shell product-bottom"><div><span className="eyebrow">GOOD TO KNOW</span><h2>A local journal.</h2><p>No WisdomMedium journal account or app-managed cloud synchronization. Keep your original device and passcode: protected entries cannot be recovered if their keys are lost. Read the privacy policy for backup, protection and deletion limitations.</p></div><nav className="product-links" aria-label="My Stories information"><a className="text-link" href="/support/#my-stories">My Stories support</a><a className="text-link" href={app.privacyPolicyPath}>My Stories Privacy Policy</a><a className="text-link" href={app.termsPath}>My Stories Terms of Use</a></nav></section>
  </>;
}

export function CopyEmailButton({ email }: { email: string }) {
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState(false);
  async function copy() {
    if (!navigator.clipboard?.writeText) { setCopied(false); setMessage('Copying is unavailable here. Select the address above or use Email support.'); return; }
    try { await navigator.clipboard.writeText(email); setCopied(true); setMessage('Email address copied.'); }
    catch { setCopied(false); setMessage('Copying did not work. Select the address above or use Email support.'); }
  }
  return <div className="copy-wrap"><button className="copy-button" type="button" onClick={copy}>{copied ? 'Copied' : 'Copy email address'}</button><span className="copy-status" role="status" aria-live="polite">{message}</span></div>;
}

function Support() {
  return <>
    <section className="page-hero shell support-hero"><div><span className="eyebrow">WISDOMMEDIUM · APP SUPPORT</span><h1>How can we <em>help?</em></h1><p className="lead">Need help with My Stories, WM Pebbles or SoapyMoney, found a bug, or have an idea to share? Contact us and include a few details so we can understand the issue.</p></div></section>
    <section className="shell support-main"><div className="support-contact"><span className="eyebrow">EMAIL OUR TEAM</span><h2>Let’s figure it out together.</h2><p className="email-display">{site.email}</p><div className="actions"><ButtonLink href={emailHref(site.email, 'WisdomMedium App Support')}>Email support</ButtonLink><CopyEmailButton email={site.email} /></div><p className="small-note">Email opens in your mail app. You can also copy the address and write from any email service.</p></div><div className="support-tips"><h2>What to include</h2><p>A few details help us understand what happened:</p><ul><li>The app name and version</li><li>Your device model and iOS, iPadOS, macOS or Android version</li><li>What you expected and what happened instead</li></ul><p>Screenshots are optional. Please remove sensitive information before sending them. Do not send passwords, payment information, or private notes. For SoapyMoney, do not send financial records or an entire library backup.</p></div></section>
    <section id="my-stories" className="shell prose-page" aria-labelledby="my-stories-support"><h2 id="my-stories-support">My Stories support</h2><p>For help with the iPhone app, send the app version, iOS version and a description of the issue. Do not send your journal, protected-entry keys, device passcode or private attachments. Screenshots and diagnostics are optional; remove sensitive information first.</p><p>Entries in Deleted Journals can be restored until permanently deleted. Keep your original device and passcode when troubleshooting protected entries; support cannot recover a missing device-bound key or access your local library. Do not remove the app or reset your device as a first troubleshooting step.</p><p><a href="/privacy/#my-stories">My Stories privacy</a> · <a href="/terms/#my-stories">My Stories terms</a> · <a href="mailto:support@wisdommedium.com?subject=My%20Stories%20Support">Email My Stories support</a></p></section>
    <section className="shell prose-page" aria-labelledby="soapymoney-support"><h2 id="soapymoney-support">SoapyMoney support</h2><p>SoapyMoney helps you track user-entered costs and transactions. Include the app version, platform, selected currency and displayed period when reporting an amount that looks unexpected. Changing currency filters your records; it does not convert amounts.</p><p>On iPhone, iPad and native macOS, local use works offline. Optional iCloud sync requires your review and consent. If sync pauses or an account changes, keep your existing installation and recovery copies. Do not reset your library or delete a cloud container to troubleshoot. Pausing sync keeps already uploaded data. Android stores its own local library and does not use Apple CloudKit sync.</p><p>For retention, local backups and cloud-history limitations, read the <a href="/privacy/#soapymoney">SoapyMoney privacy section</a>. Contact us for help without attaching private financial data.</p></section>
    <section className="section support-topics"><div className="shell topic-grid"><article><span className="topic-number">01</span><h2>Found a bug?</h2><p>Tell us what happened and, if you can, the steps that led to it. We’ll use those details to investigate.</p><a className="text-link" href={emailHref(site.email, 'WisdomMedium Bug Report')}>Report a bug <span aria-hidden="true">↗</span></a></article><article><span className="topic-number">02</span><h2>Have an idea?</h2><p>We welcome thoughtful suggestions. Tell us what you’d like to do and how it would help.</p><a className="text-link" href={emailHref(site.email, 'WisdomMedium Feature Suggestion')}>Suggest a feature <span aria-hidden="true">↗</span></a></article></div></section>
  </>;
}

function Contact() {
  const href = emailHref(site.email, 'WisdomMedium Inquiry');
  return <>
    <section className="page-hero shell"><span className="eyebrow">CONTACT WISDOMMEDIUM</span><h1>Get in <em>touch.</em></h1><p className="lead">Questions about WisdomMedium, need help with one of our apps, or have something you’d like to share? We’d be happy to hear from you.</p></section>
    <section className="shell contact-section" aria-label="Email WisdomMedium"><div className="contact-panel">
      <span className="eyebrow">ONE PLACE TO REACH US</span>
      <a className="contact-email" href={href}>{site.email}</a>
      <div className="actions"><ButtonLink href={href}>Email us</ButtonLink></div>
    </div></section>
  </>;
}

function Privacy() {
  return <><section className="page-hero shell privacy-hero"><span className="eyebrow">WISDOMMEDIUM · PRIVACY</span><h1>Privacy <em>Policy</em></h1><p className="privacy-date">Draft updated: <time dateTime="2026-11-07">November 7, 2026</time></p><p className="lead">WisdomMedium respects your privacy.</p></section><article className="shell prose-page privacy-policy">
    <PolicyReviewNotice />
    <nav className="legal-nav" aria-label="Privacy sections"><a href="#website">Website</a><a href="#my-stories">My Stories</a><a href="#wm-pebbles">WM Pebbles</a><a href="#soapymoney">SoapyMoney</a><a href="#support-information">Support information</a><a href="#privacy-requests">Privacy requests</a></nav>
    <WebsitePrivacy />
    <MyStoriesPrivacy />
    <section id="wm-pebbles"><h2>WM Pebbles</h2><p>WM Pebbles does not collect, transmit, sell, rent, or share personal data with WisdomMedium or third parties.</p><p>Tasks, notes, journals, attachments, preferences, and other content created in WM Pebbles are stored locally on the user's device. WisdomMedium does not have access to this content.</p><p>WM Pebbles does not currently use:</p><ul><li>user accounts</li><li>advertising</li><li>tracking</li><li>analytics services</li><li>third-party advertising SDKs</li><li>server-side storage of user content</li></ul></section>
    <section><h2>Photos and Files</h2><p>If a user chooses to add a photo or file to WM Pebbles, that content is accessed only when the user explicitly selects it and is used for the functionality requested by the user. WisdomMedium does not receive or store those files on its servers.</p></section>
    <section><h2>Data Retention and Deletion</h2><p>Because WisdomMedium does not collect or store WM Pebbles user data on its servers, WisdomMedium does not retain personal user data to delete. Users control the content stored locally by the app and can remove that content from within the app or by deleting the app.</p></section>
    <section><h2>Third-Party Services</h2><p>WM Pebbles does not currently use third-party analytics, advertising, or tracking services that collect user data.</p></section>
    <section id="soapymoney"><h2>SoapyMoney (iPhone, iPad and macOS)</h2><h3>Your local financial library</h3><p>SoapyMoney stores the categories, costs, amounts, dates, recurring schedules, transaction names and notes you enter, together with currency and appearance preferences, on your device. Existing income, savings and goal records may also be retained locally. The app does not connect to your bank or create a WisdomMedium account. Its current implementation contains no advertising or analytics SDK.</p><h3>Optional private iCloud synchronization</h3><p>If you review and enable iCloud sync, Apple CloudKit processes a synchronized cost library in your private iCloud database. The payload includes cost categories, items and actual transactions, including their names and notes, selected appearance/currency preferences and synchronization identifiers. Imported legacy costs may be included in that library. Income, savings and goal records are not part of this sync payload. Android uses a separate local library and does not use Apple CloudKit sync.</p><p>Synchronization also stores library and record identifiers, an installation identifier, account-change information, logical revision history, conflict alternatives and deletion markers. The app stores its installation identifier in the operating system Keychain. The financial library is not sent to a WisdomMedium-operated server or made public by the app. Private CloudKit data is not visible through the developer portal; Apple processes the data under its iCloud services and your account settings.</p><h3>Retention, backups and deletion</h3><p>Your device and operating-system backups may retain app data. Recovery copies, exports, other devices and cloud synchronization history may retain prior information. Archiving an item or pausing sync does not erase uploaded data. Deletion markers and conflict history can retain earlier values; deleting a displayed record is not a promise that every historical copy has been immediately erased.</p><p>Removing the app does not necessarily remove cloud data, exported files, device backups or every local file, particularly on macOS. Manage external copies and operating-system/iCloud backups separately. Contact support for help with your local and cloud data. Do not send your entire financial library when requesting help.</p><h3>Browsing, websites and third parties</h3><p>SoapyMoney does not include an embedded browser, maintain browsing history or manage website cookies. Privacy, support and review links open through the system's external handler. Visiting those destinations may send normal web requests to their operators; your browser, operating system and the destination services control their own processing and cookies. This is not a claim that external websites or hosting providers keep no logs or use no cookies.</p><h3>Support information you choose to share</h3><p>If you send support email, WisdomMedium receives the message, your email address and any information or attachments you choose to include. Email service providers also process that correspondence. The app's feedback draft includes the app version and a prompt for your message, without automatically attaching your financial records. Use support@wisdommedium.com for privacy questions or requests about information you have sent to support. Avoid sending sensitive financial details, credentials or payment information.</p><h3>Local notifications</h3><p>If you enable a reminder, the operating system schedules it locally. The app does not use a WisdomMedium remote notification service for that reminder.</p></section>
    <section><h2>Changes to This Privacy Policy</h2><p>This Privacy Policy may be updated as WisdomMedium apps evolve. Each application section is specific to the named app. The existing WM Pebbles and SoapyMoney disclosures are retained from the November 2, 2026 policy draft. This November 7 draft adds website information, support information and My Stories coverage; it is not yet effective. If the app's data practices change, this page and the App Store privacy disclosures will be updated accordingly.</p></section>
    <section><h2>Contact</h2><p>For privacy questions, contact:<br /><a href={`mailto:${site.email}`}>{site.email}</a></p><p>WisdomMedium<br /><a href={site.domain}>{site.domain}</a></p></section>
  </article></>;
}

function NotFound() {
  return <section className="page-hero shell not-found"><span className="eyebrow">404 · PAGE NOT FOUND</span><h1>That page isn’t <em>here.</em></h1><p className="lead">The link may have moved, or the address may have a typo. Let’s get you back on track.</p><div className="actions"><ButtonLink href="/">Go home</ButtonLink><ButtonLink href="/support/" secondary>Visit support</ButtonLink></div></section>;
}

const pageContent: Record<Page, React.ComponentType> = { home: Home, pebbles: Pebbles, support: Support, contact: Contact, privacy: Privacy, myStories: MyStories, terms: Terms, notFound: NotFound };

export function App({ path }: { path: string }) {
  const page = pageForPath(path);
  const Content = pageContent[page.page];
  return <><a className="skip-link" href="#main">Skip to content</a><Header /><main id="main" tabIndex={-1}><Content /></main><Footer /></>;
}

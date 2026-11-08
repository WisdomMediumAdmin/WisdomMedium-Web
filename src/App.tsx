import { LegalDate, operatorDescription, SharedPrivacy, Terms, PotatoPrivacyPage, StoriesPrivacyPage, PotatoTermsPage, StoriesTermsPage } from './AppLegal';
import { PotatoProduct, StoriesProduct, PotatoSupportPage, StoriesSupportPage } from './ReleaseApps';
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
      <a href="/#apps">Apps</a><a href="/#about">About</a><a href="/support/">Support</a><a href="/privacy/">Privacy Policy</a><a href="/terms/">Terms of Use</a>
    </nav>
  </div></header>;
}

function Footer() {
  return <footer className="site-footer"><div className="shell footer-inner">
    <div><a className="footer-brand" href="/">WisdomMedium</a><p>Thoughtful apps for everyday life.</p><small>© 2026 WisdomMedium</small><p className="small-note">Independent apps by Kazi Ahmed Siam.</p></div>
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
    <div className="app-card-art" aria-hidden="true"><div className="app-art-lines"><span>make room for</span><strong>what matters.</strong><i></i><i></i><i></i></div></div>
    <div className="app-card-copy"><div className="app-card-top"><span className="eyebrow">For {app.platform}</span><ReleaseAction app={app} /></div>
      <h3>{app.name}</h3><p>{app.summary}</p><a className="text-link" href={appPath(app)}>Explore {app.name}<span aria-hidden="true">↗</span></a>
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

    <section id="about" className="section about-section"><div className="shell about-grid"><div><span className="eyebrow">ABOUT WISDOMMEDIUM</span><h2>Good tools should make space for life.</h2></div><div className="about-copy"><p>{operatorDescription}</p><p>WisdomMedium makes apps for the everyday things we all juggle: tasks, ideas, plans, and the thoughts worth keeping.</p><p>We aim for clear, comfortable experiences that help you focus on what matters to you.</p><a className="text-link" href="/contact/">Get in touch <span aria-hidden="true">↗</span></a></div></div></section>
  </>;
}

function Pebbles() {
  return <><section className="page-hero shell privacy-hero"><span className="eyebrow">LEGACY APP</span><h1>WM Pebbles</h1><p className="lead">WM Pebbles is being retired. This privacy and support information remains available for existing installations.</p><LegalDate /></section>
    <article className="shell prose-page privacy-policy"><section id="privacy"><h2>Legacy privacy policy</h2><p>Tasks, notes, journals, attachments and preferences created in WM Pebbles are stored locally on your device. WisdomMedium does not receive or have access to that content. The app does not send personal data to WisdomMedium, sell or share it, or use accounts, advertising, tracking, analytics services or server-side content storage.</p><p>Photos and files are accessed when you select them for use in the app. They are not uploaded to a WisdomMedium server.</p></section><section><h2>Retention and deletion</h2><p>You can remove local content in the app or by deleting the app. WisdomMedium has no server copy to delete. Backups and copies you saved outside the app must be managed separately.</p></section><section id="support"><h2>Support for existing users</h2><p>Email <a href={emailHref(site.email, 'WM Pebbles Support')}>{site.email}</a> with the app version, iPhone model and a description of the issue. Keep the original installation when investigating missing data. Do not send private content or passwords.</p><p>The <a href="/privacy/#website-and-support">website and support privacy policy</a> explains how Kazi Ahmed Siam, operating as WisdomMedium, handles your correspondence.</p></section></article></>;
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
    <section className="page-hero shell support-hero"><div><span className="eyebrow">WISDOMMEDIUM · APP SUPPORT</span><h1>How can we <em>help?</em></h1><p className="lead">Need help with PotatoBeans or My Stories, found a bug, or have an idea to share? Contact us and include a few details so we can understand the issue.</p></div></section>
    <section className="shell support-main"><div className="support-contact"><span className="eyebrow">EMAIL SUPPORT</span><p>Support and privacy contact for Kazi Ahmed Siam, operating as WisdomMedium.</p><h2>Let’s figure it out together.</h2><p className="email-display">{site.email}</p><div className="actions"><ButtonLink href={emailHref(site.email, 'WisdomMedium App Support')}>Email support</ButtonLink><CopyEmailButton email={site.email} /></div><p className="small-note">Email opens in your mail app. You can also copy the address and write from any email service.</p></div><div className="support-tips"><h2>What to include</h2><p>A few details help us understand what happened:</p><ul><li>The app name and version</li><li>Your device model and iOS, iPadOS or macOS version</li><li>What you expected and what happened instead</li></ul><p>Screenshots are optional. Please remove sensitive information before sending them. Do not send passwords, payment information, or private notes.</p></div></section>
    <div className="shell prose-page"><nav className="legal-links" aria-label="App support pages"><a id="potatobeans" href="/apps/potatobeans/support/">PotatoBeans support page</a><a id="my-stories" href="/apps/my-stories/support/">My Stories support page</a></nav><p className="small-note" id="wm-pebbles">For a retired installation, visit <a href="/apps/wm-pebbles/#support">legacy WM Pebbles support</a>.</p></div>
    <section className="section support-topics"><div className="shell topic-grid"><article><span className="topic-number">01</span><h2>Found a bug?</h2><p>Tell us what happened and, if you can, the steps that led to it. We’ll use those details to investigate.</p><a className="text-link" href={emailHref(site.email, 'WisdomMedium Bug Report')}>Report a bug <span aria-hidden="true">↗</span></a></article><article><span className="topic-number">02</span><h2>Have an idea?</h2><p>We welcome thoughtful suggestions. Tell us what you’d like to do and how it would help.</p><a className="text-link" href={emailHref(site.email, 'WisdomMedium Feature Suggestion')}>Suggest a feature <span aria-hidden="true">↗</span></a></article></div></section>
  </>;
}

function Contact() {
  const href = emailHref(site.email, 'WisdomMedium Inquiry');
  return <>
    <section className="page-hero shell"><span className="eyebrow">CONTACT WISDOMMEDIUM</span><h1>Get in <em>touch.</em></h1><p className="lead">Questions about WisdomMedium, need help with one of our apps, or have something you’d like to share? We’d be happy to hear from you.</p></section>
    <section className="shell contact-section" aria-label="Email WisdomMedium"><div className="contact-panel">
      <span className="eyebrow">ONE PLACE TO REACH US</span><p>{operatorDescription}</p>
      <a className="contact-email" href={href}>{site.email}</a>
      <div className="actions"><ButtonLink href={href}>Email us</ButtonLink></div>
    </div></section>
  </>;
}

function Privacy() {
  return <><section className="page-hero shell privacy-hero"><span className="eyebrow">WISDOMMEDIUM · PRIVACY</span><h1>Privacy <em>Policy</em></h1><LegalDate /><p className="lead">Read how your app stores information and how to manage it.</p><nav className="legal-links" aria-label="App privacy policies"><a id="potatobeans" href="/apps/potatobeans/privacy/">PotatoBeans Privacy Policy</a><a id="my-stories" href="/apps/my-stories/privacy/">My Stories Privacy Policy</a></nav></section><article className="shell prose-page privacy-policy"><SharedPrivacy /><p className="small-note" id="wm-pebbles">Existing installations: <a href="/apps/wm-pebbles/#privacy">WM Pebbles legacy privacy and support</a>.</p></article></>;
}

function NotFound() {
  return <section className="page-hero shell not-found"><span className="eyebrow">404 · PAGE NOT FOUND</span><h1>That page isn’t <em>here.</em></h1><p className="lead">The link may have moved, or the address may have a typo. Let’s get you back on track.</p><div className="actions"><ButtonLink href="/">Go home</ButtonLink><ButtonLink href="/support/" secondary>Visit support</ButtonLink></div></section>;
}

const pageContent: Record<Page, React.ComponentType> = { home: Home, pebbles: Pebbles, support: Support, contact: Contact, privacy: Privacy, terms: Terms, potato: PotatoProduct, stories: StoriesProduct, potatoPrivacy: PotatoPrivacyPage, storiesPrivacy: StoriesPrivacyPage, potatoTerms: PotatoTermsPage, storiesTerms: StoriesTermsPage, potatoSupport: PotatoSupportPage, storiesSupport: StoriesSupportPage, notFound: NotFound };

export function App({ path }: { path: string }) {
  const page = pageForPath(path);
  const Content = pageContent[page.page];
  return <><a className="skip-link" href="#main">Skip to content</a><Header /><main id="main"><Content /></main><Footer /></>;
}

import type { ReactNode } from 'react';
import { AppIcon } from './AppIcon';
import { ReleaseAction } from './ReleaseAction';
import { appPath, emailHref, site, soapymoney as app } from './site';

function InformationLinks() {
  return <nav className="legal-links" aria-label={`${app.name} information`}>
    <a href={appPath(app)}>{app.name}</a>
    <a href={app.privacyPolicyPath}>Privacy Policy</a>
    <a href={app.termsPath}>Terms of Use</a>
    <a href={app.supportPath}>Support</a>
  </nav>;
}

function ContactLink({ topic }: { topic: string }) {
  return <a href={emailHref(site.email, `${app.name} ${topic}`)}>{site.email}</a>;
}

export function SoapyMoneyProduct() {
  return <>
    <section className="page-hero shell branded-product-hero">
      <div>
        <span className="eyebrow">Personal finance · Expense tracking for {app.platform}</span>
        <h1><em>{app.name}</em></h1>
        <p className="lead">{app.tagline}</p>
        <p>{app.summary} {app.description}</p>
        <p>Version {app.version} works offline on your iPhone and requires {app.minimumOS} or later.</p>
        <ReleaseAction app={app} />
        <InformationLinks />
      </div>
      <div className={`product-icon-panel app-art--${app.slug}`}><AppIcon app={app} priority /></div>
    </section>
    <section className="shell app-screens" aria-labelledby="expense-screens">
      <h2 id="expense-screens">Inside {app.name}</h2>
      <ul>{app.screenshots.map(shot => <li key={shot.file}><figure>
        <img src={`/images/apps/${app.slug}/${shot.file}.webp`} alt={shot.alt} width="660" height="1434" loading="lazy" decoding="async" />
        <figcaption>{shot.caption}</figcaption>
      </figure></li>)}</ul>
    </section>
  </>;
}

function InformationPage({ title, dated, children }: { title: string; dated?: boolean; children: ReactNode }) {
  return <>
    <section className="page-hero shell privacy-hero">
      <span className="eyebrow">WisdomMedium · {app.platform} · Version {app.version}</span>
      <h1>{app.name} {title}</h1>
      {dated && <p className="privacy-date">Effective <time dateTime="2026-11-11">November 11, 2026</time></p>}
      <InformationLinks />
    </section>
    <article className="shell prose-page privacy-policy">{children}</article>
  </>;
}

export function SoapyMoneyPrivacy() {
  return <InformationPage title="Privacy Policy" dated>
    <section><h2>Your expense library</h2>
      <p>Kazi Ahmed Siam operates {app.name} under the WisdomMedium brand. This policy covers version {app.version} for iPhone.</p>
      <p>You choose which categories, item names, amounts, currencies, dates, schedules, useful lives, payments, refunds and notes to enter. The app saves these records and your display preferences on your iPhone so you can use them offline. An existing library may also contain older income, savings and goal records, recovery copies and sync history.</p>
      <p>WisdomMedium cannot access your financial records through the app. The app has no publisher account, bank connection or payment service. Please keep bank credentials and card numbers out of your notes.</p>
    </section>
    <section><h2>iCloud and backups</h2>
      <p>Version {app.version} does not sync your library through iCloud or CloudKit. Depending on your settings, Apple or a computer may back up eligible app data. This version leaves any private iCloud records from earlier builds in place. You can manage backups and earlier cloud copies through the relevant device, computer or Apple Account. WisdomMedium cannot retrieve them.</p>
    </section>
    <section><h2>Tracking, diagnostics and external services</h2>
      <p>The app includes no advertising, analytics SDK or cross-app tracking. It does not send your library to the developer or a third-party service. Apple operates the App Store, device backups and optional system diagnostics under its own policies.</p>
      <p>If you open a website, compose an email or share feedback, your browser, email provider or chosen recipient receives the information needed for that action. The <a href="/privacy/#website-and-support">website and support privacy notice</a> explains how this site is hosted.</p>
    </section>
    <section><h2>When you contact support</h2>
      <p>If you email <ContactLink topic="Support" />, WisdomMedium and its email provider receive your sender details, message and any attachments you choose to send. The feedback draft includes the app version. Your library is never attached automatically. We use your correspondence to answer questions and investigate problems. Support email has no fixed automatic deletion period.</p>
    </section>
    <section><h2>Retention, deletion and security</h2>
      <p>You can delete individual expense items and transactions. Archiving a category keeps its history. Deleting a cost estimate preserves separately recorded payments and refunds. Use <strong>Delete App</strong> on your iPhone to remove the installation’s local app data. Offloading the app keeps that data.</p>
      <p>Recovery copies can retain earlier entries. A device-only Keychain identifier left by an earlier installation may survive uninstall. Earlier backups, private cloud records, exported or shared copies and sent email may also remain. Manage those copies with the device, service or recipient that holds them.</p>
      <p>Protect access to your iPhone and backups, and keep independent copies of important records. No storage or recovery method guarantees security or availability.</p>
    </section>
    <section><h2>Your privacy choices</h2>
      <p>Email <ContactLink topic="Privacy" /> to request access to, correction of or deletion of information you sent us. Where applicable, you may also request a copy, restrict or object to processing, withdraw consent or complain to your local privacy authority. We can act on information WisdomMedium holds. We will publish changes here and update the policy date when our practices change.</p>
    </section>
  </InformationPage>;
}

export function SoapyMoneyTerms() {
  return <InformationPage title="Terms of Use" dated>
    <section><h2>App Store license and personal use</h2>
      <p>Kazi Ahmed Siam, operating as WisdomMedium, provides {app.name} for personal expense tracking. Apple’s <a href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/">Standard End User License Agreement</a> governs your App Store license. These terms supplement that agreement and preserve the rights it and applicable law grant you.</p>
      <p>You may use the app on an iPhone you own or control in accordance with Apple’s Usage Rules. WisdomMedium and its licensors retain their rights in the software, design and branding. You retain your rights in your entries. Use the app lawfully and enter only material you have permission to use. Do not redistribute or sell the software, interfere with its security or reverse engineer it except as the license or applicable law permits.</p>
    </section>
    <section><h2>Estimates and financial decisions</h2>
      <p>You are responsible for the amounts, currencies, dates and assumptions you enter. Average costs may differ from payments. A recurring estimate does not record a payment. Selecting a currency filters entries without converting their values. Verify important figures against your own records before relying on them.</p>
      <p>{app.name} provides no professional financial advice, banking, payment processing or brokerage service. Using it creates no advisory relationship and carries no promise of savings or other financial results.</p>
    </section>
    <section><h2>Backups and availability</h2>
      <p>Version {app.version} keeps your library on your iPhone. Keep independent copies of important financial records. Device failure, deletion or changes to Apple services can affect access and recovery. App Store distribution, device backups, browser and email tools depend on their respective providers and terms.</p>
    </section>
    <section><h2>Warranties and liability</h2>
      <p>To the extent permitted by applicable law and the license, the app is provided as available. WisdomMedium cannot guarantee accuracy, uninterrupted operation or successful data recovery. The license’s warranty terms and limitations of liability apply. You keep all consumer protections, remedies and rights that applicable law makes mandatory.</p>
    </section>
    <section><h2>Updates, termination and contact</h2>
      <p>You can stop using the app at any time. The license’s termination provisions apply to breaches. Updates may change features, compatibility or availability. We will publish revised terms here with an updated date. For questions about these terms, email <ContactLink topic="Terms" />.</p>
    </section>
  </InformationPage>;
}

export function SoapyMoneySupport() {
  return <InformationPage title="Support">
    <section><h2>Contact support</h2>
      <p>Email <ContactLink topic="Support" /> with questions about expenses, categories, deletion or privacy. For a bug, include the app version, iPhone model, iOS version, what you expected and the steps that produced the issue. Redact amounts, account details and other private information from screenshots. Sample figures are enough.</p>
    </section>
    <section><h2>Why is a scheduled bill missing from Recent Transactions?</h2>
      <p>A scheduled bill contributes to your cost estimate. When you pay it, log a payment in <strong>Recent Transactions</strong>. Record refunds separately. In <strong>Report</strong>, you can compare estimated costs with the cash you recorded.</p>
    </section>
    <section><h2>Where are my expenses?</h2>
      <p>Check the selected currency and date filters. Switching currencies shows entries recorded in that currency without converting their amounts. Archiving a category keeps its history. Deleting an estimate keeps its separately recorded payments and refunds.</p>
    </section>
    <section><h2>Can I sync or recover my library?</h2>
      <p>The library works offline on your iPhone. Version {app.version} offers no cross-device sync. Device backups depend on your settings. If records appear to be missing, preserve your app data before reinstalling. Support cannot restore your private library.</p>
      <p>For instructions on deleting local records, managing backups or requesting deletion of support email, read the <a href={app.privacyPolicyPath}>{app.name} Privacy Policy</a>.</p>
    </section>
  </InformationPage>;
}

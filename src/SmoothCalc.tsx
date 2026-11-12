import type { ReactNode } from 'react';
import { AppIcon } from './AppIcon';
import { ReleaseAction } from './ReleaseAction';
import { appPath, emailHref, site, smoothcalc as app } from './site';

function InformationLinks() {
  return <nav className="legal-links" aria-label={`${app.name} information`}>
    <a href={appPath(app)}>{app.name}</a>
    <a href={app.privacyPolicyPath}>Privacy Policy</a>
    <a href={app.termsPath}>Terms of Use</a>
    <a href={app.supportPath}>Support</a>
  </nav>;
}

export function SmoothCalcProduct() {
  return <>
    <section className="page-hero shell branded-product-hero">
      <div>
        <span className="eyebrow">For {app.platform} · Requires {app.minimumOS} or later</span>
        <h1><em>{app.name}</em></h1>
        <p className="lead">{app.summary}</p>
        <p>{app.description}</p>
        <ReleaseAction app={app} />
        <InformationLinks />
      </div>
      <div className={`product-icon-panel app-art--${app.slug}`}><AppIcon app={app} priority /></div>
    </section>
    <section className="shell app-screens" aria-labelledby="calculator-screens-title">
      <h2 id="calculator-screens-title">Inside {app.name}</h2>
      <ul>{app.screenshots.map(shot => <li key={shot.src}><figure>
        <img src={shot.src} width="660" height="1434" loading="lazy" decoding="async" alt={shot.alt} />
        <figcaption>{shot.caption}</figcaption>
      </figure></li>)}</ul>
    </section>
  </>;
}

function InformationPage({ title, dated = false, children }: { title: string; dated?: boolean; children: ReactNode }) {
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

export function SmoothCalcPrivacy() {
  return <InformationPage title="Privacy Policy" dated>
    <section><h2>What stays on your iPhone</h2>
      <p>Kazi Ahmed Siam operates {app.name} under the WisdomMedium brand. The calculator evaluates expressions and plots graphs on your iPhone. It works offline without an account. WisdomMedium does not receive the calculations you enter or the results you see.</p>
      <p>The app stores sheets and their calculation blocks, expressions and results, history entries and dates, favorites, and graph functions and view settings in its local database. Your theme, app icon, language, region, number formatting and angle-unit preferences are stored locally as well.</p>
    </section>
    <section><h2>Clipboard and permissions</h2>
      <p>Tapping <strong>Copy</strong> writes the selected value to the system clipboard. Tapping <strong>Paste</strong> reads from it. The app does not monitor the clipboard in the background. iOS manages copied text outside the app, including any clipboard sharing you have enabled. Calculating and graphing require no access to your location, contacts, photos, camera, microphone or health information.</p>
    </section>
    <section><h2>Network use and diagnostics</h2>
      <p>{app.name} has no app-operated network service, cloud sync, ads, tracking or third-party analytics SDKs. It does not upload calculations, usage events, crash reports or logs. The app can record storage errors in the local iOS system log. Apple’s own device diagnostics and backup services are governed by your Apple settings.</p>
      <p>Opening a legal or support link visits this website. GitHub Pages records IP addresses for security. If you email support, WisdomMedium and its email provider receive your address, message and any attachments you send. Support correspondence has no fixed automatic deletion period. You can request deletion by email. The <a href="/privacy/#website-and-support">website and support policy</a> explains these practices.</p>
    </section>
    <section><h2>Retention, reset and backups</h2>
      <p>Sheets and graphs stay in local storage until you change or remove them. History keeps the latest 500 entries, and you can delete entries or clear history. There can be up to 40 active favorites. Removing a favorite hides it from the list. Up to 80 removed favorite records, including their expressions, can remain in local storage.</p>
      <p>To clear the calculator workspace, choose <strong>Settings → Reset Calculator Data</strong> and confirm. A successful reset clears sheets, blocks, graphs, history and favorites, including removed favorites. It creates a fresh sheet and keeps your preferences. If a save fails, the app rolls back the change. If its database cannot open, the app preserves the original store and disables reset while using temporary storage.</p>
      <p>Deleting the app removes its local app data from that installation. Offloading keeps its documents and data. Apple-managed device backups may include app data. A reset or app deletion does not erase earlier backups, screenshots, clipboard copies, copies you shared or email you sent. You manage those copies separately. WisdomMedium has no server copy to restore.</p>
    </section>
    <section><h2>Privacy contact</h2>
      <p>For privacy questions or requests about support correspondence, email <a href={emailHref(site.email, `${app.name} Privacy`)}>{site.email}</a>. We will update this policy and its date when practices change.</p>
    </section>
  </InformationPage>;
}

export function SmoothCalcTerms() {
  return <InformationPage title="Terms of Use" dated>
    <section><h2>Using the calculator</h2>
      <p>Kazi Ahmed Siam provides {app.name} under the WisdomMedium brand for everyday calculations, scientific expressions and graphing. You may use the app on your iPhone under the license that accompanies your App Store download. Apple’s <a href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/">Standard End User License Agreement</a> applies when no custom license is supplied. These terms supplement that license.</p>
    </section>
    <section><h2>Checking calculations and graphs</h2>
      <p>Precision, rounding, the expression you enter and the selected angle unit can change a result. A plotted curve uses sampled values and can miss a discontinuity or an intersection. Errors are possible in both calculations and graphs. Verify important results independently before using them to make financial, engineering, health or other consequential decisions. The app provides no professional advice or guarantee of accuracy.</p>
    </section>
    <section><h2>Ownership and permitted use</h2>
      <p>The software, branding and artwork are protected by applicable intellectual property law. You retain your rights in your own work. Use the app lawfully and respect the rights of others. Do not copy or redistribute the software or artwork, bypass protections or interfere with the app except as permitted by the applicable license or law.</p>
    </section>
    <section><h2>Updates, warranties and liability</h2>
      <p>Features, system requirements and availability may change with updates. Keep a separate copy of work you need. To the extent permitted by law, we do not warrant uninterrupted operation, error-free results or recovery of local work. Warranties and liability are governed by the applicable app license and law. These terms preserve mandatory consumer rights, statutory warranties and liability that cannot lawfully be excluded.</p>
      <p>Our <a href="/terms/#general">general terms</a> also apply. For questions, email <a href={emailHref(site.email, `${app.name} Terms`)}>{site.email}</a>.</p>
    </section>
  </InformationPage>;
}

export function SmoothCalcSupport() {
  return <InformationPage title="Support">
    <section><h2>Choose a calculator mode</h2>
      <p>Use <strong>Calculator</strong> for everyday arithmetic. Switch to <strong>Scientific</strong> to edit an expression or use powers, roots, logarithms and trigonometric functions. Select <strong>DEG</strong> for degrees or <strong>RAD</strong> for radians. For example, sin(90) gives 1 in degree mode.</p>
      <p>In <strong>Graphing</strong>, enter a function of x, such as sin(x). Pan or zoom to change the view, use Fit to bring the curve into view, or Trace to inspect values along it. Graphing always uses radians, independently of the Scientific setting.</p>
    </section>
    <section><h2>Find saved work and change preferences</h2>
      <p>Use sheets to keep calculations together. Open <strong>History</strong> to revisit recent calculations, or save a frequently used expression to Favorites. Settings lets you change the default angle unit, number formatting, theme and app icon. Your sheets, history and preferences are stored on this iPhone.</p>
    </section>
    <section><h2>Storage warnings and starting fresh</h2>
      <p>If the app shows a temporary-storage warning, it could not open its usual database. Your original store is preserved, reset is disabled and new work in temporary storage may be lost when the app closes. Keep the installation and copy anything you need before closing it. Contact support with the warning text. Support has no server backup of your calculations.</p>
      <p>To intentionally start fresh during normal use, choose <strong>Settings → Reset Calculator Data</strong> and confirm. This clears your calculator work and favorites, creates a fresh sheet and keeps your preferences. For backup and deletion details, read the <a href={app.privacyPolicyPath}>{app.name} Privacy Policy</a>.</p>
    </section>
    <section><h2>Contact support</h2>
      <p>Email <a href={emailHref(site.email, `${app.name} Support`)}>{site.email}</a> with the app version, iPhone model, iOS version and the steps that produced the issue. For an unexpected result, include the mode, angle unit and a small example with the expected and actual answers. Replace any private figures with sample numbers and redact screenshots before sending.</p>
    </section>
  </InformationPage>;
}

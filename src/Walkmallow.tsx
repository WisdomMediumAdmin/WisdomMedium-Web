import { AppIcon } from './AppIcon';
import { ReleaseAction } from './ReleaseAction';
import { emailHref, site, walkmallow } from './site';

export const walkmallowPolicyDate = '2026-11-11';

function EffectiveDate() {
  return <p className="privacy-date"><time dateTime={walkmallowPolicyDate}>Effective November 11, 2026</time></p>;
}

const screenshots = [
  ['today', 'Today', 'Daily steps and stand hours above an illustrated view of Brooklyn.'],
  ['walking', 'On a walk', 'A companion in DUMBO with a live walk count and a Brooklyn Bridge step goal.'],
  ['journeys', 'Virtual journeys', 'Indoor, Treadmill and Outdoor modes with Brooklyn Bridge, Central Park and SoHo routes.'],
  ['companions', 'Companions', 'The character picker with Mint selected and other companions to choose from.'],
  ['progress', 'Your progress', 'A weekly step chart and the selected day’s step and stand-hour totals.']
];

export function WalkmallowProduct() {
  return <>
    <section className="page-hero shell branded-product-hero">
      <div>
        <span className="eyebrow">For iPhone · Requires iOS 18.6 or later</span>
        <h1><em>Walkmallow</em></h1>
        <p className="lead">A companion for your steps</p>
        <p>{walkmallow.description}</p>
        <p>See daily steps and available history, choose your companion and app icon, and set optional reminders to take a stand break. Connect Apple Health if you want to use its available daily step and stand-hour totals. Your walking history and preferences stay in the app on your iPhone, with no account, ads or analytics uploads.</p>
        <ReleaseAction app={walkmallow} comingSoonLabel="Coming soon on the App Store" />
        <nav className="legal-links" aria-label="Walkmallow information">
          <a href={walkmallow.privacyPolicyPath}>Privacy Policy</a>
          <a href="/terms/#walkmallow">Terms of Use</a>
          <a href="/support/#walkmallow">Support</a>
        </nav>
      </div>
      <div className="product-icon-panel app-art--walkmallow"><AppIcon app={walkmallow} priority /></div>
    </section>
    <section className="shell walkmallow-screens" aria-labelledby="walkmallow-screens-title">
      <h2 id="walkmallow-screens-title">Inside Walkmallow</h2>
      <ul>
        {screenshots.map(([file, caption, alt]) => <li key={file}><figure>
          <img src={`/images/apps/walkmallow/${file}.webp`} alt={alt} width="660" height="1434" loading="lazy" decoding="async" />
          <figcaption>{caption}</figcaption>
        </figure></li>)}
      </ul>
    </section>
  </>;
}

export function WalkmallowPrivacy() {
  return <section id="walkmallow" aria-labelledby="walkmallow-privacy-title">
    <h2 id="walkmallow-privacy-title">Walkmallow — Privacy Policy</h2>
    <EffectiveDate />
    <p>Kazi Ahmed Siam operates Walkmallow under the WisdomMedium brand. You can track walks, choose a companion and explore illustrated routes on your iPhone without an account.</p>
    <h3>Motion &amp; Fitness</h3>
    <p>With your permission, Walkmallow reads step counts and observation times from your iPhone’s pedometer. It saves walk intervals and daily totals to show progress, keep history and advance your virtual route. During a visible, active walk, temporary motion signals animate your companion. The app never saves or transmits those raw signals or uses them to award steps. Walkmallow does not request your location or measure geographic distance.</p>
    <h3>Optional Apple Health access</h3>
    <p>You can give Walkmallow permission through Apple Health to read step counts and Apple stand hours. Walkmallow uses readable Health totals for daily steps and qualifying stand hours. It caches daily summaries, their source and the dates covered on your iPhone. A daily Health step total takes priority over overlapping phone counts. Individual walks and route progress use carried-phone steps. Walkmallow never writes to Health.</p>
    <p>If Health has no readable data, phone-based steps remain available on a supported iPhone with Motion &amp; Fitness permission. You can revoke Health sharing for Walkmallow in the Health app and change Motion &amp; Fitness access in iPhone Settings. Turning off either permission leaves previously saved history in place.</p>
    <h3>Stand reminders</h3>
    <p>If you allow notifications, iOS schedules reminders on your iPhone. You can change the schedule in Walkmallow and manage notification permission in Settings. A reminder does not detect posture or record a break. You confirm stand breaks yourself.</p>
    <h3>Local storage, backups and deletion</h3>
    <p>Walkmallow keeps your companion, icon, goals, mode and reminder settings, walk history, route progress, confirmed breaks and daily activity summaries in private app storage. The activity folder and its recovery copies are excluded from device backups. Walkmallow has no cloud sync or server backup. Earlier development backups are unaffected. Apple manages Health storage and any Health synchronization separately under your Apple settings.</p>
    <p>Saved records have no automatic expiry or in-app erase button. To erase this installation’s records, open iPhone <strong>Settings → General → iPhone Storage → Walkmallow → Delete App</strong>. Offload App keeps your records. Deleting Walkmallow leaves Apple Health records in Health, where you can manage them separately. WisdomMedium cannot remotely view, restore or delete your local activity.</p>
    <h3>Developer access and support</h3>
    <p>Walkmallow processes fitness data on your iPhone. The app sends no steps, Health records, motion samples or walking history to WisdomMedium or third parties. It has no advertising, tracking, analytics or crash-report uploads, remote push notifications or third-party runtime SDKs. It does not use fitness data for marketing. Walkmallow is a general-purpose walking companion with no child accounts, messaging or social sharing.</p>
    <p>Opening a support or legal link sends an ordinary browser request with no activity values or app identifiers attached. If you email us, we and our email provider receive the message and attachments you choose to send. Please omit Health records. For privacy questions, email <a href={emailHref(site.email)}>{site.email}</a>. Our <a href="#website-and-support">website and support policy</a> explains hosting, email retention, deletion requests and policy updates.</p>
  </section>;
}

export function WalkmallowTerms() {
  return <section id="walkmallow" aria-labelledby="walkmallow-terms-title">
    <h2 id="walkmallow-terms-title">Walkmallow — Additional Terms</h2>
    <EffectiveDate />
    <p>Walkmallow is an iPhone walking and fitness-motivation app operated by Kazi Ahmed Siam under the WisdomMedium brand. Its animated companions, illustrated routes and activity displays are for everyday movement. Walkmallow is not a medical device and does not provide medical advice, diagnosis or treatment.</p>
    <h3>Step counts and safe use</h3>
    <p>Step counts, stand hours and progress estimates can differ from actual activity or readings on other devices. Results and update times depend on your iPhone, sensor availability, permissions, Apple Health and iOS. A companion’s animation may fall between recorded steps. Virtual routes use illustrative step goals and provide no GPS navigation or measured distance. We cannot guarantee measurement accuracy or a particular fitness result.</p>
    <p>Choose walks within your physical limits. Stay aware of traffic and your surroundings, and stop somewhere safe before looking at or interacting with your iPhone.</p>
    <h3>License, artwork and availability</h3>
    <p>The applicable App Store license and platform rules govern your use of Walkmallow. The software, branding and original companion illustrations are protected by applicable intellectual property law. Do not unlawfully copy or redistribute them, interfere with the app without authorization or use it unlawfully. You retain any rights granted by law or the applicable license.</p>
    <p>Features, visuals, characters, supported devices and availability may change. To the extent permitted by law, we do not warrant uninterrupted or error-free operation or recovery of local records. The applicable app license and law govern warranties and liability. Nothing in these terms limits mandatory consumer protections, statutory warranties or liability that cannot lawfully be excluded.</p>
    <p>Read the <a href="#general">general terms and Apple license information</a> and the <a href={walkmallow.privacyPolicyPath}>Walkmallow privacy policy</a>. For questions, email <a href={emailHref(site.email)}>{site.email}</a>.</p>
  </section>;
}

export function WalkmallowSupport() {
  return <section id="walkmallow" aria-labelledby="walkmallow-support-title">
    <h2 id="walkmallow-support-title">Walkmallow support</h2>
    <h3>My steps are missing or slow to update</h3>
    <p>In Walkmallow, open <strong>Settings → Data sources → Connect phone steps</strong>. If access was denied, use <strong>Open iOS Settings</strong> and allow Motion &amp; Fitness. Start or resume your walk and carry the iPhone with you, including on a treadmill. A phone resting on the equipment cannot count your footfalls. Counts can arrive in batches. Reopen Walkmallow to refresh available intervals after time away.</p>
    <h3>Health is empty or another device shows a different total</h3>
    <p>Choose <strong>Connect Apple Health</strong> in Data sources, or review Walkmallow’s sharing permissions in the Health app. An empty result can mean there are no samples or none the app can read. Apple does not tell Walkmallow which is true. Phone steps still work if Motion &amp; Fitness is available and allowed.</p>
    <p>Daily Health totals may include other devices and later corrections. Walkmallow uses a readable Health step total in place of overlapping phone counts. A virtual walk credits only steps recorded by the iPhone you carry during that session.</p>
    <h3>My companion or reminders seem out of time</h3>
    <p>Animation responds to movement while the walk is visible. Its timing can differ from pedometer updates without changing your step credit. For reminders, check <strong>Settings → Stand reminders</strong> in Walkmallow and notification permission in iPhone Settings. Reminders follow your schedule. They cannot sense posture or confirm a break for you.</p>
    <h3>How do I remove my data?</h3>
    <p>Your history and preferences stay on this installation and are excluded from device backups. Support cannot restore them. To remove them, choose <strong>Settings → General → iPhone Storage → Walkmallow → Delete App</strong>. Offload App keeps them. Manage Apple Health records separately in Health. Revoking a permission leaves saved Walkmallow history in place.</p>
    <h3>Contact Walkmallow support</h3>
    <p><a href={emailHref(site.email, 'Walkmallow Support')}>Email Walkmallow support</a> at {site.email}. Include the version from <strong>Settings → About &amp; privacy</strong>, your iPhone model, iOS version and the steps that led to the issue. Screenshots are optional. Hide activity data and other private details before sending.</p>
  </section>;
}

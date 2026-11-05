import { site } from '../site';

export function PolicyReviewNotice() {
  return <aside className="legal-review" data-legal-draft="true"><strong>Review draft · November 5, 2026</strong><p>This policy update is not yet effective. Publication awaits verification of the release, operator details and support practices.</p></aside>;
}

export function WebsitePrivacy() {
  return <>
    <section id="website"><h2>Website privacy</h2>
      <p>WisdomMedium is the brand used for this website and the applications identified below. Each app section describes that app’s practices; statements about one app do not apply automatically to another.</p>
      <p>This website is a static site hosted on GitHub Pages and delivered through its hosting and caching infrastructure. GitHub states that it logs and stores visitors’ IP addresses for security. Requests also necessarily reach hosting infrastructure with the requested address and normal browser request information. See <a href="https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages#data-collection">GitHub Pages data collection</a> and the <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement">GitHub Privacy Statement</a> for provider practices.</p>
      <p>Our website code does not set cookies, use browser storage for visitor profiles, or include advertising, tracking pixels or analytics services. Fonts and page assets load locally from the site, without embedded third-party fonts, videos or social widgets. Hosting security logs are separate from the website code; we do not promise that hosting providers collect no data or retain it for a particular period.</p>
      <p>External links and email links open destinations you choose to visit. Those providers, including your email provider, apply their own privacy practices. This site has no visitor account system, contact-form backend or online journal upload service.</p>
    </section>
    <section id="support-information"><h2>Support communications</h2>
      <p>When you email <a href={`mailto:${site.email}`}>{site.email}</a>, WisdomMedium receives your email address, message and any details or attachments you include. Support correspondence is received through Google’s email services, and your own email provider also processes the message. Sending email does not give us automatic access to your app’s local journal.</p>
      <p>We use information you choose to send to respond to your request and investigate the issue you report. Only include the app version, device and operating-system version, and a description of the problem where possible. Screenshots and diagnostic files are optional; review them for private information first.</p>
      <p>Messages and attachments remain in the support mailbox unless removed. You can request deletion of correspondence you have sent. Mail-system backups or records that must be kept for applicable legal obligations can limit immediate removal of every copy. We do not promise automatic deletion after a fixed period.</p>
    </section>
    <section id="privacy-requests"><h2>Your choices and privacy requests</h2>
      <p>You control journal data stored on your device using the app and operating-system controls. We can address requests about information we hold, such as support correspondence, but cannot remotely delete or recover a My Stories journal.</p>
      <p>Depending on the law that applies to you, you may have rights to request access, correction, deletion or a copy of personal information we hold, to object to or restrict processing, or to complain to your privacy regulator. Email support with the subject “Privacy request” and describe the request. We may ask for information reasonably needed to verify it; do not send your journal, password or identity documents unless a justified verification process is agreed.</p>
    </section>
  </>;
}

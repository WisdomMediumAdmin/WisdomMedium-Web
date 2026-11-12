import { appPath, mochigoals, site, smoothcalc, soapymoney } from './site';

export type Page = 'home' | 'pebbles' | 'support' | 'contact' | 'privacy' | 'terms' | 'potato' | 'stories' | 'potatoPrivacy' | 'storiesPrivacy' | 'potatoTerms' | 'storiesTerms' | 'potatoSupport' | 'storiesSupport' | 'smoothcalc' | 'smoothcalcPrivacy' | 'smoothcalcTerms' | 'smoothcalcSupport' | 'soapymoney' | 'soapymoneyPrivacy' | 'soapymoneyTerms' | 'soapymoneySupport' | 'mochi' | 'walkmallow' | 'cuckoo' | 'cuckooPrivacy' | 'cuckooTerms' | 'cuckooSupport' | 'notFound';

export type PageInfo = { page: Page; path: string; title: string; description: string; legacy?: boolean; draft?: boolean };

export const pages: PageInfo[] = [
  { page: 'home', path: '/', title: 'WisdomMedium | Thoughtful apps for everyday life', description: 'WisdomMedium makes thoughtful apps for everyday organization and productivity.' },
  { page: 'pebbles', path: '/apps/wm-pebbles/', title: 'WM Pebbles Legacy Privacy and Support | WisdomMedium', description: 'Privacy and support information for existing installations of the retired WM Pebbles app.', legacy: true },
  { page: 'support', path: '/support/', title: 'Support | WisdomMedium', description: `Get help with PotatoBeans, My Stories, CuckooAlarm, Walkmallow, ${smoothcalc.name}, MochiGoals and ${soapymoney.name}. Contact WisdomMedium support.` },
  { page: 'contact', path: '/contact/', title: 'Contact | WisdomMedium', description: 'Contact WisdomMedium for questions about our apps, support, or anything you would like to share.' },
  { page: 'privacy', path: '/privacy/', title: 'Privacy Policy | WisdomMedium', description: `App-specific privacy policies for PotatoBeans, My Stories, CuckooAlarm, Walkmallow, ${smoothcalc.name}, MochiGoals and ${soapymoney.name}, plus website and support privacy.` },
  { page: 'terms', path: '/terms/', title: 'Terms of Use | WisdomMedium', description: `General WisdomMedium terms and app-specific terms for PotatoBeans, My Stories, CuckooAlarm, Walkmallow, ${smoothcalc.name}, MochiGoals and ${soapymoney.name}.` },
  { page: 'potato', path: '/apps/potatobeans/', title: 'PotatoBeans | WisdomMedium', description: 'Create, modify and delete Beans and their tasks. Find app privacy, terms and support.' },
  { page: 'stories', path: '/apps/my-stories/', title: 'My Stories for iPhone | WisdomMedium', description: 'My Stories is a local iPhone journaling app. Find privacy, terms and support.' },
  { page: 'potatoPrivacy', path: '/apps/potatobeans/privacy/', title: 'PotatoBeans Privacy Policy | WisdomMedium', description: 'PotatoBeans local storage, optional iCloud, retained data and deletion.' },
  { page: 'storiesPrivacy', path: '/apps/my-stories/privacy/', title: 'My Stories Privacy Policy | WisdomMedium', description: 'My Stories local journals, selected media, device backups, protected entries, retention and deletion.' },
  { page: 'potatoTerms', path: '/apps/potatobeans/terms/', title: 'PotatoBeans Terms of Use | WisdomMedium', description: 'Terms for PotatoBeans, including app licensing, user content, cloud services and recovery limits.' },
  { page: 'storiesTerms', path: '/apps/my-stories/terms/', title: 'My Stories Terms of Use | WisdomMedium', description: 'Terms for My Stories on iPhone, including app licensing, local journals, backups and protection limits.' },
  { page: 'potatoSupport', path: '/apps/potatobeans/support/', title: 'PotatoBeans Support | WisdomMedium', description: 'Contact PotatoBeans support for help with Beans, tasks, storage and optional iCloud.' },
  { page: 'storiesSupport', path: '/apps/my-stories/support/', title: 'My Stories Support | WisdomMedium', description: 'Contact My Stories support for help with journal imports, deletion, device backups and protected entries.' },
  { page: 'smoothcalc', path: appPath(smoothcalc), title: `${smoothcalc.name} for iPhone | WisdomMedium`, description: smoothcalc.summary },
  { page: 'smoothcalcPrivacy', path: smoothcalc.privacyPolicyPath, title: `${smoothcalc.name} Privacy Policy | WisdomMedium`, description: `How ${smoothcalc.name} handles local calculations, history, graphs, preferences, backups and deletion on iPhone.` },
  { page: 'smoothcalcTerms', path: smoothcalc.termsPath, title: `${smoothcalc.name} Terms of Use | WisdomMedium`, description: `Terms for using ${smoothcalc.name} on iPhone, including calculation accuracy, graph estimates and your App Store license.` },
  { page: 'smoothcalcSupport', path: smoothcalc.supportPath, title: `${smoothcalc.name} Support | WisdomMedium`, description: `Get help with ${smoothcalc.name} calculator modes, angle units, history, storage and reset on iPhone.` },
  { page: 'soapymoney', path: appPath(soapymoney), title: `${soapymoney.name} for iPhone | WisdomMedium`, description: soapymoney.summary },
  { page: 'soapymoneyPrivacy', path: soapymoney.privacyPolicyPath, title: `${soapymoney.name} Privacy Policy | WisdomMedium`, description: 'Learn how your expenses stay on your iPhone, how backups and deletion work, and what happens when you contact support.' },
  { page: 'soapymoneyTerms', path: soapymoney.termsPath, title: `${soapymoney.name} Terms of Use | WisdomMedium`, description: 'Terms for personal expense tracking, estimated costs, financial records and your App Store license.' },
  { page: 'soapymoneySupport', path: soapymoney.supportPath, title: `${soapymoney.name} Support | WisdomMedium`, description: 'Get help with expense categories, payments, currency filters, iPhone storage, deletion and privacy.' },
  { page: 'mochi', path: appPath(mochigoals), title: 'MochiGoals for iPhone | WisdomMedium', description: 'Plan goals, organize checklists and track progress on your iPhone. Explore MochiGoals screenshots, privacy, terms and support.' },
  { page: 'walkmallow', path: '/apps/walkmallow/', title: 'Walkmallow for iPhone | WisdomMedium', description: 'Track daily steps, choose an animated companion and explore illustrated New York City walks. Find Walkmallow privacy, terms and support.' },
  { page: 'cuckoo', path: '/apps/cuckooalarm/', title: 'CuckooAlarm for iPhone | WisdomMedium', description: 'Coming soon: local alarms, stopwatch, timer and optional Apple Weather forecasts for iPhone.' },
  { page: 'cuckooPrivacy', path: '/apps/cuckooalarm/privacy/', title: 'CuckooAlarm Privacy Policy | WisdomMedium', description: 'Local timing data, optional location, Apple Weather, retention and deletion.' },
  { page: 'cuckooTerms', path: '/apps/cuckooalarm/terms/', title: 'CuckooAlarm Terms of Use | WisdomMedium', description: 'App license, alarm reliability, weather and legal rights.' },
  { page: 'cuckooSupport', path: '/apps/cuckooalarm/support/', title: 'CuckooAlarm Support | WisdomMedium', description: 'CuckooAlarm permissions, weather, local data and feedback guidance.' }
];

export const notFound: PageInfo = {
  page: 'notFound', path: '/404.html', title: 'Page not found | WisdomMedium',
  description: 'This WisdomMedium page could not be found. Return home or visit support.'
};

export function pageForPath(pathname: string): PageInfo {
  const clean = pathname === '/' ? '/' : `${pathname.replace(/\/$/, '')}/`;
  return pages.find(({ path }) => path === clean) ?? notFound;
}

export function canonicalUrl(page: PageInfo): string {
  return `${site.domain}${page.path}`;
}

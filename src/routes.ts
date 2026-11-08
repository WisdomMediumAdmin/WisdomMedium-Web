import { site } from './site';

export type Page = 'home' | 'pebbles' | 'support' | 'contact' | 'privacy' | 'terms' | 'potato' | 'stories' | 'potatoPrivacy' | 'storiesPrivacy' | 'potatoTerms' | 'storiesTerms' | 'potatoSupport' | 'storiesSupport' | 'notFound';

export type PageInfo = { page: Page; path: string; title: string; description: string };

export const pages: PageInfo[] = [
  { page: 'home', path: '/', title: 'WisdomMedium | Thoughtful apps for everyday life', description: 'WisdomMedium makes thoughtful apps for everyday organization and productivity.' },
  { page: 'pebbles', path: '/apps/wm-pebbles/', title: 'WM Pebbles for iPhone | WisdomMedium', description: 'Meet WM Pebbles, an iPhone app for organizing tasks into pebbles and keeping tasks, notes, and journals together.' },
  { page: 'support', path: '/support/', title: 'Support | WisdomMedium', description: 'Get help with PotatoBeans, My Stories, WM Pebbles and SoapyMoney. Contact WisdomMedium support.' },
  { page: 'contact', path: '/contact/', title: 'Contact | WisdomMedium', description: 'Contact WisdomMedium for questions about our apps, support, or anything you would like to share.' },
  { page: 'privacy', path: '/privacy/', title: 'Privacy Policy | WisdomMedium', description: 'App-specific privacy policies for PotatoBeans, My Stories, WM Pebbles and SoapyMoney, plus website and support privacy.' },
  { page: 'terms', path: '/terms/', title: 'Terms of Use | WisdomMedium', description: 'General WisdomMedium terms and app-specific terms for PotatoBeans and My Stories.' },
  { page: 'potato', path: '/apps/potatobeans/', title: 'PotatoBeans | WisdomMedium', description: 'PotatoBeans for tasks, notes, calendars and Focus. Find app privacy, terms and support.' },
  { page: 'stories', path: '/apps/my-stories/', title: 'My Stories for iPhone | WisdomMedium', description: 'My Stories is a local iPhone journaling app. Find privacy, terms and support.' },
  { page: 'potatoPrivacy', path: '/apps/potatobeans/privacy/', title: 'PotatoBeans Privacy Policy | WisdomMedium', description: 'PotatoBeans local storage, optional iCloud, Calendar data, protected writing, retention and deletion.' },
  { page: 'storiesPrivacy', path: '/apps/my-stories/privacy/', title: 'My Stories Privacy Policy | WisdomMedium', description: 'My Stories local journals, selected media, device backups, protected keys, retention and deletion.' },
  { page: 'potatoTerms', path: '/apps/potatobeans/terms/', title: 'PotatoBeans Terms of Use | WisdomMedium', description: 'Terms for PotatoBeans, including app licensing, user content, cloud services and recovery limits.' },
  { page: 'storiesTerms', path: '/apps/my-stories/terms/', title: 'My Stories Terms of Use | WisdomMedium', description: 'Terms for My Stories on iPhone, including app licensing, local journals, backups and protection limits.' },
  { page: 'potatoSupport', path: '/apps/potatobeans/support/', title: 'PotatoBeans Support | WisdomMedium', description: 'Contact PotatoBeans support for help with tasks, notes, Calendar, iCloud and protected writing.' },
  { page: 'storiesSupport', path: '/apps/my-stories/support/', title: 'My Stories Support | WisdomMedium', description: 'Contact My Stories support for help with journal imports, deletion, device backups and protected entries.' }
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

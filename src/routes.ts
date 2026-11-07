import { site } from './site';

export type Page = 'home' | 'pebbles' | 'myStories' | 'terms' | 'support' | 'contact' | 'privacy' | 'notFound';

export type PageInfo = { page: Page; path: string; title: string; description: string };

export const pages: PageInfo[] = [
  { page: 'home', path: '/', title: 'WisdomMedium | Thoughtful apps for everyday life', description: 'WisdomMedium makes thoughtful apps for everyday organization and productivity.' },
  { page: 'pebbles', path: '/apps/wm-pebbles/', title: 'WM Pebbles for iPhone | WisdomMedium', description: 'Meet WM Pebbles, an iPhone app for organizing tasks into pebbles and keeping tasks, notes, and journals together.' },
  { page: 'myStories', path: '/apps/my-stories/', title: 'My Stories for iPhone | WisdomMedium', description: 'A private iPhone journaling app with rich formatting, selected media and optional entry protection. Coming soon from WisdomMedium.' },
  { page: 'terms', path: '/terms/', title: 'Terms of Use | WisdomMedium', description: 'Website terms and My Stories conditions, including content ownership, the App Store license, local storage and consumer rights.' },
  { page: 'support', path: '/support/', title: 'Support | WisdomMedium', description: 'Get help with My Stories, WM Pebbles or SoapyMoney, report a bug, or share an idea with WisdomMedium support.' },
  { page: 'contact', path: '/contact/', title: 'Contact | WisdomMedium', description: 'Contact WisdomMedium for questions about our apps, support, or anything you would like to share.' },
  { page: 'privacy', path: '/privacy/', title: 'Privacy Policy | WisdomMedium', description: 'Read the WisdomMedium Privacy Policy for the website, My Stories, WM Pebbles and SoapyMoney, including how app content is stored and how to contact us.' }
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

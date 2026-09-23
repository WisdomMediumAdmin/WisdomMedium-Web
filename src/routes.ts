import { site } from './site';

export type Page = 'home' | 'pebbles' | 'support' | 'contact' | 'privacy' | 'notFound';

export type PageInfo = { page: Page; path: string; title: string; description: string };

export const pages: PageInfo[] = [
  { page: 'home', path: '/', title: 'WisdomMedium | Thoughtful apps for everyday life', description: 'WisdomMedium makes thoughtful apps for everyday organization and productivity.' },
  { page: 'pebbles', path: '/apps/wm-pebbles/', title: 'WM Pebbles for iPhone | WisdomMedium', description: 'Meet WM Pebbles, an iPhone app for organizing tasks into pebbles and keeping tasks, notes, and journals together.' },
  { page: 'support', path: '/support/', title: 'Support | WisdomMedium', description: 'Get help with WM Pebbles, report a bug, or share an idea with WisdomMedium support.' },
  { page: 'contact', path: '/contact/', title: 'Contact | WisdomMedium', description: 'Contact WisdomMedium for questions about our apps, support, or anything you would like to share.' },
  { page: 'privacy', path: '/privacy/', title: 'Privacy Policy | WisdomMedium', description: 'Read the WisdomMedium Privacy Policy for WM Pebbles, including how app content is stored and how to contact us.' }
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

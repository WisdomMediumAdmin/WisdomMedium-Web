export const site = {
  name: 'WisdomMedium',
  tagline: 'Thoughtful apps for everyday life.',
  domain: 'https://wisdommedium.com',
  email: 'support@wisdommedium.com'
} as const;

export type AppRelease =
  | { status: 'coming-soon' }
  | { status: 'available'; appStoreUrl: string };

export type AppInfo = {
  slug: string;
  name: string;
  platform: string;
  summary: string;
  description: string;
  release: AppRelease;
  privacyPolicyPath: string;
  iconPath?: string;
  termsPath?: string;
};

export const apps: AppInfo[] = [
  {
    slug: 'wm-pebbles',
    name: 'WM Pebbles',
    platform: 'iPhone',
    summary: 'A calmer place for tasks, notes, and journals.',
    description: 'Organize tasks into pebbles and keep your tasks, notes, and journals together in one thoughtful space.',
    release: { status: 'coming-soon' },
    privacyPolicyPath: '/privacy/'
  },
  {
    slug: 'my-stories',
    name: 'My Stories',
    platform: 'iPhone',
    summary: 'A private place for your words, memories and everyday stories.',
    description: 'Write journal entries with rich formatting, add photos, videos and files you select, and protect individual entries with an optional lock. Your journal stays in a local library on your iPhone, without a WisdomMedium account.',
    release: { status: 'coming-soon' },
    privacyPolicyPath: '/privacy/#my-stories',
    termsPath: '/terms/#my-stories',
    iconPath: '/images/my-stories-icon.png'
  }
];

export const appPath = (app: AppInfo) => `/apps/${app.slug}/`;
export const emailHref = (address: string, subject?: string) =>
  `mailto:${address}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`;

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
  iconPath: string;
};

export const apps: AppInfo[] = [
  {
    slug: 'potatobeans', name: 'PotatoBeans', platform: 'iPhone, iPad and Mac',
    summary: 'Create Beans. Keep your tasks simple.',
    description: 'Create, modify and delete Beans and their tasks, with optional iCloud sync.',
    release: { status: 'coming-soon' }, privacyPolicyPath: '/apps/potatobeans/privacy/',
    iconPath: '/images/apps/potatobeans-512.webp'
  },
  {
    slug: 'my-stories', name: 'My Stories', platform: 'iPhone',
    summary: 'A place for the moments you want to keep.',
    description: 'Keep a local journal with rich text, photos, videos and selected files on your iPhone.',
    release: { status: 'coming-soon' }, privacyPolicyPath: '/apps/my-stories/privacy/',
    iconPath: '/images/apps/my-stories-512.webp'
  }
];

export const appPath = (app: AppInfo) => `/apps/${app.slug}/`;
export const emailHref = (address: string, subject?: string) =>
  `mailto:${address}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`;

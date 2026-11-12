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

export const walkmallow: AppInfo = {
  slug: 'walkmallow', name: 'Walkmallow', platform: 'iPhone',
  summary: 'Track daily steps with ten animated companions and illustrated walks through New York City.',
  description: 'Make everyday movement a little more cheerful. Walkmallow pairs simple step tracking with ten animated companions and illustrated virtual journeys through Brooklyn Bridge, Central Park and SoHo. Choose Indoor, Treadmill or Outdoor mode, carry your iPhone, and follow your progress one walk at a time.',
  release: { status: 'coming-soon' }, privacyPolicyPath: '/privacy/#walkmallow',
  iconPath: '/images/apps/walkmallow-512.webp'
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
  },
  {
    slug: 'cuckooalarm', name: 'CuckooAlarm', platform: 'iPhone',
    summary: 'Alarms, a stopwatch and a timer. One simple place.',
    description: 'Local alarms, original sounds and optional Apple Weather forecasts.',
    release: { status: 'coming-soon' }, privacyPolicyPath: '/apps/cuckooalarm/privacy/',
    iconPath: '/images/apps/cuckooalarm-512.webp'
  },
  walkmallow
];

export const appPath = (app: AppInfo) => `/apps/${app.slug}/`;
export const emailHref = (address: string, subject?: string) =>
  `mailto:${address}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`;

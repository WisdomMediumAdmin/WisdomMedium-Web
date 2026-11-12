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
  storeName?: string;
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

// Keep this public slug stable when display branding changes.
export const smoothcalc = {
  slug: 'smoothcalc', name: 'SmoothCalc', platform: 'iPhone', version: '1.0', minimumOS: 'iOS 18.6',
  summary: 'Everyday calculations, scientific expressions and interactive graphs on iPhone.',
  description: 'Organize your work in sheets, revisit history and favorites, and choose a theme that suits you. Calculations run on your device, with no account or required cloud connection.',
  iconPath: '/images/apps/smoothcalc-512.webp',
  storeName: 'the App Store for iPhone',
  release: { status: 'coming-soon' } satisfies AppRelease,
  privacyPolicyPath: '/privacy/smoothcalc/',
  termsPath: '/terms/smoothcalc/',
  supportPath: '/support/smoothcalc/',
  screenshots: [
    { src: '/images/apps/smoothcalc/calculator.webp', caption: 'Calculator', alt: 'The everyday keypad showing 6 × 7 = 42.' },
    { src: '/images/apps/smoothcalc/scientific.webp', caption: 'Scientific', alt: 'The scientific keypad displaying 2¹⁰ and its result, 1024, in degree mode.' },
    { src: '/images/apps/smoothcalc/graphing.webp', caption: 'Graphing', alt: 'A sine curve plotted against labeled axes with the graph controls visible.' }
  ]
};

export const mochigoals: AppInfo = {
  slug: 'mochigoals', name: 'MochiGoals', platform: 'iPhone',
  summary: 'Break a goal into subgoals and checklists, and see your progress as you go.',
  description: 'Plan goals with notes, target dates and color tags. Keep your goal library on your iPhone and use it offline without an account.',
  iconPath: '/images/apps/mochigoals-512.webp', privacyPolicyPath: '/privacy/#mochigoals',
  storeName: 'the App Store for iPhone', release: { status: 'coming-soon' }
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
  walkmallow,
  smoothcalc,
  mochigoals
];

export const appPath = (app: AppInfo) => `/apps/${app.slug}/`;
export const emailHref = (address: string, subject?: string) =>
  `mailto:${address}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`;

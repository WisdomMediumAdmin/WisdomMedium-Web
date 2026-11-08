import type { AppInfo } from './site';

export function AppIcon({ app, priority = false }: { app: AppInfo; priority?: boolean }) {
  return <img
    className={`app-icon app-icon--${app.slug}`}
    src={app.iconPath}
    srcSet={[256, 512, 768].map(size => `${app.iconPath.replace('-512.webp', `-${size}.webp`)} ${size}w`).join(', ')}
    sizes="(max-width: 600px) 208px, (max-width: 900px) 224px, 256px"
    width="512" height="512"
    alt={`${app.name} app icon`}
    loading={priority ? 'eager' : 'lazy'}
    fetchPriority={priority ? 'high' : 'auto'}
    decoding="async"
  />;
}

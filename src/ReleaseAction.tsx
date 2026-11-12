import type { ReactNode } from 'react';
import type { AppInfo } from './site';

export function ButtonLink({ href, children, secondary = false }: { href: string; children: ReactNode; secondary?: boolean }) {
  return <a className={`button ${secondary ? 'button-secondary' : 'button-primary'}`} href={href}>{children}<span aria-hidden="true">↗</span></a>;
}

export function ReleaseAction({ app, comingSoonLabel = 'Coming soon' }: { app: AppInfo; comingSoonLabel?: string }) {
  if (app.release.status === 'available') {
    return <ButtonLink href={app.release.appStoreUrl}>View on the App Store</ButtonLink>;
  }
  return <span className="status-pill">{comingSoonLabel}</span>;
}

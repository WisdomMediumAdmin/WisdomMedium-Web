// @vitest-environment node
import { afterEach, expect, it, vi } from 'vitest';
import { readFile } from 'node:fs/promises';
vi.mock('node:fs/promises', () => ({ readFile: vi.fn() }));
const keys = ['operatorIdentityAndRegions', 'releaseContractAndDeletion', 'supportRetentionAndProviders', 'applePrivacyAnswersAndDiagnostics', 'termsAndConsumerRights', 'finalRenderedPolicies'];
const approved = { status: 'approved', effectiveDate: '2026-11-05', approvals: Object.fromEntries(keys.map(key => [key, true])) };
afterEach(() => { vi.resetModules(); vi.resetAllMocks(); });
it.each([
  { ...approved, status: 'pending' },
  { ...approved, effectiveDate: null },
  { ...approved, effectiveDate: 'not a date' },
  { ...approved, approvals: undefined },
  ...keys.map(key => ({ ...approved, approvals: { ...approved.approvals, [key]: false } }))
])('blocks incomplete owner decisions: %j', async approval => {
  vi.mocked(readFile).mockResolvedValue(JSON.stringify(approval));
  await expect(import('./check-legal-publication.mjs')).rejects.toThrow('Publication blocked');
});
it.each(['<aside data-legal-draft="true">Review draft</aside>', '<time datetime="2026-11-04">Old date</time>'])('blocks draft or stale built policy: %s', async html => {
  vi.mocked(readFile).mockResolvedValueOnce(JSON.stringify(approved)).mockResolvedValue(html);
  await expect(import('./check-legal-publication.mjs')).rejects.toThrow('final approved text');
});
it('allows only approved decisions with final dated policies', async () => {
  vi.mocked(readFile).mockResolvedValueOnce(JSON.stringify(approved)).mockResolvedValue('<time datetime="2026-11-05">November 5, 2026</time>');
  await expect(import('./check-legal-publication.mjs')).resolves.toBeDefined();
  expect(readFile).toHaveBeenCalledWith('dist/privacy/index.html', 'utf8');
  expect(readFile).toHaveBeenCalledWith('dist/terms/index.html', 'utf8');
});

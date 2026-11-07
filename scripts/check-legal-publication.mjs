import { readFile } from 'node:fs/promises';

const approval = JSON.parse(await readFile('Docs/legal/publication-approval.json', 'utf8'));
const required = ['operatorIdentityAndRegions', 'releaseContractAndDeletion', 'supportRetentionAndProviders',
  'applePrivacyAnswersAndDiagnostics', 'termsAndConsumerRights', 'finalRenderedPolicies'];
const approved = approval.status === 'approved' && /^\d{4}-\d{2}-\d{2}$/.test(approval.effectiveDate ?? '') &&
  required.every(key => approval.approvals?.[key] === true);
if (!approved) throw new Error('Publication blocked: record the required owner decisions in Docs/legal/publication-approval.json.');
for (const path of ['dist/privacy/index.html', 'dist/terms/index.html']) {
  const html = await readFile(path, 'utf8');
  if (html.includes('data-legal-draft') || !html.includes(`datetime="${approval.effectiveDate}"`)) {
    throw new Error(`Publication blocked: ${path} must contain final approved text and the approved effective date.`);
  }
}
console.log('Legal publication gate passed.');

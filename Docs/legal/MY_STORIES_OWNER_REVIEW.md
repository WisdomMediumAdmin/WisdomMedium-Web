# Owner approval and publication handoff

**Current state: draft only. Do not merge/deploy the legal update until the decisions below are resolved.** This gate comes directly from the user's request not to publish legally consequential text before owner facts and decisions are confirmed. It is not an inferred requirement from the Sites skill.

## Concrete review destinations

Start from the isolated Git worktree `/private/tmp/wisdommedium-legal-sync-20261107`, branch `codex/my-stories-legal-review`. The original website working tree and index remain untouched. The review branch has a separate prerequisite commit `8f212bf` containing the exact pre-existing testing and SoapyMoney/support work; review that commit separately from the My Stories implementation. Do not blindly cherry-pick the final commit onto a branch lacking that prerequisite.

Run `npm run build` and `PORT=4177 npm run serve:static` in the review worktree, then open:

- `http://127.0.0.1:4177/#apps`
- `http://127.0.0.1:4177/apps/my-stories/`
- `http://127.0.0.1:4177/privacy/#my-stories`
- `http://127.0.0.1:4177/terms/#my-stories`
- `http://127.0.0.1:4177/support/#my-stories`

The preview is loopback-only and is not a staging or production publication. Historical and current review evidence are labeled by date in `evidence/`. The November 5 owner handoff is preserved in `history/MY_STORIES_OWNER_REVIEW_20261105.md`. Servers used during this task are stopped at final teardown; restart with the command above.

## Decisions required

| Gate | Missing fact / decision | Exact completion requirement |
| --- | --- | --- |
| Operator and regions | Legal operator/person/entity, jurisdiction, legally required address/contact, launch countries, audience/minors | Supply verified identity and audience. Incorporate appropriate controller/contracting-party information and regional rights/bases/transfers/contacts, where required. Do not infer incorporation from the brand or account name. |
| Release and recovery acceptance | Accepted source contract is available; iOS 18.6, backup eligibility, attachment cleanup and key retirement are confirmed. Physical-device and signed-release validation remain separate. | Accept the documented device-bound recovery limitation and final wording. Complete physical backup/restore, authentication, Data Protection, signed upgrade and iOS 18.6 validation before submission. Do not reclassify confirmed source fixes as unresolved defects. |
| Support | Access, forwarding, provider recipients, retention, deletion procedure, backup/legal holds unknown | Confirm Google receipt and all other actual processors. Adopt and implement a retention/deletion process with a defensible duration or criteria. Verify outbound reply handling without sending private journals. Approve public wording only after it matches operations. |
| Apple privacy | Support exception/collection, Apple diagnostics and exports unresolved | Complete `MY_STORIES_APP_STORE_PRIVACY_REVIEW.md`, record final data types/linkage/purposes and rationale. Verify final binary and all actually distributed platforms. |
| Terms and consumer rights | Operator, regions, eligibility, assent, EULA configuration, remedies | Review with qualified counsel as appropriate. Draft intentionally adds no arbitration, exclusive venue or invented governing jurisdiction; choose any alternative only after identity/regions are known. Verify Apple's Standard EULA configuration. |
| Final rendering and effective date | Draft date is not an effective date | Select effective date; replace draft notices and draft-specific wording; add approved operator details; review exact rendered pages, dates and links. Record written owner approval and the reviewed Git commit in the approval record below. |

No legal-owner approval has been received in this task. The false `releaseContractAndDeletion` flag in the publication record means owner acceptance is pending, not that the engineering fixes or source contract are missing. No attorney approval or guaranteed legal compliance is asserted.

## Publication procedure after the decisions are complete

1. Preserve the original working tree. Reconcile the prerequisite commit with any newer main-branch work before merging; do not discard independent changes. Review WM Pebbles/SoapyMoney preservation evidence. This task did not audit those applications anew.
2. Use the accepted [website contract](MY_STORIES_WEBSITE_CONTRACT.md) and [release report](RELEASE_HARDENING_20261105.md), fetched from app main `7c9217a2bdd045128301a0af703979d707814b50` / `rc-ios-1.0-1-20261105`. Source engineering is PASS; physical-device checks and signed distribution remain submission gates. Reconcile any later shipping-artifact changes with this contract. Leave “Coming soon” and no store link until a real public listing is confirmed.
3. Complete identity/support/regional requirements in the policies and App Store review. Archive the owner-approved final text and decision rationale under `Docs/legal/`. Add a dated version-history entry.
4. Set the chosen effective date consistently in both policy pages. Remove `PolicyReviewNotice`, its imports and `data-legal-draft` markup, plus phrases indicating unpublished review status. Update the draft-specific tests to require the approved effective date and absence of draft markers. Keep factual limitations that remain true. Review before removing the gate.
5. Change `Docs/legal/publication-approval.json` to `status: "approved"`, set `effectiveDate` as `YYYY-MM-DD`, and set each of its **six named approvals** true only with the corresponding evidence/owner decision. Record approver/date/reviewed commit in a separate approval receipt; this file is a publication guard, not proof of identity or legal advice.
6. Use Node 24 and `npm ci`, then run `npm run check`, `npm run test:coverage:browser`, `npm run test:coverage:node`, and `node scripts/check-legal-publication.mjs`. The last command must reject this current draft. Preview the built artifact again on iPhone/tablet/desktop widths and verify links/keyboard access. Do not lower coverage thresholds to get a pass.
7. If a staging host is desired, use an owner-controlled **access-restricted** preview after confirming its audience and configuration. No staging host exists in this repository; no policy text was uploaded to a new host. Record its URL and validation results separately.
8. Push the approved review branch and open/review a PR targeting `main`. PR Actions validate but do not deploy. Ensure the prerequisite and task changes are understood. Merge only after approval, required CI checks and release evidence. The review branch is pushed for review; see [current verification](VERIFICATION_20261107.md) for delivery state. Pushing and opening a draft PR do not authorize a merge.
9. Observe the GitHub Pages workflow for the merged commit. Inspect successful coverage/build/approval/deploy jobs and the GitHub Pages environment URL. Manual dispatch from a non-main branch is now unable to publish.
10. Fetch actual `https://wisdommedium.com/`, `/privacy/`, `/terms/`, `/support/` and `/apps/my-stories/`; confirm 200 responses, correct canonical metadata, My Stories sections, exact effective dates, working `#apps` / `#my-stories` anchors, no review notices, correct asset responses and preserved other-app sections. Record headers/content hashes and the deployed commit. A local build is never publication evidence.
11. Reconcile approved App Store Connect App Privacy answers and verify the policy URL from the final installed app. Website terms do not configure a custom EULA. Any Store answer/EULA publication is a distinct owner-authorized step.

## Approval receipt (pending)

- Verified legal operator / jurisdiction / regions: not supplied.
- Accepted source contract: received and verified from remote main/tag; 310 tests passed, 0 failed, 3 skipped in the accepted app report. Signed build/hardware validation and owner acceptance of the recovery limitation remain pending.
- Support retention and recipient decisions: not supplied.
- Final App Privacy answers and EULA configuration: not supplied.
- Owner approver, approval date, effective date and exact reviewed commit: not supplied.
- Counsel review, if obtained: not asserted.

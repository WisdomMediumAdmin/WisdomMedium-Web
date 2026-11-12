# MochiGoals 1.0 website launch handoff

MochiGoals is listed for iPhone with iOS 18.6 or later. Its website privacy policy and terms take effect November 11, 2026. Kazi Ahmed Siam operates MochiGoals under the WisdomMedium brand. The public support inbox is support@wisdommedium.com.

## URLs for App Store Connect and Settings

| Field | Canonical HTTPS URL | Direct link to the MochiGoals content |
| --- | --- | --- |
| Marketing / product | [https://wisdommedium.com/apps/mochigoals/](https://wisdommedium.com/apps/mochigoals/) | [Product and screenshots](https://wisdommedium.com/apps/mochigoals/) |
| Privacy Policy | [https://wisdommedium.com/privacy/](https://wisdommedium.com/privacy/) | [https://wisdommedium.com/privacy/#mochigoals](https://wisdommedium.com/privacy/#mochigoals) |
| Terms of Use | [https://wisdommedium.com/terms/](https://wisdommedium.com/terms/) | [https://wisdommedium.com/terms/#mochigoals](https://wisdommedium.com/terms/#mochigoals) |
| Support | [https://wisdommedium.com/support/](https://wisdommedium.com/support/) | [https://wisdommedium.com/support/#mochigoals](https://wisdommedium.com/support/#mochigoals) |

The shared URLs match the uploaded binary. The three pages each have a labeled MochiGoals section. The catalog card and product page link straight to those sections. [Public apps collection](https://wisdommedium.com/#apps)

## Production record

| Item | Value |
| --- | --- |
| Website repository | WisdomMediumAdmin/WisdomMedium-Web |
| Working branch | `codex/mochigoals-website-launch` |
| Production branch | `main` |
| Website content commit | [39900a67478bb346548b9f205be58ee6adcd9b48](https://github.com/WisdomMediumAdmin/WisdomMedium-Web/commit/39900a67478bb346548b9f205be58ee6adcd9b48) |
| Production status | Live. GitHub Pages completed November 11, 2026 at 8:54:55 p.m. EST (01:54:55 UTC November 12). |
| Deployment receipt | [GitHub Pages run 43137620845](https://github.com/WisdomMediumAdmin/WisdomMedium-Web/actions/runs/43137620845) |

## Public verification

- The normal fast-forward push triggered GitHub Pages. Type checking, linting, all 27 tests, the static build and production deployment passed.
- Without signing in, a browser opened the catalog, used the MochiGoals card, decoded the icon and all four screenshots, and followed the three links to the correctly titled and dated legal sections and the support email. Tested at 320, 390 and 1440 CSS pixels. The shared-page directory links reached the same sections.
- The five pages (home, product, privacy, terms and support), sitemap and eight MochiGoals images returned HTTPS 200. The live image files and sitemap matched the production build byte for byte. The product and three shared pages have their own canonical HTTPS URLs. Requests without their trailing slash returned HTTP 301 to the corresponding slash URL.
- All 18 pre-existing product, legacy and dedicated legal/support page bodies matched the preceding production build. The five earlier catalog cards and the existing named shared-policy sections were preserved.
- Website publication blockers: none. The app team can re-fetch the four production URLs above and use the product URL for Marketing in App Store Connect.

## Release evidence and App Privacy

The published copy follows the final handoff, privacy fact sheet, proposed legal text, store metadata and archived binary configuration. The archived app source was `f1fe20a0e785bc27dc7efaddb7a028dac4c4a3fc`. The final app handoff and processing receipts were read at `293bbaac63724cc696b5b19a0a423b73edf1d673`. The earlier website draft supplied the verified icon files, support text and shared-section anchor pattern. The four screenshots come from the final iPhone release package and their original hashes matched its manifest. [Final handoff](https://github.com/WisdomMediumAdmin/MochiGoals/blob/293bbaac63724cc696b5b19a0a423b73edf1d673/Docs/Release/MOCHIGOALS_WEBSITE_HANDOFF.md) · [Privacy fact sheet](https://github.com/WisdomMediumAdmin/MochiGoals/blob/293bbaac63724cc696b5b19a0a423b73edf1d673/Docs/Release/MOCHIGOALS_PRIVACY_FACT_SHEET.md)

No factual discrepancy was found between the website and the final app audit. Goals and progress stay in the local library. The policy covers retained internal snapshots, older reminders and exports, iOS backups, deletion limits, and the absence of automatic goal uploads, app cloud sync and tracking. Shared hosting and mailbox practices continue to apply. Apple may make diagnostics available according to the user’s sharing choices. An email to support discloses the sender’s address, message and chosen attachments, with no fixed automatic deletion deadline.

The app team’s **worksheet** includes Email Address and Customer Support, linked to the user for App Functionality, with no tracking. The release record did not establish that final App Privacy answers were saved. The Account Holder must confirm the entries. Omit support only if the actual support and diagnostics practices satisfy Apple’s disclosure rules. [Apple App Privacy guidance](https://developer.apple.com/app-store/app-privacy-details/)

**App Store download URL pending.** Build 1.0 (1) was uploaded and processed. The app handoff records no public release. Apple’s US catalog lookup returned zero results for verified Apple ID 6833124224 on November 11. Both website entry points show a non-clickable coming-soon status. Activate the download link once the real public product page is verified.

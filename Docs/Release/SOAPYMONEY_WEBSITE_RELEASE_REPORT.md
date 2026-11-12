# SoapyMoney 1.0 website release

The iPhone listing, Privacy Policy, Terms of Use and support page are live. The website lists the app as coming soon on the App Store for iPhone. The legal documents took effect November 11, 2026.

## Production URLs

| Purpose | Public destination | Entry point configured for build 1 or its store metadata |
| --- | --- | --- |
| Apps collection | [WisdomMedium Apps](https://wisdommedium.com/#apps) | https://wisdommedium.com/#apps |
| Product / optional Marketing URL | https://wisdommedium.com/apps/soapymoney/ | The Apps collection also links to the product page. |
| Privacy Policy | https://wisdommedium.com/privacy/soapymoney/ | https://wisdommedium.com/privacy/ |
| Terms of Use | https://wisdommedium.com/terms/soapymoney/ | https://wisdommedium.com/terms/ |
| Support | https://wisdommedium.com/support/soapymoney/ | https://wisdommedium.com/support/ |

Each shared entry point links to its dedicated SoapyMoney page. The existing URLs in the uploaded build work. Public support and privacy requests go to support@wisdommedium.com.

## Source and deployment

| Item | Release record |
| --- | --- |
| Website repository | WisdomMediumAdmin/WisdomMedium-Web |
| Release branch | `codex/soapymoney-iphone-launch` |
| Production branch | `main` |
| Website content commit | [652dd5eb1d6f75ded8a9252eb4d909294fe2f365](https://github.com/WisdomMediumAdmin/WisdomMedium-Web/commit/652dd5eb1d6f75ded8a9252eb4d909294fe2f365) |
| Deployment | GitHub Pages succeeded November 11, 2026 at 9:16:20 p.m. EST (November 12 at 02:16:20 UTC). [Deployment run 43140068606](https://github.com/WisdomMediumAdmin/WisdomMedium-Web/actions/runs/43140068606) |
| App evidence | Local app branch `codex/iphone-app-store-1-0`, commit `2efb7242f371a2a21abd844def35ef954015a6d5`, version 1.0 (1). See `docs/release/SOAPYMONEY_WEBSITE_HANDOFF.md`, `SOAPYMONEY_PRIVACY_AUDIT.md` and `SOAPYMONEY_APP_STORE_METADATA.md` in the app repository. |

The new catalog entry and product page share the same release status, official icon, brand information and product record. Four screenshots come from the app’s approved iPhone release evidence and show fictional expense entries. The website identifies Kazi Ahmed Siam as the operator under the WisdomMedium brand.

## Checks against the release build

- The published policy matches the app audit. Version 1.0 keeps expense records and preferences on the iPhone. App-level CloudKit sync is disabled. Device backups depend on user settings, and prior private iCloud records can persist. The policy explains developer access, optional feedback, email retention, tracking, diagnostics, deletion and recovery limits.
- The terms cover the Apple standard license, estimated costs, separately recorded payments and refunds, currency filters, backup responsibilities and statutory consumer rights. Support covers category and cash-record questions, missing expenses, deletion and sync. No unresolved website legal or privacy discrepancy was identified.
- The production build, type check, lint and all 27 tests passed. Public browser checks at 320, 390 and 1440 pixels followed the catalog card, the product links and the exact three shared URLs used by the app. All were accessible without signing in. The support mail link, image loading, canonical URLs and page widths passed. A separate visual check in Safari on an iPhone 17 simulator confirmed all four dedicated production pages rendered legibly.
- Eight public HTML entry pages, the sitemap and all seven SoapyMoney image derivatives matched the tested static build byte for byte. Each of the four dedicated paths redirected to its canonical trailing-slash URL. All 19 pre-existing app page bodies, six earlier catalog cards, and the existing shared legal sections and links were preserved.

## App Store status

Apple processed iPhone build 1 for iOS 18.6 or later. The app team recorded Prepare for Submission and manual release. The US storefront lookup returned zero results for Apple ID `6829892592` on November 11. The reserved URL is `https://apps.apple.com/app/id6829892592`. After manual release, verify the product page is publicly downloadable before activating the store link in the catalog record.

The technical name remains `FinancialWellness`, bundle `com.wisdommedium.financialwellness`, SKU `WISDOMMEDIUM-FINANCIALWELLNESS`, team `B36J3GTV7R`. The signed CloudKit entitlement is `iCloud.com.wisdommedium.financialwellness` and the app has no App Group. Public URLs use the marketing slug.

The app audit recommends “Data Not Collected” and no tracking for this binary. Voluntary external support correspondence and website visits are covered separately. Website publication is complete. The owner still needs to supply the private App Review phone number and complete the remaining App Store Connect submission steps.

## Paste into the SoapyMoney app chat

> SoapyMoney’s website is live and matches the build 1 privacy audit. The existing Settings and support URLs work. For App Store Connect, use Privacy https://wisdommedium.com/privacy/soapymoney/, Support https://wisdommedium.com/support/soapymoney/ and Marketing https://wisdommedium.com/apps/soapymoney/. The terms are at https://wisdommedium.com/terms/soapymoney/. Production content commit is 652dd5eb1d6f75ded8a9252eb4d909294fe2f365. The website prerequisite is complete. The listing remains coming soon pending public release. Supply the private App Review phone number in Connect and continue the submission.

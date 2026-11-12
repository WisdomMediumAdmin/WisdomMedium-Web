# SmoothCalc 1.0 iPhone website publication

November 11, 2026. The website covers SmoothCalc 1.0 for iPhone, requiring iOS 18.6 or later.

| Release record | Value |
| --- | --- |
| Repository | WisdomMediumAdmin/WisdomMedium-Web |
| Release branch | `codex/smoothcalc-iphone-release` |
| Production branch | `main` |
| Website content commit | [5138389c27d740cc82de5db9f9a766afe628aafa](https://github.com/WisdomMediumAdmin/WisdomMedium-Web/commit/5138389c27d740cc82de5db9f9a766afe628aafa) |
| Deployment | Live and verified · [GitHub Pages run 43136204847](https://github.com/WisdomMediumAdmin/WisdomMedium-Web/actions/runs/43136204847) |

## Production URLs for the app team

| App Store Connect field or use | URL |
| --- | --- |
| Marketing URL | [https://wisdommedium.com/apps/smoothcalc/](https://wisdommedium.com/apps/smoothcalc/) |
| Privacy Policy URL | [https://wisdommedium.com/privacy/smoothcalc/](https://wisdommedium.com/privacy/smoothcalc/) |
| Support URL | [https://wisdommedium.com/support/smoothcalc/](https://wisdommedium.com/support/smoothcalc/) |
| Supplemental Terms of Use | [https://wisdommedium.com/terms/smoothcalc/](https://wisdommedium.com/terms/smoothcalc/) |

The uploaded app uses the shared privacy, terms and support URLs. Each shared page links directly to its SmoothCalc page. The existing shared privacy URL saved in App Store Connect remains valid. Support uses the existing inbox at support@wisdommedium.com. [Shared privacy](https://wisdommedium.com/privacy/) · [Shared terms](https://wisdommedium.com/terms/) · [Shared support](https://wisdommedium.com/support/)

## Production verification

- The normal fast-forward push to `main` triggered the website’s Node 24 checks, static build and GitHub Pages deployment. Type checking, linting, all 25 tests, the production build and deployment passed.
- A browser opened the live catalog and followed its SmoothCalc card to the product page, then opened Privacy, Terms and Support at 320, 390, 768 and 1440 CSS pixels. Availability text fit the card. The product images decoded and all three information pages fit the viewport. The contact links used the existing WisdomMedium inbox.
- The four dedicated pages, home and three shared pages, sitemap, three icon sizes and three screenshots all returned HTTPS 200. Canonical metadata matched the eight page URLs. The live sitemap and six image files matched the local production assets byte for byte.
- The shared Privacy, Terms and Support directories each opened the correct dedicated page. PotatoBeans, My Stories, CuckooAlarm, Walkmallow and the retired WM Pebbles page continued to resolve. The original checkout’s unpublished workflow and test edits stayed outside the release commit.

**Website blockers:** None. The public App Store download URL is pending Apple release.

## Product and privacy evidence

- The release handoff and identity audit identify version 1.0, build 1. Export metadata verifies iPhone device family 1 and minimum OS 18.6. The app kept its existing technical identity. The website uses an independent public slug. [Website handoff](https://github.com/WisdomMediumAdmin/SmoothCalc/blob/d7a08e1ce014a777825d8d03d4af67ff49d893fb/Docs/Release/SMOOTHCALC_WEBSITE_HANDOFF.md) · [Identity audit](https://github.com/WisdomMediumAdmin/SmoothCalc/blob/d7a08e1ce014a777825d8d03d4af67ff49d893fb/Docs/Release/SMOOTHCALC_IDENTITY_AND_TRANSFER_AUDIT.md)
- The listing uses the default shipping icon and the three approved Calculator, Scientific and Graphing screenshots. Each web icon matched the decoded pixels of its source resize. [iPhone screenshot set](https://github.com/WisdomMediumAdmin/SmoothCalc/tree/d7a08e1ce014a777825d8d03d4af67ff49d893fb/StoreAssets/AppStore/iPhone/en-US)
- The exported privacy manifest declares no collected data and no tracking. The dedicated policy matches the published **Data Not Collected** answer. It distinguishes local calculations, error logs and preferences from iOS backups, clipboard use, website requests and voluntary email. The audit used source and exported artifacts. It did not include runtime packet capture. [Release record](https://github.com/WisdomMediumAdmin/SmoothCalc/blob/d7a08e1ce014a777825d8d03d4af67ff49d893fb/Docs/Release/SMOOTHCALC_APP_STORE_RELEASE.md)
- Privacy and support describe bounded history, retained favorite records, reset and temporary storage. Terms cover numerical and graphing errors, independent verification, licensing, warranties and mandatory consumer rights. [Apple’s standard app license](https://www.apple.com/legal/internet-services/itunes/dev/stdeula/)

## Availability and future changes

The app team recorded the upload as processed and awaiting submission. Apple’s public US catalog returned zero results for the verified record on November 11. The card and product page both show **Coming soon on the App Store for iPhone**. When the public listing opens, verify its identity and set the release status and actual URL in the SmoothCalc entry in `src/site.ts`. The same entry controls the display name, description, icon and screenshot references.

Keep the four public paths stable when updating the brand. If a later release moves them, retain redirects from the old paths and update canonical metadata, sitemap entries and links together.

App Store submission is a separate owner action. The app handoff lists App Review contact details, icon/content-rights confirmation and final metadata review. The published website supplies the URLs for that review.

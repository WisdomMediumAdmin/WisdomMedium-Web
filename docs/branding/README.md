# Official Apple app icons

These assets are derived from the approved app repositories, not recreated artwork.
The pinned source revisions, source SHA-256 digests and web-file digests are in
`app-icons.json`. Application repositories were read only.

## Selected shipping configurations

- **PotatoBeans:** `WisdomMediumAdmin/WM-Pebbles`, release/potatobeans-v1-mvp
  at `d68c3b1afa56199282dff25e3ced8279dcf77c53`. The shared **PotatoBeans MVP**
  scheme archives **MVP Release**. Its PotatoBeans target selects
  `ASSETCATALOG_COMPILER_APPICON_NAME = AppIcon`; the catalog's default universal
  iOS 1024×1024 entry is the requested `AppIcon.png`. The dark/tinted variants
  are deliberately not used on this white website.
- **My Stories:** `WisdomMediumAdmin/my-stories`, final release candidate
  `2d9d007` (full SHA in manifest). The shared **Journal** scheme archives
  **Release**; the Journal target uses `JOURNAL_LOCAL_ONLY` and selects
  `ASSETCATALOG_COMPILER_APPICON_NAME = AppIcon`. Its universal iOS 1024×1024
  catalog entry is the requested `AppIcon.png`. The icon Git blob is unchanged
  from accepted release `7c9217a` (`a09cd9af51b0c41914929d38f88c7f0f8b3ce364`).

This verifies source configuration selection, not a new signed App Store binary.

## Web preparation and verification

Pillow 13.0.0 decoded each source PNG. The 256, 512 and 768 pixel variants use
Lanczos resizing; the 1024 pixel reference is not resized. All are encoded as
lossless WebP (`lossless=True, method=6, exact=True`), retaining the source ICC
profile when present. Decoded RGBA bytes were compared to the reference resize
for each size: zero differing bytes. The 1024 pixel WebP also matches the
original source PNG's decoded RGBA bytes exactly. No recoloring, redrawing,
compositing or art replacement is involved.

`AppIcon.tsx` shares the same assets between the homepage and product pages.
Responsive image candidates avoid fetching the full-resolution reference during
normal viewing. Explicit width/height reserve a square; meaningful alt text names
each app. Home cards use lazy loading and product heroes use eager/high priority.
CSS alone adds rounded presentation and subtle shadows. The surrounding mint and
lavender panels belong to the website, not to the icon files.

To verify a deployed file, download its exact path from `app-icons.json`, compare
its SHA-256 with the manifest, then decode and compare with the pinned PNG (or
its Lanczos resize). Do not use an unrelated development checkout as the source.

## Walkmallow

The three Walkmallow icon sizes use the default Lavender artwork from
`Apple/iOS/Resources/Assets.xcassets/AppIcon.appiconset/icon.png` in
`WisdomMediumAdmin/Walkmallow` at `442352137328a2230a8aaf8fbd630e228ba6df83`.
The lossless WebP files preserve the source ICC profile and match the RGBA pixels
of the Lanczos resizes. The five product screenshots are 660 × 1434 WebP
derivatives of the November 10 release package. Each original PNG matched
the SHA-256 in the app team's screenshot manifest before conversion.

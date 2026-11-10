# Website facts evidence

Audited app source: [1f035199ce0a8670281a63bd0695f811d55047bf](https://github.com/WisdomMediumAdmin/CuckooAlarm/commit/1f035199ce0a8670281a63bd0695f811d55047bf). All paths below refer to that app repository unless explicitly prefixed WisdomMedium-Web. No policy is approved for publication.

Final signed Debug/Release binary details are in docs/Release/CuckooAlarm_2026-11-08_Execution/BINARY_AUDIT.json. Physical verification is explicitly deferred.

## platforms_supported

Status: verified. iPhone, portrait, iOS 26.0 minimum; 1.0 (1); com.wisdommedium.alarm; Live Activity extension com.wisdommedium.alarm.widgets

Current signed Release and Debug iPhone builds passed using existing development credentials; BINARY_AUDIT.json verifies iPhone-only, portrait, iOS26, stable IDs and WeatherKit entitlement. No distribution release approval; iOS26 runtime/device coverage pending.

Evidence: Apple/CuckooAlarm/Info.plist; Apple/CuckooAlarm.xcodeproj/project.pbxproj:661; Apple/build-execution-stage01/Build/Products/Debug-iphonesimulator/CuckooAlarm.app/Info.plist; docs/Release/CuckooAlarm_2026-11-08_Execution/BINARY_AUDIT.json

## local_user_content

Status: verified. SwiftData alarms (labels, times, weekdays, locks, sound, system IDs and delivery state); UserDefaults preferences/timer/journals/coarse point; protected JSON stopwatch/laps and weather. No app sync.

Deleting alarms first cancels delivery, with five-second in-memory undo. Stopwatch reset removes active saved laps; timer cancellation clears local session after native cancellation. Legacy import sources preserved. Uninstall/Apple backups not guaranteed to erase all historical copies.

Evidence: Apple/CuckooAlarm/Core/AlarmRecord.swift; Apple/CuckooAlarm/CuckooAlarmApp.swift:29; Apple/CuckooAlarm/Services/AlarmStore.swift:215; Apple/CuckooAlarm/Services/StopwatchStore.swift:38

## remote_data_analytics_ads_backend

Status: verified. No developer backend, accounts, CloudKit sync, advertising, analytics or third-party packages in project. Optional Apple Weather fetch/attribution/logo network requests; explicit browser links and voluntary email.

Manifest declares no tracking/collected data and UserDefaults CA92.1. This is not a guarantee about Apple diagnostics, App Store services, backups or external mail/browser providers. App Store privacy questionnaire needs owner review.

Evidence: Apple/CuckooAlarm/CuckooAlarmApp.swift:29; Apple/CuckooAlarm/Services/WeatherService.swift:18; Apple/CuckooAlarm/UI/WeatherViews.swift:28; Apple/CuckooAlarm/Resources/PrivacyInfo.xcprivacy; Apple/CuckooAlarm.xcodeproj/project.pbxproj

## location_processing

Status: verified. Optional when-in-use one-shot location, desired accuracy 3 km; rounded to 0.1 degree before persistence and Apple Weather request; recent coarse point reused for six hours. No continuous/background location mode.

System may initially return a finer point, transient only. Rounding is not anonymity. Foreground return is local-only. Revocation clears cached point/forecast; physical permission checks pending. Final audit repair replaces coordinate-bearing refresh-history keys with a location-free timestamp on revocation; policy allowance remains intact.

Evidence: Apple/CuckooAlarm/Services/WeatherService.swift:35; Apple/CuckooAlarm/Services/WeatherService.swift:65; Apple/CuckooAlarm/Services/WeatherService.swift:121; Apple/CuckooAlarm/Core/WeatherPolicy.swift:3

## weather_cache_retention

Status: verified. Shared local schema-2 forecast with timestamps, expiry, hourly and solar values, rounded point and provider attribution. Expiry is earlier of provider expiry and 24h. Routine success refresh policy is 24h per location; one extra off/on attempt per local day, bounded retries.

OFF hides immediately/stops new requests; keeps bounded cache until expiry cleanup when app runs. Revocation purges forecast and point. Attempt metadata/manual-day history retained locally; old legacy policy files preserved. No continuous deletion process while terminated. Tests use injected data, not live provider observations.

Evidence: Apple/CuckooAlarm/Services/WeatherService.swift:6; Apple/CuckooAlarm/Services/WeatherService.swift:27; Apple/CuckooAlarm/Core/WeatherPolicy.swift:40; Apple/CuckooAlarm/Core/WeatherPolicy.swift:80

## alarmkit_and_fallback

Status: verified. Native AlarmKit registration verified via system query; permission-only failure can use registered local notifications if alert/sound allowed. Notifications explicitly labeled lower reliability. Timer and test alarm require native authorization.

Source, fake-backend tests and actual API-confirmed simulator registration verified. stage07-ui-closeout.xcresult passed native authorization via public Settings, registration, locking/unlocking, cancellation and deletion. Locked/Silent/Focus/force-quit physical speaker delivery remains pending by user instruction. Saved record alone never proves scheduled delivery.

Evidence: Apple/CuckooAlarm/Services/AlarmScheduler.swift; Apple/CuckooAlarm/Services/NotificationAlarmScheduler.swift; Apple/CuckooAlarm/Services/AlarmStore.swift

## audio_assets_rights

Status: verified. System alarm sound provided by Apple; sixteen custom original synthesized masters, plus sixteen gated seven-step prototypes. New ice-cream motif composed in generator; no borrowed recordings/melodies.

Provenance/generator/hash evidence verified, not a legal opinion or exclusivity guarantee. Owner reviews rights before publication.

Evidence: docs/ASSET_LICENSES.md; Scripts/generate_expanded_sounds.py; docs/Release/CuckooAlarm_2026-11-08_Execution/SOUND_ASSET_AUDIT.json

## progressive_volume

Status: not_implemented. Unavailable and disabled in this version. Prototype envelopes packaged but no verified system-delivery claim.

AlarmKit exposes named/default AlertSound, no dynamic gain API. Physical seven-step proof deferred; no advertising Progressive or system-volume override.

Evidence: Apple/CuckooAlarm/Core/SoundCatalog.swift; Apple/CuckooAlarm/UI/SettingsView.swift; docs/Release/CuckooAlarm_2026-11-08_Execution/STAGE_05.md

## apple_weather_attribution

Status: verified. Provider-returned combined mark and legal data-source link displayed with cached forecast; dedicated Settings attribution route and official legal sources link.

Logo fetched with AsyncImage; text placeholder while unavailable. Live provider logo/locale and offline presentation need device verification. WeatherKit terms: https://developer.apple.com/weatherkit/ ; sources: https://weatherkit.apple.com/legal-attribution.html

Evidence: Apple/CuckooAlarm/UI/WeatherViews.swift:23; Apple/CuckooAlarm/UI/SettingsView.swift:71; Apple/CuckooAlarm/Services/WeatherService.swift:31

## support_email

Status: verified. support@wisdommedium.com; native compose when available, mailto then copy fallback; no automatic data attachments.

Address matches user instruction and site source. Mailbox receipt/support response availability not tested; no message sent.

Evidence: Apple/CuckooAlarm/Core/AppDestinations.swift:5; Apple/CuckooAlarm/UI/SettingsView.swift; WisdomMedium-Web/src/site.ts:5

## privacy_policy_url

Status: not_verified. Unknown/unpublished.

No published app-specific page confirmed. Candidate review route /apps/cuckooalarm/privacy/ is not a live approved policy. App uses safe unavailable alert.

Evidence: Apple/CuckooAlarm/Core/AppDestinations.swift:7

## terms_url

Status: not_verified. Unknown/unpublished.

Candidate review route /apps/cuckooalarm/terms/ requires approval/publication/HTTP verification. Do not wire review URL in app.

Evidence: Apple/CuckooAlarm/Core/AppDestinations.swift:8

## app_store_id_and_review_url

Status: not_verified. Unknown/unpublished.

Unpublished app. No genuine ID/URL provided or invented; review/share unavailable alert retained.

Evidence: Apple/CuckooAlarm/Core/AppDestinations.swift:6

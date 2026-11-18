# Changelog

All notable improvements to **Shanghai Plan B Master Map (6–11 Dec 2026)** across Baseline and Phases 1–4.

---

## Phase 4 — CI, Automated Validation, Error Handling & Documentation

### Added
- **Full Data & Asset Validator (`scripts/validate-data.mjs`):**
  - Verifies unique `place.id`s, valid `step.placeId` / `altStep.placeId` references, and valid `mode` keys in `transitStyles`.
  - Validates `coords.length >= 2` (except single-point day start), route continuity between consecutive steps/segments, monotonic `step.time`, and single-visit `timeSlot` alignment.
  - Enforces China (`18–54°N, 73–135°E`) and warns outside Shanghai/Suzhou (`30.5–32.0°N, 120.0–122.2°E`) bounding boxes.
  - Checks all 4 variants per referenced image (`thumb/*.webp`, `thumb/*.jpg`, `full/*.webp`, `full/*.jpg`) against size budgets (`thumb <= 25 KB`, `full <= 150 KB`, Day 2/4/5 total thumb WebP `<= 350 KB` — measured `[d2=37.1KB, d4=46.8KB, d5=27.0KB]`).
  - Verifies Day 1–6 Thai weekday labels match the actual Dec 6–11, 2026 calendar (Sun–Fri).
  - Audits `index.html` for zero forbidden external CDNs (`fonts.googleapis.com`, `fonts.gstatic.com`, `unpkg.com`), parses inline `<script>` with `new Function`, and syntax-checks `sw.js` via `node --check`.
- **GitHub Actions CI (`.github/workflows/ci.yml`):** Triggers on `push` and `pull_request` (`main`, `feat/*`), runs `node scripts/validate-data.mjs` on Node 24 without requiring `npm ci`.
- **Documentation:** Updated `ADD_PLACE_GUIDE.md` (GCJ-02 vs WGS-84 guide, full Phase 2/3 schema, `sharp` 2-size image pipeline, validator usage), added `README.md`, and added `CHANGELOG.md`.

### Changed
- **Graceful Load Error Card (`index.html`):** If `window.TRIP_DATA` fails to load, renders a readable Thai error card with a reload button inside `#sidebar-body` instead of `alert()` and a blank page.

---

## Phase 3 — Field-Use Readiness, Resilience & Accessibility

### Added
- **3.1 Live GPS (`📍 ฉันอยู่ไหน`):** `navigator.geolocation.watchPosition` with accuracy circle, pulsing user marker, recenter button (`#btn-gps-recenter`), Thai error messages, and `wgs84ToGcj02(lat, lng)` conversion applied exclusively to WGS-84 GPS/user inputs (existing `GCJ-02` pins in `data/trip_data.js` remain untouched).
- **3.2 Live `"ตอนนี้"` (`🕒 ตอนนี้`) Mode:** `Asia/Shanghai` clock via `Intl.DateTimeFormat`, auto-jump to matching Dec 6–11, 2026 day (or preview quick-jumps before/after trip dates), current/next step highlight with minute countdown, and `"✓ ไปแล้ว"` step checkboxes persisted in `safeStorage` (`shanghai_planb_visited_v1`).
- **3.3 Map Picker, Datum Selector & URL Parser:** `"📍 จิ้มแผนที่"` button, right-click and 550ms touch long-press (iOS Safari compatible) coordinate picker, `GCJ-02 (Amap/จีน - แนะนำ)` vs `WGS-84 (Google/GPS → แปลงอัตโนมัติ)` selector, and `parseMapUrlCoords()` supporting Amap (`position=lng,lat`) and Google Maps (`@lat,lng`, `?q=`, `!3d!4d`) URLs.
- **3.4 Custom Overrides, Export/Import & Share Link:** Edit or hide built-in places via `safeStorage` (`shanghai_planb_place_overrides_v1`) with `"🔄 รีเซ็ตค่าเริ่มต้น"`, Export/Import JSON with validation, and UTF-8 safe base64url `#state=` share links with load-time import prompt.
- **3.5 Deep Link URL State:** Restores and syncs `?day=&step=&view=&zone=&p=` via `history.replaceState` plus `"🔗 คัดลอกลิงก์หน้านี้"` button.
- **3.6 Taxi Card Modal (`#taxi-modal`):** Full-screen high-contrast Chinese name/address/station card with Thai title, copy Chinese address button, and optional `place.phone` field.
- **3.7 Print & Text-Only Modes:** `@media print` itinerary layout, `"🖨️ พิมพ์"`, and `"📄 โหมดข้อความล้วน"` toggle.
- **3.11 Map Layer Switcher & Tile Outage Resilience:** Amap Standard vs Amap Satellite (`style=6`) toggle and `tileerror` threshold warning banner suggesting satellite switch or text-only mode, preserving `!hasLeaflet` text fallback.

### Changed
- **3.8 Zones Search Performance:** Added 200ms debounce and partial DOM/marker updates (`#zones-cards-list` + `renderZoneMarkersOnly()`) so typing no longer resets input focus, `scrollTop`, or map `fitBounds()`.
- **3.9 Measure Distance Upgrades:** Explicitly labeled `(เส้นตรง)` straight-line distance, added `+20% ประมาณทางเดินจริง` toggle, realistic DiDi minute range, and `"🧭 เปิดเส้นทางจริงใน Amap"` navigation link.
- **3.10 True-Coordinate Overlapping Markers:** Removed the `0.0006` coordinate offset mutation in `renderMap()` so pins stay at exact `[lat, lng]` using radial pixel `iconAnchor` / `popupAnchor` offsets instead.
- **3.12 Accessibility (A11y):** Added `aria-pressed`/`aria-expanded` on toggles, `:focus-visible` outlines, `Esc` key + focus trap on modals, WCAG AA contrast badges (`getContrastTextColor`, `--muted: #526071`), and `@media (prefers-reduced-motion: reduce)`.
- **Service Worker (`sw.js`):** Bumped `CACHE_VERSION` from `'v2'` to `'v3'`.

---

## Phase 2 — Itinerary Accuracy, Station Plazas & Place Metadata

### Changed
- **Maglev & Day 1 Arrival Realism:** Corrected `transitStyles.maglev` label from `430 km/h` to `300 km/h`; updated Day 1 main DiDi arrival to `~22:30–23:15` (accounting for 45–75 min immigration/baggage + 50–60 min DiDi) and documented Option B Maglev (`50` RMB / `40` RMB with Boarding Pass, `21:42` cutoff / check late trains `22:15`, `22:40`).
- **Station South Square Coordinates:**
  - `sh_station` (`上海站南广场 · 秣陵路303号`) shifted **190 m** from `[31.2497, 121.4550]` to `[31.2480, 121.4548]`.
  - `suzhou_station` (`苏州站南广场`) shifted **108 m** from `[31.3284, 120.6102]` to `[31.3278, 120.6111]`.
- **Day 4 & Day 5 Timings & Closures:** Added 30-minute pre-departure CRH station buffers (`07:20` at Shanghai Station for `08:00` train; `14:50` at Suzhou SIP for `15:20` train) and `25–30` min midday transfer to Jinji Lake; surfaced museum opening hours & weekday closures (`Natural History Museum` closed Tue; `St. Ignatius Cathedral` & `China Art Museum` closed Mon; Yuyuan garden `16:30` close) and `21:30` Day 5 wrap-up before Day 6 `04:45` checkout.
- **Christmas Market @ Rockbund Metadata:** Added season (`25 พ.ย.–27 ธ.ค. 2026`), hours (Wed–Fri `15:00–22:00`, Sat–Sun `12:00–22:00`, closed Mon–Tue), ticket pricing (`30/38` RMB advance, `40/48` RMB walk-in), and SmartShanghai booking URL.

### Added
- **Place Metadata Schema & Badges:** Added `openHours`, `closedDays`, `ticketPrice`, `bookingUrl`, `showBadge`, and `lastVerified` (`2026-11-19`) across `data/trip_data.js` and popup/zone cards.
- **Daily Summary & Pace Badges:** Added per-day step count, time range, calculated walk distance (`d1` `0.00 km`, `d2` `6.36 km`, `d3` `1.29 km`, `d4` `5.02 km`, `d5` `8.69 km`, `d6` `0.00 km`), and pace indicator (`🟢 เบา` / `🟡 กลาง` / `🔴 หนัก`) in Overview and Day headers.

---

## Phase 1 — Offline PWA, Self-Hosted Assets, Mobile Bottom Sheet & Image Pipeline

### Added
- **Offline PWA Support (`sw.js`, `manifest.webmanifest`, `icons/`):**
  - Added `manifest.webmanifest` (`standalone` mode, `#0f172a` theme) and `192x192` / `512x512` app icons.
  - Added `sw.js` (`v2`) with separate caches for shell, `trip_data.js` (network-first 2.5s timeout), 27 precached WebP thumbnails, and up to 350 LRU Amap tiles (`stale-while-revalidate`), plus header sync status bar and manual `🔄 อัปเดตข้อมูล` refresh.
- **Self-Hosted Leaflet & Font Stack (`vendor/leaflet/`):** Vendored Leaflet `1.9.4` CSS, JS, and marker icons locally and switched to native Thai/Chinese system fonts (removing all `unpkg.com` and `fonts.googleapis.com` / `fonts.gstatic.com` dependencies).
- **Mobile 3-Snap Bottom Sheet (`index.html`):** Draggable `peek` / `half` / `full` sheet with `100dvh`, safe-area padding, compact mobile popups, and mobile legend toggle.
- **2-Size Image Pipeline (`scripts/build-images.mjs`):** Built `sharp` pipeline reducing 27 raw images (**11.66 MiB**) into `128×128` thumbnails (**118.4 KB** WebP / **112.7 KB** JPG total) and `<= 800px` full popup images (**2.67 MiB** WebP / **2.80 MiB** JPG total, each `<= 150 KB`), served via `<picture>` + `srcset`.

---

## Baseline (`main` / Prep)
- Initial **Shanghai Plan B Master Map (6–11 Dec 2026)** single-page app (`index.html`, `data/trip_data.js`, `ADD_PLACE_GUIDE.md`) with 6 zones, 6-day vertical timeline, multi-segment polylines, Amap/Google Maps links, distance measurement tool, and `+ เพิ่มที่เที่ยว` live preview snippet modal.
- Added `package.json` (`sharp` devDependency) and `scripts/validate-data.mjs` skeleton on branch `feat/trip-readiness`.

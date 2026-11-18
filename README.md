# Shanghai Plan B Master Map (6–11 Dec 2026)

Static, zero-build, **offline-first Progressive Web App (PWA)** for the **Shanghai + Suzhou trip (6–11 ธ.ค. 2569 / 6–11 Dec 2026)**. Designed for reliable field use in mainland China with self-hosted assets, Amap (`GCJ-02`) map tiles, Thai/Chinese UI, and an automated Node validation pipeline.

## Highlights & Current Dataset
- **Pure Static Architecture:** Vanilla HTML/CSS/JS (`index.html`), externalized trip dataset (`data/trip_data.js`), self-hosted Leaflet (`vendor/leaflet/`), and native system Thai/Chinese font stack — **zero Google Fonts or unpkg CDN requests**.
- **Trip Dataset (`data/trip_data.js`):** **46 places**, **6 zones (`z1`–`z6`)**, **14 transit styles** (Walk, Metro Lines 1/2/7/8/9/10/11/12/13/14, Maglev 300 km/h, CRH, DiDi), **6 days (`d1`–`d6`)** totaling **53 main steps + 2 Day 1 Maglev Option B altSteps**, and **27 illustrated places** (4 responsive WebP/JPG variants each).
- **Field-Use Features:**
  - **Live GPS (`📍 ฉันอยู่ไหน`):** Browser Geolocation (`WGS-84`) converted on-the-fly via `wgs84ToGcj02` to align with Amap (`GCJ-02`) tiles, with accuracy circle and recenter button (`#btn-gps-recenter`).
  - **Live Schedule Mode (`🕒 ตอนนี้`):** `Asia/Shanghai` clock, automatic trip-day selection (Dec 6–11, 2026) or preview quick-jumps, current/next step highlight with minute countdown, and persistent `"✓ ไปแล้ว"` checkboxes.
  - **Taxi Card (`🚕 Taxi Card`):** Full-screen high-contrast modal showing huge Chinese place name/address/station, Thai name, copy button, and optional phone number (`place.phone`).
  - **Interactive Pin Adder (`+ เพิ่มที่เที่ยว`):** Map picker (`📍 จิ้มแผนที่`, right-click, or 550ms iOS Safari long-press), `GCJ-02` vs `WGS-84 → GCJ-02` datum selector, Amap/Google Maps URL parser, local place overrides, Export/Import JSON, and UTF-8 `#state=` share links.
  - **Deep Links & Measure Tool:** URL state sync (`?day=&step=&view=&zone=&p=`), straight-line vs `+20% ประมาณทางเดินจริง` walk estimates, realistic DiDi minute range, and direct Amap route link (`🧭 เปิดเส้นทางจริงใน Amap`).
  - **Resilience & Accessibility:** Amap Standard/Satellite switcher, `tileerror` outage banner, text-only view (`📄 โหมดข้อความล้วน`), `@media print` itinerary (`🖨️ พิมพ์`), keyboard `Esc` + focus-trapped modals, and Thai error card fallback if `trip_data.js` fails to load.

---

## Repository Structure

```text
.
├── index.html                  # App shell, styles, map & UI logic (vanilla JS IIFE)
├── sw.js                       # Service Worker (split caches, tile LRU <= 350, offline fallback)
├── manifest.webmanifest        # PWA manifest (standalone, icons, #0f172a theme)
├── package.json                # Dev scripts (build:images, validate) & sharp devDependency
├── data/
│   └── trip_data.js            # Single source of truth (window.TRIP_DATA)
├── vendor/leaflet/             # Self-hosted Leaflet 1.9.4 CSS, JS, and marker images
├── icons/                      # PWA icons (192x192, 512x512)
├── place_images/               # Optimized images (27 places)
│   ├── *.jpg                   # Root fallback images (<= 150 KB)
│   ├── thumb/                  # 128x128 WebP & JPG thumbnails (<= 25 KB each)
│   └── full/                   # Max 800px WebP & JPG popup images (<= 150 KB each)
├── scripts/
│   ├── build-images.mjs        # Generates 2-size WebP + JPG images using sharp
│   └── validate-data.mjs       # Validates schema, routes, times, images, calendar, HTML & SW
├── .github/workflows/
│   └── ci.yml                  # GitHub Actions CI (Node 24, runs validate-data.mjs)
├── ADD_PLACE_GUIDE.md          # Guide for GCJ-02/WGS-84, schema, images & validator
├── CHANGELOG.md                # Release history across Baseline & Phases 1–4
└── README.md                   # This file
```

---

## Local Development & Validation

### 1. Run Local HTTP Server
Service Workers (`sw.js`) and PWA installation require HTTP/HTTPS (avoid opening `index.html` via `file://`):

```bash
python -m http.server 8767 --bind 127.0.0.1
```

Then open [http://127.0.0.1:8767/](http://127.0.0.1:8767/) in your browser.

### 2. Validate Trip Data, Images & Code
Requires Node.js (tested on Node 24 in CI; uses built-in Node APIs only, so **no `npm install` is needed**):

```bash
node scripts/validate-data.mjs
# or
npm run validate
```

Verified output on current dataset:
```text
✅ All checks passed: 46 places, 6 days (53 steps + 2 altSteps), 27 images (4 variants each), day thumb WebP [d2=37.1KB, d4=46.8KB, d5=27.0KB], 1 inline script(s), sw.js OK, 0 warning(s).
```

### 3. Rebuild Optimized Place Images (Optional)
Only needed when adding or replacing images in `place_images/` (requires `sharp` via `npm install`):

```bash
npm install
npm run build:images
```

See [ADD_PLACE_GUIDE.md](ADD_PLACE_GUIDE.md) for the full `places` / `days` schema, `GCJ-02` vs `WGS-84` coordinate rules, and image budget details.

---

## Offline PWA & Add to Home Screen

### Preparing for Offline Use (Before Departure)
1. Open the hosted URL while on reliable Wi-Fi so `sw.js` precaches the app shell, local Leaflet, `data/trip_data.js`, and all 27 WebP thumbnails.
2. Tap through `Day 1`–`Day 6` and pan/zoom the key areas (Hotel/People's Square, French Concession, Disney, Suzhou, Lujiazui/The Bund) so Amap tiles are cached locally (up to **350 tiles** via LRU).
3. Check the sync bar in the header (`🟢 ออนไลน์ • ข้อมูลล่าสุด ...`). If `trip_data.js` is updated before the trip, tap **`🔄 อัปเดตข้อมูล`** to force-refresh the cached dataset.

### Install on iOS (Safari)
1. Open the app URL in **Safari** (iOS requires Safari for Home Screen PWA installation).
2. Tap the **Share** button (square with upward arrow).
3. Select **Add to Home Screen** (`เพิ่มไปยังหน้าจอโฮม`) and confirm **Add**.
4. Launch **Shanghai Map** from your Home Screen icon for full-screen standalone mode.

### Install on Android (Chrome)
1. Open the app URL in **Chrome**.
2. Tap the **⋮** menu (or the install prompt banner if shown).
3. Select **Install app** / **Add to Home Screen** and confirm.
4. Launch **Shanghai Map** from your Home Screen or app drawer.

---

## CI & GitHub Pages Deployment
- **Continuous Integration ([.github/workflows/ci.yml](.github/workflows/ci.yml)):** Runs `node scripts/validate-data.mjs` on Node 24 for every `push` and `pull_request` targeting `main` or `feat/*`.
- **Static Hosting (GitHub Pages):** Because there is no build step, GitHub Pages serves directly from the repository root (`main` branch, `/`), e.g. `https://constantcmu.github.io/shanghai-trip-map/`.

For detailed revision history, see [CHANGELOG.md](CHANGELOG.md).

const CACHE_VERSION = 'v2';
const SHELL_CACHE = `shanghai-shell-${CACHE_VERSION}`;
const DATA_CACHE = `shanghai-data-${CACHE_VERSION}`;
const IMAGE_CACHE = `shanghai-img-${CACHE_VERSION}`;
const TILE_CACHE = `shanghai-tiles-${CACHE_VERSION}`;
const META_CACHE = `shanghai-meta-${CACHE_VERSION}`;

const MAX_TILES = 350;
const DATA_TIMEOUT_MS = 2500;
const DATA_META_KEY = './__meta/data-status.json';
const TILE_LRU_KEY = './__meta/tile-lru.json';

const SHELL_ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './vendor/leaflet/leaflet.css',
  './vendor/leaflet/leaflet.js',
  './vendor/leaflet/images/layers.png',
  './vendor/leaflet/images/layers-2x.png',
  './vendor/leaflet/images/marker-icon.png',
  './vendor/leaflet/images/marker-icon-2x.png',
  './vendor/leaflet/images/marker-shadow.png',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

const THUMB_ASSETS = [
  './place_images/thumb/anfu_road.webp',
  './place_images/thumb/dingtele.webp',
  './place_images/thumb/disney.webp',
  './place_images/thumb/ex_jingan_temple.webp',
  './place_images/thumb/ex_longhua_temple.webp',
  './place_images/thumb/ex_starbucks_roastery.webp',
  './place_images/thumb/ex_the_bund.webp',
  './place_images/thumb/ex_xintiandi.webp',
  './place_images/thumb/ex_yuyuan_old_street.webp',
  './place_images/thumb/ex_zhang_yuan.webp',
  './place_images/thumb/fei_da_chu.webp',
  './place_images/thumb/matcha_wang.webp',
  './place_images/thumb/mingzhu_roundabout.webp',
  './place_images/thumb/museum_of_art_pudong.webp',
  './place_images/thumb/north_bund.webp',
  './place_images/thumb/rockbund.webp',
  './place_images/thumb/shanghai_christmas_rockbund.webp',
  './place_images/thumb/sichuan_fish_disney.webp',
  './place_images/thumb/suzhou_eye_ferris.webp',
  './place_images/thumb/suzhou_humble_garden.webp',
  './place_images/thumb/suzhou_jinji_lake.webp',
  './place_images/thumb/suzhou_pingjiang.webp',
  './place_images/thumb/suzhou_shantang.webp',
  './place_images/thumb/tao_tao_ju.webp',
  './place_images/thumb/wukang_mansion.webp',
  './place_images/thumb/xie_san_bao.webp',
  './place_images/thumb/xujiahui_cathedral.webp'
];

let tileLruQueue = Promise.resolve();

async function setDataUpdatedAt(isoString) {
  const cache = await caches.open(META_CACHE);
  const payload = JSON.stringify({ updatedAt: isoString });
  await cache.put(
    DATA_META_KEY,
    new Response(payload, { headers: { 'Content-Type': 'application/json' } })
  );
}

async function getDataUpdatedAt() {
  const cache = await caches.open(META_CACHE);
  const res = await cache.match(DATA_META_KEY);
  if (!res) return null;
  try {
    const json = await res.json();
    return json.updatedAt || null;
  } catch {
    return null;
  }
}

async function broadcastMessage(msg) {
  const clients = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
  for (const client of clients) {
    client.postMessage(msg);
  }
}

function recordTileLru(url) {
  tileLruQueue = tileLruQueue.then(async () => {
    const metaCache = await caches.open(META_CACHE);
    const tileCache = await caches.open(TILE_CACHE);
    let lru = [];
    try {
      const existing = await metaCache.match(TILE_LRU_KEY);
      if (existing) lru = await existing.json();
      if (!Array.isArray(lru)) lru = [];
    } catch {
      lru = [];
    }

    const idx = lru.indexOf(url);
    if (idx !== -1) lru.splice(idx, 1);
    lru.push(url);

    while (lru.length > MAX_TILES) {
      const oldest = lru.shift();
      if (oldest) await tileCache.delete(oldest);
    }

    await metaCache.put(
      TILE_LRU_KEY,
      new Response(JSON.stringify(lru), { headers: { 'Content-Type': 'application/json' } })
    );
  }).catch(() => {});
  return tileLruQueue;
}

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const shellCache = await caches.open(SHELL_CACHE);
    await shellCache.addAll(SHELL_ASSETS);

    const imgCache = await caches.open(IMAGE_CACHE);
    await Promise.allSettled(THUMB_ASSETS.map((url) => imgCache.add(url)));

    const dataCache = await caches.open(DATA_CACHE);
    try {
      const res = await fetch('./data/trip_data.js', { cache: 'reload' });
      if (res.ok) {
        await dataCache.put('./data/trip_data.js', res.clone());
        await setDataUpdatedAt(new Date().toISOString());
      }
    } catch {
      // Ignore if offline during install; existing cache remains
    }
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  const keep = new Set([SHELL_CACHE, DATA_CACHE, IMAGE_CACHE, TILE_CACHE, META_CACHE]);
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names.filter((n) => !keep.has(n)).map((n) => caches.delete(n)));
    await self.clients.claim();
  })());
});

async function handleTileRequest(event) {
  const { request } = event;
  const tileCache = await caches.open(TILE_CACHE);
  const cached = await tileCache.match(request);

  const networkPromise = fetch(request)
    .then(async (res) => {
      if (res && (res.ok || res.type === 'opaque')) {
        await tileCache.put(request, res.clone());
        await recordTileLru(request.url);
      }
      return res;
    })
    .catch(() => null);

  if (cached) {
    event.waitUntil(Promise.all([networkPromise, recordTileLru(request.url)]));
    return cached;
  }

  const netRes = await networkPromise;
  if (netRes) return netRes;
  return new Response('', { status: 504, statusText: 'Tile offline' });
}

async function handleTripDataRequest(request) {
  const dataCache = await caches.open(DATA_CACHE);
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), DATA_TIMEOUT_MS);

  try {
    const res = await fetch(request, { signal: controller.signal });
    clearTimeout(timer);
    if (res && res.ok) {
      await dataCache.put('./data/trip_data.js', res.clone());
      const now = new Date().toISOString();
      await setDataUpdatedAt(now);
      broadcastMessage({ type: 'DATA_UPDATED', updatedAt: now });
      return res;
    }
  } catch {
    clearTimeout(timer);
  }

  const cached = await dataCache.match('./data/trip_data.js') || await caches.match(request);
  if (cached) return cached;
  return new Response('/* offline */', {
    status: 503,
    headers: { 'Content-Type': 'application/javascript; charset=utf-8' }
  });
}

async function handleCacheFirst(request, cacheName, fallbackUrl) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request, { ignoreSearch: false });
  if (cached) return cached;

  try {
    const res = await fetch(request);
    if (res && res.ok) {
      await cache.put(request, res.clone());
    }
    return res;
  } catch {
    if (fallbackUrl) {
      const fb = await cache.match(fallbackUrl);
      if (fb) return fb;
    }
    return new Response('', { status: 504, statusText: 'Offline' });
  }
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // 1. Amap Tiles: stale-while-revalidate + LRU <= 350
  if (url.hostname.endsWith('.is.autonavi.com')) {
    event.respondWith(handleTileRequest(event));
    return;
  }

  // Only handle same-origin from here on
  if (url.origin !== self.location.origin) return;

  // 2. trip_data.js: network-first (2.5s timeout) -> cache fallback
  if (url.pathname.endsWith('/data/trip_data.js')) {
    event.respondWith(handleTripDataRequest(request));
    return;
  }

  // 3. Images: cache-first
  if (url.pathname.includes('/place_images/')) {
    event.respondWith(handleCacheFirst(request, IMAGE_CACHE));
    return;
  }

  // 4. Navigation & HTML: network-first (2.5s timeout) -> cache fallback
  if (request.mode === 'navigate' || url.pathname.endsWith('/index.html') || url.pathname.endsWith('/')) {
    event.respondWith((async () => {
      const cache = await caches.open(SHELL_CACHE);
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 2000);
      try {
        const res = await fetch(request, { signal: controller.signal });
        clearTimeout(timer);
        if (res && res.ok) {
          await cache.put('./index.html', res.clone());
          return res;
        }
      } catch {
        clearTimeout(timer);
      }
      return (await cache.match(request)) || (await cache.match('./index.html')) || new Response('Offline', { status: 503 });
    })());
    return;
  }

  event.respondWith(handleCacheFirst(request, SHELL_CACHE));
});

self.addEventListener('message', (event) => {
  const data = event.data || {};
  if (data.type === 'SKIP_WAITING') {
    self.skipWaiting();
    return;
  }

  if (data.type === 'GET_STATUS') {
    event.waitUntil((async () => {
      const updatedAt = await getDataUpdatedAt();
      const tileCache = await caches.open(TILE_CACHE);
      const tileKeys = await tileCache.keys();
      const reply = { type: 'STATUS', updatedAt, cachedTiles: tileKeys.length };
      if (event.ports && event.ports[0]) {
        event.ports[0].postMessage(reply);
      } else {
        await broadcastMessage(reply);
      }
    })());
    return;
  }

  if (data.type === 'FORCE_UPDATE_DATA') {
    event.waitUntil((async () => {
      try {
        const res = await fetch(`./data/trip_data.js?t=${Date.now()}`, { cache: 'reload' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const dataCache = await caches.open(DATA_CACHE);
        await dataCache.put('./data/trip_data.js', res.clone());
        const now = new Date().toISOString();
        await setDataUpdatedAt(now);
        const reply = { ok: true, updatedAt: now };
        if (event.ports && event.ports[0]) event.ports[0].postMessage(reply);
        await broadcastMessage({ type: 'DATA_UPDATED', updatedAt: now });
      } catch (err) {
        const reply = { ok: false, error: err && err.message ? err.message : 'Network error' };
        if (event.ports && event.ports[0]) event.ports[0].postMessage(reply);
      }
    })());
  }
});

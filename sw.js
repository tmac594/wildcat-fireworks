const CACHE = 'wildcat-v1';

// All assets to pre-cache on install
const ASSETS = [
  '/',
  '/index.html',
  '/admin.html',
  '/manifest.json',
  '/public/products.json',
  '/public/wildcat-logo.png',
  '/public/images/willow-explosion.png',
  '/public/images/whacky-tobacky.png',
  '/public/images/ghost-killer.png',
  '/public/images/double-down.png',
  '/public/videos/willow-explosion.mp4',
  '/public/videos/whacky-tobacky.mp4',
  '/public/videos/ghost-killer.mp4',
  '/public/videos/double-down.mp4',
];

// Pre-cache everything on install
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Remove old caches on activate
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Serve from cache first, fall back to network
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;

  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(res => {
        // Cache successful responses dynamically (e.g. new images added later)
        if (res && res.status === 200) {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      });
    }).catch(() => caches.match('/index.html'))
  );
});

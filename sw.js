const CACHE = 'wildcat-v3';

const ASSETS = [
  '/',
  '/index.html',
  '/admin.html',
  '/manifest.json',
  '/public/products.json',
  '/public/wildcat-logo.png',
  // Images
  '/public/images/one-minute-revelry.jpg',
  '/public/images/firefly.png',
  '/public/images/band of brothers.png',
  '/public/images/sky-diving.jpg',
  '/public/images/friday-night frenzy.png',
  '/public/images/willow-explosion.png',
  '/public/images/2-minute-exxtravaganza.png',
  '/public/images/voice-of-monster.png',
  '/public/images/something-red-white-and-blue.png',
  '/public/images/steel-navy.png',
  '/public/images/whacky-tobacky.png',
  '/public/images/ghost-killer.png',
  '/public/images/double-down.png',
  '/public/images/midnight.jpg',
  // Videos
  '/public/videos/one-minute-revelry.mp4',
  '/public/videos/firefly.mp4',
  '/public/videos/band-of-brothers.mp4',
  '/public/videos/sky-diving.mp4',
  '/public/videos/friday-night frenzy.mp4',
  '/public/videos/willow-explosion.mp4',
  '/public/videos/2-minutes-extravaganza.mp4',
  '/public/videos/something-red-white-and-blue.mp4',
  '/public/videos/steel-navy.mp4',
  '/public/videos/whacky-tobacky.mp4',
  '/public/videos/ghost-killer.mp4',
  '/public/videos/double-down.mp4',
  '/public/videos/midnight.mp4',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(res => {
        if (res && res.status === 200) {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      });
    }).catch(() => caches.match('/index.html'))
  );
});

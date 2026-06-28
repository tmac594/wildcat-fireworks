const CACHE = 'wildcat-v7';

// Network-first URLs: always fetch fresh, only use cache when offline
const NETWORK_FIRST = ['/public/products.json'];

const ASSETS = [
  '/',
  '/index.html',
  '/admin.html',
  '/manifest.json',
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
  '/public/images/classic-cannisters.png',
  '/public/images/monster-5-inch-cannister.png',
  '/public/images/ameri-cannons.png',
  '/public/images/super-sized.jpg',
  '/public/images/snake-pit.png',
  '/public/images/pirate-captain.png',
  '/public/images/wild-one.jpg',
  '/public/images/hulking-hurler.png',
  '/public/images/neon-show.jpg',
  '/public/images/poker-party.png',
  '/public/images/seal-the-deal.png',
  '/public/images/military-paratrooper.png',
  '/public/images/naughty-gnomes.png',
  '/public/images/3-min.png',
  '/public/images/sky-prince.jpg',
  '/public/images/sky-princess.jpg',
  '/public/images/Dino-landing.jpg',
  '/public/images/Super-dragon.png',
  '/public/images/go-bananas.jpg',
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
  '/public/videos/classic-cannisters.mp4',
  '/public/videos/monster-5-inch-cannister.mp4',
  '/public/videos/ameri-cannons.mp4',
  '/public/videos/super-sized.mp4',
  '/public/videos/snake-pit.mp4',
  '/public/videos/pirate-captain.mp4',
  '/public/videos/wild-one.mp4',
  '/public/videos/hulking-hurler.mp4',
  '/public/videos/neon-show.mp4',
  '/public/videos/seal-the-deal.mp4',
  '/public/videos/military-paratrooper.mp4',
  '/public/videos/naughty-gnome.mp4',
  '/public/videos/3-min.mp4',
  '/public/videos/sky-prince.mp4',
  '/public/videos/sky-princess.mp4',
  '/public/videos/Dino-landing.mp4',
  '/public/videos/super-dragon.mp4',
  '/public/videos/go-bananas.mp4',
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

  const url = new URL(e.request.url);

  // Network-first: always get fresh data, fall back to cache only when offline
  if (NETWORK_FIRST.some(path => url.pathname === path)) {
    e.respondWith(
      fetch(e.request).then(res => {
        if (res && res.status === 200) {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      }).catch(() => caches.match(e.request))
    );
    return;
  }

  // Cache-first for everything else (images, videos, HTML, etc.)
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

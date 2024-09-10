const CACHE_NAME = 'countdown-app-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/main.css',
  '/app.js',
  '/assets/favicon.svg',
  '/assets/500.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
      .catch(error => {
        console.error('Failed to cache:', error);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
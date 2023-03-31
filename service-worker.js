// Define the cache names
const CACHE_NAME = 'maverickgroup-v1';
const urlsToCache = [
    '/',
    '/about',
    '/contact',
    '/disclaimer',
    '/index.html',
    '/css/main.css',
    '/assets/js/main.js',
    '/assets/images/MaverickGroupLogoGreen.png'
];

// Install the service worker
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Cache opened');
                return cache.addAll(urlsToCache);
            })
    );
});

// Fetch the resources from the cache or network
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});

// Clean up old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.filter(cacheName => {
                    return cacheName.startsWith('maverickgroup-') &&
                        cacheName !== CACHE_NAME;
                }).map(cacheName => {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});
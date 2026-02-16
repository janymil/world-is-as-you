const CACHE_NAME = 'audiobook-v5';
const ASSETS = [
    './',
    './index.html',
    './style.css',
    './app.js',
    './manifest.json',
    './assets/intro-slovak.srt',
    './assets/9kapitola-postoj-vitaza.mp3',
    './assets/9kapitola-postoj-vitaza.srt',
    './assets/10kapitola-zodpovednost.mp3',
    './assets/10kapitola-zodpovednost.srt',
    './assets/11kapitola-falosni-bohovia.mp3',
    './assets/11kapitola-falosni-bohovia.srt'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS);
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

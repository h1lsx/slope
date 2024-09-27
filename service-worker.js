const CACHE_NAME = 'slope-cache-3'; // Change this to update the cache
cacheNames = [];
const cacheUrls = [
    '/',
    '/index.html', // Add any other HTML files you have
    '/styles.css',
    '/app.js',
    '/pwa.png',
    '/files/',
    '/files/index.html',
    '/files/Build/',
    '/files/Build/slope.json',
    '/files/Build/slope_data.unityweb',
    '/files/Build/slope_framework.unityweb',
    '/files/Build/slope_memory.unityweb',
    '/files/Build/slope_wasmcode.unityweb',
    '/files/Build/slope_wasmframework.unityweb',
    '/files/TemplateData/',
    '/files/TemplateData/UnityProgress.js',
    '/files/TemplateData/ProgressEmpty.Dark.png',
    '/files/TemplateData/ProgressFull.Dark.png',
    '/files/TemplateData/ProgressLogo.Dark.png',
    '/files/TemplateData/style.css',
    '/files/TemplateData/unityloader41.js'
    // Add other assets and resources you want to cache
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(cacheUrls);
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

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((name) => name !== CACHE_NAME)
                    .map((name) => caches.delete(name))
            );
        })
    );
});

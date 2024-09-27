const CACHE_NAME = 'slope-cache-3'; // Change this to update the cache
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

async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    const cachedResponse = await caches.match(request);
    return cachedResponse || Response.error();
  }
}

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  if (url.pathname.match(/^\/inbox/)) {
    event.respondWith(networkFirst(event.request));
  }
});

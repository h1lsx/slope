const cacheName = "cache-v3";
const precachedResources = ['index.html', 'styles.css', 'app.js', 'pwa.png', 'files/index.html', 'files/Build/slope.json', 'files/Build/slope_data.unityweb', 'files/Build/slope_framework.unityweb', 'files/Build/slope_memory.unityweb', 'files/Build/slope_wasmcode.unityweb', 'files/Build/slope_wasmframework.unityweb', 'files/TemplateData/UnityProgress.js', 'files/TemplateData/ProgressEmpty.Dark.png', 'files/TemplateData/ProgressFull.Dark.png', 'files/TemplateData/ProgressLogo.Dark.png', 'files/TemplateData/style.css', 'files/TemplateData/unityloader41.js'];

async function precache() {
  caches.open(cacheName).then((cache) => {
      console.log(cache, precachedResources);
      return cache.addAll(precachedResources);
    }
  )
}

self.addEventListener("install", (event) => {
  event.waitUntil(precache());
});

async function cacheFirstWithRefresh(request) {
  const fetchResponsePromise = fetch(request).then(async (networkResponse) => {
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  });
  console.log(await caches.match(request));
  return (await caches.match(request)) || (await fetchResponsePromise);
}

self.addEventListener("fetch", (event) => {  
  event.respondWith(cacheFirstWithRefresh(event.request));
});

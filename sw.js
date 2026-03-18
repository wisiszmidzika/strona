const CACHE_NAME = "my-app-cache-v1";
const STATIC_FILES = [
  "./",
  "./index.html",
  "./manifest.json",
  "./style.css",
  "./icon.png"
];

// Instalacja Service Workera
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_FILES))
  );
  self.skipWaiting();
});

// Aktywacja Service Workera
self.addEventListener("activate", event => {
  event.waitUntil(self.clients.claim());
});

// Obsługa fetch (dynamiczne cache'owanie wszystkiego, co nie było w STATIC_FILES)
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request).then(networkResponse => {
        return caches.open(CACHE_NAME).then(cache => {
          // Zapisz w cache kopię odpowiedzi
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      }).catch(() => {
        // Jeśli offline i pliku nie ma w cache, możesz tu wstawić fallback np. index.html
        if (event.request.mode === "navigate") {
          return caches.match("./index.html");
        }
      });
    })
  );
});
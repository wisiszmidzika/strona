const CACHE_NAME = "my-app-cache-v1";
const STATIC_FILES = [
  // główne HTML
  "./index.html",
  "./home.html",
  "./id.html",
  "./card.html",
  "./documents.html",
  "./more.html",
  "./moreid.html",
  "./pesel.html",
  "./przekierowanie.html",
  "./qr.html",
  "./scanqr.html",
  "./services.html",
  "./shortcuts.html",
  "./showqr.html",

  // główne JS
  "./sw.js",
  "./assets/bar.js",
  "./assets/home.js",
  "./assets/id.js",
  "./assets/index.js",
  "./assets/manifest.js",
  "./assetsdiff/bar.js",
  "./assetsdiff/flow.js",

  // JS z showqr
  "./showqr_files/bar.js",
  "./showqr_files/cache.js",
  "./showqr_files/show.js",

  // CSS
  "./assets/bar.css",
  "./assets/card.css",
  "./assets/id.css",
  "./assets/index.css",
  "./assets/main.css",
  "./assets/more.css",
  "./assets/moreid.css",
  "./assets/pesel.css",
  "./assets/qr.css",
  "./assets/services.css",
  "./assetsdiff/flow.css",
  "./showqr_files/show.css",

  // images
  "./assets/images/arrow.svg",
  "./assets/images/copy.svg",
  "./assets/images/discord.svg",
  "./assets/images/documents.css",
  "./assets/images/home.svg",
  "./images/backgroundlogin.png",
  "./images/border.png",
  "./images/card.png",
  "./images/checkbo.png",
  "./images/COI.png",
  "./images/godlo.gif",
  "./images/logo.png",
  "./images/mc.svg",
  "./images/Orzelek.png",
  "./images/polish_flag.gif",
  "./images/warstwa_1.png",
  "./images/warstwa_2.png",
  "./qr_files/check_gray.png",
  "./qr_files/confirm_gray.png",
  "./qr_files/logo_large.png",
  "./qr_files/right_arrow_sharp.png",
  "./more_files/appearance.png",
  "./more_files/bell_gray.png",
  "./more_files/certificates.png",
  "./more_files/clock.png",
  "./more_files/face.png",
  "./more_files/help_gray.png",
  "./more_files/house.png",
  "./more_files/idea.png",
  "./more_files/info.png",
  "./more_files/key.png",
  "./more_files/language.png",
  "./more_files/logo_large.png",
  "./more_files/more.css",
  "./more_files/passport.png",
  "./more_files/phone.png",
  "./more_files/right_arrow_sharp.png",
  "./more_files/star.png",
  "./scanqr_files/back_blue.png",
  "./scanqr_files/help.png",
  "./scanqr_files/html5-qrcode",
  "./services_files/air.png",
  "./services_files/bilkom.png",
  "./services_files/bus.png",
  "./services_files/business.png",
  "./services_files/check_id.png",
  "./services_files/check_pesel.png",
  "./services_files/collect_id.png",
  "./services_files/driver.png",
  "./services_files/e_payments.png",
  "./services_files/e_visit.png",
  "./services_files/elections.png",
  "./services_files/finish_case.png",
  "./services_files/flood.png",
  "./services_files/health.png",
  "./services_files/logo_large.png",
  "./services_files/MKA.png",
  "./services_files/my_ikp.png",
  "./services_files/nature.png",
  "./services_files/penalties.png",
  "./services_files/pesel.png",
  "./services_files/plane.png",
  "./services_files/right_arrow_sharp.png",
  "./services_files/safe_in_web.png",
  "./services_files/sign_document.png",
  "./services_files/tickets.png",
  "./services_files/vehicle.png",
  "./services_files/your_cases.png",
  "./showqr_files/back_blue.png",
  "./showqr_files/flag.png",
  "./showqr_files/help.png",
  "./showqr_files/holo.webp"
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
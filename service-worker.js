importScripts("https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js");

if (workbox)
    console.log(`Workbox berhasil dimuat`);
else
    console.log(`Workbox gagal dimuat`);

workbox.precaching.precacheAndRoute([
    { url: './index.html', revision: '1' },
    { url: './team.html', revision: '1' },
    { url: './nav.html', revision: '1' },
    { url: './favicon.ico', revision: '1' },
    { url: './manifest.json', revision: '1' },
    { url: './package-lock.json', revision: '1' },
    { url: './css/materialize.min.css', revision: '1' },
    { url: './css/style.css', revision: '1' },
    { url: './img/pl-logo.png', revision: '1' },
    { url: './push.js', revision: '1' },
    { url: './js/api.js', revision: '1' },
    { url: './js/db.js', revision: '1' },
    { url: './js/idb.js', revision: '1' },
    { url: './js/index.js', revision: '1' },
    { url: './js/materialize.min.js', revision: '1' },
    { url: './js/moment.min.js', revision: '1' },
    { url: './js/nav.js', revision: '1' },
    { url: './js/render.js', revision: '2' },
    { url: './js/team.js', revision: '1' },
    { url: './js/utility.js', revision: '1' },
    { url: './img/icon-36x36.png', revision: '1' },
    { url: './img/icon-48x48.png', revision: '1' },
    { url: './img/icon-72x72.png', revision: '1' },
    { url: './img/icon-96x96.png', revision: '1' },
    { url: './img/icon-144x144.png', revision: '1' },
    { url: './img/icon-192x192.png', revision: '1' },
    { url: './img/icon-512x512.png', revision: '1' },
    { url: 'https://fonts.gstatic.com/s/materialicons/v53/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2', revision: '1' },
    { url: 'https://fonts.googleapis.com/icon?family=Material+Icons', revision: '1' }],
    { ignoreURLParametersMatching: [/.*/] }
);

workbox.routing.registerRoute(
    /^https:\/\/fonts\.googleapis\.com/,
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
    })
);

workbox.routing.registerRoute(
    /^https:\/\/fonts\.gstatic\.com/,
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'google-fonts-webfonts',
    })
);

workbox.routing.registerRoute(
    new RegExp('https://api.football-data.org/v2/'),
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'api',
    })
);

workbox.routing.registerRoute(
    new RegExp('/pages'),
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'pages',
    })
);

workbox.routing.registerRoute(
    /.*\.(?:png|jpg|jpeg|svg|gif)/,
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'images',
        plugins: [
            new workbox.cacheableResponse.CacheableResponse({
                statuses: [0, 200],
            }),
            new workbox.expiration.ExpirationPlugin({
                maxEntries: 60,
                maxAgeSeconds: 14 * 24 * 60 * 60,
            }),
        ],
    })
);

self.addEventListener('push', function(event) {
    let body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Push message no payload';
    }
    let options = {
        body: body,
        icon: '/img/icon-192x192.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});
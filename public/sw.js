const CACHE = 'airfryer-shell-v4'
const SHELL = ['/', '/index.html', '/manifest.webmanifest', '/app-icon.svg', '/food-chicken.svg', '/food-potato.svg', '/food-salmon.svg', '/food-carrot.svg', '/food-zucchini.svg', '/food-tomato.svg', '/food-onion.svg', '/food-garlic.svg', '/food-cheese.svg', '/food-bacon.svg', '/food-egg.svg', '/food-meatball.svg']

self.addEventListener('install', event => event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(SHELL)).then(() => self.skipWaiting())))
self.addEventListener('activate', event => event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim())))
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return
  const isRecipeAsset = event.request.url.includes('/assets/recipes/')
  const networkFirst = event.request.mode === 'navigate' || isRecipeAsset || ['script', 'style'].includes(event.request.destination)
  event.respondWith((networkFirst ? fetch(event.request).then(response => { const copy = response.clone(); caches.open(CACHE).then(cache => cache.put(event.request, copy)); return response }).catch(() => caches.match(event.request)) : caches.match(event.request).then(cached => cached || fetch(event.request).then(response => { const copy = response.clone(); caches.open(CACHE).then(cache => cache.put(event.request, copy)); return response }))).catch(() => caches.match('/index.html')))
})

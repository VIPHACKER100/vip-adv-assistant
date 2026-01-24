/**
 * Service Worker for Offline Support
 * Enables Progressive Web App (PWA) functionality
 */

const CACHE_NAME = 'vip-assistant-v2.2.0';
const urlsToCache = [
    '/',
    '/index.html',
    '/css/variables.css',
    '/css/components.css',
    '/css/animations.css',
    '/css/voice-access.css',
    '/js/app.js',
    '/js/functions.js',
    '/js/automation.js',
    '/js/voice-access.js',
    '/js/openai-handler.js',
    '/js/theme-manager.js',
    '/js/search.js',
    '/js/favorites.js',
    '/js/keyboard-shortcuts.js',
    '/js/export-import.js',
    '/js/performance-monitor.js'
];

// Install event - cache resources
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Cache hit - return response
                if (response) {
                    return response;
                }

                return fetch(event.request).then(
                    (response) => {
                        // Check if valid response
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // Clone the response
                        const responseToCache = response.clone();

                        caches.open(CACHE_NAME)
                            .then((cache) => {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    }
                );
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];

    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

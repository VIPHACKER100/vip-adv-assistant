/**
 * Service Worker for Offline Support
 * Enables Progressive Web App (PWA) functionality
 */

const CACHE_NAME = 'vip-assistant-v6.2.0-mobile-upgrade';
const urlsToCache = [
    '/',
    '/index.html',
    '/css/variables.css',
    '/css/layout.css',
    '/css/components.css',
    '/css/animations.css',
    '/css/voice-access.css',
    '/css/face-recognition.css',
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
    '/js/performance-monitor.js',
    '/js/always-listening.js',
    '/js/command-center.js',
    '/js/chat-manager.js',
    '/js/notification-manager.js',
    '/js/about.js',
    '/js/recent-functions.js',
    '/js/shortcut-editor.js',
    '/js/cognitive-stream.js',
    '/js/face-recognition.js',
    '/libs/face-api.min.js',
    '/assets/logo.png',
    '/icon-192.png',
    '/icon-512.png',
    '/screenshot1.png',
    '/models/face_landmark_68_model-shard1',
    '/models/face_landmark_68_model-weights_manifest.json',
    '/models/face_recognition_model-shard1',
    '/models/face_recognition_model-shard2',
    '/models/face_recognition_model-weights_manifest.json',
    '/models/tiny_face_detector_model-shard1',
    '/models/tiny_face_detector_model-weights_manifest.json'
];

// Install event - cache resources
self.addEventListener('install', (event) => {
    self.skipWaiting(); // Force new service worker to activate immediately
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
        }).then(() => self.clients.claim())
    );
});

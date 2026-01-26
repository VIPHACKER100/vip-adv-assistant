/**
 * Vite Configuration for VIP AI Symphony
 * Modern build system with PWA support
 */

import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import viteCompression from 'vite-plugin-compression';
import { createHtmlPlugin } from 'vite-plugin-html';

export default defineConfig({
    root: '.',
    base: '/',
    publicDir: 'assets',

    // Dependency optimization settings
    optimizeDeps: {
        include: ['dompurify', 'idb'],
    },

    build: {
        outDir: 'dist',
        assetsDir: 'assets',
        sourcemap: true,
        minify: 'terser',
        target: 'es2022',
        cssCodeSplit: true,
        rollupOptions: {
            output: {
                manualChunks: {
                    'face-api': ['./libs/face-api.min.js'],
                    'vendor': ['dompurify', 'idb'],
                },
            },
        },
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true,
            },
        },
    },

    server: {
        port: 8000,
        host: true,
        open: true,
        cors: true,
        watch: {
            ignored: ['**/models/**', '**/libs/**', '**/node_modules/**']
        },
        hmr: {
            overlay: true
        }
    },

    preview: {
        port: 8000,
        host: true,
    },

    plugins: [
        createHtmlPlugin({
            minify: true,
            inject: {
                data: {
                    title: 'VIP SYMPHONY | Neural Mobile Interface',
                    description: 'Premium AI assistant with 75+ functions, mobile-first design, voice control, AI chat, and automation',
                },
            },
        }),

        VitePWA({
            registerType: 'autoUpdate',
            includeAssets: ['icon-192.png', 'icon-512.png', 'assets/logo.png'],
            manifest: {
                name: 'VIP Advanced Mobile AI Assistant v6.2',
                short_name: 'VIP AI',
                description: 'Premium AI assistant with 75+ functions, mobile-first design, voice control, AI chat, and automation',
                theme_color: '#22D3EE',
                background_color: '#0F172A',
                display: 'standalone',
                orientation: 'any',
                icons: [
                    {
                        src: 'icon-192.png',
                        sizes: '192x192',
                        type: 'image/png',
                        purpose: 'any maskable',
                    },
                    {
                        src: 'icon-512.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'any maskable',
                    },
                ],
            },
            workbox: {
                globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
                runtimeCaching: [
                    {
                        urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
                        handler: 'CacheFirst',
                        options: {
                            cacheName: 'google-fonts-cache',
                            expiration: {
                                maxEntries: 10,
                                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
                            },
                            cacheableResponse: {
                                statuses: [0, 200],
                            },
                        },
                    },
                    {
                        urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
                        handler: 'CacheFirst',
                        options: {
                            cacheName: 'gstatic-fonts-cache',
                            expiration: {
                                maxEntries: 10,
                                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
                            },
                            cacheableResponse: {
                                statuses: [0, 200],
                            },
                        },
                    },
                    {
                        urlPattern: /^https:\/\/api\.openai\.com\/.*/i,
                        handler: 'NetworkFirst',
                        options: {
                            cacheName: 'openai-api-cache',
                            networkTimeoutSeconds: 10,
                            expiration: {
                                maxEntries: 50,
                                maxAgeSeconds: 60 * 5, // 5 minutes
                            },
                        },
                    },
                ],
            },
        }),

        viteCompression({
            algorithm: 'gzip',
            ext: '.gz',
            threshold: 10240,
            deleteOriginFile: false,
        }),

        viteCompression({
            algorithm: 'brotliCompress',
            ext: '.br',
            threshold: 10240,
            deleteOriginFile: false,
        }),
    ],

    resolve: {
        alias: {
            '@': '/js',
            '@css': '/css',
            '@assets': '/assets',
            '@tests': '/tests',
        },
    },

    css: {
        devSourcemap: true,
    },
});

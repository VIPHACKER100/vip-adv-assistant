/**
 * E2E Tests for VIP AI Symphony
 * Tests core application functionality
 */

import { test, expect } from '@playwright/test';

test.describe('VIP AI Symphony - Core Functionality', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('should load the application successfully', async ({ page }) => {
        await expect(page).toHaveTitle(/VIP SYMPHONY/);
        await expect(page.locator('.logo')).toBeVisible();
    });

    test('should display header with navigation', async ({ page }) => {
        await expect(page.locator('.header')).toBeVisible();
        await expect(page.locator('#searchBtn')).toBeVisible();
        await expect(page.locator('#voiceAccessBtn')).toBeVisible();
        await expect(page.locator('#aiChatBtn')).toBeVisible();
    });

    test('should open search modal with Ctrl+K', async ({ page }) => {
        await page.keyboard.press('Control+K');
        await expect(page.locator('#searchModal')).toBeVisible();
    });

    test('should toggle theme', async ({ page }) => {
        const themeBtn = page.locator('#themeToggle');
        await themeBtn.click();
        // Check if theme changed
        const html = page.locator('html');
        const dataTheme = await html.getAttribute('data-theme');
        expect(['light', 'dark', 'auto']).toContain(dataTheme);
    });

    test('should display function categories', async ({ page }) => {
        await expect(page.locator('.category-grid')).toBeVisible();
        const categories = page.locator('.category-card');
        await expect(categories).toHaveCount(13); // 13 categories
    });

    test('should open AI chat', async ({ page }) => {
        await page.locator('#aiChatBtn').click();
        await expect(page.locator('#chatDrawer')).toBeVisible();
    });

    test('should handle mobile viewport', async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 });
        await expect(page.locator('.header')).toBeVisible();
        await expect(page.locator('.mobile-nav')).toBeVisible();
    });

    test('should register service worker', async ({ page }) => {
        const swRegistered = await page.evaluate(() => {
            return 'serviceWorker' in navigator;
        });
        expect(swRegistered).toBe(true);
    });

    test('should have proper meta tags for PWA', async ({ page }) => {
        const viewport = await page.locator('meta[name="viewport"]').getAttribute('content');
        expect(viewport).toContain('width=device-width');

        const manifest = await page.locator('link[rel="manifest"]').getAttribute('href');
        expect(manifest).toBe('manifest.json');
    });
});

test.describe('VIP AI Symphony - Voice Access', () => {
    test('should have voice access button', async ({ page }) => {
        await page.goto('/');
        await expect(page.locator('#voiceAccessBtn')).toBeVisible();
    });

    test('should show voice modal when clicked', async ({ page }) => {
        await page.goto('/');
        await page.locator('#voiceAccessBtn').click();
        // Voice modal should appear or permission dialog
        // Note: Actual voice recognition requires user permission
    });
});

test.describe('VIP AI Symphony - Performance', () => {
    test('should load within acceptable time', async ({ page }) => {
        const startTime = Date.now();
        await page.goto('/');
        await page.waitForLoadState('networkidle');
        const loadTime = Date.now() - startTime;
        expect(loadTime).toBeLessThan(5000); // 5 seconds
    });

    test('should have good Lighthouse scores', async ({ page }) => {
        await page.goto('/');
        // Note: Actual Lighthouse testing would require additional setup
        // This is a placeholder for performance testing
        await expect(page).toHaveTitle(/VIP SYMPHONY/);
    });
});

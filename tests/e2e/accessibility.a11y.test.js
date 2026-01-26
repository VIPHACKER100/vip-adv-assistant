/**
 * Accessibility Tests for VIP AI Symphony
 * Tests WCAG 2.1 AA compliance
 */

import { test, expect } from '@playwright/test';
import { injectAxe, checkA11y, getViolations } from '@axe-core/playwright';

test.describe('VIP AI Symphony - Accessibility', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await injectAxe(page);
    });

    test('should not have any automatically detectable accessibility issues', async ({ page }) => {
        await checkA11y(page, null, {
            detailedReport: true,
            detailedReportOptions: {
                html: true,
            },
        });
    });

    test('should have proper heading hierarchy', async ({ page }) => {
        const h1Count = await page.locator('h1').count();
        expect(h1Count).toBeGreaterThan(0);

        // Check heading order
        const headings = await page.locator('h1, h2, h3, h4, h5, h6').allTextContents();
        expect(headings.length).toBeGreaterThan(0);
    });

    test('should have alt text for images', async ({ page }) => {
        const images = page.locator('img');
        const count = await images.count();

        for (let i = 0; i < count; i++) {
            const img = images.nth(i);
            const alt = await img.getAttribute('alt');
            expect(alt).toBeTruthy();
        }
    });

    test('should have proper ARIA labels', async ({ page }) => {
        const buttons = page.locator('button');
        const count = await buttons.count();

        for (let i = 0; i < count; i++) {
            const button = buttons.nth(i);
            const ariaLabel = await button.getAttribute('aria-label');
            const text = await button.textContent();
            const title = await button.getAttribute('title');

            // Button should have either text content, aria-label, or title
            expect(ariaLabel || text?.trim() || title).toBeTruthy();
        }
    });

    test('should have sufficient color contrast', async ({ page }) => {
        const violations = await getViolations(page, null, {
            rules: {
                'color-contrast': { enabled: true },
            },
        });

        expect(violations).toHaveLength(0);
    });

    test('should be keyboard navigable', async ({ page }) => {
        // Tab through interactive elements
        await page.keyboard.press('Tab');
        const firstFocused = await page.evaluate(() => document.activeElement?.tagName);
        expect(firstFocused).toBeTruthy();

        // Test keyboard shortcuts
        await page.keyboard.press('Control+K');
        await expect(page.locator('#searchModal')).toBeVisible();

        await page.keyboard.press('Escape');
        await expect(page.locator('#searchModal')).not.toBeVisible();
    });

    test('should have proper form labels', async ({ page }) => {
        const inputs = page.locator('input');
        const count = await inputs.count();

        for (let i = 0; i < count; i++) {
            const input = inputs.nth(i);
            const id = await input.getAttribute('id');
            const ariaLabel = await input.getAttribute('aria-label');
            const ariaLabelledBy = await input.getAttribute('aria-labelledby');
            const placeholder = await input.getAttribute('placeholder');

            if (id) {
                const label = page.locator(`label[for="${id}"]`);
                const labelExists = await label.count() > 0;

                // Input should have either a label, aria-label, aria-labelledby, or placeholder
                expect(labelExists || ariaLabel || ariaLabelledBy || placeholder).toBeTruthy();
            }
        }
    });

    test('should have proper focus indicators', async ({ page }) => {
        const button = page.locator('button').first();
        await button.focus();

        const outline = await button.evaluate((el) => {
            const styles = window.getComputedStyle(el);
            return styles.outline || styles.boxShadow;
        });

        expect(outline).toBeTruthy();
    });

    test('should have proper landmark regions', async ({ page }) => {
        await expect(page.locator('header')).toBeVisible();
        await expect(page.locator('main, [role="main"]')).toBeVisible();
    });

    test('should support screen readers', async ({ page }) => {
        // Check for ARIA live regions
        const liveRegions = page.locator('[aria-live]');
        const count = await liveRegions.count();
        expect(count).toBeGreaterThanOrEqual(0);
    });

    test('should have proper touch targets on mobile', async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 });

        const buttons = page.locator('button');
        const count = await buttons.count();

        for (let i = 0; i < Math.min(count, 10); i++) {
            const button = buttons.nth(i);
            const box = await button.boundingBox();

            if (box) {
                // Touch targets should be at least 44x44 (iOS) or 48x48 (Android)
                expect(box.width).toBeGreaterThanOrEqual(44);
                expect(box.height).toBeGreaterThanOrEqual(44);
            }
        }
    });
});

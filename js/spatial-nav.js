/**
 * VIP AI SYMPHONY - Spatial Navigation Kernel
 * Intelligent keyboard focus management for TV/Game-style UI indexing
 */

class SpatialNavigator {
    constructor() {
        this.focusableSelector = 'button, a, input, select, textarea, [tabindex]:not([tabindex="-1"]), .function-card, .glass-card, .theme-preview';
        this.currentIndex = -1;
        this.init();
    }

    init() {
        document.addEventListener('keydown', (e) => this.handleKeyDown(e));
        console.log('🧭 Spatial Navigation Kernel Active');
    }

    getVisibleFocusableElements() {
        const elements = Array.from(document.querySelectorAll(this.focusableSelector));
        return elements.filter(el => {
            const style = window.getComputedStyle(el);
            return (
                style.display !== 'none' &&
                style.visibility !== 'hidden' &&
                style.opacity !== '0' &&
                el.offsetWidth > 0 &&
                el.offsetHeight > 0 &&
                !el.closest('.modal-overlay:not(.active)')
            );
        });
    }

    handleKeyDown(e) {
        // Only handle arrows if not in an input
        if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
            if (e.key === 'Escape') {
                document.activeElement.blur();
            }
            return;
        }

        const elements = this.getVisibleFocusableElements();
        if (elements.length === 0) return;

        let activeElement = document.activeElement;
        if (!elements.includes(activeElement)) {
            activeElement = null;
        }

        switch (e.key) {
            case 'ArrowRight':
            case 'ArrowDown':
                e.preventDefault();
                this.moveFocus(elements, activeElement, 1);
                break;
            case 'ArrowLeft':
            case 'ArrowUp':
                e.preventDefault();
                this.moveFocus(elements, activeElement, -1);
                break;
            case 'Enter':
                if (activeElement && !['BUTTON', 'A'].includes(activeElement.tagName)) {
                    activeElement.click();
                }
                break;
        }
    }

    moveFocus(elements, current, direction) {
        let nextIndex;
        if (!current) {
            nextIndex = 0;
        } else {
            const currIndex = elements.indexOf(current);
            nextIndex = (currIndex + direction + elements.length) % elements.length;
        }

        const nextElement = elements[nextIndex];
        if (nextElement) {
            nextElement.focus();
            nextElement.scrollIntoView({ behavior: 'smooth', block: 'center' });

            // Provide haptic feedback if available
            if (window.vipApp && window.vipApp.state.context.device.isMobile && navigator.vibrate) {
                navigator.vibrate(5);
            }
        }
    }
}

export default new SpatialNavigator();

/**
 * VIP AI SYMPHONY - Gesture Interface v7.0
 * Implementation of native-like touch gestures for mobile interactions
 */

class GestureManager {
    constructor() {
        this.startX = 0;
        this.startY = 0;
        this.currentX = 0;
        this.currentY = 0;
        this.threshold = 50; // Min distance for swipe
        this.isDragging = false;
        this.activeElement = null;
        this.originalTransition = '';

        this.init();
    }

    init() {
        document.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: false });
        document.addEventListener('touchmove', (e) => this.handleTouchMove(e), { passive: false });
        document.addEventListener('touchend', (e) => this.handleTouchEnd(e));

        console.log('👆 Gesture Interface Online');
    }

    handleTouchStart(e) {
        // Only track if touching a drawer-header or sheet-handle
        const target = e.target.closest('.drawer-header, .sheet-handle, .modal-header');
        if (!target) return;

        this.activeElement = e.target.closest('.sidebar-drawer, .bottom-sheet, .modal-overlay');
        if (!this.activeElement) return;

        this.startX = e.touches[0].clientX;
        this.startY = e.touches[0].clientY;
        this.isDragging = true;

        this.originalTransition = this.activeElement.style.transition;
        this.activeElement.style.transition = 'none';

        // Prevent default to avoid scrolling while dragging
        // e.preventDefault();
    }

    handleTouchMove(e) {
        if (!this.isDragging || !this.activeElement) return;

        this.currentX = e.touches[0].clientX;
        this.currentY = e.touches[0].clientY;

        const diffY = this.currentY - this.startY;

        // Only allow swiping down
        if (diffY > 0) {
            // Apply transform with resistance if needed, but here we just follow
            if (this.activeElement.classList.contains('sidebar-drawer')) {
                // Drawer is right-side, but maybe we want swipe-right to close?
                // Let's assume swipe-down for all for now if they have headers
                this.activeElement.style.transform = `translateY(${diffY}px)`;
            } else if (this.activeElement.classList.contains('bottom-sheet')) {
                this.activeElement.style.transform = `translateY(${diffY}px)`;
            }

            // Reduce opacity of overlay if possible
            const overlay = document.getElementById('drawerOverlay') || document.querySelector('.modal-overlay');
            if (overlay) {
                const opacity = Math.max(0, 1 - (diffY / 500));
                overlay.style.opacity = opacity;
            }
        }
    }

    handleTouchEnd() {
        if (!this.isDragging || !this.activeElement) return;

        const diffY = this.currentY - this.startY;
        this.isDragging = false;
        this.activeElement.style.transition = this.originalTransition;

        if (diffY > 150) {
            // Close it
            this.closeActive();
        } else {
            // Reset position
            this.activeElement.style.transform = '';
            const overlay = document.getElementById('drawerOverlay') || document.querySelector('.modal-overlay');
            if (overlay) overlay.style.opacity = '';
        }

        this.activeElement = null;
    }

    closeActive() {
        if (!this.activeElement) return;

        // Call existing close functions based on element
        if (this.activeElement.id === 'aiChatPanel' && window.chatManager) {
            window.chatManager.closeChat();
        } else if (this.activeElement.id === 'notificationPanel' && window.notificationManager) {
            window.notificationManager.closePanel();
        } else if (this.activeElement.classList.contains('modal-overlay')) {
            if (window.closeModal) window.closeModal();
        }

        // Reset styles after closing (or during)
        setTimeout(() => {
            if (this.activeElement) {
                this.activeElement.style.transform = '';
                const overlay = document.getElementById('drawerOverlay') || document.querySelector('.modal-overlay');
                if (overlay) overlay.style.opacity = '';
            }
        }, 300);
    }
}

const gestureManager = new GestureManager();
window.gestureManager = gestureManager;

export default gestureManager;

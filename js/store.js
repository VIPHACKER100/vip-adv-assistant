/**
 * VIP AI SYMPHONY - Reactive State Store
 * Simple implementation of a Signal-like observer pattern for centralized state management
 */

class Store {
    constructor(initialState = {}) {
        this.state = initialState;
        this.listeners = new Set();
    }

    /**
     * Get current state
     */
    get() {
        return this.state;
    }

    /**
     * Update state and notify listeners
     * @param {Object|Function} update 
     */
    set(update) {
        const nextState = typeof update === 'function' ? update(this.state) : { ...this.state, ...update };

        // Check for changes (shallow)
        const hasChanged = Object.keys(nextState).some(key => nextState[key] !== this.state[key]);

        if (hasChanged) {
            this.state = nextState;
            this.notify();
        }
    }

    /**
     * Subscribe to state changes
     * @param {Function} listener 
     * @returns {Function} unsubscribe function
     */
    subscribe(listener) {
        this.listeners.add(listener);
        return () => this.listeners.delete(listener);
    }

    /**
     * Notify all listeners
     */
    notify() {
        this.listeners.forEach(listener => listener(this.state));
    }
}

// Initial application state
const initialState = {
    theme: localStorage.getItem('vip_theme') || 'dark',
    isSidebarOpen: false,
    isNotificationPanelOpen: false,
    isChatOpen: false,
    isInitialized: false,
    context: {
        battery: null,
        network: null,
        device: {
            isMobile: false,
            type: 'Desktop',
            os: 'Windows/MacOS',
            cores: navigator.hardwareConcurrency || 8,
        },
        location: {
            city: 'Detecting...',
            lat: null,
            lon: null,
            weather: { temp: '--', desc: 'Syncing...' },
        },
    },
    aiPersona: localStorage.getItem('vip_ai_personality') || 'professional'
};

const store = new Store(initialState);

// Sync with global appState for backward compatibility
window.appStore = store;

export default store;

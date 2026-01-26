/**
 * VIP AI Symphony v6.2 - Mobile-First Platinum
 * Utility Functions & Helpers
 * Modern JavaScript utilities for performance and UX
 */

// ===== Performance Utilities =====

/**
 * Debounce function calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

/**
 * Throttle function calls
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} Throttled function
 */
export const throttle = (func, limit) => {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

/**
 * Request animation frame with fallback
 * @param {Function} callback - Animation callback
 * @returns {number} Request ID
 */
export const requestAnimFrame = (() => {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

// ===== Mobile Utilities =====

/**
 * Haptic feedback utility
 */
export const haptic = {
    light: () => {
        if ('vibrate' in navigator) {
            navigator.vibrate(10);
        }
    },
    medium: () => {
        if ('vibrate' in navigator) {
            navigator.vibrate(20);
        }
    },
    heavy: () => {
        if ('vibrate' in navigator) {
            navigator.vibrate(30);
        }
    },
    success: () => {
        if ('vibrate' in navigator) {
            navigator.vibrate([10, 50, 10]);
        }
    },
    error: () => {
        if ('vibrate' in navigator) {
            navigator.vibrate([10, 50, 10, 50, 10]);
        }
    },
    pattern: (pattern) => {
        if ('vibrate' in navigator && Array.isArray(pattern)) {
            navigator.vibrate(pattern);
        }
    }
};

/**
 * Touch handler class for swipe gestures
 */
export class TouchHandler {
    constructor(element, options = {}) {
        this.element = element;
        this.options = {
            threshold: 50,
            allowedTime: 300,
            ...options
        };

        this.startX = 0;
        this.startY = 0;
        this.startTime = 0;

        this.element.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: true });
        this.element.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: true });
        this.element.addEventListener('touchend', this.handleTouchEnd.bind(this), { passive: true });
    }

    handleTouchStart(e) {
        const touch = e.touches[0];
        this.startX = touch.clientX;
        this.startY = touch.clientY;
        this.startTime = Date.now();
    }

    handleTouchMove(e) {
        // Prevent default if needed
        if (this.options.preventDefault) {
            e.preventDefault();
        }
    }

    handleTouchEnd(e) {
        const touch = e.changedTouches[0];
        const deltaX = touch.clientX - this.startX;
        const deltaY = touch.clientY - this.startY;
        const deltaTime = Date.now() - this.startTime;

        if (deltaTime > this.options.allowedTime) {
            return;
        }

        const absX = Math.abs(deltaX);
        const absY = Math.abs(deltaY);

        if (absX > this.options.threshold || absY > this.options.threshold) {
            if (absX > absY) {
                if (deltaX > 0) {
                    this.onSwipeRight(deltaX);
                } else {
                    this.onSwipeLeft(Math.abs(deltaX));
                }
            } else {
                if (deltaY > 0) {
                    this.onSwipeDown(deltaY);
                } else {
                    this.onSwipeUp(Math.abs(deltaY));
                }
            }
        }

        this.startX = 0;
        this.startY = 0;
        this.startTime = 0;
    }

    onSwipeRight(distance) { /* Override in subclass */ }
    onSwipeLeft(distance) { /* Override in subclass */ }
    onSwipeDown(distance) { /* Override in subclass */ }
    onSwipeUp(distance) { /* Override in subclass */ }

    destroy() {
        this.element.removeEventListener('touchstart', this.handleTouchStart);
        this.element.removeEventListener('touchmove', this.handleTouchMove);
        this.element.removeEventListener('touchend', this.handleTouchEnd);
    }
}

// ===== Clipboard Utilities =====

/**
 * Copy text to clipboard
 * @param {string} text - Text to copy
 * @returns {Promise<boolean>} Success status
 */
export async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        haptic.light();
        return true;
    } catch (error) {
        console.error('Copy failed:', error);
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        const success = document.execCommand('copy');
        document.body.removeChild(textarea);
        return success;
    }
}

/**
 * Paste from clipboard
 * @returns {Promise<string|null>} Clipboard text or null
 */
export async function pasteFromClipboard() {
    try {
        const text = await navigator.clipboard.readText();
        return text;
    } catch (error) {
        console.error('Paste failed:', error);
        return null;
    }
}

// ===== Share Utilities =====

/**
 * Share content using Web Share API
 * @param {Object} data - Share data {title, text, url}
 * @returns {Promise<boolean>} Success status
 */
export async function shareContent(data) {
    if (navigator.share) {
        try {
            await navigator.share(data);
            haptic.success();
            return true;
        } catch (error) {
            if (error.name !== 'AbortError') {
                console.error('Share failed:', error);
                // Fallback to clipboard
                await copyToClipboard(data.url || data.text);
            }
            return false;
        }
    } else {
        // Fallback to clipboard
        await copyToClipboard(data.url || data.text);
        return true;
    }
}

// ===== Storage Utilities =====

/**
 * Safe localStorage wrapper
 */
export const storage = {
    get(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.error(`Error reading ${key} from localStorage:`, error);
            return defaultValue;
        }
    },

    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error(`Error writing ${key} to localStorage:`, error);
            return false;
        }
    },

    remove(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error(`Error removing ${key} from localStorage:`, error);
            return false;
        }
    },

    clear() {
        try {
            localStorage.clear();
            return true;
        } catch (error) {
            console.error('Error clearing localStorage:', error);
            return false;
        }
    }
};

// ===== DOM Utilities =====

/**
 * Query selector with error handling
 * @param {string} selector - CSS selector
 * @param {Element} parent - Parent element (default: document)
 * @returns {Element|null} Found element or null
 */
export function $(selector, parent = document) {
    try {
        return parent.querySelector(selector);
    } catch (error) {
        console.error(`Invalid selector: ${selector}`, error);
        return null;
    }
}

/**
 * Query selector all with error handling
 * @param {string} selector - CSS selector
 * @param {Element} parent - Parent element (default: document)
 * @returns {NodeList} Found elements
 */
export function $$(selector, parent = document) {
    try {
        return parent.querySelectorAll(selector);
    } catch (error) {
        console.error(`Invalid selector: ${selector}`, error);
        return [];
    }
}

/**
 * Create element with attributes
 * @param {string} tag - HTML tag name
 * @param {Object} attrs - Attributes object
 * @param {string} content - Inner HTML content
 * @returns {Element} Created element
 */
export function createElement(tag, attrs = {}, content = '') {
    const element = document.createElement(tag);

    Object.entries(attrs).forEach(([key, value]) => {
        if (key === 'class') {
            element.className = value;
        } else if (key === 'style' && typeof value === 'object') {
            Object.assign(element.style, value);
        } else if (key.startsWith('data-')) {
            element.dataset[key.slice(5)] = value;
        } else {
            element.setAttribute(key, value);
        }
    });

    if (content) {
        element.innerHTML = content;
    }

    return element;
}

// ===== Validation Utilities =====

/**
 * Check if value is empty
 * @param {*} value - Value to check
 * @returns {boolean} Is empty
 */
export function isEmpty(value) {
    if (value === null || value === undefined) return true;
    if (typeof value === 'string') return value.trim() === '';
    if (Array.isArray(value)) return value.length === 0;
    if (typeof value === 'object') return Object.keys(value).length === 0;
    return false;
}

/**
 * Validate email address
 * @param {string} email - Email to validate
 * @returns {boolean} Is valid
 */
export function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

/**
 * Validate URL
 * @param {string} url - URL to validate
 * @returns {boolean} Is valid
 */
export function isValidURL(url) {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

// ===== Format Utilities =====

/**
 * Format number with commas
 * @param {number} num - Number to format
 * @returns {string} Formatted number
 */
export function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Format bytes to human readable
 * @param {number} bytes - Bytes to format
 * @param {number} decimals - Decimal places
 * @returns {string} Formatted bytes
 */
export function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

/**
 * Format time ago
 * @param {number} timestamp - Unix timestamp
 * @returns {string} Time ago string
 */
export function timeAgo(timestamp) {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);

    const intervals = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60,
        second: 1
    };

    for (const [name, value] of Object.entries(intervals)) {
        const interval = Math.floor(seconds / value);
        if (interval >= 1) {
            return interval === 1 ? `1 ${name} ago` : `${interval} ${name}s ago`;
        }
    }

    return 'just now';
}

// ===== Device Detection =====

/**
 * Detect mobile device
 * @returns {boolean} Is mobile
 */
export function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

/**
 * Detect iOS device
 * @returns {boolean} Is iOS
 */
export function isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
}

/**
 * Detect Android device
 * @returns {boolean} Is Android
 */
export function isAndroid() {
    return /Android/.test(navigator.userAgent);
}

/**
 * Detect touch support
 * @returns {boolean} Has touch
 */
export function hasTouch() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

// ===== Error Handling =====

/**
 * Safe function execution with error handling
 * @param {Function} func - Function to execute
 * @param {*} fallback - Fallback value on error
 * @returns {*} Function result or fallback
 */
export async function tryCatch(func, fallback = null) {
    try {
        return await func();
    } catch (error) {
        console.error('Error in tryCatch:', error);
        return fallback;
    }
}

/**
 * Retry function with exponential backoff
 * @param {Function} func - Async function to retry
 * @param {number} maxRetries - Maximum retry attempts
 * @param {number} delay - Initial delay in ms
 * @returns {Promise<*>} Function result
 */
export async function retry(func, maxRetries = 3, delay = 1000) {
    for (let i = 0; i < maxRetries; i++) {
        try {
            return await func();
        } catch (error) {
            if (i === maxRetries - 1) throw error;
            await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
        }
    }
}

// ===== Performance Monitoring =====

/**
 * Measure function execution time
 * @param {Function} func - Function to measure
 * @param {string} label - Label for logging
 * @returns {Function} Wrapped function
 */
export function measurePerformance(func, label) {
    return async function (...args) {
        const start = performance.now();
        const result = await func.apply(this, args);
        const end = performance.now();
        console.log(`⏱️ ${label}: ${(end - start).toFixed(2)}ms`);
        return result;
    };
}

// ===== Export all utilities =====
export default {
    debounce,
    throttle,
    requestAnimFrame,
    haptic,
    TouchHandler,
    copyToClipboard,
    pasteFromClipboard,
    shareContent,
    storage,
    $,
    $$,
    createElement,
    isEmpty,
    isValidEmail,
    isValidURL,
    formatNumber,
    formatBytes,
    timeAgo,
    isMobile,
    isIOS,
    isAndroid,
    hasTouch,
    tryCatch,
    retry,
    measurePerformance
};

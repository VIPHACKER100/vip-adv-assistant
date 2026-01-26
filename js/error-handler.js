/**
 * Centralized Error Handler
 * Provides error tracking, logging, and user feedback
 */

import * as Sentry from '@sentry/browser';

class ErrorHandler {
    constructor() {
        this.initialized = false;
        this.errorQueue = [];
        this.maxQueueSize = 100;
    }

    /**
     * Initialize error tracking
     */
    init() {
        if (this.initialized) {
            return;
        }

        // Initialize Sentry if DSN is provided
        const sentryDSN = import.meta.env.VITE_SENTRY_DSN;
        if (sentryDSN) {
            Sentry.init({
                dsn: sentryDSN,
                environment: import.meta.env.MODE,
                release: `vip-ai-symphony@${import.meta.env.VITE_APP_VERSION}`,
                integrations: [
                    new Sentry.BrowserTracing(),
                    new Sentry.Replay({
                        maskAllText: true,
                        blockAllMedia: true,
                    }),
                ],
                tracesSampleRate: 0.1,
                replaysSessionSampleRate: 0.1,
                replaysOnErrorSampleRate: 1.0,
            });
        }

        // Global error handler
        window.addEventListener('error', (event) => {
            this.handleError(event.error, {
                type: 'uncaught',
                message: event.message,
                filename: event.filename,
                lineno: event.lineno,
                colno: event.colno,
            });
        });

        // Unhandled promise rejection handler
        window.addEventListener('unhandledrejection', (event) => {
            this.handleError(event.reason, {
                type: 'unhandled-promise',
                promise: event.promise,
            });
        });

        this.initialized = true;
        console.info('✅ Error Handler initialized');
    }

    /**
     * Handle an error
     * @param {Error} error - The error object
     * @param {Object} context - Additional context
     */
    handleError(error, context = {}) {
        const errorInfo = {
            message: error?.message || 'Unknown error',
            stack: error?.stack,
            timestamp: new Date().toISOString(),
            context,
            userAgent: navigator.userAgent,
            url: window.location.href,
        };

        // Add to queue
        this.addToQueue(errorInfo);

        // Log to console in development
        if (import.meta.env.DEV) {
            console.error('Error caught:', errorInfo);
        }

        // Send to Sentry
        if (Sentry.isInitialized()) {
            Sentry.captureException(error, {
                contexts: { custom: context },
            });
        }

        // Show user-friendly message
        this.showErrorToUser(error, context);

        // Store in localStorage for debugging
        this.persistError(errorInfo);
    }

    /**
     * Add error to queue
     */
    addToQueue(errorInfo) {
        this.errorQueue.push(errorInfo);
        if (this.errorQueue.length > this.maxQueueSize) {
            this.errorQueue.shift();
        }
    }

    /**
     * Show error to user
     */
    showErrorToUser(error, context) {
        const isCritical = context.type === 'uncaught' || context.critical;
        const message = isCritical
            ? 'An unexpected error occurred. Please refresh the page.'
            : error?.message || 'Something went wrong. Please try again.';

        if (window.showToast) {
            window.showToast('Error', message, 'error');
        } else {
            console.error(message);
        }
    }

    /**
     * Persist error to localStorage
     */
    persistError(errorInfo) {
        try {
            const errors = JSON.parse(localStorage.getItem('error_log') || '[]');
            errors.push(errorInfo);

            // Keep only last 50 errors
            if (errors.length > 50) {
                errors.shift();
            }

            localStorage.setItem('error_log', JSON.stringify(errors));
        } catch (e) {
            console.warn('Failed to persist error:', e);
        }
    }

    /**
     * Get error log
     */
    getErrorLog() {
        try {
            return JSON.parse(localStorage.getItem('error_log') || '[]');
        } catch (e) {
            return [];
        }
    }

    /**
     * Clear error log
     */
    clearErrorLog() {
        localStorage.removeItem('error_log');
        this.errorQueue = [];
    }

    /**
     * Log a warning
     */
    warn(message, context = {}) {
        console.warn(message, context);

        if (Sentry.isInitialized()) {
            Sentry.captureMessage(message, {
                level: 'warning',
                contexts: { custom: context },
            });
        }
    }

    /**
     * Log info
     */
    info(message, context = {}) {
        console.info(message, context);
    }

    /**
     * Set user context
     */
    setUser(user) {
        if (Sentry.isInitialized()) {
            Sentry.setUser(user);
        }
    }

    /**
     * Add breadcrumb
     */
    addBreadcrumb(message, category = 'default', level = 'info') {
        if (Sentry.isInitialized()) {
            Sentry.addBreadcrumb({
                message,
                category,
                level,
                timestamp: Date.now() / 1000,
            });
        }
    }
}

// Create singleton instance
const errorHandler = new ErrorHandler();

// Auto-initialize
if (typeof window !== 'undefined') {
    errorHandler.init();
}

export default errorHandler;

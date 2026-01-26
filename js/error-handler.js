/**
 * VIP AI Assistant - Error Management System
 */

const errorHandler = {
    /**
     * Handle an error with context
     */
    handleError(error, context = {}) {
        console.error('VIP_KERNEL_ERROR:', error);
        console.error('CONTEXT:', context);

        if (window.showToast) {
            window.showToast(
                'Kernel Error',
                `An error occurred in ${context.context || 'subsystem'}. Check logs.`,
                'error'
            );
        }

        // Send telemetry if available
        if (window.performanceMonitor) {
            // performanceMonitor.trackError(error, context);
        }

        return {
            success: false,
            error: error.message,
            context
        };
    },

    /**
     * Safe execution wrapper
     */
    async safeExecute(fn, context = {}) {
        try {
            return await fn();
        } catch (error) {
            return this.handleError(error, context);
        }
    }
};

export default errorHandler;

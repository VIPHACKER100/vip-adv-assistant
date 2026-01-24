/**
 * Performance Monitor
 * Real-time performance metrics and analytics
 */

const performanceMonitor = {
    metrics: {
        pageLoadTime: 0,
        functionsExecuted: 0,
        searchesPerformed: 0,
        voiceCommandsUsed: 0,
        favoritesClicked: 0,
        themeChanges: 0,
        sessionStart: Date.now(),
        lastActivity: Date.now()
    },

    init() {
        // Measure page load time
        if (window.performance) {
            window.addEventListener('load', () => {
                const perfData = performance.timing;
                this.metrics.pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            });
        }

        // Track user activity
        document.addEventListener('click', () => {
            this.metrics.lastActivity = Date.now();
        });

        // Load saved metrics
        const saved = localStorage.getItem('performanceMetrics');
        if (saved) {
            const savedMetrics = JSON.parse(saved);
            this.metrics = { ...this.metrics, ...savedMetrics };
        }

        // Auto-save metrics every 30 seconds
        setInterval(() => this.saveMetrics(), 30000);
    },

    trackFunction(functionId) {
        this.metrics.functionsExecuted++;
        this.saveMetrics();
    },

    trackSearch() {
        this.metrics.searchesPerformed++;
        this.saveMetrics();
    },

    trackVoiceCommand() {
        this.metrics.voiceCommandsUsed++;
        this.saveMetrics();
    },

    trackFavorite() {
        this.metrics.favoritesClicked++;
        this.saveMetrics();
    },

    trackThemeChange() {
        this.metrics.themeChanges++;
        this.saveMetrics();
    },

    saveMetrics() {
        localStorage.setItem('performanceMetrics', JSON.stringify(this.metrics));
    },

    getSessionDuration() {
        return Math.floor((Date.now() - this.metrics.sessionStart) / 1000); // seconds
    },

    showDashboard() {
        const modalContainer = document.getElementById('modalContainer');
        if (!modalContainer) return;

        const sessionDuration = this.getSessionDuration();
        const minutes = Math.floor(sessionDuration / 60);
        const seconds = sessionDuration % 60;

        // Calculate browser performance
        const memory = performance.memory ?
            `${(performance.memory.usedJSHeapSize / 1048576).toFixed(2)} MB` :
            'N/A';

        modalContainer.innerHTML = `
      <div class="modal-overlay active" onclick="closeModal(event)">
        <div class="modal" onclick="event.stopPropagation()" style="max-width: 800px;">
          <div class="modal-header">
            <h2 class="modal-title">📊 Performance Dashboard</h2>
            <button class="modal-close" onclick="closeModal()">&times;</button>
          </div>
          <div class="modal-body">
            <!-- Session Stats -->
            <div class="glass-card" style="margin-bottom: var(--space-4);">
              <h4 style="margin-bottom: var(--space-3); color: var(--text-primary);">Current Session</h4>
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: var(--space-3);">
                <div style="text-align: center; padding: var(--space-3); background: var(--bg-tertiary); border-radius: var(--radius-lg);">
                  <div style="font-size: var(--font-size-2xl); font-weight: bold; color: var(--color-accent-400);">
                    ${minutes}:${seconds.toString().padStart(2, '0')}
                  </div>
                  <div style="font-size: var(--font-size-xs); color: var(--text-tertiary); margin-top: var(--space-1);">
                    Session Duration
                  </div>
                </div>
                <div style="text-align: center; padding: var(--space-3); background: var(--bg-tertiary); border-radius: var(--radius-lg);">
                  <div style="font-size: var(--font-size-2xl); font-weight: bold; color: var(--color-success-400);">
                    ${this.metrics.functionsExecuted}
                  </div>
                  <div style="font-size: var(--font-size-xs); color: var(--text-tertiary); margin-top: var(--space-1);">
                    Functions Executed
                  </div>
                </div>
                <div style="text-align: center; padding: var(--space-3); background: var(--bg-tertiary); border-radius: var(--radius-lg);">
                  <div style="font-size: var(--font-size-2xl); font-weight: bold; color: var(--color-primary-400);">
                    ${this.metrics.searchesPerformed}
                  </div>
                  <div style="font-size: var(--font-size-xs); color: var(--text-tertiary); margin-top: var(--space-1);">
                    Searches
                  </div>
                </div>
                <div style="text-align: center; padding: var(--space-3); background: var(--bg-tertiary); border-radius: var(--radius-lg);">
                  <div style="font-size: var(--font-size-2xl); font-weight: bold; color: var(--color-warning-400);">
                    ${this.metrics.voiceCommandsUsed}
                  </div>
                  <div style="font-size: var(--font-size-xs); color: var(--text-tertiary); margin-top: var(--space-1);">
                    Voice Commands
                  </div>
                </div>
              </div>
            </div>

            <!-- Browser Performance -->
            <div class="glass-card" style="margin-bottom: var(--space-4);">
              <h4 style="margin-bottom: var(--space-3); color: var(--text-primary);">Browser Performance</h4>
              <div style="display: grid; gap: var(--space-2);">
                <div style="display: flex; justify-content: space-between; padding: var(--space-2); background: var(--bg-tertiary); border-radius: var(--radius-md);">
                  <span>Page Load Time</span>
                  <span style="font-weight: bold;">${this.metrics.pageLoadTime}ms</span>
                </div>
                <div style="display: flex; justify-content: space-between; padding: var(--space-2); background: var(--bg-tertiary); border-radius: var(--radius-md);">
                  <span>Memory Usage</span>
                  <span style="font-weight: bold;">${memory}</span>
                </div>
                <div style="display: flex; justify-content: space-between; padding: var(--space-2); background: var(--bg-tertiary); border-radius: var(--radius-md);">
                  <span>Browser</span>
                  <span style="font-weight: bold;">${this.getBrowserName()}</span>
                </div>
              </div>
            </div>

            <!-- Usage Stats -->
            <div class="glass-card">
              <h4 style="margin-bottom: var(--space-3); color: var(--text-primary);">All-Time Usage</h4>
              <div style="display: grid; gap: var(--space-2);">
                <div style="display: flex; justify-content: space-between; padding: var(--space-2); background: var(--bg-tertiary); border-radius: var(--radius-md);">
                  <span>⭐ Favorites Clicked</span>
                  <span style="font-weight: bold;">${this.metrics.favoritesClicked}</span>
                </div>
                <div style="display: flex; justify-content: space-between; padding: var(--space-2); background: var(--bg-tertiary); border-radius: var(--radius-md);">
                  <span>🎨 Theme Changes</span>
                  <span style="font-weight: bold;">${this.metrics.themeChanges}</span>
                </div>
              </div>
            </div>

            <div style="margin-top: var(--space-4); padding: var(--space-3); background: var(--bg-secondary); border-radius: var(--radius-lg); border-left: 4px solid var(--color-accent-500);">
              <strong style="color: var(--text-primary);">💡 Performance Tips</strong>
              <ul style="margin-top: var(--space-2); color: var(--text-secondary); font-size: var(--font-size-sm); padding-left: var(--space-5);">
                <li>Use keyboard shortcuts for faster navigation</li>
                <li>Add frequently used functions to favorites</li>
                <li>Clear browser cache if app feels slow</li>
              </ul>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-glass" onclick="performanceMonitor.resetMetrics()">Reset Stats</button>
            <button class="btn btn-primary" onclick="closeModal()">Close</button>
          </div>
        </div>
      </div>
    `;
    },

    getBrowserName() {
        const ua = navigator.userAgent;
        if (ua.includes('Chrome')) return 'Chrome';
        if (ua.includes('Firefox')) return 'Firefox';
        if (ua.includes('Safari')) return 'Safari';
        if (ua.includes('Edge')) return 'Edge';
        return 'Unknown';
    },

    resetMetrics() {
        if (confirm('Reset all performance statistics?')) {
            this.metrics = {
                pageLoadTime: this.metrics.pageLoadTime,
                functionsExecuted: 0,
                searchesPerformed: 0,
                voiceCommandsUsed: 0,
                favoritesClicked: 0,
                themeChanges: 0,
                sessionStart: Date.now(),
                lastActivity: Date.now()
            };
            this.saveMetrics();
            showToast('Stats Reset', 'Performance statistics cleared', 'success');
            this.showDashboard();
        }
    }
};

// Export for global access
window.performanceMonitor = performanceMonitor;

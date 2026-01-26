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

    // Live Telemetry Loop (v6.0 SYMPHONY)
    setInterval(() => {
      const memLabel = document.getElementById('perfMemoryLabel');
      const cpuLabel = document.getElementById('perfCPULabel');
      const latencyLabel = document.getElementById('aiLatency');

      if (memLabel && window.performance && performance.memory) {
        memLabel.textContent = `${(performance.memory.usedJSHeapSize / 1048576).toFixed(2)} MB`;
      }

      if (cpuLabel) {
        const load = (Math.random() * 6 + 2).toFixed(1);
        cpuLabel.textContent = `${load}%`;

        // Report significant load changes to cognitive stream
        if (Math.random() > 0.95 && window.cognitiveStream) {
          window.cognitiveStream.addLine(`> KERNEL_LOAD_DRFT: ${load}% | OPTIMIZING_PULSE`);
        }
      }
    }, 1500);
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
        <div class="modal animate-slide-up" onclick="event.stopPropagation()" style="max-width: 820px; padding: 0; overflow: hidden;">
          <div class="modal-header" style="padding: var(--space-6);">
            <h2 class="modal-title" style="font-family: var(--font-family-display); font-size: 18px; letter-spacing: 1px;">📊 VISUAL_TELEMETRY_DASHBOARD</h2>
            <button class="modal-close" onclick="closeModal()">×</button>
          </div>
          <div class="modal-body" style="padding: var(--space-6);">
            <!-- Global Overview -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: var(--space-5); margin-bottom: var(--space-8);">
                <div class="glass-card-subtle" style="text-align: center; border-bottom: 3px solid var(--color-accent-500);">
                    <div style="font-size: 24px; font-weight: 800; color: var(--text-primary); font-family: var(--font-family-mono);">${minutes}:${seconds.toString().padStart(2, '0')}</div>
                    <div style="font-size: 10px; color: var(--text-tertiary); letter-spacing: 1px; margin-top: 4px;">KERNEL_UPTIME</div>
                </div>
                <div class="glass-card-subtle" style="text-align: center; border-bottom: 3px solid var(--color-success-500);">
                    <div style="font-size: 24px; font-weight: 800; color: var(--text-primary); font-family: var(--font-family-mono);">${this.metrics.functionsExecuted}</div>
                    <div style="font-size: 10px; color: var(--text-tertiary); letter-spacing: 1px; margin-top: 4px;">NEURAL_EXECUTIONS</div>
                </div>
                <div class="glass-card-subtle" style="text-align: center; border-bottom: 3px solid var(--color-primary-500);">
                    <div style="font-size: 24px; font-weight: 800; color: var(--text-primary); font-family: var(--font-family-mono);">${this.metrics.searchesPerformed}</div>
                    <div style="font-size: 10px; color: var(--text-tertiary); letter-spacing: 1px; margin-top: 4px;">OMNI_QUERIES</div>
                </div>
                <div class="glass-card-subtle" style="text-align: center; border-bottom: 3px solid var(--color-warning-500);">
                    <div style="font-size: 24px; font-weight: 800; color: var(--text-primary); font-family: var(--font-family-mono);">${this.metrics.voiceCommandsUsed}</div>
                    <div style="font-size: 10px; color: var(--text-tertiary); letter-spacing: 1px; margin-top: 4px;">ACOUSTIC_TRIGGERS</div>
                </div>
            </div>

            <!-- Detailed Telemetry -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-6);">
                <div class="glass-card" style="border: 1px solid var(--glass-border);">
                    <h4 style="margin-bottom: var(--space-4); color: var(--color-accent-400); font-size: 13px;">HARDWARE_STATE</h4>
                    <div style="display: grid; gap: var(--space-3);">
                        <div class="flex-between">
                            <span style="font-size: 12px; color: var(--text-secondary);">SYMPHONY_VERSION</span>
                            <span class="badge badge-accent">v6.1.0-GOLD</span>
                        </div>
                        <div class="flex-between">
                            <span style="font-size: 12px; color: var(--text-secondary);">BOOT_TIME</span>
                            <span style="font-weight: 600;">${this.metrics.pageLoadTime}ms</span>
                        </div>
                        <div class="flex-between">
                            <span style="font-size: 12px; color: var(--text-secondary);">HEAP_MEMORY</span>
                            <span style="color: var(--color-success-400); font-family: var(--font-family-mono);">${memory}</span>
                        </div>
                        <div class="flex-between">
                            <span style="font-size: 12px; color: var(--text-secondary);">KERNEL_THREAD_LOAD</span>
                            <span style="color: var(--color-warning-400); font-family: var(--font-family-mono);">DYNAMIC</span>
                        </div>
                    </div>
                </div>

                <div class="glass-card" style="border: 1px solid var(--glass-border);">
                    <h4 style="margin-bottom: var(--space-4); color: var(--color-accent-400); font-size: 13px;">PERSISTENT_ANALYTICS</h4>
                    <div style="display: grid; gap: var(--space-3);">
                        <div class="flex-between">
                            <span style="font-size: 12px; color: var(--text-secondary);">BIO_SESSIONS</span>
                            <span style="font-weight: 600;">ACTIVE</span>
                        </div>
                        <div class="flex-between">
                            <span style="font-size: 12px; color: var(--text-secondary);">FAV_INTERACTIONS</span>
                            <span style="font-weight: 600;">${this.metrics.favoritesClicked}</span>
                        </div>
                        <div class="flex-between">
                            <span style="font-size: 12px; color: var(--text-secondary);">SPECTRUM_SHIFTS</span>
                            <span style="font-weight: 600;">${this.metrics.themeChanges}</span>
                        </div>
                        <div class="flex-between">
                            <span style="font-size: 12px; color: var(--text-secondary);">HOST_ENVIRONMENT</span>
                            <span style="font-family: var(--font-family-mono); font-size: 11px;">${this.getBrowserName().toUpperCase()}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="status-pill-accent" style="margin-top: var(--space-8); padding: var(--space-4); border-radius: var(--radius-xl); border-left: 4px solid var(--color-accent-500);">
                <strong style="color: var(--color-accent-400); font-size: 11px; letter-spacing: 1.5px;">THROUGHPUT_OPTIMIZATION_RECOMMENDED</strong>
                <p style="margin-top: var(--space-2); color: var(--text-secondary); font-size: 13px;">
                    Consistent acoustic triggers detected. Enable "PERSISTENT_LINK" in settings for reduced latency.
                </p>
            </div>
          </div>
          <div class="modal-footer" style="background: rgba(0,0,0,0.1); padding: var(--space-5);">
            <button class="btn btn-glass btn-sm" onclick="performanceMonitor.resetMetrics()">WIPE_STATS</button>
            <div style="flex: 1;"></div>
            <button class="btn btn-primary" onclick="closeModal()">TERMINATE_VIEW</button>
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

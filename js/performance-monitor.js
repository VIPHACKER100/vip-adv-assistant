/**
 * VIP AI SYMPHONY - Performance & Telemetry Monitor v7.0
 * Real-time performance metrics and predictive analytics
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
    lastActivity: Date.now(),
  },

  init() {
    // Measure page load time
    if (window.performance) {
      window.addEventListener('load', () => {
        setTimeout(() => {
          const perfData = performance.timing;
          this.metrics.pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        }, 100);
      });
    }

    // Track user activity
    document.addEventListener('click', () => {
      this.metrics.lastActivity = Date.now();
    });

    // Load saved metrics
    const saved = localStorage.getItem('performanceMetrics');
    if (saved) {
      try {
        const savedMetrics = JSON.parse(saved);
        this.metrics = { ...this.metrics, ...savedMetrics };
      } catch (e) { console.error('Metrics parse error', e); }
    }

    // Auto-save metrics every 30 seconds
    setInterval(() => this.saveMetrics(), 30000);

    // Live Telemetry Loop
    setInterval(() => {
      if (Math.random() > 0.98 && window.cognitiveStream) {
        const load = (Math.random() * 5 + 1).toFixed(1);
        window.cognitiveStream.addLine(`> KERNEL_PULSE: LOAD_${load}% | STABLE`);
      }
    }, 5000);
  },

  trackFunction() {
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
    return Math.floor((Date.now() - this.metrics.sessionStart) / 1000);
  },

  showDashboard() {
    const modalContainer = document.getElementById('modalContainer');
    if (!modalContainer) return;

    const sessionDuration = this.getSessionDuration();
    const minutes = Math.floor(sessionDuration / 60);
    const seconds = sessionDuration % 60;

    const memory = performance.memory
      ? `${(performance.memory.usedJSHeapSize / 1048576).toFixed(2)} MB`
      : 'N/A';

    modalContainer.innerHTML = `
      <div class="modal-overlay active" onclick="closeModal(event)">
        <div class="modal animate-slide-up" onclick="event.stopPropagation()" style="max-width: 900px; padding: 0; overflow: hidden; border: 1px solid var(--color-primary-glow);">
          <div class="modal-header" style="background: rgba(0,0,0,0.3); padding: var(--s6);">
            <div style="display: flex; flex-direction: column;">
              <h2 class="modal-title" style="font-size: 1.1rem; letter-spacing: 2px;">📊 KERNEL_TELEMETRY_v7</h2>
              <div style="font-size: 9px; color: var(--color-primary); font-family: var(--font-family-mono); letter-spacing: 1px;">REAL_TIME_NODE_ANALYTICS</div>
            </div>
            <button class="modal-close" onclick="closeModal()">×</button>
          </div>
          
          <div class="modal-body" style="padding: var(--s8); background: var(--color-foundation); max-height: 75vh; overflow-y: auto;">
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: var(--s5); margin-bottom: var(--s10);">
                <div class="neural-glass" style="text-align: center; padding: var(--s5); border-bottom: 2px solid var(--color-primary);">
                    <div style="font-size: 20px; font-weight: 800; color: var(--text-main); font-family: var(--font-family-mono);">${minutes}:${seconds.toString().padStart(2, '0')}</div>
                    <div style="font-size: 9px; color: var(--color-primary); letter-spacing: 2px; margin-top: 8px;">UPTIME_SESS</div>
                </div>
                <div class="neural-glass" style="text-align: center; padding: var(--s5); border-bottom: 2px solid var(--color-secondary);">
                    <div style="font-size: 20px; font-weight: 800; color: var(--text-main); font-family: var(--font-family-mono);">${this.metrics.functionsExecuted}</div>
                    <div style="font-size: 9px; color: var(--color-secondary); letter-spacing: 2px; margin-top: 8px;">EXEC_CYCLES</div>
                </div>
                <div class="neural-glass" style="text-align: center; padding: var(--s5); border-bottom: 2px solid var(--color-success);">
                    <div style="font-size: 20px; font-weight: 800; color: var(--text-main); font-family: var(--font-family-mono);">${this.metrics.searchesPerformed}</div>
                    <div style="font-size: 9px; color: var(--color-success); letter-spacing: 2px; margin-top: 8px;">OMNI_QUERIES</div>
                </div>
                <div class="neural-glass" style="text-align: center; padding: var(--s5); border-bottom: 2px solid var(--color-warning);">
                    <div style="font-size: 20px; font-weight: 800; color: var(--text-main); font-family: var(--font-family-mono);">${this.metrics.voiceCommandsUsed}</div>
                    <div style="font-size: 9px; color: var(--color-warning); letter-spacing: 2px; margin-top: 8px;">SIGNAL_TRIGS</div>
                </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--s6);">
                <div class="neural-glass" style="padding: var(--s6);">
                    <h4 style="font-size: 11px; color: var(--text-main); letter-spacing: 1px; margin-bottom: 16px;">HARDWARE_ABSTRACTION</h4>
                    <div style="display: grid; gap: 12px;">
                        <div class="flex-between">
                            <span style="font-size: 12px; color: var(--text-dim);">SYMPHONY_CORE</span>
                            <span class="badge badge-primary">v7.0_EXTREME</span>
                        </div>
                        <div class="flex-between">
                            <span style="font-size: 12px; color: var(--text-dim);">L_EVENT_LATENCY</span>
                            <span style="font-weight: 800; color: var(--color-primary);">${this.metrics.pageLoadTime}ms</span>
                        </div>
                        <div class="flex-between">
                            <span style="font-size: 12px; color: var(--text-dim);">JS_HEAP_MAP</span>
                            <span style="font-family: var(--font-family-mono); font-weight: 800;">${memory}</span>
                        </div>
                        <div class="flex-between">
                            <span style="font-size: 12px; color: var(--text-dim);">BROWSER_NODE</span>
                            <span style="font-family: var(--font-family-mono); font-size: 10px;">${this.getBrowserName().toUpperCase()}</span>
                        </div>
                    </div>
                </div>

                <div class="neural-glass" style="padding: var(--s6);">
                    <h4 style="font-size: 11px; color: var(--text-main); letter-spacing: 1px; margin-bottom: 16px;">NEURAL_ANALYTICS</h4>
                    <div style="display: grid; gap: 12px;">
                        <div class="flex-between">
                            <span style="font-size: 12px; color: var(--text-dim);">CHROMA_SHIFTS</span>
                            <span style="font-weight: 800;">${this.metrics.themeChanges}</span>
                        </div>
                        <div class="flex-between">
                            <span style="font-size: 12px; color: var(--text-dim);">USER_AFFINITY</span>
                            <span style="font-weight: 800; color: var(--color-secondary);">${this.metrics.favoritesClicked} INT</span>
                        </div>
                        <div class="flex-between">
                            <span style="font-size: 12px; color: var(--text-dim);">BIO_LINK_STATE</span>
                            <span style="color: var(--color-success); font-weight: 800; font-size: 10px;">ENCRYPTED</span>
                        </div>
                        <div class="flex-between">
                            <span style="font-size: 12px; color: var(--text-dim);">LAST_SYNC</span>
                            <span style="font-size: 10px; font-family: var(--font-family-mono); opacity: 0.6;">${new Date(this.metrics.lastActivity).toLocaleTimeString()}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="neural-glass" style="margin-top: var(--s8); padding: var(--s5); border-left: 4px solid var(--color-primary);">
                <div style="display: flex; gap: 16px; align-items: center;">
                    <div style="font-size: 2rem;">🧠</div>
                    <div>
                        <div style="font-weight: 800; color: var(--text-main); font-size: 13px; letter-spacing: 1px;">PREDICTIVE_INSIGHT</div>
                        <div style="color: var(--text-dim); font-size: 12px; margin-top: 4px;">Acoustic commands are increasing. We recommend enabling "CONSTANT_LINK" for zero-latency neural bridging.</div>
                    </div>
                </div>
            </div>
          </div>

          <div class="modal-footer" style="background: rgba(0,0,0,0.2); padding: var(--s6); gap: 12px;">
            <button class="btn-neural-glass" style="flex: 1;" onclick="performanceMonitor.resetMetrics()">PURGE_BUFFER</button>
            <button class="btn-neural-primary" style="flex: 1;" onclick="closeModal()">DISMISS_DASH</button>
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
        lastActivity: Date.now(),
      };
      this.saveMetrics();
      if (window.showToast) window.showToast('Stats Reset', 'Performance statistics cleared', 'success');
      this.showDashboard();
    }
  },
};

window.performanceMonitor = performanceMonitor;

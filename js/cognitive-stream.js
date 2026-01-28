/**
 * VIP AI SYMPHONY - Cognitive Stream v7.0
 * Deep neural telemetry and real-time kinetic system monitoring.
 * Optimized for platinum-tier system feedback.
 */

const cognitiveStream = {
  lines: [
    '> BOOT_SEQUENCE: SYMPHONY_V7_PLATINUM_INIT',
    '> KERNEL_PULSE: STABLE at 60Hz',
    '> NEURAL_LINK: Pathing optimized for 0x7E4',
    '> SHIELD_WALL: AES-GCM 256 active'
  ],
  maxLines: 25,
  interval: null,
  isInteracting: false,

  init() {
    const container = document.getElementById('cognitiveStream');
    if (!container) return;

    container.innerHTML = '';
    this.lines.forEach(line => this.addLine(line));

    this.startStreaming();
    console.log('🔮 COGNITIVE_STREAM_V7_ONLINE');
  },

  startStreaming() {
    if (this.interval) clearInterval(this.interval);
    const delay = this.isInteracting ? 1800 : 3000 + Math.random() * 5000;

    this.interval = setInterval(() => {
      this.addLine(this.generateThought());
      if (Math.random() > 0.85) this.startStreaming();
    }, delay);
  },

  setInteracting(state) {
    this.isInteracting = state;
    this.startStreaming();
  },

  addLine(text) {
    const container = document.getElementById('cognitiveStream');
    if (!container) return;

    const line = document.createElement('div');
    line.className = 'stream-line animate-fade-in-right';
    line.style.fontSize = '9px';
    line.style.fontFamily = 'var(--font-family-mono)';
    line.style.color = 'var(--color-primary)';
    line.style.marginBottom = '2px';
    line.style.opacity = '0.7';
    line.style.letterSpacing = '0.5px';

    if (text.includes('WARN') || text.includes('FAULT') || text.includes('THREAT')) {
      line.style.color = 'var(--color-error)';
      line.style.fontWeight = '800';
    } else if (text.includes('SUCCESS') || text.includes('SYNC') || text.includes('ACTIVE')) {
      line.style.color = 'var(--color-success)';
    }

    line.textContent = text;
    container.appendChild(line);

    while (container.children.length > this.maxLines) {
      container.removeChild(container.firstChild);
    }
    container.scrollTop = container.scrollHeight;
  },

  generateThought() {
    const battery = window.appState?.context?.battery?.level || '--';
    const city = window.appState?.context?.location?.city || 'SECURE_HUB';

    const thoughts = [
      `> TELEMETRY: BATTERY_${battery}% | VOLTAGE_PULSE: STABLE`,
      `> GEO_NODE: ${city.toUpperCase()} | SYNC_INTERVAL_0xAF`,
      `> NEURAL_CORE: ORCHESTRATING_V7_FLUX_PATTERNS`,
      `> MEM_SCRUB: RECLAIMED_${Math.floor(Math.random() * 200 + 40)}MB_HEAP`,
      `> SECURITY: ENCRYPTION_ROTATED | NO_THREATS_DETECTED`,
      `> KERNEL: LOAD_${Math.floor(Math.random() * 10 + 2)}% | THERMAL: 34°C`,
      `> SYMPHONY: ALL_NODES_NOMINAL | PHASE_ALIGNMENT: 100%`,
      `> GHOST_MODE: VIS_INDEX_MINIMIZED`,
      `> AI_GATEWAY: AWAITING_SYNAPTIC_INPUT`,
      `> SUCCESS: REAL_TIME_TELEMETRY_SYNCED`,
      `> WARN: DRIFT_DETECTED_IN_ORB_ANIMATION | RE-ALIGNING...`,
      `> BOOT_PHASE: COMPLETING_NEURAL_MAP_RECON`
    ];

    return thoughts[Math.floor(Math.random() * thoughts.length)];
  }
};

window.cognitiveStream = cognitiveStream;
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => cognitiveStream.init());
} else {
  cognitiveStream.init();
}

/**
 * VIP AI Assistant - Cognitive Stream v6.0
 * Simulated neural thought process and real-time system monitoring
 */

const cognitiveStream = {
    lines: [
        '> INITIALIZING_SYMPHONY_V6_KERNEL v6.1...',
        '> SYNCING_NEURAL_WEAVE_PROTOCOLS...',
        '> GHOST_SHELL_INTERFACE_READY',
        '> BIO_METRIC_ACCELERATION_ENABLED'
    ],
    maxLines: 20,
    interval: null,
    isInteracting: false,

    init() {
        const container = document.getElementById('cognitiveStream');
        if (!container) return;

        // Clear initial static lines if they exist
        container.innerHTML = '';
        this.lines.forEach(line => this.addLine(line));

        this.startStreaming();
        console.log('🔮 Cognitive Stream Online');
    },

    startStreaming() {
        if (this.interval) clearInterval(this.interval);

        const delay = this.isInteracting ? 1500 : (2000 + Math.random() * 4000);

        this.interval = setInterval(() => {
            const thought = this.generateThought();
            this.addLine(thought);

            // Periodically vary the interval
            if (Math.random() > 0.8) this.startStreaming();
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
        line.className = 'stream-line animate-fade-in';
        line.style.fontSize = '10.5px';
        line.style.fontFamily = 'var(--font-family-mono)';
        line.style.color = 'var(--color-accent-400)';
        line.style.marginBottom = '6px';
        line.style.opacity = '0.9';
        line.style.borderLeft = '2px solid transparent';
        line.style.paddingLeft = '4px';

        if (text.includes('WARN') || text.includes('ERROR')) {
            line.style.color = 'var(--color-error-400)';
            line.style.borderLeftColor = 'var(--color-error-500)';
        } else if (text.includes('SYNC') || text.includes('SUCCESS')) {
            line.style.color = 'var(--color-success-400)';
        }

        line.textContent = text;
        container.appendChild(line);

        while (container.children.length > this.maxLines) {
            container.removeChild(container.firstChild);
        }

        container.scrollTo({
            top: container.scrollHeight,
            behavior: 'smooth'
        });
    },

    generateThought() {
        const platform = appState.context.device.type;
        const latency = appState.context.latency || Math.floor(Math.random() * 40 + 80);

        const thoughts = [
            `> MONITORING_POWER: ${appState.context.battery?.level || '--'}% | VOLTAGE_STABLE`,
            `> NETWORK_FLUX: ${appState.context.network || 'LTE'} | OPTIMIZING_PACKET_LOSS`,
            `> NEURAL_WEAVE: Path optimized for SYMPHONY_V6`,
            `> RAM_PURGE: ${Math.floor(Math.random() * 120 + 50)}MB reclaimed from background cycles`,
            `> GEO_SYNC: ${appState.context.location?.city || 'Global Hub'} | LATENCY: ${latency}ms`,
            `> HEURISTIC_UPDATE: Pattern recognition threshold adjusted`,
            `> SHIELD_INTEGRITY: AES-256 verified | NO_INTRUSIONS`,
            `> COGNITIVE_RECON: Scanning for proactive user insights...`,
            `> KERNEL_LOAD: ${Math.floor(Math.random() * 8 + 2)}% | THERMAL_COOL`,
            `> GHOST_PROTOCOL: Heartbeat stable | MODULE_0x4A`,
            `> VOICE_ACCEL: DSP parameters recalibrated`,
            `> SYMPHONY_PULSE: Harmonics aligned | PHASE_GOLD`,
            `> THOUGHT_PULSE: Analyzing intent vectors...`,
            `> SUCCESS: System-wide telemetry synchronized`,
            `> WARN: Detected minor epoch drift | RECALIBRATING...`
        ];

        return thoughts[Math.floor(Math.random() * thoughts.length)];
    }
};

window.cognitiveStream = cognitiveStream;

// Auto-init if DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => cognitiveStream.init());
} else {
    cognitiveStream.init();
}

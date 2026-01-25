/**
 * VIP AI Assistant - Cognitive Stream v6.0
 * Simulated neural thought process and real-time system monitoring
 */

const cognitiveStream = {
    lines: [
        '> INITIALIZING_SYNAPTIC_NODES...',
        '> MONITORING_REALWORLD_CONTEXT...',
        '> GHOST_SHELL_INTERFACE_READY'
    ],
    maxLines: 15,
    interval: null,

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
        // Randomly push "thoughts" or "logs"
        this.interval = setInterval(() => {
            const thought = this.generateThought();
            this.addLine(thought);
        }, 3000 + Math.random() * 5000);
    },

    addLine(text) {
        const container = document.getElementById('cognitiveStream');
        if (!container) return;

        const line = document.createElement('div');
        line.className = 'stream-line animate-fade-in';
        line.style.fontSize = '10px';
        line.style.fontFamily = 'var(--font-family-mono)';
        line.style.color = 'var(--color-secondary-400)';
        line.style.marginBottom = '4px';
        line.textContent = text;

        container.appendChild(line);

        // Keep lines within limit
        while (container.children.length > this.maxLines) {
            container.removeChild(container.firstChild);
        }

        // Auto-scroll
        container.scrollTop = container.scrollHeight;
    },

    generateThought() {
        const thoughts = [
            `> Analyzing battery drain: ${appState.context.battery?.level || '--'}%`,
            `> Network signal spike detected: ${appState.context.network || 'Stable'}`,
            `> Neural path optimized for ${chatManager.personality} mode`,
            `> Background memory compression active: ${Math.floor(Math.random() * 50 + 20)}MB purged`,
            `> Location sync: ${appState.context.location?.city || 'Unknown Node'}`,
            `> HEURISTIC_UPDATE: User preference pattern updated`,
            `> Secure vault Integrity check: 100%`,
            `> COGNITIVE_RECON: Scanning for proactive insights...`,
            `> SYSTEM_LOAD: ${Math.floor(Math.random() * 15 + 5)}%`,
            `> Ghost protocol heartbeat: NORM_OP`,
            `> ADB_TUNNEL: Monitoring wireless protocol`,
            `> WEATHER_SYNC: ${document.getElementById('wTemp')?.innerText || '--'} | ${document.getElementById('wDesc')?.innerText || 'Syncing'}`,
            `> AI_LATENCY: ${Math.floor(Math.random() * 50 + 80)}ms`,
            `> SYMPHONY_ENGINE: Harmonics balanced`,
            `> THOUGHT_PULSE: Monitoring user intent...`
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

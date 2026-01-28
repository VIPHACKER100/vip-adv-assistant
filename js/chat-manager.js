/**
 * VIP AI SYMPHONY - Cognitive Gateway v7.0
 * Intelligent Chat Interface & Synthetic Reasoning Hub
 * "NEURAL FLUX" Design Implementation
 */

const chatManager = {
  history: [],
  isOpen: false,
  isTyping: false,
  personality: localStorage.getItem('vip_ai_personality') || 'professional',
  linkStability: 100,

  init() {
    const stored = localStorage.getItem('vip_chat_history');
    if (stored) {
      this.history = JSON.parse(stored);
      // Keep only last 50 for performance
      if (this.history.length > 50) this.history = this.history.slice(-50);
    }

    if (this.history.length === 0) {
      this.history.push({
        role: 'ai',
        text: 'Neural handshake established. I am VIP AI SYMPHONY, your v7.0 strategic interface. Cognition arrays are at optimal resonance. How shall we proceed with device orchestration?',
        time: new Date().toISOString(),
      });
    }
  },

  toggleChat() {
    if (this.isOpen) this.closeChat();
    else this.openChat();
  },

  openChat() {
    this.isOpen = true;

    if (!document.getElementById('aiChatPanel')) {
      const panel = document.createElement('div');
      panel.id = 'aiChatPanel';
      panel.className = 'sidebar-drawer neural-glass';
      panel.innerHTML = `
                <div class="drawer-header">
                    <div style="display: flex; flex-direction: column;">
                        <h2 class="modal-title" style="font-size: 1.1rem; letter-spacing: 2px;">🧠 COGNITIVE_GATEWAY</h2>
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <div class="status-indicator active"></div>
                            <span class="encryption-tag" style="margin-top:0">LINK: STABLE_100%</span>
                        </div>
                    </div>
                    <div style="display: flex; gap: 8px; align-items: center;">
                        <select onchange="chatManager.setPersonality(this.value)" class="neural-select">
                            <option value="professional" ${this.personality === 'professional' ? 'selected' : ''}>STRATEGIC</option>
                            <option value="concise" ${this.personality === 'concise' ? 'selected' : ''}>TACTICAL</option>
                            <option value="creative" ${this.personality === 'creative' ? 'selected' : ''}>GENESIS</option>
                        </select>
                        <button class="face-recognition-close" style="width:28px; height:28px; font-size:16px" onclick="chatManager.closeChat()">&times;</button>
                    </div>
                </div>
                <div class="drawer-visualizer">
                    <canvas id="neuralVisualizer"></canvas>
                    <div id="visualizerData" style="position: absolute; bottom: 8px; right: 12px; font-family: var(--font-family-mono); font-size: 8px; color: var(--color-primary); opacity: 0.6;">PULSE_NOMINAL</div>
                </div>
                <div class="drawer-body" id="chatMessageContainer">
                    <div class="chat-messages" id="chatMessages"></div>
                </div>
                <div id="chatActionChips" class="chat-chips"></div>
                <div class="chat-input-area">
                    <button class="icon-btn-sm btn-neural-glass" id="chatVoiceBtn" onclick="chatManager.startVoiceInput()" style="width: 44px; height: 44px; border-radius: 50%;">🎤</button>
                    <input type="text" id="chatInput" class="neural-input" placeholder="Transmit neural query..." 
                           style="flex: 1; border-radius: 20px;"
                           onkeydown="if(event.key==='Enter') chatManager.sendMessage()">
                    <button class="btn-neural-primary" onclick="chatManager.sendMessage()" style="width: 44px; height: 44px; padding: 0; min-width: auto; border-radius: 50%; display: flex; align-items: center; justify-content: center;">➤</button>
                </div>
            `;
      document.body.appendChild(panel);

      if (!document.getElementById('drawerOverlay')) {
        const overlay = document.createElement('div');
        overlay.id = 'drawerOverlay';
        overlay.className = 'drawer-overlay';
        overlay.onclick = () => this.closeChat();
        document.body.appendChild(overlay);
      }
    }

    const panel = document.getElementById('aiChatPanel');
    const overlay = document.getElementById('drawerOverlay');

    panel.classList.add('active');
    overlay.classList.add('active');

    this.renderMessages();
    this.renderChips();
    this.initVisualizer();
    setTimeout(() => document.getElementById('chatInput')?.focus(), 400);
  },

  initVisualizer() {
    const canvas = document.getElementById('neuralVisualizer');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const points = [];
    const count = 30;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    for (let i = 0; i < count; i++) {
      points.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        hue: 190 + (Math.random() * 90) // Cyan to Purple
      });
    }

    const animate = () => {
      if (!this.isOpen) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const speed = this.isTyping ? 3 : 1;

      points.forEach((p, i) => {
        p.x += p.vx * speed;
        p.y += p.vy * speed;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.fillStyle = `hsla(${p.hue}, 100%, 50%, 0.6)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fill();

        points.slice(i + 1).forEach(p2 => {
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 80) {
            ctx.strokeStyle = `hsla(${p.hue}, 100%, 50%, ${0.2 * (1 - dist / 80)})`;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });

      if (this.isTyping) {
        document.getElementById('visualizerData').textContent = `REASONING_STATE_ACTIVE_${Math.random().toString(16).slice(2, 6).toUpperCase()}`;
      } else {
        document.getElementById('visualizerData').textContent = `IDLE_MONITOR_NOMINAL`;
      }

      requestAnimationFrame(animate);
    };
    animate();
  },

  renderChips() {
    const chipContainer = document.getElementById('chatActionChips');
    if (!chipContainer) return;
    const chips = [
      { i: '🔋', t: 'CORE_STATE' },
      { i: '⚡', t: 'GEN_WORKFLOW' },
      { i: '🎨', t: 'SPECTRAL_SHIFT' },
      { i: '📊', t: 'EXEC_STATS' }
    ];

    chipContainer.innerHTML = chips.map(c => `
      <button class="neural-chip neural-glass" onclick="chatManager.sendQuickMessage('${c.t}')" style="padding: 6px 16px; border-radius: 20px; font-size: 10px; color: var(--text-main); display: flex; align-items: center; gap: 6px; white-space: nowrap;">
        <span>${c.i}</span> ${c.t}
      </button>
    `).join('');
  },

  sendQuickMessage(text) {
    const input = document.getElementById('chatInput');
    if (input) {
      input.value = text;
      this.sendMessage();
    }
  },

  closeChat() {
    this.isOpen = false;
    document.getElementById('aiChatPanel')?.classList.remove('active');
    document.getElementById('drawerOverlay')?.classList.remove('active');
  },

  async sendMessage() {
    const input = document.getElementById('chatInput');
    const text = input.value.trim();
    if (!text || this.isTyping) return;

    this.history.push({ role: 'user', text, time: new Date().toISOString() });
    input.value = '';
    this.renderMessages();
    this.save();

    if (window.utils?.haptics) window.utils.haptics.impact('light');
    if (window.performanceMonitor) performanceMonitor.trackFunction();

    if (text.startsWith('/')) {
      this.handleCommand(text.substring(1));
      return;
    }

    this.isTyping = true;
    this.renderMessages();

    try {
      let responseText = '';
      if (localStorage.getItem('openai_api_key') && window.openaiHandler) {
        // AI Logic
        const response = await window.openaiHandler.handlePrompt(text);
        responseText = response.text;
        if (response.suggestedActions) {
          // Future placeholder for auto-invoking functions
        }
      } else {
        await new Promise(r => setTimeout(r, 1500));
        responseText = this.getSimulatedResponse(text);
      }

      this.history.push({ role: 'ai', text: responseText, time: new Date().toISOString() });
    } catch (e) {
      this.history.push({ role: 'ai', text: `COGNITIVE_ARRAY_FAULT: ${e.message}`, time: new Date().toISOString() });
    } finally {
      this.isTyping = false;
      this.renderMessages();
      this.save();
    }
  },

  getSimulatedResponse(text) {
    const lower = text.toLowerCase();
    if (lower.includes('hello')) return 'NEURAL_HANDSHAKE_VERIFIED. Awaiting command parameters.';
    if (lower.includes('battery')) return `CORE_RESERVE: ${document.getElementById('mBatteryVal')?.innerText || 'NOMINAL'}.`;
    if (lower.includes('status')) return 'KERNEL_INTEGRITY: 98%. ALL_SYSTEMS_GO.';
    return 'SYNAPTIC_ARRAY_STANDBY. Requesting higher-tier neural link for this query.';
  },

  handleCommand(cmd) {
    const parts = cmd.split(' ');
    const base = parts[0].toLowerCase();

    if (base === 'clear') {
      this.history = this.history.slice(0, 1);
      if (window.showToast) window.showToast('Buffer Purged', 'Neural history wiped', 'info');
    } else if (base === 'stats') {
      performanceMonitor.showDashboard();
    } else if (base === 'help') {
      this.history.push({ role: 'ai', text: 'AVAILABLE_VECTORS: /clear, /stats, /spectrum, /neural', time: new Date().toISOString() });
    }
    this.renderMessages();
    this.save();
  },

  renderMessages() {
    const container = document.getElementById('chatMessages');
    if (!container) return;

    container.innerHTML = this.history.map(m => `
      <div class="chat-bubble chat-bubble-${m.role}" style="padding: 16px; border-radius: 16px; max-width: 85%; ${m.role === 'ai' ? 'background: var(--color-surface-800); border-left: 3px solid var(--color-primary);' : 'background: var(--color-primary-dim); margin-left: auto;'}">
        <div class="bubble-content" style="font-size: 13px; line-height: 1.5; color: var(--text-main);">${this.formatText(m.text)}</div>
        <div class="bubble-meta" style="font-size: 9px; margin-top: 8px; color: var(--text-mute); display: flex; justify-content: space-between; align-items: center;">
          <span>${new Date(m.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          ${m.role === 'ai' ? `<button onclick="chatManager.speak('${m.text.replace(/'/g, "\\'")}')" style="background: none; border: none; color: var(--color-primary); cursor: pointer; padding: 0;">SPEAK</button>` : ''}
        </div>
      </div>
    `).join('') + (this.isTyping ? `
      <div class="chat-bubble chat-bubble-ai" style="padding: 16px; border-radius: 16px; background: var(--color-surface-800); border-left: 3px solid var(--color-primary); width: 60px;">
        <div class="typing-indicator" style="display: flex; gap: 4px;">
            <div style="width: 6px; height: 6px; background: var(--color-primary); border-radius: 50%; animation: bounce 1s infinite 0.1s;"></div>
            <div style="width: 6px; height: 6px; background: var(--color-primary); border-radius: 50%; animation: bounce 1s infinite 0.2s;"></div>
            <div style="width: 6px; height: 6px; background: var(--color-primary); border-radius: 50%; animation: bounce 1s infinite 0.3s;"></div>
        </div>
      </div>
    ` : '');

    const scroller = document.getElementById('chatMessageContainer');
    if (scroller) scroller.scrollTop = scroller.scrollHeight;
  },

  formatText(text) {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/`(.*?)`/g, '<code style="background: rgba(0,0,0,0.3); padding: 2px 6px; border-radius: 4px; font-family: var(--font-family-mono);">$1</code>')
      .replace(/\n/g, '<br>');
  },

  speak(text) {
    if (window.speak) window.speak(text);
  },

  setPersonality(p) {
    this.personality = p;
    localStorage.setItem('vip_ai_personality', p);
    if (window.showToast) window.showToast('Logic Calibrated', `Personality vector: ${p.toUpperCase()}`, 'info');
  },

  save() {
    localStorage.setItem('vip_chat_history', JSON.stringify(this.history.slice(-50)));
  },

  startVoiceInput() {
    if (window.startVoiceRecognition) {
      window.startVoiceRecognition();
      this.closeChat(); // Close to allow visualizer in voice modal
    }
  }
};

window.chatManager = chatManager;

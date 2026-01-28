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

  init() {
    const stored = localStorage.getItem('vip_chat_history');
    if (stored) {
      this.history = JSON.parse(stored);
    }

    if (this.history.length === 0) {
      this.history.push({
        role: 'ai',
        text: 'Acoustic link established. I am VIP AI SYMPHONY, your platinum-tier neural interface. How shall we orchestrate your device sub-systems today?',
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
                        <h2 class="modal-title" style="font-size: 1.25rem;">🧠 AI_GATEWAY</h2>
                        <div style="font-size: 10px; color: var(--color-primary); font-family: var(--font-family-mono); letter-spacing: 1px;">NODE: ACTIVE_PLATINUM_V7.0</div>
                    </div>
                    <div style="display: flex; gap: 8px; align-items: center;">
                        <select onchange="chatManager.setPersonality(this.value)" class="neural-select">
                            <option value="professional" ${this.personality === 'professional' ? 'selected' : ''}>PRO</option>
                            <option value="concise" ${this.personality === 'concise' ? 'selected' : ''}>MIN</option>
                            <option value="creative" ${this.personality === 'creative' ? 'selected' : ''}>ART</option>
                        </select>
                        <button class="modal-close" onclick="chatManager.closeChat()">&times;</button>
                    </div>
                </div>
                <div class="drawer-visualizer">
                    <canvas id="neuralVisualizer"></canvas>
                </div>
                <div class="drawer-body" id="chatMessageContainer">
                    <div class="chat-messages" id="chatMessages"></div>
                </div>
                <div id="chatActionChips" class="chat-chips"></div>
                <div class="chat-input-area">
                    <button class="icon-btn-sm" id="chatVoiceBtn" onclick="chatManager.startVoiceInput()">🎤</button>
                    <input type="text" id="chatInput" class="input" placeholder="Neural command..." onkeydown="if(event.key==='Enter') chatManager.sendMessage()">
                    <button class="btn-neural-primary" onclick="chatManager.sendMessage()" style="width: 44px; height: 44px; padding: 0; min-width: auto; border-radius: 50%;">➤</button>
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
    const particles = [];
    const count = 40;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        size: Math.random() * 2 + 1,
      });
    }

    const animate = () => {
      if (!this.isOpen) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim();
      ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--color-primary-dim').trim();

      const speed = this.isTyping ? 3 : 1;

      particles.forEach((p, i) => {
        p.x += p.vx * speed;
        p.y += p.vy * speed;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 60) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });
      requestAnimationFrame(animate);
    };
    animate();
  },

  renderChips() {
    const chipContainer = document.getElementById('chatActionChips');
    if (!chipContainer) return;
    const chips = [
      { i: '🔋', t: 'POWER_STATUS' },
      { i: '⚡', t: 'INIT_WORKFLOW' },
      { i: '🔦', t: 'PHOTON_PULSE' },
      { i: '🧠', t: 'MEMORY_AUDIT' }
    ];

    chipContainer.innerHTML = chips.map(c => `
      <button class="neural-chip" onclick="chatManager.sendQuickMessage('${c.t}')">
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

    if (text.startsWith('/')) {
      this.handleCommand(text.substring(1));
      return;
    }

    this.isTyping = true;
    this.renderMessages();

    try {
      let responseText = '';
      if (localStorage.getItem('openai_api_key') && window.openaiHandler) {
        const response = await window.openaiHandler.handlePrompt(text);
        responseText = response.text;
      } else {
        await new Promise(r => setTimeout(r, 1500));
        responseText = this.getSimulatedResponse(text);
      }

      this.history.push({ role: 'ai', text: responseText, time: new Date().toISOString() });
    } catch (e) {
      this.history.push({ role: 'ai', text: `PROTOCOL_ERROR_0xChat: ${e.message}`, time: new Date().toISOString() });
    } finally {
      this.isTyping = false;
      this.renderMessages();
      this.save();
    }
  },

  getSimulatedResponse(text) {
    const lower = text.toLowerCase();
    if (lower.includes('hello')) return 'NEURAL_HANDSHAKE_VERIFIED. Awaiting directive.';
    if (lower.includes('battery')) return `ENERGY_CORE_RESERVE: ${document.getElementById('mBatteryVal')?.innerText || 'STABLE'}.`;
    return 'COGNITIVE_ARRAY_STANDBY. Requesting cloud neural link for complex reasoning.';
  },

  handleCommand(cmd) {
    const base = cmd.split(' ')[0].toLowerCase();
    if (base === 'clear') this.history = this.history.slice(0, 1);
    else if (base === 'lock') executeFunction('biometric_lock');
    else if (base === 'help') {
      this.history.push({ role: 'ai', text: 'ACTIVE_SEQUENCES: /clear, /lock, /boost, /theme', time: new Date().toISOString() });
    }
    this.renderMessages();
    this.save();
  },

  renderMessages() {
    const container = document.getElementById('chatMessages');
    if (!container) return;

    container.innerHTML = this.history.map(m => `
      <div class="chat-bubble chat-bubble-${m.role} animate-fade-in-up">
        <div class="bubble-content">${this.formatText(m.text)}</div>
        <div class="bubble-meta">
          <span>${new Date(m.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          ${m.role === 'ai' ? `<button onclick="chatManager.speak('${m.text.replace(/'/g, "\\'")}')">🔊</button>` : ''}
        </div>
      </div>
    `).join('') + (this.isTyping ? `
      <div class="chat-bubble chat-bubble-ai">
        <div class="typing-indicator"><span></span><span></span><span></span></div>
      </div>
    ` : '');

    const scroller = document.getElementById('chatMessageContainer');
    if (scroller) scroller.scrollTop = scroller.scrollHeight;
  },

  formatText(text) {
    // Simple markdown
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/`(.*?)`/g, '<code>$1</code>')
      .replace(/\n/g, '<br>');
  },

  speak(text) {
    if (window.speak) window.speak(text);
  },

  setPersonality(p) {
    this.personality = p;
    localStorage.setItem('vip_ai_personality', p);
    if (window.showToast) window.showToast('Logic Update', `Persona shifted to ${p.toUpperCase()}`, 'info');
  },

  save() {
    localStorage.setItem('vip_chat_history', JSON.stringify(this.history));
  }
};

window.chatManager = chatManager;

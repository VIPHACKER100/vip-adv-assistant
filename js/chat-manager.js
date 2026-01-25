/**
 * VIP AI Assistant - Chat Manager (Smart Hub)
 * Interactive conversational interface for AI intelligence
 */

const chatManager = {
    history: [],
    isOpen: false,
    isTyping: false,
    personality: localStorage.getItem('vip_ai_personality') || 'professional', // concise, professional, creative

    init() {
        // Load history from storage
        const stored = localStorage.getItem('vip_chat_history');
        if (stored) {
            this.history = JSON.parse(stored);
        }

        // Welcome message if new session
        if (this.history.length === 0) {
            this.history.push({
                role: 'ai',
                text: 'Hello! I am your VIP AI Assistant Hub. How can I help you manage your digital life today?',
                time: new Date().toISOString()
            });
        }
    },

    toggleChat() {
        if (this.isOpen) {
            this.closeChat();
        } else {
            this.openChat();
        }
    },

    openChat() {
        this.isOpen = true;

        // Create panel if it doesn't exist
        if (!document.getElementById('aiChatPanel')) {
            const panel = document.createElement('div');
            panel.id = 'aiChatPanel';
            panel.className = 'sidebar-drawer';
            panel.innerHTML = `
                <div class="drawer-header">
                    <div style="display: flex; flex-direction: column;">
                        <h2 class="modal-title" style="margin: 0;">🧠 AI Smart Hub</h2>
                        <div style="font-size: 10px; color: var(--color-accent-400); font-weight: bold; text-transform: uppercase;">Session Node: ACTIVE-V4.4</div>
                    </div>
                    <div style="display: flex; gap: 8px; align-items: center;">
                        <select onchange="chatManager.setPersonality(this.value)" style="background: var(--bg-tertiary); border: 1px solid var(--glass-border); border-radius: 4px; color: var(--text-secondary); font-size: 10px; cursor: pointer;">
                            <option value="professional" ${this.personality === 'professional' ? 'selected' : ''}>PRO</option>
                            <option value="concise" ${this.personality === 'concise' ? 'selected' : ''}>MIN</option>
                            <option value="creative" ${this.personality === 'creative' ? 'selected' : ''}>ART</option>
                        </select>
                        <button class="modal-close" onclick="chatManager.closeChat()">&times;</button>
                    </div>
                </div>
                <div class="visualizer-container">
                    <canvas id="neuralVisualizer"></canvas>
                </div>
                <div class="drawer-body" id="chatMessageContainer">
                    <div class="chat-messages" id="chatMessages"></div>
                </div>
                <div id="chatActionChips" class="chat-chips"></div>
                <div class="chat-input-area">
                    <button class="icon-btn-sm" id="chatVoiceBtn" onclick="chatManager.startVoiceInput()" title="Voice Input" style="background: none; border: none; font-size: 18px;">
                        <span>🎤</span>
                    </button>
                    <input type="text" id="chatInput" class="input" placeholder="Type or say something..." onkeydown="if(event.key==='Enter') chatManager.sendMessage()">
                    <button class="btn btn-primary" onclick="chatManager.sendMessage()" style="min-width: 44px; padding: 0;">
                        <span>➤</span>
                    </button>
                </div>
            `;
            document.body.appendChild(panel);

            // Overlay already exists (from notification manager) or created here
            if (!document.getElementById('drawerOverlay')) {
                const overlay = document.createElement('div');
                overlay.id = 'drawerOverlay';
                overlay.className = 'drawer-overlay';
                overlay.onclick = () => {
                    chatManager.closeChat();
                    if (typeof notificationManager !== 'undefined') notificationManager.closePanel();
                };
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
        const count = 30;

        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                size: Math.random() * 2 + 1
            });
        }

        const animate = () => {
            if (!this.isOpen) return;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'rgba(34, 211, 238, 0.5)';
            ctx.strokeStyle = 'rgba(34, 211, 238, 0.1)';

            const speedMultiplier = this.isTyping ? 3 : 1;

            particles.forEach((p, i) => {
                p.x += p.vx * speedMultiplier;
                p.y += p.vy * speedMultiplier;

                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();

                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
                    if (dist < 50) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            });

            requestAnimationFrame(animate);
        };

        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        animate();
    },

    renderChips() {
        const chipContainer = document.getElementById('chatActionChips');
        if (!chipContainer) return;

        const chips = [
            { icon: '🔋', text: 'Battery?' },
            { icon: '⚡', text: 'Automation' },
            { icon: '🔦', text: 'Flashlight' },
            { icon: '📊', text: 'Analytics' }
        ];

        chipContainer.innerHTML = chips.map(c => `
            <button class="chat-chip" onclick="chatManager.sendQuickMessage('${c.text}')">
                <span>${c.icon}</span> ${c.text}
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
        const panel = document.getElementById('aiChatPanel');
        const overlay = document.getElementById('drawerOverlay');

        if (panel) panel.classList.remove('active');
        if (overlay && !notificationManager.isOpen) overlay.classList.remove('active');
    },

    async sendMessage() {
        const input = document.getElementById('chatInput');
        const text = input.value.trim();
        if (!text || this.isTyping) return;

        // Add user message
        this.history.push({
            role: 'user',
            text: text,
            time: new Date().toISOString()
        });

        input.value = '';
        this.renderMessages();
        this.save();

        // Check for slash commands
        if (text.startsWith('/')) {
            this.handleCommand(text.substring(1));
            return;
        }

        // AI Response simulation or real API call
        this.isTyping = true;
        this.renderMessages();

        try {
            let responseText = '';

            // Check if we have OpenAI key
            const hasKey = localStorage.getItem('openai_api_key');

            if (hasKey && typeof openaiHandler !== 'undefined') {
                const response = await openaiHandler.handlePrompt(text);
                responseText = response.text || 'I encountered an error processing that.';

                // If it triggered a function, log a notification
                if (response.functionCall) {
                    notificationManager.addNotification({
                        title: 'AI Action Executed',
                        message: `Assistant used: ${response.functionCall.name}`,
                        type: 'success'
                    });
                }
            } else {
                // Better simulated responses if no key
                await new Promise(r => setTimeout(r, 1000 + Math.random() * 1000));
                responseText = this.getSimulatedResponse(text);
            }

            // Add branding if real API was used
            if (hasKey) {
                responseText = `[VIP-AI] ${responseText}`;
            }

            this.history.push({
                role: 'ai',
                text: responseText,
                time: new Date().toISOString()
            });

        } catch (error) {
            console.error('Chat Error:', error);
            this.history.push({
                role: 'ai',
                text: `Cognitive Protocol Error: ${error.message || 'Unknown interrupt'}. Please check your connection or API configuration.`,
                time: new Date().toISOString()
            });
        } finally {
            this.isTyping = false;
            this.renderMessages();
            this.save();
        }
    },

    speak(text) {
        if (!('speechSynthesis' in window)) {
            showToast('Voice Error', 'Speech synthesis not supported in this browser', 'error');
            return;
        }

        // Cancel existing speech
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.0;
        utterance.pitch = 1.0;

        // Find a nice voice (optional but good)
        const voices = window.speechSynthesis.getVoices();
        const preferredVoice = voices.find(v => v.name.includes('Google') || v.name.includes('Female')) || voices[0];
        if (preferredVoice) utterance.voice = preferredVoice;

        window.speechSynthesis.speak(utterance);
        showToast('AI Voice', 'Speaking message...', 'info');
    },

    save() {
        localStorage.setItem('vip_chat_history', JSON.stringify(this.history));
    },

    handleCommand(cmd) {
        const parts = cmd.split(' ');
        const base = parts[0].toLowerCase();

        const commands = {
            clear: () => {
                this.history = this.history.slice(0, 1);
                showToast('Chat Clear', 'History wiped except welcome message', 'info');
            },
            lock: () => {
                executeFunction('biometric_lock');
                this.closeChat();
            },
            boost: () => {
                executeFunction('optimize_resources');
                this.closeChat();
            },
            fix: () => {
                showToast('System Fix', 'Repairing simulated registry...', 'success');
                notificationManager.addNotification({ title: 'System Repaired', message: 'Automatic repair sequence completed.', type: 'success' });
            },
            help: () => {
                this.history.push({
                    role: 'ai',
                    text: 'Available Commands:\n/clear - Wipe chat\n/lock - Lock system\n/boost - Run optimizer\n/fix - System repair',
                    time: new Date().toISOString()
                });
            }
        };

        if (commands[base]) {
            commands[base]();
        } else {
            this.history.push({
                role: 'ai',
                text: `Command "/${base}" not recognized. Type /help for options.`,
                time: new Date().toISOString()
            });
        }

        this.renderMessages();
        this.save();
    },

    setPersonality(id) {
        this.personality = id;
        localStorage.setItem('vip_ai_personality', id);
        showToast('AI Persona', `Switching to ${id} mode`, 'info');

        // Add personality-driven welcome message
        const welcome = {
            professional: 'Status report confirmed. I am ready to facilitate your requests with maximum efficiency.',
            concise: 'Systems ready. Awaiting command.',
            creative: 'Welcome back! Let\'s weave some magic into your digital world today. What shall we create?'
        };

        this.history.push({
            role: 'ai',
            text: welcome[id],
            time: new Date().toISOString()
        });
        this.renderMessages();
        this.save();
    },

    getSimulatedResponse(text) {
        const lower = text.toLowerCase();

        // Response modifiers based on personality
        if (this.personality === 'concise') {
            if (lower.includes('hello')) return 'Greeting received.';
            if (lower.includes('help')) return 'I manage shortcuts, analytics, and hardware. Ask for a specific task.';
            if (lower.includes('battery')) return `Status: ${document.getElementById('contextBattery')?.innerText || 'Unknown'}.`;
            return 'Task noted. Awaiting specific execution parameters.';
        }

        if (this.personality === 'creative') {
            if (lower.includes('hello')) return '✨ A magical hello to you! The digital stars have aligned for our conversation.';
            if (lower.includes('help')) return 'Imagine a world where your phone does the thinking for you! I can unlock vaults, paint pictures (metaphorically), and dance through your data.';
            if (lower.includes('battery')) return `Your device is currently holding ${document.getElementById('contextBattery')?.innerText || 'some energy'}. It\'s the lifeblood of our digital journey!`;
            return 'That ripples through the circuits like a dream! I\'ll keep that in mind as we explore.';
        }

        // Default professional
        if (lower.includes('hello') || lower.includes('hi')) return 'Hello! How can I assist you with your mobile functions today?';
        if (lower.includes('help')) return 'I can help you analyze images, set automations, or check your device status. Try asking me "Check my battery" or "Open automation builder".';
        if (lower.includes('battery')) {
            const bat = document.getElementById('contextBattery')?.innerText || 'Unknown';
            return `Your current battery status is ${bat}. Should I enable power saving mode?`;
        }
        if (lower.includes('automation')) return 'I can help with that. You can open the Automation Builder from the header or by saying "Open automation".';
        if (lower.includes('thank')) return 'You are very welcome! Let me know if you need anything else.';

        return 'That sounds interesting. Without a connected OpenAI API key, my logic is limited, but I can still simulate various mobile tasks for you!';
    },

    startVoiceInput() {
        if (!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
            showToast('Voice Error', 'Speech recognition not supported', 'error');
            return;
        }

        const btn = document.getElementById('chatVoiceBtn');
        const input = document.getElementById('chatInput');

        if (typeof toggleVoiceAccess === 'function') {
            // Use existing voice system but sync results
            toggleVoiceAccess();

            // Temporary listener for transcript sync
            const originalOnResult = voiceState.recognition.onresult;
            voiceState.recognition.onresult = (event) => {
                const transcript = Array.from(event.results)
                    .map(result => result[0].transcript)
                    .join('');
                if (input) input.value = transcript;

                // If it's a final result, auto-send?
                if (event.results[0].isFinal) {
                    setTimeout(() => {
                        this.sendMessage();
                        voiceState.recognition.onresult = originalOnResult;
                    }, 500);
                }
            };
        } else {
            showToast('Voice Error', 'Voice module not loaded', 'error');
        }
    },

    save() {
        localStorage.setItem('vip_chat_history', JSON.stringify(this.history));
    },

    renderMessages() {
        const container = document.getElementById('chatMessages');
        if (!container) return;

        let html = this.history.map((m, index) => `
            <div class="chat-bubble chat-bubble-${m.role}">
                ${m.text}
                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 4px;">
                    <div style="font-size: 10px; opacity: 0.5;">
                        ${new Date(m.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                    ${m.role === 'ai' ? `
                        <button class="speak-btn" onclick="chatManager.speak('${m.text.replace(/'/g, "\\'")}')" title="Speak message">
                            🔊
                        </button>
                    ` : ''}
                </div>
            </div>
        `).join('');

        if (this.isTyping) {
            html += `
                <div class="chat-bubble chat-bubble-ai" style="padding: var(--space-2) var(--space-4);">
                    <div class="typing-indicator">
                        <span></span><span></span><span></span>
                    </div>
                </div>
            `;
        }

        container.innerHTML = html;

        // Scroll to bottom
        const scroller = document.getElementById('chatMessageContainer');
        if (scroller) scroller.scrollTop = scroller.scrollHeight;
    }
};

window.chatManager = chatManager;

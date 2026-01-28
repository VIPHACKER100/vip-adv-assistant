/**
 * VIP AI SYMPHONY - Command Central Core v7.0
 * Unified Neural Orchestration & Strategic Vector Control
 */

window.commandCenter = {
  active: false,
  commands: new Map(),
  history: [],
  maxHistory: 50,
};

const commandCenter = window.commandCenter;

/**
 * Initialize Command Kernel
 */
function initCommandCenter() {
  console.log('🎯 INITIALIZING_COMMAND_CENTRAL...');
  registerCommandHandlers();
  setupGlobalCommandListener();
  loadCommandHistory();
  commandCenter.active = true;
  console.log('✅ COMMAND_CENTRAL_CORE_READY');
}

function registerCommandHandlers() {
  const actions = {
    'voice': { h: () => toggleVoiceAccess(), d: 'Toggle neural voice link' },
    'home': { h: () => window.scrollTo({ top: 0, behavior: 'smooth' }), d: 'Return to root coordinate' },
    'search': { h: () => openSearch(), d: 'Initialize Omni-Search' },
    'hud': { h: () => toggleHUD(), d: 'Toggle telemetry overlay' },
    'chat': { h: () => chatManager.toggleChat(), d: 'Activate AI_HUB' },
    'spectrum': { h: () => toggleTheme(), d: 'Shift spectral interface' },
    'telemetry': { h: () => performanceMonitor.showDashboard(), d: 'Open kernel analytics' },
    'face-id': { h: () => faceRecognition.open(), d: 'Initialize biometric verification' },
    'neural': { h: () => window.cognitiveStream?.toggle?.(), d: 'Toggle cognitive data stream' },
    'wipe': { h: () => performanceMonitor.resetMetrics(), d: 'Purge session telemetry' },
    'terminal': { h: () => console.log('Terminal ready'), d: 'Open kernel console' }
  };

  for (const [key, val] of Object.entries(actions)) {
    commandCenter.commands.set(key, { handler: val.h, description: val.d });
  }
}

function setupGlobalCommandListener() {
  window.addEventListener('command', (e) => {
    processCommand(e.detail.command, e.detail.source || 'system');
  });

  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.key === 'P') {
      e.preventDefault();
      showCommandPalette();
    }
  });
}

function processCommand(command, source = 'user') {
  if (!command) return false;
  const cmd = command.toLowerCase().trim();
  addToHistory(cmd, source);

  if (commandCenter.commands.has(cmd)) {
    const action = commandCenter.commands.get(cmd);
    action.handler();
    if (window.showToast) window.showToast('Sequence Executed', action.description, 'success');
    return true;
  }

  // Partial Match
  for (const [key, action] of commandCenter.commands) {
    if (cmd.includes(key)) {
      action.handler();
      return true;
    }
  }

  // Voice Dictionary / AI fallback
  if (window.handleVoiceCommand && window.handleVoiceCommand(cmd, true)) return true;

  if (window.showToast && source === 'palette') {
    window.showToast('Command Warning', 'Unknown sequence transmitted to kernel.', 'warning');
  }
  return false;
}

function showCommandPalette() {
  const modalContainer = document.getElementById('modalContainer');
  if (!modalContainer) return;

  const commands = Array.from(commandCenter.commands.entries()).map(([key, val]) => ({ key, ...val }));

  modalContainer.innerHTML = `
    <div class="modal-overlay active" onclick="closeModal(event)">
      <div class="modal animate-slide-up" onclick="event.stopPropagation()" style="max-width: 650px; padding: 0; overflow: hidden; border: 1px solid var(--color-primary-glow);">
        <div class="modal-header" style="background: rgba(0,0,0,0.3); padding: var(--space-6);">
          <h2 class="modal-title" style="font-family: var(--font-family-display); font-size: 14px; letter-spacing: 2px;">⚡ COMMAND_CENTRAL_V7</h2>
          <button class="modal-close" onclick="closeModal()">×</button>
        </div>
        <div class="modal-body" style="padding: var(--space-6); background: var(--color-foundation);">
          <div style="position: relative; margin-bottom: var(--space-6);">
            <input type="text" id="paletteInput" class="input" placeholder="ENTER_NEURAL_COMMAND..." 
                   style="width: 100%; height: 60px; padding-left: 24px; font-family: var(--font-family-mono); background: var(--color-surface-900); border: 2px solid var(--glass-border); border-radius: 12px; color: var(--color-primary);"
                   autocomplete="off" autofocus>
            <div style="position: absolute; right: 20px; top: 50%; translate: 0 -50%; color: var(--text-mute); font-size: 10px;">CTRL+SHIFT+P</div>
          </div>
          <div id="paletteResults" style="max-height: 400px; overflow-y: auto; display: grid; gap: 8px;">
            ${commands.map(cmd => `
              <div class="palette-item neural-glass" data-key="${cmd.key}" onclick="window.commandCenter.processCommand('${cmd.key}', 'palette'); closeModal();"
                   style="padding: var(--s4); cursor: pointer; transition: var(--t-neural); border-left: 4px solid transparent; margin-bottom: 8px;">
                <div style="font-weight: 800; font-family: var(--font-family-mono); color: var(--color-primary); font-size: 13px;">${cmd.key.toUpperCase()}</div>
                <div style="font-size: 11px; color: var(--text-dim); margin-top: 4px; letter-spacing: 1px;">${cmd.description.toUpperCase()}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;

  const input = document.getElementById('paletteInput');
  input.focus();
  input.addEventListener('input', (e) => {
    const val = e.target.value.toLowerCase();
    document.querySelectorAll('.palette-item').forEach(item => {
      const match = item.getAttribute('data-key').includes(val);
      item.style.display = match ? 'block' : 'none';
      if (match) item.style.borderLeftColor = val ? 'var(--color-primary)' : 'transparent';
    });
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const firstVisible = document.querySelector('.palette-item[style*="display: block"]');
      if (firstVisible) firstVisible.click();
      else {
        commandCenter.processCommand(input.value, 'palette');
        closeModal();
      }
    }
  });
}

function addToHistory(command, source) {
  commandCenter.history.unshift({ command, source, timestamp: Date.now() });
  if (commandCenter.history.length > commandCenter.maxHistory) commandCenter.history.pop();
  try {
    localStorage.setItem('vip_cmd_history', JSON.stringify(commandCenter.history.slice(0, 20)));
  } catch (e) { }
}

function loadCommandHistory() {
  try {
    const saved = localStorage.getItem('vip_cmd_history');
    if (saved) commandCenter.history = JSON.parse(saved);
  } catch (e) { }
}

window.initCommandCenter = initCommandCenter;
window.commandCenter.processCommand = processCommand;
window.showCommandPalette = showCommandPalette;

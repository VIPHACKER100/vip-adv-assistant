/**
 * Command Center - SYMPHONY KERNEL v6.0
 * Unified Interaction Hub & Command Processor
 */

window.commandCenter = {
  active: false,
  commands: new Map(),
  history: [],
  maxHistory: 50
};

const commandCenter = window.commandCenter;

/**
 * Initialize Command Center
 */
function initCommandCenter() {
  console.log('🎯 Initializing Command Center...');

  // Register all command handlers
  registerCommandHandlers();

  // Setup global command listener
  setupGlobalCommandListener();

  // Load command history
  loadCommandHistory();

  commandCenter.active = true;
  console.log('✅ Command Center Online');
}

/**
 * Register command handlers
 */
function registerCommandHandlers() {
  // Bio-Acoustics
  commandCenter.commands.set('voice', {
    handler: () => toggleVoiceAccess(),
    description: 'Toggle neural voice link'
  });

  commandCenter.commands.set('always-listen', {
    handler: () => toggleAlwaysListening(),
    description: 'Enable persistent acoustic monitoring'
  });

  // Navigation Vectors
  commandCenter.commands.set('home', {
    handler: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
    description: 'Return to dashboard root'
  });

  commandCenter.commands.set('search', {
    handler: () => openSearch(),
    description: 'Initialize Omni-Search'
  });

  // Neural Hubs
  commandCenter.commands.set('hud', {
    handler: () => toggleHUD(),
    description: 'Toggle Command Station overlay'
  });

  commandCenter.commands.set('chat', {
    handler: () => chatManager.toggleChat(),
    description: 'Activate AI_HUB interface'
  });

  commandCenter.commands.set('notifications', {
    handler: () => notificationManager.togglePanel(),
    description: 'Review system telemetry logs'
  });

  // Kernel Operations
  commandCenter.commands.set('boost', {
    handler: () => toggleBoostMode(),
    description: 'Initialize SYMPHONY_BOOST'
  });

  commandCenter.commands.set('theme', {
    handler: () => toggleTheme(),
    description: 'Shift visual interface spectrum'
  });
}

/**
 * Setup global command listener
 */
function setupGlobalCommandListener() {
  // Listen for commands from any source
  window.addEventListener('command', (e) => {
    processCommand(e.detail.command, e.detail.source || 'system');
  });

  // Listen for custom events
  document.addEventListener('keydown', (e) => {
    // Command palette: Ctrl+Shift+P
    if (e.ctrlKey && e.shiftKey && e.key === 'P') {
      e.preventDefault();
      showCommandPalette();
    }
  });
}

/**
 * Process command
 */
function processCommand(command, source = 'user') {
  if (!command || typeof command !== 'string') return;

  const cmd = command.toLowerCase().trim();

  // Add to history
  addToHistory(cmd, source);

  // Try exact match first
  if (commandCenter.commands.has(cmd)) {
    const handler = commandCenter.commands.get(cmd);
    handler.handler();
    showToast('Command Executed', handler.description, 'success');
    return true;
  }

  // Try partial match
  for (const [key, handler] of commandCenter.commands) {
    if (cmd.includes(key) || key.includes(cmd)) {
      handler.handler();
      showToast('Command Executed', handler.description, 'success');
      return true;
    }
  }

  // Try voice dictionary (from voice-access.js)
  if (window.handleVoiceCommand && typeof window.handleVoiceCommand === 'function') {
    if (window.handleVoiceCommand(cmd, false)) {
      return true;
    }
  }

  // Try function execution
  if (window.executeFunction) {
    const functionId = cmd.replace(/\s+/g, '_');
    try {
      if (window.executeFunction(functionId)) {
        return true;
      }
    } catch (e) {
      // Function not found, continue
    }
  }

  // Try OpenAI processing
  if (window.processWithOpenAI) {
    window.processWithOpenAI(command);
    return true;
  }

  return false;
}

/**
 * Add command to history
 */
function addToHistory(command, source) {
  commandCenter.history.unshift({
    command,
    source,
    timestamp: Date.now()
  });

  if (commandCenter.history.length > commandCenter.maxHistory) {
    commandCenter.history.pop();
  }

  // Save to localStorage
  try {
    localStorage.setItem('commandHistory', JSON.stringify(commandCenter.history.slice(0, 20)));
  } catch (e) {
    console.warn('Failed to save command history:', e);
  }
}

/**
 * Load command history
 */
function loadCommandHistory() {
  try {
    const saved = localStorage.getItem('commandHistory');
    if (saved) {
      commandCenter.history = JSON.parse(saved);
    }
  } catch (e) {
    console.warn('Failed to load command history:', e);
  }
}

/**
 * Show command palette
 */
function showCommandPalette() {
  const modalContainer = document.getElementById('modalContainer');
  if (!modalContainer) return;

  const commands = Array.from(commandCenter.commands.entries()).map(([key, value]) => ({
    key,
    ...value
  }));

  modalContainer.innerHTML = `
    <div class="modal-overlay active" onclick="closeModal(event)">
      <div class="modal animate-slide-up" onclick="event.stopPropagation()" style="max-width: 650px; padding: 0; overflow: hidden;">
        <div class="modal-header" style="background: rgba(0,0,0,0.2); padding: var(--space-5);">
          <h2 class="modal-title" style="font-family: var(--font-family-display); font-size: 18px; letter-spacing: 1px;">⚡ COMMAND_CENTRAL_CORE</h2>
          <button class="modal-close" onclick="closeModal()">×</button>
        </div>
        <div class="modal-body" style="padding: var(--space-6);">
          <div style="position: relative; margin-bottom: var(--space-6);">
            <div style="position: absolute; left: 16px; top: 50%; transform: translateY(-50%); color: var(--color-accent-400); font-size: 18px;">◈</div>
            <input type="text" id="commandInput" class="input input-lg" placeholder="ENTER_COMMAND_SEQUENCE..." 
                   style="width: 100%; padding-left: 48px; background: rgba(255,255,255,0.03); border: 2px solid var(--glass-border); border-radius: var(--radius-2xl); font-family: var(--font-family-mono); height: 60px;" 
                   onkeydown="if(event.key==='Enter') { window.commandCenter.processCommand(document.getElementById('commandInput').value, 'palette'); closeModal(); }">
          </div>
          
          <div style="max-height: 380px; overflow-y: auto; padding-right: 8px;" class="stagger-children" id="paletteResults">
            ${commands.map(cmd => `
              <div class="glass-card-subtle hover-lift" style="margin-bottom: var(--space-3); cursor: pointer; padding: var(--space-4); border-left: 3px solid transparent;" 
                   onmouseenter="this.style.borderLeftColor='var(--color-accent-500)'"
                   onmouseleave="this.style.borderLeftColor='transparent'"
                   onclick="window.commandCenter.processCommand('${cmd.key}', 'palette'); closeModal();">
                <div class="flex-between">
                  <div>
                    <strong style="color: var(--text-primary); font-size: 14px; letter-spacing: 0.5px;">${cmd.key.toUpperCase()}</strong>
                    <p style="margin-top: var(--space-1); color: var(--text-tertiary); font-size: 12px;">${cmd.description.toUpperCase()}</p>
                  </div>
                  <div class="badge badge-accent" style="font-family: var(--font-family-mono); font-size: 10px;">EXEC_LOCAL</div>
                </div>
              </div>
            `).join('')}
          </div>

          <div style="margin-top: var(--space-6); padding: var(--space-4); background: rgba(0,0,0,0.2); border-radius: var(--radius-xl); border: 1px solid var(--glass-border);">
            <div style="font-size: 10px; color: var(--color-accent-400); margin-bottom: 8px; letter-spacing: 1px; font-weight: 800;">KERNEL_SHORTCUTS:</div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-3); font-size: 11px; font-family: var(--font-family-mono); color: var(--text-tertiary);">
              <div><span style="color: var(--text-secondary);">CTL+SHF+P</span> — MASTER_PALETTE</div>
              <div><span style="color: var(--text-secondary);">CTL+SHF+V</span> — BIO_ACOUSTICS</div>
              <div><span style="color: var(--text-secondary);">CTL+K</span> — OMNI_SEARCH</div>
              <div><span style="color: var(--text-secondary);">CTL+J</span> — AI_GATEWAY</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Focus input
  setTimeout(() => {
    const input = document.getElementById('commandInput');
    if (input) input.focus();
  }, 100);
}

// Export
window.commandCenter.processCommand = processCommand;
window.commandCenter.initCommandCenter = initCommandCenter;
window.showCommandPalette = showCommandPalette;

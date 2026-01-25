/**
 * Command Center - Unified Interaction Hub
 * Centralized command processing and user interaction
 * v5.0 - Neural Symphony
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
  // Voice commands
  commandCenter.commands.set('voice', {
    handler: () => toggleVoiceAccess(),
    description: 'Toggle voice access'
  });

  commandCenter.commands.set('always-listen', {
    handler: () => toggleAlwaysListening(),
    description: 'Toggle always-listening mode'
  });

  // Navigation
  commandCenter.commands.set('home', {
    handler: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
    description: 'Scroll to top'
  });

  commandCenter.commands.set('search', {
    handler: () => openSearch(),
    description: 'Open search'
  });

  // Panels
  commandCenter.commands.set('hud', {
    handler: () => toggleHUD(),
    description: 'Toggle Command Center HUD'
  });

  commandCenter.commands.set('chat', {
    handler: () => chatManager.toggleChat(),
    description: 'Toggle AI chat'
  });

  commandCenter.commands.set('notifications', {
    handler: () => notificationManager.togglePanel(),
    description: 'Toggle notifications'
  });

  // System
  commandCenter.commands.set('boost', {
    handler: () => toggleBoostMode(),
    description: 'Toggle boost mode'
  });

  commandCenter.commands.set('theme', {
    handler: () => toggleTheme(),
    description: 'Toggle theme'
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
      <div class="modal" onclick="event.stopPropagation()" style="max-width: 600px;">
        <div class="modal-header">
          <h2 class="modal-title">🎯 Command Center</h2>
          <button class="modal-close" onclick="closeModal()">&times;</button>
        </div>
        <div class="modal-body">
          <input type="text" id="commandInput" class="input" placeholder="Type a command..." 
                 style="width: 100%; margin-bottom: var(--space-4);" 
                 onkeydown="if(event.key==='Enter') { window.commandCenter.processCommand(document.getElementById('commandInput').value, 'palette'); closeModal(); }">
          
          <div style="max-height: 400px; overflow-y: auto;">
            ${commands.map(cmd => `
              <div class="glass-card" style="margin-bottom: var(--space-3); cursor: pointer;" 
                   onclick="window.commandCenter.processCommand('${cmd.key}', 'palette'); closeModal();">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <div>
                    <strong style="color: var(--text-primary);">${cmd.key}</strong>
                    <p style="margin-top: var(--space-1); color: var(--text-secondary); font-size: var(--font-size-sm);">${cmd.description}</p>
                  </div>
                  <span style="color: var(--color-accent-400);">→</span>
                </div>
              </div>
            `).join('')}
          </div>

          <div style="margin-top: var(--space-4); padding: var(--space-3); background: var(--bg-tertiary); border-radius: var(--radius-lg);">
            <strong style="color: var(--text-primary);">💡 Quick Commands:</strong>
            <div style="margin-top: var(--space-2); font-size: var(--font-size-sm); color: var(--text-secondary);">
              <div>• Ctrl+Shift+P - Open Command Palette</div>
              <div>• Ctrl+Shift+V - Toggle Always-Listening</div>
              <div>• Ctrl+K - Open Search</div>
              <div>• Ctrl+J - Open AI Chat</div>
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

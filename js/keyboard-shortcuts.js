/**
 * VIP AI SYMPHONY - Master Key Registry v6.0
 * Strategic Vector Navigation & Power-User Controls
 */

const shortcuts = {
  enabled: true,
  bindings: {
    // Navigation
    'ctrl+h': () => window.scrollTo({ top: 0, behavior: 'smooth' }),
    'ctrl+k': () => openSearch(),
    'ctrl+/': () => showShortcutsHelp(),

    // Voice & Settings
    'ctrl+m': () => toggleVoiceAccess(),
    'ctrl+,': () => showModal('settings'),

    // Automation
    'ctrl+b': () => openAutomationBuilder(),

    // Quick Actions
    'ctrl+1': () => executeFunction('analyze_image'),
    'ctrl+2': () => executeFunction('smart_reply'),
    'ctrl+3': () => executeFunction('usage_analytics'),
    'ctrl+4': () => executeFunction('secure_vault'),
    'ctrl+5': () => executeFunction('focus_mode'),
    'ctrl+6': () => executeFunction('control_smart_home'),

    // Modal Control
    'escape': () => closeModal(),

    // Theme
    'ctrl+shift+l': () => toggleTheme(),

    // v5.0 Always-Listening & Command Center
    'ctrl+shift+v': () => {
      if (window.toggleAlwaysListening) {
        window.toggleAlwaysListening();
      }
    },
    'ctrl+shift+p': () => {
      if (window.showCommandPalette) {
        window.showCommandPalette();
      }
    }
  }
};

// Initialize keyboard shortcuts
function initKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    if (!shortcuts.enabled) return;

    // Build key combination
    const key = [];
    if (e.ctrlKey) key.push('ctrl');
    if (e.shiftKey) key.push('shift');
    if (e.altKey) key.push('alt');
    key.push(e.key.toLowerCase());

    const combo = key.join('+');

    // Execute if binding exists
    if (shortcuts.bindings[combo]) {
      e.preventDefault();
      shortcuts.bindings[combo]();
    }
  });

  console.log('⌨️ Keyboard shortcuts enabled');
}

// Show shortcuts help modal
function showShortcutsHelp() {
  const modalContainer = document.getElementById('modalContainer');
  if (!modalContainer) return;

  const shortcutGroups = {
    'Navigation': {
      'Ctrl + H': 'Go to top',
      'Ctrl + K': 'Open search',
      'Ctrl + /': 'Show shortcuts'
    },
    'Quick Actions': {
      'Ctrl + 1-6': 'Execute quick action',
      'Ctrl + M': 'Toggle voice access',
      'Ctrl + B': 'Open automation builder',
      'Ctrl + ,': 'Open settings'
    },
    'Controls': {
      'Escape': 'Close modal',
      'Ctrl + Shift + L': 'Toggle theme'
    }
  };

  modalContainer.innerHTML = `
    <div class="modal-overlay active" onclick="closeModal(event)">
      <div class="modal animate-slide-up" onclick="event.stopPropagation()" style="max-width: 650px; padding: 0; overflow: hidden;">
        <div class="modal-header" style="background: rgba(0,0,0,0.1); padding: var(--space-6);">
          <h2 class="modal-title" style="font-family: var(--font-family-display); font-size: 16px; letter-spacing: 1px;">⌨️ SYMPHONY_KEY_REGISTRY</h2>
          <button class="modal-close" onclick="closeModal()">×</button>
        </div>
        <div class="modal-body">
          ${Object.entries({
    'KERNEL_VECTORS': {
      'Ctrl + H': 'ROOT_NAVIGATION',
      'Ctrl + K': 'OMNI_SEARCH_LINK',
      'Ctrl + /': 'RECALL_KEY_REGISTRY'
    },
    'SYMPHONY_CONTROLS': {
      'Ctrl + M': 'INITIALIZE_VOICE',
      'Ctrl + B': 'INIT_WORKFLOW_DESIGNER',
      'Ctrl + ,': 'SYSTEM_BASELINE_CONFIG',
      'Escape': 'TERMINATE_ACTIVE_LAYER'
    },
    'NEURAL_QUICK_ACCESS': {
      'Ctrl + Shift + P': 'MASTER_PALETTE',
      'Ctrl + Shift + V': 'ALWAYS_LISTEN_MODE',
      'Ctrl + Shift + L': 'SHIFT_THEME_SPECTRUM'
    }
  }).map(([group, shortcuts]) => `
            <div class="glass-card-subtle" style="margin-bottom: var(--space-4); border: 1px solid var(--glass-border);">
              <h4 style="margin-bottom: var(--space-3); color: var(--color-accent-400); font-size: 11px; letter-spacing: 1px;">${group}</h4>
              <div style="display: grid; gap: var(--space-2);">
                ${Object.entries(shortcuts).map(([key, desc]) => `
                  <div class="flex-between" style="padding: var(--space-2); background: rgba(255,255,255,0.02); border-radius: var(--radius-md);">
                    <span style="color: var(--text-secondary); font-size: 12px; font-family: var(--font-family-mono);">${desc}</span>
                    <kbd style="padding: 2px 8px; background: var(--bg-tertiary); border: 1px solid var(--glass-border); border-radius: 4px; font-family: var(--font-family-mono); font-size: 10px; color: var(--color-accent-300);">${key}</kbd>
                  </div>
                `).join('')}
              </div>
            </div>
          `).join('')}
          
          <div style="margin-top: var(--space-4); padding: var(--space-3); background: var(--bg-secondary); border-radius: var(--radius-lg); border-left: 4px solid var(--color-accent-500);">
            <strong style="color: var(--text-primary);">💡 Tip:</strong>
            <p style="margin-top: var(--space-2); color: var(--text-secondary);">
              Press <kbd style="padding: 2px 6px; background: var(--bg-tertiary); border-radius: 4px;">Ctrl + /</kbd> anytime to see this help.
            </p>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-glass" onclick="closeModal()">Close</button>
        </div>
      </div>
    </div>
  `;
}

// Export for global access
window.initKeyboardShortcuts = initKeyboardShortcuts;
window.showShortcutsHelp = showShortcutsHelp;

/**
 * VIP AI SYMPHONY - Master Key Registry v7.0
 * Strategic Vector Navigation & Power-User Controls
 * Optimized for platinum-tier keyboard orchestration
 */

const shortcuts = {
  enabled: true,
  bindings: {
    'ctrl+h': () => window.scrollTo({ top: 0, behavior: 'smooth' }),
    'ctrl+k': () => window.openSearch?.(),
    'ctrl+/': () => window.showShortcutsHelp?.(),
    'ctrl+m': () => window.toggleVoiceAccess?.(),
    'ctrl+,': () => window.showModal?.('settings'),
    'ctrl+b': () => window.openAutomationBuilder?.(),
    'ctrl+1': () => window.executeFunction?.('analyze_image'),
    'ctrl+2': () => window.executeFunction?.('smart_reply'),
    'ctrl+3': () => window.executeFunction?.('usage_analytics'),
    'ctrl+p': () => window.showCommandPalette?.(),
    'ctrl+shift+p': () => window.showCommandPalette?.(),
    'ctrl+shift+v': () => window.toggleAlwaysListening?.(),
    'ctrl+shift+l': () => window.toggleTheme?.(),
    'escape': () => {
      if (window.closeModal) window.closeModal();
      if (window.closeSearch) window.closeSearch();
    }
  },

  init() {
    document.addEventListener('keydown', (e) => {
      if (!this.enabled) return;

      const key = [];
      if (e.ctrlKey) key.push('ctrl');
      if (e.shiftKey) key.push('shift');
      if (e.altKey) key.push('alt');
      key.push(e.key.toLowerCase());

      const combo = key.join('+');
      if (this.bindings[combo]) {
        e.preventDefault();
        this.bindings[combo]();
      }
    });
    console.log('⌨️ KEY_REGISTRY_7.0_ONLINE');
  }
};

function showShortcutsHelp() {
  const modalContainer = document.getElementById('modalContainer');
  if (!modalContainer) return;

  const groups = {
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
  };

  modalContainer.innerHTML = `
    <div class="modal-overlay active" onclick="closeModal(event)">
      <div class="modal animate-slide-up" onclick="event.stopPropagation()" style="max-width: 600px; padding: 0;">
        <div class="modal-header" style="padding: var(--s6);">
          <h2 class="modal-title" style="font-size: 1.1rem; letter-spacing: 2px;">⌨️ KEY_REGISTRY_V7.0</h2>
          <button class="modal-close" onclick="closeModal()">×</button>
        </div>
        <div class="modal-body" style="padding: var(--s6);">
          ${Object.entries(groups).map(([group, keys]) => `
            <div class="neural-glass" style="margin-bottom: var(--s4); padding: var(--s4);">
              <div style="font-size: 10px; color: var(--color-primary); font-family: var(--font-family-mono); margin-bottom: 12px; letter-spacing: 1px;">${group}</div>
              <div style="display: grid; gap: 8px;">
                ${Object.entries(keys).map(([k, d]) => `
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-size: 13px; color: var(--text-dim);">${d}</span>
                    <kbd style="background: var(--color-surface-900); padding: 2px 8px; border-radius: 4px; border: 1px solid var(--glass-border); font-family: var(--font-family-mono); font-size: 10px; color: var(--color-primary);">${k}</kbd>
                  </div>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </div>
        <div class="modal-footer" style="padding: var(--s6);">
           <button class="btn-neural-primary" style="width: 100%;" onclick="closeModal()">ACKNOWLEDGE</button>
        </div>
      </div>
    </div>
  `;
}

window.keyboardShortcuts = shortcuts;
window.showShortcutsHelp = showShortcutsHelp;
window.initKeyboardShortcuts = () => shortcuts.init();

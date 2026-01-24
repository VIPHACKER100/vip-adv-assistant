/**
 * Keyboard Shortcuts Manager
 * Provides power-user keyboard navigation
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
        'ctrl+shift+l': () => toggleTheme()
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
      <div class="modal" onclick="event.stopPropagation()" style="max-width: 600px;">
        <div class="modal-header">
          <h2 class="modal-title">⌨️ Keyboard Shortcuts</h2>
          <button class="modal-close" onclick="closeModal()">&times;</button>
        </div>
        <div class="modal-body">
          ${Object.entries(shortcutGroups).map(([group, shortcuts]) => `
            <div class="glass-card" style="margin-bottom: var(--space-4);">
              <h4 style="margin-bottom: var(--space-3); color: var(--text-primary);">${group}</h4>
              <div style="display: grid; gap: var(--space-2);">
                ${Object.entries(shortcuts).map(([key, desc]) => `
                  <div style="display: flex; justify-content: space-between; align-items: center; padding: var(--space-2); background: var(--bg-tertiary); border-radius: var(--radius-md);">
                    <span style="color: var(--text-secondary);">${desc}</span>
                    <kbd style="padding: var(--space-1) var(--space-2); background: var(--bg-primary); border: 1px solid var(--border-primary); border-radius: var(--radius-sm); font-family: monospace; font-size: var(--font-size-xs);">${key}</kbd>
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

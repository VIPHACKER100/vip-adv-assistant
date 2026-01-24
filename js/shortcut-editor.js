/**
 * Custom Keyboard Shortcuts Editor
 * Allow users to customize keyboard shortcuts
 */

const shortcutEditor = {
    customShortcuts: JSON.parse(localStorage.getItem('customShortcuts') || '{}'),

    defaultShortcuts: {
        'search': 'ctrl+k',
        'voice': 'ctrl+m',
        'automation': 'ctrl+b',
        'settings': 'ctrl+,',
        'help': 'ctrl+/',
        'theme': 'ctrl+shift+l',
        'home': 'ctrl+h',
        'favorites': 'ctrl+shift+f',
        'recent': 'ctrl+r',
        'performance': 'ctrl+shift+p'
    },

    getShortcut(action) {
        return this.customShortcuts[action] || this.defaultShortcuts[action];
    },

    setShortcut(action, shortcut) {
        this.customShortcuts[action] = shortcut;
        localStorage.setItem('customShortcuts', JSON.stringify(this.customShortcuts));

        // Update keyboard shortcuts
        if (window.shortcuts) {
            this.applyCustomShortcuts();
        }
    },

    resetToDefaults() {
        this.customShortcuts = {};
        localStorage.setItem('customShortcuts', JSON.stringify(this.customShortcuts));
        this.applyCustomShortcuts();
        showToast('Shortcuts Reset', 'Restored to default shortcuts', 'success');
    },

    applyCustomShortcuts() {
        // Rebuild shortcuts with custom bindings
        const newBindings = {};

        Object.entries(this.defaultShortcuts).forEach(([action, defaultKey]) => {
            const key = this.getShortcut(action);

            switch (action) {
                case 'search':
                    newBindings[key] = () => openSearch();
                    break;
                case 'voice':
                    newBindings[key] = () => toggleVoiceAccess();
                    break;
                case 'automation':
                    newBindings[key] = () => openAutomationBuilder();
                    break;
                case 'settings':
                    newBindings[key] = () => showModal('settings');
                    break;
                case 'help':
                    newBindings[key] = () => showShortcutsHelp();
                    break;
                case 'theme':
                    newBindings[key] = () => toggleTheme();
                    break;
                case 'home':
                    newBindings[key] = () => window.scrollTo({ top: 0, behavior: 'smooth' });
                    break;
                case 'favorites':
                    newBindings[key] = () => favoritesManager.showFavoritesModal();
                    break;
                case 'recent':
                    newBindings[key] = () => recentFunctionsManager.showHistoryModal();
                    break;
                case 'performance':
                    newBindings[key] = () => performanceMonitor.showDashboard();
                    break;
            }
        });

        // Add escape key
        newBindings['escape'] = () => closeModal();

        // Update global shortcuts
        if (window.shortcuts) {
            shortcuts.bindings = newBindings;
        }
    },

    showEditor() {
        const modalContainer = document.getElementById('modalContainer');
        if (!modalContainer) return;

        const actions = [
            { id: 'search', name: 'Open Search', icon: '🔍' },
            { id: 'voice', name: 'Toggle Voice', icon: '🎤' },
            { id: 'automation', name: 'Automation Builder', icon: '⚡' },
            { id: 'settings', name: 'Settings', icon: '⚙️' },
            { id: 'help', name: 'Show Help', icon: '❓' },
            { id: 'theme', name: 'Toggle Theme', icon: '🎨' },
            { id: 'home', name: 'Scroll to Top', icon: '🏠' },
            { id: 'favorites', name: 'Show Favorites', icon: '⭐' },
            { id: 'recent', name: 'Recent Functions', icon: '🕒' },
            { id: 'performance', name: 'Performance Dashboard', icon: '📊' }
        ];

        modalContainer.innerHTML = `
      <div class="modal-overlay active" onclick="closeModal(event)">
        <div class="modal" onclick="event.stopPropagation()" style="max-width: 700px;">
          <div class="modal-header">
            <h2 class="modal-title">⌨️ Customize Shortcuts</h2>
            <button class="modal-close" onclick="closeModal()">&times;</button>
          </div>
          <div class="modal-body">
            <div style="margin-bottom: var(--space-4); padding: var(--space-3); background: var(--bg-secondary); border-radius: var(--radius-lg); border-left: 4px solid var(--color-warning-500);">
              <strong style="color: var(--color-warning-400);">⚠️ Note</strong>
              <p style="margin-top: var(--space-2); color: var(--text-secondary); font-size: var(--font-size-sm);">
                Changes take effect immediately. Avoid conflicts with browser shortcuts.
              </p>
            </div>

            <div style="display: grid; gap: var(--space-3);">
              ${actions.map(action => `
                <div class="glass-card" style="padding: var(--space-3);">
                  <div style="display: flex; align-items: center; gap: var(--space-3);">
                    <span style="font-size: var(--font-size-2xl);">${action.icon}</span>
                    <div style="flex: 1;">
                      <div style="font-weight: var(--font-weight-semibold); color: var(--text-primary);">
                        ${action.name}
                      </div>
                      <div style="font-size: var(--font-size-xs); color: var(--text-tertiary); margin-top: var(--space-1);">
                        Default: ${this.defaultShortcuts[action.id]}
                      </div>
                    </div>
                    <input 
                      type="text" 
                      class="input" 
                      value="${this.getShortcut(action.id)}"
                      placeholder="ctrl+key"
                      style="width: 150px; font-family: monospace;"
                      onchange="shortcutEditor.setShortcut('${action.id}', this.value); showToast('Shortcut Updated', '${action.name} shortcut changed', 'success');"
                    >
                  </div>
                </div>
              `).join('')}
            </div>

            <div style="margin-top: var(--space-4); padding: var(--space-3); background: var(--bg-secondary); border-radius: var(--radius-lg); border-left: 4px solid var(--color-accent-500);">
              <strong style="color: var(--text-primary);">💡 Format Guide</strong>
              <ul style="margin-top: var(--space-2); color: var(--text-secondary); font-size: var(--font-size-sm); padding-left: var(--space-5);">
                <li>Use lowercase: ctrl+k, alt+s, shift+f</li>
                <li>Combine with +: ctrl+shift+p</li>
                <li>Single keys: a, b, c (not recommended)</li>
              </ul>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-glass" onclick="shortcutEditor.resetToDefaults(); shortcutEditor.showEditor();">
              Reset to Defaults
            </button>
            <button class="btn btn-primary" onclick="closeModal()">Done</button>
          </div>
        </div>
      </div>
    `;
    }
};

// Export for global access
window.shortcutEditor = shortcutEditor;

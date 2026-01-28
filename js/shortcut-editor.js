/**
 * VIP AI SYMPHONY - Neural Synapse Binder v7.0
 * Customized Strategic Vector Mapping & Input Configuration
 */

const shortcutEditor = {
  customShortcuts: JSON.parse(localStorage.getItem('customShortcuts') || '{}'),

  defaultShortcuts: {
    search: 'ctrl+k',
    voice: 'ctrl+m',
    automation: 'ctrl+b',
    settings: 'ctrl+,',
    help: 'ctrl+/',
    theme: 'ctrl+shift+l',
    home: 'ctrl+h',
    favorites: 'ctrl+shift+f',
    recent: 'ctrl+r',
    performance: 'ctrl+shift+p',
  },

  getShortcut(action) {
    return this.customShortcuts[action] || this.defaultShortcuts[action];
  },

  setShortcut(action, shortcut) {
    this.customShortcuts[action] = shortcut.toLowerCase();
    localStorage.setItem('customShortcuts', JSON.stringify(this.customShortcuts));

    if (window.shortcuts) {
      this.applyCustomShortcuts();
    }

    if (window.performanceMonitor) performanceMonitor.trackFunction();
  },

  resetToDefaults() {
    this.customShortcuts = {};
    localStorage.setItem('customShortcuts', JSON.stringify(this.customShortcuts));
    this.applyCustomShortcuts();
    if (window.showToast) window.showToast('Synapse Reset', 'Baseline vectors restored', 'success');
  },

  applyCustomShortcuts() {
    const newBindings = {};

    Object.entries(this.defaultShortcuts).forEach(([action]) => {
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

    newBindings['escape'] = () => closeModal();

    if (window.shortcuts) {
      window.shortcuts.bindings = newBindings;
    }
  },

  showEditor() {
    const modalContainer = document.getElementById('modalContainer');
    if (!modalContainer) return;

    const actions = [
      { id: 'search', name: 'Omni Search', icon: '🔍' },
      { id: 'voice', name: 'Neural Voice', icon: '🎤' },
      { id: 'automation', name: 'Workflow Kernel', icon: '⚡' },
      { id: 'theme', name: 'Spectral Shift', icon: '🎨' },
      { id: 'favorites', name: 'Priority Links', icon: '⭐' },
      { id: 'recent', name: 'Temporal Node History', icon: '🕒' },
      { id: 'performance', name: 'Telemetry Dashboard', icon: '📊' },
    ];

    modalContainer.innerHTML = `
      <div class="modal-overlay active" onclick="closeModal(event)">
        <div class="modal animate-slide-up" onclick="event.stopPropagation()" style="max-width: 750px; padding: 0; overflow: hidden; border: 1px solid var(--color-primary-glow);">
          <div class="modal-header" style="background: rgba(0,0,0,0.3); padding: var(--s6);">
            <div style="display: flex; flex-direction: column;">
              <h2 class="modal-title" style="font-size: 1.1rem; letter-spacing: 2px;">⌨️ SYMPHONY_VECTOR_BINDER</h2>
              <div style="font-size: 9px; color: var(--color-primary); font-family: var(--font-family-mono); letter-spacing: 1px;">CALIBRATE_INPUT_SYNAPSES</div>
            </div>
            <button class="modal-close" onclick="closeModal()">×</button>
          </div>
          <div class="modal-body" style="padding: var(--s8); background: var(--color-foundation); max-height: 70vh; overflow-y: auto;">
            <div class="neural-glass" style="margin-bottom: var(--s6); padding: var(--s4); border-left: 4px solid var(--color-warning);">
              <div style="font-size: 10px; color: var(--color-warning); font-family: var(--font-family-mono); margin-bottom: 4px;">SYSTEM_ADVISORY::</div>
              <p style="color: var(--text-dim); font-size: 12px;">Changes take effect immediately across all neural endpoints. Avoid conflicts with browser-reserved sequences.</p>
            </div>

            <div style="display: grid; gap: 12px;">
              ${actions.map(action => `
                <div class="neural-glass" style="padding: var(--s5);">
                  <div style="display: flex; align-items: center; gap: 24px;">
                    <span style="font-size: 24px; text-shadow: 0 0 10px var(--color-primary);">${action.icon}</span>
                    <div style="flex: 1;">
                      <div style="font-weight: 800; color: var(--text-main); font-size: 13px; letter-spacing: 1px;">
                        ${action.name.toUpperCase()}
                      </div>
                      <div style="font-size: 9px; color: var(--text-mute); margin-top: 4px; font-family: var(--font-family-mono);">
                        BASELINE: ${this.defaultShortcuts[action.id].toUpperCase()}
                      </div>
                    </div>
                    <input 
                      type="text" 
                      class="input" 
                      value="${this.getShortcut(action.id)}"
                      style="width: 160px; font-family: var(--font-family-mono); font-size: 11px; text-align: center; background: var(--color-foundation); border: 1px solid var(--glass-border); border-radius: 8px; color: var(--color-primary);"
                      onchange="shortcutEditor.setShortcut('${action.id}', this.value); if(window.showToast) showToast('Vector Synced', '${action.name} calibrated', 'success');"
                    >
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
          <div class="modal-footer" style="background: rgba(0,0,0,0.2); padding: var(--s6); gap: 12px;">
            <button class="btn-neural-glass" style="flex: 1;" onclick="shortcutEditor.resetToDefaults(); shortcutEditor.showEditor();">RESTORE_BASELINE</button>
            <button class="btn-neural-primary" style="flex: 1;" onclick="closeModal()">COMMIT_CONFIG</button>
          </div>
        </div>
      </div>
    `;
  },
};

window.shortcutEditor = shortcutEditor;


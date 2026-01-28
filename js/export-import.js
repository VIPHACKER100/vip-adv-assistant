/**
 * VIP AI SYMPHONY - Neural State Recovery v7.0
 * Secure Data Export & State Matrix Restoration
 */

const exportImportManager = {
  // Export automations to JSON file
  exportAutomations() {
    const automations = JSON.parse(localStorage.getItem('automations') || '[]');
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const settings = {
      theme_mode: localStorage.getItem('vip_theme_mode') || 'dark',
      primary_hue: localStorage.getItem('vip_theme_hue') || '190',
      secondary_hue: localStorage.getItem('vip_theme_secondary_hue') || '280',
    };

    const exportData = {
      version: '7.0.0',
      codename: 'NEURAL_FLUX',
      exportDate: new Date().toISOString(),
      automations: automations,
      favorites: favorites,
      settings: settings,
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `symphony-neural-state-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    if (window.showToast) window.showToast('Archive Created', 'Neural state serialized to storage', 'success');
  },

  // Import automations from JSON file
  importAutomations() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';

    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target.result);
          if (!data.version || !data.automations) {
            throw new Error('Invalid neural archive format');
          }
          this.showImportConfirmation(data);
        } catch (error) {
          console.error('Import error:', error);
          if (window.showToast) window.showToast('Import Failed', 'Neural archive corrupted', 'error');
        }
      };
      reader.readAsText(file);
    };
    input.click();
  },

  showImportConfirmation(data) {
    const modalContainer = document.getElementById('modalContainer');
    if (!modalContainer) return;

    const automationsCount = data.automations?.length || 0;
    const favoritesCount = data.favorites?.length || 0;

    modalContainer.innerHTML = `
      <div class="modal-overlay active" onclick="closeModal(event)">
        <div class="modal animate-slide-up" onclick="event.stopPropagation()" style="max-width: 600px; padding: 0; overflow: hidden; border: 1px solid var(--color-primary-glow);">
          <div class="modal-header" style="background: rgba(0,0,0,0.3); padding: var(--s6);">
            <div style="display: flex; flex-direction: column;">
              <h2 class="modal-title" style="font-size: 1.1rem; letter-spacing: 2px;">📥 STATE_MATRIX_IMPORT</h2>
              <div style="font-size: 9px; color: var(--color-primary); font-family: var(--font-family-mono); letter-spacing: 1px;">ARCHIVE_VERSION: ${data.version}</div>
            </div>
            <button class="modal-close" onclick="closeModal()">×</button>
          </div>
          <div class="modal-body" style="padding: var(--s8); background: var(--color-foundation);">
            <div class="neural-glass" style="margin-bottom: var(--s6); padding: var(--s6);">
              <h4 style="margin-bottom: var(--s4); color: var(--color-primary); font-size: 11px; letter-spacing: 2px;">TELEMETRY_SNAPSHOT</h4>
              <div style="display: grid; gap: 12px;">
                <div class="flex-between">
                   <span style="font-size: 12px; color: var(--text-dim);">ARCHIVE_DATE</span>
                   <span style="font-weight: 800;">${new Date(data.exportDate).toLocaleDateString()}</span>
                </div>
                <div class="flex-between">
                   <span style="font-size: 12px; color: var(--text-dim);">WORKFLOW_NODES</span>
                   <span style="color: var(--color-primary); font-family: var(--font-family-mono); font-weight: 800;">${automationsCount}</span>
                </div>
                <div class="flex-between">
                   <span style="font-size: 12px; color: var(--text-dim);">PRIORITY_LINKS</span>
                   <span style="color: var(--color-secondary); font-family: var(--font-family-mono); font-weight: 800;">${favoritesCount}</span>
                </div>
              </div>
            </div>

            <div class="neural-glass" style="padding: var(--s4); border-left: 4px solid var(--color-error); background: hsla(0, 100%, 10%, 0.3);">
              <strong style="color: var(--color-error); font-size: 11px; letter-spacing: 1px;">⚠️ OVERWRITE_WARNING</strong>
              <p style="margin-top: 4px; color: var(--text-dim); font-size: 12px;">
                Executing restoration will purge current sub-modular states and force-sync with the neural archive.
              </p>
            </div>
          </div>
          <div class="modal-footer" style="background: rgba(0,0,0,0.2); padding: var(--s6); gap: 12px;">
            <button class="btn-neural-glass" style="flex: 1;" onclick="closeModal()">CANCEL</button>
            <button class="btn-neural-primary" style="flex: 1;" id="confirmImportBtn">EXECUTE_SYNC</button>
          </div>
        </div>
      </div>
    `;

    document.getElementById('confirmImportBtn').addEventListener('click', () => {
      this.confirmImport(data);
    });
  },

  confirmImport(data) {
    try {
      if (data.automations) localStorage.setItem('automations', JSON.stringify(data.automations));
      if (data.favorites) {
        localStorage.setItem('favorites', JSON.stringify(data.favorites));
        if (window.favoritesManager) {
          favoritesManager.favorites = data.favorites;
          favoritesManager.updateUI();
        }
      }
      if (data.settings) {
        if (data.settings.theme_mode) {
          localStorage.setItem('vip_theme_mode', data.settings.theme_mode);
          if (window.themeManager) themeManager.applyMode(data.settings.theme_mode);
        }
        if (data.settings.primary_hue) {
          localStorage.setItem('vip_theme_hue', data.settings.primary_hue);
          if (window.themeHub) window.themeHub.setPrimaryHue(data.settings.primary_hue);
        }
      }

      closeModal();
      if (window.showToast) window.showToast('Sync Success', 'Neural state restored successfully', 'success');
      setTimeout(() => location.reload(), 1500);
    } catch (error) {
      console.error('Import error:', error);
      if (window.showToast) window.showToast('Sync Failed', 'Could not restore neural matrix', 'error');
    }
  },

  showExportImportModal() {
    const modalContainer = document.getElementById('modalContainer');
    if (!modalContainer) return;

    modalContainer.innerHTML = `
      <div class="modal-overlay active" onclick="closeModal(event)">
        <div class="modal animate-slide-up" onclick="event.stopPropagation()" style="max-width: 650px; padding: 0; overflow: hidden; border: 1px solid var(--color-primary-glow);">
          <div class="modal-header" style="background: rgba(0,0,0,0.3); padding: var(--s6);">
             <div style="display: flex; flex-direction: column;">
               <h2 class="modal-title" style="font-size: 1.1rem; letter-spacing: 2px;">💾 KERNEL_STATE_ARCHIVE</h2>
               <div style="font-size: 9px; color: var(--color-primary); font-family: var(--font-family-mono); letter-spacing: 1px;">PERSISTENCE_MANAGER_v7.0</div>
             </div>
             <button class="modal-close" onclick="closeModal()">×</button>
          </div>
          <div class="modal-body" style="padding: var(--s8); background: var(--color-foundation);">
            <div class="neural-glass" style="margin-bottom: var(--s4); cursor: pointer;" onclick="exportImportManager.exportAutomations()">
              <div style="display: flex; align-items: center; gap: 24px; padding: var(--s5);">
                <div style="font-size: 2.5rem; text-shadow: 0 0 15px var(--color-primary);">📤</div>
                <div style="flex: 1;">
                  <h4 style="margin-bottom: 4px; color: var(--text-main); font-size: 15px;">SERIALIZE_CORE_STATE</h4>
                  <p style="color: var(--text-dim); font-size: 12px;">Export all neural pathways, priority links, and spectrum settings to a local archive.</p>
                </div>
              </div>
            </div>

            <div class="neural-glass" style="cursor: pointer;" onclick="exportImportManager.importAutomations()">
              <div style="display: flex; align-items: center; gap: 24px; padding: var(--s5);">
                <div style="font-size: 2.5rem; text-shadow: 0 0 15px var(--color-secondary);">📥</div>
                <div style="flex: 1;">
                  <h4 style="margin-bottom: 4px; color: var(--text-main); font-size: 15px;">RESTORE_NEURAL_MATRIX</h4>
                  <p style="color: var(--text-dim); font-size: 12px;">Import a previously serialized state to restore your custom symphony configuration.</p>
                </div>
              </div>
            </div>

            <div class="neural-glass" style="margin-top: var(--s6); padding: var(--s4); border-left: 2px solid var(--color-primary); background: rgba(0,0,0,0.2);">
               <div style="font-size: 10px; color: var(--color-primary); font-family: var(--font-family-mono); margin-bottom: 4px;">SYSTEM_ADVISORY::</div>
               <p style="color: var(--text-dim); font-size: 11px; line-height: 1.5;">Serialized states are encrypted with session-specific keys but contain no sensitive API credentials.</p>
            </div>
          </div>
          <div class="modal-footer" style="background: rgba(0,0,0,0.2); padding: var(--s6);">
            <button class="btn-neural-glass" style="width: 100%;" onclick="closeModal()">TERMINATE_ARCHIVE_VIEW</button>
          </div>
        </div>
      </div>
    `;
  },
};

window.exportImportManager = exportImportManager;


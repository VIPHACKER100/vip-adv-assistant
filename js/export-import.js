/**
 * VIP AI SYMPHONY - Kernel Archive System v6.0
 * Secure Data Export & Neural State Restoration
 */

const exportImportManager = {
  // Export automations to JSON file
  exportAutomations() {
    const automations = JSON.parse(localStorage.getItem('automations') || '[]');
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const settings = {
      theme: localStorage.getItem('theme') || 'dark',
      openai_api_key: '***REDACTED***', // Never export API keys
    };

    const exportData = {
      version: '6.0.0',
      exportDate: new Date().toISOString(),
      automations: automations,
      favorites: favorites,
      settings: settings,
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vip-assistant-backup-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showToast('Export', 'Backup file downloaded', 'success');
  },

  // Import automations from JSON file
  importAutomations() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';

    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) {
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target.result);

          // Validate data structure
          if (!data.version || !data.automations) {
            throw new Error('Invalid backup file format');
          }

          // Show confirmation modal
          this.showImportConfirmation(data);
        } catch (error) {
          console.error('Import error:', error);
          showToast('Import Failed', 'Invalid backup file', 'error');
        }
      };

      reader.readAsText(file);
    };

    input.click();
  },

  // Show import confirmation modal
  showImportConfirmation(data) {
    const modalContainer = document.getElementById('modalContainer');
    if (!modalContainer) {
      return;
    }

    const automationsCount = data.automations?.length || 0;
    const favoritesCount = data.favorites?.length || 0;

    modalContainer.innerHTML = `
      <div class="modal-overlay active" onclick="closeModal(event)">
        <div class="modal animate-slide-up" onclick="event.stopPropagation()" style="max-width: 600px; padding: 0; overflow: hidden;">
          <div class="modal-header" style="background: rgba(0,0,0,0.1); padding: var(--space-6);">
            <h2 class="modal-title" style="font-family: var(--font-family-display); font-size: 16px; letter-spacing: 1px;">📥 RENDER_DATA_IMPORT</h2>
            <button class="modal-close" onclick="closeModal()">×</button>
          </div>
          <div class="modal-body">
            <div class="glass-card-subtle" style="margin-bottom: var(--space-6);">
              <h4 style="margin-bottom: var(--space-4); color: var(--color-accent-400); font-size: 12px; letter-spacing: 1px;">TELEMETRY_SNAPSHOT</h4>
              <div style="display: grid; gap: var(--space-3);">
                <div class="flex-between">
                  <span style="font-size: 12px; color: var(--text-secondary);">PROTOCOL_VERSION</span>
                  <span class="badge badge-accent">${data.version}</span>
                </div>
                <div class="flex-between">
                  <span style="font-size: 12px; color: var(--text-secondary);">ARCHIVE_DATE</span>
                  <span style="font-weight: 600;">${new Date(data.exportDate).toLocaleDateString()}</span>
                </div>
                <div class="flex-between">
                  <span style="font-size: 12px; color: var(--text-secondary);">WORKFLOW_NODES</span>
                  <span style="color: var(--color-success-400); font-family: var(--font-family-mono);">${automationsCount}</span>
                </div>
                <div class="flex-between">
                  <span style="font-size: 12px; color: var(--text-secondary);">PRIORITY_LINKS</span>
                  <span style="color: var(--color-warning-400); font-family: var(--font-family-mono);">${favoritesCount}</span>
                </div>
              </div>
            </div>

            <div class="status-pill-warning" style="padding: var(--space-4); border-radius: var(--radius-lg); border-left: 4px solid var(--color-warning-500);">
              <strong style="color: var(--color-warning-400); font-size: 11px;">⚠️ DATA_OVERWRITE_WARNING</strong>
              <p style="margin-top: var(--space-2); color: var(--text-secondary); font-size: 12px;">
                Executing import will purge current sub-modular states and force-sync with the archive data.
              </p>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-glass" onclick="closeModal()">Cancel</button>
            <button class="btn btn-primary" onclick="exportImportManager.confirmImport(${JSON.stringify(data).replace(/"/g, '&quot;')})">
              Import
            </button>
          </div>
        </div>
      </div>
    `;
  },

  // Confirm and execute import
  confirmImport(data) {
    try {
      // Import automations
      if (data.automations) {
        localStorage.setItem('automations', JSON.stringify(data.automations));
      }

      // Import favorites
      if (data.favorites) {
        localStorage.setItem('favorites', JSON.stringify(data.favorites));
        if (window.favoritesManager) {
          favoritesManager.favorites = data.favorites;
          favoritesManager.updateUI();
        }
      }

      // Import settings (except API key)
      if (data.settings?.theme) {
        localStorage.setItem('theme', data.settings.theme);
        if (window.themeManager) {
          themeManager.apply(data.settings.theme);
        }
      }

      closeModal();
      showToast('Import Complete', 'Data restored successfully', 'success');

      // Reload page to apply changes
      setTimeout(() => location.reload(), 1500);
    } catch (error) {
      console.error('Import error:', error);
      showToast('Import Failed', 'Could not restore data', 'error');
    }
  },

  // Show export/import modal
  showExportImportModal() {
    const modalContainer = document.getElementById('modalContainer');
    if (!modalContainer) {
      return;
    }

    modalContainer.innerHTML = `
      <div class="modal-overlay active" onclick="closeModal(event)">
        <div class="modal animate-slide-up" onclick="event.stopPropagation()" style="max-width: 650px; padding: 0; overflow: hidden;">
          <div class="modal-header" style="background: rgba(0,0,0,0.1); padding: var(--space-6);">
            <h2 class="modal-title" style="font-family: var(--font-family-display); font-size: 16px; letter-spacing: 1px;">💾 KERNEL_DATA_ARCHIVE</h2>
            <button class="modal-close" onclick="closeModal()">×</button>
          </div>
          <div class="modal-body">
            <div class="glass-card" style="margin-bottom: var(--space-4); cursor: pointer;" onclick="exportImportManager.exportAutomations()">
              <div style="display: flex; align-items: center; gap: var(--space-3); padding: var(--space-4);">
                <div style="font-size: 3rem;">📤</div>
                <div style="flex: 1;">
                  <h4 style="margin-bottom: var(--space-1); color: var(--text-primary);">Export Backup</h4>
                  <p style="color: var(--text-secondary); font-size: var(--font-size-sm);">
                    Download your automations, favorites, and settings as a JSON file
                  </p>
                </div>
                <span style="color: var(--color-accent-400);">→</span>
              </div>
            </div>

            <div class="glass-card" style="cursor: pointer;" onclick="exportImportManager.importAutomations()">
              <div style="display: flex; align-items: center; gap: var(--space-3); padding: var(--space-4);">
                <div style="font-size: 3rem;">📥</div>
                <div style="flex: 1;">
                  <h4 style="margin-bottom: var(--space-1); color: var(--text-primary);">Import Backup</h4>
                  <p style="color: var(--text-secondary); font-size: var(--font-size-sm);">
                    Restore your data from a previously exported backup file
                  </p>
                </div>
                <span style="color: var(--color-accent-400);">→</span>
              </div>
            </div>

            <div style="margin-top: var(--space-4); padding: var(--space-3); background: var(--bg-secondary); border-radius: var(--radius-lg); border-left: 4px solid var(--color-accent-500);">
              <strong style="color: var(--text-primary);">💡 Tip</strong>
              <p style="margin-top: var(--space-2); color: var(--text-secondary); font-size: var(--font-size-sm);">
                Export your data regularly to keep a backup. Share backup files with other devices or users.
              </p>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-glass" onclick="closeModal()">Close</button>
          </div>
        </div>
      </div>
    `;
  },
};

// Export for global access
window.exportImportManager = exportImportManager;

/**
 * Export/Import Manager
 * Save and share automation workflows
 */

const exportImportManager = {

    // Export automations to JSON file
    exportAutomations() {
        const automations = JSON.parse(localStorage.getItem('automations') || '[]');
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        const settings = {
            theme: localStorage.getItem('theme') || 'dark',
            openai_api_key: '***REDACTED***' // Never export API keys
        };

        const exportData = {
            version: '2.2.0',
            exportDate: new Date().toISOString(),
            automations: automations,
            favorites: favorites,
            settings: settings
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
            if (!file) return;

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
        if (!modalContainer) return;

        const automationsCount = data.automations?.length || 0;
        const favoritesCount = data.favorites?.length || 0;

        modalContainer.innerHTML = `
      <div class="modal-overlay active" onclick="closeModal(event)">
        <div class="modal" onclick="event.stopPropagation()">
          <div class="modal-header">
            <h2 class="modal-title">📥 Import Backup</h2>
            <button class="modal-close" onclick="closeModal()">&times;</button>
          </div>
          <div class="modal-body">
            <div class="glass-card" style="margin-bottom: var(--space-4);">
              <h4 style="margin-bottom: var(--space-3); color: var(--text-primary);">Backup Details</h4>
              <div style="display: grid; gap: var(--space-2);">
                <div style="display: flex; justify-content: space-between; padding: var(--space-2); background: var(--bg-tertiary); border-radius: var(--radius-md);">
                  <span>Version</span>
                  <span style="font-weight: bold;">${data.version}</span>
                </div>
                <div style="display: flex; justify-content: space-between; padding: var(--space-2); background: var(--bg-tertiary); border-radius: var(--radius-md);">
                  <span>Export Date</span>
                  <span style="font-weight: bold;">${new Date(data.exportDate).toLocaleDateString()}</span>
                </div>
                <div style="display: flex; justify-content: space-between; padding: var(--space-2); background: var(--bg-tertiary); border-radius: var(--radius-md);">
                  <span>Automations</span>
                  <span style="font-weight: bold;">${automationsCount}</span>
                </div>
                <div style="display: flex; justify-content: space-between; padding: var(--space-2); background: var(--bg-tertiary); border-radius: var(--radius-md);">
                  <span>Favorites</span>
                  <span style="font-weight: bold;">${favoritesCount}</span>
                </div>
              </div>
            </div>

            <div style="padding: var(--space-3); background: var(--bg-secondary); border-radius: var(--radius-lg); border-left: 4px solid var(--color-warning-500);">
              <strong style="color: var(--color-warning-400);">⚠️ Warning</strong>
              <p style="margin-top: var(--space-2); color: var(--text-secondary);">
                This will replace your current automations and favorites. Your existing data will be lost.
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
        if (!modalContainer) return;

        modalContainer.innerHTML = `
      <div class="modal-overlay active" onclick="closeModal(event)">
        <div class="modal" onclick="event.stopPropagation()">
          <div class="modal-header">
            <h2 class="modal-title">💾 Backup & Restore</h2>
            <button class="modal-close" onclick="closeModal()">&times;</button>
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
    }
};

// Export for global access
window.exportImportManager = exportImportManager;

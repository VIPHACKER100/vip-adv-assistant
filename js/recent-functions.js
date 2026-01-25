/**
 * VIP AI SYMPHONY - Execution History v6.0
 * Persistent Tracking of Neural Module Invocations
 */

const recentFunctionsManager = {
  maxHistory: 10,
  history: JSON.parse(localStorage.getItem('recentFunctions') || '[]'),

  add(functionId, functionTitle) {
    // Remove if already exists
    this.history = this.history.filter(item => item.id !== functionId);

    // Add to beginning
    this.history.unshift({
      id: functionId,
      title: functionTitle,
      timestamp: Date.now(),
      count: this.getExecutionCount(functionId) + 1
    });

    // Keep only max items
    if (this.history.length > this.maxHistory) {
      this.history = this.history.slice(0, this.maxHistory);
    }

    this.save();
  },

  getExecutionCount(functionId) {
    const item = this.history.find(h => h.id === functionId);
    return item ? item.count : 0;
  },

  save() {
    localStorage.setItem('recentFunctions', JSON.stringify(this.history));
  },

  clear() {
    this.history = [];
    this.save();
    showToast('History Cleared', 'Recent functions cleared', 'success');
  },

  showHistoryModal() {
    const modalContainer = document.getElementById('modalContainer');
    if (!modalContainer) return;

    const categories = getFunctionCategories();
    const enrichedHistory = this.history.map(item => {
      // Find full function details
      for (const category of categories) {
        const func = category.functions.find(f => f.id === item.id);
        if (func) {
          return {
            ...item,
            icon: func.icon,
            description: func.description,
            category: category.name,
            categoryIcon: category.icon
          };
        }
      }
      return item;
    });

    modalContainer.innerHTML = `
      <div class="modal-overlay active" onclick="closeModal(event)">
        <div class="modal animate-slide-up" onclick="event.stopPropagation()" style="max-width: 720px; padding: 0; overflow: hidden;">
          <div class="modal-header" style="background: rgba(0,0,0,0.1); padding: var(--space-6);">
            <h2 class="modal-title" style="font-family: var(--font-family-display); font-size: 16px; letter-spacing: 1px;">🕒 KERNEL_EXECUTION_HISTORY</h2>
            <button class="modal-close" onclick="closeModal()">×</button>
          </div>
          <div class="modal-body">
            ${enrichedHistory.length === 0 ? `
              <div style="text-align: center; padding: var(--space-10); color: var(--text-tertiary);">
                <div style="font-size: 3rem; margin-bottom: var(--space-4); opacity: 0.3;">🕒</div>
                <h3 style="margin-bottom: var(--space-2); color: var(--text-primary); font-family: var(--font-family-display); letter-spacing: 1px;">HISTORY_BUFFER_EMPTY</h3>
                <p style="font-size: 13px;">Execution cycles will be logged here for immediate neural recall.</p>
              </div>
            ` : `
              <div style="display: grid; gap: var(--space-3);">
                ${enrichedHistory.map((item, index) => `
                  <div class="glass-card-subtle flex-between hover-lift" style="cursor: pointer; padding: var(--space-4);" onclick="executeFunction('${item.id}'); closeModal();">
                    <div style="display: flex; align-items: center; gap: var(--space-4);">
                      <div style="font-size: 24px;">${item.icon || '📦'}</div>
                      <div>
                        <div style="font-weight: 800; color: var(--text-primary); font-size: 14px; letter-spacing: 0.5px;">${item.title.toUpperCase()}</div>
                        <div style="font-size: 10px; color: var(--text-tertiary); margin-top: 4px; font-family: var(--font-family-mono);">
                          VIA: ${item.category?.toUpperCase() || 'UNKNOWN'} • ${this.getTimeAgo(item.timestamp).toUpperCase()}
                        </div>
                      </div>
                    </div>
                    <div style="text-align: right;">
                        <span class="badge badge-accent" style="font-family: var(--font-family-mono); font-size: 10px;">${item.count}x_RUN</span>
                    </div>
                  </div>
                `).join('')}
              </div>
              
              <div style="margin-top: var(--space-4); padding: var(--space-3); background: var(--bg-secondary); border-radius: var(--radius-lg); border-left: 4px solid var(--color-accent-500);">
                <strong style="color: var(--text-primary);">💡 Tip</strong>
                <p style="margin-top: var(--space-2); color: var(--text-secondary); font-size: var(--font-size-sm);">
                  Click any function to execute it instantly. The number shows how many times you've used it.
                </p>
              </div>
            `}
          </div>
          <div class="modal-footer">
            ${enrichedHistory.length > 0 ? `
              <button class="btn btn-glass" onclick="recentFunctionsManager.clear(); recentFunctionsManager.showHistoryModal();">
                Clear History
              </button>
            ` : ''}
            <button class="btn btn-primary" onclick="closeModal()">Close</button>
          </div>
        </div>
      </div>
    `;
  },

  getTimeAgo(timestamp) {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);

    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  },

  getMostUsed(limit = 5) {
    return [...this.history]
      .sort((a, b) => b.count - a.count)
      .slice(0, limit);
  }
};

// Export for global access
window.recentFunctionsManager = recentFunctionsManager;

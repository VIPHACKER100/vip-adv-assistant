/**
 * VIP AI SYMPHONY - Execution History v7.0
 * Persistent Tracking of Neural Module Invocations
 * Optimized for "NEURAL FLUX" visuals
 */

const recentFunctionsManager = {
  maxHistory: 12,
  history: JSON.parse(localStorage.getItem('recentFunctions') || '[]'),

  add(id, title) {
    this.history = this.history.filter(item => item.id !== id);
    this.history.unshift({
      id,
      title,
      timestamp: Date.now(),
      count: (this.history.find(h => h.id === id)?.count || 0) + 1
    });

    if (this.history.length > this.maxHistory) this.history.pop();
    this.save();
  },

  save() {
    localStorage.setItem('recentFunctions', JSON.stringify(this.history));
  },

  clear() {
    this.history = [];
    this.save();
    if (window.showToast) window.showToast('Buffer Purged', 'Execution history cleared.', 'success');
  },

  showHistoryModal() {
    const modalContainer = document.getElementById('modalContainer');
    if (!modalContainer) return;

    if (typeof getFunctionCategories !== 'function') return;
    const cats = getFunctionCategories();

    const enriched = this.history.map(item => {
      for (const cat of cats) {
        const f = cat.functions.find(func => func.id === item.id);
        if (f) return { ...item, ...f, catName: cat.name, catIcon: cat.icon };
      }
      return item;
    });

    modalContainer.innerHTML = `
      <div class="modal-overlay active" onclick="closeModal(event)">
        <div class="modal animate-slide-up" onclick="event.stopPropagation()" style="max-width: 600px; padding: 0;">
          <div class="modal-header" style="padding: var(--s6);">
            <h2 class="modal-title" style="font-size: 1.1rem; letter-spacing: 2px;">🕒 EXECUTION_LOGS_v7</h2>
            <button class="modal-close" onclick="closeModal()">×</button>
          </div>
          <div class="modal-body" style="padding: var(--s6); max-height: 60vh; overflow-y: auto;">
            ${enriched.length === 0 ? `
              <div style="text-align: center; padding: 40px; opacity: 0.3;">
                <div style="font-size: 3rem;">🕒</div>
                <div style="font-size: 10px; font-family: var(--font-family-mono); margin-top: 12px;">BUFFER_EMPTY: NO_PRIOR_EXECUTIONS</div>
              </div>
            ` : `
              <div style="display: grid; gap: 12px;">
                ${enriched.map(item => `
                  <div class="neural-glass" style="padding: var(--s4); display: flex; justify-content: space-between; align-items: center; cursor: pointer;" onclick="executeFunction('${item.id}'); closeModal();">
                     <div style="display: flex; gap: 16px; align-items: center;">
                        <div class="card-icon" style="width: 40px; height: 40px; font-size: 1.2rem; margin: 0;">${item.icon || '🛸'}</div>
                        <div>
                           <div style="font-weight: 800; font-size: 14px; color: var(--text-main);">${item.title.toUpperCase()}</div>
                           <div style="font-size: 9px; color: var(--color-primary); font-family: var(--font-family-mono); opacity: 0.7;">
                              ${item.catIcon || '⚙️'} ${item.catName?.toUpperCase() || 'SYSTEM'} • ${this.formatTime(item.timestamp)}
                           </div>
                        </div>
                     </div>
                     <div class="badge badge-accent" style="font-size: 10px; font-family: var(--font-family-mono);">0x${item.count.toString(16).toUpperCase()}</div>
                  </div>
                `).join('')}
              </div>
            `}
          </div>
          <div class="modal-footer" style="padding: var(--s6); gap: 12px;">
            <button class="btn-neural-glass" style="flex: 1;" onclick="recentFunctionsManager.clear(); closeModal();">PURGE_LOGS</button>
            <button class="btn-neural-primary" style="flex: 1;" onclick="closeModal()">DISMISS</button>
          </div>
        </div>
      </div>
    `;
  },

  formatTime(ts) {
    const diff = Math.floor((Date.now() - ts) / 1000 / 60);
    if (diff < 1) return 'JUST_NOW';
    if (diff < 60) return `${diff}M_AGO`;
    if (diff < 1440) return `${Math.floor(diff / 60)}H_AGO`;
    return new Date(ts).toLocaleDateString();
  },

  init() {
    console.log('🕒 EXECUTION_LOGS_7.0_READY');
  }
};

window.recentFunctionsManager = recentFunctionsManager;

/**
 * VIP AI SYMPHONY - Omni-Search v6.0
 * Strategic Sub-modular Matching & Neural Query Engine
 */

const omniSearch = {
  isOpen: false,
  results: [],
  selectedIndex: 0,
  history: JSON.parse(localStorage.getItem('search_history') || '[]'),

  open() {
    this.isOpen = true;
    const modalContainer = document.getElementById('modalContainer');
    if (!modalContainer) return;

    modalContainer.innerHTML = `
            <div class="modal-overlay active" onclick="omniSearch.close(event)">
                <div class="modal spotlight-modal" onclick="event.stopPropagation()">
                    <div class="spotlight-header" style="background: rgba(0,0,0,0.1); border-bottom: 2px solid var(--glass-border);">
                        <span style="font-size: 20px; color: var(--color-accent-400);">◈</span>
                        <input type="text" id="omniInput" class="spotlight-input" placeholder="ENTER_NEURAL_COMMAND_OR_MODULE_QUERY..." autocomplete="off" style="font-family: var(--font-family-mono); letter-spacing: 0.5px;">
                        <div class="spotlight-shortcut" style="font-size: 10px; opacity: 0.5;">ESC_TERMINATE</div>
                    </div>
                    <div class="spotlight-body" id="omniResults">
                        ${this.renderInitialState()}
                    </div>
                    <div class="spotlight-footer">
                        <div class="footer-hint"><span>↵</span> to execute</div>
                        <div class="footer-hint"><span>↑↓</span> to navigate</div>
                    </div>
                </div>
            </div>
        `;

    const input = document.getElementById('omniInput');
    input.focus();
    input.addEventListener('input', (e) => this.performSearch(e.target.value));
    input.addEventListener('keydown', (e) => this.handleKeydown(e));
  },

  close(e) {
    if (e && e.target.classList.contains('modal-overlay') === false && e.type !== 'keydown') return;
    this.isOpen = false;
    closeModal();
  },

  renderInitialState() {
    // Show recent actions or common functions
    const recent = recentFunctionsManager.history.slice(0, 3);
    const favorites = favoritesManager.favorites.slice(0, 3);

    return `
            <div class="spotlight-section">
                <div class="section-label" style="color: var(--color-accent-400); letter-spacing: 2px;">PERSISTENT_NODES</div>
                ${recent.map((f, i) => this.renderResultItem(f, i, 'HIST_BUFFER')).join('')}
                
                <div class="section-label" style="margin-top: 24px; color: var(--color-accent-400); letter-spacing: 2px;">PRIORITY_LINKS</div>
                ${favorites.map((f, i) => this.renderResultItem(f, i + recent.length, 'CORE_LINK')).join('')}
            </div>
        `;
  },

  renderResultItem(item, index, type) {
    const isSelected = index === this.selectedIndex;
    return `
            <div class="spotlight-item ${isSelected ? 'selected' : ''}" onclick="omniSearch.execute('${item.id || item}')">
                <div class="item-icon">${item.icon || '📋'}</div>
                <div class="item-info">
                    <div class="item-title" style="font-weight: 800; letter-spacing: 0.5px;">${(item.title || item).toUpperCase()}</div>
                    <div class="item-meta" style="font-family: var(--font-family-mono); font-size: 8px;">[${type.toUpperCase()}]</div>
                </div>
                ${isSelected ? '<div class="item-hint badge badge-accent" style="font-size: 9px;">SYNC_RUN ↵</div>' : ''}
            </div>
        `;
  },

  performSearch(query) {
    if (!query.trim()) {
      document.getElementById('omniResults').innerHTML = this.renderInitialState();
      return;
    }

    const categories = getFunctionCategories();
    const all = categories.flatMap(c => c.functions.map(f => ({ ...f, category: c.name })));

    const results = all.filter(f =>
      f.title.toLowerCase().includes(query.toLowerCase()) ||
      f.description.toLowerCase().includes(query.toLowerCase()) ||
      f.category.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 8);

    this.results = results;
    this.selectedIndex = 0;
    this.renderResults();

    // Track search telemetry
    if (window.performanceMonitor) window.performanceMonitor.trackSearch();
  },

  renderResults() {
    const container = document.getElementById('omniResults');
    if (this.results.length === 0) {
      container.innerHTML = `<div style="padding: 40px; text-align: center; opacity: 0.5;">No matches found.</div>`;
      return;
    }

    container.innerHTML = `
            <div class="spotlight-section">
                <div class="section-label" style="color: var(--color-accent-400); letter-spacing: 2px;">SYMPHONY_MATCHES [0x${this.results.length.toString(16)}]</div>
                ${this.results.map((f, i) => `
                    <div class="spotlight-item ${i === this.selectedIndex ? 'selected' : ''}" onclick="omniSearch.execute('${f.id}')">
                        <div class="item-icon">${f.icon}</div>
                        <div class="item-info">
                            <div class="item-title" style="font-weight: 800;">${f.title.toUpperCase()}</div>
                            <div class="item-meta" style="font-size: 9px; opacity: 0.6;">SUBSYSTEM: ${f.category.toUpperCase()}</div>
                        </div>
                        <div class="item-hint">${f.badge ? `<span class="badge badge-primary" style="font-size: 8px;">${f.badge.toUpperCase()}</span>` : ''}</div>
                    </div>
                `).join('')}
            </div>
        `;
  },

  handleKeydown(e) {
    const count = this.results.length || (recentFunctionsManager.history.length + favoritesManager.favorites.length);

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      this.selectedIndex = (this.selectedIndex + 1) % count;
      this.refreshView();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      this.selectedIndex = (this.selectedIndex - 1 + count) % count;
      this.refreshView();
    } else if (e.key === 'Enter') {
      const item = this.results[this.selectedIndex] || [...recentFunctionsManager.history, ...favoritesManager.favorites][this.selectedIndex];
      if (item) this.execute(item.id || item);
    } else if (e.key === 'Escape') {
      this.close();
    }
  },

  refreshView() {
    const query = document.getElementById('omniInput').value;
    if (query) this.renderResults();
    else document.getElementById('omniResults').innerHTML = this.renderInitialState();
  },

  execute(id) {
    executeFunction(id);
    this.close();
  }
};

// Export for global access
window.openSearch = () => omniSearch.open();
window.closeSearch = (e) => omniSearch.close(e);
window.performSearch = (q) => omniSearch.performSearch(q);
window.omniSearch = omniSearch;

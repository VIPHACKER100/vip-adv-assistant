/**
 * VIP AI SYMPHONY - Omni-Search v7.0
 * Strategic Sub-modular Matching & Neural Query Engine
 * Optimized for "NEURAL FLUX" spotlight interaction
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
        <div class="spotlight-modal animate-fade-in-down" onclick="event.stopPropagation()">
            <div class="spotlight-header">
                <span class="spotlight-pulse">◈</span>
                <input type="text" id="omniInput" class="spotlight-input" placeholder="SEARCH_NEURAL_NODES..." autocomplete="off">
                <div class="spotlight-shortcut">ESC_TERMINATE</div>
            </div>
            <div class="spotlight-body" id="omniResults">
                ${this.renderInitialState()}
            </div>
            <div class="spotlight-footer">
                <div class="footer-hint"><span>↵</span> EXECUTE</div>
                <div class="footer-hint"><span>↑↓</span> NAVIGATE</div>
                <div style="flex:1"></div>
                <div class="footer-hint" style="opacity:0.5; font-size:9px">PROTOCOL_V7_ACTIVE</div>
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
    if (e && e.target && !e.target.classList.contains('modal-overlay') && e.type !== 'keydown') return;
    this.isOpen = false;
    if (window.closeModal) window.closeModal();
  },

  renderInitialState() {
    const recent = (window.recentFunctionsManager?.history || []).slice(0, 3);
    const favorites = (window.favoritesManager?.favorites || []).slice(0, 3);

    return `
      <div class="spotlight-section">
          <div class="section-label">RECENT_TELEMETRY</div>
          ${recent.length ? recent.map((f, i) => this.renderResultItem(f, i, 'HIST_BUFFER')).join('') : '<div style="padding:16px; font-size:10px; opacity:0.3">NO_RECENT_NODES</div>'}
          
          <div class="section-label" style="margin-top: 16px;">PRIORITY_LINKS</div>
          ${favorites.length ? favorites.map((f, i) => this.renderResultItem(f, i + recent.length, 'CORE_LINK')).join('') : '<div style="padding:16px; font-size:10px; opacity:0.3">NO_FAVORITES_DEFINED</div>'}
      </div>
    `;
  },

  renderResultItem(item, index, type) {
    const f = typeof item === 'string' ? window.FunctionRegistry?.findFunctionDetails(item) || { id: item, title: item, icon: '📋' } : item;
    const isSelected = index === this.selectedIndex;
    return `
      <div class="spotlight-item ${isSelected ? 'selected' : ''}" onclick="omniSearch.execute('${f.id}')">
          <div class="item-icon">${f.icon || '📋'}</div>
          <div class="item-info">
              <div class="item-title">${f.title.toUpperCase()}</div>
              <div class="item-meta">[${type}] ${f.category ? ':: ' + f.category.toUpperCase() : ''}</div>
          </div>
          ${isSelected ? '<div class="item-hint badge badge-primary">EXECUTE ↵</div>' : ''}
      </div>
    `;
  },

  performSearch(query) {
    if (!query.trim()) {
      document.getElementById('omniResults').innerHTML = this.renderInitialState();
      return;
    }

    if (typeof getFunctionCategories !== 'function') return;
    const all = getFunctionCategories().flatMap(c => c.functions.map(f => ({ ...f, category: c.name })));
    const results = all.filter(f =>
      f.title.toLowerCase().includes(query.toLowerCase()) ||
      f.description.toLowerCase().includes(query.toLowerCase()) ||
      f.category.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 8);

    this.results = results;
    this.selectedIndex = 0;
    this.renderResults();

    if (window.performanceMonitor) window.performanceMonitor.trackSearch();
  },

  renderResults() {
    const container = document.getElementById('omniResults');
    if (this.results.length === 0) {
      container.innerHTML = `<div style="padding: 40px; text-align: center; opacity: 0.5; font-family: var(--font-family-mono); font-size: 11px;">NO_NEURAL_MATCHES_FOUND</div>`;
      return;
    }

    container.innerHTML = `
      <div class="spotlight-section">
          <div class="section-label">NEURAL_MATCHES [0x${this.results.length.toString(16).toUpperCase()}]</div>
          ${this.results.map((f, i) => `
            <div class="spotlight-item ${i === this.selectedIndex ? 'selected' : ''}" onclick="omniSearch.execute('${f.id}')">
                <div class="item-icon">${f.icon}</div>
                <div class="item-info">
                    <div class="item-title">${f.title.toUpperCase()}</div>
                    <div class="item-meta">NODE: ${f.category.toUpperCase()}</div>
                </div>
                ${f.badge ? `<div class="item-hint badge badge-primary">${f.badge.toUpperCase()}</div>` : ''}
            </div>
          `).join('')}
      </div>
    `;
  },

  handleKeydown(e) {
    const count = this.results.length || (window.recentFunctionsManager?.history.length || 0) + (window.favoritesManager?.favorites.length || 0);

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      this.selectedIndex = (this.selectedIndex + 1) % count;
      this.refreshView();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      this.selectedIndex = (this.selectedIndex - 1 + count) % count;
      this.refreshView();
    } else if (e.key === 'Enter') {
      const item = this.results[this.selectedIndex] || [...(window.recentFunctionsManager?.history || []), ...(window.favoritesManager?.favorites || [])][this.selectedIndex];
      if (item) this.execute(item.id || item);
    } else if (e.key === 'Escape') {
      this.close();
    }
  },

  refreshView() {
    const query = document.getElementById('omniInput')?.value;
    if (query) this.renderResults();
    else document.getElementById('omniResults').innerHTML = this.renderInitialState();
  },

  execute(id) {
    if (window.executeFunction) window.executeFunction(id);
    this.close();
  }
};

window.omniSearch = omniSearch;
window.openSearch = () => omniSearch.open();

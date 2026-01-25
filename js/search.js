/**
 * Search Functionality
 * Quick function search with fuzzy matching
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
                    <div class="spotlight-header">
                        <span style="font-size: 20px; opacity: 0.6;">🔍</span>
                        <input type="text" id="omniInput" class="spotlight-input" placeholder="Search functions, history, or AI commands..." autocomplete="off">
                        <div class="spotlight-shortcut">ESC to close</div>
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
                <div class="section-label">Recently Used</div>
                ${recent.map((f, i) => this.renderResultItem(f, i, 'recent')).join('')}
                
                <div class="section-label" style="margin-top: 20px;">Your Favorites</div>
                ${favorites.map((f, i) => this.renderResultItem(f, i + recent.length, 'favorite')).join('')}
            </div>
        `;
  },

  renderResultItem(item, index, type) {
    const isSelected = index === this.selectedIndex;
    return `
            <div class="spotlight-item ${isSelected ? 'selected' : ''}" onclick="omniSearch.execute('${item.id || item}')">
                <div class="item-icon">${item.icon || '📋'}</div>
                <div class="item-info">
                    <div class="item-title">${item.title || item}</div>
                    <div class="item-meta">${type.toUpperCase()}</div>
                </div>
                ${isSelected ? '<div class="item-hint">GO ↵</div>' : ''}
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
  },

  renderResults() {
    const container = document.getElementById('omniResults');
    if (this.results.length === 0) {
      container.innerHTML = `<div style="padding: 40px; text-align: center; opacity: 0.5;">No matches found.</div>`;
      return;
    }

    container.innerHTML = `
            <div class="spotlight-section">
                <div class="section-label">Search Results (${this.results.length})</div>
                ${this.results.map((f, i) => `
                    <div class="spotlight-item ${i === this.selectedIndex ? 'selected' : ''}" onclick="omniSearch.execute('${f.id}')">
                        <div class="item-icon">${f.icon}</div>
                        <div class="item-info">
                            <div class="item-title">${f.title}</div>
                            <div class="item-meta">${f.category}</div>
                        </div>
                        <div class="item-hint">${f.badge || ''}</div>
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

// Aliases for compatibility
window.openSearch = () => omniSearch.open();
window.omniSearch = omniSearch;

// Handle keyboard navigation in search
function handleSearchKeydown(e) {
  if (!searchState.results.length) return;

  switch (e.key) {
    case 'ArrowDown':
      e.preventDefault();
      searchState.selectedIndex = Math.min(searchState.selectedIndex + 1, searchState.results.length - 1);
      performSearch(e.target.value);
      break;
    case 'ArrowUp':
      e.preventDefault();
      searchState.selectedIndex = Math.max(searchState.selectedIndex - 1, 0);
      performSearch(e.target.value);
      break;
    case 'Enter':
      e.preventDefault();
      if (searchState.results[searchState.selectedIndex]) {
        executeFunction(searchState.results[searchState.selectedIndex].id);
        closeSearch();
      }
      break;
    case 'Escape':
      e.preventDefault();
      closeSearch();
      break;
  }
}

// Export for global access
window.openSearch = openSearch;
window.closeSearch = closeSearch;
window.performSearch = performSearch;

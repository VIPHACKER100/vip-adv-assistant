/**
 * Search Functionality
 * Quick function search with fuzzy matching
 */

let searchState = {
  isOpen: false,
  results: [],
  selectedIndex: 0
};

// Open search modal
function openSearch() {
  searchState.isOpen = true;
  const modalContainer = document.getElementById('modalContainer');
  if (!modalContainer) return;

  modalContainer.innerHTML = `
    <div class="modal-overlay active" onclick="closeSearch(event)">
      <div class="modal" onclick="event.stopPropagation()" style="max-width: 700px; margin-top: 10vh;">
        <div class="modal-header" style="border-bottom: none; padding-bottom: 0;">
          <div style="flex: 1;">
            <input 
              type="text" 
              id="searchInput" 
              class="input" 
              placeholder="Search functions... (type to filter)"
              style="font-size: var(--font-size-lg); padding: var(--space-3);"
              oninput="performSearch(this.value)"
              autofocus
            >
          </div>
          <button class="modal-close" onclick="closeSearch()">&times;</button>
        </div>
        <div class="modal-body" id="searchResults" style="max-height: 60vh; overflow-y: auto;">
          <div style="text-align: center; padding: var(--space-8); color: var(--text-tertiary);">
            <div style="font-size: 3rem; margin-bottom: var(--space-3);">\uD83D\uDD0D</div>
            <p>Start typing to search through 65+ functions...</p>
          </div>
        </div>
      </div>
    </div>
  `;

  // Add keyboard navigation
  document.getElementById('searchInput').addEventListener('keydown', handleSearchKeydown);
}

// Close search
function closeSearch(event) {
  if (event && event.target !== event.currentTarget) return;
  searchState.isOpen = false;
  closeModal();
}

// Perform search with fuzzy matching
function performSearch(query) {
  if (!query.trim()) {
    document.getElementById('searchResults').innerHTML = `
      <div style="text-align: center; padding: var(--space-8); color: var(--text-tertiary);">
        <div style="font-size: 3rem; margin-bottom: var(--space-3);">\uD83D\uDD0D</div>
        <p>Start typing to search through 65+ functions...</p>
      </div>
    `;
    return;
  }

  const categories = getFunctionCategories();
  const allFunctions = [];

  // Flatten all functions
  categories.forEach(category => {
    category.functions.forEach(func => {
      allFunctions.push({
        ...func,
        category: category.name,
        categoryIcon: category.icon
      });
    });
  });

  // Fuzzy search
  const results = allFunctions.filter(func => {
    const searchText = `${func.title} ${func.description} ${func.category}`.toLowerCase();
    const queryLower = query.toLowerCase();
    return searchText.includes(queryLower);
  });

  searchState.results = results;
  searchState.selectedIndex = 0;

  // Display results
  const resultsContainer = document.getElementById('searchResults');

  if (results.length === 0) {
    resultsContainer.innerHTML = `
      <div style="text-align: center; padding: var(--space-8); color: var(--text-tertiary);">
        <div style="font-size: 3rem; margin-bottom: var(--space-3);">\uD83D\uDE15</div>
        <p>No functions found for "${query}"</p>
      </div>
    `;
    return;
  }

  resultsContainer.innerHTML = `
    <div style="padding: var(--space-2); color: var(--text-tertiary); font-size: var(--font-size-sm);">
      Found ${results.length} function${results.length !== 1 ? 's' : ''}
    </div>
    ${results.map((func, index) => `
      <div 
        class="search-result-item ${index === searchState.selectedIndex ? 'selected' : ''}" 
        onclick="executeFunction('${func.id}'); closeSearch();"
        data-index="${index}"
        style="
          padding: var(--space-3);
          margin: var(--space-2);
          background: ${index === searchState.selectedIndex ? 'var(--glass-bg-strong)' : 'var(--glass-bg)'};
          border: 1px solid ${index === searchState.selectedIndex ? 'var(--color-accent-500)' : 'var(--glass-border)'};
          border-radius: var(--radius-lg);
          cursor: pointer;
          transition: all 0.2s ease;
        "
        onmouseover="this.style.background='var(--glass-bg-strong)'; this.style.borderColor='var(--color-accent-500)';"
        onmouseout="if(${index} !== searchState.selectedIndex) { this.style.background='var(--glass-bg)'; this.style.borderColor='var(--glass-border)'; }"
      >
        <div style="display: flex; align-items: center; gap: var(--space-3); margin-bottom: var(--space-2);">
          <span style="font-size: var(--font-size-2xl);">${func.icon}</span>
          <div style="flex: 1;">
            <div style="font-weight: var(--font-weight-semibold); color: var(--text-primary);">${func.title}</div>
            <div style="font-size: var(--font-size-xs); color: var(--text-tertiary); margin-top: var(--space-1);">
              ${func.categoryIcon} ${func.category}
            </div>
          </div>
          ${func.badge ? `<span class="badge badge-${func.badgeType || 'accent'}">${func.badge}</span>` : ''}
        </div>
        <div style="font-size: var(--font-size-sm); color: var(--text-secondary);">
          ${func.description}
        </div>
      </div>
    `).join('')}
  `;
}

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

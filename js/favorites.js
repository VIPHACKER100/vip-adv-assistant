/**
 * VIP AI SYMPHONY - Priority Registry v6.0
 * Selective Sub-modular Bookmark & Priority Link Manager
 */

const favoritesManager = {
  favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),

  add(functionId) {
    if (!this.favorites.includes(functionId)) {
      this.favorites.push(functionId);
      this.save();
      showToast('Favorites', 'Added to favorites', 'success');
      this.updateUI();

      // Track telemetry
      if (window.performanceMonitor) window.performanceMonitor.trackFavorite();
    }
  },

  remove(functionId) {
    this.favorites = this.favorites.filter(id => id !== functionId);
    this.save();
    showToast('Favorites', 'Removed from favorites', 'info');
    this.updateUI();
  },

  toggle(functionId) {
    if (this.isFavorite(functionId)) {
      this.remove(functionId);
    } else {
      this.add(functionId);
    }
  },

  isFavorite(functionId) {
    return this.favorites.includes(functionId);
  },

  save() {
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  },

  getFavorites() {
    const categories = getFunctionCategories();
    const allFunctions = [];

    categories.forEach(category => {
      category.functions.forEach(func => {
        if (this.favorites.includes(func.id)) {
          allFunctions.push({
            ...func,
            category: category.name,
            categoryIcon: category.icon
          });
        }
      });
    });

    return allFunctions;
  },

  showFavoritesModal() {
    const modalContainer = document.getElementById('modalContainer');
    if (!modalContainer) return;

    const favorites = this.getFavorites();

    modalContainer.innerHTML = `
      <div class="modal-overlay active" onclick="closeModal(event)">
        <div class="modal animate-slide-up" onclick="event.stopPropagation()" style="max-width: 720px; padding: 0; overflow: hidden;">
          <div class="modal-header" style="background: rgba(0,0,0,0.1); padding: var(--space-6);">
            <h2 class="modal-title" style="font-family: var(--font-family-display); font-size: 16px; letter-spacing: 1px;">⭐ SYMPHONY_PRIORITY_LINKS</h2>
            <button class="modal-close" onclick="closeModal()">×</button>
          </div>
          <div class="modal-body">
            ${favorites.length === 0 ? `
              <div style="text-align: center; padding: var(--space-10); color: var(--text-tertiary);">
                <div style="font-size: 3rem; margin-bottom: var(--space-4); opacity: 0.3;">⭐</div>
                <h3 style="margin-bottom: var(--space-2); color: var(--text-primary); font-family: var(--font-family-display); letter-spacing: 1px;">BUFFER_EMPTY</h3>
                <p style="font-size: 13px;">Specify functions for immediate neural recall by tagging them with the priority star.</p>
              </div>
            ` : `
              <div style="display: grid; gap: var(--space-3);">
                ${favorites.map(func => `
                  <div class="glass-card-subtle flex-between hover-lift" style="cursor: pointer; padding: var(--space-4);" onclick="executeFunction('${func.id}')">
                    <div style="display: flex; align-items: center; gap: var(--space-4);">
                      <span style="font-size: 24px;">${func.icon}</span>
                      <div>
                        <div style="font-weight: 800; color: var(--text-primary); font-size: 14px; letter-spacing: 0.5px;">${func.title.toUpperCase()}</div>
                        <div style="font-size: 10px; color: var(--text-tertiary); margin-top: 4px; font-family: var(--font-family-mono);">
                          ${func.categoryIcon} LINK_SUB: ${func.category.toUpperCase()}
                        </div>
                      </div>
                    </div>
                    <button 
                      class="icon-btn" 
                      style="color: var(--color-accent-400);"
                      onclick="event.stopPropagation(); favoritesManager.remove('${func.id}'); favoritesManager.showFavoritesModal();"
                      title="TERMINATE_PRIORITY_LINK"
                    >
                      <span>⭐</span>
                    </button>
                  </div>
                `).join('')}
              </div>
            `}
          </div>
          <div class="modal-footer">
            <button class="btn btn-glass" onclick="closeModal()">Close</button>
          </div>
        </div>
      </div>
    `;
  },

  updateUI() {
    // Update favorite stars on function cards
    document.querySelectorAll('.function-card').forEach(card => {
      const functionId = card.dataset.function || card.getAttribute('onclick')?.match(/'([^']+)'/)?.[1];
      if (functionId) {
        const isFav = this.isFavorite(functionId);
        // Add star indicator if favorite
        let star = card.querySelector('.favorite-star');
        if (isFav && !star) {
          star = document.createElement('div');
          star.className = 'favorite-star';
          star.innerHTML = '⭐';
          star.style.cssText = 'position: absolute; top: 8px; right: 8px; font-size: 16px; opacity: 0.8;';
          card.style.position = 'relative';
          card.appendChild(star);
        } else if (!isFav && star) {
          star.remove();
        }
      }
    });
  },

  init() {
    this.updateUI();
  }
};

// Export for global access

window.favoritesManager = favoritesManager;

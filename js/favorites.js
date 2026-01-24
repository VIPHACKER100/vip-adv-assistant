/**
 * Favorites Manager
 * Bookmark frequently used functions
 */

const favoritesManager = {
    favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),

    add(functionId) {
        if (!this.favorites.includes(functionId)) {
            this.favorites.push(functionId);
            this.save();
            showToast('Favorites', 'Added to favorites', 'success');
            this.updateUI();
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
        <div class="modal" onclick="event.stopPropagation()" style="max-width: 700px;">
          <div class="modal-header">
            <h2 class="modal-title">⭐ Favorite Functions</h2>
            <button class="modal-close" onclick="closeModal()">&times;</button>
          </div>
          <div class="modal-body">
            ${favorites.length === 0 ? `
              <div style="text-align: center; padding: var(--space-8); color: var(--text-tertiary);">
                <div style="font-size: 4rem; margin-bottom: var(--space-4);">⭐</div>
                <h3 style="margin-bottom: var(--space-2); color: var(--text-primary);">No Favorites Yet</h3>
                <p>Click the star icon on any function card to add it to favorites.</p>
              </div>
            ` : `
              <div style="display: grid; gap: var(--space-3);">
                ${favorites.map(func => `
                  <div class="glass-card" style="padding: var(--space-3); cursor: pointer;" onclick="executeFunction('${func.id}')">
                    <div style="display: flex; align-items: center; gap: var(--space-3);">
                      <span style="font-size: var(--font-size-2xl);">${func.icon}</span>
                      <div style="flex: 1;">
                        <div style="font-weight: var(--font-weight-semibold); color: var(--text-primary);">${func.title}</div>
                        <div style="font-size: var(--font-size-xs); color: var(--text-tertiary); margin-top: var(--space-1);">
                          ${func.categoryIcon} ${func.category}
                        </div>
                      </div>
                      <button 
                        class="icon-btn" 
                        onclick="event.stopPropagation(); favoritesManager.remove('${func.id}'); favoritesManager.showFavoritesModal();"
                        title="Remove from favorites"
                      >
                        <span>⭐</span>
                      </button>
                    </div>
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
    }
};

// Export for global access
window.favoritesManager = favoritesManager;

/**
 * VIP AI SYMPHONY - Priority Registry v7.0
 * Selective Sub-modular Bookmark & Priority Link Manager
 * Optimized for "NEURAL FLUX" visuals
 */

const favoritesManager = {
  favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),

  add(id) {
    if (!this.favorites.includes(id)) {
      this.favorites.push(id);
      this.save();
      if (window.showToast) window.showToast('Priority Link', 'Module tagged for immediate recall.', 'success');
      this.updateUI();
      if (window.performanceMonitor) window.performanceMonitor.trackFavorite();
    }
  },

  remove(id) {
    this.favorites = this.favorites.filter(favId => favId !== id);
    this.save();
    if (window.showToast) window.showToast('Link Severed', 'Module removed from priority buffer.', 'info');
    this.updateUI();
  },

  toggle(id) {
    if (this.favorites.includes(id)) this.remove(id);
    else this.add(id);
  },

  save() {
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  },

  getFavorites() {
    if (typeof getFunctionCategories !== 'function') return [];
    const all = getFunctionCategories().flatMap(cat => cat.functions.map(f => ({ ...f, category: cat.name, catIcon: cat.icon })));
    return all.filter(f => this.favorites.includes(f.id));
  },

  showFavoritesModal() {
    const modalContainer = document.getElementById('modalContainer');
    if (!modalContainer) return;

    const favs = this.getFavorites();

    modalContainer.innerHTML = `
      <div class="modal-overlay active" onclick="closeModal(event)">
        <div class="modal animate-slide-up" onclick="event.stopPropagation()" style="max-width: 600px; padding: 0;">
          <div class="modal-header" style="padding: var(--s6);">
            <h2 class="modal-title" style="font-size: 1.1rem; letter-spacing: 2px;">⭐ PRIORITY_LINKS_v7</h2>
            <button class="modal-close" onclick="closeModal()">×</button>
          </div>
          <div class="modal-body" style="padding: var(--s6); max-height: 60vh; overflow-y: auto;">
            ${favs.length === 0 ? `
              <div style="text-align: center; padding: 40px; opacity: 0.3;">
                <div style="font-size: 3rem;">⭐</div>
                <div style="font-size: 10px; font-family: var(--font-family-mono); margin-top: 12px;">BUFFER_EMPTY: TAG_MODULES_FOR_RECALL</div>
              </div>
            ` : `
              <div style="display: grid; gap: 12px;">
                ${favs.map(f => `
                  <div class="neural-glass" style="padding: var(--s4); display: flex; justify-content: space-between; align-items: center; cursor: pointer;" onclick="executeFunction('${f.id}'); closeModal();">
                     <div style="display: flex; gap: 16px; align-items: center;">
                        <div class="card-icon" style="width: 40px; height: 40px; font-size: 1.2rem; margin: 0;">${f.icon}</div>
                        <div>
                           <div style="font-weight: 800; font-size: 14px; color: var(--text-main);">${f.title.toUpperCase()}</div>
                           <div style="font-size: 10px; color: var(--color-primary); font-family: var(--font-family-mono);">${f.catIcon} :: ${f.category.toUpperCase()}</div>
                        </div>
                     </div>
                     <button class="icon-btn" style="color: var(--color-primary);" onclick="event.stopPropagation(); favoritesManager.remove('${f.id}'); favoritesManager.showFavoritesModal();">⭐</button>
                  </div>
                `).join('')}
              </div>
            `}
          </div>
          <div class="modal-footer" style="padding: var(--s6);">
            <button class="btn-neural-glass" style="width: 100%;" onclick="closeModal()">DISMISS</button>
          </div>
        </div>
      </div>
    `;
  },

  updateUI() {
    // Legacy support for cards with stars
    document.querySelectorAll('.neural-card').forEach(card => {
      const id = card.getAttribute('onclick')?.match(/'([^']+)'/)?.[1];
      if (id) {
        const isFav = this.favorites.includes(id);
        let star = card.querySelector('.favorite-indicator');
        if (isFav && !star) {
          star = document.createElement('div');
          star.className = 'favorite-indicator';
          star.innerHTML = '⭐';
          star.style.cssText = 'position: absolute; top: 12px; right: 12px; font-size: 12px; filter: drop-shadow(0 0 5px var(--color-primary));';
          card.appendChild(star);
        } else if (!isFav && star) {
          star.remove();
        }
      }
    });
  },

  init() {
    setTimeout(() => this.updateUI(), 1000);
  }
};

window.favoritesManager = favoritesManager;

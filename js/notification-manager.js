/**
 * VIP AI SYMPHONY - Telemetry Hub v7.0
 * Dynamic system for tracking events, kernel logs, and neural triggers
 * Enhanced for v7.0 "NEURAL FLUX" Architecture
 */

const notificationManager = {
  notifications: [],
  isOpen: false,
  currentFilter: 'all',

  init() {
    const stored = localStorage.getItem('vip_notifications');
    if (stored) {
      this.notifications = JSON.parse(stored);
    }

    if (this.notifications.length === 0) {
      this.addNotification({
        title: 'SYMPHONY v7.0 ONLINE ⚡',
        message: 'Neural Kernel initialized. Established link to global intelligence grid.',
        type: 'success'
      });
    }

    this.updateBadge();
  },

  addNotification(item) {
    const n = {
      id: Date.now(),
      title: item.title || 'SYSTEM_ALERT',
      message: item.message || '',
      type: item.type || 'info', // info, success, warning, error
      time: item.time || new Date().toISOString(),
      read: false
    };

    this.notifications.unshift(n);
    if (this.notifications.length > 50) this.notifications.pop();

    this.save();
    this.updateBadge();

    if (window.showToast && !this.isOpen) {
      window.showToast(n.title, n.message, n.type);
    }

    if (this.isOpen) this.renderPanel();
  },

  save() {
    localStorage.setItem('vip_notifications', JSON.stringify(this.notifications));
  },

  updateBadge() {
    const unread = this.notifications.filter(n => !n.read).length;
    const badge = document.getElementById('notificationBadge');
    if (badge) {
      badge.style.display = unread > 0 ? 'flex' : 'none';
      badge.textContent = unread > 9 ? '9+' : unread;
    }
  },

  togglePanel() {
    if (this.isOpen) this.closePanel();
    else this.openPanel();
  },

  openPanel() {
    this.isOpen = true;

    if (!document.getElementById('notificationPanel')) {
      const panel = document.createElement('div');
      panel.id = 'notificationPanel';
      panel.className = 'sidebar-drawer neural-glass';
      panel.innerHTML = `
        <div class="drawer-header">
          <div class="header-titles">
            <h2 class="modal-title" style="font-size: 1.1rem; letter-spacing: 2px;">📡 TELEMETRY_LOGS</h2>
            <div class="encryption-tag" style="margin-top:0">BUFFER: 0x${this.notifications.length.toString(16).toUpperCase()}</div>
          </div>
          <button class="face-recognition-close" style="width:28px; height:28px; font-size:16px" onclick="notificationManager.closePanel()">&times;</button>
        </div>
        <div class="chat-chips">
          <button class="neural-chip active" id="f-all" onclick="notificationManager.filter('all')">ALL_FEEDS</button>
          <button class="neural-chip" id="f-success" onclick="notificationManager.filter('success')">NEURAL_PULSE</button>
          <button class="neural-chip" id="f-warning" onclick="notificationManager.filter('warning')">THREATS</button>
        </div>
        <div class="drawer-body" id="notificationList"></div>
        <div class="chat-input-area">
          <button class="btn-neural-glass" style="flex: 1; font-size: 10px;" onclick="notificationManager.markAllRead()">ACK_ALL</button>
          <button class="btn-neural-glass" style="flex: 1; font-size: 10px;" onclick="notificationManager.clearAll()">PURGE</button>
        </div>
      `;
      document.body.appendChild(panel);

      if (!document.getElementById('drawerOverlay')) {
        const overlay = document.createElement('div');
        overlay.id = 'drawerOverlay';
        overlay.className = 'drawer-overlay';
        overlay.onclick = () => this.closePanel();
        document.body.appendChild(overlay);
      }
    }

    const panel = document.getElementById('notificationPanel');
    const overlay = document.getElementById('drawerOverlay');
    panel.classList.add('active');
    overlay.classList.add('active');

    this.renderPanel();
  },

  closePanel() {
    this.isOpen = false;
    document.getElementById('notificationPanel')?.classList.remove('active');
    document.getElementById('drawerOverlay')?.classList.remove('active');
    this.markAllRead();
  },

  markAllRead() {
    this.notifications.forEach(n => n.read = true);
    this.save();
    this.updateBadge();
    this.renderPanel();
  },

  clearAll() {
    this.notifications = [];
    this.save();
    this.updateBadge();
    this.renderPanel();
  },

  filter(type) {
    this.currentFilter = type;
    this.renderPanel();

    // Update chip UI
    document.querySelectorAll('#notificationPanel .neural-chip').forEach(c => {
      c.classList.remove('active');
      if (c.id === `f-${type}`) c.classList.add('active');
    });
  },

  renderPanel() {
    const list = document.getElementById('notificationList');
    if (!list) return;

    const filtered = this.currentFilter === 'all'
      ? this.notifications
      : this.notifications.filter(n => n.type === this.currentFilter);

    if (filtered.length === 0) {
      list.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">🛰️</div>
          <div class="empty-text">AWAITING_SIGNAL_INPUT</div>
        </div>
      `;
      return;
    }

    list.innerHTML = filtered.map(n => `
      <div class="neural-glass telemetry-node ${n.type} ${n.read ? 'read' : ''} animate-fade-in-up">
        <div class="telemetry-row">
           <span class="telemetry-title">${n.title.toUpperCase()}</span>
           <span class="telemetry-time">${this.formatTime(n.time)}</span>
        </div>
        <div class="telemetry-msg">${n.message}</div>
      </div>
    `).join('');
  },

  formatTime(iso) {
    const diff = Math.floor((new Date() - new Date(iso)) / 1000 / 60);
    if (diff < 1) return 'JUST_NOW';
    if (diff < 60) return `${diff}M_AGO`;
    if (diff < 1440) return `${Math.floor(diff / 60)}H_AGO`;
    return new Date(iso).toLocaleDateString();
  }
};

window.notificationManager = notificationManager;

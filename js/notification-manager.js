/**
 * VIP AI Assistant - Notification Manager
 * Dynamic system for tracking events, alerts, and reminders
 */

const notificationManager = {
    notifications: [],
    isOpen: false,

    init() {
        // Load from storage
        const stored = localStorage.getItem('vip_notifications');
        if (stored) {
            this.notifications = JSON.parse(stored);
        }

        // Add an initial welcome notification if empty
        if (this.notifications.length === 0) {
            this.addNotification({
                title: 'SYMPHONY v6.0 ONLINE 🚀',
                message: 'Neural Weave architecture initialized. Welcome to the Platinum interface.',
                type: 'info',
                time: new Date().toISOString()
            });
        }

        this.updateBadge();
        this.renderPanel();
    },

    addNotification(item) {
        const notification = {
            id: Date.now(),
            title: item.title || 'System Alert',
            message: item.message || '',
            type: item.type || 'info', // info, success, warning, error
            time: item.time || new Date().toISOString(),
            read: false
        };

        this.notifications.unshift(notification);

        // Keep only last 50
        if (this.notifications.length > 50) {
            this.notifications.pop();
        }

        this.save();
        this.updateBadge();

        // Trigger toast as well if appropriate
        if (typeof showToast === 'function' && !this.isOpen) {
            showToast(notification.title, notification.message, notification.type);
        }

        if (this.isOpen) this.renderPanel();
    },

    save() {
        localStorage.setItem('vip_notifications', JSON.stringify(this.notifications));
    },

    updateBadge() {
        const unreadCount = this.notifications.filter(n => !n.read).length;
        const badge = document.getElementById('notificationBadge');
        if (badge) {
            if (unreadCount > 0) {
                badge.style.display = 'block';
                badge.textContent = unreadCount > 9 ? '9+' : unreadCount;
            } else {
                badge.style.display = 'none';
            }
        }
    },

    togglePanel() {
        if (this.isOpen) {
            this.closePanel();
        } else {
            this.openPanel();
        }
    },

    openPanel() {
        this.isOpen = true;

        // Create panel if it doesn't exist
        if (!document.getElementById('notificationPanel')) {
            const panel = document.createElement('div');
            panel.id = 'notificationPanel';
            panel.className = 'sidebar-drawer';
            panel.innerHTML = `
                <div class="drawer-header" style="background: rgba(0,0,0,0.1); border-bottom: 2px solid var(--glass-border);">
                    <h2 class="modal-title" style="font-family: var(--font-family-display); font-size: 16px; letter-spacing: 1px;">📡 SYSTEM_TELEMETRY_LOGS</h2>
                    <button class="modal-close" onclick="notificationManager.closePanel()">×</button>
                </div>
                <div style="padding: var(--space-4); border-bottom: 1px solid var(--glass-border); overflow-x: auto; display: flex; gap: var(--space-3); scrollbar-width: none;">
                    <button class="badge badge-sm" onclick="notificationManager.filterNotifications('all')" id="filter-all" style="cursor: pointer; border: 1px solid var(--color-accent-500);">ALL_FEEDS</button>
                    <button class="badge badge-sm" onclick="notificationManager.filterNotifications('info')" id="filter-info" style="cursor: pointer; opacity: 0.6;">KERNEL_LOGS</button>
                    <button class="badge badge-sm" onclick="notificationManager.filterNotifications('success')" id="filter-success" style="cursor: pointer; opacity: 0.6;">NEURAL_PULSE</button>
                    <button class="badge badge-sm" onclick="notificationManager.filterNotifications('warning')" id="filter-warning" style="cursor: pointer; opacity: 0.6;">THREAT_DETECTION</button>
                </div>
                <div class="drawer-body" id="notificationList" style="padding: var(--space-4);"></div>
                <div style="padding: var(--space-5); border-top: 1px solid var(--glass-border); display: flex; gap: var(--space-3); background: rgba(0,0,0,0.05);">
                    <button class="btn btn-glass btn-sm" onclick="notificationManager.markAllRead()" style="flex: 1; font-size: 10px;">ACKNOWLEDGE_ALL</button>
                    <button class="btn btn-glass btn-sm" onclick="notificationManager.clearAll()" style="flex: 1; font-size: 10px;">PURGE_BUFFER</button>
                </div>
            `;
            document.body.appendChild(panel);

            const overlay = document.createElement('div');
            overlay.id = 'drawerOverlay';
            overlay.className = 'drawer-overlay';
            overlay.onclick = () => {
                notificationManager.closePanel();
                if (typeof chatManager !== 'undefined') chatManager.closeChat();
            };
            document.body.appendChild(overlay);
        }

        const panel = document.getElementById('notificationPanel');
        const overlay = document.getElementById('drawerOverlay');

        panel.classList.add('active');
        overlay.classList.add('active');

        this.renderPanel();
    },

    closePanel() {
        this.isOpen = false;
        const panel = document.getElementById('notificationPanel');
        const overlay = document.getElementById('drawerOverlay');

        if (panel) panel.classList.remove('active');
        if (overlay) overlay.classList.remove('active');

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

    filterNotifications(type) {
        this.currentFilter = type;

        // Update selection UI
        const filters = ['all', 'info', 'success', 'warning', 'error'];
        filters.forEach(f => {
            const el = document.getElementById(`filter-${f}`);
            if (el) {
                el.style.opacity = (f === type) ? '1' : '0.6';
                el.style.borderColor = (f === type) ? 'var(--color-accent-500)' : 'transparent';
                el.style.borderWidth = '1px';
                el.style.borderStyle = 'solid';
            }
        });

        this.renderPanel();
    },

    renderPanel() {
        const container = document.getElementById('notificationList');
        if (!container) return;

        const filtered = this.currentFilter && this.currentFilter !== 'all'
            ? this.notifications.filter(n => n.type === this.currentFilter)
            : this.notifications;

        if (filtered.length === 0) {
            container.innerHTML = `
                <div style="text-align: center; padding: var(--space-10); color: var(--text-tertiary);">
                    <div style="font-size: 3rem; margin-bottom: var(--space-4);">🧥</div>
                    <p>No ${this.currentFilter !== 'all' ? this.currentFilter : ''} notifications</p>
                </div>
            `;
            return;
        }

        container.innerHTML = filtered.map(n => `
            <div class="glass-card-subtle" style="margin-bottom: var(--space-4); padding: var(--space-4); border-left: 3px solid var(--color-${n.type}-500); opacity: ${n.read ? '0.7' : '1'};">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 4px;">
                    <div style="font-weight: 800; color: var(--text-primary); font-size: 11px; letter-spacing: 0.5px; text-transform: uppercase;">${n.title}</div>
                    <div style="font-size: 9px; color: var(--text-tertiary); font-family: var(--font-family-mono);">${this.formatTime(n.time).toUpperCase()}</div>
                </div>
                <div style="color: var(--text-secondary); font-size: 12px; line-height: 1.5;">${n.message}</div>
            </div>
        `).join('');
    },

    formatTime(isoString) {
        const date = new Date(isoString);
        const now = new Date();
        const diff = Math.floor((now - date) / 1000 / 60); // minutes

        if (diff < 1) return 'Just now';
        if (diff < 60) return `${diff}m ago`;
        if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
        return date.toLocaleDateString();
    }
};

window.notificationManager = notificationManager;

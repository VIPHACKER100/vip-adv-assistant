/**
 * Advanced Mobile Control AI Assistant
 * Main Application Logic
 */

// Application State
const appState = {
  currentTime: new Date(),
  context: {
    battery: 87,
    network: '5G',
    location: 'Home',
    weather: '72°F Sunny'
  },
  theme: 'dark',
  userPreferences: {
    autoExecute: false,
    notifications: true
  }
};

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
});

function initializeApp() {
  console.log('🤖 VIP AI Assistant Initializing...');

  // Create particles
  createParticles();

  // Setup Real Context Monitoring
  setupRealContext();

  // Update time immediately and every second
  updateTime();
  setInterval(updateTime, 1000);

  // Load UI components
  loadQuickActions();
  loadCategories();
  loadSuggestions();

  // Setup event listeners
  setupEventListeners();

  // Scroll reveal animation
  setupScrollReveal();

  console.log('✅ Initialization complete');
  showToast('Welcome!', 'VIP AI Assistant is ready', 'success');
}

// Setup Real System Context Monitoring
function setupRealContext() {
  try {
    // 1. Battery Monitoring
    if ('getBattery' in navigator) {
      navigator.getBattery().then(updateBatteryUI).catch(e => console.warn('Battery API error:', e));
    } else {
      updateContextUI('contextBattery', '<span class="badge badge-warning">Simulated 85%</span>');
    }

    // 2. Network Monitoring
    try {
      updateNetworkInfo();
      if (navigator.connection) {
        navigator.connection.addEventListener('change', updateNetworkInfo);
      }
      window.addEventListener('online', updateNetworkInfo);
      window.addEventListener('offline', updateNetworkInfo);
    } catch (e) {
      console.warn('Network API warning:', e);
    }

    // 3. Online/Location Status
    updateOnlineStatus();
  } catch (err) {
    console.error('Error setting up real context:', err);
  }
}

function updateBatteryUI(battery) {
  const update = () => {
    const level = Math.round(battery.level * 100);
    const charging = battery.charging ? '⚡' : '';
    const colorClass = level > 20 ? 'badge-success' : 'badge-error';

    const el = document.getElementById('contextBattery');
    if (el) el.innerHTML = `<span class="badge ${colorClass}">${charging} ${level}%</span>`;
  };

  update();
  battery.addEventListener('levelchange', update);
  battery.addEventListener('chargingchange', update);
}

function updateNetworkInfo() {
  const el = document.getElementById('contextNetwork');
  if (!el) return;

  if (!navigator.onLine) {
    el.innerHTML = '<span style="color: var(--color-error-400);">Offline</span>';
    return;
  }

  const conn = navigator.connection || {};
  const type = conn.effectiveType ? conn.effectiveType.toUpperCase() : 'WIFI';
  const speed = conn.downlink ? `${conn.downlink} Mbps` : '';

  el.innerHTML = `<span style="color: var(--color-success-400);">${type} ${speed}</span>`;
}

function updateOnlineStatus() {
  const el = document.getElementById('contextLocation');
  if (el) {
    el.innerText = navigator.onLine ? '🟢 Online' : '🔴 Offline';
  }
}

function updateContextUI(id, html) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = html;
}

// Create animated particles
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  for (let i = 0; i < 15; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.animationDuration = `${15 + Math.random() * 10}s`;
    particle.style.animationDelay = `${Math.random() * 5}s`;
    container.appendChild(particle);
  }
}

// Update current time with seconds
function updateTime() {
  const timeElement = document.getElementById('currentTime');
  if (timeElement) {
    const now = new Date();
    timeElement.textContent = now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  }
}

// Load Quick Actions
function loadQuickActions() {
  const grid = document.getElementById('quickActionsGrid');
  if (!grid) return;

  const quickActions = [
    {
      icon: '📸',
      title: 'Image Analysis',
      description: 'AI-powered image understanding',
      functionId: 'analyze_image'
    },
    {
      icon: '🤖',
      title: 'Create Automation',
      description: 'Build custom workflows',
      functionId: 'create_automation'
    },
    {
      icon: '🔒',
      title: 'Secure Vault',
      description: 'Access encrypted storage',
      functionId: 'secure_vault'
    },
    {
      icon: '💬',
      title: 'Smart Reply',
      description: 'AI message suggestions',
      functionId: 'smart_reply'
    },
    {
      icon: '🏠',
      title: 'Smart Home',
      description: 'Control IoT devices',
      functionId: 'control_smart_home'
    },
    {
      icon: '📊',
      title: 'Usage Analytics',
      description: 'View insights & trends',
      functionId: 'usage_analytics'
    }
  ];

  grid.innerHTML = quickActions.map(action => `
    <div class="function-card" data-function="${action.functionId}">
      <div class="function-icon">${action.icon}</div>
      <div class="function-title">${action.title}</div>
      <div class="function-description">${action.description}</div>
    </div>
  `).join('');

  // Add click event listeners
  grid.querySelectorAll('.function-card').forEach(card => {
    card.addEventListener('click', () => {
      const functionId = card.dataset.function;
      if (functionId === 'create_automation') {
        openAutomationBuilder();
      } else {
        executeFunction(functionId);
      }
    });
  });
}

// Load all function categories
function loadCategories() {
  const container = document.getElementById('categoriesContainer');
  if (!container) return;

  const categories = getFunctionCategories();

  container.innerHTML = categories.map(category => `
    <div class="category-section scroll-reveal">
      <div class="category-header">
        <div class="category-icon">${category.icon}</div>
        <div>
          <h3 class="section-title" style="margin-bottom: var(--space-1);">${category.name}</h3>
          <p class="section-subtitle" style="margin-bottom: 0;">${category.description}</p>
        </div>
      </div>
      <div class="functions-grid">
        ${category.functions.map(func => `
          <div class="function-card" onclick="executeFunction('${func.id}')">
            <div class="function-icon">${func.icon}</div>
            <div class="function-title">${func.title}</div>
            <div class="function-description">${func.description}</div>
            ${func.badge ? `<div style="margin-top: var(--space-3);"><span class="badge badge-${func.badgeType || 'accent'}">${func.badge}</span></div>` : ''}
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
}

// Load smart suggestions
function loadSuggestions() {
  const container = document.getElementById('suggestions');
  if (!container) return;

  const suggestions = getSmartSuggestions();

  container.innerHTML = suggestions.map(suggestion => `
    <div style="padding: var(--space-3) 0; border-bottom: 1px solid var(--border-secondary); cursor: pointer;" 
         onclick="executeSuggestion('${suggestion.action}')">
      <div style="display: flex; align-items: center; gap: var(--space-2); margin-bottom: var(--space-1);">
        <span>${suggestion.icon}</span>
        <span style="font-weight: var(--font-weight-medium); font-size: var(--font-size-sm); color: var(--text-primary);">
          ${suggestion.title}
        </span>
      </div>
      <div style="font-size: var(--font-size-xs); color: var(--text-tertiary); padding-left: var(--space-6);">
        ${suggestion.reason}
      </div>
    </div>
  `).join('');
}

// Get smart suggestions based on context
function getSmartSuggestions() {
  const hour = new Date().getHours();
  const suggestions = [];

  if (hour >= 6 && hour < 10) {
    suggestions.push({
      icon: '☀️',
      title: 'Morning Routine',
      reason: 'Start your day',
      action: 'morning_routine'
    });
  } else if (hour >= 18 && hour < 22) {
    suggestions.push({
      icon: '🌙',
      title: 'Evening Wind Down',
      reason: 'Prepare for rest',
      action: 'evening_routine'
    });
  }

  suggestions.push(
    {
      icon: '🎯',
      title: 'Focus Mode',
      reason: 'Minimize distractions',
      action: 'focus_mode'
    },
    {
      icon: '📱',
      title: 'Screen Time Report',
      reason: 'Review usage today',
      action: 'usage_analytics'
    }
  );

  return suggestions.slice(0, 3);
}

// Setup event listeners
function setupEventListeners() {
  // Search button
  document.getElementById('searchBtn')?.addEventListener('click', () => {
    showToast('Search', 'Search functionality coming soon', 'info');
  });

  // Settings button
  document.getElementById('settingsBtn')?.addEventListener('click', () => {
    showModal('settings');
  });

  // Automation builder button
  document.getElementById('automationBtn')?.addEventListener('click', () => {
    openAutomationBuilder();
  });
}

// Scroll reveal animation
function setupScrollReveal() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.scroll-reveal').forEach(el => {
    observer.observe(el);
  });
}

// Utility: Scroll to section
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// Utility: Show toast notification
function showToast(title, message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const icons = {
    success: '✅',
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️'
  };

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <div class="toast-icon">${icons[type] || icons.info}</div>
    <div class="toast-content">
      <div class="toast-title">${title}</div>
      <div class="toast-message">${message}</div>
    </div>
  `;

  container.appendChild(toast);

  // Auto remove after 4 seconds
  setTimeout(() => {
    toast.classList.add('removing');
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// Utility: Show modal
function showModal(type) {
  const modalContainer = document.getElementById('modalContainer');
  if (!modalContainer) return;

  let content = '';
  let title = '';

  switch (type) {
    case 'demo':
      title = 'Demo Video';
      content = '<p>Demo video functionality would be integrated here.</p><p>This would showcase all features in action.</p>';
      break;
    case 'settings':
      title = 'Settings';
      const storedKey = localStorage.getItem('openai_api_key') || '';
      const currentTheme = localStorage.getItem('theme') || 'dark';
      content = `
        <div class="input-group" style="margin-bottom: var(--space-4);">
          <label class="input-label">OpenAI API Key (Optional)</label>
          <input type="password" id="apiKeyInput" class="input" value="${storedKey}" placeholder="sk-..." onchange="localStorage.setItem('openai_api_key', this.value); window.location.reload();">
          <div style="font-size: var(--font-size-xs); color: var(--text-tertiary); margin-top: var(--space-2);">
            Required for natural language voice commands. Stored locally on your device.
          </div>
        </div>

        <div class="input-group" style="margin-bottom: var(--space-4);">
          <label class="input-label">Theme</label>
          <select class="input" id="themeSelect" onchange="setTheme(this.value)">
            <option value="dark" ${currentTheme === 'dark' ? 'selected' : ''}>Dark</option>
            <option value="light" ${currentTheme === 'light' ? 'selected' : ''}>Light</option>
            <option value="auto" ${currentTheme === 'auto' ? 'selected' : ''}>Auto (System)</option>
          </select>
          <div style="font-size: var(--font-size-xs); color: var(--text-tertiary); margin-top: var(--space-2);">
            Or press Ctrl+Shift+L to toggle dark/light
          </div>
        </div>
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-4);">
          <span>Auto-execute safe actions</span>
          <div class="toggle-switch">
            <input type="checkbox" id="autoExecute">
            <span class="toggle-slider"></span>
          </div>
        </div>
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <span>Enable notifications</span>
          <div class="toggle-switch">
            <input type="checkbox" id="notifications" checked>
            <span class="toggle-slider"></span>
          </div>
        </div>
      `;
      break;
  }

  modalContainer.innerHTML = `
    <div class="modal-overlay active" onclick="closeModal(event)">
      <div class="modal" onclick="event.stopPropagation()">
        <div class="modal-header">
          <h2 class="modal-title">${title}</h2>
          <button class="modal-close" onclick="closeModal()">&times;</button>
        </div>
        <div class="modal-body">
          ${content}
        </div>
        <div class="modal-footer">
          <button class="btn btn-glass" onclick="shortcutEditor.showEditor()">⌨️ Shortcuts</button>
          <button class="btn btn-glass" onclick="exportImportManager.showExportImportModal()">💾 Backup</button>
          <button class="btn btn-glass" onclick="performanceMonitor.showDashboard()">📊 Performance</button>
          <button class="btn btn-primary" onclick="closeModal()">Close</button>
        </div>
      </div>
    </div>
  `;
}

// Close modal
function closeModal(event) {
  if (event && event.target.classList.contains('modal-overlay') === false) return;

  const overlay = document.querySelector('.modal-overlay');
  if (overlay) {
    overlay.classList.remove('active');
    setTimeout(() => {
      document.getElementById('modalContainer').innerHTML = '';
    }, 300);
  }
}

// Execute suggestion
function executeSuggestion(action) {
  showToast('Executing', `Running ${action.replace('_', ' ')}...`, 'info');
  setTimeout(() => {
    showToast('Success', `${action.replace('_', ' ')} completed successfully`, 'success');
  }, 1500);
}

// Open automation builder
function openAutomationBuilder() {
  showToast('Automation Builder', 'Opening automation builder...', 'info');
  setTimeout(() => {
    window.location.hash = '#automation';
    // This would open the full automation builder interface
    showToast('Feature Coming Soon', 'Full automation builder interface in development', 'warning');
  }, 500);
}

// Export functions for global access
window.appState = appState;
window.showToast = showToast;
window.showModal = showModal;
window.closeModal = closeModal;
window.scrollToSection = scrollToSection;
window.executeSuggestion = executeSuggestion;
window.openAutomationBuilder = openAutomationBuilder;

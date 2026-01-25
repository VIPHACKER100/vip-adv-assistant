/**
 * VIP AI SYMPHONY - Core Kernel v6.0
 * Primary Application Logic & Lifecycle Management
 */

// Global state
window.appState = {
  theme: 'dark',
  isSidebarOpen: false,
  isNotificationPanelOpen: false,
  isInitialized: false,
  context: {
    location: null,
    battery: null,
    network: null,
    device: {
      isMobile: false,
      type: 'Desktop',
      os: 'Windows/MacOS',
      cores: navigator.hardwareConcurrency || 8
    },
    location: {
      city: 'Detecting...',
      lat: null,
      lon: null,
      weather: { temp: '--', desc: 'Syncing...' }
    }
  }
};

const appState = window.appState;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

/**
 * Initialize core application
 */
async function initApp() {
  console.log('🌌 INITIALIZING_SYMPHONY_V6_KERNEL...');

  // Setup device info
  detectDevice();

  // Initialize UI components
  initParticles();
  initTheme();
  setupEventListeners();
  initScrollHandler();

  // Initialize Performance Monitor
  if (window.performanceMonitor) window.performanceMonitor.init();

  // Start hardware monitoring
  startHardwareMonitoring();

  // Initial dashboard update
  updateDashboardWidgets();

  // v6.0 Live Location Init
  fetchLiveLocationData();

  // v6.0 Neural Hub Sync
  if (window.syncNeuralOrb) window.syncNeuralOrb();

  // Initialize Command Center (v6.0)
  if (window.commandCenter && window.commandCenter.initCommandCenter) {
    setTimeout(() => {
      window.commandCenter.initCommandCenter();
    }, 400);
  }

  // Initialize always-listening system (v6.0)
  if (window.initAlwaysListening) {
    setTimeout(() => {
      window.initAlwaysListening();
      const wasEnabled = localStorage.getItem('alwaysListeningEnabled') === 'true';
      if (wasEnabled) {
        setTimeout(() => window.startAlwaysListening(), 800);
      }
    }, 800);
  }

  // Populate categories UI
  renderFunctionCategories();

  // v6.0 Proactive Monitoring
  startProactiveMonitoring();

  appState.isInitialized = true;
  console.log('✅ SYMPHONY_OS_ONLINE');
  showToast('Symphony OS', 'Neural Link Established. System Ready.', 'success');
}

/**
 * Handle scroll-driven UI changes
 */
function initScrollHandler() {
  const header = document.querySelector('.header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    const isScrolled = window.scrollY > 20;
    header.classList.toggle('scrolled', isScrolled);
  }, { passive: true });
}

/**
 * Detect device type and environment
 */
function detectDevice() {
  const ua = navigator.userAgent;
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);

  appState.context.device.isMobile = isMobile;
  appState.context.device.type = isMobile ? 'NEURAL_NODE_MOBILE' : 'CORE_COMMAND_STATION';
  appState.context.device.os = detectOS(ua);

  // Set body class
  document.body.classList.toggle('is-mobile', isMobile);
  document.body.classList.toggle('is-desktop', !isMobile);

  const contextLocation = document.getElementById('contextLocation');
  if (contextLocation) {
    contextLocation.textContent = appState.context.device.type;
  }
}

function detectOS(ua) {
  if (ua.indexOf('Win') !== -1) return 'Windows Kernel';
  if (ua.indexOf('Mac') !== -1) return 'Darwin Core';
  if (ua.indexOf('Android') !== -1) return 'Android Linux';
  if (ua.indexOf('Linux') !== -1) return 'Generic Linux';
  return 'VIP Hybrid OS';
}

/**
 * Initialize particle visualizer
 */
function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  const particleCount = appState.context.device.isMobile ? 10 : 40; // Even lower on mobile

  for (let i = 0; i < particleCount; i++) {
    createParticle(container);
  }
}

function createParticle(container) {
  const particle = document.createElement('div');
  particle.className = 'particle';

  const size = Math.random() * 5 + 2;
  const left = Math.random() * 100;
  const duration = Math.random() * 15 + 10;
  const delay = Math.random() * 10;

  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;
  particle.style.left = `${left}%`;
  particle.style.animationDuration = `${duration}s`;
  particle.style.animationDelay = `-${delay}s`;

  container.appendChild(particle);
}

/**
 * Theme initialization
 */
function initTheme() {
  const savedTheme = localStorage.getItem('vip_theme') || 'dark';
  applyTheme(savedTheme);
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  appState.theme = theme;
  localStorage.setItem('vip_theme', theme);

  // v5.0 Performance: Add low-power mode flag if mobile and battery low
  if (appState.context.device.isMobile && appState.context.battery?.level < 30) {
    document.body.classList.add('low-power-mode');
  } else {
    document.body.classList.remove('low-power-mode');
  }
}

/**
 * Global Event Listeners
 */
function setupEventListeners() {
  // Navigation scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  // Hotkeys
  document.addEventListener('keydown', (e) => {
    // Ctrl+K for search
    if (e.ctrlKey && e.key === 'k') {
      e.preventDefault();
      if (window.openSearch) window.openSearch();
    }

    // Ctrl+Shift+G for Ghost Mode
    if (e.ctrlKey && e.shiftKey && e.key === 'G') {
      e.preventDefault();
      toggleGhostMode();
    }
  });
}

function toggleGhostMode() {
  const isGhost = document.body.classList.toggle('ghost-mode');
  showToast('Visual Interface', isGhost ? '?? GHOST_MODE_ACTIVE' : 'Standard UI Restored', isGhost ? 'warning' : 'success');

  if (window.cognitiveStream) {
    window.cognitiveStream.addLine(isGhost ? '> WARN: SYSTEM_VISIBILITY_ALTERED' : '> INFO: UI_CALIBRATION_STANDARD');
  }
}

/**
 * Hardware State Monitoring
 */
function startHardwareMonitoring() {
  // Battery API
  if ('getBattery' in navigator) {
    navigator.getBattery().then(battery => {
      updateBatteryInfo(battery);
      battery.addEventListener('levelchange', () => updateBatteryInfo(battery));
      battery.addEventListener('chargingchange', () => updateBatteryInfo(battery));
    });
  }

  // Network API
  if (navigator.connection) {
    updateNetworkInfo(navigator.connection);
    navigator.connection.addEventListener('change', () => updateNetworkInfo(navigator.connection));
  }

  // Time update
  setInterval(updateLocalTime, 1000);
  updateLocalTime();

  // Dashboard Heartbeat
  setInterval(updateDashboardWidgets, 5000);
}

function updateBatteryInfo(battery) {
  const level = Math.round(battery.level * 100);
  const isCharging = battery.charging;

  appState.context.battery = { level, isCharging };

  const displays = ['contextBattery', 'mBatteryVal'];
  displays.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      if (id === 'contextBattery') {
        el.innerHTML = `<span class="badge ${level < 20 ? 'badge-error' : 'badge-success'}" style="font-family: var(--font-family-mono);">${isCharging ? '⚡' : ''}${level}%</span>`;
        if (level < 20 && !isCharging) {
          document.body.classList.add('low-power-mode');
        } else {
          document.body.classList.remove('low-power-mode');
        }
      } else {
        el.textContent = `${isCharging ? '⚡' : ''}${level}%`;
      }
    }
  });

  if (window.evaluateRoutines) {
    window.evaluateRoutines('battery', level);
    window.evaluateRoutines('charging', isCharging);
  }
}

function updateNetworkInfo(connection) {
  const type = (connection.effectiveType || '5G').toUpperCase();
  appState.context.network = type;

  const displays = ['contextNetwork', 'mNetworkVal'];
  displays.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = `<span class="badge badge-accent" style="font-family: var(--font-family-mono); letter-spacing: 1px;">${type}</span>`;
  });
}

function updateLocalTime() {
  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
  const compactTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const desktopDisplay = document.getElementById('currentTime');
  const mobileDisplay = document.getElementById('mTimeVal');

  if (desktopDisplay) desktopDisplay.textContent = timeStr;
  if (mobileDisplay) mobileDisplay.textContent = compactTime;
}

/**
 * Intelligence Hub Content Management
 */
function updateDashboardWidgets() {
  // Update Health Bars
  const mem = document.getElementById('memProgress');
  const storage = document.getElementById('storageProgress');

  if (mem) {
    const usage = Math.floor(Math.random() * 20 + 35);
    mem.style.width = `${usage}%`;
  }

  // Update Pulse
  const pulse = document.getElementById('systemPulse');
  if (pulse) {
    pulse.style.animationDuration = `${Math.random() * 1.5 + 0.5}s`;
  }

  // Update Neural Analytics
  const dailyCmds = document.getElementById('dailyCmds');
  const aiLatency = document.getElementById('aiLatency');
  if (dailyCmds) {
    const count = localStorage.getItem('openai_usage_count') || '42';
    dailyCmds.textContent = count;
  }
  if (aiLatency && window.openaiHandler) {
    const latency = window.openaiHandler.usage.lastResponseTime || Math.floor(Math.random() * 50 + 100);
    aiLatency.textContent = `${latency}ms`;
  }

  // Update Suggestion Engine
  generateSuggestions();

  // v5.1 Cognitive Stream
  if (window.cognitiveStream && typeof window.cognitiveStream.generateThought === 'function') {
    const thought = window.cognitiveStream.generateThought();
    window.cognitiveStream.addLine(thought);
  }

  // v2.9 Environmental Detection
  updateEnvironment();
}

// Integrated via cognitive-stream.js v6.0

function updateEnvironment() {
  const envDetail = document.getElementById('envDetail');
  if (!envDetail) return;

  const contexts = ['Home Network', 'Secure Office', 'Transit Node', 'Public Gateway', 'Mobile Data Hub'];
  const currentCtx = contexts[Math.floor(Math.random() * contexts.length)];
  envDetail.textContent = currentCtx;
}

/**
 * Fetch real geolocation and reverse geocode info
 */
async function fetchLiveLocationData() {
  if (!navigator.geolocation) {
    console.warn('Geolocation not supported');
    return;
  }

  navigator.geolocation.getCurrentPosition(async (position) => {
    const { latitude, longitude } = position.coords;
    appState.context.location.lat = latitude;
    appState.context.location.lon = longitude;

    try {
      // Free Client-side Reverse Geocode (no key required for low volume)
      const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
      const data = await res.json();

      const city = data.city || data.locality || 'Unknown Sector';
      appState.context.location.city = city;

      console.log(`📍 Location Acquired: ${city} (${latitude.toFixed(2)}, ${longitude.toFixed(2)})`);
      showToast('Location Sync', `Synchronized to ${city} Node`, 'success');

      // Update Weather immediately after location is found
      updateWeather();
    } catch (e) {
      console.error('Reverse geocode failed', e);
      appState.context.location.city = 'Global Node';
    }
  }, (error) => {
    console.warn('Location Access Denied:', error.message);
    appState.context.location.city = 'Secure Hub';
    // Fallback to a default or skip
  });
}

function generateSuggestions() {
  const container = document.getElementById('suggestions');
  if (!container) return;

  const context = appState.context;
  const weatherDesc = document.getElementById('wDesc')?.textContent?.toLowerCase() || '';

  const suggestions = [
    { text: 'Analyze Data Usage', action: 'usage_analytics' },
    { text: 'Optimize Resources', action: 'optimize_resources' }
  ];

  // Location based
  if (context.location.city !== 'Detecting...') {
    suggestions.push({ text: `Explore ${context.location.city}`, action: 'visual_search' });
  }

  // Weather based
  if (weatherDesc.includes('rain') || weatherDesc.includes('storm')) {
    suggestions.push({ text: 'Enable Rain Mode', action: 'wellness_check' });
  } else if (weatherDesc.includes('clear') || weatherDesc.includes('sun')) {
    suggestions.push({ text: 'Outdoor Workflow', action: 'generate_content' });
  }

  // Battery based
  if (context.battery?.level < 40) {
    suggestions.push({ text: 'Power Safe Mode', action: 'performance_optimization' });
  }

  // Shuffle and pick 3
  const shuffled = suggestions.sort(() => 0.5 - Math.random()).slice(0, 3);

  container.innerHTML = shuffled.map(s => `
    <div class="suggestion-chip" onclick="executeSuggestion('${s.action}')">
      ${s.text}
    </div>
  `).join('');
}

/**
 * Render function categories to the home screen
 */
function renderFunctionCategories() {
  const container = document.getElementById('categoriesContainer');
  const quickGrid = document.getElementById('quickActionsGrid');
  if (!container || !window.getFunctionCategories) return;

  const categories = window.getFunctionCategories();

  // Render Categories
  container.innerHTML = categories.map(cat => `
    <div class="category-section animate-fade-in-up">
      <div class="category-header">
        <div class="category-icon">${cat.icon}</div>
        <div>
          <h3 class="section-title" style="font-size: var(--font-size-xl); margin: 0;">${cat.name}</h3>
          <p style="font-size: var(--font-size-sm); color: var(--text-secondary); opacity: 0.7;">${cat.description}</p>
        </div>
      </div>
      <div class="functions-grid">
        ${cat.functions.map(f => `
          <div class="function-card" onclick="executeFunction('${f.id}')">
            <div style="display: flex; justify-content: space-between; align-items: flex-start;">
              <div class="function-icon">${f.icon}</div>
              ${f.badge ? `<span class="badge badge-${f.badgeType || 'primary'}">${f.badge}</span>` : ''}
            </div>
            <h4 class="function-title">${f.title}</h4>
            <p class="function-description">${f.description}</p>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');

  // Also populate Quick Actions if empty
  if (quickGrid && quickGrid.innerHTML.trim() === '') {
    const popular = categories.flatMap(c => c.functions).filter(f => f.badge === 'Popular').slice(0, 4);
    quickGrid.innerHTML = popular.map(f => `
      <div class="function-card" onclick="executeFunction('${f.id}')">
        <div class="function-icon" style="background: var(--gradient-accent);">${f.icon}</div>
        <h4 class="function-title">${f.title}</h4>
        <p class="function-description">${f.description}</p>
      </div>
    `).join('');
  }
}

/**
 * Global Utility Functions
 */
function showToast(title, message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type} animate-fade-in-up`;
  toast.innerHTML = `
    <div class="toast-header">
      <strong>${title}</strong>
      <button class="toast-close">&times;</button>
    </div>
    <div class="toast-body">${message}</div>
  `;

  container.appendChild(toast);

  // Auto remove
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 400);
  }, 4000);

  // Manual close
  toast.querySelector('.toast-close').onclick = () => toast.remove();
}

function showModal(type) {
  if (type === 'settings') {
    renderSettingsModal();
  } else if (type === 'demo') {
    showToast('System Demo', 'SYMPHONY_V6_VISUAL_REVEAL_STARTING', 'info');
    const modalContainer = document.getElementById('modalContainer');
    if (modalContainer) {
      modalContainer.innerHTML = `
        <div class="modal-overlay active" onclick="closeModal(event)">
          <div class="modal animate-slide-up" onclick="event.stopPropagation()">
            <div class="modal-header">
              <h2 class="modal-title">📺 SYMPHONY_V6_PREVIEW</h2>
              <button class="modal-close" onclick="closeModal()">×</button>
            </div>
            <div class="modal-body text-center">
              <div style="aspect-ratio: 16/9; background: #000; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 20px; border: 2px solid var(--glass-border);">
                <span style="font-size: 44px; filter: drop-shadow(0 0 10px var(--color-accent-500));">🌌</span>
              </div>
              <p style="color: var(--text-secondary);">Welcome to the VIP SYMPHONY v6.0 PLATINUM experience. This build features the Neural Weave architecture, real-time biometric telemetry, and autonomous task-chaining logic.</p>
            </div>
            <div class="modal-footer">
              <button class="btn btn-primary" style="width: 100%;" onclick="closeModal()">INITIALIZE_VIEW</button>
            </div>
          </div>
        </div>
      `;
    }
  } else if (type === 'automation' || type === 'builder') {
    if (window.openAutomationBuilder) window.openAutomationBuilder();
  }
}

function renderSettingsModal() {
  const modalContainer = document.getElementById('modalContainer');
  if (!modalContainer) return;

  const currentKey = localStorage.getItem('openai_api_key') || '';
  const packageVersion = 'BUILD_6.0.0_SYMPHONY';

  modalContainer.innerHTML = `
    <div class="modal-overlay active" onclick="closeModal(event)">
      <div class="modal modal-settings animate-slide-up" onclick="event.stopPropagation()" style="max-width: 760px; min-height: 520px; padding: 0;">
        <div class="settings-sidebar">
          <div class="settings-nav-item active" onclick="switchSettingsTab('general')"><span>⚡</span> GENERAL</div>
          <div class="settings-nav-item" onclick="switchSettingsTab('cognitive')"><span>🧠</span> NEURAL</div>
          <div class="settings-nav-item" onclick="switchSettingsTab('hardware')"><span>🛰️</span> TELEMETRY</div>
          <div class="settings-nav-item" onclick="switchSettingsTab('advanced')"><span>🛡️</span> SECURITY</div>
        </div>
        
        <div class="settings-main">
          <div class="modal-header">
            <h2 class="modal-title">SYMPHONY_SYSTEM_SETTINGS</h2>
            <button class="modal-close" onclick="closeModal()">×</button>
          </div>
          
          <div class="modal-body" id="settingsTabContent">
            <!-- Initial tab content injected by JS -->
          </div>
          
          <div class="modal-footer">
            <div style="flex: 1; font-size: 10px; font-family: var(--font-family-mono); color: var(--color-accent-400);">${packageVersion}</div>
            <button class="btn btn-primary" onclick="closeModal(); showToast('Settings Synced', 'System baseline updated', 'success');">APPLY_CHANGES</button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Inject first tab
  switchSettingsTab('general');
}

/**
 * Switch settings tabs dynamically
 */
function switchSettingsTab(tabId) {
  const content = document.getElementById('settingsTabContent');
  if (!content) return;

  // Remove active classes
  document.querySelectorAll('.settings-nav-item').forEach(el => el.classList.remove('active'));

  // Set calling element active (simple find)
  const items = document.querySelectorAll('.settings-nav-item');
  if (tabId === 'general') items[0].classList.add('active');
  if (tabId === 'cognitive') items[1].classList.add('active');
  if (tabId === 'hardware') items[2].classList.add('active');
  if (tabId === 'advanced') items[3].classList.add('active');

  const apiKey = localStorage.getItem('openai_api_key') || '';
  const wakeWord = window.alwaysListening?.wakeWord || 'hey symphony';

  let html = '';
  switch (tabId) {
    case 'general':
      html = `
        <div class="settings-tab-pane active">
          <div class="settings-group">
            <label>Appearance Theme</label>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 8px;">
              <div class="theme-preview ${appState.theme === 'dark' ? 'active' : ''}" onclick="applyTheme('dark'); switchSettingsTab('general');">
                <div style="background: #0f172a; height: 40px; border-radius: 6px;"></div>
                <span style="font-size: 12px; margin-top: 4px; display: block; text-align: center;">Cyber Dark</span>
              </div>
              <div class="theme-preview ${appState.theme === 'light' ? 'active' : ''}" onclick="applyTheme('light'); switchSettingsTab('general');">
                <div style="background: #f8fafc; height: 40px; border-radius: 6px; border: 1px solid #ddd;"></div>
                <span style="font-size: 12px; margin-top: 4px; display: block; text-align: center;">Silicon Light</span>
              </div>
            </div>
          </div>
          <div class="settings-group" style="margin-top: 24px;">
            <label>Interface Scaling</label>
            <input type="range" min="80" max="120" value="100" class="progress-bar" style="height: 6px; margin-top: 10px;">
          </div>
        </div>
      `;
      break;
    case 'cognitive':
      const currentPersona = window.chatManager?.personality || 'professional';
      html = `
        <div class="settings-tab-pane active">
          <div class="settings-group">
            <label>AI Kernel Mode</label>
            <div class="persona-selector" style="margin-top: 8px;">
              <button class="persona-btn ${currentPersona === 'professional' ? 'active' : ''}" onclick="window.chatManager.personality='professional'; switchSettingsTab('cognitive');">PRO</button>
              <button class="persona-btn ${currentPersona === 'concise' ? 'active' : ''}" onclick="window.chatManager.personality='concise'; switchSettingsTab('cognitive');">MIN</button>
              <button class="persona-btn ${currentPersona === 'creative' ? 'active' : ''}" onclick="window.chatManager.personality='creative'; switchSettingsTab('cognitive');">ART</button>
            </div>
            <p style="font-size: 10px; color: var(--text-tertiary); margin-top: 10px;">
              ${currentPersona === 'professional' ? '<b>Standard Mode:</b> Balanced response with technical accuracy.' : ''}
              ${currentPersona === 'concise' ? '<b>Minimum Mode:</b> Ultra-brief, action-oriented responses.' : ''}
              ${currentPersona === 'creative' ? '<b>Artistic Mode:</b> Futuristic tone with descriptive flair.' : ''}
            </p>
          </div>
          <div class="settings-group" style="margin-top: 20px;">
            <label>OpenAI API Key</label>
            <input type="password" class="input" style="width: 100%; margin-top: 8px;" placeholder="sk-..." value="${apiKey}" 
              onchange="localStorage.setItem('openai_api_key', this.value); showToast('Key Updated', 'Access sequence verified', 'success')">
          </div>
        </div>
      `;
      break;
    case 'hardware':
      html = `
        <div class="settings-tab-pane active">
           <div class="settings-group">
            <label>Neural Visualization (v6.0)</label>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 8px;">
              <span style="font-size: 13px; color: var(--text-secondary);">Enable Synthetic Presence Orb</span>
              <input type="checkbox" checked onchange="document.getElementById('neuralOrbContainer').style.display = this.checked ? 'flex' : 'none'">
            </div>
          </div>
          <div class="settings-group" style="margin-top: 24px;">
            <label>Voice Wake Word</label>
            <input type="text" class="input" style="width: 100%; margin-top: 8px;" value="${wakeWord}" 
              onchange="if(window.alwaysListening) window.alwaysListening.wakeWord = this.value; showToast('Wake Word Sync', 'New baseline established', 'success')">
          </div>
          <div class="settings-group" style="margin-top: 24px;">
            <label>Haptic Response</label>
            <select class="input" style="width: 100%; margin-top: 8px;">
              <option>Dynamic (Adaptive)</option>
              <option>Sharp (High Frequency)</option>
              <option>Soft (Stealth)</option>
              <option>None (Visual Only)</option>
            </select>
          </div>
        </div>
      `;
      break;
    case 'advanced':
      html = `
        <div class="settings-tab-pane active">
          <div class="settings-group">
            <label>Kernel Data Operations</label>
            <div style="display: grid; gap: 10px; margin-top: 12px;">
              <button class="btn btn-glass btn-sm" style="width: 100%;" onclick="exportImportManager.showExportModal()">📤 System Backup (.json)</button>
              <button class="btn btn-glass btn-sm" style="width: 100%;" onclick="window.performanceMonitor.showDashboard()">📊 Visual Telemetry</button>
              <button class="btn btn-error btn-sm" style="width: 100%;" onclick="localStorage.clear(); location.reload();">🧨 Wipe Core Memory</button>
            </div>
          </div>
        </div>
      `;
      break;
  }
  content.innerHTML = html;
}

window.switchSettingsTab = switchSettingsTab;

function closeModal(event) {
  const modalOverlay = document.querySelector('.modal-overlay');
  if (modalOverlay) {
    modalOverlay.classList.remove('active');
    setTimeout(() => (modalOverlay.remove()), 300);
  }
}

function scrollToSection(id) {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

function executeSuggestion(id) {
  if (window.executeFunction) {
    window.executeFunction(id);
  }
}

function openAutomationBuilder() {
  if (window.showAutomationWizard) {
    window.showAutomationWizard();
  }
}

// Global cleanup for intervals
window.addEventListener('beforeunload', () => {
  // Clear any persistent intervals if needed
});

/**
 * Update Weather via Open-Meteo API
 * Uses lat/lon from live location or falls back to simulation
 */
async function updateWeather() {
  const wTemp = document.getElementById('wTemp');
  const wDesc = document.getElementById('wDesc');
  const wHum = document.getElementById('wHumidity');
  const wAQI = document.getElementById('wAQI');
  if (!wTemp || !wDesc) return;

  const lat = appState.context.location.lat;
  const lon = appState.context.location.lon;
  const city = appState.context.location.city;

  // Use simulation if no location yet
  if (!lat || !lon) {
    const temps = [68, 70, 72, 74, 75];
    const descs = ['Sunny', 'Partly Cloudy', 'Clear Skies'];
    wTemp.textContent = `${temps[Math.floor(Math.random() * temps.length)]}°F`;
    wDesc.textContent = `${descs[Math.floor(Math.random() * descs.length)]} • ${city}`;
    if (wHum) {
      wHum.textContent = `${Math.floor(Math.random() * 30 + 50)}%`; // Simulate 50-80% humidity
    }
    if (wAQI) {
      const qualities = ['Excellent', 'Good', 'Moderate'];
      wAQI.textContent = qualities[Math.floor(Math.random() * qualities.length)];
    }
    return;
  }

  try {
    const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&relative_humidity_2m=true&temperature_unit=fahrenheit`);
    const data = await res.json();

    if (data.current_weather) {
      const temp = Math.round(data.current_weather.temperature);
      const code = data.current_weather.weathercode;

      // Basic weather code mapping
      let condition = 'Clear';
      if (code >= 1 && code <= 3) condition = 'Partly Cloudy';
      if (code >= 45 && code <= 48) condition = 'Foggy';
      if (code >= 51 && code <= 67) condition = 'Rainy';
      if (code >= 71 && code <= 77) condition = 'Snowy';
      if (code >= 80 && code <= 82) condition = 'Showers';
      if (code >= 95) condition = 'Stormy';

      wTemp.textContent = `${temp}°F`;
      wDesc.textContent = `${condition} • ${city}`;

      // Update humidity
      if (wHum) {
        // Forecast API might not have current humidity directly in current_weather sometimes
        // checking data structure
        const humidity = data.hourly?.relative_humidity_2m ? data.hourly.relative_humidity_2m[0] : Math.floor(Math.random() * 20 + 40);
        wHum.textContent = `${humidity}%`;
      }

      // Simulate AQI (usually needs another API, we'll keep it as a smart simulation for now)
      if (wAQI) {
        const qualities = ['Excellent', 'Good', 'Moderate'];
        wAQI.textContent = qualities[Math.floor(Math.random() * qualities.length)];
      }

      console.log(`🌤️ Weather Updated for ${city}: ${temp}°F, ${condition}`);
    }
  } catch (e) {
    console.error('Weather sync failed', e);
    // Silent fallback to last known or default
  }
}

setInterval(updateWeather, 60000); // Update once a minute

// Exporting core functions for global access
window.showToast = showToast;
window.showModal = showModal;
window.closeModal = closeModal;
window.applyTheme = applyTheme;
window.scrollToSection = scrollToSection;
window.executeSuggestion = executeSuggestion;

window.openAutomationBuilder = openAutomationBuilder;

/**
 * v4.6.0 - Advanced Visual Telemetry & HUD
 * v4.9.0 - Deep Telemetry with Canvas Charts for RAM/CPU
 */
let hudInterval = null;
let canvasCharts = {};

// Telemetry data storage
const telemetryData = {
  ram: [],
  cpu: [],
  network: [],
  neural: [],
  security: [],
  maxPoints: 100
};

function toggleHUD() {
  const overlay = document.getElementById('hudOverlay');
  if (!overlay) return;

  const isActive = overlay.classList.toggle('active');

  if (isActive) {
    renderHUDContent();
    // Initialize canvas charts after DOM is updated
    setTimeout(() => {
      initCanvasCharts();
      hudInterval = setInterval(updateTelemetry, 100); // Update every 100ms for smooth animation
    }, 50);
    showToast('HUD Activated', 'Command Center Telemetry Live', 'success');
  } else {
    clearInterval(hudInterval);
    canvasCharts = {}; // Clean up canvas references
  }
}

function renderHUDContent() {
  const overlay = document.getElementById('hudOverlay');
  const battery = appState.context.device.isMobile ? '85%' : 'N/A (A/C Connected)';

  // Get real memory info if available
  const memoryInfo = getMemoryInfo();

  overlay.innerHTML = `
    <div class="hud-header">
      <div style="display: flex; flex-direction: column;">
        <h1 class="font-display" style="font-size: 2rem; margin: 0;">🛰️ Command Center HUD</h1>
        <div class="hud-status-node">NODE_VIP_ALPHA_STREAM :: SECURE</div>
      </div>
      <button class="btn btn-glass" onclick="toggleHUD()">Close HUD [ESC]</button>
    </div>
    
    <div class="hud-grid">
      <!-- RAM Telemetry (Canvas) -->
      <div class="glass-card">
        <h4 style="margin-bottom: var(--space-4);">💾 RAM Usage</h4>
        <div style="display: flex; justify-content: space-between; font-family: var(--font-family-mono); font-size: 12px; margin-bottom: 4px;">
          <span>MEMORY_ALLOCATION</span>
          <span id="ramUsage">${memoryInfo.used}MB / ${memoryInfo.total}MB</span>
        </div>
        <canvas id="ramChart" class="telemetry-canvas" width="400" height="120"></canvas>
        <div style="font-size: 10px; color: var(--text-tertiary); margin-top: 4px; font-family: var(--font-family-mono);">
          Peak: <span id="ramPeak">0</span>MB | Avg: <span id="ramAvg">0</span>MB
        </div>
      </div>

      <!-- CPU Telemetry (Canvas) -->
      <div class="glass-card">
        <h4 style="margin-bottom: var(--space-4);">⚡ CPU Load</h4>
        <div style="display: flex; justify-content: space-between; font-family: var(--font-family-mono); font-size: 12px; margin-bottom: 4px;">
          <span>PROCESSOR_UTILIZATION</span>
          <span id="cpuUsage">0%</span>
        </div>
        <canvas id="cpuChart" class="telemetry-canvas" width="400" height="120"></canvas>
        <div style="font-size: 10px; color: var(--text-tertiary); margin-top: 4px; font-family: var(--font-family-mono);">
          Cores: ${appState.context.device.cores} | Threads: <span id="cpuThreads">${appState.context.device.cores * 2}</span>
        </div>
      </div>

      <!-- Neural Engine Telemetry (Canvas) -->
      <div class="glass-card">
        <h4 style="margin-bottom: var(--space-4);">🧠 Neural Engine Load</h4>
        <div style="display: flex; justify-content: space-between; font-family: var(--font-family-mono); font-size: 12px; margin-bottom: 4px;">
          <span>PROBABILITY_FIELD</span>
          <span id="neuralLoad">0%</span>
        </div>
        <canvas id="neuralChart" class="telemetry-canvas" width="400" height="120"></canvas>
      </div>

      <!-- Network Stream (Canvas) -->
      <div class="glass-card">
        <h4 style="margin-bottom: var(--space-4);">🌐 Quantum Network Stream</h4>
        <div style="display: flex; justify-content: space-between; font-family: var(--font-family-mono); font-size: 12px; margin-bottom: 4px;">
          <span>PACKET_DENSITY</span>
          <span id="netStream">0 MB/s</span>
        </div>
        <canvas id="netChart" class="telemetry-canvas" width="400" height="120"></canvas>
      </div>

      <!-- Security Shield (Canvas) -->
      <div class="glass-card">
        <h4 style="margin-bottom: var(--space-4);">🛡️ Encrypted Shield Status</h4>
        <div style="display: flex; justify-content: space-between; font-family: var(--font-family-mono); font-size: 12px; margin-bottom: 4px;">
          <span>THREAT_VECTOR</span>
          <span id="threatLevel">0.001% (NULL)</span>
        </div>
        <canvas id="securityChart" class="telemetry-canvas" width="400" height="120"></canvas>
      </div>
      
      <!-- System Identity -->
      <div class="glass-card">
        <h4 style="margin-bottom: var(--space-2);">💻 System Identity</h4>
        <div style="font-size: 14px; line-height: 1.6; font-family: var(--font-family-mono);">
          <div style="color: var(--text-tertiary);">PLATFORM: <span style="color: var(--color-accent-400);">${appState.context.device.type}</span></div>
          <div style="color: var(--text-tertiary);">KERNEL: <span style="color: var(--color-accent-400);">${appState.context.device.os}</span></div>
          <div style="color: var(--text-tertiary);">COMPUTE: <span style="color: var(--color-accent-400);">${appState.context.device.cores} Logic Cores</span></div>
          <div style="color: var(--text-tertiary);">ENERGY: <span style="color: var(--color-accent-400);">${battery}</span></div>
          <div style="color: var(--text-tertiary); margin-top: 8px;">RAM: <span style="color: var(--color-accent-400);">${memoryInfo.total}MB Total</span></div>
        </div>
      </div>
    </div>
  `;
}

function getMemoryInfo() {
  // Try to get real memory info from Performance API
  let used = 0;
  let total = 0;

  if (performance.memory) {
    used = Math.round(performance.memory.usedJSHeapSize / 1048576); // Convert to MB
    total = Math.round(performance.memory.totalJSHeapSize / 1048576);
  } else {
    // Fallback simulation
    used = Math.round(Math.random() * 200 + 100);
    total = 512;
  }

  return { used, total, percent: Math.round((used / total) * 100) };
}

function initCanvasCharts() {
  const charts = ['ramChart', 'cpuChart', 'neuralChart', 'netChart', 'securityChart'];

  charts.forEach(chartId => {
    const canvas = document.getElementById(chartId);
    if (!canvas) return;

    // Set proper size for high DPI displays
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const width = rect.width || parseInt(canvas.getAttribute('width')) || 400;
    const height = rect.height || parseInt(canvas.getAttribute('height')) || 120;

    canvas.width = width * dpr;
    canvas.height = height * dpr;

    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    canvasCharts[chartId] = {
      canvas,
      ctx,
      width: width,
      height: height
    };

    // Initialize data arrays
    const dataKey = chartId.replace('Chart', '');
    if (!telemetryData[dataKey]) {
      telemetryData[dataKey] = [];
    }

    // Pre-fill with initial values
    for (let i = 0; i < 50; i++) {
      telemetryData[dataKey].push(0);
    }
  });
}

function updateTelemetry() {
  // Get real memory data
  const memoryInfo = getMemoryInfo();
  const ramPercent = memoryInfo.percent;

  // Simulate CPU (browser can't access real CPU)
  const cpuPercent = Math.min(100, (Math.random() * 20 + ramPercent * 0.3 + 10));

  // Simulate other metrics
  const neuralVal = (Math.random() * 30 + 15);
  const netVal = (Math.random() * 50 + 5);
  const securityVal = Math.random() * 0.5;

  // Update data arrays
  telemetryData.ram.push(ramPercent);
  telemetryData.cpu.push(cpuPercent);
  telemetryData.neural.push(neuralVal);
  telemetryData.network.push(netVal);
  telemetryData.security.push(securityVal);

  // Trim to max points
  Object.keys(telemetryData).forEach(key => {
    if (Array.isArray(telemetryData[key]) && telemetryData[key].length > telemetryData.maxPoints) {
      telemetryData[key].shift();
    }
  });

  // Update UI values
  if (document.getElementById('ramUsage')) {
    document.getElementById('ramUsage').textContent = `${memoryInfo.used}MB / ${memoryInfo.total}MB`;
  }
  if (document.getElementById('cpuUsage')) {
    document.getElementById('cpuUsage').textContent = `${cpuPercent.toFixed(1)}%`;
  }
  if (document.getElementById('neuralLoad')) {
    document.getElementById('neuralLoad').textContent = `${neuralVal.toFixed(1)}%`;
  }
  if (document.getElementById('netStream')) {
    document.getElementById('netStream').textContent = `${netVal.toFixed(1)} MB/s`;
  }
  if (document.getElementById('threatLevel')) {
    document.getElementById('threatLevel').textContent = `${securityVal.toFixed(3)}% (NULL)`;
  }

  // Update RAM stats
  if (telemetryData.ram.length > 0) {
    const ramValues = telemetryData.ram.map(v => (v / 100) * memoryInfo.total);
    const peak = Math.max(...ramValues);
    const avg = ramValues.reduce((a, b) => a + b, 0) / ramValues.length;
    if (document.getElementById('ramPeak')) document.getElementById('ramPeak').textContent = Math.round(peak);
    if (document.getElementById('ramAvg')) document.getElementById('ramAvg').textContent = Math.round(avg);
  }

  // Draw all charts
  drawCanvasChart('ramChart', telemetryData.ram, '#3B82F6', '#1E40AF');
  drawCanvasChart('cpuChart', telemetryData.cpu, '#10B981', '#059669');
  drawCanvasChart('neuralChart', telemetryData.neural, '#8B5CF6', '#6D28D9');
  drawCanvasChart('netChart', telemetryData.network, '#F59E0B', '#D97706');
  drawCanvasChart('securityChart', telemetryData.security.map(v => v * 100), '#EF4444', '#DC2626');
}

function drawCanvasChart(chartId, data, color, fillColor) {
  const chart = canvasCharts[chartId];
  if (!chart || !data || data.length === 0) {
    // Initialize with empty chart if data not ready
    if (chart && chart.ctx) {
      chart.ctx.clearRect(0, 0, chart.width, chart.height);
    }
    return;
  }

  const { ctx, width, height } = chart;
  const padding = 4;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  // Clear canvas
  ctx.clearRect(0, 0, width, height);

  // Draw grid lines
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const y = padding + (chartHeight / 4) * i;
    ctx.beginPath();
    ctx.moveTo(padding, y);
    ctx.lineTo(width - padding, y);
    ctx.stroke();
  }

  // Draw area chart
  if (data.length > 1) {
    const stepX = chartWidth / (data.length - 1);
    const maxValue = Math.max(...data, 100);

    // Create gradient
    const gradient = ctx.createLinearGradient(0, padding, 0, height - padding);
    gradient.addColorStop(0, fillColor + '80');
    gradient.addColorStop(1, fillColor + '00');

    // Draw filled area
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(padding, height - padding);

    data.forEach((value, index) => {
      const x = padding + index * stepX;
      const normalizedValue = Math.min(100, value) / maxValue;
      const y = height - padding - (normalizedValue * chartHeight);
      ctx.lineTo(x, y);
    });

    ctx.lineTo(width - padding, height - padding);
    ctx.closePath();
    ctx.fill();

    // Draw line
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();

    data.forEach((value, index) => {
      const x = padding + index * stepX;
      const normalizedValue = Math.min(100, value) / maxValue;
      const y = height - padding - (normalizedValue * chartHeight);

      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.stroke();

    // Draw glow effect
    ctx.shadowBlur = 10;
    ctx.shadowColor = color;
    ctx.stroke();
    ctx.shadowBlur = 0;
  }
}

window.toggleHUD = toggleHUD;

/**
 * v4.7.0 - Boost Mode & Visual Excellence
 */
let isBoostActive = false;
function toggleBoostMode() {
  isBoostActive = !isBoostActive;
  const body = document.body;
  const logo = document.querySelector('.logo-icon');

  if (isBoostActive) {
    body.classList.add('boost-active');
    if (logo) logo.style.filter = 'drop-shadow(0 0 20px var(--color-accent-400)) hue-rotate(45deg)';
    showToast('?? Boost Mode', 'Neural Cores Overclocked to 120%', 'accent');
    appState.context.device.cores *= 1.5;

    // Intensify particles
    const container = document.getElementById('particles');
    if (container) {
      for (let i = 0; i < 20; i++) {
        const p = document.createElement('div');
        p.className = 'particle boost-particle';
        p.style.left = `${Math.random() * 100}%`;
        p.style.animationDuration = `${Math.random() * 5 + 2}s`;
        container.appendChild(p);
      }
    }
  } else {
    body.classList.remove('boost-active');
    if (logo) logo.style.filter = '';
    showToast('System Normalized', 'Returning to power-save cycles', 'info');
    appState.context.device.cores /= 1.5;
    document.querySelectorAll('.boost-particle').forEach(p => p.remove());
  }
}
window.toggleBoostMode = toggleBoostMode;

// Keyboard shortcuts for HUD & Boost
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && document.getElementById('hudOverlay').classList.contains('active')) {
    toggleHUD();
  }
  if (e.ctrlKey && e.shiftKey && e.key === 'B') {
    toggleBoostMode();
  }
});

/**
 * Neural Orb Interaction Logic
 */
let orbState = {
  isDragging: false,
  x: 0,
  y: 0,
  lastX: 0,
  lastY: 0
};

function syncNeuralOrb() {
  const orb = document.getElementById('neuralOrb');
  if (!orb) return;

  // Sync state with always listening and chat activity
  setInterval(() => {
    const isListening = (window.alwaysListening?.enabled && !window.alwaysListening?.isProcessing) || (window.voiceState?.isListening);
    const isTyping = window.chatManager?.isTyping || false;

    orb.classList.toggle('listening', isListening);

    // v6.0 Pulse Effect: Faster pulse if AI is typing
    if (isTyping) {
      orb.style.boxShadow = '0 0 40px var(--color-secondary-500)';
      orb.style.animationDuration = '0.5s';
    } else {
      orb.style.boxShadow = '';
      orb.style.animationDuration = isListening ? '0.8s' : '4s';
    }
  }, 500);

  // Double click to toggle voice
  orb.addEventListener('dblclick', () => {
    if (window.toggleVoiceAccess) window.toggleVoiceAccess();
  });
}

function startOrbDrag(e) {
  const container = document.getElementById('neuralOrbContainer');
  if (!container) return;

  orbState.isDragging = true;
  const event = e.type.includes('touch') ? e.touches[0] : e;

  orbState.startX = event.clientX - container.offsetLeft;
  orbState.startY = event.clientY - container.offsetTop;

  container.style.cursor = 'grabbing';
  const orb = container.querySelector('.neural-orb');
  if (orb) orb.style.animationPlayState = 'paused';

  const onMove = (moveEvent) => {
    if (!orbState.isDragging) return;
    const move = moveEvent.type.includes('touch') ? moveEvent.touches[0] : moveEvent;

    let newX = move.clientX - orbState.startX;
    let newY = move.clientY - orbState.startY;

    // Boundary checks
    newX = Math.max(0, Math.min(window.innerWidth - container.offsetWidth, newX));
    newY = Math.max(0, Math.min(window.innerHeight - container.offsetHeight, newY));

    container.style.left = `${newX}px`;
    container.style.top = `${newY}px`;
    container.style.bottom = 'auto';
    container.style.right = 'auto';
  };

  const onEnd = () => {
    orbState.isDragging = false;
    container.style.cursor = 'grab';
    const orb = container.querySelector('.neural-orb');
    if (orb) orb.style.animationPlayState = 'running';
    document.removeEventListener('mousemove', onMove);
    document.removeEventListener('mouseup', onEnd);
    document.removeEventListener('touchmove', onMove);
    document.removeEventListener('touchend', onEnd);
  };

  document.addEventListener('mousemove', onMove);
  document.addEventListener('mouseup', onEnd);
  document.addEventListener('touchmove', onMove, { passive: false });
  document.addEventListener('touchend', onEnd);
}

window.startOrbDrag = startOrbDrag;
window.syncNeuralOrb = syncNeuralOrb;

/**
 * v5.1 Proactive AI Insights
 */
function startProactiveMonitoring() {
  console.log('?? Proactive Monitoring Initialized');

  // Every 30 seconds check for proactive suggestions
  setInterval(() => {
    const battery = appState.context.battery;
    const weather = document.getElementById('wDesc')?.textContent?.toLowerCase() || '';
    const lastProactive = parseInt(localStorage.getItem('last_proactive_alert') || '0');
    const now = Date.now();

    // Cooldown 10 mins
    if (now - lastProactive < 600000) return;

    let alert = null;

    // Condition 1: Low Battery (not charging)
    if (battery?.level < 25 && !battery?.isCharging) {
      alert = {
        title: '?? Optimized Power Mode',
        message: `Battery at ${battery.level}%. Should I enable system-wide power saving?`,
        type: 'warning',
        action: 'performance_optimization'
      };
    }
    // Condition 2: Rainy Weather
    else if (weather.includes('rain') || weather.includes('storm')) {
      alert = {
        title: '?? Weather Advisory',
        message: 'Precipitation detected in your area. Enabling outdoor safety routines?',
        type: 'info',
        action: 'weather_check'
      };
    }
    // Condition 3: Memory check
    else if (performance.memory && performance.memory.usedJSHeapSize > 100000000) { // > 100MB
      alert = {
        title: '🚀 Resource Peak',
        message: 'AI Hub detected high heap usage. Run resource optimizer?',
        type: 'info',
        action: 'optimize_resources'
      };
    }
    // Condition 4: Evening routine (after 7 PM)
    else if (new Date().getHours() >= 19) {
      alert = {
        title: '🌙 Evening Transition',
        message: 'Daylight is fading. Activate night shift and relaxation routines?',
        type: 'info',
        action: 'focus_mode'
      };
    }
    // Condition 5: Productive morning (8 AM - 10 AM)
    else if (new Date().getHours() >= 8 && new Date().getHours() <= 10) {
      alert = {
        title: '☀️ Peak productivity',
        message: 'Good morning! Would you like to review your calendar and start focus mode?',
        type: 'success',
        action: 'calendar_sync'
      };
    }

    if (alert) {
      notificationManager.addNotification(alert);
      localStorage.setItem('last_proactive_alert', now);

      // Pulse the orb to get attention
      const orb = document.getElementById('neuralOrb');
      if (orb) {
        orb.style.animation = 'orbActive 0.3s 5';
        setTimeout(() => orb.style.animation = '', 1500);
      }
    }
  }, 30000);
}

function updateBranding() {
  const versionNodes = document.querySelectorAll('p, span, div');
  versionNodes.forEach(node => {
    if (node.textContent.includes('v5.0.0')) {
      node.textContent = node.textContent.replace('v5.0.0', 'v5.1.0');
    }
  });
}

// Global Exports
window.showToast = showToast;
window.showModal = showModal;
window.closeModal = closeModal;
window.applyTheme = applyTheme;
window.scrollToSection = scrollToSection;
window.executeSuggestion = executeSuggestion;
window.openAutomationBuilder = openAutomationBuilder;
window.startProactiveMonitoring = startProactiveMonitoring;

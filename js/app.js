/**
 * Advanced Mobile Control AI Assistant
 * Core Application Logic & Lifecycle Manager
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
  console.log('?? Initializing VIP AI Assistant Core...');

  // Setup device info
  detectDevice();

  // Initialize UI components
  initParticles();
  initTheme();
  setupEventListeners();

  // Start hardware monitoring
  startHardwareMonitoring();

  // Initial dashboard update
  updateDashboardWidgets();

  // Initialize Command Center (v5.0)
  if (window.commandCenter && window.commandCenter.initCommandCenter) {
    setTimeout(() => {
      window.commandCenter.initCommandCenter();
    }, 500);
  }

  // Initialize always-listening system (v5.0)
  if (window.initAlwaysListening) {
    setTimeout(() => {
      window.initAlwaysListening();
      // Check if user previously enabled it
      const wasEnabled = localStorage.getItem('alwaysListeningEnabled') === 'true';
      if (wasEnabled) {
        setTimeout(() => window.startAlwaysListening(), 1000);
      }
    }, 1000);
  }

  appState.isInitialized = true;
  console.log('✅ AI Core Online');
}

/**
 * Detect device type and environment
 */
function detectDevice() {
  const ua = navigator.userAgent;
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);

  appState.context.device.isMobile = isMobile;
  appState.context.device.type = isMobile ? 'Mobile Node' : 'Command Station';
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

  const particleCount = appState.context.device.isMobile ? 15 : 40;

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
  });
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
        el.innerHTML = `<span class="badge ${level < 20 ? 'badge-error' : 'badge-success'}">${isCharging ? '? ' : ''}${level}%</span>`;
        // v2.8 Automatic Power Saving
        if (level < 20 && !isCharging) {
          document.documentElement.style.setProperty('--color-accent-primary', 'var(--color-warning-500)');
        } else {
          document.documentElement.style.removeProperty('--color-accent-primary');
        }
      } else {
        el.textContent = `${isCharging ? '? ' : ''}${level}%`;
      }
    }
  });

  // v4.3.0 Autonomous Check
  if (window.evaluateRoutines) {
    window.evaluateRoutines('battery', level);
    window.evaluateRoutines('charging', isCharging);
  }
}

function updateNetworkInfo(connection) {
  const type = connection.effectiveType || '4G';
  appState.context.network = type;

  const displays = ['contextNetwork', 'mNetworkVal'];
  displays.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = type.toUpperCase();
  });
}

function updateLocalTime() {
  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const displays = ['currentTime', 'mTimeVal'];
  displays.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = timeStr;
  });
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

  // Update Suggestion Engine
  generateSuggestions();

  // v2.9 Environmental Detection
  updateEnvironment();
}

function updateEnvironment() {
  const envDetail = document.getElementById('envDetail');
  if (!envDetail) return;

  const contexts = ['Home Network', 'Secure Office', 'Transit Node', 'Public Gateway'];
  const city = 'San Francisco';

  const currentCtx = contexts[Math.floor(Math.random() * contexts.length)];
  envDetail.textContent = currentCtx;

  const locEl = document.getElementById('wDesc');
  if (locEl) {
    const currentText = locEl.textContent.split('�')[0];
    locEl.textContent = `${currentText} � ${city}`;
  }

  // Attempt real precise location
  if (navigator.geolocation) {
    // Only fetch once every 5 minutes
    const lastFetch = localStorage.getItem('last_geo_fetch');
    if (!lastFetch || (Date.now() - parseInt(lastFetch)) > 300000) {
      navigator.geolocation.getCurrentPosition(pos => {
        localStorage.setItem('last_geo_fetch', Date.now().toString());
        // Simulating reverse geo
        console.log('?? Precision Location Acquired');
      });
    }
  }
}

function generateSuggestions() {
  const container = document.getElementById('suggestions');
  if (!container) return;

  const suggestions = [
    { text: 'Analyze Data Usage', action: 'usage_analytics' },
    { text: 'Optimize Resources', action: 'optimize_resources' },
    { text: 'Check Security Protocol', action: 'biometric_lock' },
    { text: 'Review Automation', action: 'automation_builder' }
  ];

  // Pick 2 random
  const shuffled = suggestions.sort(() => 0.5 - Math.random()).slice(0, 2);

  container.innerHTML = shuffled.map(s => `
    <div class="suggestion-chip" onclick="executeSuggestion('${s.action}')">
      ${s.text}
    </div>
  `).join('');
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
  // Placeholder for modal management logic
  // Typically handled in js/functions.js or js/shortcuts.js
  if (type === 'settings') {
    renderSettingsModal();
  }
}

function renderSettingsModal() {
  const modalContainer = document.getElementById('modalContainer');
  if (!modalContainer) return;

  modalContainer.innerHTML = `
    <div class="modal-overlay active" onclick="closeModal(event)">
      <div class="modal" onclick="event.stopPropagation()">
        <div class="modal-header">
          <h2 class="modal-title">?? System Settings</h2>
          <button class="modal-close" onclick="closeModal()">&times;</button>
        </div>
        <div class="modal-body">
          <div class="settings-group">
            <label>AI Kernel Mode</label>
            <div class="persona-selector">
              <button class="persona-btn active">PRO</button>
              <button class="persona-btn" onclick="showToast('Mode Locked', 'Concise mode requires Platinum subscription', 'warning')">MIN</button>
              <button class="persona-btn" onclick="showToast('Mode Locked', 'Creative mode requires Platinum subscription', 'warning')">ART</button>
            </div>
          </div>

          <div class="settings-group" style="margin-top: 20px;">
            <label>Appearance Theme</label>
            <select class="form-control" onchange="applyTheme(this.value)">
              <option value="dark" ${appState.theme === 'dark' ? 'selected' : ''}>Cyberpunk Dark</option>
              <option value="light" ${appState.theme === 'light' ? 'selected' : ''}>Silicon Light</option>
            </select>
          </div>

          <div class="settings-group" style="margin-top: 20px;">
            <label>OpenAI API Key</label>
            <input type="password" class="form-control" placeholder="sk-..." value="${localStorage.getItem('openai_api_key') || ''}" 
              onchange="localStorage.setItem('openai_api_key', this.value); showToast('Key Updated', 'API key saved securely', 'success')">
          </div>
          
          <div class="settings-actions" style="margin-top: 30px; display: flex; gap: 10px;">
            <button class="btn btn-glass btn-sm" onclick="exportImportManager.showExportModal()">?? Backup</button>
            <button class="btn btn-glass btn-sm" onclick="performanceMonitor.showStatsModal()">?? Performance</button>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-primary" onclick="closeModal()">Save Changes</button>
        </div>
      </div>
    </div>
  `;
}

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

// Update Weather simulation
function updateWeather() {
  const wTemp = document.getElementById('wTemp');
  const wDesc = document.getElementById('wDesc');
  if (wTemp && wDesc) {
    const temps = [68, 70, 72, 74, 75];
    const descs = ['Sunny', 'Partly Cloudy', 'Clear Skies'];
    wTemp.textContent = `${temps[Math.floor(Math.random() * temps.length)]}�F`;
    wDesc.textContent = `${descs[Math.floor(Math.random() * descs.length)]} � San Francisco`;
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

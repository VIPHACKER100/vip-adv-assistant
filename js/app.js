import utils from './utils.js';
import errorHandler from './error-handler.js';

/**
 * VIP AI SYMPHONY - Core Kernel v7.0
 * Primary Application Logic & Lifecycle Management
 */

class VIPApp {
  constructor() {
    this.state = {
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

    this.lastScrollTop = 0;

    // Expose state globally for backward compatibility where necessary
    window.appState = this.state;

    this.init();
  }

  /**
   * Initialize core application
   */
  async init() {
    try {
      console.log('🌌 INITIALIZING_SYMPHONY_V7_KERNEL...');

      // Wait for DOM content to be fully loaded
      if (document.readyState === 'loading') {
        await new Promise(resolve => document.addEventListener('DOMContentLoaded', resolve));
      }

      // Setup device info
      this.detectDevice();

      // Initialize UI components
      this.initParticles();
      this.initTheme();
      this.setupEventListeners();
      this.initScrollHandler();
      this.initScrollReveal();

      // Initialize Performance Monitor
      if (window.performanceMonitor) {
        window.performanceMonitor.init();
      }

      // Start hardware monitoring
      this.startHardwareMonitoring();

      // Initial dashboard update
      this.updateDashboardWidgets();

      // v6.0 Live Location Init
      this.fetchLiveLocationData();

      // v6.0 Neural Hub Sync
      if (window.syncNeuralOrb) {
        window.syncNeuralOrb();
      }

      // Initialize Command Center (v7.0)
      if (window.commandCenter && window.commandCenter.initCommandCenter) {
        setTimeout(() => {
          window.commandCenter.initCommandCenter();
        }, 400);
      }

      // Initialize always-listening system (v7.0)
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
      if (window.renderFunctionCategories) {
        window.renderFunctionCategories();
      }

      // v6.0 Proactive Monitoring
      this.startProactiveMonitoring();

      // Standardize Branding
      this.updateBranding();

      this.state.isInitialized = true;
      console.log('✅ SYMPHONY_OS_ONLINE');

      if (window.showToast) {
        window.showToast('Symphony OS', 'Neural Link Established. System Ready.', 'success');
      }
    } catch (error) {
      errorHandler.handleError(error, { context: 'app-init' });
    }
  }

  /**
   * Handle scrollreveal animations using Intersection Observer (v7.0)
   */
  initScrollReveal() {
    const elements = document.querySelectorAll('.scroll-reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    elements.forEach(el => observer.observe(el));
  }

  /**
   * Handle scroll-driven UI changes with throttling and requestAnimationFrame
   */
  initScrollHandler() {
    const header = document.querySelector('.header');
    if (!header) return;

    window.addEventListener('scroll', utils.throttle(() => {
      window.requestAnimationFrame(() => {
        const isScrolled = window.scrollY > 20;
        header.classList.toggle('scrolled', isScrolled);

        if (this.state.context.device.isMobile) {
          this.handleMobileHeaderScroll();
        }
      });
    }, 100), { passive: true });
  }

  handleMobileHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;

    const st = window.pageYOffset || document.documentElement.scrollTop;
    if (st > this.lastScrollTop && st > 100) {
      header.style.transform = 'translateY(-100%)';
    } else {
      header.style.transform = 'translateY(0)';
    }
    this.lastScrollTop = st <= 0 ? 0 : st;
  }

  /**
   * Detect device type and environment
   */
  detectDevice() {
    const ua = navigator.userAgent;
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);

    this.state.context.device.isMobile = isMobile;
    this.state.context.device.type = isMobile ? 'NEURAL_NODE_MOBILE' : 'CORE_COMMAND_STATION';
    this.state.context.device.os = this.detectOS(ua);

    // Set body classes
    document.body.classList.toggle('is-mobile', isMobile);
    document.body.classList.toggle('is-desktop', !isMobile);

    const contextLocation = document.getElementById('contextLocation');
    if (contextLocation) {
      contextLocation.textContent = this.state.context.device.type;
    }
  }

  detectOS(ua) {
    if (ua.indexOf('Win') !== -1) return 'Windows Kernel';
    if (ua.indexOf('Mac') !== -1) return 'Darwin Core';
    if (ua.indexOf('Android') !== -1) return 'Android Linux';
    if (ua.indexOf('Linux') !== -1) return 'Generic Linux';
    return 'VIP Hybrid OS';
  }

  /**
   * Initialize particle visualizer
   */
  initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    const particleCount = this.state.context.device.isMobile ? 10 : 40;

    for (let i = 0; i < particleCount; i++) {
      this.createParticle(container);
    }
  }

  createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';

    const size = Math.random() * 5 + 2;
    const left = Math.random() * 100;
    const duration = Math.random() * 15 + 10;
    const delay = Math.random() * 10;

    Object.assign(particle.style, {
      width: `${size}px`,
      height: `${size}px`,
      left: `${left}%`,
      animationDuration: `${duration}s`,
      animationDelay: `-${delay}s`
    });

    container.appendChild(particle);
  }


  /**
   * Theme initialization
   */
  initTheme() {
    const savedTheme = localStorage.getItem('vip_theme') || 'dark';
    this.applyTheme(savedTheme);
  }

  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    this.state.theme = theme;
    localStorage.setItem('vip_theme', theme);

    // v5.0 Performance: Add low-power mode flag if mobile and battery low
    if (this.state.context.device.isMobile && this.state.context.battery?.level < 30) {
      document.body.classList.add('low-power-mode');
    } else {
      document.body.classList.remove('low-power-mode');
    }
  }

  /**
   * Global Event Listeners
   */
  setupEventListeners() {
    // Navigation scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = anchor.getAttribute('href');
        const target = document.querySelector(targetId);
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
        this.toggleGhostMode();
      }
    });
  }

  toggleGhostMode() {
    const isGhost = document.body.classList.toggle('ghost-mode');
    if (window.showToast) {
      window.showToast('Visual Interface', isGhost ? '?? GHOST_MODE_ACTIVE' : 'Standard UI Restored', isGhost ? 'warning' : 'success');
    }

    if (window.cognitiveStream) {
      window.cognitiveStream.addLine(isGhost ? '> WARN: SYSTEM_VISIBILITY_ALTERED' : '> INFO: UI_CALIBRATION_STANDARD');
    }
  }

  /**
   * Hardware State Monitoring
   */
  startHardwareMonitoring() {
    // Battery API
    if ('getBattery' in navigator) {
      navigator.getBattery().then(battery => {
        this.updateBatteryInfo(battery);
        battery.addEventListener('levelchange', () => this.updateBatteryInfo(battery));
        battery.addEventListener('chargingchange', () => this.updateBatteryInfo(battery));
      });
    }

    // Network API
    if (navigator.connection) {
      this.updateNetworkInfo(navigator.connection);
      navigator.connection.addEventListener('change', () => this.updateNetworkInfo(navigator.connection));
    }

    // Time update
    setInterval(() => this.updateLocalTime(), 1000);
    this.updateLocalTime();

    // Dashboard Heartbeat
    setInterval(() => this.updateDashboardWidgets(), 5000);
  }

  updateBatteryInfo(battery) {
    const level = Math.round(battery.level * 100);
    const isCharging = battery.charging;

    this.state.context.battery = { level, isCharging };

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

  updateNetworkInfo(connection) {
    const type = (connection.effectiveType || '5G').toUpperCase();
    this.state.context.network = type;

    const displays = ['contextNetwork', 'mNetworkVal'];
    displays.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.innerHTML = `<span class="badge badge-accent" style="font-family: var(--font-family-mono); letter-spacing: 1px;">${type}</span>`;
      }
    });
  }

  updateLocalTime() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
    const compactTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const desktopDisplay = document.getElementById('currentTime');
    const mobileDisplay = document.getElementById('mTimeVal');

    if (desktopDisplay) desktopDisplay.textContent = timeStr;
    if (mobileDisplay) mobileDisplay.textContent = compactTime;

    // v6.0 Pulse tab bar active state
    if (this.state.context.device.isMobile) {
      this.updateMobileTabState();
    }
  }

  updateMobileTabState() {
    const scrollPos = window.scrollY;

    // Default to home if at top
    if (scrollPos < 100) {
      this.setMobileTabActive('tab-home');
    }
  }

  setMobileTabActive(tabId) {
    document.querySelectorAll('.mobile-tab-bar .tab-item').forEach(t => t.classList.remove('active'));
    const activeTab = document.getElementById(tabId);
    if (activeTab) activeTab.classList.add('active');
  }

  /**
   * Intelligence Hub Content Management
   */
  updateDashboardWidgets() {
    // Update Health Bars
    const mem = document.getElementById('memProgress');
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
      const latency = window.openaiHandler.usage?.lastResponseTime || Math.floor(Math.random() * 50 + 100);
      aiLatency.textContent = `${latency}ms`;
    }

    // Update Suggestion Engine
    this.generateSuggestions();

    // v5.1 Cognitive Stream
    if (window.cognitiveStream && typeof window.cognitiveStream.generateThought === 'function') {
      const thought = window.cognitiveStream.generateThought();
      window.cognitiveStream.addLine(thought);
    }

    // v2.9 Environmental Detection
    this.updateEnvironment();
  }

  updateEnvironment() {
    const envDetail = document.getElementById('envDetail');
    if (!envDetail) return;

    const contexts = ['Home Network', 'Secure Office', 'Transit Node', 'Public Gateway', 'Mobile Data Hub'];
    const currentCtx = contexts[Math.floor(Math.random() * contexts.length)];
    envDetail.textContent = currentCtx;
  }

  /**
   * Fetch real geolocation and reverse geocode info
   */
  async fetchLiveLocationData() {
    if (!navigator.geolocation) {
      console.warn('Geolocation not supported');
      return;
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      this.state.context.location.lat = latitude;
      this.state.context.location.lon = longitude;

      try {
        // Free Client-side Reverse Geocode
        const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
        const data = await res.json();

        const city = data.city || data.locality || 'Unknown Sector';
        this.state.context.location.city = city;

        console.log(`📍 Location Acquired: ${city} (${latitude.toFixed(2)}, ${longitude.toFixed(2)})`);
        if (window.showToast) {
          window.showToast('Location Sync', `Synchronized to ${city} Node`, 'success');
        }

        // Update Weather immediately after location is found
        if (window.updateWeather) window.updateWeather();
      } catch (e) {
        console.error('Reverse geocode failed', e);
        this.state.context.location.city = 'Global Node';
      }
    }, (error) => {
      console.warn('Location Access Denied:', error.message);
      this.state.context.location.city = 'Secure Hub';
    });
  }

  generateSuggestions() {
    const container = document.getElementById('suggestions');
    if (!container) return;

    const context = this.state.context;
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
  renderFunctionCategories() {
    const container = document.getElementById('categoriesContainer');
    const quickGrid = document.getElementById('quickActionsGrid');
    if (!container || !window.getFunctionCategories) return;

    const categories = window.getFunctionCategories();

    // Render Categories
    container.innerHTML = categories.map(cat => `
            <div class="category-section animate-fade-in-up" style="margin-bottom: var(--s10);">
                <div style="display: flex; align-items: center; gap: var(--s4); margin-bottom: var(--s6);">
                    <div class="card-icon" style="background: var(--color-primary-dim); color: var(--color-primary);">${cat.icon}</div>
                    <div>
                        <h3 style="font-size: 1.25rem; text-transform: uppercase; letter-spacing: 0.1em;">${cat.name}</h3>
                        <p style="font-size: 0.75rem; color: var(--text-mute);">${cat.description}</p>
                    </div>
                </div>
                <div class="node-grid">
                    ${cat.functions.map(f => `
                        <div class="neural-glass neural-card" onclick="executeFunction('${f.id}')">
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <div class="card-icon">${f.icon}</div>
                                ${f.badge ? `<span style="font-size: 0.6rem; padding: 2px 8px; background: var(--color-primary); color: var(--color-foundation); border-radius: 10px; font-weight: 800;">${f.badge}</span>` : ''}
                            </div>
                            <h3 style="font-size: 0.9rem; margin-top: var(--s2);">${f.title}</h3>
                            <p style="font-size: 0.7rem; opacity: 0.7;">${f.description}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');

    // Populate Quick Actions
    if (quickGrid) {
      const popular = categories.flatMap(c => c.functions).filter(f => f.badge === 'Popular' || f.isPopular).slice(0, 4);
      quickGrid.innerHTML = popular.map(f => `
                <div class="neural-glass neural-card" onclick="executeFunction('${f.id}')">
                    <div class="card-icon" style="background: var(--color-secondary-glow); color: var(--color-secondary);">${f.icon}</div>
                    <h3 style="font-size: 0.9rem; margin-top: var(--s2);">${f.title}</h3>
                </div>
            `).join('');
    }
  }

  /**
   * Global Utility Functions
   */
  showToast(title, message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    const color = type === 'error' ? 'var(--color-error)' : (type === 'success' ? 'var(--color-success)' : 'var(--color-primary)');

    toast.className = `neural-glass toast active`;
    toast.style.borderLeft = `4px solid ${color}`;
    toast.style.padding = 'var(--s4)';
    toast.style.display = 'flex';
    toast.style.flexDirection = 'column';
    toast.style.gap = 'var(--s1)';

    toast.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <strong style="color: ${color}; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.1em;">${title}</strong>
                <button onclick="this.parentElement.parentElement.remove()" style="background:none; border:none; color: var(--text-mute); cursor:pointer;">&times;</button>
            </div>
            <div style="font-size: 0.9rem; color: var(--text-main);">${message}</div>
        `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-20px)';
      setTimeout(() => toast.remove(), 400);
    }, 4000);
  }

  showModal(type) {
    if (type === 'settings') {
      this.renderSettingsModal();
    } else if (type === 'demo') {
      const modalContainer = document.getElementById('modalContainer');
      if (modalContainer) {
        modalContainer.innerHTML = `
                    <div class="modal-overlay active" onclick="closeModal(event)">
                        <div class="bottom-sheet" onclick="event.stopPropagation()">
                            <div class="sheet-handle"></div>
                            <div class="modal-header">
                                <h2 class="modal-title">NEURAL_DEVEL_PREVIEW</h2>
                                <button class="icon-btn" onclick="closeModal()">×</button>
                            </div>
                            <div style="aspect-ratio: 16/9; background: var(--color-foundation); border-radius: 20px; display: flex; align-items: center; justify-content: center; margin-bottom: 24px; border: 2px solid var(--color-primary); box-shadow: var(--shadow-neon-primary);">
                                <span style="font-size: 4rem; filter: drop-shadow(0 0 10px var(--color-primary));">⚡</span>
                            </div>
                            <p style="color: var(--text-dim); margin-bottom: 32px; line-height: 1.6;">Welcome to VIP SYMPHONY 7.0. The first browser-based OS prototype utilizing our proprietary 'Neural Flux' design language. High-bandwidth interactions, zero-latency feedback, and an ultra-secure local kernel.</p>
                            <button class="btn-neural btn-neural-primary" style="width: 100%;" onclick="closeModal()">ACKNOWLEDGE</button>
                        </div>
                    </div>
                `;
      }
    }
  }

  renderSettingsModal() {
    const modalContainer = document.getElementById('modalContainer');
    if (!modalContainer) return;

    modalContainer.innerHTML = `
            <div class="modal-overlay active" onclick="closeModal(event)">
                <div class="bottom-sheet" onclick="event.stopPropagation()" style="padding-top: var(--s12);">
                    <div class="sheet-handle"></div>
                    <div class="modal-header">
                        <h2 class="modal-title">KERNEL_CONFIGURATION</h2>
                        <button class="icon-btn" onclick="closeModal()">×</button>
                    </div>
                    
                    <div style="display: flex; gap: var(--s4); overflow-x: auto; padding-bottom: var(--s4); margin-bottom: var(--s6); scrollbar-width: none;">
                        <button class="btn-neural btn-neural-glass" style="white-space: nowrap;" onclick="switchSettingsTab('general')">⚡ GENERAL</button>
                        <button class="btn-neural btn-neural-glass" style="white-space: nowrap;" onclick="switchSettingsTab('cognitive')">🧠 NEURAL</button>
                        <button class="btn-neural btn-neural-glass" style="white-space: nowrap;" onclick="switchSettingsTab('hardware')">🛰️ TELEMETRY</button>
                        <button class="btn-neural btn-neural-glass" style="white-space: nowrap;" onclick="switchSettingsTab('advanced')">🛡️ SECURITY</button>
                    </div>
                    
                    <div id="settingsTabContent" style="min-height: 300px; padding: var(--s4); background: var(--color-surface-800); border-radius: 24px; border: 1px solid var(--glass-border);">
                        <!-- Tab content injected -->
                    </div>
                    
                    <div style="margin-top: var(--s8); display: flex; align-items: center; justify-content: space-between;">
                        <span style="font-family: var(--font-family-mono); font-size: 0.6rem; color: var(--text-mute);">CORE_STABLE_7.0.0</span>
                        <button class="btn-neural btn-neural-primary" onclick="closeModal(); showToast('Sync Complete', 'Neural baseline localized', 'success');">COMMIT_CHANGES</button>
                    </div>
                </div>
            </div>
        `;

    this.switchSettingsTab('general');
  }

  /**
   * Switch settings tabs dynamically
   */
  switchSettingsTab(tabId) {
    const content = document.getElementById('settingsTabContent');
    if (!content) return;

    // Remove active classes
    document.querySelectorAll('.settings-nav-item').forEach(el => el.classList.remove('active'));

    // Set calling element active
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
                                <div class="theme-preview ${this.state.theme === 'dark' ? 'active' : ''}" onclick="applyTheme('dark'); switchSettingsTab('general');">
                                    <div style="background: #0f172a; height: 40px; border-radius: 6px;"></div>
                                    <span style="font-size: 12px; margin-top: 4px; display: block; text-align: center;">Cyber Dark</span>
                                </div>
                                <div class="theme-preview ${this.state.theme === 'light' ? 'active' : ''}" onclick="applyTheme('light'); switchSettingsTab('general');">
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
                            <label>Neural Visualization (v7.0)</label>
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

  closeModal(event) {
    const modalOverlay = document.querySelector('.modal-overlay');
    if (modalOverlay) {
      modalOverlay.classList.remove('active');
      setTimeout(() => (modalOverlay.remove()), 300);
    }
  }

  scrollToSection(id) {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }

  executeSuggestion(id) {
    if (window.executeFunction) {
      window.executeFunction(id);
    }
  }

  openAutomationBuilder() {
    if (window.openAutomationBuilder) {
      window.openAutomationBuilder();
    }
  }
  async updateWeather() {
    const wTemp = document.getElementById('wTemp');
    const wDesc = document.getElementById('wDesc');
    const wHum = document.getElementById('wHumidity');
    const wAQI = document.getElementById('wAQI');
    if (!wTemp || !wDesc) return;

    const lat = this.state.context.location.lat;
    const lon = this.state.context.location.lon;
    const city = this.state.context.location.city;

    // Use simulation if no location yet
    if (!lat || !lon) {
      const temps = [68, 70, 72, 74, 75];
      const descs = ['Sunny', 'Partly Cloudy', 'Clear Skies'];
      wTemp.textContent = `${temps[Math.floor(Math.random() * temps.length)]}°F`;
      wDesc.textContent = `${descs[Math.floor(Math.random() * descs.length)]} • ${city}`;
      if (wHum) {
        wHum.textContent = `${Math.floor(Math.random() * 30 + 50)}%`;
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

        if (wHum) {
          const humidity = data.hourly?.relative_humidity_2m ? data.hourly.relative_humidity_2m[0] : Math.floor(Math.random() * 20 + 40);
          wHum.textContent = `${humidity}%`;
        }

        if (wAQI) {
          const qualities = ['Excellent', 'Good', 'Moderate'];
          wAQI.textContent = qualities[Math.floor(Math.random() * qualities.length)];
        }

        console.log(`🌤️ Weather Updated for ${city}: ${temp}°F, ${condition}`);
      }
    } catch (e) {
      console.error('Weather sync failed', e);
    }
  }

  /**
   * Advanced Visual Telemetry & HUD
   */
  toggleHUD() {
    const overlay = document.getElementById('hudOverlay');
    if (!overlay) return;

    const isActive = overlay.classList.toggle('active');

    if (isActive) {
      this.renderHUDContent();
      setTimeout(() => {
        this.initCanvasCharts();
        this.hudInterval = setInterval(() => this.updateTelemetry(), 100);
      }, 50);
      this.showToast('HUD Activated', 'Command Center Telemetry Live', 'success');
    } else {
      clearInterval(this.hudInterval);
      this.canvasCharts = {};
    }
  }

  renderHUDContent() {
    const overlay = document.getElementById('hudOverlay');
    const battery = this.state.context.device.isMobile ? '85%' : 'N/A (A/C Connected)';

    const memoryInfo = this.getMemoryInfo();

    overlay.innerHTML = `
            <div class="hud-header">
                <div style="display: flex; flex-direction: column;">
                    <h1 class="font-display" style="font-size: 2rem; margin: 0;">🛰️ Command Center HUD</h1>
                    <div class="hud-status-node">NODE_VIP_V7_STREAM :: SECURE</div>
                </div>
                <button class="btn btn-glass" onclick="toggleHUD()">Close HUD [ESC]</button>
            </div>
            
            <div class="hud-grid">
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

                <div class="glass-card">
                    <h4 style="margin-bottom: var(--space-4);">⚡ CPU Load</h4>
                    <div style="display: flex; justify-content: space-between; font-family: var(--font-family-mono); font-size: 12px; margin-bottom: 4px;">
                        <span>PROCESSOR_UTILIZATION</span>
                        <span id="cpuUsage">0%</span>
                    </div>
                    <canvas id="cpuChart" class="telemetry-canvas" width="400" height="120"></canvas>
                    <div style="font-size: 10px; color: var(--text-tertiary); margin-top: 4px; font-family: var(--font-family-mono);">
                        Cores: ${this.state.context.device.cores} | Threads: <span id="cpuThreads">${this.state.context.device.cores * 2}</span>
                    </div>
                </div>

                <div class="glass-card">
                    <h4 style="margin-bottom: var(--space-4);">🧠 Neural Load</h4>
                    <div style="display: flex; justify-content: space-between; font-family: var(--font-family-mono); font-size: 12px; margin-bottom: 4px;">
                        <span>PROBABILITY_FIELD</span>
                        <span id="neuralLoad">0%</span>
                    </div>
                    <canvas id="neuralChart" class="telemetry-canvas" width="400" height="120"></canvas>
                </div>

                <div class="glass-card">
                    <h4 style="margin-bottom: var(--space-4);">🌐 Network Stream</h4>
                    <div style="display: flex; justify-content: space-between; font-family: var(--font-family-mono); font-size: 12px; margin-bottom: 4px;">
                        <span>PACKET_DENSITY</span>
                        <span id="netStream">0 MB/s</span>
                    </div>
                    <canvas id="netChart" class="telemetry-canvas" width="400" height="120"></canvas>
                </div>

                <div class="glass-card">
                    <h4 style="margin-bottom: var(--space-4);">🛡️ Shield Status</h4>
                    <div style="display: flex; justify-content: space-between; font-family: var(--font-family-mono); font-size: 12px; margin-bottom: 4px;">
                        <span>THREAT_VECTOR</span>
                        <span id="threatLevel">0.001% (NULL)</span>
                    </div>
                    <canvas id="securityChart" class="telemetry-canvas" width="400" height="120"></canvas>
                </div>
                
                <div class="glass-card">
                    <h4 style="margin-bottom: var(--space-2);">💻 System Identity</h4>
                    <div style="font-size: 14px; line-height: 1.6; font-family: var(--font-family-mono);">
                        <div style="color: var(--text-tertiary);">PLATFORM: <span style="color: var(--color-accent-400);">${this.state.context.device.type}</span></div>
                        <div style="color: var(--text-tertiary);">KERNEL: <span style="color: var(--color-accent-400);">${this.state.context.device.os}</span></div>
                        <div style="color: var(--text-tertiary);">COMPUTE: <span style="color: var(--color-accent-400);">${this.state.context.device.cores} Logic Cores</span></div>
                        <div style="color: var(--text-tertiary);">ENERGY: <span style="color: var(--color-accent-400);">${battery}</span></div>
                        <div style="color: var(--text-tertiary); margin-top: 8px;">RAM: <span style="color: var(--color-accent-400);">${memoryInfo.total}MB Total</span></div>
                    </div>
                </div>
            </div>
        `;
  }

  getMemoryInfo() {
    let used = 0;
    let total = 0;

    if (performance.memory) {
      used = Math.round(performance.memory.usedJSHeapSize / 1048576);
      total = Math.round(performance.memory.totalJSHeapSize / 1048576);
    } else {
      used = Math.round(Math.random() * 200 + 100);
      total = 512;
    }

    return { used, total, percent: Math.round((used / total) * 100) };
  }

  initCanvasCharts() {
    const charts = ['ramChart', 'cpuChart', 'neuralChart', 'netChart', 'securityChart'];
    this.canvasCharts = {};
    this.telemetryData = {
      ram: Array(50).fill(0),
      cpu: Array(50).fill(0),
      neural: Array(50).fill(0),
      net: Array(50).fill(0),
      security: Array(50).fill(0),
      maxPoints: 100
    };

    charts.forEach(chartId => {
      const canvas = document.getElementById(chartId);
      if (!canvas) return;

      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      const width = rect.width || parseInt(canvas.getAttribute('width')) || 400;
      const height = rect.height || parseInt(canvas.getAttribute('height')) || 120;

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      const ctx = canvas.getContext('2d');
      ctx.scale(dpr, dpr);

      this.canvasCharts[chartId] = { canvas, ctx, width, height };
    });
  }

  updateTelemetry() {
    const memoryInfo = this.getMemoryInfo();
    const ramPercent = memoryInfo.percent;
    const cpuPercent = Math.min(100, (Math.random() * 20 + ramPercent * 0.3 + 10));
    const neuralVal = (Math.random() * 30 + 15);
    const netVal = (Math.random() * 50 + 5);
    const securityVal = Math.random() * 0.5;

    this.telemetryData.ram.push(ramPercent);
    this.telemetryData.cpu.push(cpuPercent);
    this.telemetryData.neural.push(neuralVal);
    this.telemetryData.net.push(netVal);
    this.telemetryData.security.push(securityVal);

    Object.keys(this.telemetryData).forEach(key => {
      if (Array.isArray(this.telemetryData[key]) && this.telemetryData[key].length > this.telemetryData.maxPoints) {
        this.telemetryData[key].shift();
      }
    });

    // Update UI
    utils.safeSetTextContent('ramUsage', `${memoryInfo.used}MB / ${memoryInfo.total}MB`);
    utils.safeSetTextContent('cpuUsage', `${cpuPercent.toFixed(1)}%`);
    utils.safeSetTextContent('neuralLoad', `${neuralVal.toFixed(1)}%`);
    utils.safeSetTextContent('netStream', `${netVal.toFixed(1)} MB/s`);
    utils.safeSetTextContent('threatLevel', `${securityVal.toFixed(3)}% (NULL)`);

    if (this.telemetryData.ram.length > 0) {
      const ramValues = this.telemetryData.ram.map(v => (v / 100) * memoryInfo.total);
      utils.safeSetTextContent('ramPeak', Math.round(Math.max(...ramValues)));
      utils.safeSetTextContent('ramAvg', Math.round(ramValues.reduce((a, b) => a + b, 0) / ramValues.length));
    }

    this.drawCanvasChart('ramChart', this.telemetryData.ram, '#3B82F6', '#1E40AF');
    this.drawCanvasChart('cpuChart', this.telemetryData.cpu, '#10B981', '#059669');
    this.drawCanvasChart('neuralChart', this.telemetryData.neural, '#8B5CF6', '#6D28D9');
    this.drawCanvasChart('netChart', this.telemetryData.net, '#F59E0B', '#D97706');
    this.drawCanvasChart('securityChart', this.telemetryData.security.map(v => v * 100), '#EF4444', '#DC2626');
  }

  drawCanvasChart(chartId, data, color, fillColor) {
    const chart = this.canvasCharts?.[chartId];
    if (!chart || !data?.length) return;

    const { ctx, width, height } = chart;
    const padding = 4;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    ctx.clearRect(0, 0, width, height);

    // Grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = padding + (chartHeight / 4) * i;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }

    if (data.length > 1) {
      const stepX = chartWidth / (data.length - 1);
      const maxValue = Math.max(...data, 100);

      const gradient = ctx.createLinearGradient(0, padding, 0, height - padding);
      gradient.addColorStop(0, fillColor + '80');
      gradient.addColorStop(1, fillColor + '00');

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

      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      data.forEach((value, index) => {
        const x = padding + index * stepX;
        const normalizedValue = Math.min(100, value) / maxValue;
        const y = height - padding - (normalizedValue * chartHeight);
        index === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      });
      ctx.stroke();
    }
  }

  /**
   * Boost Mode & Visual Excellence
   */
  toggleBoostMode() {
    this.state.isBoostActive = !this.state.isBoostActive;
    const body = document.body;
    const logo = document.querySelector('.logo-icon');

    if (this.state.isBoostActive) {
      body.classList.add('boost-active');
      if (logo) logo.style.filter = 'drop-shadow(0 0 20px var(--color-accent-400)) hue-rotate(45deg)';
      this.showToast('?? Boost Mode', 'Neural Cores Overclocked to 120%', 'accent');
      this.state.context.device.cores *= 1.5;

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
      utils.haptic([100, 50, 100]);
    } else {
      body.classList.remove('boost-active');
      if (logo) logo.style.filter = '';
      this.showToast('System Normalized', 'Returning to power-save cycles', 'info');
      this.state.context.device.cores /= 1.5;
      document.querySelectorAll('.boost-particle').forEach(p => p.remove());
    }
  }

  /**
   * Neural Orb Interaction Logic
   */
  syncNeuralOrb() {
    const orb = document.getElementById('neuralOrb');
    if (!orb) return;

    setInterval(() => {
      const isListening = (window.alwaysListening?.enabled && !window.alwaysListening?.isProcessing) || (window.voiceState?.isListening);
      const isTyping = window.chatManager?.isTyping || false;

      orb.classList.toggle('listening', isListening);

      if (isTyping) {
        orb.style.boxShadow = '0 0 40px var(--color-secondary-500)';
        orb.style.animationDuration = '0.5s';
      } else {
        orb.style.boxShadow = '';
        orb.style.animationDuration = isListening ? '0.8s' : '4s';
      }
    }, 500);

    orb.addEventListener('dblclick', () => {
      if (window.toggleVoiceAccess) window.toggleVoiceAccess();
    });
  }

  startOrbDrag(e) {
    const container = document.getElementById('neuralOrbContainer');
    if (!container) return;

    this.orbState = this.orbState || { isDragging: false };
    this.orbState.isDragging = true;
    const event = e.type.includes('touch') ? e.touches[0] : e;

    this.orbState.startX = event.clientX - container.offsetLeft;
    this.orbState.startY = event.clientY - container.offsetTop;

    container.style.cursor = 'grabbing';
    const orb = container.querySelector('.neural-orb');
    if (orb) orb.style.animationPlayState = 'paused';

    const onMove = (moveEvent) => {
      if (!this.orbState.isDragging) return;
      const move = moveEvent.type.includes('touch') ? moveEvent.touches[0] : moveEvent;

      let newX = move.clientX - this.orbState.startX;
      let newY = move.clientY - this.orbState.startY;

      newX = Math.max(0, Math.min(window.innerWidth - container.offsetWidth, newX));
      newY = Math.max(0, Math.min(window.innerHeight - container.offsetHeight, newY));

      container.style.left = `${newX}px`;
      container.style.top = `${newY}px`;
      container.style.bottom = 'auto';
      container.style.right = 'auto';
    };

    const onEnd = () => {
      this.orbState.isDragging = false;
      container.style.cursor = 'grab';
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

  /**
   * Make mobile status pill draggable
   */
  startPillDrag(e) {
    const container = document.getElementById('mobileStatusPill');
    if (!container) return;

    this.pillState = this.pillState || { isDragging: false };
    this.pillState.isDragging = true;
    const event = e.type.includes('touch') ? e.touches[0] : e;

    this.pillState.startX = event.clientX - container.offsetLeft;
    this.pillState.startY = event.clientY - container.offsetTop;

    container.style.cursor = 'grabbing';
    container.style.transition = 'none'; // Disable transition while dragging

    const onMove = (moveEvent) => {
      if (!this.pillState.isDragging) return;
      const move = moveEvent.type.includes('touch') ? moveEvent.touches[0] : moveEvent;

      let newX = move.clientX - this.pillState.startX;
      let newY = move.clientY - this.pillState.startY;

      // Keep within viewport
      newX = Math.max(0, Math.min(window.innerWidth - container.offsetWidth, newX));
      newY = Math.max(0, Math.min(window.innerHeight - container.offsetHeight, newY));

      container.style.left = `${newX}px`;
      container.style.top = `${newY}px`;
      container.style.bottom = 'auto';
      container.style.right = 'auto';
      container.style.transform = 'none'; // Override initial centering transform
    };

    const onEnd = () => {
      this.pillState.isDragging = false;
      container.style.cursor = 'grab';
      container.style.transition = 'all 0.3s ease'; // Re-enable transition
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

  /**
   * proactive Monitoring
   */
  startProactiveMonitoring() {
    console.log('?? Proactive Monitoring Initialized');

    setInterval(() => {
      const battery = this.state.context.battery;
      const weather = document.getElementById('wDesc')?.textContent?.toLowerCase() || '';
      const lastProactive = parseInt(localStorage.getItem('last_proactive_alert') || '0');
      const now = Date.now();

      if (now - lastProactive < 600000) return;

      let alert = null;

      if (battery?.level < 25 && !battery?.isCharging) {
        alert = {
          title: '?? Optimized Power Mode',
          message: `Battery at ${battery.level}%. Should I enable system-wide power saving?`,
          type: 'warning',
          action: 'performance_optimization'
        };
      } else if (weather.includes('rain') || weather.includes('storm')) {
        alert = {
          title: '?? Weather Advisory',
          message: 'Precipitation detected in your area. Enabling outdoor safety routines?',
          type: 'info',
          action: 'weather_check'
        };
      } else if (performance.memory && performance.memory.usedJSHeapSize > 100000000) {
        alert = {
          title: '🚀 Resource Peak',
          message: 'AI Hub detected high heap usage. Run resource optimizer?',
          type: 'info',
          action: 'optimize_resources'
        };
      } else if (new Date().getHours() >= 19) {
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

      if (alert && window.notificationManager) {
        window.notificationManager.addNotification(alert);
        localStorage.setItem('last_proactive_alert', now);

        const orb = document.getElementById('neuralOrb');
        if (orb) {
          orb.style.animation = 'orbActive 0.3s 5';
          setTimeout(() => orb.style.animation = '', 1500);
        }
      }
    }, 30000);
  }

  updateBranding() {
    document.querySelectorAll('p, span, div, h1, h2, h3').forEach(node => {
      const text = node.textContent;
      if (/(v5\.0\.0|v5\.1\.0|v6\.0)/.test(text)) {
        node.innerHTML = node.innerHTML.replace(/(v5\.0\.0|v5\.1\.0|v6\.0)/g, 'v7.0');
      }
    });
  }
}

// Global cleanup for intervals
window.addEventListener('beforeunload', () => {
  // Clear any persistent intervals if needed
});

// Create singleton instance
const app = new VIPApp();

// Global exports for backward compatibility
window.vipApp = app;
window.showToast = (t, m, ty) => app.showToast(t, m, ty);
window.showModal = (t) => app.showModal(t);
window.closeModal = (e) => app.closeModal(e);
window.switchSettingsTab = (id) => app.switchSettingsTab(id);
window.applyTheme = (t) => app.applyTheme(t);
window.toggleHUD = () => app.toggleHUD();
window.toggleBoostMode = () => app.toggleBoostMode();
window.startOrbDrag = (e) => app.startOrbDrag(e);
window.startPillDrag = (e) => app.startPillDrag(e);
window.syncNeuralOrb = () => app.syncNeuralOrb();
window.scrollToSection = (id) => app.scrollToSection(id);
window.executeSuggestion = (id) => app.executeSuggestion(id);
window.openAutomationBuilder = () => app.openAutomationBuilder();
window.updateWeather = () => app.updateWeather();
// Assuming these might exist elsewhere or be added later, keeping them for completeness if they were intended
// window.renderFunctionCategories = () => app.renderFunctionCategories();
// window.setMobileTabActive = (id) => app.setMobileTabActive(id);

// Initial calls that were global, now called on the app instance
app.syncNeuralOrb(); // This was previously a global call, now part of app initialization
app.startProactiveMonitoring(); // This was previously a global call, now part of app initialization
app.updateBranding(); // This was previously a global call, now part of app initialization

// Set up weather update interval
setInterval(() => app.updateWeather(), 60000); // Update once a minute

// Keyboard shortcuts for HUD & Boost
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && document.getElementById('hudOverlay').classList.contains('active')) {
    app.toggleHUD();
  }
  if (e.ctrlKey && e.shiftKey && e.key === 'B') {
    app.toggleBoostMode();
  }
});

export default app;

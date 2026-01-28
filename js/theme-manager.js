/**
 * VIP AI SYMPHONY - Strategic Spectrum Orchestrator v7.0
 * Intelligent Neural UI Calibration & Chroma Shifting
 */

const themeManager = {
  currentMode: localStorage.getItem('vip_theme_mode') || 'dark',

  init() {
    this.applyMode(this.currentMode);
    console.log('🌈 SPECTRUM_ORCHESTRATOR_ACTIVE');
  },

  applyMode(mode) {
    const root = document.documentElement;
    const isDark = mode === 'dark';

    // Smooth Transition Base Variables
    if (isDark) {
      root.style.setProperty('--color-foundation', 'hsl(230, 20%, 4%)');
      root.style.setProperty('--color-surface-900', 'hsl(230, 15%, 8%)');
      root.style.setProperty('--color-surface-800', 'hsl(230, 12%, 12%)');
      root.style.setProperty('--text-main', 'hsl(0, 0%, 98%)');
      root.style.setProperty('--text-dim', 'hsl(230, 10%, 70%)');
      root.style.setProperty('--glass-bg', 'hsla(230, 15%, 10%, 0.6)');
    } else {
      root.style.setProperty('--color-foundation', 'hsl(230, 20%, 96%)');
      root.style.setProperty('--color-surface-900', 'hsl(230, 15%, 92%)');
      root.style.setProperty('--color-surface-800', 'hsl(230, 12%, 88%)');
      root.style.setProperty('--text-main', 'hsl(230, 20%, 10%)');
      root.style.setProperty('--text-dim', 'hsl(230, 10%, 30%)');
      root.style.setProperty('--glass-bg', 'hsla(230, 15%, 95%, 0.6)');
    }

    this.currentMode = mode;
    localStorage.setItem('vip_theme_mode', mode);

    if (window.performanceMonitor) performanceMonitor.trackThemeChange();
  },

  toggle() {
    const next = this.currentMode === 'dark' ? 'light' : 'dark';
    this.applyMode(next);
    if (window.showToast) {
      window.showToast('Chroma Shift', `INTERFACE_CALIBRATED: ${next.toUpperCase()}_MODE`, 'success');
    }
  },

  setHue(type, value) {
    if (window.themeHub) {
      if (type === 'primary') window.themeHub.setPrimaryHue(value);
      else window.themeHub.setSecondaryHue(value);
    } else {
      document.documentElement.style.setProperty(`--color-${type}-hue`, value);
      localStorage.setItem(`vip_theme_${type}_hue`, value);
    }
  }
};

function toggleTheme() {
  themeManager.toggle();
}

window.themeManager = themeManager;
window.toggleTheme = toggleTheme;


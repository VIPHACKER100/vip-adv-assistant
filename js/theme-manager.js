<<<<<<< HEAD
/**
 * Theme Manager
 * Dark/Light/Auto theme switching with persistence
 */

const themeManager = {
    current: localStorage.getItem('theme') || 'dark',

    themes: {
        dark: {
            '--bg-primary': '#0F172A',
            '--bg-secondary': '#1E293B',
            '--bg-tertiary': '#334155',
            '--text-primary': '#F1F5F9',
            '--text-secondary': '#CBD5E1',
            '--text-tertiary': '#94A3B8'
        },
        light: {
            '--bg-primary': '#FFFFFF',
            '--bg-secondary': '#F8FAFC',
            '--bg-tertiary': '#F1F5F9',
            '--text-primary': '#0F172A',
            '--text-secondary': '#475569',
            '--text-tertiary': '#64748B'
        }
    },

    init() {
        this.apply(this.current);
        this.watchSystemPreference();
    },

    apply(theme) {
        const root = document.documentElement;

        if (theme === 'auto') {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            theme = prefersDark ? 'dark' : 'light';
        }

        const colors = this.themes[theme];
        if (colors) {
            Object.entries(colors).forEach(([property, value]) => {
                root.style.setProperty(property, value);
            });
        }

        this.current = theme;
        localStorage.setItem('theme', theme);

        // Update UI if settings modal is open
        this.updateThemeUI();
    },

    toggle() {
        const next = this.current === 'dark' ? 'light' : 'dark';
        this.apply(next);
        showToast('Theme', `Switched to ${next} mode`, 'success');
    },

    watchSystemPreference() {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (this.current === 'auto') {
                this.apply('auto');
            }
        });
    },

    updateThemeUI() {
        const themeSelect = document.getElementById('themeSelect');
        if (themeSelect) {
            themeSelect.value = this.current;
        }
    }
};

// Toggle theme (for keyboard shortcut)
function toggleTheme() {
    themeManager.toggle();
}

// Set theme from settings
function setTheme(theme) {
    themeManager.apply(theme);
}

// Export for global access
window.themeManager = themeManager;
window.toggleTheme = toggleTheme;
window.setTheme = setTheme;
=======
/**
 * Theme Manager
 * Dark/Light/Auto theme switching with persistence
 */

const themeManager = {
    current: localStorage.getItem('theme') || 'dark',

    themes: {
        dark: {
            '--bg-primary': '#0F172A',
            '--bg-secondary': '#1E293B',
            '--bg-tertiary': '#334155',
            '--text-primary': '#F1F5F9',
            '--text-secondary': '#CBD5E1',
            '--text-tertiary': '#94A3B8'
        },
        light: {
            '--bg-primary': '#FFFFFF',
            '--bg-secondary': '#F8FAFC',
            '--bg-tertiary': '#F1F5F9',
            '--text-primary': '#0F172A',
            '--text-secondary': '#475569',
            '--text-tertiary': '#64748B'
        }
    },

    init() {
        this.apply(this.current);
        this.watchSystemPreference();
    },

    apply(theme) {
        const root = document.documentElement;

        if (theme === 'auto') {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            theme = prefersDark ? 'dark' : 'light';
        }

        const colors = this.themes[theme];
        if (colors) {
            Object.entries(colors).forEach(([property, value]) => {
                root.style.setProperty(property, value);
            });
        }

        this.current = theme;
        localStorage.setItem('theme', theme);

        // Update UI if settings modal is open
        this.updateThemeUI();
    },

    toggle() {
        const next = this.current === 'dark' ? 'light' : 'dark';
        this.apply(next);
        showToast('Theme', `Switched to ${next} mode`, 'success');
    },

    watchSystemPreference() {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (this.current === 'auto') {
                this.apply('auto');
            }
        });
    },

    updateThemeUI() {
        const themeSelect = document.getElementById('themeSelect');
        if (themeSelect) {
            themeSelect.value = this.current;
        }
    }
};

// Toggle theme (for keyboard shortcut)
function toggleTheme() {
    themeManager.toggle();
}

// Set theme from settings
function setTheme(theme) {
    themeManager.apply(theme);
}

// Export for global access
window.themeManager = themeManager;
window.toggleTheme = toggleTheme;
window.setTheme = setTheme;
>>>>>>> aaf95f08b85548227262ee8797ec4f9d10497be1

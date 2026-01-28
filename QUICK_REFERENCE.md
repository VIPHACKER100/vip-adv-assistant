# Quick Reference Guide

## 🚀 Quick Start Commands

```bash
# Start the app
python -m http.server 8000
# Then visit: http://localhost:8000

# Or with Node.js
npx http-server -p 8000
```

---

## 🎤 Voice Commands Cheat Sheet

### Navigation & Panels

- "hey assistant" - Wake word activation
- "go home" - Scroll to top
- "show hud" - Command Center HUD
- "command center" - Telemetry View
- "show history" - Recent functions
- "close" - Close current modal

### Popular Functions

- "flashlight on/off" - Hardware control
- "lock system" - Security protocol
- "sos alert" - Emergency broadcast
- "clean speaker" - Sonic maintenance
- "optimize" - Performance boost
- "smart home" - IoT management

### System & Intelligence

- "always listening" - Toggle continuous mode
- "command palette" - Open registry
- "analyze image" - AI Vision
- "smart reply" - Message reply
- "toggle theme" - Dark/Light mode
- "qr scanner" - QR/Barcode scan
- "usage analytics" - Data usage

---

## ⌨️ Global Keyboard Shortcuts

- `Ctrl + Shift + P` - **Command Palette** (Unified Hub)
- `Ctrl + Shift + V` - **Always-Listening** Toggle
- `Ctrl + K` - **Omni-Search** (Spotlight)
- `Ctrl + J` - **AI Smart Hub** (Chat)
- `Ctrl + Shift + B` - **Boost Mode** Toggle
- `Ctrl + M` - **Voice Access** (Legacy)
- `Esc` - **Close/Back**

### Adding a Function

```javascript
// 1. Add to category in js/functions.js
{
  id: 'my_function',
  icon: '🎯',
  title: 'My Function',
  description: 'What it does'
}

// 2. Add simulation
case 'my_function':
  data = { result: 'Success' };
  break;
```

### Adding Voice Command

```javascript
// In js/voice-access.js
voiceState.commands = {
  'my command': () => executeFunction('my_function'),
};
```

### Showing Toast

```javascript
showToast('Title', 'Message', 'success'); // or 'error', 'warning', 'info'
```

### Opening Modal

```javascript
showModal('settings'); // or 'demo'
```

---

## 📊 Function Categories (v4.7)

1. **AI & Vision** (7)
2. **Automation** (5)
3. **Security** (8)
4. **Communication** (8)
5. **Context** (5)
6. **Smart Home** (4)
7. **Productivity** (10)
8. **Analytics** (6)
9. **Emergency** (4)
10. **Hardware** (12)
11. **Developer** (6)

**Total: 75+ Functions**

---

## 🎨 CSS Custom Properties

### Colors

```css
--color-primary-500: #7c3aed;
--color-accent-500: #06b6d4;
--color-success-500: #10b981;
--color-error-500: #ef4444;
--color-warning-500: #f59e0b;
--glass-bg: rgba(15, 23, 42, 0.7);
```

### Spacing

```css
--space-1: 0.25rem; /* 4px */
--space-2: 0.5rem; /* 8px */
--space-3: 0.75rem; /* 12px */
--space-4: 1rem; /* 16px */
--space-6: 1.5rem; /* 24px */
--space-8: 2rem; /* 32px */
```

### Typography

```css
--font-size-xs: 0.75rem; /* 12px */
--font-size-sm: 0.875rem; /* 14px */
--font-size-base: 1rem; /* 16px */
--font-size-lg: 1.125rem; /* 18px */
--font-size-xl: 1.25rem; /* 20px */
--font-size-2xl: 1.5rem; /* 24px */
```

---

## 🌐 Browser API Reference

### Battery Status

```javascript
if ('getBattery' in navigator) {
  navigator.getBattery().then((battery) => {
    console.log(battery.level * 100 + '%');
  });
}
```

### Network Information

```javascript
if (navigator.connection) {
  console.log(navigator.connection.effectiveType); // '4g', 'wifi', etc.
}
```

### Speech Recognition

```javascript
const recognition = new (
  window.SpeechRecognition || window.webkitSpeechRecognition
)();
recognition.start();
recognition.onresult = (event) => {
  console.log(event.results[0][0].transcript);
};
```

### Speech Synthesis

```javascript
const utterance = new SpeechSynthesisUtterance('Hello');
window.speechSynthesis.speak(utterance);
```

---

## 🔍 Debugging Tips

### Console Logging

```javascript
console.log('Debug:', value);
console.error('Error:', error);
console.warn('Warning:', warning);
console.table(arrayOfObjects);
```

### Check API Support

```javascript
console.log('Battery API:', 'getBattery' in navigator);
console.log('Speech API:', 'SpeechRecognition' in window);
console.log('Network API:', 'connection' in navigator);
```

### Monitor Events

```javascript
// In browser DevTools Console
monitorEvents(document.getElementById('voiceAccessBtn'));
```

---

## 📱 Responsive Breakpoints

```css
/* Mobile */
@media (max-width: 640px) {
}

/* Tablet */
@media (min-width: 768px) {
}

/* Desktop side-panels */
@media (min-width: 1024px) {
}

/* Large Desktop */
@media (min-width: 1280px) {
}
```

---

## 🛠️ Common Tasks

### Clear localStorage

```javascript
localStorage.clear();
location.reload();
```

### Force Refresh

```
Ctrl + Shift + R (Windows/Linux)
Cmd + Shift + R (macOS)
```

### Open DevTools

```
F12 or Ctrl + Shift + I (Windows/Linux)
Cmd + Option + I (macOS)
```

---

## 📚 File Locations

| What             | Where                    |
| ---------------- | ------------------------ |
| Main HTML        | `index.html`             |
| Core Logic       | `js/app.js`              |
| Command Center   | `js/command-center.js`   |
| Always Listening | `js/always-listening.js` |
| Functions        | `js/functions.js`        |
| Voice            | `js/voice-access.js`     |
| Automation       | `js/automation.js`       |
| AI Integration   | `js/openai-handler.js`   |
| Design Tokens    | `css/variables.css`      |
| Components       | `css/components.css`     |
| Animations       | `css/animations.css`     |

---

## 🎯 Testing Checklist

- [ ] All function cards clickable
- [ ] Modals open/close
- [ ] Voice toggle works
- [ ] Context panel updates
- [ ] Automation builder loads
- [ ] Toast notifications show
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Works in Chrome/Edge/Safari/Firefox

---

## 🔗 Useful Links

- **Documentation**: `README.md`
- **Changelog**: `CHANGELOG.md`
- **Technical**: `TECHNICAL_DETAILS.md`
- **Summary**: `FINAL_SUMMARY.md`
- **Contributing**: `CONTRIBUTING.md`
- **License**: `LICENSE`
- **Test Report**: `testsprite_tests/testsprite-mcp-test-report.md`

---

**Last Updated**: 2026-01-25 **Version**: 5.0.0 (Neural Symphony)

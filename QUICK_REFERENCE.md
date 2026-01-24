<<<<<<< HEAD
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

### Navigation
- "go home" - Scroll to top
- "scroll down" - Scroll down
- "scroll up" - Scroll up

### Popular Functions
- "analyze image" - Image analysis
- "smart reply" - Message suggestions
- "usage analytics" - Usage stats
- "secure vault" - Encrypted storage
- "focus mode" - Productivity mode
- "smart home" - IoT control

### Automation
- "automation builder" - Open builder
- "open automation" - View automations

### Controls
- "close" - Close modal
- "settings" - Open settings
- "help" - Show commands

---

## 🔧 Developer Quick Reference

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
  'my command': () => executeFunction('my_function')
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

## 📊 Function Categories

1. **AI & Vision** (7) - Image analysis, visual search, face recognition
2. **Automation** (5) - Workflows, routines, smart suggestions
3. **Security** (8) - Biometric auth, vault, VPN, app lock
4. **Communication** (8) - Smart reply, translation, voice assistant
5. **Context** (5) - Context analysis, predictions, memory
6. **Smart Home** (4) - IoT control, scenes, energy monitoring
7. **Productivity** (8) - Scanner, clipboard, focus mode, AR
8. **Analytics** (5) - Usage stats, wellness, performance
9. **Connectivity** (5) - Sync, network, WiFi, Bluetooth
10. **Emergency** (4) - SOS, crash detection, medical ID
11. **Accessibility** (4) - Screen reader, voice access, magnification
12. **Developer** (4) - Sensors, automation, debugging, API testing

**Total: 65+ Functions**

---

## 🎨 CSS Custom Properties

### Colors
```css
--color-primary-500: #7C3AED;
--color-accent-500: #06B6D4;
--color-success-500: #10B981;
--color-error-500: #EF4444;
--color-warning-500: #F59E0B;
```

### Spacing
```css
--space-1: 0.25rem;  /* 4px */
--space-2: 0.5rem;   /* 8px */
--space-3: 0.75rem;  /* 12px */
--space-4: 1rem;     /* 16px */
--space-6: 1.5rem;   /* 24px */
--space-8: 2rem;     /* 32px */
```

### Typography
```css
--font-size-xs: 0.75rem;   /* 12px */
--font-size-sm: 0.875rem;  /* 14px */
--font-size-base: 1rem;    /* 16px */
--font-size-lg: 1.125rem;  /* 18px */
--font-size-xl: 1.25rem;   /* 20px */
--font-size-2xl: 1.5rem;   /* 24px */
```

---

## 🌐 Browser API Reference

### Battery Status
```javascript
if ('getBattery' in navigator) {
  navigator.getBattery().then(battery => {
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
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
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
@media (max-width: 640px) { }

/* Tablet */
@media (min-width: 768px) { }

/* Desktop */
@media (min-width: 1024px) { }

/* Large Desktop */
@media (min-width: 1280px) { }
```

---

## 🛠️ Common Tasks

### Clear localStorage
```javascript
localStorage.clear();
location.reload();
```

### Set API Key
```javascript
localStorage.setItem('openai_api_key', 'sk-...');
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

| What | Where |
|------|-------|
| Main HTML | `index.html` |
| Core Logic | `js/app.js` |
| Functions | `js/functions.js` |
| Voice | `js/voice-access.js` |
| Automation | `js/automation.js` |
| AI Integration | `js/openai-handler.js` |
| Design Tokens | `css/variables.css` |
| Components | `css/components.css` |
| Animations | `css/animations.css` |

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
- **Contributing**: `CONTRIBUTING.md`
- **License**: `LICENSE`
- **Summary**: `PROJECT_SUMMARY.md`
- **Test Report**: `testsprite_tests/testsprite-mcp-test-report.md`

---

**Last Updated**: 2026-01-24
**Version**: 2.0.0
=======
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

### Navigation
- "go home" - Scroll to top
- "scroll down" - Scroll down
- "scroll up" - Scroll up

### Popular Functions
- "analyze image" - Image analysis
- "smart reply" - Message suggestions
- "usage analytics" - Usage stats
- "secure vault" - Encrypted storage
- "focus mode" - Productivity mode
- "smart home" - IoT control

### Automation
- "automation builder" - Open builder
- "open automation" - View automations

### Controls
- "close" - Close modal
- "settings" - Open settings
- "help" - Show commands

---

## 🔧 Developer Quick Reference

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
  'my command': () => executeFunction('my_function')
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

## 📊 Function Categories

1. **AI & Vision** (7) - Image analysis, visual search, face recognition
2. **Automation** (5) - Workflows, routines, smart suggestions
3. **Security** (8) - Biometric auth, vault, VPN, app lock
4. **Communication** (8) - Smart reply, translation, voice assistant
5. **Context** (5) - Context analysis, predictions, memory
6. **Smart Home** (4) - IoT control, scenes, energy monitoring
7. **Productivity** (8) - Scanner, clipboard, focus mode, AR
8. **Analytics** (5) - Usage stats, wellness, performance
9. **Connectivity** (5) - Sync, network, WiFi, Bluetooth
10. **Emergency** (4) - SOS, crash detection, medical ID
11. **Accessibility** (4) - Screen reader, voice access, magnification
12. **Developer** (4) - Sensors, automation, debugging, API testing

**Total: 65+ Functions**

---

## 🎨 CSS Custom Properties

### Colors
```css
--color-primary-500: #7C3AED;
--color-accent-500: #06B6D4;
--color-success-500: #10B981;
--color-error-500: #EF4444;
--color-warning-500: #F59E0B;
```

### Spacing
```css
--space-1: 0.25rem;  /* 4px */
--space-2: 0.5rem;   /* 8px */
--space-3: 0.75rem;  /* 12px */
--space-4: 1rem;     /* 16px */
--space-6: 1.5rem;   /* 24px */
--space-8: 2rem;     /* 32px */
```

### Typography
```css
--font-size-xs: 0.75rem;   /* 12px */
--font-size-sm: 0.875rem;  /* 14px */
--font-size-base: 1rem;    /* 16px */
--font-size-lg: 1.125rem;  /* 18px */
--font-size-xl: 1.25rem;   /* 20px */
--font-size-2xl: 1.5rem;   /* 24px */
```

---

## 🌐 Browser API Reference

### Battery Status
```javascript
if ('getBattery' in navigator) {
  navigator.getBattery().then(battery => {
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
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
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
@media (max-width: 640px) { }

/* Tablet */
@media (min-width: 768px) { }

/* Desktop */
@media (min-width: 1024px) { }

/* Large Desktop */
@media (min-width: 1280px) { }
```

---

## 🛠️ Common Tasks

### Clear localStorage
```javascript
localStorage.clear();
location.reload();
```

### Set API Key
```javascript
localStorage.setItem('openai_api_key', 'sk-...');
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

| What | Where |
|------|-------|
| Main HTML | `index.html` |
| Core Logic | `js/app.js` |
| Functions | `js/functions.js` |
| Voice | `js/voice-access.js` |
| Automation | `js/automation.js` |
| AI Integration | `js/openai-handler.js` |
| Design Tokens | `css/variables.css` |
| Components | `css/components.css` |
| Animations | `css/animations.css` |

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
- **Contributing**: `CONTRIBUTING.md`
- **License**: `LICENSE`
- **Summary**: `PROJECT_SUMMARY.md`
- **Test Report**: `testsprite_tests/testsprite-mcp-test-report.md`

---

**Last Updated**: 2026-01-24
**Version**: 2.0.0
>>>>>>> aaf95f08b85548227262ee8797ec4f9d10497be1

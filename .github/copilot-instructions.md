# VIP Advanced Mobile AI Assistant - AI Agent Instructions

## Project Overview

**VIP SYMPHONY v6.0** is a premium web-based AI assistant PWA with 75+ simulated
functions, voice control, real-time device monitoring, and automation workflows.
The codebase is a pure frontend (no backend) vanilla JavaScript application
designed for mobile-first responsiveness with glassmorphic UI aesthetics.

## Architecture & Core Components

### Application State & Initialization

- **Global state**: `window.appState` object manages device context, theme, UI
  panels, battery/network/location data
- **Entry point**: `index.html` loads all CSS (variables → layout → components →
  animations) then all JS modules
- **Initialization sequence** in `app.js` (`initApp()`):
  1. Detect device type and OS
  2. Initialize theme, particles, event listeners
  3. Start hardware monitoring, command center, always-listening system
  4. Render function categories dynamically

### Module Organization Pattern

Each major feature is an **object or class** exposed to `window` for
cross-module communication:

```javascript
// Module pattern (most common)
const moduleName = {
  state: {},
  init() {
    /* initialization logic */
  },
  publicMethod() {
    /* business logic */
  },
};
window.moduleName = moduleName;

// Class pattern (voice, face recognition)
class ClassName {
  /* ... */
}
window.instance = new ClassName();
```

**Key modules:**

- [js/app.js](js/app.js) - Core kernel, initialization, hardware monitoring
- [js/chat-manager.js](js/chat-manager.js) - AI chat interface, personality
  modes, OpenAI integration
- [js/functions.js](js/functions.js) - Function registry (75+ functions),
  category definitions
- [js/automation.js](js/automation.js) - Workflow orchestration, trigger-action
  patterns, templates
- [js/voice-manager.js](js/voice-manager.js) - Text-to-speech synthesis, voice
  configuration
- [js/voice-access.js](js/voice-access.js) - Speech recognition, command
  mapping, always-listening
- [js/face-recognition.js](js/face-recognition.js) - Face detection/recognition
  using face-api.min.js
- [js/command-center.js](js/command-center.js) - Real-time HUD showing AI load,
  network density, security
- [js/theme-manager.js](js/theme-manager.js) - Dark/light/auto theme switching
  via CSS variables
- [js/search.js](js/search.js) - Omni-search with fuzzy matching and keyboard
  navigation
- [js/notification-manager.js](js/notification-manager.js) - Toast notifications
  and persistent alerts
- [js/keyboard-shortcuts.js](js/keyboard-shortcuts.js) - Custom keybindings with
  conflict detection

### Data Persistence

All state persisted to `localStorage` with `vip_` prefix:

- `vip_chat_history` - Chat conversation history (JSON array)
- `vip_routines` - Saved automation workflows
- `vip_registered_faces` - Face recognition training data
- `vip_voice_settings`, `vip_ui_preferences` - User settings
- `openai_api_key`, `openai_model` - API configuration

## Function System & Execution Flow

### Function Registry Structure

[js/functions.js](js/functions.js#L4) defines 75+ functions across 8+
categories:

```javascript
{
    name: 'Category Name',
    icon: '🎯',
    functions: [
        {
            id: 'function_id',
            icon: '📸',
            title: 'Display Title',
            description: 'What this does',
            badge: 'V6_ENGINE',  // optional
            badgeType: 'accent'   // optional
        }
    ]
}
```

### Execution Pattern

```javascript
// From HTML: onclick="executeFunction('function_id')"
function executeFunction(functionId, params = {}) {
  const handler = functionHandlers[functionId];
  if (handler) {
    handler(params);
    logExecution(functionId); // Tracks in performance monitor
  }
}

// Handler pattern (in functions.js)
functionHandlers['function_id'] = (params) => {
  // Simulate or delegate function logic
  if (window.cognitiveStream) {
    window.cognitiveStream.addLine(`> EXECUTING: FUNCTION_NAME`);
  }
  showToast('Title', 'Result message', 'success');
};
```

**Critical**: Many functions are _simulated_ - they don't actually control
hardware but show realistic UI feedback. Real implementations would require
native APIs or platform bridges.

## Voice System Integration

### Two-Part Voice Architecture

1. **Voice Manager** (TTS) - [js/voice-manager.js](js/voice-manager.js)
   - Uses Web Speech API `speechSynthesis`
   - Auto-selects best natural voice (Google → Microsoft → default)
   - Exposes `window.speak(text, options)` globally

2. **Voice Access** (STT) - [js/voice-access.js](js/voice-access.js)
   - Uses `SpeechRecognition` API with fallbacks
   - Command map in `voiceState.commandMap` (~50 commands)
   - Always-listening mode with auto-restart on pause
   - Integrates with cognitive stream for visual feedback

### Voice Command Pattern

```javascript
voiceState.commandMap = {
  'neural scan': () => executeFunction('analyze_image'),
  'smart reply': () => executeFunction('smart_reply'),
  // ... mapped to function IDs
};

// Recognition result → fuzzy match → execute
recognition.onresult = (event) => {
  const transcript = event.results[0][0].transcript.toLowerCase();
  const match = findBestMatch(transcript, voiceState.commandMap);
  if (match) match.action();
};
```

## CSS Design System

### Color Token Strategy

[css/variables.css](css/variables.css) defines complete color system with
semantic naming:

- `--color-primary-*` (Purple/Blue scale)
- `--color-accent-*` (Cyan - primary UI)
- `--color-success-*`, `--color-error-*`, `--color-warning-*`
- `--bg-primary/secondary/tertiary`, `--text-primary/secondary/tertiary`

### Glassmorphism Patterns

```css
.glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border);
}
```

### Responsive Breakpoints

- Mobile-first: base styles for phones
- `body.is-mobile` / `body.is-desktop` classes toggle layouts
- Side panels on desktop, bottom sheets on mobile
- Header hides on scroll for mobile UX

## Development Workflows

### Starting the Server

```bash
# Python (simplest)
python -m http.server 8000

# Node.js
npx http-server

# PowerShell (Windows)
./start-server.ps1
```

Then open `http://localhost:8000` in Chrome 90+.

### Testing

**Automated Tests**: [testsprite_tests/](testsprite_tests/) - Playwright-based
test suite

```bash
python testsprite_tests/run_all_tests.py        # Run all
python testsprite_tests/TC003_*.py              # Run specific test
```

Tests verify: function execution, voice commands, keyboard shortcuts, favorites,
theme switching, offline PWA, automation builder, performance monitoring.

### Key Browser Requirements

- Chrome/Edge 90+ (full API support)
- Safari 14+ (limited Battery API)
- Firefox 88+ (Battery API not supported)
- Microphone + camera permissions for voice/face recognition

## Project-Specific Patterns

### Cognitive Stream (Real-time Thinking)

[js/cognitive-stream.js](js/cognitive-stream.js) provides visual "thought"
output:

```javascript
if (window.cognitiveStream) {
  window.cognitiveStream.addLine('> AI_PROCESS: STEP_DESCRIPTION');
}
```

Used throughout for transparency - shows execution flow in a dedicated widget.

### Personality System

Chat personality (professional/concise/creative) affects OpenAI `temperature`
and response style:

```javascript
const personality =
  localStorage.getItem('vip_ai_personality') || 'professional';
// Used in openai-handler.js to adjust temperature
```

### Performance Monitoring

[js/performance-monitor.js](js/performance-monitor.js) tracks RAM/CPU via
Performance API + animated canvas charts. Automatically logging happens via
`executeFunction()` calls.

### Notification Toast Pattern

```javascript
showToast(title, message, type); // type: 'success' | 'error' | 'info' | 'warning'
```

Shows auto-dismiss notifications in top-right corner.

## Common Modification Scenarios

### Adding a New Function

1. Add object to `getFunctionCategories()` array in
   [js/functions.js](js/functions.js)
2. Create handler in `functionHandlers` object:
   `functionHandlers['function_id'] = (params) => { /* logic */ };`
3. Voice command mapping in [js/voice-access.js](js/voice-access.js#L130)
4. Keyboard shortcut in [js/keyboard-shortcuts.js](js/keyboard-shortcuts.js) if
   applicable

### Updating UI Theme

- Edit color values in [css/variables.css](css/variables.css)
- Update theme objects in [js/theme-manager.js](js/theme-manager.js#L6)
- Changes apply via CSS custom properties (no component updates needed)

### Adding Voice Commands

1. Add command → function mapping to `voiceState.commandMap` in
   [js/voice-access.js](js/voice-access.js#L122)
2. Update command help text in `showVoiceHelp()`
3. Test via browser microphone after running server

### Automation Workflow Creation

1. Define trigger (time, location, battery level) and actions in
   [js/automation.js](js/automation.js#L65)
2. Add to template library: `initAutomationTemplates()`
3. Execution happens in `checkAutonomousTriggers()` every 10 seconds

## Integration Points & External APIs

### OpenAI Chat Integration

[js/openai-handler.js](js/openai-handler.js) - Handles GPT-4o-mini API calls
with tool definitions. Requires user to provide API key in settings. Maintains
conversation history for context.

### Face Recognition

[js/face-recognition.js](js/face-recognition.js) uses
[libs/face-api.min.js](libs/face-api.min.js) library with pretrained models in
[models/](models/) folder. Trains on webcam input, stores encoded faces in
localStorage.

### Device APIs (Simulated)

- Battery API: `navigator.getBattery()` - shows mock data
- Geolocation: `navigator.geolocation` - mock location sync
- Network: `navigator.connection` - simulated network density
- Devices: Mock hardware control (flashlight, volume, etc.) via UI only

## Code Style Conventions

- **Comments**: Use SYMPHONY-themed headers like
  `// VIP AI SYMPHONY - Module Name v6.0`
- **Variable naming**: Snake_case for state, camelCase for functions
- **Constants**: UPPERCASE for feature flags
- **Objects**: Properties as state, `init()` method for setup
- **DOM access**: Prefer `document.getElementById()`, minimal jQuery equivalents
- **Error handling**: Show toast notifications for user-facing errors,
  console.log for debugging

## Key Files Reference

| File                                                                   | Purpose                                                     |
| ---------------------------------------------------------------------- | ----------------------------------------------------------- |
| [index.html](index.html)                                               | Entry point, manifest link, stylesheet/script loading       |
| [js/app.js](js/app.js)                                                 | Kernel initialization, hardware monitoring, scroll handling |
| [js/functions.js](js/functions.js)                                     | Function registry (75+ functions) and handlers              |
| [css/variables.css](css/variables.css)                                 | Design tokens - colors, fonts, spacing                      |
| [js/chat-manager.js](js/chat-manager.js)                               | AI chat UI and conversation history                         |
| [js/openai-handler.js](js/openai-handler.js)                           | GPT API integration                                         |
| [js/automation.js](js/automation.js)                                   | Workflow templates and trigger-action logic                 |
| [testsprite_tests/run_all_tests.py](testsprite_tests/run_all_tests.py) | Test runner                                                 |

---

_Last Updated: January 2026 | v6.0 - SYMPHONY v6 Stable_

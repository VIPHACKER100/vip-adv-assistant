# Contributing to VIP Advanced Mobile AI Assistant

Thank you for your interest in contributing to the **Omni-Core Platform**! This guide will help you get started.

---

## 🎯 Ways to Contribute

- **Report Bugs** - Found an issue in the Telemetry HUD or Glyph engine? Let us know!
- **Submit Code** - Add new hardware simulator protocols or AI personas.
- **Improve Documentation** - Help refine our architectural deep-dives.
- **Test** - Try the assistant on new mobile browsers or PWA environments.

---

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/viphacker100/vip-ai-assistant.git
   cd vip-ai-assistant
   ```

2. **Start local server**
   ```bash
   python -m http.server 8000
   ```

3. **Open DevTools** (`F12`) to monitor the background Autonomous Trigger loop.

---

## 📁 Project Structure (v5.0)

```
vip-adv-assistant/
├── index.html              # Entry point & Command Center HUD
├── js/
│   ├── app.js             # Life-cycle & Telemetry logic
│   ├── always-listening.js # Continuous Voice Interaction [NEW]
│   ├── command-center.js  # Unified Hub & Palette [NEW]
│   ├── functions.js       # Action Engine (75+ functions)
│   ├── automation.js      # Autonomous Trigger Engine
│   └── voice-access.js    # Pro Voice Dictionary
└── docs/
    ├── README.md           # User overview
    ├── TECHNICAL_DETAILS.md # Architectural spec
    ├── FUNCTION_CATALOG.md # 75+ Function Reference [NEW]
    └── CHANGELOG.md        # Version history (v1.0 - v5.0)
```

---

## 📝 Coding Standards

### Glyphs & UI
- **Native Icons Only**: Use standard emojis or UTF-8 characters. DO NOT use hex entities or unicode escapes in UI strings.
- **Glassmorphism**: Follow the 20px / 40px blur tokens defined in `variables.css`.

### JavaScript
- **ES6+**: Use async/await for simulated hardware delays.
- **Global State**: Respect the `appState` and `voiceState` objects for synchronization.

---

## 🔒 Security
**DO NOT** commit API keys. Sanitize all user-input used in voice command mapping.

---

## 🙏 Thank You!
Every contribution helps transform the assistant into a more powerful cognitive ecosystem.

**Happy Coding!** 🚀

---

**Current Kernel**: 5.0.0
**Status**: Neural Symphony Build

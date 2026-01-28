# Setup Guide - VIP Advanced Mobile AI Assistant

Complete installation and configuration guide for getting started with the VIP
AI Assistant.

---

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Browser Setup](#browser-setup)
- [Accessibility & PWA](#accessibility--pwa)
- [Troubleshooting](#troubleshooting)

---

## 🔧 Prerequisites

### Required

- **Web Browser**:
  - Google Chrome 90+ (Recommended for full API compatibility)
  - Microsoft Edge 90+
  - Safari 14+ (Partial API support)
  - Firefox 88+ (Battery API limited)

### Recommended

- **Local Server**: Python 3.x or Node.js (for PWA and Voice functionality)

---

## 📥 Installation

### Method 1: Git Clone

```bash
# Clone the repository
git clone https://github.com/viphacker100/vip-ai-assistant.git

# Navigate to directory
cd vip-ai-assistant
```

### Method 2: Manual Download

1. Download the ZIP file from the repository.
2. Extract to a local folder (e.g., `C:\WebProjects\vip-assistant`).

---

## ⚙️ Configuration

### 1. No-Setup Default

The assistant is designed to work immediately upon loading `index.html`. No
build steps are required.

### 2. Optional: OpenAI Features

To enable natural language processing for voice commands:

1. Open the app in your browser.
2. Go to **⚙️ Settings**.
3. Paste your **OpenAI API Key**.
4. The key is stored safely in your browser's `localStorage`.

### 3. Theme & Personalization

- **Theme**: Select between Dark, Light, or Auto (detects system preference).
- **Shortcuts**: Customize keyboard bindings directly in the Settings menu.

---

## 🚀 Running the Application

### Option 1: Python HTTP Server (Recommended)

```bash
python -m http.server 8000
# Visit http://localhost:8000
```

### Option 2: VS Code Live Server

1. Open the project folder in VS Code.
2. Click "Go Live" in the bottom status bar.

---

## 🌐 Browser Setup

### Enabling Microphone (Voice Assistant)

1. Click the **Lock (🔒)** icon in your browser's address bar.
2. Toggle **Microphone** to "Allow".
3. Refresh the page.

### Enabling PWA (Mobile/Desktop App)

1. In Chrome/Edge, click the **Install App** icon in the address bar.
2. On Mobile (iOS/Android): Use "Add to Home Screen" in your browser menu.

---

## 🛡️ Neural Symphony Reliability (v5.0.0)

This version introduces the **Always-Listening Orchestration**:

- **Continuous Interaction**: Leverages Speech Recognition API with a custom
  auto-restart agent.
- **Unified Command Control**: All inputs (Voice, Keyboard, UI) are normalized
  through `command-center.js`.
- **Glyph Integrity**: 100% native implementation for ultra-sharp hardware
  icons.

---

## 📱 Mobile Compatibility

- **Context Bar**: A mobile-specific status bar at the bottom provides real-time
  device info.
- **Bottom-Sheet UI**: Optimized for one-handed use with sliding modal windows.

---

## 🐛 Troubleshooting

### Icons are still broken?

1. Perform a **Hard Refresh**: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R`
   (Mac).
2. The Service Worker will automatically detect the new version (v2.5.1) and
   update your cache.

### Voice command error?

1. Ensure you are using **localhost** or an **HTTPS** connection.
2. Check if your microphone is active and not used by another application.

---

**Built with ❤️ by VipHacker100** **Current Version**: 5.0.0 **Status**: Neural
Symphony ✅

/**
 * Advanced Mobile Control AI Assistant
 * Voice Access & Voice Commands
 */

// Voice recognition state
window.voiceState = {
  isListening: false,
  recognition: null,
  commands: {},
  lastCommand: null
};

const voiceState = window.voiceState;

// Initialize voice recognition
function initVoiceAccess() {
  // Check browser support
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    console.warn('Speech recognition not supported in this browser');
    return false;
  }

  voiceState.recognition = new SpeechRecognition();
  voiceState.recognition.continuous = true;
  voiceState.recognition.interimResults = true;
  voiceState.recognition.lang = 'en-US';

  // Setup event handlers
  voiceState.recognition.onstart = () => {
    voiceState.isListening = true;
    updateVoiceUI(true);
    showToast('Voice Access', 'Listening...', 'info');
  };

  voiceState.recognition.onend = () => {
    voiceState.isListening = false;
    updateVoiceUI(false);
    
    // Auto-restart if always-listening is enabled
    if (window.alwaysListening && window.alwaysListening.enabled) {
      setTimeout(() => {
        if (voiceState.recognition && !voiceState.isListening) {
          try {
            voiceState.recognition.start();
          } catch (e) {
            console.warn('Auto-restart failed:', e);
          }
        }
      }, 500);
    }
  };

  voiceState.recognition.onresult = (event) => {
    const transcript = Array.from(event.results)
      .map(result => result[0].transcript)
      .join('');

    handleVoiceCommand(transcript);
  };

  voiceState.recognition.onerror = (event) => {
    console.error('Voice recognition error:', event.error);

    let errorMessage = '';
    switch (event.error) {
      case 'not-allowed':
        errorMessage = 'Microphone access denied. Please allow microphone permission in your browser settings.';
        break;
      case 'no-speech':
        errorMessage = 'No speech detected. Please try again.';
        break;
      case 'audio-capture':
        errorMessage = 'No microphone found. Please connect a microphone.';
        break;
      case 'network':
        errorMessage = 'Network error. Please check your connection.';
        break;
      default:
        errorMessage = `Error: ${event.error}`;
    }

    showToast('Voice Error', errorMessage, 'error');
    voiceState.isListening = false;
    updateVoiceUI(false);
  };

  // Register voice commands
  registerVoiceCommands();

  return true;
}

// Register all voice commands
function registerVoiceCommands() {
  voiceState.commands = {
    // Navigation
    'go home': () => window.scrollTo({ top: 0, behavior: 'smooth' }),
    'scroll down': () => window.scrollBy({ top: 500, behavior: 'smooth' }),
    'scroll up': () => window.scrollBy({ top: -500, behavior: 'smooth' }),

    // Functions
    'analyze image': () => executeFunction('analyze_image'),
    'smart reply': () => executeFunction('smart_reply'),
    'usage analytics': () => executeFunction('usage_analytics'),
    'secure vault': () => executeFunction('secure_vault'),
    'focus mode': () => executeFunction('focus_mode'),
    'smart home': () => executeFunction('control_smart_home'),

    // Automation
    'automation builder': () => openAutomationBuilder(),
    'open automation': () => openAutomationBuilder(),
    'show automations': () => openAutomationBuilder(),

    // Modals & Panels
    'close': () => closeModal(),
    'close modal': () => closeModal(),
    'settings': () => showModal('settings'),
    'open settings': () => showModal('settings'),
    'show hud': () => toggleHUD(),
    'telemetry': () => toggleHUD(),
    'command center': () => toggleHUD(),

    // Hardware
    'flashlight on': () => executeFunction('toggle_flashlight'),
    'flashlight off': () => executeFunction('toggle_flashlight'),
    'toggle flashlight': () => executeFunction('toggle_flashlight'),
    'brightness high': () => executeFunction('set_brightness'),
    'brightness low': () => executeFunction('set_brightness'),
    'volume up': () => executeFunction('set_volume'),
    'volume down': () => executeFunction('set_volume'),
    'vibration on': () => executeFunction('toggle_vibration'),
    'vibration off': () => executeFunction('toggle_vibration'),
    'rotate screen': () => executeFunction('rotate_screen'),
    'clean speaker': () => executeFunction('speaker_clean'),

    // Security & Emergency
    'lock system': () => executeFunction('biometric_lock'),
    'medical id': () => executeFunction('medical_id'),
    'sos alert': () => executeFunction('sos_alert'),
    'emergency': () => executeFunction('sos_alert'),
    'secure vault': () => executeFunction('secure_vault'),

    // System
    'optimize': () => executeFunction('optimize_resources'),
    'boost system': () => executeFunction('optimize_resources'),
    'theme dark': () => toggleTheme(),
    'theme light': () => toggleTheme(),
    'toggle theme': () => toggleTheme(),
    'show history': () => recentFunctionsManager.showHistoryModal(),
    'qr scanner': () => executeFunction('qr_code_scanner'),
    'boost mode': () => toggleBoostMode(),
    'overclock': () => toggleBoostMode(),
    'system boost': () => toggleBoostMode(),

    // Help
    'help': () => showVoiceHelp(),
    'what can you do': () => showVoiceHelp(),
    'voice commands': () => showVoiceHelp()
  };
}

// Handle voice command
function handleVoiceCommand(transcript) {
  console.log('Voice command:', transcript);

  // Find matching command
  const lowerTranscript = transcript.toLowerCase();

  for (const [command, action] of Object.entries(voiceState.commands)) {
    if (lowerTranscript.includes(command)) {
      voiceState.lastCommand = command;
      showToast('Voice Command', `Executing: ${command}`, 'success');
      action();
      return;
    }
  }

  // No hardcoded command found - Send to OpenAI
  if (window.processWithOpenAI) {
    processWithOpenAI(transcript);
  } else {
    showToast('Voice Access', 'Command not recognized. Say "help" for available commands.', 'warning');
  }
}

// Toggle voice listening
function toggleVoiceAccess() {
  if (!voiceState.recognition) {
    const initialized = initVoiceAccess();
    if (!initialized) {
      showVoiceUnavailableModal();
      return;
    }
  }

  if (voiceState.isListening) {
    voiceState.recognition.stop();
  } else {
    try {
      voiceState.recognition.start();
    } catch (error) {
      console.error('Failed to start voice recognition:', error);
      showToast('Voice Access', 'Failed to start. Click the microphone icon again to retry.', 'warning');
    }
  }
}

// Show modal when voice is unavailable
function showVoiceUnavailableModal() {
  const modalContainer = document.getElementById('modalContainer');
  if (!modalContainer) return;

  modalContainer.innerHTML = `
    <div class="modal-overlay active" onclick="closeModal(event)">
      <div class="modal" onclick="event.stopPropagation()">
        <div class="modal-header">
          <h2 class="modal-title">🎤 Voice Access Unavailable</h2>
          <button class="modal-close" onclick="closeModal()">&times;</button>
        </div>
        <div class="modal-body">
          <div class="glass-card" style="text-align: center; padding: var(--space-6);">
            <div style="font-size: 4rem; margin-bottom: var(--space-4);">🚫</div>
            <h3 style="margin-bottom: var(--space-3); color: var(--text-primary);">Voice Recognition Not Supported</h3>
            <p style="color: var(--text-secondary); margin-bottom: var(--space-4);">
              Your browser doesn't support voice recognition, or microphone access is blocked.
            </p>
            <div style="text-align: left; background: var(--bg-tertiary); padding: var(--space-4); border-radius: var(--radius-lg); margin-top: var(--space-4);">
              <strong style="color: var(--text-primary);">💡 To enable voice access:</strong>
              <ol style="margin-top: var(--space-2); color: var(--text-secondary); padding-left: var(--space-5);">
                <li>Use Chrome, Edge, or Safari browser</li>
                <li>Click the 🔒 lock icon in the address bar</li>
                <li>Allow microphone access for this site</li>
                <li>Refresh the page and try again</li>
              </ol>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-glass" onclick="closeModal()">Close</button>
        </div>
      </div>
    </div>
  `;
}

// Update voice UI indicator
function updateVoiceUI(isListening) {
  const voiceBtn = document.getElementById('voiceAccessBtn');
  if (voiceBtn) {
    if (isListening) {
      voiceBtn.classList.add('listening');
      voiceBtn.innerHTML = '<span>🎤</span><span class="pulse"></span>';
    } else {
      voiceBtn.classList.remove('listening');
      voiceBtn.innerHTML = '<span>🎤</span>';
    }
  }
}

// Show voice help modal
function showVoiceHelp() {
  const modalContainer = document.getElementById('modalContainer');
  if (!modalContainer) return;

  const commandGroups = {
    'Navigation': ['go home', 'scroll down', 'scroll up'],
    'Hardware': ['toggle flashlight', 'brightness high/low', 'vibration on/off', 'rotate screen'],
    'Security': ['lock system', 'medical id', 'sos alert', 'secure vault'],
    'Intelligence': ['analyze image', 'smart reply', 'usage analytics', 'smart home', 'optimize'],
    'Panels': ['show hud', 'open automation', 'show history', 'qr scanner', 'open settings'],
    'System': ['toggle theme', 'help', 'close modal']
  };

  modalContainer.innerHTML = `
    <div class="modal-overlay active" onclick="closeModal(event)">
      <div class="modal" onclick="event.stopPropagation()" style="max-width: 700px;">
        <div class="modal-header">
          <h2 class="modal-title">🎤 Voice Commands</h2>
          <button class="modal-close" onclick="closeModal()">&times;</button>
        </div>
        <div class="modal-body">
          <p style="color: var(--text-secondary); margin-bottom: var(--space-6);">
            Say any of these commands to control the assistant with your voice.
          </p>
          
          ${Object.entries(commandGroups).map(([group, commands]) => `
            <div class="glass-card" style="margin-bottom: var(--space-4);">
              <h4 style="margin-bottom: var(--space-3); color: var(--text-primary);">${group}</h4>
              <div style="display: grid; gap: var(--space-2);">
                ${commands.map(cmd => `
                  <div style="padding: var(--space-2); background: var(--bg-tertiary); border-radius: var(--radius-md); font-family: monospace; font-size: var(--font-size-sm);">
                    "${cmd}"
                  </div>
                `).join('')}
              </div>
            </div>
          `).join('')}
          
          <div style="margin-top: var(--space-6); padding: var(--space-4); background: var(--bg-secondary); border-radius: var(--radius-lg); border-left: 4px solid var(--color-accent-500);">
            <strong style="color: var(--text-primary);">💡 Tip:</strong>
            <p style="margin-top: var(--space-2); color: var(--text-secondary);">
              Click the microphone button in the header to start/stop voice listening.
            </p>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-glass" onclick="closeModal()">Close</button>
          <button class="btn btn-primary" onclick="toggleVoiceAccess(); closeModal();">
            🎤 Start Voice Access
          </button>
        </div>
      </div>
    </div>
  `;
}

// Text-to-speech for responses
function speak(text) {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;
    window.speechSynthesis.speak(utterance);
  }
}

// Export for global access
window.initVoiceAccess = initVoiceAccess;
window.toggleVoiceAccess = toggleVoiceAccess;
window.showVoiceHelp = showVoiceHelp;
window.speak = speak;

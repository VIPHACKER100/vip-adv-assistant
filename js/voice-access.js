/**
 * VIP AI Assistant - SYMPHONY KERNEL v6.0
 * Neural Voice Interface & Recognition
 */

// Voice recognition state
window.voiceState = {
  isListening: false,
  recognition: null,
  commands: {},
  lastCommand: null,
  pulseRing: null
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
    showToast('Neural Link', 'BIO_ACOUSTIC_LINK_ESTABLISHED', 'success');

    if (window.cognitiveStream) {
      window.cognitiveStream.addLine('> INFO: VOICE_LINK_ACTIVE');
    }
  };

  voiceState.recognition.onend = () => {
    voiceState.isListening = false;
    updateVoiceUI(false);

    if (window.alwaysListening && window.alwaysListening.enabled) {
      setTimeout(() => {
        if (voiceState.recognition && !voiceState.isListening) {
          try {
            voiceState.recognition.start();
          } catch (e) {
            console.warn('Neural restart failed:', e);
          }
        }
      }, 400);
    }
  };

  voiceState.recognition.onresult = (event) => {
    let finalTranscript = '';

    for (let i = event.resultIndex; i < event.results.length; i++) {
      if (event.results[i].isFinal) {
        finalTranscript += event.results[i][0].transcript;
      }
    }

    if (finalTranscript.length > 0) {
      handleVoiceCommand(finalTranscript.toLowerCase().trim());
    }
  };

  voiceState.recognition.onerror = (event) => {
    console.error('Voice recognition error:', event.error);

    // Only show critical errors to user
    let errorMessage = '';
    let showToUser = false;

    switch (event.error) {
      case 'not-allowed':
        errorMessage = 'Microphone access denied. Please allow microphone permission in your browser settings.';
        showToUser = true;
        break;
      case 'no-speech':
        // Don't show error for no speech - it's normal
        console.log('No speech detected, continuing to listen...');
        break;
      case 'audio-capture':
        errorMessage = 'No microphone found. Please connect a microphone.';
        showToUser = true;
        break;
      case 'network':
        errorMessage = 'Network error. Please check your connection.';
        showToUser = true;
        break;
      case 'aborted':
        // Normal abort, don't show error
        console.log('Voice recognition aborted');
        break;
      default:
        errorMessage = `Voice error: ${event.error}`;
        showToUser = true;
    }

    if (showToUser && errorMessage) {
      showToast('Voice Error', errorMessage, 'error');
    }

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

    // V6.0 Enhanced Commands
    'neural scan': () => executeFunction('analyze_image'),
    'omni search': () => executeFunction('visual_search'),
    'clarity ai': () => executeFunction('enhance_media'),
    'kernel lock': () => executeFunction('biometric_lock'),
    'bio ledger': () => executeFunction('medical_id'),
    'symphony chain': () => executeFunction('task_chain'),
    'acoustic purge': () => executeFunction('speaker_clean'),

    // Legacy mapping (kept for stability)
    'analyze image': () => executeFunction('analyze_image'),
    'smart reply': () => executeFunction('smart_reply'),
    'usage analytics': () => executeFunction('usage_analytics'),
    'secure vault': () => executeFunction('secure_vault'),
    'focus mode': () => executeFunction('focus_mode'),
    'smart home': () => executeFunction('control_smart_home'),

    // Modals & Dashboard
    'close': () => closeModal(),
    'close modal': () => closeModal(),
    'settings': () => showModal('settings'),
    'show telemetry': () => toggleHUD(),
    'command center': () => toggleHUD(),

    // Hardware Pulse Commands
    'photon pulse on': () => executeFunction('toggle_flashlight'),
    'photon pulse off': () => executeFunction('toggle_flashlight'),
    'lumen high': () => executeFunction('set_brightness'),
    'lumen low': () => executeFunction('set_brightness'),
    'amplitude up': () => executeFunction('set_volume'),
    'amplitude down': () => executeFunction('set_volume'),
    'haptic sync on': () => executeFunction('toggle_vibration'),
    'spatial shift': () => executeFunction('rotate_screen'),

    // Security & Emergency
    'lock system': () => executeFunction('biometric_lock'),
    'medical id': () => executeFunction('medical_id'),
    'sos alert': () => executeFunction('sos_alert'),
    'emergency': () => executeFunction('sos_alert'),
    'secure vault': () => executeFunction('secure_vault'),
    'face recognition': () => executeFunction('face_recognition'),
    'face id': () => executeFunction('face_recognition'),
    'open face id': () => executeFunction('face_recognition'),
    'recognize face': () => executeFunction('face_recognition'),

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
function handleVoiceCommand(transcript, useOpenAI = true) {
  console.log('Voice command:', transcript);

  // Find matching command
  const lowerTranscript = transcript.toLowerCase();

  for (const [command, action] of Object.entries(voiceState.commands)) {
    if (lowerTranscript.includes(command)) {
      voiceState.lastCommand = command;
      showToast('Voice Command', `Executing: ${command}`, 'success');
      action();
      return true;
    }
  }

  // No hardcoded command found - Send to OpenAI if requested
  if (useOpenAI && window.processWithOpenAI) {
    processWithOpenAI(transcript);
    return true;
  }

  return false;
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
      <div class="modal animate-slide-up" onclick="event.stopPropagation()" style="max-width: 500px;">
        <div class="modal-header">
          <h2 class="modal-title">ACOUSTIC_LINK_FAILED</h2>
          <button class="modal-close" onclick="closeModal()">×</button>
        </div>
        <div class="modal-body">
          <div class="glass-card-strong" style="text-align: center; padding: var(--space-8); border: 1px solid var(--color-error-500);">
            <div style="font-size: 5rem; margin-bottom: var(--space-6); filter: drop-shadow(0 0 15px var(--color-error-500));">⚠️</div>
            <h3 style="margin-bottom: var(--space-3); color: var(--color-error-400); font-family: var(--font-family-display);">DRV_VOICE_ERROR_0x42</h3>
            <p style="color: var(--text-secondary); margin-bottom: var(--space-6); font-size: 14px;">
              Acoustic sensors could not be initialized. Terminal permissions or hardware missing.
            </p>
            <div style="text-align: left; background: rgba(0,0,0,0.3); padding: var(--space-5); border-radius: var(--radius-xl);">
              <div style="font-size: 10px; color: var(--color-accent-400); margin-bottom: 8px; letter-spacing: 1px;">RECOVERY_PROTOCOLS:</div>
              <ul style="color: var(--text-secondary); font-size: 12px; display: grid; gap: 8px;">
                <li>• Verify mic permissions in security settings</li>
                <li>• Ensure active neural link in dashboard</li>
                <li>• Refresh kernel state (F5)</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-primary" style="width: 100%;" onclick="closeModal()">ACKNOWLEDGE</button>
        </div>
      </div>
    </div>
  `;
}

// Update voice UI indicator
function updateVoiceUI(isListening) {
  const voiceBtn = document.getElementById('voiceAccessBtn');
  const orb = document.getElementById('neuralOrb');
  const status = document.querySelector('.always-listening-status');

  if (voiceBtn) {
    voiceBtn.classList.toggle('listening', isListening);
    voiceBtn.innerHTML = isListening ? '<span>🎤</span><span class="pulse"></span>' : '<span>🎤</span>';
  }

  if (orb) {
    orb.classList.toggle('listening', isListening);
  }

  if (status) {
    status.classList.toggle('active', isListening);
  }
}

// Show voice help modal
function showVoiceHelp() {
  const modalContainer = document.getElementById('modalContainer');
  if (!modalContainer) return;

  const commandGroups = {
    'NAVIGATION': ['go home', 'scroll down', 'scroll up'],
    'HARDWARE': ['photon pulse on/off', 'lumen high/low', 'amplitude up/down'],
    'INTELLIGENCE': ['neural scan', 'omni search', 'clarity ai', 'module telemetry'],
    'SECURITY': ['kernel lock', 'bio ledger', 'module isolation'],
    'SYSTEM': ['toggle theme', 'show telemetry', 'overclock', 'system boost']
  };

  modalContainer.innerHTML = `
    <div class="modal-overlay active" onclick="closeModal(event)">
      <div class="modal animate-slide-up" onclick="event.stopPropagation()" style="max-width: 760px;">
        <div class="modal-header">
          <h2 class="modal-title">SYNAPTIC_VOICE_COMMANDS</h2>
          <button class="modal-close" onclick="closeModal()">×</button>
        </div>
        <div class="modal-body">
          <p style="color: var(--text-secondary); margin-bottom: var(--space-8); font-size: 15px;">
            Acoustic baseline verified. The following neural command sequences are active:
          </p>
          
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: var(--space-5);">
            ${Object.entries(commandGroups).map(([group, commands]) => `
              <div class="glass-card-subtle" style="padding: var(--space-4); border-top: 2px solid var(--color-accent-500);">
                <h4 style="margin-bottom: var(--space-4); color: var(--color-accent-400); font-family: var(--font-family-display); font-size: 12px; letter-spacing: 1px;">${group}</h4>
                <div style="display: grid; gap: var(--space-2-5);">
                  ${commands.map(cmd => `
                    <div style="padding: var(--space-2) var(--space-3); background: rgba(255,255,255,0.03); border-radius: var(--radius-md); font-family: var(--font-family-mono); font-size: 11px; color: var(--text-primary);">
                      "${cmd.toUpperCase()}"
                    </div>
                  `).join('')}
                </div>
              </div>
            `).join('')}
          </div>
          
          <div class="status-pill-accent" style="margin-top: var(--space-8); padding: var(--space-4); border-radius: var(--radius-2xl);">
            <strong style="color: var(--color-accent-400); font-size: 11px; letter-spacing: 1px;">💡 PRO_TIP:</strong>
            <p style="margin-top: var(--space-2); color: var(--text-secondary); font-size: 13px;">
              Say "SYSTEM BOOST" to initialize rapid resource allocation. Use the neural orb to trigger voice link.
            </p>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-glass" onclick="closeModal()">TERMINATE</button>
          <button class="btn btn-primary" onclick="toggleVoiceAccess(); closeModal();">
            INITIALIZE_BIO_LINK
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

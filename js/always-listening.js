/**
 * Always-Listening Command System - SYMPHONY KERNEL v6.0
 * Continuous acoustic monitoring and neural link persistence
 */

// Always-listening state
window.alwaysListening = {
  enabled: false,
  voiceRecognition: null,
  restartTimeout: null,
  commandQueue: [],
  lastActivity: Date.now(),
  interactionCount: 0,
  wakeWord: 'hey symphony',
  backupWakeWord: 'hey assistant',
  isProcessing: false,
  lastNeuralPulse: 0,
};

const alwaysListening = window.alwaysListening;

/**
 * Initialize always-listening system
 */
function initAlwaysListening() {
  console.log('🎧 Initializing Always-Listening System...');

  // Check if voice recognition is supported
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    console.warn('Always-listening requires Speech Recognition API');
    return false;
  }

  // Initialize voice recognition
  alwaysListening.voiceRecognition = new SpeechRecognition();
  alwaysListening.voiceRecognition.continuous = true;
  alwaysListening.voiceRecognition.interimResults = true;
  alwaysListening.voiceRecognition.lang = 'en-US';
  alwaysListening.voiceRecognition.maxAlternatives = 3;

  // Setup event handlers
  setupAlwaysListeningHandlers();

  // Start keyboard command listener
  initKeyboardCommandListener();

  // Start activity monitoring
  startActivityMonitoring();

  console.log('✅ Always-Listening System initialized');
  return true;
}

/**
 * Setup always-listening event handlers
 */
function setupAlwaysListeningHandlers() {
  const recognition = alwaysListening.voiceRecognition;

  recognition.onstart = () => {
    alwaysListening.enabled = true;
    updateAlwaysListeningUI(true);
    console.log('🎤 PERSISTENT_ACOUSTIC_LINK_ACTIVE');
    if (window.cognitiveStream) {
      window.cognitiveStream.addLine('> INFO: ACOUSTIC_GATEWAY_OPEN');
    }
  };

  recognition.onend = () => {
    // Auto-restart if enabled
    if (alwaysListening.enabled) {
      alwaysListening.restartTimeout = setTimeout(() => {
        if (alwaysListening.enabled && !alwaysListening.isProcessing) {
          try {
            recognition.start();
            console.log('🔄 Auto-restarted listening');
          } catch (e) {
            console.warn('Auto-restart failed, retrying...', e);
            setTimeout(() => recognition.start(), 1000);
          }
        }
      }, 500);
    } else {
      updateAlwaysListeningUI(false);
    }
  };

  recognition.onresult = (event) => {
    let interimTranscript = '';
    let finalTranscript = '';

    for (let i = event.resultIndex; i < event.results.length; i++) {
      const transcriptPiece = event.results[i][0].transcript;
      if (event.results[i].isFinal) {
        finalTranscript += transcriptPiece;
      } else {
        interimTranscript += transcriptPiece;
      }
    }

    if (finalTranscript.length > 0) {
      handleAlwaysListeningCommand(finalTranscript.toLowerCase().trim(), true);
    } else if (interimTranscript.length > 0) {
      // Check for wake word in interim results for responsiveness
      const lowerInterim = interimTranscript.toLowerCase();
      if (lowerInterim.includes(alwaysListening.wakeWord)) {
        handleAlwaysListeningCommand(lowerInterim.trim(), false);
      }
    }
  };

  recognition.onerror = (event) => {
    console.error('Always-listening error:', event.error);

    // Handle specific errors
    if (event.error === 'no-speech') {
      // Normal - just continue listening
      return;
    }

    if (event.error === 'aborted') {
      // Recognition was stopped, restart if enabled
      if (alwaysListening.enabled) {
        setTimeout(() => {
          try {
            recognition.start();
          } catch (e) {
            console.warn('Restart after abort failed:', e);
          }
        }, 1000);
      }
      return;
    }

    // For other errors, show notification but keep trying
    if (event.error !== 'not-allowed' && event.error !== 'audio-capture') {
      showToast('Voice Error', `Error: ${event.error}. Retrying...`, 'warning');
      setTimeout(() => {
        if (alwaysListening.enabled) {
          try {
            recognition.start();
          } catch (e) {
            console.warn('Error recovery restart failed:', e);
          }
        }
      }, 2000);
    }
  };
}

/**
 * Handle commands from always-listening
 */
function handleAlwaysListeningCommand(transcript, isFinal) {
  alwaysListening.lastActivity = Date.now();
  const lowerTranscript = transcript.toLowerCase();

  // Check for wake word
  if (
    lowerTranscript.includes(alwaysListening.wakeWord) ||
    lowerTranscript.includes(alwaysListening.backupWakeWord)
  ) {
    const now = Date.now();
    if (!alwaysListening.lastWakeToast || now - alwaysListening.lastWakeToast > 5000) {
      showToast('Neural Trigger', 'SYMPHONY_ACTIVATED', 'success');
      alwaysListening.lastWakeToast = now;
      showNeuralPulse();
      if (window.cognitiveStream) {
        window.cognitiveStream.addLine('> SUCCESS: WAKE_WORD_MATCH_DETECTED');
      }
    }

    // Extract command after wake word
    let parts = lowerTranscript.split(alwaysListening.wakeWord);
    if (parts.length === 1) {
      parts = lowerTranscript.split(alwaysListening.backupWakeWord);
    }

    const commandToProcess = parts[parts.length - 1].trim();
    if (commandToProcess.length === 0) {
      return;
    }

    if (isFinal) {
      executeAlwaysListeningCommand(commandToProcess);
    }
    return;
  }

  if (isFinal) {
    executeAlwaysListeningCommand(transcript);
  }
}

/**
 * Execute command after validation
 */
function executeAlwaysListeningCommand(command) {
  if (alwaysListening.isProcessing) {
    return;
  }

  alwaysListening.isProcessing = true;
  alwaysListening.interactionCount++;

  // Show visual feedback
  showCommandFeedback(command);

  // Track telemetry
  if (window.performanceMonitor) {
    window.performanceMonitor.trackVoiceCommand();
  }

  // Process command
  setTimeout(() => {
    processCommandInternal(command);
    alwaysListening.isProcessing = false;

    // Process queued commands
    if (alwaysListening.commandQueue.length > 0) {
      const nextCommand = alwaysListening.commandQueue.shift();
      setTimeout(() => executeAlwaysListeningCommand(nextCommand), 500);
    }
  }, 100);
}

/**
 * Process command through multiple channels
 */
function processCommandInternal(command) {
  if (window.commandCenter && window.commandCenter.processCommand) {
    window.commandCenter.processCommand(command, 'voice-always');
  } else if (window.handleVoiceCommand) {
    // Fallback for initialization race conditions
    window.handleVoiceCommand(command);
  } else {
    console.warn('No command processor available for:', command);
  }
}

/**
 * Initialize keyboard command listener
 */
function initKeyboardCommandListener() {
  let commandBuffer = '';
  let bufferTimeout = null;

  document.addEventListener('keydown', (e) => {
    // Ignore if typing in input fields
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
      return;
    }

    // Build command from key sequence
    if (e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey) {
      commandBuffer += e.key.toLowerCase();

      clearTimeout(bufferTimeout);
      bufferTimeout = setTimeout(() => {
        if (commandBuffer.length > 3) {
          processCommandInternal(commandBuffer);
        }
        commandBuffer = '';
      }, 2000);
    }

    // Special key combinations
    if (e.ctrlKey && e.shiftKey && e.key === 'V') {
      // Ctrl+Shift+V: Toggle always-listening
      toggleAlwaysListening();
    }
  });
}

/**
 * Start activity monitoring
 */
function startActivityMonitoring() {
  setInterval(() => {
    const timeSinceActivity = Date.now() - alwaysListening.lastActivity;

    // If no activity for 5 minutes, show reminder
    if (timeSinceActivity > 300000 && alwaysListening.enabled) {
      showToast('Always-Listening Active', 'Say "hey assistant" or use voice commands', 'info');
      alwaysListening.lastActivity = Date.now();
    }
  }, 60000); // Check every minute
}

/**
 * Toggle always-listening mode
 */
function toggleAlwaysListening() {
  if (!alwaysListening.voiceRecognition) {
    const initialized = initAlwaysListening();
    if (!initialized) {
      showToast('Always-Listening', 'Voice recognition not available', 'error');
      return;
    }
  }

  if (alwaysListening.enabled) {
    stopAlwaysListening();
  } else {
    startAlwaysListening();
  }
}

/**
 * Start always-listening
 */
function startAlwaysListening() {
  if (!alwaysListening.voiceRecognition) {
    initAlwaysListening();
  }

  try {
    alwaysListening.enabled = true;
    alwaysListening.voiceRecognition.start();
    showToast('Always-Listening', '🎤 Now listening continuously', 'success');
    updateAlwaysListeningUI(true);

    // Save preference
    localStorage.setItem('alwaysListeningEnabled', 'true');
  } catch (error) {
    console.error('Failed to start always-listening:', error);
    showToast('Always-Listening', 'Failed to start. Check microphone permissions.', 'error');
  }
}

/**
 * Stop always-listening
 */
function stopAlwaysListening() {
  alwaysListening.enabled = false;

  if (alwaysListening.restartTimeout) {
    clearTimeout(alwaysListening.restartTimeout);
    alwaysListening.restartTimeout = null;
  }

  if (alwaysListening.voiceRecognition) {
    try {
      alwaysListening.voiceRecognition.stop();
    } catch (e) {
      console.warn('Error stopping recognition:', e);
    }
  }

  updateAlwaysListeningUI(false);
  showToast('Always-Listening', 'Stopped', 'info');

  // Save preference
  localStorage.setItem('alwaysListeningEnabled', 'false');
}

/**
 * Update UI for always-listening state
 */
function updateAlwaysListeningUI(isActive) {
  // Update button
  const voiceBtn = document.getElementById('voiceAccessBtn');
  const orb = document.getElementById('neuralOrb');

  if (voiceBtn) {
    voiceBtn.classList.toggle('always-listening-active', isActive);
    voiceBtn.title = isActive
      ? 'PERSISTENT_LINK_ACTIVE (CTL+SHF+V)'
      : 'INITIALIZE_ACOUSTIC_LINK (CTL+SHF+V)';
  }

  if (orb) {
    orb.classList.toggle('persistence-active', isActive);
  }

  let statusIndicator = document.getElementById('alwaysListeningStatus');
  if (!statusIndicator) {
    statusIndicator = document.createElement('div');
    statusIndicator.id = 'alwaysListeningStatus';
    statusIndicator.className = 'always-listening-status';
    document.body.appendChild(statusIndicator);
  }

  if (isActive) {
    statusIndicator.innerHTML = '<span class="pulse-dot"></span> SYMPHONY_LISTENING_ACTIVE';
    statusIndicator.classList.add('active');
  } else {
    statusIndicator.classList.remove('active');
    statusIndicator.innerHTML = '';
  }
}

/**
 * Show command feedback
 */
function showCommandFeedback(command) {
  // Create or update feedback element
  let feedback = document.getElementById('commandFeedback');
  if (!feedback) {
    feedback = document.createElement('div');
    feedback.id = 'commandFeedback';
    feedback.className = 'command-feedback';
    document.body.appendChild(feedback);
  }

  feedback.textContent = `🎤 "${command}"`;
  feedback.classList.add('show');

  // Trigger pulse for significant commands
  showNeuralPulse();

  setTimeout(() => {
    feedback.classList.remove('show');
  }, 2000);
}

/**
 * Show neural pulse visual effect
 */
function showNeuralPulse() {
  const now = Date.now();
  if (now - alwaysListening.lastNeuralPulse < 1000) {
    return;
  } // Throttling
  alwaysListening.lastNeuralPulse = now;

  let pulse = document.getElementById('neuralPulseRing');
  if (!pulse) {
    pulse = document.createElement('div');
    pulse.id = 'neuralPulseRing';
    pulse.className = 'neural-pulse-ring';
    document.body.appendChild(pulse);
  }

  // Restart animation
  pulse.classList.remove('active');
  void pulse.offsetWidth; // Trigger reflow
  pulse.classList.add('active');
}

/**
 * Initialize on page load
 */
document.addEventListener('DOMContentLoaded', () => {
  // Check if always-listening was enabled previously
  const wasEnabled = localStorage.getItem('alwaysListeningEnabled') === 'true';

  if (wasEnabled) {
    // Wait a bit for page to fully load
    setTimeout(() => {
      if (window.initAlwaysListening) {
        initAlwaysListening();
        setTimeout(() => {
          if (window.startAlwaysListening) {
            startAlwaysListening();
          }
        }, 1000);
      }
    }, 2000);
  }
});

// Export functions
window.initAlwaysListening = initAlwaysListening;
window.toggleAlwaysListening = toggleAlwaysListening;
window.startAlwaysListening = startAlwaysListening;
window.stopAlwaysListening = stopAlwaysListening;

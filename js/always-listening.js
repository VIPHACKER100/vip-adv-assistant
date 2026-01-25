/**
 * Always-Listening Command System
 * Continuous voice and command interaction for VIP AI Assistant
 * v5.0 - Neural Symphony
 */

// Always-listening state
window.alwaysListening = {
  enabled: false,
  voiceRecognition: null,
  restartTimeout: null,
  commandQueue: [],
  lastActivity: Date.now(),
  interactionCount: 0,
  wakeWord: 'hey assistant',
  isProcessing: false
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
    console.log('🎤 Always-listening active');
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
    const transcript = Array.from(event.results)
      .map(result => result[0].transcript)
      .join('')
      .toLowerCase()
      .trim();

    if (transcript.length > 0) {
      handleAlwaysListeningCommand(transcript, event);
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
function handleAlwaysListeningCommand(transcript, event) {
  alwaysListening.lastActivity = Date.now();
  alwaysListening.interactionCount++;

  // Check for wake word
  if (transcript.includes(alwaysListening.wakeWord)) {
    showToast('Wake Word Detected', 'Assistant activated', 'success');
    return;
  }

  // Process command if not already processing
  if (alwaysListening.isProcessing) {
    alwaysListening.commandQueue.push(transcript);
    return;
  }

  alwaysListening.isProcessing = true;

  // Show visual feedback
  showCommandFeedback(transcript);

  // Process command
  setTimeout(() => {
    processCommand(transcript);
    alwaysListening.isProcessing = false;

    // Process queued commands
    if (alwaysListening.commandQueue.length > 0) {
      const nextCommand = alwaysListening.commandQueue.shift();
      setTimeout(() => handleAlwaysListeningCommand(nextCommand, null), 500);
    }
  }, 100);
}

/**
 * Process command through multiple channels
 */
function processCommand(command) {
  // Try voice commands first
  if (window.handleVoiceCommand) {
    window.handleVoiceCommand(command);
    return;
  }

  // Try OpenAI processing
  if (window.processWithOpenAI) {
    window.processWithOpenAI(command);
    return;
  }

  // Try function execution
  if (window.executeFunction) {
    // Try to match function names
    const functionId = command.toLowerCase().replace(/\s+/g, '_');
    if (window.executeFunction(functionId)) {
      return;
    }
  }

  // Default: show in chat or notification
  showToast('Command Received', command, 'info');
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
          processCommand(commandBuffer);
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
  if (voiceBtn) {
    if (isActive) {
      voiceBtn.classList.add('always-listening-active');
      voiceBtn.title = 'Always-Listening Active (Ctrl+Shift+V to toggle)';
    } else {
      voiceBtn.classList.remove('always-listening-active');
      voiceBtn.title = 'Voice Access (Ctrl+M)';
    }
  }

  // Update status indicator
  let statusIndicator = document.getElementById('alwaysListeningStatus');
  if (!statusIndicator) {
    statusIndicator = document.createElement('div');
    statusIndicator.id = 'alwaysListeningStatus';
    statusIndicator.className = 'always-listening-status';
    document.body.appendChild(statusIndicator);
  }

  if (isActive) {
    statusIndicator.innerHTML = '<span class="pulse-dot"></span> Always-Listening';
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

  setTimeout(() => {
    feedback.classList.remove('show');
  }, 2000);
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

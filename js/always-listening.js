/**
 * VIP AI SYMPHONY - Neural Acoustic Link v7.0
 * Continuous acoustic monitoring and neural link persistence
 */

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

function initAlwaysListening() {
  console.log('🎧 INITIALIZING_ACOUSTIC_LINK_v7...');

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    console.warn('Neural Acoustic Link requires Speech Recognition coverage');
    return false;
  }

  alwaysListening.voiceRecognition = new SpeechRecognition();
  alwaysListening.voiceRecognition.continuous = true;
  alwaysListening.voiceRecognition.interimResults = true;
  alwaysListening.voiceRecognition.lang = 'en-US';
  alwaysListening.voiceRecognition.maxAlternatives = 3;

  setupAlwaysListeningHandlers();
  initKeyboardCommandListener();
  startActivityMonitoring();

  console.log('✅ ACOUSTIC_LINK_SYNCHRONIZED');
  if (window.performanceMonitor) performanceMonitor.trackFunction();
  return true;
}

function setupAlwaysListeningHandlers() {
  const recognition = alwaysListening.voiceRecognition;

  recognition.onstart = () => {
    alwaysListening.enabled = true;
    updateAlwaysListeningUI(true);
    console.log('🎤 PERSISTENT_ACOUSTIC_LINK: ACTIVE');
    if (window.cognitiveStream) {
      window.cognitiveStream.addLine('> ACOUSTIC_LINK: RESONANCE_LOCKED');
    }
  };

  recognition.onend = () => {
    if (alwaysListening.enabled) {
      alwaysListening.restartTimeout = setTimeout(() => {
        if (alwaysListening.enabled && !alwaysListening.isProcessing) {
          try {
            recognition.start();
          } catch (e) {
            console.warn('RESTART_FAULT: RETRYING_HANDSHAKE', e);
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
      if (event.results[i].isFinal) finalTranscript += transcriptPiece;
      else interimTranscript += transcriptPiece;
    }

    if (finalTranscript) {
      console.log(`🎤 FINAL_TRANSCRIPT: "${finalTranscript}"`);
      handleAcousticInput(finalTranscript.toLowerCase());
    }
  };

  recognition.onerror = (event) => {
    console.warn(`🎧 ACOUSTIC_LINK_ERROR: ${event.error}`);
    if (event.error === 'not-allowed') {
      alwaysListening.enabled = false;
      updateAlwaysListeningUI(false);
    }
  };
}

function handleAcousticInput(text) {
  if (alwaysListening.isProcessing) return;

  const hasWakeWord = text.includes(alwaysListening.wakeWord) || text.includes(alwaysListening.backupWakeWord);

  if (hasWakeWord) {
    if (window.utils?.haptics) window.utils.haptics.impact('heavy');
    alwaysListening.isProcessing = true;
    showNeuralPulse();

    const command = text
      .replace(alwaysListening.wakeWord, '')
      .replace(alwaysListening.backupWakeWord, '')
      .trim();

    if (command) {
      console.log(`⚡ EXECUTING_COGNITIVE_DIRECTIVE: "${command}"`);
      showCommandFeedback(command);
      processAcousticDirective(command);
    } else {
      if (window.speak) window.speak('Acoustic link open. State your directive.');
    }

    setTimeout(() => { alwaysListening.isProcessing = false; }, 2000);
  }
}

function processAcousticDirective(command) {
  if (window.commandCenter && window.commandCenter.processCommand) {
    window.commandCenter.processCommand(command, 'voice');
  }
}

function toggleAlwaysListening() {
  if (alwaysListening.enabled) stopAlwaysListening();
  else startAlwaysListening();
}

function startAlwaysListening() {
  if (!alwaysListening.voiceRecognition) initAlwaysListening();

  try {
    alwaysListening.enabled = true;
    alwaysListening.voiceRecognition.start();
    if (window.showToast) window.showToast('Acoustic Link', '🎤 Persistent monitoring active', 'success');
    updateAlwaysListeningUI(true);
    localStorage.setItem('alwaysListeningEnabled', 'true');
  } catch (error) {
    console.error('ACOUSTIC_LINK_FAULT:', error);
    if (window.showToast) window.showToast('Link Error', 'Microphone handshake failed', 'error');
  }
}

function stopAlwaysListening() {
  alwaysListening.enabled = false;
  if (alwaysListening.restartTimeout) {
    clearTimeout(alwaysListening.restartTimeout);
    alwaysListening.restartTimeout = null;
  }
  if (alwaysListening.voiceRecognition) {
    try { alwaysListening.voiceRecognition.stop(); } catch (e) { }
  }
  updateAlwaysListeningUI(false);
  if (window.showToast) window.showToast('Acoustic Link', 'Monitoring terminated', 'info');
  localStorage.setItem('alwaysListeningEnabled', 'false');
}

function updateAlwaysListeningUI(isActive) {
  const orb = document.getElementById('neuralOrb');
  if (orb) orb.classList.toggle('persistence-active', isActive);

  let statusIndicator = document.getElementById('alwaysListeningStatus');
  if (!statusIndicator) {
    statusIndicator = document.createElement('div');
    statusIndicator.id = 'alwaysListeningStatus';
    statusIndicator.className = 'always-listening-status';
    statusIndicator.style.cssText = 'position:fixed; bottom:100px; left:50%; transform:translateX(-50%); font-size:9px; font-family:var(--font-family-mono); color:var(--color-primary); background:rgba(0,0,0,0.5); padding:4px 12px; border-radius:10px; border:1px solid var(--glass-border); pointer-events:none; opacity:0; transition:opacity 0.3s;';
    document.body.appendChild(statusIndicator);
  }

  if (isActive) {
    statusIndicator.innerHTML = '<span style="display:inline-block; width:6px; height:6px; background:var(--color-primary); border-radius:50%; margin-right:6px; animation:pulse 1.5s infinite;"></span> RESONANCE_ACTIVE';
    statusIndicator.style.opacity = '1';
  } else {
    statusIndicator.style.opacity = '0';
  }
}

function showCommandFeedback(command) {
  let feedback = document.getElementById('commandFeedback');
  if (!feedback) {
    feedback = document.createElement('div');
    feedback.id = 'commandFeedback';
    feedback.style.cssText = 'position:fixed; top:20%; left:50%; transform:translateX(-50%); font-size:2rem; font-family:var(--font-family-display); color:var(--text-main); text-shadow:0 0 20px var(--color-primary); pointer-events:none; z-index:10000; opacity:0; transition:all 0.4s;';
    document.body.appendChild(feedback);
  }

  feedback.textContent = `🎤 "${command}"`;
  feedback.style.opacity = '1';
  feedback.style.transform = 'translateX(-50%) translateY(-20px)';

  showNeuralPulse();

  setTimeout(() => {
    feedback.style.opacity = '0';
    feedback.style.transform = 'translateX(-50%) translateY(0)';
  }, 2000);
}

function showNeuralPulse() {
  const now = Date.now();
  if (now - alwaysListening.lastNeuralPulse < 1000) return;
  alwaysListening.lastNeuralPulse = now;

  let pulse = document.getElementById('neuralPulseRing');
  if (!pulse) {
    pulse = document.createElement('div');
    pulse.id = 'neuralPulseRing';
    pulse.style.cssText = 'position:fixed; inset:0; border:4px solid var(--color-primary); border-radius:50%; pointer-events:none; z-index:9998; opacity:0;';
    document.body.appendChild(pulse);
  }

  pulse.animate([
    { transform: 'scale(0.1)', opacity: 0.8 },
    { transform: 'scale(2)', opacity: 0 }
  ], { duration: 1000, easing: 'ease-out' });
}

function initKeyboardCommandListener() {
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.key === 'V') {
      toggleAlwaysListening();
    }
  });
}

function startActivityMonitoring() {
  setInterval(() => {
    if (alwaysListening.enabled && Date.now() - alwaysListening.lastActivity > 600000) {
      console.log('💤 INACTIVITY_DETECTED: ENTERING_POWER_SAVE');
    }
  }, 60000);
}

document.addEventListener('DOMContentLoaded', () => {
  const wasEnabled = localStorage.getItem('alwaysListeningEnabled') === 'true';
  if (wasEnabled) {
    setTimeout(() => {
      initAlwaysListening();
      setTimeout(() => startAlwaysListening(), 1000);
    }, 2000);
  }
});

window.initAlwaysListening = initAlwaysListening;
window.toggleAlwaysListening = toggleAlwaysListening;
window.startAlwaysListening = startAlwaysListening;
window.stopAlwaysListening = stopAlwaysListening;

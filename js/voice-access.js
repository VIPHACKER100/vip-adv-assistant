/**
 * VIP AI SYMPHONY - Acoustic Interface v7.0
 * Neural Voice Recognition & Dynamic Signal Visualization
 */

// Voice recognition state
window.voiceState = {
  isListening: false,
  recognition: null,
  commands: {},
  lastCommand: null,
  analyser: null,
  visualizer: null,
};

const voiceState = window.voiceState;

/**
 * Initialize voice recognition kernel
 */
function initVoiceAccess() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    console.warn('Speech recognition not supported');
    return false;
  }

  voiceState.recognition = new SpeechRecognition();
  voiceState.recognition.continuous = true;
  voiceState.recognition.interimResults = true;
  voiceState.recognition.lang = 'en-US';

  voiceState.recognition.onstart = () => {
    voiceState.isListening = true;
    updateVoiceUI(true);
    if (window.showToast) window.showToast('Neural Link', 'ACOUSTIC_LINK_ESTABLISHED', 'success');
    if (window.cognitiveStream) window.cognitiveStream.addLine('> BIO_LINK: ACOUSTIC_CH_01_OPEN');
    startVoiceVisualization();
  };

  voiceState.recognition.onend = () => {
    voiceState.isListening = false;
    updateVoiceUI(false);
    stopVoiceVisualization();

    // Persistence logic
    if (window.alwaysListening && window.alwaysListening.enabled) {
      setTimeout(() => {
        if (!voiceState.isListening) voiceState.recognition.start();
      }, 500);
    }
  };

  voiceState.recognition.onresult = (event) => {
    let transcript = '';
    for (let i = event.resultIndex; i < event.results.length; i++) {
      transcript += event.results[i][0].transcript;
    }
    if (event.results[event.results.length - 1].isFinal) {
      handleVoiceCommand(transcript.trim());
    }
  };

  voiceState.recognition.onerror = (e) => {
    console.error('Acoustic Error:', e.error);
    if (e.error !== 'no-speech') {
      updateVoiceUI(false);
      stopVoiceVisualization();
    }
  };

  registerVoiceCommands();
  return true;
}

function registerVoiceCommands() {
  voiceState.commands = {
    'go home': () => window.scrollTo({ top: 0, behavior: 'smooth' }),
    'scroll down': () => window.scrollBy({ top: 500, behavior: 'smooth' }),
    'scroll up': () => window.scrollBy({ top: -500, behavior: 'smooth' }),
    'neural scan': () => executeFunction('analyze_image'),
    'omni search': () => executeFunction('visual_search'),
    'kernel lock': () => executeFunction('biometric_lock'),
    'close': () => closeModal(),
    'settings': () => showModal('settings'),
    'telemetry': () => toggleHUD(),
    'optimize': () => executeFunction('optimize_resources'),
    'toggle theme': () => toggleTheme(),
    'boost': () => toggleBoostMode(),
    'help': () => showVoiceHelp()
  };
}

function handleVoiceCommand(transcript) {
  const lower = transcript.toLowerCase();

  if (window.cognitiveStream) {
    window.cognitiveStream.addLine(`> RECOG: "${transcript.toUpperCase()}"`);
  }

  for (const [cmd, action] of Object.entries(voiceState.commands)) {
    if (lower.includes(cmd)) {
      if (window.showToast) window.showToast('Voice Command', `Executing: ${cmd}`, 'info');
      action();
      return true;
    }
  }

  // AI Fallback
  if (window.chatManager && window.chatManager.processInput) {
    window.chatManager.processInput(transcript);
  }
  return false;
}

function toggleVoiceAccess() {
  if (!voiceState.recognition) {
    if (!initVoiceAccess()) {
      showVoiceUnavailableModal();
      return;
    }
  }

  if (voiceState.isListening) {
    voiceState.recognition.stop();
  } else {
    try {
      voiceState.recognition.start();
    } catch (e) {
      console.error('Voice start error:', e);
    }
  }
}

function updateVoiceUI(isListening) {
  const btn = document.getElementById('tab-voice');
  if (btn) {
    btn.classList.toggle('listening', isListening);
    if (isListening) {
      btn.style.boxShadow = '0 0 30px var(--color-primary)';
      btn.querySelector('.tab-icon').textContent = '💫';
    } else {
      btn.style.boxShadow = 'var(--shadow-neon-primary)';
      btn.querySelector('.tab-icon').textContent = '🎤';
    }
  }
}

/**
 * Voice Signal Visualizer
 */
let animationId = null;
let audioContext = null;
let analyser = null;
let dataArray = null;

async function startVoiceVisualization() {
  const overlay = document.createElement('div');
  overlay.id = 'voiceOverlay';
  overlay.className = 'voice-overlay active';
  overlay.innerHTML = `
        <div class="voice-orb-container">
            <canvas id="voiceCanvas"></canvas>
            <div class="voice-status">LISTENING_FOR_SIGNAL...</div>
        </div>
    `;
  document.body.appendChild(overlay);

  const canvas = document.getElementById('voiceCanvas');
  const ctx = canvas.getContext('2d');
  canvas.width = 400;
  canvas.height = 400;

  // Initialize Web Audio if not already done
  if (!audioContext) {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const source = audioContext.createMediaStreamSource(stream);
      analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);
      const bufferLength = analyser.frequencyBinCount;
      dataArray = new Uint8Array(bufferLength);
    } catch (e) {
      console.warn('Audio visualization link failed:', e);
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const time = Date.now() * 0.002;

    let volume = 0;
    if (analyser && dataArray) {
      analyser.getByteFrequencyData(dataArray);
      let sum = 0;
      for (let i = 0; i < dataArray.length; i++) sum += dataArray[i];
      volume = sum / dataArray.length;
    }

    const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim() || '#00f2ff';
    const secondaryColor = getComputedStyle(document.documentElement).getPropertyValue('--color-secondary').trim() || '#7000ff';

    // Outer ring
    ctx.beginPath();
    ctx.strokeStyle = primaryColor;
    ctx.lineWidth = 2;
    ctx.shadowBlur = 15;
    ctx.shadowColor = primaryColor;

    for (let i = 0; i < 360; i += 2) {
      const rad = i * Math.PI / 180;
      const basePulse = 100 + (volume * 0.5);
      const ripple = Math.sin(rad * 8 + time * 2) * (5 + volume * 0.2);
      const r = basePulse + ripple;
      const x = 200 + Math.cos(rad) * r;
      const y = 200 + Math.sin(rad) * r;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.stroke();

    // Inner Core
    const gradient = ctx.createRadialGradient(200, 200, 10, 200, 200, 60 + volume * 0.4);
    gradient.addColorStop(0, primaryColor);
    gradient.addColorStop(1, 'transparent');

    ctx.beginPath();
    ctx.fillStyle = gradient;
    ctx.arc(200, 200, 70 + volume * 0.5, 0, Math.PI * 2);
    ctx.fill();

    // Neural data points
    if (volume > 20) {
      for (let j = 0; j < 5; j++) {
        const angle = Math.random() * Math.PI * 2;
        const dist = 100 + volume + Math.random() * 50;
        ctx.fillStyle = secondaryColor;
        ctx.beginPath();
        ctx.arc(200 + Math.cos(angle) * dist, 200 + Math.sin(angle) * dist, 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    animationId = requestAnimationFrame(animate);
  }
  animate();
}

function stopVoiceVisualization() {
  if (animationId) cancelAnimationFrame(animationId);
  const overlay = document.getElementById('voiceOverlay');
  if (overlay) {
    overlay.classList.remove('active');
    setTimeout(() => overlay.remove(), 400);
  }
}


function showVoiceHelp() {
  if (window.showModal) showModal('voice-help');
}

function showVoiceUnavailableModal() {
  if (window.showToast) window.showToast('Hardware Error', 'MICROPHONE_LINK_FAILURE', 'error');
}

function speak(text) {
  if (window.voiceManager) {
    window.voiceManager.speak(text);
  } else {
    const u = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(u);
  }
}

window.initVoiceAccess = initVoiceAccess;
window.toggleVoiceAccess = toggleVoiceAccess;
window.handleVoiceCommand = handleVoiceCommand;
window.speak = speak;

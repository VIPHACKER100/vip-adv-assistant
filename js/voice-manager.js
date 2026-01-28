/**
 * VIP AI SYMPHONY - Acoustic Synthesis v7.0
 * Advanced Neural Text-to-Speech & Voice Orchestration
 */

class VoiceManager {
  constructor() {
    this.voices = [];
    this.selectedVoice = null;
    this.settings = this.loadSettings();
    this.isInitialized = false;
    this.init();
  }

  /**
   * Initialize voice manager
   */
  init() {
    if ('speechSynthesis' in window) {
      // Load voices
      this.loadVoices();

      // Voices may load asynchronously
      if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = () => this.loadVoices();
      }

      this.isInitialized = true;
      console.log('🎙️ Voice Manager initialized');
    } else {
      console.warn('Speech synthesis not supported');
    }
  }

  /**
   * Load available voices
   */
  loadVoices() {
    this.voices = speechSynthesis.getVoices();

    // Auto-select best voice if none selected
    if (!this.selectedVoice && this.voices.length > 0) {
      this.selectedVoice = this.selectBestVoice();
    }

    console.log(`📢 ${this.voices.length} voices available`);
  }

  /**
   * Select the best natural-sounding voice
   */
  selectBestVoice() {
    // Priority order for natural voices
    const preferredVoices = [
      // Google voices (very natural)
      'Google US English',
      'Google UK English Female',
      'Google UK English Male',

      // Microsoft voices (natural)
      'Microsoft Zira Desktop',
      'Microsoft David Desktop',
      'Microsoft Mark',
      'Microsoft Aria',

      // Apple voices (high quality)
      'Samantha',
      'Alex',
      'Victoria',
      'Karen',

      // Other quality voices
      'Daniel',
      'Fiona',
      'Moira',
    ];

    // Try to find preferred voice
    for (const preferred of preferredVoices) {
      const voice = this.voices.find((v) => v.name.includes(preferred));
      if (voice) {
        console.log(`✅ Selected voice: ${voice.name}`);
        return voice;
      }
    }

    // Fallback: Find any English voice
    const englishVoice = this.voices.find((v) => v.lang.startsWith('en'));
    if (englishVoice) {
      console.log(`✅ Selected fallback voice: ${englishVoice.name}`);
      return englishVoice;
    }

    // Last resort: first available voice
    console.log(`⚠️ Using default voice: ${this.voices[0]?.name}`);
    return this.voices[0];
  }

  /**
   * Get categorized voices
   */
  getCategorizedVoices() {
    const categories = {
      premium: [],
      standard: [],
      other: [],
    };

    this.voices.forEach((voice) => {
      const name = voice.name.toLowerCase();

      // Premium voices (Google, Microsoft Neural, Apple)
      if (
        name.includes('google') ||
        name.includes('neural') ||
        name.includes('premium') ||
        (name.includes('microsoft') && (name.includes('aria') || name.includes('guy')))
      ) {
        categories.premium.push(voice);
      }
      // Standard quality voices
      else if (name.includes('microsoft') || name.includes('apple') || voice.localService) {
        categories.standard.push(voice);
      }
      // Other voices
      else {
        categories.other.push(voice);
      }
    });

    return categories;
  }

  /**
   * Speak text with current settings
   */
  speak(text, options = {}) {
    if (!this.isInitialized || !text) {
      console.warn('Voice manager not ready or no text provided');
      return;
    }

    // Cancel any ongoing speech
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    // Apply voice
    if (this.selectedVoice) {
      utterance.voice = this.selectedVoice;
    }

    // Apply settings
    utterance.rate = options.rate || this.settings.rate;
    utterance.pitch = options.pitch || this.settings.pitch;
    utterance.volume = options.volume || this.settings.volume;

    // Event handlers
    utterance.onstart = () => {
      console.log('🗣️ Speaking:', `${text.substring(0, 50)}...`);
      this.updateSpeakingUI(true);
    };

    utterance.onend = () => {
      this.updateSpeakingUI(false);
    };

    utterance.onerror = (event) => {
      console.error('Speech error:', event.error);
      this.updateSpeakingUI(false);
    };

    // Speak
    speechSynthesis.speak(utterance);
  }

  /**
   * Stop speaking
   */
  stop() {
    speechSynthesis.cancel();
    this.updateSpeakingUI(false);
  }

  /**
   * Pause speaking
   */
  pause() {
    speechSynthesis.pause();
  }

  /**
   * Resume speaking
   */
  resume() {
    speechSynthesis.resume();
  }

  /**
   * Set voice by name or index
   */
  setVoice(voiceNameOrIndex) {
    if (typeof voiceNameOrIndex === 'number') {
      this.selectedVoice = this.voices[voiceNameOrIndex];
    } else {
      this.selectedVoice = this.voices.find(
        (v) => v.name === voiceNameOrIndex || v.name.includes(voiceNameOrIndex)
      );
    }

    if (this.selectedVoice) {
      this.saveSettings();
      console.log(`🎙️ Voice changed to: ${this.selectedVoice.name}`);
    }
  }

  /**
   * Update voice settings
   */
  updateSettings(settings) {
    this.settings = { ...this.settings, ...settings };
    this.saveSettings();
  }

  /**
   * Load settings from localStorage
   */
  loadSettings() {
    try {
      const stored = localStorage.getItem('vip_voice_settings');
      return stored
        ? JSON.parse(stored)
        : {
          rate: 1.0,
          pitch: 1.0,
          volume: 1.0,
          voiceName: null,
        };
    } catch (error) {
      return {
        rate: 1.0,
        pitch: 1.0,
        volume: 1.0,
        voiceName: null,
      };
    }
  }

  /**
   * Save settings to localStorage
   */
  saveSettings() {
    try {
      const settings = {
        ...this.settings,
        voiceName: this.selectedVoice?.name,
      };
      localStorage.setItem('vip_voice_settings', JSON.stringify(settings));
    } catch (error) {
      console.error('Failed to save voice settings:', error);
    }
  }

  /**
   * Update UI to show speaking state
   */
  updateSpeakingUI(isSpeaking) {
    // Add visual indicator
    const indicator = document.getElementById('speakingIndicator');
    if (indicator) {
      indicator.style.display = isSpeaking ? 'block' : 'none';
    }

    // Dispatch event for other components
    window.dispatchEvent(
      new CustomEvent('voiceSpeaking', {
        detail: { isSpeaking },
      })
    );
  }

  /**
   * Show voice selection modal
   */
  showVoiceSelector() {
    const categories = this.getCategorizedVoices();

    const modalHTML = `
            <div class="modal-overlay active" onclick="closeModal(event)">
                <div class="modal" onclick="event.stopPropagation()" style="max-width: 600px;">
                    <div class="modal-header">
                        <h2 class="modal-title" style="font-family: var(--font-family-display); font-size: 18px; letter-spacing: 1px;">🎙️ ACOUSTIC_SYNTHESIS_CONFIG</h2>
                        <button class="modal-close" onclick="closeModal()">×</button>
                    </div>
                    <div class="modal-body">
                        ${this.renderVoiceCategories(categories)}
                        ${this.renderVoiceControls()}
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-glass" onclick="closeModal()">Close</button>
                        <button class="btn btn-primary" onclick="voiceManager.testVoice()">
                            🔊 Test Voice
                        </button>
                    </div>
                </div>
            </div>
        `;

    const container = document.getElementById('modalContainer');
    if (container) {
      container.innerHTML = modalHTML;
    }
  }

  /**
   * Render voice categories
   */
  renderVoiceCategories(categories) {
    let html = '<div style="margin-bottom: var(--space-6);">';

    // Premium voices
    if (categories.premium.length > 0) {
      html += this.renderVoiceSection('✨ PLATINUM_SYNTHESIS', categories.premium);
    }

    // Standard voices
    if (categories.standard.length > 0) {
      html += this.renderVoiceSection('⚡ KERNEL_STREAMS', categories.standard);
    }

    // Other voices
    if (categories.other.length > 0) {
      html += this.renderVoiceSection('📢 Other Voices', categories.other);
    }

    html += '</div>';
    return html;
  }

  /**
   * Render voice section
   */
  renderVoiceSection(title, voices) {
    const html = `
            <div class="glass-card" style="margin-bottom: var(--space-4);">
                <h4 style="margin-bottom: var(--space-3); color: var(--text-primary);">${title}</h4>
                <div style="display: grid; gap: var(--space-2);">
                    ${voices.map((voice) => this.renderVoiceOption(voice)).join('')}
                </div>
            </div>
        `;
    return html;
  }

  /**
   * Render voice option
   */
  renderVoiceOption(voice) {
    const isSelected = this.selectedVoice?.name === voice.name;
    const flag = this.getLanguageFlag(voice.lang);

    return `
            <div class="voice-option ${isSelected ? 'selected' : ''}" 
                 onclick="voiceManager.setVoice('${voice.name}')"
                 style="padding: var(--space-3); background: ${isSelected ? 'var(--color-accent-500)' : 'var(--bg-tertiary)'}; 
                        border-radius: var(--radius-md); cursor: pointer; transition: all 0.2s;
                        border: 2px solid ${isSelected ? 'var(--color-accent-400)' : 'transparent'};">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <div style="font-weight: ${isSelected ? 'bold' : 'normal'}; color: var(--text-primary);">
                            ${flag} ${voice.name}
                        </div>
                        <div style="font-size: var(--font-size-xs); color: var(--text-secondary); margin-top: 2px;">
                            ${voice.lang} ${voice.localService ? '• Local' : '• Online'}
                        </div>
                    </div>
                    ${isSelected ? '<span style="color: var(--color-success-400);">✓</span>' : ''}
                </div>
            </div>
        `;
  }

  /**
   * Render voice controls
   */
  renderVoiceControls() {
    return `
            <div class="glass-card" style="border: 1px solid var(--glass-border);">
                <h4 style="margin-bottom: var(--space-4); color: var(--color-accent-400); font-size: 12px; letter-spacing: 1px;">SYNAPSE_CONTROLS</h4>
                
                <!-- Speed -->
                <div style="margin-bottom: var(--space-4);">
                    <label style="display: block; margin-bottom: var(--space-2); color: var(--text-secondary);">
                        Speed: <span id="rateValue">${this.settings.rate.toFixed(1)}x</span>
                    </label>
                    <input type="range" min="0.5" max="2" step="0.1" value="${this.settings.rate}"
                           oninput="voiceManager.updateSettings({rate: parseFloat(this.value)}); document.getElementById('rateValue').textContent = this.value + 'x';"
                           style="width: 100%;">
                </div>

                <!-- Pitch -->
                <div style="margin-bottom: var(--space-4);">
                    <label style="display: block; margin-bottom: var(--space-2); color: var(--text-secondary);">
                        Pitch: <span id="pitchValue">${this.settings.pitch.toFixed(1)}</span>
                    </label>
                    <input type="range" min="0.5" max="2" step="0.1" value="${this.settings.pitch}"
                           oninput="voiceManager.updateSettings({pitch: parseFloat(this.value)}); document.getElementById('pitchValue').textContent = this.value;"
                           style="width: 100%;">
                </div>

                <!-- Volume -->
                <div>
                    <label style="display: block; margin-bottom: var(--space-2); color: var(--text-secondary);">
                        Volume: <span id="volumeValue">${Math.round(this.settings.volume * 100)}%</span>
                    </label>
                    <input type="range" min="0" max="1" step="0.1" value="${this.settings.volume}"
                           oninput="voiceManager.updateSettings({volume: parseFloat(this.value)}); document.getElementById('volumeValue').textContent = Math.round(this.value * 100) + '%';"
                           style="width: 100%;">
                </div>
            </div>
        `;
  }

  /**
   * Get language flag emoji
   */
  getLanguageFlag(lang) {
    const flags = {
      'en-US': '🇺🇸',
      'en-GB': '🇬🇧',
      'en-AU': '🇦🇺',
      'en-CA': '🇨🇦',
      'en-IN': '🇮🇳',
      es: '🇪🇸',
      fr: '🇫🇷',
      de: '🇩🇪',
      it: '🇮🇹',
      pt: '🇵🇹',
      ru: '🇷🇺',
      ja: '🇯🇵',
      zh: '🇨🇳',
      ko: '🇰🇷',
    };

    return flags[lang] || flags[lang.split('-')[0]] || '🌐';
  }

  /**
   * Test current voice
   */
  testVoice() {
    const testPhrases = [
      'Acoustic baseline established. SYMPHONY v6.0 online.',
      'Neural synthesis verified. Waiting for bio-metric handshake.',
      'Platinum-tier cognitive relay is operational. Ready for commands.',
    ];

    const randomPhrase = testPhrases[Math.floor(Math.random() * testPhrases.length)];
    this.speak(randomPhrase);
  }
}

// Initialize Voice Manager
const voiceManager = new VoiceManager();

// Replace old speak function with voice manager
function speak(text, options) {
  voiceManager.speak(text, options);
}

// Export for global access
window.voiceManager = voiceManager;
window.speak = speak;

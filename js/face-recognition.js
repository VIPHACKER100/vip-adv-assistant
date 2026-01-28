/**
 * VIP AI SYMPHONY - Face Recognition Kernel v7.0
 * Neural Biometric Verification & Identity Guard
 * Built on face-api.js neural link
 */

class FaceRecognitionManager {
  constructor() {
    this.video = null;
    this.canvas = null;
    this.isModelLoaded = false;
    this.isScanning = false;
    this.stream = null;
    this.registeredFaces = this.loadRegisteredFaces();
    this.currentDetection = null;
    this.detectionInterval = null;
    this.detectionTimeout = null;
  }

  /**
   * Initialize face recognition system
   */
  async init() {
    try {
      console.log('🔮 Face Link Interface Standby...');
      // Only create UI, don't load library/models yet
      this.createUI();
    } catch (error) {
      console.error('❌ Face Recognition UI Error:', error);
    }
  }

  /**
   * Ensure face-api library is injected dynamically
   */
  async ensureLibraryLoaded() {
    if (typeof faceapi !== 'undefined') return true;

    return new Promise((resolve, reject) => {
      console.log('📦 Injecting face-api.js node...');
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/face-api.js@0.22.2/dist/face-api.min.js';
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => reject(new Error('Failed to load Face-API library'));
      document.head.appendChild(script);
    });
  }

  async loadModels() {
    try {
      if (typeof faceapi === 'undefined') {
        throw new Error('face-api.js library not loaded');
      }

      const modelPath = 'assets/models';
      console.log('📦 Loading face recognition models from:', modelPath);
      this.updateStatus('🧠', 'LOADING_MODELS', 'Synchronizing Neural Weights...');

      const startTime = performance.now();

      // Parallel model loading
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(modelPath),
        faceapi.nets.faceLandmark68Net.loadFromUri(modelPath),
        faceapi.nets.faceRecognitionNet.loadFromUri(modelPath),
      ]);

      const loadTime = ((performance.now() - startTime) / 1000).toFixed(2);
      console.log(`✅ Models Synchronized in ${loadTime}s`);
      this.isModelLoaded = true;

      this.updateStatus('✅', 'KERNEL_READY', `Neural link established in ${loadTime}s`);
      this.updateRegisteredCount();

      // Show success toast
      this.safeToast(`Face recognition ready in ${loadTime}s`, 'success');

      return true;
    } catch (error) {
      console.error('❌ Model Loading Error:', error);
      this.isModelLoaded = false;
      this.updateStatus('❌', 'SYNC_ERROR', 'Models failed to load');
      throw new Error(`Failed to load face recognition models: ${error.message}`);
    }
  }

  /**
   * Create Face Recognition UI
   */
  createUI() {
    const modalHTML = `
      <div class="face-recognition-modal" id="faceRecognitionModal">
        <div class="face-recognition-container animate-slide-up">
          <div class="face-recognition-header">
            <div class="header-titles">
              <h2 class="face-recognition-title">🔐 BIOMETRIC_SHIELD_v7</h2>
              <div class="encryption-tag">ENCRYPTION: AES_GCM_READY</div>
            </div>
            <div class="header-actions">
              <button class="face-recognition-close" onclick="faceRecognition.showHelp()" title="GUIDE">?</button>
              <button class="face-recognition-close" onclick="faceRecognition.close()">×</button>
            </div>
          </div>

          <div class="face-recognition-body">
            <div class="face-recognition-status neural-glass" id="faceStatus">
              <div id="statusIcon" class="status-icon-orb">👁️</div>
              <div class="status-details">
                <div id="statusText" class="status-title">INITIALIZING_LINK</div>
                <div id="statusSubtext" class="status-subtitle">AWAITING_CAMERA_HANDSHAKE...</div>
              </div>
            </div>

            <div class="video-container">
              <video id="faceVideo" autoplay muted playsinline></video>
              <canvas id="faceCanvas"></canvas>
              <div class="scanning-overlay active" id="scanningOverlay">
                <div class="scan-line"></div>
              </div>
            </div>

            <div class="face-recognition-actions">
              <button class="btn-neural-primary" id="startScanBtn" onclick="faceRecognition.startRecognition()">
                🔍 SCAN_BIO
              </button>
              <button class="btn-neural-glass" id="registerBtn" onclick="faceRecognition.registerFace()">
                ➕ REGISTER
              </button>
            </div>
          </div>

          <div class="face-recognition-footer">
            <div class="telemetry-group">
              <div class="telemetry-item">
                <div class="telemetry-label">NODES</div>
                <div id="registeredCount" class="telemetry-value">0</div>
              </div>
              <div class="telemetry-item">
                <div class="telemetry-label">CONFIDENCE</div>
                <div id="confidenceValue" class="telemetry-value">--</div>
              </div>
            </div>
            <button class="btn-neural-glass btn-sm" onclick="faceRecognition.clearRegisteredFaces()">WIPE_BIOMETRICS</button>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
    this.video = document.getElementById('faceVideo');
    this.canvas = document.getElementById('faceCanvas');
    this.updateRegisteredCount();
  }


  /**
   * Safe toast notification
   */
  safeToast(message, type = 'info') {
    if (typeof showToast === 'function') {
      showToast(message, type);
    } else {
      console.log(`[${type.toUpperCase()}] ${message}`);
    }
  }

  /**
   * Open Face Recognition Modal
   */
  async open() {
    const modal = document.getElementById('faceRecognitionModal');
    if (!modal) return;

    modal.classList.add('active');
    this.updateStatus('📂', 'LOADING_RESOURCES', 'Initializing Neural Library...');

    try {
      // 1. Ensure script is loaded
      await this.ensureLibraryLoaded();

      // 2. Load models if not already done
      if (!this.isModelLoaded) {
        this.updateStatus('🧠', 'LOADING_MODELS', 'Synchronizing Neural Weights...');
        await this.loadModels();
      }

      // 3. Start Camera
      await this.startCamera();
    } catch (error) {
      console.error('Biometric Init Error:', error);
      this.updateStatus('❌', 'LINK_FAILED', error.message);
      this.safeToast('Face Recognition failed to initialize', 'error');
    }
  }

  /**
   * Close Face Recognition Modal
   */
  close() {
    const modal = document.getElementById('faceRecognitionModal');
    if (modal) {
      modal.classList.remove('active');
    }
    this.stopCamera();
    this.stopDetection();
    document.getElementById('scanningOverlay')?.classList.remove('active');
  }

  /**
   * Stop detection loop
   */
  stopDetection() {
    this.isScanning = false;
    if (this.detectionInterval) {
      clearInterval(this.detectionInterval);
      this.detectionInterval = null;
    }
    if (this.detectionTimeout) {
      clearTimeout(this.detectionTimeout);
      this.detectionTimeout = null;
    }
  }

  /**
   * Start camera stream
   */
  async startCamera() {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: 640, height: 480 },
      });
      this.video.srcObject = this.stream;

      this.video.addEventListener(
        'loadedmetadata',
        () => {
          if (this.canvas) {
            this.canvas.width = this.video.videoWidth;
            this.canvas.height = this.video.videoHeight;
          }
          this.updateStatus('✅', 'Camera Ready', 'Click "Start Recognition" to begin');
        },
        { once: true }
      );
    } catch (error) {
      console.error('Camera access error:', error);
      throw error;
    }
  }

  /**
   * Stop camera stream
   */
  stopCamera() {
    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop());
      this.stream = null;
    }
  }

  async startRecognition() {
    if (!this.video || this.video.paused) {
      this.safeToast('Camera sensor offline', 'warning');
      return;
    }

    if (this.registeredFaces.length === 0) {
      this.safeToast('No registered faces found. Please register first.', 'info');
    }

    this.isScanning = true;
    document.getElementById('scanningOverlay').classList.add('active');
    this.updateStatus('🔍', 'SCAN_ACTIVE', 'ANALYZING_FACIAL_TOPOLOGY...');

    if (window.cognitiveStream) {
      window.cognitiveStream.addLine('> BIO_ID: STARTING_SCAN_SEQUENCE');
    }

    this.detectFaces();
  }

  async detectFaces() {
    if (!this.isScanning) return;

    try {
      if (!this.video || this.video.paused) {
        this.stopDetection();
        return;
      }

      const detections = await faceapi
        .detectAllFaces(
          this.video,
          new faceapi.TinyFaceDetectorOptions({ inputSize: 224, scoreThreshold: 0.5 })
        )
        .withFaceLandmarks()
        .withFaceDescriptors();

      if (this.canvas) {
        const ctx = this.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (detections.length > 0) {
          const displaySize = { width: this.video.videoWidth, height: this.video.videoHeight };
          faceapi.matchDimensions(this.canvas, displaySize);
          const resizedDetections = faceapi.resizeResults(detections, displaySize);

          faceapi.draw.drawDetections(this.canvas, resizedDetections);
          faceapi.draw.drawFaceLandmarks(this.canvas, resizedDetections);

          const recognition = this.recognizeFace(detections[0].descriptor);

          if (recognition) {
            this.onRecognitionSuccess(recognition);
          } else {
            this.updateStatus('👤', 'UNKNOWN_ENTITY', 'Target not in biometric data');
            const confidence = (detections[0].detection.score * 100).toFixed(1);
            document.getElementById('confidenceValue').textContent = `${confidence}%`;
          }
        } else {
          this.updateStatus('🔍', 'SCANNING...', 'No target in sensor field');
          document.getElementById('confidenceValue').textContent = '--';
        }
      }

      if (this.isScanning) {
        this.detectionTimeout = setTimeout(() => {
          requestAnimationFrame(() => this.detectFaces());
        }, 80); // Throttled for performance
      }
    } catch (error) {
      console.error('Detection Protocol Error:', error);
      if (this.isScanning) {
        this.detectionTimeout = setTimeout(() => this.detectFaces(), 1000);
      }
    }
  }

  /**
   * Register a new face
   */
  async registerFace() {
    if (!this.video || this.video.paused) {
      this.safeToast('Camera not ready', 'warning');
      return;
    }

    this.updateStatus('📸', 'Capturing Face...', 'Please look at the camera');

    try {
      const detection = await faceapi
        .detectSingleFace(
          this.video,
          new faceapi.TinyFaceDetectorOptions({ inputSize: 224, scoreThreshold: 0.5 })
        )
        .withFaceLandmarks()
        .withFaceDescriptor();

      if (!detection) {
        this.safeToast('No face detected. Please try again.', 'warning');
        this.updateStatus('❌', 'LOCK_FAILED', 'Target must be centered and clear');
        return;
      }

      // Prompt for name
      const name = prompt('Enter your name:');
      if (!name || name.trim() === '') {
        this.safeToast('Registration cancelled', 'info');
        return;
      }

      // Save face descriptor - properly convert Float32Array
      const descriptorArray = Array.from(detection.descriptor);
      this.registeredFaces.push({
        name: name.trim(),
        descriptor: descriptorArray,
        timestamp: Date.now(),
      });

      this.saveRegisteredFaces();
      this.updateRegisteredCount();

      this.safeToast(`Face registered successfully for ${name}!`, 'success');
      this.updateStatus('✅', 'Registration Complete', `Welcome, ${name}!`);

      // Log to notifications
      if (typeof notificationManager !== 'undefined') {
        notificationManager.addNotification({
          title: 'Face Registered',
          message: `New face registered: ${name}`,
          type: 'success',
          timestamp: Date.now(),
        });
      }
    } catch (error) {
      console.error('Registration Error:', error);
      this.safeToast('Registration failed. Please try again.', 'error');
    }
  }

  /**
   * Recognize face from descriptor
   */
  recognizeFace(descriptor) {
    if (this.registeredFaces.length === 0) {
      return null;
    }

    const threshold = 0.6; // Lower = more strict
    let bestMatch = null;
    let bestDistance = Infinity;

    for (const registered of this.registeredFaces) {
      try {
        // Ensure both descriptors are proper format
        const registeredDescriptor = new Float32Array(registered.descriptor);
        const currentDescriptor =
          descriptor instanceof Float32Array ? descriptor : new Float32Array(descriptor);

        const distance = faceapi.euclideanDistance(currentDescriptor, registeredDescriptor);

        if (distance < threshold && distance < bestDistance) {
          bestDistance = distance;
          bestMatch = registered;
        }
      } catch (error) {
        console.error('Error comparing faces:', error);
      }
    }

    if (bestMatch) {
      return {
        name: bestMatch.name,
        confidence: ((1 - bestDistance) * 100).toFixed(1),
      };
    }

    return null;
  }

  /**
   * Handle successful recognition
   */
  onRecognitionSuccess(recognition) {
    this.updateStatus(
      '✅',
      `AUTH_SUCCESS: ${recognition.name.toUpperCase()}`,
      `CONFIDENCE_RATING: ${recognition.confidence}%`
    );
    document.getElementById('confidenceValue').textContent = `${recognition.confidence}%`;

    const successHTML = `
      <div class="recognition-success animate-fade-in" id="recognitionSuccess" style="background: rgba(16, 185, 129, 0.2); border: 2px solid var(--color-success-500); backdrop-filter: blur(10px);">
        <div class="recognition-success-icon" style="background: var(--color-success-500); box-shadow: 0 0 20px var(--color-success-500);">✓</div>
        <div class="recognition-success-text" style="font-family: var(--font-family-display); letter-spacing: 2px;">IDENT_VERIFIED</div>
        <div class="recognition-success-name">ACCESS_GRANTED: ${recognition.name.toUpperCase()}</div>
      </div>
    `;

    const videoContainer = document.querySelector('.video-container');
    const existingSuccess = document.getElementById('recognitionSuccess');
    if (existingSuccess) existingSuccess.remove();
    videoContainer.insertAdjacentHTML('beforeend', successHTML);

    setTimeout(() => {
      const elem = document.getElementById('recognitionSuccess');
      if (elem) elem.remove();
    }, 4000);

    if (window.cognitiveStream) {
      window.cognitiveStream.addLine(`> SUCCESS: BIOMETRIC_MATCH_FOUND [${recognition.name}]`);
    }

    if (typeof notificationManager !== 'undefined') {
      notificationManager.addNotification({
        title: 'Biometric Verified',
        message: `Identity confirmed for node: ${recognition.name}`,
        type: 'success',
      });
    }

    // Trigger voice greeting if available
    if (typeof speak !== 'undefined') {
      speak(`Verification successful. Welcome back, ${recognition.name}.`);
    }
  }

  /**
   * Update status display
   */
  updateStatus(icon, text, subtext) {
    document.getElementById('statusIcon').textContent = icon;
    document.getElementById('statusText').textContent = text;
    document.getElementById('statusSubtext').textContent = subtext;
  }

  /**
   * Update registered faces count
   */
  updateRegisteredCount() {
    const count = this.registeredFaces.length;
    const elem = document.getElementById('registeredCount');
    if (elem) {
      elem.textContent = count;
    }
  }

  /**
   * Load registered faces from localStorage
   */
  loadRegisteredFaces() {
    try {
      const stored = localStorage.getItem('vip_registered_faces');
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading registered faces:', error);
      return [];
    }
  }

  /**
   * Save registered faces to localStorage
   */
  saveRegisteredFaces() {
    try {
      localStorage.setItem('vip_registered_faces', JSON.stringify(this.registeredFaces));
    } catch (error) {
      console.error('Error saving registered faces:', error);
    }
  }

  /**
   * Clear all registered faces
   */
  clearRegisteredFaces() {
    if (!confirm('Are you sure you want to clear all registered faces?')) {
      return;
    }

    this.registeredFaces = [];
    this.saveRegisteredFaces();
    this.updateRegisteredCount();
    this.safeToast('All registered faces cleared', 'info');

    if (typeof notificationManager !== 'undefined') {
      notificationManager.addNotification({
        title: 'Faces Cleared',
        message: 'All registered faces have been removed',
        type: 'info',
        timestamp: Date.now(),
      });
    }
  }
  /**
   * Show Face Recognition Help
   */
  showHelp() {
    if (window.cognitiveStream) {
      window.cognitiveStream.addLine('> BIO_GUIDE: [REGISTER] - Capture neural signature');
      window.cognitiveStream.addLine('> BIO_GUIDE: [SCAN] - Verify identity vectors');
      window.cognitiveStream.addLine('> BIO_GUIDE: [WIPE] - Purge local biometric buffer');
      window.showToast('Biometric Guide', 'Instructions sent to cognitive stream.', 'info');
    }
  }

}

// Initialize Face Recognition Manager
const faceRecognition = new FaceRecognitionManager();

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => faceRecognition.init());
} else {
  faceRecognition.init();
}

// Export for use in other modules
if (typeof window !== 'undefined') {
  window.faceRecognition = faceRecognition;
}

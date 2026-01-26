/**
 * Face Recognition Module
 * VIP Advanced AI Assistant - Face ID System
 * Uses face-api.js for face detection and recognition
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
            console.log('🔮 Initializing Face Recognition System...');

            // Verify face-api library is loaded
            if (typeof faceapi === 'undefined') {
                console.warn('⚠️ face-api.js library not loaded yet, retrying...');
                setTimeout(() => this.init(), 500);
                return;
            }

            // Create UI first, before loading models
            this.createUI();

            // Then load models with timeout protection
            await Promise.race([
                this.loadModels(),
                new Promise((_, reject) =>
                    setTimeout(() => reject(new Error('Model loading timeout')), 30000)
                )
            ]);

            console.log('✅ Face Recognition System Ready');
        } catch (error) {
            console.error('❌ Face Recognition Init Error:', error);
            // Safe toast call
            if (typeof showToast === 'function') {
                showToast('Face Recognition models failed to load', 'error');
            } else {
                console.warn('showToast not available, models failed to load');
            }
            // Continue anyway - UI is created
            this.isModelLoaded = false;
        }
    }

    /**
     * Load face-api.js models
     */
    async loadModels() {
        try {
            if (typeof faceapi === 'undefined') {
                throw new Error('face-api.js library not loaded');
            }

            const modelPath = './models';

            console.log('📦 Loading face recognition models from:', modelPath);

            // Load tiny face detector, landmarks and recognition models
            await faceapi.nets.tinyFaceDetector.loadFromUri(modelPath);
            await faceapi.nets.faceLandmark68Net.loadFromUri(modelPath);
            await faceapi.nets.faceRecognitionNet.loadFromUri(modelPath);

            this.isModelLoaded = true;
            console.log('✅ Face Recognition Models Loaded Successfully');

            // Update UI status
            const statusElem = document.getElementById('systemStatus');
            if (statusElem) {
                statusElem.textContent = 'READY';
                statusElem.style.color = 'var(--color-success-400)';
            }

            // Show the Face ID buttons in header and mobile tab
            const faceIdBtn = document.getElementById('faceIdBtn');
            const mobileFaceIdBtn = document.getElementById('tab-faceid');

            if (faceIdBtn) {
                faceIdBtn.style.display = 'flex';
                faceIdBtn.classList.add('animate-fade-in');
            }
            if (mobileFaceIdBtn) {
                mobileFaceIdBtn.style.display = 'flex';
                mobileFaceIdBtn.classList.add('animate-fade-in');
            }
            console.log('🔓 Face ID interface unlocked');

            return true;
        } catch (error) {
            console.error('❌ Model Loading Error:', error);
            this.isModelLoaded = false;

            // Update UI with error status
            const statusElem = document.getElementById('systemStatus');
            if (statusElem) {
                statusElem.textContent = 'OFFLINE';
                statusElem.style.color = 'var(--color-error-400)';
            }

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
            <h2 class="face-recognition-title" style="font-family: var(--font-family-display); font-size: 16px; letter-spacing: 1px;">🔐 BIOMETRIC_ID_VERIFICATION</h2>
            <div style="display: flex; gap: var(--space-2);">
              <button class="face-recognition-close" onclick="faceRecognition.showHelp()" title="Biometric Help" style="background: var(--glass-bg-strong); color: var(--color-accent-400);">?</button>
              <button class="face-recognition-close" onclick="faceRecognition.close()">✕</button>
            </div>
          </div>

          <div class="face-recognition-status" id="faceStatus">
            <span class="status-icon" id="statusIcon" style="background: var(--gradient-primary); box-shadow: var(--shadow-glow-accent);">👁️</span>
            <div class="status-text" id="statusText" style="font-weight: 700; color: var(--text-primary);">INITIALIZING_BIOMETRIC_LINK</div>
            <div class="status-subtext" id="statusSubtext" style="font-family: var(--font-family-mono); font-size: 10px; opacity: 0.7;">AWAITING_CAMERA_HANDSHAKE...</div>
          </div>

          <div class="video-container" style="border-radius: var(--radius-2xl); border: 2px solid var(--glass-border); overflow: hidden; background: #000;">
            <video id="faceVideo" autoplay muted playsinline style="filter: contrast(1.1) brightness(1.1);"></video>
            <canvas id="faceCanvas"></canvas>
            <div class="scanning-overlay active" id="scanningOverlay">
              <div class="scan-line" style="background: linear-gradient(to bottom, transparent, var(--color-accent-400), transparent);"></div>
            </div>
          </div>

          <div class="face-recognition-actions">
            <button class="btn btn-primary btn-sm hover-glow" id="startScanBtn" onclick="faceRecognition.startRecognition()">
              <span>🔍</span>
              <span>START_SCAN</span>
            </button>
            <button class="btn btn-accent btn-sm" id="registerBtn" onclick="faceRecognition.registerFace()">
              <span>➕</span>
              <span>REGISTER_BIO_NODE</span>
            </button>
            <button class="btn btn-glass btn-sm" onclick="faceRecognition.clearRegisteredFaces()" title="Wipe all face data">
              <span>🗑️</span>
              <span>WIPE_DATA</span>
            </button>
          </div>

          <div class="face-recognition-info" style="background: var(--glass-bg-subtle); border-top: 1px solid var(--glass-border); padding: var(--space-4);">
            <div class="info-item">
              <span class="info-label" style="font-size: 9px; letter-spacing: 1px;">NODES</span>
              <span class="info-value badge badge-primary" id="registeredCount">0</span>
            </div>
            <div class="info-item">
              <span class="info-label" style="font-size: 9px; letter-spacing: 1px;">CONFIDENCE</span>
              <span class="info-value" id="confidenceValue" style="color: var(--color-accent-400); font-family: var(--font-family-mono);">--</span>
            </div>
            <div class="info-item">
              <span class="info-label" style="font-size: 9px; letter-spacing: 1px;">KERNEL_STATE</span>
              <span class="info-value" id="systemStatus" style="font-weight: bold;">READY</span>
            </div>
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
        if (!modal) {
            console.error('Face Recognition modal not found in DOM');
            this.safeToast('Face Recognition UI not initialized', 'error');
            return;
        }

        if (!this.isModelLoaded) {
            this.safeToast('Face Recognition models are still loading...', 'warning');
            return;
        }

        modal.classList.add('active');

        try {
            await this.startCamera();
        } catch (error) {
            console.error('Camera Error:', error);
            this.updateStatus('❌', 'Camera Access Denied', 'Please enable camera permissions');
            this.safeToast('Camera access required for Face Recognition', 'error');
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
                video: { facingMode: 'user', width: 640, height: 480 }
            });
            this.video.srcObject = this.stream;

            this.video.addEventListener('loadedmetadata', () => {
                if (this.canvas) {
                    this.canvas.width = this.video.videoWidth;
                    this.canvas.height = this.video.videoHeight;
                }
                this.updateStatus('✅', 'Camera Ready', 'Click "Start Recognition" to begin');
            }, { once: true });
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
            this.stream.getTracks().forEach(track => track.stop());
            this.stream = null;
        }
    }

    /**
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
        this.updateStatus('🔍', 'SCAN_IN_PROGRESS', 'ANALYZING_FACIAL_TOPOLOGY...');
        
        const systemStatus = document.getElementById('systemStatus');
        if (systemStatus) systemStatus.textContent = 'SCANNING';

        if (window.cognitiveStream) {
            window.cognitiveStream.addLine('> BIO_ID: STARTING_SCAN_SEQUENCE');
        }

        this.detectFaces();
    }

    /**
     * Detect faces in video stream
     */
    async detectFaces() {
        if (!this.isScanning) return;

        try {
            if (!this.video || this.video.paused) {
                this.stopDetection();
                return;
            }

            const detections = await faceapi
                .detectAllFaces(this.video, new faceapi.TinyFaceDetectorOptions({ inputSize: 224, scoreThreshold: 0.5 }))
                .withFaceLandmarks()
                .withFaceDescriptors();

            // Clear canvas
            if (this.canvas) {
                const ctx = this.canvas.getContext('2d');
                ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

                if (detections.length > 0) {
                    // Match dimensions for accurate drawing
                    const displaySize = { width: this.video.videoWidth, height: this.video.videoHeight };
                    faceapi.matchDimensions(this.canvas, displaySize);

                    // Resize results to match canvas
                    const resizedDetections = faceapi.resizeResults(detections, displaySize);

                    // Draw detections
                    faceapi.draw.drawDetections(this.canvas, resizedDetections);
                    faceapi.draw.drawFaceLandmarks(this.canvas, resizedDetections);

                    // Try to recognize using the first detection
                    const recognition = this.recognizeFace(detections[0].descriptor);

                    if (recognition) {
                        this.onRecognitionSuccess(recognition);
                    } else {
                        this.updateStatus('👤', 'UNKNOWN_ENTITY', 'Target not in bio-database');
                        const confidence = (detections[0].detection.score * 100).toFixed(1);
                        document.getElementById('confidenceValue').textContent = confidence + '%';
                    }
                } else {
                    this.updateStatus('🔍', 'SCANNING...', 'No face detected in field');
                    document.getElementById('confidenceValue').textContent = '--';
                }
            }

            // Schedule next detection with proper cleanup and throttling
            if (this.isScanning) {
                this.detectionTimeout = setTimeout(() => {
                    requestAnimationFrame(() => this.detectFaces());
                }, 100);
            }
        } catch (error) {
            console.error('Detection Error:', error);
            // Don't stop on single error, but slow down
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
                .detectSingleFace(this.video, new faceapi.TinyFaceDetectorOptions({ inputSize: 224, scoreThreshold: 0.5 }))
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
                timestamp: Date.now()
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
                    timestamp: Date.now()
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
        if (this.registeredFaces.length === 0) return null;

        const threshold = 0.6; // Lower = more strict
        let bestMatch = null;
        let bestDistance = Infinity;

        for (const registered of this.registeredFaces) {
            try {
                // Ensure both descriptors are proper format
                const registeredDescriptor = new Float32Array(registered.descriptor);
                const currentDescriptor = descriptor instanceof Float32Array
                    ? descriptor
                    : new Float32Array(descriptor);

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
                confidence: ((1 - bestDistance) * 100).toFixed(1)
            };
        }

        return null;
    }

    /**
     * Handle successful recognition
     */
    onRecognitionSuccess(recognition) {
        this.updateStatus('✅', `AUTH_SUCCESS: ${recognition.name.toUpperCase()}`, `CONFIDENCE_RATING: ${recognition.confidence}%`);
        document.getElementById('confidenceValue').textContent = recognition.confidence + '%';
        document.getElementById('systemStatus').textContent = 'VERIFIED';
        document.getElementById('systemStatus').style.color = 'var(--color-success-400)';

        // Show success overlay
        const successHTML = `
      <div class="recognition-success animate-fade-in" id="recognitionSuccess" style="background: rgba(16, 185, 129, 0.2); border: 2px solid var(--color-success-500); backdrop-filter: blur(10px);">
        <div class="recognition-success-icon" style="background: var(--color-success-500); box-shadow: 0 0 20px var(--color-success-500);">✓</div>
        <div class="recognition-success-text" style="font-family: var(--font-family-display); letter-spacing: 2px;">NEURAL_TARGET_VERIFIED</div>
        <div class="recognition-success-name">WELCOME_BACK_${recognition.name.toUpperCase()}</div>
      </div>
    `;

        const videoContainer = document.querySelector('.video-container');
        const existingSuccess = document.getElementById('recognitionSuccess');
        if (existingSuccess) existingSuccess.remove();

        videoContainer.insertAdjacentHTML('beforeend', successHTML);

        setTimeout(() => {
            const elem = document.getElementById('recognitionSuccess');
            if (elem) elem.remove();
        }, 3500);

        if (window.cognitiveStream) {
            window.cognitiveStream.addLine(`> SUCCESS: BIOMETRIC_MATCH_FOUND [${recognition.name}]`);
        }

        // Log to notifications
        if (typeof notificationManager !== 'undefined') {
            notificationManager.addNotification({
                title: 'Biometric Verified',
                message: `Access granted to user node: ${recognition.name}`,
                type: 'success',
                timestamp: Date.now()
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
                timestamp: Date.now()
            });
        }
    }
    /**
     * Show Face Recognition Help
     */
    showHelp() {
        const helpMessage = `
            BIOMETRIC SECURE LINK GUIDE:
            
            1. REGISTER_BIO_NODE: Capture your facial signature into the local neural database.
            2. START_SCAN: Initialize real-time tracking to verify your identity.
            3. WIPE_DATA: Securely erase all stored biometric signatures.
            
            Note: All biometric data stays strictly on this device kernel. No data is transmitted to the cloud.
        `;
        alert(helpMessage);
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

/**
 * Advanced Mobile Control AI Assistant
 * EXPANDED Function Definitions - 65+ Functions
 */

// Get all function categories with their functions
function getFunctionCategories() {
  return [
    {
      name: 'AI & Vision',
      icon: '🧠',
      description: 'Intelligent image analysis and visual understanding',
      functions: [
        { id: 'analyze_image', icon: '📸', title: 'Image Analysis', description: 'AI-powered object detection, OCR, and scene understanding', badge: 'Popular', badgeType: 'accent' },
        { id: 'visual_search', icon: '🔍', title: 'Visual Search', description: 'Search by image, find products, or identify locations' },
        { id: 'enhance_media', icon: '✨', title: 'Media Enhancement', description: 'AI upscaling, noise reduction, and style transfer' },
        { id: 'screen_understanding', icon: '📱', title: 'Screen Understanding', description: 'Understand and interact with on-screen content' },
        { id: 'generate_content', icon: '🎨', title: 'Content Generation', description: 'Generate images, text, or media using AI' },
        { id: 'face_recognition', icon: '👤', title: 'Face Recognition', description: 'Identify and tag people in photos', badge: 'New', badgeType: 'success' },
        { id: 'qr_code_scanner', icon: '📲', title: 'QR/Barcode Scanner', description: 'Scan and decode QR codes and barcodes' }
      ]
    },
    {
      name: 'Automation & Routines',
      icon: '⚡',
      description: 'Create powerful workflows and smart automations',
      functions: [
        { id: 'create_automation', icon: '🤖', title: 'Create Automation', description: 'Build custom routines from natural language', badge: 'New', badgeType: 'success' },
        { id: 'manage_routine', icon: '📋', title: 'Manage Routines', description: 'View, edit, or execute saved automations' },
        { id: 'smart_suggestions', icon: '💡', title: 'Smart Suggestions', description: 'AI-powered contextual recommendations' },
        { id: 'task_chain', icon: '🔗', title: 'Task Chain', description: 'Execute complex multi-step workflows' },
        { id: 'learn_preference', icon: '🧠', title: 'Learn Preferences', description: 'AI learns from your behavior patterns' }
      ]
    },
    {
      name: 'Security & Privacy',
      icon: '🔒',
      description: 'Advanced security and privacy controls',
      functions: [
        { id: 'biometric_auth', icon: '👆', title: 'Biometric Auth', description: 'Fingerprint, face, or voice authentication' },
        { id: 'secure_vault', icon: '🔐', title: 'Secure Vault', description: 'Encrypted storage for sensitive data' },
        { id: 'privacy_control', icon: '🛡️', title: 'Privacy Controls', description: 'Manage app permissions and privacy settings' },
        { id: 'secure_communication', icon: '🔑', title: 'Secure Messaging', description: 'End-to-end encrypted communication' },
        { id: 'find_device', icon: '📍', title: 'Find Device', description: 'Locate, lock, or wipe device remotely' },
        { id: 'password_generator', icon: '🔐', title: 'Password Generator', description: 'Generate strong, secure passwords' },
        { id: 'vpn_control', icon: '🔒', title: 'VPN Control', description: 'Manage VPN connections and privacy' },
        { id: 'app_lock', icon: '🔒', title: 'App Lock', description: 'Lock specific apps with biometrics' }
      ]
    },
    {
      name: 'Communication',
      icon: '💬',
      description: 'Smart messaging and collaboration tools',
      functions: [
        { id: 'smart_reply', icon: '💭', title: 'Smart Reply', description: 'AI-generated contextual message suggestions', badge: 'Popular', badgeType: 'accent' },
        { id: 'compose_message', icon: '✍️', title: 'Compose Message', description: 'AI-assisted message composition' },
        { id: 'meeting_assistant', icon: '🎥', title: 'Meeting Assistant', description: 'Join, transcribe, or summarize meetings' },
        { id: 'translate_realtime', icon: '🌐', title: 'Real-time Translation', description: 'Instant language translation' },
        { id: 'voice_assistant', icon: '🎤', title: 'Voice Assistant', description: 'Advanced voice commands and control' },
        { id: 'email_assistant', icon: '📧', title: 'Email Assistant', description: 'Smart email management and responses' },
        { id: 'call_screening', icon: '📞', title: 'Call Screening', description: 'AI answers and screens calls for you' },
        { id: 'voice_notes', icon: '🎙️', title: 'Voice Notes', description: 'Record and transcribe voice memos' }
      ]
    },
    {
      name: 'Context & Intelligence',
      icon: '🎯',
      description: 'Contextual awareness and predictive features',
      functions: [
        { id: 'context_analysis', icon: '📊', title: 'Context Analysis', description: 'Analyze device and user context' },
        { id: 'predict_next_action', icon: '🔮', title: 'Predict Next Action', description: 'AI predictions based on patterns' },
        { id: 'memory_recall', icon: '🧩', title: 'Memory Recall', description: 'Search through device history' },
        { id: 'location_intelligence', icon: '📍', title: 'Location Intelligence', description: 'Context-aware location-based actions' },
        { id: 'behavior_patterns', icon: '📈', title: 'Behavior Patterns', description: 'Analyze and learn usage patterns' }
      ]
    },
    {
      name: 'Smart Home & IoT',
      icon: '🏠',
      description: 'Control smart home devices and scenes',
      functions: [
        { id: 'control_smart_home', icon: '💡', title: 'Control Devices', description: 'Manage lights, thermostat, locks, and more' },
        { id: 'iot_automation', icon: '🔄', title: 'IoT Automation', description: 'Create smart home automations' },
        { id: 'scene_management', icon: '🎬', title: 'Scene Management', description: 'Create and activate device scenes' },
        { id: 'energy_monitoring', icon: '⚡', title: 'Energy Monitoring', description: 'Track smart device energy usage' }
      ]
    },
    {
      name: 'Creative & Productivity',
      icon: '🎨',
      description: 'Tools for creativity and productivity',
      functions: [
        { id: 'scan_document', icon: '📄', title: 'Document Scanner', description: 'Advanced scanning with OCR' },
        { id: 'clipboard_manager', icon: '📋', title: 'Clipboard Manager', description: 'History and smart paste suggestions' },
        { id: 'focus_mode', icon: '🎯', title: 'Focus Mode', description: 'Minimize distractions and boost productivity' },
        { id: 'gesture_control', icon: '👋', title: 'Gesture Control', description: 'Custom gesture shortcuts' },
        { id: 'ar_features', icon: '🔲', title: 'AR Features', description: 'Augmented reality capabilities' },
        { id: 'note_taking', icon: '📝', title: 'Smart Notes', description: 'AI-enhanced note-taking' },
        { id: 'calendar_sync', icon: '📅', title: 'Calendar Sync', description: 'Intelligent calendar management' },
        { id: 'task_manager', icon: '✅', title: 'Task Manager', description: 'Create and manage tasks with AI' }
      ]
    },
    {
      name: 'Analytics & Insights',
      icon: '📈',
      description: 'Usage tracking and wellness features',
      functions: [
        { id: 'usage_analytics', icon: '📊', title: 'Usage Analytics', description: 'Detailed app and screen time insights' },
        { id: 'wellness_check', icon: '💚', title: 'Wellness Check', description: 'Digital wellbeing and health integration' },
        { id: 'performance_optimization', icon: '⚙️', title: 'Performance Optimization', description: 'Battery, storage, and memory optimization' },
        { id: 'data_usage', icon: '📊', title: 'Data Usage', description: 'Monitor mobile data consumption' },
        { id: 'app_insights', icon: '📱', title: 'App Insights', description: 'Detailed per-app usage statistics' }
      ]
    },
    {
      name: 'Connectivity & Sync',
      icon: '🌐',
      description: 'Network and cross-device features',
      functions: [
        { id: 'cross_device_sync', icon: '🔄', title: 'Cross-Device Sync', description: 'Sync content across all devices', badge: 'New', badgeType: 'success' },
        { id: 'network_optimization', icon: '📶', title: 'Network Optimizer', description: 'Intelligent network management' },
        { id: 'wifi_assistant', icon: '📡', title: 'WiFi Assistant', description: 'Auto-connect to trusted networks' },
        { id: 'hotspot_control', icon: '📶', title: 'Hotspot Control', description: 'Share network connection' },
        { id: 'bluetooth_manager', icon: '🔵', title: 'Bluetooth Manager', description: 'Manage Bluetooth connections' }
      ]
    },
    {
      name: 'Emergency & Safety',
      icon: '🚨',
      description: 'Emergency assistance and safety features',
      functions: [
        { id: 'sos_alert', icon: '🆘', title: 'SOS Alert', description: 'Emergency contacts and location sharing' },
        { id: 'crash_detection', icon: '🚗', title: 'Crash Detection', description: 'Auto-detect accidents and alert contacts' },
        { id: 'medical_id', icon: '🏥', title: 'Medical ID', description: 'Emergency medical information access' },
        { id: 'safety_check', icon: '🔔', title: 'Safety Check-in', description: 'Scheduled safety check-ins' }
      ]
    },
    {
      name: 'Accessibility',
      icon: '♿',
      description: 'Advanced accessibility controls',
      functions: [
        { id: 'screen_reader', icon: '📣', title: 'Screen Reader', description: 'Advanced text-to-speech' },
        { id: 'voice_access', icon: '🎤', title: 'Voice Access', description: 'Control device entirely by voice' },
        { id: 'magnification', icon: '🔍', title: 'Magnification', description: 'Screen zoom and magnification' },
        { id: 'color_correction', icon: '🎨', title: 'Color Correction', description: 'Adjust colors for accessibility' }
      ]
    },
    {
      name: 'Developer & Advanced',
      icon: '⚙️',
      description: 'Developer utilities and advanced features',
      functions: [
        { id: 'device_sensors', icon: '📡', title: 'Device Sensors', description: 'Access accelerometer, gyroscope, etc.' },
        { id: 'system_automation', icon: '🔧', title: 'System Automation', description: 'Advanced scripting and automation' },
        { id: 'developer_tools', icon: '💻', title: 'Developer Tools', description: 'Debugging and profiling tools' },
        { id: 'api_testing', icon: '🔌', title: 'API Testing', description: 'Test REST APIs and webhooks' }
      ]
    }
  ];
}

// Execute a function by ID
function executeFunction(functionId) {
  console.log(`Executing function: ${functionId}`);

  // Find function details
  const allCategories = getFunctionCategories();
  let funcDetails = null;

  for (const category of allCategories) {
    const found = category.functions.find(f => f.id === functionId);
    if (found) {
      funcDetails = found;
      break;
    }
  }

  if (!funcDetails) {
    showToast('Error', 'Function not found', 'error');
    return;
  }

  // Show loading state
  showToast('Executing', `Running ${funcDetails.title}...`, 'info');

  // Simulate function execution
  setTimeout(() => {
    const result = simulateFunction(functionId);
    if (result.success) {
      // Show warning toast if present
      if (result.warning) {
        setTimeout(() => {
          showToast('Warning', result.warning, 'warning');
        }, 500);
      }
      showFunctionResult(functionId, funcDetails.title, result);
    } else {
      showToast('Error', result.message || 'Function execution failed', 'error');
    }
  }, 1000 + Math.random() * 1000);
}

// Simulate function execution with realistic results for ALL functions

// Helper functions for dynamic data generation
const _rng = {
    pick: (arr) => arr[Math.floor(Math.random() * arr.length)],
    int: (min, max) => Math.floor(Math.random() * (max - min + 1)) + min,
    bool: (chance = 0.5) => Math.random() < chance,
    id: (prefix) => `${prefix}-${Math.floor(Math.random() * 10000)}`,
    time: () => new Date().toLocaleTimeString(),
    date: () => new Date().toLocaleDateString()
};

// Simulate function execution with DYNAMIC, realistic results
function simulateFunction(functionId) {
    // Shared data pools
    const users = ['Alice', 'Bob', 'Charlie', 'Sarah', 'Team Lead', 'Mom', 'Unknown'];
    const locations = ['Home', 'Office', 'Cafe', 'Gym', 'Park', 'Transit'];
    const apps = ['Instagram', 'Slack', 'Gmail', 'Spotify', 'YouTube', 'Zoom', 'Notion'];

    let data = {};
    let warning = null;

    switch (functionId) {
        // --- AI & Vision ---
        case 'analyze_image':
            const scenes = [
                { s: 'Living Room', o: ['Sofa', 'TV', 'Cat', 'Plant'], t: 'Welcome Home' },
                { s: 'Office Desk', o: ['Laptop', 'Coffee', 'Notebook', 'Pen'], t: 'Q3 Report' },
                { s: 'Street', o: ['Car', 'Pedestrian', 'Traffic Light'], t: 'Stop Sign' },
                { s: 'Restaurant', o: ['Plate', 'Fork', 'Glass', 'Menu'], t: 'Daily Specials' }
            ];
            const choice = _rng.pick(scenes);
            data = {
                scene: choice.s,
                objects: choice.o.map(o => `${o} (${_rng.int(75, 99)}%)`),
                text: choice.t,
                dominant_colors: [`#${_rng.int(100000, 999999)}`, `#${_rng.int(100000, 999999)}`, `#${_rng.int(100000, 999999)}`]
            };
            break;

        case 'visual_search':
            data = {
                similar_images: _rng.int(5, 50),
                products_found: _rng.int(1, 10),
                best_match: _rng.pick(['Wireless Headphones', 'Smart Watch', 'Vintage Lamp', 'Running Shoes']) + ` - $${_rng.int(20, 200)}.99`,
                sources: ['Amazon', 'eBay', 'Pinterest']
            };
            break;

        case 'enhance_media':
            data = {
                resolution_before: _rng.pick(['720p', '1080p']),
                resolution_after: '4K',
                noise_reduction: _rng.pick(['Medium', 'High']),
                processing_time: `${_rng.int(0, 3)}.${_rng.int(1, 9)}s`
            };
            break;

        case 'screen_understanding':
            data = {
                context: _rng.pick(['Social Feed', 'Checkout Page', 'Article', 'Video Player']),
                buttons_detected: _rng.int(2, 10),
                text_blocks: _rng.int(1, 5),
                actionable_items: _rng.int(3, 8)
            };
            break;

        case 'generate_content':
            data = {
                type: _rng.pick(['Image', 'Text', 'Summary', 'Code']),
                status: 'Completed',
                generated_items: _rng.int(1, 4),
                compute_time: `${_rng.int(1, 5)}s`
            };
            break;

        case 'face_recognition':
            const recognized = _rng.bool(0.8);
            data = {
                identified: recognized ? [_rng.pick(users), _rng.pick(users)] : [],
                unknown: recognized ? 0 : _rng.int(1, 3),
                location: _rng.pick(['Front Camera', 'Security Cam 1', 'Doorbell']),
                confidence: recognized ? `${_rng.int(85, 99)}%` : 'N/A'
            };
            break;

        case 'qr_code_scanner':
            data = {
                content: _rng.pick(['https://menu.com', 'WIFI:S:Guest;P:1234;;', 'BITCOIN:1Abc...']),
                type: _rng.pick(['URL', 'WiFi Config', 'Payment']),
                safety_check: 'Safe',
                scanned_at: _rng.time()
            };
            break;

        // --- Automation & Routines ---
        case 'create_automation':
            data = {
                name: _rng.pick(['Morning Routine', 'Gym Mode', 'Work Focus', 'Night Shift']),
                triggers: [_rng.pick(['Time', 'Location', 'Wifi Connect'])],
                status: 'Created'
            };
            break;
        case 'manage_routine':
            data = { active_routines: _rng.int(1, 10), last_run: _rng.pick(['Morning Routine', 'Leave Home']), next: 'Bedtime' };
            break;
        case 'smart_suggestions':
            data = { suggestion: _rng.pick(['Turn on DND', 'Order Coffee', 'Call Mom', 'Navigate Home']), context: _rng.pick(locations), confidence: 'High' };
            break;
        case 'task_chain':
            data = { chain_id: _rng.id('TC'), current_step: _rng.pick(['Downloading', 'Processing', 'Uploading']), progress: `${_rng.int(20, 80)}%` };
            break;
        case 'learn_preference':
            data = { pattern: _rng.pick(['Lower brightness at night', 'Silence phone in meetings']), action: 'Rule Saved' };
            break;

        // --- Security ---
        case 'biometric_auth':
            const verified = _rng.bool(0.9);
            data = { method: _rng.pick(['Face ID', 'Fingerprint']), status: verified ? 'Verified' : 'Failed', match_score: verified ? '99%' : '40%' };
            if (!verified) warning = 'Authentication Failed - Try Again';
            break;
        case 'secure_vault':
            data = { items: _rng.int(5, 50), locked: true, encryption: 'AES-256' };
            break;
        case 'privacy_control':
            data = { app: _rng.pick(apps), permission_revoked: _rng.pick(['Camera', 'Location', 'Contacts']), reason: 'Unused recently' };
            break;
        case 'secure_communication':
            data = { status: 'Encrypted', protocol: 'Double Ratchet', peer: _rng.pick(users) };
            break;
        case 'find_device':
            data = { location: '37.7749° N, 122.4194° W', accuracy: '10m', battery: `${_rng.int(10, 90)}%` };
            break;
        case 'password_generator':
            data = { password: '****', strength: 'Strong', length: 16, type: 'Alphanumeric+Symbol' };
            break;
        case 'vpn_control':
            data = { status: 'Connected', server: _rng.pick(['USA', 'Swiss', 'Japan', 'Canada']), ip: `192.168.${_rng.int(0, 255)}.${_rng.int(0, 255)}` };
            break;
        case 'app_lock':
            data = { locked_app: _rng.pick(apps), method: 'Biometric', timeout: 'Immediate' };
            break;

        // --- Communication ---
        case 'smart_reply':
            data = { suggestions: [_rng.pick(['Yes, sure!', 'Sounds good']), _rng.pick(['Maybe later', 'I\'ll check']), _rng.pick(['No thanks', 'Can\'t make it'])] };
            break;
        case 'compose_message':
            data = { recipient: _rng.pick(users), draft: 'Hey, generated this with AI...', tone: _rng.pick(['Professional', 'Casual']) };
            break;
        case 'meeting_assistant':
            data = { meeting: 'Project Sync', attendees: _rng.int(2, 10), duration: '30m', status: 'In Progress' };
            break;
        case 'translate_realtime':
            data = { source: _rng.pick(['Spanish', 'French', 'Chinese']), target: 'English', confidence: '98%' };
            break;
        case 'voice_assistant':
            data = { status: 'Listening', mode: 'Conversation', hotword: 'Detected' };
            break;
        case 'email_assistant':
            data = { unread: _rng.int(0, 50), priority: _rng.int(0, 5), action: 'Categorized' };
            break;
        case 'call_screening':
            const noise = _rng.pick(['Spam', 'Legitimate']);
            data = { caller: _rng.pick(['Unknown', '040-1234']), risk: noise, action: noise === 'Spam' ? 'Blocked' : 'Ring' };
            break;
        case 'voice_notes':
            data = { id: _rng.id('VN'), duration: `${_rng.int(1, 10)}:${_rng.int(10, 59)}`, text_preview: 'Meeting notes...' };
            break;

        // --- Context ---
        case 'context_analysis':
            data = { activity: _rng.pick(['Walking', 'Still', 'Driving']), environment: _rng.pick(['Quiet', 'Noisy']), device_state: 'Locked' };
            break;
        case 'predict_next_action':
            data = { prediction: _rng.pick(['Open Spotify', 'Call Home', 'Check Maps']), confidence: `${_rng.int(80, 99)}%` };
            break;
        case 'memory_recall':
            data = { query: 'Last Wifi', result: 'Found matching network', time: 'Yesterday' };
            break;
        case 'location_intelligence':
            data = { near: _rng.pick(['Coffee Shop', 'Library', 'Home']), recommendation: 'Turn on Wifi' };
            break;
        case 'behavior_patterns':
            data = { trend: 'Screen time down', category: _rng.pick(['Productivity', 'Social']), insight: 'Good balance' };
            break;

        // --- Smart Home ---
        case 'control_smart_home':
            data = { devices: _rng.int(1, 10), action: 'Preset Applied', state: 'Optimized' };
            break;
        case 'iot_automation':
            data = { trigger: 'Motion', action: 'Lights On', zone: 'Hallway' };
            break;
        case 'scene_management':
            data = { active_scene: _rng.pick(['Movie Night', 'Reading', 'Party']), devices_affected: _rng.int(2, 8) };
            break;
        case 'energy_monitoring':
            data = { usage: `${_rng.int(200, 800)}W`, cost_today: `$${_rng.int(1, 5)}.50`, saving_mode: 'Active' };
            break;

        // --- Productivity ---
        case 'scan_document':
            data = { pages: _rng.int(1, 5), text_detected: true, format: 'PDF' };
            break;
        case 'clipboard_manager':
            data = { items: _rng.int(5, 20), last_copied: 'Link...', synced: true };
            break;
        case 'focus_mode':
            data = { state: 'On', blocked_notifications: _rng.int(2, 20), time_remaining: '25m' };
            break;
        case 'gesture_control':
            data = { gesture: 'Double Tap', action: 'Screenshot', recognized: true };
            break;
        case 'ar_features':
            data = { mode: 'Measure', surface: 'Detected', distance: '1.2m' };
            break;
        case 'note_taking':
            data = { title: 'New Note', saved: true, cloud_sync: 'Complete' };
            break;
        case 'calendar_sync':
            data = { events_added: _rng.int(1, 5), conflicts: 0, account: 'Google' };
            break;
        case 'task_manager':
            data = { tasks_completed: _rng.int(0, 5), pending: _rng.int(2, 10), lists: 3 };
            break;

        // --- Analytics ---
        case 'usage_analytics':
            data = { screen_time: `${_rng.int(2, 8)}h ${_rng.int(0, 59)}m`, top_app: _rng.pick(apps), pickups: _rng.int(20, 100) };
            break;
        case 'wellness_check':
            data = { eye_strain: 'Low', posture: 'Good', breaks_taken: _rng.int(1, 5) };
            break;
        case 'performance_optimization':
            data = { ram_freed: `${_rng.int(100, 900)}MB`, junk_cleared: `${_rng.int(1, 5)}GB`, speed_boost: 'Applied' };
            break;
        case 'data_usage':
            data = { wifi: `${_rng.int(10, 50)}GB`, mobile: `${_rng.int(1, 5)}GB`, remaining: '15GB' };
            break;
        case 'app_insights':
            data = { app: _rng.pick(apps), battery_drain: `${_rng.int(1, 10)}%`, background_time: '12m' };
            break;

        // --- Connectivity ---
        case 'cross_device_sync':
            data = { devices: _rng.int(2, 4), speed: `${_rng.int(10, 100)}MB/s`, status: 'Syncing' };
            break;
        case 'network_optimization':
            data = { latency: `${_rng.int(10, 50)}ms`, signal: 'Strong', band: '5GHz' };
            break;
        case 'wifi_assistant':
            data = { action: 'Switched to 5G', reason: 'Weak Signal', speed: '450Mbps' };
            break;
        case 'hotspot_control':
            data = { connected_devices: _rng.int(0, 3), data_limit: 'Set', band: '2.4GHz' };
            break;
        case 'bluetooth_manager':
            data = { connected: ['Headphones', 'Watch'], battery: '80%' };
            break;

        // --- Emergency ---
        case 'sos_alert':
            data = { status: 'Sent', location: 'Shared', contacts_notified: 3 };
            warning = 'Emergency Mode Active - Location Tracking On';
            break;
        case 'crash_detection':
            data = { sensors: 'Active', g_force: 'Normal', status: 'Monitoring' };
            break;
        case 'medical_id':
            data = { access: 'Unlocked', blood_type: 'O+', allergies: 'None' };
            break;
        case 'safety_check':
            data = { timer: '30m', check_in: 'Pending', route: 'Tracked' };
            break;

        // --- Accessibility ---
        case 'screen_reader':
            data = { speech_rate: '1.2x', status: 'Reading', element: 'Main Header' };
            break;
        case 'voice_access':
            data = { recognized: true, labels: 'Shown', grid: 'Hidden' };
            break;
        case 'magnification':
            data = { zoom: '200%', region: 'Window', filter: 'None' };
            break;
        case 'color_correction':
            data = { mode: 'Deuteranomaly', intensity: 'Medium', active: true };
            break;

        // --- Developer ---
        case 'device_sensors':
            data = { accel: `x:${_rng.int(0, 1)}.2`, gyro: 'stable', light: `${_rng.int(100, 900)}lux` };
            break;
        case 'system_automation':
            data = { script: 'clean_cache', exit_code: 0, duration: '120ms' };
            break;
        case 'developer_tools':
            data = { debug: 'On', fps: 60, layout_bounds: 'Off' };
            break;
        case 'api_testing':
            data = { endpoint: 'GET /status', code: 200, time: '45ms' };
            break;

        default:
            data = { message: 'Function executed successfully', timestamp: _rng.time() };
    }

    return {
        success: true,
        data: data,
        warning: warning
    };
}
  if (!modalContainer) return;

  let resultHTML = '';

  // Smart Generic Renderer - automatically converts data objects into beautiful UI
  if (result.success && result.data) {
    let contentHTML = '';

    // Handle warning if present
    if (result.warning) {
      contentHTML += `
                <div style="margin-bottom: var(--space-4); padding: var(--space-3); background: rgba(255, 171, 0, 0.1); border: 1px solid rgba(255, 171, 0, 0.3); border-radius: var(--radius-lg); display: flex; gap: var(--space-3); align-items: center;">
                    <span style="font-size: var(--font-size-xl);">⚠️</span>
                    <span style="color: var(--color-warning-400); font-weight: var(--font-weight-medium);">${result.warning}</span>
                </div>
            `;
    }

    contentHTML += `<div class="glass-card" style="display: grid; gap: var(--space-4);">`;

    // Iterate through data keys
    for (const [key, value] of Object.entries(result.data)) {
      // Format key label
      const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()).replace(/_/g, ' ');

      if (Array.isArray(value)) {
        // Render Array (Lists/Tags)
        contentHTML += `
                    <div>
                        <strong style="color: var(--text-secondary); display: block; margin-bottom: var(--space-2); font-size: var(--font-size-sm); text-transform: uppercase; letter-spacing: 0.05em;">${label}</strong>
                        <div style="display: flex; flex-wrap: wrap; gap: var(--space-2);">
                            ${value.map(item => `
                                <span class="badge badge-accent" style="cursor: pointer;" onclick="copySuggestion('${item.toString().replace(/'/g, "\\'")}')">
                                    ${item}
                                </span>
                            `).join('')}
                        </div>
                    </div>
                `;
      } else if (typeof value === 'object' && value !== null) {
        // Render Nested Object
        contentHTML += `
                    <div>
                        <strong style="color: var(--text-secondary); display: block; margin-bottom: var(--space-2); font-size: var(--font-size-sm); text-transform: uppercase; letter-spacing: 0.05em;">${label}</strong>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); gap: var(--space-2);">
                            ${Object.entries(value).map(([subKey, subValue]) => `
                                <div style="background: var(--bg-tertiary); padding: var(--space-2); border-radius: var(--radius-md); text-align: center;">
                                    <div style="font-size: var(--font-size-xs); color: var(--text-secondary); margin-bottom: var(--space-1);">${subKey}</div>
                                    <div style="font-weight: bold; color: var(--text-primary);">${subValue}</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;
      } else {
        // Render Simple Key-Value
        const isStatus = ['status', 'mode', 'state', 'risk_level'].some(k => key.toLowerCase().includes(k));
        const colorClass = isStatus ? 'color: var(--color-success-400);' : 'color: var(--text-primary);';

        contentHTML += `
                    <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--glass-border); padding-bottom: var(--space-2);">
                        <span style="color: var(--text-secondary);">${label}</span>
                        <span style="font-weight: var(--font-weight-medium); ${colorClass} text-align: right;">${value}</span>
                    </div>
                `;
      }
    }

    contentHTML += `</div>`;
    resultHTML = contentHTML;

  } else if (result.isPlaceholder) {
    // Fallback (Should not be reached if all functions covered)
    resultHTML = `
            <div style="text-align: center; padding: var(--space-6) 0;">
                <div style="font-size: var(--font-size-5xl); margin-bottom: var(--space-4);">🚀</div>
                <h3 style="margin-bottom: var(--space-2); color: var(--text-primary);">Coming Soon</h3>
                <p style="color: var(--text-secondary); max-width: 300px; margin: 0 auto;">Feature in development.</p>
            </div>
        `;
  } else {
    resultHTML = `
            <div class="glass-card">
                <h4 style="margin-bottom: var(--space-3); color: var(--text-primary);">❌ Error</h4>
                <p style="color: var(--text-secondary);">Unknown result format</p>
            </div>
        `;
  }

  modalContainer.innerHTML = `
    <div class="modal-overlay active" onclick="closeModal(event)">
      <div class="modal" onclick="event.stopPropagation()">
        <div class="modal-header">
          <h2 class="modal-title">${title}</h2>
          <button class="modal-close" onclick="closeModal()">&times;</button>
        </div>
        <div class="modal-body">
          ${resultHTML}
        </div>
        <div class="modal-footer">
          <button class="btn btn-glass" onclick="closeModal()">Close</button>
          <button class="btn btn-primary" onclick="executeFunction('${functionId}')">Run Again</button>
        </div>
      </div>
    </div>
  `;

  showToast('Success', 'Function completed successfully', 'success');
}

// Copy suggestion to clipboard (simulated)
function copySuggestion(text) {
  // Always show toast notification for consistency
  showToast('Copied', 'Reply copied to clipboard', 'success');
}

// Export for global access
window.getFunctionCategories = getFunctionCategories;
window.executeFunction = executeFunction;
window.copySuggestion = copySuggestion;

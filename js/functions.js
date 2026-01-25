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
        { id: 'qr_code_scanner', icon: '📲', title: 'QR/Barcode Scanner', description: 'Scan and decode QR codes and barcodes' },
        { id: 'neural_link', icon: '🧠', title: 'Neural Link (v6.0)', description: 'Direct cognitive interface simulation', badge: 'Experimental', badgeType: 'error' }
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
        { id: 'biometric_auth', icon: '👆', title: 'Biometric Login', description: 'Fingerprint or Face ID login simulation' },
        { id: 'biometric_lock', icon: '🔒', title: 'System Lock', description: 'Lock the system with biometric protection' },
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
        { id: 'ar_features', icon: '💠', title: 'AR Features', description: 'Augmented reality capabilities' },
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
        { id: 'app_insights', icon: '📱', title: 'App Insights', description: 'Detailed per-app usage statistics' },
        { id: 'optimize_resources', icon: '🚀', title: 'Resource Optimizer', description: 'Boost performance and purge system cache', badge: 'Pro', badgeType: 'success' }
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
        { id: 'bluetooth_manager', icon: '🔹', title: 'Bluetooth Manager', description: 'Manage Bluetooth connections' }
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
      name: 'Hardware Control',
      icon: '🛒',
      description: 'Direct control over device hardware and sensors',
      functions: [
        { id: 'toggle_flashlight', icon: '🔦', title: 'Flashlight', description: 'Toggle camera LED flashlight' },
        { id: 'set_brightness', icon: '☀️', title: 'Brightness', description: 'Adjust screen brightness level' },
        { id: 'set_volume', icon: '🔊', title: 'Volume Control', description: 'Adjust system and media volume' },
        { id: 'toggle_vibration', icon: '📳', title: 'Haptic Feedback', description: 'Enable or disable system vibration' },
        { id: 'rotate_screen', icon: '🔄', title: 'Screen Rotation', description: 'Toggle auto-rotate or orientation' },
        { id: 'nfc_toggle', icon: '📄', title: 'NFC Toggle', description: 'Quickly enable or disable NFC radio' },
        { id: 'location_toggle', icon: '📍', title: 'GPS / Location', description: 'Manage location services and accuracy' },
        { id: 'speaker_clean', icon: '🔈', title: 'Speaker Cleaner', description: 'Eject debris using high-frequency sound' }
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

      // Track execution
      if (window.performanceMonitor) window.performanceMonitor.trackFunction(functionId);

      showFunctionResult(functionId, funcDetails.title, result);
    } else {
      showToast('Error', result.message || 'Function execution failed', 'error');
    }
  }, 1000 + Math.random() * 1000);

  return true;
}

// Simulate function execution with realistic results
function simulateFunction(functionId) {
  const isMobile = window.appState?.context?.device?.isMobile || false;
  const platform = isMobile ? 'Mobile' : 'Desktop';
  const os = window.appState?.context?.device?.os || 'System';

  const simulations = {
    analyze_image: {
      success: true,
      data: {
        objects: isMobile ? ['Person (95%)', 'Phone (89%)', 'Traffic Light (76%)'] : ['Person (95%)', 'Cat (89%)', 'Sofa (76%)'],
        text: 'Welcome Home',
        scene: isMobile ? 'Outdoor Street' : 'Living Room',
        dominant_colors: ['#2A3F5F', '#C9ADA7', '#F2E9E4']
      }
    },
    weather_check: {
      success: true,
      data: {
        temp: document.getElementById('wTemp')?.textContent || '72°F',
        condition: document.getElementById('wDesc')?.textContent?.split('•')[0].trim() || 'Clear',
        location: appState.context.location?.city || 'Remote Node',
        humidity: document.getElementById('wHumidity')?.textContent || '45%',
        air_quality: document.getElementById('wAQI')?.textContent || 'Good'
      }
    },
    visual_search: {
      success: true,
      data: {
        matches: [
          { name: 'Modern Desk Lamp', price: '$45.00', store: 'Urban Shop' },
          { name: 'Minimalist LED Light', price: '$38.99', store: 'TechGear' },
          { name: 'Curved Office Lamp', price: '$52.00', store: 'DesignHub' }
        ],
        location: 'Living Room Studio'
      }
    },
    enhance_media: {
      success: true,
      data: {
        source: isMobile ? 'Device Gallery' : 'Local File System',
        filters_applied: ['AI Clarity', 'Denoise+', 'HDR Ultra'],
        improvement: '400% resolution boost',
        processing_unit: isMobile ? 'NPU (Neural Processing Unit)' : 'GPU Cloud Accelerator'
      }
    },
    compose_message: {
      success: true,
      data: {
        recipient: 'John Doe',
        draft: 'Hey John, I wanted to follow up on our meeting earlier today. The project looks like it\'s on track. Let\'s touch base on Friday.',
        subject: 'Project Update'
      }
    },
    translate_realtime: {
      success: true,
      data: {
        source: 'English',
        target: 'Spanish',
        original: 'How can I help you today?',
        translated: '¿Cómo puedo ayudarte hoy?'
      }
    },
    find_device: {
      success: true,
      data: {
        device: isMobile ? `Aryan's ${os} Phone` : `Aryan's ${os} Station`,
        location: '123 Tech Avenue, Silicon Valley',
        battery: '68%',
        status: 'Online'
      }
    },
    performance_optimization: {
      success: true,
      data: {
        current_health: '98%',
        improvement: '+12%',
        actions: ['Background processes hibernated', 'RAM compression active']
      }
    },
    data_usage: {
      success: true,
      data: {
        used: '12.4 GB',
        limit: '50 GB',
        percentage: 24,
        top_app: 'YouTube (8.2 GB)'
      }
    },
    wellness_check: {
      success: true,
      data: {
        sleep: '7h 12m',
        steps: 8420,
        mindfulness: '15m',
        stress: 'Low'
      }
    },
    network_optimization: {
      success: true,
      data: {
        download: '482 Mbps',
        upload: '125 Mbps',
        ping: '12ms',
        optimization: 'Signal routing refreshed'
      }
    },
    scan_document: {
      success: true,
      data: {
        mode: isMobile ? 'Live Camera Capture' : 'Flatbed Import Emulator',
        pages: 3,
        ocr_confidence: '98.5%',
        format: 'PDF (Searchable)'
      }
    },
    clipboard_manager: {
      success: true,
      data: {
        last_copied: 'https://github.com/viphacker100/vip-adv-assistant',
        sync_status: isMobile ? 'Synced with Cloud' : 'Native Clipboard Active',
        items_in_history: 24
      }
    },
    smart_reply: {
      success: true,
      data: {
        suggestions: [
          'Sounds great! See you then 😊',
          'Thanks for letting me know',
          'I\'ll check and get back to you'
        ]
      }
    },
    control_smart_home: {
      success: true,
      data: {
        devices: [
          { name: 'Living Room Lights', status: '60%' },
          { name: 'Kitchen AC', status: '72°F' },
          { name: 'Front door Lock', status: 'LOCKED' }
        ],
        scene: 'Cozy Evening'
      }
    },
    face_recognition: {
      success: true,
      data: {
        person: 'Aryan (Primary User)',
        confidence: '99.8%',
        auth_level: 'Administrator'
      }
    },
    qr_code_scanner: {
      success: true,
      data: {
        type: 'URL',
        content: 'https://viphacker100.github.io/assistant',
        action: 'Open Link'
      }
    },
    sos_alert: {
      success: true,
      data: {
        status: 'EMERGENCY BROADCAST ACTIVE',
        contacts_notified: ['Mom', 'Emergency Services', 'Security'],
        coordinates: '37.7749° N, 122.4194° W'
      }
    },
    usage_analytics: {
      success: true,
      data: {
        screen_time: '4h 23m',
        top_apps: ['Chrome (1h 45m)', 'Messages (52m)', 'YouTube (38m)'],
        pickups: 67,
        trend: '↓ 15% vs yesterday'
      }
    },
    focus_mode: {
      success: true,
      data: {
        mode: 'Work Focus',
        duration: '2 hours',
        apps_allowed: 3,
        notifications: 'Priority only'
      }
    },
    secure_vault: {
      success: true,
      data: {
        items: 12,
        storage_used: '45%',
        last_access: 'Today at 14:32'
      },
      warning: 'Low battery (15%) - Consider charging device before accessing encrypted vault'
    },
    biometric_lock: {
      success: true,
      data: { status: 'LOCKED', protocol: 'Advanced Biometric Shield' }
    },
    toggle_flashlight: {
      success: true,
      data: {
        status: 'ON',
        brightness: '100%',
        thermal_safe: true,
        platform_note: isMobile ? 'LED Hardware Active' : 'Simulating via screen brightness'
      }
    },
    set_brightness: {
      success: true,
      data: { current: '85%', mode: 'Adaptive', blue_light_filter: 'Active' }
    },
    set_volume: {
      success: true,
      data: { media: '70%', ringtone: '50%', system: '30%', dolby_atmos: 'Enabled' }
    },
    toggle_vibration: {
      success: true,
      data: {
        state: 'Enabled',
        intensity: 'Medium',
        force_touch: 'Active',
        api_status: useVibrationAPI() ? 'Hardware Haptics Dispatched' : 'Visual Pulse Simulating'
      }
    },
    rotate_screen: {
      success: true,
      data: { orientation: 'Landscape (Sensor)', lock: 'Unlocked' }
    },
    privacy_control: {
      success: true,
      data: {
        active_trackers_blocked: 14,
        cam_mic_status: 'Shielded (Hardware Intercept simulation)',
        permissions_audit: '3 App updates pending review',
        leak_status: 'No data breaches detected'
      }
    },
    vpn_control: {
      success: true,
      data: {
        server: 'Zurich, Switzerland (VIP-Secure-Node)',
        ip: '103.45.XX.XX (Masked)',
        latency: '42ms',
        status: 'Connected (AES-256)'
      }
    },
    iot_automation: {
      success: true,
      data: {
        mesh_status: 'Healthy (12 nodes)',
        energy_saved_today: '0.8 kWh',
        active_routines: ['Evening Mood', 'Night Sentry'],
        bridge_latency: '8ms'
      }
    },
    task_manager: {
      success: true,
      data: {
        completed: 12,
        pending: 5,
        priority: 'Prepare v4.5 Release',
        deadline: 'Tomorrow, 09:00 AM'
      }
    },
    medical_id: {
      success: true,
      data: {
        blood_type: 'O+',
        allergies: 'Penicillin, Peanuts',
        medications: 'None',
        emergency_contact: 'Mom (+1-555-0123)',
        organ_donor: 'Yes',
        platform_restriction: isMobile ? 'Secure Lockscreen Access Enabled' : 'Not available on Desktop lockscreen'
      }
    },
    context_analysis: {
      success: true,
      data: {
        environment: 'Professional Office',
        noise_level: '32 dB (Quiet)',
        user_intent: 'Focused Work',
        confidence: '94%'
      }
    },
    predict_next_action: {
      success: true,
      data: {
        prediction: 'Open Calendar / Slack',
        reasoning: 'Morning routine pattern detected',
        accuracy: '89.2%',
        ready: true
      }
    },
    behavior_patterns: {
      success: true,
      data: {
        top_behavior: 'Late night productivity',
        habit_strength: 'High',
        recommendation: 'Enable Blue Light Filter at 10 PM'
      }
    },
    screen_reader: {
      success: true,
      data: {
        status: 'Active',
        voice: 'VIP-Neural-Male',
        rate: '1.2x',
        focus_element: 'Main Hero Title'
      }
    },
    speaker_clean: {
      success: true,
      data: {
        frequency: '165Hz - 220Hz',
        duration: '15 seconds',
        status: isMobile ? 'Water Ejection Pattern Complete' : 'Audio Profile Optimized (Desktop Mode)',
        hardware_dispatch: isMobile ? 'Haptic Motor Pulse Active' : 'Software EQ applied'
      }
    },
    system_automation: {
      success: true,
      data: {
        script_status: 'Deployed',
        active_triggers: 3,
        optimization: 'Kernel power scaling adjusted'
      }
    },
    cross_device_sync: {
      success: true,
      data: {
        devices_active: isMobile ? 2 : 4,
        last_sync: 'Just now',
        status: isMobile ? 'Syncing Photos & Notes' : 'Hub: Desktop Main Station Active',
        handoff_available: 'Browser Tabs, Clipboard, Recent Files'
      }
    },
    developer_tools: {
      success: true,
      data: {
        adb_status: isMobile ? 'Wireless ADB Enabled' : 'N/A (Desktop)',
        debug_port: 5555,
        console_logs: 42,
        framework: 'VIP-CORE v4.4-BETA'
      }
    },
    crash_detection: {
      success: true,
      data: {
        status: 'Monitoring Sensors',
        last_event: 'No incidents detected',
        g_force_baseline: '1.02G',
        mode: isMobile ? 'High-G Detection Active' : 'System Stability Monitor'
      }
    },
    location_toggle: {
      success: true,
      data: { status: 'Enabled', accuracy: 'High (GPS+WiFi)', satellites: 12 }
    },
    optimize_resources: {
      success: true,
      data: { memory_freed: '1.2 GB', processes_optimized: 24, cache_purged: '450 MB' }
    },
    neural_link: {
      success: true,
      data: { status: 'SYNCING', integrity: '99.8%', phase: 'GHOST_MODE' }
    }
  };

  if (functionId === 'optimize_resources') {
    showOptimizationWizard();
  } else if (functionId === 'neural_link') {
    showNeuralLinkWizard();
  }

  return simulations[functionId] || {
    success: true,
    data: {
      message: 'Function executed successfully',
      timestamp: new Date().toLocaleTimeString()
    }
  };
}

// Show function execution result in a modal
function showFunctionResult(functionId, title, result) {
  const modalContainer = document.getElementById('modalContainer');
  if (!modalContainer) return;

  const categories = getFunctionCategories();
  let category = null;
  for (const cat of categories) {
    if (cat.functions.some(f => f.id === functionId)) {
      category = cat;
      break;
    }
  }

  let resultHTML = '';

  // Format result based on function type
  if (functionId === 'analyze_image') {
    resultHTML = `
      <div class="glass-card" style="margin-bottom: var(--space-4);">
        <h4 style="margin-bottom: var(--space-3); color: var(--text-primary);">📊 Analysis Results</h4>
        <div style="margin-bottom: var(--space-3);">
          <strong style="color: var(--text-secondary);">Detected Objects:</strong>
          <div style="margin-top: var(--space-2); display: flex; gap: var(--space-2); flex-wrap: wrap;">
            ${result.data.objects.map(obj => `<span class="badge badge-accent">${obj}</span>`).join('')}
          </div>
        </div>
        <div style="margin-bottom: var(--space-3);">
          <strong style="color: var(--text-secondary);">Extracted Text:</strong> ${result.data.text}
        </div>
        <div>
          <strong style="color: var(--text-secondary);">Scene:</strong> ${result.data.scene}
        </div>
      </div>
    `;
  } else if (functionId === 'enhance_media') {
    resultHTML = `
      <div class="glass-card">
        <h4 style="margin-bottom: var(--space-4); color: var(--text-primary);">✨ Media Enhanced</h4>
        <div style="display: grid; gap: var(--space-4);">
          <div style="background: var(--bg-tertiary); padding: var(--space-3); border-radius: var(--radius-lg);">
            <div style="font-size: 10px; color: var(--text-tertiary); text-transform: uppercase;">Source</div>
            <div style="color: var(--text-primary);">${result.data.source}</div>
          </div>
          <div style="background: var(--bg-tertiary); padding: var(--space-3); border-radius: var(--radius-lg);">
            <div style="font-size: 10px; color: var(--text-tertiary); text-transform: uppercase;">Processing Unit</div>
            <div style="color: var(--color-success-400); font-weight: bold;">${result.data.processing_unit}</div>
          </div>
          <div style="display: flex; gap: var(--space-2); flex-wrap: wrap;">
            ${result.data.filters_applied.map(f => `<span class="badge badge-accent">${f}</span>`).join('')}
          </div>
          <div class="badge badge-success" style="justify-content: center;">${result.data.improvement}</div>
        </div>
      </div>
    `;
  } else if (functionId === 'smart_reply') {
    resultHTML = `
      <div class="glass-card" style="margin-bottom: var(--space-4);">
        <h4 style="margin-bottom: var(--space-3); color: var(--text-primary);">💬 Suggested Replies</h4>
        ${result.data.suggestions.map((suggestion, i) => `
          <div class="function-card" style="margin-bottom: var(--space-2); cursor: pointer;" onclick="copySuggestion('${suggestion}')">
            <div style="font-weight: var(--font-weight-medium);">${suggestion}</div>
            <div style="font-size: var(--font-size-xs); color: var(--text-tertiary); margin-top: var(--space-1);">Click to copy</div>
          </div>
        `).join('')}
      </div>
    `;
  } else if (functionId === 'usage_analytics') {
    resultHTML = `
      <div class="glass-card">
        <h4 style="margin-bottom: var(--space-4); color: var(--text-primary);">📱 Today's Usage</h4>
        <div style="margin-bottom: var(--space-4);">
          <div style="font-size: var(--font-size-3xl); font-weight: var(--font-weight-bold); color: var(--color-accent-400);">
            ${result.data.screen_time}
          </div>
          <div style="color: var(--text-secondary);">Total Screen Time ${result.data.trend}</div>
        </div>
        <div style="margin-bottom: var(--space-3);">
          <strong style="color: var(--text-secondary);">Top Apps:</strong>
          ${result.data.top_apps.map(app => `
            <div style="padding: var(--space-2) 0; border-bottom: 1px solid var(--border-secondary);">
              ${app}
            </div>
          `).join('')}
        </div>
        <div style="margin-top: var(--space-4); padding-top: var(--space-4); border-top: 1px solid var(--border-primary);">
          <strong style="color: var(--text-secondary);">Device Pickups:</strong> ${result.data.pickups}
        </div>
      </div>
    `;
  } else if (functionId === 'visual_search') {
    resultHTML = `
      <div class="glass-card">
        <h4 style="margin-bottom: var(--space-4); color: var(--text-primary);">🔍 Visual Search Matches</h4>
        <div style="display: flex; flex-direction: column; gap: var(--space-3);">
          ${result.data.matches.map(m => `
            <div style="background: var(--bg-tertiary); padding: var(--space-3); border-radius: var(--radius-lg); display: flex; justify-content: space-between; align-items: center;">
              <div>
                <div style="font-weight: bold; color: var(--text-primary);">${m.name}</div>
                <div style="font-size: 11px; color: var(--text-tertiary);">${m.store}</div>
              </div>
              <div style="color: var(--color-accent-400); font-weight: bold;">${m.price}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  } else if (functionId === 'compose_message') {
    resultHTML = `
      <div class="glass-card">
        <h4 style="margin-bottom: var(--space-4); color: var(--text-primary);">✍️ AI Message Draft</h4>
        <div style="background: var(--bg-tertiary); padding: var(--space-4); border-radius: var(--radius-lg); font-style: italic; color: var(--text-secondary); margin-bottom: var(--space-4); line-height: 1.5;">
          "${result.data.draft}"
        </div>
        <div style="font-size: var(--font-size-xs); color: var(--text-tertiary);">
          <strong>To:</strong> ${result.data.recipient}<br>
          <strong>Subject:</strong> ${result.data.subject}
        </div>
        <button class="btn btn-primary" style="width: 100%; margin-top: var(--space-4);" onclick="showToast('Sent', 'Message sent successfully', 'success'); closeModal();">Send Now</button>
      </div>
    `;
  } else if (functionId === 'translate_realtime') {
    resultHTML = `
      <div class="glass-card">
        <h4 style="margin-bottom: var(--space-4); color: var(--text-primary);">🌐 Real-time Translation</h4>
        <div style="display: grid; gap: var(--space-4);">
          <div style="background: var(--bg-tertiary); padding: var(--space-3); border-radius: var(--radius-lg);">
            <div style="font-size: 10px; color: var(--text-tertiary); text-transform: uppercase;">${result.data.source}</div>
            <div style="color: var(--text-primary);">${result.data.original}</div>
          </div>
          <div style="background: rgba(34, 211, 238, 0.1); padding: var(--space-3); border-radius: var(--radius-lg); border-left: 4px solid var(--color-accent-500);">
            <div style="font-size: 10px; color: var(--color-accent-400); text-transform: uppercase;">${result.data.target}</div>
            <div style="color: var(--text-primary); font-weight: 500;">${result.data.translated}</div>
          </div>
        </div>
      </div>
    `;
  } else if (functionId === 'find_device') {
    resultHTML = `
      <div class="glass-card">
        <h4 style="margin-bottom: var(--space-4); color: var(--text-primary);">📍 Device Locator</h4>
        <div style="height: 120px; background: var(--bg-tertiary); border-radius: var(--radius-lg); margin-bottom: var(--space-4); display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden;">
          <div style="position: absolute; width: 200px; height: 200px; border: 2px solid rgba(34, 211, 238, 0.2); border-radius: 50%; animation: pulse 2s infinite;"></div>
          <div style="font-size: 32px; z-index: 1;">💯</div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-2);">
          <div style="font-size: 11px; color: var(--text-tertiary);">Device: <span style="color: var(--text-primary);">${result.data.device}</span></div>
          <div style="font-size: 11px; color: var(--text-tertiary);">Battery: <span style="color: var(--text-primary);">${result.data.battery}</span></div>
          <div style="font-size: 11px; color: var(--text-tertiary); grid-column: span 2;">Location: <span style="color: var(--text-primary);">${result.data.location}</span></div>
        </div>
      </div>
    `;
  } else if (functionId === 'wellness_check') {
    resultHTML = `
      <div class="glass-card">
        <h4 style="margin-bottom: var(--space-4); color: var(--text-primary);">💚 Health & Wellness</h4>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-3);">
          <div style="background: var(--bg-tertiary); padding: var(--space-3); border-radius: var(--radius-lg); text-align: center;">
            <div style="font-size: 10px; color: var(--text-tertiary);">STEPS</div>
            <div style="font-size: 20px; font-weight: bold; color: var(--color-success-400);">${result.data.steps}</div>
          </div>
          <div style="background: var(--bg-tertiary); padding: var(--space-3); border-radius: var(--radius-lg); text-align: center;">
            <div style="font-size: 10px; color: var(--text-tertiary);">SLEEP</div>
            <div style="font-size: 20px; font-weight: bold; color: var(--color-primary-400);">${result.data.sleep}</div>
          </div>
          <div style="background: var(--bg-tertiary); padding: var(--space-3); border-radius: var(--radius-lg); text-align: center;">
            <div style="font-size: 10px; color: var(--text-tertiary);">MINDFUL</div>
            <div style="font-size: 20px; font-weight: bold; color: var(--color-accent-400);">${result.data.mindfulness}</div>
          </div>
          <div style="background: var(--bg-tertiary); padding: var(--space-3); border-radius: var(--radius-lg); text-align: center;">
            <div style="font-size: 10px; color: var(--text-tertiary);">STRESS</div>
            <div style="font-size: 20px; font-weight: bold; color: var(--color-error-400);">${result.data.stress}</div>
          </div>
        </div>
      </div>
    `;
  } else if (functionId === 'network_optimization') {
    resultHTML = `
      <div class="glass-card">
        <h4 style="margin-bottom: var(--space-4); color: var(--text-primary);">📶 Network Performance</h4>
        <div style="margin-bottom: var(--space-4); text-align: center;">
          <div style="font-size: 32px; font-weight: bold; color: var(--color-success-400);">${result.data.download}</div>
          <div style="font-size: 12px; color: var(--text-secondary);">Current Download Speed</div>
        </div>
        <div style="display: flex; justify-content: space-around; background: var(--bg-tertiary); padding: var(--space-3); border-radius: var(--radius-lg);">
          <div style="text-align: center;"><div style="font-size: 10px; color: var(--text-tertiary);">UPLOAD</div><div style="font-weight: bold;">${result.data.upload}</div></div>
          <div style="text-align: center;"><div style="font-size: 10px; color: var(--text-tertiary);">PING</div><div style="font-weight: bold;">${result.data.ping}</div></div>
        </div>
        <div style="margin-top: var(--space-3); font-size: 11px; text-align: center; color: var(--color-accent-400); font-style: italic;">
          ✨ ${result.data.optimization}
        </div>
      </div>
    `;
  } else if (functionId === 'optimize_resources') {
    resultHTML = `
      <div class="glass-card">
        <h4 style="margin-bottom: var(--space-4); color: var(--text-primary);">🚀 Optimization Report</h4>
        <div style="display: grid; grid-template-columns: 1fr; gap: var(--space-4);">
            <div style="background: var(--bg-tertiary); padding: var(--space-4); border-radius: var(--radius-lg); display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <div style="font-size: 11px; color: var(--text-tertiary); text-transform: uppercase;">Memory Purged</div>
                    <div style="font-size: 20px; font-weight: bold; color: var(--color-success-400);">${result.data.memory_freed}</div>
                </div>
                <div style="height: 40px; width: 40px; display: flex; align-items: center; justify-content: center; background: rgba(34, 197, 94, 0.1); border-radius: 50%; color: var(--color-success-400);">💾</div>
            </div>
            <div style="background: var(--bg-tertiary); padding: var(--space-4); border-radius: var(--radius-lg); display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <div style="font-size: 11px; color: var(--text-tertiary); text-transform: uppercase;">Speed Boost</div>
                    <div style="font-size: 20px; font-weight: bold; color: var(--color-accent-400);">${result.data.speed_boost}</div>
                </div>
                <div style="height: 40px; width: 40px; display: flex; align-items: center; justify-content: center; background: rgba(34, 211, 238, 0.1); border-radius: 50%; color: var(--color-accent-400);">⚡</div>
            </div>
        </div>
      </div>
    `;
  } else if (functionId === 'control_smart_home') {
    resultHTML = `
      <div class="glass-card">
        <h4 style="margin-bottom: var(--space-4); color: var(--text-primary);">🏠 Smart Home Control</h4>
        <div style="display: flex; flex-direction: column; gap: var(--space-3);">
          ${result.data.devices.map(d => `
            <div style="background: var(--bg-tertiary); padding: var(--space-3); border-radius: var(--radius-lg); display: flex; justify-content: space-between; align-items: center;">
              <div style="color: var(--text-primary); font-weight: 500;">${d.name}</div>
              <div class="badge badge-accent">${d.status}</div>
            </div>
          `).join('')}
        </div>
        <div style="margin-top: var(--space-4); padding: var(--space-3); background: rgba(34, 211, 238, 0.1); border-radius: var(--radius-md); text-align: center; font-size: 12px; color: var(--color-accent-400);">
          Scene Activated: <strong>${result.data.scene}</strong>
        </div>
      </div>
    `;
  } else if (functionId === 'data_usage') {
    resultHTML = `
      <div class="glass-card">
        <h4 style="margin-bottom: var(--space-4); color: var(--text-primary);">📊 Data Usage Analysis</h4>
        <div style="text-align: center; margin-bottom: var(--space-6);">
          <div style="font-size: 32px; font-weight: bold; color: var(--color-accent-400);">${result.data.used}</div>
          <div style="font-size: 12px; color: var(--text-tertiary);">Used of ${result.data.limit} monthly limit</div>
        </div>
        <div class="progress" style="height: 10px; margin-bottom: var(--space-4);">
          <div class="progress-bar" style="width: ${result.data.percentage}%;"></div>
        </div>
        <div style="background: var(--bg-tertiary); padding: var(--space-3); border-radius: var(--radius-lg); display: flex; justify-content: space-between;">
          <span style="font-size: 12px; color: var(--text-secondary);">Top Consumer:</span>
          <span style="font-size: 12px; font-weight: bold; color: var(--text-primary);">${result.data.top_app}</span>
        </div>
      </div>
    `;
  } else if (functionId === 'performance_optimization') {
    resultHTML = `
      <div class="glass-card">
        <h4 style="margin-bottom: var(--space-4); color: var(--text-primary);">⚙️ Performance Status</h4>
        <div style="display: flex; gap: var(--space-4); margin-bottom: var(--space-4);">
          <div style="flex: 1; text-align: center; background: var(--bg-tertiary); padding: var(--space-4); border-radius: var(--radius-lg); border-bottom: 3px solid var(--color-success-500);">
            <div style="font-size: 10px; opacity: 0.6;">HEALTH</div>
            <div style="font-size: 24px; font-weight: bold;">${result.data.current_health}</div>
          </div>
          <div style="flex: 1; text-align: center; background: var(--bg-tertiary); padding: var(--space-4); border-radius: var(--radius-lg); border-bottom: 3px solid var(--color-accent-500);">
            <div style="font-size: 10px; opacity: 0.6;">GAINS</div>
            <div style="font-size: 24px; font-weight: bold; color: var(--color-accent-400);">${result.data.improvement}</div>
          </div>
        </div>
        <div style="font-size: 11px; color: var(--text-tertiary); margin-bottom: var(--space-2);">Optimizations Performed:</div>
        <ul style="padding-left: 18px; color: var(--text-secondary); font-size: 12px;">
          ${result.data.actions.map(a => `<li>${a}</li>`).join('')}
        </ul>
      </div>
    `;
  } else if (functionId === 'set_volume' || functionId === 'set_brightness') {
    const isVol = functionId === 'set_volume';
    const level = isVol ? parseInt(result.data.media) : parseInt(result.data.current);
    const infoText = isVol ? 'Dolby Atmos Integration Active' : 'Adaptive Brightness Engaged';
    resultHTML = `
      <div class="glass-card" style="text-align: center;">
        <h4 style="margin-bottom: var(--space-6); color: var(--text-primary);">${isVol ? '🔊 Volume Level' : '☀️ Brightness Level'}</h4>
        <div style="font-size: 40px; font-weight: bold; color: var(--color-accent-400); margin-bottom: var(--space-4);">${level}%</div>
        <div class="progress" style="height: 12px; max-width: 200px; margin: 0 auto;">
          <div class="progress-bar" style="width: ${level}%;"></div>
        </div>
        <div style="margin-top: var(--space-6); font-size: 11px; color: var(--text-tertiary);">
          ${infoText}
        </div>
      </div>
    `;
  } else if (functionId === 'face_recognition') {
    resultHTML = `
      <div class="glass-card" style="text-align: center;">
        <h4 style="margin-bottom: var(--space-4); color: var(--text-primary);">👤 Identity Verification</h4>
        <div style="width: 80px; height: 80px; background: var(--bg-tertiary); border-radius: 50%; margin: 0 auto var(--space-4); display: flex; align-items: center; justify-content: center; border: 2px solid var(--color-success-500); box-shadow: 0 0 20px rgba(34, 197, 94, 0.3);">
          <span style="font-size: 40px;">✅</span>
        </div>
        <div style="font-size: 18px; font-weight: bold; color: var(--text-primary);">${result.data.person}</div>
        <div style="font-size: 12px; color: var(--color-success-400); margin-bottom: var(--space-4);">Confidence: ${result.data.confidence}</div>
        <div class="badge badge-primary">Level: ${result.data.auth_level}</div>
      </div>
    `;
  } else if (functionId === 'medical_id') {
    resultHTML = `
      <div class="glass-card" style="border-left: 4px solid var(--color-error-500);">
        <h4 style="margin-bottom: var(--space-4); color: var(--color-error-400);">🏥 MEDICAL ID</h4>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-3);">
          <div style="background: var(--bg-tertiary); padding: var(--space-3); border-radius: var(--radius-lg);">
            <div style="font-size: 10px; color: var(--text-tertiary);">BLOOD TYPE</div>
            <div style="font-weight: bold; color: var(--text-primary); text-transform: uppercase;">${result.data.blood_type}</div>
          </div>
          <div style="background: var(--bg-tertiary); padding: var(--space-3); border-radius: var(--radius-lg);">
            <div style="font-size: 10px; color: var(--text-tertiary);">ORGAN DONOR</div>
            <div style="font-weight: bold; color: var(--color-success-400); text-transform: uppercase;">${result.data.organ_donor}</div>
          </div>
        </div>
        <div style="margin-top: var(--space-4);">
          <div style="font-size: 10px; color: var(--text-tertiary);">ALLERGIES</div>
          <div style="color: var(--color-error-400); font-weight: 500;">${result.data.allergies}</div>
        </div>
        <div style="margin-top: var(--space-3);">
          <div style="font-size: 10px; color: var(--text-tertiary);">MEDICATIONS</div>
          <div style="color: var(--text-secondary);">${result.data.medications}</div>
        </div>
        <div style="margin-top: var(--space-4); padding-top: var(--space-4); border-top: 1px solid var(--border-primary);">
          <div style="font-size: 10px; color: var(--text-tertiary);">EMERGENCY CONTACT</div>
          <div style="font-weight: bold; color: var(--text-primary);">${result.data.emergency_contact}</div>
        </div>
      </div>
    `;
  } else if (functionId === 'speaker_clean') {
    resultHTML = `
      <div class="glass-card" style="text-align: center;">
        <h4 style="margin-bottom: var(--space-4); color: var(--text-primary);">🔈 Speaker Sonic Clean</h4>
        <div class="spinner" style="margin: 0 auto var(--space-4); border-top-color: var(--color-accent-400);"></div>
        <div style="font-size: 18px; font-weight: bold; color: var(--color-accent-400);">${result.data.status}</div>
        <div style="margin-top: var(--space-2); color: var(--text-secondary); font-size: 14px;">Freq: ${result.data.frequency}</div>
        <div style="margin-top: var(--space-4); padding: var(--space-3); background: rgba(34, 211, 238, 0.1); border-radius: var(--radius-lg); font-size: 11px; color: var(--color-accent-400);">
          ${result.data.hardware_dispatch}
        </div>
      </div>
    `;
  } else if (functionId === 'context_analysis') {
    resultHTML = `
      <div class="glass-card">
        <h4 style="margin-bottom: var(--space-4); color: var(--text-primary);">📊 Context Intelligence</h4>
        <div style="background: var(--bg-tertiary); padding: var(--space-4); border-radius: var(--radius-lg); margin-bottom: var(--space-4);">
          <div style="font-size: 10px; color: var(--text-tertiary); text-transform: uppercase;">Current Environment</div>
          <div style="font-size: 20px; font-weight: bold; color: var(--color-accent-400);">${result.data.environment}</div>
        </div>
        <div style="display: grid; gap: var(--space-2); font-size: 12px; color: var(--text-secondary);">
          <div style="display: flex; justify-content: space-between;"><span>Noise Level:</span> <span style="color: var(--text-primary); font-weight: bold;">${result.data.noise_level}</span></div>
          <div style="display: flex; justify-content: space-between;"><span>Detected Intent:</span> <span style="color: var(--text-primary); font-weight: bold;">${result.data.user_intent}</span></div>
          <div style="display: flex; justify-content: space-between;"><span>AI Confidence:</span> <span style="color: var(--color-success-400); font-weight: bold;">${result.data.confidence}</span></div>
        </div>
      </div>
    `;
  } else if (functionId === 'predict_next_action') {
    resultHTML = `
      <div class="glass-card" style="border-top: 4px solid var(--color-accent-500);">
        <h4 style="margin-bottom: var(--space-4); color: var(--text-primary);">🔮 Action Prediction</h4>
        <div style="background: rgba(34, 211, 238, 0.1); padding: var(--space-4); border-radius: var(--radius-lg); margin-bottom: var(--space-4);">
          <div style="font-size: 10px; color: var(--color-accent-400); text-transform: uppercase;">AI Suggestion</div>
          <div style="font-size: 18px; font-weight: bold; color: var(--text-primary);">${result.data.prediction}</div>
        </div>
        <div style="font-size: 12px; color: var(--text-secondary); line-height: 1.5;">${result.data.reasoning}</div>
        <button class="btn btn-primary btn-sm" style="width: 100%; margin-top: var(--space-4);">Execute Prediction</button>
      </div>
    `;
  } else if (functionId === 'behavior_patterns') {
    resultHTML = `
      <div class="glass-card">
        <h4 style="margin-bottom: var(--space-4); color: var(--text-primary);">📈 Usage Insights</h4>
        <div style="background: var(--bg-tertiary); padding: var(--space-3); border-radius: var(--radius-lg); margin-bottom: var(--space-3);">
          <div style="font-size: 10px; color: var(--text-tertiary);">TOP BEHAVIOR</div>
          <div style="font-weight: bold; color: var(--text-primary);">${result.data.top_behavior}</div>
        </div>
        <div style="padding: var(--space-3); background: rgba(34, 211, 238, 0.1); border-radius: var(--radius-lg); border-left: 3px solid var(--color-accent-500);">
          <div style="font-size: 10px; color: var(--color-accent-400);">VIP RECOMMENDATION</div>
          <div style="font-size: 13px; font-weight: 500; margin-top: 4px;">${result.data.recommendation}</div>
        </div>
      </div>
    `;
  } else if (functionId === 'privacy_control') {
    resultHTML = `
      <div class="glass-card">
        <h4 style="margin-bottom: var(--space-4); color: var(--text-primary);">🛡️ Privacy Protection</h4>
        <div style="display: grid; gap: var(--space-4);">
          <div style="background: var(--bg-tertiary); padding: var(--space-3); border-radius: var(--radius-lg); border-left: 4px solid var(--color-success-500);">
            <div style="font-size: 10px; color: var(--color-success-400); text-transform: uppercase;">Trackers Blocked</div>
            <div style="font-size: 24px; font-weight: bold;">${result.data.active_trackers_blocked}</div>
          </div>
          <div style="background: var(--bg-tertiary); padding: var(--space-3); border-radius: var(--radius-lg);">
            <div style="font-size: 10px; color: var(--text-tertiary); text-transform: uppercase;">Camera/Mic Shield</div>
            <div style="color: var(--text-primary); font-weight: 500;">${result.data.cam_mic_status}</div>
          </div>
          <div style="font-size: 12px; color: var(--text-secondary);">Audit: <span style="color: var(--color-warning-400);">${result.data.permissions_audit}</span></div>
        </div>
      </div>
    `;
  } else if (functionId === 'vpn_control') {
    resultHTML = `
      <div class="glass-card">
        <h4 style="margin-bottom: var(--space-4); color: var(--text-primary);">🔒 Secure Network</h4>
        <div style="background: var(--bg-tertiary); padding: var(--space-4); border-radius: var(--radius-lg); margin-bottom: var(--space-4);">
          <div style="font-size: 10px; color: var(--text-tertiary); text-transform: uppercase;">Current Gateway</div>
          <div style="color: var(--color-accent-400); font-weight: bold; font-size: 16px;">${result.data.server}</div>
          <div style="font-size: 11px; opacity: 0.6; margin-top: 4px;">IP: ${result.data.ip}</div>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div class="badge badge-success">${result.data.status}</div>
          <div style="font-size: 12px; color: var(--text-tertiary);">Latency: ${result.data.latency}</div>
        </div>
      </div>
    `;
  } else if (functionId === 'iot_automation') {
    resultHTML = `
      <div class="glass-card">
        <h4 style="margin-bottom: var(--space-4); color: var(--text-primary);">🔄 Smart Hub Active</h4>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-3); margin-bottom: var(--space-4);">
          <div style="background: var(--bg-tertiary); padding: var(--space-3); border-radius: var(--radius-lg); text-align: center;">
            <div style="font-size: 10px; color: var(--text-tertiary);">ENERGY SAVED</div>
            <div style="font-size: 18px; font-weight: bold; color: var(--color-success-400);">${result.data.energy_saved_today}</div>
          </div>
          <div style="background: var(--bg-tertiary); padding: var(--space-3); border-radius: var(--radius-lg); text-align: center;">
            <div style="font-size: 10px; color: var(--text-tertiary);">MESH STATUS</div>
            <div style="font-size: 18px; font-weight: bold; color: var(--color-accent-400);">ACTIVE</div>
          </div>
        </div>
        <div style="font-size: 11px; color: var(--text-tertiary); margin-bottom: var(--space-2);">Running Routines (${result.data.active_routines.length}):</div>
        <div style="display: flex; gap: var(--space-2); flex-wrap: wrap;">
          ${result.data.active_routines.map(r => `<span class="badge badge-primary">${r}</span>`).join('')}
        </div>
      </div>
    `;
  } else if (functionId === 'task_manager') {
    resultHTML = `
      <div class="glass-card">
        <h4 style="margin-bottom: var(--space-4); color: var(--text-primary);">✅ Task Overview</h4>
        <div style="margin-bottom: var(--space-4);">
          <div style="font-size: 12px; color: var(--text-tertiary); text-transform: uppercase;">Top Priority</div>
          <div style="font-size: 18px; font-weight: bold; color: var(--color-accent-400);">${result.data.priority}</div>
          <div style="font-size: 11px; color: var(--text-secondary); margin-top: 2px;">Due: ${result.data.deadline}</div>
        </div>
        <div class="progress" style="height: 10px; margin-bottom: var(--space-4);">
          <div class="progress-bar" style="width: ${(result.data.completed / (result.data.completed + result.data.pending)) * 100}%;"></div>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 12px;">
          <span style="color: var(--text-secondary);">Done: <strong>${result.data.completed}</strong></span>
          <span style="color: var(--text-secondary);">Pending: <strong>${result.data.pending}</strong></span>
        </div>
      </div>
    `;
  } else if (functionId === 'cross_device_sync') {
    resultHTML = `
      <div class="glass-card">
        <h4 style="margin-bottom: var(--space-4); color: var(--text-primary);">🔄 Ecosystem Sync</h4>
        <div style="background: var(--bg-tertiary); padding: var(--space-4); border-radius: var(--radius-lg); margin-bottom: var(--space-4);">
          <div style="font-size: 10px; color: var(--text-tertiary); text-transform: uppercase;">Active Devices</div>
          <div style="font-size: 24px; font-weight: bold; color: var(--color-accent-400);">${result.data.devices_active} Devices</div>
        </div>
        <div style="margin-bottom: var(--space-3);">
          <div style="font-size: 12px; color: var(--text-secondary);">Last Sync: <strong>${result.data.last_sync}</strong></div>
          <div style="color: var(--text-primary); font-size: 14px; margin-top: 4px;">${result.data.status}</div>
        </div>
        <div style="margin-top: var(--space-4); padding-top: var(--space-4); border-top: 1px solid var(--border-primary);">
          <div style="font-size: 10px; color: var(--text-tertiary);">HANDOFF READY</div>
          <div style="color: var(--color-success-400); font-size: 12px; font-weight: 500;">${result.data.handoff_available}</div>
        </div>
      </div>
    `;
  } else if (functionId === 'developer_tools') {
    resultHTML = `
      <div class="glass-card">
        <h4 style="margin-bottom: var(--space-4); color: var(--text-primary);">💻 Developer Hub</h4>
        <div style="display: grid; gap: var(--space-3);">
          <div style="background: var(--bg-tertiary); padding: var(--space-3); border-radius: var(--radius-lg); display: flex; justify-content: space-between;">
            <span style="font-size: 12px; color: var(--text-secondary);">ADB Protocol:</span>
            <span style="font-size: 12px; font-weight: bold; color: var(--text-primary);">${result.data.adb_status}</span>
          </div>
          <div style="background: var(--bg-tertiary); padding: var(--space-3); border-radius: var(--radius-lg); display: flex; justify-content: space-between;">
            <span style="font-size: 12px; color: var(--text-secondary);">Framework:</span>
            <span style="font-size: 12px; font-weight: bold; color: var(--color-accent-400);">${result.data.framework}</span>
          </div>
          <div style="background: var(--bg-tertiary); padding: var(--space-3); border-radius: var(--radius-lg); display: flex; justify-content: space-between;">
            <span style="font-size: 12px; color: var(--text-secondary);">Logs Captured:</span>
            <span style="font-size: 12px; font-weight: bold; color: var(--color-success-400);">${result.data.console_logs} events</span>
          </div>
        </div>
      </div>
    `;
  } else if (functionId === 'qr_code_scanner') {
    resultHTML = `
      <div class="glass-card">
        <h4 style="margin-bottom: var(--space-4); color: var(--text-primary);">📲 Code Scanned</h4>
        <div style="background: var(--bg-tertiary); padding: var(--space-4); border-radius: var(--radius-lg); margin-bottom: var(--space-4);">
          <div style="font-size: 10px; color: var(--text-tertiary); text-transform: uppercase; margin-bottom: 2px;">Data Type: ${result.data.type}</div>
          <div style="color: var(--color-accent-400); word-break: break-all; font-family: monospace;">${result.data.content}</div>
        </div>
        <button class="btn btn-primary" style="width: 100%;" onclick="showToast('Browser', 'Opening external link...', 'info'); closeModal();">${result.data.action}</button>
      </div>
    `;
  } else if (functionId === 'scan_document') {
    resultHTML = `
      <div class="glass-card">
        <h4 style="margin-bottom: var(--space-4); color: var(--text-primary);">📄 Document Scanned</h4>
        <div style="display: grid; gap: var(--space-4);">
          <div style="background: var(--bg-tertiary); padding: var(--space-3); border-radius: var(--radius-lg); text-align: center;">
            <div style="font-size: 10px; color: var(--text-tertiary); text-transform: uppercase;">Capture Mode</div>
            <div style="font-weight: bold; color: var(--text-primary);">${result.data.mode}</div>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-3);">
            <div style="background: var(--bg-tertiary); padding: var(--space-3); border-radius: var(--radius-lg); text-align: center;">
              <div style="font-size: 10px; color: var(--text-tertiary);">PAGES</div>
              <div style="font-size: 18px; font-weight: bold; color: var(--color-accent-400);">${result.data.pages}</div>
            </div>
            <div style="background: var(--bg-tertiary); padding: var(--space-3); border-radius: var(--radius-lg); text-align: center;">
              <div style="font-size: 10px; color: var(--text-tertiary);">OCR CONFIDENCE</div>
              <div style="font-size: 18px; font-weight: bold; color: var(--color-success-400);">${result.data.ocr_confidence}</div>
            </div>
          </div>
          <div class="badge badge-primary" style="justify-content: center;">FORMAT: ${result.data.format}</div>
          <button class="btn btn-glass btn-sm" style="width: 100%;">Share PDF</button>
        </div>
      </div>
    `;
  } else if (functionId === 'clipboard_manager') {
    resultHTML = `
      <div class="glass-card">
        <h4 style="margin-bottom: var(--space-4); color: var(--text-primary);">📋 Clipboard Hub</h4>
        <div style="background: var(--bg-tertiary); padding: var(--space-4); border-radius: var(--radius-lg); margin-bottom: var(--space-4);">
          <div style="font-size: 10px; color: var(--text-tertiary); text-transform: uppercase;">Last Copied Item</div>
          <div style="color: var(--color-accent-400); word-break: break-all; font-family: monospace; margin-top: 4px;">${result.data.last_copied}</div>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 12px; color: var(--text-secondary);">
          <span>Cloud Sync: <strong>${result.data.sync_status}</strong></span>
          <span>History: <strong>${result.data.items_in_history} items</strong></span>
        </div>
      </div>
    `;
  } else if (functionId === 'sos_alert') {
    resultHTML = `
      <div class="glass-card" style="border-left: 4px solid var(--color-error-500);">
        <h4 style="margin-bottom: var(--space-4); color: var(--color-error-400);">🆘 SOS BROADCAST</h4>
        <div style="background: rgba(239, 68, 68, 0.1); padding: var(--space-3); border-radius: var(--radius-lg); margin-bottom: var(--space-4); text-align: center; font-weight: bold; color: var(--color-error-400); animation: pulse 1s infinite alternate;">
          ${result.data.status}
        </div>
        <div style="font-size: 11px; color: var(--text-tertiary); margin-bottom: var(--space-2);">Notified Contacts:</div>
        <div style="display: flex; gap: var(--space-2); flex-wrap: wrap; margin-bottom: var(--space-4);">
          ${result.data.contacts_notified.map(c => `<span class="badge badge-error">${c}</span>`).join('')}
        </div>
        <div style="font-size: 10px; color: var(--text-tertiary);">Current Location:</div>
        <div style="font-family: monospace; color: var(--text-primary); font-size: 12px;">${result.data.coordinates}</div>
      </div>
    `;
  } else if (category && category.name === 'Hardware Control') {
    const dataEntries = Object.entries(result.data);
    resultHTML = `
      <div class="glass-card">
        <h4 style="margin-bottom: var(--space-4); color: var(--text-primary);">🛒 Hardware Status</h4>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-4);">
          ${dataEntries.map(([key, val]) => `
            <div style="background: var(--bg-tertiary); padding: var(--space-3); border-radius: var(--radius-lg); text-align: center;">
              <div style="font-size: var(--font-size-xs); color: var(--text-tertiary); text-transform: uppercase; margin-bottom: var(--space-1);">${key.replace(/_/g, ' ')}</div>
              <div style="font-weight: var(--font-weight-bold); color: var(--color-accent-400);">${val}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  } else {
    // Generic result display
    resultHTML = `
      <div class="glass-card">
        <h4 style="margin-bottom: var(--space-3); color: var(--text-primary);">✅ Success</h4>
        <pre style="background: var(--bg-tertiary); padding: var(--space-4); border-radius: var(--radius-lg); overflow-x: auto; color: var(--text-secondary); font-size: var(--font-size-sm);">${JSON.stringify(result.data, null, 2)}</pre>
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

// Biometric Lock Screen Simulation
function showBiometricLock() {
  const overlay = document.createElement('div');
  overlay.id = 'biometricLockOverlay';
  overlay.style.cssText = `
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(0,0,0,0.85); backdrop-filter: blur(20px);
    z-index: 99999; display: flex; flex-direction: column;
    align-items: center; justify-content: center; color: white;
    font-family: var(--font-family-display); text-align: center;
  `;

  overlay.innerHTML = `
    <div style="font-size: 60px; margin-bottom: 20px;">🔒</div>
    <h1 style="font-size: 32px; margin-bottom: 10px;">System Locked</h1>
    <p style="color: var(--text-tertiary); margin-bottom: 60px;">Authentication Required</p>
    
    <div class="bio-scanner" onclick="unlockSystem()" style="cursor: pointer;">
      <div style="font-size: 80px; opacity: 0.8;">👤</div>
      <div class="scan-line"></div>
    </div>
    
    <p style="margin-top: 40px; font-size: 14px; opacity: 0.6;">Touch or Face ID to Unlock</p>
  `;

  document.body.appendChild(overlay);

  // Add scanner animation styles if not exists
  if (!document.getElementById('bioStyles')) {
    const style = document.createElement('style');
    style.id = 'bioStyles';
    style.innerHTML = `
      .bio-scanner {
        position: relative;
        padding: 20px;
        border: 2px solid var(--color-accent-500);
        border-radius: 50%;
        width: 150px; height: 150px;
        display: flex; align-items: center; justify-content: center;
        background: rgba(34, 211, 238, 0.1);
        box-shadow: 0 0 30px rgba(34, 211, 238, 0.2);
        overflow: hidden;
      }
      .scan-line {
        position: absolute;
        top: 0; left: 0; width: 100%; height: 4px;
        background: var(--color-accent-400);
        box-shadow: 0 0 15px var(--color-accent-400);
        animation: scanBio 2s infinite ease-in-out;
      }
      @keyframes scanBio {
        0%, 100% { top: 10%; }
        50% { top: 90%; }
      }
    `;
    document.head.appendChild(style);
  }
}

function unlockSystem() {
  const overlay = document.getElementById('biometricLockOverlay');
  if (overlay) {
    showToast('Success', 'Biometric identity verified', 'success');
    overlay.style.opacity = '0';
    overlay.style.transition = 'opacity 0.5s';
    setTimeout(() => overlay.remove(), 500);
  }
}

// Resource Optimizer Wizard
function showOptimizationWizard() {
  const modalContainer = document.getElementById('modalContainer');
  if (!modalContainer) return;

  modalContainer.innerHTML = `
    <div class="modal-overlay active">
      <div class="modal" style="max-width: 500px; text-align: center; padding: var(--space-8);">
        <div id="optiHeader">
          <div class="spinner-lg" style="margin: 0 auto var(--space-6);"></div>
          <h2 class="modal-title" style="margin-bottom: var(--space-2);">Optimizing Resources</h2>
          <p id="optiStatus" style="color: var(--text-secondary);">Analyzing system heap...</p>
        </div>
        
        <div id="optiProgressContainer" style="margin: var(--space-8) 0;">
          <div class="progress" style="height: 12px; background: rgba(255,255,255,0.1);">
            <div id="optiBar" class="progress-bar" style="width: 0%; transition: width 0.3s;"></div>
          </div>
          <div style="display: flex; justify-content: space-between; margin-top: var(--space-2); font-size: 12px; color: var(--text-tertiary);">
            <span id="optiStep">Step 1/4</span>
            <span id="optiPercent">0%</span>
          </div>
        </div>
        
        <div id="optiLog" style="height: 80px; overflow: hidden; background: var(--bg-tertiary); border-radius: var(--radius-lg); padding: var(--space-3); text-align: left; font-family: monospace; font-size: 11px; color: var(--color-success-400);">
          <div>> Initializing optimizer...</div>
        </div>
      </div>
    </div>
  `;

  const bar = document.getElementById('optiBar');
  const status = document.getElementById('optiStatus');
  const step = document.getElementById('optiStep');
  const percent = document.getElementById('optiPercent');
  const log = document.getElementById('optiLog');

  const steps = [
    { p: 25, s: 'Analyzing heap...', l: '> Scanning 1,420 active objects...' },
    { p: 50, s: 'Purging cache...', l: '> Removing 450MB temporary fragments...' },
    { p: 75, s: 'Optimizing CPU...', l: '> Reorganizing process priorities...' },
    { p: 100, s: 'Finalizing...', l: '> System resource pool refreshed.' }
  ];

  let current = 0;
  const interval = setInterval(() => {
    if (current >= steps.length) {
      clearInterval(interval);
      setTimeout(() => {
        const result = {
          success: true,
          data: { memory_freed: '1.2 GB', cache_cleared: '450 MB', speed_boost: '+18%' }
        };
        showFunctionResult('optimize_resources', 'Resource Optimizer', result);
        notificationManager.addNotification({
          title: 'System Boosted',
          message: 'Resource optimizer successfully freed 1.2GB of memory.',
          type: 'success'
        });
      }, 800);
      return;
    }

    const { p, s, l } = steps[current];
    bar.style.width = `${p}%`;
    status.textContent = s;
    step.textContent = `Step ${current + 1}/4`;
    percent.textContent = `${p}%`;

    const entry = document.createElement('div');
    entry.textContent = l;
    log.appendChild(entry);
    log.scrollTop = log.scrollHeight;

    current++;
  }, 1200);
}

// Copy suggestion to clipboard (simulated)
function copySuggestion(text) {
  // Always show toast notification for consistency
  showToast('Copied', 'Reply copied to clipboard', 'success');
  // Don't close modal - let user copy multiple suggestions
  // closeModal(); // Removed to improve UX
}

// Export for global access
window.getFunctionCategories = getFunctionCategories;
window.executeFunction = executeFunction;
window.copySuggestion = copySuggestion;

// Helper: Get Dynamic System Context for Simulations
function getSystemContext() {
  return {
    battery: document.getElementById('contextBattery')?.innerText || '85%',
    network: document.getElementById('contextNetwork')?.innerText || '5G Full Signal',
    storage: document.getElementById('storageProgress')?.style.width || '65%',
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };
}

// Platform API Helpers
function useVibrationAPI() {
  if (typeof navigator !== 'undefined' && "vibrate" in navigator) {
    try {
      navigator.vibrate([100, 30, 100]);
      return true;
    } catch (e) {
      return false;
    }
  }
  return false;
}

// Enhance simulateFunction with context
const originalSimulate = simulateFunction;
simulateFunction = function (id) {
  const context = getSystemContext();
  const res = originalSimulate(id);

  // Inject context into generic success messages
  if (!res.data.timestamp) res.data.context_sync = context;

  return res;
};

/**
 * v6.0 Preview - Neural Link Simulation
 */
function showNeuralLinkWizard() {
  const modalContainer = document.getElementById('modalContainer');
  if (!modalContainer) return;

  modalContainer.innerHTML = `
    <div class="modal-overlay active" onclick="closeModal(event)">
      <div class="modal modal-neural" onclick="event.stopPropagation()" style="background: var(--bg-primary); border-color: var(--color-error-500); overflow: hidden;">
        <div class="scanner-overlay"></div>
        <div class="modal-header" style="border-bottom: 1px solid var(--color-error-900);">
          <h2 class="modal-title" style="color: var(--color-error-400);">🛑 PROJECT: GHOST IN THE SHELL</h2>
          <button class="modal-close" onclick="closeModal()">&times;</button>
        </div>
        <div class="modal-body text-center" style="padding: var(--space-10) var(--space-6);">
          <div class="neural-orb" style="margin: 0 auto var(--space-8); width: 120px; height: 120px; background: radial-gradient(circle, var(--color-error-500), transparent 70%); animation: orbActive 0.5s infinite alternate;">
            <span style="font-size: 50px; line-height: 120px;">🧠</span>
          </div>
          <h3 class="font-display" style="font-size: 1.5rem; margin-bottom: var(--space-4); letter-spacing: 2px;">NEURAL LINK v6.0 (ALPHA)</h3>
          <div id="neuralStatus" style="font-family: var(--font-family-mono); font-size: 12px; color: var(--color-error-300); margin-bottom: var(--space-6);">
            INITIALIZING_COGNITIVE_HANDSHAKE...
          </div>
          
          <div class="progress" style="background: var(--color-error-950); height: 4px;">
            <div id="neuralProgress" class="progress-bar" style="width: 0%; background: var(--color-error-500); box-shadow: 0 0 15px var(--color-error-500);"></div>
          </div>
          
          <div id="neuralLogs" style="margin-top: var(--space-6); font-family: var(--font-family-mono); font-size: 10px; color: var(--text-tertiary); text-align: left; height: 100px; overflow-y: auto; background: rgba(0,0,0,0.3); padding: 10px; border-radius: 8px;">
          </div>
        </div>
        <div class="modal-footer" style="border-top: 1px solid var(--color-error-900);">
          <div style="font-size: 10px; color: var(--color-error-500); flex: 1; text-align: left; font-weight: bold;">[EXPERIMENTAL PROTOCOL]</div>
          <button class="btn btn-glass" onclick="closeModal()">Abort Link</button>
          <button id="startLinkBtn" class="btn btn-error" onclick="startNeuralLinkSync()">Initiate Sync</button>
        </div>
      </div>
    </div>
  `;
}

function startNeuralLinkSync() {
  const btn = document.getElementById('startLinkBtn');
  const bar = document.getElementById('neuralProgress');
  const status = document.getElementById('neuralStatus');
  const logs = document.getElementById('neuralLogs');
  if (!btn || !bar) return;

  btn.disabled = true;
  btn.textContent = 'Linking...';

  const steps = [
    'Establishing secure corridor...',
    'Bypassing biological firewalls...',
    'Synchronizing synaptic pulse...',
    'Mapping neural pathways...',
    'Injecting ghost protocols...',
    'Verifying ego integrity...',
    'LINK_STABLE'
  ];

  let current = 0;
  const interval = setInterval(() => {
    if (current >= steps.length) {
      clearInterval(interval);
      status.textContent = 'LINK_ESTABLISHED';
      status.style.color = '#10B981';
      showToast('Neural Link', 'Direct cognitive interface connected', 'success');
      setTimeout(() => {
        closeModal();
        notificationManager.addNotification({
          title: 'v6.0 Alpha Test',
          message: 'Synaptic handshake successful. Welcome to the future.',
          type: 'success'
        });
      }, 1500);
      return;
    }

    const progress = ((current + 1) / steps.length) * 100;
    bar.style.width = `${progress}%`;
    status.textContent = steps[current].toUpperCase();

    const log = document.createElement('div');
    log.textContent = `> ${steps[current]}`;
    logs.appendChild(log);
    logs.scrollTop = logs.scrollHeight;

    current++;
  }, 1000);
}

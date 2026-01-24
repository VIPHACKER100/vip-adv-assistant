/**
 * Advanced Mobile Control AI Assistant
 * EXPANDED Function Definitions - 65+ Functions
 */

// Get all function categories with their functions
function getFunctionCategories() {
  return [
    {
      name: 'AI & Vision',
      icon: '\uD83E\uDDE0',
      description: 'Intelligent image analysis and visual understanding',
      functions: [
        { id: 'analyze_image', icon: '\uD83D\uDCF8', title: 'Image Analysis', description: 'AI-powered object detection, OCR, and scene understanding', badge: 'Popular', badgeType: 'accent' },
        { id: 'visual_search', icon: '\uD83D\uDD0D', title: 'Visual Search', description: 'Search by image, find products, or identify locations' },
        { id: 'enhance_media', icon: '\u2728', title: 'Media Enhancement', description: 'AI upscaling, noise reduction, and style transfer' },
        { id: 'screen_understanding', icon: '\uD83D\uDCF1', title: 'Screen Understanding', description: 'Understand and interact with on-screen content' },
        { id: 'generate_content', icon: '\uD83C\uDFA8', title: 'Content Generation', description: 'Generate images, text, or media using AI' },
        { id: 'face_recognition', icon: '\uD83D\uDC64', title: 'Face Recognition', description: 'Identify and tag people in photos', badge: 'New', badgeType: 'success' },
        { id: 'qr_code_scanner', icon: '\uD83D\uDCF2', title: 'QR/Barcode Scanner', description: 'Scan and decode QR codes and barcodes' }
      ]
    },
    {
      name: 'Automation & Routines',
      icon: '\u26A1',
      description: 'Create powerful workflows and smart automations',
      functions: [
        { id: 'create_automation', icon: '\uD83E\uDD16', title: 'Create Automation', description: 'Build custom routines from natural language', badge: 'New', badgeType: 'success' },
        { id: 'manage_routine', icon: '\uD83D\uDCCB', title: 'Manage Routines', description: 'View, edit, or execute saved automations' },
        { id: 'smart_suggestions', icon: '\uD83D\uDCA1', title: 'Smart Suggestions', description: 'AI-powered contextual recommendations' },
        { id: 'task_chain', icon: '\uD83D\uDD17', title: 'Task Chain', description: 'Execute complex multi-step workflows' },
        { id: 'learn_preference', icon: '\uD83E\uDDE0', title: 'Learn Preferences', description: 'AI learns from your behavior patterns' }
      ]
    },
    {
      name: 'Security & Privacy',
      icon: '\uD83D\uDD12',
      description: 'Advanced security and privacy controls',
      functions: [
        { id: 'biometric_auth', icon: '\uD83D\uDC46', title: 'Biometric Auth', description: 'Fingerprint, face, or voice authentication' },
        { id: 'secure_vault', icon: '\uD83D\uDD10', title: 'Secure Vault', description: 'Encrypted storage for sensitive data' },
        { id: 'privacy_control', icon: '\uD83D\uDEE1\uFE0F', title: 'Privacy Controls', description: 'Manage app permissions and privacy settings' },
        { id: 'secure_communication', icon: '\uD83D\uDD11', title: 'Secure Messaging', description: 'End-to-end encrypted communication' },
        { id: 'find_device', icon: '\uD83D\uDCCD', title: 'Find Device', description: 'Locate, lock, or wipe device remotely' },
        { id: 'password_generator', icon: '\uD83D\uDD10', title: 'Password Generator', description: 'Generate strong, secure passwords' },
        { id: 'vpn_control', icon: '\uD83D\uDD12', title: 'VPN Control', description: 'Manage VPN connections and privacy' },
        { id: 'app_lock', icon: '\uD83D\uDD12', title: 'App Lock', description: 'Lock specific apps with biometrics' }
      ]
    },
    {
      name: 'Communication',
      icon: '\uD83D\uDCAC',
      description: 'Smart messaging and collaboration tools',
      functions: [
        { id: 'smart_reply', icon: '\uD83D\uDCAD', title: 'Smart Reply', description: 'AI-generated contextual message suggestions', badge: 'Popular', badgeType: 'accent' },
        { id: 'compose_message', icon: '\u270D\uFE0F', title: 'Compose Message', description: 'AI-assisted message composition' },
        { id: 'meeting_assistant', icon: '\uD83C\uDFA5', title: 'Meeting Assistant', description: 'Join, transcribe, or summarize meetings' },
        { id: 'translate_realtime', icon: '\uD83C\uDF10', title: 'Real-time Translation', description: 'Instant language translation' },
        { id: 'voice_assistant', icon: '\uD83C\uDFA4', title: 'Voice Assistant', description: 'Advanced voice commands and control' },
        { id: 'email_assistant', icon: '\uD83D\uDCE7', title: 'Email Assistant', description: 'Smart email management and responses' },
        { id: 'call_screening', icon: '\uD83D\uDCDE', title: 'Call Screening', description: 'AI answers and screens calls for you' },
        { id: 'voice_notes', icon: '\uD83C\uDF99\uFE0F', title: 'Voice Notes', description: 'Record and transcribe voice memos' }
      ]
    },
    {
      name: 'Context & Intelligence',
      icon: '\uD83C\uDFAF',
      description: 'Contextual awareness and predictive features',
      functions: [
        { id: 'context_analysis', icon: '\uD83D\uDCCA', title: 'Context Analysis', description: 'Analyze device and user context' },
        { id: 'predict_next_action', icon: '\uD83D\uDD2E', title: 'Predict Next Action', description: 'AI predictions based on patterns' },
        { id: 'memory_recall', icon: '\uD83E\uDDE9', title: 'Memory Recall', description: 'Search through device history' },
        { id: 'location_intelligence', icon: '\uD83D\uDCCD', title: 'Location Intelligence', description: 'Context-aware location-based actions' },
        { id: 'behavior_patterns', icon: '\uD83D\uDCC8', title: 'Behavior Patterns', description: 'Analyze and learn usage patterns' }
      ]
    },
    {
      name: 'Smart Home & IoT',
      icon: '\uD83C\uDFE0',
      description: 'Control smart home devices and scenes',
      functions: [
        { id: 'control_smart_home', icon: '\uD83D\uDCA1', title: 'Control Devices', description: 'Manage lights, thermostat, locks, and more' },
        { id: 'iot_automation', icon: '\uD83D\uDD04', title: 'IoT Automation', description: 'Create smart home automations' },
        { id: 'scene_management', icon: '\uD83C\uDFAC', title: 'Scene Management', description: 'Create and activate device scenes' },
        { id: 'energy_monitoring', icon: '\u26A1', title: 'Energy Monitoring', description: 'Track smart device energy usage' }
      ]
    },
    {
      name: 'Creative & Productivity',
      icon: '\uD83C\uDFA8',
      description: 'Tools for creativity and productivity',
      functions: [
        { id: 'scan_document', icon: '\uD83D\uDCC4', title: 'Document Scanner', description: 'Advanced scanning with OCR' },
        { id: 'clipboard_manager', icon: '\uD83D\uDCCB', title: 'Clipboard Manager', description: 'History and smart paste suggestions' },
        { id: 'focus_mode', icon: '\uD83C\uDFAF', title: 'Focus Mode', description: 'Minimize distractions and boost productivity' },
        { id: 'gesture_control', icon: '\uD83D\uDC4B', title: 'Gesture Control', description: 'Custom gesture shortcuts' },
        { id: 'ar_features', icon: '\uD83D\uDD32', title: 'AR Features', description: 'Augmented reality capabilities' },
        { id: 'note_taking', icon: '\uD83D\uDCDD', title: 'Smart Notes', description: 'AI-enhanced note-taking' },
        { id: 'calendar_sync', icon: '\uD83D\uDCC5', title: 'Calendar Sync', description: 'Intelligent calendar management' },
        { id: 'task_manager', icon: '\u2705', title: 'Task Manager', description: 'Create and manage tasks with AI' }
      ]
    },
    {
      name: 'Analytics & Insights',
      icon: '\uD83D\uDCC8',
      description: 'Usage tracking and wellness features',
      functions: [
        { id: 'usage_analytics', icon: '\uD83D\uDCCA', title: 'Usage Analytics', description: 'Detailed app and screen time insights' },
        { id: 'wellness_check', icon: '\uD83D\uDC9A', title: 'Wellness Check', description: 'Digital wellbeing and health integration' },
        { id: 'performance_optimization', icon: '\u2699\uFE0F', title: 'Performance Optimization', description: 'Battery, storage, and memory optimization' },
        { id: 'data_usage', icon: '\uD83D\uDCCA', title: 'Data Usage', description: 'Monitor mobile data consumption' },
        { id: 'app_insights', icon: '\uD83D\uDCF1', title: 'App Insights', description: 'Detailed per-app usage statistics' }
      ]
    },
    {
      name: 'Connectivity & Sync',
      icon: '\uD83C\uDF10',
      description: 'Network and cross-device features',
      functions: [
        { id: 'cross_device_sync', icon: '\uD83D\uDD04', title: 'Cross-Device Sync', description: 'Sync content across all devices', badge: 'New', badgeType: 'success' },
        { id: 'network_optimization', icon: '\uD83D\uDCF6', title: 'Network Optimizer', description: 'Intelligent network management' },
        { id: 'wifi_assistant', icon: '\uD83D\uDCE1', title: 'WiFi Assistant', description: 'Auto-connect to trusted networks' },
        { id: 'hotspot_control', icon: '\uD83D\uDCF6', title: 'Hotspot Control', description: 'Share network connection' },
        { id: 'bluetooth_manager', icon: '\uD83D\uDD35', title: 'Bluetooth Manager', description: 'Manage Bluetooth connections' }
      ]
    },
    {
      name: 'Emergency & Safety',
      icon: '\uD83D\uDEA8',
      description: 'Emergency assistance and safety features',
      functions: [
        { id: 'sos_alert', icon: '\uD83C\uDD98', title: 'SOS Alert', description: 'Emergency contacts and location sharing' },
        { id: 'crash_detection', icon: '\uD83D\uDE97', title: 'Crash Detection', description: 'Auto-detect accidents and alert contacts' },
        { id: 'medical_id', icon: '\uD83C\uDFE5', title: 'Medical ID', description: 'Emergency medical information access' },
        { id: 'safety_check', icon: '\uD83D\uDD14', title: 'Safety Check-in', description: 'Scheduled safety check-ins' }
      ]
    },
    {
      name: 'Accessibility',
      icon: '\u267F',
      description: 'Advanced accessibility controls',
      functions: [
        { id: 'screen_reader', icon: '\uD83D\uDCE3', title: 'Screen Reader', description: 'Advanced text-to-speech' },
        { id: 'voice_access', icon: '\uD83C\uDFA4', title: 'Voice Access', description: 'Control device entirely by voice' },
        { id: 'magnification', icon: '\uD83D\uDD0D', title: 'Magnification', description: 'Screen zoom and magnification' },
        { id: 'color_correction', icon: '\uD83C\uDFA8', title: 'Color Correction', description: 'Adjust colors for accessibility' }
      ]
    },
    {
      name: 'Developer & Advanced',
      icon: '\u2699\uFE0F',
      description: 'Developer utilities and advanced features',
      functions: [
        { id: 'device_sensors', icon: '\uD83D\uDCE1', title: 'Device Sensors', description: 'Access accelerometer, gyroscope, etc.' },
        { id: 'system_automation', icon: '\uD83D\uDD27', title: 'System Automation', description: 'Advanced scripting and automation' },
        { id: 'developer_tools', icon: '\uD83D\uDCBB', title: 'Developer Tools', description: 'Debugging and profiling tools' },
        { id: 'api_testing', icon: '\uD83D\uDD0C', title: 'API Testing', description: 'Test REST APIs and webhooks' }
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

// Simulate function execution with realistic results
function simulateFunction(functionId) {
  const simulations = {
    analyze_image: {
      success: true,
      data: {
        objects: ['Person (95%)', 'Cat (89%)', 'Sofa (76%)'],
        text: 'Welcome Home',
        scene: 'Living Room',
        dominant_colors: ['#2A3F5F', '#C9ADA7', '#F2E9E4']
      }
    },
    visual_search: {
      success: true,
      data: {
        similar_images: 15,
        products_found: 3,
        best_match: 'Wireless Headphones - $89.99'
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
        devices_controlled: 5,
        actions: ['Lights dimmed to 40%', 'Thermostat set to 72°F', 'Living room scene activated']
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
    }
  };

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

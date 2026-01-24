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

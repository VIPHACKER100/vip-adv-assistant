
/**
 * Advanced Mobile Control AI Assistant
 * Automation Builder & Workflow Management
 */

// Automation state
const automationState = {
  routines: JSON.parse(localStorage.getItem('vip_routines') || '[]'),
  currentRoutine: null,
  templates: []
};

// Initialize automation engine
function initAutomation() {
  getAutomationTemplates();

  // Start autonomous monitoring (every 10 seconds)
  setInterval(() => checkAutonomousTriggers(), 10000);
}

// Initialize automation templates
function initAutomationTemplates() {
  return [
    {
      id: 'morning_routine',
      name: 'Morning Routine',
      description: 'Perfect start to your day',
      icon: '☀️',
      triggers: [{ type: 'time', value: '07:00' }],
      actions: [
        { function: 'weather_check', label: 'Check weather' },
        { function: 'read_messages', label: 'Read unread messages' },
        { function: 'calendar_summary', label: 'Today\'s schedule' },
        { function: 'smart_suggestions', label: 'Get suggestions' }
      ]
    },
    {
      id: 'gym_mode',
      name: 'Gym Mode',
      description: 'Workout time automation',
      icon: '💪',
      triggers: [{ type: 'location', value: 'Gym', radius: 100 }],
      actions: [
        { function: 'toggle_dnd', params: { state: 'on' }, label: 'Enable Do Not Disturb' },
        { function: 'play_media', params: { query: 'Workout Playlist' }, label: 'Play workout music' },
        { function: 'open_app', params: { app: 'Fitness Tracker' }, label: 'Open fitness app' }
      ]
    },
    {
      id: 'bedtime',
      name: 'Bedtime Routine',
      description: 'Wind down for better sleep',
      icon: '🌙',
      triggers: [{ type: 'time', value: '22:00' }],
      actions: [
        { function: 'focus_mode', params: { mode: 'sleep' }, label: 'Enable sleep mode' },
        { function: 'control_smart_home', params: { action: 'bedtime_scene' }, label: 'Activate bedtime scene' },
        { function: 'set_alarm', params: { time: '07:00' }, label: 'Set morning alarm' },
        { function: 'wellness_check', label: 'Review today\'s wellness' }
      ]
    },
    {
      id: 'commute',
      name: 'Commute Assistant',
      description: 'Smart commute preparation',
      icon: '🚗',
      triggers: [{ type: 'time', value: '08:00' }, { type: 'day', value: 'weekday' }],
      actions: [
        { function: 'check_traffic', label: 'Check traffic conditions' },
        { function: 'navigate', params: { destination: 'Work' }, label: 'Start navigation' },
        { function: 'send_eta', params: { contact: 'Work' }, label: 'Send ETA' },
        { function: 'play_media', params: { query: 'Podcast' }, label: 'Play podcast' }
      ]
    },
    {
      id: 'focus_work',
      name: 'Deep Work Mode',
      description: 'Maximum productivity focus',
      icon: '🎯',
      triggers: [{ type: 'manual' }],
      actions: [
        { function: 'focus_mode', params: { mode: 'work', duration: 120 }, label: '2-hour focus session' },
        { function: 'block_apps', params: { except: ['Work Apps'] }, label: 'Block distractions' },
        { function: 'auto_reply', params: { message: 'In focus mode, will respond later' }, label: 'Set auto-reply' }
      ]
    },
    {
      id: 'low_battery_recovery',
      name: 'Power Safe Routine',
      description: 'Triggered when battery is critical',
      icon: '🔋',
      triggers: [{ type: 'battery_level', value: 20, operator: '<' }],
      actions: [
        { function: 'optimize_resources', label: 'Purge background RAM' },
        { function: 'set_brightness', params: { value: 20 }, label: 'Dim display to 20%' },
        { function: 'toggle_flashlight', params: { state: 'off' }, label: 'Ensure flashlight OFF' }
      ]
    }
  ];
}

// Get automation templates
function getAutomationTemplates() {
  if (automationState.templates.length === 0) {
    automationState.templates = initAutomationTemplates();
  }
  return automationState.templates;
}

// Create new automation from template
function createFromTemplate(templateId) {
  const templates = getAutomationTemplates();
  const template = templates.find(t => t.id === templateId);

  if (!template) {
    showToast('Error', 'Template not found', 'error');
    return;
  }

  // Create routine from template
  const routine = {
    id: `routine_${Date.now()}`,
    ...template,
    enabled: false,
    created: new Date().toISOString()
  };

  automationState.routines.push(routine);
  saveRoutines();

  showToast('Created', `${template.name} automation created`, 'success');
  showRoutineDetails(routine.id);
}

function saveRoutines() {
  localStorage.setItem('vip_routines', JSON.stringify(automationState.routines));
}

// Check for autonomous triggers based on device state
function checkAutonomousTriggers() {
  // Ensure appState.context is defined and has battery/isCharging
  if (!window.appState || !window.appState.context) {
    console.warn("appState.context not available for autonomous triggers.");
    return;
  }

  const battery = parseInt(appState.context.battery);
  const isCharging = appState.context.isCharging;

  automationState.routines.forEach(routine => {
    if (!routine.enabled) return;

    routine.triggers.forEach(trigger => {
      let triggered = false;

      if (trigger.type === 'battery_level') {
        const val = parseInt(trigger.value);
        if (trigger.operator === '<' && battery < val) triggered = true;
        if (trigger.operator === '>' && battery > val) triggered = true;
      } else if (trigger.type === 'is_charging') {
        const triggerChargingState = (String(trigger.value).toLowerCase() === 'true');
        if (triggerChargingState === isCharging) triggered = true;
      } else if (trigger.type === 'location' && appState.context.location.lat) {
        // Simple distance check if coordinates are provided, otherwise city match
        if (trigger.lat && trigger.lon) {
          const dist = calculateDistance(trigger.lat, trigger.lon, appState.context.location.lat, appState.context.location.lon);
          if (dist <= (trigger.radius || 500)) triggered = true;
        } else if (appState.context.location.city.toLowerCase().includes(trigger.value.toLowerCase())) {
          triggered = true;
        }
      } else if (trigger.type === 'weather') {
        const currentDesc = document.getElementById('wDesc')?.textContent?.toLowerCase() || '';
        if (currentDesc.includes(trigger.value.toLowerCase())) triggered = true;
      }

      if (triggered) {
        // Prevent double execution in short window
        const now = Date.now();
        // Cooldown period: 5 minutes (300,000 milliseconds)
        if (routine.lastTriggered && (now - routine.lastTriggered < 300000)) {
          // console.log(`Routine ${routine.name} recently triggered, skipping.`);
          return;
        }

        routine.lastTriggered = now;
        // Update routine in state and save to persist lastTriggered
        const routineIndex = automationState.routines.findIndex(r => r.id === routine.id);
        if (routineIndex !== -1) {
          automationState.routines[routineIndex] = { ...routine }; // Update the object in the array
          saveRoutines(); // Persist the updated lastTriggered timestamp
        }

        notificationManager.addNotification({
          title: `Autonomous Rule: ${routine.name}`,
          message: `Activated based on system condition: ${formatTrigger(trigger)}`,
          type: 'success'
        });
        executeRoutine(routine.id);
      }
    });
  });
}

// Execute automation routine
function executeRoutine(routineId) {
  const routine = automationState.routines.find(r => r.id === routineId) ||
    automationState.templates.find(t => t.id === routineId);

  if (!routine) {
    showToast('Error', 'Routine not found', 'error');
    return;
  }

  showToast('Executing', `Running ${routine.name}...`, 'info');

  // Simulate step-by-step execution
  let completedSteps = 0;
  const totalSteps = routine.actions.length;

  const executeStep = (index) => {
    if (index >= totalSteps) {
      showToast('Complete', `${routine.name} finished successfully`, 'success');
      return;
    }

    const action = routine.actions[index];
    console.log(`Executing step ${index + 1}: ${action.label}`);

    // Simulate execution time
    setTimeout(() => {
      completedSteps++;
      showToast(
        'Progress',
        `${action.label} (${completedSteps}/${totalSteps})`,
        'info'
      );
      executeStep(index + 1);
    }, 800 + Math.random() * 400);
  };

  executeStep(0);
}

// Show routine details in modal
function showRoutineDetails(routineId) {
  const routine = automationState.routines.find(r => r.id === routineId) ||
    automationState.templates.find(t => t.id === routineId);

  if (!routine) return;

  const isTemplate = !automationState.routines.find(r => r.id === routineId);

  const modalContainer = document.getElementById('modalContainer');
  if (!modalContainer) return;

  modalContainer.innerHTML = `
    <div class="modal-overlay active" onclick="closeModal(event)">
      <div class="modal" onclick="event.stopPropagation()">
        <div class="modal-header">
          <h2 class="modal-title">${routine.icon} ${routine.name}</h2>
          <button class="modal-close" onclick="closeModal()">&times;</button>
        </div>
        <div class="modal-body">
          <p style="color: var(--text-secondary); margin-bottom: var(--space-6);">
            ${routine.description}
          </p>
          
          <div class="glass-card" style="margin-bottom: var(--space-4);">
            <h4 style="margin-bottom: var(--space-3); color: var(--text-primary);">⚡ Triggers</h4>
            ${routine.triggers.map(trigger => `
              <div class="badge badge-accent" style="margin-right: var(--space-2);">
                ${formatTrigger(trigger)}
              </div>
            `).join('')}
          </div>
          
          <div class="glass-card">
            <h4 style="margin-bottom: var(--space-3); color: var(--text-primary);">📋 Actions (${routine.actions.length})</h4>
            ${routine.actions.map((action, index) => `
              <div style="display: flex; align-items: center; gap: var(--space-3); padding: var(--space-3); margin-bottom: var(--space-2); background: var(--bg-tertiary); border-radius: var(--radius-lg);">
                <span style="font-weight: var(--font-weight-bold); color: var(--color-accent-400);">${index + 1}</span>
                <span style="flex: 1; color: var(--text-primary);">${action.label}</span>
              </div>
            `).join('')}
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-glass" onclick="showAutomationBuilder()">← Back to Templates</button>
          ${isTemplate ?
      `<button class="btn btn-success" onclick="createFromTemplate('${routineId}')">Use Template</button>` :
      `<button class="btn btn-glass" onclick="toggleRoutine('${routineId}')">${routine.enabled ? 'Disable' : 'Enable'}</button>`
    }
          <button class="btn btn-primary" onclick="executeRoutine('${routineId}'); closeModal();">
            ▶️ Run Now
          </button>
        </div>
      </div>
    </div>
  `;
}

// Format trigger for display
function formatTrigger(trigger) {
  switch (trigger.type) {
    case 'time':
      return `⏰ ${trigger.value}`;
    case 'location':
      return `📍 ${trigger.value}`;
    case 'day':
      return `📅 ${trigger.value}`;
    case 'app':
      return `📱 Open ${trigger.value}`;
    case 'manual':
      return `👆 Manual trigger`;
    default:
      return trigger.type;
  }
}

// Toggle routine enabled state
function toggleRoutine(routineId) {
  const routine = automationState.routines.find(r => r.id === routineId);
  if (routine) {
    routine.enabled = !routine.enabled;
    showToast(
      routine.enabled ? 'Enabled' : 'Disabled',
      `${routine.name} is now ${routine.enabled ? 'active' : 'inactive'}`,
      routine.enabled ? 'success' : 'info'
    );
    closeModal();
  }
}

// Show automation builder main interface
function showAutomationBuilder() {
  const templates = getAutomationTemplates();

  const modalContainer = document.getElementById('modalContainer');
  if (!modalContainer) return;

  modalContainer.innerHTML = `
    <div class="modal-overlay active" onclick="closeModal(event)">
      <div class="modal" onclick="event.stopPropagation()" style="max-width: 900px;">
        <div class="modal-header">
          <h2 class="modal-title">⚡ Automation Builder</h2>
          <button class="modal-close" onclick="closeModal()">&times;</button>
        </div>
        <div class="modal-body">
          <h3 style="margin-bottom: var(--space-4); color: var(--text-primary);">📚 Template Library</h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: var(--space-4);">
            <div class="function-card" onclick="showAIRoutineGenerator()" style="border: 2px dashed var(--color-accent-500); background: rgba(124, 58, 237, 0.05); color: var(--color-accent-300);">
                <div class="function-icon">🧠</div>
                <div class="function-title">AI Logic Generator</div>
                <div class="function-description">Describe a workflow and let AI build the logic for you.</div>
                <div style="margin-top: var(--space-3);">
                    <span class="badge badge-accent">SMART ENGINE</span>
                </div>
            </div>
            ${templates.map(template => `
              <div class="function-card" onclick="showRoutineDetails('${template.id}')">
                <div class="function-icon">${template.icon}</div>
                <div class="function-title">${template.name}</div>
                <div class="function-description">${template.description}</div>
                <div style="margin-top: var(--space-3);">
                  <span class="badge badge-primary">${template.actions.length} actions</span>
                </div>
              </div>
            `).join('')}
          </div>
          
          ${automationState.routines.length > 0 ? `
            <div class="divider"></div>
            <h3 style="margin-bottom: var(--space-4); color: var(--text-primary);">🤖 Your Automations</h3>
            <div style="display: grid; gap: var(--space-3);">
              ${automationState.routines.map(routine => `
                <div class="glass-card" style="display: flex; align-items: center; justify-content: space-between; cursor: pointer;" onclick="showRoutineDetails('${routine.id}')">
                  <div style="display: flex; align-items: center; gap: var(--space-3);">
                    <span style="font-size: var(--font-size-2xl);">${routine.icon}</span>
                    <div>
                      <div style="font-weight: var(--font-weight-semibold); color: var(--text-primary);">${routine.name}</div>
                      <div style="font-size: var(--font-size-sm); color: var(--text-secondary);">${routine.actions.length} actions</div>
                    </div>
                  </div>
                  <div>
                    <span class="badge badge-${routine.enabled ? 'success' : 'warning'}">
                      ${routine.enabled ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                </div>
              `).join('')}
            </div>
          ` : ''}
        </div>
        <div class="modal-footer">
          <button class="btn btn-glass" onclick="closeModal()">Close</button>
          <button class="btn btn-accent" onclick="showCustomRoutineBuilder()">
            ➕ Create Custom
          </button>
        </div>
      </div>
    </div>
  `;
}

function showCustomRoutineBuilder() {
  const categories = getFunctionCategories();
  const allFunctions = categories.flatMap(c => c.functions);

  const modalContainer = document.getElementById('modalContainer');
  modalContainer.innerHTML = `
    <div class="modal-overlay active" onclick="closeModal(event)">
      <div class="modal" onclick="event.stopPropagation()">
        <div class="modal-header">
          <h2 class="modal-title">➕ Create Custom Routine</h2>
          <button class="modal-close" onclick="closeModal()">&times;</button>
        </div>
        <div class="modal-body">
          <div class="input-group" style="margin-bottom: var(--space-4);">
            <label class="label">Routine Name</label>
            <input type="text" id="custRoutineName" class="input" placeholder="e.g., Gaming Mode">
          </div>
          <div class="input-group" style="margin-bottom: var(--space-6);">
            <label class="label">Select Icon</label>
            <select id="custRoutineIcon" class="input">
              <option value="🎮">🎮 Game</option>
              <option value="📚">📚 Study</option>
              <option value="🏋️‍♂️">🏋️‍♂️ Workout</option>
              <option value="🚗">🚗 Drive</option>
            </select>
          </div>
          
          <h4 style="margin-bottom: var(--space-3); color: var(--text-primary);">Add Actions</h4>
          <div style="max-height: 300px; overflow-y: auto; background: var(--bg-tertiary); border-radius: var(--radius-lg); padding: var(--space-2);">
            ${allFunctions.map(f => `
              <div style="display: flex; align-items: center; gap: var(--space-3); padding: var(--space-2); border-bottom: 1px solid var(--border-secondary);">
                <input type="checkbox" class="cust-action-check" value="${f.id}" data-label="${f.title}">
                <span style="font-size: var(--font-size-lg);">${f.icon}</span>
                <span style="color: var(--text-primary); font-size: var(--font-size-sm);">${f.title}</span>
              </div>
            `).join('')}
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-glass" onclick="showAutomationBuilder()">Cancel</button>
          <button class="btn btn-primary" onclick="saveCustomRoutine()">Save Routine</button>
        </div>
      </div>
    </div>
  `;
}

function saveCustomRoutine() {
  const name = document.getElementById('custRoutineName').value || 'Custom Routine';
  const icon = document.getElementById('custRoutineIcon').value;
  const checks = document.querySelectorAll('.cust-action-check:checked');

  if (checks.length === 0) {
    showToast('Error', 'Please select at least one action', 'error');
    return;
  }

  const actions = Array.from(checks).map(c => ({
    function: c.value,
    label: c.dataset.label
  }));

  const routine = {
    id: `custom_${Date.now()}`,
    name: name,
    description: 'User created custom automation',
    icon: icon,
    triggers: [{ type: 'manual' }],
    actions: actions,
    enabled: true,
    created: new Date().toISOString()
  };

  automationState.routines.push(routine);
  showToast('Saved', `Routine "${name}" created!`, 'success');
  showAutomationBuilder();
}

// Override the openAutomationBuilder function from app.js
window.openAutomationBuilder = function () {
  showAutomationBuilder();
};

// Utility: Haversine distance in meters
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371e3;
  const φ1 = lat1 * Math.PI / 180;
  const φ2 = lat2 * Math.PI / 180;
  const Δφ = (lat2 - lat1) * Math.PI / 180;
  const Δλ = (lon2 - lon1) * Math.PI / 180;

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) *
    Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

function showAIRoutineGenerator() {
  const modalContainer = document.getElementById('modalContainer');
  if (!modalContainer) return;

  modalContainer.innerHTML = `
    <div class="modal-overlay active" onclick="closeModal(event)">
      <div class="modal" onclick="event.stopPropagation()" style="max-width: 500px;">
        <div class="modal-header">
          <h2 class="modal-title">🧠 AI Routine Designer</h2>
          <button class="modal-close" onclick="closeModal()">&times;</button>
        </div>
        <div class="modal-body">
          <p style="color: var(--text-secondary); margin-bottom: var(--space-6);">
            Describe what you want your assistant to do automatically.
          </p>
          
          <textarea id="aiRoutinePrompt" class="input" placeholder="e.g. When I get home, turn on the lights, send a message to my wife, and play some jazz music." style="width: 100%; height: 120px; margin-bottom: var(--space-4); resize: none;"></textarea>
          
          <div id="aiGenStatus" style="font-size: 12px; color: var(--color-accent-400); font-family: var(--font-family-mono); display: none;">
            GEN_ENGINE: ANALYZING_REQUEST...
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-glass" onclick="showAutomationBuilder()">Back</button>
          <button id="aiGenBtn" class="btn btn-primary" onclick="generateRoutineWithAI()">Generate Logic</button>
        </div>
      </div>
    </div>
  `;
}

async function generateRoutineWithAI() {
  const prompt = document.getElementById('aiRoutinePrompt').value.trim();
  const btn = document.getElementById('aiGenBtn');
  const status = document.getElementById('aiGenStatus');

  if (!prompt) {
    showToast('Input Required', 'Please describe your routine', 'warning');
    return;
  }

  btn.disabled = true;
  btn.textContent = 'Thinking...';
  status.style.display = 'block';

  try {
    let routine = null;

    if (window.openaiHandler && localStorage.getItem('openai_api_key')) {
      const aiPrompt = `You are an automation expert. Based on this request: "${prompt}", generate a JSON routine object for a mobile AI assistant.
        The format MUST be:
        {
          "name": "Short Name",
          "description": "Short Description",
          "icon": "Emoji",
          "triggers": [{"type": "time|location|manual", "value": "value"}],
          "actions": [{"function": "function_id", "label": "UI Label"}]
        }
        Return ONLY the JSON.`;

      const response = await window.openaiHandler.handlePrompt(aiPrompt);
      const text = response.text;

      // Try to parse JSON from response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        routine = JSON.parse(jsonMatch[0]);
      }
    }

    // Heuristic fallback if AI fails or No Key
    if (!routine) {
      await new Promise(r => setTimeout(r, 2000));
      routine = {
        id: `ai_${Date.now()}`,
        name: prompt.substring(0, 20) + '...',
        description: `Generated from: ${prompt}`,
        icon: '🤖',
        triggers: [{ type: 'manual' }],
        actions: [
          { function: 'smart_suggestions', label: 'Analyze context' },
          { function: 'notification_ping', label: 'System Alert' }
        ],
        enabled: true,
        created: new Date().toISOString()
      };
    } else {
      routine.id = `ai_${Date.now()}`;
      routine.enabled = true;
      routine.created = new Date().toISOString();
    }

    automationState.routines.push(routine);
    saveRoutines();

    showToast('Success', 'AI generated your routine!', 'success');
    showAutomationBuilder();

  } catch (error) {
    console.error('AI Gen Error:', error);
    showToast('Protocol Error', 'Failed to generate logic', 'error');
  } finally {
    btn.disabled = false;
    btn.textContent = 'Generate Logic';
    status.style.display = 'none';
  }
}

// Export functions for global access
window.getAutomationTemplates = getAutomationTemplates;
window.createFromTemplate = createFromTemplate;
window.executeRoutine = executeRoutine;
window.showRoutineDetails = showRoutineDetails;
window.toggleRoutine = toggleRoutine;
window.showAutomationBuilder = showAutomationBuilder;
window.showAIRoutineGenerator = showAIRoutineGenerator;
window.generateRoutineWithAI = generateRoutineWithAI;

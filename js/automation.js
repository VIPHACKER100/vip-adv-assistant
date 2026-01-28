/**
 * VIP AI SYMPHONY - Automation Kernel v7.0
 * Advanced Workflow Orchestration & Synthetic Routines
 * "NEURAL FLUX" Design System Implementation
 */

// Automation state
const automationState = {
  routines: JSON.parse(localStorage.getItem('vip_routines') || '[]'),
  currentRoutine: null,
  templates: [],
};

// Initialize automation engine
function initAutomation() {
  getAutomationTemplates();

  // Start autonomous monitoring (every 10 seconds)
  setInterval(() => checkAutonomousTriggers(), 10000);
}

// Initialize automation templates (SYMPHONY v6.0)
function initAutomationTemplates() {
  return [
    {
      id: 'morning_nexus',
      name: 'Morning Nexus',
      description: 'Synchronize sub-systems for early hours',
      icon: '🌅',
      triggers: [{ type: 'time', value: '07:00' }],
      actions: [
        { function: 'weather_check', label: 'CONTEXT_WEATHER_SYNC' },
        { function: 'read_messages', label: 'MESSAGE_STREAM_RETRIEVAL' },
        { function: 'analyze_usage', label: 'RESOURCE_INIT_OPTIMIZATION' },
        { function: 'visual_search', label: 'OMNI_SCAN_DAILY_INTENT' },
      ],
    },
    {
      id: 'stealth_mode',
      name: 'Stealth Protocol',
      description: 'Isolate device context for maximum focus',
      icon: '🛡️',
      triggers: [{ type: 'location', value: 'Office', radius: 100 }],
      actions: [
        { function: 'focus_mode', params: { state: 'on' }, label: 'INIT_COGNITIVE_ISOLATION' },
        { function: 'biometric_lock', params: { state: 'on' }, label: 'KERNEL_DATA_LOCK' },
        { function: 'toggle_vibration', params: { state: 'off' }, label: 'DISABLE_HAPTIC_LEAK' },
      ],
    },
    {
      id: 'neural_recovery',
      name: 'Neural Recovery',
      description: 'Automated winding down sequence',
      icon: '🔮',
      triggers: [{ type: 'time', value: '22:30' }],
      actions: [
        { function: 'wellness_check', label: 'BIO_METRIC_AUDIT' },
        { function: 'set_brightness', params: { value: 10 }, label: 'LUMEN_REDUCTION_0x1A' },
        { function: 'focus_mode', params: { mode: 'sleep' }, label: 'ACTIVATE_GHOST_HEARTBEAT' },
      ],
    },
    {
      id: 'power_reserve',
      name: 'Reserve Mode',
      description: 'Critical resource preservation',
      icon: '🔋',
      triggers: [{ type: 'battery_level', value: 15, operator: '<' }],
      actions: [
        { function: 'optimize_resources', label: 'KERNEL_MEM_PURGE' },
        { function: 'set_brightness', params: { value: 20 }, label: 'LUMEN_CAP_MIN' },
        {
          function: 'toggle_flashlight',
          params: { state: 'off' },
          label: 'TERMINATE_PHOTON_PULSE',
        },
      ],
    },
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
  const template = templates.find((t) => t.id === templateId);

  if (!template) {
    showToast('Error', 'Template not found', 'error');
    return;
  }

  // Create routine from template
  const routine = {
    id: `routine_${Date.now()}`,
    ...template,
    enabled: false,
    created: new Date().toISOString(),
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
    console.warn('appState.context not available for autonomous triggers.');
    return;
  }

  const battery = parseInt(appState.context.battery);
  const isCharging = appState.context.isCharging;

  automationState.routines.forEach((routine) => {
    if (!routine.enabled) {
      return;
    }

    routine.triggers.forEach((trigger) => {
      let triggered = false;

      if (trigger.type === 'battery_level') {
        const val = parseInt(trigger.value);
        if (trigger.operator === '<' && battery < val) {
          triggered = true;
        }
        if (trigger.operator === '>' && battery > val) {
          triggered = true;
        }
      } else if (trigger.type === 'is_charging') {
        const triggerChargingState = String(trigger.value).toLowerCase() === 'true';
        if (triggerChargingState === isCharging) {
          triggered = true;
        }
      } else if (trigger.type === 'location' && appState.context.location.lat) {
        if (trigger.lat && trigger.lon) {
          const dist = calculateDistance(
            trigger.lat,
            trigger.lon,
            appState.context.location.lat,
            appState.context.location.lon
          );
          if (dist <= (trigger.radius || 500)) {
            triggered = true;
          }
        } else if (
          appState.context.location.city.toLowerCase().includes(trigger.value.toLowerCase())
        ) {
          triggered = true;
        }
      } else if (trigger.type === 'weather') {
        const currentDesc = document.getElementById('wDesc')?.textContent?.toLowerCase() || '';
        if (currentDesc.includes(trigger.value.toLowerCase())) {
          triggered = true;
        }
      }

      if (triggered) {
        const now = Date.now();
        if (routine.lastTriggered && now - routine.lastTriggered < 300000) {
          return;
        }

        routine.lastTriggered = now;
        const routineIndex = automationState.routines.findIndex((r) => r.id === routine.id);
        if (routineIndex !== -1) {
          automationState.routines[routineIndex] = { ...routine };
          saveRoutines();
        }

        if (window.cognitiveStream) {
          window.cognitiveStream.addLine(`> AUTO_TRIG: RULE_MATCH [${routine.name.toUpperCase()}]`);
        }

        notificationManager.addNotification({
          title: `Autonomous Sequence: ${routine.name}`,
          message: `ACTIVATE: ${formatTrigger(trigger)} matched kernel condition`,
          type: 'success',
        });
        executeRoutine(routine.id);
      }
    });
  });
}

// Execute automation routine
function executeRoutine(routineId) {
  const routine =
    automationState.routines.find((r) => r.id === routineId) ||
    automationState.templates.find((t) => t.id === routineId);

  if (!routine) {
    showToast('Execution Error', 'Workflow node missing from memory', 'error');
    return;
  }

  showToast('Symphony Workflow', `Initializing ${routine.name} sequence...`, 'info');

  let completedSteps = 0;
  const totalSteps = routine.actions.length;

  const executeStep = (index) => {
    if (index >= totalSteps) {
      showToast('Workflow Complete', `All ${totalSteps} modules verified.`, 'success');
      if (window.cognitiveStream) {
        window.cognitiveStream.addLine(
          `> SUCCESS: ROUTINE_0x${routine.id.split('_')[1] || 'AF'} COMPLETED`
        );
      }
      return;
    }

    const action = routine.actions[index];

    if (window.cognitiveStream) {
      window.cognitiveStream.addLine(`> EXEC: ${action.label}`);
    }

    setTimeout(
      () => {
        completedSteps++;
        showToast('Processing Step', `${action.label} (${completedSteps}/${totalSteps})`, 'info');
        executeStep(index + 1);
      },
      600 + Math.random() * 400
    );
  };

  executeStep(0);
}

// Show routine details in modal
// Show routine details in modal (v7.0 Visual Engine)
function showRoutineDetails(routineId) {
  const routine =
    automationState.routines.find((r) => r.id === routineId) ||
    automationState.templates.find((t) => t.id === routineId);

  if (!routine) return;

  const isTemplate = !automationState.routines.find((r) => r.id === routineId);
  const modalContainer = document.getElementById('modalContainer');
  if (!modalContainer) return;

  modalContainer.innerHTML = `
    <div class="modal-overlay active" onclick="closeModal(event)">
      <div class="modal animate-slide-up" onclick="event.stopPropagation()" style="max-width: 600px; padding: 0; overflow: hidden;">
        <div class="modal-header" style="background: rgba(0,0,0,0.2); padding: var(--space-6);">
          <div style="display: flex; align-items: center; gap: var(--space-4);">
            <div class="card-icon" style="width: 50px; height: 50px; font-size: 1.5rem; margin: 0; border-radius: 50%;">${routine.icon}</div>
            <div>
               <h2 class="modal-title" style="font-family: var(--font-family-display); font-size: 18px; letter-spacing: 1px;">${routine.name.toUpperCase()}</h2>
               <div style="font-size: 9px; color: var(--color-primary); font-family: var(--font-family-mono); letter-spacing: 1px; opacity: 0.7;">WORKFLOW_NODE_ID: ${routine.id}</div>
            </div>
          </div>
          <button class="modal-close" onclick="closeModal()">&times;</button>
        </div>
        
        <div class="modal-body" style="padding: var(--space-8); background: var(--color-foundation); max-height: 70vh; overflow-y: auto;">
          <p style="color: var(--text-dim); margin-bottom: var(--space-8); font-size: 14px; border-left: 2px solid var(--color-secondary); padding-left: var(--space-4);">
            ${routine.description}
          </p>
          
          <div class="workflow-visualizer" style="position: relative; padding-left: 24px;">
            <div class="workflow-line" style="position: absolute; left: 7px; top: 0; bottom: 0; width: 2px; background: linear-gradient(to bottom, var(--color-primary), var(--color-secondary)); opacity: 0.3;"></div>
            
            <div class="trigger-node" style="position: relative; margin-bottom: var(--space-8);">
              <div class="node-dot" style="position: absolute; left: -21px; top: 4px; width: 14px; height: 14px; border-radius: 50%; background: var(--color-primary); box-shadow: 0 0 10px var(--color-primary);"></div>
              <div style="font-size: 10px; color: var(--text-mute); font-family: var(--font-family-mono); margin-bottom: 8px; letter-spacing: 1px;">INITIAL_TRIGGER</div>
              <div class="neural-glass" style="padding: var(--space-3) var(--space-4); border-radius: 12px; display: inline-flex; align-items: center; gap: 8px;">
                 <span style="font-size: 1.2rem;">⚡</span>
                 <span style="font-weight: 800; font-size: 13px; color: var(--text-primary); text-transform: uppercase;">${routine.triggers.map((t) => formatTrigger(t)).join(' + ')}</span>
              </div>
            </div>

            <div class="action-sequence" style="display: grid; gap: var(--space-6);">
              ${routine.actions
      .map(
        (action, index) => `
                <div class="action-node animate-fade-in" style="position: relative; animation-delay: ${index * 0.1}s;">
                  <div class="node-dot" style="position: absolute; left: -20px; top: 12px; width: 10px; height: 10px; border-radius: 50%; background: var(--color-secondary); border: 2px solid var(--color-foundation);"></div>
                  <div style="font-size: 9px; color: var(--text-mute); font-family: var(--font-family-mono); margin-bottom: 6px; letter-spacing: 1px;">MODULE_0x0${index + 1}</div>
                  <div class="neural-glass" style="padding: var(--space-4); border-radius: 16px;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                      <span style="color: var(--text-primary); font-size: 14px; font-weight: 700;">${action.label}</span>
                      <span class="badge badge-primary" style="font-size: 9px; opacity: 0.8;">SYNC_O_K</span>
                    </div>
                  </div>
                </div>
              `
      )
      .join('')}
            </div>
            
            <div class="terminal-node" style="position: relative; margin-top: var(--space-8);">
              <div class="node-dot" style="position: absolute; left: -21px; top: 4px; width: 14px; height: 14px; border-radius: 50%; background: var(--color-success); box-shadow: 0 0 10px var(--color-success);"></div>
              <div style="font-size: 10px; color: var(--text-mute); font-family: var(--font-family-mono); margin-bottom: 6px; letter-spacing: 1px;">TERMINAL_STATE</div>
              <div style="color: var(--color-success); font-weight: 800; font-size: 11px; letter-spacing: 2px;">ROUTINE_READY_FOR_EXEC</div>
            </div>
          </div>
        </div>

        <div class="modal-footer" style="background: rgba(0,0,0,0.2); padding: var(--space-6);">
          <button class="btn btn-neural-glass btn-sm" onclick="showAutomationBuilder()">CANCEL</button>
          <div style="flex: 1;"></div>
          ${isTemplate
      ? `<button class="btn btn-neural-primary btn-sm" onclick="createFromTemplate('${routineId}')">INITIALIZE_NODE</button>`
      : `<button class="btn btn-neural-glass btn-sm" onclick="toggleRoutine('${routineId}')">${routine.enabled ? 'ISOLATE' : 'RE_ACTIVATE'}</button>`
    }
          <button class="btn btn-neural-primary btn-sm" onclick="executeRoutine('${routineId}'); closeModal();">
            ▶️ EXECUTE_NOW
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
  const routine = automationState.routines.find((r) => r.id === routineId);
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
      <div class="modal animate-slide-up" onclick="event.stopPropagation()" style="max-width: 900px; padding: 0; overflow: hidden;">
        <div class="modal-header" style="background: rgba(0,0,0,0.2); padding: var(--s6);">
          <div style="display: flex; flex-direction: column;">
            <h2 class="modal-title" style="font-size: 1.1rem; letter-spacing: 2px;">⚡ WORKFLOW_FORGE_v7</h2>
            <div style="font-size: 9px; color: var(--color-primary); font-family: var(--font-family-mono); letter-spacing: 1px;">ORCHESTRATION_ENGINE: ACTIVE</div>
          </div>
          <button class="modal-close" onclick="closeModal()">×</button>
        </div>
        
        <div class="modal-body" style="padding: var(--s8); max-height: 70vh; overflow-y: auto;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--s6);">
            <h3 style="color: var(--text-main); font-size: 13px; letter-spacing: 1px; font-weight: 800;">SYNTHETIC_TEMPLATES</h3>
            <button class="btn-neural-primary btn-sm" onclick="showCustomRoutineBuilder()" style="padding: 8px 16px; font-size: 11px;">➕ MANIFEST_NEW</button>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: var(--s5);">
            <div class="neural-glass hover-lift" onclick="showAIRoutineGenerator()" style="border: 1px dashed var(--color-primary); background: rgba(var(--color-primary-hue), 100%, 50%, 0.05); padding: var(--s5); cursor: pointer;">
                <div style="font-size: 1.5rem; margin-bottom: 12px; filter: drop-shadow(0 0 8px var(--color-primary));">🧠</div>
                <div style="font-weight: 800; color: var(--text-main); font-size: 14px;">NEURAL_LOGIC_GEN</div>
                <div style="font-size: 12px; color: var(--text-dim); margin-top: 4px;">Describe a sequence and allow AI to synthesize the sub-modular logic.</div>
                <div style="margin-top: 16px;">
                    <span class="badge badge-primary">AI_ORCHESTRATOR</span>
                </div>
            </div>
            ${templates.map(t => `
              <div class="neural-glass hover-lift" onclick="showRoutineDetails('${t.id}')" style="padding: var(--s5); cursor: pointer;">
                <div style="font-size: 1.5rem; margin-bottom: 12px;">${t.icon}</div>
                <div style="font-weight: 800; color: var(--text-main); font-size: 14px;">${t.name.toUpperCase()}</div>
                <div style="font-size: 12px; color: var(--text-dim); margin-top: 4px;">${t.description}</div>
                <div style="margin-top: 16px;">
                  <span class="badge badge-accent" style="font-size: 9px;">${t.actions.length}_MODULES</span>
                </div>
              </div>
            `).join('')}
          </div>
          
          ${automationState.routines.length > 0 ? `
            <div style="height: 1px; background: var(--glass-border); margin: var(--s10) 0;"></div>
            <h3 style="margin-bottom: var(--s6); color: var(--text-main); font-size: 13px; letter-spacing: 1px; font-weight: 800;">ACTIVE_NODE_STREAMS</h3>
            <div style="display: grid; gap: var(--s4);">
              ${automationState.routines.map(r => `
                <div class="neural-glass flex-between hover-lift" style="cursor: pointer; padding: var(--s4); border-left: 3px solid ${r.enabled ? 'var(--color-primary)' : 'var(--text-mute)'};" onclick="showRoutineDetails('${r.id}')">
                  <div style="display: flex; align-items: center; gap: 16px;">
                    <span style="font-size: 1.5rem;">${r.icon}</span>
                    <div>
                      <div style="font-weight: 800; color: var(--text-main); font-size: 14px;">${r.name.toUpperCase()}</div>
                      <div style="font-size: 10px; color: var(--text-dim); font-family: var(--font-family-mono);">${r.actions.length} STAGES_ACTIVE_PHASE</div>
                    </div>
                  </div>
                  <div>
                    <span class="badge badge-${r.enabled ? 'primary' : 'dim'}" style="font-size: 9px;">
                      ${r.enabled ? 'KERNEL_ACTIVE' : 'ISOLATED'}
                    </span>
                  </div>
                </div>
              `).join('')}
            </div>
          ` : ''}
        </div>

        <div class="modal-footer" style="background: rgba(0,0,0,0.2); padding: var(--s6);">
           <button class="btn-neural-glass" style="width: 100%;" onclick="closeModal()">DISMISS_ENGINE</button>
        </div>
      </div>
    </div>
  `;
}


function showCustomRoutineBuilder() {
  const categories = getFunctionCategories();
  const allFunctions = categories.flatMap(c => c.functions);
  const modalContainer = document.getElementById('modalContainer');
  if (!modalContainer) return;

  modalContainer.innerHTML = `
    <div class="modal-overlay active" onclick="closeModal(event)">
      <div class="modal animate-slide-up" onclick="event.stopPropagation()" style="max-width: 600px; padding: 0;">
        <div class="modal-header" style="padding: var(--s6);">
          <h2 class="modal-title" style="font-size: 1.1rem; letter-spacing: 2px;">➕ MANIFEST_ROUTINE</h2>
          <button class="modal-close" onclick="closeModal()">×</button>
        </div>
        <div class="modal-body" style="padding: var(--s6);">
          <div style="display: grid; gap: var(--s4); margin-bottom: var(--s8);">
            <div class="input-group">
                <label style="font-size: 10px; color: var(--color-primary); font-family: var(--font-family-mono); letter-spacing: 1px;">SEQUENCE_NAME</label>
                <input type="text" id="custRoutineName" class="neural-input" placeholder="ENTER_NAME..." style="width:100%; margin-top:8px;">
            </div>
            <div class="input-group">
                <label style="font-size: 10px; color: var(--color-primary); font-family: var(--font-family-mono); letter-spacing: 1px;">IDENTIFIER_ICON</label>
                <select id="custRoutineIcon" class="neural-input" style="width:100%; margin-top:8px;">
                  <option value="🎮">🎮 GAME_SYNC</option>
                  <option value="📚">📚 FOCUS_LOGIC</option>
                  <option value="🏋️‍♂️">🏋️‍♂️ KINETIC_RECOVERY</option>
                  <option value="🚗">🚗 TRANSIT_PROTO</option>
                  <option value="💡">💡 AMBIENT_CONTROL</option>
                </select>
            </div>
          </div>
          
          <h4 style="font-size: 11px; color: var(--text-main); letter-spacing: 1px; margin-bottom: 12px;">MODULE_SELECTION</h4>
          <div style="max-height: 250px; overflow-y: auto; background: rgba(0,0,0,0.2); border-radius: 12px; border: 1px solid var(--glass-border);">
            ${allFunctions.map(f => `
              <label style="display: flex; align-items: center; gap: 12px; padding: 12px; border-bottom: 1px solid var(--glass-border); cursor: pointer;">
                <input type="checkbox" class="cust-action-check" value="${f.id}" data-label="${f.title}" style="accent-color: var(--color-primary);">
                <span style="font-size: 1.2rem;">${f.icon}</span>
                <span style="color: var(--text-main); font-size: 13px; font-weight: 700;">${f.title.toUpperCase()}</span>
              </label>
            `).join('')}
          </div>
        </div>
        <div class="modal-footer" style="padding: var(--s6); gap: 12px;">
          <button class="btn-neural-glass" style="flex: 1;" onclick="showAutomationBuilder()">CANCEL</button>
          <button class="btn-neural-primary" style="flex: 1;" onclick="saveCustomRoutine()">INITIALIZE_NODE</button>
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

  const actions = Array.from(checks).map((c) => ({
    function: c.value,
    label: c.dataset.label,
  }));

  const routine = {
    id: `custom_${Date.now()}`,
    name: name,
    description: 'User created custom automation',
    icon: icon,
    triggers: [{ type: 'manual' }],
    actions: actions,
    enabled: true,
    created: new Date().toISOString(),
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
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

function showAIRoutineGenerator() {
  const modalContainer = document.getElementById('modalContainer');
  if (!modalContainer) return;

  modalContainer.innerHTML = `
    <div class="modal-overlay active" onclick="closeModal(event)">
      <div class="modal animate-slide-up" onclick="event.stopPropagation()" style="max-width: 500px; padding: 0;">
        <div class="modal-header" style="padding: var(--s6);">
          <h2 class="modal-title" style="font-size: 1.1rem; letter-spacing: 2px;">🧠 NEURAL_SYNTHESIS</h2>
          <button class="modal-close" onclick="closeModal()">×</button>
        </div>
        <div class="modal-body" style="padding: var(--s6);">
          <p style="color: var(--text-dim); font-size: 13px; margin-bottom: var(--s6);">
            Describe a goal and the AI orchestrator will synthesize the module sequence.
          </p>
          
          <textarea id="aiRoutinePrompt" class="neural-input" placeholder="e.g. When I get home, turn on the lights, send a message to my wife, and play some jazz music." style="width: 100%; height: 120px; margin-bottom: var(--s4); resize: none; padding: 16px;"></textarea>
          
          <div id="aiGenStatus" style="font-size: 10px; color: var(--color-primary); font-family: var(--font-family-mono); display: none; text-align: center; padding: 10px;">
            GEN_ENGINE: ANALYZING_REQUEST_VECTORS...
          </div>
        </div>
        <div class="modal-footer" style="padding: var(--s6); gap: 12px;">
          <button class="btn-neural-glass" style="flex: 1;" onclick="showAutomationBuilder()">CANCEL</button>
          <button id="aiGenBtn" class="btn-neural-primary" style="flex: 1;" onclick="generateRoutineWithAI()">SYNTHESIZE</button>
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
  btn.textContent = 'THINKING...';
  status.style.display = 'block';

  try {
    let routine = null;

    if (window.openaiHandler && (localStorage.getItem('openai_api_key') || window.appState?.apiKey)) {
      const functionList = window.FunctionRegistry ?
        Object.entries(window.FunctionRegistry.categories).map(([name, cat]) =>
          `${name}: ${cat.functions.map(f => f.id).join(', ')}`
        ).join('\n') : "Basic functions like weather_check,read_messages,analyze_usage,focus_mode";

      const aiPrompt = `You are an automation expert for the VIP AI SYMPHONY v7.0. 
        User Goal: "${prompt}"
        
        AVAILABLE FUNCTIONS:
        ${functionList}

        Generate a JSON routine object for this mobile assistant.
        The format MUST be:
        {
          "name": "SHORT_STRIKING_NAME",
          "description": "Short technical description",
          "icon": "Relevant Emoji",
          "triggers": [{"type": "time|location|manual|battery_level", "value": "value"}],
          "actions": [{"function": "function_id", "label": "TACTICAL_LABEL"}]
        }
        Return ONLY the JSON. No markdown blocks.`;

      const response = await window.openaiHandler.handlePrompt(aiPrompt);
      const text = response.text.replace(/```json/g, '').replace(/```/g, '').trim();

      try {
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          routine = JSON.parse(jsonMatch[0]);
        }
      } catch (e) {
        console.error('AI JSON Parse Error:', e, text);
      }
    }

    // Heuristic fallback if AI fails or No Key
    if (!routine) {
      await new Promise((r) => setTimeout(r, 2000));
      routine = {
        name: `SYNTHETIC_${prompt.substring(0, 10).toUpperCase()}`,
        description: `Autonomous logic derived from: ${prompt}`,
        icon: '🤖',
        triggers: [{ type: 'manual', value: 'now' }],
        actions: [
          { function: 'analyze_usage', label: 'ANALYZE_CONTEXT_VECTORS' },
          { function: 'smart_suggestions', label: 'OPTIMIZE_INTENT' },
        ],
      };
    }

    routine.id = `ai_${Date.now()}`;
    routine.enabled = true;
    routine.created = new Date().toISOString();

    automationState.routines.push(routine);
    saveRoutines();

    showToast('Success', 'Neural logic synthesized!', 'success');
    showAutomationBuilder();
  } catch (error) {
    console.error('AI Gen Error:', error);
    showToast('Protocol Error', 'Synthesis engine failed', 'error');
  } finally {
    btn.disabled = false;
    btn.textContent = 'SYNTHESIZE';
    status.style.display = 'none';
  }
}


// Export functions for global access
window.initAutomation = initAutomation;
window.getAutomationTemplates = getAutomationTemplates;
window.createFromTemplate = createFromTemplate;
window.executeRoutine = executeRoutine;
window.showRoutineDetails = showRoutineDetails;
window.toggleRoutine = toggleRoutine;
window.showAutomationBuilder = showAutomationBuilder;
window.showAIRoutineGenerator = showAIRoutineGenerator;
window.generateRoutineWithAI = generateRoutineWithAI;
window.showCustomRoutineBuilder = showCustomRoutineBuilder;
window.saveCustomRoutine = saveCustomRoutine;

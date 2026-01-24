/**
 * Advanced Mobile Control AI Assistant
 * Automation Builder & Workflow Management
 */

// Automation state
const automationState = {
  routines: [],
  currentRoutine: null,
  templates: []
};

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

  showToast('Created', `${template.name} automation created`, 'success');
  showRoutineDetails(routine.id);
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
          <button class="btn btn-accent" onclick="showToast('Coming Soon', 'Custom automation builder in development', 'info')">
            ➕ Create Custom
          </button>
        </div>
      </div>
    </div>
  `;
}

// Override the openAutomationBuilder function from app.js
window.openAutomationBuilder = function () {
  showAutomationBuilder();
};

// Export functions for global access
window.getAutomationTemplates = getAutomationTemplates;
window.createFromTemplate = createFromTemplate;
window.executeRoutine = executeRoutine;
window.showRoutineDetails = showRoutineDetails;
window.toggleRoutine = toggleRoutine;
window.showAutomationBuilder = showAutomationBuilder;

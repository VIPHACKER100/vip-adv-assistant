/**
 * VIP AI Assistant - About Panel Module
 * Version History, Credits, and Legal
 */

const aboutData = {
  version: '7.0.0',
  codename: 'NEURAL FLUX [PLATINUM]',
  releaseDate: '2026-01-28',
  developer: 'VIPHACKER100',
  engine: 'SYMPHONY KERNEL v7.0_GENESIS',
  contributors: [
    'DeepMind Antigravity AI Agent',
    'OpenAI GPT-4o-mini',
    'Vanilla Web Infrastructure',
  ],
  legal: 'SYMPHONY OS - NEURAL FLUX RESEARCH BUILD. PROPRIETARY PATHWAYS VERIFIED.',
};

function showAboutModal() {
  const modalContainer = document.getElementById('modalContainer');
  if (!modalContainer) return;

  modalContainer.innerHTML = `
    <div class="modal-overlay active" onclick="closeModal(event)">
      <div class="modal animate-slide-up" style="max-width: 500px; padding: 0; overflow: hidden; border: 1px solid var(--color-primary-glow);">
        <div class="modal-header" style="background: rgba(0,0,0,0.3); padding: var(--s6);">
          <div style="display: flex; flex-direction: column;">
            <h2 class="modal-title" style="font-size: 1.1rem; letter-spacing: 2px;">💎 SYSTEM_GEN_INFO_v7.0</h2>
            <div style="font-size: 9px; color: var(--color-primary); font-family: var(--font-family-mono); letter-spacing: 1px;">NODE: VERIFIED_PLATINUM</div>
          </div>
          <button class="modal-close" onclick="closeModal()">×</button>
        </div>

        <div class="modal-body" style="padding: var(--s8); background: var(--color-foundation); text-align: center;">
          <div class="neural-glass" style="width: 100px; height: 100px; margin: 0 auto var(--s6); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 3rem; text-shadow: 0 0 20px var(--color-primary);">⚡</div>
          
          <h3 class="font-display" style="font-size: 1.5rem; margin-bottom: 4px;">VIP Assistant v${aboutData.version}</h3>
          <div style="font-size: 10px; font-weight: 800; color: var(--color-primary); letter-spacing: 3px; margin-bottom: var(--s8);">${aboutData.codename}</div>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: var(--s8);">
            <div class="neural-glass" style="padding: 12px;">
              <div style="font-size: 8px; color: var(--text-mute); letter-spacing: 1px; margin-bottom: 4px;">KERNEL_STRAT</div>
              <div style="font-size: 11px; font-weight: 800;">${aboutData.engine}</div>
            </div>
            <div class="neural-glass" style="padding: 12px;">
              <div style="font-size: 8px; color: var(--text-mute); letter-spacing: 1px; margin-bottom: 4px;">BUILD_DATE</div>
              <div style="font-size: 11px; font-weight: 800;">${aboutData.releaseDate}</div>
            </div>
          </div>

          <div style="text-align: left; background: rgba(0,0,0,0.2); padding: 16px; border-radius: 12px; border-left: 2px solid var(--color-primary);">
            <div style="font-size: 9px; color: var(--color-primary); font-family: var(--font-family-mono); margin-bottom: 8px;">CORE_CONTRIBUTORS::</div>
            <div style="font-size: 12px; color: var(--text-dim); line-height: 1.8;">
              ${aboutData.contributors.map(c => `• ${c}`).join('<br>')}
            </div>
          </div>

          <div style="margin-top: var(--s8); font-size: 10px; color: var(--text-mute); font-family: var(--font-family-mono); line-height: 1.5;">
            ${aboutData.legal}
          </div>
        </div>

        <div class="modal-footer" style="padding: var(--s6); background: rgba(0,0,0,0.2); gap: 12px;">
          <button class="btn-neural-glass" style="flex: 1;" onclick="window.open('https://github.com/viphacker100', '_blank')">SOURCE</button>
          <button class="btn-neural-primary" style="flex: 1;" onclick="closeModal()">DISMISS</button>
        </div>
      </div>
    </div>
  `;
}


window.showAboutModal = showAboutModal;

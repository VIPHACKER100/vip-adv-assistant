/**
 * VIP AI Assistant - About Panel Module
 * Version History, Credits, and Legal
 */

const aboutData = {
  version: '6.0.0',
  codename: 'SYMPHONY PLATINUM',
  releaseDate: '2026-01-25',
  developer: 'VipHacker100',
  engine: 'Symphony Kernel v6.0',
  contributors: [
    'DeepMind Antigravity AI Agent',
    'OpenAI GPT-4o-mini',
    'Vanilla Web Infrastructure',
  ],
  legal: 'SYMPHONY OS - Proprietary Research Build. All neural pathways verified.',
};

function showAboutModal() {
  const modalContainer = document.getElementById('modalContainer');
  if (!modalContainer) {
    return;
  }

  modalContainer.innerHTML = `
    <div class="modal-overlay active" onclick="closeModal(event)">
      <div class="modal modal-about" onclick="event.stopPropagation()">
        <div class="modal-header" style="background: rgba(0,0,0,0.1); padding: var(--space-5);">
          <h2 class="modal-title" style="font-family: var(--font-family-display); font-size: 16px; letter-spacing: 1px;">💎 SYSTEM_GEN_INFO_v6.0</h2>
          <button class="modal-close" onclick="closeModal()">×</button>
        </div>
        <div class="modal-body text-center">
          <img src="assets/logo.png" alt="VIP AI" class="about-logo animate-glow">
          <h3 class="font-display" style="font-size: 1.5rem; margin: var(--space-4) 0 0;">VIP Assistant v${aboutData.version}</h3>
          <div class="badge badge-accent" style="margin-bottom: var(--space-6);">${aboutData.codename}</div>
          
          <div class="about-stats-grid">
            <div class="about-stat-item">
              <span class="label">ENGINE</span>
              <span class="value">${aboutData.engine}</span>
            </div>
            <div class="about-stat-item">
              <span class="label">RELEASE</span>
              <span class="value">${aboutData.releaseDate}</span>
            </div>
          </div>

          <div class="about-section">
            <h4>👨‍💻 Lead Developer</h4>
            <p>${aboutData.developer}</p>
          </div>

          <div class="about-section">
            <h4>🤝 Core Contributors</h4>
            <ul class="list-none" style="padding: 0; font-size: 14px; opacity: 0.8;">
              ${aboutData.contributors.map((c) => `<li>${c}</li>`).join('')}
            </ul>
          </div>

          <div class="about-footer-note" style="margin-top: 15px;">
            ${aboutData.legal}
            <div style="margin-top: 10px;">
              <a href="V6.1_QUICK_START.md" target="_blank" style="color: var(--color-accent-400); font-size: 12px; text-decoration: underline;">Open Quick Start Guide</a>
            </div>
          </div>
        </div>
        <div class="modal-footer" style="justify-content: center;">
          <button class="btn btn-primary" onclick="window.open('https://github.com/viphacker100/vip-adv-assistant', '_blank')">GitHub Repository</button>
          <button class="btn btn-glass" onclick="closeModal()">Close Panel</button>
        </div>
      </div>
    </div>
  `;
}

window.showAboutModal = showAboutModal;

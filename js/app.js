// MESER ICU MASTER - Main Application Controller
class ICUApp {
  constructor() {
    this.currentView = 'simulator-view';
  }

  init() {
    this.setupNavigation();
    this.setupAudioToggle();

    // Initialize modules
    if (window.icuMonitor) window.icuMonitor.init();
    if (window.icuSimulator) window.icuSimulator.init();
    if (window.actorStation) window.actorStation.init();
    if (window.promptDecoder) window.promptDecoder.init();
    if (window.protocolsView) {
      window.protocolsView.init();
      window.protocolsView.calculateAbg();
    }
    if (window.sbarArena) window.sbarArena.init();
    if (window.briefingManager) window.briefingManager.init();

    // Decision tabs inside the simulator
    this.setupDecisionTabs();
  }

  setupNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const targetView = btn.dataset.view;
        this.switchView(targetView);
      });
    });
  }

  switchView(viewId) {
    this.currentView = viewId;

    // Update nav buttons
    document.querySelectorAll('.nav-btn').forEach(b => {
      if (b.dataset.view === viewId) {
        b.classList.add('active');
      } else {
        b.classList.remove('active');
      }
    });

    // Update sections
    document.querySelectorAll('.view-section').forEach(sec => {
      if (sec.id === viewId) {
        sec.classList.add('active');
      } else {
        sec.classList.remove('active');
      }
    });

    // Sub-renders if needed
    if (viewId === 'protocols-view' && window.protocolsView) {
      window.protocolsView.render();
      window.protocolsView.calculateAbg();
    } else if (viewId === 'sbar-view' && window.sbarArena) {
      window.sbarArena.render();
    } else if (viewId === 'briefing-view' && window.briefingManager) {
      window.briefingManager.render();
    } else if (viewId === 'decoder-view' && window.promptDecoder) {
      window.promptDecoder.renderCase();
    } else if (viewId === 'actor-view' && window.actorStation) {
      window.actorStation.render();
    }
  }

  setupAudioToggle() {
    const btn = document.getElementById('btn-toggle-sound');
    if (!btn) return;
    btn.addEventListener('click', () => {
      if (window.icuAudio) {
        const isMuted = window.icuAudio.toggleMute();
        btn.classList.toggle('active', !isMuted);
        btn.querySelector('span:last-child').textContent = isMuted ? 'מוניטור מושתק' : 'צליל מוניטור פעיל';
      }
    });
  }

  setupDecisionTabs() {
    const tabBtns = document.querySelectorAll('.decision-tab-btn');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const targetPane = btn.dataset.pane;
        document.querySelectorAll('.tab-pane').forEach(p => {
          if (p.id === targetPane) {
            p.classList.add('active');
          } else {
            p.classList.remove('active');
          }
        });
      });
    });
  }

  switchScenario(idx) {
    if (window.icuSimulator) {
      window.icuSimulator.loadScenario(idx);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.icuApp = new ICUApp();
  window.icuApp.init();
});

// MESER ICU MASTER - Realtime Clinical Waveform Monitor
class ICUMonitorRenderer {
  constructor() {
    this.ecgCanvas = null;
    this.artCanvas = null;
    this.spo2Canvas = null;
    this.etco2Canvas = null;

    this.ecgCtx = null;
    this.artCtx = null;
    this.spo2Ctx = null;
    this.etco2Ctx = null;

    this.x = 0;
    this.animationFrameId = null;

    // Current patient state
    this.state = {
      hr: 82,
      rhythm: 'sinus', // sinus, afib, vfib, vtach, asystole
      abpSys: 118,
      abpDia: 74,
      map: 89,
      spo2: 97,
      rr: 16,
      etco2: 36,
      cvp: 8,
      temp: 37.1
    };

    // Cycle tracking
    this.ecgCyclePhase = 0;
    this.artCyclePhase = 0;
    this.spo2CyclePhase = 0;
    this.etco2CyclePhase = 0;
    this.lastQRS = false;
  }

  init() {
    this.ecgCanvas = document.getElementById('ecg-canvas');
    this.artCanvas = document.getElementById('art-canvas');
    this.spo2Canvas = document.getElementById('spo2-canvas');
    this.etco2Canvas = document.getElementById('etco2-canvas');

    if (!this.ecgCanvas) return;

    this.resizeCanvases();
    window.addEventListener('resize', () => this.resizeCanvases());

    this.startRendering();
  }

  resizeCanvases() {
    [this.ecgCanvas, this.artCanvas, this.spo2Canvas, this.etco2Canvas].forEach(c => {
      if (!c) return;
      const rect = c.getBoundingClientRect();
      c.width = rect.width * (window.devicePixelRatio || 1);
      c.height = rect.height * (window.devicePixelRatio || 1);
    });

    this.ecgCtx = this.ecgCanvas.getContext('2d');
    this.artCtx = this.artCanvas.getContext('2d');
    this.spo2Ctx = this.spo2Canvas.getContext('2d');
    this.etco2Ctx = this.etco2Canvas.getContext('2d');

    [this.ecgCtx, this.artCtx, this.spo2Ctx, this.etco2Ctx].forEach(ctx => {
      if (ctx) ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
    });

    this.clearAll();
  }

  clearAll() {
    [this.ecgCanvas, this.artCanvas, this.spo2Canvas, this.etco2Canvas].forEach(c => {
      if (!c) return;
      const ctx = c.getContext('2d');
      ctx.clearRect(0, 0, c.width, c.height);
    });
  }

  updateVitals(newVitals) {
    Object.assign(this.state, newVitals);
    this.renderNumericDisplays();
  }

  renderNumericDisplays() {
    const hrEl = document.getElementById('num-hr');
    const abpEl = document.getElementById('num-abp');
    const mapEl = document.getElementById('num-map');
    const spo2El = document.getElementById('num-spo2');
    const rrEl = document.getElementById('num-rr');
    const etco2El = document.getElementById('num-etco2');
    const cvpEl = document.getElementById('num-cvp');
    const tempEl = document.getElementById('num-temp');

    if (hrEl) hrEl.textContent = Math.round(this.state.hr);
    if (abpEl) abpEl.textContent = `${Math.round(this.state.abpSys)}/${Math.round(this.state.abpDia)}`;
    if (mapEl) mapEl.textContent = `(${Math.round(this.state.map || (this.state.abpSys + 2 * this.state.abpDia) / 3)})`;
    if (spo2El) spo2El.textContent = Math.round(this.state.spo2);
    if (rrEl) rrEl.textContent = Math.round(this.state.rr);
    if (etco2El) etco2El.textContent = Math.round(this.state.etco2);
    if (cvpEl) cvpEl.textContent = Math.round(this.state.cvp);
    if (tempEl) tempEl.textContent = Number(this.state.temp).toFixed(1);
  }

  // Generate Lead II ECG value at normalized phase [0, 1]
  getEcgPoint(phase) {
    if (this.state.rhythm === 'vfib') {
      return Math.sin(phase * Math.PI * 12) * 0.4 + (Math.random() - 0.5) * 0.3;
    }
    if (this.state.rhythm === 'asystole') {
      return (Math.random() - 0.5) * 0.04;
    }

    // P-Q-R-S-T wave model
    if (phase >= 0.10 && phase < 0.20) {
      // P wave
      const pPhase = (phase - 0.10) / 0.10;
      return Math.sin(pPhase * Math.PI) * 0.15;
    } else if (phase >= 0.28 && phase < 0.32) {
      // Q wave
      return -0.15;
    } else if (phase >= 0.32 && phase < 0.38) {
      // R peak
      const rPhase = (phase - 0.32) / 0.06;
      if (rPhase > 0.4 && rPhase < 0.6 && !this.lastQRS) {
        this.lastQRS = true;
        if (window.icuAudio) window.icuAudio.playQRSBeep(this.state.spo2);
      }
      return Math.sin(rPhase * Math.PI) * 0.95;
    } else if (phase >= 0.38 && phase < 0.42) {
      // S wave
      this.lastQRS = false;
      return -0.3;
    } else if (phase >= 0.52 && phase < 0.68) {
      // T wave
      const tPhase = (phase - 0.52) / 0.16;
      return Math.sin(tPhase * Math.PI) * 0.28;
    }
    return 0;
  }

  // Generate Arterial Line waveform (Systolic upstroke, dicrotic notch, diastolic runoff)
  getArtPoint(phase) {
    if (this.state.rhythm === 'asystole' || this.state.rhythm === 'vfib') {
      return (Math.random() - 0.5) * 0.02;
    }
    if (phase >= 0.34 && phase < 0.52) {
      // Rapid systolic ejection
      const sysPhase = (phase - 0.34) / 0.18;
      return Math.sin(sysPhase * Math.PI * 0.5) * 0.85;
    } else if (phase >= 0.52 && phase < 0.64) {
      // Dicrotic notch
      const notchPhase = (phase - 0.52) / 0.12;
      return 0.85 - notchPhase * 0.45 + Math.sin(notchPhase * Math.PI) * 0.12;
    } else if (phase >= 0.64 && phase < 1.0) {
      // Diastolic runoff
      const runoffPhase = (phase - 0.64) / 0.36;
      return 0.45 * Math.exp(-runoffPhase * 2.2);
    }
    return 0.05;
  }

  // Generate SpO2 Photoplethysmograph wave
  getSpo2Point(phase) {
    if (this.state.rhythm === 'asystole') return 0;
    if (phase >= 0.36 && phase < 0.58) {
      const p = (phase - 0.36) / 0.22;
      return Math.sin(p * Math.PI * 0.5) * 0.8;
    } else if (phase >= 0.58 && phase < 1.0) {
      const p = (phase - 0.58) / 0.42;
      return 0.8 * Math.exp(-p * 2.5);
    }
    return 0.05;
  }

  // Generate Capnography waveform (ETCO2 square wave)
  getEtco2Point(phase) {
    // phase 0 to 0.45: exhalation (steep rise, alveolar plateau)
    if (phase < 0.12) {
      return (phase / 0.12) * 0.85; // phase II rapid upstroke
    } else if (phase < 0.50) {
      return 0.85 + (phase - 0.12) * 0.2; // alveolar plateau
    } else if (phase < 0.60) {
      return 0.95 * (1 - (phase - 0.50) / 0.10); // rapid inspiratory downstroke
    }
    return 0; // baseline zero
  }

  startRendering() {
    const sweepSpeed = 2.0; // px per frame
    const blankWidth = 14;  // erase bar ahead of trace

    let lastTime = performance.now();

    const loop = (time) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      if (this.ecgCanvas) {
        const width = this.ecgCanvas.getBoundingClientRect().width;
        const height = this.ecgCanvas.getBoundingClientRect().height;

        // Calculate cycle increments based on heart rate and respiratory rate
        const hrHz = (this.state.hr || 60) / 60;
        const rrHz = (this.state.rr || 16) / 60;

        this.ecgCyclePhase = (this.ecgCyclePhase + hrHz * delta) % 1.0;
        this.artCyclePhase = this.ecgCyclePhase;
        this.spo2CyclePhase = this.ecgCyclePhase;
        this.etco2CyclePhase = (this.etco2CyclePhase + rrHz * delta) % 1.0;

        const nextX = (this.x + sweepSpeed) % width;

        // Erase zone ahead of beam
        const eraseZone = (ctx) => {
          ctx.clearRect(nextX, 0, blankWidth, height);
        };

        // Draw ECG Lead II
        if (this.ecgCtx) {
          eraseZone(this.ecgCtx);
          const yVal = height * 0.55 - this.getEcgPoint(this.ecgCyclePhase) * (height * 0.42);
          this.ecgCtx.strokeStyle = '#00ff88';
          this.ecgCtx.lineWidth = 2.0;
          this.ecgCtx.shadowColor = '#00ff88';
          this.ecgCtx.shadowBlur = 4;
          this.ecgCtx.beginPath();
          this.ecgCtx.moveTo(this.x, this.lastEcgY || yVal);
          this.ecgCtx.lineTo(nextX, yVal);
          this.ecgCtx.stroke();
          this.lastEcgY = yVal;
        }

        // Draw Arterial Line
        if (this.artCtx) {
          eraseZone(this.artCtx);
          const yVal = height * 0.85 - this.getArtPoint(this.artCyclePhase) * (height * 0.75);
          this.artCtx.strokeStyle = '#ff3366';
          this.artCtx.lineWidth = 2.0;
          this.artCtx.shadowColor = '#ff3366';
          this.artCtx.shadowBlur = 3;
          this.artCtx.beginPath();
          this.artCtx.moveTo(this.x, this.lastArtY || yVal);
          this.artCtx.lineTo(nextX, yVal);
          this.artCtx.stroke();
          this.lastArtY = yVal;
        }

        // Draw SpO2 Pleth
        if (this.spo2Ctx) {
          eraseZone(this.spo2Ctx);
          const yVal = height * 0.85 - this.getSpo2Point(this.spo2CyclePhase) * (height * 0.75);
          this.spo2Ctx.strokeStyle = '#00e5ff';
          this.spo2Ctx.lineWidth = 2.0;
          this.spo2Ctx.shadowColor = '#00e5ff';
          this.spo2Ctx.shadowBlur = 3;
          this.spo2Ctx.beginPath();
          this.spo2Ctx.moveTo(this.x, this.lastSpo2Y || yVal);
          this.spo2Ctx.lineTo(nextX, yVal);
          this.spo2Ctx.stroke();
          this.lastSpo2Y = yVal;
        }

        // Draw ETCO2 Capnogram
        if (this.etco2Ctx) {
          eraseZone(this.etco2Ctx);
          const yVal = height * 0.85 - this.getEtco2Point(this.etco2CyclePhase) * (height * 0.75);
          this.etco2Ctx.strokeStyle = '#ffb700';
          this.etco2Ctx.lineWidth = 2.0;
          this.etco2Ctx.shadowColor = '#ffb700';
          this.etco2Ctx.shadowBlur = 3;
          this.etco2Ctx.beginPath();
          this.etco2Ctx.moveTo(this.x, this.lastEtco2Y || yVal);
          this.etco2Ctx.lineTo(nextX, yVal);
          this.etco2Ctx.stroke();
          this.lastEtco2Y = yVal;
        }

        this.x = nextX;
      }

      this.animationFrameId = requestAnimationFrame(loop);
    };

    this.animationFrameId = requestAnimationFrame(loop);
  }
}

window.icuMonitor = new ICUMonitorRenderer();

// MESER ICU MASTER - Audio Engine (Web Audio API Synthesizer)
class ICUAudioEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.isVoiceMuted = false;
    this.lastBeepTime = 0;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }

  // Realistic ICU QRS Beep tuned to SpO2 level
  playQRSBeep(spo2 = 98) {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Pitch calculation: base ~400Hz at 70% SpO2, scaling up to ~880Hz at 100% SpO2
      const clampedSpo2 = Math.max(70, Math.min(100, spo2));
      const freq = 380 + (clampedSpo2 - 70) * 16.5;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.085);
    } catch (e) {
      console.warn('Audio error:', e);
    }
  }

  // High Priority Critical ICU Alarm (IEC 60601-1-8 standard pattern)
  playAlarm() {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const tones = [970, 970, 970];
      tones.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const start = now + idx * 0.12;
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.12, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.08);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(start);
        osc.stop(start + 0.09);
      });
    } catch (e) {
      console.warn('Alarm audio error:', e);
    }
  }

  // Two-minute warning chime
  playTwoMinuteWarning() {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const start = now + idx * 0.15;
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0.15, start);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.25);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(start);
        osc.stop(start + 0.26);
      });

      // Voice prompt announcement in Hebrew
      setTimeout(() => {
        this.speakMessage("שים לב: שתי דקות לסיום התחנה – מסור דיווח");
      }, 700);
    } catch (e) {
      console.warn('Warning chime error:', e);
    }
  }

  // Text-To-Speech announcement for examiner cues
  speakMessage(text) {
    if (this.isMuted || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'he-IL';
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('Speech error:', e);
    }
  }
}

window.icuAudio = new ICUAudioEngine();

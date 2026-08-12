/* ============================================================
   VITRAGROUP — ACOUSTIC NOISE ATTENUATION AUDIO SIMULATOR
   Web Audio API sound synthesis & real-time spectrum visualizer
   Comparing Standard Glass vs. VitraGroup Triplex Acoustic Glass
   ============================================================ */

'use strict';

class AcousticSimulator {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');

    this.audioCtx = null;
    this.noiseNode = null;
    this.filterNode = null;
    this.gainNode = null;
    this.analyser = null;

    this.isPlaying = false;
    this.soundType = 'traffic'; // 'traffic', 'airport', 'rain'
    this.glassMode = 'triplex'; // 'none', 'standard', 'triplex'
    
    this.dbStandard = 85; // dB
    this.dbReduction = 42; // dB attenuation

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.bindEvents();
    this.animate();
  }

  resize() {
    if (!this.canvas) return;
    const rect = this.canvas.getBoundingClientRect();
    this.dpr = window.devicePixelRatio || 1;
    this.canvas.width = rect.width * this.dpr;
    this.canvas.height = rect.height * this.dpr;
    this.ctx.scale(this.dpr, this.dpr);
    this.width = rect.width;
    this.height = rect.height;
  }

  initAudio() {
    if (this.audioCtx) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    this.audioCtx = new AudioContext();

    // Create Noise Buffer
    const bufferSize = this.audioCtx.sampleRate * 3;
    const buffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1; // White noise
    }

    this.noiseNode = this.audioCtx.createBufferSource();
    this.noiseNode.buffer = buffer;
    this.noiseNode.loop = true;

    // Filter Node for realistic sound simulation
    this.filterNode = this.audioCtx.createBiquadFilter();
    this.filterNode.type = 'lowpass';
    this.filterNode.frequency.value = 1200;

    // Gain Control Node
    this.gainNode = this.audioCtx.createGain();
    this.gainNode.gain.value = 0;

    // Analyser Node
    this.analyser = this.audioCtx.createAnalyser();
    this.analyser.fftSize = 128;
    this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);

    this.noiseNode.connect(this.filterNode);
    this.filterNode.connect(this.gainNode);
    this.gainNode.connect(this.analyser);
    this.analyser.connect(this.audioCtx.destination);

    this.noiseNode.start();
  }

  bindEvents() {
    const toggleBtn = document.getElementById('ac-toggle-play');
    const soundSelects = document.querySelectorAll('[data-ac-sound]');
    const glassSelects = document.querySelectorAll('[data-ac-glass]');

    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        if (!this.audioCtx) this.initAudio();
        if (this.audioCtx.state === 'suspended') {
          this.audioCtx.resume();
        }
        this.isPlaying ? this.stop() : this.play();
      });
    }

    soundSelects.forEach(btn => {
      btn.addEventListener('click', () => {
        soundSelects.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.soundType = btn.dataset.acSound;
        this.updateAudioParams();
      });
    });

    glassSelects.forEach(btn => {
      btn.addEventListener('click', () => {
        glassSelects.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.glassMode = btn.dataset.acGlass;
        this.updateAudioParams();
      });
    });

    this.updateAudioParams();
  }

  updateAudioParams() {
    let cutoff = 2000;
    let targetGain = 0.15;
    let dbValue = 85;

    // Sound profile
    if (this.soundType === 'airport') {
      cutoff = 3200;
      dbValue = 98;
    } else if (this.soundType === 'rain') {
      cutoff = 1500;
      dbValue = 72;
    }

    // Glass Mode Attenuation
    if (this.glassMode === 'none') {
      targetGain = 0.35;
    } else if (this.glassMode === 'standard') {
      cutoff *= 0.6;
      targetGain = 0.18;
      dbValue -= 22;
    } else if (this.glassMode === 'triplex') {
      cutoff *= 0.2; // Deep low pass damping
      targetGain = 0.04; // Heavy volume drop
      dbValue -= 45;
    }

    if (this.filterNode && this.audioCtx) {
      this.filterNode.frequency.setTargetAtTime(cutoff, this.audioCtx.currentTime, 0.1);
    }
    if (this.gainNode && this.audioCtx && this.isPlaying) {
      this.gainNode.gain.setTargetAtTime(targetGain, this.audioCtx.currentTime, 0.1);
    }

    // Update DB Meter Display
    const dbMeterEl = document.getElementById('ac-db-val');
    const dbBarEl = document.getElementById('ac-db-bar');
    if (dbMeterEl) dbMeterEl.textContent = `${Math.max(25, dbValue)} dB`;
    if (dbBarEl) {
      const pct = Math.min(100, Math.max(10, (dbValue / 100) * 100));
      dbBarEl.style.width = `${pct}%`;
    }
  }

  play() {
    this.isPlaying = true;
    const toggleBtn = document.getElementById('ac-toggle-play');
    if (toggleBtn) {
      toggleBtn.classList.add('playing');
      toggleBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="6" y="4" width="4" height="16"/>
          <rect x="14" y="4" width="4" height="16"/>
        </svg>
        <span>Pause Audio Demo</span>
      `;
    }
    this.updateAudioParams();
  }

  stop() {
    this.isPlaying = false;
    if (this.gainNode && this.audioCtx) {
      this.gainNode.gain.setTargetAtTime(0, this.audioCtx.currentTime, 0.1);
    }
    const toggleBtn = document.getElementById('ac-toggle-play');
    if (toggleBtn) {
      toggleBtn.classList.remove('playing');
      toggleBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polygon points="5 3 19 12 5 21 5 3"/>
        </svg>
        <span>Simulate Sound Attenuation</span>
      `;
    }
  }

  animate() {
    this.renderWaveform();
    requestAnimationFrame(() => this.animate());
  }

  renderWaveform() {
    if (!this.ctx || !this.width) return;
    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;

    ctx.clearRect(0, 0, w, h);

    // Spectrum grid lines
    ctx.strokeStyle = 'rgba(0, 245, 160, 0.08)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, h / 2);
    ctx.lineTo(w, h / 2);
    ctx.stroke();

    const bars = 48;
    const barWidth = w / bars - 3;
    const time = Date.now() * 0.003;

    for (let i = 0; i < bars; i++) {
      let amplitude = 0.15;

      if (this.isPlaying && this.analyser && this.dataArray) {
        this.analyser.getByteFrequencyData(this.dataArray);
        const dataIdx = Math.floor((i / bars) * this.dataArray.length);
        amplitude = (this.dataArray[dataIdx] / 255) || 0.1;
      } else {
        amplitude = Math.abs(Math.sin(time + i * 0.18)) * 0.12 + 0.05;
      }

      if (this.glassMode === 'triplex') {
        amplitude *= 0.28;
      } else if (this.glassMode === 'standard') {
        amplitude *= 0.65;
      }

      const barHeight = Math.max(4, amplitude * (h * 0.7));
      const x = i * (barWidth + 3) + 1.5;
      const y = (h - barHeight) / 2;

      let color = 'rgba(0, 245, 160, 0.8)';
      if (this.glassMode === 'triplex') {
        color = 'rgba(116, 237, 180, 0.9)';
      } else if (this.glassMode === 'none') {
        color = 'rgba(240, 100, 100, 0.85)';
      }

      ctx.fillStyle = color;
      ctx.beginPath();
      if (ctx.roundRect) {
        ctx.roundRect(x, y, barWidth, barHeight, 3);
      } else {
        ctx.rect(x, y, barWidth, barHeight);
      }
      ctx.fill();
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('acoustic-wave-canvas')) {
    window.acousticSimulator = new AcousticSimulator('acoustic-wave-canvas');
  }
});

/* ============================================================
   VITRAGROUP — GLASS OPTICS & THERMAL 3D/CANVAS VISUALIZER
   Real-time HTML5 Canvas light refraction, solar heat gain,
   acoustic lamination & electrochromic dynamic tint visualizer
   ============================================================ */

'use strict';

class GlassVisualizer {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    
    // Default Specs
    this.glassType = 'low-e'; // 'low-e', 'electrochromic', 'acoustic', 'solar-control', 'ultra-clear'
    this.thickness = 12; // mm
    this.tintLevel = 0.2; // 0 to 1
    this.sunAngle = 45; // degrees
    this.panes = 2; // single (1), double (2), triple (3)
    this.gasFill = 'argon'; // 'air', 'argon', 'krypton'
    
    // Animation frame
    this.animId = null;
    this.time = 0;

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.bindControls();
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

  bindControls() {
    const typeSelect = document.getElementById('gv-glass-type');
    const thicknessInput = document.getElementById('gv-thickness');
    const tintInput = document.getElementById('gv-tint');
    const sunAngleInput = document.getElementById('gv-sun-angle');
    const panesSelect = document.getElementById('gv-panes');

    if (typeSelect) {
      typeSelect.addEventListener('change', (e) => {
        this.glassType = e.target.value;
        this.updateSpecsDisplay();
      });
    }
    if (thicknessInput) {
      thicknessInput.addEventListener('input', (e) => {
        this.thickness = parseFloat(e.target.value);
        const el = document.getElementById('gv-thickness-val');
        if (el) el.textContent = `${this.thickness} mm`;
        this.updateSpecsDisplay();
      });
    }
    if (tintInput) {
      tintInput.addEventListener('input', (e) => {
        this.tintLevel = parseFloat(e.target.value);
        const el = document.getElementById('gv-tint-val');
        if (el) el.textContent = `${Math.round(this.tintLevel * 100)}%`;
        this.updateSpecsDisplay();
      });
    }
    if (sunAngleInput) {
      sunAngleInput.addEventListener('input', (e) => {
        this.sunAngle = parseFloat(e.target.value);
        const el = document.getElementById('gv-sun-val');
        if (el) el.textContent = `${this.sunAngle}°`;
      });
    }
    if (panesSelect) {
      panesSelect.addEventListener('change', (e) => {
        this.panes = parseInt(e.target.value, 10);
        this.updateSpecsDisplay();
      });
    }

    // Glass preset buttons
    const presetBtns = document.querySelectorAll('[data-gv-preset]');
    presetBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        presetBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const preset = btn.dataset.gvPreset;
        this.applyPreset(preset);
      });
    });

    this.updateSpecsDisplay();
  }

  applyPreset(preset) {
    if (preset === 'acoustic') {
      this.glassType = 'acoustic';
      this.panes = 2;
      this.thickness = 16;
      this.tintLevel = 0.15;
    } else if (preset === 'solar') {
      this.glassType = 'solar-control';
      this.panes = 2;
      this.thickness = 12;
      this.tintLevel = 0.45;
    } else if (preset === 'smart') {
      this.glassType = 'electrochromic';
      this.panes = 2;
      this.thickness = 14;
      this.tintLevel = 0.75;
    } else if (preset === 'ultra') {
      this.glassType = 'ultra-clear';
      this.panes = 3;
      this.thickness = 20;
      this.tintLevel = 0.05;
    }

    // Update form controls if present
    const typeSelect = document.getElementById('gv-glass-type');
    const thicknessInput = document.getElementById('gv-thickness');
    const tintInput = document.getElementById('gv-tint');
    const panesSelect = document.getElementById('gv-panes');
    if (typeSelect) typeSelect.value = this.glassType;
    if (thicknessInput) {
      thicknessInput.value = this.thickness;
      const el = document.getElementById('gv-thickness-val');
      if (el) el.textContent = `${this.thickness} mm`;
    }
    if (tintInput) {
      tintInput.value = this.tintLevel;
      const el = document.getElementById('gv-tint-val');
      if (el) el.textContent = `${Math.round(this.tintLevel * 100)}%`;
    }
    if (panesSelect) panesSelect.value = this.panes;

    this.updateSpecsDisplay();
  }

  calculateSpecs() {
    let uValue = 2.8; // W/m²K
    let shgc = 0.72; // Solar heat gain coeff
    let vlt = 82; // Visual light transmittance %
    let stc = 32; // Sound Transmission Class dB

    if (this.panes === 2) {
      uValue = 1.2;
      shgc = 0.55;
      vlt = 74;
      stc = 39;
    } else if (this.panes === 3) {
      uValue = 0.65;
      shgc = 0.42;
      vlt = 68;
      stc = 44;
    }

    if (this.glassType === 'low-e') {
      uValue *= 0.7;
      shgc *= 0.8;
    } else if (this.glassType === 'solar-control') {
      shgc *= 0.5;
      vlt *= 0.85;
    } else if (this.glassType === 'acoustic') {
      stc += 6;
      uValue *= 0.9;
    } else if (this.glassType === 'electrochromic') {
      shgc *= (1 - this.tintLevel * 0.7);
      vlt *= (1 - this.tintLevel * 0.85);
      uValue *= 0.8;
    } else if (this.glassType === 'ultra-clear') {
      vlt = Math.min(92, vlt + 12);
    }

    stc += Math.round(this.thickness / 4);
    uValue = Math.max(0.5, uValue - (this.thickness * 0.015));

    return {
      uValue: uValue.toFixed(2),
      shgc: Math.max(0.1, shgc).toFixed(2),
      vlt: Math.max(8, Math.round(vlt)),
      stc: Math.round(stc)
    };
  }

  updateSpecsDisplay() {
    const specs = this.calculateSpecs();
    const uValueEl = document.getElementById('gv-stat-uvalue');
    const shgcEl = document.getElementById('gv-stat-shgc');
    const vltEl = document.getElementById('gv-stat-vlt');
    const stcEl = document.getElementById('gv-stat-stc');

    if (uValueEl) uValueEl.textContent = `${specs.uValue} W/m²K`;
    if (shgcEl) shgcEl.textContent = specs.shgc;
    if (vltEl) vltEl.textContent = specs.vlt + '%';
    if (stcEl) stcEl.textContent = specs.stc + ' dB';
  }

  animate() {
    this.time += 0.02;
    this.render();
    this.animId = requestAnimationFrame(() => this.animate());
  }

  render() {
    if (!this.ctx || !this.width) return;
    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;

    ctx.clearRect(0, 0, w, h);

    // Draw Dark Ambient Grid
    ctx.strokeStyle = 'rgba(0, 245, 160, 0.08)';
    ctx.lineWidth = 1;
    const gridSize = 40;
    for (let x = 0; x < w; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // Glass Center Specs
    const centerX = w / 2;
    const centerY = h / 2;
    const paneWidth = Math.min(260, w * 0.4);
    const paneHeight = Math.min(300, h * 0.6);

    const paneCount = this.panes;
    const spacing = 45;
    const startX = centerX - ((paneCount - 1) * spacing) / 2;

    // Sun Angle Vector
    const rad = (this.sunAngle * Math.PI) / 180;
    const rayStartX = centerX - Math.cos(rad) * (w * 0.42);
    const rayStartY = centerY - Math.sin(rad) * (h * 0.42);

    // Draw Incoming Beam
    const rayGrad = ctx.createLinearGradient(rayStartX, rayStartY, centerX - paneWidth / 2, centerY);
    rayGrad.addColorStop(0, 'rgba(255, 235, 170, 0.85)');
    rayGrad.addColorStop(0.5, 'rgba(0, 245, 160, 0.6)');
    rayGrad.addColorStop(1, 'rgba(255, 255, 255, 0.9)');

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(rayStartX, rayStartY - 15);
    ctx.lineTo(rayStartX, rayStartY + 15);
    ctx.lineTo(centerX - paneWidth / 2, centerY + paneHeight / 2 - 30);
    ctx.lineTo(centerX - paneWidth / 2, centerY - paneHeight / 2 + 30);
    ctx.closePath();
    ctx.fillStyle = rayGrad;
    ctx.globalAlpha = 0.3;
    ctx.fill();
    ctx.restore();

    // Sun Node
    ctx.save();
    ctx.beginPath();
    ctx.arc(rayStartX, rayStartY, 16, 0, Math.PI * 2);
    ctx.fillStyle = '#FFE082';
    ctx.shadowColor = '#FFE082';
    ctx.shadowBlur = 20;
    ctx.fill();
    ctx.restore();

    // Glass Panes Render
    for (let i = 0; i < paneCount; i++) {
      const px = startX + (i - (paneCount - 1) / 2) * spacing;
      const py = centerY;

      let glassHue = 210;
      let alpha = 0.28 + (1 - i * 0.05);

      if (this.glassType === 'electrochromic') {
        glassHue = 220;
        alpha = 0.2 + this.tintLevel * 0.65;
      } else if (this.glassType === 'solar-control') {
        glassHue = 195;
        alpha = 0.45;
      } else if (this.glassType === 'acoustic') {
        glassHue = 205;
      } else if (this.glassType === 'ultra-clear') {
        glassHue = 190;
        alpha = 0.14;
      }

      const glassFrontGrad = ctx.createLinearGradient(px - paneWidth / 2, py - paneHeight / 2, px + paneWidth / 2, py + paneHeight / 2);
      glassFrontGrad.addColorStop(0, `hsla(${glassHue}, 70%, 75%, ${alpha})`);
      glassFrontGrad.addColorStop(0.5, `hsla(${glassHue + 15}, 80%, 90%, ${alpha * 0.6})`);
      glassFrontGrad.addColorStop(1, `hsla(${glassHue}, 60%, 40%, ${alpha * 1.3})`);

      ctx.save();
      ctx.shadowColor = 'rgba(16, 32, 54, 0.35)';
      ctx.shadowBlur = 25;
      ctx.shadowOffsetY = 12;

      ctx.beginPath();
      if (ctx.roundRect) {
        ctx.roundRect(px - paneWidth / 2, py - paneHeight / 2, paneWidth, paneHeight, 8);
      } else {
        ctx.rect(px - paneWidth / 2, py - paneHeight / 2, paneWidth, paneHeight);
      }
      ctx.fillStyle = glassFrontGrad;
      ctx.fill();

      ctx.shadowBlur = 0;
      ctx.strokeStyle = `rgba(180, 225, 255, ${0.4 + Math.sin(this.time + i) * 0.1})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      if (this.glassType === 'acoustic') {
        ctx.beginPath();
        ctx.moveTo(px, py - paneHeight / 2 + 10);
        ctx.lineTo(px, py + paneHeight / 2 - 10);
        ctx.strokeStyle = 'rgba(116, 237, 180, 0.85)';
        ctx.lineWidth = 3;
        ctx.setLineDash([6, 4]);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      const sheenGrad = ctx.createLinearGradient(
        px - paneWidth / 2 + Math.sin(this.time * 0.5) * 40,
        py - paneHeight / 2,
        px + paneWidth / 2,
        py + paneHeight / 2
      );
      sheenGrad.addColorStop(0, 'rgba(255,255,255,0)');
      sheenGrad.addColorStop(0.4, 'rgba(255,255,255,0.3)');
      sheenGrad.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = sheenGrad;
      ctx.fill();

      ctx.restore();
    }

    // Transmitted Light Ray Output
    const exitX = centerX + paneWidth / 2;
    const transmittedVLT = this.calculateSpecs().vlt / 100;

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(exitX, centerY - paneHeight / 2 + 30);
    ctx.lineTo(exitX, centerY + paneHeight / 2 - 30);
    ctx.lineTo(w, centerY + paneHeight / 2 - 10);
    ctx.lineTo(w, centerY - paneHeight / 2 + 10);
    ctx.closePath();

    const exitGrad = ctx.createLinearGradient(exitX, centerY, w, centerY);
    exitGrad.addColorStop(0, `rgba(0, 245, 160, ${transmittedVLT * 0.45})`);
    exitGrad.addColorStop(1, 'rgba(0, 245, 160, 0)');
    ctx.fillStyle = exitGrad;
    ctx.fill();
    ctx.restore();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('glass-3d-canvas')) {
    window.glassVisualizer = new GlassVisualizer('glass-3d-canvas');
  }
});

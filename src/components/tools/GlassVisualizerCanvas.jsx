import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Layers, Sun, Shield, Sliders, FileText } from 'lucide-react';
import { useAudioFX } from '../../context/AudioFXContext';

export default function GlassVisualizerCanvas() {
  const canvasRef = useRef(null);
  const { playTone } = useAudioFX();

  const [glassType, setGlassType] = useState('low-e');
  const [thickness, setThickness] = useState(12);
  const [tintLevel, setTintLevel] = useState(0.2);
  const [sunAngle, setSunAngle] = useState(45);
  const [panes, setPanes] = useState(2);
  const [presetActive, setPresetActive] = useState('low-e');

  const calculateSpecs = useCallback(() => {
    let uValue = 2.8;
    let shgc = 0.72;
    let vlt = 82;
    let stc = 32;

    if (panes === 2) {
      uValue = 1.2;
      shgc = 0.55;
      vlt = 74;
      stc = 39;
    } else if (panes === 3) {
      uValue = 0.65;
      shgc = 0.42;
      vlt = 68;
      stc = 44;
    }

    if (glassType === 'low-e') {
      uValue *= 0.7;
      shgc *= 0.8;
    } else if (glassType === 'solar-control') {
      shgc *= 0.5;
      vlt *= 0.85;
    } else if (glassType === 'acoustic') {
      stc += 6;
      uValue *= 0.9;
    } else if (glassType === 'electrochromic') {
      shgc *= (1 - tintLevel * 0.7);
      vlt *= (1 - tintLevel * 0.85);
      uValue *= 0.8;
    } else if (glassType === 'ultra-clear') {
      vlt = Math.min(92, vlt + 12);
    }

    stc += Math.round(thickness / 4);
    uValue = Math.max(0.5, uValue - (thickness * 0.015));

    return {
      uValue: uValue.toFixed(2),
      shgc: Math.max(0.1, shgc).toFixed(2),
      vlt: Math.max(8, Math.round(vlt)),
      stc: Math.round(stc)
    };
  }, [panes, glassType, tintLevel, thickness]);

  const specs = calculateSpecs();

  const applyPreset = (presetKey) => {
    playTone(700, 0.04);
    setPresetActive(presetKey);
    if (presetKey === 'acoustic') {
      setGlassType('acoustic');
      setPanes(2);
      setThickness(16);
      setTintLevel(0.15);
    } else if (presetKey === 'solar') {
      setGlassType('solar-control');
      setPanes(2);
      setThickness(12);
      setTintLevel(0.45);
    } else if (presetKey === 'smart') {
      setGlassType('electrochromic');
      setPanes(2);
      setThickness(14);
      setTintLevel(0.75);
    } else if (presetKey === 'ultra') {
      setGlassType('ultra-clear');
      setPanes(3);
      setThickness(20);
      setTintLevel(0.05);
    } else {
      setGlassType('low-e');
      setPanes(2);
      setThickness(12);
      setTintLevel(0.2);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let time = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      ctx.clearRect(0, 0, w, h);

      // Dark Ambient Grid
      ctx.strokeStyle = 'rgba(29, 78, 216, 0.08)';
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

      const centerX = w / 2;
      const centerY = h / 2;
      const paneWidth = Math.min(240, w * 0.38);
      const paneHeight = Math.min(280, h * 0.58);

      const paneCount = panes;
      const spacing = 45;
      const startX = centerX - ((paneCount - 1) * spacing) / 2;

      // Sun angle vector
      const rad = (sunAngle * Math.PI) / 180;
      const rayStartX = centerX - Math.cos(rad) * (w * 0.42);
      const rayStartY = centerY - Math.sin(rad) * (h * 0.42);

      // Incoming Light Ray
      const rayGrad = ctx.createLinearGradient(rayStartX, rayStartY, centerX - paneWidth / 2, centerY);
      rayGrad.addColorStop(0, 'rgba(255, 235, 170, 0.85)');
      rayGrad.addColorStop(0.5, 'rgba(29, 78, 216, 0.6)');
      rayGrad.addColorStop(1, 'rgba(255, 255, 255, 0.9)');

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(rayStartX, rayStartY - 15);
      ctx.lineTo(rayStartX, rayStartY + 15);
      ctx.lineTo(centerX - paneWidth / 2, centerY + paneHeight / 2 - 30);
      ctx.lineTo(centerX - paneWidth / 2, centerY - paneHeight / 2 + 30);
      ctx.closePath();
      ctx.fillStyle = rayGrad;
      ctx.globalAlpha = 0.35;
      ctx.fill();
      ctx.restore();

      // Sun Node
      ctx.save();
      ctx.beginPath();
      ctx.arc(rayStartX, rayStartY, 16, 0, Math.PI * 2);
      ctx.fillStyle = '#F59E0B';
      ctx.shadowColor = '#F59E0B';
      ctx.shadowBlur = 20;
      ctx.fill();
      ctx.restore();

      // Glass Panes Render
      for (let i = 0; i < paneCount; i++) {
        const px = startX + (i - (paneCount - 1) / 2) * spacing;
        const py = centerY;

        let glassHue = 215;
        let alpha = 0.3 + (1 - i * 0.05);

        if (glassType === 'electrochromic') {
          glassHue = 225;
          alpha = 0.2 + tintLevel * 0.65;
        } else if (glassType === 'solar-control') {
          glassHue = 195;
          alpha = 0.45;
        } else if (glassType === 'acoustic') {
          glassHue = 205;
        } else if (glassType === 'ultra-clear') {
          glassHue = 190;
          alpha = 0.14;
        }

        const glassGrad = ctx.createLinearGradient(px - paneWidth / 2, py - paneHeight / 2, px + paneWidth / 2, py + paneHeight / 2);
        glassGrad.addColorStop(0, `hsla(${glassHue}, 70%, 75%, ${alpha})`);
        glassGrad.addColorStop(0.5, `hsla(${glassHue + 15}, 80%, 90%, ${alpha * 0.6})`);
        glassGrad.addColorStop(1, `hsla(${glassHue}, 60%, 40%, ${alpha * 1.3})`);

        ctx.save();
        ctx.shadowColor = 'rgba(11, 25, 44, 0.35)';
        ctx.shadowBlur = 25;
        ctx.shadowOffsetY = 12;

        ctx.beginPath();
        if (ctx.roundRect) {
          ctx.roundRect(px - paneWidth / 2, py - paneHeight / 2, paneWidth, paneHeight, 8);
        } else {
          ctx.rect(px - paneWidth / 2, py - paneHeight / 2, paneWidth, paneHeight);
        }
        ctx.fillStyle = glassGrad;
        ctx.fill();

        ctx.shadowBlur = 0;
        ctx.strokeStyle = `rgba(180, 225, 255, ${0.4 + Math.sin(time + i) * 0.1})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        if (glassType === 'acoustic') {
          ctx.beginPath();
          ctx.moveTo(px, py - paneHeight / 2 + 10);
          ctx.lineTo(px, py + paneHeight / 2 - 10);
          ctx.strokeStyle = 'rgba(29, 78, 216, 0.85)';
          ctx.lineWidth = 3;
          ctx.setLineDash([6, 4]);
          ctx.stroke();
          ctx.setLineDash([]);
        }

        const sheenGrad = ctx.createLinearGradient(
          px - paneWidth / 2 + Math.sin(time * 0.5) * 40,
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

      // Transmitted Light Ray
      const exitX = centerX + paneWidth / 2;
      const transmittedVLT = specs.vlt / 100;

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(exitX, centerY - paneHeight / 2 + 30);
      ctx.lineTo(exitX, centerY + paneHeight / 2 - 30);
      ctx.lineTo(w, centerY + paneHeight / 2 - 10);
      ctx.lineTo(w, centerY - paneHeight / 2 + 10);
      ctx.closePath();

      const exitGrad = ctx.createLinearGradient(exitX, centerY, w, centerY);
      exitGrad.addColorStop(0, `rgba(29, 78, 216, ${transmittedVLT * 0.45})`);
      exitGrad.addColorStop(1, 'rgba(29, 78, 216, 0)');
      ctx.fillStyle = exitGrad;
      ctx.fill();
      ctx.restore();
    };

    const loop = () => {
      time += 0.02;
      render();
      animId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [panes, glassType, tintLevel, thickness, sunAngle, specs]);

  return (
    <section id="glass-visualizer" style={{ background: '#0B192C', color: '#fff', padding: '4rem 1.5rem', position: 'relative' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ color: '#60A5FA', fontSize: '0.8125rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            interactive 3d canvas simulator
          </div>
          <h2 style={{ fontSize: '2.25rem', fontWeight: 900, textTransform: 'uppercase', marginTop: '0.5rem', color: '#fff' }}>
            Glass Optics & <span style={{ color: '#3B82F6' }}>Thermal Visualizer</span>
          </h2>
          <p style={{ color: '#94A3B8', marginTop: '0.5rem', maxWidth: '600px', marginInline: 'auto' }}>
            Simulate solar heat gain (SHGC), U-value thermal insulation, light transmittance (VLT), and acoustic STC attenuation in real-time.
          </p>
        </div>

        {/* Presets Bar */}
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2rem' }}>
          {[
            { id: 'low-e', label: 'Default Low-E' },
            { id: 'acoustic', label: 'Acoustic Triplex' },
            { id: 'solar', label: 'Solar Control' },
            { id: 'smart', label: 'Smart Dynamic Tint' },
            { id: 'ultra', label: 'Ultra-Clear Triple' },
          ].map((p) => (
            <button
              key={p.id}
              onClick={() => applyPreset(p.id)}
              style={{
                padding: '0.5rem 1.25rem',
                borderRadius: '9999px',
                border: '1px solid',
                borderColor: presetActive === p.id ? '#3B82F6' : 'rgba(255,255,255,0.15)',
                background: presetActive === p.id ? '#1D4ED8' : 'rgba(255,255,255,0.05)',
                color: presetActive === p.id ? '#fff' : '#CBD5E1',
                fontSize: '0.8125rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {p.label}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', alignItems: 'center' }}>
          {/* Canvas Wrapper */}
          <div style={{ background: '#0F2167', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', padding: '1rem', height: '420px', position: 'relative', overflow: 'hidden' }}>
            <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
          </div>

          {/* Controls & Stat Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Live Metrics Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: 700 }}>U-VALUE</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#60A5FA' }}>{specs.uValue}</div>
                <div style={{ fontSize: '0.6875rem', color: '#64748B' }}>W/m²K (Thermal Loss)</div>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: 700 }}>SHGC</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#34D399' }}>{specs.shgc}</div>
                <div style={{ fontSize: '0.6875rem', color: '#64748B' }}>Solar Heat Gain Coeff</div>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: 700 }}>VLT %</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#FBBF24' }}>{specs.vlt}%</div>
                <div style={{ fontSize: '0.6875rem', color: '#64748B' }}>Visual Light Trans.</div>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: 700 }}>STC SOUND</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#A78BFA' }}>{specs.stc} dB</div>
                <div style={{ fontSize: '0.6875rem', color: '#64748B' }}>Acoustic Rating</div>
              </div>
            </div>

            {/* Slider Controls */}
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.25rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', fontWeight: 700, marginBottom: '0.375rem' }}>
                  <span>Glass Type</span>
                  <span style={{ color: '#60A5FA' }}>{glassType}</span>
                </div>
                <select
                  value={glassType}
                  onChange={(e) => { setGlassType(e.target.value); playTone(600, 0.03); }}
                  style={{ width: '100%', background: '#0B192C', color: '#fff', border: '1px solid #1E293B', padding: '0.5rem', borderRadius: '6px', outline: 'none' }}
                >
                  <option value="low-e">Low-E Solar Glazing</option>
                  <option value="electrochromic">Electrochromic Smart Tint</option>
                  <option value="acoustic">Acoustic Triplex Laminated</option>
                  <option value="solar-control">Solar-Control Tinted</option>
                  <option value="ultra-clear">Ultra-Clear Low Iron</option>
                </select>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', fontWeight: 700, marginBottom: '0.375rem' }}>
                  <span>Glass Panes</span>
                  <span style={{ color: '#60A5FA' }}>{panes === 1 ? 'Single' : panes === 2 ? 'Double Insulated' : 'Triple Vacuum'}</span>
                </div>
                <select
                  value={panes}
                  onChange={(e) => { setPanes(parseInt(e.target.value)); playTone(600, 0.03); }}
                  style={{ width: '100%', background: '#0B192C', color: '#fff', border: '1px solid #1E293B', padding: '0.5rem', borderRadius: '6px', outline: 'none' }}
                >
                  <option value={1}>Single Pane (6mm)</option>
                  <option value={2}>Double Pane IGU (12mm-24mm)</option>
                  <option value={3}>Triple Pane IGU (32mm+)</option>
                </select>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', fontWeight: 700, marginBottom: '0.375rem' }}>
                  <span>Thickness ({thickness} mm)</span>
                </div>
                <input
                  type="range"
                  min="6"
                  max="24"
                  value={thickness}
                  onChange={(e) => setThickness(parseFloat(e.target.value))}
                  style={{ width: '100%', accentColor: '#1D4ED8' }}
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', fontWeight: 700, marginBottom: '0.375rem' }}>
                  <span>Sun Incident Angle ({sunAngle}°)</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="75"
                  value={sunAngle}
                  onChange={(e) => setSunAngle(parseFloat(e.target.value))}
                  style={{ width: '100%', accentColor: '#1D4ED8' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import React, { useRef, useEffect, useState } from 'react';
import { Volume2, VolumeX, Play, Pause, Zap } from 'lucide-react';
import { useAudioFX } from '../../context/AudioFXContext';

export default function AcousticSimulatorCanvas() {
  const canvasRef = useRef(null);
  const audioCtxRef = useRef(null);
  const noiseNodeRef = useRef(null);
  const filterNodeRef = useRef(null);
  const gainNodeRef = useRef(null);
  const analyserRef = useRef(null);

  const { playTone } = useAudioFX();

  const [isPlaying, setIsPlaying] = useState(false);
  const [soundType, setSoundType] = useState('traffic');
  const [glassMode, setGlassMode] = useState('triplex');
  const [dbValue, setDbValue] = useState(43);

  const initAudio = () => {
    if (audioCtxRef.current) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioContext();
    audioCtxRef.current = ctx;

    const bufferSize = ctx.sampleRate * 3;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noiseNode = ctx.createBufferSource();
    noiseNode.buffer = buffer;
    noiseNode.loop = true;
    noiseNodeRef.current = noiseNode;

    const filterNode = ctx.createBiquadFilter();
    filterNode.type = 'lowpass';
    filterNode.frequency.value = 1200;
    filterNodeRef.current = filterNode;

    const gainNode = ctx.createGain();
    gainNode.gain.value = 0;
    gainNodeRef.current = gainNode;

    const analyser = ctx.createAnalyser();
    analyser.fftSize = 128;
    analyserRef.current = analyser;

    noiseNode.connect(filterNode);
    filterNode.connect(gainNode);
    gainNode.connect(analyser);
    analyser.connect(ctx.destination);

    noiseNode.start();
  };

  const updateAudioParams = (s = soundType, g = glassMode, playing = isPlaying) => {
    let cutoff = 2000;
    let targetGain = 0.15;
    let calculatedDb = 85;

    if (s === 'airport') {
      cutoff = 3200;
      calculatedDb = 98;
    } else if (s === 'rain') {
      cutoff = 1500;
      calculatedDb = 72;
    }

    if (g === 'none') {
      targetGain = 0.35;
    } else if (g === 'standard') {
      cutoff *= 0.6;
      targetGain = 0.18;
      calculatedDb -= 22;
    } else if (g === 'triplex') {
      cutoff *= 0.2;
      targetGain = 0.04;
      calculatedDb -= 45;
    }

    setDbValue(Math.max(25, calculatedDb));

    if (filterNodeRef.current && audioCtxRef.current) {
      filterNodeRef.current.frequency.setTargetAtTime(cutoff, audioCtxRef.current.currentTime, 0.1);
    }
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setTargetAtTime(playing ? targetGain : 0, audioCtxRef.current.currentTime, 0.1);
    }
  };

  const togglePlay = () => {
    initAudio();
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    const nextState = !isPlaying;
    setIsPlaying(nextState);
    updateAudioParams(soundType, glassMode, nextState);
    playTone(nextState ? 880 : 440, 0.04);
  };

  const handleSoundChange = (st) => {
    setSoundType(st);
    updateAudioParams(st, glassMode, isPlaying);
    playTone(650, 0.03);
  };

  const handleGlassChange = (gm) => {
    setGlassMode(gm);
    updateAudioParams(soundType, gm, isPlaying);
    playTone(750, 0.03);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    const dataArray = new Uint8Array(64);

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      ctx.clearRect(0, 0, w, h);

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
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

        if (isPlaying && analyserRef.current) {
          analyserRef.current.getByteFrequencyData(dataArray);
          const dataIdx = Math.floor((i / bars) * dataArray.length);
          amplitude = (dataArray[dataIdx] / 255) || 0.1;
        } else {
          amplitude = Math.abs(Math.sin(time + i * 0.18)) * 0.12 + 0.05;
        }

        if (glassMode === 'triplex') {
          amplitude *= 0.28;
        } else if (glassMode === 'standard') {
          amplitude *= 0.65;
        }

        const barHeight = Math.max(4, amplitude * (h * 0.7));
        const x = i * (barWidth + 3) + 1.5;
        const y = (h - barHeight) / 2;

        let color = '#3B82F6';
        if (glassMode === 'triplex') {
          color = '#10B981';
        } else if (glassMode === 'none') {
          color = '#EF4444';
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

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [isPlaying, glassMode]);

  return (
    <section id="acoustic-simulator" style={{ background: '#0F2167', color: '#fff', padding: '4rem 1.5rem', position: 'relative' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ color: '#60A5FA', fontSize: '0.8125rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            WEB AUDIO API SOUND SIMULATOR
          </div>
          <h2 style={{ fontSize: '2.25rem', fontWeight: 900, textTransform: 'uppercase', marginTop: '0.5rem', color: '#fff' }}>
            Acoustic Noise <span style={{ color: '#60A5FA' }}>Attenuation Test</span>
          </h2>
          <p style={{ color: '#94A3B8', marginTop: '0.5rem', maxWidth: '600px', marginInline: 'auto' }}>
            Listen and visually compare external noise levels (Traffic, Airport, Rain) with Standard Glass vs. GLAZE TEMP Triplex Acoustic PVB Glass.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', alignItems: 'center' }}>
          {/* Waveform Canvas & Play Controls */}
          <div style={{ background: '#0B192C', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Volume2 color="#60A5FA" size={20} />
                <span style={{ fontWeight: 800, fontSize: '0.9375rem', textTransform: 'uppercase' }}>Frequency Spectrum Analyser</span>
              </div>
              <div style={{ fontSize: '0.8125rem', color: '#94A3B8', fontWeight: 700 }}>
                {glassMode === 'triplex' ? '🛡️ Triplex Acoustic (-45dB)' : glassMode === 'standard' ? '🪟 Standard Single (-22dB)' : '🔊 Open Window (Unfiltered)'}
              </div>
            </div>

            <div style={{ height: '220px', background: 'rgba(0,0,0,0.3)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }}>
              <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
            </div>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: 'space-between' }}>
              <button
                onClick={togglePlay}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.875rem 1.75rem',
                  borderRadius: '9999px',
                  background: isPlaying ? '#EF4444' : '#1D4ED8',
                  color: '#fff',
                  border: 'none',
                  fontWeight: 800,
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  boxShadow: isPlaying ? '0 0 20px rgba(239, 68, 68, 0.4)' : '0 0 20px rgba(29, 78, 216, 0.4)',
                  transition: 'all 0.3s ease',
                }}
              >
                {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                <span>{isPlaying ? 'Pause Audio Simulation' : 'Simulate Sound Attenuation'}</span>
              </button>

              {/* DB Level Meter */}
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.5rem 1rem', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: 700 }}>SPL Meter:</span>
                <span style={{ fontSize: '1.25rem', fontWeight: 900, color: glassMode === 'triplex' ? '#10B981' : glassMode === 'standard' ? '#FBBF24' : '#EF4444' }}>
                  {dbValue} dB
                </span>
              </div>
            </div>
          </div>

          {/* Mode Selectors */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Environment Noise Preset */}
            <div style={{ background: 'rgba(255,255,255,0.04)', padding: '1.25rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: '0.8125rem', fontWeight: 800, color: '#94A3B8', marginBottom: '0.75rem', textTransform: 'uppercase' }}>
                Select Noise Source
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {[
                  { id: 'traffic', label: '🚗 Heavy City Traffic (85dB)' },
                  { id: 'airport', label: '✈️ Jet Runway Flight (98dB)' },
                  { id: 'rain', label: '🌧️ Heavy Downpour Rain (72dB)' },
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => handleSoundChange(s.id)}
                    style={{
                      padding: '0.625rem 1rem',
                      borderRadius: '8px',
                      textAlign: 'left',
                      border: '1px solid',
                      borderColor: soundType === s.id ? '#3B82F6' : 'rgba(255,255,255,0.1)',
                      background: soundType === s.id ? 'rgba(29, 78, 216, 0.25)' : 'transparent',
                      color: soundType === s.id ? '#fff' : '#CBD5E1',
                      fontWeight: soundType === s.id ? 800 : 500,
                      fontSize: '0.8125rem',
                      cursor: 'pointer',
                    }}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Glass Barrier Preset */}
            <div style={{ background: 'rgba(255,255,255,0.04)', padding: '1.25rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: '0.8125rem', fontWeight: 800, color: '#94A3B8', marginBottom: '0.75rem', textTransform: 'uppercase' }}>
                Glass Barrier Shield
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {[
                  { id: 'triplex', label: '🛡️ Triplex Acoustic PVB Glass', desc: 'STC 44dB (-45dB attenuation)' },
                  { id: 'standard', label: '🪟 Standard 6mm Clear Glass', desc: 'STC 28dB (-22dB attenuation)' },
                  { id: 'none', label: '🔊 Unfiltered Outdoor Noise', desc: '0dB Attenuation' },
                ].map((g) => (
                  <button
                    key={g.id}
                    onClick={() => handleGlassChange(g.id)}
                    style={{
                      padding: '0.75rem 1rem',
                      borderRadius: '8px',
                      textAlign: 'left',
                      border: '1px solid',
                      borderColor: glassMode === g.id ? '#10B981' : 'rgba(255,255,255,0.1)',
                      background: glassMode === g.id ? 'rgba(16, 185, 129, 0.2)' : 'transparent',
                      color: glassMode === g.id ? '#fff' : '#CBD5E1',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ fontWeight: 800, fontSize: '0.8125rem' }}>{g.label}</div>
                    <div style={{ fontSize: '0.6875rem', color: '#94A3B8', marginTop: '2px' }}>{g.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const AudioFXContext = createContext();

export function AudioFXProvider({ children }) {
  const [enabled, setEnabled] = useState(() => {
    return localStorage.getItem('glaze_audio_fx') === 'true';
  });

  const audioCtxRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('glaze_audio_fx', enabled ? 'true' : 'false');
  }, [enabled]);

  const playTone = (freq = 600, duration = 0.04, type = 'sine') => {
    if (!enabled) return;
    try {
      if (!audioCtxRef.current) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        audioCtxRef.current = new AudioContext();
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }

      const osc = audioCtxRef.current.createOscillator();
      const gain = audioCtxRef.current.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtxRef.current.currentTime);
      gain.gain.setValueAtTime(0.03, audioCtxRef.current.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtxRef.current.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioCtxRef.current.destination);

      osc.start();
      osc.stop(audioCtxRef.current.currentTime + duration);
    } catch {
      // Ignore web audio errors
    }
  };

  const toggleAudio = () => {
    const nextState = !enabled;
    setEnabled(nextState);
    if (nextState) playTone(880, 0.06);
  };

  return (
    <AudioFXContext.Provider value={{ enabled, toggleAudio, playTone }}>
      {children}
    </AudioFXContext.Provider>
  );
}

export function useAudioFX() {
  const context = useContext(AudioFXContext);
  if (!context) {
    throw new Error('useAudioFX must be used within an AudioFXProvider');
  }
  return context;
}

import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to Top"
      style={{
        position: 'fixed',
        bottom: '2rem',
        left: '2rem',
        zIndex: 900,
        width: '44px',
        height: '44px',
        borderRadius: '50%',
        background: '#1D4ED8',
        color: '#FFFFFF',
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 8px 20px rgba(29, 78, 216, 0.35)',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
      }}
    >
      <ArrowUp size={20} />
    </button>
  );
}

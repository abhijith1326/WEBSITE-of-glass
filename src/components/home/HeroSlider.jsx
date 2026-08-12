import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { useAudioFX } from '../../context/AudioFXContext';

const SLIDES = [
  {
    image: '/assets/images/slider-1.jpg',
    badge: 'PREMIUM ARCHITECTURAL GLASS',
    title: 'PERFECTING SPACES WITH GLASS & PLYWOODS',
    highlight: 'GLASS & PLYWOODS',
    subtitle: 'Experience the beauty of high-end glass that brings clarity, style, and structural strength to every architectural space.',
    btnPrimaryText: 'EXPLORE PRODUCTS →',
    btnPrimaryLink: '/products',
    btnSecondaryText: 'OUR PROJECTS →',
    btnSecondaryLink: '/projects'
  },
  {
    image: '/assets/images/slider-2.jpg',
    badge: 'GLASS & PLYWOOD SYNERGY',
    title: 'PERFECT COMBINATION OF GLASS & PLYWOOD',
    highlight: 'GLASS & PLYWOOD',
    subtitle: 'Strength, Elegance & Versatility. Sleek toughened glass seamlessly paired with premium, moisture-resistant plywood solutions.',
    btnPrimaryText: 'PLYWOOD SOLUTIONS →',
    btnPrimaryLink: '/plywood-solutions',
    btnSecondaryText: 'GET A QUOTE →',
    btnSecondaryLink: '/contact'
  },
  {
    image: '/assets/images/slider-3.jpg',
    badge: 'HIGH-PERFORMANCE GLAZING',
    title: 'INNOVATIVE GLASS SOLUTIONS FOR MODERN BUILDINGS',
    highlight: 'GLASS SOLUTIONS',
    subtitle: 'Toughened, laminated, insulated and acoustic glass engineered for commercial landmarks and luxury residential designs.',
    btnPrimaryText: 'GLASS SOLUTIONS →',
    btnPrimaryLink: '/glass-solutions',
    btnSecondaryText: 'CONTACT US →',
    btnSecondaryLink: '/contact'
  }
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const { playTone } = useAudioFX();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index) => {
    playTone(600, 0.03);
    setCurrent(index);
  };

  const nextSlide = () => {
    playTone(650, 0.03);
    setCurrent((prev) => (prev + 1) % SLIDES.length);
  };

  const prevSlide = () => {
    playTone(550, 0.03);
    setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  return (
    <section className="hero" style={{ position: 'relative', minHeight: '560px', overflow: 'hidden' }}>
      <div className="hero-slides" style={{ position: 'relative', width: '100%', minHeight: '560px' }}>
        {SLIDES.map((slide, idx) => (
          <div
            key={idx}
            className={`hero-slide ${idx === current ? 'active' : ''}`}
            style={{
              position: 'absolute',
              inset: 0,
              opacity: idx === current ? 1 : 0,
              visibility: idx === current ? 'visible' : 'hidden',
              transition: 'opacity 0.9s cubic-bezier(0.4, 0, 0.2, 1), visibility 0.9s ease',
              backgroundImage: `url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'flex',
              alignItems: 'center',
              paddingTop: '4.5rem',
              paddingBottom: '6.5rem',
            }}
          >
            <div className="hero-overlay" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.96) 0%, rgba(255, 255, 255, 0.88) 48%, rgba(255, 255, 255, 0.2) 100%)' }} />
            <div className="hero-container" style={{ position: 'relative', zIndex: 10, maxWidth: '1340px', marginInline: 'auto', paddingInline: 'clamp(1rem, 4vw, 3rem)', width: '100%' }}>
              <div className="hero-content" style={{ maxWidth: '600px' }}>
                <div className="hero-badge">{slide.badge}</div>
                <h1 className="hero-title" style={{ fontSize: 'clamp(2.25rem, 4.5vw, 3.25rem)', fontWeight: 900, lineHeight: 1.15, textTransform: 'uppercase', marginBottom: '1.25rem', color: '#0F172A' }}>
                  {slide.title.replace(slide.highlight, '')}
                  <span style={{ color: '#1D4ED8' }}>{slide.highlight}</span>
                </h1>
                <p className="hero-subtitle" style={{ fontSize: '1.0625rem', color: '#475569', marginBottom: '2rem', lineHeight: 1.6 }}>
                  {slide.subtitle}
                </p>
                <div className="hero-actions" style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
                  <Link to={slide.btnPrimaryLink} className="btn btn-royal">
                    {slide.btnPrimaryText}
                  </Link>
                  <Link to={slide.btnSecondaryLink} className="btn btn-outline-white">
                    {slide.btnSecondaryText}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        aria-label="Previous Slide"
        style={{
          position: 'absolute',
          left: '1.5rem',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 20,
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.9)',
          border: '1px solid #CBD5E1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        }}
      >
        <ChevronLeft size={22} color="#0F172A" />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next Slide"
        style={{
          position: 'absolute',
          right: '1.5rem',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 20,
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.9)',
          border: '1px solid #CBD5E1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        }}
      >
        <ChevronRight size={22} color="#0F172A" />
      </button>

      {/* Line Indicators */}
      <div className="hero-indicators" style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', zIndex: 20, display: 'flex', gap: '0.5rem' }}>
        {SLIDES.map((_, idx) => (
          <div
            key={idx}
            onClick={() => goToSlide(idx)}
            style={{
              width: idx === current ? '40px' : '16px',
              height: '4px',
              borderRadius: '2px',
              background: idx === current ? '#1D4ED8' : 'rgba(15, 23, 42, 0.25)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </div>
    </section>
  );
}

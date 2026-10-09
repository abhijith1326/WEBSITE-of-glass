import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { useAudioFX } from '../../context/AudioFXContext';

const SLIDES = [
  {
    image: '/assets/images/slider-1.jpg',
    badge: 'TRIVANDRUM GLASS',
    title: 'PREMIUM GLASS & ARCHITECTURAL SOLUTIONS IN TRIVANDRUM',
    highlight: 'SOLUTIONS IN TRIVANDRUM',
    subtitle: 'High-performance glass solutions engineered for structural strength, safety and lasting quality.',
    btnPrimaryText: 'Get a Free Quote →',
    btnPrimaryLink: '/contact',
    btnSecondaryText: 'Explore Our Glass Solutions →',
    btnSecondaryLink: '/glass-solutions'
  },
  {
    image: '/assets/images/slider-2.jpg',
    badge: 'ENGINEERED FOR SAFETY',
    title: 'TOUGHENED GLASS & TRIVANDRUM GLASS SOLUTIONS',
    highlight: 'TRIVANDRUM GLASS SOLUTIONS',
    subtitle: 'Toughened glass, frameless partitions, railings and custom architectural glazing.',
    btnPrimaryText: 'Explore Our Glass Solutions →',
    btnPrimaryLink: '/glass-solutions',
    btnSecondaryText: 'Contact Us →',
    btnSecondaryLink: '/contact'
  },
  {
    image: '/assets/images/slider-3.jpg',
    badge: 'DESIGNED FOR ELEGANCE',
    title: 'PREMIUM GLASS SOLUTIONS FOR MODERN SPACES',
    highlight: 'MODERN SPACES',
    subtitle: 'Certified safety glass and architectural glazing tailored for contemporary homes and commercial buildings.',
    btnPrimaryText: 'Get a Free Quote →',
    btnPrimaryLink: '/contact',
    btnSecondaryText: 'Contact Us →',
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
            <div className="hero-overlay" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.96) 0%, rgba(255, 255, 255, 0.9) 55%, rgba(255, 255, 255, 0.4) 100%)' }} />
            <div className="hero-container" style={{ position: 'relative', zIndex: 10, maxWidth: '1340px', marginInline: 'auto', paddingInline: 'clamp(1rem, 4vw, 3rem)', width: '100%' }}>
              <div className="hero-content" style={{ maxWidth: '600px' }}>
                <div className="hero-badge">{slide.badge}</div>
                <h1 className="hero-title" style={{ fontSize: 'clamp(1.65rem, 5.5vw, 3.25rem)', fontWeight: 900, lineHeight: 1.15, textTransform: 'uppercase', marginBottom: '1.25rem', color: '#0F172A' }}>
                  {slide.title.replace(slide.highlight, '')}
                  <span style={{ color: '#1D4ED8' }}>{slide.highlight}</span>
                </h1>
                <p className="hero-subtitle" style={{ fontSize: 'clamp(0.875rem, 3.2vw, 1.0625rem)', color: '#475569', marginBottom: '1.75rem', lineHeight: 1.6 }}>
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
        className="hero-arrow-btn hero-arrow-left"
        style={{
          position: 'absolute',
          left: 'clamp(0.5rem, 2vw, 1.5rem)',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 20,
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.92)',
          border: '1px solid #CBD5E1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        }}
      >
        <ChevronLeft size={20} color="#0F172A" />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next Slide"
        className="hero-arrow-btn hero-arrow-right"
        style={{
          position: 'absolute',
          right: 'clamp(0.5rem, 2vw, 1.5rem)',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 20,
          width: '40px',
          height: '40px',
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

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Box, Check, ShieldCheck, Zap, Layers, Sparkles, Award, Sliders } from 'lucide-react';
import Hero3DCanvas from '../components/home/Hero3DCanvas';
import FeatureStrip from '../components/home/FeatureStrip';
import GlassVisualizerCanvas from '../components/tools/GlassVisualizerCanvas';
import AcousticSimulatorCanvas from '../components/tools/AcousticSimulatorCanvas';
import SpecCalculator from '../components/tools/SpecCalculator';
import { useSampleCart } from '../context/SampleCartContext';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function Home() {
  const { addItem } = useSampleCart();

  // Initialize smooth viewport scroll reveals
  useScrollReveal();

  const productCards = [
    {
      id: 'toughened-glass',
      name: 'Toughened Safety Glass',
      category: 'GLASS',
      image: '/assets/images/toughened-glass.png',
      desc: 'High mechanical strength & thermal shock resistance engineered up to 5x stronger than annealed glass.',
      tag: 'ISO Certified Safety',
      uVal: '1.2 W/m²K',
      stc: '34 dB',
      type: 'glass'
    },
    {
      id: 'insulated-glass',
      name: 'Insulated Double & Triple Units',
      category: 'GLASS',
      image: '/assets/images/insulated-glass.png',
      desc: 'Argon gas filled dual and triple seals for maximum HVAC thermal efficiency and noise reduction.',
      tag: 'U-Value 0.65',
      uVal: '0.65 W/m²K',
      stc: '42 dB',
      type: 'glass'
    },
    {
      id: 'bwp-plywood',
      name: 'BWP Marine Grade Plywood',
      category: 'PLYWOOD',
      image: '/assets/images/bwp-plywood.png',
      desc: '100% boiling waterproof, phenol-formaldehyde synthetic resin bonded hardwood plywood.',
      tag: 'BS 1088 Standard',
      uVal: '72hr Boiling',
      stc: 'IS 710',
      type: 'plywood'
    },
    {
      id: 'laminated-glass',
      name: 'Acoustic PVB Laminated Glass',
      category: 'GLASS',
      image: '/assets/images/laminated-glass.png',
      desc: 'Interlayer sound dampening technology reducing city noise up to 44dB with shatter-proof retention.',
      tag: '44dB Noise Drop',
      uVal: '1.8 W/m²K',
      stc: '44 dB',
      type: 'glass'
    },
    {
      id: 'decorative-plywood',
      name: 'Fire-Retardant Architectural Ply',
      category: 'PLYWOOD',
      image: '/assets/images/decorative-plywood.png',
      desc: 'Treated with nano-ceramic fire barrier compounds to retard flame spread in interior spaces.',
      tag: 'Flame Barrier',
      uVal: 'Class 1 Fire',
      stc: 'Nano Core',
      type: 'plywood'
    },
    {
      id: 'curved-glass',
      name: 'Electrochromic Dynamic Glass',
      category: 'GLASS',
      image: '/assets/images/curved-glass.png',
      desc: 'Switchable electronic tinting for real-time solar heat gain control and instant privacy.',
      tag: 'Smart Glazing',
      uVal: '0.80 W/m²K',
      stc: '38 dB',
      type: 'glass'
    }
  ];

  return (
    <div style={{ background: '#04070D', color: '#F8FAFC', overflowX: 'hidden' }}>
      {/* 3D Glass & Plywood Full-Screen Hero Canvas Scrubber */}
      <Hero3DCanvas />

      {/* Feature Highlights Strip */}
      <div className="reveal-glass-3d">
        <FeatureStrip />
      </div>

      {/* Featured Products Section with 3D Glass & Plywood Cards */}
      <section style={{ padding: '6rem 1.5rem', background: '#080C14', position: 'relative' }}>
        {/* Subtle Ambient Lighting Orbs */}
        <div className="orb orb-blue" style={{ top: '10%', left: '5%', width: '400px', height: '400px', opacity: 0.15 }} />
        <div className="orb orb-emerald" style={{ bottom: '15%', right: '5%', width: '500px', height: '500px', opacity: 0.1 }} />

        <div style={{ maxWidth: '1340px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          {/* Section Header */}
          <div className="reveal-glass-3d" style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#60A5FA', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.75rem' }}>
              <Sparkles size={14} /> ARCHITECTURAL MATERIAL EXCELLENCE
            </div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em', color: '#FFFFFF' }}>
              ENGINEERED <span>3D GLASS & PLYWOOD</span>
            </h2>
            <p style={{ color: '#94A3B8', marginTop: '1rem', maxWidth: '640px', marginInline: 'auto', fontSize: '1.0625rem', lineHeight: 1.6 }}>
              Explore structural safety glass, acoustic sound barriers, and boiling waterproof marine hardwood ply crafted for modern architectural landmarks.
            </p>
          </div>

          {/* Cards Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {productCards.map((p, idx) => {
              const isPly = p.type === 'plywood';
              return (
                <div
                  key={p.id}
                  className={`reveal-glass-3d specular-sheen ${isPly ? 'plywood-card-3d' : 'glass-card-3d'}`}
                  style={{
                    transitionDelay: `${(idx % 3) * 120}ms`,
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                  }}
                >
                  {/* Card Image Container with Specular Glow */}
                  <div style={{ position: 'relative', height: '240px', overflow: 'hidden', background: '#0B132B' }}>
                    <img
                      src={p.image}
                      alt={p.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.08)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                    />
                    
                    {/* Category Tag */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '1rem',
                        left: '1rem',
                        background: isPly ? 'rgba(217, 119, 6, 0.85)' : 'rgba(29, 78, 216, 0.85)',
                        color: '#FFFFFF',
                        padding: '0.3rem 0.875rem',
                        borderRadius: '9999px',
                        fontSize: '0.6875rem',
                        fontWeight: 900,
                        letterSpacing: '0.08em',
                        backdropFilter: 'blur(8px)',
                      }}
                    >
                      {p.category}
                    </div>

                    {/* Standard Tag */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        background: 'rgba(8, 12, 20, 0.8)',
                        border: '1px solid rgba(255,255,255,0.15)',
                        color: isPly ? '#F59E0B' : '#60A5FA',
                        padding: '0.3rem 0.75rem',
                        borderRadius: '9999px',
                        fontSize: '0.6875rem',
                        fontWeight: 800,
                        backdropFilter: 'blur(8px)',
                      }}
                    >
                      {p.tag}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div style={{ padding: '1.75rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#F8FAFC', marginBottom: '0.625rem', lineHeight: 1.25 }}>
                        {p.name}
                      </h3>
                      <p style={{ color: '#94A3B8', fontSize: '0.9375rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                        {p.desc}
                      </p>

                      {/* Technical Specs Strip */}
                      <div
                        style={{
                          display: 'flex',
                          gap: '1rem',
                          padding: '0.75rem',
                          background: 'rgba(255,255,255,0.03)',
                          borderRadius: '12px',
                          border: '1px solid rgba(255,255,255,0.06)',
                          marginBottom: '1.5rem',
                        }}
                      >
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: '0.625rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>SPEC / EFFICIENCY</div>
                          <div style={{ fontSize: '0.875rem', fontWeight: 800, color: isPly ? '#F59E0B' : '#60A5FA' }}>{p.uVal}</div>
                        </div>
                        <div style={{ width: '1px', background: 'rgba(255,255,255,0.08)' }} />
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: '0.625rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>RATING / CERT</div>
                          <div style={{ fontSize: '0.875rem', fontWeight: 800, color: '#34D399' }}>{p.stc}</div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div style={{ display: 'flex', gap: '0.75rem', marginTop: 'auto' }}>
                      <Link
                        to="/products"
                        style={{
                          flex: 1,
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.5rem',
                          padding: '0.75rem 1rem',
                          borderRadius: '10px',
                          background: isPly
                            ? 'linear-gradient(135deg, #B45309 0%, #D97706 100%)'
                            : 'linear-gradient(135deg, #1D4ED8 0%, #3B82F6 100%)',
                          color: '#FFFFFF',
                          fontWeight: 800,
                          fontSize: '0.75rem',
                          letterSpacing: '0.04em',
                          textDecoration: 'none',
                          boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                          transition: 'all 0.3s ease',
                        }}
                      >
                        <span>VIEW SPECS</span>
                        <ArrowRight size={14} />
                      </Link>
                      <button
                        onClick={() => addItem({ id: p.id, name: p.name, type: p.category })}
                        style={{
                          padding: '0.75rem 1rem',
                          borderRadius: '10px',
                          border: '1px solid rgba(255,255,255,0.18)',
                          background: 'rgba(255,255,255,0.06)',
                          backdropFilter: 'blur(10px)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.375rem',
                          fontSize: '0.75rem',
                          fontWeight: 800,
                          color: '#F8FAFC',
                          transition: 'all 0.3s ease',
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
                      >
                        <Box size={14} color={isPly ? '#F59E0B' : '#60A5FA'} />
                        <span>SAMPLE</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive 3D Canvas Optics & Light Visualizer */}
      <div className="reveal-depth">
        <GlassVisualizerCanvas />
      </div>

      {/* Web Audio API Sound Attenuation Simulator */}
      <div className="reveal-glass-3d">
        <AcousticSimulatorCanvas />
      </div>

      {/* Spec & Load Calculator */}
      <div className="reveal-depth">
        <SpecCalculator />
      </div>

      {/* Stats Counter Section with Ultra-Glass Glow Cards */}
      <section style={{ padding: '6rem 1.5rem', background: '#04070D', position: 'relative' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div
            className="reveal-glass-3d"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1.75rem',
            }}
          >
            {[
              { num: '1,500+', label: 'Landmark Projects', detail: 'Commercial Facades & Interiors', color: '#60A5FA' },
              { num: '99.8%', label: 'Quality Pass Rate', detail: 'Automated Laser Scanning', color: '#34D399' },
              { num: '25+ Yrs', label: 'Manufacturing Legacy', detail: 'State-of-the-art Tempering Furnaces', color: '#FBBF24' },
              { num: 'ISO 9001', label: 'Certified Standards', detail: 'BS 1088 & IS 710 Compliant', color: '#A78BFA' },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="glass-card-3d"
                style={{
                  padding: '2rem 1.5rem',
                  textAlign: 'center',
                  transitionDelay: `${idx * 100}ms`,
                }}
              >
                <div style={{ fontSize: '3.25rem', fontWeight: 900, color: stat.color, lineHeight: 1, marginBottom: '0.75rem' }}>
                  {stat.num}
                </div>
                <div style={{ fontSize: '0.9375rem', fontWeight: 800, color: '#F8FAFC', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.375rem' }}>
                  {stat.label}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
                  {stat.detail}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

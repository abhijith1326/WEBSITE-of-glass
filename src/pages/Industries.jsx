import React from 'react';
import { Home, Building2, ShieldCheck, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import FAQSection from '../components/home/FAQSection';

export default function Industries() {
  const residentialApps = [
    'Glass balcony railings', 'Staircase glass railings', 'Glass doors',
    'Shower enclosures', 'Glass partitions', 'Decorative mirrors',
    'Kitchen glass', 'Glass canopies', 'Interior glazing'
  ];

  const commercialApps = [
    'Offices', 'Retail stores', 'Showrooms', 'Hotels',
    'Restaurants', 'Clinics', 'Commercial buildings', 'Reception areas'
  ];

  const architecturalPillars = [
    { title: 'Safety', desc: 'IS 2553 & EN 12150 certified toughened & SGP laminated safety glass.' },
    { title: 'Design', desc: 'Frameless visual lines, custom CNC shapes, and high-transparency optics.' },
    { title: 'Performance', desc: 'Acoustic noise reduction up to 44dB & Low-E thermal solar control.' },
    { title: 'Durability', desc: 'Boiling waterproof, corrosion-resistant, and structural strength.' }
  ];

  return (
    <div style={{ background: '#04070D', color: '#F8FAFC', overflowX: 'hidden' }}>

      {/* Hero Banner */}
      <section style={{ padding: '6rem 1.5rem 4.5rem 1.5rem', background: '#080C14', borderBottom: '1px solid rgba(255,255,255,0.08)', textAlign: 'center' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ color: '#60A5FA', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '1rem' }}>
            TRIVANDRUM GLASS • SECTOR APPLICATIONS
          </div>
          <h1 style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em', color: '#FFFFFF', lineHeight: 1.15, marginBottom: '1.25rem' }}>
            RESIDENTIAL, COMMERCIAL & <span style={{ color: '#60A5FA' }}>ARCHITECTURAL GLAZING</span>
          </h1>
          <p style={{ color: '#94A3B8', fontSize: 'clamp(1rem, 2vw, 1.2rem)', lineHeight: 1.7, maxWidth: '820px', margin: '0 auto' }}>
            Transforming contemporary homes, corporate offices, retail spaces, and architectural landmarks across Trivandrum.
          </p>
        </div>
      </section>

      {/* Section 6: RESIDENTIAL GLASS SOLUTIONS */}
      <section style={{ padding: '5rem 1.5rem', background: '#04070D' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <div className="glass-card-3d" style={{ padding: '3rem 2.5rem', borderRadius: '24px', background: 'rgba(15, 23, 42, 0.75)', border: '1px solid rgba(96, 165, 250, 0.25)' }}>

            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#60A5FA', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '1rem' }}>
              <Home size={18} /> RESIDENTIAL GLASS SOLUTIONS
            </div>

            <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', fontWeight: 900, color: '#FFFFFF', marginBottom: '1rem' }}>
              Make Your Home Brighter. More Open. More Modern.
            </h2>

            <p style={{ color: '#CBD5E1', fontSize: '1.0625rem', lineHeight: 1.7, maxWidth: '840px', marginBottom: '2rem' }}>
              Give your home a modern architectural appearance with customized glass solutions. We combine elegant design with safety-certified toughened glass for luxury residences and contemporary homes in Trivandrum.
            </p>

            <div style={{ marginBottom: '2.5rem' }}>
              <div style={{ fontSize: '0.8125rem', fontWeight: 800, color: '#60A5FA', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1rem' }}>
                Residential Applications Include:
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                {residentialApps.map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', background: 'rgba(255,255,255,0.04)', padding: '0.875rem 1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <CheckCircle2 size={16} color="#34D399" />
                    <span style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#F8FAFC' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <Link
              to="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.875rem 1.75rem',
                borderRadius: '9999px',
                background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
                color: '#FFFFFF',
                fontWeight: 800,
                fontSize: '0.875rem',
                textDecoration: 'none'
              }}
            >
              <span>GET RESIDENTIAL GLASS QUOTE</span>
              <ArrowRight size={16} />
            </Link>

          </div>
        </div>
      </section>

      {/* Section 7: COMMERCIAL GLASS SOLUTIONS */}
      <section style={{ padding: '5rem 1.5rem', background: '#080C14' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <div className="glass-card-3d" style={{ padding: '3rem 2.5rem', borderRadius: '24px', background: 'rgba(15, 23, 42, 0.75)', border: '1px solid rgba(245, 158, 11, 0.25)' }}>

            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#F59E0B', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '1rem' }}>
              <Building2 size={18} /> COMMERCIAL GLASS SOLUTIONS
            </div>

            <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', fontWeight: 900, color: '#FFFFFF', marginBottom: '1rem' }}>
              Glass Solutions for Commercial Spaces
            </h2>

            <p style={{ color: '#CBD5E1', fontSize: '1.0625rem', lineHeight: 1.7, maxWidth: '840px', marginBottom: '2rem' }}>
              From office partitions to storefront glazing and architectural facades, our glass solutions are designed to support modern commercial interiors and exteriors, creating professional and visually appealing environments.
            </p>

            <div style={{ marginBottom: '2.5rem' }}>
              <div style={{ fontSize: '0.8125rem', fontWeight: 800, color: '#F59E0B', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1rem' }}>
                Suitable Commercial Environments:
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                {commercialApps.map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', background: 'rgba(255,255,255,0.04)', padding: '0.875rem 1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <CheckCircle2 size={16} color="#F59E0B" />
                    <span style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#F8FAFC' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <Link
              to="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.875rem 1.75rem',
                borderRadius: '9999px',
                background: 'linear-gradient(135deg, #D97706 0%, #B45309 100%)',
                color: '#FFFFFF',
                fontWeight: 800,
                fontSize: '0.875rem',
                textDecoration: 'none'
              }}
            >
              <span>GET COMMERCIAL GLASS QUOTE</span>
              <ArrowRight size={16} />
            </Link>

          </div>
        </div>
      </section>

      {/* Section 8: ARCHITECTURAL GLASS SOLUTIONS */}
      <section style={{ padding: '5rem 1.5rem', background: '#04070D' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#34D399', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '1rem' }}>
            <Sparkles size={16} /> ARCHITECTURAL GLAZING
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', fontWeight: 900, color: '#FFFFFF', marginBottom: '1rem' }}>
            Architectural Glass Solutions
          </h2>
          <p style={{ color: '#CBD5E1', fontSize: '1.0625rem', lineHeight: 1.7, maxWidth: '800px', margin: '0 auto 3rem auto' }}>
            Glass plays an important role in contemporary architecture by connecting indoor and outdoor spaces, maximizing natural light and creating clean visual lines. TRIVANDRUM GLASS provides architectural glass solutions for projects that require a combination of:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.75rem', marginBottom: '3.5rem' }}>
            {architecturalPillars.map((p, i) => (
              <div
                key={i}
                className="glass-card-3d"
                style={{
                  padding: '2rem',
                  borderRadius: '20px',
                  background: 'rgba(15, 23, 42, 0.75)',
                  border: '1px solid rgba(52, 211, 153, 0.25)',
                  textAlign: 'left'
                }}
              >
                <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#34D399', marginBottom: '0.5rem' }}>
                  {p.title}
                </div>
                <p style={{ color: '#94A3B8', fontSize: '0.90625rem', lineHeight: 1.6, margin: 0 }}>
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQSection showQuickAnswer={false} background="#080C14" />
    </div>
  );
}

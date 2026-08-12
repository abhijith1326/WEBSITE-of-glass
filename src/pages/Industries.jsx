import React from 'react';
import { Building2, Hotel, Home, Plane, Shield, Factory } from 'lucide-react';

export default function Industries() {
  const industries = [
    { title: 'Commercial Real Estate & Skyscraper Facades', icon: <Building2 size={32} color="#1D4ED8" />, desc: 'Structural unitised curtain walls, solar control triple IGUs, and frameless spider glazing for iconic towers.' },
    { title: 'Luxury Hospitality & Resorts', icon: <Hotel size={32} color="#1D4ED8" />, desc: 'High-dampening 44dB acoustic laminated glass and waterproof BWP marine plywood for luxury resorts & hotels.' },
    { title: 'Premium Residential & Villas', icon: <Home size={32} color="#1D4ED8" />, desc: 'Frameless glass balustrades, switchable privacy smart glass, and decorative veneer plywood for bespoke interiors.' },
    { title: 'Aviation, Marine & Automotive Glazing', icon: <Plane size={32} color="#1D4ED8" />, desc: 'Impact-resistant laminated safety glass and BS 1088 certified marine plywood for boat decks & terminals.' },
  ];

  return (
    <div>
      {/* Hero Banner */}
      <section style={{ background: '#0B192C', color: '#fff', padding: '5rem 1.5rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ color: '#60A5FA', fontSize: '0.8125rem', fontWeight: 800, textTransform: 'uppercase' }}>SECTOR SPECIFIC SOLUTIONS</div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, textTransform: 'uppercase', marginTop: '0.5rem', color: '#fff' }}>
            INDUSTRIES WE <span style={{ color: '#1D4ED8' }}>SERVE</span>
          </h1>
          <p style={{ color: '#94A3B8', marginTop: '0.75rem', fontSize: '1.125rem', lineHeight: 1.6 }}>
            Engineered glass and plywood solutions tailored to the exacting demands of commercial towers, luxury hospitality, and naval transport.
          </p>
        </div>
      </section>

      <section style={{ padding: '4rem 1.5rem', background: '#F8FAFC' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          {industries.map((ind, idx) => (
            <div key={idx} style={{ background: '#FFFFFF', padding: '2.5rem', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 10px 25px rgba(0,0,0,0.03)' }}>
              <div style={{ marginBottom: '1.25rem' }}>{ind.icon}</div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.75rem' }}>{ind.title}</h3>
              <p style={{ color: '#475569', fontSize: '0.875rem', lineHeight: 1.6 }}>{ind.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

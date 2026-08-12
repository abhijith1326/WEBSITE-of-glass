import React from 'react';
import { Leaf, Sun, RefreshCw, Zap, Award, Globe } from 'lucide-react';

export default function Sustainability() {
  const initiatives = [
    { title: '5 MW Solar Power Generation', desc: 'Roof-mounted solar arrays power 45% of our float glass furnace and tempering kilns with clean renewable energy.' },
    { title: 'Closed-Loop Water Recycling', desc: '100% of industrial water used during glass cutting and grinding is purified and recirculated with zero municipal discharge.' },
    { title: 'Recycled Cullet Integration', desc: 'Over 30% of furnace raw batch consists of recycled post-consumer cullet, reducing melting temperature and CO₂ emissions.' },
    { title: 'EPD Certified Materials', desc: 'Verified Environmental Product Declarations (EPD) enabling LEED v4 & BREEAM green building points.' },
  ];

  return (
    <div>
      {/* Hero Banner */}
      <section style={{ background: '#0B192C', color: '#fff', padding: '5rem 1.5rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ color: '#34D399', fontSize: '0.8125rem', fontWeight: 800, textTransform: 'uppercase' }}>ECO RESPONSIBILITY & DECARBONIZATION</div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, textTransform: 'uppercase', marginTop: '0.5rem', color: '#fff' }}>
            CARBON NEUTRAL <span style={{ color: '#34D399' }}>BY 2030</span>
          </h1>
          <p style={{ color: '#94A3B8', marginTop: '0.75rem', fontSize: '1.125rem', lineHeight: 1.6 }}>
            Pioneering sustainable glazing technology, renewable energy integration, and closed-loop material recycling for greener architecture.
          </p>
        </div>
      </section>

      {/* Initiatives Grid */}
      <section style={{ padding: '4rem 1.5rem', background: '#F8FAFC' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          {initiatives.map((item, idx) => (
            <div key={idx} style={{ background: '#FFFFFF', padding: '2rem', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 10px 25px rgba(0,0,0,0.03)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <Leaf size={26} color="#10B981" />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.75rem' }}>{item.title}</h3>
              <p style={{ color: '#475569', fontSize: '0.875rem', lineHeight: 1.6 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

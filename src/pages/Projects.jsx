import React, { useState } from 'react';
import { Building2, MapPin, Calendar, Layers } from 'lucide-react';
import { useAudioFX } from '../context/AudioFXContext';

export default function Projects() {
  const [filter, setFilter] = useState('all');
  const { playTone } = useAudioFX();

  const handleFilter = (cat) => {
    playTone(600, 0.03);
    setFilter(cat);
  };

  const projects = [
    { id: 1, category: 'commercial', title: 'Skyline Landmark Tower', location: 'Dubai, UAE', area: '14,000 m² Facade', glass: 'Low-E Triple IGU', year: '2024', image: '/assets/images/glass-skyscraper.png' },
    { id: 2, category: 'hospitality', title: 'Grand Resort & Spa', location: 'Maldives', area: '6,500 m² Glazing', glass: 'Acoustic PVB + Marine Ply', year: '2023', image: '/assets/images/hero-interior.png' },
    { id: 3, category: 'residential', title: 'Horizon Luxury Penthouse', location: 'Singapore', area: '3,200 m² Glass', glass: 'Smart Electrochromic', year: '2024', image: '/assets/images/office-interior.png' },
    { id: 4, category: 'commercial', title: 'Nexus FinTech Headquarters', location: 'Bangalore, India', area: '11,500 m² Curtain Wall', glass: 'Solar Control Low-E', year: '2023', image: '/assets/images/office.png' },
    { id: 5, category: 'hospitality', title: 'Aura Boutique Hotel', location: 'Kochi, India', area: '4,800 m² Decorative Ply', glass: 'Custom Acid-Etched', year: '2022', image: '/assets/images/glass-partitions.png' },
    { id: 6, category: 'industrial', title: 'BioTech Cleanroom Facility', location: 'Frankfurt, Germany', area: '8,000 m² Clean Wall', glass: 'Flush Laminated Safety', year: '2024', image: '/assets/images/factory.png' },
  ];

  const filteredProjects = filter === 'all' ? projects : projects.filter((p) => p.category === filter);

  return (
    <div>
      {/* Hero Banner */}
      <section style={{ background: '#0B192C', color: '#fff', padding: '5rem 1.5rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ color: '#60A5FA', fontSize: '0.8125rem', fontWeight: 800, textTransform: 'uppercase' }}>PORTFOLIO & CASE STUDIES</div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, textTransform: 'uppercase', marginTop: '0.5rem', color: '#fff' }}>
            1,200+ PROJECTS <span style={{ color: '#1D4ED8' }}>WORLDWIDE</span>
          </h1>
          <p style={{ color: '#94A3B8', marginTop: '0.75rem', fontSize: '1.125rem', lineHeight: 1.6 }}>
            From Dubai's tallest towers to heritage hotel restorations — GLAZE TEMP materials shape iconic architectural skylines.
          </p>
        </div>
      </section>

      {/* Featured Project Showcase */}
      <section style={{ padding: '3rem 1.5rem', background: '#F8FAFC' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <div style={{ position: 'relative', borderRadius: '20px', overflow: 'hidden', height: '400px', boxShadow: '0 20px 40px rgba(0,0,0,0.12)' }}>
            <img src="/assets/images/glass-skyscraper.png" alt="Skyline Landmark Tower" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(11,25,44,0.95) 0%, rgba(11,25,44,0.3) 60%, transparent 100%)', padding: '2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', color: '#fff' }}>
              <div style={{ background: '#1D4ED8', color: '#fff', padding: '0.25rem 0.875rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 800, width: 'fit-content', marginBottom: '0.75rem' }}>
                ⭐ FEATURED PROJECT OF THE YEAR
              </div>
              <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', fontWeight: 900, textTransform: 'uppercase' }}>
                Skyline Landmark Tower — Dubai, UAE
              </h2>
              <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.5rem', fontSize: '0.875rem', color: '#CBD5E1', flexWrap: 'wrap' }}>
                <span><strong>Facade Area:</strong> 14,000 m²</span>
                <span><strong>Glass Type:</strong> Low-E Solar Control IGU</span>
                <span><strong>Plywood:</strong> Marine Core Paneling</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Tabs & Grid */}
      <section style={{ padding: '3rem 1.5rem 5rem', background: '#FFFFFF' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
            {[
              { id: 'all', label: 'All Projects' },
              { id: 'commercial', label: 'Commercial Towers' },
              { id: 'hospitality', label: 'Hospitality & Hotels' },
              { id: 'residential', label: 'Luxury Residential' },
              { id: 'industrial', label: 'Industrial & Cleanrooms' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => handleFilter(f.id)}
                style={{
                  padding: '0.625rem 1.25rem',
                  borderRadius: '9999px',
                  border: '1px solid',
                  borderColor: filter === f.id ? '#1D4ED8' : '#CBD5E1',
                  background: filter === f.id ? '#1D4ED8' : '#F8FAFC',
                  color: filter === f.id ? '#FFFFFF' : '#0F172A',
                  fontWeight: 800,
                  fontSize: '0.8125rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {filteredProjects.map((p) => (
              <div key={p.id} style={{ background: '#F8FAFC', borderRadius: '16px', border: '1px solid #E2E8F0', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0,0,0,0.04)' }}>
                <div style={{ height: '220px', overflow: 'hidden' }}>
                  <img src={p.image} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#1D4ED8', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                    {p.category}
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.5rem' }}>
                    {p.title}
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', fontSize: '0.8125rem', color: '#475569' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}><MapPin size={14} color="#1D4ED8" /> {p.location}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}><Building2 size={14} color="#1D4ED8" /> {p.area}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}><Layers size={14} color="#1D4ED8" /> {p.glass}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

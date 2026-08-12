import React from 'react';
import { Briefcase, Users, Award, MapPin } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export default function Careers() {
  const { addToast } = useToast();

  const jobs = [
    { title: 'Senior Architectural Sales Engineer', department: 'Commercial Sales', location: 'Dubai, UAE', type: 'Full-time' },
    { title: 'Glass Processing Operations Lead', department: 'Manufacturing Plant', location: 'Bangalore, India', type: 'Full-time' },
    { title: 'Façade Thermal & Optics Engineer', department: 'R&D Engineering', location: 'Singapore', type: 'Full-time' },
  ];

  const handleApply = (title) => {
    addToast(`Application opened for ${title}`);
  };

  return (
    <div>
      <section style={{ background: '#0B192C', color: '#fff', padding: '5rem 1.5rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ color: '#60A5FA', fontSize: '0.8125rem', fontWeight: 800, textTransform: 'uppercase' }}>JOIN OUR TEAM</div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, textTransform: 'uppercase', marginTop: '0.5rem', color: '#fff' }}>
            BUILD YOUR CAREER AT <span style={{ color: '#1D4ED8' }}>GLAZE TEMP</span>
          </h1>
          <p style={{ color: '#94A3B8', marginTop: '0.75rem', fontSize: '1.125rem', lineHeight: 1.6 }}>
            Shape the future of modern architecture alongside 2,800+ engineers, material scientists, and craftsmen.
          </p>
        </div>
      </section>

      <section style={{ padding: '4rem 1.5rem', background: '#F8FAFC' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#0F172A', marginBottom: '2rem', textAlign: 'center' }}>Open Positions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {jobs.map((j, idx) => (
              <div key={idx} style={{ background: '#FFFFFF', padding: '1.75rem', borderRadius: '16px', border: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 800, color: '#0F172A' }}>{j.title}</h3>
                  <div style={{ fontSize: '0.8125rem', color: '#64748B', marginTop: '4px' }}>
                    {j.department} • <MapPin size={12} style={{ display: 'inline', verticalAlign: 'middle' }} /> {j.location} • {j.type}
                  </div>
                </div>
                <button
                  onClick={() => handleApply(j.title)}
                  style={{ padding: '0.625rem 1.25rem', borderRadius: '8px', background: '#1D4ED8', color: '#fff', border: 'none', fontWeight: 800, fontSize: '0.8125rem', cursor: 'pointer' }}
                >
                  Apply Now →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

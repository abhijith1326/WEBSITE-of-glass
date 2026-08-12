import React from 'react';
import { Target, Eye, Award, ShieldCheck, Lightbulb, Leaf, Users, Globe } from 'lucide-react';

export default function AboutUs() {
  const values = [
    { icon: <Target size={32} color="#1D4ED8" />, title: 'Precision', desc: 'Every product manufactured to exacting tolerances, ensuring zero compromise on structural quality.' },
    { icon: <ShieldCheck size={32} color="#1D4ED8" />, title: 'Integrity', desc: 'Transparent business practices, honest engineering communication, and ethical material sourcing.' },
    { icon: <Lightbulb size={32} color="#1D4ED8" />, title: 'Innovation', desc: 'Continuously pushing the boundaries of glass optics and plywood engineering for tomorrow.' },
    { icon: <Leaf size={32} color="#1D4ED8" />, title: 'Sustainability', desc: 'Environmental responsibility and carbon neutral manufacturing at the heart of our operations.' },
  ];

  const history = [
    { year: '1989', title: 'The Beginning', desc: 'Founded as a small glass cutting unit with 12 employees and flat-bed cutting technology.' },
    { year: '1997', title: 'Tempering Plant Commissioned', desc: 'Installed our first toughened glass furnace, securing contracts for 5-star hotel facades.' },
    { year: '2003', title: 'Plywood Division Launch', desc: 'Diversified into premium marine-grade plywood manufacturing with BIS certification.' },
    { year: '2010', title: 'International Expansion', desc: 'Established export operations across the Middle East, Europe, and Southeast Asia.' },
    { year: '2016', title: 'Smart Glass R&D Centre', desc: 'Opened a dedicated facility focusing on electrochromic coatings and low-E technology.' },
    { year: '2021', title: 'Sustainability Pledge', desc: 'Installed 5 MW solar plant, closed-loop water recycling, and achieved zero-waste certifications.' },
    { year: '2024+', title: 'Global Operations', desc: 'Operating 4 plants, 6 regional centers, and supply chains spanning 48+ countries.' },
  ];

  const team = [
    { name: 'Rajesh Nair', role: 'Founder & CEO', image: '/assets/images/team.png' },
    { name: 'Priya Menon', role: 'Chief Operations Officer', image: '/assets/images/team.png' },
    { name: 'Dr. Arun Kumar', role: 'Chief Technology Officer', image: '/assets/images/team.png' },
    { name: 'Sunita Varma', role: 'Chief Financial Officer', image: '/assets/images/team.png' },
  ];

  return (
    <div>
      {/* Page Banner */}
      <section style={{ background: '#0B192C', color: '#fff', padding: '5rem 1.5rem', textAlignment: 'center', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ color: '#60A5FA', fontSize: '0.8125rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>OUR HERITAGE & VISION</div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, textTransform: 'uppercase', marginTop: '0.5rem', color: '#fff' }}>
            ENGINEERING EXCELLENCE <span style={{ color: '#1D4ED8' }}>SINCE 1989</span>
          </h1>
          <p style={{ color: '#94A3B8', marginTop: '1rem', fontSize: '1.125rem', lineHeight: '1.7' }}>
            From a single glass processing unit to a global architectural leader — three decades of relentless innovation, precision craftsmanship, and client-first values.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section style={{ padding: '4rem 1.5rem', background: '#F8FAFC' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          <div style={{ background: '#FFFFFF', padding: '2.5rem', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 10px 30px rgba(0,0,0,0.04)' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <Target size={26} color="#1D4ED8" />
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0F172A', marginBottom: '0.75rem' }}>Our Mission</h2>
            <p style={{ color: '#475569', lineHeight: 1.7, fontSize: '0.9375rem' }}>
              To deliver precision-engineered glass, plywood, and building materials that empower architects, builders, and designers to create extraordinary spaces — safely, sustainably, and beautifully.
            </p>
          </div>

          <div style={{ background: '#FFFFFF', padding: '2.5rem', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 10px 30px rgba(0,0,0,0.04)' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <Eye size={26} color="#1D4ED8" />
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0F172A', marginBottom: '0.75rem' }}>Our Vision</h2>
            <p style={{ color: '#475569', lineHeight: 1.7, fontSize: '0.9375rem' }}>
              To be the world's most trusted glass and building materials partner — recognized for technological innovation, environmental stewardship, and products that shape tomorrow's skylines.
            </p>
          </div>
        </div>
      </section>

      {/* History Timeline */}
      <section style={{ padding: '4rem 1.5rem', background: '#FFFFFF' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div className="section-eyebrow">OUR JOURNEY</div>
            <h2 className="section-title-center">THREE DECADES OF <span>BUILDING THE FUTURE</span></h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {history.map((item, idx) => (
              <div key={idx} style={{ display: 'grid', gridTemplateColumns: 'clamp(80px, 20vw, 120px) 1fr', gap: '1.25rem', alignItems: 'start', padding: '1.5rem', borderRadius: '12px', background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                <div style={{ fontSize: '2.25rem', fontWeight: 900, color: '#1D4ED8', lineHeight: 1 }}>{item.year}</div>
                <div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.375rem' }}>{item.title}</h3>
                  <p style={{ color: '#475569', fontSize: '0.875rem', lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section style={{ padding: '4rem 1.5rem', background: '#0B192C', color: '#fff' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div style={{ color: '#60A5FA', fontSize: '0.8125rem', fontWeight: 800, textTransform: 'uppercase' }}>OUR GUIDING PRINCIPLES</div>
            <h2 style={{ fontSize: '2.25rem', fontWeight: 900, textTransform: 'uppercase', marginTop: '0.5rem' }}>
              PRINCIPLES THAT <span style={{ color: '#60A5FA' }}>GUIDE OUR WORK</span>
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
            {values.map((v, idx) => (
              <div key={idx} style={{ background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)', textAlign: 'center' }}>
                <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>{v.icon}</div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 800, color: '#fff', marginBottom: '0.5rem' }}>{v.title}</h3>
                <p style={{ color: '#94A3B8', fontSize: '0.875rem', lineHeight: 1.6 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Executive Leadership */}
      <section style={{ padding: '4rem 1.5rem', background: '#FFFFFF' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div className="section-eyebrow">LEADERSHIP</div>
            <h2 className="section-title-center">THE MINDS BEHIND <span>GLAZE TEMP</span></h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
            {team.map((t, idx) => (
              <div key={idx} style={{ background: '#F8FAFC', borderRadius: '16px', border: '1px solid #E2E8F0', overflow: 'hidden', textAlign: 'center' }}>
                <div style={{ height: '240px', overflow: 'hidden' }}>
                  <img src={t.image} alt={t.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '1.25rem' }}>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 800, color: '#0F172A' }}>{t.name}</h3>
                  <div style={{ fontSize: '0.8125rem', color: '#1D4ED8', fontWeight: 700, marginTop: '2px' }}>{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

import React from 'react';
import { ShieldCheck, Award, FileText, CheckCircle, Flame, Wind } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export default function Quality() {
  const { addToast } = useToast();

  const standards = [
    { title: 'ISO 9001:2015', category: 'Quality Management Systems', desc: 'Certified quality management across batching, cutting, tempering, and laminating facilities.' },
    { title: 'EN 12150 Safety Tempered', category: 'European Standard', desc: 'Conforms to strict fragmentation and impact resistance specifications for toughened glass.' },
    { title: 'BS 1088 Marine Grade', category: 'British Standard Plywood', desc: '100% Unextended Phenolic resin bonded hardwood plywood tested to 72-hour boiling water immersion.' },
    { title: 'ASTM C1048 Heat-Treated', category: 'American Standard', desc: 'Compliant with heat-strengthened and fully tempered flat glass surface compression requirements.' },
  ];

  const handleDownloadCert = (std) => {
    addToast(`Downloaded official certificate for ${std}`);
  };

  return (
    <div>
      {/* Hero Banner */}
      <section style={{ background: '#0B192C', color: '#fff', padding: '5rem 1.5rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ color: '#60A5FA', fontSize: '0.8125rem', fontWeight: 800, textTransform: 'uppercase' }}>QUALITY ASSURANCE & TESTING</div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, textTransform: 'uppercase', marginTop: '0.5rem', color: '#fff' }}>
            ZERO DEFECT <span style={{ color: '#1D4ED8' }}>STANDARDS</span>
          </h1>
          <p style={{ color: '#94A3B8', marginTop: '0.75rem', fontSize: '1.125rem', lineHeight: 1.6 }}>
            Comprehensive laboratory testing, laser optical scanning, and international ISO & ASTM certifications ensuring total structural confidence.
          </p>
        </div>
      </section>

      {/* Standards List */}
      <section style={{ padding: '4rem 1.5rem', background: '#F8FAFC' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          {standards.map((s, idx) => (
            <div key={idx} style={{ background: '#FFFFFF', padding: '2rem', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 10px 25px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                  <ShieldCheck size={26} color="#1D4ED8" />
                </div>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#1D4ED8', textTransform: 'uppercase' }}>{s.category}</div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', marginTop: '4px', marginBottom: '0.75rem' }}>{s.title}</h3>
                <p style={{ color: '#475569', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>{s.desc}</p>
              </div>

              <button
                onClick={() => handleDownloadCert(s.title)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: '#F8FAFC', border: '1px solid #CBD5E1', color: '#0F172A', fontWeight: 800, fontSize: '0.8125rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
              >
                <FileText size={16} color="#1D4ED8" />
                <span>Download ISO Test Report</span>
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

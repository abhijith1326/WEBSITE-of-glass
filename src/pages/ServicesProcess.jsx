import React from 'react';
import { Flame, ShieldCheck, Cpu, Eye, CheckCircle2, Factory } from 'lucide-react';

export default function ServicesProcess() {
  const steps = [
    {
      num: '01',
      label: 'Batch Preparation & Melting',
      title: '1,600°C Float Furnace Blending',
      desc: 'High-purity silica sand (SiO₂ >99.5%), soda ash, and cullet are blended in an automated batch plant and melted at 1,600°C over 24 hours.',
      specs: ['Temp: 1,600°C', 'Silica Purity: 99.5%+', 'Capacity: 600 TPD']
    },
    {
      num: '02',
      label: 'Tin Bath Formation',
      title: 'Molten Tin Glass Ribbon Float',
      desc: 'Molten glass flows onto a liquid tin bath creating a perfectly flat, distortion-free ribbon. Thickness is calibrated from 2mm to 25mm.',
      specs: ['Flatness: ≤0.1% distortion', 'Width: Up to 3,300mm', 'Micro-gauged']
    },
    {
      num: '03',
      label: 'Annealing & Cooling',
      title: 'Controlled Stress-Free Cooling (Lehr)',
      desc: 'The glass ribbon passes through a 100m annealing lehr tunnel, slowly cooling from 600°C to room temperature to relieve internal thermal stresses.',
      specs: ['Lehr Length: 100m+', 'Exit Temp: 35–40°C', 'Zero Residual Stress']
    },
    {
      num: '04',
      label: 'Automated AI Inspection',
      title: 'High-Speed Optical Scanner',
      desc: 'Automated camera scanners inspect 100% of the ribbon at 400 m/min, detecting inclusions, bubbles, and scratches down to 0.3mm.',
      specs: ['Defect Limit: < 0.3mm', 'Scan Speed: 400 m/min', '100% Surface Coverage']
    },
    {
      num: '05',
      label: 'CNC Processing & Tempering',
      title: 'Heat Treatment & Precision Fabrication',
      desc: 'Glass is CNC cut, edged, drilled, and tempered in a 700°C forced convection furnace, followed by laminating or magnetron Low-E coating.',
      specs: ['Tempering Temp: 700°C+', 'Autoclave: 14 bar / 140°C', 'Cut Tolerance: ±0.2mm']
    },
    {
      num: '06',
      label: 'Final QC & Dispatch',
      title: 'Crating & Secure Global Delivery',
      desc: 'Every batch undergoes final dimension checks and destructive fragment testing before being packed into timber A-frames for global dispatch.',
      specs: ['Timber Crating', 'GPS Tracked Freight', 'ISO Certificate Included']
    }
  ];

  return (
    <div>
      {/* Hero Banner */}
      <section style={{ background: '#0B192C', color: '#fff', padding: '5rem 1.5rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ color: '#60A5FA', fontSize: '0.8125rem', fontWeight: 800, textTransform: 'uppercase' }}>STATE-OF-THE-ART MANUFACTURING</div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, textTransform: 'uppercase', marginTop: '0.5rem', color: '#fff' }}>
            PRECISION AT EVERY <span style={{ color: '#1D4ED8' }}>STAGE</span>
          </h1>
          <p style={{ color: '#94A3B8', marginTop: '0.75rem', fontSize: '1.125rem', lineHeight: 1.6 }}>
            From raw silica melting to CNC edging, tempering, and acoustic lamination — engineered for perfection at every millimeter.
          </p>
        </div>
      </section>

      {/* Process Steps */}
      <section style={{ padding: '4rem 1.5rem', background: '#F8FAFC' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {steps.map((s, idx) => (
            <div key={idx} style={{ display: 'grid', gridTemplateColumns: 'clamp(50px, 15vw, 80px) 1fr', gap: '1.25rem', background: '#FFFFFF', padding: '1.75rem', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 10px 25px rgba(0,0,0,0.03)' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#EFF6FF', border: '2px solid #BFDBFE', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 900, color: '#1D4ED8' }}>
                {s.num}
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#1D4ED8', textTransform: 'uppercase' }}>{s.label}</div>
                <h3 style={{ fontSize: '1.375rem', fontWeight: 900, color: '#0F172A', marginTop: '2px', marginBottom: '0.5rem' }}>{s.title}</h3>
                <p style={{ color: '#475569', fontSize: '0.9375rem', lineHeight: 1.6, marginBottom: '1rem' }}>{s.desc}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {s.specs.map((sp, i) => (
                    <span key={i} style={{ background: '#F1F5F9', color: '#334155', padding: '0.25rem 0.625rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700 }}>
                      {sp}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Shield, Zap, Flame, Sun, Sparkles, Eye, Layers } from 'lucide-react';
import { useSampleCart } from '../context/SampleCartContext';

export default function GlassSolutions() {
  const { addItem } = useSampleCart();

  const glassTypes = [
    {
      id: 'tempered-glass',
      title: 'Tempered / Toughened Safety Glass',
      image: '/assets/images/toughened-glass.png',
      desc: 'Heat-treated for 5x the structural strength of standard float glass. Shatters into safe, small granular fragments. Essential for structural facades, glass doors, and high-traffic areas.',
      tags: ['4–19mm Thickness', 'IS 2553 Certified', 'EN 12150 Standard', 'Custom CNC Shapes']
    },
    {
      id: 'laminated-glass',
      title: 'Laminated Acoustic Safety Glass',
      image: '/assets/images/laminated-glass.png',
      desc: 'Polyvinyl Butyral (PVB) or SGP interlayer holds fragments together on impact. Superior sound reduction (up to 44dB) and 99% UV blockage. Perfect for skylights, balustrades, and overhead glazing.',
      tags: ['PVB / SGP Interlayer', 'IS 6479 Standard', '44dB Sound Reduction', 'Overhead Safe']
    },
    {
      id: 'insulated-glass',
      title: 'Insulated Glass Units (IGU)',
      image: '/assets/images/insulated-glass.png',
      desc: 'Double and triple glazed sealed units with argon or krypton gas fill. Integrated warm-edge spacers reduce thermal bridging, achieving U-values down to 0.5 W/m²K.',
      tags: ['Argon Gas Filled', 'Low-E Coated', 'Warm-Edge Spacer', 'EN 1279 Certified']
    },
    {
      id: 'fire-rated-glass',
      title: 'Fire-Rated Safety Glass (EW & EI)',
      image: '/assets/images/glass-products.png',
      desc: 'Clear intumescent interlayers expand into a ceramic heat shield during fire emergencies. Provides radiation control (EW) and thermal insulation (EI) ratings up to 120 minutes.',
      tags: ['30–120 Min Rating', 'EW & EI Certified', 'BS 476 Tested', 'Fire Door Compliant']
    },
    {
      id: 'solar-control-glass',
      title: 'Solar Control & Low-E Glass',
      image: '/assets/images/curved-glass.png',
      desc: 'Magnetron-sputtered soft coats selectively reflect infrared heat while letting in maximum visible light. Cuts HVAC air-conditioning energy costs by up to 35%.',
      tags: ['Nano Soft-Coat', 'SHGC 0.15–0.35', 'Spectrally Selective', 'Green Star Rated']
    },
    {
      id: 'electrochromic-glass',
      title: 'Electrochromic Smart Dynamic Glass',
      image: '/assets/images/glass-skyscraper.png',
      desc: 'Electronically switchable tinting transitions smoothly from clear to deep blue tint with a low-voltage electrical current. Dynamic shading without blinds.',
      tags: ['PDLC / Electrochromic', 'Switchable Privacy', '0.01% Light Transmission', 'BMS Integrated']
    }
  ];

  return (
    <div>
      {/* Hero Banner */}
      <section style={{ background: '#0B192C', color: '#fff', padding: '5rem 1.5rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ color: '#60A5FA', fontSize: '0.8125rem', fontWeight: 800, textTransform: 'uppercase' }}>HIGH-PERFORMANCE ARCHITECTURAL GLAZING</div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, textTransform: 'uppercase', marginTop: '0.5rem', color: '#fff' }}>
            ARCHITECTURAL GLASS <span style={{ color: '#1D4ED8' }}>SOLUTIONS</span>
          </h1>
          <p style={{ color: '#94A3B8', marginTop: '0.75rem', fontSize: '1.125rem', lineHeight: 1.6 }}>
            Over 20+ specialized glass formulations engineered to global ISO 9001, EN 12150, and ASTM C1048 standards for commercial landmarks and luxury designs.
          </p>
        </div>
      </section>

      {/* Spec Highlights Bar */}
      <section style={{ padding: '2rem 1.5rem', background: '#0F2167', color: '#fff' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', textAlign: 'center' }}>
          <div><div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#60A5FA' }}>4 – 25 mm</div><div style={{ fontSize: '0.75rem', color: '#94A3B8', textTransform: 'uppercase', marginTop: '4px' }}>Thickness Capability</div></div>
          <div><div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#34D399' }}>6,000 m²</div><div style={{ fontSize: '0.75rem', color: '#94A3B8', textTransform: 'uppercase', marginTop: '4px' }}>Daily Tempering Yield</div></div>
          <div><div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#FBBF24' }}>±0.2 mm</div><div style={{ fontSize: '0.75rem', color: '#94A3B8', textTransform: 'uppercase', marginTop: '4px' }}>Precision CNC Tolerance</div></div>
          <div><div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#A78BFA' }}>120 Min</div><div style={{ fontSize: '0.75rem', color: '#94A3B8', textTransform: 'uppercase', marginTop: '4px' }}>Max Fire Resistance</div></div>
        </div>
      </section>

      {/* Main Glass Cards List */}
      <section style={{ padding: '4rem 1.5rem', background: '#F8FAFC' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          {glassTypes.map((g) => (
            <div key={g.id} style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ height: '220px', overflow: 'hidden', background: '#F1F5F9' }}>
                <img src={g.image} alt={g.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '1.75rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.625rem' }}>{g.title}</h3>
                  <p style={{ color: '#475569', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>{g.desc}</p>
                  
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
                    {g.tags.map((t, idx) => (
                      <span key={idx} style={{ background: '#EFF6FF', color: '#1D4ED8', border: '1px solid #BFDBFE', padding: '0.25rem 0.625rem', borderRadius: '9999px', fontSize: '0.6875rem', fontWeight: 700 }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button
                    onClick={() => addItem({ id: g.id, name: g.title, type: 'GLASS' })}
                    style={{ flex: 1, padding: '0.75rem', borderRadius: '8px', background: '#1D4ED8', color: '#fff', border: 'none', fontWeight: 800, fontSize: '0.8125rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                  >
                    <Box size={16} />
                    <span>Request Sample Specimen</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

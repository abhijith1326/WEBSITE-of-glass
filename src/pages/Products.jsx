import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Check, ArrowRight } from 'lucide-react';
import { useSampleCart } from '../context/SampleCartContext';
import { useAudioFX } from '../context/AudioFXContext';

export default function Products() {
  const [activeTab, setActiveTab] = useState('glass');
  const { addItem } = useSampleCart();
  const { playTone } = useAudioFX();

  const handleTabChange = (tab) => {
    playTone(600, 0.03);
    setActiveTab(tab);
  };

  const glassProducts = [
    { id: 'tempered-glass', title: 'Tempered Safety Glass', desc: '4–19mm. 5x stronger than float glass. Safety facades & balustrades.', specs: { Thickness: '4–19mm', Strength: '120–200 MPa', Standard: 'IS 2553 / EN 12150' } },
    { id: 'laminated-glass', title: 'Laminated Acoustic Glass', desc: 'PVB / SGP interlayer. Safety, sound dampening, UV control.', specs: { Layers: '2–5 panes', Interlayer: 'Acoustic PVB / SGP', Standard: 'IS 6479 / EN 14449' } },
    { id: 'insulated-glass', title: 'Insulated Glass Units (IGU)', desc: 'Double & triple glazed IGUs with argon fill and low-E coatings.', specs: { 'U-Value': '0.65–1.2 W/m²K', SHGC: '0.25–0.55', Spacer: 'Warm-Edge' } },
    { id: 'fire-rated-glass', title: 'Fire-Rated Safety Glass', desc: 'EW & EI ratings up to 120 minutes with intumescent barrier layers.', specs: { Rating: '30/60/90/120 min', Type: 'EW & EI Rated', Standard: 'BS 476 / EN 1364' } },
    { id: 'solar-control-glass', title: 'Solar Control Low-E Glass', desc: 'Reduces solar heat gain up to 70% while maintaining light transparency.', specs: { SHGC: '0.15–0.35', VLT: '30–75%', Coating: 'Nano Coated Soft-Coat' } },
    { id: 'decorative-glass', title: 'Decorative & Printed Glass', desc: 'Acid-etched, back-painted, and ceramic digital printed glass panels.', specs: { Finish: 'Matte / Translucent', Printing: 'UV Ceramic Print', Custom: 'RAL Color Palette' } },
  ];

  const plywoodProducts = [
    { id: 'marine-plywood', title: 'Marine Grade Plywood (BWP)', desc: 'Fully waterproof IS 710 BWP grade for marine and heavy construction.', specs: { Grade: 'IS 710 BWP', Glue: 'Unextended Phenolic', Thickness: '6mm – 25mm' } },
    { id: 'bwr-plywood', title: 'BWR Grade Exterior Plywood', desc: 'Boiling Water Resistant for kitchen cabinets and humid interior spaces.', specs: { Grade: 'BWR Standard', Moisture: '< 8%', Face: 'Hardwood Core' } },
    { id: 'commercial-plywood', title: 'Commercial MR Plywood', desc: 'Moisture Resistant grade for office paneling and interior joinery.', specs: { Grade: 'MR Grade', Core: 'Poplar / Gurjan', Use: 'Furniture & Partition' } },
    { id: 'decorative-veneer', title: 'Decorative Natural Veneer', desc: 'Natural teak, oak, walnut, and maple veneer faces bonded to plywood core.', specs: { Species: 'Teak / Walnut / Oak', Finish: 'Sanded / Polished', Core: 'BWP Hardwood' } },
    { id: 'flexible-plywood', title: 'Flexible Architectural Ply', desc: 'Bends to 50mm radius for curved walls, reception desks, and columns.', specs: { Bending: '50mm Radius', Type: 'Column Ply', Thickness: '4mm & 6mm' } },
    { id: 'fire-plywood', title: 'Fire-Retardant Hardwood Ply', desc: 'Treated with nano-ceramic fire retarding compounds for commercial safety.', specs: { Rating: 'Class 1 Flame Resistance', Chemical: 'Vacuum Pressure Treated', Standard: 'IS 5509' } },
  ];

  const interiorProducts = [
    { id: 'hpl-laminates', title: 'High Pressure Laminates (HPL)', desc: 'High-durability decorative laminates in 1000+ textures and colors.', specs: { Thickness: '0.8mm – 1.5mm', Resistance: 'Scratch & Heat', Finish: 'Matte / Gloss / Suede' } },
    { id: 'mdf-boards', title: 'Exterior Grade MDF Boards', desc: 'Medium Density Fibreboard engineered for precision CNC routing.', specs: { Grade: 'Exterior Grade', Density: '750-800 kg/m³', Emission: 'E1 Standard' } },
    { id: 'acoustic-panels', title: 'Acoustic Fabric & Timber Panels', desc: 'Perforated timber and fabric-wrapped panels with NRC up to 0.95.', specs: { NRC: '0.85 – 0.95', Fire: 'Class A Rating', Finish: 'Timber / Fabric' } },
  ];

  const buildingProducts = [
    { id: 'acp-cladding', title: 'ACP Exterior Cladding Panels', desc: 'Aluminium Composite Panels in PVDF finish and A2 fire retardant core.', specs: { Core: 'A2 Non-Combustible', Thickness: '4mm (0.5 Skin)', Warranty: '20 Years PVDF' } },
    { id: 'curtain-wall', title: 'Structural Curtain Wall Systems', desc: 'Unitised and stick curtain wall aluminum profiles for skyscrapers.', specs: { System: 'Unitised / Stick', 'Wind Load': 'Up to 4.5 kPa', Thermal: 'Thermally Broken' } },
    { id: 'silicone-sealants', title: 'Structural Silicone & Weatherseals', desc: 'High-modulus structural silicones for structural glass glazing.', specs: { Type: 'Structural Silicone', Movement: '±50%', Certification: 'ASTM C1184' } },
  ];

  const currentProducts = activeTab === 'glass' ? glassProducts : activeTab === 'plywood' ? plywoodProducts : activeTab === 'interior' ? interiorProducts : buildingProducts;

  return (
    <div>
      {/* Hero Banner */}
      <section style={{ background: '#0B192C', color: '#fff', padding: '4.5rem 1.5rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ color: '#60A5FA', fontSize: '0.8125rem', fontWeight: 800, textTransform: 'uppercase' }}>PRODUCT CATALOGUE</div>
          <h1 style={{ fontSize: 'clamp(2.25rem, 4.5vw, 3.25rem)', fontWeight: 900, textTransform: 'uppercase', marginTop: '0.5rem', color: '#fff' }}>
            COMPLETE MATERIAL <span style={{ color: '#1D4ED8' }}>SOLUTIONS</span>
          </h1>
          <p style={{ color: '#94A3B8', marginTop: '0.75rem', fontSize: '1.0625rem' }}>
            From precision-engineered architectural glass to structural marine plywood and cladding systems.
          </p>
        </div>
      </section>

      {/* Hero Cards Split */}
      <section style={{ padding: '3rem 1.5rem', background: '#F8FAFC' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          <Link to="/glass-solutions" style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', height: '240px', display: 'block' }}>
            <img src="/assets/images/glass-products.png" alt="Glass Solutions" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(11,25,44,0.95), transparent)', padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', color: '#fff' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#60A5FA' }}>20+ GLASS SPECIFICATIONS</div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 900 }}>Architectural Glass Solutions →</h3>
            </div>
          </Link>

          <Link to="/plywood-solutions" style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', height: '240px', display: 'block' }}>
            <img src="/assets/images/plywood.png" alt="Plywood Solutions" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(11,25,44,0.95), transparent)', padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', color: '#fff' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#34D399' }}>8 STRUCTURAL GRADES</div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 900 }}>Plywood & Timber Solutions →</h3>
            </div>
          </Link>
        </div>
      </section>

      {/* Tabs & Product Grid */}
      <section style={{ padding: '4rem 1.5rem', background: '#FFFFFF' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          {/* Tab buttons */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
            {[
              { id: 'glass', label: '🪟 Glass Products' },
              { id: 'plywood', label: '🪵 Plywood & Timber' },
              { id: 'interior', label: '🏠 Interior Joinery' },
              { id: 'building', label: '🏗️ Building Cladding & Glazing' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => handleTabChange(t.id)}
                style={{
                  padding: '0.75rem 1.5rem',
                  borderRadius: '9999px',
                  border: '1px solid',
                  borderColor: activeTab === t.id ? '#1D4ED8' : '#CBD5E1',
                  background: activeTab === t.id ? '#1D4ED8' : '#F8FAFC',
                  color: activeTab === t.id ? '#FFFFFF' : '#0F172A',
                  fontWeight: 800,
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Cards Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {currentProducts.map((p) => (
              <div key={p.id} style={{ background: '#F8FAFC', padding: '1.75rem', borderRadius: '16px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.5rem' }}>{p.title}</h3>
                  <p style={{ color: '#475569', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '1rem' }}>{p.desc}</p>

                  <div style={{ background: '#FFFFFF', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #E2E8F0', marginBottom: '1.25rem', fontSize: '0.75rem' }}>
                    {Object.entries(p.specs).map(([k, v]) => (
                      <div key={k} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F1F5F9', paddingBlock: '3px' }}>
                        <span style={{ color: '#64748B' }}>{k}</span>
                        <span style={{ fontWeight: 700, color: '#0F172A' }}>{v}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button
                    onClick={() => addItem({ id: p.id, name: p.title, type: activeTab.toUpperCase() })}
                    style={{ flex: 1, padding: '0.625rem', borderRadius: '6px', background: '#1D4ED8', color: '#fff', border: 'none', fontWeight: 800, fontSize: '0.75rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.375rem' }}
                  >
                    <Box size={14} />
                    <span>Request Sample Swatch</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Package, Zap, FileText, ArrowRight, X } from 'lucide-react';
import { useCommandPalette } from '../../context/CommandPaletteContext';
import { useSampleCart } from '../../context/SampleCartContext';

const SEARCH_ITEMS = [
  { title: 'GLAZE Triplex Insulating Glass', type: 'Product', path: '/glass-solutions', tags: 'glass specs thermal facade' },
  { title: 'GLAZE Acoustic Laminated Glass (44dB)', type: 'Product', path: '/glass-solutions', tags: 'acoustic sound pvb quiet' },
  { title: 'GLAZE Smart Electrochromic Dynamic Glass', type: 'Product', path: '/glass-solutions', tags: 'smart tint electrochromic privacy' },
  { title: 'GLAZE Core BS 1088 Marine Grade Plywood', type: 'Product', path: '/plywood-solutions', tags: 'plywood marine bs1088 wood waterproof' },
  { title: 'GLAZE Flame Fire-Retardant Architectural Ply', type: 'Product', path: '/plywood-solutions', tags: 'plywood fire retardant safety structural' },
  { title: 'Interactive 3D Glass Specs Visualizer', type: 'Tool', path: '/#glass-visualizer', tags: '3d canvas simulator optics light u-value' },
  { title: 'Acoustic Sound Attenuation Simulator', type: 'Tool', path: '/#acoustic-simulator', tags: 'audio simulator sound noise db attenuation' },
  { title: 'Architectural Engineering Spec Builder', type: 'Tool', path: '/#spec-calculator', tags: 'quote specs load calculator pdf export' },
  { title: 'Physical Architectural Sample Swatch Drawer', type: 'Action', action: 'open_samples', tags: 'samples kit swatch box order' },
  { title: 'ISO 9001 & ASTM Architectural Test Certifications', type: 'Document', path: '/quality', tags: 'quality specs certifications standards' },
  { title: 'Sustainability & Carbon Neutral Production', type: 'Corporate', path: '/sustainability', tags: 'green eco carbon recycling solar' },
  { title: 'Request Custom Architectural Consultation', type: 'Contact', path: '/contact', tags: 'contact quote inquiry consultation sales' }
];

export default function CommandPalette() {
  const { isOpen, closePalette } = useCommandPalette();
  const { openDrawer } = useSampleCart();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filtered = SEARCH_ITEMS.filter((item) => {
    const q = query.toLowerCase().trim();
    return (
      item.title.toLowerCase().includes(q) ||
      item.type.toLowerCase().includes(q) ||
      item.tags.toLowerCase().includes(q)
    );
  });

  const handleSelect = (item) => {
    closePalette();
    if (item.action === 'open_samples') {
      openDrawer();
    } else if (item.path) {
      if (item.path.includes('#')) {
        const [page, hash] = item.path.split('#');
        navigate(page || '/');
        setTimeout(() => {
          const el = document.getElementById(hash);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        navigate(item.path);
      }
    }
  };

  return (
    <div className="command-palette-backdrop open" onClick={closePalette}>
      <div className="command-palette-modal" onClick={(e) => e.stopPropagation()}>
        {/* Search Input Bar */}
        <div style={{ display: 'flex', alignItems: 'center', padding: '1rem 1.25rem', borderBottom: '1px solid #E2E8F0', gap: '0.75rem' }}>
          <Search color="#1D4ED8" size={20} />
          <input
            type="text"
            placeholder="Type a product, spec, tool or action... (Cmd+K)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            style={{ flex: 1, border: 'none', outline: 'none', fontSize: '1rem', fontWeight: 600, color: '#0F172A' }}
          />
          <button onClick={closePalette} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8' }}>
            <X size={20} />
          </button>
        </div>

        {/* Results List */}
        <div style={{ maxHeight: '380px', overflowY: 'auto', padding: '0.5rem' }}>
          {filtered.length === 0 ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: '#64748B', fontSize: '0.875rem' }}>
              No matching architectural specs found for "{query}"
            </div>
          ) : (
            filtered.map((item, idx) => (
              <div
                key={idx}
                onClick={() => handleSelect(item)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.875rem',
                  padding: '0.75rem 1rem',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  transition: 'background 0.2s ease',
                  borderBottom: '1px solid #F1F5F9',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#EFF6FF')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyCenter: 'center', color: '#1D4ED8' }}>
                  {item.type === 'Product' ? <Package size={18} /> : item.type === 'Tool' ? <Zap size={18} /> : <FileText size={18} />}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: '0.9375rem', color: '#0F172A' }}>{item.title}</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B' }}>{item.type} • {item.tags.split(' ').slice(0, 3).join(', ')}</div>
                </div>
                <ArrowRight size={16} color="#94A3B8" />
              </div>
            ))
          )}
        </div>

        <div style={{ padding: '0.75rem 1.25rem', background: '#F8FAFC', borderTop: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#64748B' }}>
          <span>Navigation: <kbd style={{ background: '#E2E8F0', padding: '2px 6px', borderRadius: '4px' }}>↑</kbd> <kbd style={{ background: '#E2E8F0', padding: '2px 6px', borderRadius: '4px' }}>↓</kbd></span>
          <span>Close: <kbd style={{ background: '#E2E8F0', padding: '2px 6px', borderRadius: '4px' }}>ESC</kbd></span>
        </div>
      </div>
    </div>
  );
}

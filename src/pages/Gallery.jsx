import React, { useState } from 'react';
import { ZoomIn, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAudioFX } from '../context/AudioFXContext';

export default function Gallery() {
  const [filter, setFilter] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const { playTone } = useAudioFX();

  const galleryItems = [
    { id: 1, category: 'projects', title: 'Skyline Glass Facade', image: '/assets/images/glass-skyscraper.png' },
    { id: 2, category: 'products', title: 'Toughened & Insulated Range', image: '/assets/images/glass-products.png' },
    { id: 3, category: 'factory', title: 'Float Glass Processing Furnace', image: '/assets/images/factory.png' },
    { id: 4, category: 'projects', title: 'Hotel Interior Atrium Glazing', image: '/assets/images/hero-interior.png' },
    { id: 5, category: 'products', title: 'Marine Hardwood Plywood Swatches', image: '/assets/images/plywood.png' },
    { id: 6, category: 'factory', title: 'Automated CNC Waterjet Line', image: '/assets/images/factory.png' },
    { id: 7, category: 'projects', title: 'Corporate Office Partitions', image: '/assets/images/office-interior.png' },
    { id: 8, category: 'events', title: 'Global Architecture Expo 2025', image: '/assets/images/team.png' },
    { id: 9, category: 'factory', title: 'Quality Assurance Testing Lab', image: '/assets/images/factory.png' },
  ];

  const filtered = filter === 'all' ? galleryItems : galleryItems.filter((g) => g.category === filter);

  const openLightbox = (idx) => {
    playTone(700, 0.03);
    setLightboxIndex(idx);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextLightbox = () => {
    if (lightboxIndex === null) return;
    playTone(650, 0.03);
    setLightboxIndex((prev) => (prev + 1) % filtered.length);
  };

  const prevLightbox = () => {
    if (lightboxIndex === null) return;
    playTone(550, 0.03);
    setLightboxIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
  };

  return (
    <div>
      {/* Hero Banner */}
      <section style={{ background: '#0B192C', color: '#fff', padding: '5rem 1.5rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ color: '#60A5FA', fontSize: '0.8125rem', fontWeight: 800, textTransform: 'uppercase' }}>VISUAL INSPIRATION & GALLERY</div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, textTransform: 'uppercase', marginTop: '0.5rem', color: '#fff' }}>
            OUR WORK <span style={{ color: '#1D4ED8' }}>IN FULL VIEW</span>
          </h1>
          <p style={{ color: '#94A3B8', marginTop: '0.75rem', fontSize: '1.125rem', lineHeight: 1.6 }}>
            Explore photography of our finished architectural landmarks, precision manufacturing plants, and product range.
          </p>
        </div>
      </section>

      {/* Filter Tabs & Grid */}
      <section style={{ padding: '4rem 1.5rem', background: '#F8FAFC' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
            {[
              { id: 'all', label: 'All Media' },
              { id: 'projects', label: 'Landmark Projects' },
              { id: 'products', label: 'Products & Swatches' },
              { id: 'factory', label: 'Tempering Plants' },
              { id: 'events', label: 'Exhibitions & Events' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => { setFilter(f.id); playTone(600, 0.03); }}
                style={{
                  padding: '0.625rem 1.25rem',
                  borderRadius: '9999px',
                  border: '1px solid',
                  borderColor: filter === f.id ? '#1D4ED8' : '#CBD5E1',
                  background: filter === f.id ? '#1D4ED8' : '#FFFFFF',
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

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.5rem' }}>
            {filtered.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => openLightbox(idx)}
                style={{
                  position: 'relative',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  height: '260px',
                  cursor: 'pointer',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.06)',
                  background: '#0B192C',
                }}
              >
                <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(11,25,44,0.6)', opacity: 0, transition: 'opacity 0.3s ease', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '0.5rem', color: '#fff' }}
                     onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
                     onMouseLeave={(e) => (e.currentTarget.style.opacity = 0)}>
                  <ZoomIn size={32} color="#60A5FA" />
                  <div style={{ fontWeight: 800, fontSize: '1rem', paddingInline: '1rem', textAlign: 'center' }}>{item.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1100, background: 'rgba(11,25,44,0.95)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }} onClick={closeLightbox}>
          <button onClick={closeLightbox} style={{ position: 'absolute', top: '2rem', right: '2rem', background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
            <X size={32} />
          </button>

          <button onClick={(e) => { e.stopPropagation(); prevLightbox(); }} style={{ position: 'absolute', left: '2rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', width: '48px', height: '48px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ChevronLeft size={28} />
          </button>

          <img src={filtered[lightboxIndex]?.image} alt="Enlarged view" style={{ maxWidth: '90vw', maxHeight: '80vh', borderRadius: '12px', objectFit: 'contain', boxShadow: '0 25px 50px rgba(0,0,0,0.5)' }} onClick={(e) => e.stopPropagation()} />

          <button onClick={(e) => { e.stopPropagation(); nextLightbox(); }} style={{ position: 'absolute', right: '2rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', width: '48px', height: '48px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ChevronRight size={28} />
          </button>
        </div>
      )}
    </div>
  );
}

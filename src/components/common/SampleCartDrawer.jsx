import React, { useState } from 'react';
import { X, Trash2, Box, Send, CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useSampleCart } from '../../context/SampleCartContext';
import { useToast } from '../../context/ToastContext';
import { useAudioFX } from '../../context/AudioFXContext';

export default function SampleCartDrawer() {
  const { items, isOpen, closeDrawer, removeItem, clearCart } = useSampleCart();
  const { addToast } = useToast();
  const { playTone } = useAudioFX();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [address, setAddress] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || items.length === 0) return;

    playTone(1000, 0.08);
    confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
    setSubmitted(true);
    addToast('Architectural sample swatch box dispatched successfully!');

    setTimeout(() => {
      clearCart();
      setSubmitted(false);
      setName('');
      setEmail('');
      setCompany('');
      setAddress('');
      closeDrawer();
    }, 2500);
  };

  return (
    <div className="sample-drawer-backdrop open" onClick={closeDrawer}>
      <div className="sample-drawer-panel" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#0B192C', color: '#fff' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Box color="#60A5FA" size={22} />
            <div>
              <div style={{ fontWeight: 800, fontSize: '1rem', textTransform: 'uppercase' }}>Sample Swatch Drawer</div>
              <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>{items.length} architectural items selected</div>
            </div>
          </div>
          <button onClick={closeDrawer} style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}>
            <X size={22} />
          </button>
        </div>

        {/* Content Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem' }}>
          {submitted ? (
            <div style={{ padding: '3rem 1.5rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
              <CheckCircle size={56} color="#10B981" />
              <h3 style={{ fontSize: '1.375rem', fontWeight: 900, color: '#0F172A' }}>Sample Kit Dispatched!</h3>
              <p style={{ color: '#475569', fontSize: '0.875rem' }}>
                Thank you <strong>{name}</strong>. Your physical material sample box is being prepared for dispatch to <strong>{address || 'your address'}</strong>.
              </p>
            </div>
          ) : items.length === 0 ? (
            <div style={{ padding: '3rem 1.5rem', textAlign: 'center', color: '#64748B', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
              <Box size={48} color="#CBD5E1" />
              <div style={{ fontWeight: 700 }}>Your Sample Box is Empty</div>
              <p style={{ fontSize: '0.8125rem' }}>Browse products and click "Request Sample Swatch" to build your custom architectural physical kit.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Item List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {items.map((item) => (
                  <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 1rem', background: '#F8FAFC', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.875rem', color: '#0F172A' }}>{item.name}</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748B' }}>{item.type || 'Physical Specimen'}</div>
                    </div>
                    <button onClick={() => removeItem(item.id)} style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', padding: '4px' }}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Delivery Request Form */}
              <form onSubmit={handleSubmit} style={{ borderTop: '1px solid #E2E8F0', paddingTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                <div style={{ fontWeight: 800, fontSize: '0.8125rem', color: '#1E293B', textTransform: 'uppercase' }}>
                  Shipping & Project Details
                </div>
                <input
                  type="text"
                  placeholder="Full Name *"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ padding: '0.625rem 0.875rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.875rem', outline: 'none' }}
                />
                <input
                  type="email"
                  placeholder="Work Email *"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ padding: '0.625rem 0.875rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.875rem', outline: 'none' }}
                />
                <input
                  type="text"
                  placeholder="Firm / Architecture Studio"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  style={{ padding: '0.625rem 0.875rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.875rem', outline: 'none' }}
                />
                <input
                  type="text"
                  placeholder="Delivery Address *"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  style={{ padding: '0.625rem 0.875rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.875rem', outline: 'none' }}
                />

                <button
                  type="submit"
                  style={{
                    marginTop: '0.5rem',
                    padding: '0.875rem',
                    borderRadius: '8px',
                    background: '#1D4ED8',
                    color: '#fff',
                    border: 'none',
                    fontWeight: 800,
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                  }}
                >
                  <Send size={16} />
                  <span>Dispatch Free Architectural Sample Box</span>
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

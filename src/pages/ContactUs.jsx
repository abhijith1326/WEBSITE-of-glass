import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, CheckCircle } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { useAudioFX } from '../context/AudioFXContext';

export default function ContactUs() {
  const { addToast } = useToast();
  const { playTone } = useAudioFX();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [productType, setProductType] = useState('glass');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) return;

    playTone(900, 0.06);
    setSubmitted(true);
    addToast('Thank you! Your architectural consultation inquiry has been received.');
  };

  return (
    <div>
      {/* Hero Banner */}
      <section style={{ background: '#0B192C', color: '#fff', padding: '5rem 1.5rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ color: '#60A5FA', fontSize: '0.8125rem', fontWeight: 800, textTransform: 'uppercase' }}>GET IN TOUCH</div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, textTransform: 'uppercase', marginTop: '0.5rem', color: '#fff' }}>
            LET'S BUILD SOMETHING <span style={{ color: '#1D4ED8' }}>GREAT TOGETHER</span>
          </h1>
          <p style={{ color: '#94A3B8', marginTop: '0.75rem', fontSize: '1.125rem', lineHeight: 1.6 }}>
            Whether you need custom glass specs, engineering load calculations, or a competitive project quotation — our team is ready to assist.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section style={{ padding: '4rem 1.5rem', background: '#F8FAFC' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem' }}>
          {/* Info Side */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <div style={{ color: '#1D4ED8', fontSize: '0.8125rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.5rem' }}>CONTACT ADVISORY</div>
              <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#0F172A' }}>We're Here to Help</h2>
              <p style={{ color: '#475569', marginTop: '0.5rem', fontSize: '0.9375rem', lineHeight: 1.6 }}>
                Our glass optics engineers and timber specialists provide expert advice for your architectural specifications.
              </p>
            </div>

            <div style={{ background: '#FFFFFF', padding: '1.5rem', borderRadius: '12px', border: '1px solid #E2E8F0', display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <MapPin size={22} color="#1D4ED8" />
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#1D4ED8', textTransform: 'uppercase' }}>Global Headquarters</div>
                <div style={{ fontWeight: 800, color: '#0F172A', fontSize: '0.9375rem' }}>GLAZE TEMP Engineering Plant</div>
                <div style={{ fontSize: '0.8125rem', color: '#64748B' }}>Industrial Zone Phase 2, Ernakulam, Cochin, India</div>
              </div>
            </div>

            <div style={{ background: '#FFFFFF', padding: '1.5rem', borderRadius: '12px', border: '1px solid #E2E8F0', display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Phone size={22} color="#1D4ED8" />
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#1D4ED8', textTransform: 'uppercase' }}>Phone & Support</div>
                <div style={{ fontWeight: 800, color: '#0F172A', fontSize: '0.9375rem' }}>+1 (800) 555-GLAZE / +91 484 123 4567</div>
                <div style={{ fontSize: '0.8125rem', color: '#64748B' }}>Mon–Sat: 8:00 AM – 7:00 PM IST</div>
              </div>
            </div>

            <div style={{ background: '#FFFFFF', padding: '1.5rem', borderRadius: '12px', border: '1px solid #E2E8F0', display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Mail size={22} color="#1D4ED8" />
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#1D4ED8', textTransform: 'uppercase' }}>Direct Email</div>
                <div style={{ fontWeight: 800, color: '#0F172A', fontSize: '0.9375rem' }}>spec@glazetemp.com</div>
                <div style={{ fontSize: '0.8125rem', color: '#64748B' }}>Sales: quote@glazetemp.com</div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div style={{ background: '#FFFFFF', padding: '2.5rem', borderRadius: '20px', border: '1px solid #E2E8F0', boxShadow: '0 15px 35px rgba(0,0,0,0.05)' }}>
            {submitted ? (
              <div style={{ padding: '3rem 1rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                <CheckCircle size={64} color="#10B981" />
                <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0F172A' }}>Inquiry Submitted!</h3>
                <p style={{ color: '#475569', fontSize: '0.9375rem', maxWidth: '400px' }}>
                  Thank you <strong>{name}</strong>. Our architectural technical team will contact you at <strong>{email}</strong> within 24 hours with a custom proposal.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <h3 style={{ fontSize: '1.375rem', fontWeight: 900, color: '#0F172A' }}>Request Project Quotation</h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.375rem' }}>Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.875rem', outline: 'none' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.375rem' }}>Work Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="jane@architecture.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.875rem', outline: 'none' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.375rem' }}>Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 019-2834"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.875rem', outline: 'none' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.375rem' }}>Company / Firm</label>
                    <input
                      type="text"
                      placeholder="Apex Architects"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.875rem', outline: 'none' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.375rem' }}>Primary Product Interest</label>
                  <select
                    value={productType}
                    onChange={(e) => setProductType(e.target.value)}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', background: '#F8FAFC', fontSize: '0.875rem', fontWeight: 600, outline: 'none' }}
                  >
                    <option value="glass">Architectural Glass (Toughened, Insulated, Low-E)</option>
                    <option value="plywood">Plywood Solutions (Marine BWP, BWR, Fire-Retardant)</option>
                    <option value="curtain-wall">Structural Facades & Curtain Walls</option>
                    <option value="samples">Physical Sample Swatch Kit Request</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.375rem' }}>Project Specifications & Details</label>
                  <textarea
                    rows={4}
                    placeholder="Describe dimensions, U-values, area, or custom specifications needed..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.875rem', outline: 'none', resize: 'vertical' }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
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
                    boxShadow: '0 4px 14px rgba(29, 78, 216, 0.3)',
                  }}
                >
                  <Send size={18} />
                  <span>Submit Architectural Inquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

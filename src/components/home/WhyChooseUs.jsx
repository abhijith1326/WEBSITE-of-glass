import React from 'react';
import {
  Sparkles,
  ShieldCheck,
  Ruler,
  Layers,
  Sliders,
  Headphones,
  CheckCircle2
} from 'lucide-react';

export default function WhyChooseUs({ background, padding = '5rem 1.5rem', theme = 'dark' }) {
  const isLight = theme === 'light';
  const currentBg = background || (isLight ? '#FFFFFF' : '#080C14');

  const reasons = [
    {
      id: 'quality-glass',
      icon: <Sparkles size={28} color={isLight ? '#2563EB' : '#60A5FA'} />,
      badge: 'MATERIALS',
      badgeColor: isLight ? '#1D4ED8' : '#60A5FA',
      badgeBg: isLight ? '#EFF6FF' : 'rgba(96, 165, 250, 0.15)',
      title: 'Quality Glass',
      desc: 'We focus on quality materials and professional glass solutions suitable for modern architectural applications.'
    },
    {
      id: 'safety-first',
      icon: <ShieldCheck size={28} color={isLight ? '#0284C7' : '#34D399'} />,
      badge: 'SAFETY',
      badgeColor: isLight ? '#0284C7' : '#34D399',
      badgeBg: isLight ? '#E0F2FE' : 'rgba(52, 211, 153, 0.15)',
      title: 'Safety First',
      desc: 'Safety is central to our approach, from product selection to fabrication and installation.'
    },
    {
      id: 'precision-installation',
      icon: <Ruler size={28} color={isLight ? '#2563EB' : '#F59E0B'} />,
      badge: 'PRECISION',
      badgeColor: isLight ? '#1D4ED8' : '#F59E0B',
      badgeBg: isLight ? '#EFF6FF' : 'rgba(245, 158, 11, 0.15)',
      title: 'Precision Installation',
      desc: 'Our solutions are designed and installed with attention to measurements, alignment, finishing and functionality.'
    },
    {
      id: 'modern-designs',
      icon: <Layers size={28} color={isLight ? '#1D4ED8' : '#A78BFA'} />,
      badge: 'AESTHETICS',
      badgeColor: isLight ? '#1D4ED8' : '#A78BFA',
      badgeBg: isLight ? '#EFF6FF' : 'rgba(167, 139, 250, 0.15)',
      title: 'Modern Designs',
      desc: 'We offer contemporary glass solutions that complement modern architecture and interior design.'
    },
    {
      id: 'customized-solutions',
      icon: <Sliders size={28} color={isLight ? '#0284C7' : '#F43F5E'} />,
      badge: 'BESPOKE',
      badgeColor: isLight ? '#0284C7' : '#F43F5E',
      badgeBg: isLight ? '#E0F2FE' : 'rgba(244, 63, 94, 0.15)',
      title: 'Customized Solutions',
      desc: 'Every project has different requirements. We provide solutions based on the space, design and application.'
    },
    {
      id: 'professional-service',
      icon: <Headphones size={28} color={isLight ? '#2563EB' : '#38BDF8'} />,
      badge: 'SERVICE',
      badgeColor: isLight ? '#1D4ED8' : '#38BDF8',
      badgeBg: isLight ? '#EFF6FF' : 'rgba(56, 189, 248, 0.15)',
      title: 'Professional Service',
      desc: 'From consultation to installation, we aim to provide a smooth and reliable customer experience.'
    }
  ];

  return (
    <section style={{ padding, background: currentBg, position: 'relative', overflow: 'hidden' }}>
      {/* Ambient Lighting Background Orbs */}
      {!isLight && (
        <>
          <div className="orb orb-blue" style={{ top: '20%', left: '5%', width: '450px', height: '450px', opacity: 0.12 }} />
          <div className="orb orb-emerald" style={{ bottom: '15%', right: '5%', width: '450px', height: '450px', opacity: 0.1 }} />
        </>
      )}

      <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        {/* Section Header */}
        <div className="reveal-glass-3d" style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#2563EB', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.75rem' }}>
            <CheckCircle2 size={16} /> WHY CHOOSE TRIVANDRUM GLASS?
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em', color: isLight ? '#0F172A' : '#FFFFFF', margin: 0 }}>
            WHY CHOOSE <span style={{ color: '#2563EB' }}>US?</span>
          </h2>
          <p style={{ color: isLight ? '#475569' : '#94A3B8', marginTop: '1rem', maxWidth: '640px', marginInline: 'auto', fontSize: '1.0625rem', lineHeight: 1.6 }}>
            Combining material quality, precision engineering, and professional installation to deliver reliable architectural glass solutions.
          </p>
        </div>

        {/* Reasons Grid (6 Cards) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {reasons.map((r, idx) => (
            <div
              key={r.id}
              className="reveal-glass-3d glass-card-3d specular-sheen"
              style={{
                transitionDelay: `${idx * 80}ms`,
                padding: '2.25rem 2rem',
                borderRadius: '20px',
                background: isLight ? '#FFFFFF' : 'rgba(15, 23, 42, 0.7)',
                border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.12)',
                boxShadow: isLight ? '0 10px 30px rgba(37, 99, 235, 0.05)' : 'none',
                backdropFilter: isLight ? 'none' : 'blur(16px)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                {/* Header Badge & Icon */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                  <div
                    style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: '14px',
                      background: isLight ? '#EFF6FF' : 'rgba(255, 255, 255, 0.05)',
                      border: isLight ? '1px solid #DBEAFE' : '1px solid rgba(255, 255, 255, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {r.icon}
                  </div>
                  <span
                    style={{
                      fontSize: '0.6875rem',
                      fontWeight: 900,
                      color: r.badgeColor,
                      background: r.badgeBg,
                      border: `1px solid ${r.badgeColor}40`,
                      padding: '0.35rem 0.85rem',
                      borderRadius: '9999px',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {r.badge}
                  </span>
                </div>

                {/* Title */}
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: isLight ? '#0F172A' : '#F8FAFC', marginBottom: '0.75rem', lineHeight: 1.25 }}>
                  {r.title}
                </h3>

                {/* Description */}
                <p style={{ color: isLight ? '#475569' : '#94A3B8', fontSize: '0.9375rem', lineHeight: 1.65, margin: 0 }}>
                  {r.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

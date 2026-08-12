import React from 'react';
import { Calendar, User, ArrowRight } from 'lucide-react';

export default function Blog() {
  const posts = [
    { title: 'Understanding U-Values & SHGC in Commercial Glass Facades', date: 'August 2, 2026', author: 'Dr. Arun Kumar', tag: 'Engineering', image: '/assets/images/glass-skyscraper.png', excerpt: 'How triple glazing and low-E coatings drastically reduce building thermal radiation loss and HVAC energy costs.' },
    { title: 'BS 1088 vs IS 710: Decoding Marine Plywood Standards', date: 'July 18, 2026', author: 'Rajesh Nair', tag: 'Plywood', image: '/assets/images/bwp-plywood.png', excerpt: 'Key differences between British and Indian marine plywood standards for high moisture architectural projects.' },
    { title: 'Electrochromic Smart Glass: The Future of Dynamic Office Privacy', date: 'June 29, 2026', author: 'Priya Menon', tag: 'Innovation', image: '/assets/images/office-interior.png', excerpt: 'Explore PDLC and electrochromic glass technology for real-time solar shading without traditional blinds.' },
  ];

  return (
    <div>
      <section style={{ background: '#0B192C', color: '#fff', padding: '5rem 1.5rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ color: '#60A5FA', fontSize: '0.8125rem', fontWeight: 800, textTransform: 'uppercase' }}>INSIGHTS & ARTICLES</div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, textTransform: 'uppercase', marginTop: '0.5rem', color: '#fff' }}>
            ARCHITECTURAL <span style={{ color: '#1D4ED8' }}>JOURNAL</span>
          </h1>
          <p style={{ color: '#94A3B8', marginTop: '0.75rem', fontSize: '1.125rem', lineHeight: 1.6 }}>
            Technical deep dives into glass thermal performance, acoustic STC ratings, and structural plywood standards.
          </p>
        </div>
      </section>

      <section style={{ padding: '4rem 1.5rem', background: '#F8FAFC' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          {posts.map((post, idx) => (
            <div key={idx} style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0,0,0,0.04)' }}>
              <div style={{ height: '200px', overflow: 'hidden' }}>
                <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '1.75rem' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#1D4ED8', textTransform: 'uppercase', marginBottom: '0.375rem' }}>{post.tag}</div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.5rem' }}>{post.title}</h3>
                <p style={{ color: '#475569', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>{post.excerpt}</p>
                <div style={{ fontSize: '0.75rem', color: '#94A3B8', display: 'flex', gap: '1rem' }}>
                  <span><User size={12} style={{ display: 'inline', verticalAlign: 'middle' }} /> {post.author}</span>
                  <span><Calendar size={12} style={{ display: 'inline', verticalAlign: 'middle' }} /> {post.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

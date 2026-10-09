import React from 'react';
import { BookOpen, Calendar, User, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Blog() {
  const articles = [
    {
      id: 'toughened-vs-laminated-glass',
      title: 'Toughened Glass vs Laminated Glass: Which Is Better?',
      category: 'GLASS TECHNICAL GUIDE',
      excerpt: 'Compare mechanical impact strength, thermal resistance, shattering patterns, and acoustic performance between toughened and laminated safety glass.',
      date: 'Sep 12, 2026',
      author: 'TRIVANDRUM GLASS Advisory'
    },
    {
      id: 'choose-right-glass-home',
      title: 'How to Choose the Right Glass for Your Home',
      category: 'RESIDENTIAL GLAZING',
      excerpt: 'A comprehensive homeowner guide on selecting energy-efficient, safety-rated glass for windows, doors, shower enclosures, and balcony railings.',
      date: 'Sep 08, 2026',
      author: 'Design Team'
    },
    {
      id: 'glass-partitions-modern-offices',
      title: 'Benefits of Glass Partitions for Modern Offices',
      category: 'COMMERCIAL INTERIORS',
      excerpt: 'Discover how acoustic glass partitions improve office productivity, privacy, natural daylighting, and spatial flexibility in corporate workspaces.',
      date: 'Aug 28, 2026',
      author: 'Commercial Specialist'
    },
    {
      id: 'toughened-glass-cost-trivandrum',
      title: 'How Much Does Toughened Glass Cost in Trivandrum?',
      category: 'PRICING & ESTIMATION',
      excerpt: 'Understand key cost factors including glass thickness (4mm–19mm), CNC edge processing, heat tempering, hardware fittings, and professional installation.',
      date: 'Aug 19, 2026',
      author: 'Estimation Dept'
    },
    {
      id: 'benefits-glass-railings-homes',
      title: 'Benefits of Glass Railings for Modern Homes',
      category: 'BALCONY & STAIRCASES',
      excerpt: 'Explore how frameless glass railing systems enhance safety, preserve panoramic outdoor views, and increase property resale value.',
      date: 'Aug 10, 2026',
      author: 'Architectural Glazer'
    },
    {
      id: 'what-is-toughened-glass-how-made',
      title: 'What Is Toughened Glass and How Is It Made?',
      category: 'MANUFACTURING',
      excerpt: 'Step-by-step breakdown of the thermal tempering furnace process that increases glass tensile strength by up to 5x over standard float glass.',
      date: 'Jul 30, 2026',
      author: 'Technical Director'
    },
    {
      id: 'choose-glass-balcony-railings',
      title: 'How to Choose Glass for Balcony Railings',
      category: 'SAFETY CODES',
      excerpt: 'Important structural load requirements, wind pressure resistance, and recommended PVB/SGP laminated toughened glass specs for elevated balconies.',
      date: 'Jul 18, 2026',
      author: 'Safety Engineer'
    },
    {
      id: 'frameless-vs-framed-glass-doors',
      title: 'Frameless vs Framed Glass Doors',
      category: 'DOOR SYSTEMS',
      excerpt: 'Weighing aesthetic minimalist appeal against acoustic sealing performance to pick the perfect glass door system for homes and showrooms.',
      date: 'Jul 04, 2026',
      author: 'Interior Specialist'
    },
    {
      id: 'best-glass-solutions-office-interiors',
      title: 'Best Glass Solutions for Modern Office Interiors',
      category: 'WORKSPACE DESIGN',
      excerpt: 'From switchable electrochromic privacy glass to acoustic double-glazed meeting rooms — essential glazing for modern corporate fit-outs.',
      date: 'Jun 22, 2026',
      author: 'Commercial Advisory'
    },
    {
      id: 'improve-natural-light-home-glass',
      title: 'How Glass Can Improve Natural Light in Your Home',
      category: 'DAYLIGHTING',
      excerpt: 'Maximize indoor illumination, reduce daytime electricity costs, and enhance occupant well-being with strategic glass placement.',
      date: 'Jun 10, 2026',
      author: 'Lighting Architect'
    },
    {
      id: 'glass-safety-homeowners-guide',
      title: 'Glass Safety: What Homeowners Should Know',
      category: 'HOME SAFETY',
      excerpt: 'Essential safety standards (IS 2553 / EN 12150) for glass used near floor level, in shower enclosures, and around children.',
      date: 'May 28, 2026',
      author: 'Quality Inspector'
    },
    {
      id: 'maintain-toughened-glass-doors',
      title: 'How to Maintain Toughened Glass and Glass Doors',
      category: 'MAINTENANCE & CARE',
      excerpt: 'Simple cleaning routines, non-abrasive solution tips, and hardware alignment checks to keep glass doors and partitions looking brand new.',
      date: 'May 14, 2026',
      author: 'Service Manager'
    }
  ];

  return (
    <div style={{ background: '#04070D', color: '#F8FAFC', overflowX: 'hidden' }}>

      {/* Hero Section */}
      <section style={{ padding: '6rem 1.5rem 4.5rem 1.5rem', background: '#080C14', borderBottom: '1px solid rgba(255,255,255,0.08)', textAlign: 'center' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ color: '#60A5FA', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '1rem' }}>
            TRIVANDRUM GLASS • ARCHITECTURAL KNOWLEDGE CENTER
          </div>
          <h1 style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em', color: '#FFFFFF', lineHeight: 1.15, marginBottom: '1.25rem' }}>
            GLASS <span style={{ color: '#60A5FA' }}>INSIGHTS & GUIDES</span>
          </h1>
          <p style={{ color: '#94A3B8', fontSize: 'clamp(1rem, 2vw, 1.2rem)', lineHeight: 1.7, maxWidth: '780px', margin: '0 auto' }}>
            Expert technical guides, safety standards, cost factors, and design recommendations for toughened glass and architectural glazing in Trivandrum.
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section style={{ padding: '5rem 1.5rem', background: '#04070D' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {articles.map((a) => (
              <div
                key={a.id}
                className="glass-card-3d specular-sheen"
                style={{
                  padding: '2rem',
                  borderRadius: '20px',
                  background: 'rgba(15, 23, 42, 0.75)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  display: 'flex',
                  flexDirection: 'column',
                  justify: 'space-between'
                }}
              >
                <div>
                  <div style={{ fontSize: '0.72rem', fontWeight: 900, color: '#60A5FA', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.625rem' }}>
                    {a.category}
                  </div>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#F8FAFC', marginBottom: '0.875rem', lineHeight: 1.3 }}>
                    {a.title}
                  </h2>
                  <p style={{ color: '#94A3B8', fontSize: '0.90625rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                    {a.excerpt}
                  </p>
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', color: '#64748B', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1rem', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                      <Calendar size={13} color="#94A3B8" />
                      <span>{a.date}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                      <User size={13} color="#94A3B8" />
                      <span>{a.author}</span>
                    </div>
                  </div>

                  <Link
                    to="/contact"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.375rem',
                      color: '#60A5FA',
                      fontWeight: 800,
                      fontSize: '0.8125rem',
                      textDecoration: 'none'
                    }}
                  >
                    <span>READ ARTICLE</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>

              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

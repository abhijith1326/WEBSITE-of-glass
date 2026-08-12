import React, { useState } from 'react';
import { Calculator, Download, CheckCircle, ShieldAlert, Award } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { useAudioFX } from '../../context/AudioFXContext';

export default function SpecCalculator() {
  const { addToast } = useToast();
  const { playTone } = useAudioFX();

  const [category, setCategory] = useState('glass');
  const [productType, setProductType] = useState('facade-triple');
  const [widthM, setWidthM] = useState(2.4);
  const [heightM, setHeightM] = useState(3.6);
  const [quantity, setQuantity] = useState(25);
  const [windLoad, setWindLoad] = useState('high');

  const calculateMetrics = () => {
    const areaPerUnit = widthM * heightM;
    const totalArea = areaPerUnit * quantity;

    let basePricePerM2 = 145;
    let weightPerM2 = 32;
    let thermalSavingsPerYearM2 = 18;

    if (category === 'glass') {
      if (productType === 'facade-triple') {
        basePricePerM2 = 210;
        weightPerM2 = 42;
        thermalSavingsPerYearM2 = 34;
      } else if (productType === 'acoustic-pvb') {
        basePricePerM2 = 185;
        weightPerM2 = 36;
        thermalSavingsPerYearM2 = 22;
      } else if (productType === 'solar-electro') {
        basePricePerM2 = 390;
        weightPerM2 = 48;
        thermalSavingsPerYearM2 = 58;
      } else {
        basePricePerM2 = 160;
        weightPerM2 = 30;
        thermalSavingsPerYearM2 = 15;
      }
    } else {
      if (productType === 'marine-ply') {
        basePricePerM2 = 68;
        weightPerM2 = 14;
        thermalSavingsPerYearM2 = 8;
      } else if (productType === 'fire-retardant') {
        basePricePerM2 = 92;
        weightPerM2 = 16;
        thermalSavingsPerYearM2 = 10;
      } else {
        basePricePerM2 = 55;
        weightPerM2 = 12;
        thermalSavingsPerYearM2 = 6;
      }
    }

    let windMultiplier = 1.0;
    if (windLoad === 'medium') windMultiplier = 1.15;
    if (windLoad === 'high') windMultiplier = 1.35;
    if (windLoad === 'extreme') windMultiplier = 1.6;

    const totalWeightKg = (totalArea * weightPerM2 * windMultiplier).toFixed(0);
    const estimatedCost = (totalArea * basePricePerM2 * (windMultiplier > 1.2 ? 1.1 : 1.0)).toFixed(0);
    const annualSavings = (totalArea * thermalSavingsPerYearM2).toFixed(0);
    const roiYears = (estimatedCost / (annualSavings || 1)).toFixed(1);

    return {
      totalArea: totalArea.toFixed(1),
      totalWeightKg,
      estimatedCost,
      annualSavings,
      roiYears
    };
  };

  const metrics = calculateMetrics();

  const handleExport = () => {
    playTone(900, 0.05);
    const specText = `
============================================================
GLAZE TEMP ARCHITECTURAL SPECIFICATION REPORT
Generated: ${new Date().toLocaleDateString()}
============================================================

PROJECT PARAMETERS:
- Material Category: ${category.toUpperCase()}
- Product Specification: ${productType}
- Panel Dimensions: ${widthM}m (W) x ${heightM}m (H)
- Total Order Units: ${quantity} panels
- Structural Wind Zone: ${windLoad.toUpperCase()}

ENGINEERING CALCULATIONS & ESTIMATES:
- Total Surface Area: ${metrics.totalArea} m²
- Gross Structural Weight: ${Number(metrics.totalWeightKg).toLocaleString()} kg
- Estimated Materials Investment: $${Number(metrics.estimatedCost).toLocaleString()} USD
- Projected HVAC Energy Savings ROI: ${metrics.roiYears} Years ($${Number(metrics.annualSavings).toLocaleString()}/yr)

QUALITY & CERTIFICATION COMPLIANCE:
- Glass Standards: ISO 9001, EN 12150 Safety Tempered, ASTM C1048
- Plywood Standards: BS 1088 Marine Grade, EN 636-3 Exterior
- Thermal Rating: Certified Low-E Solar Energy Barrier

Contact GLAZE TEMP Engineering Advisory:
Email: spec@glazetemp.com | Web: www.glazetemp.com
============================================================
    `.trim();

    const blob = new Blob([specText], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `GLAZE_TEMP_Spec_Report_${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(link.href);

    addToast('Downloaded official GLAZE TEMP Architectural Spec Sheet!');
  };

  return (
    <section id="spec-calculator" style={{ background: '#F8FAFC', padding: '4rem 1.5rem', borderTop: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0' }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ color: '#1D4ED8', fontSize: '0.8125rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            ENGINEERING & ESTIMATION TOOLS
          </div>
          <h2 style={{ fontSize: '2.25rem', fontWeight: 900, textTransform: 'uppercase', marginTop: '0.5rem', color: '#0F172A' }}>
            Architectural Spec & <span style={{ color: '#1D4ED8' }}>Load Calculator</span>
          </h2>
          <p style={{ color: '#475569', marginTop: '0.5rem', maxWidth: '640px', marginInline: 'auto' }}>
            Calculate total panel surface area, structural wind-load gross weight, estimated investment cost, and HVAC thermal payback ROI.
          </p>
        </div>

        {/* Category Toggle Tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { id: 'glass', label: '🪟 Architectural Glass Solutions' },
            { id: 'plywood', label: '🪵 High-Grade Plywood Solutions' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => { setCategory(cat.id); playTone(600, 0.03); }}
              style={{
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                border: '1px solid',
                borderColor: category === cat.id ? '#1D4ED8' : '#CBD5E1',
                background: category === cat.id ? '#1D4ED8' : '#FFFFFF',
                color: category === cat.id ? '#FFFFFF' : '#1E293B',
                fontWeight: 800,
                fontSize: '0.875rem',
                cursor: 'pointer',
                boxShadow: category === cat.id ? '0 4px 12px rgba(29, 78, 216, 0.25)' : 'none',
                transition: 'all 0.2s ease',
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem', alignItems: 'start' }}>
          {/* Inputs Form */}
          <div style={{ background: '#FFFFFF', padding: '2rem', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 800, color: '#1E293B', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                Select Product Specification
              </label>
              <select
                value={productType}
                onChange={(e) => setProductType(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', background: '#F8FAFC', fontWeight: 600, outline: 'none' }}
              >
                {category === 'glass' ? (
                  <>
                    <option value="facade-triple">GLAZE Triplex Insulating Glass (U=0.65 W/m²K)</option>
                    <option value="acoustic-pvb">GLAZE Acoustic Laminated Glass (44dB STC)</option>
                    <option value="solar-electro">GLAZE Smart Electrochromic Dynamic Glass</option>
                    <option value="ultra-clear">GLAZE Clear Ultra-Low Iron Structural Glass</option>
                  </>
                ) : (
                  <>
                    <option value="marine-ply">GLAZE Core BS 1088 Marine Grade Plywood</option>
                    <option value="fire-retardant">GLAZE Flame Fire-Retardant Architectural Ply</option>
                    <option value="structural-hardwood">GLAZE Heavy Load Structural Hardwood</option>
                  </>
                )}
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 800, color: '#1E293B', textTransform: 'uppercase', marginBottom: '0.375rem' }}>
                  Width: {widthM} meters
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="6"
                  step="0.1"
                  value={widthM}
                  onChange={(e) => setWidthM(parseFloat(e.target.value))}
                  style={{ width: '100%', accentColor: '#1D4ED8' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 800, color: '#1E293B', textTransform: 'uppercase', marginBottom: '0.375rem' }}>
                  Height: {heightM} meters
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="8"
                  step="0.1"
                  value={heightM}
                  onChange={(e) => setHeightM(parseFloat(e.target.value))}
                  style={{ width: '100%', accentColor: '#1D4ED8' }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 800, color: '#1E293B', textTransform: 'uppercase', marginBottom: '0.375rem' }}>
                  Quantity: {quantity} units
                </label>
                <input
                  type="range"
                  min="1"
                  max="200"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  style={{ width: '100%', accentColor: '#1D4ED8' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 800, color: '#1E293B', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                  Wind Load Zone
                </label>
                <select
                  value={windLoad}
                  onChange={(e) => setWindLoad(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', background: '#F8FAFC', fontWeight: 600, outline: 'none' }}
                >
                  <option value="low">Standard Interior / Low Wind (Zone A)</option>
                  <option value="medium">Mid-rise Building / Medium (Zone B)</option>
                  <option value="high">High-rise Facade / High (Zone C)</option>
                  <option value="extreme">Coastal Skyscraper / Extreme (Zone D)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results Summary Box */}
          <div style={{ background: '#0B192C', color: '#FFFFFF', padding: '2rem', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '1.5rem', boxShadow: '0 15px 35px rgba(11,25,44,0.2)' }}>
            <div style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#60A5FA', textTransform: 'uppercase' }}>ENGINEERING CALCULATION METRICS</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 900, marginTop: '4px' }}>Project Specification Summary</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem' }}>
                <span style={{ color: '#94A3B8', fontSize: '0.875rem' }}>Total Surface Area</span>
                <span style={{ fontWeight: 800, fontSize: '1.125rem' }}>{metrics.totalArea} m²</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem' }}>
                <span style={{ color: '#94A3B8', fontSize: '0.875rem' }}>Gross Structural Weight</span>
                <span style={{ fontWeight: 800, fontSize: '1.125rem', color: '#60A5FA' }}>{Number(metrics.totalWeightKg).toLocaleString()} kg</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem' }}>
                <span style={{ color: '#94A3B8', fontSize: '0.875rem' }}>Estimated Investment</span>
                <span style={{ fontWeight: 900, fontSize: '1.25rem', color: '#34D399' }}>${Number(metrics.estimatedCost).toLocaleString()} USD</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem' }}>
                <span style={{ color: '#94A3B8', fontSize: '0.875rem' }}>HVAC Payback ROI</span>
                <span style={{ fontWeight: 800, fontSize: '1.125rem', color: '#FBBF24' }}>{metrics.roiYears} Years</span>
              </div>
            </div>

            <button
              onClick={handleExport}
              style={{
                marginTop: '0.5rem',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
                width: '100%',
                padding: '0.875rem',
                borderRadius: '8px',
                background: '#1D4ED8',
                color: '#FFFFFF',
                border: 'none',
                fontWeight: 800,
                fontSize: '0.875rem',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(29, 78, 216, 0.4)',
                transition: 'all 0.2s ease',
              }}
            >
              <Download size={18} />
              <span>Export Printable Spec Sheet</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

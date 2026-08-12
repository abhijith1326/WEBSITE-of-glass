/* ============================================================
   VITRAGROUP — ARCHITECTURAL ENGINEERING SPEC & QUOTE CALCULATOR
   Load capacity estimation, thermal payback ROI, custom dimensions,
   and instant printable spec sheet generator
   ============================================================ */

'use strict';

class SpecCalculator {
  constructor() {
    this.materialCategory = 'glass'; // 'glass' or 'plywood'
    this.productType = 'facade-triple';
    this.widthM = 2.4; // meters
    this.heightM = 3.6; // meters
    this.quantity = 25; // units
    this.windLoadZone = 'high'; // 'low', 'medium', 'high', 'extreme'

    this.init();
  }

  init() {
    this.bindEvents();
    this.calculate();
  }

  bindEvents() {
    const categoryBtns = document.querySelectorAll('[data-sc-category]');
    const typeSelect = document.getElementById('sc-product-type');
    const widthInput = document.getElementById('sc-width');
    const heightInput = document.getElementById('sc-height');
    const qtyInput = document.getElementById('sc-qty');
    const windSelect = document.getElementById('sc-wind-load');
    const exportBtn = document.getElementById('sc-export-spec');

    categoryBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        categoryBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.materialCategory = btn.dataset.scCategory;
        this.updateProductOptions();
        this.calculate();
      });
    });

    if (typeSelect) {
      typeSelect.addEventListener('change', (e) => {
        this.productType = e.target.value;
        this.calculate();
      });
    }
    if (widthInput) {
      widthInput.addEventListener('input', (e) => {
        this.widthM = parseFloat(e.target.value) || 1;
        const el = document.getElementById('sc-width-val');
        if (el) el.textContent = `${this.widthM} m`;
        this.calculate();
      });
    }
    if (heightInput) {
      heightInput.addEventListener('input', (e) => {
        this.heightM = parseFloat(e.target.value) || 1;
        const el = document.getElementById('sc-height-val');
        if (el) el.textContent = `${this.heightM} m`;
        this.calculate();
      });
    }
    if (qtyInput) {
      qtyInput.addEventListener('input', (e) => {
        this.quantity = parseInt(e.target.value, 10) || 1;
        const el = document.getElementById('sc-qty-val');
        if (el) el.textContent = `${this.quantity} units`;
        this.calculate();
      });
    }
    if (windSelect) {
      windSelect.addEventListener('change', (e) => {
        this.windLoadZone = e.target.value;
        this.calculate();
      });
    }

    if (exportBtn) {
      exportBtn.addEventListener('click', () => this.exportSpecSheet());
    }
  }

  updateProductOptions() {
    const typeSelect = document.getElementById('sc-product-type');
    if (!typeSelect) return;

    if (this.materialCategory === 'glass') {
      typeSelect.innerHTML = `
        <option value="facade-triple" selected>VitraShield Triplex Insulating Glass (U=0.65)</option>
        <option value="acoustic-pvb">VitraSound Acoustic Laminated Glass (44dB)</option>
        <option value="solar-electro">VitraSmart Electrochromic Dynamic Glass</option>
        <option value="ultra-clear">VitraClear Ultra-Low Iron Structural Glass</option>
      `;
    } else {
      typeSelect.innerHTML = `
        <option value="marine-ply" selected>VitraCore Marine Grade Plywood (BS 1088)</option>
        <option value="fire-retardant">VitraFlame Fire-Retardant Architectural Plywood</option>
        <option value="structural-hardwood">VitraPly Heavy Load Structural Hardwood</option>
        <option value="flexible-bamboo">VitraFlex Molded Architectural Ply</option>
      `;
    }
    this.productType = typeSelect.value;
  }

  calculate() {
    const areaPerUnit = this.widthM * this.heightM;
    const totalAreaM2 = areaPerUnit * this.quantity;

    let basePricePerM2 = 145; // USD
    let weightPerM2 = 32; // kg/m2
    let thermalSavingsPerYearM2 = 18; // USD/m2 saved in HVAC

    if (this.materialCategory === 'glass') {
      if (this.productType === 'facade-triple') {
        basePricePerM2 = 210;
        weightPerM2 = 42;
        thermalSavingsPerYearM2 = 34;
      } else if (this.productType === 'acoustic-pvb') {
        basePricePerM2 = 185;
        weightPerM2 = 36;
        thermalSavingsPerYearM2 = 22;
      } else if (this.productType === 'solar-electro') {
        basePricePerM2 = 390;
        weightPerM2 = 48;
        thermalSavingsPerYearM2 = 58;
      } else {
        basePricePerM2 = 160;
        weightPerM2 = 30;
        thermalSavingsPerYearM2 = 15;
      }
    } else {
      // Plywood
      if (this.productType === 'marine-ply') {
        basePricePerM2 = 68;
        weightPerM2 = 14;
        thermalSavingsPerYearM2 = 8;
      } else if (this.productType === 'fire-retardant') {
        basePricePerM2 = 92;
        weightPerM2 = 16;
        thermalSavingsPerYearM2 = 10;
      } else {
        basePricePerM2 = 55;
        weightPerM2 = 12;
        thermalSavingsPerYearM2 = 6;
      }
    }

    // Wind load factor
    let windMultiplier = 1.0;
    if (this.windLoadZone === 'medium') windMultiplier = 1.15;
    if (this.windLoadZone === 'high') windMultiplier = 1.35;
    if (this.windLoadZone === 'extreme') windMultiplier = 1.6;

    const totalWeightKg = (totalAreaM2 * weightPerM2 * windMultiplier).toFixed(0);
    const estimatedCost = (totalAreaM2 * basePricePerM2 * (windMultiplier > 1.2 ? 1.1 : 1.0)).toFixed(0);
    const annualEnergySavings = (totalAreaM2 * thermalSavingsPerYearM2).toFixed(0);
    const roiYears = (estimatedCost / (annualEnergySavings || 1)).toFixed(1);

    // Update DOM
    const areaEl = document.getElementById('sc-res-area');
    const weightEl = document.getElementById('sc-res-weight');
    const costEl = document.getElementById('sc-res-cost');
    const roiEl = document.getElementById('sc-res-roi');

    if (areaEl) areaEl.textContent = `${totalAreaM2.toFixed(1)} m²`;
    if (weightEl) weightEl.textContent = `${Number(totalWeightKg).toLocaleString()} kg`;
    if (costEl) costEl.textContent = `$${Number(estimatedCost).toLocaleString()} USD`;
    if (roiEl) roiEl.textContent = `${roiYears} Yrs`;
  }

  exportSpecSheet() {
    const area = document.getElementById('sc-res-area')?.textContent || 'N/A';
    const weight = document.getElementById('sc-res-weight')?.textContent || 'N/A';
    const cost = document.getElementById('sc-res-cost')?.textContent || 'N/A';
    const roi = document.getElementById('sc-res-roi')?.textContent || 'N/A';

    const specContent = `
============================================================
VITRAGROUP ARCHITECTURAL SPECIFICATION REPORT
Generated: ${new Date().toLocaleDateString()}
============================================================

PROJECT PARAMETERS:
- Category: ${this.materialCategory.toUpperCase()}
- Product Specification: ${this.productType}
- Dimensions: ${this.widthM}m (W) x ${this.heightM}m (H) per panel
- Order Quantity: ${this.quantity} units
- Structural Load Zone: ${this.windLoadZone.toUpperCase()}

ENGINEERING CALCULATIONS & METRICS:
- Total Surface Area: ${area}
- Total Gross Weight: ${weight}
- Projected Investment: ${cost}
- HVAC Energy Payback ROI: ${roi}

QUALITY & CERTIFICATION COMPLIANCE:
- Glass Standard: ISO 9001, EN 12150 Toughened Safety, ASTM C1048
- Plywood Standard: BS 1088 Marine Grade, EN 636-3 Exterior
- Thermal Performance: Certified low-E radiation barrier

Contact VitraGroup Architectural Advisory:
Email: spec@vitragroup.com | Web: www.vitragroup.com
============================================================
    `.trim();

    const blob = new Blob([specContent], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `VitraGroup_Spec_Sheet_${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(link.href);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('spec-calculator-form')) {
    window.specCalculator = new SpecCalculator();
  }
});

/* ============================================================
   VITRAGLASS — MAIN JS (LUXURY EDITION)
   Command Palette (Cmd+K), Physical Sample Cart Drawer,
   Web Audio UI Micro-FX Engine, Theme Switcher & Interactive Core
   ============================================================ */

'use strict';

/* ============================================================
   PRELOADER
   ============================================================ */
function initPreloader() {
  const loader = document.getElementById('page-loader');
  if (!loader) return;

  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
      document.body.style.overflow = '';
    }, 1200);
  });

  // Failsafe
  setTimeout(() => {
    if (loader) loader.classList.add('hidden');
    document.body.style.overflow = '';
  }, 2800);
}

/* ============================================================
   NAVBAR & MEGA-MENU PREVIEWS
   ============================================================ */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  }, { passive: true });

  const navLinks = document.querySelectorAll('.nav-link');
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* ============================================================
   MOBILE MENU
   ============================================================ */
function initMobileMenu() {
  const toggle = document.querySelector('.nav-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (!toggle || !mobileMenu) return;

  let isOpen = false;

  function openMenu() {
    isOpen = true;
    toggle.classList.add('open');
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    isOpen = false;
    toggle.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  }

  toggle.addEventListener('click', () => {
    isOpen ? closeMenu() : openMenu();
  });

  const mobileLinks = mobileMenu.querySelectorAll('a');
  mobileLinks.forEach(link => link.addEventListener('click', closeMenu));

  mobileMenu.addEventListener('click', (e) => {
    if (e.target === mobileMenu) closeMenu();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) closeMenu();
  });
}

/* ============================================================
   SMOOTH SCROLL
   ============================================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#' || href === '') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const offsetTop = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    });
  });
}

/* ============================================================
   BACK TO TOP
   ============================================================ */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ============================================================
   WEB AUDIO API MICRO-SOUND FX ENGINE
   ============================================================ */
class AudioFXEngine {
  constructor() {
    this.enabled = localStorage.getItem('vg_audio_fx') === 'true';
    this.audioCtx = null;
    this.initToggle();
  }

  initToggle() {
    const btn = document.getElementById('audio-fx-toggle');
    if (!btn) return;

    this.updateBtnState(btn);

    btn.addEventListener('click', () => {
      this.enabled = !this.enabled;
      localStorage.setItem('vg_audio_fx', this.enabled ? 'true' : 'false');
      this.updateBtnState(btn);
      if (this.enabled) this.playTone(880, 0.05, 'sine');
    });

    // Attach click listener for buttons
    document.addEventListener('click', (e) => {
      if (!this.enabled) return;
      if (e.target.closest('button, .btn, .nav-link, a, input, select')) {
        this.playTone(600, 0.03, 'sine');
      }
    });
  }

  updateBtnState(btn) {
    if (this.enabled) {
      btn.classList.add('active');
      btn.setAttribute('aria-label', 'Mute UI Sound FX');
      btn.title = 'Sound FX: On';
    } else {
      btn.classList.remove('active');
      btn.setAttribute('aria-label', 'Enable UI Sound FX');
      btn.title = 'Sound FX: Off';
    }
  }

  playTone(freq = 440, duration = 0.05, type = 'sine') {
    try {
      if (!this.audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this.audioCtx = new AudioContext();
      }
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);
      gain.gain.setValueAtTime(0.04, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + duration);
    } catch (err) {
      // Ignore audio failures silently
    }
  }
}

/* ============================================================
   GLOBAL COMMAND PALETTE (CMD+K)
   ============================================================ */
class CommandPaletteManager {
  constructor() {
    this.palette = document.getElementById('command-palette-modal');
    this.input = document.getElementById('cp-search-input');
    this.resultsContainer = document.getElementById('cp-results');
    this.isOpen = false;

    this.items = [
      { title: 'VitraShield Triplex Insulating Glass', type: 'Product', url: 'glass-solutions.html#facade', tags: 'glass specs thermal facade' },
      { title: 'VitraSound Acoustic Laminated Glass (44dB)', type: 'Product', url: 'glass-solutions.html#acoustic', tags: 'acoustic sound pvb quiet' },
      { title: 'VitraSmart Electrochromic Dynamic Glass', type: 'Product', url: 'glass-solutions.html#smart', tags: 'smart tint electrochromic privacy' },
      { title: 'VitraCore BS 1088 Marine Grade Plywood', type: 'Product', url: 'plywood-solutions.html#marine', tags: 'plywood marine bs1088 wood waterproof' },
      { title: 'VitraFlame Fire-Retardant Architectural Ply', type: 'Product', url: 'plywood-solutions.html#fire', tags: 'plywood fire retardant safety structural' },
      { title: 'Interactive 3D Glass Specs Visualizer', type: 'Tool', url: 'index.html#glass-visualizer', tags: '3d canvas simulator optics light u-value' },
      { title: 'Acoustic Sound Attenuation Simulator', type: 'Tool', url: 'index.html#acoustic-simulator', tags: 'audio simulator sound noise db attenuation' },
      { title: 'Architectural Engineering Spec Builder', type: 'Tool', url: 'index.html#spec-calculator', tags: 'quote specs load calculator pdf export' },
      { title: 'Physical Architectural Sample Swatch Drawer', type: 'Tool', url: '#open-sample-drawer', action: () => window.sampleCart?.openDrawer(), tags: 'samples kit swatch box order' },
      { title: 'ISO 9001 & ASTM Architectural Test Certifications', type: 'Document', url: 'quality.html', tags: 'quality specs certifications standards' },
      { title: 'Sustainability & Carbon Neutral Production', type: 'Corporate', url: 'sustainability.html', tags: 'green eco carbon recycling solar' },
      { title: 'Request Custom Architectural Consultation', type: 'Contact', url: 'contact.html', tags: 'contact quote inquiry consultation sales' }
    ];

    this.init();
  }

  init() {
    if (!this.palette) return;

    // Cmd+K shortcut
    document.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        this.toggle();
      }
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });

    // Global triggers
    document.querySelectorAll('[data-cp-trigger]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.open();
      });
    });

    // Close on backdrop click
    this.palette.addEventListener('click', (e) => {
      if (e.target === this.palette) this.close();
    });

    if (this.input) {
      this.input.addEventListener('input', () => this.renderResults(this.input.value));
    }
  }

  toggle() {
    this.isOpen ? this.close() : this.open();
  }

  open() {
    this.isOpen = true;
    this.palette.classList.add('open');
    document.body.style.overflow = 'hidden';
    if (this.input) {
      this.input.value = '';
      this.input.focus();
    }
    this.renderResults('');
  }

  close() {
    this.isOpen = false;
    this.palette.classList.remove('open');
    document.body.style.overflow = '';
  }

  renderResults(query) {
    if (!this.resultsContainer) return;
    const cleanQuery = query.toLowerCase().trim();

    const filtered = this.items.filter(item => {
      return item.title.toLowerCase().includes(cleanQuery) ||
             item.type.toLowerCase().includes(cleanQuery) ||
             item.tags.toLowerCase().includes(cleanQuery);
    });

    if (filtered.length === 0) {
      this.resultsContainer.innerHTML = `
        <div class="cp-no-results">
          <p>No matching architectural specs or tools found for "${query}"</p>
        </div>
      `;
      return;
    }

    this.resultsContainer.innerHTML = filtered.map((item, idx) => `
      <div class="cp-item ${idx === 0 ? 'selected' : ''}" data-cp-idx="${idx}">
        <div class="cp-item-icon">
          ${item.type === 'Product' ? '💎' : item.type === 'Tool' ? '⚡' : '📄'}
        </div>
        <div class="cp-item-details">
          <div class="cp-item-title">${item.title}</div>
          <div class="cp-item-meta">${item.type} • ${item.tags.split(' ').slice(0, 3).join(', ')}</div>
        </div>
        <div class="cp-item-arrow">→</div>
      </div>
    `).join('');

    // Click handlers
    this.resultsContainer.querySelectorAll('.cp-item').forEach((el, idx) => {
      el.addEventListener('click', () => {
        const selected = filtered[idx];
        this.close();
        if (selected.action) {
          selected.action();
        } else {
          window.location.href = selected.url;
        }
      });
    });
  }
}

/* ============================================================
   PHYSICAL SAMPLE KIT CART DRAWER
   ============================================================ */
class SampleCartDrawer {
  constructor() {
    this.drawer = document.getElementById('sample-cart-drawer');
    this.badge = document.getElementById('sample-cart-count');
    this.itemsContainer = document.getElementById('sample-cart-items');
    this.items = JSON.parse(localStorage.getItem('vg_sample_cart') || '[]');

    this.init();
  }

  init() {
    this.updateCount();

    // Trigger drawer open
    document.querySelectorAll('[data-open-samples]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.openDrawer();
      });
    });

    // Add to cart buttons
    document.querySelectorAll('[data-add-sample]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const sampleName = btn.dataset.addSample;
        const sampleType = btn.dataset.sampleType || 'Glass Specimen';
        this.addItem({ id: sampleName, name: sampleName, type: sampleType });
        this.openDrawer();
      });
    });

    // Drawer close buttons
    const closeBtns = document.querySelectorAll('.sample-drawer-close');
    closeBtns.forEach(btn => btn.addEventListener('click', () => this.closeDrawer()));

    if (this.drawer) {
      this.drawer.addEventListener('click', (e) => {
        if (e.target === this.drawer) this.closeDrawer();
      });
    }

    const orderBtn = document.getElementById('sample-order-btn');
    if (orderBtn) {
      orderBtn.addEventListener('click', () => this.submitOrder());
    }
  }

  addItem(item) {
    if (!this.items.find(i => i.id === item.id)) {
      this.items.push(item);
      localStorage.setItem('vg_sample_cart', JSON.stringify(this.items));
      this.updateCount();
      this.renderItems();
      this.showToast(`Added "${item.name}" to architectural sample kit`);
    } else {
      this.showToast(`"${item.name}" is already in your sample box`);
    }
  }

  removeItem(id) {
    this.items = this.items.filter(i => i.id !== id);
    localStorage.setItem('vg_sample_cart', JSON.stringify(this.items));
    this.updateCount();
    this.renderItems();
  }

  updateCount() {
    if (this.badge) {
      this.badge.textContent = this.items.length;
      this.badge.style.display = this.items.length > 0 ? 'flex' : 'none';
    }
  }

  openDrawer() {
    if (!this.drawer) return;
    this.renderItems();
    this.drawer.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  closeDrawer() {
    if (!this.drawer) return;
    this.drawer.classList.remove('open');
    document.body.style.overflow = '';
  }

  renderItems() {
    if (!this.itemsContainer) return;

    if (this.items.length === 0) {
      this.itemsContainer.innerHTML = `
        <div class="sample-empty">
          <div class="sample-empty-icon">📦</div>
          <h4>Your Architectural Sample Kit is Empty</h4>
          <p>Browse our glass & plywood collections and select up to 5 physical swatches for priority delivery.</p>
        </div>
      `;
      return;
    }

    this.itemsContainer.innerHTML = this.items.map(item => `
      <div class="sample-cart-item">
        <div class="sample-item-info">
          <span class="sample-item-type">${item.type}</span>
          <h5 class="sample-item-name">${item.name}</h5>
        </div>
        <button class="sample-item-remove" data-remove-sample="${item.id}" aria-label="Remove Sample">✕</button>
      </div>
    `).join('');

    this.itemsContainer.querySelectorAll('[data-remove-sample]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.removeItem(btn.dataset.removeSample);
      });
    });
  }

  submitOrder() {
    if (this.items.length === 0) return;
    this.items = [];
    localStorage.setItem('vg_sample_cart', JSON.stringify([]));
    this.updateCount();
    this.renderItems();
    this.closeDrawer();

    // Show Confirmation Modal or Toast
    this.showToast('Priority Sample Kit Request Dispatched! Our Architectural Concierge will confirm delivery.', 4500);
  }

  showToast(message, duration = 3000) {
    let toast = document.getElementById('vg-global-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'vg-global-toast';
      toast.className = 'vg-toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, duration);
  }
}

/* ============================================================
   BEFORE / AFTER SPLIT COMPARISON SLIDER
   ============================================================ */
function initBeforeAfterSliders() {
  const containers = document.querySelectorAll('.before-after-slider');
  containers.forEach(container => {
    const handle = container.querySelector('.ba-handle');
    const afterImage = container.querySelector('.ba-after');
    if (!handle || !afterImage) return;

    let isDragging = false;

    function setPosition(x) {
      const rect = container.getBoundingClientRect();
      let pos = (x - rect.left) / rect.width;
      pos = Math.max(0, Math.min(1, pos));
      const pct = pos * 100;

      afterImage.style.clipPath = `polygon(0 0, ${pct}% 0, ${pct}% 100%, 0 100%)`;
      handle.style.left = `${pct}%`;
    }

    container.addEventListener('mousedown', (e) => {
      isDragging = true;
      setPosition(e.clientX);
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      setPosition(e.clientX);
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });

    container.addEventListener('touchstart', (e) => {
      isDragging = true;
      if (e.touches[0]) setPosition(e.touches[0].clientX);
    });

    window.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      if (e.touches[0]) setPosition(e.touches[0].clientX);
    });

    window.addEventListener('touchend', () => {
      isDragging = false;
    });
  });
}

/* ============================================================
   HERO AUTOMATIC SLIDER
   ============================================================ */
function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const indicators = document.querySelectorAll('.indicator-line');
  const prevBtn = document.querySelector('.hero-slider-prev');
  const nextBtn = document.querySelector('.hero-slider-next');
  const hero = document.querySelector('.hero');

  if (!slides.length) return;

  let currentIndex = 0;
  let autoSlideTimer = null;
  const slideInterval = 5000; // 5 seconds per slide

  function showSlide(index) {
    if (index >= slides.length) currentIndex = 0;
    else if (index < 0) currentIndex = slides.length - 1;
    else currentIndex = index;

    slides.forEach((slide, idx) => {
      if (idx === currentIndex) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });

    indicators.forEach((indicator, idx) => {
      if (idx === currentIndex) {
        indicator.classList.add('active');
      } else {
        indicator.classList.remove('active');
      }
    });
  }

  function nextSlide() {
    showSlide(currentIndex + 1);
  }

  function prevSlide() {
    showSlide(currentIndex - 1);
  }

  function startTimer() {
    stopTimer();
    autoSlideTimer = setInterval(nextSlide, slideInterval);
  }

  function stopTimer() {
    if (autoSlideTimer) {
      clearInterval(autoSlideTimer);
      autoSlideTimer = null;
    }
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      startTimer();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      startTimer();
    });
  }

  indicators.forEach((indicator, idx) => {
    indicator.addEventListener('click', () => {
      showSlide(idx);
      startTimer();
    });
  });

  if (hero) {
    hero.addEventListener('mouseenter', stopTimer);
    hero.addEventListener('mouseleave', startTimer);
  }

  // Start automatic sliding
  startTimer();
}

/* ============================================================
   INITIALIZATION
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initNavbar();
  initHeroSlider();
  initMobileMenu();
  initSmoothScroll();
  initBackToTop();
  initBeforeAfterSliders();

  window.audioFX = new AudioFXEngine();
  window.commandPalette = new CommandPaletteManager();
  window.sampleCart = new SampleCartDrawer();
});

/* ============================================================
   VITRAGLASS — ANIMATIONS & AMBIENT CANVAS JS (LUXURY EDITION)
   Custom Magnetic Cursor, Hero Ambient Canvas, 3D Card Tilt,
   Scroll Reveal & Counter Animations
   ============================================================ */

'use strict';

/* ============================================================
   CUSTOM MAGNETIC CURSOR
   ============================================================ */
class CustomCursor {
  constructor() {
    this.dot = document.getElementById('cursor-dot');
    this.follower = document.getElementById('cursor-follower');
    if (!this.dot || !this.follower) return;

    this.pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    this.mouse = { x: this.pos.x, y: this.pos.y };

    this.init();
  }

  init() {
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;

      this.dot.style.transform = `translate3d(${this.mouse.x}px, ${this.mouse.y}px, 0)`;
    });

    this.animateFollower();
    this.bindHoverStates();
  }

  animateFollower() {
    this.pos.x += (this.mouse.x - this.pos.x) * 0.15;
    this.pos.y += (this.mouse.y - this.pos.y) * 0.15;

    this.follower.style.transform = `translate3d(${this.pos.x}px, ${this.pos.y}px, 0)`;
    requestAnimationFrame(() => this.animateFollower());
  }

  bindHoverStates() {
    const hoverTargets = 'a, button, .btn, input, select, [data-tilt], [data-add-sample], .card, .stat-card';
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(hoverTargets)) {
        this.follower.classList.add('hovering');
        this.dot.classList.add('hovering');
      }
    });

    document.addEventListener('mouseout', (e) => {
      if (e.target.closest(hoverTargets)) {
        this.follower.classList.remove('hovering');
        this.dot.classList.remove('hovering');
      }
    });
  }
}

/* ============================================================
   HERO AMBIENT CANVAS — PARTICLE MESH ENGINE
   ============================================================ */
class AmbientCanvas {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');

    this.particles = [];
    this.particleCount = 50;

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.createParticles();
    this.animate();
  }

  resize() {
    if (!this.canvas) return;
    const rect = this.canvas.getBoundingClientRect();
    this.dpr = window.devicePixelRatio || 1;
    this.canvas.width = rect.width * this.dpr;
    this.canvas.height = rect.height * this.dpr;
    this.ctx.scale(this.dpr, this.dpr);
    this.width = rect.width;
    this.height = rect.height;
  }

  createParticles() {
    this.particles = [];
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.2
      });
    }
  }

  animate() {
    this.render();
    requestAnimationFrame(() => this.animate());
  }

  render() {
    if (!this.ctx || !this.width) return;
    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;

    ctx.clearRect(0, 0, w, h);

    // Update & draw particles
    this.particles.forEach((p, i) => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 245, 160, ${p.alpha})`;
      ctx.fill();

      // Connect nearby nodes
      for (let j = i + 1; j < this.particles.length; j++) {
        const p2 = this.particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(0, 245, 160, ${(1 - dist / 120) * 0.25})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    });
  }
}

/* ============================================================
   3D CARD PARALLAX TILT EFFECT
   ============================================================ */
function init3DTilt() {
  const cards = document.querySelectorAll('[data-tilt]');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 18;
      const rotateY = (centerX - x) / 18;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });
}

/* ============================================================
   SCROLL REVEAL — Intersection Observer
   ============================================================ */
function initScrollReveal() {
  const revealSelectors = '.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-fade';
  const elements = document.querySelectorAll(revealSelectors);

  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -50px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

/* ============================================================
   ANIMATED COUNTERS
   ============================================================ */
function animateCounter(el, target, duration = 2000, suffix = '') {
  const start = performance.now();

  function update(time) {
    const elapsed = time - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(eased * target);

    el.textContent = current.toLocaleString() + suffix;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = target.toLocaleString() + suffix;
    }
  }

  requestAnimationFrame(update);
}

function initCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.counter, 10);
        const suffix = el.dataset.suffix || '';
        const duration = parseInt(el.dataset.duration, 10) || 2000;
        animateCounter(el, target, duration, suffix);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.4 });

  counters.forEach(el => observer.observe(el));
}

/* ============================================================
   INITIALIZATION
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  new CustomCursor();
  new AmbientCanvas('ambient-canvas');
  init3DTilt();
  initScrollReveal();
  initCounters();
});

import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Play, Pause, Box, ChevronDown } from 'lucide-react';
import { useAudioFX } from '../../context/AudioFXContext';
import { useSampleCart } from '../../context/SampleCartContext';

const TOTAL_FRAMES = 192;
const NAVBAR_DARK_THRESHOLD = 35; // Scroll offset (px) where navbar turns dark black

export default function Hero3DCanvas() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const { playTone } = useAudioFX();
  const { addItem } = useSampleCart();

  const [images, setImages] = useState([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [autoRotate, setAutoRotate] = useState(false);
  const [frameProgress, setFrameProgress] = useState(0);
  const [activeStage, setActiveStage] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const targetFrameRef = useRef(0);
  const currentFrameRef = useRef(0);
  const animFrameIdRef = useRef(null);
  const touchStartYRef = useRef(0);

  // Preload all 192 frames
  useEffect(() => {
    let isMounted = true;
    const loadedImages = [];
    let count = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const frameNum = String(i).padStart(4, '0');
      img.src = `/frames/frame-${frameNum}.jpg`;

      img.onload = () => {
        if (!isMounted) return;
        count++;
        setLoadedCount(count);
        if (count === TOTAL_FRAMES) {
          setIsLoaded(true);
        }
      };

      img.onerror = () => {
        if (!isMounted) return;
        count++;
        setLoadedCount(count);
        if (count === TOTAL_FRAMES) {
          setIsLoaded(true);
        }
      };

      loadedImages.push(img);
    }

    setImages(loadedImages);

    return () => {
      isMounted = false;
    };
  }, []);

  // Update frame progress state and left writings active stage
  const updateProgressState = (frameIdx) => {
    const prog = frameIdx / (TOTAL_FRAMES - 1);
    setFrameProgress(prog);

    if (prog < 0.35) {
      setActiveStage(0);
    } else if (prog < 0.7) {
      setActiveStage(1);
    } else {
      setActiveStage(2);
    }

    if (prog >= 0.99) {
      setIsCompleted(true);
    } else {
      setIsCompleted(false);
    }
  };

  // Wheel Scroll-Lock Engine: Keeps page at top while scrubbing 192 frames. Unlocks upon completion!
  useEffect(() => {
    const handleWheel = (e) => {
      if (autoRotate) return;

      const scrollY = window.scrollY || window.pageYOffset;

      // Check if user is at the top hero section
      if (scrollY <= 15) {
        const delta = e.deltaY;
        const currentT = targetFrameRef.current;

        // User scrolling DOWN and animation not finished
        if (delta > 0 && currentT < TOTAL_FRAMES - 1) {
          e.preventDefault();
          const step = Math.max(1, Math.round(Math.abs(delta) * 0.12));
          const nextFrame = Math.min(TOTAL_FRAMES - 1, currentT + step);
          targetFrameRef.current = nextFrame;
          updateProgressState(nextFrame);
        }
        // User scrolling UP at top of page and frame > 0
        else if (delta < 0 && currentT > 0) {
          e.preventDefault();
          const step = Math.max(1, Math.round(Math.abs(delta) * 0.12));
          const nextFrame = Math.max(0, currentT - step);
          targetFrameRef.current = nextFrame;
          updateProgressState(nextFrame);
        }
      }
    };

    // Mobile Touch Swipe Handler
    const handleTouchStart = (e) => {
      touchStartYRef.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      if (autoRotate) return;
      const scrollY = window.scrollY || window.pageYOffset;

      if (scrollY <= 15) {
        const touchY = e.touches[0].clientY;
        const diffY = touchStartYRef.current - touchY; // positive = swipe up / scroll down
        const currentT = targetFrameRef.current;

        if (diffY > 0 && currentT < TOTAL_FRAMES - 1) {
          e.preventDefault();
          const step = Math.max(1, Math.round(Math.abs(diffY) * 0.15));
          const nextFrame = Math.min(TOTAL_FRAMES - 1, currentT + step);
          targetFrameRef.current = nextFrame;
          updateProgressState(nextFrame);
          touchStartYRef.current = touchY;
        } else if (diffY < 0 && currentT > 0) {
          e.preventDefault();
          const step = Math.max(1, Math.round(Math.abs(diffY) * 0.15));
          const nextFrame = Math.max(0, currentT - step);
          targetFrameRef.current = nextFrame;
          updateProgressState(nextFrame);
          touchStartYRef.current = touchY;
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [autoRotate]);

  // Auto-rotate tick if manual auto-play is enabled
  useEffect(() => {
    if (!autoRotate) return;
    const interval = setInterval(() => {
      targetFrameRef.current = (targetFrameRef.current + 1) % TOTAL_FRAMES;
      updateProgressState(targetFrameRef.current);
    }, 40);

    return () => clearInterval(interval);
  }, [autoRotate]);

  // Render loop for full-size 3D video playback with 1st image -> 2nd image vertical transition
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
      }

      const w = rect.width;
      const h = rect.height;

      ctx.save();
      ctx.scale(dpr, dpr);

      // Lerp frame tracking for fluid motion
      const diff = targetFrameRef.current - currentFrameRef.current;
      currentFrameRef.current += diff * 0.18;

      let frameIdx = Math.round(currentFrameRef.current);
      frameIdx = ((frameIdx % TOTAL_FRAMES) + TOTAL_FRAMES) % TOTAL_FRAMES;

      ctx.clearRect(0, 0, w, h);

      const img = images[frameIdx];
      if (img && img.complete && img.naturalWidth > 0) {
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        const imgRatio = img.naturalWidth / img.naturalHeight;
        const canvasRatio = w / h;
        let drawW, drawH, offsetX, offsetY;

        if (canvasRatio > imgRatio) {
          drawW = w;
          drawH = w / imgRatio;
          offsetX = 0;
          offsetY = (h - drawH) / 2;
        } else {
          drawH = h;
          drawW = h * imgRatio;
          offsetX = (w - drawW) / 2;
          offsetY = 0;
        }

        // Initial vertical offset transition (1st image condition -> 2nd image condition)
        // At frame 0, image is shifted UP by 8.5% height (1st image). When scrolling starts (frames 0 to 18),
        // it glides down to 0 (2nd image condition) and continues 3D rotation!
        const startPhase = Math.min(1, Math.max(0, frameIdx / 18));
        const initialYShift = (1 - startPhase) * (-h * 0.085);
        offsetY += initialYShift;

        // Draw 3D image
        ctx.drawImage(img, offsetX, offsetY, drawW, drawH);

        // Soft gradient on the left side only for text legibility
        const leftFade = ctx.createLinearGradient(0, 0, w * 0.55, 0);
        leftFade.addColorStop(0, 'rgba(4, 7, 13, 0.85)');
        leftFade.addColorStop(0.65, 'rgba(4, 7, 13, 0.35)');
        leftFade.addColorStop(1, 'rgba(4, 7, 13, 0)');
        ctx.fillStyle = leftFade;
        ctx.fillRect(0, 0, w * 0.55, h);
      } else {
        ctx.fillStyle = '#04070D';
        ctx.fillRect(0, 0, w, h);
      }

      ctx.restore();
      animFrameIdRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [images]);

  const toggleAutoRotate = () => {
    playTone(620, 0.04);
    setAutoRotate((prev) => !prev);
  };

  const currentFrameDisplay = (Math.round(currentFrameRef.current) % TOTAL_FRAMES) + 1;
  const loadPercentage = Math.round((loadedCount / TOTAL_FRAMES) * 100);

  // Story stages for left-aligned writings
  const storyStages = [
    {
      id: 'glass',
      badge: '3D COMMERCIAL GLASS',
      badgeBg: 'rgba(29, 78, 216, 0.35)',
      badgeBorder: 'rgba(96, 165, 250, 0.5)',
      badgeColor: '#60A5FA',
      titleLine1: 'CRYSTAL GLAZING',
      titleLine2: '& OPTICAL REFRACTION',
      highlightColor: '#60A5FA',
      description:
        'Engineered toughened glass with specular light sweeps, acoustic PVB dampening layers, and high thermal insulation for modern architectural facades.',
      specs: [
        { label: 'U-Value', val: '0.65 W/m²K' },
        { label: 'Sound STC', val: '-44 dB' },
        { label: 'Light VLT', val: '74%' },
      ],
      primaryBtnText: 'EXPLORE GLASS SOLUTIONS',
      primaryBtnLink: '/glass-solutions',
    },
    {
      id: 'plywood',
      badge: 'PREMIUM BWP PLYWOOD',
      badgeBg: 'rgba(217, 119, 6, 0.35)',
      badgeBorder: 'rgba(245, 158, 11, 0.5)',
      badgeColor: '#F59E0B',
      titleLine1: 'BWP 710 MARINE',
      titleLine2: 'HARDWOOD PLYWOOD CORE',
      highlightColor: '#F59E0B',
      description:
        '100% boiling waterproof phenol-formaldehyde synthetic resin bonded hardwood plywood crafted for heavy structural & high-moisture interiors.',
      specs: [
        { label: 'Standard', val: 'IS 710 Certified' },
        { label: 'Water Test', val: '72hr Boiling' },
        { label: 'Core', val: 'Hardwood Ply' },
      ],
      primaryBtnText: 'EXPLORE PLYWOOD RANGE',
      primaryBtnLink: '/plywood-solutions',
    },
    {
      id: 'synergy',
      badge: 'ARCHITECTURAL SYNERGY',
      badgeBg: 'rgba(16, 185, 129, 0.35)',
      badgeBorder: 'rgba(52, 211, 153, 0.5)',
      badgeColor: '#34D399',
      titleLine1: 'GLASS & WOOD',
      titleLine2: 'HARMONIOUS SYNERGY',
      highlightColor: '#34D399',
      description:
        'Seamlessly pair transparent light-refracting glass with rich warm plywood grains for high-end interior paneling, partitions, and exterior walls.',
      specs: [
        { label: 'Versatility', val: 'Interior & Facades' },
        { label: 'Finish', val: 'Ultra-Modern 3D' },
        { label: 'Quality Pass', val: '99.8%' },
      ],
      primaryBtnText: 'REQUEST SPEC CONSULTATION',
      primaryBtnLink: '/contact',
    },
  ];

  const currentStageData = storyStages[activeStage];

  return (
    <section
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        background: '#04070D',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        margin: 0,
        padding: 0,
      }}
    >
      <style>{`
        @media (max-width: 900px) {
          .hero-3d-content-wrap {
            flex-direction: column !important;
            align-items: flex-start !important;
            justify-content: flex-end !important;
            padding-bottom: 2rem !important;
            gap: 1.5rem !important;
          }
          .hero-3d-writings-block {
            max-width: 100% !important;
          }
          .hero-3d-controls-block {
            align-items: flex-start !important;
            width: 100% !important;
            flex-direction: row !important;
            justify-content: space-between !important;
          }
          .hero-3d-specs-strip {
            gap: 0.75rem !important;
            padding: 0.625rem 1rem !important;
          }
        }
        @media (max-width: 600px) {
          .hero-3d-headline {
            font-size: 1.85rem !important;
          }
          .hero-3d-desc {
            font-size: 0.875rem !important;
            margin-bottom: 1.25rem !important;
          }
          .hero-3d-specs-strip {
            display: grid !important;
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 0.5rem !important;
            width: 100% !important;
          }
          .hero-3d-status-pill {
            font-size: 0.6875rem !important;
            padding: 0.5rem 1rem !important;
          }
          .hero-3d-scrubber-box {
            display: none !important;
          }
        }
      `}</style>

      {/* Big Full-Size 3D Canvas Background */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 1,
          filter: 'contrast(1.04) brightness(0.96)',
        }}
      />

      {/* Loading Indicator */}
      {!isLoaded && (
        <div
          style={{
            position: 'absolute',
            top: '2rem',
            right: '2rem',
            zIndex: 30,
            background: 'rgba(8,12,20,0.85)',
            border: '1px solid rgba(255,255,255,0.15)',
            backdropFilter: 'blur(12px)',
            padding: '0.625rem 1.25rem',
            borderRadius: '9999px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            fontSize: '0.75rem',
            fontWeight: 700,
            color: '#fff',
          }}
        >
          <Sparkles className="animate-spin" size={14} color="#60A5FA" />
          <span>BUFFERING 3D VIDEO {loadPercentage}%</span>
        </div>
      )}

      {/* Responsive Content Container */}
      <div
        className="hero-3d-content-wrap"
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '1380px',
          width: '100%',
          marginInline: 'auto',
          paddingInline: 'clamp(1rem, 4vw, 4rem)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {/* LEFT WRITINGS - Direct Floating Text without surrounding box */}
        <div className="hero-3d-writings-block" style={{ maxWidth: '580px' }}>
          {/* Story Stage Dots */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            {storyStages.map((stg, i) => (
              <div
                key={stg.id}
                style={{
                  height: '4px',
                  width: activeStage === i ? '32px' : '10px',
                  borderRadius: '2px',
                  background: activeStage === i ? currentStageData.highlightColor : 'rgba(255,255,255,0.25)',
                  transition: 'all 0.4s ease',
                }}
              />
            ))}
            <span style={{ marginLeft: '0.5rem', fontSize: '0.6875rem', fontWeight: 800, color: '#94A3B8', letterSpacing: '0.08em' }}>
              STAGE 0{activeStage + 1} / 03
            </span>
          </div>

          {/* Glowing Badge Pill */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.4rem 1rem',
              borderRadius: '9999px',
              background: currentStageData.badgeBg,
              border: `1px solid ${currentStageData.badgeBorder}`,
              color: currentStageData.badgeColor,
              fontSize: '0.75rem',
              fontWeight: 900,
              letterSpacing: '0.08em',
              marginBottom: '1.25rem',
              backdropFilter: 'blur(10px)',
            }}
          >
            <Sparkles size={13} />
            {currentStageData.badge}
          </div>

          {/* Headline with Clean Formatting */}
          <h1
            className="hero-3d-headline"
            style={{
              fontSize: 'clamp(2.25rem, 4.5vw, 3.65rem)',
              fontWeight: 900,
              lineHeight: 1.1,
              color: '#FFFFFF',
              letterSpacing: '-0.02em',
              marginBottom: '1.25rem',
              textShadow: '0 4px 25px rgba(0, 0, 0, 0.9)',
            }}
          >
            <span style={{ color: currentStageData.highlightColor, display: 'block' }}>
              {currentStageData.titleLine1}
            </span>
            <span style={{ color: '#FFFFFF' }}>
              {currentStageData.titleLine2}
            </span>
          </h1>

          {/* Description */}
          <p
            className="hero-3d-desc"
            style={{
              fontSize: '1.0625rem',
              color: '#E2E8F0',
              lineHeight: 1.65,
              marginBottom: '2rem',
              fontWeight: 400,
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.9)',
            }}
          >
            {currentStageData.description}
          </p>

          {/* Specs Pills Strip */}
          <div
            className="hero-3d-specs-strip"
            style={{
              display: 'inline-flex',
              gap: '1.5rem',
              padding: '0.875rem 1.5rem',
              background: 'rgba(8, 12, 20, 0.65)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              backdropFilter: 'blur(12px)',
              borderRadius: '16px',
              marginBottom: '2rem',
            }}
          >
            {currentStageData.specs.map((sp, idx) => (
              <div key={idx}>
                <div style={{ fontSize: '0.625rem', color: '#94A3B8', fontWeight: 700, textTransform: 'uppercase' }}>
                  {sp.label}
                </div>
                <div style={{ fontSize: '0.9375rem', fontWeight: 900, color: '#F8FAFC', marginTop: '2px' }}>
                  {sp.val}
                </div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', gap: '0.875rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <Link
              to={currentStageData.primaryBtnLink}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.625rem',
                padding: '0.875rem 1.85rem',
                borderRadius: '9999px',
                background: `linear-gradient(135deg, ${currentStageData.highlightColor} 0%, #1D4ED8 100%)`,
                color: '#FFFFFF',
                fontWeight: 800,
                fontSize: '0.8125rem',
                letterSpacing: '0.04em',
                textDecoration: 'none',
                boxShadow: `0 8px 30px ${currentStageData.badgeBg}`,
                transition: 'all 0.3s ease',
              }}
            >
              <span>{currentStageData.primaryBtnText}</span>
              <ArrowRight size={16} />
            </Link>

            <button
              onClick={() => addItem({ id: currentStageData.id, name: currentStageData.badge, type: '3D ARCHITECTURE' })}
              style={{
                padding: '0.875rem 1.25rem',
                borderRadius: '9999px',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                background: 'rgba(8, 12, 20, 0.65)',
                backdropFilter: 'blur(10px)',
                color: '#FFFFFF',
                fontSize: '0.8125rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.375rem',
                transition: 'all 0.3s ease',
              }}
            >
              <Box size={15} color={currentStageData.highlightColor} />
              <span>SAMPLE</span>
            </button>
          </div>
        </div>

        {/* RIGHT FLOATING SCRUBBER & STATUS INDICATORS */}
        <div className="hero-3d-controls-block" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '1rem' }}>
          {/* Scroll Lock / Unlock Message Indicator */}
          <div
            className="hero-3d-status-pill"
            style={{
              background: 'rgba(8, 12, 20, 0.75)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(16px)',
              padding: '0.875rem 1.5rem',
              borderRadius: '9999px',
              display: 'flex',
              alignItems: 'center',
              gap: '0.875rem',
              boxShadow: '0 15px 35px rgba(0,0,0,0.4)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', fontWeight: 800, color: isCompleted ? '#34D399' : '#60A5FA' }}>
              <ChevronDown size={18} className={isCompleted ? '' : 'animate-pulse'} />
              <span>
                {isCompleted
                  ? '3D ANIMATION COMPLETE — WEBSITE UNLOCKED 🔓'
                  : 'SWIPE / SCROLL TO PLAY 3D ANIMATION (PINNED 🔒)'}
              </span>
            </div>
            <div style={{ width: '1px', height: '18px', background: 'rgba(255,255,255,0.2)' }} />
            <button
              onClick={toggleAutoRotate}
              style={{
                background: 'transparent',
                border: 'none',
                color: autoRotate ? '#34D399' : '#60A5FA',
                cursor: 'pointer',
                fontWeight: 800,
                fontSize: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.375rem',
              }}
            >
              {autoRotate ? <Pause size={14} /> : <Play size={14} />}
              <span>{autoRotate ? 'PAUSE' : 'AUTO-PLAY'}</span>
            </button>
          </div>

          {/* Frame Scrubber Bar */}
          <div
            className="hero-3d-scrubber-box"
            style={{
              background: 'rgba(8, 12, 20, 0.75)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(16px)',
              padding: '0.75rem 1.25rem',
              borderRadius: '16px',
              minWidth: '220px',
              boxShadow: '0 15px 35px rgba(0,0,0,0.4)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.6875rem', fontWeight: 800, color: '#94A3B8', marginBottom: '0.375rem' }}>
              <span>3D FRAME</span>
              <span style={{ color: '#60A5FA' }}>{currentFrameDisplay} / {TOTAL_FRAMES}</span>
            </div>
            <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.15)', borderRadius: '2px', overflow: 'hidden' }}>
              <div
                style={{
                  width: `${(currentFrameDisplay / TOTAL_FRAMES) * 100}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #3B82F6 0%, #F59E0B 50%, #34D399 100%)',
                  transition: 'width 0.1s linear',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

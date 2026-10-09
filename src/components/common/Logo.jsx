import React from 'react';
import { Link } from 'react-router-dom';

export default function Logo({ variant = 'dark', size = 'medium', className = '', onClick }) {
  // Height map for responsive rendering
  const heightMap = {
    small: '36px',
    medium: '48px',
    large: '60px'
  };

  const logoHeight = heightMap[size] || heightMap.medium;

  // Choose appropriate logo image for background variant
  let logoSrc = '/logo-white-text.png';
  if (variant === 'light') {
    logoSrc = '/logo-transparent.png';
  } else if (variant === 'badge') {
    logoSrc = '/logo.png';
  }

  const isBadge = variant === 'badge';

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .trivandrum-brand-logo-img {
            height: 36px !important;
            max-height: 36px !important;
          }
        }
        @media (max-width: 480px) {
          .trivandrum-brand-logo-img {
            height: 30px !important;
            max-height: 30px !important;
          }
        }
      `}</style>
      <Link 
        to="/" 
        className={`trivandrum-brand-logo ${variant} ${className}`}
        onClick={onClick}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          textDecoration: 'none',
          transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          ...(isBadge ? {
            background: '#FFFFFF',
            padding: '4px 10px',
            borderRadius: '8px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
          } : {})
        }}
        title="TRIVANDRUM GLASS & PLYWOOD"
      >
        <img
          src={logoSrc}
          alt="TRIVANDRUM GLASS & PLYWOOD Logo"
          className="trivandrum-brand-logo-img"
          style={{
            height: logoHeight,
            width: 'auto',
            maxHeight: '100%',
            objectFit: 'contain',
            display: 'block'
          }}
        />
      </Link>
    </>
  );
}


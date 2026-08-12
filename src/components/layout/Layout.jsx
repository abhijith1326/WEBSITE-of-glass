import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import CommandPalette from '../common/CommandPalette';
import SampleCartDrawer from '../common/SampleCartDrawer';
import BackToTop from '../common/BackToTop';

export default function Layout({ children }) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main style={{ flex: 1 }}>{children}</main>
      <Footer />
      <CommandPalette />
      <SampleCartDrawer />
      <BackToTop />
    </div>
  );
}

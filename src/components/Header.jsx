import React, { useState, useEffect } from 'react';
import { Droplets, Menu, X } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`glass ${isScrolled ? 'scrolled' : ''}`} style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      transition: 'all 0.3s ease',
      padding: isScrolled ? '1rem 0' : '1.5rem 0',
      borderBottom: isScrolled ? '1px solid var(--border)' : 'none'
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)' }}>
          <Droplets size={28} />
          <span style={{ fontSize: '1.25rem', fontWeight: '700', letterSpacing: '-0.025em' }}>AWD System</span>
        </div>
        
        <nav style={{ display: 'flex', gap: '2rem' }} className="desktop-nav">
          <a href="#about" style={{ fontWeight: '500', transition: 'color 0.2s' }}>About</a>
          <a href="#how-it-works" style={{ fontWeight: '500', transition: 'color 0.2s' }}>How it Works</a>
          <a href="#hardware" style={{ fontWeight: '500', transition: 'color 0.2s' }}>Hardware</a>
          <a href="#performance" style={{ fontWeight: '500', transition: 'color 0.2s' }}>Performance</a>
        </nav>

        <div className="mobile-menu-btn" style={{ display: 'none' }}>
           <Menu size={24} />
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; cursor: pointer; }
        }
        nav a:hover { color: var(--primary); }
      `}} />
    </header>
  );
};

export default Header;

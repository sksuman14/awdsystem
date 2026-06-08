import React from 'react';
import { ArrowRight, Leaf } from 'lucide-react';

const HeroSection = () => {
  return (
    <section style={{
      padding: '12rem 0 8rem 0',
      background: 'linear-gradient(135deg, var(--background) 0%, rgba(var(--primary-light), 0.1) 100%)',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative background blobs */}
      <div style={{
        position: 'absolute', top: '-10%', right: '-5%', width: '400px', height: '400px',
        background: 'var(--primary-light)', filter: 'blur(100px)', opacity: '0.15', borderRadius: '50%', zIndex: 0
      }} />
      <div style={{
        position: 'absolute', bottom: '-10%', left: '-5%', width: '300px', height: '300px',
        background: 'var(--secondary)', filter: 'blur(80px)', opacity: '0.1', borderRadius: '50%', zIndex: 0
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }} className="animate-fade-in">
          <span className="badge" style={{ marginBottom: '1.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            <Leaf size={14} /> Developed by IIT Ropar iHub-AWaDH
          </span>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', letterSpacing: '-0.025em', marginBottom: '1.5rem', color: 'var(--text-main)' }}>
            Automated <span style={{ color: 'var(--primary)' }}>Alternate Wetting and Drying</span> (AWD) System
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', marginBottom: '2.5rem', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
            Smart Irrigation for Sustainable Rice Cultivation. Reduce water consumption without compromising crop yield using low-power sensing and autonomous valve control.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#about" className="btn btn-primary">
              Discover the System <ArrowRight size={18} />
            </a>
            <a href="#performance" className="btn btn-secondary">
              View Performance
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

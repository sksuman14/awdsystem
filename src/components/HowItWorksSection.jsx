import React from 'react';

const HowItWorksSection = () => {
  const steps = [
    { num: '01', title: 'Monitoring Water Levels', desc: 'A perforated PVC field water tube is installed in the rice field to monitor subsurface water conditions.' },
    { num: '02', title: 'Detecting Critical Thresholds', desc: 'Two magnetic float switches track water. Lower Float (-15 cm) initiates irrigation. Upper Float (+5 cm) stops irrigation.' },
    { num: '03', title: 'Wireless Communication', desc: 'BLE-enabled sensor nodes transmit field data through relay nodes to a central gateway.' },
    { num: '04', title: 'Automated Valve Control', desc: 'Latching solenoid valves regulate irrigation automatically based on real-time field conditions.' },
  ];

  return (
    <section id="how-it-works" className="section" style={{ backgroundColor: 'var(--surface)' }}>
      <div className="container">
        <h2 style={{ textAlign: 'center', marginBottom: '4rem' }}>How the System Works</h2>
        
        <div className="grid grid-cols-4">
          {steps.map((step, index) => (
            <div key={index} style={{ position: 'relative', padding: '2rem', border: '1px solid var(--border)', borderRadius: 'var(--radius)', backgroundColor: 'var(--background)' }}>
              <div style={{ 
                position: 'absolute', top: '-20px', left: '2rem', fontSize: '2.5rem', fontWeight: '800', 
                color: 'var(--primary-light)', opacity: '0.2', lineHeight: '1' 
              }}>
                {step.num}
              </div>
              <h4 style={{ marginTop: '1rem', marginBottom: '1rem', position: 'relative', zIndex: 1 }}>{step.title}</h4>
              <p style={{ fontSize: '0.95rem', margin: 0, position: 'relative', zIndex: 1 }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;

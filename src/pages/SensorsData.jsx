import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Brush } from 'recharts';
import { motion } from 'framer-motion';

const SensorsData = () => {
  const [deviceId, setDeviceId] = useState('AWD-01');
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [startDate, setStartDate] = useState('2024-07-01');
  const [endDate, setEndDate] = useState('2025-02-28');

  const devices = Array.from({ length: 10 }, (_, i) => `AWD-${String(i + 1).padStart(2, '0')}`);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!startDate || !endDate) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const url = `https://xmzgqucw68.execute-api.us-east-1.amazonaws.com/default/getAwdHistoricalData?deviceId=${deviceId}&startDate=${startDate}&endDate=${endDate}`;
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.records && data.records.length > 0) {
          const formattedData = data.records.map(record => ({
            date: record.timestamp,
            waterLevel: record.water_level,
            soilMoisture: record.soil_moisture
          }));
          setChartData(formattedData);
        } else {
          setChartData([]);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch historical data. Please check your network connection.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [deviceId, startDate, endDate]);

  const formatAxisDate = (tick) => {
    const dt = new Date(tick);
    if (isNaN(dt)) return tick; // fallback
    const mm = String(dt.getMonth() + 1).padStart(2, '0');
    const dd = String(dt.getDate()).padStart(2, '0');
    
    let hours = dt.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    
    const hh = String(hours).padStart(2, '0');
    const min = String(dt.getMinutes()).padStart(2, '0');
    
    // If it's midnight, maybe just show date, else show time too
    if (dt.getHours() === 0 && dt.getMinutes() === 0) {
      return `${mm}-${dd} 12:00 AM`;
    }
    return `${mm}-${dd} ${hh}:${min} ${ampm}`;
  };

  return (
    <div style={{ paddingTop: '100px', backgroundColor: 'var(--background)', minHeight: '100vh' }}>
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <span className="badge">Live Telemetry</span>
            <h2>Sensors Data Dashboard</h2>
            <p style={{ maxWidth: '700px', margin: '0 auto', marginBottom: '2rem' }}>
              Select any of the deployed AWD devices and specify a date range to monitor high-frequency historical water levels and soil moisture.
            </p>
            
            {/* Controls Row */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              flexWrap: 'wrap',
              gap: '1.5rem', 
              marginBottom: '2rem',
              backgroundColor: 'var(--card-bg)',
              padding: '1.5rem',
              borderRadius: '12px',
              border: '1px solid var(--border)',
              maxWidth: '800px',
              margin: '0 auto 2rem auto',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}>
              
              {/* Device Selector */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <label htmlFor="device-select" style={{ fontWeight: '600', color: 'var(--text-color)' }}>Device:</label>
                <select 
                  id="device-select"
                  value={deviceId} 
                  onChange={(e) => setDeviceId(e.target.value)}
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                    border: '1px solid var(--border)',
                    backgroundColor: 'var(--background)',
                    color: 'var(--text-color)',
                    fontSize: '1rem',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                >
                  {devices.map(dev => (
                    <option key={dev} value={dev}>{dev}</option>
                  ))}
                </select>
              </div>

              {/* Start Date */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <label htmlFor="start-date" style={{ fontWeight: '600', color: 'var(--text-color)' }}>Start Date:</label>
                <input 
                  type="date" 
                  id="start-date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  style={{
                    padding: '0.5rem',
                    borderRadius: '8px',
                    border: '1px solid var(--border)',
                    backgroundColor: 'var(--background)',
                    color: 'var(--text-color)',
                    fontSize: '1rem',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                />
              </div>

              {/* End Date */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <label htmlFor="end-date" style={{ fontWeight: '600', color: 'var(--text-color)' }}>End Date:</label>
                <input 
                  type="date" 
                  id="end-date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  style={{
                    padding: '0.5rem',
                    borderRadius: '8px',
                    border: '1px solid var(--border)',
                    backgroundColor: 'var(--background)',
                    color: 'var(--text-color)',
                    fontSize: '1rem',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                />
              </div>

            </div>
          </div>
        </motion.div>

        <div style={{ maxWidth: '900px', margin: '0 auto', paddingBottom: '4rem' }}>
          
          {loading && (
             <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--primary)' }}>
               {/* Removed AWS text as requested */}
               <p>Fetching high-frequency telemetry data...</p>
             </div>
          )}

          {error && (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#ef4444' }}>
              <p>{error}</p>
            </div>
          )}

          {!loading && !error && chartData.length === 0 && (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)', backgroundColor: 'var(--card-bg)', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <p>No records found for <strong>{deviceId}</strong> between <strong>{startDate}</strong> and <strong>{endDate}</strong>.</p>
            </div>
          )}

          {!loading && !error && chartData.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
              
              <motion.div 
                className="card"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h4 style={{ marginBottom: '1.5rem', color: 'var(--primary)', textAlign: 'center' }}>Water Level vs. Time</h4>
                <div style={{ width: '100%', height: 350 }}>
                  <ResponsiveContainer>
                    <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.1)" />
                      <XAxis 
                        dataKey="date" 
                        tick={{fontSize: 12}}
                        tickFormatter={formatAxisDate} 
                        label={{ value: 'Time', position: 'insideBottom', offset: -15 }} 
                      />
                      <YAxis label={{ value: 'Water Level (cm)', angle: -90, position: 'insideLeft' }} domain={[0, 12]} />
                      <Tooltip labelFormatter={formatAxisDate} />
                      <ReferenceLine y={8} stroke="var(--primary)" strokeDasharray="3 3" label="Flood Baseline" />
                      <ReferenceLine y={3} stroke="#ef4444" strokeDasharray="3 3" label="Irrigation Needed" />
                      <Line type="monotone" dataKey="waterLevel" stroke="var(--primary)" strokeWidth={2} dot={false} activeDot={{ r: 6 }} />
                      <Brush dataKey="date" height={30} stroke="var(--primary)" tickFormatter={formatAxisDate} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>

              <motion.div 
                className="card"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h4 style={{ marginBottom: '1.5rem', color: '#10b981', textAlign: 'center' }}>Soil Moisture vs. Time</h4>
                <div style={{ width: '100%', height: 350 }}>
                  <ResponsiveContainer>
                    <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.1)" />
                      <XAxis 
                        dataKey="date" 
                        tick={{fontSize: 12}}
                        tickFormatter={formatAxisDate} 
                        label={{ value: 'Time', position: 'insideBottom', offset: -15 }} 
                      />
                      <YAxis label={{ value: 'Soil Moisture (%)', angle: -90, position: 'insideLeft' }} domain={[0, 80]} />
                      <Tooltip labelFormatter={formatAxisDate} />
                      <ReferenceLine y={25} stroke="#ef4444" strokeDasharray="3 3" label="Critical Dry Threshold" />
                      <Line type="monotone" dataKey="soilMoisture" stroke="#10b981" strokeWidth={2} dot={false} activeDot={{ r: 6 }} />
                      <Brush dataKey="date" height={30} stroke="#10b981" tickFormatter={formatAxisDate} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>
              
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SensorsData;

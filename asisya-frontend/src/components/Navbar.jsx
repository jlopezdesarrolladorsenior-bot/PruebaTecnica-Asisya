import React from 'react';

const Navbar = ({ totalProducts }) => {
  return (
    <header style={styles.header}>
      <div style={styles.navContent}>
        <div style={styles.brand}>
          <h2 style={styles.logo}>ASISYA</h2>
          <span style={styles.divider}>|</span>
          <span style={styles.subtitle}>Control de Inventarios</span>
        </div>
        
        <div style={styles.metrics}>
          <div style={styles.metricItem}>
            <span style={styles.metricLabel}>Registros en Base de Datos:</span>
            <span style={styles.metricValue}>{totalProducts.toLocaleString()}</span>
          </div>
          <button style={styles.logoutBtn}>Cerrar Sesión</button>
        </div>
      </div>
    </header>
  );
};

const styles = {
  header: {
    backgroundColor: '#1a1a1a',
    color: '#ffffff',
    padding: '0.8rem 2rem',
    borderBottom: '3px solid #007bff',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
  },
  navContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1400px',
    margin: '0 auto'
  },
  brand: { display: 'flex', alignItems: 'center', gap: '12px' },
  logo: { margin: 0, fontSize: '1.6rem', fontWeight: '800', letterSpacing: '1px' },
  divider: { color: '#444', fontSize: '1.5rem' },
  subtitle: { color: '#aaa', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' },
  metrics: { display: 'flex', alignItems: 'center', gap: '25px' },
  metricItem: { textAlign: 'right' },
  metricLabel: { display: 'block', fontSize: '0.7rem', color: '#888', textTransform: 'uppercase' },
  metricValue: { fontSize: '1.1rem', fontWeight: '600', color: '#007bff' },
  logoutBtn: {
    backgroundColor: 'transparent',
    color: '#ff4d4d',
    border: '1px solid #ff4d4d',
    padding: '6px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.85rem',
    transition: 'all 0.3s'
  }
};

export default Navbar;
export function Footer() {
  return (
    <footer style={{
      padding: '40px 20px',
      borderTop: '1px solid rgba(255,255,255,0.1)',
      textAlign: 'center',
      opacity: 0.6,
      fontSize: '0.85rem'
    }}>
      <p>© 2025-2026 BlueSphere Consciousness. Sistema en desarrollo continuo.</p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginTop: '16px' }}>
        <a href="#" style={{ opacity: 0.7, textDecoration: 'none', color: 'inherit' }}>Privacidad</a>
        <a href="#" style={{ opacity: 0.7, textDecoration: 'none', color: 'inherit' }}>Términos</a>
        <a href="#" style={{ opacity: 0.7, textDecoration: 'none', color: 'inherit' }}>Contacto</a>
      </div>
    </footer>
  )
}
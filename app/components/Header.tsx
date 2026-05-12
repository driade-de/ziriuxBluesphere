export default function Header() {
  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      width: '100%',
      padding: '20px 40px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      background: 'linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)',
      zIndex: 1000,
      backdropFilter: 'blur(10px)'
    }}>
      <div style={{ 
        fontSize: '1.5rem', 
        fontWeight: 300, 
        letterSpacing: '6px',
        color: '#ffffff'
      }}>
        ZIRIUX
      </div>
      
      <div style={{ display: 'flex', gap: '40px', fontSize: '0.9rem' }}>
        {['Membresía', 'Empresas', 'Camino', 'Contacto'].map((item) => (
          <a 
            key={item} 
            href={`#${item.toLowerCase()}`} 
            style={{ 
              opacity: 0.9, 
              transition: 'opacity 0.2s',
              textDecoration: 'none',
              color: 'inherit',
              letterSpacing: '1px'
            }}
          >
            {item}
          </a>
        ))}
      </div>
    </nav>
  )
}
  
'use client'

export function ProtocolSection() {
  return (
    <section style={{
      padding: '80px 20px',
      background: 'radial-gradient(ellipse at 50% 20%, rgba(59,130,246,0.08), transparent)'
    }}>
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        background: 'rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(12px)',
        borderRadius: '32px',
        padding: '48px 32px',
        border: '1px solid rgba(100, 200, 255, 0.2)',
        textAlign: 'center'
      }}>
        <h2 style={{
          fontSize: '2.2rem',
          fontWeight: 300,
          letterSpacing: '4px',
          marginBottom: '16px',
          background: 'linear-gradient(135deg, #fff, #88ddff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          BlueSphere Consciousness
        </h2>
        <p style={{ fontSize: '1.2rem', fontStyle: 'italic', opacity: 0.8, marginBottom: '40px' }}>
          La conciencia es la nueva civilización.
        </p>
        <p style={{ fontSize: '1rem', lineHeight: '1.6', opacity: 0.8, maxWidth: '700px', margin: '0 auto 40px auto' }}>
          BlueSphere es un sistema vivo de participación consciente donde la comprensión del estado del planeta se transforma en acción colectiva.
          Integra conocimiento científico, responsabilidad ética y cooperación humana para generar impacto real en la estabilidad del sistema Tierra.
        </p>
        <div style={{
          background: 'rgba(100, 200, 255, 0.05)',
          borderRadius: '24px',
          padding: '32px',
          marginTop: '20px',
          border: '1px solid rgba(100, 200, 255, 0.2)'
        }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 500, letterSpacing: '2px', marginBottom: '16px', color: '#88ddff' }}>
            Protocolo de Homeostasis Planetaria
          </h3>
          <p style={{ fontSize: '0.95rem', lineHeight: '1.6', opacity: 0.8, maxWidth: '600px', margin: '0 auto 32px auto' }}>
            La homeostasis describe la capacidad del sistema Tierra de mantener equilibrio entre sus procesos físicos, químicos y biológicos.
          </p>
          <button
            onClick={() => alert('Próximamente: Los Puentes de Conciencia')}
            style={{
              padding: '12px 32px',
              borderRadius: '40px',
              border: '2px solid #3b82f6',
              background: 'transparent',
              color: '#3b82f6',
              fontSize: '0.9rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.3s ease',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#3b82f6';
              e.currentTarget.style.color = '#ffffff';
              e.currentTarget.style.transform = 'scale(1.02)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#3b82f6';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            → CONOCER LOS PUENTES
          </button>
        </div>
      </div>
    </section>
  )
}
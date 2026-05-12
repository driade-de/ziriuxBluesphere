'use client'

export function CorporateSection() {
  return (
    <section style={{
      padding: '80px 20px',
      background: 'radial-gradient(ellipse at 50% 20%, rgba(59,130,246,0.08), transparent)'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        background: 'rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(12px)',
        borderRadius: '32px',
        padding: '48px 32px',
        border: '1px solid rgba(100, 200, 255, 0.2)'
      }}>
        
        <h2 style={{
          fontSize: '2rem',
          fontWeight: 500,
          letterSpacing: '2px',
          textAlign: 'center',
          marginBottom: '24px',
          color: '#88ddff'
        }}>
          Membresía Empresarial: Tu Empresa como Guardiana
        </h2>
        
        <p style={{
          fontSize: '1.1rem',
          lineHeight: '1.5',
          textAlign: 'center',
          maxWidth: '800px',
          margin: '0 auto 48px auto',
          opacity: 0.9
        }}>
          No solo aportas. <strong>Dejas huella en la nueva civilización.</strong><br />
          Transforma la responsabilidad social corporativa (RSE) en impacto medible, comunidad consciente y narrativa auténtica.
        </p>

        {/* Cuatro tarjetas */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '32px',
          marginBottom: '64px'
        }}>
          {[
            { icon: '📊', title: 'Impacto Medible', desc: 'Dashboard con métricas reales de tu huella positiva.' },
            { icon: '📢', title: 'Marketing Auténtico', desc: 'Certificación BlueSphere para empaques, web y RRSS. Acceso a contenido exclusivo.' },
            { icon: '🤝', title: 'Comunidad Consciente', desc: 'Red B2B con valores compartidos, colaboraciones estratégicas y encuentros selectos.' },
            { icon: '💙', title: 'Fidelización con Propósito', desc: 'Convierte clientes y colaboradores en Guardianes. Fortalece cultura corporativa consciente.' }
          ].map((item, idx) => (
            <div key={idx} style={{
              background: 'rgba(100,200,255,0.05)',
              borderRadius: '24px',
              padding: '28px 20px',
              border: '1px solid rgba(100,200,255,0.2)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2.8rem', marginBottom: '16px' }}>{item.icon}</div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 600, marginBottom: '12px', color: '#88ddff' }}>{item.title}</h3>
              <p style={{ fontSize: '0.85rem', opacity: 0.75, lineHeight: '1.5' }}>{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Portal de Acceso */}
        <div style={{
          background: 'rgba(0,0,0,0.6)',
          borderRadius: '24px',
          padding: '32px',
          border: '1px solid rgba(34, 197, 94, 0.4)',
          textAlign: 'center'
        }}>
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: 600,
            letterSpacing: '2px',
            marginBottom: '16px',
            color: '#22c55e'
          }}>
            PORTAL DE ACCESO GUARDIANES CORP
          </h3>
          <p style={{ fontSize: '1rem', opacity: 0.8, marginBottom: '8px' }}>
            Proceso simple: Membresía única → Códigos personalizados → Dashboard de impacto
          </p>
          <button
            onClick={() => alert('Portal corporativo en construcción. Próximamente.')}
            style={{
              marginTop: '24px',
              padding: '12px 32px',
              borderRadius: '40px',
              border: '2px solid #22c55e',
              background: 'transparent',
              color: '#22c55e',
              fontSize: '0.9rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#22c55e';
              e.currentTarget.style.color = '#000';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#22c55e';
            }}
          >
            Acceder al Portal Corporativo
          </button>
        </div>
      </div>
    </section>
  )
}
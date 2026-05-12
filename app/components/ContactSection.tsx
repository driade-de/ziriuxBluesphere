'use client'

export function ContactSection() {
  return (
    <section style={{
      padding: '80px 20px',
      background: 'radial-gradient(ellipse at 50% 20%, rgba(59,130,246,0.08), transparent)'
    }}>
      <div style={{
        maxWidth: '1000px',
        margin: '0 auto',
        background: 'rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(12px)',
        borderRadius: '32px',
        padding: '48px 32px',
        border: '1px solid rgba(100, 200, 255, 0.2)',
        textAlign: 'center'
      }}>
        <h2 style={{
          fontSize: '1.8rem',
          fontWeight: 500,
          letterSpacing: '2px',
          marginBottom: '24px',
          color: '#88ddff'
        }}>
          Conexión con BlueSphere
        </h2>
        <p style={{ fontSize: '1rem', opacity: 0.8, marginBottom: '32px' }}>
          Para <strong>colaboraciones</strong>, preguntas sobre la <strong>comunidad</strong>, o si sientes el llamado a <strong>unirte al movimiento</strong>.
        </p>

        <div style={{ marginBottom: '32px' }}>
          <p style={{ marginBottom: '8px' }}>
            📧 Escríbenos directamente a:<br />
            <a href="mailto:comunidad@bluesphereconsciousness.org" style={{ color: '#88ddff', textDecoration: 'underline' }}>
              comunidad@bluesphereconsciousness.org
            </a>
          </p>
          <p style={{ fontSize: '0.9rem', opacity: 0.7, marginTop: '16px' }}>
            ⏱️ <strong>Respuesta en 24-48 horas</strong><br />
            🔑 <strong>Incluye tu código de Guardián para atención prioritaria</strong>
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '24px',
          marginTop: '16px'
        }}>
          {[
            { icon: '🤝', title: 'Colaboraciones', desc: 'Empresas, organizaciones, alianzas estratégicas, patrocinios.' },
            { icon: '👥', title: 'Comunidad', desc: 'Preguntas, eventos, participación activa, grupos locales.' },
            { icon: '🔧', title: 'Soporte', desc: 'Problemas con código, acceso, certificados, dashboard.' }
          ].map((item, idx) => (
            <div key={idx} style={{
              background: 'rgba(0,0,0,0.4)',
              borderRadius: '20px',
              padding: '24px 16px',
              border: '1px solid rgba(100,200,255,0.2)'
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>{item.icon}</div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '8px', color: '#88ddff' }}>{item.title}</h3>
              <p style={{ fontSize: '0.8rem', opacity: 0.7 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
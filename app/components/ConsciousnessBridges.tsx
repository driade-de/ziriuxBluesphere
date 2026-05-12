'use client'

export function ConsciousnessBridges() {
  return (
    <section style={{
      padding: '80px 20px',
      background: 'linear-gradient(135deg, rgba(0, 20, 30, 0.8), rgba(0, 0, 0, 0.95))',
      borderTop: '1px solid rgba(59,130,246,0.3)',
      borderBottom: '1px solid rgba(59,130,246,0.3)'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Título principal */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{
            fontSize: '2.2rem',
            fontWeight: 300,
            letterSpacing: '4px',
            marginBottom: '16px',
            background: 'linear-gradient(135deg, #ffffff, #60a5fa)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent'
          }}>
            Construyamos juntos los Puentes de Conciencia
          </h2>
          <p style={{ maxWidth: '700px', margin: '0 auto', opacity: 0.7, lineHeight: '1.6' }}>
            Tu Membresía sostiene el ecosistema BlueSphere. Tu participación voluntaria —periódica o única— 
            habilita la operación ética, legal y sostenible del sistema en el mundo físico.
          </p>
        </div>

        {/* Los 4 pilares */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '24px',
          marginBottom: '60px'
        }}>
          {[
            { icon: '✍️', title: 'El editor', desc: 'Claridad, coherencia y belleza al mensaje.' },
            { icon: '🌐', title: 'El traductor', desc: 'Rompe barreras entre culturas y lenguajes.' },
            { icon: '⚖️', title: 'Asesor Legal', desc: 'Abre y resguarda caminos internacionales.' },
            { icon: '💻', title: 'Infraestructura digital', desc: 'Conocimiento a cualquier persona, en cualquier lugar del planeta.' }
          ].map((item) => (
            <div key={item.title} style={{
              background: 'rgba(0,0,0,0.5)',
              backdropFilter: 'blur(8px)',
              borderRadius: '20px',
              padding: '24px',
              border: '1px solid rgba(59,130,246,0.2)',
              textAlign: 'center',
              transition: 'transform 0.2s'
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>{item.icon}</div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 500, marginBottom: '8px', color: '#60a5fa' }}>{item.title}</h3>
              <p style={{ fontSize: '0.85rem', opacity: 0.7 }}>{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Libros gratuitos + compromiso */}
        <div style={{
          textAlign: 'center',
          marginBottom: '60px',
          padding: '32px',
          background: 'rgba(59,130,246,0.05)',
          borderRadius: '32px',
          border: '1px solid rgba(59,130,246,0.2)'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '8px' }}>📚</div>
          <p style={{ fontSize: '1.1rem', fontWeight: 500, marginBottom: '8px' }}>
            Los libros son un regalo gratuito para la humanidad.
          </p>
          <p style={{ opacity: 0.7, maxWidth: '600px', margin: '0 auto' }}>
            Tu membresía garantiza que este conocimiento permanezca abierto, accesible y libre.
          </p>
        </div>

        {/* Impacto posible (dos columnas) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '40px',
          marginBottom: '60px'
        }}>
          {/* Columna izquierda: texto intro */}
          <div>
            <h3 style={{ fontSize: '1.8rem', fontWeight: 300, marginBottom: '20px', color: '#60a5fa' }}>
              Ver el impacto posible →
            </h3>
            <p style={{ opacity: 0.8, lineHeight: '1.6' }}>
              Estos puentes transforman la conciencia en acciones tangibles que regeneran el equilibrio entre humanidad y planeta.
            </p>
          </div>
          {/* Columna derecha: lista de hábitos regenerativos */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px'
          }}>
            {[
              '🌱 Hábitos regenerativos en ciudades y comunidades',
              '🌳 Acciones que restauran nuestros bosques',
              '💧 Decisiones que protegen y limpian el agua',
              '🧘 Personas que despiertan como guardianes conscientes',
              '♻️ Menos plástico, menos CO₂: conciencia en acción diaria'
            ].map((item) => (
              <div key={item} style={{
                background: 'rgba(255,255,255,0.03)',
                padding: '12px 16px',
                borderRadius: '40px',
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span>✅</span> {item}
              </div>
            ))}
          </div>
        </div>

        {/* Llamado final con botón */}
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <p style={{ maxWidth: '600px', margin: '0 auto 24px auto', opacity: 0.7, fontStyle: 'italic' }}>
            Esta es una participación consciente, voluntaria y no condicionada.  
            Si este llamado resuena contigo, puedes sostener la continuidad de esta misión viva.
          </p>
          <button
            onClick={() => alert('Simulador de homeostasis planetaria - próximamente')}
            style={{
              background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
              border: 'none',
              padding: '14px 40px',
              borderRadius: '40px',
              fontSize: '1rem',
              fontWeight: 600,
              color: '#fff',
              cursor: 'pointer',
              transition: 'transform 0.2s, box-shadow 0.2s',
              boxShadow: '0 4px 15px rgba(59,130,246,0.3)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(59,130,246,0.5)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(59,130,246,0.3)'
            }}
          >
            Activar el Protocolo de Homeostasis
          </button>
          <p style={{ fontSize: '0.7rem', opacity: 0.5, marginTop: '16px' }}>
            *Simulador interactivo de equilibrio planetario
          </p>
        </div>

      </div>
    </section>
  )
}
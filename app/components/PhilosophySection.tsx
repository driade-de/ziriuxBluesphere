export function PhilosophySection() {
  return (
    <section style={{
      padding: '100px 20px',
      textAlign: 'center',
      background: 'radial-gradient(ellipse at center, rgba(34,211,238,0.05) 0%, transparent 60%)'
    }}>
      <h2 style={{
        fontSize: '2.5rem',
        fontWeight: 300,
        letterSpacing: '4px',
        marginBottom: '20px',
        background: 'linear-gradient(90deg, #22d3ee, #3b82f6)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}>
        BlueSphere Consciousness
      </h2>
      
      <p style={{
        fontSize: '1.3rem',
        color: '#22d3ee',
        marginBottom: '40px',
        fontWeight: 500
      }}>
        La conciencia es la nueva civilización.
      </p>
      
      <div style={{ maxWidth: '700px', margin: '0 auto', lineHeight: '1.8', opacity: 0.8 }}>
        <p style={{ marginBottom: '20px' }}>
          BlueSphere es un sistema vivo de participación consciente donde la comprensión del estado del planeta se transforma en acción colectiva.
        </p>
        <p>
          Integra conocimiento científico, responsabilidad ética y cooperación humana para generar impacto real en la estabilidad del sistema Tierra.
        </p>
      </div>
    </section>
  )
}
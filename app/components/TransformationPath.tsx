'use client'

import { useState } from 'react'

export function TransformationPath() {
  const [guardianCode, setGuardianCode] = useState('')
  const [activePhase, setActivePhase] = useState<number | null>(null)
  const [codeValid, setCodeValid] = useState(false)

  const handleActivate = () => {
    if (!guardianCode.trim()) {
      alert('Por favor ingresa tu Código de Guardián')
      return
    }
    setCodeValid(true)
    alert('Código aceptado. ¡Comienza tu transformación!')
  }

  const phases = [
    {
      id: 1,
      title: 'Días 1-5',
      color: '#3b82f6',
      actions: [
        '🌱 Día 1: Registra tu huella de carbono personal.',
        '📖 Día 2: Lee el manifiesto BlueSphere.',
        '💧 Día 3: Reduce plástico de un solo uso.',
        '🚶 Día 4: Camina o usa bici en lugar de coche.',
        '🌳 Día 5: Planta un árbol (simbólico o real).'
      ]
    },
    {
      id: 2,
      title: 'Días 6-15',
      color: '#22c55e',
      actions: [
        '♻️ Día 6: Implementa reciclaje en casa/oficina.',
        '💡 Día 7: Cambia bombillas a LED.',
        '🚿 Día 8: Dúchate en menos de 5 minutos.',
        '🥗 Día 9: Reduce consumo de carne roja.',
        '📦 Día 10: Reutiliza envases.',
        '🔌 Día 11: Desconecta electrodomésticos en stand-by.',
        '📚 Día 12: Comparte el pacto azul con alguien.',
        '🗣️ Día 13: Habla sobre cambio climático en redes.',
        '🌊 Día 14: Limpia una playa o río.',
        '🌿 Día 15: Crea un huerto urbano.'
      ]
    },
    {
      id: 3,
      title: 'Días 16-30',
      color: '#f97316',
      actions: [
        '🏢 Día 16: Propón mejoras sostenibles en tu trabajo.',
        '🤝 Día 17: Únete a una comunidad local.',
        '📈 Día 18: Calcula tu huella hídrica.',
        '🚰 Día 19: Instala un filtro de agua.',
        '🌍 Día 20: Compensa tu CO₂ con donación.',
        '📢 Día 21: Organiza un evento de conciencia.',
        '📝 Día 22: Escribe a tus representantes políticos.',
        '🔋 Día 23: Cambia a energía renovable.',
        '🚗 Día 24: Comparte coche o usa transporte público.',
        '🛍️ Día 25: Compra local y de temporada.',
        '💚 Día 26: Acto de bondad ecológica (repara, dona).',
        '🌱 Día 27: Apadrina un árbol.',
        '🧘 Día 28: Medita sobre tu conexión con la Tierra.',
        '🌟 Día 29: Escribe tu compromiso de Guardián.',
        '🎉 Día 30: Celebra tu transformación e invita a otros.'
      ]
    }
  ]

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
          marginBottom: '16px',
          color: '#88ddff'
        }}>
          Camino de Transformación
        </h2>
        <p style={{
          fontSize: '1rem',
          textAlign: 'center',
          opacity: 0.8,
          marginBottom: '48px'
        }}>
          Un compromiso diario que convierte acciones conscientes en impacto real.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '32px',
          marginBottom: '48px'
        }}>
          {phases.map(phase => (
            <div
              key={phase.id}
              onClick={() => setActivePhase(activePhase === phase.id ? null : phase.id)}
              style={{
                background: 'rgba(0,0,0,0.6)',
                borderRadius: '24px',
                padding: '24px',
                border: `2px solid ${activePhase === phase.id ? phase.color : 'rgba(100,200,255,0.3)'}`,
                cursor: 'pointer',
                transition: 'all 0.2s',
                textAlign: 'center'
              }}
            >
              <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '8px', color: phase.color }}>
                {phase.title}
              </h3>
              <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>Rango de días</p>
              {activePhase === phase.id && (
                <div style={{
                  marginTop: '20px',
                  paddingTop: '20px',
                  borderTop: `1px solid ${phase.color}`,
                  textAlign: 'left',
                  fontSize: '0.85rem',
                  maxHeight: '300px',
                  overflowY: 'auto'
                }}>
                  {phase.actions.map((action, idx) => (
                    <p key={idx} style={{ marginBottom: '8px', opacity: 0.8 }}>{action}</p>
                  ))}
                </div>
              )}
              <div style={{ fontSize: '0.7rem', opacity: 0.5, marginTop: '16px' }}>
                {activePhase === phase.id ? '▲ Mostrar menos' : '▼ Haz clic para ver acciones'}
              </div>
            </div>
          ))}
        </div>

        <div style={{
          background: 'rgba(0,0,0,0.6)',
          borderRadius: '24px',
          padding: '32px',
          border: '1px solid rgba(34, 197, 94, 0.4)',
          textAlign: 'center'
        }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '16px', color: '#22c55e' }}>
            ACTIVAR EL CAMINO CONSCIENTE
          </h3>
          <p style={{ marginBottom: '24px', opacity: 0.8 }}>
            Acceso mediante tu <strong>Código de Guardián</strong>
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Ej: BS-1234-ABCD"
              value={guardianCode}
              onChange={(e) => setGuardianCode(e.target.value)}
              style={{
                padding: '12px 20px',
                borderRadius: '40px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(100,200,255,0.4)',
                color: '#fff',
                fontSize: '0.9rem',
                minWidth: '250px',
                outline: 'none'
              }}
            />
            <button
              onClick={handleActivate}
              style={{
                padding: '12px 28px',
                borderRadius: '40px',
                border: '2px solid #22c55e',
                background: 'transparent',
                color: '#22c55e',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#22c55e'; e.currentTarget.style.color = '#000'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#22c55e'; }}
            >
              Activar
            </button>
          </div>
          {codeValid && (
            <p style={{ marginTop: '16px', fontSize: '0.8rem', color: '#22c55e' }}>
              ✅ ¡Camino activado! Revisa tus fases diarias.
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
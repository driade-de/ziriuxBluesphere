interface CardData {
  id: string
  category: string
  title: string
  subtitle: string
  value: string
  description: string
  source: string
  status: 'crítico' | 'deterioro' | 'riesgo' | 'estable'
  progress: number
  color: string
}

export function DetailCards({ scenario }: { scenario: string }) {
  const cards: CardData[] = [
    {
      id: 'agua',
      category: 'Sistema Hidrológico',
      title: 'Descenso Crítico',
      subtitle: 'Agua Dulce',
      value: 'Sobreexplotación global',
      description: 'Los sistemas de agua dulce enfrentan presión creciente por sobreexplotación y cambio climático.',
      source: 'UN Environment Programme / World Resources Institute',
      status: 'crítico',
      progress: 85,
      color: '#ec4899'
    },
    {
      id: 'oceano',
      category: 'Acidificación',
      title: '2.1pH',
      subtitle: 'Océano Global',
      value: 'Acidificación progresiva',
      description: 'El océano absorbe gran parte del calor y del CO₂ del sistema climático.',
      source: 'NOAA Ocean Acidification Monitoring Program',
      status: 'deterioro',
      progress: 70,
      color: '#eab308'
    },
    {
      id: 'biodiversidad',
      category: 'Estabilidad Ecológica',
      title: '-73%',
      subtitle: 'Biodiversidad',
      value: 'Sexta extinción masiva',
      description: 'La sexta extinción masiva altera la red de la vida que sostiene la homeostasis planetaria.',
      source: 'IPBES — Intergovernmental Science-Policy Platform',
      status: 'crítico',
      progress: 90,
      color: '#ec4899'
    },
    {
      id: 'manglares',
      category: 'Ecosistema Costero',
      title: '-0.15M ha',
      subtitle: 'Manglares',
      value: 'Pérdida anual',
      description: 'Protegen costas y sostienen civilizaciones invisibles. Ecosistemas azules vitales.',
      source: 'Global Mangrove Alliance / UNEP-WCMC',
      status: 'riesgo',
      progress: 60,
      color: '#eab308'
    }
  ]

  const statusLabels: Record<string, string> = {
    crítico: 'CRÍTICO',
    deterioro: 'DETERIORO',
    riesgo: 'RIESGO',
    estable: 'ESTABLE'
  }

  const statusColors: Record<string, string> = {
    crítico: '#ec4899',
    deterioro: '#eab308',
    riesgo: '#eab308',
    estable: '#22c55e'
  }

  return (
    <section style={{ padding: '60px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '24px'
      }}>
        {cards.map((card) => (
          <div
            key={card.id}
            style={{
              background: 'rgba(17,24,39,0.6)',
              backdropFilter: 'blur(12px)',
              borderRadius: '16px',
              padding: '24px',
              border: `1px solid ${card.color}44`,
              boxShadow: `0 8px 32px ${card.color}11`,
              transition: 'transform 0.3s, box-shadow 0.3s',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)'
              e.currentTarget.style.boxShadow = `0 12px 40px ${card.color}22`
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = `0 8px 32px ${card.color}11`
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <div style={{ 
                  fontSize: '0.75rem', 
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  opacity: 0.7,
                  marginBottom: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <span>{getIconForCategory(card.category)}</span>
                  {card.category}
                </div>
              </div>
              <span style={{
                fontSize: '0.65rem',
                fontWeight: 700,
                padding: '4px 10px',
                borderRadius: '12px',
                background: `${statusColors[card.status]}22`,
                color: statusColors[card.status],
                border: `1px solid ${statusColors[card.status]}44`
              }}>
                {statusLabels[card.status]}
              </span>
            </div>

            <div style={{ marginBottom: '12px' }}>
              <h3 style={{ 
                fontSize: '2rem', 
                fontWeight: 700, 
                color: card.color,
                margin: '0 0 4px 0',
                letterSpacing: '-1px'
              }}>
                {card.title}
              </h3>
              <p style={{ 
                fontSize: '0.85rem', 
                opacity: 0.6,
                margin: 0
              }}>
                {card.subtitle}
              </p>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <div style={{
                height: '4px',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '2px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${card.progress}%`,
                  height: '100%',
                  background: `linear-gradient(90deg, ${card.color}, ${card.color}88)`,
                  borderRadius: '2px',
                  transition: 'width 1s ease-out'
                }} />
              </div>
            </div>

            <p style={{ 
              fontSize: '0.85rem', 
              lineHeight: '1.6',
              opacity: 0.8,
              marginBottom: '16px'
            }}>
              {card.description}
            </p>

            <p style={{ 
              fontSize: '0.7rem', 
              opacity: 0.5,
              fontStyle: 'italic',
              borderTop: '1px solid rgba(255,255,255,0.1)',
              paddingTop: '12px',
              margin: 0
            }}>
              {card.source}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

function getIconForCategory(category: string): string {
  const icons: Record<string, string> = {
    'Sistema Hidrológico': '💧',
    'Acidificación': '🧪',
    'Estabilidad Ecológica': '🌿',
    'Ecosistema Costero': '🌊'
  }
  return icons[category] || '📊'
}
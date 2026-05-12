'use client'

import { useState } from 'react'
import { LineChart, Line, ResponsiveContainer } from 'recharts'

// ==================== TIPO DE ESCENARIO ====================
type Scenario = 'optimista' | 'intermedio' | 'critico'

// ==================== DATOS DE TENDENCIA (FIJOS) ====================
const co2Trend = [
  { year: '1975', value: 331 }, { year: '1985', value: 346 }, { year: '1995', value: 361 },
  { year: '2005', value: 379 }, { year: '2015', value: 400 }, { year: '2025', value: 429 }
]
const tempTrend = [
  { year: '1975', value: -0.1 }, { year: '1985', value: 0.0 }, { year: '1995', value: 0.2 },
  { year: '2005', value: 0.4 }, { year: '2015', value: 0.7 }, { year: '2025', value: 1.1 }
]
const albedoTrend = [
  { year: '1979', value: 7.0 }, { year: '1989', value: 6.5 }, { year: '1999', value: 5.8 },
  { year: '2009', value: 5.0 }, { year: '2019', value: 4.5 }, { year: '2025', value: 4.3 }
]
const sealevelTrend = [
  { year: '1975', value: 0 }, { year: '1985', value: 25 }, { year: '1995', value: 50 },
  { year: '2005', value: 70 }, { year: '2015', value: 90 }, { year: '2025', value: 104.5 }
]
const phTrend = [
  { year: '1980', value: 8.15 }, { year: '1990', value: 8.10 }, { year: '2000', value: 8.05 },
  { year: '2010', value: 8.00 }, { year: '2020', value: 7.95 }, { year: '2025', value: 7.92 }
]
const biodiversityTrend = [
  { year: '1970', value: 0 }, { year: '1980', value: -10 }, { year: '1990', value: -25 },
  { year: '2000', value: -40 }, { year: '2010', value: -55 }, { year: '2020', value: -69 }
]
const waterTrend = [
  { year: '1980', value: 0 }, { year: '1990', value: -5 }, { year: '2000', value: -15 },
  { year: '2010', value: -30 }, { year: '2020', value: -50 }, { year: '2025', value: -65 }
]

// ==================== VALORES POR ESCENARIO ====================
const getScenarioValues = (scenario: Scenario) => {
  switch(scenario) {
    case 'optimista':
      return {
        co2: { value: '410', unit: 'ppm', trendPercent: 23.9, status: 'alerta' as const, limit: 'LÍMITE: 450 ppm' },
        temp: { value: '+0.8', unit: '°C', trendPercent: 900, status: 'riesgo' as const, limit: 'LÍMITE: +1.5°C' },
        albedo: { value: '5.0', unit: 'M km²', trendPercent: -28.6, status: 'alerta' as const, limit: 'Mínimo histórico' },
        sealevel: { value: '50', unit: 'mm', trendPercent: 100, status: 'alerta' as const, limit: 'LÍMITE: +110 mm' },
        ph: { value: '8.0', unit: 'pH', trendPercent: -1.8, status: 'alerta' as const, limit: 'Acidificación progresiva' },
        biodiversity: { value: '-30', unit: '%', trendPercent: -30, status: 'riesgo' as const, limit: 'Sexta extinción masiva' },
        water: { value: 'Descenso moderado', unit: '', trendPercent: -20, status: 'alerta' as const, limit: 'Sobreexplotación global' }
      }
    case 'intermedio':
      return {
        co2: { value: '429', unit: 'ppm', trendPercent: 29.6, status: 'alerta' as const, limit: 'LÍMITE: 450 ppm' },
        temp: { value: '+1.1', unit: '°C', trendPercent: 1200, status: 'crítico' as const, limit: 'LÍMITE: +1.5°C' },
        albedo: { value: '4.3', unit: 'M km²', trendPercent: -38.6, status: 'crítico' as const, limit: 'Mínimo histórico' },
        sealevel: { value: '104.5', unit: 'mm', trendPercent: 418, status: 'riesgo' as const, limit: 'LÍMITE: +110 mm' },
        ph: { value: '2.1', unit: 'pH', trendPercent: -2.8, status: 'crítico' as const, limit: 'Acidificación progresiva' },
        biodiversity: { value: '-73', unit: '%', trendPercent: -73, status: 'crítico' as const, limit: 'Sexta extinción masiva' },
        water: { value: 'Descenso', unit: '', trendPercent: -65, status: 'crítico' as const, limit: 'Sobreexplotación global' }
      }
    case 'critico':
      return {
        co2: { value: '450', unit: 'ppm', trendPercent: 36.0, status: 'crítico' as const, limit: 'LÍMITE: 450 ppm' },
        temp: { value: '+1.5', unit: '°C', trendPercent: 1600, status: 'crítico' as const, limit: 'LÍMITE: +1.5°C' },
        albedo: { value: '3.5', unit: 'M km²', trendPercent: -50, status: 'crítico' as const, limit: 'Mínimo histórico' },
        sealevel: { value: '150', unit: 'mm', trendPercent: 500, status: 'crítico' as const, limit: 'LÍMITE: +110 mm' },
        ph: { value: '7.8', unit: 'pH', trendPercent: -4.3, status: 'crítico' as const, limit: 'Acidificación progresiva' },
        biodiversity: { value: '-85', unit: '%', trendPercent: -85, status: 'crítico' as const, limit: 'Sexta extinción masiva' },
        water: { value: 'Descenso crítico', unit: '', trendPercent: -80, status: 'crítico' as const, limit: 'Sobreexplotación global' }
      }
  }
}

// ==================== CONSTRUIR SENSORES ====================
const buildSensors = (scenario: Scenario) => {
  const vals = getScenarioValues(scenario)
  return [
    { id: 'co2', name: 'Respiración Planetaria', icon: '💨', description: 'La atmósfera contiene concentraciones de CO₂ no experimentadas por la civilización humana moderna.', source: 'NOAA Global Monitoring Laboratory — Mauna Loa Observatory', trendData: co2Trend, ...vals.co2 },
    { id: 'temp', name: 'Fiebre del Planeta', icon: '🌡️', description: 'El sistema climático acumula energía térmica global.', source: 'NASA GISS Surface Temperature Analysis', trendData: tempTrend, ...vals.temp },
    { id: 'hielo', name: 'Reflexión Solar (Albedo)', icon: '🧊', description: 'La reducción del hielo disminuye la capacidad del planeta de reflejar radiación solar.', source: 'NASA GISS Surface Temperature Analysis', trendData: albedoTrend, ...vals.albedo },
    { id: 'nivelmar', name: 'Expansión Térmica', icon: '🌊', description: 'El aumento del nivel del mar refleja expansión térmica y deshielo continental.', source: 'NASA Sea Level Change Program', trendData: sealevelTrend, ...vals.sealevel },
    { id: 'aguadulce', name: 'Sistema Hidrológico', icon: '💧', description: 'Los sistemas de agua dulce enfrentan presión creciente por sobreexplotación y cambio climático.', source: 'UN Environment Programme / World Resources Institute', trendData: waterTrend, ...vals.water },
    { id: 'oceano', name: 'Acidificación', icon: '🌊', description: 'El océano absorbe gran parte del calor y del CO₂ del sistema climático.', source: 'NOAA Ocean Acidification Monitoring Program', trendData: phTrend, ...vals.ph },
    { id: 'biodiversidad', name: 'Estabilidad Ecológica', icon: '🦋', description: 'La sexta extinción masiva altera la red de la vida que sostiene la homeostasis planetaria.', source: 'IPBES — Intergovernmental Science-Policy Platform', trendData: biodiversityTrend, ...vals.biodiversity }
  ]
}

// ==================== COLORES ====================
const statusColors = { crítico: '#ef4444', alerta: '#f59e0b', riesgo: '#f97316', estable: '#22c55e' }
const statusBg = {
  crítico: 'rgba(239, 68, 68, 0.15)', alerta: 'rgba(245, 158, 11, 0.15)',
  riesgo: 'rgba(249, 115, 22, 0.15)', estable: 'rgba(34, 197, 94, 0.15)'
}

// ==================== COMPONENTE SensorCard ====================
function SensorCard({ sensor, isExpanded, onToggle }: any) {
  const isPositiveTrend = sensor.trendPercent > 0
  const arrow = isPositiveTrend ? '▲' : '▼'
  const trendColor = isPositiveTrend ? '#ef4444' : '#22c55e'

  return (
    <div style={{
      background: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(10px)', borderRadius: '16px',
      border: `1px solid ${statusColors[sensor.status]}44`, cursor: 'pointer', transition: 'all 0.2s'
    }} onClick={onToggle}>
      <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '1.8rem' }}>{sensor.icon}</span>
          <div>
            <div style={{ fontSize: '0.75rem', opacity: 0.6 }}>{sensor.name}</div>
            <div style={{ fontSize: '1.3rem', fontWeight: 600 }}>
              {sensor.value}
              <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>{sensor.unit}</span>
              <span style={{ fontSize: '0.7rem', marginLeft: '8px', color: trendColor }}>{arrow} {Math.abs(sensor.trendPercent)}%</span>
            </div>
          </div>
        </div>
        <div style={{
          padding: '4px 12px', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 600,
          textTransform: 'uppercase', color: statusColors[sensor.status], background: statusBg[sensor.status]
        }}>{sensor.status}</div>
      </div>
      {isExpanded && (
        <div style={{
          padding: '16px 20px', borderTop: `1px solid ${statusColors[sensor.status]}22`,
          fontSize: '0.8rem', lineHeight: '1.5', opacity: 0.8
        }}>
          <p style={{ marginBottom: '8px' }}>{sensor.description}</p>
          <p style={{ fontSize: '0.7rem', opacity: 0.6, marginBottom: '4px' }}>📚 {sensor.source}</p>
          <p style={{ fontSize: '0.7rem', color: statusColors[sensor.status] }}>⚠️ {sensor.limit}</p>
          {sensor.trendData && (
            <div style={{ marginTop: '16px' }}>
              <ResponsiveContainer width="100%" height={100}>
                <LineChart data={sensor.trendData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                  <Line type="monotone" dataKey="value" stroke={statusColors[sensor.status]} strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.6rem', opacity: 0.5, marginTop: '4px' }}>
                <span>{sensor.trendData[0].year}</span>
                <span>{sensor.trendData[sensor.trendData.length-1].year}</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ==================== COMPONENTE PlanetaryBlock ====================
function PlanetaryBlock({ title, sensorsList, expandedId, onToggle }: any) {
  return (
    <div style={{
      background: 'rgba(0, 10, 20, 0.5)', backdropFilter: 'blur(5px)', borderRadius: '24px',
      border: '1px solid rgba(100, 200, 255, 0.2)', padding: '20px 16px 16px 16px', transition: 'all 0.2s'
    }}>
      <h3 style={{
        fontSize: '1.2rem', fontWeight: 600, letterSpacing: '2px', margin: '0 0 16px 0',
        paddingBottom: '8px', borderBottom: '1px solid rgba(100, 200, 255, 0.3)',
        display: 'inline-block', color: '#88ddff'
      }}>{title}</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
        {sensorsList.map((sensor: any) => (
          <SensorCard key={sensor.id} sensor={sensor} isExpanded={expandedId === sensor.id} onToggle={() => onToggle(sensor.id)} />
        ))}
      </div>
    </div>
  )
}

// ==================== COMPONENTE Selector de Escenarios (integrado) ====================
function ScenarioSelector({ active, onChange }: { active: Scenario; onChange: (s: Scenario) => void }) {
  const scenarios = [
    { key: 'optimista', label: 'Optimista', color: '#22c55e' },
    { key: 'intermedio', label: 'Intermedio', color: '#eab308' },
    { key: 'critico', label: 'Crítico', color: '#ef4444' }
  ] as const

  return (
    <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', margin: '20px 0' }}>
      {scenarios.map((s) => (
        <button
          key={s.key}
          onClick={() => onChange(s.key)}
          style={{
            padding: '12px 28px',
            borderRadius: '25px',
            border: `2px solid ${s.color}`,
            background: active === s.key ? s.color : 'transparent',
            color: active === s.key ? '#000' : s.color,
            fontWeight: 600,
            fontSize: '0.85rem',
            cursor: 'pointer',
            transition: 'all 0.3s',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}
        >
          {s.label}
        </button>
      ))}
    </div>
  )
}

// ==================== COMPONENTE PRINCIPAL ====================
export function PlanetaryHexagram() {
  const [scenario, setScenario] = useState<Scenario>('intermedio')
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [isEcoExpanded, setIsEcoExpanded] = useState(false)
  const [isManglarExpanded, setIsManglarExpanded] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const toggleExpand = (id: string) => setExpandedId(expandedId === id ? null : id)
  const sensors = buildSensors(scenario)

  const atmosphereSensors = sensors.filter(s => s.id === 'co2' || s.id === 'temp')
  const oceanSensors = sensors.filter(s => s.id === 'nivelmar' || s.id === 'oceano')
  const biosphereSensors = sensors.filter(s => s.id === 'biodiversidad' || s.id === 'aguadulce')
  const cryosphereSensors = sensors.filter(s => s.id === 'hielo')

  const handleScenarioChange = (newScenario: Scenario) => {
    setScenario(newScenario)
    setIsTransitioning(true)
    setTimeout(() => setIsTransitioning(false), 300)
  }

  return (
    <div style={{ padding: '40px 20px' }}>
      <style>{`
        @media (max-width: 768px) {
          .three-columns {
            grid-template-columns: 1fr !important;
            gap: 24px;
          }
        }
        @keyframes fadeFlash {
          0% { opacity: 1; }
          50% { opacity: 0.7; background-color: rgba(59,130,246,0.15); }
          100% { opacity: 1; }
        }
        .flash {
          animation: fadeFlash 0.3s ease-in-out;
        }
      `}</style>

      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h3 style={{ fontSize: '0.8rem', letterSpacing: '4px', opacity: 0.5, marginBottom: '8px' }}>HECTAGRAMA DE SALUD PLANETARIA</h3>
        <p style={{ fontSize: '0.85rem', opacity: 0.6, maxWidth: '500px', margin: '0 auto' }}>
          7 sensores interconectados que miden la fiebre metabólica del sistema Tierra
        </p>
      </div>

      {/* Selector de escenarios integrado */}
      <ScenarioSelector active={scenario} onChange={handleScenarioChange} />

      <div className={isTransitioning ? 'flash' : ''} style={{ transition: 'all 0.2s' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', maxWidth: '1400px', margin: '0 auto' }}>
          <PlanetaryBlock title="ATMOSFERA" sensorsList={atmosphereSensors} expandedId={expandedId} onToggle={toggleExpand} />
          <PlanetaryBlock title="OCÉANOS" sensorsList={oceanSensors} expandedId={expandedId} onToggle={toggleExpand} />
          <PlanetaryBlock title="BIOSFERA" sensorsList={biosphereSensors} expandedId={expandedId} onToggle={toggleExpand} />
          <PlanetaryBlock title="CRIOSFERA" sensorsList={cryosphereSensors} expandedId={expandedId} onToggle={toggleExpand} />
        </div>
      </div>

      {/* TRES COLUMNAS */}
      <div className="three-columns" style={{ marginTop: '64px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px', maxWidth: '1400px', marginLeft: 'auto', marginRight: 'auto' }}>
        {/* Columna 1: Ecosistemas Invisibles Críticos */}
        <div onClick={() => setIsEcoExpanded(!isEcoExpanded)} style={{
          background: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(10px)', borderRadius: '24px',
          border: `1px solid ${isEcoExpanded ? '#3b82f6' : 'rgba(100, 200, 255, 0.3)'}`,
          cursor: 'pointer', transition: 'all 0.2s', padding: '28px 24px', textAlign: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '16px' }}>
            <span style={{ fontSize: '2.5rem' }}>🌍</span>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 600, letterSpacing: '2px', margin: 0, color: '#88ddff' }}>ECOSISTEMAS INVISIBLES CRÍTICOS</h2>
          </div>
          <p style={{ fontSize: '0.9rem', opacity: 0.8, lineHeight: '1.5', marginBottom: '16px' }}>
            Sostienen la vida, protegen costas y almacenan carbono. Su pérdida impacta todo el sistema planetario.
          </p>
          {isEcoExpanded && (
            <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid rgba(100,200,255,0.3)', fontSize: '0.85rem', lineHeight: '1.5', textAlign: 'left' }}>
              <p>🌱 <strong>Servicios ecosistémicos:</strong> Los humedales, turberas, praderas marinas y manglares regulan el clima, purifican agua y son refugio de biodiversidad.</p>
              <p>⚠️ <strong>Amenazas:</strong> Drenaje para agricultura, urbanización, contaminación y cambio climático. Se han perdido más del 50% de los humedales desde 1900.</p>
              <p style={{ fontSize: '0.7rem', opacity: 0.6, marginTop: '12px' }}>📚 Fuente: Ramsar Convention on Wetlands / UNEP</p>
            </div>
          )}
          <div style={{ fontSize: '0.7rem', opacity: 0.5, marginTop: '16px' }}>{isEcoExpanded ? '▲ Mostrar menos' : '▼ Haz clic para más información'}</div>
        </div>

        {/* Columna 2: Manglares */}
        <div onClick={() => setIsManglarExpanded(!isManglarExpanded)} style={{
          background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.15), rgba(0,0,0,0.6))',
          backdropFilter: 'blur(10px)', borderRadius: '24px', border: `1px solid ${isManglarExpanded ? '#22c55e' : 'rgba(34, 197, 94, 0.4)'}`,
          cursor: 'pointer', transition: 'all 0.2s', padding: '28px 24px', textAlign: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '20px' }}>
            <span style={{ fontSize: '2.5rem' }}>🌿</span>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 500, letterSpacing: '2px', margin: 0 }}>Manglares</h2>
            <span style={{ fontSize: '2.5rem' }}>🌾</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', alignItems: 'baseline', marginBottom: '20px' }}>
            <span style={{ fontSize: '2rem', fontWeight: 600, color: '#22c55e' }}>-0.15M</span>
            <span style={{ fontSize: '1rem', opacity: 0.8 }}>ha</span>
            <span style={{ padding: '4px 16px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600, background: 'rgba(249, 115, 22, 0.2)', color: '#f97316' }}>RIESGO</span>
          </div>
          <p style={{ fontSize: '0.85rem', opacity: 0.85, marginBottom: '16px' }}>Protegen costas y sostienen civilizaciones invisibles. Ecosistemas azules vitales.</p>
          {isManglarExpanded && (
            <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid rgba(34,197,94,0.3)', fontSize: '0.85rem', lineHeight: '1.5', textAlign: 'left' }}>
              <p>📉 <strong>Pérdida acelerada:</strong> Desde 1980, el 35% de los manglares han desaparecido, tres veces más rápido que los bosques tropicales.</p>
              <p>🌊 <strong>Carbono azul:</strong> Almacenan hasta 1,000 toneladas de carbono por hectárea, esenciales para mitigar el cambio climático.</p>
              <p style={{ fontSize: '0.7rem', opacity: 0.6, marginTop: '12px' }}>📚 Fuente: Global Mangrove Alliance / UNEP-WCMC / Blue Carbon Initiative</p>
            </div>
          )}
          <div style={{ fontSize: '0.7rem', opacity: 0.5, marginTop: '16px' }}>{isManglarExpanded ? '▲ Mostrar menos' : '▼ Haz clic para más información'}</div>
        </div>

        {/* Columna 3: Explicación del Selector */}
        <div style={{
          background: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(10px)', borderRadius: '24px',
          border: '1px solid rgba(100, 200, 255, 0.3)', padding: '28px 24px', textAlign: 'center'
        }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 600, letterSpacing: '2px', marginBottom: '16px', color: '#88ddff' }}>Selector de Escenarios</h2>
          <p style={{ fontSize: '0.85rem', opacity: 0.7, marginBottom: '24px' }}>
            Escenarios de emisiones según IPCC. Cambia el futuro y observa cómo se transforman los valores de los sensores.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {(['optimista', 'intermedio', 'critico'] as Scenario[]).map((opt) => (
              <button
                key={opt}
                onClick={() => handleScenarioChange(opt)}
                style={{
                  background: scenario === opt ? 'rgba(59,130,246,0.3)' : 'rgba(255,255,255,0.05)',
                  border: `1px solid ${scenario === opt ? '#3b82f6' : 'rgba(100,200,255,0.4)'}`,
                  borderRadius: '40px', padding: '8px 24px', fontSize: '0.9rem', fontWeight: 500,
                  color: '#fff', cursor: 'pointer', transition: 'all 0.2s', textTransform: 'capitalize'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(59,130,246,0.2)'}
                onMouseLeave={(e) => e.currentTarget.style.background = scenario === opt ? 'rgba(59,130,246,0.3)' : 'rgba(255,255,255,0.05)'}
              >
                {opt === 'optimista' ? 'Optimista' : opt === 'intermedio' ? 'Intermedio' : 'Crítico'}
              </button>
            ))}
          </div>
          <p style={{ fontSize: '0.7rem', opacity: 0.5, marginTop: '24px' }}>Basado en RCP 2.6, 4.5 y 8.5 del IPCC</p>
          <p style={{ fontSize: '0.65rem', opacity: 0.4, marginTop: '16px' }}>Los sensores actualizan sus valores y tendencias según el escenario seleccionado</p>
        </div>
      </div>
    </div>
  )
}
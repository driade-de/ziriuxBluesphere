'use client'

import { Suspense, useEffect, useState, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'

// Configuración de Supabase
const supabaseUrl = "https://ophicpcbgdgzthjamzoz.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9waGljcGNiZ2RnenRoamFtem96Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ3MjgwMzUsImV4cCI6MjA4MDMwNDAzNX0.K55Tk-cdbAFDOtGrIMN7vYFaJAccrsD6UdOrARt1P5c"

const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Nombres de los 17 ODS
const odsNames: Record<number, string> = {
  1: "Fin de la pobreza",
  2: "Hambre cero",
  3: "Salud y bienestar",
  4: "Educación de calidad",
  5: "Igualdad de género",
  6: "Agua limpia y saneamiento",
  7: "Energía asequible y no contaminante",
  8: "Trabajo decente y crecimiento económico",
  9: "Industria, innovación e infraestructura",
  10: "Reducción de las desigualdades",
  11: "Ciudades y comunidades sostenibles",
  12: "Producción y consumo responsables",
  13: "Acción por el clima",
  14: "Vida submarina",
  15: "Vida de ecosistemas terrestres",
  16: "Paz, justicia e instituciones sólidas",
  17: "Alianzas para lograr los objetivos"
}

// Colores por ODS (los oficiales)
const odsColors: Record<number, string> = {
  1: "#E5243B", 2: "#DDA63A", 3: "#4C9F38", 4: "#C5192D", 5: "#FF3A21",
  6: "#26BDE2", 7: "#FCC30B", 8: "#A21942", 9: "#FD6925", 10: "#DD1367",
  11: "#FD9D27", 12: "#BF8B2E", 13: "#3F7E44", 14: "#0A97D9", 15: "#56C02B",
  16: "#00689D", 17: "#19486A"
}

// Mapeo de hábitos a ODS (cada hábito impacta ciertos ODS)
const habitosODS: Record<string, number[]> = {
  'menos_plasticos': [14, 12, 6],
  'transporte_limpio': [11, 13, 3],
  'reciclaje': [12, 15, 13],
  'ahorro_agua': [6, 14, 15],
  'energia_renovable': [7, 13, 9],
  'consumo_local': [8, 12, 2],
  'movilidad_activa': [3, 11, 13],
  'reduccion_carne': [13, 15, 3],
  'compostaje': [12, 15, 2],
  'reutilizacion': [12, 13, 14],
  'arbolado': [15, 13, 11],
  'educacion_ambiental': [4, 13, 17],
  'voluntariado': [1, 10, 16],
  'economia_circular': [8, 9, 12],
  'movilidad_compartida': [11, 13, 3],
  'digitalizacion_eco': [9, 13, 7],
  'consumo_responsable': [12, 2, 1],
  'proteccion_biodiversidad': [15, 14, 13]
}

  function GuardianGaiaContent() {
  const searchParams = useSearchParams()
  const codigoURL = searchParams.get('codigo') || ''
  const [codigoGuardian, setCodigoGuardian] = useState(codigoURL)
  const [loading, setLoading] = useState(true)
  const [metricas, setMetricas] = useState<any[]>([])
  const [habitosHoy, setHabitosHoy] = useState<any[]>([])
  const [contadorHabitos, setContadorHabitos] = useState(0)
  const [impactoTotal, setImpactoTotal] = useState(0)
  const [racha, setRacha] = useState(0)
  const [conciencia, setConciencia] = useState(78.4)
  const [modalAbierto, setModalAbierto] = useState(false)
  const [habitoSeleccionado, setHabitoSeleccionado] = useState('')
  const [impactoRegistro, setImpactoRegistro] = useState(0.5)
  const [nivelConciencia, setNivelConciencia] = useState(3)
  const [notasRegistro, setNotasRegistro] = useState('')

  // NUEVO: Estado para el progreso de los 17 ODS (0-100)
  const [odsProgress, setOdsProgress] = useState<Record<number, number>>(() => {
    const inicial: Record<number, number> = {}
    for (let i = 1; i <= 17; i++) inicial[i] = Math.floor(Math.random() * 40) + 10
    return inicial
  })

  // Cargar métricas del heptagrama (inamovibles)
  const cargarMetricas = async () => {
    try {
      const { data, error } = await supabase
        .from('heptagram_gaia_metrics')
        .select('*')
        .order('id', { ascending: true })
      if (!error && data && data.length > 0) {
        setMetricas(data)
      } else {
        setMetricas([
          { slug: 'aire', label: 'DIÓXIDO DE CARBONO', valor_actual: '429', unidad: 'ppm', tendencia: 'ascendente', fuente: 'NOAA Global Monitoring Lab' },
          { slug: 'temperatura', label: 'TEMPERATURA GLOBAL', valor_actual: '1.1', unidad: '°C', tendencia: 'ascendente', fuente: 'NASA GISS' },
          { slug: 'hielo_antartida', label: 'MASA DE HIELO ANTÁRTICA', valor_actual: '-150', unidad: 'Gt', tendencia: 'descendente', fuente: 'NSIDC' },
          { slug: 'nivel_mar', label: 'NIVEL DEL MAR', valor_actual: '104.5', unidad: 'mm', tendencia: 'ascendente', fuente: 'NASA Sea Level Team' },
          { slug: 'hielo_artico', label: 'EXTENSIÓN HIELO ÁRTICO', valor_actual: '4.3', unidad: 'M km²', tendencia: 'descendente', fuente: 'NSIDC' },
          { slug: 'oceano', label: 'OCÉANO GLOBAL', valor_actual: '2.1', unidad: 'pH', tendencia: 'ascendente', fuente: 'NOAA Ocean Service' },
          { slug: 'biodiversidad', label: 'BIODIVERSIDAD PLANETARIA', valor_actual: '-73', unidad: '%', tendencia: 'descendente', fuente: 'WWF Living Planet' }
        ])
      }
    } catch (error) {
      console.error('Error cargando métricas:', error)
    }
  }

  // Cargar hábitos registrados hoy
  const cargarHabitosHoy = async () => {
    if (!codigoGuardian) return
    const hoy = new Date().toISOString().split('T')[0]
    const { data, error } = await supabase
      .from('seguimiento')
      .select('*')
      .eq('codigo_guardian', codigoGuardian)
      .gte('fecha_reporte', hoy)
    if (!error && data) {
      setHabitosHoy(data)
      setContadorHabitos(data.length)
      let totalCO2 = 0
      data.forEach(item => totalCO2 += item.impacto_directo || 0)
      setImpactoTotal(totalCO2)
      setRacha(data.length > 0 ? Math.min(data.length, 30) : 0)
    } else {
      setHabitosHoy([])
      setContadorHabitos(0)
    }
  }

  // NUEVO: Cargar progreso ODS desde Supabase (opcional)
  const cargarODSProgress = async () => {
    if (!codigoGuardian) return
    try {
      const { data, error } = await supabase
        .from('ods_progress')
        .select('*')
        .eq('codigo_guardian', codigoGuardian)
        .single()
      if (!error && data) {
        const progreso: Record<number, number> = {}
        for (let i = 1; i <= 17; i++) {
          progreso[i] = data[`ods_${i}`] || odsProgress[i]
        }
        setOdsProgress(progreso)
      }
    } catch (e) {
      console.log('Usando progreso ODS local')
    }
  }

  // NUEVO: Guardar progreso ODS en Supabase
  const guardarODSProgress = async (nuevoProgreso: Record<number, number>) => {
    if (!codigoGuardian) return
    try {
      const registro: any = { codigo_guardian: codigoGuardian, updated_at: new Date().toISOString() }
      for (let i = 1; i <= 17; i++) registro[`ods_${i}`] = nuevoProgreso[i]
      
      const { error } = await supabase
        .from('ods_progress')
        .upsert(registro, { onConflict: 'codigo_guardian' })
      if (error) console.error('Error guardando ODS:', error)
    } catch (e) {
      console.log('No se pudo guardar ODS en Supabase')
    }
  }

  // NUEVO: Actualizar ODS según el hábito registrado
  const actualizarODSPorHabito = (habitoId: string, impactoCO2: number) => {
    const odsAfectados = habitosODS[habitoId] || [13, 12, 15] // default: clima, consumo, vida terrestre
    
    setOdsProgress(prev => {
      const nuevo = { ...prev }
      // Factor de incremento: entre 0.5 y 3 puntos según impacto CO2
      const incrementoBase = Math.min(5, Math.max(0.5, impactoCO2 / 2))
      
      odsAfectados.forEach(ods => {
        nuevo[ods] = Math.min(100, nuevo[ods] + incrementoBase + (Math.random() * 1))
      })
      
      // Sinergia: ODS 17 (alianzas) se beneficia siempre
      nuevo[17] = Math.min(100, nuevo[17] + incrementoBase * 0.5)
      
      guardarODSProgress(nuevo)
      return nuevo
    })
  }

  // Registrar hábito (MODIFICADO: ahora actualiza ODS)
  const registrarHabito = async () => {
    if (!habitoSeleccionado) {
      alert('Selecciona un hábito')
      return
    }
    
    const { error } = await supabase
      .from('seguimiento')
      .insert({
        codigo_guardian: codigoGuardian,
        acciones_realizadas: habitoSeleccionado,
        impacto_directo: impactoRegistro,
        nivel_conciencia: nivelConciencia,
        comentario: notasRegistro,
        fecha_reporte: new Date().toISOString()
      })
    
    if (error) {
      alert('Error al registrar: ' + error.message)
    } else {
      // NUEVO: Actualizar ODS según el hábito
      actualizarODSPorHabito(habitoSeleccionado, impactoRegistro)
      
      // Actualizar métricas personales
      setContadorHabitos(prev => prev + 1)
      setImpactoTotal(prev => prev + impactoRegistro)
      setRacha(prev => Math.min(prev + 1, 30))
      setConciencia(prev => Math.min(100, prev + (Math.random() * 0.8 + 0.2)))
      
      alert('✅ Hábito registrado exitosamente')
      setModalAbierto(false)
      cargarHabitosHoy()
      
      // Resetear selección
      setHabitoSeleccionado('')
      setImpactoRegistro(0.5)
      setNotasRegistro('')
    }
  }

  // Lista completa de hábitos (18 hábitos regenerativos)
  const habitosLista = [
    { id: 'menos_plasticos', nombre: '🥤 Reducir plásticos', impacto: 0.3, ods: [14,12,6] },
    { id: 'transporte_limpio', nombre: '🚲 Transporte activo', impacto: 2.5, ods: [11,13,3] },
    { id: 'reciclaje', nombre: '♻️ Reciclaje consciente', impacto: 1.2, ods: [12,15,13] },
    { id: 'ahorro_agua', nombre: '💧 Ahorro de agua', impacto: 0.8, ods: [6,14,15] },
    { id: 'energia_renovable', nombre: '☀️ Energía renovable', impacto: 3.0, ods: [7,13,9] },
    { id: 'consumo_local', nombre: '🛒 Consumo local', impacto: 1.5, ods: [8,12,2] },
    { id: 'movilidad_activa', nombre: '🏃 Movilidad activa', impacto: 1.8, ods: [3,11,13] },
    { id: 'reduccion_carne', nombre: '🥩 Reducción carne', impacto: 4.0, ods: [13,15,3] },
    { id: 'compostaje', nombre: '🌱 Compostaje', impacto: 0.6, ods: [12,15,2] },
    { id: 'reutilizacion', nombre: '🔄 Reutilización', impacto: 0.5, ods: [12,13,14] },
    { id: 'arbolado', nombre: '🌳 Plantar árboles', impacto: 5.0, ods: [15,13,11] },
    { id: 'educacion_ambiental', nombre: '📚 Educación ambiental', impacto: 1.0, ods: [4,13,17] },
    { id: 'voluntariado', nombre: '🤝 Voluntariado', impacto: 1.2, ods: [1,10,16] },
    { id: 'economia_circular', nombre: '🔄 Economía circular', impacto: 2.0, ods: [8,9,12] },
    { id: 'movilidad_compartida', nombre: '🚗 Movilidad compartida', impacto: 1.5, ods: [11,13,3] },
    { id: 'digitalizacion_eco', nombre: '💻 Digitalización eco', impacto: 0.7, ods: [9,13,7] },
    { id: 'consumo_responsable', nombre: '🏷️ Consumo responsable', impacto: 1.3, ods: [12,2,1] },
    { id: 'proteccion_biodiversidad', nombre: '🦋 Protección biodiversidad', impacto: 2.5, ods: [15,14,13] }
  ]

  useEffect(() => {
    if (!codigoGuardian) {
      setCodigoGuardian('GPR-AQUA-ZIRIUX-000051')
    }
    cargarMetricas()
    cargarHabitosHoy()
    cargarODSProgress()
    setLoading(false)
  }, [codigoGuardian])

  useEffect(() => {
    const interval = setInterval(() => {
      setConciencia(prev => Math.min(100, prev + (Math.random() * 0.1 - 0.05)))
    }, 30000)
    return () => clearInterval(interval)
  }, [])

  // Renderizado del heptagrama (INAMOVIBLE - datos científicos)
  const renderMetricas = () => {
    return metricas.map(metrica => {
      const estado = determinarEstado(metrica)
      const icono = obtenerIcono(metrica.slug)
      const tendenciaClase = metrica.tendencia === 'ascendente' ? 'tendencia-negativa' : 'tendencia-positiva'
      const simbolo = metrica.tendencia === 'ascendente' ? '▲' : '▼'
      return (
        <div key={metrica.slug} className={`metric-card ${estado}`}>
          <div className="metric-icon">{icono}</div>
          <div className="metric-label">{metrica.label}</div>
          <div className="metric-value">{metrica.valor_actual} <span className="metric-unit">{metrica.unidad}</span></div>
          <div className={`metric-trend ${tendenciaClase}`}>{simbolo} {metrica.tendencia}</div>
          <div className="metric-source">Fuente: {metrica.fuente || 'N/A'}</div>
        </div>
      )
    })
  }

  // NUEVO: Renderizado del bloque ODS
  const renderODSBlock = () => {
    return (
      <div className="ods-block">
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
          🎯 OBJETIVOS DE DESARROLLO SOSTENIBLE (ODS) - AGENDA 2030
        </h2>
        <div className="ods-grid">
          {Array.from({ length: 17 }, (_, i) => i + 1).map(ods => {
            const progress = odsProgress[ods] || 0
            const color = odsColors[ods] || "#22c55e"
            return (
              <div key={ods} className="ods-item" style={{ borderTop: `4px solid ${color}` }}>
                <div className="ods-header">
                  <span className="ods-number">ODS {ods}</span>
                  <span className="ods-percent">{Math.floor(progress)}%</span>
                </div>
                <div className="ods-name">{odsNames[ods]}</div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${progress}%`, backgroundColor: color }}></div>
                </div>
                <div className="ods-impact-badge">
                  🌱 +{Math.floor(progress / 10)} hábitos
                </div>
              </div>
            )
          })}
        </div>
        <p style={{ fontSize: '0.7rem', textAlign: 'center', marginTop: '16px', opacity: 0.7 }}>
          📊 El progreso ODS se actualiza con cada hábito registrado. ¡Súmate a la regeneración!
        </p>
      </div>
    )
  }

  return (
    <div className="gaia-container">
      <style jsx>{`
        .gaia-container {
          min-height: 100vh;
          background: #05070a;
          color: #ffffff;
          font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
          padding: 20px;
          position: relative;
          overflow-x: hidden;
        }
        #particles-canvas {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 0;
        }
        .content {
          position: relative;
          z-index: 1;
          max-width: 1400px;
          margin: 0 auto;
        }
        .header-card {
          background: rgba(0,0,0,0.4);
          backdropFilter: blur(12px);
          border-radius: 32px;
          padding: 24px;
          margin-bottom: 24px;
          border: 1px solid rgba(100,200,255,0.2);
          text-align: center;
        }
        .codigo-card {
          background: rgba(0,0,0,0.4);
          backdropFilter: blur(12px);
          border-radius: 32px;
          padding: 20px;
          margin-bottom: 24px;
          border: 1px solid rgba(0,255,170,0.3);
          text-align: center;
        }
        .codigo-text {
          font-family: monospace;
          font-size: 1.4rem;
          color: #ffd700;
          letter-spacing: 2px;
          margin: 10px 0;
        }
        .metricas-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
          margin: 30px 0;
        }
        .metric-card {
          background: rgba(0,0,0,0.6);
          border-radius: 20px;
          padding: 20px;
          border-left: 4px solid #88ddff;
          transition: transform 0.2s;
        }
        .metric-card.critico { border-left-color: #ef4444; background: rgba(239,68,68,0.1); }
        .metric-card.alerta { border-left-color: #f97316; background: rgba(249,115,22,0.1); }
        .metric-card.precaucion { border-left-color: #fbbf24; background: rgba(251,191,36,0.05); }
        .metric-icon { font-size: 2rem; margin-bottom: 8px; }
        .metric-label { font-weight: 600; margin-bottom: 8px; }
        .metric-value { font-size: 1.8rem; font-weight: bold; margin: 10px 0; }
        .metric-unit { font-size: 0.8rem; opacity: 0.7; }
        .metric-trend { font-size: 0.9rem; margin: 5px 0; }
        .tendencia-positiva { color: #22c55e; }
        .tendencia-negativa { color: #ef4444; }
        .metric-source { font-size: 0.7rem; opacity: 0.6; margin-top: 8px; }
        .indicadores {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 16px;
          margin: 20px 0;
        }
        .indicador-card {
          background: rgba(0,0,0,0.4);
          border-radius: 20px;
          padding: 16px;
          text-align: center;
        }
        .btn-registrar {
          background: linear-gradient(135deg, #22c55e, #3b82f6);
          border: none;
          padding: 12px 24px;
          border-radius: 40px;
          color: white;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-registrar:hover { transform: scale(1.02); box-shadow: 0 0 15px rgba(34,197,94,0.5); }
        .btn-volver {
          background: transparent;
          border: 1px solid rgba(100,200,255,0.4);
          padding: 10px 24px;
          border-radius: 40px;
          color: #88ddff;
          cursor: pointer;
          margin-top: 20px;
        }
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }
        .modal-content {
          background: #0a0a16;
          border-radius: 24px;
          padding: 24px;
          max-width: 500px;
          width: 90%;
          border: 1px solid #88ddff;
        }
        .modal-select, .modal-input, .modal-textarea {
          width: 100%;
          padding: 12px;
          margin: 8px 0;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(100,200,255,0.3);
          border-radius: 12px;
          color: white;
        }
        /* NUEVOS ESTILOS ODS */
        .ods-block {
          background: rgba(0,0,0,0.5);
          backdropFilter: blur(10px);
          border-radius: 32px;
          padding: 24px;
          margin: 30px 0;
          border: 1px solid rgba(34,197,94,0.3);
        }
        .ods-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 16px;
        }
        .ods-item {
          background: rgba(10,15,20,0.8);
          border-radius: 16px;
          padding: 16px;
          transition: transform 0.2s;
        }
        .ods-item:hover { transform: translateY(-2px); }
        .ods-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
        }
        .ods-number {
          font-weight: bold;
          font-size: 1rem;
        }
        .ods-percent {
          font-size: 1.2rem;
          font-weight: bold;
          color: #22c55e;
        }
        .ods-name {
          font-size: 0.75rem;
          opacity: 0.8;
          margin-bottom: 12px;
        }
        .progress-bar {
          background: rgba(255,255,255,0.1);
          border-radius: 10px;
          height: 8px;
          overflow: hidden;
          margin: 10px 0;
        }
        .progress-fill {
          height: 100%;
          transition: width 0.4s ease;
        }
        .ods-impact-badge {
          font-size: 0.65rem;
          text-align: right;
          color: #22c55e;
          margin-top: 8px;
        }
      `}</style>

      <canvas id="particles-canvas"></canvas>
      <div className="content">
        <div className="header-card">
          <h1 style={{ fontSize: '2rem', background: 'linear-gradient(135deg, #fff, #88ddff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            🌍 GUARDIÁN GAIA
          </h1>
          <p>Sistema de Seguimiento Planetario</p>
          <div className="indicadores">
            <div className="indicador-card">
              <div style={{ fontSize: '1.5rem', color: '#fbbf24' }}>{conciencia.toFixed(1)}%</div>
              <div>Conciencia</div>
            </div>
            <div className="indicador-card">
              <div style={{ fontSize: '1.5rem', color: '#22c55e' }}>{contadorHabitos}</div>
              <div>Hábitos Hoy</div>
            </div>
            <div className="indicador-card">
              <div style={{ fontSize: '1.5rem', color: '#88ddff' }}>{impactoTotal.toFixed(1)}</div>
              <div>kg CO₂ evitados</div>
            </div>
            <div className="indicador-card">
              <div style={{ fontSize: '1.5rem', color: '#ffd700' }}>{racha}</div>
              <div>Días de racha</div>
            </div>
          </div>
        </div>

        <div className="codigo-card">
          <div>🪞 Huella Energética Registrada</div>
          <div className="codigo-text">{codigoGuardian}</div>
          <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>Código de Guardián Cósmico</div>
        </div>

        <h2 style={{ textAlign: 'center', margin: '20px 0' }}>🌎 HEPTAGRAMA GAIA - ESTADO PLANETARIO</h2>
        <div className="metricas-grid">
          {!loading && renderMetricas()}
        </div>

        {/* NUEVO: BLOQUE ODS */}
        {!loading && renderODSBlock()}

        <div style={{ textAlign: 'center', margin: '30px 0' }}>
          <button className="btn-registrar" onClick={() => setModalAbierto(true)}>
            📝 REGISTRAR MI IMPACTO HOY
          </button>
        </div>

        <div style={{ textAlign: 'center' }}>
          <button className="btn-volver" onClick={() => window.location.href = '/'}>
            Volver al Umbral
          </button>
        </div>
      </div>

      {modalAbierto && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>📝 REGISTRAR HÁBITO</h2>
            <select className="modal-select" value={habitoSeleccionado} onChange={e => setHabitoSeleccionado(e.target.value)}>
              <option value="">Selecciona un hábito</option>
              {habitosLista.map(h => (
                <option key={h.id} value={h.id}>{h.nombre} ({h.impacto} kg CO₂ aprox)</option>
              ))}
            </select>
            <input type="number" className="modal-input" value={impactoRegistro} onChange={e => setImpactoRegistro(parseFloat(e.target.value))} step="0.1" min="0" placeholder="Impacto CO₂ (kg)" />
            <select className="modal-select" value={nivelConciencia} onChange={e => setNivelConciencia(parseInt(e.target.value))}>
              <option value="1">1 - Automático</option>
              <option value="2">2 - Consciente</option>
              <option value="3">3 - Intencional</option>
              <option value="4">4 - Comprometido</option>
              <option value="5">5 - Integral</option>
            </select>
            <textarea className="modal-textarea" placeholder="Notas (opcional)" value={notasRegistro} onChange={e => setNotasRegistro(e.target.value)} rows={3} />
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button className="btn-registrar" onClick={registrarHabito} style={{ flex: 1 }}>💾 GUARDAR</button>
              <button className="btn-volver" onClick={() => setModalAbierto(false)} style={{ flex: 1 }}>CANCELAR</button>
            </div>
          </div>
        </div>
      )}

      <script dangerouslySetInnerHTML={{ __html: `
        const canvas = document.getElementById('particles-canvas');
        const ctx = canvas.getContext('2d');
        let particles = [];
        function resizeCanvas() {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
        }
        function initParticles() {
          particles = [];
          for(let i = 0; i < 100; i++) {
            particles.push({
              x: Math.random() * canvas.width,
              y: Math.random() * canvas.height,
              radius: Math.random() * 2 + 1,
              speedX: (Math.random() - 0.5) * 0.5,
              speedY: (Math.random() - 0.5) * 0.5
            });
          }
        }
        function animate() {
          if (!ctx) return;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.fillStyle = '#00e0ff';
          particles.forEach(p => {
            p.x += p.speedX;
            p.y += p.speedY;
            if (p.x < 0) p.x = canvas.width;
            if (p.x > canvas.width) p.x = 0;
            if (p.y < 0) p.y = canvas.height;
            if (p.y > canvas.height) p.y = 0;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fill();
          });
          requestAnimationFrame(animate);
        }
        window.addEventListener('resize', () => { resizeCanvas(); initParticles(); });
        resizeCanvas();
        initParticles();
        animate();
      ` }} />
    </div>
  )
}

function determinarEstado(metrica: any): string {
  const slug = metrica.slug
  const valor = parseFloat(metrica.valor_actual)
  if (slug === 'aire' && valor >= 429) return 'critico'
  if (slug === 'temperatura' && valor >= 1.1) return 'critico'
  if (slug === 'hielo_antartida' && valor <= -150) return 'critico'
  if (slug === 'nivel_mar' && valor >= 104.5) return 'critico'
  if (slug === 'hielo_artico' && valor <= 4.3) return 'critico'
  if (slug === 'oceano' && valor >= 2.1) return 'critico'
  if (slug === 'biodiversidad' && valor <= -73) return 'critico'
  return metrica.tendencia === 'ascendente' ? 'alerta' : 'precaucion'
}

function obtenerIcono(slug: string): string {
  const iconos: Record<string, string> = {
    aire: '🏭', temperatura: '🌡️', hielo_antartida: '❄️', nivel_mar: '🌊', hielo_artico: '🌿', oceano: '💧', biodiversidad: '🌳'
  }
  return iconos[slug] || '❓'
}
 export default function GuardianGaiaPage() {
  return (
    <Suspense fallback={<div style={{minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#05070a', color:'#94a3b8'}}>Cargando sistema Gaia...</div>}>

      <GuardianGaiaContent />

    </Suspense>

  )
  }



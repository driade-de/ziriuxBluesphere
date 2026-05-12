'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'

// Configuración de Supabase (misma que en el portal)
const supabaseUrl = "https://ophicpcbgdgzthjamzoz.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9waGljcGNiZ2RnenRoamFtem96Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ3MjgwMzUsImV4cCI6MjA4MDMwNDAzNX0.K55Tk-cdbAFDOtGrIMN7vYFaJAccrsD6UdOrARt1P5c"

const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Mapeo de hábitos a impacto directo (kg CO₂ evitados aprox)
const IMPACTOS: Record<string, number> = {
  menos_plastico: 2.0,
  transporte_limpio: 3.5,
  limpieza_playas: 10.0,
  reparar_objetos: 2.0,
  compostaje: 6.0,
  ahorro_agua: 3.0,
  gestion_residuos: 5.0,
  sin_desperdicio: 4.0,
  cosmetica_natural: 2.5,
  energia_ahorro: 3.0,
  consumo_local: 3.5,
  reforestacion: 8.0,
  dia_sin_carne: 4.5,
  polinizadores: 5.0,
  comercio_justo: 3.0,
  activismo_digital: 1.5,
  digital_limpio: 1.0,
  formacion_ambiental: 2.0,
  voluntariado: 4.0,
  sanacion_ancestral: 7.0,
  legado_sietegeneracional: 9.0,
  pacto_reciprocidad: 6.0,
  observacion_silenciosa: 0.0,
  empatia_sistemica: 0.0,
  gratitud_radical: 0.0
}

// Intenciones semanales rotativas
const INTENCIONES = [
  "REGENERAR LOS CICLOS DEL AGUA Y SANAR LA MEMORIA HÍDRICA",
  "FORTALECER LA RED DE POLINIZADORES Y SERES ALADOS",
  "REGENERAR SUELOS Y COMPLETAR CICLOS DE NUTRIENTES",
  "REDUCIR LA CARGA ENERGÉTICA DEL SISTEMA PLANETARIO",
  "SANAR RELACIONES ENTRE COMUNIDADES HUMANAS Y NO-HUMANAS",
  "ACTIVAR MEMORIA ANCESTRAL DE CONVIVENCIA CON LA TIERRA"
]

// Lista completa de hábitos con sus valores y etiquetas
const HABITOS = [
  { id: 'menos_plastico', label: 'Reducción Plásticos', icon: '🥤', categoria: 'basico', chakra: 'Raíz', descripcion: 'Chakra Raíz • Obras Fide' },
  { id: 'transporte_limpio', label: 'Transporte Sagrado', icon: '🚲', categoria: 'basico', chakra: 'Raíz', descripcion: 'Chakra Raíz • Obras Fide' },
  { id: 'limpieza_playas', label: 'Limpieza Ceremonial de Costas', icon: '🏖️', categoria: 'basico', chakra: 'Raíz', descripcion: 'Chakra Raíz • Sanación Espacios' },
  { id: 'reparar_objetos', label: 'Kintsugi / Reparar', icon: '🧩', categoria: 'basico', chakra: 'Raíz', descripcion: 'Chakra Raíz • Obras Fide' },
  { id: 'compostaje', label: 'Alquimia de Residuos Cocina', icon: '🪱', categoria: 'basico', chakra: 'Sacro', descripcion: 'Chakra Sacro • Ciclo Cerrado' },
  { id: 'ahorro_agua', label: 'Bendición del Agua', icon: '💧', categoria: 'basico', chakra: 'Sacro', descripcion: 'Chakra Sacro • Obras Serra' },
  { id: 'gestion_residuos', label: 'Gestión Consciente de Residuos', icon: '🗑️', categoria: 'basico', chakra: 'Raíz', descripcion: 'Chakra Raíz • 5R Sagradas' },
  { id: 'sin_desperdicio', label: 'Eucaristía Alimentaria', icon: '🥗', categoria: 'basico', chakra: 'Sacro', descripcion: 'Chakra Sacro • Obras Serra' },
  { id: 'cosmetica_natural', label: 'Ungüentos Naturales', icon: '🧴', categoria: 'basico', chakra: 'Sacro', descripcion: 'Chakra Sacro • Obras Serra' },
  { id: 'energia_ahorro', label: 'Meditación Energética', icon: '🔋', categoria: 'basico', chakra: 'Plexo', descripcion: 'Chakra Plexo • Obras Trades' },
  { id: 'consumo_local', label: 'Compra Voto Sagrado', icon: '🛒', categoria: 'basico', chakra: 'Plexo', descripcion: 'Chakra Plexo • Obras Serra' },
  { id: 'reforestacion', label: 'Plantación Ceremonial', icon: '🌳', categoria: 'basico', chakra: 'Corazón', descripcion: 'Chakra Corazón • Obras Correos' },
  { id: 'dia_sin_carne', label: 'Ayuno de Compasión', icon: '🌿', categoria: 'basico', chakra: 'Corazón', descripcion: 'Chakra Corazón • Obras Correos' },
  { id: 'polinizadores', label: 'Santuario Abejas', icon: '🐝', categoria: 'basico', chakra: 'Corazón', descripcion: 'Chakra Corazón • Obras Correos' },
  { id: 'comercio_justo', label: 'Comercio Justo', icon: '🤝', categoria: 'basico', chakra: 'Corazón', descripcion: 'Chakra Corazón • Obras Correos' },
  { id: 'activismo_digital', label: 'Evangelio Digital', icon: '📢', categoria: 'basico', chakra: 'Garganta', descripcion: 'Chakra Garganta • Torre Ojo' },
  { id: 'digital_limpio', label: 'Silencio Digital', icon: '📵', categoria: 'basico', chakra: 'Tercer Ojo', descripcion: 'Tercer Ojo • Obras Gergétas' },
  { id: 'formacion_ambiental', label: 'Transmisión Sabiduría', icon: '📚', categoria: 'basico', chakra: 'Tercer Ojo', descripcion: 'Tercer Ojo • Obras Gergétas' },
  { id: 'voluntariado', label: 'Servicio Sagrado', icon: '🙌', categoria: 'basico', chakra: 'Corona', descripcion: 'Chakra Corona • Obras Correos' },
  { id: 'sanacion_ancestral', label: 'Sanación de Memoria Ecológica', icon: '🕊️', categoria: 'avanzado', chakra: 'Tiempo Profundo', descripcion: 'Reparación del Pasado • Tiempo Profundo' },
  { id: 'legado_sietegeneracional', label: 'Legado Sietegeneracional', icon: '🌳', categoria: 'avanzado', chakra: 'Tiempo Profundo', descripcion: 'Siembra del Futuro • Tiempo Profundo' },
  { id: 'pacto_reciprocidad', label: 'Pacto de Reciprocidad con Especie', icon: '🤲', categoria: 'avanzado', chakra: 'Alianza Sagrada', descripcion: 'Conexión No-Humana • Alianza Sagrada' },
  { id: 'observacion_silenciosa', label: 'Modo Observación Silenciosa', icon: '🌀', categoria: 'estados', chakra: 'No-Hacer', descripcion: 'Estado de Ser • No-Hacer' },
  { id: 'empatia_sistemica', label: 'Empatía Sistémica Activa', icon: '🌐', categoria: 'estados', chakra: 'Conexión', descripcion: 'Estado de Ser • Conexión' },
  { id: 'gratitud_radical', label: 'Gratitud Radical por lo Existente', icon: '🙏', categoria: 'estados', chakra: 'Reconocimiento', descripcion: 'Estado de Ser • Reconocimiento' }
]

export default function SeguimientoPage() {
  const searchParams = useSearchParams()
  const codigoURL = searchParams.get('codigo') || ''
  const [codigo, setCodigo] = useState(codigoURL)
  const [codigoValidado, setCodigoValidado] = useState(false)
  const [cargando, setCargando] = useState(false)
  const [mensajeError, setMensajeError] = useState('')
  const [habitiosSeleccionados, setHabitiosSeleccionados] = useState<Set<string>>(new Set())
  const [habitiosBloqueados, setHabitiosBloqueados] = useState<Set<string>>(new Set())
  const [comentario, setComentario] = useState('')
  const [modoObservacion, setModoObservacion] = useState(false)
  const [impactoDirecto, setImpactoDirecto] = useState(0)
  const [impactoSistemico, setImpactoSistemico] = useState(0)
  const [sincroniaColectiva, setSincroniaColectiva] = useState(0)
  const [intencionActiva, setIntencionActiva] = useState('')
  const [registroExitoso, setRegistroExitoso] = useState(false)
  const [categoriaActiva, setCategoriaActiva] = useState<'basico' | 'avanzado' | 'estados'>('basico')
  const [reloj, setReloj] = useState('')
  const [fecha, setFecha] = useState('')
  const [cicloDia, setCicloDia] = useState('')
  const [progresoDia, setProgresoDia] = useState(0)

  // Cargar hábitos registrados hoy al validar código
  useEffect(() => {
    if (codigoURL) {
      validarCodigo(codigoURL)
    }
    const interval = setInterval(() => actualizarReloj(), 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (codigoValidado) {
      cargarHabitosDelDia()
    }
  }, [codigoValidado])

  useEffect(() => {
    calcularImpactos()
  }, [habitiosSeleccionados])

  useEffect(() => {
    // Rotar intención semanal
    const semana = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 1).getTime()) / (1000 * 60 * 60 * 24 * 7))
    setIntencionActiva(INTENCIONES[semana % INTENCIONES.length])
  }, [])

  const actualizarReloj = () => {
    const ahora = new Date()
    setReloj(ahora.toLocaleTimeString('es-ES', { hour12: false }))
    setFecha(ahora.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' }).toUpperCase())
    const hora = ahora.getHours()
    if (hora >= 5 && hora < 12) setCicloDia('🌅 AMANECER RADIANTE')
    else if (hora >= 12 && hora < 18) setCicloDia('☀️ CENIT DE CONCIENCIA')
    else if (hora >= 18 && hora < 21) setCicloDia('🌆 ATARDECER SAGRADO')
    else setCicloDia('🌌 REGENERACIÓN NOCTURNA')
    setProgresoDia((hora * 60 + ahora.getMinutes()) / 1440 * 100)
  }

  const validarCodigo = async (codigoValidar: string) => {
    const codigoFinal = codigoValidar.trim().toUpperCase()
    if (!codigoFinal) {
      setMensajeError('Ingresa tu código de guardián')
      return
    }
    setCargando(true)
    let tabla = '', columna = ''
    if (codigoFinal.startsWith('GPR')) { tabla = 'codigos_gpr'; columna = 'codigo' }
    else if (codigoFinal.startsWith('CORP') || codigoFinal.startsWith('TITAN')) { tabla = 'codigos_corp'; columna = 'codigo_completo' }
    else { tabla = 'codigos_gpr'; columna = 'codigo' }
    const { data, error } = await supabase.from(tabla).select('*').eq(columna, codigoFinal).single()
    setCargando(false)
    if (error || !data) {
      setMensajeError('❌ Código no reconocido en el campo cuántico')
      setCodigoValidado(false)
    } else {
      setCodigoValidado(true)
      setCodigo(codigoFinal)
      setMensajeError('')
    }
  }

  const cargarHabitosDelDia = async () => {
    if (!codigo) return
    const hoy = new Date()
    const inicioDia = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate(), 0, 0, 0)
    const { data, error } = await supabase
      .from('seguimiento')
      .select('acciones_realizadas')
      .eq('codigo_guardian', codigo)
      .gte('fecha_reporte', inicioDia.toISOString())
    if (error) {
      console.error('Error cargando hábitos del día:', error)
      return
    }
    const bloqueados = new Set<string>()
    data?.forEach(reg => {
      if (reg.acciones_realizadas) {
        reg.acciones_realizadas.split(', ').forEach((h: string) => bloqueados.add(h))
      }
    })
    setHabitiosBloqueados(bloqueados)
  }

  const toggleHabito = (id: string) => {
    if (habitiosBloqueados.has(id)) return
    const newSet = new Set(habitiosSeleccionados)
    if (newSet.has(id)) newSet.delete(id)
    else newSet.add(id)
    setHabitiosSeleccionados(newSet)
  }

  const calcularImpactos = () => {
    let directo = 0
    let obs = false
    let basicos = 0, avanzados = 0, estados = 0
    habitiosSeleccionados.forEach(id => {
      const impacto = IMPACTOS[id] || 0
      directo += impacto
      if (id === 'observacion_silenciosa') obs = true
      if (id.includes('sanacion') || id.includes('legado') || id.includes('pacto')) avanzados++
      else if (id.includes('observacion') || id.includes('empatia') || id.includes('gratitud')) estados++
      else basicos++
    })
    setModoObservacion(obs)
    setImpactoDirecto(directo)
    let sistemico = basicos * 1 + avanzados * 3 + estados * 2
    if (obs) sistemico *= 1.5
    setImpactoSistemico(sistemico)
    const sinc = Math.min(100, Math.floor((basicos / 18) * 100))
    setSincroniaColectiva(sinc)
  }

  const registrarPulso = async () => {
    if (!codigoValidado) {
      alert('Primero valida tu código de guardián')
      return
    }
    if (habitiosSeleccionados.size === 0 && !modoObservacion) {
      alert('Selecciona al menos una ofrenda (acción o estado de ser)')
      return
    }
    setCargando(true)
    const acciones = Array.from(habitiosSeleccionados).join(', ')
    const { error } = await supabase.from('seguimiento').insert({
      codigo_guardian: codigo,
      acciones_realizadas: acciones,
      impacto_directo: impactoDirecto,
      impacto_sistemico: impactoSistemico,
      modo_observacion: modoObservacion,
      intencion_sincronizada: intencionActiva,
      comentario: comentario,
      fecha_reporte: new Date().toISOString()
    })
    setCargando(false)
    if (error) {
      alert('Error al registrar: ' + error.message)
    } else {
      setRegistroExitoso(true)
      // Bloquear hábitos seleccionados
      const nuevosBloqueados = new Set(habitiosBloqueados)
      habitiosSeleccionados.forEach(h => nuevosBloqueados.add(h))
      setHabitiosBloqueados(nuevosBloqueados)
      setHabitiosSeleccionados(new Set())
      setComentario('')
      setTimeout(() => setRegistroExitoso(false), 4000)
    }
  }

  if (!codigoValidado) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#05070a',
        color: '#ffffff',
        fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
        padding: '40px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          maxWidth: '500px',
          background: 'rgba(0,0,0,0.4)',
          backdropFilter: 'blur(12px)',
          borderRadius: '32px',
          padding: '48px 32px',
          border: '1px solid rgba(100,200,255,0.2)',
          textAlign: 'center'
        }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '20px', color: '#88ddff' }}>Ritual de Seguimiento Cuántico</h1>
          <p style={{ marginBottom: '24px' }}>🔐 Ingresa tu código de guardián para acceder</p>
          <input
            type="text"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            placeholder="Ej: GPR-AQUA-ZIRIUX-000000"
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: '12px',
              background: 'rgba(0,0,0,0.6)',
              border: '1px solid rgba(100,200,255,0.4)',
              color: '#fff',
              marginBottom: '16px'
            }}
          />
          {mensajeError && <p style={{ color: '#ef4444', marginBottom: '16px' }}>{mensajeError}</p>}
          <button
            onClick={() => validarCodigo(codigo)}
            disabled={cargando}
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: '40px',
              background: 'linear-gradient(135deg, #3b82f6, #22c55e)',
              border: 'none',
              color: '#fff',
              fontWeight: 600,
              cursor: cargando ? 'not-allowed' : 'pointer',
              opacity: cargando ? 0.7 : 1
            }}
          >
            {cargando ? 'VALIDANDO...' : '⚡ INGRESAR AL RITUAL'}
          </button>
        </div>
      </div>
    )
  }

  // Vista del ritual (acceso concedido)
  const habitosFiltrados = HABITOS.filter(h => h.categoria === categoriaActiva)
  const totalSeleccionados = habitiosSeleccionados.size
  const totalBloqueados = habitiosBloqueados.size
  const totalCompletados = totalSeleccionados + totalBloqueados

  return (
    <div style={{
      minHeight: '100vh',
      background: '#05070a',
      color: '#ffffff',
      fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
      padding: '40px 20px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        background: 'rgba(0,0,0,0.4)',
        backdropFilter: 'blur(12px)',
        borderRadius: '32px',
        padding: '48px 32px',
        border: '1px solid rgba(100,200,255,0.2)'
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          textAlign: 'center',
          background: 'linear-gradient(135deg, #fff, #88ddff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '10px'
        }}>🌍 RITUAL DE SEGUIMIENTO CUÁNTICO</h1>
        <p style={{ textAlign: 'center', opacity: 0.7, marginBottom: '30px' }}>
          SISTEMA NERVIOSO PLANETARIO ACTIVO • MODO SINCRONIZADO
        </p>

        {/* Intención sincronizada */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(157,78,221,0.1), rgba(0,196,255,0.1))',
          border: '1px solid #9d4edd',
          borderRadius: '24px',
          padding: '20px',
          marginBottom: '30px',
          textAlign: 'center'
        }}>
          <div style={{ fontStyle: 'italic', marginBottom: '8px' }}>🌀 Esta semana, todos nuestros pulsos están enfocados en:</div>
          <div style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#9d4edd' }}>{intencionActiva}</div>
          <div style={{ fontSize: '0.8rem', opacity: 0.6, marginTop: '8px' }}>
            Sincronía colectiva activa: <span style={{ color: '#22c55e' }}>{Math.floor(1247 * (sincroniaColectiva / 100))}</span> guardianes resonando
          </div>
        </div>

        {/* Panel de código */}
        <div style={{
          background: 'rgba(0,0,0,0.3)',
          borderRadius: '16px',
          padding: '16px',
          marginBottom: '30px',
          border: '1px solid rgba(100,200,255,0.2)'
        }}>
          <div style={{ color: '#88ddff', fontWeight: 'bold', marginBottom: '8px' }}>🔮 CÓDIGO DE GUARDIÁN</div>
          <div style={{ fontFamily: 'monospace', fontSize: '1.1rem' }}>{codigo}</div>
        </div>

        {/* Pestañas de categorías */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '30px', flexWrap: 'wrap' }}>
          {[
            { id: 'basico', label: '🌿 18 HÁBITOS BÁSICOS' },
            { id: 'avanzado', label: '🔥 3 HÁBITOS AVANZADOS' },
            { id: 'estados', label: '💫 ESTADOS DE SER' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setCategoriaActiva(tab.id as any)}
              style={{
                padding: '10px 20px',
                borderRadius: '30px',
                background: categoriaActiva === tab.id ? 'rgba(100,200,255,0.2)' : 'rgba(255,255,255,0.05)',
                border: `1px solid ${categoriaActiva === tab.id ? '#88ddff' : 'rgba(100,200,255,0.3)'}`,
                color: '#fff',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Contador de progreso */}
        <div style={{
          background: 'rgba(0,0,0,0.3)',
          borderRadius: '16px',
          padding: '16px',
          marginBottom: '30px',
          border: `1px solid ${totalCompletados === 21 ? '#22c55e' : totalCompletados >= 18 ? '#ffb74d' : 'rgba(100,200,255,0.2)'}`
        }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', alignItems: 'baseline' }}>
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#88ddff' }}>{totalCompletados}</span>
            <span>/21 hábitos hoy</span>
          </div>
          <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', marginTop: '12px' }}>
            <div style={{ height: '100%', width: `${(totalCompletados / 21) * 100}%`, background: 'linear-gradient(90deg, #22c55e, #88ddff)', borderRadius: '2px' }} />
          </div>
          <div style={{ fontSize: '0.75rem', textAlign: 'center', marginTop: '8px', opacity: 0.6 }}>
            🌿 {HABITOS.filter(h => h.categoria === 'basico').filter(h => habitiosSeleccionados.has(h.id) || habitiosBloqueados.has(h.id)).length}/18 •
            🔥 {HABITOS.filter(h => h.categoria === 'avanzado').filter(h => habitiosSeleccionados.has(h.id) || habitiosBloqueados.has(h.id)).length}/3 •
            💫 {HABITOS.filter(h => h.categoria === 'estados').filter(h => habitiosSeleccionados.has(h.id) || habitiosBloqueados.has(h.id)).length}/3
          </div>
        </div>

        {/* Grid de hábitos */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '12px',
          marginBottom: '30px'
        }}>
          {habitosFiltrados.map(habito => {
            const isChecked = habitiosSeleccionados.has(habito.id)
            const isBlocked = habitiosBloqueados.has(habito.id)
            const isObservation = habito.id === 'observacion_silenciosa'
            return (
              <div
                key={habito.id}
                onClick={() => !isBlocked && toggleHabito(habito.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  background: isChecked ? 'rgba(0,255,170,0.15)' : (isBlocked ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.05)'),
                  border: `1px solid ${isChecked ? '#22c55e' : (isBlocked ? 'rgba(100,200,255,0.1)' : 'rgba(100,200,255,0.2)')}`,
                  borderRadius: '16px',
                  padding: '12px',
                  cursor: isBlocked ? 'default' : 'pointer',
                  opacity: isBlocked ? 0.5 : 1,
                  position: 'relative',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{ fontSize: '1.8rem' }}>{habito.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 'bold' }}>{habito.label}</div>
                  <div style={{ fontSize: '0.7rem', opacity: 0.6 }}>{habito.descripcion}</div>
                </div>
                {isChecked && <div style={{ color: '#22c55e', fontSize: '1.2rem' }}>✓</div>}
                {isBlocked && <div style={{ fontSize: '0.7rem', color: '#88ddff', position: 'absolute', top: '4px', right: '8px' }}>✅ HOY</div>}
              </div>
            )
          })}
        </div>

        {/* Reloj circadiano */}
        <div style={{
          background: 'rgba(0,0,0,0.3)',
          borderRadius: '20px',
          padding: '20px',
          marginBottom: '30px',
          textAlign: 'center',
          border: '1px solid rgba(0,255,170,0.2)'
        }}>
          <div style={{ fontSize: '2.5rem', fontWeight: '200', letterSpacing: '-2px' }}>{reloj}</div>
          <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>{fecha}</div>
          <div style={{ fontSize: '0.9rem', marginTop: '8px', color: '#88ddff' }}>{cicloDia}</div>
          <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', marginTop: '12px' }}>
            <div style={{ height: '100%', width: `${progresoDia}%`, background: 'linear-gradient(90deg, #88ddff, #22c55e)', borderRadius: '2px' }} />
          </div>
        </div>

        {/* Panel de impacto */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '16px',
          marginBottom: '30px'
        }}>
          <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '16px', padding: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>IMPACTO DIRECTO</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#22c55e' }}>{impactoDirecto.toFixed(1)}</div>
            <div style={{ fontSize: '0.7rem' }}>kg CO₂ evitados</div>
          </div>
          <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '16px', padding: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>IMPACTO SISTÉMICO</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#88ddff' }}>{impactoSistemico.toFixed(1)}</div>
            <div style={{ fontSize: '0.7rem' }}>puntos de regeneración</div>
          </div>
          <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '16px', padding: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>SINCRONÍA COLECTIVA</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#fbbf24' }}>{sincroniaColectiva}%</div>
            <div style={{ fontSize: '0.7rem' }}>alineación con intención</div>
          </div>
        </div>

        {/* Reflexión */}
        <div style={{ marginBottom: '30px' }}>
          <label style={{ display: 'block', marginBottom: '8px', opacity: 0.8 }}>📜 MENSAJE PARA EL CAMPO CUÁNTICO • REFLEXIÓN DE HOY</label>
          <textarea
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            rows={3}
            placeholder="Describe tu experiencia, sincronías percibidas, o el mensaje que envías hoy al sistema nervioso planetario..."
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: '16px',
              background: 'rgba(0,0,0,0.6)',
              border: '1px solid rgba(100,200,255,0.4)',
              color: '#fff',
              fontFamily: 'inherit'
            }}
          />
        </div>

        {/* Botón de registro */}
        <button
          onClick={registrarPulso}
          disabled={cargando}
          style={{
            width: '100%',
            padding: '16px',
            borderRadius: '40px',
            background: 'linear-gradient(135deg, #22c55e, #3b82f6)',
            border: 'none',
            color: '#fff',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            cursor: cargando ? 'not-allowed' : 'pointer',
            opacity: cargando ? 0.7 : 1,
            marginBottom: '20px'
          }}
        >
          {cargando ? 'SINCRONIZANDO...' : '⚡ ENVIAR PULSO CUÁNTICO AL SISTEMA NERVIOSO PLANETARIO'}
        </button>

        {registroExitoso && (
          <div style={{
            background: 'rgba(34,197,94,0.1)',
            border: '1px solid #22c55e',
            borderRadius: '16px',
            padding: '16px',
            textAlign: 'center',
            marginBottom: '20px'
          }}>
            <h3 style={{ color: '#22c55e' }}>🌀 PULSO CUÁNTICO REGISTRADO</h3>
            <p>Tu ofrenda ha sido codificada en el núcleo de BlueSphere y resonará en la red planetaria.</p>
            <p style={{ fontSize: '0.8rem' }}>Generando Reporte de Eco-Sincronía... (disponible en 24h)</p>
          </div>
        )}

        <div style={{ textAlign: 'center' }}>
          <button
            onClick={() => window.location.href = '/'}
            style={{
              background: 'transparent',
              border: '1px solid rgba(100,200,255,0.4)',
              borderRadius: '40px',
              padding: '10px 24px',
              color: '#88ddff',
              cursor: 'pointer'
            }}
          >
            Volver al Umbral
          </button>
        </div>
      </div>
    </div>
  )
}
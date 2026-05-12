'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://ophicpcbgdgzthjamzoz.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9waGljcGNiZ2RnenRoamFtem96Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ3MjgwMzUsImV4cCI6MjA4MDMwNDAzNX0.K55Tk-cdbAFDOtGrIMN7vYFaJAccrsD6UdOrARt1P5c"

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default function BibliotecaPage() {
  const searchParams = useSearchParams()
  const codigoUrl = searchParams.get('codigo') || ''
  const [codigo, setCodigo] = useState(codigoUrl)
  const [acceso, setAcceso] = useState(false)
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(false)
  const [mensajeCapsula, setMensajeCapsula] = useState('')
  const [anosCapsula, setAnosCapsula] = useState(10)

  // Validar el código al cargar la página si viene por URL
  useEffect(() => {
    if (codigoUrl) {
      validarAcceso(codigoUrl)
    }
  }, [codigoUrl])

  const validarAcceso = async (codigoValidar?: string) => {
    const codigoFinal = (codigoValidar || codigo).trim().toUpperCase()
    if (!codigoFinal) {
      setError('Ingresa tu código de guardián')
      return
    }
    setCargando(true)
    setError('')

    let tabla = ''
    let columna = ''
    if (codigoFinal.startsWith('GPR')) {
      tabla = 'codigos_gpr'
      columna = 'codigo'
    } else if (codigoFinal.startsWith('CORP') || codigoFinal.startsWith('TITAN')) {
      tabla = 'codigos_corp'
      columna = 'codigo_completo'
    } else {
      tabla = 'codigos_gpr'
      columna = 'codigo'
    }

    const { data, error } = await supabase
      .from(tabla)
      .select('*')
      .eq(columna, codigoFinal)
      .single()

    setCargando(false)

    if (error || !data) {
      setError('❌ Código no reconocido. Acceso denegado.')
      setAcceso(false)
    } else {
      setAcceso(true)
      setCodigo(codigoFinal)
    }
  }

  const sellarCapsula = async () => {
    if (!acceso) return
    if (!mensajeCapsula.trim()) {
      alert('Escribe un mensaje para el futuro.')
      return
    }
    if (anosCapsula < 10) {
      alert('El horizonte mínimo es 10 años.')
      return
    }

    const fechaRevelacion = new Date().getFullYear() + anosCapsula

    const { error: insertError } = await supabase
      .from('capsulas')
      .insert([{
        codigo_guardian: codigo,
        mensaje: mensajeCapsula.trim(),
        anos: anosCapsula,
        fecha_revelacion: new Date(fechaRevelacion, 0, 1).toISOString(),
        fecha_creacion: new Date().toISOString()
      }])

    if (insertError) {
      alert('Error al guardar la cápsula: ' + insertError.message)
    } else {
      alert(`✅ LEGADO SELLADO\n\nGuardián: ${codigo}\nRevelación: año ${fechaRevelacion}\n\n"El futuro ya no es incierto, porque tú has escrito en él."`)
      setMensajeCapsula('')
      setAnosCapsula(10)
    }
  }

  if (!acceso) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#05070a',
        color: '#fff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        fontFamily: "'Inter', sans-serif"
      }}>
        <div style={{
          maxWidth: '500px',
          width: '100%',
          background: 'rgba(0,0,0,0.4)',
          backdropFilter: 'blur(12px)',
          borderRadius: '32px',
          padding: '40px',
          border: '1px solid rgba(100,200,255,0.2)',
          textAlign: 'center'
        }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '20px', color: '#88ddff' }}>📚 Biblioteca BlueSphere</h1>
          <p style={{ marginBottom: '30px', opacity: 0.8 }}>Ingresa tu código de guardián para acceder al legado</p>
          <input
            type="text"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            placeholder="GPR-AQUA-ZIRIUX-000000"
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: '16px',
              background: 'rgba(0,0,0,0.6)',
              border: '1px solid rgba(100,200,255,0.4)',
              color: '#fff',
              marginBottom: '20px'
            }}
          />
          <button
            onClick={() => validarAcceso()}
            disabled={cargando}
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: '40px',
              background: 'linear-gradient(135deg, #3b82f6, #22c55e)',
              border: 'none',
              color: '#fff',
              fontWeight: 600,
              cursor: cargando ? 'not-allowed' : 'pointer'
            }}
          >
            {cargando ? 'VALIDANDO...' : 'DESBLOQUEAR ACCESO'}
          </button>
          {error && <p style={{ color: '#ef4444', marginTop: '20px' }}>{error}</p>}
        </div>
      </div>
    )
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#05070a',
      color: '#fff',
      fontFamily: "'Inter', sans-serif",
      padding: '40px 20px'
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
        <h1 style={{ fontSize: '2.5rem', textAlign: 'center', background: 'linear-gradient(135deg, #fff, #88ddff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '8px' }}>
          📚 Biblioteca BlueSphere
        </h1>
        <p style={{ textAlign: 'center', opacity: 0.7, marginBottom: '40px' }}>Conocimiento exclusivo para Guardianes del Pacto Azul</p>

        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{ display: 'inline-block', padding: '8px 24px', borderRadius: '40px', background: 'rgba(34,197,94,0.15)', border: '1px solid #22c55e', color: '#22c55e' }}>
            ✨ ACCESO CONCEDIDO · {codigo} ✨
          </div>
        </div>

        {/* Nota de Custodia */}
        <div style={{
          background: 'rgba(0,0,0,0.6)',
          borderRadius: '24px',
          padding: '30px',
          borderLeft: '4px solid #ffd700',
          marginBottom: '40px',
          textAlign: 'center'
        }}>
          <h3 style={{ color: '#ffd700', fontSize: '1.5rem', marginBottom: '16px' }}>🌱 NOTA DE CUSTODIA</h3>
          <p style={{ opacity: 0.8, maxWidth: '700px', margin: '0 auto' }}>
            Las obras disponibles en esta biblioteca corresponden a ediciones semilla, versiones de principios o legados conscientes.
            Su propósito no es la difusión inmediata, sino la siembra interior.
            Al descargar una obra, el Guardián acepta custodiar su contenido con respeto, evitando su difusión pública hasta su liberación oficial.
          </p>
          <p style={{ marginTop: '20px', fontSize: '1.2rem' }}><strong style={{ color: '#88ddff' }}>La biblioteca no entrega libros: confía conciencia.</strong></p>
        </div>

        {/* Grid de libros */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          marginBottom: '60px'
        }}>
          {[
            { title: '📘 500 Años Después', desc: 'La carta que el plástico escribió (y ningún humano vivirá para leer)', fecha: 'julio de 2026', file: '/libros/500-anos-despues.pdf' },
            { title: '🕊️ El Vuelo de la Conciencia y el Grito del Mar', desc: '(El Pacto Azul) · Primera Saga · Manifiesto ecológico y espiritual', fecha: '8 de junio de 2027', file: '/libros/saga-1.pdf' },
            { title: '📘 Saga II: El Vuelo', desc: 'Segunda Saga · Travesía Planetaria · Principios de conciencia y observación global', fecha: 'diciembre de 2027', file: '/libros/saga-2.pdf' },
            { title: '📘 Saga III: El Regalo del Futuro', desc: 'Tercera Saga · La Promesa de la Esfera Azul · Un legado para los niños y para el futuro del planeta', fecha: 'Edición viva', file: '/libros/saga-3.pdf' }
          ].map((libro, idx) => (
            <div key={idx} style={{
              background: 'rgba(0,0,0,0.6)',
              borderRadius: '24px',
              padding: '24px',
              border: '1px solid rgba(100,200,255,0.2)',
              transition: 'transform 0.2s',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <h3 style={{ fontSize: '1.3rem', color: '#88ddff', marginBottom: '12px' }}>{libro.title}</h3>
              <p style={{ opacity: 0.8, marginBottom: '12px', flexGrow: 1 }}>{libro.desc}</p>
              <p style={{ fontSize: '0.8rem', opacity: 0.6, marginBottom: '20px' }}>📅 {libro.fecha}</p>
              <a href={libro.file} download style={{ textDecoration: 'none' }}>
                <button style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '40px',
                  background: 'linear-gradient(135deg, #22c55e, #3b82f6)',
                  border: 'none',
                  color: '#fff',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}>📥 Descargar versión semilla (PDF)</button>
              </a>
            </div>
          ))}
        </div>

        <hr style={{ borderColor: 'rgba(255,255,255,0.1)', margin: '40px 0' }} />

        {/* Cápsula del tiempo */}
        <div style={{
          padding: '40px',
          border: '2px dashed #88ddff',
          borderRadius: '32px',
          textAlign: 'center',
          background: 'rgba(100,200,255,0.02)'
        }}>
          <h2 style={{ fontSize: '2rem', color: '#ffd700', marginBottom: '16px' }}>🏺 EL LEGADO: CÁPSULAS DEL TIEMPO</h2>
          <p style={{ marginBottom: '30px', opacity: 0.8 }}>Tu Libre Albedrío es ahora tu herramienta más poderosa.<br />Siembra un mensaje para el futuro (mínimo 10 años).</p>
          <div style={{ maxWidth: '500px', margin: '0 auto' }}>
            <textarea
              value={mensajeCapsula}
              onChange={(e) => setMensajeCapsula(e.target.value)}
              placeholder="Escribe tu mensaje para el futuro..."
              rows={4}
              style={{
                width: '100%',
                padding: '14px',
                borderRadius: '16px',
                background: 'rgba(0,0,0,0.6)',
                border: '1px solid rgba(100,200,255,0.4)',
                color: '#fff',
                marginBottom: '16px'
              }}
            />
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '20px' }}>
              <label style={{ alignSelf: 'center' }}>Revelar en:</label>
              <input
                type="number"
                value={anosCapsula}
                onChange={(e) => setAnosCapsula(parseInt(e.target.value) || 10)}
                min={10}
                step={1}
                style={{
                  width: '80px',
                  padding: '10px',
                  borderRadius: '12px',
                  background: 'rgba(0,0,0,0.6)',
                  border: '1px solid rgba(100,200,255,0.4)',
                  color: '#fff',
                  textAlign: 'center'
                }}
              />
              <span>años</span>
            </div>
            <button
              onClick={sellarCapsula}
              style={{
                padding: '14px 32px',
                borderRadius: '40px',
                background: 'linear-gradient(135deg, #ffd700, #f59e0b)',
                border: 'none',
                color: '#000',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              SELLAR MENSAJE AL FUTURO
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
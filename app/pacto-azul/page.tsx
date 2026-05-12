'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://ophicpcbgdgzthjamzoz.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9waGljcGNiZ2RnenRoamFtem96Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ3MjgwMzUsImV4cCI6MjA4MDMwNDAzNX0.K55Tk-cdbAFDOtGrIMN7vYFaJAccrsD6UdOrARt1P5c"

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default function PactoAzulPage() {
  const [fase, setFase] = useState<'codigo' | 'ritual' | 'exito'>('codigo')
  const [codigo, setCodigo] = useState('')
  const [tipo, setTipo] = useState<'GPR' | 'CORP'>('GPR')
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [pais, setPais] = useState('')
  const [intencion, setIntencion] = useState('')
  const [muro, setMuro] = useState<{ nombre: string; fecha: string }[]>([])
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState('')
  const [codigoValidado, setCodigoValidado] = useState('')

  const cargarMuro = async () => {
    const { data, error } = await supabase
      .from('firmantes')
      .select('nombre, fecha_firma')
      .order('fecha_firma', { ascending: false })
      .limit(25)
    if (!error && data) {
      setMuro(data.map(item => ({ nombre: item.nombre, fecha: item.fecha_firma })))
    }
  }

  useEffect(() => {
    cargarMuro()
  }, [])

  const validarCodigo = async () => {
    setError('')
    if (!codigo.trim()) {
      setError('Ingresa tu código de guardián')
      return
    }
    setCargando(true)
    const codigoUpper = codigo.trim().toUpperCase()
    let tabla = ''
    let columna = ''
    if (codigoUpper.startsWith('GPR')) {
      tabla = 'codigos_gpr'
      columna = 'codigo'
    } else if (codigoUpper.startsWith('CORP') || codigoUpper.startsWith('TITAN')) {
      tabla = 'codigos_corp'
      columna = 'codigo_completo'
    } else {
      tabla = 'codigos_gpr'
      columna = 'codigo'
    }
    const { data, error } = await supabase
      .from(tabla)
      .select('*')
      .eq(columna, codigoUpper)
      .single()
    setCargando(false)
    if (error || !data) {
      setError('❌ Código no reconocido en el campo cuántico')
    } else {
      setCodigoValidado(codigoUpper)
      setFase('ritual')
    }
  }

  const sellarConexion = async () => {
    if (!nombre.trim()) {
      setError('El nombre de consciencia es obligatorio')
      return
    }
    setCargando(true)
    const { error } = await supabase
      .from('firmantes')
      .insert([{
        nombre: nombre.trim(),
        codigo_usado: codigoValidado,
        email: email.trim() || null,
        pais: pais || null,
        nota: intencion.trim() || null,
        fecha_firma: new Date().toISOString()
      }])
    setCargando(false)
    if (error) {
      setError('Error al guardar: ' + error.message)
    } else {
      await cargarMuro()
      setFase('exito')
    }
  }

  const volverAlUmbral = () => {
    window.location.href = '/'
  }

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
        background: 'rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(12px)',
        borderRadius: '32px',
        padding: '48px 32px',
        border: '1px solid rgba(100, 200, 255, 0.2)'
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          textAlign: 'center',
          background: 'linear-gradient(135deg, #fff, #88ddff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '8px'
        }}>EL PACTO AZUL</h1>
        <p style={{ textAlign: 'center', opacity: 0.6, letterSpacing: '2px', marginBottom: '40px' }}>
          ACTIVANDO SISTEMA NERVIOSO PLANETARIO
        </p>

        {fase === 'codigo' && (
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '24px' }}>
              <button onClick={() => setTipo('GPR')} style={{
                padding: '12px 24px', borderRadius: '40px',
                background: tipo === 'GPR' ? 'rgba(100,200,255,0.2)' : 'transparent',
                border: `1px solid ${tipo === 'GPR' ? '#88ddff' : 'rgba(100,200,255,0.3)'}`,
                color: '#fff', cursor: 'pointer'
              }}>👤 GPR (Individual)</button>
              <button onClick={() => setTipo('CORP')} style={{
                padding: '12px 24px', borderRadius: '40px',
                background: tipo === 'CORP' ? 'rgba(100,200,255,0.2)' : 'transparent',
                border: `1px solid ${tipo === 'CORP' ? '#88ddff' : 'rgba(100,200,255,0.3)'}`,
                color: '#fff', cursor: 'pointer'
              }}>🏢 CORP (Empresarial)</button>
            </div>
            <input type="text" value={codigo} onChange={(e) => setCodigo(e.target.value)}
              placeholder={`Ej: ${tipo}-AQUA-ZIRIUX-000050`}
              style={{ width: '100%', padding: '16px 20px', borderRadius: '16px', background: 'rgba(0,0,0,0.6)',
                border: '1px solid rgba(100,200,255,0.4)', color: '#fff', fontSize: '1rem', marginBottom: '24px' }} />
            {error && <p style={{ color: '#ef4444', marginBottom: '16px' }}>{error}</p>}
            <button onClick={validarCodigo} disabled={cargando}
              style={{ width: '100%', padding: '14px', borderRadius: '40px',
                background: 'linear-gradient(135deg, #3b82f6, #22c55e)', border: 'none', color: '#fff',
                fontWeight: 600, cursor: cargando ? 'not-allowed' : 'pointer', opacity: cargando ? 0.7 : 1 }}>
              {cargando ? 'VALIDANDO...' : '⚡ VALIDAR FIRMA ENERGÉTICA'}
            </button>
          </div>
        )}

        {fase === 'ritual' && (
          <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', color: '#88ddff', marginBottom: '24px' }}>🔮 RITUAL DE SINCRONIZACIÓN</h2>
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', marginBottom: '8px' }}>👁️ NOMBRE DE CONSCIENCIA *</label>
              <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)}
                placeholder="Como quieres resonar en la red..."
                style={{ width: '100%', padding: '14px', borderRadius: '12px', background: 'rgba(0,0,0,0.6)',
                  border: '1px solid rgba(100,200,255,0.4)', color: '#fff' }} />
            </div>
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', marginBottom: '8px' }}>✉️ CORREO DE RESONANCIA (Opcional)</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="Para recibir tu legado"
                style={{ width: '100%', padding: '14px', borderRadius: '12px', background: 'rgba(0,0,0,0.6)',
                  border: '1px solid rgba(100,200,255,0.4)', color: '#fff' }} />
            </div>
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', marginBottom: '8px' }}>🌍 FRECUENCIA GEOGRÁFICA (Opcional)</label>
              <select value={pais} onChange={(e) => setPais(e.target.value)}
                style={{ width: '100%', padding: '14px', borderRadius: '12px', background: 'rgba(0,0,0,0.6)',
                  border: '1px solid rgba(100,200,255,0.4)', color: '#fff' }}>
                <option value="">Selecciona tu nodo</option>
                <option value="MEX">México</option><option value="BRA">Brasil</option>
                <option value="ESP">España</option><option value="USA">USA</option>
              </select>
            </div>
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', marginBottom: '8px' }}>💫 SEMILLA DE INTENCIÓN (Opcional)</label>
              <textarea value={intencion} onChange={(e) => setIntencion(e.target.value)}
                placeholder="Planta una intención en el campo cuántico..." rows={3}
                style={{ width: '100%', padding: '14px', borderRadius: '12px', background: 'rgba(0,0,0,0.6)',
                  border: '1px solid rgba(100,200,255,0.4)', color: '#fff' }} />
            </div>
            <button onClick={sellarConexion} disabled={cargando}
              style={{ width: '100%', padding: '14px', borderRadius: '40px',
                background: 'linear-gradient(135deg, #22c55e, #3b82f6)', border: 'none', color: '#fff',
                fontWeight: 600, cursor: cargando ? 'not-allowed' : 'pointer', marginBottom: '16px' }}>
              {cargando ? 'SELLANDO...' : '🌟 SELLAR CONEXIÓN CUÁNTICA'}
            </button>
            <button onClick={volverAlUmbral}
              style={{ width: '100%', padding: '12px', borderRadius: '40px', background: 'transparent',
                border: '1px solid rgba(100,200,255,0.4)', color: '#88ddff', cursor: 'pointer' }}>
              Volver al Umbral
            </button>
          </div>
        )}

        {fase === 'exito' && (
          <div>
            <div style={{ background: 'rgba(0,0,0,0.6)', borderRadius: '24px', padding: '24px', marginBottom: '32px',
                border: '1px solid rgba(100,200,255,0.2)' }}>
              <h2 style={{ textAlign: 'center', color: '#88ddff', marginBottom: '24px' }}>TU RUTA DE INICIACIÓN COMPLETA</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px', marginBottom: '24px' }}>
                {[{ text: '1. Registro Eterno', completado: true }, { text: '2. Certificado Único', completado: false },
                  { text: '3. Biblioteca Sagrada', completado: false }, { text: '4. Hábitos Regenerativos', completado: false },
                  { text: '5. Dashboard Vivo', completado: false }, { text: '6. Parte de GAIA', completado: true }].map((step, idx) => (
                  <div key={idx} style={{ background: step.completado ? 'rgba(34,197,94,0.15)' : 'rgba(100,200,255,0.05)',
                      border: `1px solid ${step.completado ? '#22c55e' : 'rgba(100,200,255,0.3)'}`, borderRadius: '40px',
                      padding: '8px 20px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>{step.text}</span>
                    {step.completado ? <span style={{ color: '#22c55e' }}>✔</span> : <span style={{ color: '#88ddff' }}>→</span>}
                  </div>
                ))}
              </div>
              <p style={{ textAlign: 'center', opacity: 0.8, fontSize: '0.9rem' }}>
                Tu código <strong style={{ color: '#88ddff' }}>{codigoValidado}</strong> es ahora tu identidad en el ecosistema completo.<br />
                Cada paso que des activará nuevas capas del sistema nervioso planetario.
              </p>
            </div>

            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <div style={{ fontSize: '3rem', marginBottom: '8px' }}>🌊</div>
              <h2 style={{ color: '#22c55e', marginBottom: '8px' }}>¡BIENVENIDO GUARDIÁN!</h2>
              <p style={{ opacity: 0.7 }}>Tu firma ha sido sellada en el registro cuántico.<br />Ahora tienes acceso total al ecosistema BlueSphere.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px', marginBottom: '32px' }}>
              {[
                { icon: '📜', title: 'Certificado Digital', desc: 'Tu credencial única con nombre y código',
                  action: () => window.open(`/certificado?nombre=${encodeURIComponent(nombre)}&codigo=${encodeURIComponent(codigoValidado)}`, '_blank') },
                { icon: '📚', title: 'Biblioteca BlueSphere', desc: 'Manifiestos y conocimiento exclusivo',
                  action: () => window.open(`/biblioteca?codigo=${encodeURIComponent(codigoValidado)}`, '_blank') },
                { icon: '🔄', title: 'Seguimiento de Hábitos', desc: 'Monitorea tus 18 hábitos regenerativos',
                  action: () => window.open(`/seguimiento?codigo=${encodeURIComponent(codigoValidado)}`, '_blank') },
                { icon: '🛡️', title: 'Guardián Gaia', desc: 'Tu app personal de seguimiento',
                  action: () => window.open(`/guardian-gaia?codigo=${encodeURIComponent(codigoValidado)}`, '_blank') },
                  { icon: '🌍', title: 'Dashboard Global', desc: 'Sistema nervioso planetario en vivo',
                  action: () => alert('Dashboard (próximamente)') }
              ].map((item, idx) => (
                <div key={idx} onClick={item.action} style={{
                  background: 'rgba(0,0,0,0.6)', borderRadius: '24px', padding: '24px 16px',
                  border: '1px solid rgba(100,200,255,0.3)', cursor: 'pointer', transition: 'all 0.2s', textAlign: 'center'
                }} onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(100,200,255,0.1)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                   onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(0,0,0,0.6)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>{item.icon}</div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '8px', color: '#88ddff' }}>{item.title}</h3>
                  <p style={{ fontSize: '0.8rem', opacity: 0.7 }}>{item.desc}</p>
                </div>
              ))}
            </div>

            <button onClick={volverAlUmbral}
              style={{ display: 'block', margin: '0 auto', padding: '12px 32px', borderRadius: '40px',
                background: 'transparent', border: '1px solid rgba(100,200,255,0.4)', color: '#88ddff', cursor: 'pointer' }}>
              Volver al Umbral
            </button>
          </div>
        )}

        <div style={{ marginTop: '60px', background: 'rgba(0,0,0,0.4)', borderRadius: '24px', padding: '24px',
            border: '1px solid rgba(100,200,255,0.2)' }}>
          <h3 style={{ textAlign: 'center', color: '#88ddff', marginBottom: '24px' }}>🌐 MURO DEL PACTO</h3>
          <button onClick={cargarMuro}
            style={{ display: 'block', margin: '0 auto 20px auto', padding: '8px 16px', borderRadius: '30px',
              background: 'transparent', border: '1px solid rgba(100,200,255,0.4)', color: '#88ddff', cursor: 'pointer' }}>
            🔄 Actualizar Resonancias
          </button>
          <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {muro.map((item, idx) => (
              <div key={idx} style={{ padding: '12px', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between' }}>
                <span>🌀 {item.nombre}</span>
                <span style={{ opacity: 0.5 }}>{new Date(item.fecha).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
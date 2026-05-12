'use client'

import { useState } from 'react'

export function MembershipSection() {
  const [guardianCode, setGuardianCode] = useState('')
  const [codeMessage, setCodeMessage] = useState('')

  const handleValidateCode = () => {
    // Aquí conectarás con Supabase para verificar el código
    if (guardianCode.trim() === '') {
      setCodeMessage('Por favor ingresa tu código.')
    } else {
      setCodeMessage('Validando... (conexión a Supabase pendiente)')
      // Simulación: alert('Código recibido: ' + guardianCode)
    }
  }

  return (
    <section style={{
      padding: '80px 20px',
      background: 'radial-gradient(ellipse at 50% 80%, rgba(59,130,246,0.08), transparent)'
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
        {/* Título principal */}
        <h2 style={{
          fontSize: '2rem',
          fontWeight: 500,
          letterSpacing: '2px',
          textAlign: 'center',
          marginBottom: '24px',
          color: '#88ddff'
        }}>
          La Llave a la Nueva Civilización
        </h2>
        <p style={{
          fontSize: '1rem',
          lineHeight: '1.6',
          textAlign: 'center',
          maxWidth: '800px',
          margin: '0 auto 40px auto',
          opacity: 0.8
        }}>
          Convertirse en Guardián no es una transacción, <br />
          <strong>es una declaración de responsabilidad consciente dentro de un sistema vivo en regeneración.</strong>
        </p>
        <p style={{
          fontSize: '0.95rem',
          lineHeight: '1.6',
          textAlign: 'center',
          maxWidth: '700px',
          margin: '0 auto 48px auto',
          opacity: 0.7
        }}>
          Al asumir este rol, accedes a herramientas diseñadas para comprender, custodiar y restaurar el equilibrio planetario, conectando tu conciencia individual con el impacto colectivo.
        </p>

        {/* Tarjetas de beneficios */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '32px',
          marginBottom: '64px'
        }}>
          {[
            { icon: '📚', title: 'Biblioteca BlueSphere', desc: 'Acceso a materiales vivos del sistema: libros, manifiestos y arquitecturas de conciencia creadas para guardianes activos del proceso de transición civilizatoria.' },
            { icon: '🎖️', title: 'Certificado de Participación en el Pacto Azul', desc: 'Registro simbólico y digital de tu compromiso consciente con la regeneración planetaria. No es un título ni una acreditación. Es una constancia ética dentro de un acuerdo vivo entre humanidad y Tierra.' },
            { icon: '📊', title: 'Dashboard de Impacto', desc: 'Visualización clara y transparente del impacto agregado de las acciones conscientes sostenidas por la comunidad. No mide méritos individuales. Refleja tendencias colectivas, equilibrio y evolución del sistema.' }
          ].map((benefit, idx) => (
            <div key={idx} style={{
              background: 'rgba(100,200,255,0.05)',
              borderRadius: '24px',
              padding: '28px 20px',
              border: '1px solid rgba(100,200,255,0.2)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '16px' }}>{benefit.icon}</div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 600, marginBottom: '16px', color: '#88ddff' }}>{benefit.title}</h3>
              <p style={{ fontSize: '0.85rem', opacity: 0.75, lineHeight: '1.5' }}>{benefit.desc}</p>
            </div>
          ))}
        </div>

        {/* Frase intermedia */}
        <div style={{
          textAlign: 'center',
          marginBottom: '48px',
          padding: '24px',
          background: 'rgba(34, 197, 94, 0.05)',
          borderRadius: '24px',
          border: '1px solid rgba(34, 197, 94, 0.2)'
        }}>
          <p style={{ fontSize: '1rem', opacity: 0.8 }}>
            Tu membresía no compra resultados, sostiene la posibilidad. <br />
            BlueSphere no promete salvaciones. Facilita estructura, información y coherencia para que la transformación ocurra de forma natural, científica y consciente.
          </p>
        </div>

        {/* Opciones de membresía */}
        <h3 style={{ fontSize: '1.6rem', fontWeight: 500, textAlign: 'center', marginBottom: '32px', color: '#88ddff' }}>
          Activa tu Membresía: Elige tu nivel de impacto
        </h3>
        <p style={{ textAlign: 'center', opacity: 0.7, marginBottom: '40px' }}>
          Tu suscripción activa el Protocolo de Homeostasis y te integra como Guardián Gaia con acceso completo a la red.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '32px',
          marginBottom: '48px'
        }}>
          {/* Stripe */}
          <div style={{
            background: 'rgba(0,0,0,0.6)',
            borderRadius: '24px',
            padding: '32px 24px',
            border: '1px solid rgba(100,200,255,0.3)',
            textAlign: 'center'
          }}>
            <h4 style={{ fontSize: '1.3rem', fontWeight: 600, marginBottom: '8px' }}>💳 Stripe (Internacional)</h4>
            <p style={{ fontSize: '1rem', marginBottom: '16px' }}><strong>Membresía Internacional Stripe</strong></p>
            <p style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fbbf24', marginBottom: '24px' }}>$10 USD <span style={{ fontSize: '0.8rem', fontWeight: 'normal' }}>(ajustable)</span></p>
            <button
              onClick={() => alert('Redirigiendo a Stripe...')}
              style={{
                background: 'rgba(100,200,255,0.1)',
                border: '1px solid #88ddff',
                borderRadius: '40px',
                padding: '10px 24px',
                color: '#88ddff',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#88ddff'; e.currentTarget.style.color = '#000'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(100,200,255,0.1)'; e.currentTarget.style.color = '#88ddff'; }}
            >
              Suscribirse con Stripe
            </button>
          </div>

          {/* Blockchain */}
          <div style={{
            background: 'rgba(0,0,0,0.6)',
            borderRadius: '24px',
            padding: '32px 24px',
            border: '1px solid rgba(100,200,255,0.3)',
            textAlign: 'center'
          }}>
            <h4 style={{ fontSize: '1.3rem', fontWeight: 600, marginBottom: '8px' }}>⛓️ Blockchain (Transparencia Total)</h4>
            <p style={{ fontSize: '0.9rem', marginBottom: '12px' }}>USDC / Polygon • Público • Sin fronteras</p>
            <p style={{
              fontSize: '0.8rem',
              background: 'rgba(0,0,0,0.6)',
              padding: '8px',
              borderRadius: '12px',
              wordBreak: 'break-all',
              fontFamily: 'monospace',
              marginBottom: '16px'
            }}>
              0x6231b3d3B0A740c418ec2Ad867eD9992A063D8c9
            </p>
            <a
              href="https://polygonscan.com/address/0x6231b3d3B0A740c418ec2Ad867eD9992A063D8c9"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#88ddff',
                fontSize: '0.8rem',
                textDecoration: 'underline',
                display: 'inline-block',
                marginBottom: '24px'
              }}
            >
              Ver en Polygonscan
            </a>
            <button
              onClick={() => alert('Copia la dirección para enviar USDC en Polygon')}
              style={{
                background: 'rgba(100,200,255,0.1)',
                border: '1px solid #88ddff',
                borderRadius: '40px',
                padding: '10px 24px',
                color: '#88ddff',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#88ddff'; e.currentTarget.style.color = '#000'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(100,200,255,0.1)'; e.currentTarget.style.color = '#88ddff'; }}
            >
              Copiar dirección
            </button>
          </div>
        </div>

        <div style={{
          textAlign: 'center',
          marginBottom: '40px',
          padding: '16px',
          background: 'rgba(255,255,255,0.02)',
          borderRadius: '24px'
        }}>
          <p style={{ fontSize: '0.9rem', opacity: 0.8, marginBottom: '8px' }}>
            ✅ <strong>Todos los métodos otorgan acceso completo como Guardián BlueSphere</strong>
          </p>
          <p style={{ fontSize: '0.8rem', opacity: 0.6 }}>
            Biblioteca • Certificado • Seguimiento • Dashboard
          </p>
        </div>

        {/* Validación de Código de Guardián */}
        <div style={{
          background: 'rgba(0,0,0,0.6)',
          borderRadius: '24px',
          padding: '32px',
          border: '1px solid rgba(100,200,255,0.2)',
          textAlign: 'center'
        }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 500, marginBottom: '16px' }}>¿Ya tienes tu Código de Guardián?</h3>
          <p style={{ fontSize: '0.85rem', opacity: 0.7, marginBottom: '24px' }}>
            Si ya realizaste tu aporte o recibiste tu código por correo, valida tu acceso aquí.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
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
              onClick={handleValidateCode}
              style={{
                padding: '12px 28px',
                borderRadius: '40px',
                border: '2px solid #22d3ee',
                background: 'transparent',
                color: '#22d3ee',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#22d3ee'; e.currentTarget.style.color = '#000'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#22d3ee'; }}
            >
              Ingresar al Portal del Pacto Azul
            </button>
          </div>
          {codeMessage && (
            <p style={{ marginTop: '16px', fontSize: '0.8rem', color: '#fbbf24' }}>{codeMessage}</p>
          )}
        </div>
      </div>
    </section>
  )
}
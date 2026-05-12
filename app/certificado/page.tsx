'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import QRCode from 'qrcode'

export default function CertificadoPage() {
  const searchParams = useSearchParams()
  const nombre = searchParams.get('nombre') || 'ZIRIUX PRUEBA'
  const codigo = searchParams.get('codigo') || 'BS-2025-1200'
  const [qrDataUrl, setQrDataUrl] = useState('')

  useEffect(() => {
    const verifyUrl = `https://www.bluesphereconsciousness.org/?validar=${codigo}`
    QRCode.toDataURL(verifyUrl, { width: 80, margin: 1 }, (err, url) => {
      if (!err) setQrDataUrl(url)
    })
  }, [codigo])

  const fechaActual = new Date().toLocaleDateString('es-ES', {
    day: 'numeric', month: 'long', year: 'numeric'
  })

  const handlePrint = () => {
    window.print()
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f0f0f0',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
      fontFamily: "'Georgia', serif"
    }}>
      <div style={{
        backgroundColor: '#fdfaf3',
        maxWidth: '850px',
        width: '100%',
        border: '15px solid #bc8f8f',
        borderRadius: '10px',
        padding: '40px',
        textAlign: 'center',
        backgroundImage: 'radial-gradient(#e5e0d5 1px, transparent 1px)',
        backgroundSize: '20px 20px'
      }}>
        <div style={{ fontSize: '0.9rem', letterSpacing: '2px', color: '#888', marginBottom: '10px' }}>BlueSphere</div>
        <h1 style={{ fontSize: '2.4rem', color: '#444', marginBottom: '5px' }}>Certificado de Compromiso Consciente</h1>
        <p style={{ fontSize: '1.2rem', color: '#6a994e', fontStyle: 'italic' }}>La ola que inicia en ti</p>
        <p style={{ fontSize: '1rem', margin: '10px 0', borderTop: '1px solid #ddd', borderBottom: '1px solid #ddd', padding: '5px 0' }}>— Pacto Azul de BlueSphere —</p>
        <div style={{ background: '#a0c4ff', color: 'white', padding: '5px 15px', borderRadius: '20px', display: 'inline-block', fontSize: '0.8rem', margin: '10px 0' }}>{codigo}</div>

        <p style={{ fontSize: '1.05rem', lineHeight: '1.6', margin: '20px 0', textAlign: 'justify' }}>
          Yo, <strong style={{ color: '#6a994e', textDecoration: 'underline' }}>{nombre}</strong>, como Guardián Consciente de BlueSphere, me comprometo activamente con la preservación de nuestro planeta y adopto los siguientes hábitos sostenibles como parte de mi contribución a un futuro más verde y equilibrado.
        </p>

        {/* Compromisos esenciales */}
        <div style={{ background: 'white', borderRadius: '10px', padding: '20px', marginBottom: '20px', textAlign: 'left', border: '1px solid #eee' }}>
          <div style={{ color: '#6a994e', fontWeight: 'bold', marginBottom: '15px', borderBottom: '1px solid #eee', paddingBottom: '5px' }}>🌿 Mis Compromisos Ambientales Esenciales</div>
          <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '12px', fontSize: '0.85rem' }}>
            <div style={{ fontSize: '1.4rem', marginRight: '15px', minWidth: '30px', textAlign: 'center' }}>🌊</div>
            <div><b>Reducción de Plásticos:</b> Eliminar el uso de plásticos de un solo uso y optar por alternativas reutilizables.</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '12px', fontSize: '0.85rem' }}>
            <div style={{ fontSize: '1.4rem', marginRight: '15px', minWidth: '30px', textAlign: 'center' }}>🚲</div>
            <div><b>Movilidad Sostenible:</b> Utilizar transporte público, bicicleta o caminar para desplazamientos cortos.</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '12px', fontSize: '0.85rem' }}>
            <div style={{ fontSize: '1.4rem', marginRight: '15px', minWidth: '30px', textAlign: 'center' }}>💧</div>
            <div><b>Conservación del Agua:</b> Implementar prácticas de ahorro de agua en el hogar.</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '12px', fontSize: '0.85rem' }}>
            <div style={{ fontSize: '1.4rem', marginRight: '15px', minWidth: '30px', textAlign: 'center' }}>🌱</div>
            <div><b>Consumo Responsable:</b> Elegir productos sostenibles y reducir el consumo innecesario.</div>
          </div>
        </div>

        {/* Compromisos complementarios */}
        <div style={{ background: 'white', borderRadius: '10px', padding: '20px', marginBottom: '20px', textAlign: 'left', borderLeft: '4px solid #e0ac42' }}>
          <div style={{ color: '#6a994e', fontWeight: 'bold', marginBottom: '15px', borderBottom: '1px solid #eee', paddingBottom: '5px' }}>🌟 Mis Compromisos Complementarios</div>
          <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '12px', fontSize: '0.85rem' }}>
            <div style={{ fontSize: '1.4rem', marginRight: '15px', minWidth: '30px', textAlign: 'center' }}>🍃</div>
            <div><b>Alimentación Consciente:</b> Reducir el consumo de carne y preferir productos locales y de temporada.</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '12px', fontSize: '0.85rem' }}>
            <div style={{ fontSize: '1.4rem', marginRight: '15px', minWidth: '30px', textAlign: 'center' }}>♻️</div>
            <div><b>Gestión de Residuos:</b> Practicar el reciclaje y el compostaje.</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '12px', fontSize: '0.85rem' }}>
            <div style={{ fontSize: '1.4rem', marginRight: '15px', minWidth: '30px', textAlign: 'center' }}>📚</div>
            <div><b>Educación y Advocacy:</b> Compartir conocimientos sobre sostenibilidad y apoyar políticas ambientales.</div>
          </div>
        </div>

        {/* Footer con QR y sello */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '30px', paddingTop: '20px', borderTop: '1px solid #eee' }}>
          <div style={{ textAlign: 'left', fontSize: '0.75rem', color: '#666', lineHeight: '1.5' }}>
            <div>{fechaActual}</div>
            <div><b>Verificación:</b> BlueSphereConsciousness.org</div>
            <div style={{ marginTop: '5px', fontStyle: 'italic' }}>#GuardiánBluesphere</div>
          </div>
          {qrDataUrl && <img src={qrDataUrl} alt="QR" style={{ width: '90px', height: '90px', border: '1px solid #ddd', padding: '5px', background: 'white' }} />}
          <div style={{ width: '80px', height: '80px', background: '#e0ac42', borderRadius: '50%', border: '2px dashed #fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', fontWeight: 'bold', transform: 'rotate(-10deg)', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>COMPROMISO<br />VERIFICADO</div>
        </div>

        <div style={{ marginTop: '20px' }}>
          <button onClick={handlePrint} style={{ padding: '10px 20px', background: '#6a994e', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
            📄 Descargar / Imprimir Certificado
          </button>
        </div>
      </div>
    </div>
  )
}
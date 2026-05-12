'use client'

import { useState, useEffect } from 'react'
import { useScenario } from '../context/ScenarioContext'

export function DoomsdayHero() {
  const { scenario } = useScenario()
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    let targetDate: Date
    switch (scenario) {
      case 'optimista':
        targetDate = new Date(2050, 0, 1, 0, 0, 0)
        break
      case 'intermedio':
        targetDate = new Date(2035, 0, 1, 0, 0, 0)
        break
      case 'critico':
        targetDate = new Date(2028, 0, 1, 0, 0, 0)
        break
    }

    const updateCountdown = () => {
      const now = new Date()
      const diff = targetDate.getTime() - now.getTime()

      if (diff <= 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      setCountdown({ days, hours, minutes, seconds })
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)
    return () => clearInterval(interval)
  }, [scenario])

  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      padding: '100px 20px 60px',
      background: `
        radial-gradient(ellipse at center bottom, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
        url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80')
      `,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      position: 'relative'
    }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.6) 100%)', pointerEvents: 'none' }} />
      <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '1000px' }}>
        <div style={{ marginBottom: '30px' }}>
          <span style={{ fontSize: '1.8rem', fontWeight: 300, letterSpacing: '2px' }}>Salud Planetaria:{' '}</span>
          <span style={{ fontSize: '2.5rem', fontWeight: 600, color: '#fbbf24' }}>62%</span>
          <span style={{ margin: '0 15px', opacity: 0.6 }}>•</span>
          <span style={{ fontSize: '1.8rem', fontWeight: 300 }}>Estado:{' '}</span>
          <span style={{ fontSize: '2.5rem', fontWeight: 700, color: '#ef4444', letterSpacing: '2px' }}>INESTABLE</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', marginBottom: '5px' }}>
          {[
            { value: countdown.days.toString(), label: '' },
            { value: countdown.hours.toString().padStart(2, '0'), label: '' },
            { value: countdown.minutes.toString().padStart(2, '0'), label: '' },
            { value: countdown.seconds.toString().padStart(2, '0'), label: '' }
          ].map((unit, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ fontSize: '5rem', fontWeight: 300, color: '#fff', fontVariantNumeric: 'tabular-nums', letterSpacing: '2px', textShadow: '0 0 30px rgba(255,255,255,0.3)' }}>
                {unit.value}
              </div>
              {i < 3 && <span style={{ color: '#fff', opacity: 0.5, fontSize: '3rem', margin: '0 10px', marginBottom: '20px' }}>:</span>}
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', fontSize: '0.8rem', opacity: 0.6, marginBottom: '15px', letterSpacing: '1px' }}>
          días : horas : minutos : segundos
        </div>
        <p style={{ fontSize: '1rem', opacity: 0.8, marginBottom: '80px', fontStyle: 'italic' }}>
          Cuenta regresiva al umbral +1.5°C
        </p>

        <div style={{ marginBottom: '20px' }}>
          <h1 style={{ fontSize: '5rem', fontWeight: 200, letterSpacing: '12px', marginBottom: '10px', textShadow: '0 0 40px rgba(255,255,255,0.2)' }}>
            ZIRIUX
          </h1>
          <p style={{ fontSize: '1.3rem', opacity: 0.9, letterSpacing: '3px', fontWeight: 300 }}>
            Diagnóstico Biofísico Planetario
          </p>
        </div>
        <p style={{ maxWidth: '600px', margin: '0 auto', opacity: 0.7, fontSize: '1rem', lineHeight: '1.6' }}>
          El sistema Tierra presenta una alteración metabólica de +1.1°C respecto al período preindustrial.
        </p>
      </div>
    </section>
  )
}
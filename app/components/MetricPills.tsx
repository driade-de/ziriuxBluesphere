interface MetricPillProps {
  label: string
  value: string
  unit: string
  status: 'Advertencia' | 'Crítico' | 'Alerta' | 'Estable'
  icon: string
}

function MetricPill({ label, value, unit, status, icon }: MetricPillProps) {
  const statusColors = {
    'Advertencia': '#f59e0b',
    'Crítico': '#ef4444',
    'Alerta': '#f97316',
    'Estable': '#22c55e'
  }

  const statusBg = {
    'Advertencia': 'rgba(245, 158, 11, 0.15)',
    'Crítico': 'rgba(239, 68, 68, 0.15)',
    'Alerta': 'rgba(249, 115, 22, 0.15)',
    'Estable': 'rgba(34, 197, 94, 0.15)'
  }

  return (
    <div style={{
      background: 'rgba(0, 0, 0, 0.6)',
      backdropFilter: 'blur(10px)',
      borderRadius: '12px',
      padding: '16px 24px',
      minWidth: '200px',
      border: `1px solid ${statusColors[status]}44`,
      boxShadow: `0 4px 20px ${statusColors[status]}22`,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '8px'
    }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '8px',
        fontSize: '0.9rem',
        opacity: 0.8
      }}>
        <span>{icon}</span>
        <span>{label}</span>
      </div>
      
      <div style={{ 
        fontSize: '1.6rem', 
        fontWeight: 600,
        color: '#ffffff'
      }}>
        {value}<span style={{ fontSize: '0.9rem', opacity: 0.7 }}>{unit}</span>
      </div>
      
      <div style={{ 
        fontSize: '0.75rem',
        color: statusColors[status],
        textTransform: 'uppercase',
        letterSpacing: '1px',
        fontWeight: 600,
        padding: '4px 12px',
        borderRadius: '12px',
        background: statusBg[status]
      }}>
        {status}
      </div>
    </div>
  )
}

export function MetricPills() {
  const metrics: MetricPillProps[] = [
    { label: 'CO₂', value: '429', unit: ' ppm', status: 'Advertencia', icon: '💨' },
    { label: 'Temperatura', value: '+1.1', unit: '°C', status: 'Crítico', icon: '🌡️' },
    { label: 'Hielo', value: '4.3M', unit: ' km²', status: 'Alerta', icon: '🧊' },
    { label: 'Océano', value: '2.1', unit: ' pH', status: 'Crítico', icon: '🌊' }
  ]

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      gap: '16px',
      flexWrap: 'wrap',
      padding: '40px 20px',
      background: 'linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)'
    }}>
      {metrics.map((metric) => (
        <MetricPill key={metric.label} {...metric} />
      ))}
    </div>
  )
}
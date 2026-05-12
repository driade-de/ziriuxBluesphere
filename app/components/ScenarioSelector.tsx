interface ScenarioSelectorProps {
  active: 'optimista' | 'intermedio' | 'critico'
  onChange: (s: 'optimista' | 'intermedio' | 'critico') => void
}

export function ScenarioSelector({ active, onChange }: ScenarioSelectorProps) {
  const scenarios = [
    { key: 'optimista', label: 'Optimista', color: '#22c55e' },
    { key: 'intermedio', label: 'Intermedio', color: '#eab308' },
    { key: 'critico', label: 'Crítico', color: '#ef4444' }
  ] as const

  return (
    <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', margin: '30px 0' }}>
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
import React from 'react';

/**
 * ZIRIUX - Diagnóstico Biofísico Planetario
 * Calibración final: Cierre de heptágono y núcleo escalado.
 */
export function OracleVisualization({ scenario }: { scenario: string }) {
  const isCritical = scenario === 'critical';

  // Coordenadas calibradas para un heptágono perfecto y cerrado
  const nodes = [
  { id: 'co2', label: '429ppm', sublabel: 'AIRE CO₂', status: 'warning', x: 50, y: 18, icon: '💨' },
  { id: 'temp', label: '+1.1°C', sublabel: 'TEMPERATURA', status: 'warning', x: 78, y: 32, icon: '🌡️' },
  { id: 'ice', label: '4.3M km²', sublabel: 'HIELO', status: 'stable', x: 85, y: 62, icon: '🧊' },
  { id: 'sea', label: '104.5mm', sublabel: 'NIVEL DEL MAR', status: 'warning', x: 70, y: 82, icon: '🌊' },
  { id: 'oceano', label: '2.1pH', sublabel: 'ACIDIFICACIÓN', status: 'critical', x: 30, y: 82, icon: '🧪' },
  { id: 'bio', label: '-73%', sublabel: 'BIODIVERSIDAD', status: 'critical', x: 15, y: 62, icon: '🌿' },
  { id: 'agua', label: 'Descenso', sublabel: 'AGUA DULCE', status: 'warning', x: 22, y: 32, icon: '💧' }
];

  const colors = {
    stable: '#2ecc71',
    warning: '#ff9f1c',
    critical: '#ff2a6d',
    cyan: 'rgba(0, 212, 255, 0.9)',
    cyanGlow: 'rgba(0, 212, 255, 0.4)'
  };

  return (
    <div className="ziriux-system" style={{ 
      position: 'relative',
      height: '750px',
      width: '100%',
      maxWidth: '1200px',
      margin: '40px auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      background: '#05070a' 
    }}>

      {/* 🔗 RED NEURONAL - CAPA SUPERIOR PARA CIERRE TOTAL */}
      <svg
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 25 // Elevado para pasar sobre los fondos de los sensores
        }}
      >
        <defs>
          <filter id="neonGlow">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Perímetro del Heptagrama */}
        {nodes.map((node, i) => {
          const nextNode = nodes[(i + 1) % nodes.length];
          return (
            <line
              key={`perim-${node.id}`}
              x1={`${node.x}%`}
              y1={`${node.y}%`}
              x2={`${nextNode.x}%`}
              y2={`${nextNode.y}%`}
              stroke={colors.cyan}
              strokeWidth="2.5"
              style={{
                filter: 'drop-shadow(0 0 8px rgba(0, 212, 255, 0.8))',
                animation: 'pulseLine 3s ease-in-out infinite'
              }}
            />
          );
        })}

        {/* Conexiones Radiales al Núcleo */}
        {nodes.map((node) => (
          <line
            key={`rad-${node.id}`}
            x1={`${node.x}%`}
            y1={`${node.y}%`}
            x2="50%"
            y2="50%"
            stroke="rgba(0, 212, 255, 0.15)"
            strokeWidth="1.5"
            strokeDasharray="5,5"
          />
        ))}
      </svg>

      {/* 👁️ NÚCLEO ZIRIUX - PRESENCIA MAXIMIZADA */}
      <div
        style={{
          position: 'absolute',
          zIndex: 15,
          width: '640px', // Escala imponente
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <img
          src="/ziriux-logo.png"
          alt="Ziriux Core"
          style={{
            width: '100%',
            height: 'auto',
            filter: `drop-shadow(0 0 30px ${isCritical ? 'rgba(255,42,109,0.6)' : 'rgba(0,212,255,0.6)'})`,
            animation: 'ziriuxBreathe 4s ease-in-out infinite'
          }}
        />
      </div>

      {/* 🔵 SENSORES PERIFÉRICOS */}
      {nodes.map((node) => (
        <div
          key={node.id}
          className="system-node"
          style={{
            position: 'absolute',
            left: `${node.x}%`,
            top: `${node.y}%`,
            transform: 'translate(-50%, -50%)',
            zIndex: 20,
            textAlign: 'center',
            width: '140px'
          }}
        >
          {/* Círculo del Sensor */}
          <div
            style={{
              width: '76px',
              height: '76px',
              borderRadius: '50%',
              margin: '0 auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: `2px solid ${colors[node.status as keyof typeof colors]}`,
              boxShadow: `0 0 20px ${colors[node.status as keyof typeof colors]}66`,
              background: '#05070a',
              position: 'relative'
            }}
          >
            {/* Órbita Animada */}
            <div
              style={{
                position: 'absolute',
                inset: '-8px',
                borderRadius: '50%',
                border: '1px dashed rgba(255,255,255,0.1)',
                animation: 'rotateOrbital 20s linear infinite'
              }}
            />
            <span style={{ fontSize: '1.6rem' }}>{node.icon}</span>
          </div>

          {/* Información del Nodo */}
          <div style={{ marginTop: '14px' }}>
            <div style={{ 
              color: colors[node.status as keyof typeof colors], 
              fontWeight: 800, 
              fontSize: '1.15rem',
              textShadow: '0 0 10px rgba(0,0,0,0.5)'
            }}>
              {node.label}
            </div>
            <div style={{ 
              color: '#fff', 
              fontSize: '0.72rem', 
              opacity: 0.5, 
              textTransform: 'uppercase', 
              letterSpacing: '1.2px' 
            }}>
              {node.sublabel}
            </div>
          </div>
        </div>
      ))}

      {/* 🛠️ ESTILOS GLOBALES Y ANIMACIONES */}
      <style>{`
        @keyframes pulseLine {
          0%, 100% { stroke-opacity: 0.35; stroke-width: 2.5; }
          50% { stroke-opacity: 0.9; stroke-width: 3; }
        }

        @keyframes rotateOrbital {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes ziriuxBreathe {
          0%, 100% { transform: scale(1.15); opacity: 0.9; }
          50% { transform: scale(1.22); opacity: 1; }
        }

        .system-node {
          transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .system-node:hover {
          transform: translate(-50%, -50%) scale(1.1) !important;
        }
      `}</style>
    </div>
  );
}
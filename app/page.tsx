'use client'

import Header from './components/Header'
import { OracleVisualization } from './components/OracleVisualization'  // ← IMPORTAR
import { DoomsdayHero } from './components/DoomsdayHero'
import { PlanetaryHexagram } from './components/PlanetaryHexagram'
import { ProtocolSection } from './components/ProtocolSection'
import { ConsciousnessBridges } from './components/ConsciousnessBridges'
import { MembershipSection } from './components/MembershipSection'
import { CorporateSection } from './components/CorporateSection'
import { TransformationPath } from './components/TransformationPath'
import { ContactSection } from './components/ContactSection'
import { Footer } from './components/Footer'
import { ScenarioProvider, useScenario } from './context/ScenarioContext'

// Componente interno que tiene acceso al contexto
function HomeContent() {
  const { scenario } = useScenario()

  return (
    <main style={{
      backgroundColor: '#05070a',
      color: '#ffffff',
      minHeight: '100vh',
      fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
      overflowX: 'hidden'
    }}>
      <Header />
      
      {/* 👁️ EL OJO - ARRIBA */}
      <OracleVisualization scenario={scenario} />
      
      <DoomsdayHero />
      <PlanetaryHexagram />
      <ProtocolSection />
      <ConsciousnessBridges />
      <MembershipSection />
      <CorporateSection />
      <TransformationPath />
      <ContactSection />
      <Footer />
    </main>
  )
}

// Componente principal que provee el contexto
export default function Home() {
  return (
    <ScenarioProvider>
      <HomeContent />
    </ScenarioProvider>
  )
}
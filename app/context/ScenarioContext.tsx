'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

export type Scenario = 'optimista' | 'intermedio' | 'critico'

interface ScenarioContextType {
  scenario: Scenario
  setScenario: (scenario: Scenario) => void
}

const ScenarioContext = createContext<ScenarioContextType | undefined>(undefined)

export function ScenarioProvider({ children }: { children: ReactNode }) {
  const [scenario, setScenario] = useState<Scenario>('intermedio')
  return (
    <ScenarioContext.Provider value={{ scenario, setScenario }}>
      {children}
    </ScenarioContext.Provider>
  )
}

export function useScenario() {
  const context = useContext(ScenarioContext)
  if (!context) throw new Error('useScenario must be used within ScenarioProvider')
  return context
}
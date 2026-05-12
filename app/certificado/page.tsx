'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

function ContenidoCertificado() {
  const searchParams = useSearchParams()
  const id = searchParams.get('id') || 'ZIRIUX-GENERIC'

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      <div className="border-2 border-emerald-500 p-8 rounded-lg text-center bg-zinc-900 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
        <h1 className="text-emerald-400 text-3xl font-bold mb-4">Certificado de Conciencia Planetaria</h1>
        <p className="text-zinc-400 mb-6">Identificador de Nodo: <span className="text-white mono">{id}</span></p>
        <div className="h-1 w-full bg-gradient-to-r from-transparent via-emerald-500 to-transparent mb-6"></div>
        <p className="text-emerald-200 italic">"La Tierra no nos pertenece, nosotros pertenecemos a la Tierra."</p>
      </div>
    </div>
  )
}

export default function CertificadoPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center text-emerald-500">
        Generando credenciales Ziriux...
      </div>
    }>
      <ContenidoCertificado />
    </Suspense>
  )
}
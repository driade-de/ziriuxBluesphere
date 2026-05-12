import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Providers from './providers'
import Header from './components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ZIRIUX - La Conciencia es la Nueva Civilización',
  description: 'Una red soberana de conciencia. El plástico habla. El mar responde.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Providers>
          <Header />
          <main className="min-h-screen pt-20 pb-12">
            <div className="max-w-4xl mx-auto px-4">
              {children}
            </div>
          </main>
        </Providers>
      </body>
    </html>
  )
}
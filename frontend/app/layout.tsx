import './globals.css'
import { Inter } from 'next/font/google'
import { Providers } from './providers'
import { Navigation } from '@/components/Navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'TripPlanner - Plan Your Perfect Multi-Day Trip',
  description: 'AI-powered trip planning with day-by-day itineraries, attraction recommendations, and route optimization.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen bg-gray-50">
            <Navigation />
            <main className="container mx-auto px-4 py-8">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  )
}
import React, { useState, useEffect } from 'react'
import { Sidebar } from '@/components/layout/Sidebar'
import { Header } from '@/components/layout/Header'
import { BottomNav } from '@/components/layout/BottomNav'
import { CitySearchModal } from '@/features/search/CitySearchModal'
import { OnboardingModal } from '@/features/onboarding/OnboardingModal'
import { AppRouter } from './router'

export const App: React.FC = () => {
  const [searchOpen, setSearchOpen] = useState(false)

  // Listen for global '/' keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === '/' &&
        document.activeElement?.tagName !== 'INPUT' &&
        document.activeElement?.tagName !== 'TEXTAREA'
      ) {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col md:flex-row antialiased font-sans selection:bg-brand-yellow selection:text-slate-950">
      {/* Desktop Sidebar */}
      <Sidebar onOpenSearch={() => setSearchOpen(true)} />

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header onOpenSearch={() => setSearchOpen(true)} />

        <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto">
          <AppRouter onOpenSearch={() => setSearchOpen(true)} />
        </main>
      </div>

      {/* Mobile Floating Bottom Nav */}
      <BottomNav onOpenSearch={() => setSearchOpen(true)} />

      {/* Global Modals */}
      <CitySearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <OnboardingModal />
    </div>
  )
}

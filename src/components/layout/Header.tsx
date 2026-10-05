import React, { useState, useEffect } from 'react'
import { Search, Navigation, Globe, WifiOff } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useSettingsStore } from '@/store/useSettingsStore'
import { useWeatherStore } from '@/store/useWeatherStore'
import { reverseGeocode } from '@/services/geocodingApi'
import { Button } from '@/components/ui/Button'

interface HeaderProps {
  onOpenSearch: () => void
}

export const Header: React.FC<HeaderProps> = ({ onOpenSearch }) => {
  const { t, i18n } = useTranslation()
  const { tempUnit, setTempUnit, language, setLanguage } = useSettingsStore()
  const { setCurrentLocation } = useWeatherStore()
  const [isLocating, setIsLocating] = useState(false)
  const [isOffline, setIsOffline] = useState(!navigator.onLine)

  useEffect(() => {
    const handleOnline = () => setIsOffline(false)
    const handleOffline = () => setIsOffline(true)
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const handleUseLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser')
      return
    }

    setIsLocating(true)
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const loc = await reverseGeocode(pos.coords.latitude, pos.coords.longitude)
          setCurrentLocation(loc)
        } catch (err) {
          console.error(err)
        } finally {
          setIsLocating(false)
        }
      },
      () => {
        setIsLocating(false)
        alert('Location access denied. Please select a city manually.')
      },
      { timeout: 10000 }
    )
  }

  const toggleLanguage = () => {
    const nextLang = language === 'en' ? 'ur' : 'en'
    setLanguage(nextLang)
    i18n.changeLanguage(nextLang)
    document.documentElement.dir = nextLang === 'ur' ? 'rtl' : 'ltr'
  }

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between gap-4 px-4 py-3 md:px-8 bg-slate-950/40 backdrop-blur-xl border-b border-white/10">
      {/* Search trigger */}
      <button
        onClick={onOpenSearch}
        className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-slate-300 hover:text-white hover:bg-white/15 transition-all text-sm w-full max-w-xs md:max-w-sm"
      >
        <Search className="h-4 w-4 text-slate-400" />
        <span>{t('nav.search')} city...</span>
      </button>

      {/* Action buttons */}
      <div className="flex items-center gap-2">
        {/* Offline indicator badge */}
        {isOffline && (
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs">
            <WifiOff className="h-3.5 w-3.5" />
            <span>{t('hero.offline')}</span>
          </div>
        )}

        {/* Use My Location button */}
        <Button
          variant="glass"
          size="sm"
          icon={<Navigation className={`h-4 w-4 ${isLocating ? 'animate-spin' : ''}`} />}
          onClick={handleUseLocation}
          title={t('hero.useMyLocation')}
        >
          <span className="hidden sm:inline">{t('hero.useMyLocation')}</span>
        </Button>

        {/* C / F Unit Toggle */}
        <button
          onClick={() => setTempUnit(tempUnit === 'C' ? 'F' : 'C')}
          className="flex items-center justify-center w-9 h-9 rounded-2xl bg-white/10 border border-white/15 text-xs font-bold text-white hover:bg-white/20 transition-all"
          title="Toggle Temperature Unit"
        >
          °{tempUnit}
        </button>

        {/* Language Switcher */}
        <button
          onClick={toggleLanguage}
          className="flex items-center gap-1 px-3 py-1.5 rounded-2xl bg-white/10 border border-white/15 text-xs font-medium text-white hover:bg-white/20 transition-all"
          title="Switch Language"
        >
          <Globe className="h-3.5 w-3.5" />
          <span className="uppercase">{language}</span>
        </button>
      </div>
    </header>
  )
}

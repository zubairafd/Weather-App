import React, { useState, useEffect, useRef } from 'react'
import { Search, MapPin, History, Trash2, Check } from 'lucide-react'
import { LocationData } from '@/types'
import { searchCities } from '@/services/geocodingApi'
import { useWeatherStore } from '@/store/useWeatherStore'
import { Modal } from '@/components/ui/Modal'

interface CitySearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export const CitySearchModal: React.FC<CitySearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<LocationData[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)

  const {
    setCurrentLocation,
    recentSearches,
    addRecentSearch,
    clearRecentSearches,
    savedCities,
  } = useWeatherStore()

  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
    } else {
      setQuery('')
    }
  }, [isOpen])

  // Debounced search (300ms)
  useEffect(() => {
    if (!query || query.trim().length < 2) {
      return
    }

    setLoading(true)
    const controller = new AbortController()
    const timer = setTimeout(async () => {
      try {
        const res = await searchCities(query, controller.signal)
        setResults(res)
        setSelectedIndex(0)
      } catch {
        setResults([])
      } finally {
        setLoading(false)
      }
    }, 300)

    return () => {
      clearTimeout(timer)
      controller.abort()
    }
  }, [query])

  const displayedResults = !query || query.trim().length < 2 ? [] : results

  const handleSelectCity = (city: LocationData) => {
    setCurrentLocation(city)
    addRecentSearch(city)
    onClose()
  }

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (displayedResults.length === 0) return

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev + 1) % displayedResults.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev - 1 + displayedResults.length) % displayedResults.length)
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const selected = displayedResults[selectedIndex]
      if (selected) handleSelectCity(selected)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Search Location">
      <div className="space-y-4">
        {/* Search input field */}
        <div className="relative">
          <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type city name (e.g. Peshawar, London, Tokyo)..."
            className="w-full rounded-2xl bg-white/10 border border-white/15 pl-10 pr-4 py-3 text-sm text-white placeholder-slate-400 outline-none focus:border-brand-yellow transition-all"
          />
          {loading && (
            <div className="absolute right-3.5 top-3.5 h-4 w-4 border-2 border-brand-yellow border-t-transparent rounded-full animate-spin" />
          )}
        </div>

        {/* Results Autocomplete List */}
        {displayedResults.length > 0 && (
          <div className="max-h-60 overflow-y-auto space-y-1 rounded-2xl bg-slate-800/80 p-2 border border-white/10">
            {displayedResults.map((city, idx) => (
              <button
                key={`${city.latitude}-${city.longitude}`}
                onClick={() => handleSelectCity(city)}
                className={`flex items-center justify-between w-full px-3 py-2.5 rounded-xl text-left text-sm transition-all ${
                  idx === selectedIndex
                    ? 'bg-brand-yellow text-slate-950 font-bold'
                    : 'text-slate-200 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 shrink-0" />
                  <span>
                    {city.name}
                    {city.admin1 ? `, ${city.admin1}` : ''}, {city.country}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Saved Cities Grid ("Pick Location" cards like Image 4) */}
        {!query && savedCities.length > 0 && (
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Saved Cities</h4>
            <div className="grid grid-cols-2 gap-2">
              {savedCities.slice(0, 4).map((city) => (
                <button
                  key={city.id}
                  onClick={() => handleSelectCity(city)}
                  className="p-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 text-left transition-all group"
                >
                  <span className="text-xs font-bold text-white block group-hover:text-brand-yellow">
                    {city.name}
                  </span>
                  <span className="text-[10px] text-slate-400">{city.country}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Recent Searches List */}
        {!query && recentSearches.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <History className="h-3.5 w-3.5" /> Recent Searches
              </span>
              <button
                onClick={clearRecentSearches}
                className="text-[10px] text-slate-500 hover:text-red-400 flex items-center gap-1"
              >
                <Trash2 className="h-3 w-3" /> Clear
              </button>
            </div>

            <div className="space-y-1">
              {recentSearches.map((city) => (
                <button
                  key={city.id}
                  onClick={() => handleSelectCity(city)}
                  className="flex items-center justify-between w-full px-3 py-2 rounded-xl text-left text-xs text-slate-300 hover:bg-white/5 transition-all"
                >
                  <span>{city.name}, {city.country}</span>
                  <Check className="h-3.5 w-3.5 text-slate-500" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </Modal>
  )
}

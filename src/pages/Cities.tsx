import React from 'react'
import { Plus, Trash2, Check } from 'lucide-react'
import { useWeatherStore } from '@/store/useWeatherStore'
import { useQuery } from '@tanstack/react-query'
import { fetchWeatherData } from '@/services/weatherApi'
import { getWeatherInfo } from '@/lib/weatherCodes'
import { WeatherIcon } from '@/components/weather/WeatherIcon'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { LocationData } from '@/types'

interface CityMiniCardProps {
  city: LocationData
  isSelected: boolean
  onSelect: (city: LocationData) => void
  onRemove: (id: string | number) => void
}

const CityMiniCard: React.FC<CityMiniCardProps> = ({ city, isSelected, onSelect, onRemove }) => {
  const { data } = useQuery({
    queryKey: ['weather-mini', city.latitude, city.longitude],
    queryFn: ({ signal }) => fetchWeatherData(city, signal),
    staleTime: 1000 * 60 * 10,
  })

  const weatherInfo = data ? getWeatherInfo(data.current.weatherCode, data.current.isDay) : null

  return (
    <Card
      hoverEffect
      onClick={() => onSelect(city)}
      className={`p-5 relative transition-all duration-300 ${
        isSelected
          ? 'bg-brand-yellow/15 border-brand-yellow/50 shadow-[0_4px_25px_rgba(250,204,21,0.2)]'
          : 'bg-slate-900/40 backdrop-blur-xl border-white/10 hover:border-white/25'
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-white font-bold text-lg">
            <span>{city.name}</span>
            {isSelected && <Check className="h-4 w-4 text-brand-yellow" />}
          </div>
          <p className="text-xs text-slate-400">{city.country}</p>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation()
            if (city.id) onRemove(city.id)
          }}
          className="p-1.5 rounded-full text-slate-400 hover:text-red-400 hover:bg-white/10 transition-colors"
          title="Remove city"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      <div className="flex items-end justify-between mt-6">
        <div>
          {data ? (
            <>
              <span className="text-4xl font-extrabold font-mono text-white">
                {Math.round(data.current.temperature)}°
              </span>
              <p className="text-xs font-semibold text-slate-300 mt-1">{weatherInfo?.label}</p>
              <p className="text-[10px] text-slate-400">
                H: {Math.round(data.daily[0].tempMax)}° • L: {Math.round(data.daily[0].tempMin)}°
              </p>
            </>
          ) : (
            <div className="h-12 w-20 bg-white/10 rounded-xl animate-pulse" />
          )}
        </div>

        {weatherInfo && (
          <WeatherIcon name={weatherInfo.dayIcon} isDay={data?.current.isDay} size={48} className="w-12 h-12" />
        )}
      </div>
    </Card>
  )
}

interface CitiesProps {
  onOpenSearch: () => void
}

export const Cities: React.FC<CitiesProps> = ({ onOpenSearch }) => {
  const { savedCities, currentLocation, setCurrentLocation, removeFavorite } = useWeatherStore()

  return (
    <div className="space-y-6 pb-24 md:pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Pick Location</h2>
          <p className="text-sm text-slate-400">Find the area or city that you want to check</p>
        </div>

        <Button variant="primary" icon={<Plus className="h-4 w-4" />} onClick={onOpenSearch}>
          Add City
        </Button>
      </div>

      {/* 2-Column Saved Cities Glass Card Grid (like Image 4) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {savedCities.map((city) => (
          <CityMiniCard
            key={city.id || city.name}
            city={city}
            isSelected={currentLocation.name === city.name}
            onSelect={setCurrentLocation}
            onRemove={removeFavorite}
          />
        ))}
      </div>
    </div>
  )
}

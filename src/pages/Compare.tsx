import React from 'react'
import { Columns } from 'lucide-react'
import { useWeatherStore } from '@/store/useWeatherStore'
import { useQueries } from '@tanstack/react-query'
import { fetchWeatherData } from '@/services/weatherApi'
import { getWeatherInfo } from '@/lib/weatherCodes'
import { WeatherIcon } from '@/components/weather/WeatherIcon'
import { Card } from '@/components/ui/Card'

export const Compare: React.FC = () => {
  const { savedCities } = useWeatherStore()
  const compareCities = savedCities.slice(0, 3)

  const weatherQueries = useQueries({
    queries: compareCities.map((city) => ({
      queryKey: ['compare-weather', city.latitude, city.longitude],
      queryFn: ({ signal }: { signal?: AbortSignal }) => fetchWeatherData(city, signal),
      staleTime: 1000 * 60 * 10,
    })),
  })

  return (
    <div className="space-y-6 pb-24 md:pb-12">
      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
          <Columns className="h-6 w-6 text-brand-yellow" /> Compare Weather
        </h2>
        <p className="text-sm text-slate-400">Side-by-side comparison of your saved cities</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {compareCities.map((city, idx) => {
          const query = weatherQueries[idx]
          const weather = query?.data
          const weatherInfo = weather ? getWeatherInfo(weather.current.weatherCode, weather.current.isDay) : null

          return (
            <Card key={city.id || city.name} className="p-6 bg-slate-900/40 backdrop-blur-xl border-white/10 space-y-4">
              <div className="text-center pb-4 border-b border-white/10">
                <h3 className="text-xl font-bold text-white">{city.name}</h3>
                <p className="text-xs text-slate-400">{city.country}</p>
                {weatherInfo && (
                  <div className="flex justify-center my-3">
                    <WeatherIcon name={weatherInfo.dayIcon} size={64} className="w-16 h-16" />
                  </div>
                )}
                <span className="text-4xl font-extrabold font-mono text-white">
                  {weather ? `${Math.round(weather.current.temperature)}°C` : '...'}
                </span>
                <p className="text-xs font-semibold text-brand-yellow mt-1">{weatherInfo?.label}</p>
              </div>

              {weather ? (
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between py-1.5 border-b border-white/5">
                    <span className="text-slate-400">Feels Like</span>
                    <span className="font-bold text-white font-mono">{Math.round(weather.current.apparentTemperature)}°C</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-white/5">
                    <span className="text-slate-400">Humidity</span>
                    <span className="font-bold text-sky-400 font-mono">{weather.current.humidity}%</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-white/5">
                    <span className="text-slate-400">Wind Speed</span>
                    <span className="font-bold text-teal-400 font-mono">{Math.round(weather.current.windSpeed)} km/h</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-white/5">
                    <span className="text-slate-400">Pressure</span>
                    <span className="font-bold text-amber-400 font-mono">{Math.round(weather.current.pressure)} hPa</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-white/5">
                    <span className="text-slate-400">UV Index</span>
                    <span className="font-bold text-purple-400 font-mono">{weather.current.uvIndex}</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-slate-400">Rain Chance Today</span>
                    <span className="font-bold text-sky-400 font-mono">{weather.daily[0].precipitationProbabilityMax}%</span>
                  </div>
                </div>
              ) : (
                <div className="h-40 bg-white/5 rounded-2xl animate-pulse" />
              )}
            </Card>
          )
        })}
      </div>
    </div>
  )
}

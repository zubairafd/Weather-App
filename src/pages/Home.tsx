import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useWeatherStore } from '@/store/useWeatherStore'
import { fetchWeatherData } from '@/services/weatherApi'
import { fetchAirQuality } from '@/services/airQualityApi'
import { fetchOwmAlerts } from '@/services/owmApi'
import { deriveAlerts } from '@/lib/alertsEngine'
import { getWeatherInfo } from '@/lib/weatherCodes'
import { WeatherEffects } from '@/components/effects/WeatherEffects'
import { HeroSection } from '@/components/weather/HeroSection'
import { HourlyStrip } from '@/components/weather/HourlyStrip'
import { DailyList } from '@/components/weather/DailyList'
import { DetailsGrid } from '@/components/weather/DetailsGrid'
import { AQICard } from '@/components/weather/AQICard'
import { UVCard } from '@/components/weather/UVCard'
import { SunArcCard } from '@/components/weather/SunArcCard'
import { RainCard } from '@/components/weather/RainCard'
import { MoonCard } from '@/components/weather/MoonCard'
import { WeatherChart } from '@/components/charts/WeatherChart'
import { AlertsBanner } from '@/features/alerts/AlertsBanner'
import { WearAdviceCard } from '@/features/advice/WearAdviceCard'
import { Skeleton } from '@/components/ui/Skeleton'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { RefreshCw, Copy, Check } from 'lucide-react'

export const Home: React.FC = () => {
  const { currentLocation, cacheWeatherData, cachedWeatherData } = useWeatherStore()
  const [shareModalOpen, setShareModalOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const cacheKey = `${currentLocation.latitude.toFixed(2)}-${currentLocation.longitude.toFixed(2)}`
  const fallbackData = cachedWeatherData[cacheKey]

  // Query Weather Data with 10 minute cache & stale-while-revalidate
  const {
    data: weatherData,
    isLoading: isWeatherLoading,
    isError: isWeatherError,
    refetch: refetchWeather,
  } = useQuery({
    queryKey: ['weather', currentLocation.latitude, currentLocation.longitude],
    queryFn: async ({ signal }) => {
      const data = await fetchWeatherData(currentLocation, signal)
      cacheWeatherData(cacheKey, data)
      return data
    },
    staleTime: 1000 * 60 * 10,
    initialData: fallbackData,
  })

  // Query Air Quality Data
  const { data: airQualityData } = useQuery({
    queryKey: ['airQuality', currentLocation.latitude, currentLocation.longitude],
    queryFn: ({ signal }) => fetchAirQuality(currentLocation.latitude, currentLocation.longitude, signal),
    staleTime: 1000 * 60 * 15,
    enabled: Boolean(weatherData),
  })

  // Query Official or Derived Alerts
  const { data: owmAlerts = [] } = useQuery({
    queryKey: ['owmAlerts', currentLocation.latitude, currentLocation.longitude],
    queryFn: ({ signal }) => fetchOwmAlerts(currentLocation.latitude, currentLocation.longitude, signal),
    staleTime: 1000 * 60 * 15,
  })

  const alerts =
    owmAlerts.length > 0
      ? owmAlerts
      : deriveAlerts(weatherData?.current, weatherData?.daily[0], airQualityData)

  const currentTheme = weatherData
    ? getWeatherInfo(weatherData.current.weatherCode, weatherData.current.isDay)
    : { effect: 'none' as const }

  const handleCopyShare = () => {
    const text = `Weather in ${currentLocation.name}: ${weatherData?.current.temperature}°C, ${getWeatherInfo(weatherData?.current.weatherCode || 0).label}. Check live forecast on SkyCast!`
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (isWeatherError && !fallbackData) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] p-6 text-center space-y-4">
        <h3 className="text-2xl font-bold text-white">Failed to load weather data</h3>
        <p className="text-slate-400 max-w-md">Please check your internet connection or try refreshing.</p>
        <Button variant="primary" icon={<RefreshCw className="h-4 w-4" />} onClick={() => refetchWeather()}>
          Retry Loading
        </Button>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen pb-24 md:pb-12 space-y-6">
      {/* Canvas Weather Animation Background */}
      <WeatherEffects effect={currentTheme.effect} />

      {/* Severe Alerts Banner */}
      {alerts.length > 0 && <AlertsBanner alerts={alerts} />}

      {/* Hero Current Weather Section */}
      {isWeatherLoading && !weatherData ? (
        <Skeleton className="h-72 w-full rounded-3xl" />
      ) : (
        weatherData && <HeroSection data={weatherData} onShare={() => setShareModalOpen(true)} />
      )}

      {/* Hourly Strip */}
      {isWeatherLoading && !weatherData ? (
        <Skeleton className="h-40 w-full rounded-3xl" />
      ) : (
        weatherData && <HourlyStrip items={weatherData.hourly} />
      )}

      {/* Interactive Recharts Temperature/Wind/Precip Chart */}
      {weatherData && <WeatherChart items={weatherData.hourly} />}

      {/* Dashboard 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Center / Left 2 columns */}
        <div className="lg:col-span-2 space-y-6">
          {/* Weather Details Grid */}
          {weatherData && <DetailsGrid current={weatherData.current} />}

          {/* Daily 7-day forecast */}
          {weatherData && <DailyList items={weatherData.daily} />}
        </div>

        {/* Right column: AQI, UV, Sun, Advice Cards */}
        <div className="space-y-6">
          {airQualityData && <AQICard data={airQualityData} />}

          {weatherData && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              <UVCard uvIndex={weatherData.current.uvIndex} />
              <SunArcCard sunriseIso={weatherData.daily[0].sunrise} sunsetIso={weatherData.daily[0].sunset} />
            </div>
          )}

          {weatherData && (
            <div className="grid grid-cols-2 gap-4">
              <RainCard
                precipitationInLastHour={weatherData.current.precipitation}
                rainProbabilityMax={weatherData.daily[0].precipitationProbabilityMax}
              />
              <MoonCard />
            </div>
          )}

          {weatherData && (
            <WearAdviceCard
              current={weatherData.current}
              hourly={weatherData.hourly}
              daily={weatherData.daily}
            />
          )}
        </div>
      </div>

      {/* Share Weather Card Modal */}
      <Modal isOpen={shareModalOpen} onClose={() => setShareModalOpen(false)} title="Share Weather">
        <div className="space-y-4 text-center">
          <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 to-indigo-950 border border-white/15 text-white">
            <h3 className="text-2xl font-bold">{currentLocation.name}</h3>
            <p className="text-4xl font-extrabold font-mono my-2">{weatherData?.current.temperature}°C</p>
            <p className="text-sm text-slate-300">
              {getWeatherInfo(weatherData?.current.weatherCode || 0).label}
            </p>
          </div>

          <Button variant="primary" className="w-full" icon={copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />} onClick={handleCopyShare}>
            {copied ? 'Copied to Clipboard!' : 'Copy Summary Text'}
          </Button>
        </div>
      </Modal>
    </div>
  )
}

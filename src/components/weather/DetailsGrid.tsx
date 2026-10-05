import React from 'react'
import { Droplets, Wind, Gauge, Eye, Thermometer, Cloud, Compass } from 'lucide-react'
import { CurrentWeatherData } from '@/types'
import { useSettingsStore } from '@/store/useSettingsStore'
import { formatSpeed, formatPressure, formatTemp } from '@/lib/unitConversion'
import { getWindDirection } from '@/lib/formatters'
import { Card } from '@/components/ui/Card'

interface DetailsGridProps {
  current: CurrentWeatherData
}

export const DetailsGrid: React.FC<DetailsGridProps> = ({ current }) => {
  const { speedUnit, pressureUnit, tempUnit } = useSettingsStore()
  const windDirLabel = getWindDirection(current.windDirection)

  const items = [
    {
      id: 'humidity',
      label: 'Humidity',
      value: `${current.humidity}%`,
      subtext: current.humidity > 60 ? 'High humidity' : current.humidity < 30 ? 'Dry air' : 'Comfortable',
      icon: Droplets,
      color: 'text-sky-400',
    },
    {
      id: 'wind',
      label: 'Wind',
      value: formatSpeed(current.windSpeed, speedUnit),
      subtext: `${windDirLabel} (${current.windDirection}°)`,
      icon: Wind,
      color: 'text-teal-400',
      extra: (
        <div className="flex items-center gap-1 mt-1 text-slate-300 text-xs">
          <Compass
            className="h-4 w-4 transition-transform duration-500"
            style={{ transform: `rotate(${current.windDirection}deg)` }}
          />
          <span>Direction</span>
        </div>
      ),
    },
    {
      id: 'gusts',
      label: 'Wind Gusts',
      value: formatSpeed(current.windGusts, speedUnit),
      subtext: current.windGusts > 30 ? 'Strong gusts' : 'Gentle breeze',
      icon: Wind,
      color: 'text-indigo-400',
    },
    {
      id: 'pressure',
      label: 'Pressure',
      value: formatPressure(current.pressure, pressureUnit),
      subtext: current.pressure > 1013 ? 'High Pressure ↑' : 'Low Pressure ↓',
      icon: Gauge,
      color: 'text-amber-400',
    },
    {
      id: 'visibility',
      label: 'Visibility',
      value: `${(current.visibility / 1000).toFixed(1)} km`,
      subtext: current.visibility >= 10000 ? 'Clear visibility' : 'Hazy conditions',
      icon: Eye,
      color: 'text-purple-400',
    },
    {
      id: 'dewPoint',
      label: 'Dew Point',
      value: formatTemp(current.dewPoint, tempUnit),
      subtext: 'Moisture level',
      icon: Thermometer,
      color: 'text-emerald-400',
    },
    {
      id: 'cloudCover',
      label: 'Cloud Cover',
      value: `${current.cloudCover}%`,
      subtext: current.cloudCover > 75 ? 'Overcast' : current.cloudCover > 25 ? 'Partly cloudy' : 'Clear sky',
      icon: Cloud,
      color: 'text-slate-300',
    },
    {
      id: 'precipitation',
      label: 'Precipitation',
      value: `${current.precipitation.toFixed(1)} mm`,
      subtext: 'In current hour',
      icon: Droplets,
      color: 'text-blue-400',
    },
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {items.map((item) => (
        <Card
          key={item.id}
          hoverEffect
          className="p-4 bg-slate-900/40 backdrop-blur-xl border-white/10 flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400">{item.label}</span>
            <item.icon className={`h-4 w-4 ${item.color}`} />
          </div>

          <div>
            <p className="text-xl font-bold font-mono text-white tracking-tight">{item.value}</p>
            <p className="text-[11px] text-slate-400 mt-0.5">{item.subtext}</p>
            {item.extra}
          </div>
        </Card>
      ))}
    </div>
  )
}

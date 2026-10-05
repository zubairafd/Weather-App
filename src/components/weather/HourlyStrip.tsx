import React from 'react'
import { motion } from 'framer-motion'
import { HourlyForecastItem } from '@/types'
import { useSettingsStore } from '@/store/useSettingsStore'
import { formatTemp } from '@/lib/unitConversion'
import { formatHour } from '@/lib/formatters'
import { getWeatherInfo } from '@/lib/weatherCodes'
import { WeatherIcon } from './WeatherIcon'
import { Card } from '@/components/ui/Card'

interface HourlyStripProps {
  items: HourlyForecastItem[]
}

export const HourlyStrip: React.FC<HourlyStripProps> = ({ items }) => {
  const { tempUnit, timeFormat } = useSettingsStore()

  return (
    <Card className="p-4 bg-slate-900/40 backdrop-blur-xl border-white/10">
      <div className="flex items-center justify-between mb-3 px-1">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">Today Hourly Forecast</h3>
        <span className="text-xs text-slate-400">Next 24 Hours</span>
      </div>

      <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
        {items.slice(0, 24).map((item, idx) => {
          const isNow = idx === 0
          const weatherInfo = getWeatherInfo(item.weatherCode, item.isDay)

          return (
            <motion.div
              key={item.time}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.03 }}
              className={`flex flex-col items-center justify-between p-3.5 min-w-[76px] rounded-3xl transition-all duration-300 shrink-0 border ${
                isNow
                  ? 'bg-gradient-to-b from-brand-yellow/30 to-brand-yellow/10 border-brand-yellow/50 shadow-[0_4px_20px_rgba(250,204,21,0.25)] text-white scale-105'
                  : 'bg-white/5 border-white/10 hover:bg-white/10 text-slate-200'
              }`}
            >
              <span className={`text-xs font-semibold ${isNow ? 'text-brand-yellow font-bold' : 'text-slate-400'}`}>
                {isNow ? 'Now' : formatHour(item.time, timeFormat === '12h')}
              </span>

              <div className="my-2">
                <WeatherIcon name={weatherInfo.dayIcon} isDay={item.isDay} size={36} className="w-9 h-9" />
              </div>

              <span className="text-sm font-bold font-mono">
                {formatTemp(item.temperature, tempUnit)}
              </span>

              {item.precipitationProbability > 10 && (
                <span className="text-[10px] font-semibold text-sky-400 mt-1">
                  {item.precipitationProbability}%
                </span>
              )}
            </motion.div>
          )
        })}
      </div>
    </Card>
  )
}

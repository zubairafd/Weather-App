import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar } from 'lucide-react'
import { DailyForecastItem } from '@/types'
import { useSettingsStore } from '@/store/useSettingsStore'
import { formatTemp } from '@/lib/unitConversion'
import { formatDayOfWeek, formatFullDate } from '@/lib/formatters'
import { getWeatherInfo } from '@/lib/weatherCodes'
import { WeatherIcon } from './WeatherIcon'
import { Card } from '@/components/ui/Card'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'

interface DailyListProps {
  items: DailyForecastItem[]
}

export const DailyList: React.FC<DailyListProps> = ({ items }) => {
  const { tempUnit } = useSettingsStore()
  const [show14Days, setShow14Days] = useState(false)
  const [selectedDay, setSelectedDay] = useState<DailyForecastItem | null>(null)

  const displayedItems = show14Days ? items : items.slice(0, 7)

  // Global min and max for temperature range bar scale
  const globalMin = Math.min(...items.map((d) => d.tempMin))
  const globalMax = Math.max(...items.map((d) => d.tempMax))

  return (
    <Card className="p-4 md:p-5 bg-slate-900/40 backdrop-blur-xl border-white/10">
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-brand-yellow" />
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">
            {show14Days ? '14-Day Forecast' : '7-Day Forecast'}
          </h3>
        </div>

        <button
          onClick={() => setShow14Days(!show14Days)}
          className="text-xs font-semibold text-brand-yellow hover:underline"
        >
          {show14Days ? 'Show 7 Days' : 'Expand 14 Days'}
        </button>
      </div>

      <div className="space-y-2.5">
        {displayedItems.map((day, idx) => {
          const isToday = idx === 0
          const weatherInfo = getWeatherInfo(day.weatherCode, true)

          // Calculate temperature range percentage bar position
          const range = globalMax - globalMin || 1
          const leftPercent = ((day.tempMin - globalMin) / range) * 100
          const widthPercent = Math.max(12, ((day.tempMax - day.tempMin) / range) * 100)

          return (
            <motion.div
              key={day.date}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.04 }}
              onClick={() => setSelectedDay(day)}
              className="flex items-center justify-between gap-4 p-3 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all cursor-pointer group"
            >
              {/* Day name */}
              <div className="w-20 shrink-0">
                <p className={`text-sm font-bold ${isToday ? 'text-brand-yellow' : 'text-slate-200'}`}>
                  {isToday ? 'Today' : formatDayOfWeek(day.date)}
                </p>
                <p className="text-[10px] text-slate-400">{day.date.split('-').slice(1).join('/')}</p>
              </div>

              {/* Weather Icon & Condition */}
              <div className="flex items-center gap-2 w-32 shrink-0">
                <WeatherIcon name={weatherInfo.dayIcon} size={32} className="w-8 h-8" />
                <span className="text-xs text-slate-300 truncate hidden sm:inline">{weatherInfo.label}</span>
              </div>

              {/* Min Temp */}
              <span className="text-xs font-semibold text-slate-400 w-8 text-right font-mono">
                {formatTemp(day.tempMin, tempUnit)}
              </span>

              {/* Temperature Range Bar */}
              <div className="flex-1 max-w-[120px] md:max-w-[160px] h-2 bg-slate-800 rounded-full relative overflow-hidden hidden xs:block">
                <div
                  className="absolute h-full rounded-full bg-gradient-to-r from-teal-400 via-yellow-400 to-orange-500"
                  style={{
                    left: `${leftPercent}%`,
                    width: `${widthPercent}%`,
                  }}
                />
              </div>

              {/* Max Temp */}
              <span className="text-xs font-bold text-white w-8 text-right font-mono">
                {formatTemp(day.tempMax, tempUnit)}
              </span>

              {/* Rain Chance Badge */}
              {day.precipitationProbabilityMax > 15 ? (
                <span className="text-[10px] font-bold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded-full border border-sky-500/20 w-12 text-center">
                  {day.precipitationProbabilityMax}%
                </span>
              ) : (
                <div className="w-12" />
              )}
            </motion.div>
          )
        })}
      </div>

      {/* Modal detail dialog when a day is clicked */}
      <Modal
        isOpen={Boolean(selectedDay)}
        onClose={() => setSelectedDay(null)}
        title={selectedDay ? formatFullDate(selectedDay.date) : ''}
      >
        {selectedDay && (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-3">
                <WeatherIcon name={getWeatherInfo(selectedDay.weatherCode).dayIcon} size={48} className="w-12 h-12" />
                <div>
                  <p className="text-lg font-bold">{getWeatherInfo(selectedDay.weatherCode).label}</p>
                  <p className="text-xs text-slate-400">
                    High: {formatTemp(selectedDay.tempMax, tempUnit)} • Low: {formatTemp(selectedDay.tempMin, tempUnit)}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-xs text-slate-400">Precipitation Sum</p>
                <p className="text-base font-bold font-mono text-sky-400">{selectedDay.precipitationSum.toFixed(1)} mm</p>
              </div>

              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-xs text-slate-400">Max Wind Speed</p>
                <p className="text-base font-bold font-mono text-slate-200">{Math.round(selectedDay.windSpeedMax)} km/h</p>
              </div>

              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-xs text-slate-400">Max UV Index</p>
                <p className="text-base font-bold font-mono text-amber-400">{selectedDay.uvIndexMax}</p>
              </div>

              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-xs text-slate-400">Rain Chance</p>
                <p className="text-base font-bold font-mono text-sky-400">{selectedDay.precipitationProbabilityMax}%</p>
              </div>
            </div>

            <Button variant="glass" className="w-full" onClick={() => setSelectedDay(null)}>
              Close Details
            </Button>
          </div>
        )}
      </Modal>
    </Card>
  )
}

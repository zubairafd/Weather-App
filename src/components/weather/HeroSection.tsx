import React from 'react'
import { motion } from 'framer-motion'
import { Share2, Clock } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { WeatherData } from '@/types'
import { useSettingsStore } from '@/store/useSettingsStore'
import { formatTemp } from '@/lib/unitConversion'
import { getWeatherInfo } from '@/lib/weatherCodes'
import { WeatherIcon } from './WeatherIcon'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

interface HeroSectionProps {
  data: WeatherData
  onShare?: () => void
}

export const HeroSection: React.FC<HeroSectionProps> = ({ data, onShare }) => {
  const { t } = useTranslation()
  const { tempUnit } = useSettingsStore()
  const { current, location, daily, lastUpdated } = data

  const todayDaily = daily[0]
  const weatherInfo = getWeatherInfo(current.weatherCode, current.isDay)

  const formattedTime = new Date(lastUpdated).toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
  })

  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-slate-900/60 via-slate-900/40 to-slate-950/70 border-white/15 p-6 md:p-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
        
        {/* Left column: Location & Big Temp */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-slate-300 text-sm font-medium">
            <span>{location.country ? `${location.name}, ${location.country}` : location.name}</span>
          </div>

          <div className="flex items-baseline gap-4">
            <motion.h2
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-6xl md:text-8xl font-extrabold tracking-tight text-white font-mono"
            >
              {formatTemp(current.temperature, tempUnit)}
            </motion.h2>

            <div className="space-y-1">
              <p className="text-xl md:text-2xl font-semibold text-slate-100">{weatherInfo.label}</p>
              <p className="text-xs text-slate-400">
                {t('hero.feelsLike')} {formatTemp(current.apparentTemperature, tempUnit)}
              </p>
            </div>
          </div>

          {/* High / Low range */}
          {todayDaily && (
            <div className="flex items-center gap-4 text-xs font-semibold text-slate-300 pt-1">
              <span>{t('hero.high')}: {formatTemp(todayDaily.tempMax, tempUnit)}</span>
              <span>•</span>
              <span>{t('hero.low')}: {formatTemp(todayDaily.tempMin, tempUnit)}</span>
            </div>
          )}
        </div>

        {/* Center/Right: 3D Weather Icon Hero */}
        <div className="flex flex-col items-center md:items-end justify-center self-center md:self-auto">
          <WeatherIcon name={weatherInfo.dayIcon} isDay={current.isDay} size={140} className="w-32 h-32 md:w-40 md:h-40" />
          
          <div className="flex items-center gap-3 mt-2">
            <div className="flex items-center gap-1 text-[11px] text-slate-400 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
              <Clock className="h-3 w-3" />
              <span>{t('hero.lastUpdated')} {formattedTime}</span>
            </div>

            {onShare && (
              <Button variant="glass" size="sm" icon={<Share2 className="h-3.5 w-3.5" />} onClick={onShare}>
                {t('hero.share')}
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}

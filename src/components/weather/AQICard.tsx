import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Activity, ChevronDown, Info } from 'lucide-react'
import { AirQualityData } from '@/types'
import { getAQIInfo } from '@/lib/formatters'
import { Card } from '@/components/ui/Card'

interface AQICardProps {
  data: AirQualityData
}

export const AQICard: React.FC<AQICardProps> = ({ data }) => {
  const [expanded, setExpanded] = useState(false)
  const aqiMeta = getAQIInfo(data.usAqi)

  // Progress percentage (scale up to 300)
  const progressPercent = Math.min(100, Math.max(5, (data.usAqi / 300) * 100))

  return (
    <Card className="p-5 bg-slate-900/40 backdrop-blur-xl border-white/10 relative overflow-hidden">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4 text-emerald-400" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">Air Quality Index</h3>
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 text-xs font-semibold text-brand-yellow hover:underline"
        >
          <span>{expanded ? 'Less info' : 'See more'}</span>
          <ChevronDown className={`h-3.5 w-3.5 transition-transform ${expanded ? 'rotate-180' : ''}`} />
        </button>
      </div>

      <div className="flex items-baseline justify-between mb-2">
        <div>
          <span className="text-3xl font-extrabold font-mono text-white">{data.usAqi}</span>
          <span className="text-xs text-slate-400 ml-2">US AQI</span>
        </div>

        <span
          className="text-xs font-bold px-3 py-1 rounded-full text-slate-950 shadow"
          style={{ backgroundColor: aqiMeta.color }}
        >
          {data.healthRiskText}
        </span>
      </div>

      {/* Color-coded Progress Bar */}
      <div className="w-full h-2.5 bg-slate-800 rounded-full relative overflow-hidden my-3">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${progressPercent}%`,
            backgroundColor: aqiMeta.color,
          }}
        />
      </div>

      <p className="text-xs text-slate-300 flex items-start gap-1.5">
        <Info className="h-3.5 w-3.5 shrink-0 text-slate-400 mt-0.5" />
        <span>{aqiMeta.healthAdvice}</span>
      </p>

      {/* Expandable Pollutant Breakdown */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="pt-4 mt-3 border-t border-white/10 space-y-3"
          >
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pollutant Breakdown</h4>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                <span className="text-slate-400 block">PM2.5</span>
                <span className="font-bold font-mono text-white">{data.pm25} µg/m³</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                <span className="text-slate-400 block">PM10</span>
                <span className="font-bold font-mono text-white">{data.pm10} µg/m³</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                <span className="text-slate-400 block">O3</span>
                <span className="font-bold font-mono text-white">{data.o3} µg/m³</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                <span className="text-slate-400 block">NO2</span>
                <span className="font-bold font-mono text-white">{data.no2} µg/m³</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                <span className="text-slate-400 block">SO2</span>
                <span className="font-bold font-mono text-white">{data.so2} µg/m³</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                <span className="text-slate-400 block">CO</span>
                <span className="font-bold font-mono text-white">{data.co} µg/m³</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
}

import React from 'react'
import { Sunrise, Sunset } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { formatHour } from '@/lib/formatters'
import { useSettingsStore } from '@/store/useSettingsStore'

interface SunArcCardProps {
  sunriseIso: string
  sunsetIso: string
}

export const SunArcCard: React.FC<SunArcCardProps> = ({ sunriseIso, sunsetIso }) => {
  const { timeFormat } = useSettingsStore()

  const sunriseTime = formatHour(sunriseIso, timeFormat === '12h')
  const sunsetTime = formatHour(sunsetIso, timeFormat === '12h')

  // Calculate current sun progression arc percentage (0 to 1)
  const now = new Date().getTime()
  const sunrise = new Date(sunriseIso).getTime()
  const sunset = new Date(sunsetIso).getTime()

  let progress = 0
  if (now >= sunset) progress = 1
  else if (now > sunrise && sunset > sunrise) {
    progress = (now - sunrise) / (sunset - sunrise)
  }

  // Calculate coordinates on semi-circle SVG arc (R=40, center=(50,50))
  const angle = Math.PI * (1 - progress)
  const cx = 50 + 40 * Math.cos(angle)
  const cy = 50 - 40 * Math.sin(angle)

  // Calculate day length in hours & minutes
  const totalMinutes = Math.max(0, Math.round((sunset - sunrise) / (1000 * 60)))
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  return (
    <Card className="p-5 bg-slate-900/40 backdrop-blur-xl border-white/10 flex flex-col justify-between">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Sunrise & Sunset</span>
        <Sunrise className="h-4 w-4 text-amber-400" />
      </div>

      {/* Animated Semi-Circle Arc SVG */}
      <div className="relative w-full h-24 flex items-center justify-center my-1">
        <svg viewBox="0 0 100 60" className="w-full h-full overflow-visible">
          {/* Dashed background arc */}
          <path
            d="M 10,50 A 40,40 0 0,1 90,50"
            fill="none"
            stroke="rgba(255, 255, 255, 0.15)"
            strokeWidth="3"
            strokeDasharray="4 4"
          />
          {/* Active sun arc */}
          <path
            d="M 10,50 A 40,40 0 0,1 90,50"
            fill="none"
            stroke="url(#sunArcGrad)"
            strokeWidth="3"
            strokeDasharray="126"
            strokeDashoffset={126 * (1 - progress)}
          />
          <defs>
            <linearGradient id="sunArcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FACC15" />
              <stop offset="100%" stopColor="#F97316" />
            </linearGradient>
          </defs>
          {/* Sun glowing dot */}
          <circle cx={cx} cy={cy} r="5" fill="#FACC15" className="drop-shadow-[0_0_8px_#FACC15]" />
        </svg>

        <div className="absolute bottom-0 text-center">
          <span className="text-[11px] text-slate-400">Day Length: {hours}h {minutes}m</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs">
        <div className="flex items-center gap-1.5 text-slate-300">
          <Sunrise className="h-4 w-4 text-amber-400" />
          <div>
            <span className="text-[10px] text-slate-400 block">Sunrise</span>
            <span className="font-bold font-mono">{sunriseTime}</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-slate-300 text-right">
          <div>
            <span className="text-[10px] text-slate-400 block">Sunset</span>
            <span className="font-bold font-mono">{sunsetTime}</span>
          </div>
          <Sunset className="h-4 w-4 text-orange-400" />
        </div>
      </div>
    </Card>
  )
}

import React from 'react'
import { CloudRain } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { useSettingsStore } from '@/store/useSettingsStore'
import { formatPrecip } from '@/lib/unitConversion'

interface RainCardProps {
  precipitationInLastHour: number
  rainProbabilityMax: number
}

export const RainCard: React.FC<RainCardProps> = ({
  precipitationInLastHour,
  rainProbabilityMax,
}) => {
  const { precipUnit } = useSettingsStore()

  return (
    <Card className="p-5 bg-slate-900/40 backdrop-blur-xl border-white/10 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Rainfall</span>
          <CloudRain className="h-4 w-4 text-sky-400" />
        </div>

        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-3xl font-extrabold font-mono text-white">
            {formatPrecip(precipitationInLastHour, precipUnit)}
          </span>
          <span className="text-xs text-slate-400">in last hour</span>
        </div>
      </div>

      <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
        <span>Max Rain Chance</span>
        <span className="font-bold font-mono text-sky-400">{rainProbabilityMax}%</span>
      </div>
    </Card>
  )
}

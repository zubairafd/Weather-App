import React from 'react'
import { Sun } from 'lucide-react'
import { getUVInfo } from '@/lib/formatters'
import { Card } from '@/components/ui/Card'

interface UVCardProps {
  uvIndex: number
}

export const UVCard: React.FC<UVCardProps> = ({ uvIndex }) => {
  const uvInfo = getUVInfo(uvIndex)
  const percent = Math.min(100, (uvIndex / 12) * 100)

  return (
    <Card className="p-5 bg-slate-900/40 backdrop-blur-xl border-white/10 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-300">UV Index</span>
          <Sun className="h-4 w-4 text-amber-400" />
        </div>

        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-3xl font-extrabold font-mono text-white">{Math.round(uvIndex)}</span>
          <span className="text-sm font-semibold" style={{ color: uvInfo.color }}>
            {uvInfo.level}
          </span>
        </div>

        {/* UV Meter Bar */}
        <div className="w-full h-2 bg-slate-800 rounded-full relative overflow-hidden my-2">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${percent}%`, backgroundColor: uvInfo.color }}
          />
        </div>
      </div>

      <p className="text-[11px] text-slate-400 mt-2">{uvInfo.advice}</p>
    </Card>
  )
}

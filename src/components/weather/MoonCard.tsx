import React from 'react'
import { Moon } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { getMoonPhase } from '@/lib/moonPhase'

export const MoonCard: React.FC = () => {
  const moonInfo = getMoonPhase()

  return (
    <Card className="p-5 bg-slate-900/40 backdrop-blur-xl border-white/10 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Moon Phase</span>
          <Moon className="h-4 w-4 text-purple-300" />
        </div>

        <div className="flex items-center gap-3 my-1">
          <div className="w-10 h-10 rounded-full bg-slate-800 border border-purple-400/40 flex items-center justify-center text-purple-200 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
            <Moon className="h-6 w-6 fill-current text-purple-300 opacity-90" />
          </div>

          <div>
            <p className="text-base font-bold text-white">{moonInfo.name}</p>
            <p className="text-xs text-slate-400">{moonInfo.illumination}% Illuminated</p>
          </div>
        </div>
      </div>

      <div className="pt-2 border-t border-white/10 text-[11px] text-slate-400">
        Synodic Cycle: Day {Math.round(moonInfo.phase * 29.53)} of 29.5
      </div>
    </Card>
  )
}

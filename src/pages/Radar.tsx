import React from 'react'
import { Map } from 'lucide-react'
import { useWeatherStore } from '@/store/useWeatherStore'
import { RadarMap } from '@/components/map/RadarMap'

export const Radar: React.FC = () => {
  const { currentLocation } = useWeatherStore()

  return (
    <div className="space-y-6 pb-24 md:pb-12">
      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
          <Map className="h-6 w-6 text-brand-yellow" /> Interactive Weather Radar
        </h2>
        <p className="text-sm text-slate-400">
          Live RainViewer precipitation radar tiles over {currentLocation.name}
        </p>
      </div>

      <RadarMap location={currentLocation} />
    </div>
  )
}

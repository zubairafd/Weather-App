import React, { useState } from 'react'
import { AlertTriangle, AlertCircle, Info, ChevronDown } from 'lucide-react'
import { WeatherAlert } from '@/types'

interface AlertsBannerProps {
  alerts: WeatherAlert[]
}

export const AlertsBanner: React.FC<AlertsBannerProps> = ({ alerts }) => {
  const [expanded, setExpanded] = useState(false)

  if (!alerts || alerts.length === 0) return null

  const mainAlert = alerts[0]

  const severityStyles = {
    info: 'bg-blue-500/20 text-blue-200 border-blue-500/30',
    warning: 'bg-amber-500/20 text-amber-200 border-amber-500/30',
    severe: 'bg-red-500/20 text-red-200 border-red-500/30',
    extreme: 'bg-purple-500/20 text-purple-200 border-purple-500/30',
  }

  const icons = {
    info: Info,
    warning: AlertCircle,
    severe: AlertTriangle,
    extreme: AlertTriangle,
  }

  const IconComponent = icons[mainAlert.severity] || AlertTriangle

  return (
    <div
      className={`rounded-3xl p-4 border backdrop-blur-xl transition-all duration-300 ${
        severityStyles[mainAlert.severity]
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <IconComponent className="h-5 w-5 shrink-0 animate-pulse" />
          <div>
            <h4 className="text-sm font-bold tracking-tight">{mainAlert.title}</h4>
            <p className="text-xs opacity-90 line-clamp-1">{mainAlert.description}</p>
          </div>
        </div>

        {alerts.length > 0 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-1 rounded-full hover:bg-white/10 transition-colors shrink-0"
            aria-label="Toggle details"
          >
            <ChevronDown className={`h-4 w-4 transition-transform ${expanded ? 'rotate-180' : ''}`} />
          </button>
        )}
      </div>

      {expanded && (
        <div className="mt-3 pt-3 border-t border-white/15 text-xs space-y-2">
          <p>{mainAlert.description}</p>
          <p className="text-[10px] opacity-75">Source: {mainAlert.source}</p>
        </div>
      )}
    </div>
  )
}

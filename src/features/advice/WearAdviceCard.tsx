import React from 'react'
import { Umbrella, Sun, Shirt, Wind, Sparkles, CheckCircle2 } from 'lucide-react'
import { CurrentWeatherData, DailyForecastItem, HourlyForecastItem } from '@/types'
import { getClothingAdvice, getActivityScores, generateDailySummary } from '@/lib/adviceEngine'
import { Card } from '@/components/ui/Card'

interface WearAdviceCardProps {
  current: CurrentWeatherData
  hourly: HourlyForecastItem[]
  daily: DailyForecastItem[]
}

export const WearAdviceCard: React.FC<WearAdviceCardProps> = ({ current, hourly, daily }) => {
  const clothing = getClothingAdvice(current)
  const activities = getActivityScores(current)
  const summaryText = generateDailySummary(current, hourly, daily)

  const iconMap: Record<string, React.ElementType> = {
    Umbrella,
    Sun,
    Shirt,
    Wind,
  }

  return (
    <Card className="p-5 bg-slate-900/40 backdrop-blur-xl border-white/10 space-y-4">
      {/* Natural language summary */}
      <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-brand-yellow/10 border border-brand-yellow/20">
        <Sparkles className="h-5 w-5 text-brand-yellow shrink-0 mt-0.5" />
        <div>
          <h4 className="text-xs font-bold text-brand-yellow uppercase tracking-wider">Today Summary</h4>
          <p className="text-xs text-slate-200 mt-0.5 leading-relaxed">{summaryText}</p>
        </div>
      </div>

      {/* What to Wear Grid */}
      <div>
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">What to Wear</h4>
        <div className="grid grid-cols-2 gap-2">
          {clothing.map((item) => {
            const Icon = iconMap[item.icon] || Shirt
            return (
              <div
                key={item.id}
                className={`p-3 rounded-2xl border transition-all ${
                  item.needed
                    ? 'bg-white/10 border-white/20 text-white'
                    : 'bg-white/5 border-white/5 text-slate-400 opacity-60'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Icon className="h-4 w-4 text-brand-yellow" />
                  <span className="text-xs font-bold">{item.title}</span>
                </div>
                <p className="text-[10px] text-slate-300 line-clamp-2">{item.description}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Activity Suitability */}
      <div>
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Outdoor Activities</h4>
        <div className="space-y-2">
          {activities.map((act) => (
            <div
              key={act.name}
              className="flex items-center justify-between p-2.5 rounded-2xl bg-white/5 border border-white/5 text-xs"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-teal-400" />
                <span className="font-semibold text-slate-200">{act.name}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] text-slate-400 hidden sm:inline">{act.reason}</span>
                <span className="font-bold font-mono px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30">
                  {act.score}/10 ({act.status})
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}

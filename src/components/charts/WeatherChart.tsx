import React, { useState } from 'react'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts'
import type { HourlyForecastItem } from '@/types'
import { useSettingsStore } from '@/store/useSettingsStore'
import { formatHour } from '@/lib/formatters'
import { Card } from '@/components/ui/Card'
import { Tabs } from '@/components/ui/Tabs'

interface WeatherChartProps {
  items: HourlyForecastItem[]
}

export const WeatherChart: React.FC<WeatherChartProps> = ({ items }) => {
  const { tempUnit, speedUnit, timeFormat } = useSettingsStore()
  const [activeTab, setActiveTab] = useState<'temp' | 'precip' | 'wind' | 'humidity'>('temp')

  const chartData = items.slice(0, 24).map((item) => ({
    time: formatHour(item.time, timeFormat === '12h'),
    temp: Math.round(item.temperature),
    precip: item.precipitationProbability,
    wind: Math.round(item.windSpeed),
    humidity: item.humidity,
  }))

  const tabConfigs = {
    temp: {
      dataKey: 'temp',
      label: 'Temperature',
      unit: `°${tempUnit}`,
      stroke: '#FACC15',
      fill: 'url(#tempGrad)',
    },
    precip: {
      dataKey: 'precip',
      label: 'Rain Chance',
      unit: '%',
      stroke: '#38BDF8',
      fill: 'url(#precipGrad)',
    },
    wind: {
      dataKey: 'wind',
      label: 'Wind Speed',
      unit: speedUnit === 'mph' ? 'mph' : 'km/h',
      stroke: '#14B8A6',
      fill: 'url(#windGrad)',
    },
    humidity: {
      dataKey: 'humidity',
      label: 'Humidity',
      unit: '%',
      stroke: '#A855F7',
      fill: 'url(#humidityGrad)',
    },
  }

  const currentConfig = tabConfigs[activeTab]

  return (
    <Card className="p-5 bg-slate-900/40 backdrop-blur-xl border-white/10">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">Interactive Hourly Trends</h3>

        <Tabs
          options={[
            { id: 'temp', label: 'Temperature' },
            { id: 'precip', label: 'Precipitation' },
            { id: 'wind', label: 'Wind' },
            { id: 'humidity', label: 'Humidity' },
          ]}
          activeId={activeTab}
          onChange={(id) => setActiveTab(id as typeof activeTab)}
        />
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="tempGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FACC15" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#FACC15" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="precipGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#38BDF8" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#38BDF8" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="windGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#14B8A6" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#14B8A6" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="humidityGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#A855F7" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#A855F7" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" vertical={false} />
            <XAxis dataKey="time" stroke="#94A3B8" fontSize={11} tickLine={false} />
            <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
            
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0]
                  return (
                    <div className="rounded-2xl bg-slate-900/90 backdrop-blur-xl border border-white/20 p-3 shadow-xl text-xs text-white">
                      <p className="font-semibold text-slate-400 mb-1">{data.payload.time}</p>
                      <p className="font-bold text-sm font-mono" style={{ color: currentConfig.stroke }}>
                        {data.value} {currentConfig.unit}
                      </p>
                    </div>
                  )
                }
                return null
              }}
            />

            <Area
              type="monotone"
              dataKey={currentConfig.dataKey}
              stroke={currentConfig.stroke}
              strokeWidth={3}
              fill={currentConfig.fill}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}

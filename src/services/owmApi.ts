import { env } from '@/env'
import { WeatherAlert } from '@/types'

/**
 * Check if OpenWeatherMap API key is configured
 */
export function isOwmAvailable(): boolean {
  return Boolean(env.VITE_OWM_API_KEY && env.VITE_OWM_API_KEY.trim() !== '')
}

/**
 * Fetch official severe weather alerts from OWM if key is available
 */
export async function fetchOwmAlerts(
  lat: number,
  lon: number,
  signal?: AbortSignal
): Promise<WeatherAlert[]> {
  if (!isOwmAvailable()) return []

  try {
    const key = env.VITE_OWM_API_KEY
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,daily&appid=${key}`
    const response = await fetch(url, { signal })
    if (!response.ok) return []

    const data = await response.json()
    if (!data.alerts || !Array.isArray(data.alerts)) return []

    return data.alerts.map((item: { event: string; description: string; sender_name: string }, index: number) => ({
      id: `owm-alert-${index}`,
      event: item.event,
      severity: 'severe' as const,
      title: item.event,
      description: item.description,
      source: item.sender_name || 'OpenWeatherMap Official',
    }))
  } catch {
    return []
  }
}

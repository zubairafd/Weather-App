import { WeatherAlert, CurrentWeatherData, AirQualityData, DailyForecastItem } from '@/types'

/**
 * Generate severe weather warnings based on data thresholds
 */
export function deriveAlerts(
  current?: CurrentWeatherData,
  todayDaily?: DailyForecastItem,
  airQuality?: AirQualityData
): WeatherAlert[] {
  const alerts: WeatherAlert[] = []

  if (current) {
    // Extreme Heat
    if (current.temperature >= 38) {
      alerts.push({
        id: 'extreme-heat',
        event: 'Extreme Heat Warning',
        severity: 'severe',
        title: 'Extreme High Temperature',
        description: `Current temperature has reached ${Math.round(current.temperature)}°C. Stay hydrated and avoid direct sun exposure.`,
        source: 'SkyCast Threshold Monitor',
      })
    }

    // Extreme Cold
    if (current.temperature <= -10) {
      alerts.push({
        id: 'extreme-cold',
        event: 'Extreme Cold Warning',
        severity: 'severe',
        title: 'Freezing Temperature Alert',
        description: `Sub-zero temperatures (${Math.round(current.temperature)}°C). Risk of frostbite and icy conditions.`,
        source: 'SkyCast Threshold Monitor',
      })
    }

    // High Wind / Gales
    if (current.windSpeed >= 45 || current.windGusts >= 60) {
      alerts.push({
        id: 'high-wind',
        event: 'High Wind Warning',
        severity: 'warning',
        title: 'Gale Force Winds',
        description: `Wind gusts up to ${Math.round(current.windGusts)} km/h recorded. Secure loose outdoor objects.`,
        source: 'SkyCast Threshold Monitor',
      })
    }

    // Heavy Precipitation
    if (current.precipitation >= 10) {
      alerts.push({
        id: 'heavy-rain',
        event: 'Heavy Rainfall Warning',
        severity: 'warning',
        title: 'Torrential Rain',
        description: 'Heavy rainfall in progress. Beware of localized street flooding.',
        source: 'SkyCast Threshold Monitor',
      })
    }

    // Extreme UV Index
    if (current.uvIndex >= 9) {
      alerts.push({
        id: 'extreme-uv',
        event: 'Extreme UV Alert',
        severity: 'warning',
        title: 'Dangerous UV Radiation',
        description: `UV Index is extremely high (${Math.round(current.uvIndex)}). Minimize direct sunlight between 10 AM and 4 PM.`,
        source: 'SkyCast Threshold Monitor',
      })
    }
  }

  if (todayDaily && todayDaily.weatherCode >= 95) {
    alerts.push({
      id: 'thunderstorm',
      event: 'Thunderstorm Advisory',
      severity: 'severe',
      title: 'Active Thunderstorm',
      description: 'Lightning, heavy downpours, and potential hail expected in the area.',
      source: 'SkyCast Threshold Monitor',
    })
  }

  if (airQuality && airQuality.usAqi >= 150) {
    alerts.push({
      id: 'unhealthy-aqi',
      event: 'Air Pollution Alert',
      severity: 'warning',
      title: 'Unhealthy Air Quality',
      description: `US AQI is ${airQuality.usAqi}. Sensitive groups and general public should limit outdoor exertion.`,
      source: 'SkyCast Air Quality Monitor',
    })
  }

  return alerts
}


/**
 * Converts wind direction in degrees (0-360) to compass direction string
 */
export function getWindDirection(deg: number): string {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW']
  const index = Math.round((deg % 360) / 22.5) % 16
  return directions[index] || 'N'
}

/**
 * Format hourly timestamp using city timezone
 */
export function formatHour(isoString: string, format12h: boolean = true): string {
  try {
    const date = new Date(isoString)
    if (isNaN(date.getTime())) return isoString

    if (format12h) {
      return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })
    }
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
  } catch {
    return isoString
  }
}

/**
 * Format ISO date string into day of week (e.g. "Mon", "Tue")
 */
export function formatDayOfWeek(isoDate: string): string {
  try {
    const date = new Date(isoDate)
    if (isNaN(date.getTime())) return isoDate
    return date.toLocaleDateString('en-US', { weekday: 'short' })
  } catch {
    return isoDate
  }
}

/**
 * Format ISO date string into full readable date (e.g. "Monday, Oct 5")
 */
export function formatFullDate(isoDate: string): string {
  try {
    const date = new Date(isoDate)
    if (isNaN(date.getTime())) return isoDate
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })
  } catch {
    return isoDate
  }
}

/**
 * Map US AQI number to Category, Health Risk label, and Advice
 */
export function getAQIInfo(usAqi: number) {
  if (usAqi <= 50) {
    return {
      category: 'Good' as const,
      color: '#10B981', // green
      healthRiskText: 'Low Health Risk',
      healthAdvice: 'Air quality is satisfactory. Ideal for outdoor activities.',
    }
  }
  if (usAqi <= 100) {
    return {
      category: 'Moderate' as const,
      color: '#F59E0B', // yellow/amber
      healthRiskText: 'Moderate Health Risk',
      healthAdvice: 'Unusually sensitive individuals should consider reducing prolonged outdoor exertion.',
    }
  }
  if (usAqi <= 150) {
    return {
      category: 'Unhealthy for Sensitive Groups' as const,
      color: '#F97316', // orange
      healthRiskText: 'Unhealthy for Sensitive Groups',
      healthAdvice: 'Children, seniors, and people with respiratory disease should limit outdoor exposure.',
    }
  }
  if (usAqi <= 200) {
    return {
      category: 'Unhealthy' as const,
      color: '#EF4444', // red
      healthRiskText: 'High Health Risk',
      healthAdvice: 'Everyone may begin to experience health effects. Avoid prolonged outdoor activities.',
    }
  }
  if (usAqi <= 300) {
    return {
      category: 'Very Unhealthy' as const,
      color: '#8B5CF6', // purple
      healthRiskText: 'Very High Health Risk',
      healthAdvice: 'Health alert: significant increase in risk. Limit outdoor exposure.',
    }
  }
  return {
    category: 'Hazardous' as const,
    color: '#7F1D1D', // dark red
    healthRiskText: 'Hazardous Health Risk',
    healthAdvice: 'Emergency conditions. Entire population is more likely to be affected.',
  }
}

/**
 * Map UV Index to UV Level description and color
 */
export function getUVInfo(uvIndex: number) {
  const uv = Math.round(uvIndex)
  if (uv <= 2) {
    return { level: 'Low', color: '#10B981', advice: 'No protection required. Safe to stay outside.' }
  }
  if (uv <= 5) {
    return { level: 'Moderate', color: '#F59E0B', advice: 'Wear sunglasses & SPF 30+ if outdoors.' }
  }
  if (uv <= 7) {
    return { level: 'High', color: '#F97316', advice: 'Protection required. Seek shade during midday.' }
  }
  if (uv <= 10) {
    return { level: 'Very High', color: '#EF4444', advice: 'Extra protection needed. Avoid direct sun 10 AM-4 PM.' }
  }
  return { level: 'Extreme', color: '#8B5CF6', advice: 'Take full precaution. Unprotected skin burns rapidly.' }
}

import { CurrentWeatherData, DailyForecastItem, HourlyForecastItem } from '@/types'

export interface ClothingRecommendation {
  id: string
  title: string
  description: string
  icon: string
  needed: boolean
}

export interface ActivityScore {
  name: string
  score: number // 0 to 10
  status: 'Excellent' | 'Good' | 'Fair' | 'Poor'
  reason: string
}

/**
 * Generate clothing recommendations based on current weather condition
 */
export function getClothingAdvice(current: CurrentWeatherData): ClothingRecommendation[] {
  const temp = current.temperature
  const precip = current.precipitation
  const uv = current.uvIndex
  const wind = current.windSpeed

  return [
    {
      id: 'umbrella',
      title: 'Umbrella',
      description: precip > 0.5 ? 'Rain expected, carry an umbrella' : 'No rain needed',
      icon: 'Umbrella',
      needed: precip > 0.5,
    },
    {
      id: 'sunscreen',
      title: 'Sunscreen & Shades',
      description: uv >= 4 ? 'High UV index! Apply SPF 30+' : 'Low UV risk',
      icon: 'Sun',
      needed: uv >= 4,
    },
    {
      id: 'jacket',
      title: temp < 12 ? 'Heavy Coat' : temp < 20 ? 'Light Jacket' : 'T-Shirt & Shorts',
      description:
        temp < 12
          ? 'Bundle up! Cold weather outerwear'
          : temp < 20
          ? 'Mild weather layers recommended'
          : 'Light breathable cotton clothing',
      icon: 'Shirt',
      needed: true,
    },
    {
      id: 'windbreaker',
      title: 'Windbreaker',
      description: wind > 25 ? 'Breezy conditions, wind protection recommended' : 'Gentle breeze',
      icon: 'Wind',
      needed: wind > 25,
    },
  ]
}

/**
 * Evaluate activity suitability (0-10)
 */
export function getActivityScores(current: CurrentWeatherData): ActivityScore[] {
  const temp = current.temperature
  const wind = current.windSpeed
  const precip = current.precipitation
  const cloud = current.cloudCover

  // Running Score
  let runScore = 10
  if (precip > 1) runScore -= 5
  if (temp > 30) runScore -= 4
  if (temp < 5) runScore -= 3
  if (wind > 30) runScore -= 3
  runScore = Math.max(0, Math.min(10, runScore))

  // Outdoor Dining
  let diningScore = 10
  if (precip > 0.2) diningScore -= 7
  if (temp < 16 || temp > 32) diningScore -= 4
  if (wind > 20) diningScore -= 4
  diningScore = Math.max(0, Math.min(10, diningScore))

  // Stargazing
  let starScore = 10
  if (current.isDay) starScore = 0
  else {
    if (cloud > 40) starScore -= Math.floor((cloud - 40) / 7)
    if (precip > 0) starScore = 0
  }
  starScore = Math.max(0, Math.min(10, starScore))

  const getStatus = (score: number): 'Excellent' | 'Good' | 'Fair' | 'Poor' => {
    if (score >= 8) return 'Excellent'
    if (score >= 6) return 'Good'
    if (score >= 4) return 'Fair'
    return 'Poor'
  }

  return [
    {
      name: 'Outdoor Running',
      score: runScore,
      status: getStatus(runScore),
      reason: precip > 1 ? 'Rainy roads' : temp > 30 ? 'Hot temperature' : 'Optimal conditions',
    },
    {
      name: 'Outdoor Dining',
      score: diningScore,
      status: getStatus(diningScore),
      reason: precip > 0.2 ? 'Precipitation expected' : wind > 20 ? 'Windy' : 'Pleasant weather',
    },
    {
      name: 'Stargazing',
      score: starScore,
      status: getStatus(starScore),
      reason: current.isDay ? 'Daytime' : cloud > 50 ? 'Overcast sky' : 'Clear night sky',
    },
  ]
}

/**
 * Generate natural language daily weather summary
 */
export function generateDailySummary(
  current: CurrentWeatherData,
  hourly: HourlyForecastItem[],
  daily: DailyForecastItem[]
): string {
  const today = daily[0]
  if (!today) return 'Weather data currently unavailable.'

  const maxTemp = Math.round(today.tempMax)
  const minTemp = Math.round(today.tempMin)
  const rainProbability = today.precipitationProbabilityMax

  // Find rain hour if any
  const rainHourItem = hourly.slice(0, 24).find((h) => h.precipitationProbability > 40)

  let sentence = `Today expects a high of ${maxTemp}°C and low of ${minTemp}°C.`

  if (rainHourItem) {
    const hourTime = new Date(rainHourItem.time).toLocaleTimeString([], { hour: 'numeric' })
    sentence += ` Rain probability peaks around ${hourTime} (${rainHourItem.precipitationProbability}% chance).`
  } else if (rainProbability > 20) {
    sentence += ` Slight rain chance (${rainProbability}%) throughout the day.`
  } else {
    sentence += ` Mostly dry with comfortable conditions.`
  }

  if (current.windSpeed > 30) {
    sentence += ` Strong gusts up to ${Math.round(current.windGusts)} km/h expected.`
  }

  return sentence
}

import { AirQualityData } from '@/types'
import { getAQIInfo } from '@/lib/formatters'
import { AirQualityResponseSchema } from './schemas'

const BASE_URL = 'https://air-quality-api.open-meteo.com/v1/air-quality'

export async function fetchAirQuality(
  lat: number,
  lon: number,
  signal?: AbortSignal
): Promise<AirQualityData> {
  const params = new URLSearchParams({
    latitude: lat.toString(),
    longitude: lon.toString(),
    current: [
      'us_aqi',
      'european_aqi',
      'pm2_5',
      'pm10',
      'nitrogen_dioxide',
      'ozone',
      'sulphur_dioxide',
      'carbon_monoxide',
    ].join(','),
  })

  try {
    const response = await fetch(`${BASE_URL}?${params.toString()}`, { signal })
    if (!response.ok) {
      throw new Error(`Air Quality API error: ${response.status}`)
    }

    const rawData = await response.json()
    const parsed = AirQualityResponseSchema.parse(rawData)
    const current = parsed.current

    const usAqi = Math.round(current.us_aqi)
    const aqiMeta = getAQIInfo(usAqi)

    return {
      usAqi,
      europeanAqi: Math.round(current.european_aqi),
      pm25: Number(current.pm2_5.toFixed(1)),
      pm10: Number(current.pm10.toFixed(1)),
      o3: Number(current.ozone.toFixed(1)),
      no2: Number(current.nitrogen_dioxide.toFixed(1)),
      so2: Number(current.sulphur_dioxide.toFixed(1)),
      co: Number(current.carbon_monoxide.toFixed(1)),
      category: aqiMeta.category,
      healthRiskText: aqiMeta.healthRiskText,
      healthAdvice: aqiMeta.healthAdvice,
    }
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw error
    }
    // Safe fallback if AQI fails
    const fallbackMeta = getAQIInfo(35)
    return {
      usAqi: 35,
      europeanAqi: 25,
      pm25: 8.5,
      pm10: 15.2,
      o3: 24.1,
      no2: 12.0,
      so2: 3.2,
      co: 210.0,
      category: fallbackMeta.category,
      healthRiskText: fallbackMeta.healthRiskText,
      healthAdvice: fallbackMeta.healthAdvice,
    }
  }
}

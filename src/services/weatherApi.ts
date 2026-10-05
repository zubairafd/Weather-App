import { WeatherData, LocationData, HourlyForecastItem, DailyForecastItem } from '@/types'
import { OpenMeteoForecastResponseSchema } from './schemas'

const BASE_URL = 'https://api.open-meteo.com/v1/forecast'

/**
 * Fetch weather forecast for given location coordinates
 */
export async function fetchWeatherData(
  location: LocationData,
  signal?: AbortSignal
): Promise<WeatherData> {
  const params = new URLSearchParams({
    latitude: location.latitude.toString(),
    longitude: location.longitude.toString(),
    current: [
      'temperature_2m',
      'relative_humidity_2m',
      'apparent_temperature',
      'is_day',
      'precipitation',
      'weather_code',
      'surface_pressure',
      'wind_speed_10m',
      'wind_direction_10m',
      'wind_gusts_10m',
      'cloud_cover',
      'visibility',
      'dew_point_2m',
      'uv_index',
    ].join(','),
    hourly: [
      'temperature_2m',
      'relative_humidity_2m',
      'apparent_temperature',
      'precipitation_probability',
      'precipitation',
      'weather_code',
      'surface_pressure',
      'wind_speed_10m',
      'wind_direction_10m',
      'is_day',
      'uv_index',
    ].join(','),
    daily: [
      'weather_code',
      'temperature_2m_max',
      'temperature_2m_min',
      'apparent_temperature_max',
      'apparent_temperature_min',
      'sunrise',
      'sunset',
      'uv_index_max',
      'precipitation_sum',
      'precipitation_probability_max',
      'wind_speed_10m_max',
      'wind_direction_10m_dominant',
    ].join(','),
    forecast_days: '14',
    timezone: location.timezone || 'auto',
  })

  try {
    const response = await fetch(`${BASE_URL}?${params.toString()}`, { signal })
    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status} ${response.statusText}`)
    }

    const rawData = await response.json()
    const parsed = OpenMeteoForecastResponseSchema.parse(rawData)

    // Transform hourly items (next 48 hours)
    const hourly: HourlyForecastItem[] = parsed.hourly.time.slice(0, 48).map((time, idx) => ({
      time,
      temperature: parsed.hourly.temperature_2m[idx] ?? 0,
      apparentTemperature: parsed.hourly.apparent_temperature?.[idx] ?? parsed.hourly.temperature_2m[idx] ?? 0,
      weatherCode: parsed.hourly.weather_code[idx] ?? 0,
      isDay: parsed.hourly.is_day?.[idx] === 1,
      precipitationProbability: parsed.hourly.precipitation_probability?.[idx] ?? 0,
      precipitation: parsed.hourly.precipitation?.[idx] ?? 0,
      windSpeed: parsed.hourly.wind_speed_10m?.[idx] ?? 0,
      windDirection: parsed.hourly.wind_direction_10m?.[idx] ?? 0,
      humidity: parsed.hourly.relative_humidity_2m?.[idx] ?? 0,
      uvIndex: parsed.hourly.uv_index?.[idx] ?? 0,
    }))

    // Transform daily items
    const daily: DailyForecastItem[] = parsed.daily.time.map((date, idx) => ({
      date,
      weatherCode: parsed.daily.weather_code[idx] ?? 0,
      tempMax: parsed.daily.temperature_2m_max[idx] ?? 0,
      tempMin: parsed.daily.temperature_2m_min[idx] ?? 0,
      apparentTempMax: parsed.daily.apparent_temperature_max?.[idx] ?? parsed.daily.temperature_2m_max[idx] ?? 0,
      apparentTempMin: parsed.daily.apparent_temperature_min?.[idx] ?? parsed.daily.temperature_2m_min[idx] ?? 0,
      sunrise: parsed.daily.sunrise[idx] ?? '',
      sunset: parsed.daily.sunset[idx] ?? '',
      uvIndexMax: parsed.daily.uv_index_max?.[idx] ?? 0,
      precipitationSum: parsed.daily.precipitation_sum?.[idx] ?? 0,
      precipitationProbabilityMax: parsed.daily.precipitation_probability_max?.[idx] ?? 0,
      windSpeedMax: parsed.daily.wind_speed_10m_max?.[idx] ?? 0,
      windDirectionDominant: parsed.daily.wind_direction_10m_dominant?.[idx] ?? 0,
    }))

    return {
      location: {
        ...location,
        timezone: parsed.timezone,
      },
      current: {
        time: parsed.current.time,
        temperature: parsed.current.temperature_2m,
        apparentTemperature: parsed.current.apparent_temperature,
        weatherCode: parsed.current.weather_code,
        isDay: parsed.current.is_day,
        humidity: parsed.current.relative_humidity_2m,
        windSpeed: parsed.current.wind_speed_10m,
        windDirection: parsed.current.wind_direction_10m,
        windGusts: parsed.current.wind_gusts_10m,
        pressure: parsed.current.surface_pressure,
        uvIndex: parsed.current.uv_index,
        visibility: parsed.current.visibility,
        dewPoint: parsed.current.dew_point_2m,
        cloudCover: parsed.current.cloud_cover,
        precipitation: parsed.current.precipitation,
      },
      hourly,
      daily,
      timezone: parsed.timezone,
      lastUpdated: new Date().toISOString(),
    }
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw error
    }
    throw new Error(error instanceof Error ? error.message : 'Failed to fetch weather data')
  }
}

export type WeatherThemeKey =
  | 'clear-day'
  | 'clear-night'
  | 'cloudy'
  | 'rain'
  | 'thunderstorm'
  | 'snow'
  | 'fog'

export type EffectType = 'rain' | 'snow' | 'clouds' | 'stars' | 'lightning' | 'none'

export interface WMOWeatherInfo {
  code: number
  label: string
  dayIcon: string
  nightIcon: string
  themeKey: WeatherThemeKey
  effect: EffectType
}

export interface LocationData {
  id?: number | string
  name: string
  country: string
  admin1?: string
  latitude: number
  longitude: number
  timezone: string
}

export interface CurrentWeatherData {
  time: string
  temperature: number
  apparentTemperature: number
  weatherCode: number
  isDay: boolean
  humidity: number
  windSpeed: number
  windDirection: number
  windGusts: number
  pressure: number
  uvIndex: number
  visibility: number
  dewPoint: number
  cloudCover: number
  precipitation: number
}

export interface HourlyForecastItem {
  time: string
  temperature: number
  apparentTemperature: number
  weatherCode: number
  isDay: boolean
  precipitationProbability: number
  precipitation: number
  windSpeed: number
  windDirection: number
  humidity: number
  uvIndex: number
}

export interface DailyForecastItem {
  date: string
  weatherCode: number
  tempMax: number
  tempMin: number
  apparentTempMax: number
  apparentTempMin: number
  sunrise: string
  sunset: string
  uvIndexMax: number
  precipitationSum: number
  precipitationProbabilityMax: number
  windSpeedMax: number
  windDirectionDominant: number
}

export interface WeatherData {
  location: LocationData
  current: CurrentWeatherData
  hourly: HourlyForecastItem[]
  daily: DailyForecastItem[]
  timezone: string
  lastUpdated: string
}

export interface AirQualityData {
  usAqi: number
  europeanAqi: number
  pm25: number
  pm10: number
  o3: number
  no2: number
  so2: number
  co: number
  pollen?: {
    birch?: number
    grass?: number
    ragweed?: number
  }
  category: 'Good' | 'Moderate' | 'Unhealthy for Sensitive Groups' | 'Unhealthy' | 'Very Unhealthy' | 'Hazardous'
  healthRiskText: string
  healthAdvice: string
}

export interface WeatherAlert {
  id: string
  event: string
  severity: 'info' | 'warning' | 'severe' | 'extreme'
  title: string
  description: string
  source: string
}

export type TempUnit = 'C' | 'F'
export type SpeedUnit = 'kmh' | 'mph' | 'ms'
export type PressureUnit = 'hPa' | 'inHg'
export type PrecipUnit = 'mm' | 'in'
export type TimeFormat = '12h' | '24h'
export type ThemeMode = 'auto' | 'dark' | 'light'
export type Language = 'en' | 'ur'

export interface UserSettings {
  tempUnit: TempUnit
  speedUnit: SpeedUnit
  pressureUnit: PressureUnit
  precipUnit: PrecipUnit
  timeFormat: TimeFormat
  themeMode: ThemeMode
  language: Language
  enableNotifications: boolean
}

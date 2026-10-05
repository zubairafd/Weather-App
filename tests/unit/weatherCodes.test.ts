import { describe, it, expect } from 'vitest'
import { getWeatherInfo } from '@/lib/weatherCodes'

describe('weatherCodes mapping', () => {
  it('should map WMO code 0 correctly for day and night', () => {
    const day = getWeatherInfo(0, true)
    expect(day.label).toBe('Clear sky')
    expect(day.themeKey).toBe('clear-day')
    expect(day.dayIcon).toBe('Sun')

    const night = getWeatherInfo(0, false)
    expect(night.themeKey).toBe('clear-night')
    expect(night.effect).toBe('stars')
  })

  it('should map WMO code 61 (slight rain)', () => {
    const rain = getWeatherInfo(61)
    expect(rain.label).toBe('Slight rain')
    expect(rain.themeKey).toBe('rain')
    expect(rain.effect).toBe('rain')
  })

  it('should map WMO code 95 (thunderstorm)', () => {
    const storm = getWeatherInfo(95)
    expect(storm.label).toBe('Thunderstorm')
    expect(storm.themeKey).toBe('thunderstorm')
    expect(storm.effect).toBe('lightning')
  })

  it('should return safe fallback for unknown WMO codes', () => {
    const fallback = getWeatherInfo(999)
    expect(fallback.label).toBeDefined()
    expect(fallback.themeKey).toBeDefined()
  })
})

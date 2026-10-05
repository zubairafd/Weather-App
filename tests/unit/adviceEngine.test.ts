import { describe, it, expect } from 'vitest'
import { getClothingAdvice, getActivityScores } from '@/lib/adviceEngine'
import { CurrentWeatherData } from '@/types'

const mockCurrent: CurrentWeatherData = {
  time: '2026-10-05T12:00',
  temperature: 28,
  apparentTemperature: 30,
  weatherCode: 0,
  isDay: true,
  humidity: 45,
  windSpeed: 12,
  windDirection: 180,
  windGusts: 15,
  pressure: 1014,
  uvIndex: 7,
  visibility: 10000,
  dewPoint: 14,
  cloudCover: 10,
  precipitation: 0,
}

describe('adviceEngine rules', () => {
  it('should recommend sunscreen when UV is high (>=4)', () => {
    const advice = getClothingAdvice(mockCurrent)
    const sunscreen = advice.find((a) => a.id === 'sunscreen')
    expect(sunscreen?.needed).toBe(true)
  })

  it('should recommend umbrella when rain precipitation > 0.5', () => {
    const rainyCurrent = { ...mockCurrent, precipitation: 2.5 }
    const advice = getClothingAdvice(rainyCurrent)
    const umbrella = advice.find((a) => a.id === 'umbrella')
    expect(umbrella?.needed).toBe(true)
  })

  it('should calculate outdoor running score', () => {
    const scores = getActivityScores(mockCurrent)
    const running = scores.find((s) => s.name === 'Outdoor Running')
    expect(running?.score).toBeGreaterThan(0)
    expect(running?.status).toBeDefined()
  })
})

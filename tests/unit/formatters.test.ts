import { describe, it, expect } from 'vitest'
import { getWindDirection, getAQIInfo, getUVInfo } from '@/lib/formatters'

describe('formatters', () => {
  it('should map wind degrees to compass directions', () => {
    expect(getWindDirection(0)).toBe('N')
    expect(getWindDirection(90)).toBe('E')
    expect(getWindDirection(180)).toBe('S')
    expect(getWindDirection(270)).toBe('W')
  })

  it('should classify AQI ranges', () => {
    const good = getAQIInfo(25)
    expect(good.category).toBe('Good')
    expect(good.healthRiskText).toBe('Low Health Risk')

    const unhealthy = getAQIInfo(175)
    expect(unhealthy.category).toBe('Unhealthy')
  })

  it('should classify UV levels', () => {
    expect(getUVInfo(1).level).toBe('Low')
    expect(getUVInfo(6).level).toBe('High')
    expect(getUVInfo(11).level).toBe('Extreme')
  })
})

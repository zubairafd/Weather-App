import { describe, it, expect } from 'vitest'
import { getMoonPhase } from '@/lib/moonPhase'

describe('moonPhase astronomical algorithm', () => {
  it('should return valid moon phase calculation for current date', () => {
    const phaseInfo = getMoonPhase(new Date('2026-10-05'))
    expect(phaseInfo.phase).toBeGreaterThanOrEqual(0)
    expect(phaseInfo.phase).toBeLessThanOrEqual(1)
    expect(phaseInfo.name).toBeDefined()
    expect(phaseInfo.illumination).toBeGreaterThanOrEqual(0)
    expect(phaseInfo.illumination).toBeLessThanOrEqual(100)
  })
})

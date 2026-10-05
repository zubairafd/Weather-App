import { describe, it, expect } from 'vitest'
import { formatTemp, convertTemp, formatSpeed, formatPressure, formatPrecip } from '@/lib/unitConversion'

describe('unitConversion utilities', () => {
  it('should format temperature in C and F correctly', () => {
    expect(formatTemp(25, 'C')).toBe('25°')
    expect(formatTemp(0, 'C')).toBe('0°')
    expect(formatTemp(0, 'F')).toBe('32°')
    expect(formatTemp(100, 'F')).toBe('212°')
  })

  it('should convert numerical temperature', () => {
    expect(convertTemp(20, 'C')).toBe(20)
    expect(convertTemp(20, 'F')).toBe(68)
  })

  it('should format wind speed in kmh, mph, ms', () => {
    expect(formatSpeed(10, 'kmh')).toBe('10 km/h')
    expect(formatSpeed(10, 'mph')).toBe('6 mph')
    expect(formatSpeed(36, 'ms')).toBe('10.0 m/s')
  })

  it('should format pressure in hPa and inHg', () => {
    expect(formatPressure(1013, 'hPa')).toBe('1013 hPa')
    expect(formatPressure(1013.25, 'inHg')).toBe('29.92 inHg')
  })

  it('should format precipitation depth in mm and in', () => {
    expect(formatPrecip(5.4, 'mm')).toBe('5.4 mm')
    expect(formatPrecip(25.4, 'in')).toBe('1.00 in')
  })
})

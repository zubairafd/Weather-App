import { TempUnit, SpeedUnit, PressureUnit, PrecipUnit } from '@/types'

/**
 * Format temperature with specified unit
 */
export function formatTemp(celsius: number, unit: TempUnit = 'C'): string {
  if (unit === 'F') {
    const fahrenheit = Math.round((celsius * 9) / 5 + 32)
    return `${fahrenheit}°`
  }
  return `${Math.round(celsius)}°`
}

export function convertTemp(celsius: number, unit: TempUnit = 'C'): number {
  if (unit === 'F') {
    return Math.round((celsius * 9) / 5 + 32)
  }
  return Math.round(celsius)
}

/**
 * Format speed with specified unit
 */
export function formatSpeed(kmh: number, unit: SpeedUnit = 'kmh'): string {
  if (unit === 'mph') {
    const mph = Math.round(kmh * 0.621371)
    return `${mph} mph`
  }
  if (unit === 'ms') {
    const ms = (kmh / 3.6).toFixed(1)
    return `${ms} m/s`
  }
  return `${Math.round(kmh)} km/h`
}

/**
 * Format pressure with specified unit
 */
export function formatPressure(hPa: number, unit: PressureUnit = 'hPa'): string {
  if (unit === 'inHg') {
    const inHg = (hPa * 0.02953).toFixed(2)
    return `${inHg} inHg`
  }
  return `${Math.round(hPa)} hPa`
}

/**
 * Format precipitation depth with specified unit
 */
export function formatPrecip(mm: number, unit: PrecipUnit = 'mm'): string {
  if (unit === 'in') {
    const inches = (mm * 0.0393701).toFixed(2)
    return `${inches} in`
  }
  return `${mm.toFixed(1)} mm`
}

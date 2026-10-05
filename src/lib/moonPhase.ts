export interface MoonPhaseInfo {
  phase: number // 0 to 1 (0 = New Moon, 0.25 = First Quarter, 0.5 = Full Moon, 0.75 = Last Quarter)
  name: string
  illumination: number // 0% to 100%
  iconName: string
}

/**
 * Calculates Moon Phase for a given date
 * Based on astronomical algorithms (Leshner / Conway approximation)
 */
export function getMoonPhase(date: Date = new Date()): MoonPhaseInfo {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  let c = 0
  let e = 0
  let jd = 0

  if (month < 3) {
    c = year - 1
    e = month + 12
  } else {
    c = year
    e = month
  }

  jd = Math.floor(365.25 * c) + Math.floor(30.6001 * (e + 1)) + day + 1720995
  let b = 0
  if (jd >= 2299161) {
    const a = Math.floor(c / 100)
    b = 2 - a + Math.floor(a / 4)
  }
  const julianDay = jd + b

  // Synodic month length in days = 29.53058867
  const daysSinceNewMoon = (julianDay - 2451549.5) % 29.53058867
  const normalizedPhase = (daysSinceNewMoon < 0 ? daysSinceNewMoon + 29.53058867 : daysSinceNewMoon) / 29.53058867

  // Illumination calculation
  const illumination = Math.round((1 - Math.cos(normalizedPhase * 2 * Math.PI)) * 50)

  let name = 'New Moon'
  let iconName = 'Moon'

  if (normalizedPhase < 0.03 || normalizedPhase >= 0.97) {
    name = 'New Moon'
  } else if (normalizedPhase < 0.22) {
    name = 'Waxing Crescent'
  } else if (normalizedPhase < 0.28) {
    name = 'First Quarter'
  } else if (normalizedPhase < 0.47) {
    name = 'Waxing Gibbous'
  } else if (normalizedPhase < 0.53) {
    name = 'Full Moon'
  } else if (normalizedPhase < 0.72) {
    name = 'Waning Gibbous'
  } else if (normalizedPhase < 0.78) {
    name = 'Last Quarter'
  } else {
    name = 'Waning Crescent'
  }

  return {
    phase: Number(normalizedPhase.toFixed(2)),
    name,
    illumination,
    iconName,
  }
}

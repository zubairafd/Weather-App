import { WMOWeatherInfo } from '@/types'

const WEATHER_CODE_MAP: Record<number, WMOWeatherInfo> = {
  0: {
    code: 0,
    label: 'Clear sky',
    dayIcon: 'Sun',
    nightIcon: 'Moon',
    themeKey: 'clear-day',
    effect: 'none',
  },
  1: {
    code: 1,
    label: 'Mainly clear',
    dayIcon: 'SunCloud',
    nightIcon: 'MoonCloud',
    themeKey: 'clear-day',
    effect: 'none',
  },
  2: {
    code: 2,
    label: 'Partly cloudy',
    dayIcon: 'SunCloud',
    nightIcon: 'MoonCloud',
    themeKey: 'cloudy',
    effect: 'clouds',
  },
  3: {
    code: 3,
    label: 'Overcast',
    dayIcon: 'Cloud',
    nightIcon: 'Cloud',
    themeKey: 'cloudy',
    effect: 'clouds',
  },
  45: {
    code: 45,
    label: 'Foggy',
    dayIcon: 'CloudFog',
    nightIcon: 'CloudFog',
    themeKey: 'fog',
    effect: 'clouds',
  },
  48: {
    code: 48,
    label: 'Depositing rime fog',
    dayIcon: 'CloudFog',
    nightIcon: 'CloudFog',
    themeKey: 'fog',
    effect: 'clouds',
  },
  51: {
    code: 51,
    label: 'Light drizzle',
    dayIcon: 'CloudDrizzle',
    nightIcon: 'CloudDrizzle',
    themeKey: 'rain',
    effect: 'rain',
  },
  53: {
    code: 53,
    label: 'Moderate drizzle',
    dayIcon: 'CloudDrizzle',
    nightIcon: 'CloudDrizzle',
    themeKey: 'rain',
    effect: 'rain',
  },
  55: {
    code: 55,
    label: 'Dense drizzle',
    dayIcon: 'CloudRain',
    nightIcon: 'CloudRain',
    themeKey: 'rain',
    effect: 'rain',
  },
  56: {
    code: 56,
    label: 'Light freezing drizzle',
    dayIcon: 'CloudHail',
    nightIcon: 'CloudHail',
    themeKey: 'snow',
    effect: 'snow',
  },
  57: {
    code: 57,
    label: 'Dense freezing drizzle',
    dayIcon: 'CloudHail',
    nightIcon: 'CloudHail',
    themeKey: 'snow',
    effect: 'snow',
  },
  61: {
    code: 61,
    label: 'Slight rain',
    dayIcon: 'CloudRain',
    nightIcon: 'CloudRain',
    themeKey: 'rain',
    effect: 'rain',
  },
  63: {
    code: 63,
    label: 'Moderate rain',
    dayIcon: 'CloudRain',
    nightIcon: 'CloudRain',
    themeKey: 'rain',
    effect: 'rain',
  },
  65: {
    code: 65,
    label: 'Heavy rain',
    dayIcon: 'CloudRainHeavy',
    nightIcon: 'CloudRainHeavy',
    themeKey: 'rain',
    effect: 'rain',
  },
  66: {
    code: 66,
    label: 'Light freezing rain',
    dayIcon: 'CloudHail',
    nightIcon: 'CloudHail',
    themeKey: 'rain',
    effect: 'rain',
  },
  67: {
    code: 67,
    label: 'Heavy freezing rain',
    dayIcon: 'CloudHail',
    nightIcon: 'CloudHail',
    themeKey: 'rain',
    effect: 'rain',
  },
  71: {
    code: 71,
    label: 'Slight snow fall',
    dayIcon: 'CloudSnow',
    nightIcon: 'CloudSnow',
    themeKey: 'snow',
    effect: 'snow',
  },
  73: {
    code: 73,
    label: 'Moderate snow fall',
    dayIcon: 'CloudSnow',
    nightIcon: 'CloudSnow',
    themeKey: 'snow',
    effect: 'snow',
  },
  75: {
    code: 75,
    label: 'Heavy snow fall',
    dayIcon: 'CloudSnow',
    nightIcon: 'CloudSnow',
    themeKey: 'snow',
    effect: 'snow',
  },
  77: {
    code: 77,
    label: 'Snow grains',
    dayIcon: 'CloudSnow',
    nightIcon: 'CloudSnow',
    themeKey: 'snow',
    effect: 'snow',
  },
  80: {
    code: 80,
    label: 'Slight rain showers',
    dayIcon: 'CloudRain',
    nightIcon: 'CloudRain',
    themeKey: 'rain',
    effect: 'rain',
  },
  81: {
    code: 81,
    label: 'Moderate rain showers',
    dayIcon: 'CloudRain',
    nightIcon: 'CloudRain',
    themeKey: 'rain',
    effect: 'rain',
  },
  82: {
    code: 82,
    label: 'Violent rain showers',
    dayIcon: 'CloudRainHeavy',
    nightIcon: 'CloudRainHeavy',
    themeKey: 'rain',
    effect: 'rain',
  },
  85: {
    code: 85,
    label: 'Slight snow showers',
    dayIcon: 'CloudSnow',
    nightIcon: 'CloudSnow',
    themeKey: 'snow',
    effect: 'snow',
  },
  86: {
    code: 86,
    label: 'Heavy snow showers',
    dayIcon: 'CloudSnow',
    nightIcon: 'CloudSnow',
    themeKey: 'snow',
    effect: 'snow',
  },
  95: {
    code: 95,
    label: 'Thunderstorm',
    dayIcon: 'CloudLightning',
    nightIcon: 'CloudLightning',
    themeKey: 'thunderstorm',
    effect: 'lightning',
  },
  96: {
    code: 96,
    label: 'Thunderstorm with slight hail',
    dayIcon: 'CloudLightning',
    nightIcon: 'CloudLightning',
    themeKey: 'thunderstorm',
    effect: 'lightning',
  },
  99: {
    code: 99,
    label: 'Thunderstorm with heavy hail',
    dayIcon: 'CloudLightning',
    nightIcon: 'CloudLightning',
    themeKey: 'thunderstorm',
    effect: 'lightning',
  },
}

/**
 * Get weather info mapping for WMO weather code (0-99)
 * Supports day and night variants.
 */
export function getWeatherInfo(code: number, isDay = true): WMOWeatherInfo {
  const match = WEATHER_CODE_MAP[code]
  if (match) {
    if (!isDay && match.themeKey === 'clear-day') {
      return {
        ...match,
        themeKey: 'clear-night',
        effect: 'stars',
      }
    }
    return match
  }

  // Fallback for unknown WMO codes
  if (code >= 50 && code < 70) {
    return {
      code,
      label: 'Rainy',
      dayIcon: 'CloudRain',
      nightIcon: 'CloudRain',
      themeKey: 'rain',
      effect: 'rain',
    }
  }
  if (code >= 70 && code < 90) {
    return {
      code,
      label: 'Snowy',
      dayIcon: 'CloudSnow',
      nightIcon: 'CloudSnow',
      themeKey: 'snow',
      effect: 'snow',
    }
  }
  if (code >= 90) {
    return {
      code,
      label: 'Thunderstorm',
      dayIcon: 'CloudLightning',
      nightIcon: 'CloudLightning',
      themeKey: 'thunderstorm',
      effect: 'lightning',
    }
  }

  return {
    code,
    label: isDay ? 'Clear' : 'Clear Night',
    dayIcon: 'Sun',
    nightIcon: 'Moon',
    themeKey: isDay ? 'clear-day' : 'clear-night',
    effect: isDay ? 'none' : 'stars',
  }
}

import { LocationData } from '@/types'
import { GeocodingResponseSchema } from './schemas'

const SEARCH_URL = 'https://geocoding-api.open-meteo.com/v1/search'
const REVERSE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client'

/**
 * Search city by name with debounced autocomplete capability
 */
export async function searchCities(
  query: string,
  signal?: AbortSignal
): Promise<LocationData[]> {
  if (!query || query.trim().length < 2) return []

  const params = new URLSearchParams({
    name: query.trim(),
    count: '10',
    language: 'en',
    format: 'json',
  })

  try {
    const response = await fetch(`${SEARCH_URL}?${params.toString()}`, { signal })
    if (!response.ok) {
      throw new Error(`Geocoding search failed: ${response.status}`)
    }

    const rawData = await response.json()
    const parsed = GeocodingResponseSchema.parse(rawData)

    if (!parsed.results) return []

    return parsed.results.map((res) => ({
      id: res.id,
      name: res.name,
      country: res.country,
      admin1: res.admin1,
      latitude: res.latitude,
      longitude: res.longitude,
      timezone: res.timezone,
    }))
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw error
    }
    return []
  }
}

/**
 * Reverse geocode coordinates to location city & country
 */
export async function reverseGeocode(
  lat: number,
  lon: number,
  signal?: AbortSignal
): Promise<LocationData> {
  try {
    const response = await fetch(
      `${REVERSE_URL}?latitude=${lat}&longitude=${lon}&localityLanguage=en`,
      { signal }
    )
    if (response.ok) {
      const data = await response.json()
      const cityName = data.city || data.locality || data.principalSubdivision || 'Current Location'
      const countryName = data.countryName || ''

      return {
        id: `geo-${lat.toFixed(2)}-${lon.toFixed(2)}`,
        name: cityName,
        country: countryName,
        latitude: lat,
        longitude: lon,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
      }
    }
  } catch {
    // Fallback if BigDataCloud API fails
  }

  return {
    id: `geo-${lat.toFixed(2)}-${lon.toFixed(2)}`,
    name: 'Current Location',
    country: '',
    latitude: lat,
    longitude: lon,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
  }
}

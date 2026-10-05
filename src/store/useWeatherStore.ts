import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { LocationData, WeatherData } from '@/types'
import { env } from '@/env'

const DEFAULT_LOCATION: LocationData = {
  id: 'default-city',
  name: env.VITE_DEFAULT_CITY,
  country: 'Pakistan',
  latitude: env.VITE_DEFAULT_LAT,
  longitude: env.VITE_DEFAULT_LON,
  timezone: 'Asia/Karachi',
}

const DEFAULT_CITIES: LocationData[] = [
  DEFAULT_LOCATION,
  { id: 'london', name: 'London', country: 'United Kingdom', latitude: 51.5074, longitude: -0.1278, timezone: 'Europe/London' },
  { id: 'tokyo', name: 'Tokyo', country: 'Japan', latitude: 35.6762, longitude: 139.6503, timezone: 'Asia/Tokyo' },
  { id: 'new-york', name: 'New York', country: 'United States', latitude: 40.7128, longitude: -74.006, timezone: 'America/New_York' },
]

interface WeatherState {
  currentLocation: LocationData
  savedCities: LocationData[]
  recentSearches: LocationData[]
  compareCities: LocationData[]
  cachedWeatherData: Record<string, WeatherData>
  
  setCurrentLocation: (loc: LocationData) => void
  addFavorite: (loc: LocationData) => void
  removeFavorite: (id: string | number) => void
  reorderFavorites: (newOrder: LocationData[]) => void
  addRecentSearch: (loc: LocationData) => void
  clearRecentSearches: () => void
  setCompareCities: (cities: LocationData[]) => void
  cacheWeatherData: (key: string, data: WeatherData) => void
}

export const useWeatherStore = create<WeatherState>()(
  persist(
    (set, get) => ({
      currentLocation: DEFAULT_LOCATION,
      savedCities: DEFAULT_CITIES,
      recentSearches: [],
      compareCities: [DEFAULT_CITIES[0], DEFAULT_CITIES[1]],
      cachedWeatherData: {},

      setCurrentLocation: (currentLocation) => set({ currentLocation }),

      addFavorite: (loc) => {
        const { savedCities } = get()
        if (!savedCities.some((c) => c.name === loc.name && c.country === loc.country)) {
          set({ savedCities: [loc, ...savedCities] })
        }
      },

      removeFavorite: (id) => {
        set({ savedCities: get().savedCities.filter((c) => c.id !== id && c.name !== id) })
      },

      reorderFavorites: (savedCities) => set({ savedCities }),

      addRecentSearch: (loc) => {
        const { recentSearches } = get()
        const filtered = recentSearches.filter((c) => c.name !== loc.name)
        set({ recentSearches: [loc, ...filtered].slice(0, 5) })
      },

      clearRecentSearches: () => set({ recentSearches: [] }),

      setCompareCities: (compareCities) => set({ compareCities }),

      cacheWeatherData: (key, data) => {
        set({
          cachedWeatherData: {
            ...get().cachedWeatherData,
            [key]: data,
          },
        })
      },
    }),
    {
      name: 'skycast-weather-store',
    }
  )
)

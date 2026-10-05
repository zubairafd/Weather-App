import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { UserSettings, TempUnit, SpeedUnit, PressureUnit, PrecipUnit, TimeFormat, ThemeMode, Language } from '@/types'

interface SettingsState extends UserSettings {
  setTempUnit: (unit: TempUnit) => void
  setSpeedUnit: (unit: SpeedUnit) => void
  setPressureUnit: (unit: PressureUnit) => void
  setPrecipUnit: (unit: PrecipUnit) => void
  setTimeFormat: (format: TimeFormat) => void
  setThemeMode: (mode: ThemeMode) => void
  setLanguage: (lang: Language) => void
  setEnableNotifications: (enable: boolean) => void
  resetSettings: () => void
}

const defaultSettings: UserSettings = {
  tempUnit: 'C',
  speedUnit: 'kmh',
  pressureUnit: 'hPa',
  precipUnit: 'mm',
  timeFormat: '12h',
  themeMode: 'auto',
  language: 'en',
  enableNotifications: false,
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      ...defaultSettings,
      setTempUnit: (tempUnit) => set({ tempUnit }),
      setSpeedUnit: (speedUnit) => set({ speedUnit }),
      setPressureUnit: (pressureUnit) => set({ pressureUnit }),
      setPrecipUnit: (precipUnit) => set({ precipUnit }),
      setTimeFormat: (timeFormat) => set({ timeFormat }),
      setThemeMode: (themeMode) => set({ themeMode }),
      setLanguage: (language) => set({ language }),
      setEnableNotifications: (enableNotifications) => set({ enableNotifications }),
      resetSettings: () => set(defaultSettings),
    }),
    {
      name: 'skycast-settings',
    }
  )
)

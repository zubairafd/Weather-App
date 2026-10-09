import { z } from 'zod'

const envSchema = z.object({
  VITE_APP_NAME: z.string().default('SkyCast'),
  VITE_DEFAULT_CITY: z.string().default('Peshawar'),
  VITE_DEFAULT_LAT: z.coerce.number().default(34.0151),
  VITE_DEFAULT_LON: z.coerce.number().default(71.5249),
  VITE_OWM_API_KEY: z.string().optional(),
})

export type Env = z.infer<typeof envSchema>

const parseEnv = (): Env => {
  try {
    const raw = {
      VITE_APP_NAME: import.meta.env.VITE_APP_NAME || 'SkyCast',
      VITE_DEFAULT_CITY: import.meta.env.VITE_DEFAULT_CITY || 'Peshawar',
      VITE_DEFAULT_LAT: import.meta.env.VITE_DEFAULT_LAT ? Number(import.meta.env.VITE_DEFAULT_LAT) : 34.0151,
      VITE_DEFAULT_LON: import.meta.env.VITE_DEFAULT_LON ? Number(import.meta.env.VITE_DEFAULT_LON) : 71.5249,
      VITE_OWM_API_KEY: import.meta.env.VITE_OWM_API_KEY || undefined,
    }
    const result = envSchema.safeParse(raw)
    if (result.success) {
      return result.data
    }
    console.warn('⚠️ Environment variable validation warning:', result.error.format())
  } catch (err) {
    console.warn('⚠️ Environment variable parsing error:', err)
  }

  return {
    VITE_APP_NAME: 'SkyCast',
    VITE_DEFAULT_CITY: 'Peshawar',
    VITE_DEFAULT_LAT: 34.0151,
    VITE_DEFAULT_LON: 71.5249,
    VITE_OWM_API_KEY: undefined,
  }
}

export const env = parseEnv()

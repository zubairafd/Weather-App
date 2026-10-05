import { z } from 'zod'

const envSchema = z.object({
  VITE_APP_NAME: z.string().default('SkyCast'),
  VITE_DEFAULT_CITY: z.string().default('Peshawar'),
  VITE_DEFAULT_LAT: z.coerce.number().default(34.0151),
  VITE_DEFAULT_LON: z.coerce.number().default(71.5249),
  VITE_OWM_API_KEY: z.string().optional(),
})

const parseEnv = () => {
  const result = envSchema.safeParse(import.meta.env)
  if (!result.success) {
    console.warn('⚠️ Environment variable validation warning:', result.error.format())
    return {
      VITE_APP_NAME: 'SkyCast',
      VITE_DEFAULT_CITY: 'Peshawar',
      VITE_DEFAULT_LAT: 34.0151,
      VITE_DEFAULT_LON: 71.5249,
      VITE_OWM_API_KEY: undefined,
    }
  }
  return result.data
}

export const env = parseEnv()

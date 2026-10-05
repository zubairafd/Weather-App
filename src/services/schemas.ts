import { z } from 'zod'

export const OpenMeteoCurrentSchema = z.object({
  time: z.string(),
  temperature_2m: z.number(),
  relative_humidity_2m: z.number().optional().default(0),
  apparent_temperature: z.number(),
  is_day: z.number().transform((val) => val === 1),
  precipitation: z.number().optional().default(0),
  weather_code: z.number(),
  surface_pressure: z.number().optional().default(1013),
  wind_speed_10m: z.number().optional().default(0),
  wind_direction_10m: z.number().optional().default(0),
  wind_gusts_10m: z.number().optional().default(0),
  cloud_cover: z.number().optional().default(0),
  visibility: z.number().optional().default(10000),
  dew_point_2m: z.number().optional().default(10),
  uv_index: z.number().optional().default(0),
})

export const OpenMeteoHourlySchema = z.object({
  time: z.array(z.string()),
  temperature_2m: z.array(z.number()),
  relative_humidity_2m: z.array(z.number()).optional(),
  apparent_temperature: z.array(z.number()).optional(),
  precipitation_probability: z.array(z.number()).optional(),
  precipitation: z.array(z.number()).optional(),
  weather_code: z.array(z.number()),
  surface_pressure: z.array(z.number()).optional(),
  wind_speed_10m: z.array(z.number()).optional(),
  wind_direction_10m: z.array(z.number()).optional(),
  is_day: z.array(z.number()).optional(),
  uv_index: z.array(z.number()).optional(),
})

export const OpenMeteoDailySchema = z.object({
  time: z.array(z.string()),
  weather_code: z.array(z.number()),
  temperature_2m_max: z.array(z.number()),
  temperature_2m_min: z.array(z.number()),
  apparent_temperature_max: z.array(z.number()).optional(),
  apparent_temperature_min: z.array(z.number()).optional(),
  sunrise: z.array(z.string()),
  sunset: z.array(z.string()),
  uv_index_max: z.array(z.number()).optional(),
  precipitation_sum: z.array(z.number()).optional(),
  precipitation_probability_max: z.array(z.number()).optional(),
  wind_speed_10m_max: z.array(z.number()).optional(),
  wind_direction_10m_dominant: z.array(z.number()).optional(),
})

export const OpenMeteoForecastResponseSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  timezone: z.string(),
  current: OpenMeteoCurrentSchema,
  hourly: OpenMeteoHourlySchema,
  daily: OpenMeteoDailySchema,
})

export const AirQualityResponseSchema = z.object({
  current: z.object({
    us_aqi: z.number().optional().default(30),
    european_aqi: z.number().optional().default(20),
    pm2_5: z.number().optional().default(5),
    pm10: z.number().optional().default(10),
    nitrogen_dioxide: z.number().optional().default(5),
    ozone: z.number().optional().default(20),
    sulphur_dioxide: z.number().optional().default(2),
    carbon_monoxide: z.number().optional().default(100),
  }),
})

export const GeocodingResultSchema = z.object({
  id: z.number(),
  name: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  country: z.string().optional().default(''),
  admin1: z.string().optional(),
  timezone: z.string().optional().default('UTC'),
})

export const GeocodingResponseSchema = z.object({
  results: z.array(GeocodingResultSchema).optional(),
})

// Vercel Serverless Function Proxy for OpenWeatherMap API

export default async function handler(
  req: { query: Record<string, string> },
  res: { status: (code: number) => { json: (data: unknown) => void } }
) {
  const { lat, lon } = req.query
  const apiKey = (globalThis as unknown as { process?: { env?: Record<string, string> } }).process?.env?.OWM_SECRET_API_KEY

  if (!apiKey) {
    return res.status(500).json({ error: 'OWM_SECRET_API_KEY is not configured on server' })
  }

  if (!lat || !lon) {
    return res.status(400).json({ error: 'Missing lat or lon query parameters' })
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=${apiKey}`
    )
    const data = await response.json()
    return res.status(200).json(data)
  } catch {
    return res.status(500).json({ error: 'Failed to proxy request to OpenWeatherMap' })
  }
}

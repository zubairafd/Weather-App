export interface RadarFrame {
  time: number
  path: string
}

export interface RadarData {
  host: string
  radar: {
    past: RadarFrame[]
    nowcast: RadarFrame[]
  }
}

const RAINVIEWER_API = 'https://api.rainviewer.com/public/weather-maps.json'

/**
 * Fetch RainViewer radar frame timestamps for Leaflet tile overlay
 */
export async function fetchRadarMetadata(signal?: AbortSignal): Promise<RadarData> {
  try {
    const response = await fetch(RAINVIEWER_API, { signal })
    if (!response.ok) throw new Error('RainViewer metadata fetch failed')
    const data = await response.json()
    return {
      host: data.host || 'https://tilecache.rainviewer.com',
      radar: {
        past: data.radar?.past || [],
        nowcast: data.radar?.nowcast || [],
      },
    }
  } catch {
    return {
      host: 'https://tilecache.rainviewer.com',
      radar: {
        past: [],
        nowcast: [],
      },
    }
  }
}

import React, { useState, useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { Play, Pause, RotateCcw } from 'lucide-react'
import { fetchRadarMetadata, RadarFrame } from '@/services/radarApi'
import { LocationData } from '@/types'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

// Fix default Leaflet marker icon URLs
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

interface RadarMapProps {
  location: LocationData
}

// Map Controller component to update map view when location changes
const MapController: React.FC<{ center: [number, number] }> = ({ center }) => {
  const map = useMap()
  useEffect(() => {
    map.flyTo(center, 7, { duration: 1.5 })
  }, [center, map])
  return null
}

export const RadarMap: React.FC<RadarMapProps> = ({ location }) => {
  const [frames, setFrames] = useState<RadarFrame[]>([])
  const [host, setHost] = useState('https://tilecache.rainviewer.com')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [opacity, setOpacity] = useState(0.7)
  const [speed, setSpeed] = useState(1)
  const [mapStyle, setMapStyle] = useState<'dark' | 'light' | 'osm'>('dark')

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    const loadRadar = async () => {
      const data = await fetchRadarMetadata()
      setHost(data.host)
      const allFrames = [...data.radar.past, ...data.radar.nowcast]
      setFrames(allFrames)
      if (allFrames.length > 0) {
        setCurrentIndex(allFrames.length - 1)
      }
    }
    loadRadar()
  }, [])

  // Animation player loop
  useEffect(() => {
    if (isPlaying && frames.length > 0) {
      const interval = 1000 / speed
      timerRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % frames.length)
      }, interval)
    } else {
      if (timerRef.current) clearInterval(timerRef.current)
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isPlaying, frames, speed])

  const currentFrame = frames[currentIndex]

  const tileUrls = {
    dark: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    light: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
    osm: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  }

  const currentTileUrl = `${host}${currentFrame?.path}/256/{z}/{x}/{y}/2/1_1.png`

  const center: [number, number] = [location.latitude, location.longitude]

  return (
    <Card className="p-0 bg-slate-900/60 backdrop-blur-2xl border-white/10 overflow-hidden relative h-[550px] md:h-[650px]">
      <MapContainer
        center={center}
        zoom={7}
        scrollWheelZoom={true}
        className="w-full h-full z-0"
      >
        <MapController center={center} />

        {/* Base Map Tiles */}
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          url={tileUrls[mapStyle]}
        />

        {/* Animated RainViewer Tile Overlay */}
        {currentFrame && (
          <TileLayer
            key={currentFrame.path}
            url={currentTileUrl}
            opacity={opacity}
            zIndex={10}
          />
        )}

        {/* Location Marker */}
        <Marker position={center}>
          <Popup>
            <div className="text-slate-900 font-bold">{location.name}</div>
          </Popup>
        </Marker>
      </MapContainer>

      {/* Floating Control Panel */}
      <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-col md:flex-row items-center justify-between gap-3 p-4 rounded-3xl bg-slate-900/85 backdrop-blur-2xl border border-white/15 text-white shadow-2xl">
        {/* Playback Controls */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsPlaying(!isPlaying)}
            icon={isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          >
            {isPlaying ? 'Pause' : 'Play'}
          </Button>

          {/* Timeline slider */}
          <div className="flex flex-col flex-1 max-w-xs px-2">
            <input
              type="range"
              min={0}
              max={frames.length - 1}
              value={currentIndex}
              onChange={(e) => {
                setIsPlaying(false)
                setCurrentIndex(Number(e.target.value))
              }}
              className="w-full accent-brand-yellow cursor-pointer"
            />
            <span className="text-[10px] text-slate-400 mt-0.5 text-center font-mono">
              {currentFrame
                ? new Date(currentFrame.time * 1000).toLocaleTimeString([], {
                    hour: 'numeric',
                    minute: '2-digit',
                  })
                : 'Loading radar...'}
            </span>
          </div>

          <button
            onClick={() => setCurrentIndex(0)}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all text-slate-300"
            title="Reset playback"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>

        {/* Layer & Opacity Controls */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end text-xs">
          {/* Speed Selector */}
          <button
            onClick={() => setSpeed(speed === 1 ? 2 : speed === 2 ? 3 : 1)}
            className="px-2.5 py-1.5 rounded-xl bg-white/10 border border-white/10 font-bold hover:bg-white/20"
          >
            {speed}x Speed
          </button>

          {/* Map Style Selector */}
          <select
            value={mapStyle}
            onChange={(e) => setMapStyle(e.target.value as typeof mapStyle)}
            className="bg-slate-800 border border-white/10 text-white rounded-xl px-2.5 py-1.5 outline-none cursor-pointer"
          >
            <option value="dark">Dark Base</option>
            <option value="light">Light Base</option>
            <option value="osm">Street Map</option>
          </select>

          {/* Opacity slider */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">Opacity:</span>
            <input
              type="range"
              min={0.2}
              max={1}
              step={0.1}
              value={opacity}
              onChange={(e) => setOpacity(Number(e.target.value))}
              className="w-16 accent-brand-yellow"
            />
          </div>
        </div>
      </div>
    </Card>
  )
}

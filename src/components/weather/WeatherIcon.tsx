import React from 'react'

interface WeatherIconProps {
  name: string
  isDay?: boolean
  className?: string
  size?: number
}

export const WeatherIcon: React.FC<WeatherIconProps> = ({
  name,
  isDay = true,
  className = 'w-16 h-16',
  size = 64,
}) => {
  // 3D Weather Illustrations rendered with layered SVGs, gradients & drop shadows
  switch (name) {
    case 'Sun':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={`drop-shadow-[0_10px_20px_rgba(250,204,21,0.5)] animate-float ${className}`}
        >
          <defs>
            <radialGradient id="sunGrad" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#FEF08A" />
              <stop offset="50%" stopColor="#FACC15" />
              <stop offset="100%" stopColor="#EAB308" />
            </radialGradient>
            <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(250, 204, 21, 0.6)" />
              <stop offset="100%" stopColor="rgba(250, 204, 21, 0)" />
            </radialGradient>
          </defs>
          <circle cx="50" cy="50" r="40" fill="url(#sunGlow)" />
          <circle cx="50" cy="50" r="28" fill="url(#sunGrad)" />
        </svg>
      )

    case 'Moon':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={`drop-shadow-[0_10px_20px_rgba(147,51,234,0.4)] animate-float ${className}`}
        >
          <defs>
            <linearGradient id="moonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ECE9E6" />
              <stop offset="100%" stopColor="#868F96" />
            </linearGradient>
          </defs>
          <path
            d="M 60 15 A 32 32 0 1 0 85 70 A 28 28 0 1 1 60 15 Z"
            fill="url(#moonGrad)"
          />
        </svg>
      )

    case 'SunCloud':
    case 'MoonCloud':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={`drop-shadow-lg animate-float ${className}`}
        >
          <defs>
            <radialGradient id="sunPart" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#FEF08A" />
              <stop offset="100%" stopColor="#FACC15" />
            </radialGradient>
            <linearGradient id="cloudGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#CBD5E1" />
            </linearGradient>
          </defs>
          {isDay ? (
            <circle cx="35" cy="35" r="20" fill="url(#sunPart)" />
          ) : (
            <path d="M 40 18 A 20 20 0 1 0 60 55 A 18 18 0 1 1 40 18 Z" fill="#E2E8F0" />
          )}
          <path
            d="M 25 70 C 25 58, 38 52, 48 55 C 53 45, 70 45, 76 56 C 85 57, 88 68, 83 75 C 83 75, 25 75, 25 70 Z"
            fill="url(#cloudGrad)"
          />
        </svg>
      )

    case 'CloudRain':
    case 'CloudRainHeavy':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={`drop-shadow-lg animate-float ${className}`}
        >
          <defs>
            <linearGradient id="rainCloud" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#94A3B8" />
              <stop offset="100%" stopColor="#475569" />
            </linearGradient>
            <linearGradient id="dropGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#0284C7" />
            </linearGradient>
          </defs>
          <path
            d="M 20 50 C 20 38, 35 32, 45 35 C 50 25, 68 25, 75 36 C 85 37, 88 48, 82 58 Z"
            fill="url(#rainCloud)"
          />
          {/* Rain drops */}
          <rect x="32" y="66" width="4" height="12" rx="2" fill="url(#dropGrad)" className="animate-rain-drop" />
          <rect x="48" y="64" width="4" height="12" rx="2" fill="url(#dropGrad)" className="animate-rain-drop [animation-delay:0.2s]" />
          <rect x="64" y="67" width="4" height="12" rx="2" fill="url(#dropGrad)" className="animate-rain-drop [animation-delay:0.4s]" />
        </svg>
      )

    case 'CloudSnow':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={`drop-shadow-lg animate-float ${className}`}
        >
          <defs>
            <linearGradient id="snowCloud" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#E2E8F0" />
              <stop offset="100%" stopColor="#94A3B8" />
            </linearGradient>
          </defs>
          <path
            d="M 20 50 C 20 38, 35 32, 45 35 C 50 25, 68 25, 75 36 C 85 37, 88 48, 82 58 Z"
            fill="url(#snowCloud)"
          />
          <circle cx="34" cy="72" r="3.5" fill="#E0F2FE" />
          <circle cx="50" cy="74" r="4.5" fill="#FFFFFF" />
          <circle cx="66" cy="71" r="3.5" fill="#E0F2FE" />
        </svg>
      )

    case 'CloudLightning':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={`drop-shadow-[0_10px_20px_rgba(234,179,8,0.5)] animate-float ${className}`}
        >
          <defs>
            <linearGradient id="stormCloud" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#475569" />
              <stop offset="100%" stopColor="#1E293B" />
            </linearGradient>
          </defs>
          <path
            d="M 20 45 C 20 33, 35 27, 45 30 C 50 20, 68 20, 75 31 C 85 32, 88 43, 82 53 Z"
            fill="url(#stormCloud)"
          />
          <polygon
            points="52,48 40,68 49,68 42,88 62,62 51,62"
            fill="#FACC15"
            className="animate-pulse"
          />
        </svg>
      )

    default:
      // Default 3D Cloud
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={`drop-shadow-lg animate-float ${className}`}
        >
          <defs>
            <linearGradient id="defaultCloud" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#CBD5E1" />
            </linearGradient>
          </defs>
          <path
            d="M 20 60 C 20 45, 35 38, 48 42 C 54 30, 74 30, 82 43 C 92 45, 95 58, 88 70 C 88 70, 20 70, 20 60 Z"
            fill="url(#defaultCloud)"
          />
        </svg>
      )
  }
}

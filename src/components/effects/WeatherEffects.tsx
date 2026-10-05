import React, { useEffect, useRef } from 'react'
import { EffectType } from '@/types'

interface WeatherEffectsProps {
  effect: EffectType
}

export const WeatherEffects: React.FC<WeatherEffectsProps> = ({ effect }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    // Check prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    // Particles array
    const particles: Array<{
      x: number
      y: number
      speedY: number
      speedX: number
      size: number
      opacity: number
    }> = []

    const particleCount = effect === 'rain' ? 80 : effect === 'snow' ? 60 : effect === 'stars' ? 70 : 0

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        speedY: effect === 'rain' ? Math.random() * 8 + 6 : effect === 'snow' ? Math.random() * 1.5 + 0.5 : 0,
        speedX: effect === 'snow' ? Math.random() * 1 - 0.5 : 0,
        size: effect === 'rain' ? Math.random() * 1.5 + 1 : effect === 'snow' ? Math.random() * 3 + 2 : Math.random() * 2 + 1,
        opacity: Math.random() * 0.7 + 0.3,
      })
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      if (effect === 'rain') {
        ctx.strokeStyle = 'rgba(186, 230, 253, 0.5)'
        ctx.lineWidth = 1.5
        particles.forEach((p) => {
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(p.x, p.y + p.size * 8)
          ctx.stroke()

          p.y += p.speedY
          if (p.y > height) {
            p.y = -20
            p.x = Math.random() * width
          }
        })
      } else if (effect === 'snow') {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
        particles.forEach((p) => {
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
          ctx.fill()

          p.y += p.speedY
          p.x += p.speedX
          if (p.y > height) {
            p.y = -10
            p.x = Math.random() * width
          }
        })
      } else if (effect === 'stars') {
        particles.forEach((p) => {
          ctx.fillStyle = `rgba(255, 255, 255, ${Math.abs(Math.sin(Date.now() * 0.001 + p.x)) * p.opacity})`
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
          ctx.fill()
        })
      }

      animationId = requestAnimationFrame(render)
    }

    if (effect !== 'none' && effect !== 'clouds') {
      render()
    }

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationId)
    }
  }, [effect])

  if (effect === 'none') return null

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
      {effect === 'clouds' && (
        <div className="absolute top-10 left-0 right-0 h-40 opacity-25 animate-cloud-drift">
          <div className="w-96 h-32 bg-white/20 blur-3xl rounded-full absolute left-10" />
          <div className="w-80 h-28 bg-white/15 blur-2xl rounded-full absolute right-20 top-5" />
        </div>
      )}

      {effect === 'lightning' && (
        <div className="absolute inset-0 bg-white/10 animate-pulse-slow pointer-events-none" />
      )}

      <canvas ref={canvasRef} className="h-full w-full block" />
    </div>
  )
}

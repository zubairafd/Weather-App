import React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'glass' | 'solid' | 'highlight'
  hoverEffect?: boolean
  children: React.ReactNode
}

export const Card: React.FC<CardProps> = ({
  variant = 'glass',
  hoverEffect = false,
  className,
  children,
  ...props
}) => {
  const baseStyles = 'rounded-3xl p-5 transition-all duration-300 relative overflow-hidden'
  
  const variants = {
    glass:
      'bg-slate-900/40 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] text-white',
    solid:
      'bg-slate-800 border border-slate-700 text-white shadow-xl',
    highlight:
      'bg-gradient-to-br from-brand-yellow/20 to-brand-teal/20 backdrop-blur-xl border border-brand-yellow/30 shadow-[0_10px_30px_rgba(250,204,21,0.2)] text-white',
  }

  const hoverStyles = hoverEffect
    ? 'hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_12px_40px_0_rgba(0,0,0,0.45)] cursor-pointer'
    : ''

  return (
    <div
      className={twMerge(clsx(baseStyles, variants[variant], hoverStyles, className))}
      {...props}
    >
      {children}
    </div>
  )
}

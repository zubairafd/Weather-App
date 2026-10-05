import React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'glass' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  icon?: React.ReactNode
  children: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  className,
  children,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-semibold rounded-2xl transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none'

  const variants = {
    primary:
      'bg-brand-yellow text-slate-950 hover:bg-yellow-400 shadow-[0_4px_20px_rgba(250,204,21,0.4)] font-bold',
    glass:
      'bg-white/10 backdrop-blur-md border border-white/15 text-white hover:bg-white/20 hover:border-white/30',
    ghost:
      'text-slate-300 hover:text-white hover:bg-white/10',
    danger:
      'bg-red-500/80 text-white hover:bg-red-600 backdrop-blur-md border border-red-400/30',
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2.5 text-sm gap-2',
    lg: 'px-6 py-3.5 text-base gap-2.5 rounded-3xl',
  }

  return (
    <button
      className={twMerge(clsx(baseStyles, variants[variant], sizes[size], className))}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </button>
  )
}

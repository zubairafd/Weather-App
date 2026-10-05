import React from 'react'
import { motion } from 'framer-motion'

export interface TabOption {
  id: string
  label: string
}

interface TabsProps {
  options: TabOption[]
  activeId: string
  onChange: (id: string) => void
  className?: string
}

export const Tabs: React.FC<TabsProps> = ({ options, activeId, onChange, className = '' }) => {
  return (
    <div className={`inline-flex rounded-full bg-slate-900/60 p-1 border border-white/10 backdrop-blur-xl ${className}`}>
      {options.map((tab) => {
        const isActive = tab.id === activeId
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`relative px-4 py-1.5 text-xs font-semibold rounded-full transition-colors duration-200 ${
              isActive ? 'text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="active-tab-indicator"
                className="absolute inset-0 rounded-full bg-brand-yellow shadow-[0_2px_12px_rgba(250,204,21,0.5)]"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        )
      })}
    </div>
  )
}

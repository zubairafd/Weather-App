import React from 'react'
import { NavLink } from 'react-router-dom'
import { Home, Building2, Map, Settings, Plus } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface BottomNavProps {
  onOpenSearch: () => void
}

export const BottomNav: React.FC<BottomNavProps> = ({ onOpenSearch }) => {
  const { t } = useTranslation()

  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-md rounded-full bg-slate-900/80 p-2 backdrop-blur-2xl border border-white/15 shadow-[0_10px_35px_rgba(0,0,0,0.5)] md:hidden">
      <div className="flex items-center justify-around relative">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center p-2 rounded-2xl transition-all ${
              isActive ? 'text-brand-yellow font-bold scale-105' : 'text-slate-400 hover:text-white'
            }`
          }
        >
          <Home className="h-5 w-5" />
          <span className="text-[10px] mt-0.5">{t('nav.home')}</span>
        </NavLink>

        <NavLink
          to="/cities"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center p-2 rounded-2xl transition-all ${
              isActive ? 'text-brand-yellow font-bold scale-105' : 'text-slate-400 hover:text-white'
            }`
          }
        >
          <Building2 className="h-5 w-5" />
          <span className="text-[10px] mt-0.5">{t('nav.cities')}</span>
        </NavLink>

        {/* Center Floating (+) Search Button */}
        <button
          onClick={onOpenSearch}
          className="flex items-center justify-center -mt-6 w-13 h-13 rounded-full bg-brand-yellow text-slate-950 shadow-[0_4px_25px_rgba(250,204,21,0.6)] hover:scale-110 active:scale-95 transition-all border-4 border-slate-950"
          aria-label="Add location or search"
        >
          <Plus className="h-7 w-7 stroke-[2.5]" />
        </button>

        <NavLink
          to="/radar"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center p-2 rounded-2xl transition-all ${
              isActive ? 'text-brand-yellow font-bold scale-105' : 'text-slate-400 hover:text-white'
            }`
          }
        >
          <Map className="h-5 w-5" />
          <span className="text-[10px] mt-0.5">{t('nav.radar')}</span>
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center p-2 rounded-2xl transition-all ${
              isActive ? 'text-brand-yellow font-bold scale-105' : 'text-slate-400 hover:text-white'
            }`
          }
        >
          <Settings className="h-5 w-5" />
          <span className="text-[10px] mt-0.5">{t('nav.settings')}</span>
        </NavLink>
      </div>
    </nav>
  )
}

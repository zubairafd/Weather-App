import React from 'react'
import { NavLink } from 'react-router-dom'
import { Home, Search, Building2, Map, Columns, Settings, CloudSun } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/Button'

interface SidebarProps {
  onOpenSearch: () => void
}

export const Sidebar: React.FC<SidebarProps> = ({ onOpenSearch }) => {
  const { t } = useTranslation()

  const navItems = [
    { to: '/', icon: Home, label: t('nav.home') },
    { to: '/cities', icon: Building2, label: t('nav.cities') },
    { to: '/compare', icon: Columns, label: t('nav.compare') },
    { to: '/radar', icon: Map, label: t('nav.radar') },
    { to: '/settings', icon: Settings, label: t('nav.settings') },
  ]

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen sticky top-0 p-4 border-r border-white/10 bg-slate-900/60 backdrop-blur-2xl z-30 shrink-0">
      {/* App Logo */}
      <div className="flex items-center gap-3 px-3 py-4 mb-6">
        <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-brand-yellow text-slate-950 shadow-[0_0_20px_rgba(250,204,21,0.5)]">
          <CloudSun className="h-6 w-6 stroke-[2.5]" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white">{t('app.title')}</h1>
          <p className="text-[11px] text-slate-400">{t('app.tagline')}</p>
        </div>
      </div>

      {/* Search trigger button */}
      <Button
        variant="glass"
        icon={<Search className="h-4 w-4" />}
        onClick={onOpenSearch}
        className="w-full justify-start text-slate-300 mb-6 py-3 border-white/10 hover:border-brand-yellow/40"
      >
        <span>{t('nav.search')} city...</span>
        <kbd className="ml-auto text-[10px] bg-white/10 px-2 py-0.5 rounded font-mono text-slate-400">/</kbd>
      </Button>

      {/* Nav list */}
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-2xl font-medium text-sm transition-all ${
                isActive
                  ? 'bg-brand-yellow/15 border border-brand-yellow/30 text-brand-yellow shadow-[0_4px_20px_rgba(250,204,21,0.15)] font-semibold'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`
            }
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer info */}
      <div className="pt-4 border-t border-white/10 text-xs text-slate-500 text-center">
        SkyCast v1.0 • PWA Enabled
      </div>
    </aside>
  )
}

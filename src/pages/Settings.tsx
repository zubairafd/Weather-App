import React from 'react'
import { Settings as SettingsIcon, RotateCcw } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useSettingsStore } from '@/store/useSettingsStore'
import { useOnboardingStore } from '@/store/useOnboardingStore'
import { Card } from '@/components/ui/Card'
import { Toggle } from '@/components/ui/Toggle'
import { Button } from '@/components/ui/Button'

export const Settings: React.FC = () => {
  const { t, i18n } = useTranslation()
  const {
    tempUnit, setTempUnit,
    speedUnit, setSpeedUnit,
    pressureUnit, setPressureUnit,
    timeFormat, setTimeFormat,
    language, setLanguage,
    enableNotifications, setEnableNotifications,
    resetSettings,
  } = useSettingsStore()

  const { resetOnboarding } = useOnboardingStore()

  const handleLanguageChange = (lang: 'en' | 'ur') => {
    setLanguage(lang)
    i18n.changeLanguage(lang)
    document.documentElement.dir = lang === 'ur' ? 'rtl' : 'ltr'
  }

  const requestNotificationPermission = async (enable: boolean) => {
    if (enable && 'Notification' in window) {
      const perm = await Notification.requestPermission()
      if (perm === 'granted') {
        setEnableNotifications(true)
      } else {
        alert('Notification permission denied in browser settings.')
        setEnableNotifications(false)
      }
    } else {
      setEnableNotifications(false)
    }
  }

  return (
    <div className="space-y-6 pb-24 md:pb-12 max-w-3xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
          <SettingsIcon className="h-6 w-6 text-brand-yellow" /> {t('settings.title')}
        </h2>
        <p className="text-sm text-slate-400">Configure units, preferences, and display options</p>
      </div>

      {/* Units & Formats */}
      <Card className="p-6 bg-slate-900/40 backdrop-blur-xl border-white/10 space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-brand-yellow">{t('settings.units')}</h3>

        <div className="space-y-4 text-sm">
          {/* Temperature */}
          <div className="flex items-center justify-between py-2 border-b border-white/10">
            <span className="text-slate-200">{t('settings.temperature')}</span>
            <div className="flex bg-slate-800 p-1 rounded-xl border border-white/10">
              <button
                onClick={() => setTempUnit('C')}
                className={`px-3 py-1 rounded-lg font-bold text-xs ${tempUnit === 'C' ? 'bg-brand-yellow text-slate-950' : 'text-slate-400'}`}
              >
                °C
              </button>
              <button
                onClick={() => setTempUnit('F')}
                className={`px-3 py-1 rounded-lg font-bold text-xs ${tempUnit === 'F' ? 'bg-brand-yellow text-slate-950' : 'text-slate-400'}`}
              >
                °F
              </button>
            </div>
          </div>

          {/* Speed */}
          <div className="flex items-center justify-between py-2 border-b border-white/10">
            <span className="text-slate-200">{t('settings.speed')}</span>
            <select
              value={speedUnit}
              onChange={(e) => setSpeedUnit(e.target.value as typeof speedUnit)}
              className="bg-slate-800 border border-white/10 text-white rounded-xl px-3 py-1.5 text-xs outline-none"
            >
              <option value="kmh">km/h</option>
              <option value="mph">mph</option>
              <option value="ms">m/s</option>
            </select>
          </div>

          {/* Pressure */}
          <div className="flex items-center justify-between py-2 border-b border-white/10">
            <span className="text-slate-200">{t('settings.pressure')}</span>
            <select
              value={pressureUnit}
              onChange={(e) => setPressureUnit(e.target.value as typeof pressureUnit)}
              className="bg-slate-800 border border-white/10 text-white rounded-xl px-3 py-1.5 text-xs outline-none"
            >
              <option value="hPa">hPa</option>
              <option value="inHg">inHg</option>
            </select>
          </div>

          {/* Time Format */}
          <div className="flex items-center justify-between py-2">
            <span className="text-slate-200">{t('settings.timeFormat')}</span>
            <div className="flex bg-slate-800 p-1 rounded-xl border border-white/10">
              <button
                onClick={() => setTimeFormat('12h')}
                className={`px-3 py-1 rounded-lg font-bold text-xs ${timeFormat === '12h' ? 'bg-brand-yellow text-slate-950' : 'text-slate-400'}`}
              >
                12 Hour
              </button>
              <button
                onClick={() => setTimeFormat('24h')}
                className={`px-3 py-1 rounded-lg font-bold text-xs ${timeFormat === '24h' ? 'bg-brand-yellow text-slate-950' : 'text-slate-400'}`}
              >
                24 Hour
              </button>
            </div>
          </div>
        </div>
      </Card>

      {/* Language */}
      <Card className="p-6 bg-slate-900/40 backdrop-blur-xl border-white/10 space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-brand-yellow">{t('settings.language')}</h3>

        <div className="flex items-center justify-between">
          <span className="text-slate-200">Select Interface Language</span>
          <div className="flex bg-slate-800 p-1 rounded-xl border border-white/10">
            <button
              onClick={() => handleLanguageChange('en')}
              className={`px-3 py-1 rounded-lg font-bold text-xs ${language === 'en' ? 'bg-brand-yellow text-slate-950' : 'text-slate-400'}`}
            >
              English
            </button>
            <button
              onClick={() => handleLanguageChange('ur')}
              className={`px-3 py-1 rounded-lg font-bold text-xs ${language === 'ur' ? 'bg-brand-yellow text-slate-950' : 'text-slate-400'}`}
            >
              اردو (Urdu)
            </button>
          </div>
        </div>
      </Card>

      {/* Notifications & Reset */}
      <Card className="p-6 bg-slate-900/40 backdrop-blur-xl border-white/10 space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-brand-yellow">Notifications & Reset</h3>

        <div className="flex items-center justify-between py-2 border-b border-white/10">
          <div>
            <p className="text-slate-200 text-sm font-semibold">{t('settings.notifications')}</p>
            <p className="text-xs text-slate-400">Receive alerts when rain or severe weather is predicted</p>
          </div>
          <Toggle checked={enableNotifications} onChange={requestNotificationPermission} />
        </div>

        <div className="flex items-center justify-between pt-2">
          <Button variant="ghost" icon={<RotateCcw className="h-4 w-4" />} onClick={resetOnboarding}>
            Show Onboarding Screen Again
          </Button>

          <Button variant="danger" icon={<RotateCcw className="h-4 w-4" />} onClick={resetSettings}>
            {t('settings.reset')}
          </Button>
        </div>
      </Card>
    </div>
  )
}

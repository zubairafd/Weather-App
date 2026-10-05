import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, ShieldCheck, MapPin } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useOnboardingStore } from '@/store/useOnboardingStore'
import { Button } from '@/components/ui/Button'
import { WeatherIcon } from '@/components/weather/WeatherIcon'

export const OnboardingModal: React.FC = () => {
  const { t } = useTranslation()
  const { hasCompletedOnboarding, completeOnboarding } = useOnboardingStore()

  if (hasCompletedOnboarding) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="w-full max-w-md p-8 rounded-4xl bg-slate-900/80 backdrop-blur-2xl border border-white/15 shadow-2xl text-center space-y-6 relative overflow-hidden"
        >
          {/* Animated 3D Weather Icon */}
          <div className="flex justify-center pt-4">
            <WeatherIcon name="SunCloud" size={130} className="w-32 h-32" />
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
              {t('onboarding.welcome')}
            </h1>
            <p className="text-sm text-slate-300 px-2 leading-relaxed">
              {t('onboarding.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 py-2 text-xs">
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center gap-1">
              <Sparkles className="h-4 w-4 text-brand-yellow" />
              <span>Real-Time</span>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center gap-1">
              <MapPin className="h-4 w-4 text-teal-400" />
              <span>Live Radar</span>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center gap-1">
              <ShieldCheck className="h-4 w-4 text-purple-400" />
              <span>AQI & Alerts</span>
            </div>
          </div>

          {/* Yellow CTA "Get Started" Button (like Image 5) */}
          <Button
            variant="primary"
            size="lg"
            className="w-full text-slate-950 py-4 font-extrabold text-base"
            onClick={completeOnboarding}
          >
            {t('onboarding.getStarted')}
          </Button>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

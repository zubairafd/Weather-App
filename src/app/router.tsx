import React, { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Skeleton } from '@/components/ui/Skeleton'

const Home = lazy(() => import('@/pages/Home').then((m) => ({ default: m.Home })))
const Cities = lazy(() => import('@/pages/Cities').then((m) => ({ default: m.Cities })))
const Compare = lazy(() => import('@/pages/Compare').then((m) => ({ default: m.Compare })))
const Radar = lazy(() => import('@/pages/Radar').then((m) => ({ default: m.Radar })))
const Settings = lazy(() => import('@/pages/Settings').then((m) => ({ default: m.Settings })))
const NotFound = lazy(() => import('@/pages/NotFound').then((m) => ({ default: m.NotFound })))

interface AppRouterProps {
  onOpenSearch: () => void
}

export const AppRouter: React.FC<AppRouterProps> = ({ onOpenSearch }) => {
  return (
    <Suspense fallback={<Skeleton className="h-[70vh] w-full rounded-3xl" />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cities" element={<Cities onOpenSearch={onOpenSearch} />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/radar" element={<Radar />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  )
}

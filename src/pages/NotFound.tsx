import React from 'react'
import { Link } from 'react-router-dom'
import { CloudOff } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center p-6 space-y-4">
      <div className="w-20 h-20 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center text-brand-yellow">
        <CloudOff className="h-10 w-10" />
      </div>

      <h1 className="text-4xl font-extrabold text-white">404 - Page Not Found</h1>
      <p className="text-slate-400 max-w-sm">The weather forecast page you are looking for does not exist.</p>

      <Link to="/">
        <Button variant="primary">Return Home</Button>
      </Link>
    </div>
  )
}

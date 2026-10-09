import { Component, ErrorInfo, ReactNode } from 'react'
import { AlertTriangle, RefreshCw, Trash2 } from 'lucide-react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Unhandled React Error:', error, errorInfo)
  }

  public componentDidMount() {
    window.addEventListener('error', this.handleGlobalError)
    window.addEventListener('unhandledrejection', this.handleUnhandledRejection)
  }

  public componentWillUnmount() {
    window.removeEventListener('error', this.handleGlobalError)
    window.removeEventListener('unhandledrejection', this.handleUnhandledRejection)
  }

  private handleGlobalError = (event: ErrorEvent) => {
    console.error('Global Error caught:', event.error || event.message)
  }

  private handleUnhandledRejection = (event: PromiseRejectionEvent) => {
    console.error('Unhandled Promise Rejection caught:', event.reason)
  }

  private handleReload = () => {
    window.location.reload()
  }

  private handleResetCache = () => {
    try {
      localStorage.clear()
      sessionStorage.clear()
    } catch {
      // Ignore cache clearing errors
    }
    window.location.reload()
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4">
          <div className="max-w-md w-full p-8 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-2xl text-center shadow-2xl">
            <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="h-8 w-8" />
            </div>

            <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
            <p className="text-slate-400 text-sm mb-6">
              SkyCast encountered an unexpected error. Don't worry, your data is safe. Try reloading the application.
            </p>

            {this.state.error && (
              <div className="mb-6 p-3 rounded-xl bg-slate-950/60 border border-white/5 text-left font-mono text-xs text-red-300 overflow-x-auto max-h-32">
                {this.state.error.toString()}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={this.handleReload}
                className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-yellow-400 text-slate-950 font-semibold hover:bg-yellow-300 transition-colors text-sm"
              >
                <RefreshCw className="h-4 w-4" />
                Reload App
              </button>
              <button
                onClick={this.handleResetCache}
                className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 text-white font-medium hover:bg-white/20 transition-colors text-sm border border-white/10"
              >
                <Trash2 className="h-4 w-4" />
                Clear Cache & Reload
              </button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

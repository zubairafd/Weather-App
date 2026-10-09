import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Providers } from './app/providers'
import { App } from './app/App'
import { ErrorBoundary } from './components/common/ErrorBoundary'
import './i18n'
import './index.css'

const rawBase = import.meta.env.BASE_URL || '/'
const basename = rawBase.endsWith('/') && rawBase !== '/' ? rawBase.slice(0, -1) : rawBase

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter basename={basename}>
        <Providers>
          <App />
        </Providers>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
)

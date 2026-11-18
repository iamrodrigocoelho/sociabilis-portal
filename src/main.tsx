import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import { App } from './App'
import { preloadRoute } from './routes'

const container = document.getElementById('root')!

const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)

// Carrega o chunk da rota atual antes de hidratar, para que o HTML
// pré-renderizado seja reaproveitado sem flash de fallback.
preloadRoute(window.location.pathname).finally(() => {
  if (container.firstElementChild) {
    hydrateRoot(container, app)
  } else {
    // `npm run dev`: sem HTML pré-renderizado.
    createRoot(container).render(app)
  }
})

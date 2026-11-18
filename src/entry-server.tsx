/**
 * Entrada da pré-renderização (SSG). Compilada com `vite build --ssr` e
 * executada por scripts/prerender.js no build. Não é enviada ao navegador.
 */
import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { App } from './App'
import { HeadContext, type HeadCollector } from './lib/headContext'
import { blogPrerenderPaths } from './lib/blog'
import { getStaticRoutePaths, preloadAllRoutes, preloadRoute } from './routes'

export { modulesFor } from './routes'
export { getBlogFeeds } from './lib/blogFeed'

/** Todos os caminhos que geram HTML no build (exceto a 404). */
export function getPrerenderPaths(): string[] {
  return [...getStaticRoutePaths(), ...blogPrerenderPaths()]
}
export { renderHeadToString } from './lib/seo'
export { SITE_CONFIG } from './config/contact'
export { CONTACT_INTERESTS } from './content/contactForm'

export async function render(url: string) {
  await preloadAllRoutes()
  await preloadRoute(new URL(url, 'http://localhost').pathname)
  const collector: HeadCollector = {}
  const html = renderToString(
    <StrictMode>
      <HeadContext.Provider value={collector}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </HeadContext.Provider>
    </StrictMode>,
  )
  return { html, seo: collector.seo }
}

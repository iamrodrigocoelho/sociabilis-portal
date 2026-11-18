import { Suspense } from 'react'
import { Outlet, useLocation } from 'react-router'
import { LocaleContext } from '../i18n/context'
import { localeFromPath } from '../i18n/locales'
import { ContactModalProvider } from './ContactModalProvider'
import { Footer } from './Footer'
import { Header } from './Header'
import { ScrollManager } from './ScrollManager'
import { SkipLink } from './SkipLink'

/** Placeholder enquanto o chunk de uma rota carrega (só em navegação client-side). */
function PageFallback() {
  return <div className="min-h-[60vh]" aria-busy="true" />
}

export function Layout() {
  // O idioma vem da URL: /en/... é inglês; o resto, português (RF40).
  const locale = localeFromPath(useLocation().pathname)

  return (
    <LocaleContext.Provider value={locale}>
      <ContactModalProvider>
        <SkipLink />
        <Header />
        <main id="main-content" tabIndex={-1} className="focus:outline-none">
          <Suspense fallback={<PageFallback />}>
            <Outlet />
          </Suspense>
        </main>
        <Footer />
        <ScrollManager />
      </ContactModalProvider>
    </LocaleContext.Provider>
  )
}

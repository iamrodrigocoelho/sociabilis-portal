import { Suspense } from 'react'
import { Outlet } from 'react-router'
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
  return (
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
  )
}

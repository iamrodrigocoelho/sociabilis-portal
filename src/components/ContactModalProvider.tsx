import { lazy, Suspense, useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { isContactInterest } from '../content/contactForm'
import { ContactModalContext } from '../lib/contactModal'

const loadModal = () => import('./ContactModal')
const ContactModal = lazy(loadModal)

/**
 * Disponibiliza `open(interesse?)` para os CTAs (via Button) e renderiza o
 * modal de contato. O código do modal é baixado em segundo plano após a
 * página ficar ociosa, para abrir sem espera.
 */
export function ContactModalProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<{ open: boolean; interest: string | null; key: number }>({
    open: false,
    interest: null,
    key: 0,
  })

  const open = useCallback((interest?: string | null) => {
    setState((s) => ({ open: true, interest: isContactInterest(interest) ? interest : null, key: s.key + 1 }))
  }, [])
  const close = useCallback(() => setState((s) => ({ ...s, open: false })), [])
  const api = useMemo(() => ({ open }), [open])

  useEffect(() => {
    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 2000))
    idle(() => void loadModal())
  }, [])

  return (
    <ContactModalContext.Provider value={api}>
      {children}
      {state.open && (
        <Suspense fallback={null}>
          <ContactModal key={state.key} interest={state.interest} onClose={close} />
        </Suspense>
      )}
    </ContactModalContext.Provider>
  )
}

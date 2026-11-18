import { createContext, useContext } from 'react'

export interface ContactModalApi {
  /** Abre o modal de contato, opcionalmente com um interesse pré-selecionado. */
  open: (interest?: string | null) => void
}

export const ContactModalContext = createContext<ContactModalApi | null>(null)

/** null fora do provider (ex.: na pré-renderização): os CTAs continuam sendo links. */
export const useContactModal = () => useContext(ContactModalContext)

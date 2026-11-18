import { X } from 'lucide-react'
import { useEffect, useId, useRef, type MouseEvent, type SyntheticEvent } from 'react'
import { CONTACT_FORM } from '../content/contactForm'
import { useLocale } from '../i18n/context'
import { Button } from './Button'
import { ContactForm } from './ContactForm'

interface ContactModalProps {
  /** Interesse pré-selecionado (slug), ou null. */
  interest: string | null
  onClose: () => void
}

/**
 * Modal de contato (RF11): <dialog> nativo aberto com showModal(), que já
 * torna o restante da página inerte (foco preso). Fecha com Esc, com o botão
 * ou com clique fora; o foco volta ao elemento que abriu o modal.
 * Montado só enquanto aberto (carregado sob demanda pelo ContactModalProvider).
 */
export default function ContactModal({ interest, onClose }: ContactModalProps) {
  const COPY = CONTACT_FORM[useLocale()].modal
  const dialogRef = useRef<HTMLDialogElement>(null)
  const titleId = useId()

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    const opener = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    if (!dialog.open) dialog.showModal()
    // Foco inicial no primeiro campo (o botão de fechar viria primeiro no DOM).
    dialog.querySelector<HTMLElement>('input, textarea')?.focus()

    return () => {
      document.body.style.overflow = previousOverflow
      if (dialog.open) dialog.close()
      // O CTA pode ter saído do DOM (ex.: menu mobile fechado): nesse caso, foco no conteúdo.
      if (opener?.isConnected) opener.focus({ preventScroll: true })
      else document.getElementById('main-content')?.focus({ preventScroll: true })
    }
  }, [])

  // Esc: o navegador dispara "cancel"; sincroniza com o estado do React.
  const handleCancel = (e: SyntheticEvent<HTMLDialogElement>) => {
    e.preventDefault()
    onClose()
  }

  // Clique no backdrop: o alvo é o próprio <dialog> (o conteúdo ocupa toda a caixa).
  const handleClick = (e: MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) onClose()
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onCancel={handleCancel}
      onClick={handleClick}
      className="m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-2xl overflow-hidden rounded-lg bg-canvas p-0 text-body shadow-overlay backdrop:bg-night/60 backdrop:backdrop-blur-sm"
    >
      <div className="flex max-h-[calc(100dvh-2rem)] flex-col">
        <header className="flex items-start justify-between gap-lg bg-night px-xl py-xl sm:px-2xl">
          <div>
            <h2 id={titleId} className="text-heading-sm text-on-night">
              {COPY.title}
            </h2>
            <p className="mt-xs text-body-sm text-on-night-mid">{COPY.subtitle}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={COPY.close}
            className="-mr-sm -mt-sm inline-flex min-h-touch min-w-touch shrink-0 items-center justify-center rounded-md text-on-night hover:bg-night-soft"
          >
            <X size={24} strokeWidth={1.5} aria-hidden="true" />
          </button>
        </header>
        <div className="overflow-y-auto px-xl py-xl sm:px-2xl">
          <ContactForm
            variant="modal"
            initialInterests={interest ? [interest] : []}
            successAction={
              <Button type="button" variant="secondary" onClick={onClose}>
                {COPY.close}
              </Button>
            }
          />
        </div>
      </div>
    </dialog>
  )
}

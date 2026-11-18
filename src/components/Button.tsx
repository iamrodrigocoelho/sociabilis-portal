import type { MouseEvent, MouseEventHandler, ReactNode } from 'react'
import { Link } from 'react-router'
import { parseContactLink } from '../content/navigation'
import { useContactModal } from '../lib/contactModal'

export type ButtonVariant = 'primary' | 'secondary' | 'on-night' | 'secondary-on-night'

interface ButtonBaseProps {
  variant?: ButtonVariant
  className?: string
  children: ReactNode
  onClick?: MouseEventHandler<HTMLElement>
}

type ButtonProps = ButtonBaseProps &
  (
    | { to: string; href?: never; type?: never }
    | { href: string; to?: never; type?: never }
    | { type?: 'button' | 'submit'; to?: never; href?: never; disabled?: boolean }
  )

const BASE =
  'inline-flex min-h-touch items-center justify-center gap-sm rounded-md border px-xl py-[14px] text-button transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60'

const VARIANTS: Record<ButtonVariant, string> = {
  primary: 'border-primary bg-primary text-white hover:border-primary-hover hover:bg-primary-hover',
  secondary: 'border-ink bg-transparent text-ink hover:bg-ink hover:text-white',
  'on-night': 'border-accent bg-accent text-night hover:border-white hover:bg-white',
  'secondary-on-night': 'border-on-night-mid bg-transparent text-on-night hover:border-on-night hover:bg-on-night hover:text-night',
}

/**
 * Botão do design system. Renderiza <Link> (prop `to`), <a> externo (`href`)
 * ou <button>.
 *
 * Links de contato (`contactTo()`: "/#contato" ou "/?interesse=…#contato") abrem
 * o modal de contato com o interesse pré-selecionado. Sem JS, ou com
 * Ctrl/Cmd/Shift-clique, seguem como link para o formulário da home.
 */
export function Button(props: ButtonProps) {
  const { variant = 'primary', className = '', children, onClick } = props
  const classes = `${BASE} ${VARIANTS[variant]} ${className}`
  const contactModal = useContactModal()

  if (props.to !== undefined) {
    const interest = parseContactLink(props.to)
    const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
      onClick?.(e)
      if (e.defaultPrevented || interest === undefined || !contactModal) return
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      e.preventDefault()
      contactModal.open(interest)
    }
    return (
      <Link
        to={props.to}
        className={classes}
        onClick={handleClick}
        aria-haspopup={interest !== undefined && contactModal ? 'dialog' : undefined}
      >
        {children}
      </Link>
    )
  }
  if (props.href !== undefined) {
    return (
      <a href={props.href} className={classes} onClick={onClick} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    )
  }
  return (
    <button
      type={props.type ?? 'button'}
      className={classes}
      onClick={onClick}
      disabled={'disabled' in props ? props.disabled : undefined}
    >
      {children}
    </button>
  )
}

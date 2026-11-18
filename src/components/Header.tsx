import { Menu, X } from 'lucide-react'
import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { Link, NavLink } from 'react-router'
import { SITE_CONFIG } from '../config/contact'
import { HEADER_CTA, MAIN_NAV, isAnchor, type NavItem } from '../content/navigation'
import { Button } from './Button'
import { Container } from './Container'
import { Logo } from './Logo'

const MOBILE_MENU_ID = 'mobile-menu'

function DesktopNavLink({ item }: { item: NavItem }) {
  const classes = 'relative inline-flex min-h-touch items-center text-body-sm font-medium text-ink'
  const underline =
    'after:absolute after:inset-x-0 after:bottom-2 after:h-0.5 after:bg-brand after:transition-transform after:duration-200'

  // Âncoras ("/#sobre") não marcam página ativa.
  if (isAnchor(item)) {
    return (
      <Link to={item.to} className={`${classes} ${underline} after:scale-x-0 hover:after:scale-x-100`}>
        {item.label}
      </Link>
    )
  }
  return (
    <NavLink
      to={item.to}
      end
      className={({ isActive }) =>
        `${classes} ${underline} ${isActive ? 'after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100'}`
      }
    >
      {item.label}
    </NavLink>
  )
}

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const headerRef = useRef<HTMLElement>(null)

  const close = useCallback((returnFocus = false) => {
    setOpen(false)
    if (returnFocus) toggleRef.current?.focus()
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Menu aberto: trava o scroll da página, fecha com Esc e ao passar para desktop.
  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') close(true)
    }
    const desktop = window.matchMedia('(min-width: 1024px)')
    const onResize = () => desktop.matches && close()
    document.addEventListener('keydown', onKey)
    desktop.addEventListener('change', onResize)
    document.getElementById(MOBILE_MENU_ID)?.querySelector<HTMLElement>('a')?.focus()
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKey)
      desktop.removeEventListener('change', onResize)
    }
  }, [open, close])

  // Mantém o foco dentro do header enquanto o menu mobile está aberto.
  const trapFocus = (e: KeyboardEvent<HTMLElement>) => {
    if (!open || e.key !== 'Tab' || !headerRef.current) return
    const focusables = Array.from(
      headerRef.current.querySelectorAll<HTMLElement>(`#${MOBILE_MENU_ID} a, #${MOBILE_MENU_ID} button, [data-menu-toggle]`),
    )
    const first = focusables[0]
    const last = focusables[focusables.length - 1]
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }

  return (
    <header
      ref={headerRef}
      onKeyDown={trapFocus}
      className={`sticky top-0 z-50 border-b bg-canvas/90 backdrop-blur-md transition-colors duration-200 ${
        scrolled || open ? 'border-line' : 'border-transparent'
      }`}
    >
      <Container className="flex h-16 items-center justify-between gap-xl lg:h-20">
        <Link to="/" aria-label={`${SITE_CONFIG.name}: página inicial`} className="shrink-0" onClick={() => close()}>
          <Logo />
        </Link>

        <nav aria-label="Navegação principal" className="hidden lg:block">
          <ul className="flex items-center gap-2xl">
            {MAIN_NAV.map((item) => (
              <li key={item.to}>
                <DesktopNavLink item={item} />
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden lg:block">
          <Button to={HEADER_CTA.to}>{HEADER_CTA.label}</Button>
        </div>

        <button
          ref={toggleRef}
          type="button"
          data-menu-toggle
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={MOBILE_MENU_ID}
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          className="-mr-sm inline-flex min-h-touch min-w-touch items-center justify-center rounded-md text-ink hover:bg-canvas-soft lg:hidden"
        >
          {open ? <X size={24} strokeWidth={1.5} aria-hidden="true" /> : <Menu size={24} strokeWidth={1.5} aria-hidden="true" />}
        </button>
      </Container>

      {open && (
        <nav
          id={MOBILE_MENU_ID}
          aria-label="Menu"
          className="fixed inset-x-0 bottom-0 top-16 overflow-y-auto bg-canvas shadow-overlay lg:hidden"
        >
          <Container className="flex min-h-full flex-col py-2xl">
            <ul className="flex flex-col">
              {MAIN_NAV.map((item) => (
                <li key={item.to} className="border-b border-line">
                  {isAnchor(item) ? (
                    <Link to={item.to} onClick={() => close()} className="block py-lg text-display-md text-ink">
                      {item.label}
                    </Link>
                  ) : (
                    <NavLink
                      to={item.to}
                      end
                      onClick={() => close()}
                      className={({ isActive }) =>
                        `block py-lg text-display-md ${isActive ? 'text-primary' : 'text-ink'}`
                      }
                    >
                      {item.label}
                    </NavLink>
                  )}
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-2xl">
              <Button to={HEADER_CTA.to} className="w-full" onClick={() => close()}>
                {HEADER_CTA.label}
              </Button>
            </div>
          </Container>
        </nav>
      )}
    </header>
  )
}

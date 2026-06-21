import { useState } from 'react'
import { CTAButton } from './CTAButton'

const NAV_LINKS = [
  { label: 'O que fazemos', href: '#o-que-fazemos' },
  { label: 'Ofertas', href: '#ofertas' },
  { label: 'Metodologia', href: '#metodologia' },
  { label: 'Diferenciais', href: '#diferenciais' },
  { label: 'Contato', href: '#contato' },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const closeMenu = () => setIsOpen(false)

  return (
    <header className="sticky top-0 z-50 bg-canvas border-b border-canvas-soft/80 backdrop-blur-sm">
      <div className="container-base">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="/" aria-label="Sociabilis AI Labs — página inicial" className="flex-shrink-0">
            <img
              src="/img/logo-big-sociabilis.png"
              alt="Sociabilis AI Labs"
              className="h-8 md:h-9 w-auto"
              loading="eager"
            />
          </a>

          {/* Desktop navigation */}
          <nav aria-label="Navegação principal" className="hidden md:flex items-center gap-6 lg:gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-body text-sm font-medium hover:text-ink transition-colors duration-150"
              >
                {link.label}
              </a>
            ))}
            <CTAButton href="#contato" variant="primary" className="!text-sm !py-2.5 !px-5 ml-2">
              Fale com a Sociabilis
            </CTAButton>
          </nav>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            className="md:hidden p-2 rounded-lg text-ink hover:bg-canvas-soft transition-colors"
          >
            {isOpen ? (
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                <line x1="3" y1="3" x2="19" y2="19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <line x1="19" y1="3" x2="3" y2="19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                <line x1="3" y1="6" x2="19" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <line x1="3" y1="11" x2="19" y2="11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <line x1="3" y1="16" x2="19" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <nav
            id="mobile-menu"
            aria-label="Menu mobile"
            className="md:hidden py-4 pb-6 border-t border-canvas-soft"
          >
            <ul className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={closeMenu}
                    className="block py-3 px-2 text-body font-medium hover:text-ink transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-4 pt-4 border-t border-canvas-soft">
              <CTAButton href="#contato" variant="primary" className="w-full text-center" onClick={closeMenu}>
                Fale com a Sociabilis
              </CTAButton>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}

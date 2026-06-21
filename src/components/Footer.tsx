import { SITE_CONFIG, CONTACT } from '../config/contact'

const FOOTER_LINKS = [
  { label: 'O que fazemos', href: '#o-que-fazemos' },
  { label: 'Ofertas', href: '#ofertas' },
  { label: 'Metodologia', href: '#metodologia' },
  { label: 'Diferenciais', href: '#diferenciais' },
  { label: 'Contato', href: '#contato' },
]

export function Footer() {
  return (
    <footer className="bg-ink text-canvas/80" aria-label="Rodapé">
      <div className="container-base py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 pb-12 border-b border-canvas/10">
          {/* Brand column */}
          <div className="md:col-span-1">
            <img
              src="/img/logo-big-sociabilis.png"
              alt="Sociabilis AI Labs"
              className="h-8 w-auto mb-4 brightness-0 invert opacity-90"
              loading="lazy"
            />
            <p className="text-sm leading-relaxed text-canvas/60 mt-3">
              {SITE_CONFIG.tagline}
            </p>
          </div>

          {/* Navigation column */}
          <div>
            <h3 className="text-canvas font-semibold text-sm mb-4 tracking-wide uppercase text-xs">
              Navegação
            </h3>
            <ul className="flex flex-col gap-2.5">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-canvas/60 hover:text-canvas transition-colors duration-150"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div>
            <h3 className="text-canvas font-semibold text-sm mb-4 tracking-wide uppercase text-xs">
              Contato
            </h3>
            <ul className="flex flex-col gap-2.5">
              {CONTACT.email && (
                <li>
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="text-sm text-canvas/60 hover:text-canvas transition-colors duration-150"
                  >
                    {CONTACT.email}
                  </a>
                </li>
              )}
              {CONTACT.whatsapp && (
                <li>
                  <a
                    href={`https://wa.me/${CONTACT.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-canvas/60 hover:text-canvas transition-colors duration-150"
                  >
                    WhatsApp
                  </a>
                </li>
              )}
              {CONTACT.linkedin && (
                <li>
                  <a
                    href={CONTACT.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-canvas/60 hover:text-canvas transition-colors duration-150"
                  >
                    LinkedIn
                  </a>
                </li>
              )}
              {CONTACT.instagram && (
                <li>
                  <a
                    href={CONTACT.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-canvas/60 hover:text-canvas transition-colors duration-150"
                  >
                    Instagram
                  </a>
                </li>
              )}
              {!CONTACT.email && !CONTACT.whatsapp && !CONTACT.linkedin && !CONTACT.instagram && (
                <li className="text-sm text-canvas/40 italic">
                  Contato em breve
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <p className="text-xs text-canvas/40">{SITE_CONFIG.copyright}</p>
          <p className="text-xs text-canvas/40">
            Uma divisão da{' '}
            <a
              href={SITE_CONFIG.mainSite}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-canvas/70 transition-colors underline underline-offset-2"
            >
              Sociabilis
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

import { Link } from 'react-router'
import { CONTACT, SITE_CONFIG } from '../config/contact'
import { partnerLogos } from '../content/logos'
import { contactTo, footerNav, legalNav } from '../content/navigation'
import { UI } from '../content/ui'
import { useLocale } from '../i18n/context'
import { Container } from './Container'
import { LogoStrip } from './LogoStrip'
import { Logo } from './Logo'

const LINK = 'inline-flex min-h-touch items-center text-body-sm text-on-night-mid transition-colors duration-200 hover:text-on-night lg:min-h-0 lg:py-xs'

/** Contatos configurados em src/config/contact.ts. Nada é exibido se não houver valor. */
function contactLinks() {
  const links: { label: string; href: string; external: boolean }[] = []
  if (CONTACT.email) links.push({ label: CONTACT.email, href: `mailto:${CONTACT.email}`, external: false })
  if (CONTACT.whatsapp) links.push({ label: 'WhatsApp', href: `https://wa.me/${CONTACT.whatsapp}`, external: true })
  if (CONTACT.linkedin) links.push({ label: 'LinkedIn', href: CONTACT.linkedin, external: true })
  if (CONTACT.instagram) links.push({ label: 'Instagram', href: CONTACT.instagram, external: true })
  return links
}

export function Footer() {
  const locale = useLocale()
  const ui = UI[locale].footer
  const contacts = contactLinks()

  return (
    <footer className="bg-night text-on-night-mid">
      <Container className="py-4xl lg:py-5xl">
        <div className="grid gap-3xl lg:grid-cols-12">
          <div className="lg:col-span-3">
            <Logo theme="night" className="h-8" />
            <p className="mt-xl max-w-xs text-body-sm">{ui.tagline}</p>
          </div>

          <div className="grid gap-2xl sm:grid-cols-2 lg:col-span-9 lg:grid-cols-4">
            {footerNav(locale).map((group) => (
              <nav key={group.title} aria-label={group.title}>
                <h2 className="text-eyebrow text-on-night">{group.title}</h2>
                <ul className="mt-lg flex flex-col gap-xs">
                  {group.items.map((item) => (
                    <li key={item.to}>
                      <Link to={item.to} className={LINK}>
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}

            <div>
              <h2 className="text-eyebrow text-on-night">{ui.contactTitle}</h2>
              <ul className="mt-lg flex flex-col gap-xs">
                <li>
                  <Link to={contactTo(locale)} className={LINK}>
                    {ui.contactForm}
                  </Link>
                </li>
                {contacts.map((c) => (
                  <li key={c.href}>
                    <a
                      href={c.href}
                      className={LINK}
                      {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    >
                      {c.label}
                      {c.external && <span className="sr-only"> {UI[locale].opensNewTab}</span>}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <LogoStrip
          label={ui.partners}
          logos={partnerLogos()}
          theme="night"
          className="mt-3xl border-t border-night-soft pt-2xl"
        />

        <div className="mt-3xl flex flex-col gap-sm border-t border-night-soft pt-lg text-caption sm:flex-row sm:items-center sm:justify-between">
          <p>{ui.copyright(new Date().getFullYear())}</p>
          <ul className="flex flex-wrap gap-x-xl">
            {legalNav(locale).map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="inline-flex min-h-touch items-center underline-offset-4 hover:text-on-night hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="flex min-h-touch items-center">
              {ui.divisionOf}&nbsp;
              <a
                href={SITE_CONFIG.mainSite}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-touch items-center underline underline-offset-4 hover:text-on-night"
              >
                Sociabilis
              </a>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  )
}

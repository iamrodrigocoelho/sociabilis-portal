import { Link, useLocation } from 'react-router'
import { UI } from '../content/ui'
import { useLocale } from '../i18n/context'
import { LOCALES, LOCALE_META } from '../i18n/locales'
import { equivalentPath } from '../lib/i18nPaths'

interface LanguageSwitcherProps {
  className?: string
  onNavigate?: () => void
}

/**
 * Seletor "PT | EN" (RF41). Leva à página equivalente no outro idioma; sem
 * equivalente, ao índice do blog ou à home do outro idioma.
 */
export function LanguageSwitcher({ className = '', onNavigate }: LanguageSwitcherProps) {
  const locale = useLocale()
  const { pathname } = useLocation()

  return (
    <nav aria-label={UI[locale].language} className={className}>
      <ul className="flex items-center gap-xs text-body-sm font-medium">
        {LOCALES.map((l, i) => {
          const meta = LOCALE_META[l]
          const current = l === locale
          return (
            <li key={l} className="flex items-center gap-xs">
              {i > 0 && (
                <span aria-hidden="true" className="text-line">
                  |
                </span>
              )}
              {current ? (
                <span
                  aria-current="true"
                  className="relative inline-flex min-h-touch min-w-touch items-center justify-center text-ink after:absolute after:inset-x-sm after:bottom-2 after:h-0.5 after:bg-brand"
                >
                  <abbr title={meta.name} className="no-underline">
                    {meta.short}
                  </abbr>
                </span>
              ) : (
                <Link
                  to={equivalentPath(pathname, l) ?? '/'}
                  hrefLang={meta.hreflang}
                  lang={meta.htmlLang}
                  title={UI[l].switchTo}
                  onClick={onNavigate}
                  className="inline-flex min-h-touch min-w-touch items-center justify-center text-body-mid transition-colors duration-200 hover:text-ink"
                >
                  <span className="sr-only">{meta.name}</span>
                  <span aria-hidden="true">{meta.short}</span>
                </Link>
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

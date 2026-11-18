import { Link } from 'react-router'
import { UI } from '../content/ui'
import { useLocale } from '../i18n/context'

export interface Crumb {
  label: string
  to?: string
}

/** Trilha de navegação. O último item é a página atual. */
export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label={UI[useLocale()].breadcrumb}>
      <ol className="flex flex-wrap items-center gap-x-sm gap-y-xs text-body-sm text-body-mid">
        {items.map((item, i) => {
          const last = i === items.length - 1
          return (
            <li key={item.label} className="flex min-w-0 items-center gap-sm">
              {item.to && !last ? (
                <Link to={item.to} className="inline-flex min-h-touch items-center underline-offset-4 hover:text-ink hover:underline">
                  {item.label}
                </Link>
              ) : (
                <span aria-current={last ? 'page' : undefined} className="truncate text-ink">
                  {item.label}
                </span>
              )}
              {!last && <span aria-hidden="true">›</span>}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

import { Link } from 'react-router'

interface PaginationProps {
  current: number
  total: number
  /** Gera a URL de cada página (ex.: n => n === 1 ? '/blog' : `/blog/pagina/${n}`). */
  hrefFor: (page: number) => string
  label?: string
}

const ITEM =
  'inline-flex min-h-touch min-w-touch items-center justify-center rounded-md border px-md text-body-sm font-medium transition-colors duration-200'

/** Anterior/próxima + números, alvos de 44px. Oculta com uma página só. */
export function Pagination({ current, total, hrefFor, label = 'Paginação' }: PaginationProps) {
  if (total <= 1) return null
  const pages = Array.from({ length: total }, (_, i) => i + 1)

  return (
    <nav aria-label={label}>
      <ul className="flex flex-wrap items-center justify-center gap-sm">
        {current > 1 && (
          <li>
            <Link to={hrefFor(current - 1)} rel="prev" className={`${ITEM} border-line text-ink hover:border-ink`}>
              <span aria-hidden="true">←&nbsp;</span>Anterior
            </Link>
          </li>
        )}
        {pages.map((page) => (
          <li key={page}>
            {page === current ? (
              <span aria-current="page" className={`${ITEM} border-ink bg-ink text-white`}>
                <span className="sr-only">Página </span>
                {page}
              </span>
            ) : (
              <Link to={hrefFor(page)} className={`${ITEM} border-line text-ink hover:border-ink`}>
                <span className="sr-only">Página </span>
                {page}
              </Link>
            )}
          </li>
        ))}
        {current < total && (
          <li>
            <Link to={hrefFor(current + 1)} rel="next" className={`${ITEM} border-line text-ink hover:border-ink`}>
              Próxima<span aria-hidden="true">&nbsp;→</span>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  )
}

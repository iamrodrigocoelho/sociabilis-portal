import { UI } from '../content/ui'
import { useLocale } from '../i18n/context'
import type { Locale } from '../i18n/locales'
import { formatDate } from '../lib/format'
import { BrandPattern } from './BrandPattern'
import { LinkArrow } from './LinkArrow'

export interface MediaCardData {
  title: string
  /** Rótulo do badge: Artigo, Podcast, Na mídia. */
  badge: string
  date: string
  /** Veículo/autor exibido junto à data (opcional). */
  source?: string
  /** Rota interna (post do blog) ou URL externa. */
  to?: string
  href?: string
  thumbnail?: string
  thumbnailAlt?: string
  /** Idioma do conteúdo, se diferente do da página. */
  lang?: Locale
}

/** Thumbnail 16:9, badge de tipo, data, título e link. Sem thumbnail: padrão geométrico da marca. */
export function MediaCard({ item, headingLevel: Heading = 'h3' }: { item: MediaCardData; headingLevel?: 'h2' | 'h3' }) {
  const locale = useLocale()
  const ui = UI[locale]
  return (
    <article className="flex h-full flex-col">
      <div className="aspect-video overflow-hidden rounded-lg bg-canvas-soft">
        {item.thumbnail ? (
          <img
            src={item.thumbnail}
            alt={item.thumbnailAlt ?? ''}
            width={640}
            height={360}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        ) : (
          <BrandPattern />
        )}
      </div>
      <div className="mt-lg flex flex-wrap items-center gap-x-md gap-y-xs text-caption text-body-mid">
        <span className="rounded-pill border border-line px-md py-xs font-medium text-ink">{item.badge}</span>
        <time dateTime={item.date}>{formatDate(item.date, locale)}</time>
        {item.source && <span>· {item.source}</span>}
      </div>
      <Heading className="mt-md text-heading-sm text-ink" lang={item.lang && item.lang !== locale ? item.lang : undefined}>
        {item.title}
      </Heading>
      <div className="mt-auto pt-md">
        {item.href ? (
          <LinkArrow href={item.href}>
            {ui.media.access}
            <span className="sr-only">
              : {item.title} {ui.opensNewTab}
            </span>
          </LinkArrow>
        ) : (
          <LinkArrow to={item.to}>
            {ui.media.readPost}
            <span className="sr-only">: {item.title}</span>
          </LinkArrow>
        )}
      </div>
    </article>
  )
}

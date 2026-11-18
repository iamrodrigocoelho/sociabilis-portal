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
}

/** Thumbnail 16:9, badge de tipo, data, título e link. Sem thumbnail: padrão geométrico da marca. */
export function MediaCard({ item, headingLevel: Heading = 'h3' }: { item: MediaCardData; headingLevel?: 'h2' | 'h3' }) {
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
        <time dateTime={item.date}>{formatDate(item.date)}</time>
        {item.source && <span>· {item.source}</span>}
      </div>
      <Heading className="mt-md text-heading-sm text-ink">{item.title}</Heading>
      <div className="mt-auto pt-md">
        {item.href ? (
          <LinkArrow href={item.href}>
            Acessar<span className="sr-only">: {item.title} (abre em nova aba)</span>
          </LinkArrow>
        ) : (
          <LinkArrow to={item.to}>
            Ler artigo<span className="sr-only">: {item.title}</span>
          </LinkArrow>
        )}
      </div>
    </article>
  )
}

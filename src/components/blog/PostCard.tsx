import { Link } from 'react-router'
import { BLOG } from '../../content/blog'
import { useLocale } from '../../i18n/context'
import { postPath } from '../../lib/blog'
import type { PostMeta } from '../../lib/blogTypes'
import { formatDate } from '../../lib/format'
import { BrandPattern } from '../BrandPattern'

/** Capa 16:9 (ou padrão da marca), tag, data, leitura, título e resumo de 2 linhas. */
export function PostCard({ post, index = 0, headingLevel: Heading = 'h2' }: { post: PostMeta; index?: number; headingLevel?: 'h2' | 'h3' }) {
  const locale = useLocale()
  const L = BLOG[locale].labels
  return (
    <article className="group relative flex h-full flex-col">
      <div className="aspect-video overflow-hidden rounded-lg bg-canvas-soft">
        {post.cover ? (
          <img
            src={post.cover.src}
            alt=""
            width={post.cover.width}
            height={post.cover.height}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        ) : (
          <BrandPattern seed={index} />
        )}
      </div>
      <div className="mt-lg flex flex-wrap items-center gap-x-md gap-y-xs text-caption text-body-mid">
        <span className="rounded-pill border border-line px-md py-xs font-medium text-ink">{post.tags[0].label}</span>
        <time dateTime={post.date}>{formatDate(post.date, locale)}</time>
        <span aria-hidden="true">·</span>
        <span>{L.readingTime(post.readingMinutes)}</span>
        {post.draft && <span className="font-semibold text-error">{L.draft}</span>}
      </div>
      <Heading className="mt-md text-heading-sm text-ink">
        {/* O link cobre o card inteiro (alvo de toque grande, um único link por card). */}
        <Link to={postPath(post.lang, post.slug)} className="after:absolute after:inset-0 group-hover:text-primary">
          {post.title}
        </Link>
      </Heading>
      <p className="mt-sm line-clamp-2 text-body-sm">{post.description}</p>
    </article>
  )
}

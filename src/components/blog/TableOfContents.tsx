import { BLOG_LABELS as L } from '../../content/blog'
import type { TocItem } from '../../lib/blogTypes'

/** Sumário automático (posts com 3 ou mais h2). */
export function TableOfContents({ items }: { items: TocItem[] }) {
  if (items.length < 3) return null
  return (
    <nav aria-labelledby="toc-title" className="rounded-md bg-canvas-soft p-xl">
      <h2 id="toc-title" className="text-eyebrow text-body-mid">
        {L.toc}
      </h2>
      <ol className="mt-lg flex flex-col gap-xs text-body-sm">
        {items.map((item) => (
          <li key={item.id}>
            <a href={`#${item.id}`} className="inline-flex min-h-touch items-center text-ink underline-offset-4 hover:text-primary hover:underline lg:min-h-0 lg:py-xs">
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}

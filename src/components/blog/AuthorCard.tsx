import { BLOG } from '../../content/blog'
import { useLocale } from '../../i18n/context'
import type { Author } from '../../content/authors'

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter((w) => w.length > 2)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('')
}

export function AuthorCard({ author }: { author: Author }) {
  const locale = useLocale()
  const L = BLOG[locale].labels
  return (
    <section aria-labelledby="author-title" className="flex gap-lg rounded-md border border-line p-xl">
      {author.photo ? (
        <img src={author.photo} alt="" width={64} height={64} loading="lazy" className="h-16 w-16 shrink-0 rounded-pill object-cover" />
      ) : (
        <span aria-hidden="true" className="flex h-16 w-16 shrink-0 items-center justify-center rounded-pill bg-canvas-soft font-display text-heading-sm text-primary">
          {initials(author.name)}
        </span>
      )}
      <div>
        <h2 id="author-title" className="text-eyebrow text-body-mid">
          {L.author}
        </h2>
        <p className="mt-sm text-heading-sm text-ink">{author.name}</p>
        <p className="text-body-sm">{author.role[locale]}</p>
        {author.linkedin && (
          <a href={author.linkedin} target="_blank" rel="noopener noreferrer" className="mt-sm inline-flex min-h-touch items-center text-body-sm font-semibold text-primary underline-offset-4 hover:underline">
            LinkedIn<span className="sr-only"> de {author.name} (abre em nova aba)</span>
          </a>
        )}
      </div>
    </section>
  )
}

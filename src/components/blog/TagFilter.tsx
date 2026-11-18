import { BLOG } from '../../content/blog'
import { useLocale } from '../../i18n/context'
import { blogPath, getTags, tagPath } from '../../lib/blog'
import { TagChip } from '../TagChip'

/** Chips de filtro por tag (RF31). `active` = slug da tag atual (ou null em /blog). */
export function TagFilter({ active }: { active: string | null }) {
  const locale = useLocale()
  const L = BLOG[locale].labels
  const tags = getTags(locale)
  if (tags.length === 0) return null
  return (
    <nav aria-label={L.tagsNav} className="mb-3xl">
      <ul className="flex flex-wrap gap-sm">
        <li>
          <TagChip to={blogPath(locale)} active={active === null}>
            {L.allTags}
          </TagChip>
        </li>
        {tags.map((tag) => (
          <li key={tag.slug}>
            <TagChip to={tagPath(locale, tag.slug)} active={active === tag.slug}>
              {tag.label}
            </TagChip>
          </li>
        ))}
      </ul>
    </nav>
  )
}

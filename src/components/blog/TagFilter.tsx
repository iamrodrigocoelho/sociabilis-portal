import { BLOG_LABELS as L } from '../../content/blog'
import { BLOG_PATH, getTags, tagPath } from '../../lib/blog'
import { TagChip } from '../TagChip'

/** Chips de filtro por tag (RF31). `active` = slug da tag atual (ou null em /blog). */
export function TagFilter({ active }: { active: string | null }) {
  const tags = getTags()
  if (tags.length === 0) return null
  return (
    <nav aria-label={L.tagsNav} className="mb-3xl">
      <ul className="flex flex-wrap gap-sm">
        <li>
          <TagChip to={BLOG_PATH} active={active === null}>
            {L.allTags}
          </TagChip>
        </li>
        {tags.map((tag) => (
          <li key={tag.slug}>
            <TagChip to={tagPath(tag.slug)} active={active === tag.slug}>
              {tag.label}
            </TagChip>
          </li>
        ))}
      </ul>
    </nav>
  )
}

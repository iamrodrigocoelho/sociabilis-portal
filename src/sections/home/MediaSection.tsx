import { LinkArrow } from '../../components/LinkArrow'
import { MediaCard } from '../../components/MediaCard'
import { Reveal } from '../../components/Reveal'
import { Section } from '../../components/Section'
import { MEDIA_SECTION } from '../../content/home'
import { getLatestPublications } from '../../lib/publications'

/** RF09: 3 itens mais recentes (posts + mídia externa). Oculta sem itens. */
export function MediaSection() {
  const items = getLatestPublications(MEDIA_SECTION.limit)
  if (items.length === 0) return null

  return (
    <Section id={MEDIA_SECTION.id} labelledBy="media-title">
      <div className="mb-3xl flex flex-wrap items-end justify-between gap-lg">
        <h2 id="media-title" className="text-display-lg">
          {MEDIA_SECTION.title}
        </h2>
        <LinkArrow to={MEDIA_SECTION.seeAll.to}>{MEDIA_SECTION.seeAll.label}</LinkArrow>
      </div>
      <Reveal as="ul" className="grid gap-2xl md:grid-cols-2 lg:grid-cols-3 lg:gap-xl">
        {items.map((item) => (
          <li key={item.title}>
            <MediaCard item={item} />
          </li>
        ))}
      </Reveal>
    </Section>
  )
}

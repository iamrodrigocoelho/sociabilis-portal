import { useParams } from 'react-router'
import { PostGrid } from '../components/blog/PostGrid'
import { TagFilter } from '../components/blog/TagFilter'
import { Breadcrumb } from '../components/Breadcrumb'
import { NotFoundContent } from '../components/NotFoundContent'
import { Section } from '../components/Section'
import { SectionHeader } from '../components/SectionHeader'
import { Seo } from '../components/Seo'
import { BLOG } from '../content/blog'
import { UI } from '../content/ui'
import { useLocale } from '../i18n/context'
import { PATHS } from '../i18n/locales'
import { blogPath, getTag, postsByTag, tagPath } from '../lib/blog'

/** /blog/tag/:tag e /en/blog/tag/:tag (RF31): posts de uma tag. */
export default function BlogTagPage() {
  const locale = useLocale()
  const L = BLOG[locale].labels
  const { tag: tagSlug } = useParams()
  const tag = getTag(locale, tagSlug)
  if (!tag) return <NotFoundContent />

  const title = L.tagTitle(tag.label)
  return (
    <>
      <Seo title={title} description={L.tagDescription(tag.label)} path={tagPath(locale, tag.slug)} />
      <Section spacing="hero" labelledBy="tag-title">
        <Breadcrumb
          items={[{ label: UI[locale].home, to: PATHS.home[locale] }, { label: 'Blog', to: blogPath(locale) }, { label: tag.label }]}
        />
        <SectionHeader as="h1" size="lg" id="tag-title" eyebrow={L.tagEyebrow} title={title} className="mb-2xl mt-2xl" />
        <TagFilter active={tag.slug} />
        <PostGrid posts={postsByTag(locale, tag.slug)} />
      </Section>
    </>
  )
}

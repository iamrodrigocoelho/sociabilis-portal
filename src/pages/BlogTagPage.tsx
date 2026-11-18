import { useParams } from 'react-router'
import { PostGrid } from '../components/blog/PostGrid'
import { TagFilter } from '../components/blog/TagFilter'
import { Breadcrumb } from '../components/Breadcrumb'
import { NotFoundContent } from '../components/NotFoundContent'
import { Section } from '../components/Section'
import { SectionHeader } from '../components/SectionHeader'
import { Seo } from '../components/Seo'
import { BLOG_LABELS as L } from '../content/blog'
import { BLOG_PATH, getTag, postsByTag, tagPath } from '../lib/blog'

/** /blog/tag/:tag (RF31): posts de uma tag. */
export default function BlogTagPage() {
  const { tag: tagSlug } = useParams()
  const tag = getTag(tagSlug)
  if (!tag) return <NotFoundContent />

  const title = L.tagTitle(tag.label)
  return (
    <>
      <Seo
        title={title}
        description={`Artigos da Sociabilis AI Labs sobre ${tag.label}: implantação de IA, governança e sustentabilidade aplicadas a negócios responsáveis.`}
        path={tagPath(tag.slug)}
      />
      <Section spacing="hero" labelledBy="tag-title">
        <Breadcrumb items={[{ label: 'Início', to: '/' }, { label: 'Blog', to: BLOG_PATH }, { label: tag.label }]} />
        <SectionHeader as="h1" size="lg" id="tag-title" eyebrow={L.tagEyebrow} title={title} className="mb-2xl mt-2xl" />
        <TagFilter active={tag.slug} />
        <PostGrid posts={postsByTag(tag.slug)} />
      </Section>
    </>
  )
}

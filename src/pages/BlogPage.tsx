import { useParams } from 'react-router'
import { PostGrid } from '../components/blog/PostGrid'
import { TagFilter } from '../components/blog/TagFilter'
import { NotFoundContent } from '../components/NotFoundContent'
import { Pagination } from '../components/Pagination'
import { Section } from '../components/Section'
import { SectionHeader } from '../components/SectionHeader'
import { Seo } from '../components/Seo'
import { BLOG } from '../content/blog'
import { PAGE_SEO } from '../content/pages'
import { useLocale } from '../i18n/context'
import { pagePath, postsForPage, totalPages } from '../lib/blog'

/** /blog, /blog/pagina/:page e equivalentes em inglês (RF31): 9 posts por página, data desc. */
export default function BlogPage() {
  const locale = useLocale()
  const { hero, labels } = BLOG[locale]
  const { page: pageParam } = useParams()
  const page = pageParam === undefined ? 1 : Number(pageParam)
  const total = totalPages(locale)

  // A página 1 é o próprio índice (/blog), não /blog/pagina/1.
  if (!Number.isInteger(page) || page < 1 || page > total || pageParam === '1') return <NotFoundContent />

  const base = PAGE_SEO[locale].blog
  const seo =
    page === 1
      ? base
      : {
          ...base,
          title: labels.pageTitle(page),
          description: base.description + labels.pageDescriptionSuffix(page),
          path: pagePath(locale, page),
        }

  return (
    <>
      <Seo {...seo} />
      <Section spacing="hero" labelledBy="blog-title">
        <SectionHeader as="h1" size="xl" id="blog-title" eyebrow={hero.eyebrow} title={hero.title} />
        <TagFilter active={null} />
        <PostGrid posts={postsForPage(locale, page)} />
        <div className="mt-4xl">
          <Pagination current={page} total={total} hrefFor={(n) => pagePath(locale, n)} label={labels.pagesNav} />
        </div>
      </Section>
    </>
  )
}

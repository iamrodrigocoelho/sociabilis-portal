import { useParams } from 'react-router'
import { PostGrid } from '../components/blog/PostGrid'
import { TagFilter } from '../components/blog/TagFilter'
import { NotFoundContent } from '../components/NotFoundContent'
import { Pagination } from '../components/Pagination'
import { Section } from '../components/Section'
import { SectionHeader } from '../components/SectionHeader'
import { Seo } from '../components/Seo'
import { BLOG_HERO } from '../content/blog'
import { PAGE_SEO } from '../content/pages'
import { pagePath, postsForPage, totalPages } from '../lib/blog'

/** /blog e /blog/pagina/:page (RF31): 9 posts por página, data desc. */
export default function BlogPage() {
  const { page: pageParam } = useParams()
  const page = pageParam === undefined ? 1 : Number(pageParam)
  const total = totalPages()

  // /blog/pagina/1 não existe (a página 1 é /blog).
  if (!Number.isInteger(page) || page < 1 || page > total || pageParam === '1') return <NotFoundContent />

  const seo =
    page === 1
      ? PAGE_SEO.blog
      : {
          ...PAGE_SEO.blog,
          title: `Blog: página ${page}`,
          description: `${PAGE_SEO.blog.description} Página ${page}.`,
          path: pagePath(page),
        }

  return (
    <>
      <Seo {...seo} />
      <Section spacing="hero" labelledBy="blog-title">
        <SectionHeader as="h1" size="xl" id="blog-title" eyebrow={BLOG_HERO.eyebrow} title={BLOG_HERO.title} />
        <TagFilter active={null} />
        <PostGrid posts={postsForPage(page)} />
        <div className="mt-4xl">
          <Pagination current={page} total={total} hrefFor={pagePath} label="Páginas do blog" />
        </div>
      </Section>
    </>
  )
}

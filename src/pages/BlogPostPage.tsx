import { Link, useParams } from 'react-router'
import { AuthorCard } from '../components/blog/AuthorCard'
import { Markdown } from '../components/blog/Markdown'
import { PostCard } from '../components/blog/PostCard'
import { PostCta } from '../components/blog/PostCta'
import { ShareLinks } from '../components/blog/ShareLinks'
import { TableOfContents } from '../components/blog/TableOfContents'
import { Breadcrumb } from '../components/Breadcrumb'
import { Container } from '../components/Container'
import { NotFoundContent } from '../components/NotFoundContent'
import { Seo } from '../components/Seo'
import { TagChip } from '../components/TagChip'
import { BLOG } from '../content/blog'
import { UI } from '../content/ui'
import { useLocale } from '../i18n/context'
import { LOCALE_META, PATHS, otherLocale } from '../i18n/locales'
import { blogPath, getAuthor, getPost, postPath, relatedPosts, tagPath, translationPath } from '../lib/blog'
import { readPostBody } from '../lib/blogBodies'
import { formatDate } from '../lib/format'
import { blogPostingSchema, breadcrumbSchema } from '../lib/schema'
import { canonicalUrl } from '../lib/seo'

/** /blog/:slug (RF32). */
export default function BlogPostPage() {
  const locale = useLocale()
  const L = BLOG[locale].labels
  const { slug = '' } = useParams()
  const post = getPost(locale, slug)
  const body = post ? readPostBody(locale, slug) : undefined
  if (!post || !body) return <NotFoundContent />

  const author = getAuthor(post.author)
  const path = postPath(locale, post.slug)
  const translated = translationPath(post)
  const other = otherLocale(locale)
  const url = canonicalUrl(path)
  const related = relatedPosts(post)
  const crumbs = [{ label: UI[locale].home, to: PATHS.home[locale] as string }, { label: 'Blog', to: blogPath(locale) }, { label: post.title }]

  return (
    <>
      <Seo
        title={post.title}
        description={post.description}
        path={path}
        type="article"
        image={post.cover?.src}
        imageAlt={post.cover?.alt}
        publishedTime={post.date}
        modifiedTime={post.updated ?? post.date}
        noindex={post.draft}
        jsonLd={[blogPostingSchema(post, author, locale), breadcrumbSchema(crumbs, path)]}
      />

      <article aria-labelledby="post-title">
        <Container className="pb-3xl pt-2xl lg:pt-4xl">
          <Breadcrumb items={crumbs} />

          <header className="mt-2xl max-w-prose">
            <ul className="flex flex-wrap gap-sm" aria-label={UI[locale].postTopics}>
              {post.tags.map((tag) => (
                <li key={tag.slug}>
                  <TagChip to={tagPath(locale, tag.slug)}>{tag.label}</TagChip>
                </li>
              ))}
            </ul>
            <h1 id="post-title" className="mt-xl text-display-lg text-balance">
              {post.title}
            </h1>
            <p className="mt-xl flex flex-wrap gap-x-md gap-y-xs text-body-sm text-body-mid">
              {author && (
                <span>
                  {L.by} <span className="font-medium text-ink">{author.name}</span>
                </span>
              )}
              <span aria-hidden="true">·</span>
              <time dateTime={post.date}>{formatDate(post.date, locale)}</time>
              {post.updated && post.updated !== post.date && (
                <span>
                  ({L.updated} <time dateTime={post.updated}>{formatDate(post.updated, locale)}</time>)
                </span>
              )}
              <span aria-hidden="true">·</span>
              <span>{L.readingTime(post.readingMinutes)}</span>
              {post.draft && <span className="font-semibold text-error">{L.draft}</span>}
            </p>
            {translated && (
              <p className="mt-md text-body-sm">
                <Link
                  to={translated}
                  hrefLang={LOCALE_META[other].hreflang}
                  lang={LOCALE_META[other].htmlLang}
                  className="inline-flex min-h-touch items-center font-semibold text-primary underline-offset-4 hover:underline"
                >
                  {L.readInOtherLanguage}
                </Link>
              </p>
            )}
          </header>

          {post.cover && (
            <img
              src={post.cover.src}
              alt={post.cover.alt}
              width={post.cover.width}
              height={post.cover.height}
              // Capa é o maior elemento acima da dobra (LCP). React 18 não tipa fetchPriority.
              {...{ fetchpriority: 'high' }}
              className="mt-2xl aspect-video w-full rounded-lg object-cover"
            />
          )}

          <div className="mt-3xl grid gap-3xl lg:grid-cols-12">
            {/* Sumário antes do corpo no mobile; coluna lateral sticky no desktop. */}
            <aside className="flex flex-col gap-2xl lg:order-last lg:col-span-4">
              <div className="flex flex-col gap-2xl lg:sticky lg:top-28">
                <TableOfContents items={body.toc} />
                <div className="hidden lg:block">
                  <ShareLinks url={url} title={post.title} />
                </div>
              </div>
            </aside>

            <div className="min-w-0 max-w-prose lg:col-span-8">
              <Markdown blocks={body.blocks} />
              <div className="mt-3xl flex flex-col gap-2xl border-t border-line pt-2xl">
                <div className="lg:hidden">
                  <ShareLinks url={url} title={post.title} />
                </div>
                {author && <AuthorCard author={author} />}
                <PostCta />
              </div>
            </div>
          </div>
        </Container>
      </article>

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="border-t border-line py-4xl lg:py-5xl">
          <Container>
            <h2 id="related-title" className="text-display-md">
              {L.related}
            </h2>
            <ul className="mt-2xl grid gap-3xl sm:grid-cols-2 sm:gap-x-xl lg:grid-cols-3">
              {related.map((p, i) => (
                <li key={p.slug}>
                  <PostCard post={p} index={i} headingLevel="h3" />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}
    </>
  )
}

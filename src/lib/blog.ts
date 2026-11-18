import * as blogIndex from 'virtual:blog-index'
import { AUTHORS, type Author } from '../content/authors'
import { BLOG_PAGE_SEGMENT, LOCALES, PATHS, type Locale } from '../i18n/locales'
import type { PostMeta, PostTag } from './blogTypes'

/** Posts dos dois idiomas (no dev, inclui rascunhos), ordenados por data desc. */
const ALL_POSTS = blogIndex.posts as PostMeta[]

export const POSTS_PER_PAGE = 9

export const getPosts = (locale: Locale): PostMeta[] => ALL_POSTS.filter((p) => p.lang === locale)
export const getPost = (locale: Locale, slug: string | undefined) =>
  ALL_POSTS.find((p) => p.lang === locale && p.slug === slug)
export const getAuthor = (id: string): Author | undefined => AUTHORS[id]

export const blogPath = (locale: Locale) => PATHS.blog[locale]
export const postPath = (locale: Locale, slug: string) => `${PATHS.blog[locale]}/${slug}`
export const tagPath = (locale: Locale, tagSlug: string) => `${PATHS.blog[locale]}/tag/${tagSlug}`
export const pagePath = (locale: Locale, page: number) =>
  page <= 1 ? PATHS.blog[locale] : `${PATHS.blog[locale]}/${BLOG_PAGE_SEGMENT[locale]}/${page}`

export const totalPages = (locale: Locale) => Math.max(1, Math.ceil(getPosts(locale).length / POSTS_PER_PAGE))

export function postsForPage(locale: Locale, page: number): PostMeta[] {
  const start = (page - 1) * POSTS_PER_PAGE
  return getPosts(locale).slice(start, start + POSTS_PER_PAGE)
}

/** Tags usadas no idioma, ordenadas por número de posts (desc) e nome. */
export function getTags(locale: Locale): (PostTag & { count: number })[] {
  const map = new Map<string, PostTag & { count: number }>()
  for (const post of getPosts(locale)) {
    for (const tag of post.tags) {
      const entry = map.get(tag.slug) ?? { ...tag, count: 0 }
      entry.count++
      map.set(tag.slug, entry)
    }
  }
  return [...map.values()].sort(
    (a, b) => b.count - a.count || a.label.localeCompare(b.label, locale === 'pt' ? 'pt-BR' : 'en'),
  )
}

export const getTag = (locale: Locale, slug: string | undefined) => getTags(locale).find((t) => t.slug === slug)
export const postsByTag = (locale: Locale, slug: string) =>
  getPosts(locale).filter((p) => p.tags.some((t) => t.slug === slug))

/** Até `limit` posts relacionados do mesmo idioma: mais tags em comum primeiro, depois os mais recentes. */
export function relatedPosts(post: PostMeta, limit = 3): PostMeta[] {
  const tags = new Set(post.tags.map((t) => t.slug))
  return getPosts(post.lang)
    .filter((p) => p.slug !== post.slug)
    .map((p) => ({ p, shared: p.tags.filter((t) => tags.has(t.slug)).length }))
    .filter(({ shared }) => shared > 0)
    .sort((a, b) => b.shared - a.shared || b.p.date.localeCompare(a.p.date))
    .slice(0, limit)
    .map(({ p }) => p)
}

/** Caminho da tradução publicada de um post, se existir. */
export function translationPath(post: PostMeta): string | undefined {
  if (!post.translation) return undefined
  const other: Locale = post.lang === 'pt' ? 'en' : 'pt'
  return getPost(other, post.translation) ? postPath(other, post.translation) : undefined
}

/** Caminhos do blog a pré-renderizar nos dois idiomas (usado só no build). */
export function blogPrerenderPaths(): string[] {
  return LOCALES.flatMap((locale) => {
    const paths: string[] = [PATHS.blog[locale]]
    for (let page = 2; page <= totalPages(locale); page++) paths.push(pagePath(locale, page))
    for (const tag of getTags(locale)) paths.push(tagPath(locale, tag.slug))
    for (const post of getPosts(locale)) paths.push(postPath(locale, post.slug))
    return paths
  })
}

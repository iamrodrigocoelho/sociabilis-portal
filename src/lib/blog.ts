import * as blogIndex from 'virtual:blog-index'
import { AUTHORS, type Author } from '../content/authors'
import type { PostMeta, PostTag } from './blogTypes'

/** Posts publicados (no dev, inclui rascunhos), ordenados por data desc. */
const posts = blogIndex.posts as PostMeta[]

export const POSTS_PER_PAGE = 9
export const BLOG_PATH = '/blog'

export const getPosts = (): PostMeta[] => posts
export const getPost = (slug: string | undefined) => posts.find((p) => p.slug === slug)
export const getAuthor = (id: string): Author | undefined => AUTHORS[id]

export const postPath = (slug: string) => `${BLOG_PATH}/${slug}`
export const tagPath = (tagSlug: string) => `${BLOG_PATH}/tag/${tagSlug}`
export const pagePath = (page: number) => (page <= 1 ? BLOG_PATH : `${BLOG_PATH}/pagina/${page}`)

export const totalPages = (count = posts.length) => Math.max(1, Math.ceil(count / POSTS_PER_PAGE))

export function postsForPage(page: number): PostMeta[] {
  const start = (page - 1) * POSTS_PER_PAGE
  return posts.slice(start, start + POSTS_PER_PAGE)
}

/** Tags usadas, ordenadas por número de posts (desc) e nome. */
export function getTags(): (PostTag & { count: number })[] {
  const map = new Map<string, PostTag & { count: number }>()
  for (const post of posts) {
    for (const tag of post.tags) {
      const entry = map.get(tag.slug) ?? { ...tag, count: 0 }
      entry.count++
      map.set(tag.slug, entry)
    }
  }
  return [...map.values()].sort((a, b) => b.count - a.count || a.label.localeCompare(b.label, 'pt-BR'))
}

export const getTag = (slug: string | undefined) => getTags().find((t) => t.slug === slug)
export const postsByTag = (slug: string) => posts.filter((p) => p.tags.some((t) => t.slug === slug))

/** Até `limit` posts relacionados: mais tags em comum primeiro, depois os mais recentes. */
export function relatedPosts(post: PostMeta, limit = 3): PostMeta[] {
  const tags = new Set(post.tags.map((t) => t.slug))
  return posts
    .filter((p) => p.slug !== post.slug)
    .map((p) => ({ p, shared: p.tags.filter((t) => tags.has(t.slug)).length }))
    .filter(({ shared }) => shared > 0)
    .sort((a, b) => b.shared - a.shared || b.p.date.localeCompare(a.p.date))
    .slice(0, limit)
    .map(({ p }) => p)
}

/** Caminhos do blog a pré-renderizar (usado só no build). */
export function blogPrerenderPaths(): string[] {
  const paths: string[] = []
  for (let page = 2; page <= totalPages(); page++) paths.push(pagePath(page))
  for (const tag of getTags()) paths.push(tagPath(tag.slug))
  for (const post of posts) paths.push(postPath(post.slug))
  return paths
}

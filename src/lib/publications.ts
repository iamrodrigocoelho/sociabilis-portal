import type { MediaCardData } from '../components/MediaCard'
import { MEDIA_ITEMS, MEDIA_TYPE_LABEL } from '../content/media'
import { getPosts, postPath } from './blog'

/**
 * Itens mais recentes de "Mídia e publicações" (RF09/RF33), ordenados por data desc:
 * posts do blog (badge "Artigo") + itens externos de content/media.ts.
 */
export function getLatestPublications(limit: number): MediaCardData[] {
  const articles: MediaCardData[] = getPosts()
    .filter((post) => !post.draft)
    .map((post) => ({
      title: post.title,
      badge: MEDIA_TYPE_LABEL.article,
      date: post.date,
      to: postPath(post.slug),
      thumbnail: post.cover?.src,
      thumbnailAlt: '',
    }))
  const external: MediaCardData[] = MEDIA_ITEMS.map((item) => ({
    title: item.title,
    badge: MEDIA_TYPE_LABEL[item.type],
    date: item.date,
    source: item.outlet,
    href: item.url,
    thumbnail: item.thumbnail,
    thumbnailAlt: item.thumbnailAlt,
  }))
  return [...articles, ...external].sort((a, b) => b.date.localeCompare(a.date)).slice(0, limit)
}

export const hasPublications = () => getLatestPublications(1).length > 0

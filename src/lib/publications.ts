import type { MediaCardData } from '../components/MediaCard'
import { MEDIA_ITEMS, MEDIA_TYPE_LABEL } from '../content/media'
import type { Locale } from '../i18n/locales'
import { getPosts, postPath } from './blog'

/**
 * Itens mais recentes de "Mídia e publicações" (RF09/RF33) no idioma, ordenados
 * por data desc: posts do blog (badge "Artigo") + itens externos de
 * content/media.ts (sem `lang`, aparecem nos dois idiomas).
 */
export function getLatestPublications(locale: Locale, limit: number): MediaCardData[] {
  const labels = MEDIA_TYPE_LABEL[locale]
  const articles: MediaCardData[] = getPosts(locale)
    .filter((post) => !post.draft)
    .map((post) => ({
      title: post.title,
      badge: labels.article,
      date: post.date,
      to: postPath(locale, post.slug),
      thumbnail: post.cover?.src,
      thumbnailAlt: '',
    }))
  const external: MediaCardData[] = MEDIA_ITEMS.filter((item) => !item.lang || item.lang === locale).map((item) => ({
    title: item.title,
    badge: labels[item.type],
    date: item.date,
    source: item.outlet,
    href: item.url,
    thumbnail: item.thumbnail,
    thumbnailAlt: item.thumbnailAlt,
    lang: item.lang,
  }))
  return [...articles, ...external].sort((a, b) => b.date.localeCompare(a.date)).slice(0, limit)
}

export const hasPublications = (locale: Locale) => getLatestPublications(locale, 1).length > 0

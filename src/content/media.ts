/**
 * Itens externos de "Mídia e publicações" (RF09): podcasts, artigos e entrevistas.
 * [ASSET] Preencher com itens reais (título, veículo, data, URL). Nunca inventar.
 * Os posts do blog entram automaticamente na seção (ver src/lib/publications.ts).
 */
export type MediaType = 'article' | 'podcast' | 'press'

export interface MediaItem {
  title: string
  type: MediaType
  /** Veículo ou programa (ex.: nome do podcast). */
  outlet: string
  /** ISO 8601 (AAAA-MM-DD). */
  date: string
  url: string
  /** Thumbnail 16:9 em public/media/ (opcional). */
  thumbnail?: string
  thumbnailAlt?: string
}

export const MEDIA_ITEMS: MediaItem[] = []

export const MEDIA_TYPE_LABEL: Record<MediaType, string> = {
  article: 'Artigo',
  podcast: 'Podcast',
  press: 'Na mídia',
}

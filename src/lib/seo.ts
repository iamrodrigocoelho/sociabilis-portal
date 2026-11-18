import { SITE_CONFIG } from '../config/contact'

/**
 * Metadados de uma página. Usado pelo componente <Seo> no cliente e pelo
 * script de pré-renderização (scripts/prerender.js) para gerar o <head>.
 */
export interface SeoData {
  /** Título da página, sem o sufixo da marca. */
  title: string
  /** Meta description (ideal: 120–160 caracteres). */
  description: string
  /** Caminho canônico, começando com "/" (ex.: "/blog/meu-post"). */
  path: string
  /** Imagem OG absoluta ou relativa à raiz. */
  image?: string
  imageAlt?: string
  type?: 'website' | 'article'
  /** Não indexar (404, páginas provisórias). Também remove a rota do sitemap. */
  noindex?: boolean
  /** Não acrescentar " | Sociabilis AI Labs" ao título. */
  rawTitle?: boolean
  publishedTime?: string
  modifiedTime?: string
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
}

export interface HeadTag {
  tag: 'meta' | 'link' | 'script'
  attrs: Record<string, string>
  /** Conteúdo textual (apenas para script JSON-LD). */
  text?: string
}

export const SEO_ATTR = 'data-seo'

export function absoluteUrl(pathOrUrl: string): string {
  if (/^https?:\/\//.test(pathOrUrl)) return pathOrUrl
  return `${SITE_CONFIG.url}${pathOrUrl.startsWith('/') ? '' : '/'}${pathOrUrl}`
}

export function canonicalUrl(path: string): string {
  // Sem barra final, exceto na raiz.
  const clean = path === '/' ? '/' : path.replace(/\/+$/, '')
  return absoluteUrl(clean)
}

export function fullTitle(seo: SeoData): string {
  return seo.rawTitle ? seo.title : `${seo.title} | ${SITE_CONFIG.name}`
}

export function buildHeadTags(seo: SeoData): HeadTag[] {
  const url = canonicalUrl(seo.path)
  const title = fullTitle(seo)
  const image = absoluteUrl(seo.image ?? SITE_CONFIG.defaultOgImage)
  const type = seo.type ?? 'website'

  const meta = (key: 'name' | 'property', name: string, content: string): HeadTag => ({
    tag: 'meta',
    attrs: { [key]: name, content },
  })

  const tags: HeadTag[] = [
    meta('name', 'description', seo.description),
    meta('name', 'robots', seo.noindex ? 'noindex, follow' : 'index, follow'),
    meta('property', 'og:type', type),
    meta('property', 'og:title', title),
    meta('property', 'og:description', seo.description),
    meta('property', 'og:url', url),
    meta('property', 'og:image', image),
    meta('property', 'og:locale', SITE_CONFIG.locale),
    meta('property', 'og:site_name', SITE_CONFIG.name),
    meta('name', 'twitter:card', 'summary_large_image'),
    meta('name', 'twitter:title', title),
    meta('name', 'twitter:description', seo.description),
    meta('name', 'twitter:image', image),
  ]

  if (seo.imageAlt) {
    tags.push(meta('property', 'og:image:alt', seo.imageAlt))
    tags.push(meta('name', 'twitter:image:alt', seo.imageAlt))
  }
  if (seo.publishedTime) tags.push(meta('property', 'article:published_time', seo.publishedTime))
  if (seo.modifiedTime) tags.push(meta('property', 'article:modified_time', seo.modifiedTime))

  if (!seo.noindex) tags.push({ tag: 'link', attrs: { rel: 'canonical', href: url } })

  const jsonLd = seo.jsonLd ? (Array.isArray(seo.jsonLd) ? seo.jsonLd : [seo.jsonLd]) : []
  for (const data of jsonLd) {
    tags.push({
      tag: 'script',
      attrs: { type: 'application/ld+json' },
      text: JSON.stringify({ '@context': 'https://schema.org', ...data }),
    })
  }

  return tags
}

// --- Serialização para HTML (pré-renderização) ---------------------------

function escapeAttr(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

/** Evita que o conteúdo JSON feche a tag <script>. */
function escapeScriptText(value: string): string {
  return value.replace(/</g, '\\u003c').replace(/>/g, '\\u003e').replace(/&/g, '\\u0026')
}

export function renderHeadToString(seo: SeoData): string {
  const lines = [`<title>${escapeAttr(fullTitle(seo))}</title>`]
  for (const { tag, attrs, text } of buildHeadTags(seo)) {
    const attrStr = [
      ...Object.entries(attrs).map(([k, v]) => `${k}="${escapeAttr(v)}"`),
      SEO_ATTR,
    ].join(' ')
    lines.push(
      tag === 'script' ? `<script ${attrStr}>${escapeScriptText(text ?? '')}</script>` : `<${tag} ${attrStr} />`,
    )
  }
  return lines.join('\n    ')
}

// --- Aplicação no DOM (navegação client-side) ----------------------------

export function applyHead(seo: SeoData): void {
  document.title = fullTitle(seo)
  document.head.querySelectorAll(`[${SEO_ATTR}]`).forEach((el) => el.remove())
  for (const { tag, attrs, text } of buildHeadTags(seo)) {
    const el = document.createElement(tag)
    for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v)
    el.setAttribute(SEO_ATTR, '')
    if (text) el.textContent = text
    document.head.appendChild(el)
  }
}

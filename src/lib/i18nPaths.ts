import { BLOG_PAGE_SEGMENT, LOCALES, PATHS, localeFromPath, type Locale, type PageId } from '../i18n/locales'
import { getPost, translationPath } from './blog'

/**
 * Caminho equivalente de `pathname` em `target`.
 * - `strict`: só devolve quando há conteúdo realmente equivalente (usado no hreflang).
 * - não estrito: cai no índice do blog ou na home do outro idioma (usado no seletor).
 */
export function equivalentPath(pathname: string, target: Locale, strict = false): string | null {
  const from = localeFromPath(pathname)
  const clean = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname
  if (from === target) return clean

  for (const id of Object.keys(PATHS) as PageId[]) {
    if (PATHS[id][from] === clean) return PATHS[id][target]
  }

  const blogPrefix = `${PATHS.blog[from]}/`
  if (clean.startsWith(blogPrefix)) {
    const rest = clean.slice(blogPrefix.length)
    const isListing = rest.startsWith(`${BLOG_PAGE_SEGMENT[from]}/`) || rest.startsWith('tag/')
    if (!isListing && !rest.includes('/')) {
      const post = getPost(from, rest)
      const translated = post && translationPath(post)
      if (translated) return translated
    }
    return strict ? null : PATHS.blog[target]
  }

  return strict ? null : PATHS.home[target]
}

/** Alternativas de idioma (hreflang) com conteúdo equivalente para `pathname`. */
export function alternatesFor(pathname: string): Partial<Record<Locale, string>> {
  const result: Partial<Record<Locale, string>> = {}
  for (const locale of LOCALES) {
    const path = equivalentPath(pathname, locale, true)
    if (path) result[locale] = path
  }
  return result
}

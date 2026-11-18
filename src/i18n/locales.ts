/**
 * Idiomas do site (PRD seção 15). Português é o padrão, na raiz; inglês sob /en.
 */
export const LOCALES = ['pt', 'en'] as const
export type Locale = (typeof LOCALES)[number]
export const DEFAULT_LOCALE: Locale = 'pt'

export const LOCALE_META: Record<
  Locale,
  { htmlLang: string; hreflang: string; ogLocale: string; dateLocale: string; short: string; name: string }
> = {
  pt: { htmlLang: 'pt-BR', hreflang: 'pt-BR', ogLocale: 'pt_BR', dateLocale: 'pt-BR', short: 'PT', name: 'Português' },
  en: { htmlLang: 'en', hreflang: 'en', ogLocale: 'en_US', dateLocale: 'en-US', short: 'EN', name: 'English' },
}

export const otherLocale = (locale: Locale): Locale => (locale === 'pt' ? 'en' : 'pt')

/** Idioma de um caminho: /en e /en/... são inglês; o resto, português. */
export function localeFromPath(pathname: string): Locale {
  return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'pt'
}

export type PageId = 'home' | 'offers' | 'blog' | 'privacy'

/** Caminhos das páginas fixas por idioma (RF40). */
export const PATHS: Record<PageId, Record<Locale, string>> = {
  home: { pt: '/', en: '/en' },
  offers: { pt: '/ia-no-seu-negocio', en: '/en/ai-for-your-business' },
  blog: { pt: '/blog', en: '/en/blog' },
  privacy: { pt: '/politica-de-privacidade', en: '/en/privacy-policy' },
}

/** Segmento da paginação do blog por idioma (/blog/pagina/2, /en/blog/page/2). */
export const BLOG_PAGE_SEGMENT: Record<Locale, string> = { pt: 'pagina', en: 'page' }

/** Âncoras e parâmetro de interesse por idioma (RF40). */
export const ANCHORS: Record<'about' | 'contact' | 'media' | 'methodology', Record<Locale, string>> = {
  about: { pt: 'sobre', en: 'about' },
  contact: { pt: 'contato', en: 'contact' },
  media: { pt: 'midia', en: 'media' },
  methodology: { pt: 'como-trabalhamos', en: 'how-we-work' },
}

export const INTEREST_PARAM: Record<Locale, string> = { pt: 'interesse', en: 'interest' }

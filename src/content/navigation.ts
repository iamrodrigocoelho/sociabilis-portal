import { ANCHORS, INTEREST_PARAM, LOCALES, PATHS, type Locale } from '../i18n/locales'
import { hasPublications } from '../lib/publications'
import { OFFERS, offerHref } from './offers'

export interface NavItem {
  label: string
  /** Rota interna ("/blog") ou rota + âncora ("/#sobre"). */
  to: string
}

const home = (locale: Locale, anchor: keyof typeof ANCHORS) => `${PATHS.home[locale]}#${ANCHORS[anchor][locale]}`

const NAV_LABELS = {
  pt: { home: 'Início', offers: 'IA no seu negócio', blog: 'Blog', about: 'Sobre', cta: 'Fale conosco', contact: 'Contato', content: 'Conteúdo', navigation: 'Navegação', media: 'Mídia', privacy: 'Política de privacidade' },
  en: { home: 'Home', offers: 'AI for your business', blog: 'Blog', about: 'About', cta: 'Contact us', contact: 'Contact', content: 'Content', navigation: 'Navigation', media: 'Media', privacy: 'Privacy policy' },
} satisfies Record<Locale, Record<string, string>>

export function mainNav(locale: Locale): NavItem[] {
  const l = NAV_LABELS[locale]
  return [
    { label: l.home, to: PATHS.home[locale] },
    { label: l.offers, to: PATHS.offers[locale] },
    { label: l.blog, to: PATHS.blog[locale] },
    { label: l.about, to: home(locale, 'about') },
  ]
}

/** CTA do header. Abre o modal de contato; `to` é o fallback sem JS. */
export const headerCta = (locale: Locale): NavItem => ({ label: NAV_LABELS[locale].cta, to: contactTo(locale) })

/** Colunas do footer (RF12): Navegação · IA no seu negócio · Conteúdo. */
export function footerNav(locale: Locale): { title: string; items: NavItem[] }[] {
  const l = NAV_LABELS[locale]
  return [
    { title: l.navigation, items: [...mainNav(locale), { label: l.contact, to: home(locale, 'contact') }] },
    { title: l.offers, items: OFFERS[locale].map((offer) => ({ label: offer.name, to: offerHref(locale, offer) })) },
    {
      title: l.content,
      items: [
        { label: l.blog, to: PATHS.blog[locale] },
        // A âncora de mídia só existe quando a seção da home tem itens.
        ...(hasPublications(locale) ? [{ label: l.media, to: home(locale, 'media') }] : []),
      ],
    },
  ]
}

export const legalNav = (locale: Locale): NavItem[] => [{ label: NAV_LABELS[locale].privacy, to: PATHS.privacy[locale] }]

export const isAnchor = (item: NavItem) => item.to.includes('#')

/**
 * Link para o contato com interesse opcional (slug de oferta ou "por-onde-comecar").
 * Com JS, os botões que apontam para este link abrem o modal de contato com o
 * interesse pré-selecionado (ver Button). Sem JS, ou aberto em nova aba, leva ao
 * formulário da home do idioma, que também lê o parâmetro de interesse.
 */
export function contactTo(locale: Locale, interest?: string) {
  const query = interest ? `?${INTEREST_PARAM[locale]}=${encodeURIComponent(interest)}` : ''
  return `${PATHS.home[locale]}${query}#${ANCHORS.contact[locale]}`
}

/** Se `to` é um link de contato (de qualquer idioma), devolve o interesse (ou null); senão, undefined. */
export function parseContactLink(to: string): string | null | undefined {
  const url = new URL(to, 'http://local')
  const locale = LOCALES.find((l) => url.pathname === PATHS.home[l] && url.hash === `#${ANCHORS.contact[l]}`)
  if (!locale) return undefined
  return url.searchParams.get(INTEREST_PARAM[locale])
}

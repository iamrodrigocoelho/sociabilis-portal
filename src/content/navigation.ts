import { hasPublications } from '../lib/publications'
import { MEDIA_SECTION } from './home'
import { OFFERS, offerHref } from './offers'

export interface NavItem {
  label: string
  /** Rota interna ("/blog") ou rota + âncora ("/#sobre"). */
  to: string
}

export const MAIN_NAV: NavItem[] = [
  { label: 'Início', to: '/' },
  { label: 'IA no seu negócio', to: '/ia-no-seu-negocio' },
  { label: 'Blog', to: '/blog' },
  { label: 'Sobre', to: '/#sobre' },
]

/** CTA do header. Abre o modal de contato; `to` é o fallback sem JS. */
export const HEADER_CTA: NavItem = { label: 'Fale conosco', to: '/#contato' } // abre o modal (ver Button)

/** Colunas do footer (RF12): Navegação · IA no seu negócio · Conteúdo. */
export function footerNav(): { title: string; items: NavItem[] }[] {
  return [
    {
      title: 'Navegação',
      items: [...MAIN_NAV, { label: 'Contato', to: '/#contato' }],
    },
    {
      title: 'IA no seu negócio',
      items: OFFERS.map((offer) => ({ label: offer.name, to: offerHref(offer) })),
    },
    {
      title: 'Conteúdo',
      items: [
        { label: 'Blog', to: '/blog' },
        // A âncora de mídia só existe quando a seção da home tem itens.
        ...(hasPublications() ? [{ label: 'Mídia', to: `/#${MEDIA_SECTION.id}` }] : []),
      ],
    },
  ]
}

export const LEGAL_NAV: NavItem[] = [
  { label: 'Política de privacidade', to: '/politica-de-privacidade' },
]

export const isAnchor = (item: NavItem) => item.to.includes('#')

export const CONTACT_ANCHOR = 'contato'
export const INTEREST_PARAM = 'interesse'

/**
 * Link para o contato com interesse opcional (slug de oferta ou "por-onde-comecar").
 * Com JS, os botões que apontam para este link abrem o modal de contato com o
 * interesse pré-selecionado (ver Button). Sem JS, ou aberto em nova aba, leva ao
 * formulário da home, que também lê `?interesse=`.
 */
export const contactTo = (interest?: string) =>
  interest ? `/?${INTEREST_PARAM}=${encodeURIComponent(interest)}#${CONTACT_ANCHOR}` : `/#${CONTACT_ANCHOR}`

/** Se `to` é um link de contato, devolve o interesse (ou null); senão, undefined. */
export function parseContactLink(to: string): string | null | undefined {
  const url = new URL(to, 'http://local')
  if (url.pathname !== '/' || url.hash !== `#${CONTACT_ANCHOR}`) return undefined
  return url.searchParams.get(INTEREST_PARAM)
}

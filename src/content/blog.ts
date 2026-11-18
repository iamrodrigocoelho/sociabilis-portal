import { PATHS, type Locale } from '../i18n/locales'
import { contactTo } from './navigation'

/** Textos do blog (RF31–RF32) por idioma. [VALIDAR EN] para o inglês. */
const pt = {
  hero: {
    eyebrow: 'Blog',
    title: 'Ideias sobre IA aplicada, governança e sustentabilidade', // [VALIDAR]
  },
  empty: {
    title: 'Os primeiros artigos estão a caminho.',
    text: 'Enquanto isso, conheça como implantamos IA com governança e eficiência.',
    cta: { label: 'Conheça as soluções', to: PATHS.offers.pt as string },
  },
  labels: {
    allTags: 'Todos',
    tagsNav: 'Filtrar por tema',
    tagEyebrow: 'Tema',
    tagTitle: (label: string) => `Artigos sobre ${label}`,
    tagDescription: (label: string) =>
      `Artigos da Sociabilis AI Labs sobre ${label}: implantação de IA, governança e sustentabilidade aplicadas a negócios responsáveis.`,
    pageTitle: (page: number) => `Blog: página ${page}`,
    pageDescriptionSuffix: (page: number) => ` Página ${page}.`,
    pagesNav: 'Páginas do blog',
    readingTime: (min: number) => `${min} min de leitura`,
    updated: 'Atualizado em',
    by: 'Por',
    toc: 'Neste artigo',
    share: 'Compartilhe',
    shareLinkedIn: 'LinkedIn',
    shareWhatsApp: 'WhatsApp',
    copyLink: 'Copiar link',
    copied: 'Link copiado',
    related: 'Leia também',
    author: 'Sobre o autor',
    draft: 'Rascunho',
    readInOtherLanguage: 'Read in English',
  },
  postCta: {
    title: 'Quer implantar IA com governança na sua empresa?',
    text: 'Conte o seu contexto e a gente ajuda a encontrar por onde começar.',
    cta: { label: 'Fale conosco', to: contactTo('pt') },
  },
}

const en: typeof pt = {
  hero: {
    eyebrow: 'Blog',
    title: 'Ideas on applied AI, governance and sustainability',
  },
  empty: {
    title: 'Our first articles are on their way.',
    text: 'In the meantime, see how we deploy AI with governance and efficiency.',
    cta: { label: 'Explore our solutions', to: PATHS.offers.en },
  },
  labels: {
    allTags: 'All',
    tagsNav: 'Filter by topic',
    tagEyebrow: 'Topic',
    tagTitle: (label: string) => `Articles about ${label}`,
    tagDescription: (label: string) =>
      `Articles by Sociabilis AI Labs about ${label}: AI deployment, governance and sustainability applied to responsible businesses.`,
    pageTitle: (page: number) => `Blog: page ${page}`,
    pageDescriptionSuffix: (page: number) => ` Page ${page}.`,
    pagesNav: 'Blog pages',
    readingTime: (min: number) => `${min} min read`,
    updated: 'Updated on',
    by: 'By',
    toc: 'In this article',
    share: 'Share',
    shareLinkedIn: 'LinkedIn',
    shareWhatsApp: 'WhatsApp',
    copyLink: 'Copy link',
    copied: 'Link copied',
    related: 'Read next',
    author: 'About the author',
    draft: 'Draft',
    readInOtherLanguage: 'Ler em português',
  },
  postCta: {
    title: 'Want to deploy AI with governance in your company?',
    text: 'Tell us about your context and we will help you find where to start.',
    cta: { label: 'Contact us', to: contactTo('en') },
  },
}

export const BLOG: Record<Locale, typeof pt> = { pt, en }

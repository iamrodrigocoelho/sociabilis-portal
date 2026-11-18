import { contactTo } from './navigation'

/** Textos do blog (RF31–RF32). */
export const BLOG_HERO = {
  eyebrow: 'Blog',
  title: 'Ideias sobre IA aplicada, governança e sustentabilidade', // [VALIDAR]
}

export const BLOG_EMPTY = {
  title: 'Os primeiros artigos estão a caminho.',
  text: 'Enquanto isso, conheça como implantamos IA com governança e eficiência.',
  cta: { label: 'Conheça as soluções', to: '/ia-no-seu-negocio' },
}

export const BLOG_LABELS = {
  allTags: 'Todos',
  tagsNav: 'Filtrar por tema',
  tagEyebrow: 'Tema',
  tagTitle: (label: string) => `Artigos sobre ${label}`,
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
  readPost: 'Ler artigo',
  draft: 'Rascunho',
}

export const POST_CTA = {
  title: 'Quer implantar IA com governança na sua empresa?',
  text: 'Conte o seu contexto e a gente ajuda a encontrar por onde começar.',
  cta: { label: 'Fale conosco', to: contactTo() },
}

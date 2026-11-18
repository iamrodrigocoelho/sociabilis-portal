import type { SeoData } from '../lib/seo'

/** Metadados de SEO por página. Títulos e descrições devem ser únicos. */
export const PAGE_SEO = {
  home: {
    title: 'Sociabilis AI Labs | IA responsável e sustentável para negócios de impacto',
    rawTitle: true,
    description:
      'A Sociabilis AI Labs implanta copilotos, agentes, automações e soluções com RAG para empresas responsáveis, B Corps e negócios de impacto, com governança.',
    path: '/',
  },
  aiForBusiness: {
    title: 'IA no seu negócio',
    description:
      'Seis caminhos para implantar IA com governança, eficiência e impacto mensurável: do diagnóstico a copilotos com RAG, agentes e IA sustentável.',
    path: '/ia-no-seu-negocio',
  },
  blog: {
    title: 'Blog',
    description:
      'Artigos da Sociabilis AI Labs sobre implantação de IA, governança, RAG, agentes e sustentabilidade aplicada a negócios responsáveis.',
    path: '/blog',
  },
  privacy: {
    title: 'Política de privacidade',
    description:
      'Como a Sociabilis AI Labs trata os dados pessoais enviados pelo formulário de contato e pelos demais canais deste site.',
    path: '/politica-de-privacidade',
  },
  notFound: {
    title: 'Página não encontrada',
    description:
      'A página que você procurou não existe ou foi movida. Volte para o início ou conheça as soluções da Sociabilis AI Labs.',
    path: '/404',
    noindex: true,
  },
} satisfies Record<string, SeoData>



export const NOT_FOUND = {
  eyebrow: 'Erro 404',
  title: 'Página não encontrada.',
  text: 'O endereço pode ter mudado ou a página não existe mais.',
  primary: { label: 'Voltar ao início', to: '/' },
  secondary: { label: 'Conheça as soluções', to: '/ia-no-seu-negocio' },
}

export const PRIVACY_PAGE = {
  eyebrow: 'Privacidade',
  title: 'Política de privacidade',
  pending:
    'A política de privacidade completa será publicada nesta página em breve. Em caso de dúvidas sobre o uso dos seus dados, entre em contato pelo formulário do site.',
  externalLabel: 'Ler a política de privacidade',
}

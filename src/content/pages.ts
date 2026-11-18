import { PATHS, type Locale } from '../i18n/locales'
import type { SeoData } from '../lib/seo'

type PageSeo = Omit<SeoData, 'locale'>

/** Metadados de SEO por página e idioma. Títulos e descrições devem ser únicos. */
const SEO_PT = {
  home: {
    title: 'Sociabilis AI Labs | IA responsável e sustentável para negócios de impacto',
    rawTitle: true,
    description:
      'A Sociabilis AI Labs implanta copilotos, agentes, automações e soluções com RAG para empresas responsáveis, B Corps e negócios de impacto, com governança.',
    path: PATHS.home.pt,
  },
  aiForBusiness: {
    title: 'IA no seu negócio',
    description:
      'Seis caminhos para implantar IA com governança, eficiência e impacto mensurável: do diagnóstico a copilotos com RAG, agentes e IA sustentável.',
    path: PATHS.offers.pt,
  },
  blog: {
    title: 'Blog',
    description:
      'Artigos da Sociabilis AI Labs sobre implantação de IA, governança, RAG, agentes e sustentabilidade aplicada a negócios responsáveis.',
    path: PATHS.blog.pt,
  },
  privacy: {
    title: 'Política de privacidade',
    description:
      'Como a Sociabilis AI Labs trata os dados pessoais enviados pelo formulário de contato e pelos demais canais deste site.',
    path: PATHS.privacy.pt,
  },
  notFound: {
    title: 'Página não encontrada',
    description:
      'A página que você procurou não existe ou foi movida. Volte para o início ou conheça as soluções da Sociabilis AI Labs.',
    path: '/404',
    noindex: true,
  },
} satisfies Record<string, PageSeo>

// [VALIDAR EN]
const SEO_EN: typeof SEO_PT = {
  home: {
    title: 'Sociabilis AI Labs | Responsible, sustainable AI for impact-driven businesses',
    rawTitle: true,
    description:
      'Sociabilis AI Labs deploys copilots, agents, automations and RAG solutions for responsible companies, B Corps and impact businesses, with governance.',
    path: PATHS.home.en,
  },
  aiForBusiness: {
    title: 'AI for your business',
    description:
      'Six paths to deploy AI with governance, efficiency and measurable impact: from assessment to RAG copilots, agents and sustainable AI.',
    path: PATHS.offers.en,
  },
  blog: {
    title: 'Blog',
    description:
      'Articles by Sociabilis AI Labs on AI deployment, governance, RAG, agents and sustainability applied to responsible businesses.',
    path: PATHS.blog.en,
  },
  privacy: {
    title: 'Privacy policy',
    description:
      'How Sociabilis AI Labs handles the personal data you send through the contact form and the other channels of this website.',
    path: PATHS.privacy.en,
  },
  notFound: {
    title: 'Page not found',
    description:
      'The page you are looking for does not exist or has moved. Go back to the home page or explore what Sociabilis AI Labs offers.',
    path: '/en/404',
    noindex: true,
  },
}

export const PAGE_SEO: Record<Locale, typeof SEO_PT> = { pt: SEO_PT, en: SEO_EN }

const NOT_FOUND_PT = {
  eyebrow: 'Erro 404',
  title: 'Página não encontrada.',
  text: 'O endereço pode ter mudado ou a página não existe mais.',
  primary: { label: 'Voltar ao início', to: PATHS.home.pt },
  secondary: { label: 'Conheça as soluções', to: PATHS.offers.pt as string },
}

export const NOT_FOUND: Record<Locale, typeof NOT_FOUND_PT> = {
  pt: NOT_FOUND_PT,
  en: {
    eyebrow: 'Error 404',
    title: 'Page not found.',
    text: 'The address may have changed or the page no longer exists.',
    primary: { label: 'Back to home', to: PATHS.home.en },
    secondary: { label: 'Explore our solutions', to: PATHS.offers.en },
  },
}

const PRIVACY_PT = {
  eyebrow: 'Privacidade',
  title: 'Política de privacidade',
  pending:
    'A política de privacidade completa será publicada nesta página em breve. Em caso de dúvidas sobre o uso dos seus dados, entre em contato pelo formulário do site.',
  externalLabel: 'Ler a política de privacidade',
  updatedAt: 'Atualizada em',
}

export const PRIVACY_PAGE: Record<Locale, typeof PRIVACY_PT> = {
  pt: PRIVACY_PT,
  en: {
    eyebrow: 'Privacy',
    title: 'Privacy policy',
    pending:
      'Our full privacy policy will be published on this page soon. If you have any questions about how your data is used, please reach us through the contact form.',
    externalLabel: 'Read the privacy policy',
    updatedAt: 'Last updated',
  },
}

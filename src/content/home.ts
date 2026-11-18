import { ChartLine, Leaf, PlugZap, ShieldCheck } from 'lucide-react'
import { ANCHORS, PATHS, type Locale } from '../i18n/locales'
import { contactTo } from './navigation'

/**
 * Conteúdo da home (RF02–RF11) por idioma. Textos marcados [VALIDAR] aguardam
 * aprovação; todo o inglês é tradução do português ([VALIDAR EN]).
 * No manifesto, o trecho entre **asteriscos** é destacado em verde-lima (sem HTML).
 */
const pt = {
  hero: {
    eyebrow: 'Sociabilis AI Labs',
    title: 'Implantamos IA responsável e sustentável no coração da operação do seu negócio.',
    lead: 'Copilotos, agentes, automações e soluções com RAG para empresas responsáveis, B Corps e negócios de impacto, com governança, eficiência e atenção aos impactos socioambientais.',
    primaryCta: { label: 'Fale conosco', to: contactTo('pt') },
    secondaryCta: { label: 'Conheça as soluções', to: PATHS.offers.pt as string },
  },
  valueIcons: [
    { icon: PlugZap, title: 'Implantação real', text: 'IA conectada aos processos da operação, não só pilotos.' },
    { icon: ShieldCheck, title: 'Governança desde o início', text: 'Segurança, privacidade e rastreabilidade no desenho da solução.' },
    { icon: Leaf, title: 'Eficiência e menor pegada', text: 'Escolha adequada de modelos, menos desperdício técnico, financeiro e ambiental.' },
    { icon: ChartLine, title: 'Impacto mensurável', text: 'Indicadores de produtividade, adoção, custo e impacto acompanhados.' },
  ],
  partnersLabel: 'Parceiros e certificações',
  clientsLabel: 'Empresas que confiam na Sociabilis',
  manifesto: {
    id: ANCHORS.about.pt as string,
    eyebrow: 'Nossa missão',
    title: 'Fazer a IA trabalhar a favor dos negócios e do planeta.', // [VALIDAR]
    lines: [
      // [VALIDAR]
      'IA não gera valor quando fica presa em pilotos.',
      'Não precisamos do maior modelo. Precisamos do modelo **certo**.',
      'Eficiência também é sustentabilidade.',
      'Governança não é freio. É o que permite escalar com confiança.',
    ],
    paragraph:
      'A Sociabilis AI Labs atua como uma AI Deployment Company. Entramos no contexto real do cliente, priorizamos casos de uso de alto impacto e implantamos soluções que podem ser medidas, governadas e evoluídas.',
  },
  pillars: {
    eyebrow: 'Nossos pilares',
    title: 'Três pilares para uma IA que gera resultado real.',
    items: [
      { label: 'A', title: 'Deploy AI', text: 'Implantamos soluções conectadas aos processos reais: copilotos internos, agentes, automações e sistemas com RAG.' },
      { label: 'B', title: 'Govern AI', text: 'Bases de governança, segurança, privacidade, rastreabilidade e uso responsável.' },
      { label: 'C', title: 'Sustain AI', text: 'Eficiência, escolha adequada de modelos, redução de desperdícios e mensuração da pegada socioambiental da IA.' },
    ],
  },
  offersSection: { eyebrow: 'Linhas de negócio', title: 'Como podemos ajudar.', cardCta: 'Veja mais' },
  ctaBand: {
    // [VALIDAR]
    title: 'Sua empresa não precisa só testar IA. Precisa implantar com estratégia, governança e impacto positivo.',
    cta: { label: 'Quero implantar IA com governança', to: contactTo('pt') },
  },
  mediaSection: {
    id: ANCHORS.media.pt as string,
    title: 'Mídia e publicações',
    seeAll: { label: 'Ver todos', to: PATHS.blog.pt as string },
    limit: 3,
  },
  contactSection: {
    id: ANCHORS.contact.pt as string,
    eyebrow: 'Contato',
    title: 'Fale com a Sociabilis AI Labs',
    subtitle:
      'Preencha o formulário e nossa equipe entrará em contato para entender como podemos ajudar sua organização a implantar IA com governança e sustentabilidade.',
  },
}

// [VALIDAR EN]
const en: typeof pt = {
  hero: {
    eyebrow: 'Sociabilis AI Labs',
    title: 'We deploy responsible, sustainable AI at the core of your business operations.',
    lead: 'Copilots, agents, automations and RAG solutions for responsible companies, B Corps and impact businesses, with governance, efficiency and attention to social and environmental impact.',
    primaryCta: { label: 'Contact us', to: contactTo('en') },
    secondaryCta: { label: 'Explore our solutions', to: PATHS.offers.en },
  },
  valueIcons: [
    { icon: PlugZap, title: 'Real deployment', text: 'AI connected to your operational processes, not just pilots.' },
    { icon: ShieldCheck, title: 'Governance from day one', text: 'Security, privacy and traceability built into the solution design.' },
    { icon: Leaf, title: 'Efficiency and a smaller footprint', text: 'The right choice of models, with less technical, financial and environmental waste.' },
    { icon: ChartLine, title: 'Measurable impact', text: 'Productivity, adoption, cost and impact indicators, tracked over time.' },
  ],
  partnersLabel: 'Partners and certifications',
  clientsLabel: 'Companies that trust Sociabilis',
  manifesto: {
    id: ANCHORS.about.en,
    eyebrow: 'Our mission',
    title: 'Making AI work for businesses and for the planet.',
    lines: [
      'AI creates no value when it is stuck in pilots.',
      "We don't need the biggest model. We need the **right** one.",
      'Efficiency is also sustainability.',
      'Governance is not a brake. It is what lets you scale with confidence.',
    ],
    paragraph:
      'Sociabilis AI Labs works as an AI Deployment Company. We step into the client’s real context, prioritize high-impact use cases and deploy solutions that can be measured, governed and improved over time.',
  },
  pillars: {
    eyebrow: 'Our pillars',
    title: 'Three pillars for AI that delivers real results.',
    items: [
      { label: 'A', title: 'Deploy AI', text: 'We deploy solutions connected to real processes: internal copilots, agents, automations and RAG systems.' },
      { label: 'B', title: 'Govern AI', text: 'Foundations for governance, security, privacy, traceability and responsible use.' },
      { label: 'C', title: 'Sustain AI', text: 'Efficiency, the right choice of models, less waste and measurement of the social and environmental footprint of AI.' },
    ],
  },
  offersSection: { eyebrow: 'What we offer', title: 'How we can help.', cardCta: 'See more' },
  ctaBand: {
    title: "Your company doesn't just need to test AI. It needs to deploy it with strategy, governance and positive impact.",
    cta: { label: 'I want to deploy AI with governance', to: contactTo('en') },
  },
  mediaSection: {
    id: ANCHORS.media.en,
    title: 'Media and publications',
    seeAll: { label: 'See all', to: PATHS.blog.en },
    limit: 3,
  },
  contactSection: {
    id: ANCHORS.contact.en,
    eyebrow: 'Contact',
    title: 'Talk to Sociabilis AI Labs',
    subtitle:
      'Fill in the form and our team will get in touch to understand how we can help your organization deploy AI with governance and sustainability.',
  },
}

export const HOME: Record<Locale, typeof pt> = { pt, en }

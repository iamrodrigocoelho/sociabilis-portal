/**
 * Conteúdo da página IA no seu negócio (RF20–RF26) por idioma. O conteúdo das
 * ofertas fica em offers.ts. Metodologia, diferenciais, público e CTA final
 * são textos da v1. O inglês é tradução ([VALIDAR EN]).
 */
import type { Step } from '../components/Steps'
import { ANCHORS, type Locale } from '../i18n/locales'
import { contactTo } from './navigation'
import { START_INTEREST_SLUG } from './offers'

const pt = {
  hero: {
    eyebrow: 'IA no seu negócio',
    title: 'IA aplicada ao que a sua operação realmente precisa.', // [VALIDAR]
    intro:
      'Trabalhamos com empresas que querem sair do piloto e colocar IA para funcionar com governança, eficiência e impacto mensurável.',
    statement:
      'IA gera resultado quando parte de um problema real, de dados da própria operação e de critérios claros de sucesso. Por isso organizamos nosso trabalho em seis caminhos, do diagnóstico à operação contínua.',
    cta: { label: 'Não sabe por onde começar? Fale conosco', to: contactTo('pt', START_INTEREST_SLUG) },
  },
  /** Rótulos dos subtítulos de cada bloco de oferta (RF22). */
  blockLabels: {
    forWhom: 'Para quem é',
    features: 'O que entregamos',
    more: { open: 'Ver mais', close: 'Ver menos' },
    steps: 'Como funciona',
    fullMethodology: 'Segue a nossa metodologia completa, do diagnóstico à mitigação.',
    fullMethodologyLink: 'Veja como trabalhamos',
    deliverables: 'Entregáveis e resultados',
    useCases: 'Casos de uso',
    profiles: 'Perfis possíveis',
  },
  methodology: {
    id: ANCHORS.methodology.pt as string,
    eyebrow: 'Metodologia',
    title: 'Como trabalhamos',
    subtitle:
      'Uma abordagem estruturada que vai do diagnóstico à implantação, com foco em resultado real e impacto responsável.',
    steps: [
      { title: 'Diagnosticar', description: 'Entendemos o negócio, os processos, os dados e as principais dores antes de propor qualquer solução.' },
      { title: 'Priorizar', description: 'Selecionamos casos de uso com maior potencial de impacto e viabilidade considerando dados, maturidade e risco.' },
      { title: 'Prototipar', description: 'Criamos MVPs rápidos para validar valor, experiência e aderência técnica antes da implantação completa.' },
      { title: 'Implantar', description: 'Integramos a solução ao fluxo real de trabalho, com suporte à adoção pelas equipes.' },
      { title: 'Medir', description: 'Acompanhamos indicadores de produtividade, adoção, custo, qualidade e impacto ao longo do tempo.' },
      { title: 'Otimizar', description: 'Evoluímos a solução com base em dados, feedback das equipes e melhoria contínua.' },
      { title: 'Mitigar', description: 'Apoiamos a redução de desperdícios e a mensuração da pegada socioambiental da IA na organização.' },
    ] as Step[],
  },
  differentials: {
    eyebrow: 'Diferenciais',
    title: 'Por que a Sociabilis AI Labs',
    subtitle: 'O que nos diferencia não é apenas o que fazemos, mas como e para quem fazemos.',
    items: [
      { title: 'IA aplicada, não apenas conceitual', text: 'Ajudamos a tirar a IA da apresentação e levá-la para a operação. Nosso foco é implantação real, com resultado mensurável.' },
      { title: 'Modelo Forward Deployed AI', text: 'Atuamos próximos ao cliente para entender contexto, cultura, dados e processos reais, não apenas especificações em documentos.' },
      { title: 'Sustentabilidade como premissa', text: 'Consideramos eficiência, custo, consumo e impacto socioambiental desde o desenho da solução, não como etapa adicional.' },
      { title: 'Governança desde o início', text: 'Projetamos soluções com atenção a segurança, privacidade, rastreabilidade e uso responsável em cada decisão de arquitetura.' },
      { title: 'Arquitetura eficiente', text: 'Priorizamos RAG, SLMs, automações e escolha adequada de modelos para evitar desperdício técnico e financeiro.' },
      { title: 'Foco em negócios responsáveis', text: 'Trabalhamos com organizações que querem crescer com inovação, sustentabilidade e impacto positivo, não apenas com escala.' },
    ],
  },
  audience: {
    eyebrow: 'Para quem é',
    title: 'Para empresas que querem crescer com IA e responsabilidade.',
    text: 'Se sua organização quer usar IA para aumentar produtividade, reduzir desperdícios, melhorar decisões e acelerar inovação, a Sociabilis AI Labs pode ajudar a construir essa jornada de forma prática, segura e sustentável.',
    segments: [
      'B Corps',
      'Negócios de impacto',
      'Empresas responsáveis',
      'PMEs em transformação digital',
      'Consultorias ESG',
      'Startups',
      'Organizações do terceiro setor',
      'Áreas de inovação',
      'Áreas de tecnologia',
      'Áreas de sustentabilidade',
      'Áreas de produto',
      'Áreas de operações',
    ],
  },
  finalCta: {
    eyebrow: 'Próximo passo',
    title: 'Sua empresa não precisa apenas testar IA. Ela precisa implantar IA com estratégia, governança e impacto positivo.',
    text: 'A Sociabilis AI Labs transforma inteligência artificial em resultado real para negócios responsáveis.',
    cta: { label: 'Fale conosco', to: contactTo('pt') },
  },
}

// [VALIDAR EN]
const en: typeof pt = {
  hero: {
    eyebrow: 'AI for your business',
    title: 'Applied AI for what your operation really needs.',
    intro:
      'We work with companies that want to move beyond pilots and put AI to work with governance, efficiency and measurable impact.',
    statement:
      'AI delivers results when it starts from a real problem, your own operational data and clear success criteria. That is why we organize our work into six paths, from assessment to ongoing operation.',
    cta: { label: 'Not sure where to start? Contact us', to: contactTo('en', START_INTEREST_SLUG) },
  },
  blockLabels: {
    forWhom: 'Who it is for',
    features: 'What we deliver',
    more: { open: 'See more', close: 'See less' },
    steps: 'How it works',
    fullMethodology: 'Follows our full methodology, from assessment to mitigation.',
    fullMethodologyLink: 'See how we work',
    deliverables: 'Deliverables and results',
    useCases: 'Use cases',
    profiles: 'Possible profiles',
  },
  methodology: {
    id: ANCHORS.methodology.en,
    eyebrow: 'Methodology',
    title: 'How we work',
    subtitle: 'A structured approach from assessment to deployment, focused on real results and responsible impact.',
    steps: [
      { title: 'Assess', description: 'We understand the business, its processes, data and main pain points before proposing any solution.' },
      { title: 'Prioritize', description: 'We select the use cases with the greatest potential impact and feasibility, considering data, maturity and risk.' },
      { title: 'Prototype', description: 'We build fast MVPs to validate value, experience and technical fit before full deployment.' },
      { title: 'Deploy', description: 'We integrate the solution into the real workflow and support adoption across teams.' },
      { title: 'Measure', description: 'We track productivity, adoption, cost, quality and impact indicators over time.' },
      { title: 'Optimize', description: 'We evolve the solution based on data, team feedback and continuous improvement.' },
      { title: 'Mitigate', description: 'We help reduce waste and measure the social and environmental footprint of AI across the organization.' },
    ],
  },
  differentials: {
    eyebrow: 'Why us',
    title: 'Why Sociabilis AI Labs',
    subtitle: 'What sets us apart is not only what we do, but how we do it and who we do it for.',
    items: [
      { title: 'Applied AI, not just concepts', text: 'We help take AI out of the slide deck and into operations. Our focus is real deployment with measurable results.' },
      { title: 'Forward Deployed AI model', text: 'We work close to our clients to understand their real context, culture, data and processes, not just written specifications.' },
      { title: 'Sustainability as a premise', text: 'We consider efficiency, cost, consumption and social-environmental impact from the solution design, not as an extra step.' },
      { title: 'Governance from day one', text: 'We design solutions with security, privacy, traceability and responsible use in mind at every architecture decision.' },
      { title: 'Efficient architecture', text: 'We favor RAG, SLMs, automations and the right choice of models to avoid technical and financial waste.' },
      { title: 'Focus on responsible businesses', text: 'We work with organizations that want to grow through innovation, sustainability and positive impact, not just scale.' },
    ],
  },
  audience: {
    eyebrow: 'Who it is for',
    title: 'For companies that want to grow with AI, responsibly.',
    text: 'If your organization wants to use AI to boost productivity, reduce waste, improve decisions and accelerate innovation, Sociabilis AI Labs can help you build that journey in a practical, secure and sustainable way.',
    segments: [
      'B Corps',
      'Impact businesses',
      'Responsible companies',
      'SMEs in digital transformation',
      'ESG consultancies',
      'Startups',
      'Nonprofit organizations',
      'Innovation teams',
      'Technology teams',
      'Sustainability teams',
      'Product teams',
      'Operations teams',
    ],
  },
  finalCta: {
    eyebrow: 'Next step',
    title: "Your company doesn't just need to test AI. It needs to deploy AI with strategy, governance and positive impact.",
    text: 'Sociabilis AI Labs turns artificial intelligence into real results for responsible businesses.',
    cta: { label: 'Contact us', to: contactTo('en') },
  },
}

export const AI_FOR_BUSINESS: Record<Locale, typeof pt> = { pt, en }

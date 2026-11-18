import {
  BookOpenText,
  Cable,
  Calculator,
  CalendarRange,
  ChartLine,
  Eye,
  FileText,
  Gauge,
  GraduationCap,
  Grid2x2,
  Leaf,
  Library,
  Map as MapIcon,
  MessagesSquare,
  Plug,
  Route,
  ScanSearch,
  ShieldCheck,
  Users,
  Workflow,
  type LucideIcon,
} from 'lucide-react'
import { PATHS, type Locale } from '../i18n/locales'

/**
 * As 6 ofertas (RF07 e RF22). Fonte única para home, footer, formulário de
 * contato e página IA no seu negócio.
 *
 * Textos marcados [VALIDAR] no PRD estão sinalizados com comentário. Campos
 * opcionais ausentes não são exibidos: não inventar conteúdo para preenchê-los.
 */
export interface OfferFeature {
  icon: LucideIcon
  title: string
  /** Linha de apoio. O PRD ainda não define estas linhas: deixar vazio até haver texto aprovado. */
  text?: string
}

export interface Offer {
  /** Âncora em /ia-no-seu-negocio e valor do interesse no formulário. */
  slug: string
  name: string
  /** Frase curta da home (RF07). */
  summary: string
  icon: LucideIcon
  /** 1–2 frases (RF22.2). */
  pitch: string
  /** Qualificador "Para quem é" (RF22.3). */
  forWhom: string
  /** "O que entregamos": 3 itens (RF22.4). */
  features?: OfferFeature[]
  /** "Ver mais": benefícios adicionais (RF22.5). */
  moreBenefits?: string[]
  /** "Como funciona": etapas (RF22.6). */
  steps?: string[]
  /** Usa a metodologia completa da página (seção Como trabalhamos). */
  usesFullMethodology?: boolean
  /** "Entregáveis / resultados" (RF22.7). */
  deliverables?: string[]
  /** "Casos de uso" (RF22.8). */
  useCases?: string[]
  /** Perfis do squad (Forward Deployed AI Pod). */
  profiles?: string[]
  /** Texto do CTA; padrão "Falar sobre <nome>". */
  ctaLabel?: string
  /** Página própria da oferta, quando existir (ex.: AI Carbon Tracker no futuro). */
  pagePath?: string
}

const OFFERS_PT: Offer[] = [
  {
    slug: 'impact-scan',
    name: 'AI Opportunity & Impact Scan',
    summary: 'Diagnóstico para identificar onde a IA gera mais valor no seu negócio.',
    icon: ScanSearch,
    pitch:
      'Diagnóstico para identificar onde a IA pode gerar mais valor no negócio, com riscos e prioridades claros.',
    forWhom: 'Empresas que querem começar ou reorganizar sua jornada de IA com foco em resultado.', // [VALIDAR]
    features: [
      { icon: MapIcon, title: 'Mapa de oportunidades' },
      { icon: Grid2x2, title: 'Matriz impacto x esforço' },
      { icon: CalendarRange, title: 'Roadmap de 30, 60 e 90 dias' },
    ],
    moreBenefits: [
      'Riscos e dependências mapeados.',
      'Visão de custo e de impacto socioambiental de cada caso de uso.',
      'Recomendação de arquitetura (RAG, SLMs, automação).',
    ],
    // [VALIDAR]
    steps: ['Imersão (entrevistas e processos)', 'Mapeamento e priorização', 'Apresentação do roadmap'],
    deliverables: [
      'Mapa de oportunidades',
      'Matriz impacto x esforço',
      'Riscos e dependências',
      'Roadmap 30/60/90',
    ],
  },
  {
    slug: 'rag-starter',
    name: 'RAG Starter',
    summary: 'Copilotos com a base de conhecimento da sua empresa.',
    icon: BookOpenText,
    pitch:
      'Implantação de copilotos que respondem com base no conhecimento da sua empresa: políticas, documentos e procedimentos.',
    forWhom:
      'Empresas com conhecimento disperso em documentos e equipes que perdem tempo procurando informação.', // [VALIDAR]
    // [VALIDAR]
    features: [
      { icon: Library, title: 'Base de conhecimento estruturada' },
      { icon: MessagesSquare, title: 'Copilot integrado ao canal do time' },
      { icon: ShieldCheck, title: 'Governança de acesso e fontes citadas' },
    ],
    // [VALIDAR]
    moreBenefits: [
      'Respostas com referência à fonte.',
      'Controle de quem acessa o quê.',
      'Monitoramento de qualidade.',
      'Escolha de modelo eficiente.',
    ],
    // [VALIDAR]
    steps: ['Curadoria das fontes', 'Construção e testes', 'Implantação e acompanhamento'],
    useCases: [
      'Atendimento interno',
      'Políticas e procedimentos',
      'Documentos ESG',
      'Suporte técnico',
      'RH',
      'Jurídico',
      'Operações',
    ],
  },
  {
    slug: 'forward-deployed-pod',
    name: 'Forward Deployed AI Pod',
    summary: 'Um squad da Sociabilis implantando IA junto ao seu time.',
    icon: Users,
    pitch:
      'Um squad da Sociabilis AI Labs atuando próximo ao seu time para implantar IA no contexto real do negócio.',
    forWhom:
      'Organizações com vários casos de uso, dados sensíveis ou necessidade de acelerar a implantação com acompanhamento contínuo.', // [VALIDAR]
    // [VALIDAR]
    features: [
      { icon: Users, title: 'Squad dedicado' },
      { icon: Cable, title: 'Implantação integrada aos processos' },
      { icon: GraduationCap, title: 'Transferência de conhecimento para o time interno' },
    ],
    profiles: [
      'AI Deployment Lead',
      'Forward Deployed AI Engineer',
      'Product/Process Strategist',
      'Data/RAG Engineer',
      'Responsible & Sustainable AI Specialist',
    ],
    usesFullMethodology: true,
  },
  {
    slug: 'agents-automation',
    name: 'AI Agents & Automation',
    summary: 'Agentes e automações que apoiam ou executam tarefas operacionais.',
    icon: Workflow,
    pitch: 'Agentes de IA e automações inteligentes para apoiar ou executar tarefas operacionais.',
    forWhom: 'Times com tarefas repetitivas, alto volume de documentos ou fluxos entre sistemas.', // [VALIDAR]
    // [VALIDAR]
    features: [
      { icon: Route, title: 'Agentes desenhados para o processo' },
      { icon: Plug, title: 'Integrações com APIs e workflows' },
      { icon: Eye, title: 'Monitoramento e pontos de supervisão humana' },
    ],
    useCases: [
      'Triagem de e-mails',
      'Análise de documentos',
      'Geração de relatórios',
      'Coleta de evidências ESG',
      'Suporte interno',
      'Integração com APIs e workflows',
    ],
  },
  {
    slug: 'sustainable-ai-assessment',
    name: 'Sustainable AI Assessment',
    summary: 'Maturidade, governança e pegada socioambiental do seu uso de IA.',
    icon: Leaf,
    pitch: 'Avaliação da maturidade, governança e impacto socioambiental do uso de IA na organização.',
    forWhom: 'Empresas que já usam IA e precisam de visibilidade de riscos, custos e pegada.', // [VALIDAR]
    // Linguagem: "estimativa", nunca "neutralização" ou "compensação" sem metodologia definida.
    deliverables: [
      'Inventário de ferramentas',
      'Análise de riscos',
      'Recomendações de governança',
      'Estimativa de consumo, custo e emissões',
      'Plano de otimização e mitigação',
    ],
  },
  {
    slug: 'ai-carbon-tracker',
    name: 'AI Carbon Tracker',
    summary: 'Estime, acompanhe e comunique a pegada climática da IA generativa.',
    icon: Gauge,
    pitch:
      'Produto da Sociabilis para estimar, acompanhar e comunicar a pegada climática associada ao uso de IA generativa.',
    forWhom: 'Empresas que querem medir e reportar o impacto do seu uso de IA (ex.: relatórios ESG).', // [VALIDAR]
    // [VALIDAR]
    features: [
      { icon: Calculator, title: 'Estimativas de emissões por uso' },
      { icon: ChartLine, title: 'Acompanhamento ao longo do tempo' },
      { icon: FileText, title: 'Material para comunicação e relatórios' },
    ],
    ctaLabel: 'Quero conhecer o AI Carbon Tracker',
    // pagePath: '/ai-carbon-tracker', // futura página própria (fora do escopo da v2)
  },
]

/**
 * Textos em inglês, na mesma ordem de OFFERS_PT. Slugs, ícones e estrutura vêm
 * do português. [VALIDAR EN] Tradução dos textos PT; revisar antes de publicar.
 */
type OfferText = Omit<Offer, 'slug' | 'icon' | 'features' | 'pagePath'> & { features?: string[] }

const OFFERS_EN_TEXT: OfferText[] = [
  {
    name: 'AI Opportunity & Impact Scan',
    summary: 'An assessment to find where AI creates the most value in your business.',
    pitch: 'An assessment to identify where AI can create the most value in your business, with clear risks and priorities.',
    forWhom: 'Companies that want to start or reorganize their AI journey with a focus on results.',
    features: ['Opportunity map', 'Impact vs. effort matrix', '30, 60 and 90-day roadmap'],
    moreBenefits: [
      'Risks and dependencies mapped.',
      'Cost and social-environmental impact view for each use case.',
      'Architecture recommendation (RAG, SLMs, automation).',
    ],
    steps: ['Immersion (interviews and processes)', 'Mapping and prioritization', 'Roadmap presentation'],
    deliverables: ['Opportunity map', 'Impact vs. effort matrix', 'Risks and dependencies', '30/60/90 roadmap'],
  },
  {
    name: 'RAG Starter',
    summary: "Copilots grounded in your company's knowledge base.",
    pitch: "Deployment of copilots that answer based on your company's knowledge: policies, documents and procedures.",
    forWhom: 'Companies with knowledge scattered across documents and teams that lose time looking for information.',
    features: ['Structured knowledge base', "Copilot integrated into your team's channel", 'Access governance and cited sources'],
    moreBenefits: [
      'Answers that reference their source.',
      'Control over who can access what.',
      'Quality monitoring.',
      'Efficient model choice.',
    ],
    steps: ['Source curation', 'Build and testing', 'Deployment and follow-up'],
    useCases: ['Internal help desk', 'Policies and procedures', 'ESG documents', 'Technical support', 'HR', 'Legal', 'Operations'],
  },
  {
    name: 'Forward Deployed AI Pod',
    summary: 'A Sociabilis squad deploying AI alongside your team.',
    pitch: 'A Sociabilis AI Labs squad working closely with your team to deploy AI in the real context of your business.',
    forWhom:
      'Organizations with multiple use cases, sensitive data or a need to speed up deployment with ongoing support.',
    features: ['Dedicated squad', 'Deployment integrated into your processes', 'Knowledge transfer to your internal team'],
    profiles: [
      'AI Deployment Lead',
      'Forward Deployed AI Engineer',
      'Product/Process Strategist',
      'Data/RAG Engineer',
      'Responsible & Sustainable AI Specialist',
    ],
    usesFullMethodology: true,
  },
  {
    name: 'AI Agents & Automation',
    summary: 'Agents and automations that support or carry out operational tasks.',
    pitch: 'AI agents and intelligent automations to support or carry out operational tasks.',
    forWhom: 'Teams with repetitive tasks, high document volumes or workflows that span several systems.',
    features: ['Agents designed around the process', 'Integrations with APIs and workflows', 'Monitoring and human oversight checkpoints'],
    useCases: [
      'Email triage',
      'Document analysis',
      'Report generation',
      'ESG evidence collection',
      'Internal support',
      'Integration with APIs and workflows',
    ],
  },
  {
    name: 'Sustainable AI Assessment',
    summary: 'The maturity, governance and social-environmental footprint of your AI use.',
    pitch: 'An assessment of the maturity, governance and social-environmental impact of AI use across your organization.',
    forWhom: 'Companies that already use AI and need visibility into risks, costs and footprint.',
    // Linguagem: "estimate", nunca "offset" ou "neutralize" sem metodologia definida.
    deliverables: [
      'Tool inventory',
      'Risk analysis',
      'Governance recommendations',
      'Estimate of consumption, cost and emissions',
      'Optimization and mitigation plan',
    ],
  },
  {
    name: 'AI Carbon Tracker',
    summary: 'Estimate, track and communicate the climate footprint of generative AI.',
    pitch: 'A Sociabilis product to estimate, track and communicate the climate footprint of generative AI use.',
    forWhom: 'Companies that want to measure and report the impact of their AI use (e.g. in ESG reports).',
    features: ['Emission estimates per use', 'Tracking over time', 'Material for communication and reporting'],
    ctaLabel: 'I want to learn about AI Carbon Tracker',
  },
]

function buildEnglishOffers(): Offer[] {
  if (OFFERS_EN_TEXT.length !== OFFERS_PT.length) throw new Error('offers.ts: OFFERS_EN_TEXT fora de sincronia com OFFERS_PT.')
  return OFFERS_PT.map((pt, i) => {
    const { features, ...text } = OFFERS_EN_TEXT[i]
    if ((features?.length ?? 0) !== (pt.features?.length ?? 0)) {
      throw new Error(`offers.ts: "features" em inglês de ${pt.slug} deve ter ${pt.features?.length ?? 0} itens.`)
    }
    return {
      slug: pt.slug,
      icon: pt.icon,
      ...(pt.pagePath ? { pagePath: pt.pagePath } : {}),
      ...text,
      ...(pt.features ? { features: pt.features.map((f, j) => ({ ...f, title: features![j] })) } : {}),
    }
  })
}

export const OFFERS: Record<Locale, Offer[]> = { pt: OFFERS_PT, en: buildEnglishOffers() }

/** Interesse extra do formulário (RF11), além das 6 ofertas. O slug é o mesmo nos dois idiomas. */
export const START_INTEREST_SLUG = 'por-onde-comecar'
export const START_INTEREST: Record<Locale, { slug: string; label: string }> = {
  pt: { slug: START_INTEREST_SLUG, label: 'Quero entender por onde começar' },
  en: { slug: START_INTEREST_SLUG, label: "I'd like to understand where to start" },
}

export const offerHref = (locale: Locale, offer: Pick<Offer, 'slug'>) => `${PATHS.offers[locale]}#${offer.slug}`
export const offerCtaLabel = (locale: Locale, offer: Offer) =>
  offer.ctaLabel ?? (locale === 'pt' ? `Falar sobre ${offer.name}` : `Talk to us about ${offer.name}`)
export const offerNumber = (index: number) => String(index + 1).padStart(2, '0')

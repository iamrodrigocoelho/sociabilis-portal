import { ChartLine, Leaf, PlugZap, ShieldCheck, type LucideIcon } from 'lucide-react'

/** Conteúdo da home (RF02–RF11). Textos marcados [VALIDAR] aguardam aprovação. */

export const HERO = {
  eyebrow: 'Sociabilis AI Labs',
  title: 'Implantamos IA responsável e sustentável no coração da operação do seu negócio.',
  lead: 'Copilotos, agentes, automações e soluções com RAG para empresas responsáveis, B Corps e negócios de impacto, com governança, eficiência e atenção aos impactos socioambientais.',
  primaryCta: { label: 'Fale conosco', to: '/#contato' },
  secondaryCta: { label: 'Conheça as soluções', to: '/ia-no-seu-negocio' },
}

/** Título oculto (só leitores de tela) da faixa de ícones de valor. */
export const VALUE_ICONS_TITLE = 'Como a Sociabilis AI Labs trabalha'

export const VALUE_ICONS: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: PlugZap,
    title: 'Implantação real',
    text: 'IA conectada aos processos da operação, não só pilotos.',
  },
  {
    icon: ShieldCheck,
    title: 'Governança desde o início',
    text: 'Segurança, privacidade e rastreabilidade no desenho da solução.',
  },
  {
    icon: Leaf,
    title: 'Eficiência e menor pegada',
    text: 'Escolha adequada de modelos, menos desperdício técnico, financeiro e ambiental.',
  },
  {
    icon: ChartLine,
    title: 'Impacto mensurável',
    text: 'Indicadores de produtividade, adoção, custo e impacto acompanhados.',
  },
]

export const PARTNERS_LABEL = 'Parceiros e certificações'
export const CLIENTS_LABEL = 'Empresas que confiam na Sociabilis'

/**
 * Manifesto (RF05). Em `lines`, o trecho entre **asteriscos** é destacado
 * em verde-lima (sem HTML).
 */
export const MANIFESTO = {
  id: 'sobre',
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
}

export const PILLARS = {
  eyebrow: 'Nossos pilares',
  title: 'Três pilares para uma IA que gera resultado real.',
  items: [
    {
      label: 'A',
      title: 'Deploy AI',
      text: 'Implantamos soluções conectadas aos processos reais: copilotos internos, agentes, automações e sistemas com RAG.',
    },
    {
      label: 'B',
      title: 'Govern AI',
      text: 'Bases de governança, segurança, privacidade, rastreabilidade e uso responsável.',
    },
    {
      label: 'C',
      title: 'Sustain AI',
      text: 'Eficiência, escolha adequada de modelos, redução de desperdícios e mensuração da pegada socioambiental da IA.',
    },
  ],
}

export const OFFERS_SECTION = {
  eyebrow: 'Linhas de negócio',
  title: 'Como podemos ajudar.',
  cardCta: 'Veja mais',
}

export const CTA_BAND = {
  // [VALIDAR]
  title: 'Sua empresa não precisa só testar IA. Precisa implantar com estratégia, governança e impacto positivo.',
  cta: { label: 'Quero implantar IA com governança', to: '/#contato' },
}

export const MEDIA_SECTION = {
  id: 'midia',
  title: 'Mídia e publicações',
  seeAll: { label: 'Ver todos', to: '/blog' },
  limit: 3,
}

export const CONTACT_SECTION = {
  id: 'contato',
  eyebrow: 'Contato',
  title: 'Fale com a Sociabilis AI Labs',
  subtitle:
    'Preencha o formulário e nossa equipe entrará em contato para entender como podemos ajudar sua organização a implantar IA com governança e sustentabilidade.',
}

// Configure these values before deploying — do not hardcode real values in other files

export const SITE_CONFIG = {
  name: 'Sociabilis AI Labs',
  tagline: 'IA aplicada, governança desde o início e sustentabilidade como diferencial.',
  mainSite: 'https://sociabilis.com.br',
  // URL pública deste site (canonical, Open Graph, sitemap, RSS). Sem barra final.
  url: 'https://sociabilis.com.br',
  // Imagem Open Graph padrão (ideal: 1200×630). [ASSET] substituir por arte dedicada.
  defaultOgImage: '/img/logo-big-sociabilis.png',
  locale: 'pt_BR',
  copyright: `© ${new Date().getFullYear()} Sociabilis. Todos os direitos reservados.`,
}

export const CONTACT = {
  // Set to enable contact links — examples below, do not use as-is
  email: null as string | null,
  // email: 'contato@sociabilis.com.br'

  whatsapp: null as string | null,
  // whatsapp: '5511999999999' — country code + DDD + number, no spaces or dashes

  linkedin: null as string | null,
  // linkedin: 'https://www.linkedin.com/company/sociabilis'

  instagram: null as string | null,
  // instagram: 'https://www.instagram.com/sociabilis'
}

// Google reCAPTCHA v2 site key — obtain at https://www.google.com/recaptcha/admin
// The secret key goes in the server .env (RECAPTCHA_SECRET_KEY), never here
export const RECAPTCHA_SITE_KEY: string | null = '6LfpbSwtAAAAAGyagAA7KJ2NPk5BqvvTi3ofgCV9'


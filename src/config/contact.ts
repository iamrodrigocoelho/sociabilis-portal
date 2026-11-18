// Configure these values before deploying — do not hardcode real values in other files

export const SITE_CONFIG = {
  name: 'Sociabilis AI Labs',
  mainSite: 'https://sociabilis.com.br',
  // URL pública deste site (canonical, Open Graph, sitemap, RSS). Sem barra final.
  url: 'https://sociabilis.com.br',
  // Imagem Open Graph padrão (ideal: 1200×630). [ASSET] substituir por arte dedicada.
  defaultOgImage: '/img/logo-big-sociabilis.png',
}

export const CONTACT = {
  // Set to enable contact links — examples below, do not use as-is
  email: null as string | null,
  // email: 'contato@sociabilis.com.br'

  whatsapp: null as string | null,
  // whatsapp: '5511999999999' — country code + DDD + number, no spaces or dashes

  linkedin: 'https://www.linkedin.com/company/sociabilis/' as string | null,

  instagram: 'https://instagram.com/sociabilis.io' as string | null,
}

// Google reCAPTCHA v2 site key — obtain at https://www.google.com/recaptcha/admin
// The secret key goes in the server .env (RECAPTCHA_SECRET_KEY), never here
export const RECAPTCHA_SITE_KEY: string | null = '6LfpbSwtAAAAAGyagAA7KJ2NPk5BqvvTi3ofgCV9'


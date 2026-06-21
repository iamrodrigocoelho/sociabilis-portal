// Configure these values before deploying — do not hardcode real values in other files

export const SITE_CONFIG = {
  name: 'Sociabilis AI Labs',
  tagline: 'IA aplicada, governança desde o início e sustentabilidade como diferencial.',
  mainSite: 'https://sociabilis.com.br',
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

export function getContactHref(): string {
  if (CONTACT.email) return `mailto:${CONTACT.email}`
  if (CONTACT.whatsapp) return `https://wa.me/${CONTACT.whatsapp}`
  return '#contato'
}

/**
 * Autores do blog. O campo `author` do frontmatter deve ser uma das chaves abaixo.
 * [ASSET] Adicionar pessoas reais (nome, cargo, foto, LinkedIn) com autorização.
 * Fotos em public/blog/autores/ (WebP, quadradas, ~256px).
 */
export interface Author {
  /** `organization` para autoria institucional (JSON-LD). Padrão: pessoa. */
  kind?: 'person' | 'organization'
  name: string
  role: string
  photo?: string
  linkedin?: string
}

export const AUTHORS: Record<string, Author> = {
  inessa: {
    name: 'Inessa Salomão',
    role: 'Co-fundadora',
    linkedin: 'https://www.linkedin.com/in/inessals/',
  },
  equipe: {
    kind: 'organization',
    name: 'Equipe Sociabilis AI Labs',
    role: 'Sociabilis AI Labs',
  },
}

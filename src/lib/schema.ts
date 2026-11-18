import { CONTACT, SITE_CONFIG } from '../config/contact'
import { LOCALE_META, PATHS, type Locale } from '../i18n/locales'
import { absoluteUrl } from './seo'

/** JSON-LD Organization (home). Só inclui redes sociais configuradas. */
export function organizationSchema(locale: Locale): Record<string, unknown> {
  const sameAs = [CONTACT.linkedin, CONTACT.instagram].filter((v): v is string => Boolean(v))
  return {
    '@type': 'Organization',
    name: SITE_CONFIG.name,
    url: absoluteUrl(PATHS.home[locale]),
    logo: absoluteUrl('/img/logo-big-sociabilis.png'),
    description: 'AI Deployment Lab for Sustainable Business Transformation.',
    parentOrganization: { '@type': 'Organization', name: 'Sociabilis', url: SITE_CONFIG.mainSite },
    ...(CONTACT.email ? { email: CONTACT.email } : {}),
    ...(sameAs.length ? { sameAs } : {}),
  }
}

/** JSON-LD Service de cada oferta (página IA no seu negócio). */
export function serviceSchema(
  offer: { slug: string; name: string; pitch: string },
  pagePath: string,
  locale: Locale,
): Record<string, unknown> {
  return {
    '@type': 'Service',
    inLanguage: LOCALE_META[locale].htmlLang,
    '@id': absoluteUrl(`${pagePath}#${offer.slug}`),
    name: offer.name,
    description: offer.pitch,
    url: absoluteUrl(`${pagePath}#${offer.slug}`),
    provider: { '@type': 'Organization', name: SITE_CONFIG.name, url: SITE_CONFIG.url },
  }
}

/** JSON-LD BlogPosting (posts do blog). */
export function blogPostingSchema(
  post: { slug: string; title: string; description: string; date: string; updated?: string; tags: { label: string }[]; cover?: { src: string } },
  author: { name: string; kind?: 'person' | 'organization' } | undefined,
  locale: Locale,
): Record<string, unknown> {
  const url = absoluteUrl(`${PATHS.blog[locale]}/${post.slug}`)
  return {
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    inLanguage: LOCALE_META[locale].htmlLang,
    url,
    mainEntityOfPage: url,
    image: absoluteUrl(post.cover?.src ?? SITE_CONFIG.defaultOgImage),
    keywords: post.tags.map((t) => t.label).join(', '),
    author: author
      ? { '@type': author.kind === 'organization' ? 'Organization' : 'Person', name: author.name }
      : { '@type': 'Organization', name: SITE_CONFIG.name },
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      logo: { '@type': 'ImageObject', url: absoluteUrl('/img/logo-big-sociabilis.png') },
    },
  }
}

/** JSON-LD BreadcrumbList. O último item é a página atual (`currentPath`). */
export function breadcrumbSchema(items: { label: string; to?: string }[], currentPath: string): Record<string, unknown> {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      item: absoluteUrl(item.to ?? currentPath),
    })),
  }
}

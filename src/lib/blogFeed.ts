import { SITE_CONFIG } from '../config/contact'
import { PAGE_SEO } from '../content/pages'
import { LOCALES, LOCALE_META, PATHS } from '../i18n/locales'
import { getAuthor, getPosts, postPath } from './blog'
import { absoluteUrl } from './seo'

/** Caminho do RSS por idioma (/blog/rss.xml, /en/blog/rss.xml). */
export const feedPath = (locale: (typeof LOCALES)[number]) => `${PATHS.blog[locale]}/rss.xml`

/** Dados dos RSS de cada idioma, gerados por scripts/prerender.js. */
export function getBlogFeeds() {
  return LOCALES.map((locale) => ({
    path: feedPath(locale),
    language: LOCALE_META[locale].htmlLang,
    title: `Blog | ${SITE_CONFIG.name}`,
    description: PAGE_SEO[locale].blog.description,
    link: absoluteUrl(PATHS.blog[locale]),
    feedUrl: absoluteUrl(feedPath(locale)),
    items: getPosts(locale).map((post) => ({
      title: post.title,
      link: absoluteUrl(postPath(locale, post.slug)),
      description: post.description,
      date: post.date,
      author: getAuthor(post.author)?.name ?? SITE_CONFIG.name,
      categories: post.tags.map((t) => t.label),
    })),
  }))
}

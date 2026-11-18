import { SITE_CONFIG } from '../config/contact'
import { PAGE_SEO } from '../content/pages'
import { getAuthor, getPosts, postPath } from './blog'
import { absoluteUrl } from './seo'

/** Dados do RSS (/blog/rss.xml), gerado por scripts/prerender.js. */
export function getBlogFeed() {
  return {
    title: `Blog | ${SITE_CONFIG.name}`,
    description: PAGE_SEO.blog.description,
    link: absoluteUrl(PAGE_SEO.blog.path),
    feedUrl: absoluteUrl('/blog/rss.xml'),
    items: getPosts().map((post) => ({
      title: post.title,
      link: absoluteUrl(postPath(post.slug)),
      description: post.description,
      date: post.date,
      author: getAuthor(post.author)?.name ?? SITE_CONFIG.name,
      categories: post.tags.map((t) => t.label),
    })),
  }
}

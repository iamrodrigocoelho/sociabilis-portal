/**
 * Pré-renderização (SSG): gera um HTML estático por rota a partir do bundle
 * SSR (dist-ssr/entry-server.js), com <head> completo (title, description,
 * canonical, OG, JSON-LD) e conteúdo indexável.
 *
 * Também gera: dist/404.html e dist/en/404.html, dist/sitemap.xml, dist/robots.txt,
 * os RSS de cada idioma (dist/blog/rss.xml, dist/en/blog/rss.xml) e
 * dist/.routes.json (mapa rota → arquivo usado pelo server.js).
 *
 * Executado por `npm run build` após `vite build` e `vite build --ssr`.
 */
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const ROOT = resolve(import.meta.dirname, '..')
const DIST = join(ROOT, 'dist')
const SSR_DIR = join(ROOT, 'dist-ssr')
/** Caminhos que não existem, usados para renderizar a 404 de cada idioma. */
const NOT_FOUND_PAGES = [
  { url: '/__404__', file: '404.html' },
  { url: '/en/__404__', file: join('en', '404.html') },
]

const { render, getPrerenderPaths, modulesFor, renderHeadToString, getBlogFeeds, SITE_CONFIG, CONTACT_INTERESTS } = await import(
  pathToFileURL(join(SSR_DIR, 'entry-server.js')).href
)

const template = await readFile(join(DIST, 'index.html'), 'utf8')
const HTML_LANG_DEFAULT = '<html lang="pt-BR">'
if (!template.includes('<!--app-head-->') || !template.includes('<!--app-html-->') || !template.includes(HTML_LANG_DEFAULT)) {
  throw new Error(`index.html precisa conter <!--app-head-->, <!--app-html--> e ${HTML_LANG_DEFAULT}.`)
}
const HTML_LANG = { pt: 'pt-BR', en: 'en' }

// Manifest do Vite: chunk(s) JS de cada página, para <link rel="modulepreload">.
const MANIFEST_DIR = join(DIST, '.vite')
const manifest = JSON.parse(await readFile(join(MANIFEST_DIR, 'manifest.json'), 'utf8'))
const entryKey = Object.keys(manifest).find((k) => manifest[k].isEntry)

function preloadLinks(url) {
  const files = new Set()
  const visit = (key) => {
    const chunk = manifest[key]
    if (!chunk || key === entryKey || files.has(chunk.file)) return
    files.add(chunk.file)
    for (const imp of chunk.imports ?? []) visit(imp)
  }
  for (const key of modulesFor(url)) visit(key)
  return [...files].map((f) => `<link rel="modulepreload" crossorigin href="/${f}" />`).join('\n    ')
}

const errors = []
const warnings = []
const seen = { title: new Map(), description: new Map() }

function outFileFor(path) {
  return path === '/' ? 'index.html' : join(path.replace(/^\/+/, ''), 'index.html')
}

async function renderPage(url) {
  const { html, seo } = await render(url)
  if (!seo) {
    errors.push(`${url}: página sem <Seo> (title/description obrigatórios).`)
    return null
  }
  const head = [renderHeadToString(seo), preloadLinks(url)].filter(Boolean).join('\n    ')
  const page = template
    .replace(HTML_LANG_DEFAULT, `<html lang="${HTML_LANG[seo.locale]}">`)
    .replace('<!--app-head-->', head)
    .replace('<!--app-html-->', html)
  return { page, seo }
}

function checkSeo(url, seo) {
  // Únicos dentro de cada idioma (o mesmo título pode existir em PT e EN, ex.: "Blog").
  for (const field of ['title', 'description']) {
    const value = `${seo.locale}:${seo[field]}`
    if (seen[field].has(value)) errors.push(`${url}: ${field} duplicado de ${seen[field].get(value)}.`)
    seen[field].set(value, url)
  }
  const len = seo.description.length
  if (len < 120 || len > 160) warnings.push(`${url}: description com ${len} caracteres (ideal 120–160).`)
}

const paths = [...new Set(getPrerenderPaths())]
const routeMap = {}
const indexable = [] // { path, lastmod? }

for (const path of paths) {
  const result = await renderPage(path)
  if (!result) continue
  const file = outFileFor(path)
  await mkdir(dirname(join(DIST, file)), { recursive: true })
  await writeFile(join(DIST, file), result.page)
  routeMap[path] = file
  if (!result.seo.noindex) {
    checkSeo(path, result.seo)
    indexable.push({ path, lastmod: result.seo.modifiedTime ?? result.seo.publishedTime })
  }
}

for (const { url, file } of NOT_FOUND_PAGES) {
  const notFound = await renderPage(url)
  if (!notFound) continue
  await mkdir(dirname(join(DIST, file)), { recursive: true })
  await writeFile(join(DIST, file), notFound.page)
}

// sitemap.xml e robots.txt
const escapeXml = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...indexable.map(
    ({ path, lastmod }) =>
      `  <url><loc>${escapeXml(SITE_CONFIG.url + path)}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}</url>`,
  ),
  '</urlset>',
  '',
].join('\n')
await writeFile(join(DIST, 'sitemap.xml'), sitemap)
await writeFile(join(DIST, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_CONFIG.url}/sitemap.xml\n`)
// RSS 2.0 do blog
const rfc822 = (date) => new Date(`${date}T12:00:00Z`).toUTCString()
function renderRss(feed) {
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">',
    '  <channel>',
    `    <title>${escapeXml(feed.title)}</title>`,
    `    <link>${escapeXml(feed.link)}</link>`,
    `    <description>${escapeXml(feed.description)}</description>`,
    `    <language>${feed.language}</language>`,
    `    <atom:link href="${escapeXml(feed.feedUrl)}" rel="self" type="application/rss+xml" />`,
    ...(feed.items[0] ? [`    <lastBuildDate>${rfc822(feed.items[0].date)}</lastBuildDate>`] : []),
    ...feed.items.map((item) =>
      [
        '    <item>',
        `      <title>${escapeXml(item.title)}</title>`,
        `      <link>${escapeXml(item.link)}</link>`,
        `      <guid isPermaLink="true">${escapeXml(item.link)}</guid>`,
        `      <pubDate>${rfc822(item.date)}</pubDate>`,
        `      <dc:creator>${escapeXml(item.author)}</dc:creator>`,
        `      <description>${escapeXml(item.description)}</description>`,
        ...item.categories.map((c) => `      <category>${escapeXml(c)}</category>`),
        '    </item>',
      ].join('\n'),
    ),
    '  </channel>',
    '</rss>',
    '',
  ].join('\n')
}

const feeds = getBlogFeeds()
for (const feed of feeds) {
  const file = join(DIST, feed.path.replace(/^\/+/, ''))
  await mkdir(dirname(file), { recursive: true })
  await writeFile(file, renderRss(feed))
}

// Lista branca de interesses do formulário, lida pelo server.js (fonte: src/content/offers.ts).
await writeFile(join(DIST, '.contact-interests.json'), JSON.stringify(CONTACT_INTERESTS, null, 2))

await writeFile(join(DIST, '.routes.json'), JSON.stringify(routeMap, null, 2))

await rm(SSR_DIR, { recursive: true, force: true })
await rm(MANIFEST_DIR, { recursive: true, force: true })

for (const w of warnings) console.warn(`⚠ ${w}`)
if (errors.length) {
  for (const e of errors) console.error(`✖ ${e}`)
  process.exit(1)
}
console.log(
  `✓ ${Object.keys(routeMap).length} rotas pré-renderizadas + 404 (pt, en), sitemap.xml, robots.txt e RSS (${feeds
    .map((f) => `${f.language}: ${f.items.length} posts`)
    .join(', ')})`,
)

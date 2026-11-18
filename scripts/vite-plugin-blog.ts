/**
 * Plugin Vite do blog (RF30).
 *
 * Lê content/blog/*.md (arquivos iniciados por "_" são ignorados), valida o
 * frontmatter e converte o Markdown (GFM) numa árvore própria, sem HTML bruto.
 * Qualquer erro de validação interrompe o build.
 *
 * Módulos virtuais:
 *  - `virtual:blog-index`: metadados de todos os posts publicados + loaders dos corpos.
 *  - `virtual:blog-post/<slug>`: corpo de um post (um chunk por post).
 *
 * Em produção, posts com `draft: true` ou data futura ficam de fora.
 * Em `npm run dev`, rascunhos e posts futuros aparecem para revisão.
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import type * as Mdast from 'mdast'
import { imageSize } from 'image-size'
import { fromMarkdown } from 'mdast-util-from-markdown'
import { gfmFromMarkdown } from 'mdast-util-gfm'
import { gfm } from 'micromark-extension-gfm'
import type { Plugin, ViteDevServer } from 'vite'
import { parse as parseYaml } from 'yaml'
import { AUTHORS } from '../src/content/authors'
import type { MdBlock, MdInline, MdListItem, PostBody, PostImage, PostMeta, TocItem } from '../src/lib/blogTypes'

const ROOT = resolve(import.meta.dirname, '..')
const BLOG_DIR = join(ROOT, 'content', 'blog')
const PUBLIC_DIR = join(ROOT, 'public')

const INDEX_ID = 'virtual:blog-index'
const POST_PREFIX = 'virtual:blog-post/'
const RESOLVED = '\0'

/** Slugs que colidiriam com rotas do blog. */
const RESERVED_SLUGS = new Set(['pagina', 'tag', 'rss.xml'])
/** Ids de elementos do layout que um heading não pode reutilizar. */
const RESERVED_IDS = new Set(['root', 'main-content', 'mobile-menu', 'contato', 'sobre'])
const KNOWN_KEYS = new Set(['title', 'slug', 'description', 'date', 'updated', 'author', 'tags', 'cover', 'coverAlt', 'draft'])
const WORDS_PER_MINUTE = 200

export function slugify(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

class BlogError extends Error {}

function fail(file: string, message: string): never {
  throw new BlogError(`[blog] ${file}: ${message}`)
}

// --- Frontmatter ----------------------------------------------------------------

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/
const KEBAB = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

function isValidDate(value: string): boolean {
  return ISO_DATE.test(value) && !Number.isNaN(Date.parse(`${value}T00:00:00Z`))
}

function readImage(file: string, src: string, alt: string, field: string): PostImage {
  if (!src.startsWith('/')) fail(file, `${field} deve ser um caminho a partir de public/, começando com "/" (recebido "${src}").`)
  const path = join(PUBLIC_DIR, src)
  if (!path.startsWith(PUBLIC_DIR) || !existsSync(path)) fail(file, `${field}: arquivo não encontrado em public${src}.`)
  const { width, height } = imageSize(readFileSync(path))
  if (!width || !height) fail(file, `${field}: não foi possível ler as dimensões de ${src}.`)
  if (width > 1600) console.warn(`[blog] ${file}: ${src} tem ${width}px de largura (máx. recomendado 1600px).`)
  return { src, alt, width, height }
}

interface ParsedFrontmatter {
  meta: Omit<PostMeta, 'readingMinutes'>
  body: string
}

function parseFrontmatter(file: string, raw: string): ParsedFrontmatter {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!match) fail(file, 'frontmatter ausente (o arquivo deve começar com um bloco --- ... ---).')

  let data: Record<string, unknown>
  try {
    data = (parseYaml(match[1]) ?? {}) as Record<string, unknown>
  } catch (e) {
    fail(file, `frontmatter inválido: ${(e as Error).message}`)
  }

  for (const key of Object.keys(data)) {
    if (!KNOWN_KEYS.has(key)) console.warn(`[blog] ${file}: campo desconhecido "${key}" ignorado.`)
  }

  const str = (key: string, required: boolean): string | undefined => {
    const value = data[key]
    if (value === undefined || value === null || value === '') {
      if (required) fail(file, `campo obrigatório "${key}" ausente.`)
      return undefined
    }
    // YAML pode interpretar datas sem aspas como Date.
    if (value instanceof Date) return value.toISOString().slice(0, 10)
    if (typeof value !== 'string') fail(file, `"${key}" deve ser texto.`)
    return value.trim()
  }

  const title = str('title', true)!
  if (title.length > 70) console.warn(`[blog] ${file}: título com ${title.length} caracteres (recomendado ≤ 70).`)

  const slug = str('slug', true)!
  if (!KEBAB.test(slug)) fail(file, `slug "${slug}" deve estar em kebab-case, sem acentos.`)
  if (RESERVED_SLUGS.has(slug)) fail(file, `slug "${slug}" é reservado.`)
  if (`${slug}.md` !== file) fail(file, `o nome do arquivo deve ser "${slug}.md" (igual ao slug).`)

  const description = str('description', true)!
  if (description.length < 120 || description.length > 160) {
    fail(file, `description com ${description.length} caracteres (deve ter entre 120 e 160).`)
  }

  const date = str('date', true)!
  if (!isValidDate(date)) fail(file, `date "${date}" deve estar no formato AAAA-MM-DD.`)
  const updated = str('updated', false)
  if (updated !== undefined) {
    if (!isValidDate(updated)) fail(file, `updated "${updated}" deve estar no formato AAAA-MM-DD.`)
    if (updated < date) fail(file, 'updated não pode ser anterior a date.')
  }

  const authorRaw = str('author', true)!
  const author =
    authorRaw in AUTHORS ? authorRaw : Object.keys(AUTHORS).find((key) => AUTHORS[key].name === authorRaw)
  if (!author) {
    fail(file, `autor "${authorRaw}" não existe em src/content/authors.ts (use a chave ou o nome exato).`)
  }

  const tagsRaw = data.tags
  if (!Array.isArray(tagsRaw) || tagsRaw.length < 1 || tagsRaw.length > 4) fail(file, '"tags" deve ser uma lista com 1 a 4 itens.')
  const tags = tagsRaw.map((t) => {
    if (typeof t !== 'string' || !t.trim()) fail(file, 'cada tag deve ser um texto não vazio.')
    const tagSlug = slugify(t)
    if (!tagSlug) fail(file, `tag "${t}" inválida.`)
    return { slug: tagSlug, label: t.trim() }
  })

  const coverSrc = str('cover', false)
  const coverAlt = str('coverAlt', false)
  if (coverSrc && !coverAlt) fail(file, '"coverAlt" é obrigatório quando há "cover".')
  const cover = coverSrc ? readImage(file, coverSrc, coverAlt!, 'cover') : undefined

  if (data.draft !== undefined && typeof data.draft !== 'boolean') fail(file, '"draft" deve ser true ou false.')
  const draft = data.draft === true

  return { meta: { slug, title, description, date, updated, author, tags, cover, draft }, body: match[2] }
}

// --- Markdown → árvore segura -------------------------------------------------------

const SAFE_URL = /^(https?:\/\/|mailto:|\/(?!\/)|#)/i

class BodyConverter {
  private words = 0
  private usedIds = new Set<string>()
  readonly toc: TocItem[] = []

  constructor(private file: string) {}

  get readingMinutes() {
    return Math.max(1, Math.ceil(this.words / WORDS_PER_MINUTE))
  }

  private text(nodes: Mdast.PhrasingContent[]): string {
    return nodes
      .map((n) => ('value' in n ? n.value : 'children' in n ? this.text(n.children as Mdast.PhrasingContent[]) : ''))
      .join('')
  }

  private uniqueId(text: string): string {
    const base = slugify(text) || 'secao'
    let id = base
    for (let i = 2; this.usedIds.has(id) || RESERVED_IDS.has(id); i++) id = `${base}-${i}`
    this.usedIds.add(id)
    return id
  }

  private url(url: string, what: string): string {
    if (!SAFE_URL.test(url)) fail(this.file, `${what} com URL não permitida: "${url}" (use http(s), mailto, "/" ou "#").`)
    return url
  }

  private image(node: Mdast.Image): Extract<MdInline, { type: 'image' }> {
    if (!node.alt?.trim()) fail(this.file, `imagem ${node.url} sem texto alternativo (![descrição](...)).`)
    const url = this.url(node.url, 'imagem')
    const base = { type: 'image' as const, url, alt: node.alt.trim(), ...(node.title ? { title: node.title } : {}) }
    if (!url.startsWith('/')) return base
    const { width, height } = readImage(this.file, url, base.alt, 'imagem')
    return { ...base, width, height }
  }

  inline(nodes: Mdast.PhrasingContent[]): MdInline[] {
    return nodes.map((node): MdInline => {
      switch (node.type) {
        case 'text':
          this.words += node.value.split(/\s+/).filter(Boolean).length
          return { type: 'text', value: node.value }
        case 'emphasis':
        case 'strong':
        case 'delete':
          return { type: node.type, children: this.inline(node.children) }
        case 'inlineCode':
          return { type: 'inlineCode', value: node.value }
        case 'break':
          return { type: 'break' }
        case 'link':
          return {
            type: 'link',
            url: this.url(node.url, 'link'),
            ...(node.title ? { title: node.title } : {}),
            children: this.inline(node.children),
          }
        case 'image':
          return this.image(node)
        case 'html':
          return fail(this.file, `HTML bruto não é permitido no Markdown: ${node.value.slice(0, 60)}`)
        default:
          return fail(this.file, `elemento Markdown não suportado: "${node.type}".`)
      }
    })
  }

  blocks(nodes: Mdast.RootContent[]): MdBlock[] {
    return nodes.map((node): MdBlock => {
      switch (node.type) {
        case 'heading': {
          if (node.depth === 1) fail(this.file, 'não use "# Título" no corpo: o título do post vem do frontmatter. Comece em "##".')
          if (node.depth > 4) fail(this.file, `heading de nível ${node.depth} não suportado (use ## a ####).`)
          const text = this.text(node.children)
          const id = this.uniqueId(text)
          if (node.depth === 2) this.toc.push({ id, text })
          return { type: 'heading', depth: node.depth as 2 | 3 | 4, id, children: this.inline(node.children) }
        }
        case 'paragraph': {
          // Parágrafo só com uma imagem vira figura (com legenda = title da imagem).
          const [only] = node.children
          if (node.children.length === 1 && only.type === 'image') return { type: 'figure', image: this.image(only) }
          return { type: 'paragraph', children: this.inline(node.children) }
        }
        case 'blockquote':
          return { type: 'blockquote', children: this.blocks(node.children) }
        case 'list':
          return {
            type: 'list',
            ordered: Boolean(node.ordered),
            ...(node.ordered && node.start && node.start !== 1 ? { start: node.start } : {}),
            children: node.children.map(
              (item): MdListItem => ({
                ...(typeof item.checked === 'boolean' ? { checked: item.checked } : {}),
                children: this.blocks(item.children),
              }),
            ),
          }
        case 'code':
          return { type: 'code', ...(node.lang ? { lang: node.lang } : {}), value: node.value }
        case 'thematicBreak':
          return { type: 'thematicBreak' }
        case 'table':
          return {
            type: 'table',
            align: node.align ?? [],
            rows: node.children.map((row) => row.children.map((cell) => this.inline(cell.children))),
          }
        case 'html':
          return fail(this.file, `HTML bruto não é permitido no Markdown: ${node.value.slice(0, 60)}`)
        default:
          return fail(this.file, `elemento Markdown não suportado: "${node.type}".`)
      }
    })
  }
}

// --- Carregamento ------------------------------------------------------------------

interface LoadedPost {
  meta: PostMeta
  body: PostBody
}

function loadPosts(includeUnpublished: boolean): LoadedPost[] {
  if (!existsSync(BLOG_DIR)) return []
  const files = readdirSync(BLOG_DIR).filter((f) => f.endsWith('.md') && !f.startsWith('_'))
  const today = new Date().toISOString().slice(0, 10)
  const seen = new Set<string>()
  const posts: LoadedPost[] = []

  for (const file of files) {
    const raw = readFileSync(join(BLOG_DIR, file), 'utf8')
    const { meta, body } = parseFrontmatter(file, raw)
    if (seen.has(meta.slug)) fail(file, `slug "${meta.slug}" duplicado.`)
    seen.add(meta.slug)

    const tree = fromMarkdown(body, { extensions: [gfm()], mdastExtensions: [gfmFromMarkdown()] })
    const converter = new BodyConverter(file)
    const blocks = converter.blocks(tree.children)
    if (blocks.length === 0) fail(file, 'o post não tem conteúdo.')

    const published = !meta.draft && meta.date <= today
    if (!published && !includeUnpublished) continue
    posts.push({ meta: { ...meta, readingMinutes: converter.readingMinutes }, body: { blocks, toc: converter.toc } })
  }

  return posts.sort((a, b) => b.meta.date.localeCompare(a.meta.date) || a.meta.slug.localeCompare(b.meta.slug))
}

export function blogPlugin(): Plugin {
  let includeUnpublished = false
  let cache: LoadedPost[] | null = null
  const posts = () => (cache ??= loadPosts(includeUnpublished))

  const invalidate = (server: ViteDevServer) => {
    cache = null
    for (const mod of server.moduleGraph.idToModuleMap.values()) {
      if (mod.id?.startsWith(RESOLVED + 'virtual:blog')) server.moduleGraph.invalidateModule(mod)
    }
    server.ws.send({ type: 'full-reload' })
  }

  return {
    name: 'sociabilis-blog',
    configResolved(config) {
      includeUnpublished = config.command === 'serve'
    },
    buildStart() {
      cache = null
      if (existsSync(BLOG_DIR)) {
        for (const f of readdirSync(BLOG_DIR)) this.addWatchFile(join(BLOG_DIR, f))
      }
      posts() // valida cedo: um erro aqui interrompe o build
    },
    configureServer(server) {
      server.watcher.add(BLOG_DIR)
      const onChange = (path: string) => path.startsWith(BLOG_DIR) && invalidate(server)
      server.watcher.on('add', onChange)
      server.watcher.on('change', onChange)
      server.watcher.on('unlink', onChange)
    },
    resolveId(id) {
      if (id === INDEX_ID || id.startsWith(POST_PREFIX)) return RESOLVED + id
    },
    load(id) {
      if (!id.startsWith(RESOLVED)) return
      const virtualId = id.slice(RESOLVED.length)

      if (virtualId === INDEX_ID) {
        const list = posts()
        const loaders = list
          .map((p) => `  ${JSON.stringify(p.meta.slug)}: () => import(${JSON.stringify(POST_PREFIX + p.meta.slug)}),`)
          .join('\n')
        return [
          `export const posts = ${JSON.stringify(list.map((p) => p.meta))};`,
          `export const bodyLoaders = {\n${loaders}\n};`,
        ].join('\n')
      }

      if (virtualId.startsWith(POST_PREFIX)) {
        const slug = virtualId.slice(POST_PREFIX.length)
        const post = posts().find((p) => p.meta.slug === slug)
        if (!post) this.error(`[blog] post "${slug}" não encontrado.`)
        return `export default ${JSON.stringify(post.body)};`
      }
    },
  }
}

/**
 * Tipos do blog compartilhados entre o plugin de build (scripts/vite-plugin-blog.ts)
 * e o site. O Markdown é convertido no build para esta árvore (sem HTML bruto),
 * renderizada por componentes React em src/components/blog/Markdown.tsx.
 */

export interface PostTag {
  slug: string
  label: string
}

export interface PostImage {
  src: string
  alt: string
  width: number
  height: number
}

export interface TocItem {
  id: string
  text: string
}

export interface PostMeta {
  slug: string
  title: string
  description: string
  /** AAAA-MM-DD */
  date: string
  updated?: string
  /** Id do autor em src/content/authors.ts. */
  author: string
  tags: PostTag[]
  cover?: PostImage
  readingMinutes: number
  draft: boolean
}

// --- Árvore do corpo do post --------------------------------------------------

export type MdInline =
  | { type: 'text'; value: string }
  | { type: 'emphasis'; children: MdInline[] }
  | { type: 'strong'; children: MdInline[] }
  | { type: 'delete'; children: MdInline[] }
  | { type: 'inlineCode'; value: string }
  | { type: 'break' }
  | { type: 'link'; url: string; title?: string; children: MdInline[] }
  | { type: 'image'; url: string; alt: string; title?: string; width?: number; height?: number }

export type MdBlock =
  | { type: 'heading'; depth: 2 | 3 | 4; id: string; children: MdInline[] }
  | { type: 'paragraph'; children: MdInline[] }
  | { type: 'figure'; image: Extract<MdInline, { type: 'image' }> }
  | { type: 'blockquote'; children: MdBlock[] }
  | { type: 'list'; ordered: boolean; start?: number; children: MdListItem[] }
  | { type: 'code'; lang?: string; value: string }
  | { type: 'thematicBreak' }
  | { type: 'table'; align: ('left' | 'right' | 'center' | null)[]; rows: MdInline[][][] }

export interface MdListItem {
  checked?: boolean
  children: MdBlock[]
}

export interface PostBody {
  blocks: MdBlock[]
  toc: TocItem[]
}

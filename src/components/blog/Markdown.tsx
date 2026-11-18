import { Fragment, type ReactNode } from 'react'
import { Link } from 'react-router'
import type { MdBlock, MdInline } from '../../lib/blogTypes'

/**
 * Renderiza a árvore gerada no build a partir do Markdown. Não há HTML bruto:
 * cada nó vira um elemento React. Links externos abrem em nova aba com
 * rel="noopener noreferrer"; links internos usam o roteador.
 */

const isExternal = (url: string) => /^https?:\/\//i.test(url)

function Inline({ nodes }: { nodes: MdInline[] }) {
  return (
    <>
      {nodes.map((node, i) => {
        switch (node.type) {
          case 'text':
            return <Fragment key={i}>{node.value}</Fragment>
          case 'emphasis':
            return (
              <em key={i}>
                <Inline nodes={node.children} />
              </em>
            )
          case 'strong':
            return (
              <strong key={i} className="font-semibold text-ink">
                <Inline nodes={node.children} />
              </strong>
            )
          case 'delete':
            return (
              <del key={i}>
                <Inline nodes={node.children} />
              </del>
            )
          case 'inlineCode':
            return (
              <code key={i} className="rounded-sm bg-canvas-soft px-xs py-px font-mono text-[0.9em] text-ink">
                {node.value}
              </code>
            )
          case 'break':
            return <br key={i} />
          case 'link': {
            const className = 'font-medium text-primary underline underline-offset-4 hover:text-primary-hover'
            const children = <Inline nodes={node.children} />
            if (isExternal(node.url) || node.url.startsWith('mailto:')) {
              const external = isExternal(node.url)
              return (
                <a
                  key={i}
                  href={node.url}
                  title={node.title}
                  className={className}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  {children}
                  {external && <span className="sr-only"> (abre em nova aba)</span>}
                </a>
              )
            }
            return (
              <Link key={i} to={node.url} title={node.title} className={className}>
                {children}
              </Link>
            )
          }
          case 'image':
            return (
              <img
                key={i}
                src={node.url}
                alt={node.alt}
                title={node.title}
                width={node.width}
                height={node.height}
                loading="lazy"
                decoding="async"
                className="inline-block rounded-md"
              />
            )
        }
      })}
    </>
  )
}

const HEADING_CLASS = {
  2: 'mt-3xl text-[1.5rem] lg:text-[1.75rem] font-display font-semibold leading-tight tracking-[-0.01em]',
  3: 'mt-2xl text-[1.25rem] lg:text-[1.375rem] font-display font-semibold leading-snug',
  4: 'mt-xl text-body-lg font-semibold',
}

function Blocks({ blocks, tight = false }: { blocks: MdBlock[]; tight?: boolean }) {
  return (
    <>
      {blocks.map((block, i): ReactNode => {
        const spacing = tight ? '' : 'mt-xl'
        switch (block.type) {
          case 'heading': {
            const Tag = `h${block.depth}` as 'h2' | 'h3' | 'h4'
            return (
              <Tag key={i} id={block.id} className={`text-ink ${HEADING_CLASS[block.depth]}`}>
                <Inline nodes={block.children} />
              </Tag>
            )
          }
          case 'paragraph':
            return (
              <p key={i} className={spacing}>
                <Inline nodes={block.children} />
              </p>
            )
          case 'figure':
            return (
              <figure key={i} className="mt-2xl">
                <img
                  src={block.image.url}
                  alt={block.image.alt}
                  width={block.image.width}
                  height={block.image.height}
                  loading="lazy"
                  decoding="async"
                  className="w-full rounded-md"
                />
                {block.image.title && (
                  <figcaption className="mt-sm text-caption text-body-mid">{block.image.title}</figcaption>
                )}
              </figure>
            )
          case 'blockquote':
            return (
              <blockquote key={i} className={`${spacing} border-l-[3px] border-brand pl-xl text-ink`}>
                <Blocks blocks={block.children} />
              </blockquote>
            )
          case 'list': {
            const Tag = block.ordered ? 'ol' : 'ul'
            return (
              <Tag
                key={i}
                start={block.start}
                className={`${spacing} flex flex-col gap-sm pl-xl ${block.ordered ? 'list-decimal' : 'list-disc'} marker:text-brand`}
              >
                {block.children.map((item, j) => (
                  <li key={j} className={item.checked !== undefined ? 'list-none -ml-xl' : ''}>
                    {item.checked !== undefined && (
                      <input type="checkbox" checked={item.checked} disabled className="mr-sm accent-primary" aria-label={item.checked ? 'Concluído' : 'Pendente'} />
                    )}
                    <Blocks blocks={item.children} tight />
                  </li>
                ))}
              </Tag>
            )
          }
          case 'code':
            return (
              <pre key={i} className={`${spacing} overflow-x-auto rounded-md bg-canvas-soft p-lg text-[0.875rem] leading-relaxed`}>
                <code className="font-mono text-ink" data-lang={block.lang}>
                  {block.value}
                </code>
              </pre>
            )
          case 'thematicBreak':
            return <hr key={i} className="mt-2xl border-line" />
          case 'table': {
            const [head, ...rows] = block.rows
            const align = (c: number) => block.align[c] ?? undefined
            return (
              <div key={i} className={`${spacing} overflow-x-auto`}>
                <table className="w-full border-collapse text-body-sm">
                  <thead>
                    <tr>
                      {head.map((cell, c) => (
                        <th key={c} scope="col" style={{ textAlign: align(c) }} className="border-b-2 border-ink px-md py-sm font-semibold text-ink">
                          <Inline nodes={cell} />
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, r) => (
                      <tr key={r}>
                        {row.map((cell, c) => (
                          <td key={c} style={{ textAlign: align(c) }} className="border-b border-line px-md py-sm">
                            <Inline nodes={cell} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          }
        }
      })}
    </>
  )
}

export function Markdown({ blocks }: { blocks: MdBlock[] }) {
  return (
    <div className="text-prose text-body [&>*:first-child]:mt-0">
      <Blocks blocks={blocks} />
    </div>
  )
}

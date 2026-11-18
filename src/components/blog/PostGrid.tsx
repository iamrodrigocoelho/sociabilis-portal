import type { PostMeta } from '../../lib/blogTypes'
import { Card } from '../Card'
import { LinkArrow } from '../LinkArrow'
import { BLOG } from '../../content/blog'
import { useLocale } from '../../i18n/context'
import { PostCard } from './PostCard'

/** Grid 3-up de posts, com estado vazio amigável. */
export function PostGrid({ posts }: { posts: PostMeta[] }) {
  const BLOG_EMPTY = BLOG[useLocale()].empty
  if (posts.length === 0) {
    return (
      <Card variant="soft" size="lg" className="max-w-2xl">
        <h2 className="text-heading-sm">{BLOG_EMPTY.title}</h2>
        <p className="mt-sm text-body-md">{BLOG_EMPTY.text}</p>
        <LinkArrow to={BLOG_EMPTY.cta.to} className="mt-md">
          {BLOG_EMPTY.cta.label}
        </LinkArrow>
      </Card>
    )
  }
  return (
    <ul className="grid gap-3xl sm:grid-cols-2 sm:gap-x-xl lg:grid-cols-3">
      {posts.map((post, i) => (
        <li key={post.slug}>
          <PostCard post={post} index={i} />
        </li>
      ))}
    </ul>
  )
}

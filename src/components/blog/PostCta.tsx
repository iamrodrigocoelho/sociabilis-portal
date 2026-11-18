import { POST_CTA } from '../../content/blog'
import { Button } from '../Button'

/** Convite ao contato ao final do post. */
export function PostCta() {
  return (
    <aside aria-labelledby="post-cta-title" className="rounded-lg bg-canvas-soft p-2xl">
      <h2 id="post-cta-title" className="text-heading-sm">
        {POST_CTA.title}
      </h2>
      <p className="mt-sm text-body-md">{POST_CTA.text}</p>
      <Button to={POST_CTA.cta.to} className="mt-xl">
        {POST_CTA.cta.label}
      </Button>
    </aside>
  )
}

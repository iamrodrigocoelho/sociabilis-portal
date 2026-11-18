import { Check, Link2 } from 'lucide-react'
import { useState } from 'react'
import { BLOG } from '../../content/blog'
import { UI } from '../../content/ui'
import { useLocale } from '../../i18n/context'

const LINK =
  'inline-flex min-h-touch items-center gap-sm rounded-pill border border-line px-lg text-body-sm font-medium text-ink transition-colors duration-200 hover:border-ink'

/** Compartilhamento sem scripts de terceiros: links diretos + copiar link. */
export function ShareLinks({ url, title }: { url: string; title: string }) {
  const locale = useLocale()
  const L = BLOG[locale].labels
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2500)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div>
      <h2 className="text-eyebrow text-body-mid">{L.share}</h2>
      <ul className="mt-lg flex flex-wrap gap-sm">
        <li>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
            target="_blank"
            rel="noopener noreferrer"
            className={LINK}
          >
            {L.shareLinkedIn}
            <span className="sr-only"> {UI[locale].opensNewTab}</span>
          </a>
        </li>
        <li>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className={LINK}
          >
            {L.shareWhatsApp}
            <span className="sr-only"> {UI[locale].opensNewTab}</span>
          </a>
        </li>
        <li>
          <button type="button" onClick={copy} className={LINK}>
            {copied ? <Check size={16} strokeWidth={1.5} aria-hidden="true" /> : <Link2 size={16} strokeWidth={1.5} aria-hidden="true" />}
            {L.copyLink}
          </button>
        </li>
      </ul>
      <p aria-live="polite" className="mt-sm min-h-[1.25rem] text-caption text-primary">
        {copied ? L.copied : ''}
      </p>
    </div>
  )
}

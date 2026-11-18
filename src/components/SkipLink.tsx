import { UI } from '../content/ui'
import { useLocale } from '../i18n/context'

export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:left-lg focus:top-lg focus:z-[100] focus:rounded-md focus:bg-ink focus:px-xl focus:py-md focus:text-white"
    >
      {UI[useLocale()].skipToContent}
    </a>
  )
}

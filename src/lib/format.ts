import { LOCALE_META, type Locale } from '../i18n/locales'

/** Data ISO (AAAA-MM-DD) → "18 de novembro de 2026" / "November 18, 2026". Fuso fixo para o SSG e o cliente coincidirem. */
export function formatDate(iso: string, locale: Locale): string {
  return new Intl.DateTimeFormat(LOCALE_META[locale].dateLocale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${iso.slice(0, 10)}T00:00:00Z`))
}

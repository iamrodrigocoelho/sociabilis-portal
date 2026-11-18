import { createContext, useContext } from 'react'
import { DEFAULT_LOCALE, type Locale } from './locales'

/** Idioma da página atual, definido pelo Layout a partir da URL. */
export const LocaleContext = createContext<Locale>(DEFAULT_LOCALE)

export const useLocale = () => useContext(LocaleContext)

/** Escolhe o valor do idioma atual em um objeto { pt, en }. */
export function useT<T>(byLocale: Record<Locale, T>): T {
  return byLocale[useLocale()]
}

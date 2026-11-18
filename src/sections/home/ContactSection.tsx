import { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { ContactForm } from '../../components/ContactForm'
import { Section } from '../../components/Section'
import { SectionHeader } from '../../components/SectionHeader'
import { isContactInterest } from '../../content/contactForm'
import { HOME } from '../../content/home'
import { useLocale } from '../../i18n/context'
import { INTEREST_PARAM } from '../../i18n/locales'

/**
 * RF11: formulário de contato (âncora #contato). Lê `?interesse=` da URL
 * (links de contato abertos sem o modal, ex.: em nova aba) e pré-seleciona.
 */
export function ContactSection() {
  const locale = useLocale()
  const CONTACT_SECTION = HOME[locale].contactSection
  const { search } = useLocation()
  // Lido após a hidratação: o HTML pré-renderizado não tem query string.
  const [preset, setPreset] = useState<string | null>(null)
  useEffect(() => {
    const interest = new URLSearchParams(search).get(INTEREST_PARAM[locale])
    setPreset(isContactInterest(interest) ? interest : null)
  }, [search, locale])

  return (
    <Section id={CONTACT_SECTION.id} tone="soft" labelledBy="contact-title">
      <div className="grid gap-3xl lg:grid-cols-12">
        <SectionHeader
          id="contact-title"
          eyebrow={CONTACT_SECTION.eyebrow}
          title={CONTACT_SECTION.title}
          subtitle={CONTACT_SECTION.subtitle}
          className="min-w-0 lg:col-span-5"
        />
        <div className="min-w-0 lg:col-span-7">
          {/* key: remonta o formulário quando o interesse da URL muda. */}
          <ContactForm key={preset ?? 'none'} initialInterests={preset ? [preset] : []} />
        </div>
      </div>
    </Section>
  )
}

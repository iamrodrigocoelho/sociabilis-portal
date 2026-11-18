import { Button } from '../components/Button'
import { Section } from '../components/Section'
import { SectionHeader } from '../components/SectionHeader'
import { Seo } from '../components/Seo'
import { PRIVACY_POLICY, hasPrivacyPolicy } from '../content/legal'
import { PAGE_SEO, PRIVACY_PAGE } from '../content/pages'

export default function PrivacyPolicyPage() {
  const ready = hasPrivacyPolicy()
  const { externalUrl, sections, updatedAt } = PRIVACY_POLICY

  return (
    <>
      {/* Enquanto o texto não existe, a página não é indexada nem entra no sitemap. */}
      <Seo {...PAGE_SEO.privacy} noindex={!ready} />
      <Section spacing="hero" labelledBy="privacy-title">
        <SectionHeader as="h1" size="lg" id="privacy-title" eyebrow={PRIVACY_PAGE.eyebrow} title={PRIVACY_PAGE.title} />

        <div className="max-w-prose text-prose text-body">
          {updatedAt && <p className="text-caption text-body-mid">Atualizada em {updatedAt}</p>}

          {sections.map((section) => (
            <section key={section.heading} className="mt-2xl">
              <h2 className="text-display-md">{section.heading}</h2>
              {section.paragraphs.map((p) => (
                <p key={p} className="mt-lg">
                  {p}
                </p>
              ))}
            </section>
          ))}

          {sections.length === 0 && externalUrl && (
            <Button href={externalUrl} variant="secondary">
              {PRIVACY_PAGE.externalLabel}
            </Button>
          )}

          {!ready && <p>{PRIVACY_PAGE.pending}</p>}
        </div>
      </Section>
    </>
  )
}

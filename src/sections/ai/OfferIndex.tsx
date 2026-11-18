import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { Container } from '../../components/Container'
import { offerNumber, type Offer } from '../../content/offers'

interface OfferIndexProps {
  offers: Offer[]
  label: string
}

/**
 * RF21: chips com âncoras para as ofertas. Uma linha rolável; sticky abaixo do header no desktop;
 * o chip da oferta visível é destacado (IntersectionObserver).
 */
export function OfferIndex({ offers, label }: OfferIndexProps) {
  const [active, setActive] = useState<string | null>(null)
  const listRef = useRef<HTMLUListElement>(null)

  // Mantém o chip ativo visível na faixa rolável (sem mexer na rolagem vertical).
  useEffect(() => {
    const list = listRef.current
    const chip = active ? list?.querySelector<HTMLElement>(`[data-slug="${active}"]`) : null
    if (!list || !chip) return
    const left = chip.offsetLeft - list.offsetLeft
    if (left < list.scrollLeft || left + chip.offsetWidth > list.scrollLeft + list.clientWidth) {
      list.scrollTo({ left: Math.max(0, left - 24), behavior: 'smooth' })
    }
  }, [active])

  useEffect(() => {
    const blocks = offers
      .map((o) => document.getElementById(o.slug))
      .filter((el): el is HTMLElement => el !== null)
    if (blocks.length === 0) return

    const visible = new Set<string>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id)
          else visible.delete(entry.target.id)
        }
        // A primeira oferta (na ordem da página) dentro da faixa de leitura.
        setActive(offers.find((o) => visible.has(o.slug))?.slug ?? null)
      },
      // Faixa estreita logo abaixo do header + índice.
      { rootMargin: '-35% 0px -60% 0px' },
    )
    blocks.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [offers])

  return (
    <nav
      aria-label={label}
      className="border-y border-line bg-canvas/95 backdrop-blur-md lg:sticky lg:top-20 lg:z-30"
    >
      <Container>
        <ul ref={listRef} className="-mx-6 flex gap-sm overflow-x-auto px-6 py-md [scrollbar-width:thin] lg:-mx-8 lg:px-8">
          {offers.map((offer, i) => {
            const isActive = active === offer.slug
            return (
              <li key={offer.slug} data-slug={offer.slug} className="shrink-0">
                <Link
                  to={{ hash: offer.slug }}
                  aria-current={isActive ? 'true' : undefined}
                  className={`inline-flex min-h-touch items-center gap-sm rounded-pill border px-lg text-body-sm font-medium transition-colors duration-200 ${
                    isActive ? 'border-ink bg-ink text-white' : 'border-line bg-canvas text-ink hover:border-ink'
                  }`}
                >
                  <span className={`text-label-seq tabular-nums ${isActive ? 'text-accent' : 'text-primary'}`} aria-hidden="true">
                    {offerNumber(i)}
                  </span>
                  {offer.name}
                </Link>
              </li>
            )
          })}
        </ul>
      </Container>
    </nav>
  )
}

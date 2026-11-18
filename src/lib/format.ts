/** Data ISO (AAAA-MM-DD) → "18 de novembro de 2026". Fuso fixo para o SSG e o cliente coincidirem. */
export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(
    new Date(`${iso.slice(0, 10)}T00:00:00Z`),
  )
}

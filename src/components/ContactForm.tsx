import { CircleCheck } from 'lucide-react'
import { useEffect, useId, useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react'
import { Link } from 'react-router'
import { RECAPTCHA_SITE_KEY } from '../config/contact'
import { CONTACT_FORM, contactInterests, isContactInterest, type ContactErrorCode } from '../content/contactForm'
import { PATHS } from '../i18n/locales'
import { useLocale } from '../i18n/context'
import { Button } from './Button'

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void
      execute: (siteKey: string, opts: { action: string }) => Promise<string>
    }
  }
}

type Status = 'idle' | 'submitting' | 'success' | 'error'
type TextField = 'nome' | 'email' | 'empresa' | 'cargo' | 'mensagem'
type FieldName = TextField | 'interesses'

const EMPTY: Record<TextField, string> = { nome: '', email: '', empresa: '', cargo: '', mensagem: '' }
const REQUIRED: TextField[] = ['nome', 'email', 'empresa']
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const SCRIPT_ID = 'recaptcha-v3-script'
/** Ação enviada ao reCAPTCHA v3 e conferida no server.js. */
const RECAPTCHA_ACTION = 'contact'

/** Carrega o script do reCAPTCHA v3 uma única vez e resolve quando estiver pronto. */
let recaptchaReady: Promise<void> | null = null
function loadRecaptcha(siteKey: string, lang: string): Promise<void> {
  recaptchaReady ??= new Promise<void>((resolve, reject) => {
    const script = document.createElement('script')
    script.id = SCRIPT_ID
    // O idioma vale para a página inteira (o script é carregado uma vez).
    script.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(siteKey)}&hl=${lang}`
    script.async = true
    script.addEventListener('load', () => window.grecaptcha?.ready(() => resolve()), { once: true })
    script.addEventListener(
      'error',
      () => {
        recaptchaReady = null // permite tentar de novo
        reject(new Error('recaptcha'))
      },
      { once: true },
    )
    document.head.appendChild(script)
  })
  return recaptchaReady
}

/** Gera um token v3 para a ação "contact" (válido por 2 minutos: gerado no envio). */
async function getRecaptchaToken(siteKey: string, lang: string): Promise<string> {
  await loadRecaptcha(siteKey, lang)
  return window.grecaptcha!.execute(siteKey, { action: RECAPTCHA_ACTION })
}

/** Limites espelhados no server.js. */
export const CONTACT_LIMITS = { nome: 120, email: 200, empresa: 160, cargo: 120, mensagem: 5000 } as const

const INPUT =
  'w-full rounded-sm border border-line bg-canvas px-lg py-md text-body-md text-ink placeholder:text-body-mid transition-colors duration-200 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30 aria-[invalid=true]:border-error'

interface ContactFormProps {
  /** Interesses marcados ao abrir (ex.: CTA "Falar sobre RAG Starter"). */
  initialInterests?: string[]
  /** `section`: card com borda (home). `modal`: sem moldura, dentro do diálogo. */
  variant?: 'section' | 'modal'
  /** Ação extra exibida após o envio (ex.: botão "Fechar" no modal). */
  successAction?: ReactNode
}

/**
 * Formulário de contato (Resend + reCAPTCHA v3, invisível). O script do
 * reCAPTCHA só é carregado quando o formulário se aproxima da área visível ou
 * recebe foco; o token é gerado no envio e validado no server.js (pontuação e ação).
 */
export function ContactForm({ initialInterests = [], variant = 'section', successAction }: ContactFormProps) {
  const locale = useLocale()
  const COPY = CONTACT_FORM[locale]
  const INTERESTS = contactInterests(locale)
  const recaptchaLang = COPY.recaptchaLang
  const uid = useId()
  const [form, setForm] = useState(EMPTY)
  const [interests, setInterests] = useState<Set<string>>(() => new Set(initialInterests.filter(isContactInterest)))
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [invalid, setInvalid] = useState<Set<FieldName>>(new Set())
  const formRef = useRef<HTMLFormElement>(null)

  // Pré-carrega o reCAPTCHA v3 quando o formulário se aproxima da área visível
  // ou recebe foco, para o envio não esperar o download do script.
  useEffect(() => {
    const formEl = formRef.current
    if (!RECAPTCHA_SITE_KEY || !formEl) return
    const load = () => {
      cleanup()
      loadRecaptcha(RECAPTCHA_SITE_KEY!, recaptchaLang).catch(() => {})
    }
    const observer = new IntersectionObserver((entries) => entries.some((e) => e.isIntersecting) && load(), {
      rootMargin: '400px 0px',
    })
    function cleanup() {
      observer.disconnect()
      formEl!.removeEventListener('focusin', load)
    }
    observer.observe(formEl)
    formEl.addEventListener('focusin', load)
    return cleanup
  }, [recaptchaLang])

  const clearInvalid = (name: FieldName) => {
    if (!invalid.has(name)) return
    setInvalid((prev) => {
      const next = new Set(prev)
      next.delete(name)
      return next
    })
  }

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const name = e.target.name as TextField
    setForm((prev) => ({ ...prev, [name]: e.target.value }))
    clearInvalid(name)
  }

  function toggleInterest(slug: string, checked: boolean) {
    setInterests((prev) => {
      const next = new Set(prev)
      if (checked) next.add(slug)
      else next.delete(slug)
      return next
    })
    clearInvalid('interesses')
  }

  function fail(message: string, fields: FieldName[] = []) {
    setErrorMsg(message)
    setStatus('error')
    setInvalid(new Set(fields))
    const first = fields[0]
    if (!first) return
    const selector = first === 'interesses' ? 'input[name="interesses"]' : `[name="${first}"]`
    formRef.current?.querySelector<HTMLElement>(selector)?.focus()
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setErrorMsg('')

    const missing: FieldName[] = REQUIRED.filter((f) => !form[f].trim())
    if (interests.size === 0) missing.push('interesses')
    if (missing.length) {
      return fail(missing.length === 1 && missing[0] === 'interesses' ? COPY.errors.interests : COPY.errors.required, missing)
    }
    if (!EMAIL_RE.test(form.email.trim())) return fail(COPY.errors.email, ['email'])

    setStatus('submitting')
    setInvalid(new Set())

    let captchaToken = ''
    if (RECAPTCHA_SITE_KEY) {
      try {
        captchaToken = await getRecaptchaToken(RECAPTCHA_SITE_KEY, recaptchaLang)
      } catch {
        return fail(COPY.errors.captcha)
      }
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          // Mantém a ordem das opções no formulário.
          interesses: INTERESTS.map((i) => i.slug).filter((slug) => interests.has(slug)),
          idioma: locale,
          'g-recaptcha-response': captchaToken,
        }),
      })
      if (res.ok) {
        setStatus('success')
        setForm(EMPTY)
        setInterests(new Set())
        return
      }
      // O servidor devolve um código; a mensagem é exibida no idioma da página (RF44).
      const data = (await res.json().catch(() => ({}))) as { error?: ContactErrorCode }
      fail((data.error && COPY.errors[data.error]) || COPY.errors.generic)
    } catch {
      fail(COPY.errors.network)
    }
  }

  const frame = variant === 'section' ? 'rounded-lg border border-line bg-canvas p-xl sm:p-2xl' : ''

  if (status === 'success') {
    return (
      <div role="status" className={`${frame} py-2xl text-center`}>
        <CircleCheck size={40} strokeWidth={1.5} className="mx-auto text-brand" aria-hidden="true" />
        <p className="mt-lg text-heading-sm text-ink">{COPY.success.title}</p>
        <p className="mt-sm text-body-md">{COPY.success.text}</p>
        {successAction && <div className="mt-xl">{successAction}</div>}
      </div>
    )
  }

  const id = (name: string) => `${uid}-${name}`
  const errorId = id('error')
  const describedBy = (name: FieldName) => (invalid.has(name) ? errorId : undefined)

  const textField = (name: Exclude<TextField, 'mensagem'>, required: boolean, wide = false) => {
    const field = COPY.fields[name]
    return (
      <div key={name} className={wide ? 'sm:col-span-2' : ''}>
        <label htmlFor={id(name)} className="mb-sm block text-body-sm font-semibold text-ink">
          {field.label}{' '}
          {required ? <span aria-hidden="true">*</span> : <span className="font-normal text-body-mid">{COPY.optional}</span>}
        </label>
        <input
          id={id(name)}
          name={name}
          type={name === 'email' ? 'email' : 'text'}
          required={required}
          maxLength={CONTACT_LIMITS[name]}
          autoComplete={field.autoComplete}
          placeholder={field.placeholder}
          value={form[name]}
          onChange={handleChange}
          aria-invalid={invalid.has(name) || undefined}
          aria-describedby={describedBy(name)}
          className={INPUT}
        />
      </div>
    )
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate aria-describedby={id('hint')} className={frame}>
      <p id={id('hint')} className="text-caption text-body-mid">
        {COPY.requiredHint}
      </p>

      <div className="mt-xl grid gap-xl sm:grid-cols-2">
        {textField('nome', true)}
        {textField('email', true)}
        {textField('empresa', true)}
        {textField('cargo', false)}

        <fieldset
          className="sm:col-span-2"
          aria-describedby={[id('interests-hint'), describedBy('interesses')].filter(Boolean).join(' ')}
        >
          <legend className="text-body-sm font-semibold text-ink">
            {COPY.interests.legend} <span aria-hidden="true">*</span>
          </legend>
          <p id={id('interests-hint')} className="mt-xs text-caption text-body-mid">
            {COPY.interests.hint}
          </p>
          <div
            className={`mt-md grid gap-sm rounded-md sm:grid-cols-2 ${invalid.has('interesses') ? 'ring-2 ring-error/40 ring-offset-4' : ''}`}
          >
            {INTERESTS.map((interest) => (
              <label
                key={interest.slug}
                className="flex min-h-touch cursor-pointer items-center gap-md rounded-sm border border-line px-md py-sm text-body-sm text-ink transition-colors duration-200 hover:border-ink has-[:checked]:border-primary has-[:checked]:bg-canvas-soft"
              >
                <input
                  type="checkbox"
                  name="interesses"
                  value={interest.slug}
                  checked={interests.has(interest.slug)}
                  onChange={(e) => toggleInterest(interest.slug, e.target.checked)}
                  className="h-4 w-4 shrink-0 accent-primary"
                />
                {interest.label}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="sm:col-span-2">
          <label htmlFor={id('mensagem')} className="mb-sm block text-body-sm font-semibold text-ink">
            {COPY.fields.mensagem.label} <span className="font-normal text-body-mid">{COPY.optional}</span>
          </label>
          <textarea
            id={id('mensagem')}
            name="mensagem"
            rows={4}
            maxLength={CONTACT_LIMITS.mensagem}
            placeholder={COPY.fields.mensagem.placeholder}
            value={form.mensagem}
            onChange={handleChange}
            className={`${INPUT} resize-y`}
          />
        </div>
      </div>


      <p className="mt-xl text-caption text-body-mid">
        {COPY.privacy.before}
        <Link to={PATHS.privacy[locale]} className="text-primary underline underline-offset-2">
          {COPY.privacy.linkLabel}
        </Link>
        {COPY.privacy.after}
        <a href={COPY.privacy.googlePrivacy.href} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
          {COPY.privacy.googlePrivacy.label}
        </a>
        {COPY.privacy.and}
        <a href={COPY.privacy.googleTerms.href} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
          {COPY.privacy.googleTerms.label}
        </a>
        {COPY.privacy.end}
      </p>

      <div aria-live="assertive">
        {status === 'error' && errorMsg && (
          <p id={errorId} className="mt-lg rounded-sm border border-error/30 bg-error/5 px-md py-sm text-body-sm text-error">
            {errorMsg}
          </p>
        )}
      </div>

      <Button type="submit" disabled={status === 'submitting'} className="mt-xl w-full sm:w-auto">
        {status === 'submitting' ? COPY.submitting : COPY.submit}
      </Button>
    </form>
  )
}

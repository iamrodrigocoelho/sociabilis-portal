import { useEffect, useRef, useState } from 'react'
import { SectionHeader } from '../components/SectionHeader'
import { RECAPTCHA_SITE_KEY } from '../config/contact'

declare global {
  interface Window {
    grecaptcha: {
      ready: (cb: () => void) => void
      render: (el: HTMLElement, opts: { sitekey: string; theme?: string }) => number
      getResponse: (id?: number) => string
      reset: (id?: number) => void
    }
  }
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

interface FormFields {
  nome: string
  email: string
  empresa: string
  mensagem: string
}

const INPUT_CLASS =
  'w-full bg-canvas text-ink border border-ink/30 rounded-md px-4 py-3 text-base placeholder:text-body-mid focus:outline-none focus:border-ink focus:ring-1 focus:ring-ink transition-colors'

export function ContactSection() {
  const [form, setForm] = useState<FormFields>({ nome: '', email: '', empresa: '', mensagem: '' })
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const captchaRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<number | null>(null)

  useEffect(() => {
    if (!RECAPTCHA_SITE_KEY) return

    function renderWidget() {
      if (!captchaRef.current || widgetIdRef.current !== null) return
      window.grecaptcha.ready(() => {
        if (!captchaRef.current || widgetIdRef.current !== null) return
        widgetIdRef.current = window.grecaptcha.render(captchaRef.current, {
          sitekey: RECAPTCHA_SITE_KEY as string,
        })
      })
    }

    const SCRIPT_ID = 'recaptcha-v2-script'
    if (!document.getElementById(SCRIPT_ID)) {
      const script = document.createElement('script')
      script.id = SCRIPT_ID
      script.src = 'https://www.google.com/recaptcha/api.js?render=explicit&hl=pt-BR'
      script.async = true
      script.defer = true
      script.onload = renderWidget
      document.head.appendChild(script)
    } else {
      renderWidget()
    }
  }, [])

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErrorMsg('')

    const captchaToken = RECAPTCHA_SITE_KEY
      ? window.grecaptcha?.getResponse(widgetIdRef.current ?? undefined)
      : ''

    if (RECAPTCHA_SITE_KEY && !captchaToken) {
      setErrorMsg('Por favor, confirme que você não é um robô.')
      setStatus('error')
      return
    }

    setStatus('submitting')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, 'g-recaptcha-response': captchaToken }),
      })

      if (res.ok) {
        setStatus('success')
        setForm({ nome: '', email: '', empresa: '', mensagem: '' })
      } else {
        const data = await res.json().catch(() => ({}))
        setErrorMsg((data as { error?: string })?.error ?? 'Ocorreu um erro. Tente novamente.')
        setStatus('error')
        window.grecaptcha?.reset(widgetIdRef.current ?? undefined)
      }
    } catch {
      setErrorMsg('Erro de conexão. Verifique sua internet e tente novamente.')
      setStatus('error')
      window.grecaptcha?.reset(widgetIdRef.current ?? undefined)
    }
  }

  return (
    <section id="contato" className="bg-canvas-soft" aria-labelledby="contact-heading">
      <div className="container-base py-16 md:py-24">
        <SectionHeader
          eyebrow="Contato"
          title="Fale com a Sociabilis AI Labs"
          subtitle="Preencha o formulário e nossa equipe entrará em contato para entender como podemos ajudar sua organização a implantar IA com governança e sustentabilidade."
          id="contact-heading"
        />

        <div className="max-w-xl mx-auto">
          {status === 'success' ? (
            <div className="bg-canvas rounded-xl border border-ink/10 p-8 text-center">
              <div
                className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4"
                aria-hidden="true"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 13l4 4L19 7"
                    stroke="#ff4f00"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-ink mb-2">Mensagem enviada!</h3>
              <p className="text-body">Obrigado pelo contato. Retornaremos em breve.</p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              className="bg-canvas rounded-xl border border-ink/10 p-6 md:p-8"
            >
              <div className="space-y-5">
                <div>
                  <label htmlFor="nome" className="block text-sm font-semibold text-ink mb-1.5">
                    Nome{' '}
                    <span aria-hidden="true" className="text-primary">
                      *
                    </span>
                  </label>
                  <input
                    id="nome"
                    name="nome"
                    type="text"
                    required
                    autoComplete="name"
                    value={form.nome}
                    onChange={handleChange}
                    placeholder="Seu nome completo"
                    className={INPUT_CLASS}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-ink mb-1.5">
                    E-mail{' '}
                    <span aria-hidden="true" className="text-primary">
                      *
                    </span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="seu@email.com"
                    className={INPUT_CLASS}
                  />
                </div>

                <div>
                  <label
                    htmlFor="empresa"
                    className="block text-sm font-semibold text-ink mb-1.5"
                  >
                    Empresa
                  </label>
                  <input
                    id="empresa"
                    name="empresa"
                    type="text"
                    autoComplete="organization"
                    value={form.empresa}
                    onChange={handleChange}
                    placeholder="Nome da sua empresa"
                    className={INPUT_CLASS}
                  />
                </div>

                <div>
                  <label
                    htmlFor="mensagem"
                    className="block text-sm font-semibold text-ink mb-1.5"
                  >
                    Mensagem{' '}
                    <span aria-hidden="true" className="text-primary">
                      *
                    </span>
                  </label>
                  <textarea
                    id="mensagem"
                    name="mensagem"
                    required
                    rows={5}
                    value={form.mensagem}
                    onChange={handleChange}
                    placeholder="Como podemos ajudar sua organização?"
                    className={`${INPUT_CLASS} resize-y`}
                  />
                </div>
              </div>

              <div className="mt-6">
                {RECAPTCHA_SITE_KEY ? (
                  <div ref={captchaRef} />
                ) : (
                  <p className="text-xs text-body-mid bg-canvas-soft border border-mute rounded-md px-3 py-2">
                    Configure{' '}
                    <code className="font-mono">RECAPTCHA_SITE_KEY</code> em{' '}
                    <code className="font-mono">src/config/contact.ts</code> para ativar o
                    reCAPTCHA.
                  </p>
                )}
              </div>

              <p className="mt-4 text-xs text-body-mid leading-relaxed">
                Seus dados serão utilizados exclusivamente para responder a este contato. Este site
                é protegido pelo reCAPTCHA do Google e sujeito às suas{' '}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-ink"
                >
                  Política de Privacidade
                </a>{' '}
                e{' '}
                <a
                  href="https://policies.google.com/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-ink"
                >
                  Termos de Serviço
                </a>
                .
              </p>

              {status === 'error' && errorMsg && (
                <p
                  role="alert"
                  className="mt-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-md px-3 py-2"
                >
                  {errorMsg}
                </p>
              )}

              <div className="mt-6">
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full bg-primary text-canvas px-6 py-3 rounded-xl text-[18px] font-semibold leading-[27px] transition-opacity duration-150 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'submitting' ? 'Enviando…' : 'Enviar mensagem'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

import express from 'express'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { readFileSync } from 'fs'
import { Resend } from 'resend'
import 'dotenv/config'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DIST = join(__dirname, 'dist')
const app = express()
app.disable('x-powered-by')

// Atrás de proxy reverso (ex.: Hostinger), o IP real do visitante vem em X-Forwarded-For.
// TRUST_PROXY aceita os valores do Express ("loopback", "1", "true"...). Padrão: loopback.
const trustProxy = process.env.TRUST_PROXY ?? 'loopback'
app.set('trust proxy', /^\d+$/.test(trustProxy) ? Number(trustProxy) : trustProxy === 'true' ? true : trustProxy)

// --- Cabeçalhos de segurança (RNF05) ----------------------------------------

const CSP = [
  "default-src 'self'",
  // reCAPTCHA v2: https://developers.google.com/recaptcha/docs/faq#im-using-content-security-policy-csp-on-my-website.-how-can-i-configure-it-to-work-with-recaptcha
  "script-src 'self' https://www.google.com/recaptcha/ https://www.gstatic.com/recaptcha/",
  "frame-src https://www.google.com/recaptcha/ https://recaptcha.google.com/recaptcha/",
  "connect-src 'self'",
  "img-src 'self' data:",
  // 'unsafe-inline' só para estilos: atributos style do HTML pré-renderizado (ex.: alinhamento de tabelas).
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join('; ')

app.use((_req, res, next) => {
  res.setHeader('Content-Security-Policy', CSP)
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin')
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=(), usb=()')
  res.setHeader('X-Frame-Options', 'DENY')
  next()
})

// --- API de contato ------------------------------------------------------------

// Instanciado só com chave configurada (o SDK lança erro sem ela).
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

// Lista branca de interesses, gerada no build a partir de src/content/offers.ts.
let INTERESTS = new Map()
try {
  const list = JSON.parse(readFileSync(join(DIST, '.contact-interests.json'), 'utf8'))
  INTERESTS = new Map(list.map((i) => [i.slug, i.label]))
} catch {
  console.warn('dist/.contact-interests.json não encontrado. Rode `npm run build` antes de iniciar o servidor.')
}

/** Limites espelhados em src/components/ContactForm.tsx (CONTACT_LIMITS). */
const LIMITS = { nome: 120, email: 200, empresa: 160, cargo: 120, mensagem: 5000 }
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** Rate limit simples em memória: RATE_MAX envios por IP a cada RATE_WINDOW_MS. */
const RATE_WINDOW_MS = 10 * 60 * 1000
const RATE_MAX = 5
const hits = new Map()
setInterval(() => {
  const now = Date.now()
  for (const [ip, times] of hits) {
    const recent = times.filter((t) => now - t < RATE_WINDOW_MS)
    if (recent.length) hits.set(ip, recent)
    else hits.delete(ip)
  }
}, RATE_WINDOW_MS).unref()

function rateLimit(req, res, next) {
  const now = Date.now()
  const ip = req.ip ?? 'unknown'
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS)
  if (recent.length >= RATE_MAX) {
    const retryAfter = Math.ceil((RATE_WINDOW_MS - (now - recent[0])) / 1000)
    res.setHeader('Retry-After', String(retryAfter))
    return res.status(429).json({ error: 'Muitas tentativas em pouco tempo. Tente novamente em alguns minutos.' })
  }
  recent.push(now)
  hits.set(ip, recent)
  next()
}

async function verifyCaptcha(token) {
  const secret = process.env.RECAPTCHA_SECRET_KEY
  if (!secret) return true // verificação desativada (ver .env.example)
  if (typeof token !== 'string' || !token) return false
  const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `secret=${encodeURIComponent(secret)}&response=${encodeURIComponent(token)}`,
  })
  const data = await res.json()
  return data.success === true
}

/** Texto de uma linha: sem quebras (evita injeção no assunto do e-mail). */
const oneLine = (s) => s.replace(/[\r\n]+/g, ' ').trim()

/** Valida o corpo da requisição. Retorna { data } ou { error }. */
function validateContact(body) {
  const b = body && typeof body === 'object' ? body : {}
  const text = (key, { required }) => {
    const value = b[key]
    if (value === undefined || value === null || value === '') {
      return required ? { error: 'Campos obrigatórios faltando.' } : { value: '' }
    }
    if (typeof value !== 'string') return { error: 'Dados inválidos.' }
    const trimmed = value.trim()
    if (required && !trimmed) return { error: 'Campos obrigatórios faltando.' }
    if (trimmed.length > LIMITS[key]) return { error: 'Um dos campos excede o tamanho permitido.' }
    return { value: trimmed }
  }

  const fields = {
    nome: text('nome', { required: true }),
    email: text('email', { required: true }),
    empresa: text('empresa', { required: true }),
    cargo: text('cargo', { required: false }),
    mensagem: text('mensagem', { required: false }),
  }
  for (const f of Object.values(fields)) if (f.error) return { error: f.error }
  if (!EMAIL_RE.test(fields.email.value)) return { error: 'E-mail inválido.' }

  const raw = b.interesses
  if (!Array.isArray(raw) || raw.length === 0) return { error: 'Selecione ao menos um interesse.' }
  if (raw.length > INTERESTS.size || raw.some((i) => typeof i !== 'string' || !INTERESTS.has(i))) {
    return { error: 'Interesse inválido.' }
  }
  const interesses = [...new Set(raw)]

  return {
    data: {
      nome: oneLine(fields.nome.value),
      email: oneLine(fields.email.value),
      empresa: oneLine(fields.empresa.value),
      cargo: oneLine(fields.cargo.value),
      mensagem: fields.mensagem.value,
      interesses,
    },
  }
}

app.post('/api/contact', express.json({ limit: '20kb' }), rateLimit, async (req, res) => {
  if (INTERESTS.size === 0) {
    return res.status(503).json({ error: 'Formulário temporariamente indisponível.' })
  }

  const { data, error } = validateContact(req.body)
  if (error) return res.status(400).json({ error })

  const captchaOk = await verifyCaptcha(req.body['g-recaptcha-response']).catch(() => false)
  if (!captchaOk) {
    return res.status(400).json({ error: 'Verificação de segurança falhou. Tente novamente.' })
  }

  if (!resend || !process.env.CONTACT_EMAIL) {
    console.warn('RESEND_API_KEY ou CONTACT_EMAIL não configurados.')
    return res.status(503).json({ error: 'Serviço de e-mail não configurado.' })
  }

  const interestLabels = data.interesses.map((slug) => INTERESTS.get(slug))

  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM ?? 'Sociabilis AI Labs <contato@sociabilis.com.br>',
      to: [process.env.CONTACT_EMAIL],
      replyTo: data.email,
      subject: `Novo contato via site: ${data.nome} (${data.empresa})`,
      text: [
        `Nome: ${data.nome}`,
        `E-mail: ${data.email}`,
        `Empresa: ${data.empresa}`,
        `Cargo: ${data.cargo || 'Não informado'}`,
        '',
        'Interesses:',
        ...interestLabels.map((label) => `- ${label}`),
        '',
        'Mensagem:',
        data.mensagem || '(sem mensagem)',
      ].join('\n'),
    })

    return res.json({ ok: true })
  } catch (err) {
    console.error('Resend error:', err)
    return res.status(500).json({ error: 'Erro ao enviar e-mail. Tente novamente mais tarde.' })
  }
})

// JSON malformado ou corpo grande demais na API: resposta JSON, não a página 404/500.
app.use('/api', (err, _req, res, next) => {
  if (err?.type === 'entity.parse.failed') return res.status(400).json({ error: 'Dados inválidos.' })
  if (err?.type === 'entity.too.large') return res.status(413).json({ error: 'Mensagem muito grande.' })
  return next(err)
})

// --- Site estático pré-renderizado (após `npm run build`) -----------------

// Mapa rota → HTML gerado por scripts/prerender.js.
let routeMap = new Map()
try {
  routeMap = new Map(Object.entries(JSON.parse(readFileSync(join(DIST, '.routes.json'), 'utf8'))))
} catch {
  console.warn('dist/.routes.json não encontrado. Rode `npm run build` antes de `npm start`.')
}

// Assets com hash no nome: cache longo e imutável.
app.use(
  '/assets',
  express.static(join(DIST, 'assets'), { immutable: true, maxAge: '1y', index: false, redirect: false }),
)

// Demais arquivos públicos (imagens, sitemap, robots). HTML é servido abaixo.
app.use(
  express.static(DIST, {
    index: false,
    redirect: false,
    maxAge: '1d',
    setHeaders(res, filePath) {
      if (filePath.endsWith('.html')) res.setHeader('Cache-Control', 'no-cache')
    },
  }),
)

// Páginas: HTML pré-renderizado por rota; 404 com a página 404.
app.use((req, res, next) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') return next()

  // Normaliza barra final (/blog/ → /blog) com redirect permanente.
  // Barras iniciais repetidas são colapsadas para evitar redirect aberto (//dominio).
  if (req.path.length > 1 && req.path.endsWith('/')) {
    const clean = '/' + req.path.replace(/^\/+|\/+$/g, '')
    const q = req.originalUrl.indexOf('?')
    return res.redirect(301, clean + (q === -1 ? '' : req.originalUrl.slice(q)))
  }

  res.setHeader('Cache-Control', 'no-cache')
  const file = routeMap.get(req.path)
  if (file) return res.sendFile(join(DIST, file))
  return res.status(404).sendFile(join(DIST, '404.html'))
})

const PORT = process.env.PORT ?? 3001
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})

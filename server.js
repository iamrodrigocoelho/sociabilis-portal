import express from 'express'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { Resend } from 'resend'
import 'dotenv/config'

const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express()

app.use(express.json())

const resend = new Resend(process.env.RESEND_API_KEY)

async function verifyCaptcha(token) {
  const secret = process.env.RECAPTCHA_SECRET_KEY
  if (!secret || !token) return true
  const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `secret=${encodeURIComponent(secret)}&response=${encodeURIComponent(token)}`,
  })
  const data = await res.json()
  return data.success === true
}

app.post('/api/contact', async (req, res) => {
  const { nome, email, empresa, mensagem, 'g-recaptcha-response': captchaToken } = req.body ?? {}

  if (!nome?.trim() || !email?.trim() || !mensagem?.trim()) {
    return res.status(400).json({ error: 'Campos obrigatórios faltando.' })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'E-mail inválido.' })
  }

  const captchaOk = await verifyCaptcha(captchaToken).catch(() => false)
  if (!captchaOk) {
    return res.status(400).json({ error: 'Verificação de segurança falhou. Tente novamente.' })
  }

  if (!process.env.RESEND_API_KEY || !process.env.CONTACT_EMAIL) {
    console.warn('RESEND_API_KEY ou CONTACT_EMAIL não configurados.')
    return res.status(503).json({ error: 'Serviço de e-mail não configurado.' })
  }

  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM ?? 'Sociabilis AI Labs <contato@sociabilis.com.br>',
      to: [process.env.CONTACT_EMAIL],
      replyTo: email.trim(),
      subject: `Novo contato via site: ${nome.trim()}`,
      text: [
        `Nome: ${nome.trim()}`,
        `E-mail: ${email.trim()}`,
        `Empresa: ${empresa?.trim() || 'Não informada'}`,
        '',
        'Mensagem:',
        mensagem.trim(),
      ].join('\n'),
    })

    return res.json({ ok: true })
  } catch (err) {
    console.error('Resend error:', err)
    return res.status(500).json({ error: 'Erro ao enviar e-mail. Tente novamente mais tarde.' })
  }
})

// Static files (production — after `npm run build`)
app.use(express.static(join(__dirname, 'dist')))

// SPA fallback
app.use((_, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'))
})

const PORT = process.env.PORT ?? 3001
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})

import nodemailer from 'nodemailer'

export type LeadEmailPayload = {
  name: string
  email: string
  phone: string
  consent: true
  city?: string | null
  [key: string]: unknown
}

let cachedTransporter: nodemailer.Transporter | null = null

function ensureEnv(key: string): string {
  const value = process.env[key]
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`)
  }
  return value
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function formatValue(value: unknown): string {
  if (value === null || value === undefined) {
    return '—'
  }

  if (typeof value === 'string') {
    return value.trim() === '' ? '—' : value
  }

  if (typeof value === 'boolean') {
    return value ? 'Si' : 'No'
  }

  if (value instanceof Date) {
    return value.toISOString()
  }

  if (Array.isArray(value)) {
    return value.length ? value.map((item) => formatValue(item)).join(', ') : '—'
  }

  if (typeof value === 'object') {
    try {
      return JSON.stringify(value)
    } catch (error) {
      console.error('Error stringifying value', error)
      return String(value)
    }
  }

  return String(value)
}

export function getTransporter(): nodemailer.Transporter {
  if (cachedTransporter) {
    return cachedTransporter
  }

  const host = ensureEnv('SMTP_HOST')
  const portValue = ensureEnv('SMTP_PORT')
  const user = ensureEnv('SMTP_USER')
  const pass = ensureEnv('SMTP_PASS')

  const port = Number(portValue)
  if (Number.isNaN(port)) {
    throw new Error('SMTP_PORT must be a valid number')
  }

  cachedTransporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass }
  })

  return cachedTransporter
}

function buildHtmlTable(data: Record<string, unknown>): string {
  const rows = Object.entries(data)
    .map(([key, value]) => {
      const safeKey = escapeHtml(key)
      const safeValue = escapeHtml(formatValue(value))
      return `<tr><th style="text-align:left;padding:8px;border:1px solid #e5e7eb;background-color:#f9fafb;">${safeKey}</th><td style="padding:8px;border:1px solid #e5e7eb;">${safeValue}</td></tr>`
    })
    .join('')

  return `<!doctype html><html><body style="font-family:Inter,system-ui,sans-serif;background-color:#f3f4f6;padding:24px;">` +
    `<table style="max-width:640px;width:100%;border-collapse:collapse;background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 10px 25px rgba(15,23,42,0.08);">${rows}</table>` +
    '</body></html>'
}

function buildTextSummary(data: Record<string, unknown>): string {
  return Object.entries(data)
    .map(([key, value]) => `${key}: ${formatValue(value)}`)
    .join('\n')
}

export async function sendLeadEmail(data: LeadEmailPayload) {
  const transporter = getTransporter()
  const from = ensureEnv('SMTP_FROM')
  const to = ensureEnv('LEAD_TO')

  const subject = `[SG Lead] ${data.name}  ${typeof data.city === 'string' && data.city.trim() ? data.city : 'sin ciudad'}`
  const payload: Record<string, unknown> = { ...data }

  const html = buildHtmlTable(payload)
  const text = buildTextSummary(payload)

  await transporter.sendMail({
    from,
    to,
    subject,
    html,
    text
  })
}

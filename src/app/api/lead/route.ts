import { NextResponse } from 'next/server'
import { z } from 'zod'

import { sendLeadEmail, type LeadEmailPayload } from '@/lib/email'

const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000
const RATE_LIMIT_MAX_REQUESTS = 3

const rateLimitStore = new Map<string, { count: number; expiresAt: number }>()

const leadSchema = z
  .object({
    name: z.string().trim().min(1, 'El nombre es obligatorio'),
    email: z.string().trim().email('Correo invalido'),
    phone: z.string().trim().min(6, 'El telefono es obligatorio'),
    company: z.string().trim().optional().transform((value) => (value === '' ? undefined : value)),
    city: z.string().trim().optional().transform((value) => (value === '' ? undefined : value)),
    message: z.string().trim().optional().transform((value) => (value === '' ? undefined : value)),
    type: z.string().trim().optional().transform((value) => (value === '' ? undefined : value)),
    family: z.string().trim().optional().transform((value) => (value === '' ? undefined : value)),
    areaM2: z
      .union([z.number(), z.string().trim()])
      .optional()
      .transform((value) => {
        if (value === undefined || value === null || value === '') {
          return undefined
        }
        const numeric = typeof value === 'number' ? value : Number(value)
        return Number.isNaN(numeric) ? value : numeric
      }),
    budgetPerM2: z.string().trim().optional().transform((value) => (value === '' ? undefined : value)),
    deadline: z.string().trim().optional().transform((value) => (value === '' ? undefined : value)),
    comments: z.string().trim().optional().transform((value) => (value === '' ? undefined : value)),
    consent: z.literal(true)
  })
  .passthrough()

function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get('x-forwarded-for')
  if (forwardedFor) {
    const [clientIp] = forwardedFor.split(',')
    if (clientIp?.trim()) {
      return clientIp.trim()
    }
  }

  const requestIp = (request as { ip?: string }).ip
  if (typeof requestIp === 'string' && requestIp) {
    return requestIp
  }

  return 'unknown'
}

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const record = rateLimitStore.get(ip)

  if (!record || record.expiresAt <= now) {
    rateLimitStore.set(ip, { count: 1, expiresAt: now + RATE_LIMIT_WINDOW_MS })
    return false
  }

  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true
  }

  record.count += 1
  rateLimitStore.set(ip, record)
  return false
}

function cleanupRateLimitStore() {
  const now = Date.now()
  for (const [ip, record] of rateLimitStore) {
    if (record.expiresAt <= now) {
      rateLimitStore.delete(ip)
    }
  }
}

export async function POST(request: Request) {
  cleanupRateLimitStore()

  const ip = getClientIp(request)

  if (isRateLimited(ip)) {
    return NextResponse.json({ ok: false, error: 'Demasiadas solicitudes. Intenta nuevamente en unos minutos.' }, { status: 429 })
  }

  let payload: unknown

  try {
    payload = await request.json()
  } catch (error) {
    console.error('Invalid lead payload JSON', error)
    return NextResponse.json({ ok: false, error: 'Formato JSON invalido.' }, { status: 400 })
  }

  let leadData: LeadEmailPayload & Record<string, unknown>

  try {
    const parsed = leadSchema.parse(payload)
    leadData = {
      ...parsed,
      consent: true,
      ip,
      receivedAt: new Date().toISOString()
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ ok: false, error: error.issues[0]?.message ?? 'Datos invalidos.' }, { status: 400 })
    }

    console.error('Unexpected validation error', error)
    return NextResponse.json({ ok: false, error: 'No pudimos procesar la solicitud.' }, { status: 500 })
  }

  try {
    await sendLeadEmail(leadData)
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Error al enviar lead', error)
    return NextResponse.json({ ok: false, error: 'No pudimos enviar tu solicitud. Intenta nuevamente.' }, { status: 500 })
  }
}


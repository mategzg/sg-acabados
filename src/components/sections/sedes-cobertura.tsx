"use client"

import { LocalizedLink } from '@/components/localized-link'
import { siteConfig } from '@/config/site'
import { Building2, CheckCircle, Mail, Phone } from 'lucide-react'

const coverageAreas = [
  'Lima',
  'Arequipa',
  'Cusco',
  'Trujillo',
  'Operaciones remotas (minería e industria)'
]

const serviceHighlights = ['Respuesta en 24-48h', 'Equipos en campo', 'Cobertura nacional']

export function SedesCobertura() {
  const phone = siteConfig.contact?.phone ?? '+51 000 000 000'
  const email = siteConfig.contact?.email ?? 'contacto@sgacabados.pe'
  const normalizedPhone = phone.replace(/\s+/g, '')

  return (
    <section
      role="region"
      aria-labelledby="sedes-cobertura-title"
      className="rounded-2xl border bg-card p-6 shadow-sm"
    >
      <h2 id="sedes-cobertura-title" className="text-2xl font-semibold tracking-tight">
        Sedes y cobertura
      </h2>

      <div className="mt-4 rounded-xl border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary/50 text-primary">
            <Building2 aria-hidden="true" className="h-5 w-5" />
          </span>
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">Sede principal</p>
            <p className="font-heading text-lg font-semibold text-foreground">Arequipa</p>
            <p className="text-sm text-muted-foreground">Calle Misti 134, Yanahuara</p>
          </div>
        </div>
      </div>

      <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
        {serviceHighlights.map((item) => (
          <li key={item} className="flex items-start gap-2">
            <span className="mt-0.5 text-success">
              <CheckCircle aria-hidden="true" className="h-4 w-4" />
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <LocalizedLink
          href="/proyectos"
          locale="es"
          className="inline-flex w-full items-center justify-center rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background sm:w-auto"
        >
          Ver proyectos
        </LocalizedLink>
        <LocalizedLink
          href="/cotizar"
          locale="es"
          className="inline-flex w-full items-center justify-center rounded-full border px-5 py-2.5 text-sm font-medium text-foreground sm:w-auto"
        >
          Solicitar cotización
        </LocalizedLink>
      </div>

      <div className="mt-6">
        <h3 className="text-sm font-medium text-muted-foreground">Cobertura</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {coverageAreas.map((area) => (
            <span key={area} className="rounded-full border px-3 py-1 text-xs text-foreground bg-background">
              {area}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6 space-y-2 text-sm text-muted-foreground">
        <div className="flex items-center gap-2 font-medium text-foreground">
          <Phone aria-hidden="true" className="h-4 w-4" />
          <a
            href={`tel:${normalizedPhone}`}
            className="transition-colors hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            aria-label={`Llamar a SG Acabados al ${phone}`}
          >
            {phone}
          </a>
        </div>
        <div className="flex items-center gap-2 font-medium text-foreground">
          <Mail aria-hidden="true" className="h-4 w-4" />
          <a
            href={`mailto:${email}`}
            className="transition-colors hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            aria-label={`Escribir a ${email}`}
          >
            {email}
          </a>
        </div>
      </div>
    </section>
  )
}

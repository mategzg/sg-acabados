"use client"

import { LocalizedLink } from '@/components/localized-link'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/config/site'
import { Building2, CheckCircle, Globe2, Mail, Phone } from 'lucide-react'

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
      className="rounded-2xl border bg-card p-6 shadow-sm md:p-8"
    >
      <h2
        id="sedes-cobertura-title"
        className="font-heading text-2xl font-semibold text-foreground md:text-3xl"
      >
        Sedes y cobertura
      </h2>

      <div className="mt-6 grid gap-6 md:grid-cols-2 md:items-start">
        <div className="space-y-6">
          <div className="rounded-xl border border-border bg-muted/30 p-4">
            <div className="flex items-start gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary/50 text-primary">
                <Building2 aria-hidden="true" className="h-5 w-5" />
              </span>
              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                  Sede principal
                </p>
                <p className="font-heading text-lg font-semibold text-foreground">Arequipa</p>
                <p className="text-sm text-muted-foreground">Calle Misti 134, Yanahuara</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              <Globe2 aria-hidden="true" className="h-4 w-4" /> Cobertura
            </div>
            <div className="flex flex-wrap gap-2">
              {coverageAreas.map((area) => (
                <span
                  key={area}
                  className="inline-flex items-center rounded-full border border-border bg-background px-3 py-1 text-sm font-medium text-foreground"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-2 text-sm text-muted-foreground">
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
        </div>

        <div className="space-y-6">
          <ul className="space-y-3 text-sm text-muted-foreground">
            {serviceHighlights.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-0.5 text-success">
                  <CheckCircle aria-hidden="true" className="h-4 w-4" />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-3">
            <Button asChild aria-label="Ver proyectos recientes">
              <LocalizedLink href="/proyectos" locale="es">
                Ver proyectos
              </LocalizedLink>
            </Button>
            <Button asChild variant="outline" aria-label="Solicitar una cotización">
              <LocalizedLink href="/cotizar" locale="es">
                Solicitar cotización
              </LocalizedLink>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

"use client"

import { LocalizedLink } from '@/components/localized-link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { siteConfig } from '@/config/site'
import { Building2, Check, Globe2, Mail, MapPin, Phone } from 'lucide-react'

const coverageSpots = [
  'Lima',
  'Arequipa',
  'Cusco',
  'Trujillo',
  'Operaciones remotas (minería e industria)'
]

const highlights = ['Respuesta en 24-48h', 'Equipos en campo', 'Cobertura nacional']

export function SedesCobertura() {
  const phone = siteConfig.contact?.phone ?? '+51 000 000 000'
  const email = siteConfig.contact?.email ?? 'contacto@sgacabados.pe'

  return (
    <Card
      role="region"
      aria-labelledby="sedes-cobertura-title"
      className="rounded-2xl border border-border/70 shadow-sm"
    >
      <CardContent className="grid gap-8 p-6 md:grid-cols-2 md:p-8">
        <div className="space-y-6">
          <div className="space-y-4">
            <h2 id="sedes-cobertura-title" className="font-heading text-2xl font-semibold text-foreground md:text-3xl">
              Sedes y cobertura
            </h2>

            <div className="flex items-start gap-3 rounded-2xl border border-border/60 bg-background/70 p-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary/60 text-primary">
                <Building2 aria-hidden="true" className="h-5 w-5" />
              </span>
              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">Sede principal</p>
                <p className="font-heading text-xl font-semibold text-foreground">Arequipa</p>
                <p className="text-sm text-muted-foreground">Calle Misti 134, Yanahuara</p>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/60 text-primary">
                <Globe2 aria-hidden="true" className="h-5 w-5" />
              </span>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">Cobertura</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {coverageSpots.map((spot) => (
                <Badge key={spot} variant="secondary" className="bg-secondary/70 text-foreground">
                  {spot}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <a
              href={`tel:${phone.replace(/\s+/g, '')}`}
              className="inline-flex items-center gap-2 rounded-full bg-secondary/40 px-3 py-2 font-medium text-foreground transition-transform focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background hover:bg-secondary/60"
              aria-label={`Llamar a SG Acabados al ${phone}`}
            >
              <Phone aria-hidden="true" className="h-4 w-4" />
              <span>{phone}</span>
            </a>
            <a
              href={`mailto:${email}`}
              className="inline-flex items-center gap-2 rounded-full bg-secondary/40 px-3 py-2 font-medium text-foreground transition-transform focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background hover:bg-secondary/60"
              aria-label={`Escribir a ${email}`}
            >
              <Mail aria-hidden="true" className="h-4 w-4" />
              <span>{email}</span>
            </a>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button asChild aria-label="Ver proyectos recientes">
              <LocalizedLink href="/proyectos" locale="es">
                Ver proyectos
              </LocalizedLink>
            </Button>
            <Button asChild variant="secondary" aria-label="Solicitar una cotización">
              <LocalizedLink href="/cotizar" locale="es">
                Solicitar cotización
              </LocalizedLink>
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div
            className="relative overflow-hidden rounded-2xl border border-border/60 bg-secondary/30"
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, hsla(var(--primary) / 0.08) 1px, transparent 0)',
              backgroundSize: '24px 24px'
            }}
          >
            <div className="flex min-h-[220px] items-center justify-center px-8 py-12 text-center">
              <span className="font-heading text-base font-semibold text-muted-foreground">
                Mapa de cobertura (referencial)
              </span>
            </div>
            <MapPin
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 text-primary/70"
            />
          </div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {highlights.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-success/10 text-success">
                  <Check aria-hidden="true" className="h-4 w-4" />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

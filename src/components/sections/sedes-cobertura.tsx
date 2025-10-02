"use client"

import { LocalizedLink } from '@/components/localized-link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { siteConfig } from '@/config/site'
import { Building2, CheckCircle, Globe2, Mail, Phone } from 'lucide-react'

const coverageSpots = [
  'Lima',
  'Arequipa',
  'Cusco',
  'Trujillo',
  'Operaciones remotas (miner\u00eda e industria)'
]

const highlights = ['Respuesta en 24-48h', 'Equipos en campo', 'Cobertura nacional']

export function SedesCobertura() {
  const phone = siteConfig.contact?.phone ?? '+51 000 000 000'
  const email = siteConfig.contact?.email ?? 'contacto@sgacabados.pe'

  return (
    <Card
      role="region"
      aria-labelledby="sedes-cobertura-title"
      className="rounded-2xl shadow-md"
    >
      <CardContent className="grid gap-6 p-6 md:grid-cols-2 md:items-stretch md:gap-8 md:p-8">
        <div className="flex flex-col justify-between gap-6">
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 id="sedes-cobertura-title" className="font-heading text-2xl font-semibold text-foreground md:text-3xl">
                Sedes y cobertura
              </h2>

              <div className="flex items-start gap-3 rounded-2xl border border-border/60 bg-background/80 p-4">
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

            <Separator className="bg-border/70" />

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/60 text-primary">
                  <Globe2 aria-hidden="true" className="h-5 w-5" />
                </span>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">Cobertura</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {coverageSpots.map((spot) => (
                  <Badge key={spot} className="bg-neutral-100 px-3 py-1 text-sm font-medium text-foreground normal-case tracking-normal">
                    {spot}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator className="bg-border/70" />

            <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
              <a
                href={`tel:${phone.replace(/\s+/g, '')}`}
                className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background px-4 py-2 font-medium text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background hover:bg-secondary/40"
                aria-label={`Llamar a SG Acabados al ${phone}`}
              >
                <Phone aria-hidden="true" className="h-4 w-4" />
                <span>{phone}</span>
              </a>
              <a
                href={`mailto:${email}`}
                className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background px-4 py-2 font-medium text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background hover:bg-secondary/40"
                aria-label={`Escribir a ${email}`}
              >
                <Mail aria-hidden="true" className="h-4 w-4" />
                <span>{email}</span>
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button asChild aria-label="Ver proyectos recientes">
              <LocalizedLink href="/proyectos" locale="es">
                Ver proyectos
              </LocalizedLink>
            </Button>
            <Button asChild variant="outline" aria-label="Solicitar una cotizaci\u00f3n">
              <LocalizedLink href="/cotizar" locale="es">
                Solicitar cotizaci\u00f3n
              </LocalizedLink>
            </Button>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <div className="flex h-full flex-col items-center justify-center gap-5 rounded-xl border border-border/60 bg-muted/30 p-6 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary/40 text-primary">
              <Globe2 aria-hidden="true" className="h-7 w-7" />
            </span>
            <div className="space-y-2">
              <p className="font-heading text-lg font-semibold text-foreground">Operaci\u00f3n nacional coordinada</p>
              <p className="text-sm text-muted-foreground">Coordinamos cuadrillas itinerantes y soporte remoto para proyectos simult\u00e1neos.</p>
            </div>
            <ul className="w-full space-y-2 text-left text-sm text-muted-foreground">
              {highlights.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <CheckCircle aria-hidden="true" className="h-5 w-5 text-green-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

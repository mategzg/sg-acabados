import type { Metadata } from 'next'

import { QuoteLeadForm } from '@/components/quote-lead-form'
import { CatalogBanner } from '@/components/catalog-banner'
import { FinalCallToAction } from '@/components/home/final-call-to-action'
import { QuoteLeadValues } from '@/components/quote-lead-form'
import { Section } from '@/components/section'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CatalogDownloadLink, WhatsappLink } from '@/components/tracked-links'
import { siteConfig } from '@/config/site'
import { createMetadata } from '@/lib/seo'

const kpis = [
  { value: '+20 años', label: 'entregando proyectos llave en mano' },
  { value: '6 disciplinas', label: 'integradas con un solo responsable' },
  { value: 'Cobertura nacional', label: 'base en Arequipa y equipos itinerantes' }
]

const sectorOptions = new Set([
  'oficinas',
  'retail',
  'salud',
  'aeropuertos-transporte',
  'industrial-logistica',
  'otros'
])

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  return createMetadata({
    locale: 'es',
    title: 'Solicitar cotización de acabados integrales',
    description:
      'Coordina acabados, mobiliario y sistemas MEP con SG Acabados. Respondemos en menos de 24 horas hábiles para proyectos en todo el Perú.',
    path: '/cotizar',
    keywords: [
      'cotización sg acabados',
      'acabados integrales perú',
      'cotizar proyecto oficinas',
      'cotizar remodelación retail'
    ]
  })
}

type CotizarPageProps = {
  searchParams?: Record<string, string | string[] | undefined>
}

function buildDefaultValues(searchParams: CotizarPageProps['searchParams']): Partial<QuoteLeadValues> {
  if (!searchParams) return {}

  const sectorParam = typeof searchParams.sector === 'string' ? searchParams.sector : undefined
  const familiaParam = typeof searchParams.interes === 'string' ? searchParams.interes : undefined
  const proyectoParam = typeof searchParams.proyecto === 'string' ? searchParams.proyecto : undefined

  const defaults: Partial<QuoteLeadValues> = {}

  if (sectorParam && sectorOptions.has(sectorParam)) {
    defaults.sector = sectorParam
  }

  if (familiaParam) {
    defaults.familia = familiaParam.replace(/-/g, ' ')
  }

  if (proyectoParam) {
    defaults.message = `Proyecto de referencia: ${proyectoParam}`
  }

  return defaults
}

export default function CotizarPage({ searchParams }: CotizarPageProps) {
  const formDefaults = buildDefaultValues(searchParams)

  return (
    <>
      <Section className="bg-white">
        <div className="container grid gap-space-xl lg:grid-cols-[1.1fr,0.9fr] lg:items-start">
          <div className="space-y-space-lg">
            <div className="space-y-space-sm">
              <Badge variant="accent" className="w-fit">Cotizar</Badge>
              <h1 className="text-balance font-heading text-4xl font-semibold text-foreground md:text-5xl">
                Cuentanos sobre tu proyecto
              </h1>
              <p className="max-w-2xl text-balance text-muted-foreground">
                Integramos acabados, mobiliario y sistemas MEP para entregar espacios listos para operar sin mover la fecha acordada. Completa el formulario y coordinaremos la primera reunión en menos de un dia habil.
              </p>
            </div>
            <div className="grid gap-space-sm md:grid-cols-3">
              {kpis.map((kpi) => (
                <Card key={kpi.value} className="rounded-3xl border border-border/70 bg-white/95 p-space-lg shadow-soft">
                  <p className="font-heading text-2xl font-semibold text-foreground">{kpi.value}</p>
                  <p className="text-sm text-muted-foreground">{kpi.label}</p>
                </Card>
              ))}
            </div>
          </div>
          <Card className="space-y-space-sm rounded-3xl border border-border/70 bg-secondary/20 p-space-lg shadow-soft">
            <h2 className="font-heading text-xl font-semibold text-foreground">Necesitas respuesta inmediata?</h2>
            <p className="text-sm text-muted-foreground">
              Contacta al equipo de SG Acabados por WhatsApp para coordinar una llamada o descarga el catálogo y revisa alternativas antes de la reunión.
            </p>
            <div className="flex flex-col gap-space-sm sm:flex-row">
              <Button asChild className="w-full sm:w-auto">
                <WhatsappLink
                  href={siteConfig.whatsapp.link}
                  target="_blank"
                  rel="noreferrer"
                  context="cotizar-top"
                >
                  WhatsApp directo
                </WhatsappLink>
              </Button>
              <Button asChild variant="outline" className="w-full sm:w-auto">
                <CatalogDownloadLink
                  href="/descargas/CATALOGO-SG-2025.pdf"
                  target="_blank"
                  rel="noreferrer"
                  context="cotizar-top"
                >
                  Descargar catálogo
                </CatalogDownloadLink>
              </Button>
            </div>
          </Card>
        </div>
      </Section>

      <Section className="bg-white">
        <div className="container grid gap-space-xl lg:grid-cols-[1.1fr,0.9fr] lg:items-start">
          <Card className="rounded-3xl border border-border/70 bg-white/95 p-space-lg shadow-soft">
            <h2 className="font-heading text-xl font-semibold text-foreground">Formulario de un solo paso</h2>
            <p className="mt-space-xs text-sm text-muted-foreground">
              Mientras mas detalles compartas, mas precisa sera la propuesta inicial.
            </p>
            <div className="mt-space-md">
              <QuoteLeadForm defaultValues={formDefaults} />
            </div>
          </Card>
          <div className="space-y-space-lg">
            <Card className="rounded-3xl border border-border/70 bg-secondary/20 p-space-lg shadow-soft">
              <h2 className="font-heading text-lg font-semibold text-foreground">Sedes y contacto</h2>
              <ul className="mt-space-sm space-y-2 text-sm text-muted-foreground">
                {siteConfig.offices.map((office) => (
                  <li key={office.city}>
                    <span className="font-semibold text-foreground">{office.city}:</span> {office.address}
                  </li>
                ))}
              </ul>
              <p className="mt-space-sm text-sm text-muted-foreground">
                Tambien puedes escribir a{' '}
                <a href={`mailto:${siteConfig.contact.email}`} className="text-primary underline-offset-4 hover:text-primary/80">
                  {siteConfig.contact.email}
                </a>{' '}
                y nos comunicaremos el mismo dia habil.
              </p>
            </Card>
            <Card className="rounded-3xl border border-border/70 bg-white/95 p-space-lg shadow-soft">
              <h2 className="font-heading text-lg font-semibold text-foreground">Tres pasos para avanzar</h2>
              <ol className="mt-space-sm space-y-2 text-sm text-muted-foreground">
                <li>1. Revisamos tu solicitud y confirmamos la reunión virtual en menos de 24 horas.</li>
                <li>2. Validamos visita técnica, seguridad y compatibilización de especialidades.</li>
                <li>3. Entregamos propuesta, cronograma y presupuesto firmado por SG Acabados.</li>
              </ol>
            </Card>
          </div>
        </div>
      </Section>

      <CatalogBanner />
      <FinalCallToAction />
    </>
  )
}



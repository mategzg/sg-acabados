import type { Metadata } from 'next'

import { projectShowcase } from '@/data/project-showcase'
import { CatalogBanner } from '@/components/catalog-banner'
import { FinalCallToAction } from '@/components/home/final-call-to-action'
import { ProjectShowcaseCard } from '@/components/projects/project-showcase-card'
import { Section } from '@/components/section'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { createMetadata } from '@/lib/seo'

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  return createMetadata({
    locale: 'es',
    title: 'Portafolio de proyectos SG',
    description:
      'Tres proyectos ejecutados por SG Acabados en aeropuertos, retail y salud, coordinando acabados, mobiliario y sistemas integrales sin retrasos.',
    path: '/proyectos',
    keywords: ['proyectos sg acabados', 'remodelación oficinas', 'implementación retail', 'clinicas llave en mano']
  })
}

export default function ProyectosPage() {
  const formatter = new Intl.NumberFormat('es-PE')
  const totalArea = projectShowcase.reduce((acc, project) => acc + project.areaM2, 0)
  const totalSpecialties = projectShowcase.reduce((acc, project) => acc + project.specialties.length, 0)
  const averageSpecialties = totalSpecialties / projectShowcase.length

  const metrics = [
    { label: 'Metros intervenidos', value: `${formatter.format(totalArea)} m2` },
    { label: 'Duración promedio', value: '8 semanas' },
    { label: 'Especialidades por proyecto', value: averageSpecialties.toFixed(1) }
  ]

  return (
    <>
      <Section className="bg-white">
        <div className="container grid gap-space-xl lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
          <div className="space-y-space-md">
            <Badge variant="accent" className="w-fit">Casos reales</Badge>
            <h1 className="text-balance font-heading text-4xl font-semibold text-foreground md:text-5xl">
              Proyectos entregados sin retrasos
            </h1>
            <p className="max-w-2xl text-balance text-muted-foreground">
              Coordinamos acabados, mobiliario y sistemas MEP en aeropuertos, retail y salud garantizando fechas de apertura y continuidad operativa.
            </p>
          </div>
          <div className="grid gap-space-sm sm:grid-cols-3">
            {metrics.map((metric) => (
              <Card key={metric.label} className="rounded-3xl border border-border/70 bg-secondary/20 p-space-lg text-center shadow-soft">
                <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{metric.label}</span>
                <p className="mt-space-xs font-heading text-2xl font-semibold text-foreground">{metric.value}</p>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      <Section className="bg-white">
        <div className="container space-y-space-xl">
          <div className="grid gap-space-lg md:grid-cols-2 xl:grid-cols-3" role="list">
            {projectShowcase.map((project) => (
              <ProjectShowcaseCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </Section>

      <CatalogBanner />
      <FinalCallToAction />
    </>
  )
}
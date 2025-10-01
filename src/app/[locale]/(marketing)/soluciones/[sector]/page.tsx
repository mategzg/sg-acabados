import { LocalizedLink as Link } from '@/components/localized-link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

import { Breadcrumbs } from '@/components/breadcrumbs'
import { CatalogBanner } from '@/components/catalog-banner'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Section } from '@/components/section'
import { solutions, getSolution } from '@/data/solutions'
import type { Locale } from '@/lib/i18n-config'
import { locales } from '@/lib/i18n-config'
import { createMetadata } from '@/lib/seo'

export const revalidate = 3600

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    solutions.map((solution) => ({
      locale,
      sector: solution.slug
    }))
  )
}

export async function generateMetadata({
  params
}: {
  params: { locale: Locale; sector: string }
}): Promise<Metadata> {
  const { locale, sector } = params
  const solution = getSolution(sector)

  if (!solution) {
    return createMetadata({
      locale,
      title: 'Solucion no disponible',
      description: 'La pagina solicitada no esta disponible.',
      path: `/soluciones/${sector}`
    })
  }

  return createMetadata({
    locale,
    title: `${solution.name} | Soluciones SG`,
    description: solution.excerpt,
    path: `/soluciones/${solution.slug}`,
    keywords: [solution.name, ...solution.painPoints.slice(0, 2)]
  })
}

export default function SectorPage({ params }: { params: { sector: string } }) {
  const solution = getSolution(params.sector)

  if (!solution) {
    notFound()
  }

  const breadcrumbItems = [
    { label: 'Soluciones', href: '/soluciones' },
    { label: solution.name }
  ]

  return (
    <>
      <Section className="bg-white">
        <div className="container space-y-space-xl">
          <Breadcrumbs items={breadcrumbItems} />
          <div className="grid gap-space-xl lg:grid-cols-[1.2fr,0.8fr]">
            <div className="space-y-space-md">
              <Badge variant="accent" className="w-fit">Sector</Badge>
              <h1 className="text-balance font-heading text-4xl font-semibold text-foreground md:text-5xl">
                {solution.name}
              </h1>
              <p className="max-w-2xl text-balance text-lg text-muted-foreground">{solution.description}</p>
              <div className="grid gap-space-md md:grid-cols-2">
                <div className="space-y-2">
                  <h2 className="font-heading text-lg font-semibold text-foreground">Desafios que resolvemos</h2>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {solution.painPoints.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-1 h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-2">
                  <h2 className="font-heading text-lg font-semibold text-foreground">Entregables coordinados</h2>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {solution.deliverables.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-1 h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="space-y-2">
                <h2 className="font-heading text-lg font-semibold text-foreground">Diferenciales SG</h2>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {solution.differentiators.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-brand-arena" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col gap-space-sm sm:flex-row sm:items-center">
                <Button asChild size="lg" className="w-full sm:w-auto">
                  <Link href={solution.primaryCta.href}>{solution.primaryCta.label}</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
                  <Link href={solution.secondaryCta.href}>{solution.secondaryCta.label}</Link>
                </Button>
              </div>
            </div>
            <Card className="h-full rounded-3xl border border-border/70 bg-secondary/20 p-space-lg shadow-soft">
              <h2 className="font-heading text-lg font-semibold text-foreground">Metricas y cobertura</h2>
              <ul className="mt-space-sm space-y-3 text-sm text-muted-foreground">
                {solution.metrics.map((metric) => (
                  <li key={metric.label} className="flex items-start justify-between gap-space-sm">
                    <span className="font-semibold text-foreground/80">{metric.label}</span>
                    <span>{metric.value}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-space-lg rounded-2xl border border-border/60 bg-white/80 p-space-md text-sm text-muted-foreground">
                <p className="font-semibold text-foreground">Incluye:</p>
                <p className="mt-1">Coordinacion de permisos, control de calidad diario y entrega de manuales operativos.</p>
              </div>
            </Card>
          </div>
        </div>
      </Section>

      <CatalogBanner />
    </>
  )
}

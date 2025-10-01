import type { Metadata } from 'next'
import { LocalizedLink as Link } from '@/components/localized-link'

import { solutions } from '@/data/solutions'
import { CatalogBanner } from '@/components/catalog-banner'
import { Section } from '@/components/section'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { createMetadata } from '@/lib/seo'

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  return createMetadata({
    locale: 'es',
    title: 'Soluciones llave en mano por sector',
    description:
      'Ofrecemos kits de acabados, mobiliario y sistemas integrales para oficinas, retail y salud con plazos controlados y soporte post entrega.',
    path: '/soluciones',
    keywords: ['soluciones corporativas', 'acabados por sector', 'llave en mano oficinas', 'implementacion retail', 'clinicas y hospitales']
  })
}

export default function SolucionesPage() {
  return (
    <>
      <Section className="bg-white">
        <div className="container grid gap-space-xl lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
          <div className="space-y-space-md">
            <Badge variant="accent" className="w-fit">Soluciones</Badge>
            <h1 className="text-balance font-heading text-4xl font-semibold text-foreground md:text-5xl">
              Kits integrales que aceleran tu apertura
            </h1>
            <p className="max-w-2xl text-balance text-muted-foreground">
              Cada sector tiene requisitos de plazo, permisos y protocolos distintos. Coordinamos acabados, mobiliario y sistemas bajo un solo frente para que abras sin retrasos.
            </p>
            <div className="flex flex-col gap-space-sm sm:flex-row sm:items-center">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="/cotizar">Solicitar evaluacion</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
                <Link href="/contacto">Hablar con especialistas</Link>
              </Button>
            </div>
          </div>
          <Card className="space-y-space-sm rounded-3xl border border-border/70 bg-secondary/20 p-space-lg shadow-soft">
            <h2 className="font-heading text-xl font-semibold text-foreground">Que incluye el servicio</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>- Discovery tecnico y cronograma multi especialidad</li>
              <li>- Coordinacion de proveedores, mall management y autoridades</li>
              <li>- Entrega llave en mano con capacitacion de operaciones</li>
            </ul>
          </Card>
        </div>
      </Section>

      <Section className="bg-white">
        <div className="container space-y-space-xl">
          <div className="grid gap-space-lg md:grid-cols-2 xl:grid-cols-3" role="list">
            {solutions.map((solution) => (
              <Card
                key={solution.slug}
                role="listitem"
                className="flex h-full flex-col gap-space-sm rounded-3xl border border-border/70 bg-white/95 p-space-lg shadow-soft transition-transform duration-200 hover:-translate-y-1 focus-within:-translate-y-1 focus-within:ring-2 focus-within:ring-accent focus-within:ring-offset-2"
              >
                <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{solution.slug}</span>
                <h2 className="font-heading text-2xl font-semibold text-foreground">{solution.name}</h2>
                <p className="text-sm text-muted-foreground">{solution.excerpt}</p>
                <ul className="space-y-2 text-sm text-foreground/80">
                  {solution.painPoints.slice(0, 3).map((item) => (
                    <li key={item}>- {item}</li>
                  ))}
                </ul>
                <div className="mt-auto pt-space-sm">
                  <Button asChild size="sm" className="w-full">
                    <Link href={`/soluciones/${solution.slug}`} aria-label={`Ver solucion para ${solution.name}`}>
                      Ver ficha sectorial
                    </Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      <CatalogBanner />
    </>
  )
}
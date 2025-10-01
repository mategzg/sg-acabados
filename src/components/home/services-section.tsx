import { LocalizedLink as Link } from '@/components/localized-link'

import { services } from '@/data/services'
import { Section } from '@/components/section'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export function ServicesSection() {
  return (
    <Section id="servicios" className="bg-white">
      <div className="container space-y-space-2xl">
        <div className="flex flex-col gap-space-md md:flex-row md:items-end md:justify-between">
          <div className="space-y-space-sm md:max-w-2xl">
            <Badge variant="accent" className="w-fit">Servicios</Badge>
            <h2 className="text-balance font-heading text-3xl font-semibold text-foreground md:text-4xl">
              Soluciones integrales en un solo frente
            </h2>
            <p className="text-balance text-muted-foreground">
              Coordinamos hasta seis especialidades para entregar espacios listos para operar sin extender el cronograma.
            </p>
          </div>
          <Button asChild variant="outline" className="w-full md:w-auto">
            <Link href="/cotizar">Solicitar propuesta</Link>
          </Button>
        </div>
        <div className="grid gap-space-lg md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <Card
                key={service.id}
                className="flex h-full flex-col gap-space-md rounded-3xl border border-border/70 bg-white/95 p-space-lg shadow-soft transition-transform duration-200 hover:-translate-y-1 md:p-space-xl"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/15 text-accent">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <div className="space-y-space-xs">
                  <h3 className="font-heading text-xl font-semibold text-foreground">{service.title}</h3>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                </div>
                <div className="mt-auto pt-space-sm">
                  <Link
                    href={service.href}
                    className="text-sm font-semibold text-primary underline-offset-4 hover:text-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                  >
                    Ver detalles
                  </Link>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </Section>
  )
}


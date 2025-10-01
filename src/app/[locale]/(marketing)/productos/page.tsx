import type { Metadata } from 'next'
import Image from 'next/image'
import { LocalizedLink as Link } from '@/components/localized-link'

import { productFamilies } from '@/data/product-families'
import { CatalogBanner } from '@/components/catalog-banner'
import { FinalCallToAction } from '@/components/home/final-call-to-action'
import { StickyCTA } from '@/components/sticky-cta'
import { Section } from '@/components/section'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { DEFAULT_BLUR_DATA_URL } from '@/lib/images'
import { createMetadata } from '@/lib/seo'

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  return createMetadata({
    locale: 'es',
    title: 'Productos para interiores corporativos',
    description:
      'Seis familias de acabados, control solar, iluminacion y sistemas integrales coordinadas para entregar espacios listos para operar.',
    path: '/productos',
    keywords: ['acabados corporativos', 'productos para oficinas', 'control solar', 'iluminacion led corporativa']
  })
}

export default function ProductosPage() {
  return (
    <>
      <Section className="bg-white">
        <div className="container grid gap-space-xl lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
          <div className="space-y-space-md">
            <Badge variant="accent" className="w-fit">Portafolio</Badge>
            <h1 className="text-balance font-heading text-4xl font-semibold text-foreground md:text-5xl">
              Familias de productos que instalamos y garantizamos
            </h1>
            <p className="max-w-2xl text-balance text-muted-foreground">
              Coordinamos suministro, instalacion y puesta en marcha bajo un solo cronograma. Cada familia incluye diseno, fichas tecnicas y soporte post entrega.
            </p>
            <div className="flex flex-col gap-space-sm sm:flex-row sm:items-center">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="/cotizar">Solicitar propuesta</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
                <Link href="/contacto">Hablar con un especialista</Link>
              </Button>
            </div>
          </div>
          <div className="space-y-space-sm rounded-3xl border border-border bg-secondary/20 p-space-lg shadow-soft">
            <h2 className="font-heading text-xl font-semibold text-foreground">Que incluye la gestion SG</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>- Ingenieria de detalles y compatibilizacion MEP</li>
              <li>- Supervisores dedicados por especialidad</li>
              <li>- Programacion de mantenimiento y garantias</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section className="bg-white">
        <div className="container space-y-space-xl">
          <div className="grid gap-space-lg md:grid-cols-2 xl:grid-cols-3" role="list">
            {productFamilies.map((family) => (
              <Card
                key={family.id}
                role="listitem"
                className="flex h-full flex-col overflow-hidden rounded-3xl border border-border/70 bg-white/95 shadow-soft transition-transform duration-200 focus-within:-translate-y-1 focus-within:ring-2 focus-within:ring-accent focus-within:ring-offset-2 hover:-translate-y-1"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={family.image.src}
                    alt={family.image.alt}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1280px) 360px, (min-width: 768px) 50vw, 100vw"
                    placeholder="blur"
                    blurDataURL={DEFAULT_BLUR_DATA_URL}
                  />
                </div>
                <div className="flex flex-1 flex-col gap-space-sm p-space-lg">
                  <h2 className="font-heading text-2xl font-semibold text-foreground">{family.name}</h2>
                  <p className="text-sm text-muted-foreground">{family.description}</p>
                  <ul className="space-y-1 text-sm text-foreground/80">
                    {family.highlights.map((item) => (
                      <li key={item}>- {item}</li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-space-sm">
                    <Button
                      asChild
                      size="sm"
                      className="w-full focus-visible:ring-offset-2"
                    >
                      <Link href={family.href} aria-label={`Solicitar cotizacion de ${family.name}`}>
                        Cotizar esta familia
                      </Link>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      <CatalogBanner />
      <FinalCallToAction />
      <StickyCTA />
    </>
  )
}
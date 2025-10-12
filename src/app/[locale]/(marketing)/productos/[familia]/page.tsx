import Image from 'next/image'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { CatalogBanner } from '@/components/catalog-banner'
import { LocalizedLink as Link } from '@/components/localized-link'
import { Section } from '@/components/section'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { DEFAULT_BLUR_DATA_URL } from '@/lib/images'
import {
  getProductFamily,
  getProductFamilyBrandAssets,
  getProductFamilySlugs
} from '@/lib/product-taxonomy'
import type { Locale } from '@/lib/i18n-config'
import { locales } from '@/lib/i18n-config'
import { createMetadata } from '@/lib/seo'

export const revalidate = 3600

export async function generateStaticParams() {
  const slugs = getProductFamilySlugs()

  return locales.flatMap((locale) => slugs.map((familia) => ({ locale, familia })))
}

export async function generateMetadata({
  params
}: {
  params: { locale: Locale; familia: string }
}): Promise<Metadata> {
  const { locale, familia } = params
  const family = getProductFamily(familia)

  if (!family) {
    return createMetadata({
      locale,
      title: 'Familia no encontrada',
      description: 'La familia solicitada no está disponible.',
      path: `/productos/${familia}`
    })
  }

  return createMetadata({
    locale,
    title: `${family.titulo} | Portafolio SG`,
    description: family.intro,
    path: `/productos/${family.slug}`
  })
}

export default function FamiliaPage({
  params
}: {
  params: { locale: Locale; familia: string }
}) {
  const { familia } = params
  const family = getProductFamily(familia)

  if (!family) {
    notFound()
  }

  const breadcrumbs = [
    { label: 'Productos', href: '/productos' },
    { label: family.titulo }
  ]

  const brandAssets = getProductFamilyBrandAssets(family.brands)

  return (
    <>
      <Section className="bg-white">
        <div className="container space-y-8">
          <Breadcrumbs items={breadcrumbs} />
          <div className="space-y-6 lg:w-3/4">
            <Badge variant="accent" className="w-fit">
              Familia
            </Badge>
            <h1 className="font-heading text-4xl font-semibold text-foreground md:text-5xl">
              {family.titulo}
            </h1>
            <p className="text-lg text-muted-foreground">{family.intro}</p>
          </div>
        </div>
      </Section>

      <Section className="bg-white">
        <div className="container space-y-10">
          <div className="space-y-6">
            <h2 className="font-heading text-3xl font-semibold text-foreground">Subfamilias disponibles</h2>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {family.subfamilias.map((subfamily) => {
                const href = `/cotizar?familia=${encodeURIComponent(family.slug)}&subfamilia=${encodeURIComponent(subfamily.slug)}`

                return (
                  <Card key={subfamily.slug} className="flex h-full flex-col overflow-hidden bg-white/95 shadow-soft">
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={subfamily.image}
                        alt={`Subfamilia ${subfamily.nombre}`}
                        fill
                        className="object-cover"
                        sizes="(min-width: 1280px) 320px, (min-width: 768px) 45vw, 100vw"
                        placeholder="blur"
                        blurDataURL={DEFAULT_BLUR_DATA_URL}
                      />
                    </div>
                    <div className="flex flex-1 flex-col gap-3 p-6">
                      <div>
                        <h3 className="font-heading text-xl font-semibold text-foreground">{subfamily.nombre}</h3>
                        <p className="text-sm text-muted-foreground">{subfamily.resumen}</p>
                      </div>
                      <div className="mt-auto pt-4">
                        <Button asChild size="sm" className="w-full">
                          <Link href={href}>Cotizar esta subfamilia</Link>
                        </Button>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>

          {brandAssets.length ? (
            <div className="space-y-4">
              <h2 className="font-heading text-2xl font-semibold text-foreground">Marcas que trabajamos</h2>
              <p className="text-sm text-muted-foreground">
                Seleccionamos fabricantes con soporte local y certificaciones vigentes.
              </p>
              <div className="flex flex-wrap gap-4">
                {brandAssets.map((brand) => (
                  <div
                    key={brand.slug}
                    className="group flex h-16 w-32 flex-col items-center justify-center rounded-2xl border border-border/70 bg-muted/30 px-3 text-center transition hover:border-accent"
                  >
                    <div className="relative h-10 w-24">
                      <Image
                        src={brand.asset}
                        alt={`Marca ${brand.name}`}
                        fill
                        className="object-contain opacity-70 transition group-hover:opacity-100"
                        sizes="96px"
                      />
                    </div>
                    <span className="mt-1 text-xs font-medium text-muted-foreground transition group-hover:text-foreground">
                      {brand.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </Section>

      <Section className="bg-secondary/20">
        <div className="container flex flex-col gap-6 rounded-3xl border border-border/60 bg-white/70 p-space-xl shadow-soft lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3">
            <h2 className="font-heading text-2xl font-semibold text-foreground">
              ¿Listos para coordinar tu proyecto {family.titulo.toLowerCase()}?
            </h2>
            <p className="text-sm text-muted-foreground">
              Comparte planos y cronograma para agendar una visita técnica y recibir el presupuesto coordinado por especialidad.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href={`/cotizar?familia=${encodeURIComponent(family.slug)}`}>
                Solicitar cotización
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/contacto">Hablar con un especialista</Link>
            </Button>
          </div>
        </div>
      </Section>

      <CatalogBanner />
    </>
  )
}
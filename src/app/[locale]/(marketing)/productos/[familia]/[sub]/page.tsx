import Image from 'next/image'
import { DEFAULT_BLUR_DATA_URL } from '@/lib/images'
import { LocalizedLink as Link } from '@/components/localized-link'

import { Breadcrumbs } from '@/components/breadcrumbs'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

import { QuoteBuilder } from '@/components/quote-builder'
import { CatalogBanner } from '@/components/catalog-banner'
import { Section } from '@/components/section'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ViewItemAnalytics } from '@/components/analytics/view-item'
import { getFamily, getFamilies, getSubFamilies, getSubFamily } from '@/lib/content'
import type { Locale } from '@/lib/i18n-config'
import { locales } from '@/lib/i18n-config'
import { createMetadata } from '@/lib/seo'
import { siteConfig } from '@/config/site'

export const revalidate = 3600

export async function generateStaticParams() {
  const subFamilies = await getSubFamilies()
  return locales.flatMap((locale) =>
    subFamilies.map((subFamily) => ({
      locale,
      familia: subFamily.familia,
      sub: subFamily.slug
    }))
  )
}

export async function generateMetadata({
  params
}: {
  params: { locale: Locale; familia: string; sub: string }
}): Promise<Metadata> {
  const { locale, familia, sub } = params
  const subFamily = await getSubFamily(sub).catch(() => null)

  if (!subFamily || subFamily.familia !== familia) {
    return createMetadata({
      locale,
      title: 'Ficha no encontrada',
      description: 'La subfamilia solicitada no esta disponible.',
      path: `/productos/${familia}/${sub}`
    })
  }

  return createMetadata({
    locale,
    title: `${subFamily.nombre} - Especificaciones`,
    description: subFamily.resumen,
    path: `/productos/${familia}/${sub}`
  })
}

export default async function SubFamilyPage({
  params
}: {
  params: { locale: Locale; familia: string; sub: string }
}) {
  const { familia, sub } = params
  const subFamily = await getSubFamily(sub).catch(() => null)

  if (!subFamily || subFamily.familia !== familia) {
    notFound()
  }

  const family = await getFamily(subFamily.familia).catch(() => null)

  if (!family) {
    notFound()
  }


  const labels = {
    'transito-alto': 'Transito alto',
    impermeable: 'Impermeable',
    ignifugo: 'Ignifugo',
    acustica: 'Acustica'
  } as const

  const families = await getFamilies()
  const breadcrumbItems = [
    { label: 'Productos', href: '/productos' },
    { label: family.nombre, href: `/productos/${family.slug}` },
    { label: subFamily.nombre }
  ]

  const complementary = families.filter((item) => item.slug !== family.slug).slice(0, 2)
  const gallery = subFamily.imagenes

  const whatsappMessage = encodeURIComponent(
    `Hola, quisiera cotizar ${subFamily.nombre} (${family.nombre}) para [sector] en [ciudad], aprox [m2] m2, plazo [fecha].`
  )

  return (
    <>
      <ViewItemAnalytics item={{ id: subFamily.slug, name: subFamily.nombre, category: family.nombre }} />
      <Section className="bg-white">
        <div className="container space-y-6">
          <Breadcrumbs items={breadcrumbItems} />
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <Link href="/productos" className="hover:text-foreground">
              Productos
            </Link>
            <span aria-hidden="true">/</span>
            <Link href={`/productos/${family.slug}`} className="hover:text-foreground">
              {family.nombre}
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-foreground">{subFamily.nombre}</span>
          </div>
          <div className="grid gap-10 lg:grid-cols-[1.1fr,0.9fr]">
            <div className="space-y-4">
              <Badge variant="accent" className="w-fit">Ficha tecnica</Badge>
              <h1 className="font-heading text-4xl font-semibold text-foreground md:text-5xl">
                {subFamily.nombre}
              </h1>
              <p className="text-lg text-muted-foreground">{subFamily.resumen}</p>
              <div className="flex flex-wrap gap-2">
                {subFamily.desempenos.map((item) => (
                  <Badge key={item} variant="outline">
                    {labels[item as keyof typeof labels] ?? item}
                  </Badge>
                ))}
              </div>
            </div>
            <Card className="bg-secondary/30">
              <CardContent className="space-y-4 p-6">
                <h2 className="font-heading text-lg font-semibold text-foreground">Datos rapidos</h2>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  {subFamily.especificaciones.slice(0, 4).map((spec) => (
                    <li key={spec.key}>
                      <span className="font-semibold text-foreground">{spec.key}:</span> {spec.value}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-3">
                  <Button asChild size="sm">
                    <Link href="/cotizar">Solicitar cotizacion</Link>
                  </Button>
                  <Button asChild size="sm" variant="outline">
                    <a href={`${siteConfig.whatsapp.link}?text=${whatsappMessage}`} target="_blank" rel="noreferrer">
                      WhatsApp
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>

      <Section className="container grid gap-10 lg:grid-cols-[1.1fr,0.9fr]">
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            {gallery.map((image) => (
              <div key={image.src} className="relative h-64 overflow-hidden rounded-3xl">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="(min-width:1024px) 50vw, 100vw"
                  placeholder="blur"
                  blurDataURL={DEFAULT_BLUR_DATA_URL}
                />
              </div>
            ))}
          </div>
          <Card className="bg-white/95">
            <CardContent className="space-y-4 p-6">
              <h2 className="font-heading text-xl font-semibold text-foreground">Beneficios claves</h2>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {subFamily.beneficios.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card className="bg-secondary/40">
            <CardContent className="space-y-4 p-6">
              <h2 className="font-heading text-xl font-semibold text-foreground">Aplicaciones recomendadas</h2>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {subFamily.aplicaciones.map((use) => (
                  <li key={use} className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
                    <span>{use}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6">
          <Card className="bg-white/95">
            <CardContent className="space-y-4 p-6">
              <h2 className="font-heading text-xl font-semibold text-foreground">Tabla de especificaciones</h2>
              <dl className="grid gap-3 text-sm text-muted-foreground">
                {subFamily.especificaciones.map((spec) => (
                  <div key={spec.key} className="flex items-start justify-between gap-3">
                    <dt className="font-semibold text-foreground">{spec.key}</dt>
                    <dd className="text-right">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </CardContent>
          </Card>
          {subFamily.descargas.length ? (
            <Card className="bg-secondary/30">
              <CardContent className="space-y-4 p-6">
                <h2 className="font-heading text-xl font-semibold text-foreground">Descargas</h2>
                <ul className="space-y-2 text-sm text-primary">
                  {subFamily.descargas.map((download) => (
                    <li key={download.href}>
                      <a href={download.href} target="_blank" rel="noreferrer" className="underline-offset-4 hover:underline">
                        {download.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ) : null}
          <Card className="bg-white/95">
            <CardContent className="space-y-4 p-6">
              <h2 className="font-heading text-xl font-semibold text-foreground">Se complementa con</h2>
              <div className="space-y-3 text-sm text-muted-foreground">
                {complementary.map((item) => (
                  <div key={item.slug} className="rounded-2xl border border-border/60 p-4">
                    <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{item.slug}</p>
                    <h3 className="mt-2 font-heading text-base font-semibold text-foreground">{item.nombre}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{item.resumen}</p>
                    <Link
                      href={`/productos/${item.slug}`}
                      className="mt-3 inline-flex text-primary underline-offset-4 hover:text-primary/80"
                    >
                      Ver familia
                    </Link>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section className="bg-white">
        <div className="container grid gap-10 lg:grid-cols-[1fr,1fr]">
          <div className="space-y-4">
            <h2 className="font-heading text-3xl font-semibold text-foreground">Construyamos el alcance ideal</h2>
            <p className="text-sm text-muted-foreground">
              Cuentanos sobre tu proyecto y nuestro equipo te contactara con una propuesta personalizada en menos de 24 horas habiles.
            </p>
          </div>
          <QuoteBuilder
            defaultValues={{
              sector: subFamily.sectores?.[0] ?? '',
              familia: family.nombre,
              subfamilia: subFamily.nombre,
              uso: subFamily.usos?.[0] ?? ''
            }}
          />
        </div>
      </Section>

      <CatalogBanner />
    </>
  )
}

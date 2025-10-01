import Script from 'next/script'
import { LocalizedLink as Link } from '@/components/localized-link'

import { Breadcrumbs } from '@/components/breadcrumbs'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

import { CatalogBanner } from '@/components/catalog-banner'
import { Section } from '@/components/section'
import { SubFamilyCard } from '@/components/subfamily-card'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { getFamilies, getFamily, getSubFamilies } from '@/lib/content'
import type { Locale } from '@/lib/i18n-config'
import { locales } from '@/lib/i18n-config'
import { createMetadata } from '@/lib/seo'
import { siteConfig } from '@/config/site'

export const revalidate = 3600

export async function generateStaticParams() {
  const families = await getFamilies()
  return locales.flatMap((locale) =>
    families.map((family) => ({
      locale,
      familia: family.slug
    }))
  )
}

export async function generateMetadata({
  params
}: {
  params: { locale: Locale; familia: string }
}): Promise<Metadata> {
  const { locale, familia } = params
  const family = await getFamily(familia).catch(() => null)

  if (!family) {
    return createMetadata({
      locale,
      title: 'Familia no encontrada',
      description: 'La familia solicitada no esta disponible.',
      path: `/productos/${familia}`
    })
  }

  return createMetadata({
    locale,
    title: `${family.nombre} - Productos SG`,
    description: family.resumen,
    path: `/productos/${family.slug}`
  })
}

export default async function FamiliaPage({
  params
}: {
  params: { locale: Locale; familia: string }
}) {
  const { familia } = params
  const family = await getFamily(familia).catch(() => null)

  if (!family) {
    notFound()
  }

  const [allSubFamilies, families] = await Promise.all([getSubFamilies(), getFamilies()])

  const breadcrumbItems = [
    { label: 'Productos', href: '/productos' },
    { label: family.nombre }
  ]

  const relatedSubFamilies = allSubFamilies.filter((sub) => sub.familia === family.slug)
  const complementaryFamilies = families.filter((item) => item.slug !== family.slug).slice(0, 3)

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: family.nombre,
    description: family.resumen,
    provider: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.siteUrl
    },
    areaServed: 'PE',
    serviceType: 'Acabados y sistemas',
    audience: 'Empresas'
  }

  return (
    <>
      <Script id={`ld-service-${family.slug}`} type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(serviceLd)}
      </Script>
      <Section className="bg-white">
        <div className="container space-y-8">
          <Breadcrumbs items={breadcrumbItems} />
          <div className="grid gap-10 lg:grid-cols-[1.2fr,0.8fr]">
          <div className="space-y-4">
            <Badge variant="accent" className="w-fit">Familia</Badge>
            <h1 className="font-heading text-4xl font-semibold text-foreground md:text-5xl">
              {family.nombre}
            </h1>
            <p className="text-lg text-muted-foreground">{family.resumen}</p>
            <div className="prose-container prose">
              {family.content}
            </div>
          </div>
          <Card className="border border-border/70 bg-secondary/30">
            <CardContent className="space-y-4 p-6">
              <h2 className="font-heading text-lg font-semibold text-foreground">Beneficios clave</h2>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {family.beneficios.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
        </div>
      </Section>

      <Section className="container grid gap-10 lg:grid-cols-[1.1fr,0.9fr]">
        <div className="space-y-6">
          <h2 className="font-heading text-3xl font-semibold text-foreground">Subfamilias disponibles</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {relatedSubFamilies.map((subFamily) => (
              <SubFamilyCard key={subFamily.slug} subFamily={subFamily} />
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <Card className="bg-white/95">
            <CardContent className="space-y-4 p-6">
              <h3 className="font-heading text-lg font-semibold text-foreground">Especificaciones</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                {family.specs.map((spec) => (
                  <li key={spec.key}>
                    <span className="font-semibold text-foreground">{spec.key}:</span> {spec.value}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card className="bg-secondary/40">
            <CardContent className="space-y-4 p-6">
              <h3 className="font-heading text-lg font-semibold text-foreground">Aplicaciones frecuentes</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {family.aplicaciones.map((use) => (
                  <li key={use} className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
                    <span>{use}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          {family.descargas.length ? (
            <Card className="bg-white/95">
              <CardContent className="space-y-4 p-6">
                <h3 className="font-heading text-lg font-semibold text-foreground">Descargas</h3>
                <ul className="space-y-2 text-sm text-primary">
                  {family.descargas.map((download) => (
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
        </div>
      </Section>

      <Section className="bg-white">
        <div className="container space-y-6">
          <h2 className="font-heading text-3xl font-semibold text-foreground">Se instala con</h2>
          <p className="max-w-2xl text-muted-foreground">
            Coordinamos especialidades complementarias para entregar el proyecto completo con un solo frente de obra.
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            {complementaryFamilies.map((item) => (
              <Card key={item.slug} className="bg-white/95 p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{item.slug}</p>
                <h3 className="mt-2 font-heading text-xl font-semibold text-foreground">{item.nombre}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.resumen}</p>
                <Link
                  href={`/productos/${item.slug}`}
                  className="mt-4 inline-flex text-sm font-medium text-primary underline-offset-4 hover:text-primary/80"
                >
                  Ver familia
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      <CatalogBanner />
    </>
  )
}


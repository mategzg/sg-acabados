import Image from 'next/image'
import { LocalizedLink as Link } from '@/components/localized-link'
import Script from 'next/script'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

import { Badge } from '@/components/ui/badge'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Section } from '@/components/section'
import { CatalogBanner } from '@/components/catalog-banner'
import { getProject, getProjects } from '@/lib/content'
import type { Locale } from '@/lib/i18n-config'
import { locales } from '@/lib/i18n-config'
import { createMetadata } from '@/lib/seo'
import { siteConfig } from '@/config/site'
import { DEFAULT_BLUR_DATA_URL } from '@/lib/images'

export const revalidate = 3600

export async function generateStaticParams() {
  const projects = await getProjects()
  return locales.flatMap((locale) =>
    projects.map((project) => ({
      locale,
      slug: project.slug
    }))
  )
}

export async function generateMetadata({
  params
}: {
  params: { locale: Locale; slug: string }
}): Promise<Metadata> {
  const { locale, slug } = params
  const project = await getProject(slug).catch(() => null)
  if (!project) {
    return createMetadata({
      locale,
      title: 'Proyecto no encontrado',
      description: 'El proyecto solicitado no esta disponible.',
      path: `/proyectos/${slug}`
    })
  }

  return createMetadata({
    locale,
    title: `${project.nombre} - Caso SG`,
    description: project.resumen,
    path: `/proyectos/${project.slug}`
  })
}

export default async function ProyectoPage({
  params
}: {
  params: { locale: Locale; slug: string }
}) {
  const { slug } = params
  const project = await getProject(slug).catch(() => null)

  if (!project) {
    notFound()
  }

  const breadcrumbItems = [
    { label: 'Proyectos', href: '/proyectos' },
    { label: project.nombre }
  ]

  const projectLd = {
    '@context': 'https://schema.org',
    '@type': 'Project',
    name: project.nombre,
    description: project.resumen,
    client: project.cliente,
    locationCreated: project.ubicacion,
    duration: project.plazo,
    url: `${siteConfig.siteUrl.replace(/\/$/, '')}/proyectos/${project.slug}`
  }

  const metrics = [
    { label: 'Cliente', value: project.cliente },
    { label: 'Ubicacion', value: project.ubicacion },
    { label: 'Metros cuadrados', value: `${project.metrosCuadrados.toLocaleString('es-PE')} m2` },
    { label: 'Plazo', value: project.plazo }
  ]

  return (
    <>
      <Script id={`ld-project-${project.slug}`} type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(projectLd)}
      </Script>
      <Section className="bg-white">
        <div className="container space-y-6">
          <Breadcrumbs items={breadcrumbItems} />
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <Link href="/proyectos" className="hover:text-foreground">
              Proyectos
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-foreground">{project.nombre}</span>
          </div>
          <div className="space-y-4">
            <Badge variant="accent" className="w-fit">{project.sector}</Badge>
            <h1 className="font-heading text-4xl font-semibold text-foreground md:text-5xl">
              {project.nombre}
            </h1>
            <p className="text-lg text-muted-foreground">{project.resumen}</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {metrics.map((metric) => (
              <Card key={metric.label} className="bg-white/95">
                <CardContent className="space-y-2 p-6">
                  <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{metric.label}</p>
                  <p className="font-heading text-xl font-semibold text-foreground">{metric.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      <Section className="container space-y-10">
        <div className="grid gap-4 md:grid-cols-2">
          {project.galeria.map((image, index) => (
            <div key={image.src} className="relative h-72 overflow-hidden rounded-3xl">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority={index === 0}
                className="object-cover"
                sizes="(min-width:1024px) 50vw, 100vw"
                placeholder="blur"
                blurDataURL={DEFAULT_BLUR_DATA_URL}
              />
            </div>
          ))}
        </div>
        <div className="grid gap-10 lg:grid-cols-[1.1fr,0.9fr]">
          <Card className="bg-white/95">
            <CardContent className="space-y-4 p-6">
              <h2 className="font-heading text-xl font-semibold text-foreground">Alcance del proyecto</h2>
              <p className="text-sm text-muted-foreground">{project.descripcion}</p>
              <div className="prose-container prose">
                {project.content}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-secondary/30">
            <CardContent className="space-y-4 p-6">
              <h2 className="font-heading text-xl font-semibold text-foreground">Especialidades involucradas</h2>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {project.especialidades.map((esp) => (
                  <li key={esp} className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
                    <span>{esp}</span>
                  </li>
                ))}
              </ul>
              <Button asChild>
                <Link href={`/cotizar?sector=${project.sector}`}>Solicitar proyecto similar</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </Section>

      <CatalogBanner />
    </>
  )
}

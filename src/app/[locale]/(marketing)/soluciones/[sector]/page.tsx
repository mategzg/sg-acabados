import { Suspense } from "react"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { SolucionesView } from "@/components/soluciones/soluciones-view"
import type { SegmentWithProjects } from "@/components/soluciones/segment-tabs"
import { getProjects } from "@/lib/content"
import { getSolutionsContent, getSolutionsSegment } from "@/lib/solutions-intent"
import { locales, type Locale } from "@/lib/i18n-config"
import { createMetadata } from "@/lib/seo"
import type { SolutionsProjectCard } from "@/types/solutions"

import { siteConfig } from "@/config/site"

const FALLBACK_IMAGE = {
  src: "/images/placeholders/generic-card.webp",
  alt: "Proyecto de referencia en preparación"
}

function humanizeSlug(value: string) {
  return value
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

function mapEvidenceSlugs(
  slugs: string[],
  projects: Awaited<ReturnType<typeof getProjects>>
): SolutionsProjectCard[] {
  return slugs.map((rawSlug) => {
    const token = rawSlug.toLowerCase()
    const match = projects.find((project) => {
      const slug = project.slug.toLowerCase()
      const name = project.nombre.toLowerCase()
      return slug.includes(token) || name.includes(token)
    })

    if (match) {
      const image = match.galeria?.[0] ?? FALLBACK_IMAGE
      return {
        slug: match.slug,
        name: match.nombre,
        summary: match.resumen,
        href: `/proyectos/${match.slug}`,
        sector: match.sector,
        location: match.ubicacion,
        image
      }
    }

    return {
      slug: rawSlug,
      name: humanizeSlug(rawSlug),
      summary: "Pronto publicaremos la ficha completa de este proyecto.",
      href: "/proyectos",
      sector: "Referencia",
      image: FALLBACK_IMAGE
    }
  })
}

export function generateStaticParams() {
  const content = getSolutionsContent()
  return locales.flatMap((locale) =>
    content.segments.map((segment) => ({
      locale,
      sector: segment.id
    }))
  )
}

type GenerateMetadataProps = {
  params: { locale: Locale; sector: string }
}

export async function generateMetadata({ params }: GenerateMetadataProps): Promise<Metadata> {
  const segment = getSolutionsSegment(params.sector)

  if (!segment) {
    return createMetadata({
      locale: params.locale,
      title: "Solución no disponible",
      description: "La página solicitada no está disponible.",
      path: `/soluciones/${params.sector}`
    })
  }

  return createMetadata({
    locale: params.locale,
    title: `${segment.label} | Soluciones SG`,
    description: segment.intro,
    path: `/soluciones/${segment.id}`,
    keywords: [segment.label, ...segment.pains.slice(0, 2)]
  })
}

type SegmentPageProps = {
  params: { sector: string }
}

export default async function SegmentPage({ params }: SegmentPageProps) {
  const content = getSolutionsContent()
  const segment = getSolutionsSegment(params.sector)

  if (!segment) {
    notFound()
  }

  const projects = await getProjects()
  const whatsappBase = siteConfig.whatsapp.link

  const segments: SegmentWithProjects[] = content.segments.map((item) => ({
    ...item,
    projects: mapEvidenceSlugs(item.evidenceSlugs, projects),
    formId: `soluciones-form-${item.id}`,
    whatsappHref: `${whatsappBase}?text=${encodeURIComponent(`Quiero cotizar (${item.id}) desde /soluciones`)}`
  }))

  return (
    <Suspense fallback={null}>
      <SolucionesView
        hero={content.hero}
        segments={segments}
        benefitsBar={content.benefitsBar}
        defaultSegmentId={segment.id}
      />
    </Suspense>
  )
}

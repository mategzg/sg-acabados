import { Suspense } from 'react'
import type { Metadata } from 'next'

import { SolucionesView } from '@/components/soluciones/soluciones-view'
import type { SegmentWithProjects } from '@/components/soluciones/segment-tabs'
import { getProjects } from '@/lib/content'
import { getSolutionsContent } from '@/lib/solutions-intent'
import { createMetadata } from '@/lib/seo'
import type { SolutionsProjectCard } from '@/types/solutions'

import { siteConfig } from '@/config/site'

export const revalidate = 3600

const FALLBACK_IMAGE = {
  src: '/images/placeholders/generic-card.webp',
  alt: 'Proyecto de referencia en preparación'
}

function humanizeSlug(value: string) {
  return value
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
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
      summary: 'Pronto publicaremos la ficha completa de este proyecto.',
      href: '/proyectos',
      sector: 'Referencia',
      image: FALLBACK_IMAGE
    }
  })
}

export async function generateMetadata(): Promise<Metadata> {
  return createMetadata({
    locale: 'es',
    title: 'Soluciones por tipo de proyecto',
    description: 'Selecciona tu segmento (corporativo, inmobiliario o particular) y recibe una propuesta técnica y económica en 24 horas hábiles.',
    path: '/soluciones',
    keywords: [
      'soluciones corporativas',
      'proyectos inmobiliarios',
      'implementaciones particulares',
      'kits de acabados',
      'coordinación multiespecialidad'
    ]
  })
}

type SolucionesPageProps = {
  searchParams?: { segment?: string }
}

export default async function SolucionesPage({ searchParams }: SolucionesPageProps) {
  const content = getSolutionsContent()
  const projects = await getProjects()
  const whatsappBase = siteConfig.whatsapp.link

  const segments: SegmentWithProjects[] = content.segments.map((segment) => ({
    ...segment,
    projects: mapEvidenceSlugs(segment.evidenceSlugs, projects),
    formId: `soluciones-form-${segment.id}`,
    whatsappHref: `${whatsappBase}?text=${encodeURIComponent(`Quiero cotizar (${segment.id}) desde /soluciones`)}`
  }))

  const requestedSegmentId = searchParams?.segment
  const validSegment = segments.find((segment) => segment.id === requestedSegmentId)

  return (
    <Suspense fallback={null}>
      <SolucionesView
        hero={content.hero}
        segments={segments}
        benefitsBar={content.benefitsBar}
        defaultSegmentId={validSegment?.id ?? segments[0]?.id ?? 'corporativo'}
      />
    </Suspense>
  )
}

import { Suspense } from 'react'
import type { Metadata } from 'next'

import { SolutionsIntentRouter } from '@/components/solutions/solutions-intent-router'
import { getProjects } from '@/lib/content'
import { getSolutionsContent } from '@/lib/solutions-intent'
import { createMetadata } from '@/lib/seo'
import type { SolutionsProjectCard } from '@/types/solutions'

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

  const segmentsWithProjects = content.segments.map((segment) => ({
    ...segment,
    projects: mapEvidenceSlugs(segment.evidenceSlugs, projects)
  }))

  const requestedSegmentId = searchParams?.segment
  const validSegment = segmentsWithProjects.find((segment) => segment.id === requestedSegmentId)

  return (
    <Suspense fallback={null}>
      <SolutionsIntentRouter
        hero={content.hero}
        segments={segmentsWithProjects}
        defaultSegmentId={validSegment?.id}
      />
    </Suspense>
  )
}





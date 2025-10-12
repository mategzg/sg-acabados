import { Suspense } from "react"
import type { Metadata } from "next"

import { SolucionesView } from "@/components/soluciones/soluciones-view"
import { getSolutionsContent } from "@/lib/solutions-intent"
import { createMetadata } from "@/lib/seo"

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  const content = getSolutionsContent()
  const title = "Soluciones por tipo de proyecto | SG Acabados"
  const description = content.hero.subtitle
  const baseMetadata = createMetadata({
    locale: "es",
    title,
    description,
    path: "/soluciones",
    keywords: [
      "soluciones corporativas",
      "proyectos inmobiliarios",
      "implementaciones particulares",
      "kits de acabados",
      "coordinación multiespecialidad"
    ]
  })

  return {
    ...baseMetadata,
    title,
    description,
    alternates: {
      ...baseMetadata.alternates,
      canonical: "/soluciones"
    }
  }
}

type SolucionesPageProps = {
  searchParams?: { segment?: string }
}

export default async function SolucionesPage({ searchParams }: SolucionesPageProps) {
  const content = getSolutionsContent()
  const segments = content.segments

  const requestedSegmentId = searchParams?.segment
  const validSegment = segments.find((segment) => segment.id === requestedSegmentId)

  return (
    <Suspense fallback={null}>
      <SolucionesView
        hero={content.hero}
        segments={segments}
        defaultSegmentId={validSegment?.id ?? segments[0]?.id ?? "corporativo"}
      />
    </Suspense>
  )
}

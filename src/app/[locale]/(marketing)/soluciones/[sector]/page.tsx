import { Suspense } from "react"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { SolucionesView } from "@/components/soluciones/soluciones-view"
import { getSolutionsContent, getSolutionsSegment } from "@/lib/solutions-intent"
import { locales, type Locale } from "@/lib/i18n-config"
import { createMetadata } from "@/lib/seo"

export const revalidate = 3600

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

  const title = `${segment.label} | Soluciones SG`
  const description = segment.intro
  const baseMetadata = createMetadata({
    locale: params.locale,
    title,
    description,
    path: `/soluciones/${segment.id}`,
    keywords: [segment.label, ...segment.pains.slice(0, 2)]
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

type SegmentPageProps = {
  params: { sector: string }
}

export default async function SegmentPage({ params }: SegmentPageProps) {
  const content = getSolutionsContent()
  const segment = getSolutionsSegment(params.sector)

  if (!segment) {
    notFound()
  }

  const segments = content.segments

  return (
    <Suspense fallback={null}>
      <SolucionesView
        hero={content.hero}
        segments={segments}
        defaultSegmentId={segment.id}
      />
    </Suspense>
  )
}

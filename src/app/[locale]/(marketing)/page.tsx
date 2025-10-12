import type { Metadata } from 'next'

import { Hero } from '@/components/hero'
import { ServicesSection } from '@/components/home/services-section'
import { FeaturedProjectsSection } from '@/components/home/featured-projects-section'
import { FinalCallToAction } from '@/components/home/final-call-to-action'
import { CatalogBanner } from '@/components/catalog-banner'
import { createMetadata } from '@/lib/seo'

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  return createMetadata({
    locale: 'es',
    title: 'Acabados corporativos integrales que cumplen plazos',
    description:
      'Especialistas en acabados corporativos en Perú: coordinamos arquitectura interior, mobiliario y sistemas MEP para entregar oficinas, retail y salud sin retrasos.',
    path: '/',
    keywords: ['acabados corporativos', 'interiorismo corporativo', 'proyectos llave en mano', 'acabados retail', 'constructoras perú']
  })
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <FeaturedProjectsSection />
      <FinalCallToAction />
      <CatalogBanner />
    </>
  )
}
